---
title: "Security considerations"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Security-considerations.html
summary:
---

## Model REST APIs

By default, LoopBack models you create expose a 
[standard set of HTTP endpoints](http://apidocs.strongloop.com/loopback/#persistedmodel) for create, read, update, and delete (CRUD) operations.
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

{% include tip.html content="

For an application using the old `loopback-explorer` (prior to version 2.0), disable API Explorer by deleting or renaming `server/boot/explorer.js`. 

" %}

## CORS

By default LoopBack enables [Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
(CORS) using the [cors](https://www.npmjs.com/package/cors) package. Change the CORS settings in [middleware.json](middleware.json.html).

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

### Deprecation of built-in CORS middleware

In preparation for the LoopBack 3.0 release, which removes the built-in CORS
middleware entirely, we have deprecated the built-in CORS middleware in
versions 2.x. Applications scaffolded by an older version of `slc loopback`
will print the following warning when the first request is served:

```
strong-remoting deprecated The built-in CORS middleware provided by REST adapter was deprecated. See https://docs.strongloop.com/display/public/LB/Security+considerations for more details.
```

To suppress the warning, you should disable the built-in CORS middleware in
your `server/config.json` by setting the property `remoting.cors` to `false`:

```js
{
  // ...
  "remoting": {
    // ...
    "cors": false
  }
}
```

If you would like to keep cross-site requests allowed, then you need to follow
these additional steps:

 1. `npm install --save cors`

 2. Edit the `initial` section in your `server/middleware.json` and add
  a configuration block for `cors` middleware:

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

## Mitigating XSS exploits

LoopBack stores the user's access token in a JavaScript object, which may make it susceptible to a cross-site scripting (XSS) security exploit.
As a best practice to mitigate such threats, use appropriate Express middleware, for example:

* [Lusca](https://www.npmjs.org/package/lusca)
* [Helmet](https://www.npmjs.org/package/helmet)

See also:

* Express 3.x [csrf() function](http://expressjs.com/3x/api.html#csrf).
* [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <ul>
    <li>security concerns<br>
      <ul>
        <li>disabling the api explorer
          <ul>
            <li>user defined models are exposed by default...</li>
            <li>link to creating an application - disabling api explorer section for more details</li>
          </ul>
        </li>
        <li>acls to restrict access LINK to acl section</li>
      </ul>
    </li>
  </ul>
</div>
