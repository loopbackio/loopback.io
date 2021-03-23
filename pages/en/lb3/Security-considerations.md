---
title: "Security considerations"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Security-considerations.html
summary:
---

## Model REST APIs

By default, LoopBack models you create expose a 
[standard set of HTTP endpoints](http://apidocs.loopback.io/loopback/#persistedmodel) for create, read, update, and delete (CRUD) operations.
The `public` property in [model-config.json](model-config.json.html) specifies whether to expose the model's REST APIs, for example:

{% include code-caption.html content="/server/model-config.json" %}
```javascript
...
  "MyModel": {
    "public": true,
    "dataSource": "db"
  },
...
```

To "hide" the model's REST API, simply change `public` to `false`.

### Hiding properties

To hide a property of a model exposed over REST, define a hidden property.
See [Model definition JSON file (Hidden properties)](Model-definition-JSON-file.html#hidden-properties).

{% include content/hidden-vs-protected.html xref='true' %}

### Disabling API Explorer

LoopBack [API Explorer](Use-API-Explorer) is great when you're developing your application,
but for security reasons you may not want to expose it in production.

For an application using [loopback-component-explorer](https://github.com/strongloop/loopback-component-explorer), to disable explorer in production:

* Set the NODE_ENV environment variable to "production".
* Then in `server/component-config.production.json`:

{% include code-caption.html content="server/component-config.production.json" %}
```javascript
{
  "loopback-component-explorer": null
}
```

## CORS

LoopBack applications use the [cors](https://www.npmjs.com/package/cors) middleware package
for [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
(CORS), but it is **disabled by default** for applications created with the [application generator](Application-generator.html).

To enable CORS, ensure that `remoting.cors` is set to `false` in `server/config.json`.  This disables remoting-level CORS (used in earlier versions of LoopBack).  

```js
{
  ...
  "remoting": {
    ...
    "cors": false,  
    "handleErrors": false
  }
}
```

{% include tip.html content="Projects scaffolded with a recent version StrongLoop/LoopBack tools already have remoting-level CORS disabled as shown above and the global CORS handler configured in `server/middleware.json` as shown below.
" %}

To configure CORS settings, edit the `initial` section in the `server/middleware.json` file:

```js
{
  // ...
  "initial": {
    // ...
    "cors": {
      "params": {
        "origin": true,
        "credentials": true,
        "maxAge": 86400
      }
    }
  },
  // ...
}
```

For information on CORS configuration options, see [middleware.json (CORS settings)](middleware.json.html#cors-settings).

### Enabling CORS on the client

If you are using a JavaScript client, you must also enable CORS on the client side. For example, one way to enable it with AngularJS is:

{% include code-caption.html content="/client/app.js" %}
```javascript
var myApp = angular.module('myApp', [
    'myAppApiService']);

myApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
```

## Mitigating XSS exploits

LoopBack stores the user's access token in a JavaScript object, which may make it susceptible to a cross-site scripting (XSS) security exploit.
As a best practice to mitigate such threats, use appropriate Express middleware, for example:

* [Lusca](https://www.npmjs.org/package/lusca)
* [Helmet](https://www.npmjs.org/package/helmet)

{% include note.html content="Standard scaffolded LoopBack 3.0 applications load a number of Helmet middleware functions, including [xssFilter](https://helmetjs.github.io/docs/xss-filter), [frameguard](https://helmetjs.github.io/docs/frameguard/), [hsts](https://helmetjs.github.io/docs/hsts/),
[hidePoweredBy](https://helmetjs.github.io/docs/hide-powered-by),
[ieNoOpen](https://helmetjs.github.io/docs/ienoopen),
[noSniff](https://helmetjs.github.io/docs/dont-sniff-mimetype/), and
[noCache](https://helmetjs.github.io/docs/nocache).
" %}

See also:

* Express 3.x [csrf() function](http://expressjs.com/3x/api.html#csrf).
* [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
