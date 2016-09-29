---
title: "Versioning your API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Versioning-your-API.html
summary:
---

You can easily add versioning to your REST API routes, based on the application "major" version in `package.json`.

Add a file name `config.local.js` in the application's `/server` directory with the following code:

**/server/config.local.js**

```js
var p = require('../package.json');
var version = p.version.split('.').shift();
module.exports = {
  restApiRoot: '/api' + (version > 0 ? '/v' + version : ''),
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
};
```

This takes the major version number from the `version` property in `package.json` and appends it to the REST API root.   If your app's major version is 0, then the REST API root remains the default `/api`.

So, for example, if `version` in `package.json` is 2.0.1, then the built-in model route exposed by default at:

`GET http://localhost:3000/api/Users`

is now exposed at:

`GET http://localhost:3000/api/v2/Users`{% include important.html content="

Changing the API root in this way doesn't affect routes set in [request-handling middleware](/doc/{{page.lang}}/lb2/Defining-middleware.html#Definingmiddleware-Dynamicrequest-handlingmiddleware) or the route to [API Explorer](/doc/{{page.lang}}/lb2/6095009.html) itself, which remains `http://localhost:3000/explorer`.

" %}
