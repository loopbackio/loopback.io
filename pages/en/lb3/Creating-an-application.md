---
title: "Creating an application"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Creating-an-application.html
summary: Use the LoopBack application generator to create a new application.
---

{% include content/gs-prereqs.html lang=page.lang %}

## Using the application generator

The easiest way to create an application is to use [Application generator](Application-generator.html).

It is possible to create a LoopBack application by coding it from scratch, but
the application generator does all the "heavy lifting" to create the basic scaffolding of the [standard project layout](Project-layout-reference.html).
You can then customize the application to suit your needs using the CLI tools.

In general, the documentation assumes you've created your application using the Application generator.

Once you create your application, you may want to configure it, for example:
Turn off stack traces, disable API Explorer, and retrieve the values of environment variables.
See [Environment-specific configuration](Environment-specific-configuration.html) for more information.

## Standard project layout

The application generator creates an application with the [standard project layout](Project-layout-reference.html).

To summarize:

* `server` directory
  * `server.js` - Main application script; see below.
  * `config.json` - Global application settings, such as the REST API root, host name and port to use, and so on.
      See [config.json](config.json.html).
  * `model-config.json` - Binds models to data sources and specifies whether a model is exposed over REST, among other things.
      See [model-config.json](model-config.json.html).
  * `datasources.json` - Data source configuration file.
      See [datasources.json](datasources.json.html).
* `client` directory (empty except for a README stub)
* `common/models` directory - created when you create a model with the [model generator](Model-generator.html).
  * A JSON file and a JavaScript file for each model (for example, `my-model.json` and `my-model.js`).

## Main application script (server.js)

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

This is the main application script in the standard scaffolded application
created by the [application generator](Application-generator.html).

**1 - 3**:
Require LoopBack modules and set up standard objects
[`loopback`](http://apidocs.loopback.io/loopback/#loopback),
[`app`](http://apidocs.loopback.io/loopback/#var-app-loopback),
and
[`boot`](http://apidocs.loopback.io/loopback-boot/#boot).

**4**:
Start the web server.

**7**:
Emit the 'started' [event](Events.html).

**10 - 13**:
Start API Explorer.

**18**: [Initialize (boot) the application](Defining-boot-scripts.html).
