---
title: "Customizing models"
layout: navgroup
navgroup: models
keywords: LoopBack
tags: models
lang: en
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Customizing-models.html
summary:
---

Once you've created a model with the [model generator](Model-generator.html), you can start customizing it.
You can customize it using the command-line tool, by editing the [model definition JSON file](Model-definition-JSON-file.html), and by adding JavaScript code.

## Customizing a model with the command-line tool

{% include note.html content="You can't modify an existing model with the  [model generator](Model-generator.html). However, you can customize the model manually and to some degree by using the command-line tool; see below.
" %}

You can use the command-line tool to customize a model after you initially create it; specifically, you can:

* Use the [property generator](Property-generator.html) to add a property to the model.
* Use the [relation generator](Relation-generator.html) to add [add relations between models](Creating-model-relations.html).
* Use [ACL generator](ACL-generator.html) to add [access control](Controlling-data-access.html) to the model.

## Customizing a model using JSON

You can customize a number of aspects of a model by simply editing the
[model definition JSON file](Model-definition-JSON-file.html) in `common/models` (for example, `customer.json`), which by default looks like this:

{% include code-caption.html content="common/models/model.json" %}
```javascript
{
  "name": "myModel",
  "base": "PersistedModel",
  "properties": {
     // Properties listed here depend on your responses to the CLI
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": []
}
```

LoopBack _adds_ the settings in the the model JSON file to those of the base model.
In most cases, this is straightforward, but for ACL settings there can be complex interactions since some ACL settings take precedence over others.
For more information, see [ACL rule precedence](Controlling-data-access.html#acl-rule-precedence) for more information.

### Extending another model

You can make a model extend or "inherit from" an existing model, either one of the built-in models such as User, or a custom model you've defined in your application.
To do this with the [model generator](Model-generator.html), simply choose the desired model when you're prompted to "Select model's base class".
Alternatively,  you can edit the [Model definition JSON file](Model-definition-JSON-file.html) and set the "base" property to the name of the model you want to extend.

{% include note.html content="
In general, use `PersistedModel` as the base model when you want to store your data in a database using a connector such as MySQL or MongoDB.  Use `Model` as the base for models that don't have CRUD semantics, for example, using connectors such as SOAP and REST.
" %}

For example, here is an excerpt from a `customer.json` file that extends the built-in User model to define a new Customer model:

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
  "name": "Customer",
  "base": "User",
  "idInjection": false,
...
```

In general, you can extend any model this way, not just the built-in models.

{% include important.html content="
Currently you cannot modify a built-in model's required properties. If you need to do this, then create your own custom model as a replacement instead.
" %}

You can create custom models that extend from a single base custom model.
For example, to define a model called `MyModel` that extends from a custom model you defined called `mMyBaseModel`,
create MyModel using [model generator](Model-generator.html) 
then edit the JSON file `common/models/MyModel.json` as follows:

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
  "name": "Example",
  "base": "MyBaseModel",
}
```

You can add new properties when you extend a model, for example:

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
   "name": "Customer",
   "base": "User",
   "properties": {
      "favoriteMovie": {
        "type": "string"
      }
   }
}
```

See [LoopBack types](LoopBack-types.html) for information on data types supported.

### Customizing other model settings

Here are some of the most important settings you can customize:

* **plural** - set to a custom string value to use, instead of the default standard plural form.
* **strict** - set to true to make the model save only instances that have the predefined set of properties.
  Any additional properties in a save or update operation are not persisted to the data source. False by default.
* **idInjection** - Whether to automatically add an id property to the model. True by default.
* **http.path** - customized HTTP path of REST endpoints.

See [Model definition JSON file](Model-definition-JSON-file.html#top-level-properties) for more information.

## Customizing a model with JavaScript code

The basic way to extend a model programmatically is to edit the model's JavaScript file in the `common/models/` directory.
For example, a "customer" model will have a `common/models/customer.js` file (if you create the model using the 
[model generator](Model-generator.html)).
The script is executed immediately after the model is defined.
Treat the script as part of the model definition; use it for model configuration and registration.
You could also add model relationships, complex validations, or default functions for certain properties: Basically, anything you cannot do in JSON.
However, note that at this point the script doesn't have access to the app instance.  

You can also extend a model by adding a [remote method](Remote-methods.html) or an  [operation hook](Operation-hooks.html).

If you don't want to expose the method over REST, then just omit the `remoteMethod()` call.

See [Adding application logic](Adding-application-logic.html) for more information on customizing a model using JavaScript.
See [LoopBack types](LoopBack-types.html) for information on data types supported.

### Change the implementation of built-in methods

#### Via server boot script

When you attach a model to a persistent data source, it becomes a _persisted model_ that extends
[PersistedModel](https://apidocs.strongloop.com/loopback/#persistedmodel),
and LoopBack automatically adds a set of built-in methods for CRUD operations.
In some cases, you might want to change the implementation; use a JavaScript file in the `/server/boot` directory to do this.
For example, the following code shows how to reimplement `Note.find()` to override the built-in
[`find()`](http://apidocs.strongloop.com/loopback/#persistedmodelfindfilter-callback) method.

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
module.exports = function(app) {
  var Note = app.models.Note;
  var find = Note.find;
  var cache = {};

  Note.find = function(filter, cb) {
    var key = '';
    if(filter) {
      key = JSON.stringify(filter);
    }
    var cachedResults = cache[key];
    if(cachedResults) {
      console.log('serving from cache');
      process.nextTick(function() {
        cb(null, cachedResults);
      });
    } else {
      console.log('serving from db');
      find.call(Note, function(err, results) {
        if(!err) {
          cache[key] = results;
        }
        cb(err, results);
      });
    }
  }
}
```

#### Via your model's script

Use a JavaScript file in the `common/models` directory to do this

{% include code-caption.html content="common/models/MyModel.js" %}
```javascript
module.exports = function(MyModel) {
  MyModel.on('dataSourceAttached', function(obj){
    var find = MyModel.find;
    MyModel.find = function(filter, cb) {
      return find.apply(this, arguments);
    };
  });
};
```

References:

* [https://github.com/strongloop/loopback/issues/443](https://github.com/strongloop/loopback/issues/443)
* [https://github.com/strongloop/loopback-datasource-juggler/issues/427](https://github.com/strongloop/loopback-datasource-juggler/issues/427)
* [https://github.com/strongloop/loopback/issues/1077](https://github.com/strongloop/loopback/issues/1077)
