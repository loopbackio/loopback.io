---
title: "Building a connector"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Building-a-connector.html
summary:
---

## Overview

{% include important.html content="

This article is for developers who want to create a new connector type to connect to a data source not currently supported.

" %}

See [Community connectors](/doc/{{page.lang}}/lb2/Community-connectors.html) for a list of connectors in addition to those provided by StrongLoop.

## Interface

A connector module can implement the following methods to interact with the data source.

```
exports.initialize = function (dataSource, postInit) {

    var settings = dataSource.settings || {}; // The settings is passed in from the dataSource

    var connector = new MyConnector(settings); // Construct the connector instance
    dataSource.connector = connector; // Attach connector to dataSource
    connector.dataSource = dataSource; // Hold a reference to dataSource

    /**
     * Connector instance can have an optional property named as DataAccessObject that provides
     * static and prototype methods to be mixed into the model constructor. The property can be defined
     * on the prototype.
     */
    connector.DataAccessObject = function {};

    /**
     * Connector instance can have an optional function to be called to handle data model definitions.
     * The function can be defined on the prototype too.
     * @param model The name of the model
     * @param properties An object for property definitions keyed by propery names
     * @param settings An object for the model settings
     */
    connector.define = function(model, properties, settings) {
        ...
    };

    connector.connect(..., postInit); // Run some async code for initialization
    // process.nextTick(postInit);
}
```

`Another way is to directly export the connection function which takes a settings object.`

```
module.exports = function(settings) {
    ...
}
```

## Implementing a CRUD connector

To support CRUD operations for a model class that is attached to the dataSource/connector, the connector needs to provide the following functions:

```js
/**
 * Create a new model instance
 */
CRUDConnector.prototype.create = function(model, data, callback) {};

/**
 * Save a model instance
 */
CRUDConnector.prototype.save = function(model, data, callback) {};

/**
 * Check if a model instance exists by id
 */
CRUDConnector.prototype.exists = function(model, id, callback) {};

/**
 * Find a model instance by id
 */
CRUDConnector.prototype.find = function find(model, id, callback) {};

/**
 * Update a model instance or create a new model instance if it doesn't exist
 */
CRUDConnector.prototype.updateOrCreate = function updateOrCreate(model, data, callback) {};

/**
 * Delete a model instance by id
 */
CRUDConnector.prototype.destroy = function destroy(model, id, callback) {};

/**
 * Query model instances by the filter
 */
CRUDConnector.prototype.all = function all(model, filter, callback) {};

/**
 * Delete all model instances
 */
CRUDConnector.prototype.destroyAll = function destroyAll(model, callback) {};

/**
 * Count the model instances by the where criteria
 */
CRUDConnector.prototype.count = function count(model, callback, where) {};

/**
 * Update the attributes for a model instance by id
 */
CRUDConnector.prototype.updateAttributes = function updateAttrs(model, id, data, callback) {};
```
