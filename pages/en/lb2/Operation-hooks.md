---
title: "Operation hooks"
lang: en
layout: navgroup
toc_level: 2
navgroup: app-logic
keywords: LoopBack
tags: application_logic
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Operation-hooks.html
summary: Operation hooks are triggered by all methods that execute a particular high-level create, read, update, or delete operation.
---
## Overview

_Operation hooks_ are not tied to a particular method, but rather are triggered from all methods that execute a particular high-level create, read, update, or delete operation.
These are all methods of [PersistedModel](https://apidocs.strongloop.com/loopback/#persistedmodel) that application models inherit. 
Using operation hooks enables you to intercept actions that modify data independent of the specific method that invokes them (for example, `create`, `save`, or `updateOrCreate`).

{% include note.html content="
In general, use operation hooks instead of deprecated [model hooks](Model-hooks.html) to do something when a model performs a specific operation.
" %}

The API is simple: the method <code>Model.observe(<i>name</i>, <i>observer</i>)</code>, where _`name`_ is the string name of the operation hook, for example "before save",
and _`observer`_ is `function observer(context, callback)`. Child models inherit observers, and you can register multiple observers for a hook.

 The following table summarizes the operation hooks invoked by PersistedModel create, retrieve, update, and delete methods.

<table>
  <tbody>
    <tr>
      <th>
        <p> Method</p>
        <p>Operation hook</p>
      </th>
      <th>find<br><span>findOne</span><br><span>findById</span>&nbsp;</th>
      <th>exists</th>
      <th>count</th>
      <th>create</th>
      <th>upsert</th>
      <th>findOrCreate</th>
      <th>deleteAll<br>deleteById&nbsp;</th>
      <th>updateAll</th>
      <th>prototype<br>.save</th>
      <th>prototype<br>.delete</th>
      <th>prototype<br>.updateAttributes</th>
    </tr>
    <tr>
      <th>access</th>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th>before save</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
    </tr>
    <tr>
      <th>after save</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
    </tr>
    <tr>
      <th>before delete</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th>after delete</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th>loaded</th>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
    </tr>
    <tr>
      <th>persist</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
    </tr>
  </tbody>
</table>


### Using async/await

Operation hooks can also return a promise instead of calling the next parameter.

{% include code-caption.html content="/common/models/MyModel.js" %}
```javascript
MyModel.observe('before save', async function(ctx) {
  //...
  return;
});
```

### Operation hook context object

The `context` object is specific to operation hooks and does not have any relation to the context object passed to remote hooks registered via `Model.beforeRemote` and `Model.afterRemote`.
See [Remote hooks](Remote-hooks.html) for more information.
Note that the context object is not related to the "current context" provided by `loopback.getCurrentContext()` either.

#### Properties common for all hooks and operations

##### Target model

The property `context.Model` is set to the constructor of the model that is the target of the operation.
For example `Product.find()` sets `context.Model = Product`.

##### Operation options

The context object has an `options` property that enables hooks to access any options provided by the caller of the specific model method (operation).

For example:

```javascript
var FILTERED_PROPERTIES = ['immutable', 'birthday'];
MyModel.observe('before save', function filterProperties(ctx, next) {
  if (ctx.options && ctx.options.skipPropertyFilter) return next();
  if (ctx.instance) {
    FILTERED_PROPERTIES.forEach(function(p) {
      ctx.instance.unsetAttribute(p);
    });
  } else {
    FILTERED_PROPERTIES.forEach(function(p) {
      delete ctx.data[p];
    });
  }
  next();
});

// immutable is not updated
MyModel.updateOrCreate({
  id: 1,
  immutable: 'new value'
}, cb);

// immutable is changed
MyModel.updateOrCreate({
  id: 2,
  immutable: 'new value'
}, {
  skipPropertyFilter: true
}, cb);
```

##### Shared hookState property

The `ctx.hookState` property is preserved across all hooks invoked for a single operation.

For example, both "access", "before save" and "after save" invoked for `Model.create()` have the same object passed in `ctx.hookState`.

This way the hooks can pass state date between "before" and "after" hook.

#### Hook and operation specific properties

Besides the common properties listed above, each hook provides additional properties identifying the model instance(s) affected by the operation and the changes applied.
The general rule is that the context provides either an `instance` property or a pair of `data` and `where` properties.

##### instance

This property is provided when the operation affects a single instance _and_ performs a full update/create/delete of all model properties, for example `PersistedModel.create()`.

##### where - data

When the operation affects multiple instance (e.g. `PersistedModel.updateAll()`) _or_ performs a partial update of a subset of model properties
(e.g. `PersistedModel.prototype.updateAttributes()`), the context provides a [where filter](Where-filter.html) used
to find the affected records and plain `data` object containing the changes to be made.

##### isNewInstance

Some operations provide a flag to distinguish between a CREATE operation and an UPDATE operation.
See the documentation of individual hooks for more information.

{% include important.html content="
Only certain connectors support `ctx.isNewInstance`. With other connectors it is undefined.  See [Checking for support of ctx.isNewInstance](#checking-for-support-ofctxisnewinstance).
" %}

##### currentInstance

This property is provided by hooks that perform a partial change of a single instance.
It contains the affected model instance, you should treat the value as read only (immutable).

### Checking for support of ctx.isNewInstance

The initial implementation of `ctx.isNewInstance` included only support for memory, MongoDB, and MySQL connectors.
You can check whether your connector supports this feature by testing the value returned in "after save" hook.

For example:

```javascript
MyModel.observe('after save', function(ctx, next) {
  console.log('supports isNewInstance?', ctx.isNewInstance !== undefined);
  next();
});
// It's important to provide a value for the id property
// Include also values for any required properties
MyModel.updateOrCreate({
  id: 123
}, console.log);
```

Please report a GitHub issue in the connector project if the feature is not supported.

### Accessing the affected instance

Operations affecting a single instance only  (all create, retrieve, update, and delete operations except `PersistedModel.deleteAll` and `PersistedModel.updateAll`)
usually provide the affected instance in the context object.
However, depending on the operation, this instance is provided either as modifiable `ctx.instance` or as read-only `ctx.currentInstance:`

<table>
  <tbody>
    <tr>
      <th width="120">Operation</th>
      <th width="120">before save</th>
      <th width="140">persist</th>
      <th width="140">after save</th>
      <th width="60">before delete</th>
      <th width="60">after delete</th>
    </tr>
    <tr>
      <td><code>create</code></td>
      <td><code>ctx.instance</code></td>
      <td><code>ctx.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;"><span>---</span></td>
    </tr>
    <tr>
      <td><code>findOrCreate</code></td>
      <td><code>ctx.instance</code></td>
      <td><code>ctx.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;"><span>---</span></td>
      <td style="text-align: center;"><span>---</span></td>
    </tr>
    <tr>
      <td><code>updateOrCreate</code></td>
      <td><em>n/a*</em></td>
      <td><code>ctx.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;"><span>---</span></td>
      <td style="text-align: center;"><span>---</span></td>
    </tr>
    <tr>
      <td><code>updateAll</code></td>
      <td><em>n/a</em></td>
      <td><em>n/a</em></td>
      <td><em>n/a</em></td>
      <td style="text-align: center;"><span>---</span></td>
      <td style="text-align: center;"><span>---</span></td>
    </tr>
    <tr>
      <td><code>prototype.save</code></td>
      <td><code>ctx.instance</code></td>
      <td><code>ctx.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;"><span>---</span></td>
      <td style="text-align: center;"><span>---</span></td>
    </tr>
    <tr>
      <td><code>prototype.updateAttributes</code></td>
      <td><code><span>ctx.currentInstance</span></code></td>
      <td><code><span>ctx.currentInstance</span></code></td>
      <td><code><span>ctx.instance</span></code></td>
      <td style="text-align: center;"><span>---</span></td>
      <td style="text-align: center;"><span>---</span></td>
    </tr>
    <tr>
      <td>
        <p><code>prototype.delete</code></p>
      </td>
      <td style="text-align: center;"><span>---</span></td>
      <td style="text-align: center;"><span>---</span></td>
      <td style="text-align: center;"><span>---</span></td>
      <td><code><span>ctx.where.id</span></code></td>
      <td><code><span>ctx.where.id</span></code></td>
    </tr>
    <tr>
      <td><code>deleteAll</code></td>
      <td style="text-align: center;"><span>---</span></td>
      <td style="text-align: center;"><span>---</span></td>
      <td style="text-align: center;"><span>---</span></td>
      <td><em>n/a</em></td>
      <td><em>n/a</em></td>
    </tr>
  </tbody>
</table>

(*) The operation `updateOrCreate` does not provide any instance in the "before save" hook.
Because we cannot tell in advance whether the operation will result in UPDATE or CREATE, we cannot tell whether there is any existing "currentInstance" affected by the operation.

See the following sections for more details.

## Hooks

LoopBack provides the following operation hooks:

* [access](Operation-hooks.html#access)
* [before save](Operation-hooks.html#before-save)
* [after save](Operation-hooks.html#after-save)
* [before delete](Operation-hooks.html#before-delete)
* [after delete](Operation-hooks.html#after-delete)
* [loaded](Operation-hooks.html#loaded)
* [persist](Operation-hooks.html#persist)

The following table lists hooks that PersistedModel methods invoke.

<table>
  <tbody>
    <tr>
      <th>Method name</th>
      <th>Hooks invoked</th>
    </tr>
    <tr>
      <td>
        <p>all<br>find<br>findOne&nbsp;<br>findById&nbsp;&nbsp;<br>exists<br>count&nbsp;</p>
      </td>
      <td>access, loaded</td>
    </tr>
    <tr>
      <td>create</td>
      <td>before save, after save, loaded, persist</td>
    </tr>
    <tr>
      <td>upsert (aka updateOrCreate)</td>
      <td>access, before save, after save, loaded, persist</td>
    </tr>
    <tr>
      <td>findOrCreate</td>
      <td>access, before save*, after save*, loaded, persist</td>
    </tr>
    <tr>
      <td>deleteAll (aka destroyAll)<br>deleteById&nbsp;(aka destroyById)</td>
      <td>access, before delete, after delete</td>
    </tr>
    <tr>
      <td>updateAll</td>
      <td>access, before save, after save, persist</td>
    </tr>
    <tr>
      <td>prototype.save</td>
      <td>before save, after save, persist, loaded</td>
    </tr>
    <tr>
      <td>prototype.delete</td>
      <td>before delete, after delete</td>
    </tr>
    <tr>
      <td>prototype.updateAttributes</td>
      <td>before save, after save, loaded, persist</td>
    </tr>
  </tbody>
</table>

NOTE: When `findOrCreate` finds an existing model, the save hooks are not triggered.
However, connectors providing atomic implementation may trigger `before save` hook even when the model is not created,
since they cannot determine in advance whether the model will be created or not.

### access

The `access` hook is triggered whenever a database is queried for models, that is when _any_ create, retrieve, update, and delete method of
[PersistedModel](https://apidocs.strongloop.com/loopback/#persistedmodel) is called.
Observers may modify the query, for example by adding extra restrictions.

{% include note.html content="
Prototype methods don't trigger the `access` hook because the hook was already triggered by the method that loaded the model instance from the database.

For example, when you call a prototype method via the REST API, two model calls are made: static `findById()`
(that triggers the \"access\" hook) and then the prototype method as requested.
" %}

Context properties

* `Model` - the constructor of the model that will be queried
* `query` - the query containing fields `where`, `include`, `order`, etc.

Examples:

```javascript
MyModel.observe('access', function logQuery(ctx, next) {
  console.log('Accessing %s matching %s', ctx.Model.modelName, ctx.query.where);
  next();
});

MyModel.observe('access', function limitToTenant(ctx, next) {
  ctx.query.where.tenantId = loopback.getCurrentContext().tenantId;
  next();
});
```

### before save

The `before save` hook is triggered before a model instance is modified (created, updated),
specifically when the following methods of PersistedModel are called:

* [create()](https://apidocs.strongloop.com/loopback/#persistedmodel-create)
* [upsert()](https://apidocs.strongloop.com/loopback/#persistedmodel-upsert)
* [findOrCreate()](https://apidocs.strongloop.com/loopback/#persistedmodel-findorcreate)*
* [updateAll()](https://apidocs.strongloop.com/loopback/#persistedmodel-updateall)
* [prototype.save()](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-save)
* [prototype.updateAttributes()](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-updateattributes)

NOTE: When `findOrCreate` finds an existing model, the save hooks are not triggered.
However, connectors providing atomic implementation may trigger `before save` hook even when the model is not created,
since they cannot determine in advance whether the model will be created or not.

The hook is triggered _before_ [model validation](Validating-model-data.html) functions are called.

{% include tip.html content="
Since the `before save` hook is triggered before validators are called, you can use it to ensure that empty or missing values are filled with default values.
" %}

Depending on which method triggered this hook, the context will have one of the following sets of properties:

* Full save of a single model
  * `Model` - the constructor of the model that will be saved
  * `instance` - the model instance to be saved. The value is an instance of `Model` class.
* Partial update of possibly multiple models
  * `Model` - the constructor of the model that will be saved
  * `where` - the where filter describing which instances will be affected
  * `data` - the (partial) data to apply during the update
  * `currentInstance` - the instance being affected, see [Triggering with prototype.updateAttributes](#triggering-with-prototypeupdateattributes) below.

#### ctx.isNewInstance

The before save hook provides the `ctx.isNewInstance` property when `ctx.instance` is set, with the following values:

* True for all CREATE operations
* False for all UPDATE operations
* Undefined for `updateOrCreate`, `prototype.save`,  `prototype.updateAttributes`, and `updateAll `operations.

#### Embedded relations

You can define a `before save` hook for a model that is [embedded in](Embedded-models-and-relations.html) another model.
Then, updating or creating an instance of the containing model will trigger the operation hook on the embedded model.
When this occurs, `ctx.isNewInstance` is false, because only a new instance of the container model is created.

For example, if `Customer embedsOne Address`, and you define a `before save` hook on the Address model,
creating a new Customer instance will trigger the operation hook.

#### Manipulating model data in "before save" hook

As explained above, the context provides either an `instance` property or a pair of `data` and `where` properties.
Exposing a full model instance in `ctx.instance` allows hooks to call custom model instance methods
(for example , the hook can call `order.recalculateShippingAndTaxes()` whenever order data like address was changed).
That's why LoopBack create, retrieve, update, and delete operations provide the instance if possible.

There are two notable exception when it is not feasible to provide the instance object:

1.  `PersistedModel.updateAll` updates multiple instances matching the provided query. LoopBack does not even load their data from the database,
    it's up to the database to find these instances and apply necessary changes. 
2.  `PersistedModel.updateAttributes` performs a partial update, only a subset of model properties is modified.
    While LoopBack has a model instance available, it also needs to know which of model properties should be changed in the database.
    Passing the operation payload in `ctx.data` - a plain object containing only those properties which should be modified - makes it easy for
    hook implementations to add/remove the properties to modify.
    You can still access the model instance to be modified via `ctx.currentInstance` as long as you treat it as immutable (read-only).

#### Examples

```javascript
MyModel.observe('before save', function updateTimestamp(ctx, next) {
  if (ctx.instance) {
    ctx.instance.updated = new Date();
  } else {
    ctx.data.updated = new Date();
  }
  next();
});

MyModel.observe('before save', function computePercentage(ctx, next) {
  if (ctx.instance) {
    ctx.instance.percentage = 100 * ctx.instance.part / ctx.instance.total;
  } else if (ctx.data.part && ctx.data.total) {
    ctx.data.percentage = 100 * ctx.data.part / ctx.data.total;
  } else if (ctx.data.part || ctx.data.total) {
    // either report an error or fetch the missing properties from DB
  }
  next();
});
```

#### Removing unneeded properties

To remove (unset) a property in a model instance, it is not enough the set its value to undefined and/or delete the property.
One has to call `unsetAttribute(name)` instead. However, don't forget to handle the case where the context has a data property instead!
Since the data object is a plain object, you can remove properties the usual way via delete operator.

Example:

```javascript
MyModel.observe('before save', function removeUnwantedField(ctx, next) {
  if (ctx.instance) {
    ctx.instance.unsetAttribute('unwantedField');
  } else {
    delete ctx.data.unwantedField;
  }
  next();
});
```

This completely removes the field and prevents inserting spurious data into the database.

### after save

The `after save` hook is called after a model change was successfully persisted to the datasource,
specifically when the following methods of PersistedModel are called:

* [create()](https://apidocs.strongloop.com/loopback/#persistedmodel-create)
* [upsert()](https://apidocs.strongloop.com/loopback/#persistedmodel-upsert)
* [findOrCreate()](https://apidocs.strongloop.com/loopback/#persistedmodel-findorcreate)*
* [updateAll()](https://apidocs.strongloop.com/loopback/#persistedmodel-updateall)
* [prototype.save()](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-save)
* [prototype.updateAttributes()](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-updateattributes)

NOTE: When `findOrCreate` finds an existing model, the save hooks are not triggered.
However, connectors providing atomic implementation may trigger `before save` hook even when the model is not created,
since they cannot determine in advance whether the model will be created or not.

Depending on which method triggered this hook, the context will have one of the following sets of properties:

* A single model was updated:
* `Model` - the constructor of the model that will be saved.
* `instance` - the model instance that was saved. The value is an instance of `Model` class and contains updated values computed by datastore (for example, auto-generated ID).

{% include note.html content="
The after save hook returns the changes made to `ctx.instance` to the caller (REST client), but does not persist them to the database!
" %}

* Partial update of more model instances via `Model.updateAll`:
* `Model` - the constructor of the model that will be saved.
* `where` - the where filter describing which instances were queried. See caveat below.
* `data`- the (partial) data applied during the update. 

You cannot reliably use the \"where\" query in an after save hook to find which models were affected. Consider the following call:

```javascript
MyModel.updateAll({ color: 'yellow' }, { color: 'red' }, cb);
```

At the time the \"after save\" hook is run, no records will match the query `{ color: 'yellow' }`.

The `after save` hook provides the `ctx.isNewInstance` property whenever `ctx.instance` is set, with the following values:

* True after all CREATE operations.
* False after all UPDATE operations.
* The operations `updateOrCreate`, `prototype.save`, and `prototype.updateAttributes` require connectors to report
  whether a new instance was created or an existing instance was updated.
  When the connector provides this information, `ctx.isNewInstance` is True or False. 
  When the connector does not support this feature yet (see below), the value is undefined.

{% include important.html content="
Only certain connectors support `ctx.isNewInstance`. With other connectors it is undefined.
See [Checking for support of ctx.isNewInstance](#Checking-for-support-of-ctx.isNewInstance).
" %}

#### Embedded relations

You can define an `after save` hook for a model that is [embedded in](Embedded-models-and-relations.html) another model.
Then, updating or creating an instance of the containing model will trigger the operation hook on the embedded model.
When this occurs, `ctx.isNewInstance` is false, because only a new instance of the embedding model is created.

For example, if `Customer embedsOne Address`, and you define a `after save` hook on the Address model,
creating a new Customer instance will trigger the operation hook.

#### Examples

```javascript
MyModel.observe('after save', function(ctx, next) {
  if (ctx.instance) {
    console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id);
  } else {
    console.log('Updated %s matching %j',
      ctx.Model.pluralModelName,
      ctx.where);
  }
  next();
});
```

### before delete

The `before delete` hook is triggered before a model is removed from a datasource, specifically when the following methods of PersistedModel are called:

* [`destroyAll()`](https://apidocs.strongloop.com/loopback/#persistedmodel-destroyall) (same as `deleteAll()`)
* [`destroyById()`](https://apidocs.strongloop.com/loopback/#persistedmodel-destroybyid)(same as `deleteById()`)
* [`prototype.destroy()`](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-destroy) (same as `prototype.delete()`)

{% include important.html content="
The `before delete` operation hook does not receive a list of deleted model instance IDs, because backend data stores such as relational or NoSQL databases don't provide this information.
However, _when deleting a single model instance_ the hook receives `ctx.where` that contains the `id` of the instance being deleted
" %}

Context properties

* `Model` - the constructor of the model that will be queried
* `where` - the where filter describing which instances will be deleted.

Example:

```javascript
MyModel.observe('before delete', function(ctx, next) {
  console.log('Going to delete %s matching %j',
    ctx.Model.pluralModelName,
    ctx.where);
  next();
});
```

To reject the deletion of a model based on some condition, call `next()` with an error to abort the delete operation.

For example:

```javascript
if (subscriptions.length > 0) {
  //Stop the deletion of this Client
  var err = new Error("Client has an active subscription, cannot delete");
  err.statusCode = 400;
  console.log(err.toString());
  next(err);
} else {
  next();
}
```

### after delete

{% include important.html content="
The `after delete` operation hooks do not receive a list of deleted model instance IDs, because backend data stores such as relational or
NoSQL databases don't provide this information. However, _when deleting a single model instance_ the hook receives `ctx.where` that contains the `id` of the instance being deleted.
" %}

The `after delete` hook is triggered after some models are removed from the datasource, specifically when the following methods of PersistedModel are called:

* [`destroyAll()`](https://apidocs.strongloop.com/loopback/#persistedmodel-destroyall) (same as `deleteAll()`)
* [`destroyById()`](https://apidocs.strongloop.com/loopback/#persistedmodel-destroybyid)(same as `deleteById()`)
* [`prototype.destroy()`](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-destroy) (same as `prototype.delete()`)

Context properties

* `Model` - the constructor of the model that will be queried
* `where` - the where filter describing which instances were deleted.

Example:

```javascript
MyModel.observe('after delete', function(ctx, next) {
  console.log('Deleted %s matching %j',
    ctx.Model.pluralModelName,
    ctx.where);
  next();
});
```

### loaded

This hook is triggered by the following methods of PersistedModel:

* [`find()`](https://apidocs.strongloop.com/loopback/#persistedmodel-find)
* [`findOne()`](https://apidocs.strongloop.com/loopback/#persistedmodel-findone)
* [`findById()`](https://apidocs.strongloop.com/loopback/#persistedmodel-findbyid)
* [`exists()`](https://apidocs.strongloop.com/loopback/#persistedmodel-exists)
* [`count()`](https://apidocs.strongloop.com/loopback/#persistedmodel-count)
* [`create()`](https://apidocs.strongloop.com/loopback/#persistedmodel-create)
* [`upsert()`](https://apidocs.strongloop.com/loopback/#persistedmodel-upsert) (same as `updateOrCreate()`)
* [`findOrCreate()`](https://apidocs.strongloop.com/loopback/#persistedmodel-findorcreate)*
* [`prototype.save()`](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-save)
* [`prototype.updateAttributes()`](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-updateattributes)

{% include important.html content="
By default, `create` and `updateAttributes` do not apply database updates to the model instance returned to the callback, therefore any changes made by \"loaded\" hooks are discarded. To change this behavior, set a per-model option `updateOnLoad: true`.
" %}

LoopBack invokes this hook after the connector fetches data, but before creating a model instance from that data.
This enables hooks to decrypt data (for example). NOTE: This hook is called with the raw database data, not a full model instance.

Context properties

* `data` - the data returned by the connector (loaded from the database)

{% include note.html content="In LoopBack 2.x, the `find*` methods (`find`, `findOne`, `findById` and `findByIds`) provide `instance` in their loaded operation hook. All other methods provide the `data` object in their loaded operation hook.  This difference is corrected in version 3.0
" %}

### persist

This hook is triggered by operations that persist data to the datasource, specifically, the following methods of PersistedModel:

* [`create()`](https://apidocs.strongloop.com/loopback/#persistedmodel-create)
* [`upsert()`](https://apidocs.strongloop.com/loopback/#persistedmodel-upsert) (same as `updateOrCreate()`)
* [`findOrCreate()`](https://apidocs.strongloop.com/loopback/#persistedmodel-findorcreate)*
* [`prototype.save()`](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-save)
* [`prototype.updateAttributes()`](https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-updateattributes)
* [`updateAll()`](https://apidocs.strongloop.com/loopback/#persistedmodel-updateall)

Don't confuse this hook with the "before save" hook:

* **before save** – Use this hook to observe (and operate on) model instances that are about to be saved
  (for example, when the country code is set and the country name not, fill in the country name).
* **persist** – Use this hook to observe (and operate on) data just before it is going to be persisted into a data source
  (for example, encrypt the values in the database).

During `create` the updates applied through `persist` hook are reflected into the database,
but the same updates are NOT reflected in the `instance` object obtained in callback of `create`.

Secondly, for connectors implementing atomic `findOrCreate`, a new instance of the object is created every time,
even if an existing record is later found in the database. So:

* Both [`ctx.data.id`](http://ctx.data.id/) and [`ctx.currentInstance.id`](http://ctx.currentinstance.id/) are set to new ID.
* `ctx.isNewInstance` is `true`

Context properties

* `data` - the data that will be sent to the connector (saved to the database)
* `currentInstance` - the affected model instance
* `isNewInstance` - see below.

For this hook, `ctx.isNewInstance` is:

* True for all CREATE operations
* False for all UPDATE operations
* Undefined for updateOrCreate, prototype.save, prototype.updateAttributes, and updateAll operations.

## afterInitialize hook

{% include important.html content="
`afterInitialize` is not strictly an operation hook. It is actually the only [model hook](Model-hooks.html) that is not deprecated.

It is a synchronous method and does not take a callback function: You do not need to call `next()` after performing your logic in the hook.
" %}

This hook is called after a model is initialized.

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
such as HTTP requests to the `exists`, `count`, or bulk update REST endpoints.

## Migration guide

The following table shows which new hook to use for each of the old [model hooks](Model-hooks.html):

<table>
  <thead>
    <tr>
      <th>Model hook</th>
      <th>Operation hook to use instead</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>beforeValidate</td>
      <td>
        <p>before save</p>
      </td>
    </tr>
    <tr>
      <td>afterValidate</td>
      <td>persist</td>
    </tr>
    <tr>
      <td>beforeCreate</td>
      <td>before save</td>
    </tr>
    <tr>
      <td>afterCreate</td>
      <td>after save</td>
    </tr>
    <tr>
      <td>beforeSave</td>
      <td>before save</td>
    </tr>
    <tr>
      <td>afterSave</td>
      <td>after save</td>
    </tr>
    <tr>
      <td>beforeUpdate</td>
      <td>before save</td>
    </tr>
    <tr>
      <td>afterUpdate</td>
      <td>after save</td>
    </tr>
    <tr>
      <td>beforeDestroy</td>
      <td>before delete</td>
    </tr>
    <tr>
      <td>afterDestroy</td>
      <td>after delete</td>
    </tr>
  </tbody>
</table>
