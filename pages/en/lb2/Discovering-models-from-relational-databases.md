---
title: "Discovering models from relational databases"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Discovering-models-from-relational-databases.html
summary:
---

## Overview

LoopBack makes it simple to create models from an existing relational database.
This process is called _discovery_ and is supported by the following connectors:

* [MySQL connector](/doc/en/lb2/MySQL-connector.html)
* [PostgreSQL connector](/doc/en/lb2/PostgreSQL-connector.html)
* [Oracle connector](/doc/en/lb2/Oracle-connector.html)
* [SQL Server connector](/doc/en/lb2/SQL-Server-connector.html)

For NoSQL databases such as MongoDB, use [instance introspection](/doc/en/lb2/Creating-models-from-unstructured-data.html) instead.

Data sources connected to relational databases automatically get the asynchronous 
[Database discovery API](https://docs.strongloop.com/display/APIC/Database-discovery-API).

### Basic procedure

Follow these basic steps:

1.  Use a script such as that below to discover the schema.
2.  Use `fs.writeFile()` to save the output in `common/models/model-name.json`.
3.  Add the new model entry to `server/model-config.json`.
4.  Run the app:

    ```shell
    $ node .
    ```

5.  Use LoopBack Explorer to verify the schema is defined properly.

## Example discovery

For example, consider an Oracle database. First, the code sets up the Oracle data source.
Then the call to `discoverAndBuildModels()` creates models from the database tables.
Calling it with the `associations: true` option makes the discovery follow primary/foreign key relations.

**/server/bin/script.js**

```javascript
var loopback = require('loopback');
var ds = loopback.createDataSource('oracle', {
  "host": "oracle-demo.strongloop.com",
  "port": 1521,
  "database": "XE",
  "username": "demo",
  "password": "L00pBack"
});

// Discover and build models from INVENTORY table
ds.discoverAndBuildModels('INVENTORY', {visited: {}, associations: true},
function (err, models) {
  // Now we have a list of models keyed by the model name
  // Find the first record from the inventory
  models.Inventory.findOne({}, function (err, inv) {
    if(err) {
      console.error(err);
      return;
    }
    console.log("\nInventory: ", inv);
    // Navigate to the product model
    inv.product(function (err, prod) {
      console.log("\nProduct: ", prod);
      console.log("\n ------------- ");
    });
  });
});
```

## Additional discovery functions

Some connectors provide discovery capability so that we can use DataSource to discover model definitions from existing database schema.
The following APIs enable UI or code to discover database schema definitions that can be used to build LoopBack models.

**/server/bin/script.js**

```javascript
// List database tables and/or views
ds.discoverModelDefinitions({views: true, limit: 20}, cb);

// List database columns for a given table/view
ds.discoverModelProperties('PRODUCT', cb);
ds.discoverModelProperties('INVENTORY_VIEW', {owner: 'STRONGLOOP'}, cb);

// List primary keys for a given table
ds.discoverPrimaryKeys('INVENTORY',  cb);

// List foreign keys for a given table
ds.discoverForeignKeys('INVENTORY',  cb);

// List foreign keys that reference the primary key of the given table
ds.discoverExportedForeignKeys('PRODUCT',  cb);

// Create a model definition by discovering the given table
ds.discoverSchema(table, {owner: 'STRONGLOOP'}, cb);
```