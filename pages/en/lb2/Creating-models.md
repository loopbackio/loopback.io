---
title: "Creating models"
lang: en
layout: navgroup
navgroup: models
keywords: LoopBack
tags: models
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Creating-models.html
summary: You can create models with the model generator, by "discovery" from existing an existing database schema, and by instance introspection for non-relational data sources.
---

## Overview

You can create LoopBack models in various ways, depending on what kind of data source the model is based on.
You can create models:

* [With the LoopBack model generator](Using-the-model-generator.html).
* [From an existing relational database](Discovering-models-from-relational-databases.html) using _model discovery_.
  Then you can keep your model synchronized with the database using LoopBack's 
  [schema / model synchronization](Creating-a-database-schema-from-models.html) API.
* [By instance introspection](Creating-models-from-unstructured-data.html) for free-form data in NoSQL databases or REST APIs.

All three of these methods create a 
[Model definition JSON file](Model-definition-JSON-file.html) that defines your model in LoopBack,
by convention in a LoopBack project's `common/models` directory; for example, `common/models/account.json`.

You can also create and customize models programmatically using the 
[LoopBack API](http://apidocs.strongloop.com/loopback/#loopback-createmodel), or by manually editing the 
[model definition JSON file](Model-definition-JSON-file.html).
In most cases, you shouldn't need to use those techniques to create models, but you generally will use them to modify and customize models.

## Getting a reference to a model in JavaScript

The way that you get a reference (or "handle") to a model in JavaScript code depends on where the code is.

### In model JavaScript file

{% include warning.html content="In model JavaScript files (for example, for a \"foo\" model, `common/models/foo.js`) you cannot access model relations since models are are not yet loaded.
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
