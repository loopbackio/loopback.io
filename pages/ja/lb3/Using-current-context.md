---
title: "Using current context"
redirect_from: /doc/en/lb2/Using%20current%20context.html
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Using-current-context.html
summary:
---

## Overview

LoopBack applications sometimes need to access context information to implement the business logic, for example to:

* Access the currently logged-in user.
* Access the HTTP request (such as URL and headers).

Ideally, the context data would be stored in storage similar to
[thread-local-storage](https://en.wikipedia.org/wiki/Thread-local_storage),
which persists across asynchronous operations. Unfortunately,
a reliable solution is not currently available for Node.js, so LoopBack uses a different mechanism for passing the context through the continuation chain.

{% include note.html content='
LoopBack 2.x introduced current-context APIs using the module [continuation-local-storage](https://www.npmjs.com/package/continuation-local-storage) to provide a context object preserved across asynchronous operations. Unfortunately, this module is not reliable and has many known problems - see [node-continuation-local-storage#59](https://github.com/othiym23/node-continuation-local-storage/issues/59),
[loopback-context issues](https://github.com/strongloop/loopback-context/issues) and [related issues in loopback](https://github.com/strongloop/loopback/issues?utf8=%E2%9C%93&q=is%3Aissue%20getCurrentContext). LoopBack 3.0 removed all current-context APIs and moved their implementation to [loopback-context](https://github.com/strongloop/loopback-context) module.
' %}

The current solution for context propagation in LoopBack has the following parts:

 - Any additional context is passed in the "options" argument. Built-in methods
  such as
  [PersistedModel.find](http://apidocs.loopback.io/loopback/#persistedmodel-find)
  or
  [PersistedModel.create](http://apidocs.loopback.io/loopback/#persistedmodel-create)
  already accept this argument, custom user methods must be modified to accept it
  too.

 - Whenever a method invokes another method, the "options" argument must be passed
 down the invocation chain.

 - To seed the "options" argument when a method is invoked via a REST call, the
  "options" argument must be annotated in remoting metadata with a specific
  value set in the "http" property.

 - Optionally, applications can customize the value provided to "options"
   when invoked via REST.

This way, the context is explicitly propagated through function calls,
irrespective of sync/async flow. Because the initial value of the "options"
argument is built by a server-side function, the client REST API remains
unchanged. Sensitive context data like "currently logged-in user" remain safe
from client-side manipulations.

{% include tip.html content='
[Operation hooks](Operation-hooks.html) expose the `options` argument
as `context.options`.
' %}

## Write a custom remote method with "options"

The example code shows how to write a custom method `MyModel.log()` which
includes the information about the currently logged-in user in the log
message.

```js
// common/models/my-model.js
module.exports = function(MyModel) {
  MyModel.log = function(messageId, options) {
    const Message = this.app.models.Message;
    // IMPORTANT: forward the options arg
    return Message.findById(messageId, null, options)
      .then(msg => {
        const token = options && options.accessToken;
        const userId = token && token.userId;
        const user = userId ? 'user#' + userId : '<anonymous>';
        console.log('(%s) %s', user, msg.text));
      });
  };
};
```

## Annotate "options" parameter in remoting metadata

Methods accepting an `options` argument must declare this argument in their
remoting metadata and set the `http` property to the special string value
`"optionsFromRequest"`.

```json
// common/models/my-model.json
{
  "name": "MyModel",
  // ...
  "methods": {
    "log": {
      "accepts": [
        {"arg": "messageId", "type": "number", "required": true},
        {"arg": "options", "type": "object", "http": "optionsFromRequest"}
      ],
      "http": {"verb": "POST", "path": "/log/:messageId"}
    }
  }
}
```

Under the hood, `Model.remoteMethod` converts this special string value
to a function that will be called by strong-remoting for each incoming request
to build the value for this parameter.

{% include tip.html content='
Computed "accepts" parameters have been around for a while and they are well supported by LoopBack tooling. For example, the [Swagger generator](Swagger-generator.htm) excludes computed properties from the API endpoint description. As a result, the "options" parameter will not be described in the Swagger documentation.
' %}

All built-in method have been already modified to include this new "options"
parameter.

{% include note.html content='
In LoopBack 2.x, this feature is disabled by default for compatibility reasons.  To enable, add `"injectOptionsFromRemoteContext": true` to your model JSON file.
' %}

## Access the context from Operation hooks

The example below implements a simple audit log printing information
about which user accessed which model instance.

```js
// common/models/my-model.js
module.exports = function(MyModel) {
  MyModel.observe('access', function(ctx, next) {
    const token = ctx.options && ctx.options.accessToken;
    const userId = token && token.userId;
    const user = userId ? 'user#' + userId : '<anonymous>';

    const modelName = ctx.Model.modelName;
    const scope = ctx.where ? JSON.stringify(ctx.where) : '<all records>';
    console.log('%s: %s accessed %s:%s', new Date(), user, modelName, scope);
    next();
  });
};
```

## Customize the value provided to "options"

When strong-remoting resolves the "options" argument, it calls model's
`createOptionsFromRemotingContext` method. The default implementation of this
method returns an object with a single property `accessToken` containing
the `AccessToken` instance used to authenticate the request.

There are several ways to customize this value:

- Override `createOptionsFromRemotingContext` in your model.
- Use a "beforeRemote" hook.
- Use a custom strong-remoting phase.

### Override `createOptionsFromRemotingContext` in your model

For example:

```js
MyModel.createOptionsFromRemotingContext = function(ctx) {
  var base = this.base.createOptionsFromRemotingContext(ctx);
  return extend(base, {
    currentUserId: base.accessToken && base.accessToken.userId,
  });
};
```

A better approach is to write a mix-in that overrides this method and that can
be shared between multiple models.

### Use a "beforeRemote" hook

Because the "options" parameter is a regular method parameter, you can access
it from remote hooks via `ctx.args.options`; for example:

```js
MyModel.beforeRemote('saveOptions', function(ctx, unused, next) {
  if (!ctx.args.options.accessToken) return next();
  User.findById(ctx.args.options.accessToken.userId, function(err, user) {
    if (err) return next(err);
    ctx.args.options.currentUser = user;
    next();
  });
})
```

Again, you can reuse a hook like this by placing the code in a mix-in.

It may not always be possible to control the order in which remote hooks are
executed. If you need to control the order, then use a custom
strong-remoting phase as described in the following section.

### Use a custom strong-remoting phase

Internally, strong-remoting uses phases similar to [middleware
phases](https://loopback.io/doc/ja/lb3/Defining-middleware.html). The framework
defines two built-in phases: `auth` and `invoke`. All remote hooks are run in
the second phase `invoke`.

Applications can define a custom phase to run code before any remote hooks are
invoked, such code can be placed in a boot script for example.

```js
module.exports = function(app) {
  app.remotes().phases
    .addBefore('invoke', 'options-from-request')
    .use(function(ctx, next) {
      if (!ctx.args.options.accessToken) return next();
      const User = app.models.User;
      User.findById(ctx.args.options.accessToken.userId, function(err, user) {
        if (err) return next(err);
        ctx.args.options.currentUser = user;
        next();
      });
    });
};
```
