---
title: "Events"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Events.html
summary:
---

The [LoopBack app object](http://apidocs.strongloop.com/loopback/#var-app-loopback) is a Node
[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), and thus has
[`app.emit()`](https://nodejs.org/api/events.html#events_emitter_emit_eventname_arg1_arg2) and
[`app.on()`](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener) methods.

In addition to the [standard Node events](http://nodejs.org/api/events.html), LoopBack applications and models emit other events.

## Application events

By default, an application scaffolded with `apic loopback` emits a 'started' event when it starts up, after running [boot scripts](Defining-boot-scripts.html).

## Model events

All models emit the following events:

By default, the basic LoopBack [Model object](http://apidocs.strongloop.com/loopback/#model) has properties and methods "mixed in" from:

* [Inclusion object](http://apidocs.strongloop.com/loopback-datasource-juggler/#inclusion) - Enables you to load relations of several objects and optimize numbers of requests.
* [Validateable object](http://apidocs.strongloop.com/loopback-datasource-juggler/#validatable) - provides validation methods.
  See [Validating model data](Validating-model-data.html).

When you define relations between models, the [RelationMixin object](http://apidocs.strongloop.com/loopback-datasource-juggler/#relationmixin) object also gets mixed in to the model object.

### changed

Emitted after a model has been successfully created, saved, or updated. Argument: `inst`, model instance, object.

For example:

```javascript
MyModel.on('changed', function(inst) {
  console.log('model with id %s has been changed', inst.id);
  // => model with id 1 has been changed
});
```

### deleted

Emitted after an individual model has been deleted. Argument: `id`, model ID (number).

For example:

```javascript
MyModel.on('deleted', function(id) {
  console.log('model with id %s has been deleted', id);
  // => model with id 1 has been deleted
});
```

### deletedAll

Emitted after an individual model has been deleted. Argument: `where` (optional), where filter, JSON object.

For example:

```javascript
MyModel.on('deletedAll', function(where) {
  if (where) {
    console.log('all models where ', where, ' have been deleted');
    // => all models where
    // => {price: {gt: 100}}
    // => have been deleted
  }
});
```

### attached

Emitted after a `Model` has been attached to an `app`.

### dataSourceAttached

Emitted after a `Model` has been attached to a `DataSource`.

### set

Emitted when model property is set. Argument: `inst`, model instance, object.

For example:

```javascript
MyModel.on('set', function(inst) {
  console.log('model with id %s has been changed', inst.id);
  // => model with id 1 has been changed
});
```

Arguments: data, an object.

## PersistedModel events

PersistedModels also have a changed event that listens for model changes.

For example:

```javascript
MyPersistedModel.on('changed', function(obj) {
   console.log(obj) // => the changed model
});
```

## User model events

The User model [`User.resetPassword()`](http://apidocs.strongloop.com/loopback/#user-resetpassword) method emits the 'resetPasswordRequest' event.