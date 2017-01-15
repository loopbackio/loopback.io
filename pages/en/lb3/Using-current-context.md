---
title: "Using current context"
redirect_from: /doc/en/lb2/Using%20current%20context.html
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Using-current-context.html
summary:
---

## Overview

LoopBack applications sometimes need to access context information to implement the business logic, for example to:

* Access the currently logged-in user.
* Access the HTTP request (such as URL and headers).

A typical request to invoke a LoopBack model method travels through multiple layers with chains of asynchronous callbacks. It's not always possible to pass all the information through method parameters. 

LoopBack 2.x introduced current-context APIs using the module
[continuation-local-storage](https://www.npmjs.com/package/continuation-local-storage)
to provide a context object preserved across asynchronous operations.
Unfortunately, this module is not reliable and has many known problems (for
example, see [issue #59](https://github.com/othiym23/node-continuation-local-storage/issues/59)).
As a result, the current-context feature does not work in many situations,
see [loopback-context issues](https://github.com/strongloop/loopback-context/issues)
and [related issues in loopback](https://github.com/strongloop/loopback/issues?utf8=%E2%9C%93&q=is%3Aissue%20getCurrentContext).

To address this problem, LoopBack 3.0 moved all current-context-related code to
[loopback-context](https://github.com/strongloop/loopback-context) module
and removed all current-context APIs (see
[Release Notes](3.0-Release-Notes.html#current-context-api-and-middleware-removed)).

However, applications clearly need to access information like the currently
logged-in user in application logic, for example in
[Operation hooks](Operation-hooks.html). Until there is a reliable
implementation of continuation-local-storage available for Node.js,
explicitly pass any additional context via `options` parameter
of (remote) methods.

Built-in methods such as
[PersistedModel.find](http://apidocs.strongloop.com/loopback/#persistedmodel-find)
or
[PersistedModel.create](http://apidocs.strongloop.com/loopback/#persistedmodel-create)
accept an `options` argument.

[Operation hooks](Operation-hooks.html) expose the `options` argument
as `context.options`.

You must safely initialize the `options` parameter when a method is invoked
via REST API, ensuring that clients cannot override sensitive information like
the currently logged-in user.  Doing so requires two steps:

- Annotate "options" parameter in remoting metadata
- Customize the value provided to "options"

## Annotate "options" parameter in remoting metadata

Methods accepting an `options` argument must declare this argument in their
remoting metadata and set the `http` property to the special string value
`"optionsFromRequest"`.

```json
{
  "arg": "options",
  "type": "object",
  "http": "optionsFromRequest"
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
phases](https://loopback.io/doc/en/lb3/Defining-middleware.html). The framework
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
      User.findById(ctx.args.options.accessToken.userId, function(err, user) {
        if (err) return next(err);
        ctx.args.options.currentUser = user;
        next();
      });
    });
};
```
