---
title: "Security considerations"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Security-considerations.html
summary:
---

## Model REST APIs

By default, LoopBack models you create expose a [standard set of HTTP endpoints](http://apidocs.strongloop.com/loopback/#persistedmodel) for create, read, update, and delete (CRUD) operations. The `public` property in [model-config.json](/doc/{{page.lang}}/lb2/model-config.json.html) specifies whether to expose the model's REST APIs, for example:

**/server/model-config.json**

```js
...
"MyModel": {
  "public": true,
  "dataSource": "db"
},
...
```

To "hide" the model's REST API, simply change `public` to `false`.

### Disabling API Explorer

LoopBack [API Explorer](https://docs.strongloop.com/pages/viewpage.action?pageId=6095009) is great when you're developing your application, but for security reasons you may not want to expose it in production.  To disable API Explorer entirely, if you created your application with the [Application generator](https://docs.strongloop.com/display/zh/Application+generator), simply delete or rename `server/boot/explorer.js`. 

## CORS

By default LoopBack enables [Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS).

If you are using a JavaScript client, you must also enable CORS on the client side.  For example, one way to enable it with AngularJS is:

**/client/app.js**

```js
var myApp = angular.module('myApp', [
  'myAppApiService'
]);

myApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
```

## Mitigating XSS exploits

LoopBack stores the user's access token in a JavaScript object, which may make it susceptible to a cross-site scripting (XSS) security exploit.  As a best practice to mitigate such threats, use appropriate Express middleware, for example:

*   [Lusca](https://www.npmjs.org/package/lusca)
*   [Helmet](https://www.npmjs.org/package/helmet)

See also Express 3.x [csrf() function](http://expressjs.com/3x/api.html#csrf).

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
