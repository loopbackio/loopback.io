---
title: "Using database transactions"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Using-database-transactions.html
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

## Transaction APIs

See the [API reference](http://apidocs.strongloop.com/loopback-datasource-juggler/#transactionmixin) for full transaction API documentation.

Performing operations in a transaction typically involves the following steps:

* Start a new transaction.
* Perform create, read, update, and delete operations in the transaction.
* Commit or rollback the transaction.

### Start transaction

Use the [beginTransaction](http://apidocs.strongloop.com/loopback-datasource-juggler/#transactionmixin-begintransaction) method to start a new transaction.

For example, for a `Post` model:

```javascript
Post.beginTransaction({isolationLevel: Post.Transaction.READ_COMMITTED}, function(err, tx) {
  // Now we have a transaction (tx)
});
```

#### Isolation levels

When you call beginTransaction(), you can optionally specify a transaction isolation level. LoopBack transactions support the following isolation levels:

* Transaction.READ_UNCOMMITTED
* Transaction.READ_COMMITTED (default)
* Transaction.REPEATABLE_READ
* Transaction.SERIALIZABLE

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
[`create()`](http://apidocs.strongloop.com/loopback/#persistedmodel-create),
[`upsert()`](http://apidocs.strongloop.com/loopback/#persistedmodel-upsert),
[`destroyAll()`](http://apidocs.strongloop.com/loopback/#persistedmodel-destroyall) (and so on) methods.

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

There are four types of observable events for a transaction:

* before commit
* after commit
* before rollback
* after rollback
* timeout

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
```

## Avoid long waits or deadlocks

Please be aware that a transaction with certain isolation level will lock database objects.
Performing multiple methods within a transaction asynchronously has the great potential to block other transactions (explicit or implicit).
To avoid long waits or even deadlocks, you should:

1.  Keep the transaction as short-lived as possible
2.  Don't serialize execution of methods across multiple transactions