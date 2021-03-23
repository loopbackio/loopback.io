---
title: "Using current context"
redirect_from: /doc/en/lb2/Using%20current%20context.html
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Using-current-context.html
summary:
---

**See also**: [Example in LoopBack repository](https://github.com/strongloop/loopback/blob/master/example/context/app.js).

LoopBack applications sometimes need to access context information to implement the business logic, for example to:

* Access the currently logged-in user.
* Access the HTTP request (such as URL and headers).

A typical request to invoke a LoopBack model method travels through multiple layers with chains of asynchronous callbacks.
It's not always possible to pass all the information through method parameters. 

{% include warning.html content="Using the current context feature is not recommended!

The current implementation of loopback-context is based on the module [continuation-local-storage](https://www.npmjs.com/package/continuation-local-storage) 
which is known to have many problems, (for example, see [issue #59](https://github.com/othiym23/node-continuation-local-storage/issues/59)).
As a result, loopback-context does not work in many situations, as can be seen from issues reported in LoopBack's
[issue tracker](https://github.com/strongloop/loopback/issues?utf8=%E2%9C%93&q=is%3Aissue%20getCurrentContext).

See [loopback issue #1495](https://github.com/strongloop/loopback/issues/1495) updates and an alternative solution.
" %}

## Fixing deprecation warnings

All context-related LoopBack APIs are deprecated starting with version 2.30.0.
After upgrading an existing application to a recent LoopBack version, you will see the following deprecation warning:

```
loopback deprecated loopback#context middleware is deprecated.
See https://docs.strongloop.com/display/APIC/Using%20current%20context for more details.
node_modules/loopback/server/middleware/rest.js:60:32
```

To remove this warning, disable the context middleware added by the built-in REST handler. Set the `remoting.context` property in `server/config.json` to **false**; for example:

{% include code-caption.html content="server/config.json" %}
```javascript
{
  "remoting": {
    "context": false,
    // etc.
  },
  // etc.
}
```

If your application relies on `loopback.getCurrentContext`, then you should rework your code to use `loopback-context` directly, per the following instructions.

## Install loopback-context

Add `loopback-context` to your project dependencies

`$ npm install --save loopback-context`

## Configure context propagation

To setup your LoopBack application to create a new context for each incoming HTTP request, configure `per-context` middleware in your `server/middleware.json` as follows:

```javascript
{
  "initial": {
    "loopback-context#per-request": {},
  }
  ...
}
```

{% include important.html content="

By default, the HTTP req/res objects are not set onto the current context.
You need to set `enableHttpContext` to true to enable automatic population of req/res objects.

" %}

## Use the current context

Once you've enabled context propagation, you can access the current context object using `LoopBackContext.getCurrentContext()`.
The context will be available in middleware (if it is loaded after the context middleware), remoting hooks, model hooks, and custom methods.

```javascript
var LoopBackContext = require('loopback-context');

MyModel.myMethod = function(cb) {
  var ctx = LoopBackContext.getCurrentContext();
  // Get the current access token
  var accessToken = ctx && ctx.get('accessToken');
  ...
  // Set more information on current context
  ctx.set('foo', { bar: 'val' } );

  ...
}
```

## Use current authenticated user in remote methods

In advanced use cases, for example when you want to add custom middleware, you have to add the context middleware
at the right position in the middleware chain (before the middleware that depends on `LoopBackContext.getCurrentContext`).

{% include important.html content="

`LoopBackContext.perRequest()` detects the situation when it is invoked multiple times on the same request and returns immediately in subsequent runs.

" %}

Here's sample code which uses a middleware function to place the currently authenticated user into the context so that remote methods may use it:

{% include code-caption.html content="/server/server.js" %}
```javascript
...
// -- Add your pre-processing middleware here --
app.use(LoopBackContext.perRequest());
app.use(loopback.token());
app.use(function setCurrentUser(req, res, next) {
  if (!req.accessToken) {
    return next();
  }
  app.models.UserModel.findById(req.accessToken.userId, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('No user with this access token was found.'));
    }
    var loopbackContext = LoopBackContext.getCurrentContext();
    if (loopbackContext) {
      loopbackContext.set('currentUser', user);
    }
    next();
  });
});

// boot scripts mount components like REST API
...
```

{% include code-caption.html content="/common/models/YourModel.js" %}
```javascript
var loopback = require('loopback');
var LoopBackContext = require('loopback-context');
module.exports = function(YourModel) {
  ...
  //remote method
  YourModel.someRemoteMethod = function(arg1, arg2, cb) {
    var ctx = LoopBackContext.getCurrentContext();
    var currentUser = ctx && ctx.get('currentUser');
    console.log('currentUser.username: ', currentUser.username); // voila!
    ...
    cb(null);
  };
  ...
};
```
