---
title: "Extending built-in models"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Extending-built-in-models.html
summary:
---

## Extending models using JSON

When you create a model with the [model generator](Model-generator.html),
you choose a base model, that is, the model that your model will "extend" and from which it will inherit methods and properties.
The tool will set the  base property in the [model definition JSON file](Model-definition-JSON-file.html) accordingly.
For example, for a model that extends [PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel):

{% include code-caption.html content="/common/models/model.json" %}
```
{
  "name": "Order",
  "base": "PersistedModel",
  ...
```

To change the base model, simply edit the JSON file and change the `base` property.

In general, use `PersistedModel` as the base model when you want to store your data in a database using a connector such as MySQL or MongoDB.
Use `Model` as the base for models that don't have CRUD semantics, for example, using connectors such as SOAP and REST.

{% include tip.html content="The built-in User model provides capabilities to register, authenticate user logins, and recover passwords.  However, it has only `email` and `password` properites; if your application requires a user model with more properties, extend the built-in User model.
See [Managing users](Managing-users.html) for more information.

When you extend the built-in User model, use a model name other than \"User\" such as \"customer,\" or \"client\" so it doesn't conflict with the built-in
[User model](https://apidocs.loopback.io/loopback/#user). To avoid confusion, it's also best to avoid \"user\" with a lowercase \"u\" .
" %}

See [Customizing models](Customizing-models.html) for general information on how to create a model that extends (or "inherits from") another model.

See [LoopBack types](LoopBack-types.html) for information on data types supported.

## Extending a model in JavaScript

You can also extend models using JavaScript file in the model JavaScript file, `/common/models/_modelName_.js` (where _`modelName`_ is the name of the model); for example:

{% include code-caption.html content="/common/models/user.js" %}
```javascript
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

See [LoopBack types](LoopBack-types.html) for information on data types supported.

### Mixing in model definitions

You may want to create models that share a common set of properties and logic.
LoopBack enables you to "mix-in" one or more other models into a single model.
This is a special case of the general ability to mix in model properties and functions. See [Defining mixins](Defining-mixins.html) for more information.

For example:

{% include code-caption.html content="common/models/myModel.js" %}
```javascript
var TimeStamp = modelBuilder.define('TimeStamp', {
  created: Date,
  modified: Date
});
var Group = modelBuilder.define('Group', {
  groups: [String]
});
User.mixin(Group, TimeStamp);
```

### Setting up a custom model

You may want to perform additional setup for an custom model, such as adding remote methods of another model.
To do so, implement a `setup()` method on the new model.
The `loopback.Model.extend()` function calls `setup()` so code you put in `setup()` will automatically get executed when the model is created.

For example: 

{% include code-caption.html content="common/models/myModel.js" %}
```javascript
MyModel = Model.extend('MyModel');

MyModel.on('myEvent', function() {
  console.log('meep meep!');
});

MyExtendedModel = MyModel.extend('MyExtendedModel');

MyModel.emit('myEvent'); // nothing happens (no event listener)

// this is where `setup()` becomes handy

MyModel.setup = function() {
  var MyModel = this;
  // since setup is called for every extended model
  // the extended model will also have the event listener
  MyModel.on('myEvent', function() {
    MyModel.printModelName();
  });
}
```
