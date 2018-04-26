---
title: "Discovering models from relational databases"
lang: en
layout: page
keywords: LoopBack
tags: [models, data_sources]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Discovering-models-from-relational-databases.html
redirect_from: "/doc/en/lb2/Database-discovery-API.html"
summary:
---

## Overview

LoopBack makes it simple to create models from an existing relational database.
This process is called _discovery_ and is supported by the following connectors:

* [MySQL connector](MySQL-connector.html)
* [PostgreSQL connector](PostgreSQL-connector.html)
* [Oracle connector](Oracle-connector.html)
* [SAP HANA](https://www.npmjs.org/package/loopback-connector-saphana) - Not officially supported; see [Community connectors](Community-connectors.html).
* [SQL Server connector](SQL-Server-connector.html)

For NoSQL databases such as MongoDB, use [instance introspection](Creating-models-from-unstructured-data.html) instead.

{% include warning.html content="
The discovery of model relations is limited to
[BelongsTo](./BelongsTo-relations.md) relations.
Other relation types, for example [HasMany](./HasMany-relations.md),
are not supported yet.
" %}

Data sources connected to relational databases automatically get the asynchronous 
[Database discovery API](http://apidocs.loopback.io/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).

LoopBack supports two flavours of model discovery:

 1. Discover and define models at runtime during application startup.
 2. Discover model definitions on demand and save these definitions
    to model JSON files.

In the first flavor, models are discovered and defined in the application
in a single step at runtime. There is no source code nor any JSON (model)
config files versioned for these discovered models, they are all loaded by
the discovery script. Once the discovery script has finished, the discovered
models can be accessed via `app.models` API). The application always uses
the data structures (models) appropriate for the environment it runs in
(dev/test/production database). This means the same application version
can use different data structures (models) when it's deployed to different
environments.

In the second flavor, models are discovered at the time the application is
developed, their definitions are stored in model JSON files and versioned
by git. This allows developers to make further tweaks and changes to model
schemas, add custom model functions, etc. The application uses the same data
structures (models) regardless of the environment it runs in
(dev/test/production database).

In both cases, you need a data source configured to access the database
you would like to discover, see [Defining data
sources](http://loopback.io/doc/en/lb3/Defining-data-sources.html). The code
examples in the following sections assume that your application
has a data source called `db` that's configured to access the target database.

See our [database tutorial](https://github.com/strongloop/loopback-example-database)
for an example application that leverages discovery and can be run out of the
box.

## Discover and define models at runtime

Use [dataSource.discoverAndBuildModels()](http://apidocs.loopback.io/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels)
API to discover and define your model classes at runtime.

For example, you can add a following boot script to the `server/boot`
directory in your LoopBack project.

{% include code-caption.html content="/server/boot/discover-models.js" %}
```js
'use strict';

module.exports = function(app, callback) {
  // Obtain the datasource registered with the name "db"
  const dataSource = app.dataSources.db;

  // Step 1: define a model for "INVENTORY" table,
  // including any models for related tables (e.g. "PRODUCT").
  dataSource.discoverAndBuildModels(
    'INVENTORY',
    {relations: true},
    function(err, models) {
      if (err) return callback(err);

      // Step 2: expose all new models via REST API
      for (const modelName in models) {
        app.model(models[modelName], {dataSource: dataSource});
      }

      callback();
    });
};
```

Next steps:

 1. Start your application in the usual way, e.g. via `npm start` or `node .`
 2. Use [API Explorer](./Use-API-Explorer.md) to inspect your dynamically
    created REST API.

## Discover and save model definitions

Use [dataSource.discoverSchema()](http://apidocs.loopback.io/loopback-datasource-juggler/#datasource-prototype-discoverschema)
API to obtain a model definition for a given database table.

To leverage this API, you need to write a small script to discover the models
you are interested in and write them to model JSON files.

Let's walk through an example implementation of such script.

{% include note.html content="
The code examples in this section are using features introduced in
Node.js 8.x LTS. Users running on an older version of Node.js need
to rework the code to use promises (or callbacks) instead of async/await
for flow control.
" %}

First of all, we need to import APIs we will be using later:

{% include code-caption.html content="/discover-models.js" %}
```js
'use strict';

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));
```

Secondly, we need to initialize the data source backed by the database
we want to discover our models from. While it's possible to load the full
application and let loopback-boot load all artifacts (including data sources),
we recommend a simpler and faster approach of creating the data source
instance explicitly:

```js
const DATASOURCE_NAME = 'db';
const dataSourceConfig = require('./server/datasources.json');
const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);
```

Node.js does not allow the main module function to be async,
the top-level code cannot use `await` keyword for flow control.
As a workaround, we need to wrap the discovery code in a helper function
that's executed using Promise API.

```js
discover().then(
  success => process.exit(),
  error => { console.error('UNHANDLED ERROR:\n', error); process.exit(1); },
);
```

With the preparations done, it's time to roll up our sleeves
and do the actual model discovery.

```js
async function discover() {
  // It's important to pass the same "options" object to all calls
  // of dataSource.discoverSchemas(), it allows the method to cache
  // discovered related models
  const options = {relations: true};

  // Discover models and relations
  const inventorySchemas = await db.discoverSchemas('INVENTORY', options);
  const productSchemas = await db.discoverSchemas('PRODUCT', options);

  // Create model definition files
  await mkdirp('common/models');
  await writeFile(
    'common/models/inventory.json',
    JSON.stringify(inventorySchemas['XE.INVENTORY'], null, 2)
  );
  await writeFile(
    'common/models/product.json',
    JSON.stringify(salariesSchemas['XE.PRODUCT'], null, 2)
  );

  // Expose models via REST API
  const configJson = await readFile('server/model-config.json', 'utf-8');
  console.log('MODEL CONFIG', configJson);
  const config = JSON.parse(configJson);
  config.Inventory = {dataSource: DATASOURCE_NAME, public: true};
  config.Product = {dataSource: DATASOURCE_NAME, public: true};
  await writeFile(
    'server/model-config.json',
    JSON.stringify(config, null, 2)
  );
}
```

Next steps:

 1. Run the discovery script we have just written to add the discovered models
    to your project (or update the existing definitions).
 2. Start your application in the usual way, e.g. via `npm start` or `node .`
 3. Use [API Explorer](./Use-API-Explorer.md) to inspect your newly defined
    REST API.
 4. Notice that "INVENTORY" model exposes BelongsTo relation with "PRODUCT"
    model. The counter relation "PRODUCT has many INVENTORY" was not
    automatically discovered, you have to define this relation yourself.

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
