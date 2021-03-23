---
title: "Model hooks"
lang: en
layout: navgroup
navgroup: app-logic
toc_level: 1
keywords: LoopBack
tags: [models, application_logic]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Model-hooks.html
summary: Model hooks are deprecated, except for afterInitialize.
---

{% include warning.html content="
Model hooks are deprecated, except for [afterInitialize](#afterInitialize).

Please use [operation hooks](Operation-hooks.html) instead.
" %}

{% include see-also.html content="
* [Remote methods](Remote-methods.html)
* [Remote hooks](Remote-hooks.html)
* [Operation hooks](Operation-hooks.html)
* [Connector hooks](Connector-hooks.html)
* [Tutorial: Adding application logic](Tutorial-Adding-application-logic.html) 
"%}

## Overview

Use model hooks to add custom logic to models that extend [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel).
Each hook is called before or after a specific event in the model's lifecycle.

You can define the following model hooks, listed in the order that the events occur in a model lifecycle:

* `afterInitialize` - triggers after a model has been initialized.
* `beforeValidate` - triggers before validation is performed on a model. 
* `afterValidate` - triggers after validation is performed on a model.
* `beforeSave` - triggers before a model is saved to a data source.
* `afterSave` - triggers after a model is saved to a data source.
* `beforeCreate` - triggers before a model is created.
* `afterCreate` - triggers after a model is created.
* `beforeUpdate` - triggers before a model is updated.
* `afterUpdate` - triggers after a model is updated.
* `beforeDestroy` - triggers before a model is destroyed.
* `afterDestroy` - triggers after a model is destroyed.

Best practice is to register model hooks in `/common/models/your-model.js`. This ensures hooks are registered during application initialization.
If you need to register a hook at runtime, get a reference to the `app` object and register it right then and there.

## afterInitialize

This hook is called after a model is initialized.

{% include important.html content="

This model hook is _not_ deprecated and is still useful. It is a synchronous method: there is no callback function.

" %}

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.afterInitialize = function() {
  //your logic goes here
};
//...
```

Most operations require initializing a model before actually performing an action, but there are a few cases where the initialize event is not triggered,
such as HTTP requests to the `exists`, `count`, or bulk update REST endpoints.

{% include important.html content="
This is the only hook that does not require you to explicitly call `next()` after performing your logic.
" %}

## beforeValidate

This hook is called before [validatation](Validating-model-data.html) is performed on a model.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.beforeValidate = function(next, modelInstance) {
  //your logic goes here - don't use modelInstance
  next();
};
//...
```

{% include important.html content="
In the beforeValidate hook, use `this` instead of `modelInstance` to get a reference to the model being validated. In this hook, `modelInstance` is not valid.
" %}

You must call `next()` to let LoopBack know you're ready to go on after the hook's logic has completed.

{% include warning.html content="
If you don't call `next()`, the application will appear to \"hang\".
" %}

## afterValidate

This hook is called after [validation](Validating-model-data.html) is performed on a model.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.afterValidate(next) {
  //your logic goes here
  next();
};
//...
```

You must call `next()` to let LoopBack know you're ready to go on after the hook's logic has completed.

## beforeCreate

This hook is called just before a model is created.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.beforeCreate = function(next, modelInstance) {
  //your logic goes here
  next();
};
//...
```

LoopBack provides `modelInstance` as a reference to the model being created.  

You must call `next()` to continue execution after the hook completes its logic. If you don't the application will appear to hang.

## afterCreate

This hook is called after a model is created.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.afterCreate = function(next) {
  //your logic goes here
  this.name = 'New coffee shop name; //you can access the created model via `this`
  next();
};
//...
```

Access the model being created with `this`.

You must call `next()` to continue execution after the hook completes its logic. If you don't the application will appear to hang.

## beforeSave

This hook is called just before a model instance is saved.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.beforeSave = function(next, modelInstance) {
  //your logic goes here
  next();
};
//...
```

LoopBack provides `modelInstance` as a reference to the model being saved.

You must call `next()` to continue execution after the hook completes its logic.
If you don't the application will appear to hang.

## afterSave

This hook is called after a model is saved.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.afterSave = function(next) {
  //your logic goes here
  this.name = 'New coffee shop name; //you can access the created model via `this`
  next();
};
//...
```

Access the model being saved with `this`.

You must call `next()` to continue execution after the hook completes its logic. If you don't the application will appear to hang.

## beforeUpdate

This hook is called just before a model is updated.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.beforeUpdate = function(next, modelInstance) {
  //your logic goes here
  next();
};
//...
```

LoopBack provides `modelInstance` as a reference to the model being updated.

You must call `next()` to continue execution after the hook completes its logic. If you don't the application will appear to hang.

## afterUpdate

This hook is called after a model is updated.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.afterUpdate = function(next) {
  //your logic goes here
  this.name = 'New coffee shop name'; //you can access the created model via `this`
  next();
};
//...
```

LoopBack provides `modelInstance` as a reference to the model being saved.

You must call `next()` to continue execution after the hook completes its logic. If you don't the application will appear to hang.

## beforeDestroy

This hook is called just before a model is destroyed.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.beforeDestroy = function(next, modelInstance) {
  //your logic goes here
  next();
};
//...
```

LoopBack provides `modelInstance` as a reference to the model being saved.

You must call `next()` to continue execution after the hook completes its logic. If you don't the application will appear to hang.

## afterDestroy

This hook is called after a model is destroyed.

### Example

{% include code-caption.html content="/common/models/coffee-shop.js" %}
```javascript
//...
CoffeeShop.afterDestroy = function(next) {
  //your logic goes here
  next();
};
//...
```

You must call `next()` to continue execution after the hook completes its logic. If you don't the application will appear to hang.
