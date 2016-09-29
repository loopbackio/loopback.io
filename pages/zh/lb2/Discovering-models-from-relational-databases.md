---
title: "Discovering models from relational databases"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Discovering-models-from-relational-databases.html
summary:
---

## Overview

LoopBack makes it simple to create models from an existing relational database.  This process is called _discovery_ and is supported by the following connectors:

*   [MySQL connector](/doc/{{page.lang}}/lb2/MySQL-connector.html)
*   [PostgreSQL connector](/doc/{{page.lang}}/lb2/PostgreSQL-connector.html)
*   [Oracle connector](/doc/{{page.lang}}/lb2/Oracle-connector.html)
*   [SQL Server connector](/doc/{{page.lang}}/lb2/SQL-Server-connector.html)

For NoSQL databases such as MongoDB, use [instance introspection](/doc/{{page.lang}}/lb2/Creating-models-from-unstructured-data.html) instead.

Data sources connected to relational databases automatically get the asychronous [Database discovery API](/doc/{{page.lang}}/lb2/Database-discovery-API.html).  

{% include note.html content="

The StrongLoop Arc graphical tool enables you to perform discovery without coding. See [StrongLoop Arc](https://docs.strongloop.com/display/ARC/StrongLoop+Arc) for more information.

" %}

## Example discovery

For example, consider an Oracle database. First, the code sets up the Oracle data source. Then the call to `discoverAndBuildModels()` creates models from the database tables. Calling it with the `associations: true` option makes the discovery follow primary/foreign key relations.

**/server/bin/script.js**

```js
var loopback = require('loopback');
var ds = loopback.createDataSource('oracle', {
  "host": "demo.strongloop.com",
  "port": 1521,
  "database": "XE",
  "username": "demo",
  "password": "L00pBack"
});

// Discover and build models from INVENTORY table
ds.discoverAndBuildModels('INVENTORY', {
    visited: {},
    associations: true
  },
  function(err, models) {
    // Now we have a list of models keyed by the model name
    // Find the first record from the inventory
    models.Inventory.findOne({}, function(err, inv) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("\nInventory: ", inv);
      // Navigate to the product model
      inv.product(function(err, prod) {
        console.log("\nProduct: ", prod);
        console.log("\n ------------- ");
      });
    });
  });
```

## Additional discovery functions

Some connectors provide discovery capability so that we can use DataSource to discover model definitions from existing database schema.  The following APIs enable UI or code to discover database schema definitions that can be used to build LoopBack models.

**/server/bin/script.js**

```js
// List database tables and/or views
ds.discoverModelDefinitions({
  views: true,
  limit: 20
}, cb);

// List database columns for a given table/view
ds.discoverModelProperties('PRODUCT', cb);
ds.discoverModelProperties('INVENTORY_VIEW', {
  owner: 'STRONGLOOP'
}, cb);

// List primary keys for a given table
ds.discoverPrimaryKeys('INVENTORY', cb);

// List foreign keys for a given table
ds.discoverForeignKeys('INVENTORY', cb);

// List foreign keys that reference the primary key of the given table
ds.discoverExportedForeignKeys('PRODUCT', cb);

// Create a model definition by discovering the given table
ds.discoverSchema(table, {
  owner: 'STRONGLOOP'
}, cb);
```
