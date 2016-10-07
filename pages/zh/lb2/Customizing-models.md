---
title: "Customizing models"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Customizing-models.html
summary:
---

Once you've created a model with the [model generator](/doc/{{page.lang}}/lb2/Model-generator.html) (`slc loopback:model`), you can start customizing it.   You can customize it using slc, by editing the [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html), and by adding JavaScript code.

## Customizing a model with slc

{% include note.html content="

Once you've created a model with the  [model generator](/doc/zh/lb2/Model-generator.html) (`slc loopback:model`), you can't modify the model with the model generator.
However, you can customize the model to some degree with other `slc loopback` generators; see below.

" %}

You can use `slc` to customize a model after you initially create it; specifically, you can:

*   Use `slc loopback:property` to add a property to the model.  See [Property generator](/doc/{{page.lang}}/lb2/Property-generator.html) for more information.
*   Use `slc loopback:relation` to add [add relations beteween models](/doc/{{page.lang}}/lb2/Creating-model-relations.html).  See [Relation generator](/doc/{{page.lang}}/lb2/Relation-generator.html) for more information.
*   Use slc loopback:acl to add [access control](/doc/{{page.lang}}/lb2/Controlling-data-access.html) to the model.  See [ACL generator](/doc/{{page.lang}}/lb2/ACL-generator.html) for more information.

## Customizing a model using JSON

 You can customize a number of aspects of a model by simply editing the [model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) in `/common/models` (for example, `customer.json`), which by default looks like this:

**/common/models/model.json**

```js
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

### Extending another model

You can make a model extend or "inherit from" an existing model, either one of the built-in models such as User, or a custom model you've defined in your application.

  `base` property

Edit the model JSON file and set the "base" property to the name of the model you want to extend: either one of the built-in models, or one of the custom models you've defined in the application.  

{% include note.html content="

In general, use `PersistedModel` as the base model when you want to store your data in a database using a connector such as MySQL or MongoDB.

Use `Model` as the base for models that don't have CRUD semantics, for example, using connectors such as SOAP and REST.

" %}

For example, here is an excerpt from the `customer.json` file from [loopback-example-app](https://github.com/strongloop/loopback-example-app) that extends the built-in User model to define a new Customer model:

**/common/models/model.json**

```js
{
  "name": "Customer",
  "base": "User",
  "idInjection": false,
  ...
```

In general, you can extend any model this way, not just the built-in models.
 
{% include important.html content="

Currently you cannot modify a built-in model's required properties.  If you need to do this, then create your own custom model as a replacement instead.

" %}

You can create custom models that extend from a single base cutom model.  For example, to define a model called `MyModel` that extends from a custom model you defined called `mMyBaseModel`, create MyModel using `slc loopback:model`, then edit the JSON file `common/models/MyModel.json` as follows:

**/common/models/model.json**

```js
{
  "name": "Example",
  "base": "MyBaseModel",
}
```

You can add new properties when you extend a model, for example:

**/common/models/model.json**

```js
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

### Customzing other model settings

Here are some of the most important settings you can customize:

*   **plural** - set to a custom string value to use, instead of the default standard plural form.
*   **strict** - set to true to make the model accept instances that have the predefined set of properties.   False by default
*   **idInjection** - Whether to automatically add an id property to the model.  True by default.
*   **http.path** - customized HTTP path of REST endpoints.

See [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html#ModeldefinitionJSONfile-Top-levelproperties) for more information.

## Customizing a model with JavaScript code

The basic way to extend a model programmatically is to edit the model's JavaScript file in the `common/models/` directory.  For example, a "customer" model will have a `/common/models/customer.js` file (if you create the model using `slc loopback:model`, the [Model generator](/doc/{{page.lang}}/lb2/Model-generator.html)).  The script is executed immediately after the model is defined.  Treat the script as part of the model definition; use it for model configuration and registration.  You could also add model relationships, complex validations, or default functions for certain properties: Basically, anything you cannot do in JSON.  However, note that at this point the script doesn't have access to the app instance.   

You can also extend a model by adding a [remote method](/doc/{{page.lang}}/lb2/6095040.html) or a [model hook](/doc/{{page.lang}}/lb2/6095041.html#id-远程钩子-Modelhooks).

If you don't want to expose the method over REST, then just omit the `remoteMethod()` call.

See [添加应用逻辑](/doc/{{page.lang}}/lb2/6095037.html) for more information on customizing a model using JavaScript.

### Change the implementation of built-in methods 

When you attach a model to a persistent data source, it becomes a _persisted model_ that extends [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel-new-persistedmodel), and LoopBack automatically adds a set of built-in methods for CRUD operations. In some cases, you might want to change the implementation; use a JavaScript file in the `/server/boot` directory to do this.  For example, the following code shows how to reimplement `Note.find()` to override the built-in [find()](http://apidocs.strongloop.com/loopback/#persistedmodelfindfilter-callback) method.

**/server/boot/script.js**

```js
module.exports = function(app) {
  var Note = app.models.Note;
  var find = Note.find;
  var cache = {};

  Note.find = function(filter, cb) {
    var key = '';
    if (filter) {
      key = JSON.stringify(filter);
    }
    var cachedResults = cache[key];
    if (cachedResults) {
      console.log('serving from cache');
      process.nextTick(function() {
        cb(null, cachedResults);
      });
    } else {
      console.log('serving from db');
      find.call(Note, function(err, results) {
        if (!err) {
          cache[key] = results;
        }
        cb(err, results);
      });;
    }
  }
}
```

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <ul>
    <li>extending models
      <ul>
        <li>overview
          <ul>
            <li>what is model inheritance/extending a model</li>
            <li>depends if you're talking about built-in vs user-defined</li>
            <li>modifying model properties (built-ins and user-defined)</li>
          </ul>
        </li>
        <li>extending built in models
          <ul>
            <li>why/use case<br>
              <ul>
                <li>because you cannot modify built-in model properties</li>
                <li>solution is to extend the model and add in your custom properties</li>
                <li>can you override built in properties?
                  <ul>
                    <li>if so describe the process</li>
                    <li>caveats</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>how to/example</li>
          </ul>
        </li>
        <li>extending user-defined models
          <ul>
            <li>extending models created from slc loopback:model
              <ul>
                <li>example</li>
              </ul>
            </li>
            <li>extending models created via discovery
              <ul>
                <li>example</li>
              </ul>
            </li>
            <li>extending models create via introspection
              <ul>
                <li>example</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
