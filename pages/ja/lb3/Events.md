---
title: "Events"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Events.html
summary:
---

The [LoopBack app object](http://apidocs.loopback.io/loopback/#var-app-loopback) is a Node
[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), and thus has
[`app.emit()`](https://nodejs.org/api/events.html#events_emitter_emit_eventname_arg1_arg2) and
[`app.on()`](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener) methods.

In addition to the [standard Node events](http://nodejs.org/api/events.html), LoopBack applications and models emit other events.

## Application events

By default, an application created with the [application generator](Application-generator.html) emits a 'started' event when it starts up, after running [boot scripts](Defining-boot-scripts.html).

## Model events

All models emit the following events:

By default, the basic LoopBack [Model object](http://apidocs.loopback.io/loopback/#model) has properties and methods "mixed in" from:

* [Inclusion object](http://apidocs.loopback.io/loopback-datasource-juggler/#inclusion) - Enables you to load relations of several objects and optimize numbers of requests.
* [Validateable object](http://apidocs.loopback.io/loopback-datasource-juggler/#validatable) - provides validation methods.
  See [Validating model data](Validating-model-data.html).

When you define relations between models, the [RelationMixin object](http://apidocs.loopback.io/loopback-datasource-juggler/#relationmixin) object also gets mixed in to the model object.

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

## User model events

The User model [`User.resetPassword()`](http://apidocs.loopback.io/loopback/#user-resetpassword) method emits the 'resetPasswordRequest' event.
