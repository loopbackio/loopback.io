---
title: "Using current context"
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

## Configure context propagation

LoopBack context is now enabled by default for REST APIs via `loopback.rest()` middleware.
Configure it in `server/config.json` as follows:

```javascript
"remoting": {
  "context": {
    "enableHttpContext": false
  },
  ...
}
```

{% include important.html content="

By default, the HTTP req/res objects are not set onto the current context.
You need to set `enableHttpContext` to true to enable automatic population of req/res objects.

" %}

## Use the current context

Once you've enabled context propagation, you can access the current context object using `loopback.getCurrentContext()`.
The context should be available in middleware (those come after the context middleware), remoting hooks, model hooks, and custom methods.

```javascript
MyModel.myMethod = function(cb) {
  var ctx = loopback.getCurrentContext();
  // Get the current access token
  var accessToken = ctx.get('accessToken');
  ...
  // Set more information on current context
  ctx.set('foo', { bar: 'val' } );

  ...
}
```

## Use current authenticated user in remote methods

The `loopback.context()` has been added to `loopback.rest()` to ensure that all REST applications have the context available, even if they don't add the middleware explicitly.
In advanced use cases, for example when you want to add custom middleware, you have to add the context middleware at
the right position in the middleware chain (before the middleware that depends on `loopback.getCurrentContext`).

{% include important.html content="

`loopback.context()` detects the situation when it is invoked multiple times on the same request and returns immediately in subsequent runs.

" %}

Here's sample code which uses a middleware function to place the currently authenticated user into the context so that remote methods may use it:

**/server/server.js**

```javascript
...
// -- Add your pre-processing middleware here --
app.use(loopback.context());
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
    var loopbackContext = loopback.getCurrentContext();
    if (loopbackContext) {
      loopbackContext.set('currentUser', user);
    }
    next();
  });
});

// boot scripts mount components like REST API
...
```

**/common/models/YourModel.js**

```javascript
var loopback = require('loopback');
module.exports = function(YourModel) {
  ...
  //remote method
  YourModel.someRemoteMethod = function(arg1, arg2, cb) {
    var ctx = loopback.getCurrentContext();
    var currentUser = ctx && ctx.get('currentUser');
    console.log('currentUser.username: ', currentUser.username); // voila!
    ...
    cb(null);
  };
  ...
};
```