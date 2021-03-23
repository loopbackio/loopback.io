---
title: "Creating, updating, and deleting data"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Creating-updating-and-deleting-data.html
summary:
---

{% include content/angular-methods-caveat.html lang=page.lang %}

[PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel-new-persistedmodel) has a large set of methods for creating, updating, and deleting data.

Model data is also called a _model instance_;
in database terminology, conceptually a model corresponds to a table, and a model instance corresponds to a _row_ or _record_ in the table.

{% include note.html content="For information on model _read_ operations, see [Querying data](Querying-data.html).
" %}

## Creating data (model instances)

Use the following [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel) methods to add data, that is to insert or create instances:

* [create](http://apidocs.strongloop.com/loopback/#persistedmodel-create) - creates a new model instance (record).
* [upsert](http://apidocs.strongloop.com/loopback/#persistedmodel-upsert) - checks if the instance (record) exists, based on the designated
  [ID property](Model-definition-JSON-file.html#id-properties), which must have a unique value;
  if the instance already exists, the method updates that instance. Otherwise, it inserts a new instance.
* [findOrCreate](http://apidocs.strongloop.com/loopback/#persistedmodel-findorcreate) - Find one instance matching the filter object provided as the first parameter.
  If found, returns the object. If not found, creates a new instance (record).

    {% include important.html content="Be sure to include a `where` clause in the filter object.
    Without the `where`, the `findOrCreate` finds and returns the first record in the collection, without error, which can lead to unintended behavior.
    " %}
* [save](http://apidocs.strongloop.com/loopback/#persistedmodel-prototype-save) - Save model instance.
  If the instance doesn't have an ID, then calls [create](http://apidocs.strongloop.com/loopback/#persistedmodel-create) instead.
  Triggers: validate, save, update, or create.

## Updating data (model instances)

Static method (called on the Model object):

* [updateAll](http://apidocs.strongloop.com/loopback/#persistedmodel-updateall) - updates multiple instances (records) that match the specified [where clause](Where-filter.html). 

{% include important.html content="The where clause used with `updateAll()` is slightly different than that for queries.  Omit `{ where : ... }` from the where clause.
Simply provide the condition as the first argument.

For more information, see [Where filter](Where-filter.html).
" %}

Instance methods (called on a single model instance):

* [updateAttribute](http://apidocs.strongloop.com/loopback/#persistedmodel-prototype-updateattribute) - Update a single attribute (property).
* [updateAttributes](http://apidocs.strongloop.com/loopback/#persistedmodel-prototype-updateattributes) - Update set of attributes (properties).
  Performs validation before updating.

### Performing bulk updates

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Describe why you would perform bulk updates. &nbsp;Used with sync, for example.</div>

* [createUpdates](http://apidocs.strongloop.com/loopback/#persistedmodel-createupdates)
* [bulkUpdate](http://apidocs.strongloop.com/loopback/#persistedmodel-bulkupdate)

## Deleting data

Static methods (called on the Model object):

* [destroyAll](http://apidocs.strongloop.com/loopback/#persistedmodel-destroyall) - Delete all model instances that match the optional [Where filter](Where-filter.html).
* [destroyById](http://apidocs.strongloop.com/loopback/#persistedmodel-destroybyid) - Delete the model instance with the specified ID.

{% include important.html content="
The where clause with `destroyAll()` is slightly different than that for queries. Omit `{ where : ... }` from the where clause.  Simply provide the condition as the first argument.

For more information, see [Where filter](Where-filter.html)." %}
