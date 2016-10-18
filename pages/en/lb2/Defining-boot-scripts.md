---
title: "Defining boot scripts"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Defining-boot-scripts.html
summary:
---

{% include see-also.html content="
* [Adding logic to models](Adding-logic-to-models.html)
* [Defining middleware](Defining-middleware.html)
" %}

## Overview

The LoopBack bootstrapper, [loopback-boot](https://github.com/strongloop/loopback-boot), performs application initialization (also called _bootstrapping_).
When an application starts, the bootstrapper:

* Configures data sources.
* Defines custom models
* Configures models and attaches models to data-sources.
* Configures application settings
* Runs boot scripts in the `/server/boot` directory.

The loopback-boot module exports a `boot()` function that initializes an application.
For example, from the standard scaffolded [server.js](server.js.html) script:

```js
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
// ...
boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
```

See [loopback-boot API docs](http://apidocs.strongloop.com/loopback-boot/) for details. 

{% include note.html content="If you create your application with the [application generator](Application-generator.html) ,
then you don't need to do anything to bootstrap your application--the above code is automatically scaffolded for you!
" %}

### Using boot scripts

Use _boot scripts_ to perform custom initialization in addition to that performed by the LoopBack bootstrapper.
When an application starts, LoopBack loads all the scripts in the `server/boot` directory.
By default, LoopBack loads boot scripts in alphabetical order.
You can customize the boot script load order using the options argument of [boot()](http://apidocs.strongloop.com/loopback-boot/#boot).
See [Boot script loading order](#boot-script-loading-order) for details.

## Predefined boot scripts

The [application generator](Application-generator.html) creates the following boot scripts:


* `/server/boot/root.js` binds [loopback.status()](http://apidocs.strongloop.com/loopback/#loopback-status) middleware
at the root endpoint ("/") to provide basic status information.
* `/server/boot/authentication.js` - enables authentication for the application by calling
[app.enableAuth()](http://apidocs.strongloop.com/loopback/#app-enableauth).

### Earlier versions

Prior to `generator-loopback` v. 1.12, the application generator created two additional boot scripts, but this functionality is now handled in middleware:

* `explorer.js` - Enables [API Explorer](Use-API-Explorer.html). 
* `rest-api.js` - Exposes the application's models over REST using [`loopback.rest()`](http://apidocs.strongloop.com/loopback/#loopback-rest) middleware.

### API Connect

The API Connect LoopBack generator does not create the  `authentication.js` boot script that enables authentication.  To enable user model authentication you must add this script (or the equivalent) yourself.

## Using the boot script generator

In addition to the predefined boot scripts, you can define custom boot scripts to perform your own logic when an application starts.

Use the [boot script generator](Boot-script-generator.html), to quickly generate boot script templates.
Depending on how you respond to the generator's prompts, it will generate a template for either a synchronous or asynchronous boot script:

{% include code-caption.html content="Synchronous boot script template" %}
```javascript
module.exports = function(app) {
};
```

Comments are omitted here for brevity.

{% include code-caption.html content="Asynchronous boot script template" %}
```javascript
module.exports = function(app, cb) {
  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
```

Simply add to the function the code you want to execute at boot time.

## Synchronous and asynchronous boot scripts

LoopBack supports both synchronous and asynchronous boot scripts. The type to use depends on the nature of the task.
Use asynchronous boot scripts for tasks for which you don't want to block program execution, such as database requests or network operations. 

Both types of boot script must export a function that contains the actions of the script.
The signature of this function is similar for both types of boot scripts, but asynchronous boot script functions take an additional callback argument.

### Bootstrap function arguments

```javascript
module.exports = function(app, [callback]) {
  ...
}
```

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>app</td>
      <td>Object</td>
      <td>Yes</td>
      <td>
        <p>The application context object. Provides a handle the the application, so (for example) you can get model objects:</p>
        <pre>var User = app.models.User;</pre>
      </td>
    </tr>
    <tr>
      <td>callback</td>
      <td>Function</td>
      <td>Only for asynchronous boot scripts</td>
      <td>Call the callback function when your application logic is done.</td>
    </tr>
  </tbody>
</table>

### Asynchronous boot scripts

An asynchronous boot script must export a function that takes two arguments:

1.  The application object, `app`. This object enables you to access system-defined variables and configurations. 
2.  A callback function that enables you to time your response according to your application logic.

{% include important.html content="You must call the callback function when the script is finished to pass control back to the application.
" %}

For example, this boot script prints "hello world" and triggers the callback function after three seconds (3000 milliseconds).

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
module.exports = function(app, callback) {
  setTimeout(function() {
    console.log('Hello world');
    callback();
  }, 3000);
};
```

If you add this boot script to an application, it will display "Hello world" to the console when it starts.

### Synchronous boot scripts

A synchronous boot script must export a function that takes one argument, the application object, `app`.
This object enables you to access system-defined variables and configurations. 

For example, this boot script retrieves the names of all models registered with the application and displays them to the console. 

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
module.exports = function(app) {
  var modelNames = Object.keys(app.models);
  var models = [];
  modelNames.forEach(function(m) {
    var modelName = app.models[m].modelName;
    if (models.indexOf(modelName) === -1) {
      models.push(modelName);
    }
  });
  console.log('Models:', models);
};
```

If you add this boot script to an "empty" application, you will see this:

{% include code-caption.html content="shell" %}
```javascript
...
Models: ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']
...
```

## Boot script loading order

LoopBack executes boot scripts in alphabetical order by file name, so the easiest way to specify loading order for boot scripts is by their file names.
For example, you could name boot scripts `01-your-first-script.js`, `02-your-second-script.js`, and so forth. This ensures LoopBack loads scripts in the order you want.
For example before default boot scripts in `/server/boot`. 

{% include note.html content="LoopBack processes boot scripts alphabetically, one at a time (not in parallel).  This applies to both synchronous and asynchronous boot scripts.
" %}

You can also specify the loading order with options to the [`boot()`](http://apidocs.strongloop.com/loopback-boot/#boot) function call in `/server/server.js`.
Replace the default scaffolded function call:

{% include code-caption.html content="/server/server.js" %}
```javascript
...
boot(app, __dirname);
...
```

With something like this:

```javascript
...
bootOptions = { "appRootDir": __dirname, 
                "bootScripts" : [ "/full/path/to/boot/script/first.js", "//full/path/to/boot/script/second.js", ... ]
};
boot(app, bootOptions);
...
```

Then the application will then execute scripts in the order specified in the `bootScripts` array.
Specify the full directory path to each script.

You can also specify a relative directory path.

{% include important.html content="Using the technique shown above, the application will still run all the boot scripts in `/server/boot`
in alphabetical order (unless you move or delete them) after your custom-ordered boot scripts specified in `bootScripts`.
" %}

If desired, you can also specify one or more directories in the `bootDirs` property, and the application will run scripts in that directory
in alphabetical order after those specified in `bootScripts` but before those in the `/server/boot` directory.
