---
title: "Migrating apps to LoopBack 3.0"
lang: en
layout: page
keywords: LoopBack
tags: [getting_started]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Migrating-to-3.0.html
summary:
---

This document describes how to migrate applications from LoopBack 2.x to 3.x

## loopback-datasource-juggler is a regular dependency now

Originally, we (ab)used peer dependencies to ensure there is only one instance
of loopback-datasource-juggler in the dependency tree, so that there is only
one singleton instance of model registry. This was very fragile and might not
have worked in certain edge cases.

We have reworked loopback-datasource-juggler and connectors to not rely on a
single juggler instance anymore. As the last step, juggler became a regular
dependency.

When upgrading application from previous loopback versions, simply remove
loopback-datasource-juggler from your dependencies.

## New error handler for REST

We have implemented a new more secure error handler middleware available
via the package `strong-error-handler` and encourage all uses to switch to
this new middleware.

We have removed `loopback#errorhandler` short-cut. You should explicitely
install `errorhandler` (or even better, `strong-error-handler`) in your
project.

The new error handler no longer honours the environment variable
`NODE_ENV=production` and is configured for production by default.
You should enable the debug mode in `server/middleware.development.json`.
Note that projects scaffolded with a recent version of `apic loopback`
(or `slc loopback`) are already correctly configured and no change is needed.

HTTP error responsed produced by the new error handler no longer contain
`error.status` property, as it was renamed to `error.statusCode`. You should
update any clients reading the HTTP status code from the response body.

## Middleware getters from Express 3.x were removed

Express 4.x stopped bundling commonly-used middleware. To simplify migration of
LoopBack 1.x applications (powered by Express 3.x) to LoopBack 2.x (powered by
Express 4.x), we created getter properties to allow developers to keep using
the old convention.

We have removed these getters in LoopBack 3.0, here is the full list of removed
properties together with the middleware module name to use instead:

 - `loopback.compress` - use `require('compression')` instead
 - `loopback.timeout` - use `require('connect-timeout')` instead
 - `loopback.cookieParser` - use `require('cookie-parser')` instead
 - `loopback.cookieSession` - use `require('cookie-session')` instead
 - `loopback.csrf` - use `require('csurf')` instead
 - `loopback.errorHandler` - use `require('errorhandler')` instead
 - `loopback.session` - use `require('express-session')` instead
 - `loopback.methodOverride` - use `require('method-override')` instead
 - `loopback.logger` - use `require('morgan')` instead
 - `loopback.responseTime` - use `require('response-time')` instead
 - `loopback.favicon` - use `require('serve-favicon')` instead
 - `loopback.directory` - use `require('serve-index')` instead
 - `loopback.vhost` - use `require('vhost')` instead

## Models with auto-generated ids reject user-provided id values

For security reasons, we have disabled the ability of the clients to provide
their own `id` value when creating new instances of models that have
an auto-generated `id` property.

Such requests are rejected with the following error (replace `Product` and `1`
with your model name and the requested id value).

```
Unhandled rejection ValidationError: The `Product` instance is not valid.
Details: `id` can't be set (value: 1).
```

You can disable this check by setting `forceId: false` in your model config.

Building on the error message shown above, you would have to change
`common/models/product.json`:


```json
{
  "name": "Product",
  "forceId": false
}
```

## Unused `User` properties were removed

We have removed the following properties of the built-in `User` model that
were not used by LoopBack:

 - `credentials`
 - `challenges`
 - `status`
 - `created`
 - `lastUpdated`

If your application is using these properties, then you should explicitly
define them in your custom User model.

## Stricter handling of input arguments

We have significantly reworked conversion and coercion of input arguments when
using the default REST adapter. The general approach is to make both conversion
and coercion more strict. When we are not sure how to treat an input value, we
rather return HTTP error `400 Bad Request` than coerce the value incorrectly.

As a result, certain edge cases scenarios are handled differently in versions
2.x and 3.x. If you start seeing 400 error responses after the upgrade,
then please check the client code and ensure it correctly encodes
request parameters.

## The current-context feature was moved to loopback-context

We have removed the following current-context-related APIs:

 - `loopback.getcurrentcontext`
 - `loopback.createcontext`
 - `loopback.runincontext`

Additionally, `loopback#context` middleware and `remoting.context` server
config were removed too.

When upgrading from LoopBack 2.x, you need to disable or remove
`remoting.context` configuration in your server config.

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
See https://docs.strongloop.com/display/APIC/Using%20current%20context for more
details.
    at restApiHandler (.../node_modules/loopback/server/middleware/rest.js:44:15)
    at Layer.handle [as handle_request] (.../node_modules/express/lib/router/layer.js:95:5)
