---
title: "Upgrading applications to use phases"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Upgrading-applications-to-use-phases.html
summary:
---

## Introduction

LoopBack version 2.8 introduced middleware phases.  Before that, middleware was registered in `server/server.js`, for example:

```js
// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --

// boot scripts mount components like REST API
boot(app, __dirname);

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client')));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());
```

To upgrade your project to use middleware phases, you need to move the middleware configuration from `server/server.js` to `server/middleware.json`.

## Middleware added after boot

### Error handlers

Replace the line `app.use(loopback.errorHandler())` with the following entry in the JSON file:

```js
{
  "final:after": {
    "errorhandler": {}
  }
}
```

### 404 handler

Replace the line `app.use(loopback.urlNotFound())` with the following entry in the JSON file:

```js
{
  "final": {
    "loopback#urlNotFound": {}
  }
}
```

## Static middleware

Register middleware serving static assets (files) in the `files` phase. Prefix the relative path to assets with `$!` so the path is resolved relative to `middleware.json`.

For example, replace the following line in `server/server.js:`

`app.use(loopback.static(path.resolve(__dirname, '../client')));`

with this middleware entry:

```js
...
"files": {
  "loopback#static": {
    "params": "$!../client"
  }
},
...
```

## Other post-boot handlers

If your `server/server.js` file registers any other middleware after calling `boot(app, __dirname)`, you need to move that registration to `server/middleware.json`.  Insert a new phase just before `final` and register the middleware there.

## Middleware added before boot

The middleware registered **before** `boot(app, __dirname)` is usually pre-processing the requests.

LoopBack provides multiple phases for such middleware, you need to pick up the right phase for each of them.

*   `favicon` should be called as the very first middleware, even before request loggers. Register it in `initial:before` phase.

*   `compression` should be called very early in the middleware chain to enable response compression as soon as possible. Register it in `initial` phase.

*   `express-session` (a.k.a. `loopback.session()`) should be registered in `session` phase.

*   `loopback#token` (a.k.a. `loopback.token()`) belongs to `auth` phase.

*   `morgan` (a.k.a. `loopback.logger()`) should usually go to `initial` phase.

*   Request body parsers like `bodyParser#json` belong to `parse` phase.

## Middleware registered from boot scripts

Any middleware installed via `app.use(fn)` is added to the `routes` phase. Call`app.middleware(phase, fn)` to add the middleware to a different phase.

Example:

```js
module.exports = function(app) {
  app.middleware('initial', mylogger());
};
```

## Example of migrated files

After you have applied the steps outlined above to the example `server/server.js` listed at the beginning of this guide, you should end up with the following two files.

The main server script does not register any middleware, but just calls `boot()`:

**server/server.js**

```js
// boot scripts mount components like REST API
boot(app, __dirname);
```

All the middleware registration now occurs in `middleware.json`:

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
  "files": {
    "loopback#static": {
      "params": "$!../client"
    }
  },
  "final": {
    "loopback#urlNotFound": {}
  },
  "final:after": {
    "errorhandler": {}
  }
}
```
