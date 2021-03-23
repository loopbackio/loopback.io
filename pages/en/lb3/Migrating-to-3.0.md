---
title: "Migrating apps to LoopBack 3.x"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Migrating-to-3.0.html
summary: How to migrate applications from LoopBack 2.x to 3.x.
---
{% include see-also.html content="
- [3.0 Release notes](3.0-Release-Notes.html)
- [Change log](http://strongloop.github.io/changelog/) (latest updates)
" %}

{% include toc.html %}

## Update LoopBack version

To move your app from LoopBack 2.x to 3.x, edit the `package.json` file, then
install dependencies from npm.

### Edit package.json

Make the following changes to your app's `package.json` file:

- Change the dependency on `loopback` to specify version 3.0.
- Remove `loopback-datasource-juggler` from dependencies, since it is [now a regular dependency](3.0-Release-Notes.html#loopback-datasource-juggler-is-now-a-regular-dependency-of-loopback).
- Depending on when you initially created your app, `strong-error-handler` may not
be listed as a dependency; if it isn't, add it.

For example, change:

```
"dependencies": {
  ...
  "loopback-datasource-juggler": "^2.39.0",
  "loopback": "^2.22.0"
 },
...
```

To:

```
"dependencies": {
  ...
  "strong-error-handler": "^1.0.1",
  "loopback": "^3.0.0"
```

### Update dependencies with npm

After editing `package.json`, enter this command (in the project root directory) to update application dependencies:

```
npm install
```

## Update use of REST error handler

As described in the [release notes](3.0-Release-Notes.html#new-rest-adapter-error-handler), version 3.0 adds a new more secure error handler middleware package, `strong-error-handler`.

Install it as a dependency with the following command:

```
npm install --save strong-error-handler
```

{% include tip.html content="Projects scaffolded with a recent version of StrongLoop/LoopBack tools are already correctly configured and require no change.
" %}

You may need to make the following changes:

- The new error handler's HTTP responses have a `error.statusCode` property
instead of `error.status`.  Update any clients that read the HTTP status code
from the response body.
- Change any use of the `loopback#errorhandler` short-cut to `require('strong-error-handler')`.
- Remove any use of `errorHandler.disableStackTrace`.
- Enable `strong-error-handler` by adding it to the `final:after` phase in your middleware config file (`server/middleware.json`):

```
  ...
  "final:after": {
    "strong-error-handler": {
      "params": {
         "debug": false,
         "log": true
       }
    }
  }
```

- In your `config.json` file, disable `remoting.rest.handleErrors`. This will
  instruct Loopback to respect your middleware-based configuration of the error handler:

```
{
  ...
  "remoting": {
    ...
    "rest": {
      ...
      "handleErrors": false
    }
  }
}
```

## Replace LoopBack middleware "getter" properties

As described in the [release notes](3.0-Release-Notes.html#removed-getters-for-express-3x-middleware),
you can no longer use the LoopBack convenience "getter" properties for Express middleware.
You must replace any instances of them with the corresponding `require()` statement, as
summarized in this table:

| Change this... | To this... |
|---|----|
 | `loopback.compress` | `require('compression')` |
 | `loopback.cookieParser` | `require('cookie-parser')` |
 | `loopback.cookieSession` | `require('cookie-session')` |
 | `loopback.csrf` | `require('csurf')` |
 | `loopback.directory` | `require('serve-index')` |
 | `loopback.errorHandler` | `require('errorhandler')` |
 | `loopback.favicon` | `require('serve-favicon')` |
 | `loopback.logger` | `require('morgan')` |
 | `loopback.methodOverride` | `require('method-override')` |
 | `loopback.responseTime` | `require('response-time')` |
 | `loopback.session` | `require('express-session')` |
 | `loopback.timeout` | `require('connect-timeout')` |
 | `loopback.vhost` | `require('vhost')` |

## Update models

The changes in this section apply to _all_ LoopBack models.

### Change use of PUT endpoints

As described in the [release notes](3.0-Release-Notes.html#full-replace-vs-partial-update),
in version 3.0, `PUT` endpoints no longer perform a partial update (a patch operation),
but replace the model instance as whole. If your application relies on
partial updates, you'll need to update it.

In the short-term, disable the model setting `replaceOnPUT` in models
affected by this change. For example, for a model `MyModel`, add the following to `common/models/my-model.json`:

```js
{
  "name": "MyModel",
  "replaceOnPUT": false,
  ...
}
```

In the long term, rework your clients to switch from `PUT` to
`PATCH` endpoints, as the compatibility option `replaceOnPUT` will likely be removed
at some point in the future.

To write client code that works with both major versions
of LoopBack, use the following HTTP endpoints:

| Method | Endpoint
|----|----|
|replaceOrCreate | `POST /customers/replaceOrCreate` |
|replaceById | `POST /customers/:id/replace` |
|updateOrCreate | `PATCH /customers` |
|prototype.updateAttributes | `PATCH /customers/:id` |

### Remove use of undefined mixins

As described in the [release notes](3.0-Release-Notes.html#undefined-model-mixins-throw-an-error),
applying an undefined mixin to a LoopBack model throws an error.

If you have a model using a mixing that's not available, you must
either fix the configuration of your mixin sources to make the mixin available
to LoopBack, or remove the unknown mixin from your model definition.

### Update remote method definitions

In version 3.0, the `isStatic` property no longer indicates that a remote method is static.
Rather if the method name starts with `prototype.` then the remote method is an instance method,
otherwise (by default) it's a static method.

As a result, you may see many deprecation warnings after upgrading to 3.0.  To eliminate these:

- For static methods, remove the `isStatic: true` property.
- For instance methods, remove `isStatic: false` and add the `prototype.` prefix to the
method name (the key used in model JSON file).

For example, in `common/models/my-model.json`.

{% include code-caption.html content="Version 2.x" %}
```json
{
  "methods": {
    "staticMethod": {
      "isStatic": true,
      "http": { "path": "/static" }
    },
    "instanceMethod": {
      "isStatic": false,
      "http": { "path": "/instance" }
    }
  }
}
```

{% include code-caption.html content="Version 3.0" %}
```json
{
  "methods": {
    "staticMethod": {
      "http": { "path": "/static" }
    },
    "prototype.instanceMethod": {
      "http": { "path": "/instance" }
    }
  }
}
```

{% include tip.html content="You typically define remote methods either in:

- Model JSON file (`common/models/my-model.json`)
- Model JavaScript file (`common/models/my-model.js`).

Be sure  to check both places when looking for the source of the deprecation warning.
" %}

### Remove dots from model property names

Property names containing a dot, ( for example, `customer.name`) were deprecated in 2.x.
In 3.0, LoopBack throws an error for such properties.

Update your model definitions to use a different character instead, for example an
underscore (`customer_name`).

### Rename models called "File"

If you have a model called "File", you need to give it a different name to
prevent clash with built-in "file" type provided by strong-remoting.

To preserve REST API of your application, you can set the "plural" value
to "Files" in the renamed model.

```js
// common/models/file-model.json
{
  "name": "FileModel",
  "plural": "files",
  // ...
}
```

## Update models derived from PersistedModel

The changes in this section apply to all models derived from `PersistedModel`,
backed by a persistent data store such as a database.

### Use `forceId` to explicitly set model IDs

As described in the [release notes](3.0-Release-Notes.html#models-with-auto-generated-ids-reject-user-provided-id-values),
clients are no longer allowed to provide their own `id` value when creating new instances
of models that have an auto-generated `id` property.

To enable setting an `id` explicitly, set `forceId: false` in the model JSON file.
For example, in `common/models/product.json`:


```json
{
  "name": "Product",
  "base": "PersistedModel",
  "forceId": false,
  ...
}
```

### Revise use of `PersistedModel.create()`

As described in the [release notes](3.0-Release-Notes.html#persistedmodelcreate-method-no-longer-returns-created-instances),
when invoked with a callback argument, `PersistedModel.create()` does not return anything; when invoked without a callback, it returns a promise.

You must revise code that relies on the previous synchronous behavior to correctly
use a promise or a callback instead.

### Remove check for `ctx.instance` in "loaded" operation hooks

As described in the [release notes](3.0-Release-Notes.html#persistedmodelfind-provides-ctxdata-in-loaded-hook),
the "loaded" hook now consistently provides `ctx.data` for all operations.

If you have a "loaded" hook handler that checks for the existence of `ctx.instance`, then you
can remove this condition together with the branch that follows.

### Replace removed `PersistedModel` event listeners

Version 3.0 eliminates the following deprecated `PersistedModel` events:
`changed`, `deleted`, `deletedAll`.

Instead of listening for these events, use [Operation Hooks](Operation-hooks.html) instead,
 notably "after save" and "after delete".

### Replace calls to `PersistedModel.updateOrCreate()` with array argument

`PersistedModel.updateOrCreate` no longer accepts an array as input to create a
new model instance.  Instead, use  `[PersistedModel.create()](http://apidocs.loopback.io/loopback/#persistedmodel-create)`.
To perform a bulk `updateOrCreate()`, use `async.each` or `Promise.all` to
repeatedly call `updateOrCreate()` for each model instance.

## Explicitly add User model properties that were removed

<!-- Do we think this will be common?  Why would someone use any of these unused properties?
     If uncommon, move this section down in the guide
-->

The following unused properties of the built-in `User` model were removed:

 - `credentials`
 - `challenges`
 - `status`
 - `created`
 - `lastUpdated`

If your application uses any of these properties, you must define them manually
in your custom User model JSON file; for example:

```json
{
  "name": "MyUser",
  "base": "User",
  "properties": {
    "credentials": { "type": "object" },
    "challenges": { "type": "object" },
    "status": "string",
    "created": "date",
    "lastUpdated": "date"
  }
}
```

## Check request parameter encoding

As described in the [release notes](3.0-Release-Notes.html#cleanup-in-conversion-and-coercion-of-input-arguments),
the REST adapter handles input arguments more strictly.  As a result,
versions 2.x and 3.0 handle certain edge cases differently.

If you encounter `400 Bad Request` error responses after the upgrade,
check the client code and ensure it correctly encodes request parameters.

## Remove use of current-context methods, middleware, and configuration settings

As described in the [release notes](3.0-Release-Notes.html#current-context-api-and-middleware-removed),
version 3.0 removes a number of deprecated methods related to current-context, middleware, and configuration settings.
Ensure you no longer use any of these methods and middleware.
If you must use current-context, follow the instructions in [Using current-context in version 3.0](#using-current-context-in-version-30) below.

You must disable or remove `remoting.context` configuration in your server
configuration as follows:

```js
{
  "remoting": {
    "context": false, // or remove completely
    // etc.
  },
  // etc.
}
```

Without this change, you will see the following error on the first HTTP request
received:

```
Unhandled error for request GET /api/Users:
Error: remoting.context option was removed in version 3.0.
See https://loopback.io/doc/en/lb3/Using-current-context.html for more
details.
    at restApiHandler (.../node_modules/loopback/server/middleware/rest.js:44:15)
    at Layer.handle [as handle_request] (.../node_modules/express/lib/router/layer.js:95:5)
```

<!--
  README says "We recommend AGAINST using this module." so why are we describing it here?
-->

{% include warning.html content="Using the current context feature is not recommended!

The implementation of loopback-context is based on  [continuation-local-storage](https://www.npmjs.com/package/continuation-local-storage),
which is known to have many problems.
As a result, loopback-context does not work in many situations.
See [loopback issue #1495](https://github.com/strongloop/loopback/issues/1495) for
updates and an alternative solution.
" %}

If you still need to use loopback-context in your LoopBack 3.x application, use the  [loopback-context](https://www.npmjs.com/package/loopback-context) module:

 1. Add `loopback-context` to your dependencies:
 ```
 npm install --save loopback-context
 ```

 2. Configure the new context middleware in `server/middleware.json`:

    ```js
    {
      "initial": {
        "loopback-context#per-request": {}
      }
    }
    ```

 3. Replace all uses of `loopback.getCurrentContext()` with the following:

    ```js
    // at the top of your file
    var LoopBackContext = require('loopback-context');

    // in your code
    var ctx = LoopBackContext.getCurrentContext();
    if (ctx) {
      // use the context
    }
    ```

## Update use of promises

As described in the [release notes](3.0-Release-Notes.html#use-bluebird-for-promises),
version 3.0 uses `bluebird` as the promise library instead of
`global.Promise`. If your project overrides `global.Promise` to
`bluebird` (for example, if using Node v0.10 that does not have `global.Promise`),
then you can remove that code.

If your project uses a custom promise implementation and relies on LoopBack
returning your Promise instances, then you have two options:

- Wrap all Promises returned by LoopBack in your Promise API via `Promise.resolve`. For example:

    ```js
    Promise.resolve(User.login(data));
    ```

- Rework your code to use Bluebird API instead of the API provided by your promise implementation.

## Check CORS configuration

As described in the [release notes](3.0-Release-Notes.html#cors-is-no-longer-enabled),
CORS is no longer enabled by default in version 3.0.

The built-in CORS middleware was removed from `loopback.rest()` handler,
so you must set up and configure application CORS policies explicitly.

{% include tip.html content="Projects scaffolded with a recent version StrongLoop/LoopBack tools already have the global CORS handler configured in `server/middleware.json`.
" %}

If your application was created with an earlier version of the tools, then you will need to enable CORS manually; Follow these steps:

 1. Install the `cors` middleware package:

     ```
     npm install --save cors
     ```

 2. Edit the `initial` section in your `server/middleware.json` and add
  a configuration block for `cors` middleware:

    ```js
    {
      // ...
      "initial": {
        // ...
        "cors": {
          "params": {
            "origin": true,
            "credentials": true,
            "maxAge": 86400
          }
        }
      },
      // ...
    }
    ```

 3. Disable remoting-level CORS.  Edit the `remoting` section in your `server/config.json` and set `cors` to `false`:

    ```js
    {
      // ...
      "remoting": {
        // ...
        "cors": false,
        // ...
      }
    }
    ```