```

### Setting up "current context" in 3.x

To setup "current context" feature in your LoopBack 3.x application, you
should use [loopback-context](https://www.npmjs.com/package/loopback-context)
module:

 1. Add `loopback-context` to your dependencies

 2. Configure the new context middleware in your `server/middleware-config.json` file

    ```json
    {
      "initial": {
        "loopback-context#per-request": {}
      }
    }
    ```

 3. Replace all usages of `loopback.getCurrentContext` with the following:

    ```js
    // at the top of your file
    var LoopBackContext = require('loopback-context');

    // in your code
    var ctx = LoopBackContext.getCurrentContext();
    if (ctx) {
      // use the context
    }
    ```

## No need to polyfill Promise on Node v0.10

In version 3.0, we always use `bluebird` as our promise library instead of
`global.Promise`. If your project is overriding `global.Promise` to
`bluebird` (e.g. on Node v0.10 which does not providy `global.Promise` out of
the box), then you can probably remove that code.

## Accomodate for Bluebird Promise API

If your project uses a custom promise implementation and relying on LoopBack
returning your Promise instances, then you have two options:

 1. Wrap all Promises returned by LoopBack in your Promise API via
   `Promise.resolve`. Example:

    ```js
    Promise.resolve(User.login(data));
    ```

 2. Rework your code to use Bluebird API instead of the API provided by your
   Promise implementation.

## Check your CORS configuration

We have removed built-in CORS middleware from `loopback.rest()` handler. It's
up to the applications to setup and configure application-wide CORS policies.

If you have scaffolded your application with a recent version of our generators
(`apic loopback` or `slc loopback`), then your application already comes with
a global CORS handler configured in `server/middleware.json`.

If that's not the case, and you would like to allow cross-site requests to
your LoopBack server, then you need to follow these few steps:

 1. `npm install --save cors`

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

## No need to check for `ctx.instance` in "loaded" hooks

When implementing "loaded" hook for `DAO.find` method in 2.x, we have mistakenly
implemented a version that sets `ctx.instance` instead of `ctx.data`. This defeats
the purpose of the "loaded" hook, which is to allow hooks to modify the raw
data provided by the datasource before it's used to build a model instance.
This has been fixed in 3.0 and the "loaded" hook now consistently provides
ctx.data for all operations.

If you have a "loaded" hook handler that checks `if (ctx.instance)` then you
can remove this condition together with the branch that follows.

## `PersistedModel.create` no longer returns immediately with the instance(s) created

While implementing support for promises in `PersistedModel.create`, we found that this
method returns the instance object synchronously. This is inconsistent with the
usual convention of accessing the result via callback/promise and it may not
work correctly in cases where some fields like the id property are generated by
the database.

We have changed the API to be consistent with other DAO methods: when invoked
with a callback argument, the method does not return anything. When invoked
without any callback, a promise is returned.

Please rework any code relying on the synchronous behaviour to correctly
use a promise or a callback instead.

## Undefined mixins throw an error

When applying an undefined mixin to a LoopBack model, a warning message was
logged regarding the invalid mixin, which needs to be addressed rather than
silently ignored. This has been fixed in 3.0, therefore an undefined mixin
applied to a LoopBack model will throw an error that needs to be handled.

If you happen to have a model using a mixing that's not available, the please
either fix the configuration of your mixin sources to make the mixin available
to LoopBack, or remove the unknown mixin from your model definition.

## Model events are gone

We have removed the following deprecated events emitted by `PersistedModel`:
`changed`, `deleted`, `deletedAll`.

Applications should use [Operation Hooks](https://docs.strongloop.com/display/public/LB/Operation+hooks) instead,
most notably "after save" and "after delete".

## Model property names with dot(s) generates an error

Property names containing a dot, e.g. `customer.name` were deprecated in 2.x.
In 3.x, an error is thrown when such property is detected.

Please update your model definitions to use a different character instead, e.g.
underscore (`customer_name`).

## `PersistedModel.updateOrCreate` rejects arrays

Allowing `updateOrCreate` to accept an array as input would only work when
creating new model instances (not updating them), so this support has been
removed. Please use `create` function instead (array inputs only worked to
create new instances with this method before).
If you would like to perform a bulk `updateOrCreate`, you could use
`async.each` or `Promise.all` to repeatedly call `updateOrCreate` for
each instance.

## Update your remote-method definitions (eventually)

In LoopBack 3.0, we have deprecated `isStatic` flag in favour of encoding
this value in method name, where prototype methods specified by prepending
`prototype.` prefix to their name, e.g. `prototype.updateAttributes`.

As a result, you may see many deprecation warnings after the upgrade.

For static methods, you should remove `isStatic: true` flag entirely.

For prototype methods, you should remove `isStatic: false` and add
`prototype.` prefix to the method name (the key used in model JSON file).

Reminder: there are two commonly used ways for defining remote methods. One
can define them in the model JSON file (`common/models/my-model.json`)
or in the JS file alongside their implementation (`common/models/my-model.js`).
Don't forget to check both places when looking for the source of the
deprecation warning.


## Advanced

In this final section, we describe changes that affect only advanced usage
of LoopBack an its internal components. Instructions described in this section
are not applicable to typical LoopBack applications.

### Use `registerType` in `ModelBuilder` instead of `DataSource`

We have removed `DataSource.registerType()` method, it was a wrapper for
`ModelBuilder.registerType`. Please use `ModelBuilder.registerType` directly.

### Use `remotes.defineType` instead of `Dynamic.defineType`

The `Dynamic` component was removed from strong-remoting in favour of type
converters and a type registry.

Removed APIs:

```js
RemoteObjects.convert(name, fn)
remoteObjectsInstance.convert(name, fn)
RemoteObjects.defineType(name, fn)
remoteObjectsInstance.defineType(name, fn)
```

The new APIs to use instead:

```js
remoteObjectsInstance.defineType(name, converter)
remoteObjectsInstance.defineObjectType(name, factoryFn)
```

### `Change.handleError` was removed

All `Change` methods are reporting all errors to the caller via the callback
now.

Use `PersistedModel` to report change-tracking errors via the existing method
`PersistedModel.handleChangeError`. This method can be customized on a per-model
basis to provide different error handling.

### `app.model(modelName, settings)` was removed

`app.model(modelName, settings)`, a sugar for creating non-existing model, was
now removed in favor of the following two methods:
- `app.registry.createModel(modelName, properties, options)` to create new model
- `app.model(modelCtor, config)` to update existing model and attach it to app
