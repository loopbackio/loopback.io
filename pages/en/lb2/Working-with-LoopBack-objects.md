---
title: "Working with LoopBack objects"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Working-with-LoopBack-objects.html
summary:
---

## Overview

The primary LoopBack JavaScript objects are:

* [App](http://apidocs.strongloop.com/loopback/#var-app-loopback) object
* [Models](http://apidocs.strongloop.com/loopback/#model)
* [Data sources](http://apidocs.strongloop.com/loopback-datasource-juggler/#define-new-datasource)

How to get a reference to these objects depends on where the code is
(in a boot script, in a model JavaScript file `/common/models/model.js`, and so on) as well as which object you want to reference.

## Getting the app object

Getting a reference to the `app` object is crucial, since from it you can obtain references to other objects such as models and data sources.
You'll typically want to get a handle on the `app` object in:

* Model scripts: `/common/models/_modelName_.js` (where _`modelName`_ is the name of the model).
* Boot scripts in `/``server/boot`
* Middleware (the ones you register in boot scripts and the ones in `/server/server.js`)

* Your own custom scripts

The `app` object provides context into various parts of a typical LB app.

### From a boot script 

To get a reference to the `app` object in a boot script, pass it as the first parameter in the exported function.

Asynchronous boot script with a callback function:

{% include code-caption.html content="Asynchronous boot script - /server/boot/your-script.js" %}
```javascript
module.exports = function(app, cb) { //app is injected by LoopBack
  //...
};
```

Synchronous boot script without a callback function:

{% include code-caption.html content="Synchronous boot script - /server/boot/your-script.js" %}
```javascript
module.exports = function(app) { //app is injected by loopback
  //...
};
```

As you can see from both examples, LoopBack provides the `app` object automatically as the first parameter in your boot scripts.

See [Defining boot scripts](Defining-boot-scripts.html) for more information about boot scripts.

### From middleware

LoopBack sets `app` object automatically in the `request` object in middleware (actually, under the hood, Express does it). You can access in `server/server.js` as follows:

{% include code-caption.html content="Middleware - /server/server.js" %}
```javascript
...
app.use(function(req, res, next) {
  var app = req.app;
  //...
});
...
```

See [Defining middleware](Defining-middleware.html) for more information on middleware.

### From a custom script

If you need a reference to `app` in your own custom scripts, simply require it (as in the models example):

{% include code-caption.html content="A custom script - /server/your-script.js" %}
```javascript
var app = require('/server/server');
...
```

You simply require `/server/server.js` as you would any Node module.

### From a model script

To get a handle on the `app` object in a model scaffolded by the [Model generator](Model-generator.html),
"require" it as you would any Node module:

{% include code-caption.html content="Model - /common/models/book.js" %}
```javascript
var app = require('../../server/server'); //require `server.js` as in any node.js app

module.exports = function(Book) {
  //...
};
```

{% include tip.html content="
This technique is useful to get a reference to an unrelated model; see [Getting a reference to an unrelated model](#getting-a-reference-to-an-unrelated-model) below."
%}

With models, there is a special case. From anywhere except `/common/models/model.js`, you can actually get a reference to `app` through a model using `model.app`.

For instance:

```
...
Book.app
...
```

However, the one caveat to this is that you cannot reference `model.app` in `/common/models/model.js` because this file does not add the `app` property until bootstrapping has finished.
This means you **cannot** do the following in `/common/models/model.js`:

{% include code-caption.html content="CANNOT do this in a model script" %}
```javascript
module.exports = function(Book) {
  Book.app... //won't work because `.app` has not been added to the Book object yet
});
```

However, you can get a reference to the app INSIDE remote methods, remote hooks, and model hooks because those are trigger after the application finishes loading
(that is, after loopback.boot runs | after /server/server.js calls boot(..)).

This means you CAN do:

```javascript
module.exports = function(Book) {
  Book.read(cb) {
    var app = Book.app;
    console.log(app.models...)
    cb();
  };
  Book.remoteMethod(
    'read',
    ...
  });
};
```

Of course, you can do the same in remote hooks and remote methods, but be aware of the load timing.
Simply put, `model.app` will not be available until the application has completed bootstrapping, that is run `boot()` in `/server/server.js`.
The idea here is to define our models _before_ they are added to the application.
Once the application finishes bootstrapping, you can then access a model's `app` property. 

The easiest way of accessing the app object is via `Model.on('attached')` event.

```javascript
module.exports = function(MyModel) {
  var app;
  MyModel.on('attached', function(a) {
    app = a;
    // perform any setup that requires the app object
  });
};
```

## Working with the app object

The LoopBack app object is defined in the main script as follows:

{% include code-caption.html content="/server/server.js" %}
```javascript
var loopback = require('loopback');
var app = loopback();
```

The app object extends the [Express app object;](http://expressjs.com/4x/api.html#application) it inherits all of its properties and methods,
as well as all the additional properties and methods of the [LoopBack app object](http://apidocs.strongloop.com/loopback/#var-app-loopback).

{% include important.html content="
In some places such as boot scripts, `server` is used as the name of this object instead of `app`."
%}

## Working with model objects

### Getting references to models

Once you get a handle on the `app` object, you can get a handle on to specific models via the `models` property on the `app` object.

{% include code-caption.html content="Boot script - /server/boot/your-script.js" %}
```javascript
module.exports = function(app) {
  var app = app.models.Book;
  //...
};
```

In your own custom script:

{% include code-caption.html content="A custom script - /server/your-script.js" %}
```javascript
var app = require('/server/server');
```

### Using model objects

For information on the basic model object, see [Basic model object](Basic-model-object.html).
For information on model object when the model is connected to a persistent data source, see [Connected model object](Connected-model-object.html).

### Getting a reference to an unrelated model

You can easily reference a related model with an expression such as `MyModel.app.models.MyRelatedModel`. 
But this won't work if there is no relation to the other model.  In this case, you need to get a reference to the app object using

```javascript
require('../../server/server')
```

For example, suppose you want to reference the User model within an observer (hook), for example:

{% include code-caption.html content="common/models/my-model.js" %}
```javascript
module.exports = function(MyModel) {
  var app = require('../../server/server');

  MyModel.observe('loaded', function( ctx, next) {
   var User = app.models.User;
   ...
   User.create(...);
   ...
});
```

## Working with data source objects

### Getting references to data sources

Similar to getting a handle on a model you first get a handle onto the `app` object, then you access the `app.datasources` property:

{% include code-caption.html content="Boot script - /server/boot/your-script.js" %}
```javascript
module.exports = function(app) {
  var dataSource = app.datasources.db; //db can be any registered datasource in `/server/datasources.json`
  ...
};
```

And in your own script:

{% include code-caption.html content="A custom script - /server/your-script.js" %}
```javascript
var app = require('./server/server');
...
var datasource = app.datasources.db;
...
```

In middleware:

{% include code-caption.html content="Middleware - /server/server.js" %}
```javascript
...
app.use(function(req, res, next) {
  var dataSource = app.datasources.db;
  ...
});
...
```

In models:

{% include code-caption.html content="Model - /common/models/model.js" %}
```javascript
module.exports = function(Book) {
  Book.read = function() {
    var dataSource = Book.app.datasources.db;
  };
  Book.remoteMethod(
    'read',
     ...
  );
};
```

Be careful in models, because the following _will not work_:

{% include code-caption.html content="Model - /common/models/model.js" %}
```javascript
module.exports = function(Book) {
  Book.app... //`Book` is not registered yet! This WON'T WORK.
};
```

### Using data source objects

{% include note.html content="This section is still in progress. Thanks for your patience."
%}
