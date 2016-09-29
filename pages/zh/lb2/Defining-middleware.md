---
title: "Defining middleware"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Defining-middleware.html
summary:
---

**See also**:

**See also:**

*   [Upgrading applications to use phases](/doc/{{page.lang}}/lb2/Upgrading-applications-to-use-phases.html)

## Overview

_Middleware_ refers to functions executed when HTTP requests are made to REST endpoints. Since LoopBack is based on [Express](http://expressjs.com/), LoopBack middleware is the same as [Express middleware](http://expressjs.com/api.html#middleware).  However, LoopBack adds the concept of _middleware phases_, to clearly define the order in which middleware is called.  Using phases helps to avoid ordering issues that can occur with standard Express middleware.

LoopBack supports the following types of middleware:

*   **Pre-processing middleware** for custom application logic. 
*   **Dynamic request handling middleware** to serve dynamically-generated responses, for example HTML pages rendered from templates and JSON responses to REST API requests.
*   **Static middleware** to serve static client-side assets.
*   **Error-handling middleware** to deal with request errors.  

### How to add middleware

To add middleware to your application:

1.  **Specify the middleware function**:

    1.  If using an existing function or package, add the code to your application or install the package. 
    2.  If you are creating a new middleware function, write it.  See [Defining a middleware handler function](/doc/{{page.lang}}/lb2/Defining-middleware.html).
2.  **Register the middleware**:
    *   Edit `server/middleware.json`.  This is the recommended way to register middleware.  See [Registering middleware in middleware.json](/doc/{{page.lang}}/lb2/Defining-middleware.html).
    *   Alternatively, register the middleware in application code.  See [Registering middleware in JavaScript](/doc/{{page.lang}}/lb2/Defining-middleware.html).

### Middleware phases

LoopBack defines a number of _phases_, corresponding to different aspects of application execution.  When you register middleware, you can specify the phase in which the application will call it. See [Registering middleware in middleware.json](/doc/{{page.lang}}/lb2/Defining-middleware.html) and [Using the LoopBack API](/doc/{{page.lang}}/lb2/Defining-middleware.html).  If you register middleware (or routes) with the Express API, then it is executed at the beginning of the `routes` phase.

The predefined phases are:

1.  **`initial`** - The first point at which middleware can run.
2.  **`session`** - Prepare the session object.
3.  **`auth`** - Handle authentication and authorization.
4.  **`parse`** - Parse the request body.
5.  **`routes`** - HTTP routes implementing your application logic.  Middleware registered via the Express API `app.use`, `app.route`, `app.get` (and other HTTP verbs) runs at the beginning of this phase.  Use this phase also for sub-apps like `loopback/server/middleware/rest` or `loopback-explorer`.

6.  **`files`** - Serve static assets (requests are hitting the file system here).

7.  **`final`** - Deal with errors and requests for unknown URLs.

Each phase has "before" and "after" subphases in addition to the main phase, encoded following the phase name, separated by a colon. For example, for the "initial" phase, middleware executes in this order:

1.  `initial:before `
2.  `initial`
3.  `initial:after`

Middleware within a single subphase executes in the order in which it is registered. However, you should not rely on such order. Always explicitly order the middleware using appropriate phases when order matters.

## Specifying a middleware function

### Using built-in middleware

LoopBack provides convenience middleware for commonly-used Express/Connect middleware, as described in the following table.  

When you use this middleware, you don't have to write any code or install any packages; you just specify in which phase you want it to be called; see [Registering middleware in middleware.json](/doc/{{page.lang}}/lb2/Defining-middleware.html).

<table>
  <thead>
    <tr>
      <th>Middleware ID</th>
      <th>Code accessor</th>
      <th>External package</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>loopback#favicon</code></td>
      <td><code>loopback.favicon()</code></td>
      <td><a href="https://github.com/expressjs/serve-favicon" class="external-link" rel="nofollow">serve-favicon</a></td>
    </tr>
    <tr>
      <td><code>loopback#rest</code></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#loopback-rest" class="external-link" rel="nofollow">loopback.rest()</a></code></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code>loopback#static</code></td>
      <td><code>loopback.static()</code></td>
      <td><a href="https://github.com/expressjs/serve-static" class="external-link" rel="nofollow">serve-static</a></td>
    </tr>
    <tr>
      <td><code>loopback#status</code></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#loopback-status" class="external-link" rel="nofollow">loopback.status()</a></code></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code>loopback#token</code></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#loopback-token" class="external-link" rel="nofollow">loopback.token()</a></code></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code>loopback#urlNotFound</code></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#loopback-urlNotFound" class="external-link" rel="nofollow">loopback.urlNotFound()</a></code></td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

To simplify migration from LoopBack 1.x and Express 3.x, LoopBack provides middleware that was built-in to in Express 3.x, as shown in the following table.  Best practice is to load this middleware directly via `require()` and not rely on LoopBack's compatibility layer.

<div class="sl-hidden">
  <p>&nbsp;</p>
  <div class="table-wrap">
    <table>
      <tbody>
        <tr>
          <th>
            <div class="tablesorter-header-inner">LoopBack middleware</div>
          </th>
          <th>
            <div class="tablesorter-header-inner">Express/Connect middleware</div>
          </th>
        </tr>
        <tr>
          <td>loopback.body-parser()</td>
          <td><a class="external-link" href="https://github.com/expressjs/body-parser" rel="nofollow">body-parser</a>&nbsp;</td>
        </tr>
        <tr>
          <td>loopback.compress()</td>
          <td><a class="external-link" href="https://github.com/expressjs/compression" rel="nofollow">compression</a></td>
        </tr>
        <tr>
          <td>loopback.timeout()</td>
          <td><a class="external-link" href="https://github.com/expressjs/timeout" rel="nofollow">connect-timeout</a>&nbsp;</td>
        </tr>
        <tr>
          <td>loopback.cookieParser()</td>
          <td><a class="external-link" href="https://github.com/expressjs/cookie-parser" rel="nofollow">cookie-parser</a></td>
        </tr>
        <tr>
          <td>loopback.cookieSession()</td>
          <td><a class="external-link" href="https://github.com/expressjs/cookie-session" rel="nofollow">cookie-session</a></td>
        </tr>
        <tr>
          <td>loopback.csrf()</td>
          <td><a class="external-link" href="https://github.com/expressjs/csurf" rel="nofollow">csurf</a></td>
        </tr>
        <tr>
          <td>loopback.errorHandler()</td>
          <td><a class="external-link" href="https://github.com/expressjs/errorhandler" rel="nofollow">errorhandler</a></td>
        </tr>
        <tr>
          <td>loopback.session()</td>
          <td><a class="external-link" href="https://github.com/expressjs/session" rel="nofollow">express-session</a>&nbsp;</td>
        </tr>
        <tr>
          <td>loopback.methodOverride()</td>
          <td><a class="external-link" href="https://github.com/expressjs/method-override" rel="nofollow">method-override</a></td>
        </tr>
        <tr>
          <td>loopback.logger()</td>
          <td><a class="external-link" href="https://github.com/expressjs/morgan" rel="nofollow">morgan</a></td>
        </tr>
        <tr>
          <td>loopback.responseTime()</td>
          <td><a class="external-link" href="https://github.com/expressjs/response-time" rel="nofollow">response-time</a></td>
        </tr>
        <tr>
          <td>loopback.directory()</td>
          <td><a class="external-link" href="https://github.com/expressjs/serve-index" rel="nofollow">serve-index</a></td>
        </tr>
        <tr>
          <td>loopback.vhost()</td>
          <td><a class="external-link" href="https://github.com/expressjs/vhost" rel="nofollow">vhost</a></td>
        </tr>
      </tbody>
    </table>
  </div>&nbsp;
  <p></p>
  <div>
    <h3 class="confluenceTable" id="Definingmiddleware-Usingothermiddleware">Using other middleware</h3></div>
</div>

You can use any middleware compatible with Express; see [Express documentation](http://expressjs.com/resources/middleware.html) for a partial list.  Simply install it:

`npm install --save <module-name>`

Then simply register it so that it is called as needed; see [Registering middleware in middleware.json](/doc/{{page.lang}}/lb2/Defining-middleware.html) and  [Registering middleware in JavaScript](/doc/{{page.lang}}/lb2/Defining-middleware.html).

### Defining a new middleware handler function

If no existing middleware does what you need, you can easily write your own middleware handler function.  To register the middleware function in `middleware.json`, you need to create a constructor (factory) function that returns the middleware function.

By convention, place middleware functions in the `server/middleware` directory.

A middleware handler function accepts three arguments, or four arguments if it is error-handling middleware.  The general form is:

`function myMiddlewareFunc([err,] req, res, next) { ... };`

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Optional?</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>err</td>
      <td>Object</td>
      <td>Required for error-handling middleware.</td>
      <td>
        <p>Use <em>only</em> for error-handling middleware.</p>
        <p>Error object, usually an instance or <code>Error</code>; for more information, see <a href="/doc/{{page.lang}}/lb2/Error-object.html">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td>req</td>
      <td>Object</td>
      <td>No</td>
      <td>
        <p>The Express <a href="http://expressjs.com/4x/api.html#request" class="external-link" rel="nofollow">request object</a>.</p>
      </td>
    </tr>
    <tr>
      <td>res</td>
      <td>Object</td>
      <td>No</td>
      <td>
        <p>The Express <a href="http://expressjs.com/4x/api.html#response" class="external-link" rel="nofollow">response object</a>.</p>
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

**Regular middleware**

```
return function myMiddleware(req, res, next) {
    // ...
}
```

Here is a constructor (factory) for this function; use this form when registering it in `middleware.json`:

**Regular middleware**

```js
module.exports = function() {
  return function myMiddleware(req, res, next) {
    // ...
  }
}
```

An example a middleware function with four arguments, called only when an error was encountered.

**Error handler middleware**

```js
function myErrorHandler(err, req, res, next) {
  // ...
}
```

### Packaging a middleware function

To share middleware across multiple projects, create a package that exports a middleware constructor (factory) function that accepts configuration options and returns a middleware handler function; for example, as shown below.

If you have an existing project created via `slc loopback`, to implement a new middleware handler that you can share with other projects, place the file with the middleware constructor in the `server/middleware` directory, for example, `server/middleware/myhandler.js`.

```
module.exports = function(options) {
  return function customHandler(req, res, next) {
    // use options to control handler's b behavior  }
};
```

## Registering middleware in middleware.json

The easiest way to register middleware is in `server/middleware.json`.  This file specifies all an application's middleware functions and the phase in which they are called.

When you create an application using the `slc loopback` [application generator](/doc/{{page.lang}}/lb2/Application-generator.html), it creates a default `middleware.json` file that looks as follows:

**server/middleware.json**

```js
{
  "initial:before": {
    "loopback#favicon": {}
  },
  "initial": {
    "compression": {}
  },
  "session": {},
  "auth": {},
  "parse": {},
  "routes": {},
  "files": {},
  "final": {
    "loopback#urlNotFound": {}
  },
  "final:after": {
    "errorhandler": {}
  }
}
```

Each top-level key in `middleware.json` defines a middleware phase or sub-phase, for example "initial", "session:before", or "final".  Phases run in the order they occur in the file.

Each phase is a JSON object containing a key for each middleware function to be called in that phase.  For example, "loopback/server/middleware/favicon" or "compression".

In general, each phase has the following syntax:

```
_phase_[:_sub-phase_] : {
_middlewarePath_ : {
[ enabled: [true | false], ][ params : _paramSpec_, ]
[ paths : _routeSpec_ ]}
}
```Where:

*   _phase_ is one of the predefined phases listed above (initial, session, auth, and so on) or a custom phase; see [Adding a custom phase](/doc/{{page.lang}}/lb2/Defining-middleware.html).
*   _sub-phase_ (optional) can be `before` or `after`.
*   _middlewarePath_ specifies the path to the middleware function, as described below.

The optional [middleware configuration properties](/doc/{{page.lang}}/lb2/Defining-middleware.html) are described below.

### Path to middleware function

Specify the path to the middleware function (_middlewarePath)_ in the following ways:

*   For an external middleware module installed in the project, just use the name of the module; for example `compression`.  See [Using other middleware](/doc/{{page.lang}}/lb2/Defining-middleware.html).

*   For a script in a module installed in the project, use the path to the module; for example `loopback/server/middleware/rest`.

*   For a script with a custom middleware function, use the path relative to `middleware.json`, for example `./middleware/custom`.

*   Absolute path to the script file (not recommended).

Additionally, you can use the shorthand format `{_module_}#{_fragment_}`, where _fragment_ is:

*   A property exported by _module_, for example `loopback#favicon` is resolved to `require('loopback').favicon`.

*   A file in _module's_ `server/middleware` directory, for example `require('loopback/server/middleware/favicon')`

*   A file in _modules_' `middleware` directory, for example `require('loopback/middleware/favicon')`

### Middleware configuration properties

 You can specify the following properties in each middleware section.  They are all optional:

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
    <tr>
      <td>enabled</td>
      <td>Boolean</td>
      <td>
        <p>Whether to register or enable the middleware. You can override this property in environment-specific files, for example to disable certain middleware when running in production. For more information, see <a href="/doc/{{page.lang}}/lb2/Defining-middleware.html">Environment-specific configuration</a></p>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>params</td>
      <td>Object or Array</td>
      <td>
        <p>Parameters to pass to the middleware handler (constructor) function. Most middleware constructors take a single "options" object parameter; in that case the&nbsp;<code>params</code>&nbsp;value is that object.</p>
        <p>To specify a project-relative path (for example, to a directory containing static assets), start the string with the prefix&nbsp;<code>$!</code>. Such values are interpreted as paths relative to the file&nbsp;<code>middleware.json</code>. &nbsp;</p>
        <p>See examples below.</p>
      </td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>path</td>
      <td>String</td>
      <td>Specifies the REST endpoint that triggers the middleware. In addition to a literal string, route can be a path matching pattern, a regular expression, or an array including all these types. For more information, see the&nbsp;<a href="http://expressjs.com/4x/api.html#app.use"
          class="external-link" rel="nofollow">app.use (Express documentation)</a>.&nbsp;</td>
      <td>Triggers on all routes</td>
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
...
"files": {
  "loopback#static": {
    "params": "$!../client"
  }
}
...
```

### Adding a custom phase

In addition to the predefined phases in `middleware.json`, you can add your own custom phase simply by adding a new top-level key.

For example, below is a `middleware.json` file defining a new phase "log" that comes after "parse" and before "routes":

**server/middleware.json**

```js
{
  ...
  "parse": {},
  "log": {...
  },
  "routes": {}
  ...
}
```

### Environment-specific configuration

You can further customize configuration through `middleware.local.js`, `middleware.local.``json`, and `middleware._env_.js` or `middleware._env_.json`, where _`env`_ is the value of `NODE_ENV` environment variable (typically `development` or `production`).

See [Environment-specific configuration](/doc/{{page.lang}}/lb2/Environment-specific-configuration.html) for more information.

## Registering middleware in JavaScript

You can register middleware in JavaScript code with: 

*   LoopBack API; you can specify the phase in which you want the middleware to execute.
*   Express API; the middleware is executed at the beginning of the `routes` phase.

### Using the LoopBack API

To register middleware with the LoopBack phases API, use the following `app` methods:

*   [`middleware()`](http://apidocs.strongloop.com/loopback/#app-middleware)
*   [`middlewareFromConfig()`](http://apidocs.strongloop.com/loopback/#app-middlewarefromconfig) 
*   [`defineMiddlewarePhases()`](http://apidocs.strongloop.com/loopback/#app-definemiddlewarephases)

For example:

**server/server.js**

```js
var loopback = require('loopback');
var morgan = require('morgan');
var errorhandler = require('error-handler');

var app = loopback();

app.middleware('routes:before', morgan('dev'));
app.middleware('final', errorhandler());
app.middleware('routes', loopback.rest());
```

### Using the Express API

{% include important.html content="

When you register middleware with the Express API, it is always executed at the beginning of the `routes` phase.

" %}

You can define middleware the "regular way" you do with Express in the main application script file, `/server/server.js` by calling [`app.use()`](http://expressjs.com/4x/api.html#app.use) to specify middleware for all HTTP requests to the specified route; You can also use `app.get()` to specify middleware for only GET requests, `app.post()` to specify middleware for only POST requests, and so on.  For more information, see [app.METHOD](http://expressjs.com/4x/api.html#app.METHOD) in Express documentation.

Here is the general signature for `app.use()`:

``app.use([_route_], function([err,] req, res, next) { ... next(); });``As usual, [`app`](http://apidocs.strongloop.com/loopback/#loopback) is the LoopBack application object: `app = loopback()`. 

The parameters are:

1.  _`route`_, an optional parameter that specifies the URI route or "mount path" to which the middleware is bound.  When the application receives an HTTP request at this route, it calls (or _triggers_) the handler function.  See [Specifying routes](/doc/{{page.lang}}/lb2/Defining-middleware.html).
2.  The middleware handler function (or just "middleware function").  See [Defining a new middleware handler function](/doc/{{page.lang}}/lb2/Defining-middleware.html).

For example:

**server/server.js**

```js
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);
// this middleware is invoked in the "routes" phase
app.use('/status', function(req, res, next) {
  res.json({
    running: true
  });
});
```

#### Specifying routes

The `_route_` parameter is a string that specifies the REST endpoint that will trigger the middleware.  If you don't provide the parameter, then the middleware will trigger on all routes.  In addition to a literal string, `_route_` can be a path matching pattern, a regular expression, or an array including all these types.  For more information, see the [Express documentation for app.use()](http://expressjs.com/4x/api.html#app.use).

For example, to register middleware for all endpoints that start with "/greet":

**/server/server.js**

```
app.use('/greet', function(req, res, next ) { 
  ... 
})
```

{% include important.html content="

The above middleware is triggered by all routes that begin with \"/greet\", so \"/greet/you\", \"greet/me/and/you\" will all trigger it..

" %}

To register middleware for _all_ endpoints:

**server/server.js or server/boot/scripts.js**

```
app.use(function(req, res, next ) {
  ...
})
```

#### Caveats

There are some things to look out for when using middleware, mostly to do with middleware declaration order.  Be aware of the order of your middleware registration when using "catch-all" routes.  For example:

**server/server.js**

```
...
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
...
```

In this case, since the `GET /` middleware ends the response chain, the "catch-all" middleware is never triggered when a get request is made. However, when you make a POST request to /, the "catch-all" route is triggered because it is declared **before** the post route. Doing a POST will show the console message from both the "catch-all" route and the `POST / `route.

## Examples

### Static middleware

Example or an entry for static middleware to serve content from the `client` directory in the project's root:

**server/middleware.json**

```js
...
"files": {
  "loopback#static": {
    "params": "$!../client"
  }
}
...
```

<div class="sl-hidden">
  <h3 id="Definingmiddleware-Pre-processingmiddleware">Pre-processing middleware</h3>
  <p>Use pre-processing middleware to apply custom logic for various endpoints in your application. Do this by registering handler functions to perform certain operations when HTTP requests are made to specific endpoint or endpoints.</p>
  <div class="aui-message warning shadowed information-macro"><span class="aui-icon icon-warning">Icon</span>
    <div class="message-content">Always register pre-processing middleware in a phase before&nbsp;<code>routes</code>, for example&nbsp;<code>initial</code>&nbsp;or&nbsp;<code>parse</code>.</div>
  </div>Pre-processing middleware must call&nbsp;<code>next()</code>&nbsp;at the end of the handler function to pass control to the next middleware. If you don't do this, your application will essentially "freeze." Technically,&nbsp;<code>next()</code>&nbsp;doesn't
  have to occur at the end of the function (for example, it could occur in an&nbsp;<code>if</code>&nbsp;/<code>else</code>&nbsp;block), but the handler function must call it eventually.
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">module.exports = function() {
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
};</pre></div>
  </div><br>
  <div class="highlight highlight-js">This middleware tells the server to display the time it takes to process the incoming HTTP request on all application routes.</div>You can see this middleware in action in using the basic LoopBack application from Getting started with LoopBack (or any
  standard LoopBack application):
  <ol class="task-list">
    <li>Add the code above to&nbsp;<code>/server/middleware/tracker.js</code>.</li>
    <li>
      <p>Edit (or create) the file&nbsp;<code>/server/middleware.json</code>&nbsp;and register the new middleware in the "initial" phase:</p>
      <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  "initial": {
    "./middleware/tracker": {}
  }
}</pre></div>
      </div>
    </li>
    <li>Start the application with&nbsp;<code>slc run</code>.</li>
    <li>Load&nbsp;<a href="http://localhost:3000/" class="external-link" rel="nofollow">http://localhost:3000/</a>&nbsp;in your browser.</li>
  </ol>In the console, you will see (for example):
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">...
Request tracking middleware triggered on /.
The request processing time is 4.281957 ms. //your results will vary</pre></div>
  </div>
  <p>
    <a class="external-link" href="https://gist.github.com/bajtos/e7eaba736ff096916b71#error-handling-middleware" name="user-content-error-handling-middleware" rel="nofollow"></a>
  </p>
  <h3 id="Definingmiddleware-Routingmiddleware">Routing middleware</h3>
  <p>You can register routes in <code>middleware.json</code>, but standard practice is to do so in <code>server.js</code> or a boot script, as you do with Express. &nbsp;For more information, see&nbsp;<a href="/doc/{{page.lang}}/lb2/Defining-middleware.html">Using the Express API</a>.</p>
  <p>Error-handling middleware</p>
  <p>Use error-handling middleware to deal with request errors. While you are free to register any number of error-handling middleware, be sure to register them in the "final" phase.LoopBack registers two error-handling middleware by default:</p>
  <ul>
    <li>
      <p><code>urlNotFound</code>&nbsp;middleware converts all requests that reach the middleware into an Error object with status 404, so that 404 error responses are consistent with "usual" error responses.</p>
    </li>
    <li>
      <p><code>errorhandler</code>&nbsp;middleware is from the&nbsp;<a href="https://github.com/expressjs/errorhandler" class="external-link" rel="nofollow">errorhandler</a>&nbsp;module, previously available in Express v.3 as&nbsp;<code>express.errorHandler</code>.</p>
    </li>
  </ul>
  <p>Example of a custom error processing middleware:</p>
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">module.exports = function() { return function logError(err, req, res, next) { console.log('ERR', req.url, err); }; };</pre></div>
  </div><pre>&nbsp;</pre>
  <ol class="task-list">
    <li>
      <p>Add the code above to&nbsp;<code>/server/middleware/log-error.js</code>.</p>
    </li>
    <li>
      <p>Edit&nbsp;<code>/server/middleware.json</code>&nbsp;and register the new middleware in the "final" phase:&nbsp;</p>
      <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{ "final": { "./middleware/log-error": {} } }</pre></div>
      </div>
    </li>
    <li>
      <p>Start the application with <code>slc run</code>.</p>
    </li>
    <li>
      <p>Load&nbsp;<a href="http://localhost:3000/url-does-not-exist" class="external-link" rel="nofollow">http://localhost:3000/url-does-not-exist</a>&nbsp;in your browser.</p>
    </li>
  </ol>
</div>
