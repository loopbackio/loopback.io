---
title: "Creating an application"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Creating-an-application.html
summary:
---

{% include important.html content="

**Prerequisites**

* Install **[API Connect](https://developer.ibm.com/apiconnect/)** or **[StrongLoop](https://docs.strongloop.com/display/SL/Installing+StrongLoop)**.
* Read [LoopBack core concepts](https://docs.strongloop.com/display/APIC/LoopBack+core+concepts).

" %}

**See also**:

* [Environment-specific configuration](/doc/en/lb2/Environment-specific-configuration.html)
* [Versioning your API](/doc/en/lb2/Versioning-your-API.html)
* [Standard project structure](/doc/en/lb2/Standard-project-structure.html)
* [Tutorials and examples](/doc/en/lb2/Tutorials-and-examples.html)
* [Creating models](/doc/en/lb2/Creating-models.html)
* [Using built-in models](/doc/en/lb2/Using-built-in-models.html)

## Creating a new application

The easiest way to create an application is to use `apic loopback`.

{% include note.html content="

It is possible to create a LoopBack application by coding it from scratch, but `apic loopback` 
does all the \"heavy lifting\" to create the basic scaffolding of the [standard project layout](/doc/en/lb2/Project-layout-reference.html).
You can then customize the application to suit your needs.
When you create your application this way, you can continue to use `apic loopback` to add models, data sources, and so on.

In general, the documentation assumes you've created your application using `apic loopback`.

" %}

Once you create your application, you may want to configure it, for example: 
Turn off stack traces, disable API Explorer, and retrieve the values of environment variables.
See [Environment-specific configuration](/doc/en/lb2/Environment-specific-configuration.html) for more information.

### Standard project layout

The application generator creates an application with the [standard project layout](/doc/en/lb2/Project-layout-reference.html).

To summarize:

* `server` directory
  * `server.js` - Main application script; see below.
  * `config.json` - Global application settings, such as the REST API root, host name and port to use, and so on.
      See [config.json](http://docs.strongloop.com/display/LB/config.json).
  * `model-config.json` - Binds models to data sources and specifies whether a model is exposed over REST, among other things.  
      See [model-config.json](http://docs.strongloop.com/display/LB/model-config.json).
  * `datasources.json` - Data source configuration file.
      See [datasources.json](http://docs.strongloop.com/display/LB/datasources.json).
* `client` directory (empty except for a README stub)
* `common/models` directory - created when you create a model with the model generator, `apic create --type model`.
  * A JSON file and a JavaScript file for each model (for example, `my-model.json` and `my-model.js`).

### Main application script (server.js)

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

This is the main application script in the standard scaffolded application, as created by `apic loopback`.

**1 - 3**:
Require LoopBack modules and set up standard objects
[`loopback`](http://apidocs.strongloop.com/loopback/#loopback),
[`app`](http://apidocs.strongloop.com/loopback/#var-app-loopback),
and
[`boot`](http://apidocs.strongloop.com/loopback-boot/#boot).

**4**:
Start the web server.

**7**:
Emit the 'started' [event](https://docs.strongloop.com/display/APIC/Events).

**10 - 13**:
Start [API Explorer](/pages/createpage.action?spaceKey=APIC&title=API+Explorer&linkCreation=true&fromPageId=9634284).

**18**: [Initialize (boot) the application](https://docs.strongloop.com/display/APIC/Defining+boot+scripts).