---
title: "Discovering models from relational databases"
lang: en
layout: page
keywords: LoopBack
tags: [models, data_sources]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Discovering-models-from-relational-databases.html
redirect_from: "/doc/en/lb2/Database-discovery-API.html"
summary:
---

## Overview

LoopBack makes it simple to create models from an existing relational database.
This process is called _discovery_ and is supported by the following connectors:

* [Cassandra](Cassandra-connector.html)
* [MySQL](MySQL-connector.html)
* [Oracle](Oracle-connector.html)
* [PostgreSQL](PostgreSQL-connector.html)
* [SQL Server](SQL-Server-connector.html)
* [IBM Cloudant](Cloudant-connector.html)
* [IBM DB2](DB2-connector.html)
* [IBM DashDB](DashDB.html)
* [IBM DB2 for z/OS](DB2-for-z-OS.html)

For NoSQL databases such as MongoDB, use [instance introspection](Creating-models-from-unstructured-data.html) instead.

Data sources connected to relational databases automatically get the asynchronous 
[Database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).

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

{% include code-caption.html content="/server/bin/script.js" %}
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
    // Assumes inventory table has a foreign key relationship to product table
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

`discoverModelDefinitions()` by default discovers database schema definitions owned by the userid used to connect to the database.  
Calling it with the `all: true` option makes the discovery include the database schema definitions of all owners.

{% include code-caption.html content="/server/bin/script.js" %}
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
