---
title: "Creating an application"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Creating-an-application.html
summary:
---

{% include important.html content="

Prerequisites

*   [Install StrongLoop software](https://docs.strongloop.com/pages/viewpage.action?pageId=6095101).
*   Read [LoopBack 核心概念](https://docs.strongloop.com/pages/viewpage.action?pageId=6095111) first.
*   Follow [LoopBack初级教程](https://docs.strongloop.com/pages/viewpage.action?pageId=6095006) for a basic introduction to LoopBack.

" %}

**Related articles**:

**See also**:

*   [Creating models](/doc/{{page.lang}}/lb2/Creating-models.html)
*   [Using built-in models](/doc/{{page.lang}}/lb2/Using-built-in-models.html)

## Creating a new application

As you saw in [Getting Started > Create a simple API](/doc/{{page.lang}}/lb2/6095007.html), the easiest way to create an application is to use `slc loopback`, the [application generator](/doc/{{page.lang}}/lb2/Application-generator.html).  

{% include note.html content="

It is possible to create a LoopBack application by coding it from scratch, but [`slc loopback`](/doc/{{page.lang}}/lb2/6095063.html) does all the \"heavy lifting\" to create the basic scaffolding of the [standard project layout](/doc/{{page.lang}}/lb2/6095052.html). You can then customize the application to suit your needs.  When you create your application this way, you can continue to use `slc loopback` to add models, data sources, and so on.

In general, the documentation assumes you've created your application using `slc loopback`.

" %}

Once you create your application, you may want to configure it, for example: Turn off stack traces, disable API Explorer, and retrieve the values of environment variables.  See [Environment-specific configuration](/doc/{{page.lang}}/lb2/Environment-specific-configuration.html) for more information.

### Standard project layout

The application generator creates an application with the [standard project layout](/doc/{{page.lang}}/lb2/6095052.html).  To summarize:

*   `server` directory
    *   `server.js` - Main application script; see below.
    *   `config.json` - Global application settings, such as the REST API root, host name and port to use, and so on. See [config.json](http://docs.strongloop.com/display/LB/config.json).
    *   `model-config.json` - Binds models to data sources and specifies whether a model is exposed over REST, among other things.  See [model-config.json](http://docs.strongloop.com/display/LB/model-config.json).
    *   `datasources.json` - Data source configuration file. See [datasources.json](http://docs.strongloop.com/display/LB/datasources.json).
*   `client` directory (empty except for a README stub)
*   `common/models` directory - created when you create a model with the [Model generator](/doc/{{page.lang}}/lb2/Model-generator.html), `slc loopback:model`.
    *   A JSON file and a JavaScript file for each model (for example, `my-model.json` and `my-model.js`).

### Main application script (server.js)

This is the main application script in the standard scaffolded application, as created by `slc loopback`.

**
1 - 3**: Require LoopBack modules and set up standard objects [`loopback`](http://apidocs.strongloop.com/loopback/#loopback), [`app`](http://apidocs.strongloop.com/loopback/#var-app-loopback), and [`boot`](http://apidocs.strongloop.com/loopback-boot/#boot).

**6**: [Initialize (boot) the application](https://docs.strongloop.com/pages/viewpage.action?pageId=6095038).

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
