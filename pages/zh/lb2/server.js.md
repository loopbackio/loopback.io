---
title: "server.js"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/server.js.html
summary:
---

This is the main application script in the standard scaffolded application, as created by `slc loopback`.

**
1 - 3**: Require LoopBack modules and set up standard objects [`loopback`](http://apidocs.strongloop.com/loopback/#loopback), [`app`](http://apidocs.strongloop.com/loopback/#var-app-loopback), and [`boot`](http://apidocs.strongloop.com/loopback-boot/#boot).

**6**: [Initialize (boot) the application](/doc/{{page.lang}}/lb2/6095038.html).

**7+**: Start the application and web server.

```js
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};
// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
```
