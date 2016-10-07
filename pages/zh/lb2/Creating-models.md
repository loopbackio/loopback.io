---
title: "Creating models"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Creating-models.html
summary:
---



## Overview

You can create LoopBack models in various ways, depending on what kind of data source the model is based on.  You can:

*   [Using the model generator](/doc/{{page.lang}}/lb2/Using-the-model-generator.html), `slc loopback: model`.
*   [Create models from an existing relational](/doc/{{page.lang}}/lb2/Discovering-models-from-relational-databases.html) using the discovery API.  Then you can keep your model synchronized with the database using LoopBack's [schema / model synchronization](/doc/{{page.lang}}/lb2/Creating-a-database-schema-from-models.html) API.
*   [Create by instance introspection](/doc/{{page.lang}}/lb2/Creating-models-from-unstructured-data.html) for free-form data in NoSQL databases or REST APIs.

## Getting a reference to a model in JavaScript

The way that you get a reference (or "handle") to a model in JavaScript code depends on where the code is.

### In model JavaScript file

In the model JavaScript file (for example) the models is passed into the top-level function, so the model object is available directly; for example:

**/common/models/model.js**

```
module.exports = function(Customer) {
  Customer.create( ... );  // Customer object is available 
  ...
```

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Can you get a reference to any other models? How?</div>

### In a boot script

In a boot script, use the `app.models` object to get a reference to any model; for example:

**/server/boot/script.js**

```
module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var Team = app.models.Team;
  ...
```
