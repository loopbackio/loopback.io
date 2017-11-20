---
title: "Implementing create, retrieve, update, and delete methods"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Implementing-create-retrieve-update-and-delete-methods.html
summary:
---

## Overview

A relational database connector is responsible for implementing a number of methods for create, retrieve, update, and delete (CRUD) operations.
The base `SqlConnector` has most of the methods implemented with the extension point to override certain behaviors that are specific to the underlying database.

To extend from `SqlConnector`, you must implement the minimum set of methods listed below. 

## Implementing basic create, retrieve, update, and delete methods

### Execute a SQL statement with parameters

The `executeSQL` method is the core function that a connector must implement.
Most of other create, retrieve, update, and delete methods are delegated to the `query` function.
It executes a SQL statement with an array of parameters. `SELECT` statements will produce an array of records representing matching rows from the database
while other statements such as `INSERT`, `DELETE`, or `UPDATE` will report the number of rows changed during the operation.

The function's parameters are:

* `sql`: A string containing the SQL statement to execute, possibly with placeholders for parameters.
* `params` (optional): An array of parameter values.
* `options`: Options passed to the create, retrieve, update, and delete method.
* `callback`: Callback function called after the SQL statement is executed.

```javascript
MySQL.prototype.executeSQL = function (sql, params, options, callback) {
  // ...
};
```

### Map values between a model property and a database column

Define a `toColumnValue()` function that converts a model property value into the form required by the database column.
The result should be one of following forms:

* `{sql: "point(?,?)", params:[10,20]}`
* `{sql: "'John'", params: []}`
* `"John"`

The function returns database column value as an [ParameterizedSQL](http://apidocs.loopback.io/loopback-connector/#parameterizedsql) object

Parameters are:

* `propertyDef`: Object containing the model property definition.
* `value`: Model property value (any type).

```javascript
SqlConnector.prototype.toColumnValue = function(propertyDef, value) {
  /*jshint unused:false */
  throw new Error('toColumnValue() must be implemented by the connector');
};
```

Define a `fromColumnValue()` function that converts the data from database column to model property. It returns a model property value.

Parameters are:

* `propertyDef`: Model property definition in an object.
* `value`: Column value (any type)

```javascript
SqlConnector.prototype.fromColumnValue = function(propertyDef, value) {
  /*jshint unused:false */
  throw new Error('fromColumnValue() must be implemented by the connector');
};
```

### Helpers to generate SQL statements and parse responses from DB drivers

Define an `applyPagniation()` method to build a new SQL statement with pagination support by wrapping the specified SQL.

The parameters are:

* `model`: String model name
* `stmt`: The SQL statement as a [ParameterizedSQL](http://apidocs.loopback.io/loopback-connector/#parameterizedsql) object.
* `filter` The filter object from the query

```javascript
SqlConnector.prototype.applyPagination = function(model, stmt, filter) {
  throw new Error('applyPagination() must be implemented by the connector');
};
```

Implement a `getCountForAffectedRows()` method to parse the result for SQL UPDATE/DELETE/INSERT for the number of rows affected.

Parameters are:

* `model`: model name (string)
* `info`: Status object

The method returns the number of rows affected.

```javascript
SqlConnector.prototype.getCountForAffectedRows = function(model, info) {
  /*jshint unused:false */
  throw new Error('getCountForAffectedRows() must be implemented by the connector');
};
```

Implement `getInsertedId()` to parse the result for SQL INSERT for newly inserted ID.

Parameters:

* `model`: Model name
* `info`: The status object from driver

It returns the inserted ID value.

```javascript
SqlConnector.prototype.getInsertedId = function(model, info) {
  /*jshint unused:false */
  throw new Error('getInsertedId() must be implemented by the connector');
};
```

Implement `escapeName()` and `escapeValue()` methods to escape the name and value for the underlying database.
They both return a string that is an escaped name for SQL.

Parameter:

* `name` The name (string).

```javascript
SqlConnector.prototype.escapeName = function(name) {
  /*jshint unused:false */
  throw new Error('escapeName() must be implemented by the connector');
};

SqlConnector.prototype.escapeValue = function(value) {
  /*jshint unused:false */
  throw new Error('escapeValue() must be implemented by the connector');
};
```

Implement `getPlaceholderForIdentifier()` to get the placeholder in SQL for identifiers, such as ??.
Implement `getPlaceholderForValue()` to get the placeholder in SQL for identifiers, such as :1 or ?. 

Both methods return the placeholder as a string.

The `key` parameter is an optional key, such as 1 or id.

```javascript
SqlConnector.prototype.getPlaceholderForIdentifier = function(key) {
  throw new Error('getPlaceholderForIdentifier() must be implemented by the connector');
};

SqlConnector.prototype.getPlaceholderForValue = function(key) {
  throw new Error('getPlaceholderForValue() must be implemented by the connector');
};
```

### Override other methods

There are a list of methods that serve as default implementations in the SqlConnector.
The connector can choose to override such methods to customize the behaviors.
Please see a complete list at[http://apidocs.loopback.io/loopback-connector/](http://apidocs.loopback.io/loopback-connector/).

## Implementing transaction methods

To support database local transactions, the connector must implement the following methods.

### Begin transaction

```javascript
/**
 * Begin a new transaction
 * @param {String} isolationLevel
 * @param {Function} cb Callback function
 */
 MySQL.prototype.beginTransaction = function(isolationLevel, cb) {
   // get a connection from the pool
   // set up the isolation level
   // call back with the connection object
  };
```

### Commit

```javascript
/**
 * Commit a transaction
 * @param {Object} connection The connection object associated with the transaction
 * @param {Function} cb Callback function
 */
 MySQL.prototype.commit = function(connection, cb) {
   // commit the transaction
   // release the connection back to the pool
   // callback
  };
```

### Rollback

```javascript
/**
 * Rollback a transaction
 * @param {Object} connection The connection object associated with the transaction
 * @param {Function} cb Callback function
 */
 MySQL.prototype.rollback = function(connection, cb) {
   // rollback the transaction
   // release the connection back to the pool
   // callback
  };
```

### ExecutecSQL

The transaction object is passed in via the _options.transaction_. 
The execution logic should check the presence of the _transaction_ property and use the underlying connection so that the SQL statement will be executed as part of the transaction.
For example,

```javascript
if (transaction && transaction.connection &&
  transaction.connector === this) {
  if (debugEnabled) {
    debug('Execute SQL within a transaction');
  }
  executeWithConnection(null, transaction.connection);
} else {
  // Get a connection from the pool
  client.getConnection(executeWithConnection);
}
```