---
title: "Add a custom Express route"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Add-a-custom-Express-route.html
summary:
---

<div class="markdown-body">{% include important.html content="

**Prerequisite**: Install StrongLoop software as described in [安装 StrongLoop](https://docs.strongloop.com/pages/viewpage.action?pageId=6095101).

**Recommended**: Read [LoopBack 核心概念](https://docs.strongloop.com/pages/viewpage.action?pageId=6095111).

" %}

Because LoopBack is built on Express, you can add custom routes just as you do in Express.

In this part of the tutorial, you're going to add a new custom route.

{% include note.html content="

If you followed the previous steps in the tutorial, skip down to [Introducing boot scripts](/doc/zh/lb2/Add-a-custom-Express-route.html).

If you're just jumping in, follow the steps below to catch up...

" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout step4
$ npm install
```

## Introducing boot scripts

When a LoopBack application starts (or "bootstraps"), it runs the scripts in the `/server/boot` directory, known as _boot scripts_.  By default, LoopBack loads boot scripts in alphabetical order.  

The standard scaffolded LoopBack application created by the [application generator](/doc/{{page.lang}}/lb2/Application-generator.html) contains the following standard boot scripts (in `/server/boot`) that perform basic initialization:

*   `authentication.js` - Enables authentication for the application by calling [`app.enableAuth()`](http://apidocs.strongloop.com/loopback/#app-enableauth).
*   `explorer.js` - Enables API Explorer.  Delete or change the extension of this file to disable API Explorer.
*   `rest-api.js` - Exposes the application's models over REST using [`loopback.rest()`](http://apidocs.strongloop.com/loopback/#loopback-rest) middleware.

For more information on boot scripts, see [定义启动脚本（boot script）](/doc/{{page.lang}}/lb2/6095038.html).

## Add a new boot script

For example, add a new boot script named `routes.js` in `/server/boot` directory, with this code:

**/server/boot/routes.js**

```js
module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });
}
```

As an aside, you could have just as well used [Express router middleware](http://expressjs.com/4x/api.html#router) instead, like this:

**/server/boot/routes.js**

```js
module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/ping', function(req, res) {
    res.send('pongaroo');
  });
  app.use(router);
}
```

In fact you can also add routes right in `sever.js` using the Express API.  For example, add this call to [`app.use()`](http://expressjs.com/4x/api.html#app.use) just before the call to `app.start()`:

**server/server.js**

```
...
app.use('/express-status', function(req, res, next) {
  res.json({ running: true });
});

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
```

The point is that a LoopBack application can easily do all the things that an Express application can.  If you're familiar with Express, this will make LoopBack easier to learn and use.

## Run the boot script

Now, run the application again:

`$ slc run`

Load [http://0.0.0.0:3000/ping](http://0.0.0.0:3000/ping).  You'll see "pong" as the response. 

Next: Check out [Next steps](/doc/{{page.lang}}/lb2/Next-steps.html) for information on what to read next.
</div>

[ ](https://github.com/strongloop/loopback-getting-started/wiki/_new?wiki%5Bname%5D=_Footer)
