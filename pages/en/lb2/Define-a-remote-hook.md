---
title: "Define a remote hook"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Define-a-remote-hook.html
summary: A remote hook is a function that's executed before or after a remote method.
---

{% include content/gs-prereqs.html two="true" lang=page.lang %}

{% include note.html content="
If you followed the previous step in the tutorial, go to [Introducing remote hooks](#introducing-remote-hooks).

If you're just jumping in, follow the steps below to catch up...
" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cd loopback-getting-started-intermediate
$ git checkout lb2-step4
$ npm install
```

## Introducing remote hooks

A [remote hook](Remote-hooks) is simply a function that gets executed before or after a remote method (either a custom remote method or a built-in CRUD method).   In this example, you're going to define a remote hook that is called whenever the [`create()`](https://apidocs.strongloop.com/loopback/#persistedmodel-create) method is called on the Review model; that is, when a new review is created.

You can define two kinds of remote hooks:

*   `beforeRemote()` runs before the remote method.
*   `afterRemote()` runs after the remote method.

In both cases, you provide two arguments: a string that matches the remote method to which you want to "hook" your function, and a callback function.  Much of the power of remote hooks is that the string can include wildcards, so it is triggered by any matching method.

{% include note.html content="
LoopBack also provides [operation hooks](Operation-hooks), functions that are executed before or after models perform backend operations such as creating, saving, and updating model data, regardless of how those operations are invoked. In contrast, a remote hook is called only when the exact method you specify is invoked.
" %}

## Create the remote hook

Here, you're going to define a remote hook on the review model, specifically `Review.beforeRemote`.

`Modify` `common/models/review.js`, and add the following code:

{% include code-caption.html content="common/models/review.js" %}
```javascript
module.exports = function(Review) {
  Review.beforeRemote('create', function(context, user, next) {
    context.args.data.date = Date.now();
    context.args.data.publisherId = context.req.accessToken.userId;
    next();
  });
};
```

This function is called before a new instance of the Review model is created.  The code:

*   Inserts the `publisherId` using the access token attached to the request.
*   Sets the date of the review instance to the current date.

{% include next.html content="Continue to [Create AngularJS client](Create-AngularJS-client.html)."
%}
