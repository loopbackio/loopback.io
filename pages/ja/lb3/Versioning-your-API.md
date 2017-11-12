---
title: "APIのバージョニング"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Versioning-your-API.html
summary:
---

`package.json` におけるアプリケーションのメジャーバージョンにもとづいて、REST APIのルートにバージョニングを追加するのは簡単です。

Add a file named `config.local.js` in the application's `/server` directory with the following code:

{% include code-caption.html content="/server/config.local.js" %}
```javascript
var p = require('../package.json');
var version = p.version.split('.').shift();
module.exports = {
  restApiRoot: '/api' + (version > 0 ? '/v' + version : ''),
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
};
```

This takes the major version number from the `version` property in `package.json` and appends it to the REST API root.
If your app's major version is 0, then the REST API root remains the default `/api`.

So, for example, if `version` in `package.json` is 2.0.1, then the built-in model route exposed by default at:

`GET http://localhost:3000/api/Users`

is now exposed at:

`GET http://localhost:3000/api/v2/Users`

{% include important.html content="
Changing the API root in this way doesn't affect routes set in 
[request-handling middleware](Defining-middleware.html#request-handling-middleware) or the route to
[API Explorer](Use-API-Explorer.html) itself, which remains `http://localhost:3000/explorer`.
" %}
