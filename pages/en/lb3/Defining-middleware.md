---
title: "Defining middleware"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Defining-middleware.html
summary:
---

## Overview

_Middleware_ refers to functions executed when HTTP requests are made to REST endpoints.
Since LoopBack is based on [Express](http://expressjs.com/), LoopBack middleware is the same as [Express middleware](http://expressjs.com/api.html#middleware).
However, LoopBack adds the concept of _middleware phases_, to clearly define the order in which middleware is called.
Using phases helps to avoid ordering issues that can occur with standard Express middleware.

LoopBack supports the following types of middleware:

* **Pre-processing middleware** for custom application logic. See [example of pre-processing middleware](#pre-processing-middleware). 
* **Dynamic request handling middleware** to serve dynamically-generated responses, for example HTML pages rendered from templates and JSON responses to REST API requests. See [example pending].
* **Static middleware** to serve static client-side assets.  See [example of static middleware](#static-middleware).
* **Error-handling middleware** to deal with request errors. See [example of error-handling middleware](#error-handling-middleware).

### How to add middleware

To add middleware to your application:

1.  **Specify the middleware function**:
    1.  If using an existing function or package, add the code to your application or install the package. 
    2.  If you are creating a new middleware function, write it. See [Defining a new middleware handler function](#defining-a-new-middleware-handler-function).

2.  **Register the middleware**:
    1. Edit `server/middleware.json`. This is the recommended way to register middleware. See [Registering middleware in middleware.json](#registering-middleware-in-middlewarejson).
    1. Alternatively, register the middleware in application code. See [Registering middleware in JavaScript](#registering-middleware-in-javascript).

### Middleware phases

LoopBack defines a number of _phases_, corresponding to different aspects of application execution.
When you register middleware, you can specify the phase in which the application will call it.
See [Registering middleware in middleware.json](#registering-middleware-in-middlewarejson) and [Using the LoopBack API](#using-the-loopback-api).
If you register middleware (or routes) with the Express API, then it is executed at the beginning of the `routes` phase.

The predefined phases are:

1.  **`initial`** - The first point at which middleware can run.
2.  **`session`** - Prepare the session object.
3.  **`auth`** - Handle authentication and authorization.
4.  **`parse`** - Parse the request body.
5.  **`routes`** - HTTP routes implementing your application logic.
    Middleware registered via the Express API `app.use`, `app.route`, `app.get` (and other HTTP verbs) runs at the beginning of this phase.
    Use this phase also for sub-apps like `loopback/server/middleware/rest` or `loopback-explorer`.

6.  **`files`** - Serve static assets (requests are hitting the file system here).

7.  **`final`** - Deal with errors and requests for unknown URLs.

Each phase has "before" and "after" subphases in addition to the main phase, encoded following the phase name, separated by a colon.
For example, for the "initial" phase, middleware executes in this order:

1.  `initial:before `
2.  `initial`
3.  `initial:after`

Middleware within a single subphase executes in the order in which it is registered. However, you should not rely on such order.
Always explicitly order the middleware using appropriate phases when order matters.

## Specifying a middleware function


### Using Express middleware

{% include note.html content="LoopBack v.3 does not provide convenience methods for Express
middleware.  For details, see the [Release notes](3.0-Release-Notes.html#removed-getters-for-express-3x-middleware).
" %}

You can use any middleware compatible with Express; see [Express documentation](http://expressjs.com/resources/middleware.html) for a partial list.

Simply install it:

```shell
$ npm install --save <module-name>
```

Then simply register it so that it is called as needed.
See [Registering middleware in middleware.json](#registering-middleware-in-middlewarejson) 
and [Registering middleware in JavaScript](#registering-middleware-in-javascript).

### Defining a new middleware handler function

If no existing middleware does what you need, you can easily write your own middleware handler function.
To register the middleware function in `middleware.json`, you need to create a constructor (factory) function that returns the middleware function.

By convention, place middleware functions in the `server/middleware` directory.

A middleware handler function accepts three arguments, or four arguments if it is error-handling middleware. The general form is:

```js
function myMiddlewareFunc([err,] req, res, next) {
    // ...
}
```

<table>
  <tbody>
    <tr>
      <th width="60">Name</th>
      <th width="100">Type</th>
      <th>Optional?</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>err</td>
      <td>Object</td>
      <td>Required for error-handling middleware.</td>
      <td>
        Use <em>only</em> for error-handling middleware.
        Error object, usually an instance or <code>Error</code>; for more information, see <a href="Error-object.html">Error object</a>.
      </td>
    </tr>
    <tr>
      <td>req</td>
      <td>Object</td>
      <td>No</td>
      <td>
        The Express <a href="http://expressjs.com/4x/api.html#request" class="external-link" rel="nofollow">request object</a>.
      </td>
    </tr>
    <tr>
      <td>res</td>
      <td>Object</td>
      <td>No</td>
      <td>
        The Express <a href="http://expressjs.com/4x/api.html#response" class="external-link" rel="nofollow">response object</a>.
      </td>
    </tr>
    <tr>
      <td>next</td>
      <td>Function</td>
      <td>No</td>
      <td>Call <code>next()</code> after your application logic runs to pass control to the next middleware handler.</td>
    </tr>
  </tbody>
</table>

An example of a middleware function with three arguments, called to process the request when previous handlers did not report an error:

{% include code-caption.html content="Regular middleware" %}
```javascript
return function myMiddleware(req, res, next) {
    // ...
};
```

Here is a constructor (factory) for this function; use this form when registering it in `middleware.json`:

{% include code-caption.html content="Regular middleware" %}
```javascript
module.exports = function() {
  return function myMiddleware(req, res, next) {
    // ...
  }
};
```

An example a middleware function with four arguments, called only when an error was encountered.

{% include code-caption.html content="Error handler middleware" %}
```javascript
function myErrorHandler(err, req, res, next) {
  // ...
}
```

### Packaging a middleware function

To share middleware across multiple projects, create a package that exports a middleware constructor (factory) function that accepts configuration 
options and returns a middleware handler function; for example, as shown below.

If you have an existing project created with the [application generator](Application-generator.html), to implement a new middleware handler that you can share with other projects,
place the file with the middleware constructor in the `server/middleware` directory, for example, `server/middleware/myhandler.js`.

```js
module.exports = function(options) {
  return function customHandler(req, res, next) {
    // use options to control handler's behavior
  }
};
```

For details about the `options` object, refer to [Middleware configuration properties](#middleware-configuration-properties).

## Registering middleware in middleware.json

The easiest way to register middleware is in `server/middleware.json`.
This file specifies all an application's middleware functions and the phase in which they are called.

When you create an application using the [Application generator](Application-generator.html) 
it creates a default `middleware.json` file that looks as follows:

{% include code-caption.html content="server/middleware.json" %}
```javascript
{
  "initial:before": {
    "loopback#favicon": {}
  },
  "initial": {
    "compression": {},
    "cors": {
      "params": {
        "origin": true,
        "credentials": true,
        "maxAge": 86400
      }
    },
    "helmet#xssFilter": {},
    "helmet#frameguard": {
      "params": [
        "deny"
      ]
    },
    "helmet#hsts": {
      "params": {
        "maxAge": 0,
        "includeSubdomains": true
      }
    },
    "helmet#hidePoweredBy": {},
    "helmet#ieNoOpen": {},
    "helmet#noSniff": {},
    "helmet#noCache": {
      "enabled": false
    }
  },
  "session": {},
  "auth": {},
  "parse": {},
  "routes": {
    "loopback#rest": {
      "paths": [
        "${restApiRoot}"
      ]
    }
  },
  "files": {},
  "final": {
    "loopback#urlNotFound": {}
  },
  "final:after": {
    "strong-error-handler": {}
  }
}
```

Each top-level key in `middleware.json` defines a middleware phase or sub-phase, for example "initial", "session:before", or "final".
Phases run in the order they occur in the file.

Each phase is a JSON object containing a key for each middleware function to be called in that phase.
For example, "loopback/server/middleware/favicon" or "compression".

In general, each phase has the following syntax:

```js
phase[:sub-phase] : {
 middlewarePath : {
   [ enabled: [true | false] ]
   [, name: nameString ]
   [, params : paramSpec ]
   [, methods: methodSpec ]
   [ paths : routeSpec ]
 }
};
```

Where:

* _phase_:      is one of the predefined phases listed above (initial, session, auth, and so on) or a custom phase; see [Adding a custom phase](#adding-a-custom-phase).
* _sub-phase_:  (optional) can be `before` or `after`.
* _name_:       optional middleware name. See [Middleware configuration properties](#middleware-configuration-properties) below.
* _middlewarePath_: path to the middleware function. See [Path to middleware function](#path-to-middleware-function) below.
* _paramSpec_:  value of the middleware parameters, typically a JSON object. See [Middleware configuration properties](#middleware-configuration-properties) below.
* _methodSpec_: HTTP methods, such as 'GET', 'POST', and 'PUT'. If not present, applies to all methods.
* _routeSpec_:  REST endpoint(s) that trigger the middleware.

### Path to middleware function

Specify the path to the middleware function (_middlewarePath)_ in the following ways:

* For an external middleware module installed in the project, just use the name of the module; for example `compression`.
  See [Using other middleware](#using-other-middleware).
* For a script in a module installed in the project, use the path to the module; for example `loopback/server/middleware/rest`.
* For a script with a custom middleware function, use the path relative to `middleware.json`, for example `./middleware/custom`.
* Absolute path to the script file (not recommended).

Additionally, you can use the shorthand format `{_module_}#{_fragment_}`, where _fragment_ is:

* A property exported by _module_, for example `loopback#favicon` is resolved to `require('loopback').favicon`.
* A file in _module's_ `server/middleware` directory, for example `require('loopback/server/middleware/favicon')`.
* A file in _modules_' `middleware` directory, for example `require('loopback/middleware/favicon')`.

### Middleware configuration properties

You can specify the following properties in each middleware section. They are all optional:

<table>
  <thead>
    <tr>
      <th width="100">Property</th>
      <th width="100">Type</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>An optional name for the entry. It can be used to identify an entry within the same phase/path for the purpose of merging</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>enabled</td>
      <td>Boolean</td>
      <td>
        Whether to register or enable the middleware. You can override this property in environment-specific files, for example to disable certain middleware when running in production. For more information, see <a href="Defining-middleware.html">Environment-specific configuration</a>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>params</td>
      <td>Object or Array</td>
      <td>
        Parameters to pass to the middleware handler (constructor) function. Most middleware constructors take a single "options" object parameter; in that case the <code>params</code> value is that object.
        To specify a project-relative path (for example, to a directory containing static assets), start the string with the prefix <code>$!</code>. Such values are interpreted as paths relative to the file <code>middleware.json</code>.  
        See examples below.
      </td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>methods</td>
      <td>String[ ]</td>
      <td>Specifies the HTTP methods, such as 'GET', 'POST', and 'PUT'. If not present, it will apply to all methods.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>paths</td>
      <td>String[ ]</td>
      <td>Specifies the REST endpoint(s) that trigger the middleware. In addition to a literal string, route can be a path matching pattern, a regular expression, or an array including all these types. For more information, see the <a href="http://expressjs.com/4x/api.html#app.use" class="external-link" rel="nofollow">app.use (Express documentation)</a>. </td>
      <td>Triggers on all routes</td>
    </tr>
    <tr>
      <td>optional</td>
      <td>Boolean</td>
      <td>Specify whether the middleware is optional. Optional middleware do not throw, even if they are not installed or cannot be resolved in the file system.</td>
      <td>N/A</td>
    </tr>
  </tbody>    
</table>

Example of a typical middleware function that takes a single "options" object parameter: 

```js
"compression": {
   "params": {
     "threshold": 512
   }
}
```

Example of a middleware function that takes more than one parameter, where you use an array of arguments: 

```js
"morgan": {
   "params": ["dev", {
     "buffer": true
   }]
 }
```

Example or an entry for static middleware to serve content from the `client` directory in the project's root:

```js
//...
"files": {
  "loopback#static": {
    "params": "$!../client"
  }
}
//...
```

Example or an entry for static middleware to serve content from the `multiple` directories in the project's root:

```js
//...
"files": {
  "loopback#static": [{
    "name": "x",
    "paths": ["/x"],
    "params": "$!../client/x"
  },
  {
    "name": "y",
    "paths": ["/y"],
    "params": "$!../client/y"
  }]
}
//...
```

#### Using variables in values

For any middleware configuration property, you can specify a variable in the value using the following syntax:

`${ <var> }`

Where `<var>` is a property of the [`app`](https://apidocs.loopback.io/loopback/#var-app-loopback) object. These properties include:

* [Application-wide properties](config.json.html#top-level-properties) such as those defined in `config.json`.
* [Express app object properties](http://expressjs.com/4x/api.html#app.settings.table).

For example, the following `middleware.json` configuration will load LoopBack's built-in rest middleware (loopback.rest)
during the routes phase at the path resolved by `app.get('restApiRoot')`, which defaults to `/api`.

```js
{
  "routes": {
    "loopback#rest": {
      "paths": ["${restApiRoot}"]
    }
  }
}
```

The following example loads hypothetical middleware named `environmental` during the routes phase at the return value of `app.get(env)`, typically either `/development` or `/production`.

```js
{
  "routes": {
    "environmental": {
      "paths": "${env}"
    }
  }
}
```

### Adding a custom phase

In addition to the predefined phases in `middleware.json`, you can add your own custom phase simply by adding a new top-level key.

For example, below is a `middleware.json` file defining a new phase "log" that comes after "parse" and before "routes":

{% include code-caption.html content="server/middleware.json" %}
```javascript
{
  ...
  "parse": {},
  "log": { ... },
  "routes": {}
  ...
}
```

### Environment-specific configuration

You can further customize configuration through `middleware.local.js`, `middleware.local.json`, and <code>middleware.<i>env</i>.js</code> or <code>middleware.<i>env</i>.json</code>,
where _`env`_ is the value of `NODE_ENV` environment variable (typically `development` or `production`).

See [Environment-specific configuration](Environment-specific-configuration.html) for more information.

## Registering middleware in JavaScript

You can register middleware in JavaScript code with: 

* LoopBack API; you can specify the phase in which you want the middleware to execute.
* Express API; the middleware is executed at the beginning of the `routes` phase.

### Using the LoopBack API

To register middleware with the LoopBack phases API, use the following `app` methods:

* [`middleware()`](http://apidocs.loopback.io/loopback/#app-middleware)`
* [`middlewareFromConfig()`](http://apidocs.loopback.io/loopback/#app-middlewarefromconfig)` 
* [`defineMiddlewarePhases()`](http://apidocs.loopback.io/loopback/#app-definemiddlewarephases)`

For example:

{% include code-caption.html content="server/server.js" %}
```javascript
var loopback = require('loopback');
var morgan = require('morgan');

var app = loopback();

app.middleware('routes:before', morgan('dev'));
app.middleware('routes', loopback.rest());
```

### Using the Express API

{% include important.html content="When you register middleware with the Express API, it is always executed at the beginning of the `routes` phase.
" %}

You can define middleware the "regular way" you do with Express in the main application script file, `/server/server.js` by calling 
[`app.use()`](http://expressjs.com/4x/api.html#app.use) to specify middleware for all HTTP requests to the specified route.
You can also use `app.get()` to specify middleware for only GET requests, `app.post()` to specify middleware for only POST requests, and so on.
For more information, see [app.METHOD](http://expressjs.com/4x/api.html#app.METHOD) in Express documentation.

Here is the general signature for `app.use()`:

```js
app.use([route], function([err,] req, res, next) {
  //...
  next();
});
```

As usual, [`app`](http://apidocs.loopback.io/loopback/#loopback) is the LoopBack application object: `app = loopback()`. 

The parameters are:

1.  _`route`_, an optional parameter that specifies the URI route or "mount path" to which the middleware is bound.
    When the application receives an HTTP request at this route, it calls (or _triggers_) the handler function.
    See [Specifying routes](#specifying-routes).
2.  The middleware handler function (or just "middleware function").
    See [Defining a new middleware handler function](#defining-a-new-middleware-handler-function).

For example:

{% include code-caption.html content="server/server.js" %}
```javascript
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);
// this middleware is invoked in the "routes" phase
app.use('/status', function(req, res, next) {
  res.json({ running: true });
});
```

#### Specifying routes

The _`route`_ parameter is a string that specifies the REST endpoint that will trigger the middleware.
If you don't provide the parameter, then the middleware will trigger on all routes.
In addition to a literal string, _`route`_ can be a path matching pattern, a regular expression, or an array including all these types.
For more information, see the [Express documentation for app.use()](http://expressjs.com/4x/api.html#app.use).

For example, to register middleware for all endpoints that start with "/greet":

{% include code-caption.html content="/server/server.js" %}
```javascript
app.use('/greet', function(req, res, next ) { 
  //...
});
```

{% include important.html content="The above middleware is triggered by all routes that begin with \"/greet\", so \"/greet/you\", \"greet/me/and/you\" will all trigger it..
" %}

To register middleware for _all_ endpoints:

{% include code-caption.html content="server/server.js or server/boot/scripts.js" %}
```javascript
app.use(function(req, res, next ) {
  //...
});
```

#### Caveats

There are some things to look out for when using middleware, mostly to do with middleware declaration order.
Be aware of the order of your middleware registration when using "catch-all" routes.

For example:

{% include code-caption.html content="server/server.js" %}
```javascript
//...
app.get('/', function(req, res, next) {
  res.send('hello from `get` route');
});
app.use(function(req, res, next) {
  console.log('hello world from "catch-all" route');
  next();
});
app.post('/', function(req, res, next) {
  res.send('hello from `post` route')
});
//...
```

In this case, since the `GET /` middleware ends the response chain, the "catch-all" middleware is never triggered when a get request is made.
However, when you make a POST request to /, the "catch-all" route is triggered because it is declared **before** the post route.
Doing a POST will show the console message from both the "catch-all" route and the `POST / `route.

## Default middleware

LoopBack (via strong-remoting) registers two error-handling middleware by default:

  * `urlNotFound`: A catch-all handler converting all requests that reach the middleware into an Error object with status 404, so that 404 error responses are consistent with "usual" error responses.
  * `errorHandler`: An instance of the [`strong-error-handler`](https://github.com/strongloop/strong-error-handler).

The presence of these middleware is controlled by configuration in [`config.json`](config.json.html).

Note: Scaffolded apps have strong-remoting's `errorHandler` disabled in favor of middleware.json config for `strong-error-handler`.

## Examples

### Static middleware

Example or an entry for static middleware to serve content from the `client` directory in the project's root:

```js
//...
"files": {
  "loopback#static": {
    "params": "$!../client"
  }
}
//...
```

### Pre-processing middleware

Use pre-processing middleware to apply custom logic for various endpoints in your application.
Do this by registering handler functions to perform certain operations when HTTP requests are made to specific endpoint or endpoints.

{% include important.html content="Always register pre-processing middleware in a phase before `routes`, for example `initial` or `parse`.
" %}

Pre-processing middleware must call `next()` at the end of the handler function to pass control to the next middleware.
If you don't do this, your application will essentially "freeze." Technically, `next()` doesn't have to occur at the end of the function
(for example, it could occur in an `if` /`else` block), but the handler function must call it eventually.

For example:

```js
module.exports = function() {
  return function tracker(req, res, next) {
    console.log('Request tracking middleware triggered on %s', req.url);
    var start = process.hrtime();
    res.once('finish', function() {
      var diff = process.hrtime(start);
      var ms = diff[0] * 1e3 + diff[1] * 1e-6;
      console.log('The request processing time is %d ms.', ms);
    });
    next();
  };
};
```

This middleware function tells the server to display the time it takes to process the incoming HTTP request on all application routes.

You can see this middleware in action in using the basic LoopBack application from Getting started with LoopBack (or any standard LoopBack application):

1.  Add the code above to `server/middleware/tracker.js`.
2.  Edit (or create) the file `server/middleware.json` and register the new middleware in the "initial" phase:

    **server/middleware.json**

    ```js
    {
      "initial": {
        "./middleware/tracker": {}
      }
    }
    ```

3.  Start the application:

    ```shell
    $ node .
    ```

4.  Load [http://localhost:3000/](http://localhost:3000/) in your browser.

In the console, you will see (for example):

```
...
Request tracking middleware triggered on /.
The request processing time is 4.281957 ms. //your results will vary
```

### Routing middleware

For routes serving JSON, best practice is to create a new model and implement the routes as [remote methods](Remote-methods.html).
For routes serving non-JSON responses, best practice is to define them the standard "Express way" in `server.js` or a boot script.
For more information, see [Routing](Routing.html) and [Routing (Express documentation)](http://expressjs.com/guide/routing.html).

{% include note.html content="If you add middleware on the `route` or `route:after` phase, it will not execute _after_ the route is matched.
Instead, it will be ignored because the route was already matched.
" %}

### Error-handling middleware

Use error-handling middleware to deal with request errors. The  [`strong-error-handler`](https://github.com/strongloop/strong-error-handler/) middleware is scaffolded by default and sufficient for many projects, but additional custom error-handling middleware may be registered as necessary.
While you are free to register any number of error-handling middleware, be sure to register them in the "final" phase.

Example of a custom error-handling middleware:

```js
module.exports = function() { 
  return function logError(err, req, res, next) { 
    console.log('ERR', req.url, err); 
  };
};
```

To register this middleware:

1.  Add the code above to `/server/middleware/log-error.js`.
2.  Edit `/server/middleware.json` and register the new middleware in the "final" phase: 

    ```js
    {
      "final": {
        "./middleware/log-error": {}
      }
    }
    ```

3.  Start the application.
4.  Load [http://localhost:3000/url-does-not-exist](http://localhost:3000/url-does-not-exist) in your browser.

Note: This middleware prints errors much like the `strong-error-handler` middleware. The `strong-error-handler` can be configured to not print errors by setting its [`log`](https://github.com/strongloop/strong-error-handler#log) parameter to `false`.
