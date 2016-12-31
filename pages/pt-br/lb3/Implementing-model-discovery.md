---
title: "Implementing model discovery"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Implementing-model-discovery.html
summary:
---



For relational databases that have schema definitions, the connector can implement _discovery_ to reverse engineer database schemas into model definitions.
Implementing discovery is optional for a connector.

See [Discovering models from relational databases](Discovering-models-from-relational-databases.html) for a general introduction to LoopBack model discovery.

## Implementing functions to build SQL statements

You first need to implement methods to list schemas, tables, and views.

### Build a SQL statement to list schemas

Implement a `querySchemas()` function that constructs and returns an SQL statement that lists all schemas (databases in MySQL).

It has a single parameter that is an options object.

It must return the SQL statement in a string.

```javascript
function querySchemas(options) { /* ... */ }
```

### Build a SQL statement to list tables

Implement a `queryTables()` function that constructs and returns an SQL statement that lists tables in a given schema (database).

It has a single parameter that is an options object that specifies the owner or schema, or "all" for all owners/schemas.

It must return the SQL statement in a string.

```javascript
function queryTables(options) { /* ... */ }
```

### Build a SQL statement to list views

Implement a `queryViews()` function that constructs and returns an SQL statement that lists views in a given database.

It has a single parameter that is an options object that specifies the owner, or "all" for all owners.

It must return the SQL statement in a string.

```javascript
function queryViews(options) { /* ... */ }
```

### Build SQL statements to discover database objects

```javascript
/**
 * Build the sql statement to query columns for a given table
 * @param schema
 * @param table
 * @returns {String} The sql statement
 */
 function queryColumns(schema, table) {
   // ...
 }

/**
 * Build the sql statement for querying primary keys of a given table
 * @param schema
 * @param table
 * @returns {string}
 */
 function queryPrimaryKeys(schema, table) {
   // ...
 }

/**
 * Build the sql statement for querying foreign keys of a given table
 * @param schema
 * @param table
 * @returns {string}
 */
 function queryForeignKeys(schema, table) {
   // ...
 }

/**
 * Retrieves a description of the foreign key columns that reference the
 * given table's primary key columns (the foreign keys exported by a table).
 * They are ordered by fkTableOwner, fkTableName, and keySeq.
 * @param schema
 * @param table
 * @returns {string}
 */
 function queryExportedForeignKeys(schema, table) {
   // ...
 }
```

## Implementing discovery functions

### Discover schemas

```javascript
MySQL.prototype.discoverDatabaseSchemas = function(options, cb) {
   // ...
 };
```

### Discover a list of models

```javascript
/**
 * Discover model definitions
 *
 * @param {Object} options Options for discovery
 * @param {Function} [cb] The callback function
 */
 MySQL.prototype.discoverModelDefinitions = function(options, cb) {
   // ...
 };
```

### Discover a list of model properties for a given table

```javascript
/**
 * Discover model properties from a table
 * @param {String} table The table name
 * @param {Object} options The options for discovery
 * @param {Function} [cb] The callback function
 *
 */
 MySQL.prototype.discoverModelProperties = function(table, options, cb) {
   // ...
 };
```

### Discover primary keys for a given table

```javascript
/**
 * Discover primary keys for a given table
 * @param {String} table The table name
 * @param {Object} options The options for discovery
 * @param {Function} [cb] The callback function
 */
 MySQL.prototype.discoverPrimaryKeys = function(table, options, cb) {
   // ...
 };
```

### Discover foreign keys for a given table

```javascript
/**
 * Discover foreign keys for a given table
 * @param {String} table The table name
 * @param {Object} options The options for discovery
 * @param {Function} [cb] The callback function
 */
 MySQL.prototype.discoverForeignKeys = function(table, options, cb) {
   // ...
 };
```

### Discover exported foreign keys for a given table

```javascript
/**
 * Discover foreign keys that reference to the primary key of this table
 * @param {String} table The table name
 * @param {Object} options The options for discovery
 * @param {Function} [cb] The callback function
 */
 MySQL.prototype.discoverExportedForeignKeys = function(table, options, cb) {
   // ...
 };
```

### Discover indexes for a given table

```javascript
MySQL.prototype.discoverIndexes = function(table, options, cb) {
    // ...
  };
```

### Map column definition to model property definition

```javascript
MySQL.prototype.buildPropertyType = function(columnDefinition) {
    // ...
  }
```