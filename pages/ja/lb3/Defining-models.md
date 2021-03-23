---
title: "Defining models"
lang: ja
layout: page
toc: false
keywords: LoopBack
tags: models
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Defining-models.html
redirect_from: /doc/ja/lb3/Creating-models.html
summary: Models provide Node and REST APIS for interacting with data sources, performing data validation, and representing relationships among data.
---

{% include content/ja/gs-prereqs.html %}

## Overview

A _LoopBack model_ is a JavaScript object with both Node and REST APIs that represents data in backend systems such as databases.  Models are connected to backend systems via data sources.  You use the model APIs to interact with the data source to which it is attached.
Additionally, you can add functionality such as validation rules and business logic to models.

Every LoopBack application has a set of predefined [built-in models](Using-built-in-models.html) such as User, Role, and Application.
You can [extend built-in models](Extending-built-in-models.html) to suit your application's needs.  

Additionally, you can [define your own custom models](Creating-models.html) specific to your application.  You can create LoopBack models several different ways:

* With the command-line tool, by using [the LoopBack model generator](Using-the-model-generator.html).
* From an existing relational database, by using [_model discovery_](Discovering-models-from-relational-databases.html).
* From free-form data in NoSQL databases or REST APIs by using [_instance introspection_](Creating-models-from-unstructured-data.html).

These methods all create a [Model definition JSON file](Model-definition-JSON-file.html) that defines your model in LoopBack.

You can also create and customize models programmatically using the 
[LoopBack API](http://apidocs.loopback.io/loopback/#loopback-createmodel), or by manually editing the [model definition JSON file](Model-definition-JSON-file.html).
In most cases, you shouldn't need to use those techniques to create models, but you generally will use them to modify and customize models.

Once you've created a model, you can [customize it](Customizing-models.html) to suit your needs, and also add [data validation](Validating-model-data.html) and create [relationships among models](Creating-model-relations.html).

Models come with a standard set of REST endpoints for create, read, update, and delete (CRUD) operations on model data.  You can customize a model's endpoints; see [Exposing models over REST](Exposing-models-over-REST.html).

## Getting a reference to a model in JavaScript

The way that you get a reference (or "handle") to a model in JavaScript code depends on where the code is.

### In model JavaScript file

{% include warning.html content="In model JavaScript files (for example, for a \"foo\" model, `common/models/foo.js`) you cannot access model relations since models are not yet loaded.
You must perform relation operations in boot scripts.
" %}

In the model JavaScript file, the model is passed into the top-level function, so the model object is available directly; for example for a "customer" model:

{% include code-caption.html content="/common/models/customer.js" %}
```javascript
module.exports = function(Customer) {
  // Customer object is available 
  //...
}
```

{% include note.html title="Promises" content="
LoopBack also supports [Promises](https://www.promisejs.org/) in addition to callbacks for CRUD methods of a model and its related models.
" %}

### In a boot script

In a boot script, use the `app.models` object to get a reference to any model; for example:

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Team = app.models.Team;
  //...
}
```
