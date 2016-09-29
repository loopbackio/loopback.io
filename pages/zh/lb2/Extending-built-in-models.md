---
title: "Extending built-in models"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Extending-built-in-models.html
summary:
---

## Extending models using JSON

When you create a model with the [Model generator](/doc/{{page.lang}}/lb2/Model-generator.html), you choose a base model, that is, the model that your model will "extend" and from which it will inherit methods and properties.  The tool will set the  base property in the [model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) accordingly.  For example, for a model that extends [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel):

**/common/models/model.json**

```js
{
  "name": "Order",
  "base": "PersistedModel",
  ...
```

To change the base model, simply edit the JSON file and change the `base` property.

{% include note.html content="

In general, use `PersistedModel` as the base model when you want to store your data in a database using a connector such as MySQL or MongoDB.  Use `Model` as the base for models that don't have CRUD semantics, for example, using connectors such as SOAP and REST.

" %}

See [Customizing models](/doc/{{page.lang}}/lb2/Customizing-models.html) for general information on how to create a model that extends (or "inherits from") another model.

## Extending a model in JavaScript

You can also extend models using JavaScript file in the model JavaScript file, `/common/models/_modelName_.js` (where _`modelName`_ is the name of the model); for example:

**/common/models/user.js**

```js
var properties = {
  firstName: {
    type: String,
    required: true
  }
};

var options = {
  relations: {
    accessTokens: {
      model: accessToken,
      type: hasMany,
      foreignKey: userId
    },
    account: {
      model: account,
      type: belongsTo
    },
    transactions: {
      model: transaction,
      type: hasMany
    }
  },
  acls: [{
    permission: ALLOW,
    principalType: ROLE,
    principalId: $everyone,
    property: myMethod
  }]
};

var user = loopback.Model.extend('user', properties, options);
```

### Mixing in model definitions

You may want to create models that share a common set of properties and logic.  LoopBack enables you to "mix-in" one or more other models into a single model; for example:

**/common/models/model.js**

```js
var TimeStamp = modelBuilder.define('TimeStamp', {
  created: Date,
  modified: Date
});
var Group = modelBuilder.define('Group', {
  groups: [String]
});
User.mixin(Group, TimeStamp);
```
