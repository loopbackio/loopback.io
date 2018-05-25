---
title: "Remote hooks"
lang: en
layout: navgroup
navgroup: app-logic
keywords: LoopBack
tags: application_logic
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Remote-hooks.html
summary:
---
## Overview

LoopBack provides two kinds of hooks:

* **Remote hooks**, that execute before or after calling a remote method, either a custom [remote method](Remote-methods.html) 
  or a standard create, retrieve, update, and delete method inherited from [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel).
  See [PersistedModel REST API](PersistedModel-REST-API.html) for information on how the Node methods correspond to REST operations.
* **[Operation hooks](Operation-hooks.html)** that execute when models perform create, retrieve, update, and delete operations.
  **NOTE**: Operation hooks replace deprecated model hooks.

A _remote hook_ enables you to execute a function before or after a remote method is called by a client:

* `beforeRemote()` runs before the remote method.
* `afterRemote()` runs after the remote method has finished successfully.
* `afterRemoteError()` runs after the remote method has finished with an error.

{% include tip.html content="

Use beforeRemote hooks to validate and sanitize inputs to a remote method.
Because a beforeRemote hook runs _before_ the remote method is executed, it can access the inputs to the remote method, but not the result.

Use afterRemote hooks to modify, log, or otherwise use the results of a remote method before sending it to a remote client.
Because an afterRemote hook runs _after_ the remote method is executed, it can access the result of the remote method, but cannot modify the input arguments.

" %}

### Signature

Both `beforeRemote()` and `afterRemote()` have the same signature; below syntax uses beforeRemote but afterRemote is the same.

For static custom remote methods:

```javascript
_modelName_.beforeRemote( _methodName_, function( ctx, next) {
    //...
    next();
});
```

Instance methods and static built-in methods such as [`upsert()`](http://apidocs.strongloop.com/loopback/#persistedmodel-upsert) or 
[`create()`](http://apidocs.strongloop.com/loopback/#persistedmodel-create) require a third argument in the callback:

```javascript
_modelName_.beforeRemote( _methodName_, function( ctx, _modelInstance_, next) {
    //...
    next();
});
```

The hook `afterRemoteError()` has a slightly different signature: The handler function has only two arguments:

```javascript
_modelName_.afterRemoteError( _methodName_, function( ctx, next) {
    //...
    next();
});
```

Where:

* `_modelName_` is the name of the model to which the remote hook is attached.
* `_methodName_` is the name of the method that triggers the remote hook. This may be a custom [remote method](Remote-methods.html)
  or a standard create, retrieve, update, and delete method inherited from [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel).
  It may include wildcards to match more than one method (see below).
* `ctx` is the [context object](#context-object). 
* `_modelInstance_` is the affected model instance.

The syntax above includes a call to `next()` as a reminder that you must call `next()` at some point in the remote hook callback function.
It doesn't necessarily have to come at the end of the function, but must be called at some point before the function completes.

### Using async/await

Remote hooks can also return a promise instead of using the next parameter

```javascript
_modelName_.afterRemoteError( _methodName_, async function( ctx) {
    //...
    return;
});
```

#### Wildcards

You can use the following wildcard characters in `_methodName_`:

* Asterisk `'*'` to match any character, up to the first occurrence of the delimiter character `'.'` (period).
* Double-asterisk to match any character, including the delimiter character `'.'` (period).

For example, use `'*.*'` to match any static method; use `'prototype.*'` to match any instance method.

## Examples

The following example defines beforeRemote and afterRemote hooks for the `revEngine()` remote method:

{% include code-caption.html content="common/models/car.js" %}
```javascript
module.exports = function(Car) {
  // remote method
  Car.revEngine = function(sound, cb) {
    cb(null, sound - ' ' - sound - ' ' - sound);
  };
  Car.remoteMethod(
    'revEngine',
    {
      accepts: [{arg: 'sound', type: 'string'}],
      returns: {arg: 'engineSound', type: 'string'},
      http: {path:'/rev-engine', verb: 'post'}
    }
  );
  // remote method before hook
  Car.beforeRemote('revEngine', function(context, unused, next) {
    console.log('Putting in the car key, starting the engine.');
    next();
  });
  // remote method after hook
  Car.afterRemote('revEngine', function(context, remoteMethodOutput, next) {
    console.log('Turning off the engine, removing the key.');
    next();
  });
...
}
```

The following example uses wildcards in the remote method name. This remote hook is called whenever any remote method whose name ends with "save" is executed:

{% include code-caption.html content="common/models/customer.js" %}
```javascript
Customer.beforeRemote('*.save', function(ctx, unused, next) {
  if(ctx.req.accessToken) {
    next();
  } else {
    next(new Error('must be logged in to update'))
  }
});

Customer.afterRemote('*.save', function(ctx, user, next) {
  console.log('user has been saved', user);
  next();
});
```

{% include important.html content="

The second argument to the hook (`user` in the above example) is the `ctx.result` which is not always available.

" %}

Below are more examples of remote hooks with wildcards to run a function before any remote method is called.

{% include code-caption.html content="common/models/customer.js" %}
```javascript
// ** will match both prototype.* and *.*
Customer.beforeRemote('**', function(ctx, user, next) {
  console.log(ctx.methodString, 'was invoked remotely'); // customers.prototype.save was invoked remotely
  next();
});

Other wildcard examples
// run before any static method eg. User.find
Customer.beforeRemote('*', ...);

// run before any instance method eg. User.prototype.save
Customer.beforeRemote('prototype.*', ...);

// prevent password hashes from being sent to clients
Customer.afterRemote('**', function (ctx, user, next) {
  if(ctx.result) {
    if(Array.isArray(ctx.result)) {
      ctx.result.forEach(function (result) {
        delete result.password;
      });
    } else {
      delete ctx.result.password;
    }
  }

  next();
});
```

A safer means of effectively white-listing the fields to be returned by copying the values into new objects:

{% include code-caption.html content="common/models/account.js" %}
```javascript
var WHITE_LIST_FIELDS = ['account_id', 'account_name'];

Account.afterRemote('**', function(ctx, modelInstance, next) {
  if (ctx.result) {
    if (Array.isArray(modelInstance)) {
      var answer = [];
      ctx.result.forEach(function (result) {
        var replacement ={};
        WHITE_LIST_FIELDS.forEach(function(field) {
          replacement[field] = result[field];
        });
        answer.push(replacement);
      });
    } else {
      var answer ={};
      WHITE_LIST_FIELDS.forEach(function(field) {
        answer[field] = ctx.result[field];
      });
    }
    ctx.result = answer;
  }
  next();
});
```

### Examples of afterRemoteError

Perform an additional action when the instance method `speak()` fails:

{% include code-caption.html content="common/models/dog.js" %}
```javascript
Dog.afterRemoteError('prototype.speak', function(ctx, next) {
  console.log('Cannot speak!', ctx.error);
  next();
});
```

Attach extra metadata to error objects:

{% include code-caption.html content="common/models/dog.js" %}
```javascript
Dog.afterRemoteError('**', function(ctx, next) {
  if (!ctx.error.details) ctx.error.details = {};
  ctx.error.details.info = 'intercepted by a hook';
  next();
})
```

Report a different error back to the caller:

{% include code-caption.html content="common/models/dog.js" %}
```javascript
Dog.afterRemoteError('prototype.speak', function(ctx, next) {
  console.error(ctx.error);
  next(new Error('See server console log for details.'));
});
```

## Context object

Remote hooks are provided with a Context `ctx` object that contains transport-specific data (for HTTP: `req` and `res`). The `ctx` object also has a set of consistent APIs across transports.

Applications that use [loopback.rest()](https://apidocs.strongloop.com/loopback/#loopback-rest) middleware provide the following additional `ctx` properties:

* `ctx.req`: Express [Request](http://expressjs.com/api.html#req) object. 

* `ctx.res`: Express [Response](http://expressjs.com/api.html#res) object.

The context object passed to `afterRemoteError()` hooks has an additional property `ctx.error` set to the Error reported by the remote method.

Other properties:

* `ctx.args` - Object containing the HTTP request argument definitions. Uses the arg definition to find the value from the request. These are the input values to the remote method.
* `ctx.result` - An object keyed by the argument names.
  Exception: If the root property is true, then it's the value of the argument that has root set to true. 

### ctx.req.accessToken

The `accessToken` of the user calling the remote method.

{% include important.html content="

`ctx.req.accessToken` is undefined if the remote method is not invoked by a logged in user (or other principal).

" %}

### ctx.result

During `afterRemote` hooks, `ctx.result` will contain the data about to be sent to a client. Modify this object to transform data before it is sent.

{% include important.html content="

The value of  `ctx.result` may not be available at all times.

" %}

If a remote method explicitly specifies the returned value, only then would `ctx.result` be set. So your remote method must do something like:

```javascript
MyModel.remoteMethod('doSomething', {
  // ...
  returns: {arg: 'redirectUrl', type: 'string'}
});
```
