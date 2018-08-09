---
title: "Using database transactions"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Using-database-transactions.html
summary:
---

{% include note.html content="

Transaction support was added in loopback-datasource-juggler version 2.28.0.

" %}

## Overview

A _transaction_ is a sequence of data operations performed as a single logical unit of work.
Many relational databases support transactions to help enforce data consistency and business logic requirements.

A LoopBack model can perform operations in a transaction when the model is attached to one of the following connectors:

* [MySQL connector](MySQL-connector.html) (IMPORTANT: Only with InnoDB as the storage engine).
* [PostgreSQL connector](PostgreSQL-connector.html)
* [SQL Server connector](SQL-Server-connector.html)
* [Oracle connector](Oracle-connector.html)
* [DB2 Connector](DB2-connector.html)
* [DashDB Connector](DashDB.html)
* [DB2 iSeries Connector](DB2-iSeries-connector.html)
* [DB2 for z/OS connector](DB2-for-z-OS.html)
* [Informix connector](Informix.html)

## Transaction APIs

As of [v3.12.0](https://github.com/strongloop/loopback-datasource-juggler/tree/v3.12.0) of DataSource Juggler, there are two ways to handle transactions in LoopBack:

* The [`TransactionMixin`](http://apidocs.loopback.io/loopback-datasource-juggler/#transactionmixin) gives access to the lower-level transaction API, leaving it up to the user to create and manage transaction objects, commit them on success or roll them back at the end of all intended operations.  
  See [Lower-level Transaction API](#lower-level-transaction-api) below for more details.

* To simplify and streamline the handling of transactions, [`dataSource.transaction()`](https://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-transaction) offers a higher-level abstraction over the lower-level transaction API through a single method.  
  See [Higher-level Transaction API](#higher-level-transaction-api) below for more details.

## Higher-level Transaction API

Inspired by how [Objection.js](http://vincit.github.io/objection.js/#binding-models-to-a-transaction) handles transactions, the method [`dataSource.transaction(execute, options, cb)`](https://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-transaction) creates transactions and binds them to models. Thus, you don't need to explicitly create a transaction object, passed it along to Model database methods, nor or do you need to commit it or roll it back at the end.

Calling the `transaction(execute, options, cb)` method instead creates the transaction for you, then calls the `execute` function argument if it is provided and passes a `models` argument to it containing references to all models in this data-source. These model references are different from the ones in `app.models` in that they are automatically bound to the transaction that was just created. Smart caching is used to only created the bound models for the properties of the `models` argument that are actually accessed.

At the end, `transaction.commit()` or `transaction.rollback()` is then automatically called, based on whether exceptions happen during execution or not. If no callback is provided to be called at the end of the execution, a Promise object is returned that is resolved or rejected as soon as the execution is completed, and the transaction is committed or rolled back.

### Examples

Here is how to create and commit a transaction:
```js
await app.dataSources.db.transaction(async models => {
  const {MyModel} = models;
  console.log(await MyModel.count()); // 0
  await MyModel.create({foo: 'bar'});
  console.log(await MyModel.count()); // 1
});
console.log(await app.models.MyModel.count()); // 1
```

But if there are exceptions during execution, the transaction is automatically rolled back:
```js
try {
  await app.dataSources.db.transaction(async models => {
    const {MyModel} = models;
    console.log(await MyModel.count()); // 0
    await MyModel.create({foo: 'bar'});
    console.log(await MyModel.count()); // 1
    throw new Error('Oops');
  });
} catch (e) {
  console.log(e); // Oops
}
console.log(await app.models.MyModel.count()); // 0
```

### Options

The same options are supported as by the `options` argument of the lower-level [`beginTransaction()`](http://apidocs.loopback.io/loopback-datasource-juggler/#transactionmixin-begintransaction) method:

* `options.isolationLevel`: See [Isolation levels](#isolation-levels)
* `options.timeout`: See [Timeout Handling](#timeout-handling)

### Timeout Handling

Because the user never actually sees the transaction object in the higher-level API, timeouts are handled a bit differently than in the lower-level API (see [Set up timeout](#set-up-timeout)). If a timeout occurs during execution, then the callback is called with an error object and `error.code` is set to `'TRANSACTION_TIMEOUT'`. If no callback is provided but a promise is returned instead, then the promise is rejected with the error:

```js
try {
  await app.dataSources.db.transaction(async models => {
    await Promise.delay(100);
    await models.MyModel.create({foo: 'bar'});
  }, {
    timeout: 50
  });
} catch (e) {
  console.log(e); // Error: Transaction is rolled back due to timeout
  console.log(e.code); // TRANSACTION_TIMEOUT
}
```


## Lower-level Transaction API

See the [API reference](http://apidocs.loopback.io/loopback-datasource-juggler/#transactionmixin) for full transaction lower-level API documentation.

Performing operations in a transaction typically involves the following steps:

* Start a new transaction.
* Perform create, read, update, and delete operations in the transaction.
* Commit or rollback the transaction.

### Start transaction

Use the [`beginTransaction()`](http://apidocs.loopback.io/loopback-datasource-juggler/#transactionmixin-begintransaction) method to start a new transaction.

For example, for a `Post` model:

```javascript
Post.beginTransaction({isolationLevel: Post.Transaction.READ_COMMITTED}, function(err, tx) {
  // Now we have a transaction (tx)
});
```

#### Isolation levels

When you call `beginTransaction()`, you can optionally specify a transaction isolation level. LoopBack transactions support the following isolation levels:

* `Transaction.READ_UNCOMMITTED`
* `Transaction.READ_COMMITTED` (default)
* `Transaction.REPEATABLE_READ`
* `Transaction.SERIALIZABLE`

If you don't specify an isolation level, the transaction uses READ_COMMITTED .

{% include important.html content="

**Oracle only supports READ_COMMITTED and SERIALIZABLE.**

" %}

For more information about database-specific isolation levels, see:

* [MySQL SET TRANSACTION Syntax](https://dev.mysql.com/doc/refman/5.7/en/set-transaction.html)
* [Oracle Isolation Levels](http://docs.oracle.com/cd/B14117_01/server.101/b10743/consist.htm#i17856) 
* [PostgreSQL Transaction Isolation](http://www.postgresql.org/docs/9.4/static/transaction-iso.html)
* [SQL Server SET TRANSACTION ISOLATION LEVEL](https://msdn.microsoft.com/en-us/library/ms173763.aspx)

### Perform operations in a transaction

To perform create, retrieve, update, and delete operations in the transaction, add a second argument consisting of the transaction object to the standard 
[`create()`](http://apidocs.loopback.io/loopback/#persistedmodel-create),
[`upsert()`](http://apidocs.loopback.io/loopback/#persistedmodel-upsert),
[`destroyAll()`](http://apidocs.loopback.io/loopback/#persistedmodel-destroyall) (and so on) methods.

For example, again assuming a `Post` model:

```javascript
Post.create({title: 't1', content: 'c1'}, {transaction: tx}, function(err, post) {
  post.updateAttributes({content: 'c2', {transaction: tx}, function(err, newPost) {
    //
    newPost.reviews.create({content: 'r1'}, {transaction: tx}, function(err, newPost) {
    });
  }
});
```

### Commit or rollback

Commit the transaction:

```javascript
transaction.commit(function(err) {
});
```

Or to rollback the transaction:

```javascript
transaction.rollback(function(err) {
});
```

Please note all three APIs support the Promise flavor.
See an example at [https://github.com/strongloop/loopback-connector-mysql/blob/master/test/transaction.promise.test.js](https://github.com/strongloop/loopback-connector-mysql/blob/master/test/transaction.promise.test.js).

## Set up timeout

You can specify a timeout (in milliseconds) to begin a transaction.
If a transaction is not finished (committed or rolled back) before the timeout, it will be automatically rolled back upon timeout by default.
The timeout event can be trapped using the timeout hook.

For example, again assuming a `Post` model:

```javascript
Post.beginTransaction({
    isolationLevel: Transaction.READ_COMMITTED,
    timeout: 30000 // 30000ms = 30s
  }, function(err, tx) {
    tx.observe('timeout', function(context, next) {
      // handle timeout
      next();
    });
});
```

## Propagate a transaction

Propagating a transaction is explicit by passing the transaction object via the options argument for all create, retrieve, update, and delete and relation methods.

For example, again assuming a `Post` model:

```javascript
var options = {transaction: tx};
Post.create({title: 't1', content: 'c1'}, options, function(err, post) {
  post.updateAttributes({content: 'c2', options, function(err, newPost) {
    //
    newPost.reviews.create({content: 'r1'}, options, function(err, newPost) {
    });
  }
});
```

## Set up transaction hooks

There are five types of observable events for a transaction:

* `before commit`
* `after commit`
* `before rollback`
* `after rollback`
* `timeout`

```javascript
tx.observe('before commit', function(context, next) {
  // ...
  next();
});

tx.observe('after commit', function(context, next) {
  // ...
  next();
});

tx.observe('before rollback', function(context, next) {
  // ...
  next();
});

tx.observe('after rollback', function(context, next) {
  // ...
  next();
});

tx.observe('timeout', function(context, next) {
  // ...
  next();
});
```

## Avoid long waits or deadlocks

Please be aware that a transaction with certain isolation level will lock database objects.
Performing multiple methods within a transaction asynchronously has the great potential to block other transactions (explicit or implicit).
To avoid long waits or even deadlocks, you should:

1.  Keep the transaction as short-lived as possible
2.  Don't serialize execution of methods across multiple transactions
