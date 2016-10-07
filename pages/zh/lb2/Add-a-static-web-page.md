---
title: "Add a static web page"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Add-a-static-web-page.html
summary:
---

{% include important.html content="

**Prerequisite**: Install StrongLoop software as described in [安装 StrongLoop](https://docs.strongloop.com/pages/viewpage.action?pageId=6095101).

**Recommended**: Read [LoopBack 核心概念](https://docs.strongloop.com/pages/viewpage.action?pageId=6095111).

" %}

LoopBack leverages [Express middleware](http://expressjs.com/guide/using-middleware.html) to make it easy to serve up static content such as web pages.

{% include note.html content="

If you followed the previous steps in the tutorial, skip down to [Introduction to middleware](/doc/zh/lb2/Add-a-static-web-page.html).

If you're just jumping in, follow the steps below to catch up...

" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout step3
$ npm install
```

## Introduction to middleware

{% include note.html content="

LoopBack is built on [Express](http://expressjs.com/), one of the most popular Node application frameworks.

The top-level LoopBack `app` object inherits all the methods and properties of the Express app object. See [使用LoopBack对象](/doc/zh/lb2/6095045.html).

" %}

Before continuing, you need to understand a basic concept that LoopBack inherits from Express: middleware.  

_Middleware_ is simply a JavaScript function with access to the request object (`req`) representing the HTTP request, the response object (`res`) representing the HTTP response, and the next middleware in line in the request-response cycle of an Express application, commonly denoted by a variable named `next`. Middleware can:

*   Execute any code.
*   Make changes to the request and the response objects.
*   End the request-response cycle.
*   Call the next middleware in the stack.

LoopBack middleware is exactly like [Express middleware](http://expressjs.com/guide/using-middleware.html), except that LoopBack adds the concept of _phases_, that enables you to easily set the order in which middleware is called.  This avoids one of the tricky aspects of Express: making sure middleware gets executed when it should be. 

When you create an application with slc loopback, it creates a `server/middleware.json` file that specifies what middleware is executed in which phase.  Registering new middleware is as simple as editing this JSON file.  Expand this code to see what it looks like:

**server/middleware.json**  Expand source

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
  "routes": {
    "loopback#status": {
      "paths": "/"
    }
  },
  "files": {},
  "final": {
    "loopback#urlNotFound": {}
  },
  "final:after": {
    "errorhandler": {}
  }
}
```

Each of the top-level keys in `middlewre.json` defines a middleware phase: `initial`, `session`, `auth`, and so on, ending with `final`.  There are also modifiers to register middleware `before` and `after` a given phase. There's a bit more to it, but that covers the basics.

See [Defining middleware](/doc/{{page.lang}}/lb2/Defining-middleware.html) for all the details.

## Change or modify the default root route handler

Applications typically need to serve static content such as HTML and CSS files, client JavaScript files, images, and so on.  It's very easy to do this with the default scaffolded LoopBack application.  You're going to configure the application to serve any files in the` /client` directory as static assets.

First, you have to disable the default route handler for the root URL.   Remember back in [Create a simple API](https://docs.strongloop.com/display/TRASH/New+Create+a+simple+API#NewCreateasimpleAPI-Runtheapplication) (you have been following along, haven't you?) when you loaded the application root URL, [http://localhost:3000/](http://localhost:3000/), you saw the application respond with a simple status message such as this:

`{"started":"2014-11-20T21:59:47.155Z","uptime":42.054}`

This happens because by default the scaffolded application has a boot script named `root.js` that sets up route-handling middleware for the root route ("/"):

**server/boot/root.js**

```js
module.exports = function(server) { // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
```

This code says that for any GET request to the root URI ("/"), the application will return the results of[`loopback.status()`](http://apidocs.strongloop.com/loopback/#loopbackstatus).

To make your application serve static content you need to disable this script.  **Either delete it or just rename it** to something without a `.js` ending (that ensures the application won't execute it).

## Define static middleware

Next, you need to define static middleware to serve files in the `/client` directory.   

Edit `server/middleware.json`.  Look for the "files" entry:

**server/middleware.json**

```js
...
"files": {},
...
```

Add the following:

**server/middleware.json**

```js
...
"files": {
  "loopback#static": {
    "params": "$!../client"
  },
  ...
```

These lines define _[static middleware](/doc/{{page.lang}}/lb2/Defining-middleware.html#Definingmiddleware-Staticmiddleware)_ that makes the application serve files in the `/client` directory as static content.  The `$!` characters indicate that the path is relative to the location of `middleware.json`.

## Add an HTML file

Now, the pplication will serve any files you put in the `/client` directory as static (client-side) content.  So, to see it in action, add an HTML file to `/client`.  For example, add a file named `index.html` with this content:

**/clientt/index.html**

```
<head><title>LoopBack</title></head>
<body>
    <h1>LoopBack Rocks!</h1>
    <p>Hello World... </p>
</body>
```

Of course, you can add any static HTML you like–this is just an example.

## Run it....!

Now run the application again:

`$ slc run`

When you load [http://0.0.0.0:3000/](http://0.0.0.0:3000/) now instead of the status JSON, you'll see this:

{% include image.html file="6258839.png" alt="" %}

Next: In [Add a custom Express route](/doc/{{page.lang}}/lb2/Add-a-custom-Express-route.html), you'll add a simple route handler in the same way you would in an Express application.
