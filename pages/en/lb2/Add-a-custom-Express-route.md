---
title: "Add a custom Express route"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Add-a-custom-Express-route.html
summary: Because LoopBack is built on Express, you can add custom routes just as you do in Express.
---

{% include content/gs-prereqs.html lang=page.lang %}

In this part of the tutorial, you're going to add a new custom route.

{% include note.html content="
If you followed the previous steps in the tutorial, skip down to [Introducing boot scripts](#introducing-boot-scripts).

If you're just jumping in, follow the steps below to catch up...
" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout lb2-step4
$ npm install
```

## Introducing boot scripts

When a LoopBack application starts (or "bootstraps"), it runs the scripts in the `/server/boot` directory, known as _boot scripts_.  By default, LoopBack loads boot scripts in alphabetical order.  

The standard scaffolded LoopBack application created by the [application generator](Application-generator) contains the following standard boot scripts (in `/server/boot`) that perform basic initialization:

*   `authentication.js` - Enables authentication for the application by calling [`app.enableAuth()`](http://apidocs.strongloop.com/loopback/#app-enableauth).
*   `root.js` - Defines a root route to `/` that returns server status using [`loopback.status()`](https://apidocs.strongloop.com/loopback/#loopback-status) middleware.  You already encountered this in the previous step, when you renamed this file so your app could serve static content.

For more information on boot scripts, see [Defining boot scripts](Defining-boot-scripts).

## Add a new boot script

For example, add a new boot script named `routes.js` in `/server/boot` directory, with this code:

{% include code-caption.html content="/server/boot/routes.js" %}
```javascript
module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });
}
```

As an aside, you could have just as well used [Express router middleware](http://expressjs.com/4x/api.html#router) instead, like this:

{% include code-caption.html content="/server/boot/routes.js" %}
```javascript
module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/ping', function(req, res) {
    res.send('pongaroo');
  });
  app.use(router);
}
```

In fact you can also add routes right in `server.js` using the Express API.  For example, add this call to [`app.use()`](http://expressjs.com/4x/api.html#app.use) just before the call to `app.start()`:

{% include code-caption.html content="server/server.js" %}
```javascript
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

`$ node .`

Load [http://0.0.0.0:3000/ping](http://0.0.0.0:3000/ping).  You'll see "pong" as the response. 

{% include next.html content="Check out [Next steps](Next-steps.html) for information on what to read next."
%}
