---
title: "Add a static web page"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Add-a-static-web-page.html
summary: LoopBack leverages Express middleware to make it easy to serve up static content such as web pages.
---

{% include content/gs-prereqs.html lang=page.lang %}

{% include note.html content="
If you followed the previous steps in the tutorial, skip down to [Introduction to middleware](#introduction-to-middleware).

If you're just jumping in, follow the steps below to catch up...
" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout lb2-step3
$ npm install
```

## Introduction to middleware

{% include note.html content="
LoopBack is built on [Express](http://expressjs.com/), one of the most popular Node application frameworks.  The top-level LoopBack `app` object inherits all the methods and properties of the
[Express `app` object](http://expressjs.com/en/4x/api.html#app). See [Working with LoopBack objects](Working-with-LoopBack-objects).
" %}

Before continuing, you need to understand the basics of [Express middleware](http://expressjs.com/guide/using-middleware.html).
_Middleware_ is simply a JavaScript function with access to the request object (`req`) representing the HTTP request, the response object (`res`) representing the HTTP response, and the next middleware in line in the request-response cycle of an Express application, commonly denoted by a variable named `next`. Middleware can:

*   Execute any code.
*   Make changes to the request and the response objects.
*   End the request-response cycle.
*   Call the next middleware in the stack.

LoopBack middleware is exactly like [Express middleware](http://expressjs.com/guide/using-middleware.html), except that LoopBack adds the concept of _phases_, that enables you to easily set the order in which middleware is called.  This avoids one of the tricky aspects of Express: making sure middleware gets executed when it should be. 

When you create an application with the [Application generator](Application-generator), it creates a `server/middleware.json` file that specifies what middleware is executed in which phase.  Registering new middleware is as simple as editing this JSON file:

{% include code-caption.html content="server/middleware.json" %}
```js
{
  "initial:before": {
    "loopback#favicon": {}
  },
  "initial": {
    "compression": {},
    "cors": {
      "params": {
        "origin": true,
        "credentials": true,
        "maxAge": 86400
      }
    },
    "helmet#xssFilter": {},
    "helmet#frameguard": {
      "params": [
        "deny"
      ]
    },
    "helmet#hsts": {
      "params": {
        "maxAge": 0,
        "includeSubdomains": true
      }
    },
    "helmet#hidePoweredBy": {},
    "helmet#ieNoOpen": {},
    "helmet#noSniff": {},
    "helmet#noCache": {
      "enabled": false
    }
  },
  "session": {},
  "auth": {},
  "parse": {},
  "routes": {
    "loopback#rest": {
      "paths": [
        "${restApiRoot}"
      ]
    }
  },
  "files": {},
  "final": {
    "loopback#urlNotFound": {}
  },
  "final:after": {
    "strong-error-handler": {}
  }
}
```

Each of the top-level keys in `middleware.json` defines a middleware phase: `initial`, `session`, `auth`, and so on, ending with `final`.  There are also modifiers to register middleware `before` and `after` a given phase. There's a bit more to it, but that covers the basics.  See [Defining middleware](Defining-middleware) for all the details.

## Change or modify the default root route handler

Applications typically need to serve static content such as HTML and CSS files, client JavaScript files, images, and so on.  It's very easy to do this with the default scaffolded LoopBack application.  You're going to configure the application to serve any files in the` /client` directory as static assets.

First, you have to disable the default route handler for the root URL.   Remember back in [Create a simple API](Create-a-simple-api.html) (you have been following along, haven't you?) when you loaded the application root URL, [http://localhost:3000/](http://localhost:3000/), you saw the application respond with a simple status message such as this:

`{"started":"2014-11-20T21:59:47.155Z","uptime":42.054}`

This happens because by default the scaffolded application has a boot script named `root.js` that sets up route-handling middleware for the root route ("/"):

{% include code-caption.html content="server/boot/root.js" %}
```javascript
module.exports = function(server) { // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
```

This code says that for any GET request to the root URI ("/"), the application will return the results of [`loopback.status()`](http://apidocs.strongloop.com/loopback/#loopbackstatus).

To make your application serve static content you need to disable this script.  **Either delete it or just rename it** to something without a `.js` ending (that ensures the application won't execute it).

## Define static middleware

Next, you need to define static middleware to serve files in the `/client` directory.   

Edit `server/middleware.json`.  Look for the "files" entry:

{% include code-caption.html content="server/middleware.json" %}
```javascript
...
"files": {},
...
```

Add the following:

{% include code-caption.html content="server/middleware.json" %}
```javascript
...
"files": {
  "loopback#static": {
    "params": "$!../client" 
  }
},
...
```

These lines define [static middleware](Defining-middleware.html#static-middleware) that makes the application serve files in the `/client` directory as static content.  The `$!` characters indicate that the path is relative to the location of `middleware.json`.

## Add an HTML file

Now, the application will serve any files you put in the `/client` directory as static (client-side) content.  So, to see it in action, add an HTML file to `/client`.  For example, add a file named `index.html` with this content:

{% include code-caption.html content="/client/index.html" %}
```html
<head><title>LoopBack</title></head>
<body>
    <h1>LoopBack Rocks!</h1>
    <p>Hello World... </p>
</body>
```

Of course, you can add any static HTML you like–this is just an example.

## Run it....!

Now run the application again:

`$ node .`

When you load [http://0.0.0.0:3000/](http://0.0.0.0:3000/) now instead of the status JSON, you'll see this:

{% include image.html file="5570648.png" alt="" %}

{% include next.html content="In [Add a custom Express route](Add-a-custom-Express-route.html), you'll add a simple route handler in the same way you would in an Express application."
%}
