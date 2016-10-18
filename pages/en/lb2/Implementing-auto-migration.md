---
title: "Implementing auto-migration"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Implementing-auto-migration.html
summary:
---

## Overview

It's often desirable to apply model definitions to the underlying relational database to provision or update schema objects so that they stay synchronized with the model definitions.
In LoopBack, this is called _auto-migration_. Implementing auto-migration is optional for connector.

There are two variations:

* **Auto-migration**: Drop existing schema objects if they exist, and re-create them based on model definitions. Existing data will be lost.
* **Auto-update**: Detect the difference between schema objects and model definitions, and alter the database schema objects. Keep existing data.

See [Creating a database schema from models](Creating-a-database-schema-from-models.html) for a general introduction to auto-migration auto-update.

## Define autoupdate and automigrate functions

These are the two top-level functions that actually create the database schema and call the other functions.

For both functions, the parameters are:

* `models` (optional): a string model name or an array of string model names. If not present, apply to all models
* `cb`: callback function

```javascript
MySQL.prototype.autoupdate = function (models, cb) {
  // ...
};

MySQL.prototype.automigrate = function (models, cb) {
  // ...
};
```

The `automigrate` and `autoupdate` operations are usually mapped to a sequence of data definition language (DDL) statements.

## Defining helper functions

First, define a few helper functions.

### Build a CREATE TABLE statement

Define a function to create a database table for a model.

Parameters:

* `model`: Model name
* `cb`: Callback function

```javascript
MySQL.prototype.createTable = function (model, cb) {
  // ...
};
```

### Check if models have corresponding tables

Define a function to check if the specified models exist.

Parameters:

* `models` (optional): a string model name or an array of string model names. If not present, apply to all models
* `cb`: callback function

```javascript
MySQL.prototype.isActual = function(models, cb) {
  // ...
};
```

### Alter a table

```javascript
MySQL.prototype.alterTable = function (model, actualFields, actualIndexes, done, checkOnly) {
  // ...
};
```

## Define metadata definition functions

Define functions to create column and index definitions for models and model properties.

### Build column definition clause for a given model

```javascript
MySQL.prototype.buildColumnDefinitions =
MySQL.prototype.propertiesSQL = function (model) {
  // ...
};
```

### Build index definition clause for a given model property

```javascript
MySQL.prototype.buildIndex = function(model, property) {
  // ...
};
```

### Build indexes for a given model

```javascript
MySQL.prototype.buildIndexes = function(model) {
  // ...
};
```

### Build column definition for a given model property

```javascript
MySQL.prototype.buildColumnDefinition = function(model, prop) {
  // ...
};
```

### Build column type for a given model property

```javascript
MySQL.prototype.columnDataType = function (model, property) {
  // ...
};
```