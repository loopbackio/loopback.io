---
title: "Define a remote hook"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Define-a-remote-hook.html
summary:
---

{% include important.html content="

**Prerequisites**:

*   Install StrongLoop software as described in [安装 StrongLoop](https://docs.strongloop.com/pages/viewpage.action?pageId=6095101)
*   Follow [LoopBack初级教程](https://docs.strongloop.com/pages/viewpage.action?pageId=6095006).

**Recommended**: Read [LoopBack 核心概念](https://docs.strongloop.com/pages/viewpage.action?pageId=6095111).

" %}

A _remote hook_ is a function that's executed before or after a remote method.

{% include note.html content="

If you followed the previous step in the tutorial, go to [Introducing remote hooks](/doc/{{page.lang}}/lb2/Define-a-remote-hook.html).

If you're just jumping in, follow the steps below to catch up...

" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cd loopback-getting-started-intermediate
$ git checkout step4
$ npm install
```

## Introducing remote hooks

Recall in [Extend your API](/doc/{{page.lang}}/lb2/Extend-your-API.html), you created a remote method—a custom function that you can call through a REST endpoint.  A [remote hook](/doc/{{page.lang}}/lb2/6095041.html) is simply a function that gets executed before or after the remote method.

You can define two kinds of remote hooks:

*   `beforeRemote()` runs before the remote method.
*   `afterRemote()` runs after the remote method.

In both cases, you provide two arguments: a string that matches the remote method you want to which you want to "hook" your function, and a callback function.  Much of the power of remote hooks is that the string can include wildcards, so it is triggered by any matching method.

{% include note.html content="

LoopBack also provides [model hooks](/doc/{{page.lang}}/lb2/6095042.html), functions that are executed before or after certain events such as creating, saving, and updating model data. 

" %}

## Create the remote hook

Here, you're going to define a remote hook on the review model, specifically `Review.beforeRemote`.

`Modify` `common/models/review.js`, and add the following code:

**common/models/review.js**

```js
module.exports = function(Review) {
  Review.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    req.body.date = Date.now();
    req.body.publisherId = req.accessToken.userId;
    next();
  });
};
```

This function is called before a new instance of the Review model is created.  The code:

*   Inserts the `publisherId` using the access token attached to the request.
*   Sets the date of the review instance to the current date.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p><span>I assume you could use a </span><a href="http://docs.strongloop.com/display/LB/Model+hooks#Modelhooks-beforeCreate" class="external-link" rel="nofollow">beforeCreate</a><span>&nbsp;</span><span>model hook to do the same thing?</span></p>
  <p>It might be instructive to show how this would be accomplished or at least mention it.</p>
  <p>@rand Yeah, but it's more hairy I think since we don't have access to the `req` object there. We need to it get a handle on the `accessToken`. I believe we have something called `loopback.context` or something now so we can get context that way in a
    model hook, but I have tried this myself yet. -simon</p>
</div>

Next: Continue to [Create AngularJS client](/doc/{{page.lang}}/lb2/Create-AngularJS-client.html) .
