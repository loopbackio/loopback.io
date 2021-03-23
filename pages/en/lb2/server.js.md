---
title: "server.js"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/server.js.html
summary:
---

This is the main application script in the standard scaffolded application, as created by `apic loopback`.

```javascript
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
```

**1 - 3**:
Require LoopBack modules and set up standard objects
[`loopback`](http://apidocs.strongloop.com/loopback/#loopback),
[`app`](http://apidocs.strongloop.com/loopback/#var-app-loopback), and
[`boot`](http://apidocs.strongloop.com/loopback-boot/#boot).

**4**: Start the web server.

**7**: Emit the 'started' [event](Events.html).

**10 - 13**: Start API Explorer.

**18**: [Initialize (boot) the application](Defining-boot-scripts.html).
