# loopback-connector-couchdb2

The `loopback-connector-couchdb2` module is the CouchDB 2.0 connector for the
LoopBack framework that supports the advanced functionality originally found
only in Cloudant but that is now available in CouchDB.

<!-- TOC -->

- [Getting Started](#getting-started)
  - [Model](#model)
    - [Map Between Model And Document](#map-between-model-and-document)
    - [Model-specific Configuration](#model-specific-configuration)
    - [_rev Property](#_rev-property)
      - [Example CRUD operations with `_rev`](#example-crud-operations-with-_rev)
- [Setup Couchdb Instance](#setup-couchdb-instance)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Generate Datasource](#generate-datasource)
  - [Datasource Config](#datasource-config)
  - [Example Usage](#example-usage)
- [CRUD](#crud)
- [Migration](#migration)
  - [autoupdate vs automigrate](#autoupdate-vs-automigrate)
  - [isActual](#isactual)
  - [property index](#property-index)
  - [Example Code](#example-code)
- [Discovery](#discovery)
- [Query](#query)
- [View](#view)
- [Bulk replace](#bulk-replace)
- [Testing](#testing)
  - [Docker](#docker)
- [More into](#more-info)

<!-- /TOC -->

# Getting Started

## Model 

### Map Between Model And Document

Similar to Cloudant, Couchdb doesn't have a concept as 'table' or 'collection', and to support ad-hoc query which is an important loopback feature, by default the connector uses all_fields index for query, and doesn't create design document for a loopback model. 

In a real application, all_fields index doesn't do any optimization and slow down the performance a lot, for details about how to create index for properties, please refer to [property index](https://github.com/strongloop/loopback-connector-couchdb2#property-index)

A loopback model instance is stored as a document in Couchdb. It has a model index property to specify the model name, the connector also adds it to Couchdb query's selector when doing model level queries. For example, a User model instance is stored as

```
"loopback__model__name": "User",
"username": "Foo",
"password": "bar"
```

To create a model instance, the connector creates a document with value of property 'loopback__model__name' equals to `User`, and adds `loopback__model__name: 'User'` to query when fetches `User` instances.

By default, `modelIndex` is 'loopback__model__name', and `modelSelector` is {[modelIndex]: modelName}. User can customize `modelSelector` or `modelIndex` in model's json file. For details please check [model-specific configuration](https://github.com/strongloop/loopback-connector-couchdb2#model-specific-configuration)

### Model-specific Configuration

You can specify configurations per model for database selection and to
map a model to a different document:

*common/models/_model-name_.json*

```
{
  "name": "User",
  "base": "PersistedModel",
  "idInjection": true,
  ...
  "couchdb": {
    "modelIndex": "custom_model_index_name",
    "modelSelector": { "custom_selector": "user" },
    "database": "test2"
  },
  ...
```

Model-specific configuration settings:

Property&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  | Type | Description
----------| -----| --------
database  | String | Database name
modelIndex | String | Specify the model name to document mapping, defaults to `loopback__model__name`.
modelSelector | JSON | Use the Couchdb Query selector syntax to associate models to existing data. NOTE: modelSelector and modelIndex are mutually exclusive. modelSelector will override modelIndex when building query.

### _rev Property

In a document, property `_rev` is the latest doc revision and must be provided when modifying the doc.

Our connector allows the user to retrieve back the `_rev` property upon all CRUD operations, however does not add it to the model definition.

If you would like to have a `_rev` property on your model, as an end user, the onus is on you to add the property in the model definition.

**Note:** All CRUD operations require `_rev` (except create) and __it is up to the user to specify them__. The connector does not handle such cases due to possibilities of race condition when two users try to update the same document.

#### Example CRUD operations with `_rev`

`model.json`
``` json
{
  ... 
  "properties": {
    "_rev": {
      "type": "string"
    },
    "name": {
      "type": "string"
    }
  },
  ...
}
```

- Create

```javascript
  Model.create([{
    name: 'Foo',
  }, {
    name: 'Bar',
  }], function(err, result) {
    if (err) throw err;
    console.log('Created instance: ' + JSON.stringify(result));
  });
```

**Note:** Couchdb does not allow customized `_rev` value, hence creating an instance with a `_rev` value will not give the expected result (i.e Couchdb's CREATE operation ignores the `_rev` value when provided and generates a random unique one). The onus is on the user if they fail to comply to this rule.

Let's say we have an instance in the database:
```json
{
   "id":"2",
   "_rev":"2-abcedf",
   "name":"Bar"
}
```

- Find

  - find

  ```javascript
    Model.find(function(err, result) {
      if (err) throw err;
      console.log('Found all instances: ' + JSON.stringify(result));
    });
  ```

  - findById

  ```javascript
    Model.findById('2', function(err, result) {
      if (err) throw err;
      console.log('Found instance with id: ' + JSON.stringify(result));
    });
  ```

- Replace

  - replaceOrCreate

  ```javascript
    Model.replaceOrCreate({
      id:'2',
      _rev:'2-abcedf',
      name:'Bar2'
    }, function(err, result) {
      if (err) throw err;
      console.log('Replace an existing instance: ' + JSON.stringify(result));
    });
  ```

  - replaceById

  ```javascript
    Model.replaceById('2', {
      _rev:'2-abcedf',
      name:'Bar3'
    }, function(err, result) {
      if (err) throw err;
      console.log('Replace an existing instance with id: ' + JSON.stringify(result));
    });
  ```

- Update

  - updateOrCreate

  ```javascript
    Model.updateOrCreate({
      id:'2',
      _rev:'2-abcedf',
      name:'Bar4'
    }, function(err, result) {
      if (err) throw err;
      console.log('Update an existing instance: ' + JSON.stringify(result));
    });
  ```

  - update/updateAll

    - with `_rev` property
      ```javascript
        Model.updateAll({
          _rev:'2-abcedf',
          name:'Bar4'
        }, {name: 'Bar4-updated', _rev: '2-abcedf'}, function(err, result) {
          if (err) throw err;
          console.log('Update an existing instance: ' + JSON.stringify(result));
        });
      ```

    - without `_rev` property
      ```javascript
        Model.updateAll({
          name:'Bar4'
        }, {name: 'Bar4-updated'}, function(err, result) {
          if (err) throw err;
          console.log('Update an existing instance: ' + JSON.stringify(result));
        });
      ```

# Setup Couchdb Instance

For users that don't have a Couchdb server to develop or test, here are some suggestions can help you quickly set one up.

For development use, a docker container is easy to setup. Users can also download the on-prem Couchdb2.0 from http://couchdb.apache.org/

# Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-couchdb2 --save
```

The `--save` option adds the dependency to the application’s `package.json` file.

# Configuration

## Generate Datasource

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add the Couchdb data source to your application. The entry in the applications `/server/datasources.json` will
look something like this:

```
"mydb": {
  "name": "mydb",
  "connector": "couchdb2",
  "url": "https://<username>:<password>@<host>"
  "database": "test"
}
```

## Datasource Config
The connector passes all configurations to nano driver, please check couchdb-nano's document for details:
https://github.com/apache/couchdb-nano#configuration

## Example Usage

*/server/script.js*
```javascript
var util = require('util');

// Here we create datasource dynamically.
var DataSource = require ('loopback-datasource-juggler').DataSource,
    Couchdb = require ('loopback-connector-couchdb2');

var config = {
    url: 'your_couchdb_url'
    database: 'your_couchdb_database'
};

var db = new DataSource (Couchdb, config);

Test = db.define ('Test', {
  name: { type: String },
});

Test.create({
  name: "Tony",
}).then(function(test) {
  console.log('create instance ' + util.inspect(test, 4));
  return Test.find({ where: { name: "Tony" }});
}).then(function(test) {
  console.log('find instance: ' + util.inspect(test, 4));
  return Test.destroyAll();
}).then(function(test) {
  console.log('destroy instance!');
}).catch(err);

});
```

- Use different DB instances per model definition. Refer to https://github.com/strongloop/loopback-connector-couchdb2/blob/master/doc/multiple-db-instances.md

# CRUD

User can find most loopback CRUD operation apis documented in https://loopback.io/doc/en/lb3/Built-in-models-REST-API.html

Due to the `_rev` property, Couchdb connector handles CRUD functions a little differently, for details and examples please refer to [_rev-property](https://github.com/strongloop/loopback-connector-couchdb2/blob/master/doc/_rev-property.md)

# Migration

For a model connected to Couchdb database, migration means create/update a design document with proper indexes provided by the model. There is a section called [property index](https://github.com/strongloop/loopback-connector-couchdb2#property-index) that talks about how to define indexes. 

After attaching a model to a Couchdb datasource, either statically with `model.json` file or dynamically in boot script code, user need to run `automigrate` or `autoupdate` to migrate models to database. Couchdb connector does NOT automatically migrate them.

The following migration functions take either an array of multiple model's name, or a string of a single model's name. The example code will show how to do it.

## autoupdate vs automigrate

`autoupdate` does not destroy existing model instances if model already defined in database. It only creates design document for new models. 
Under the hood Couchdb allows creating same design doc multiple times, it doesn't return error, but returns `existed` as result to tell is it a new design doc or existing one.

`automigrate` destroys existing model instances if model already defined in database. Please make sure you do want to clean up data before running `automigrate`. Then it does same thing as `autoupdate`

## isActual

User can call this function to check if model exists in database.
We need to discuss do we still want to create a design doc for a model if no index provided:
- if yes: keep this function
- if no: isActual doesn't make any sense then

## property index

TBD. Briefly:
- By default we use all_fields index with no optimization for performance
- If user define indexable properties or composite index, we create them in one design document
- It's upon user's choice to specify the index they want to use in a query.

## Example Code

Should be adjusted according to the decision we made for isActual

*/server/script.js*
```javascript
module.export = function migrateData(app) {
  // Suppose you already define a datasource called `cloudantDS` 
  // in server/datasources.json
  var ds = app.datasources.cloudantDS;
  
  // static model created with model.json file
  var StaticModel = app.models.StaticModel;
  // dynamic model created in boot script
  var DynamicModel = ds.define('DynamicModel', {
      name: {type: String},
      description: {type: String},
  });

  // Write the three examples in parallel just to avoid dup code,
  // please try ONLY ONE of them at one time.
  ds.once('connected', function() {
    // try autoupdate example - multiple models
    ds.autoupdate(['StaticModel', 'DynamicModel'], function(err) {});
    // OR
    // try automigrate example - single model
    ds.automigrate('StaticModel', function(err) {});
    // OR
    // try isActual example - if any model exist, run autoupdate, otherwise automigrate
    ds.isActual(['StaticModel', 'DynamicModel'], function(err, exist) {
      if (exist) {
        ds.autoupdate(['StaticModel', 'DynamicModel'], function(err){})
      } else {
        ds.automigate(['StaticModel', 'DynamicModel'], function(err){});
      }
    });
  });
}
```

# Discovery

Not implemented yet in this connector.

# Query

-  Couchdb doesn't support sorting with a property that's not indexable.
-  [LoopBack query](http://loopback.io/doc/en/lb3/Querying-data.html) support for: fields, limit, order, skip and where filters.
- Please check [Advanced Queries](https://github.com/strongloop/loopback-connector-couchdb/blob/master/doc/advanced-queries.md) for details about regex filter, nested filter and order.

# View

Given a design doc name and the view name in it, user can use a connector level function `viewDocs` to query the view.

Since `viewDocs` is a specific api for Couchdb/Cloudant connector only, it is not attached to the dataSource Object defined in loopback-datasource-juggler, which means the correct way to call it is `ds.connector.viewDocs`:

*/server/script.js*
```javascript
module.exports = function(server) {
  // Get Couchdb dataSource as `ds`
  // 'couchdbDS' is the name of Couchdb datasource created in 
  // 'server/datasources.json' file
  var ds = server.datasources.couchdbDS;

  // 1. Please note `ds.connector.viewDocs()` is the correct way to call it,
  // NOT `ds.viewDocs()`
  // 2. This api matches the Couchdb endpoint:
  // GET /db/_design/<design-doc>/_view/<view-name>
  ds.connector.viewDocs('design_doc', 'view_name', function(err, results) {
    // `results` would be the data returned by quering that view
  });

  // Alternatively user can also specify the filter for view query
  ds.connector.viewDocs('design_doc', 'view_name', {key: 'filter'}, 
    function(err, results) {});
};
```

# Bulk replace

Given an array of data to be updated, Couchdb supports the idea of performing bulk replace on a model instance. Please note, unlike other CRUD operations, bulk replace does not invoke any operation hooks.

**Note:** To perform bulk replace, each data in the array data set needs to have the `id` and `_rev` property corresponding to the documents `id` and `_rev` property in the database.

Example:

```server/boot/script.js```

```javascript
var dataToCreate = [
  {id: 1, name: 'Foo', age: 1},
  {id: 2, name: 'Bar', age: 1},
  {id: 3, name: 'Baz', age: 2},
  {id: 4, name: 'A', age: 4},
  {id: 5, name: 'B', age: 5},
  {id: 6, name: 'C', age: 6},
  {id: 7, name: 'D', age: 7},
  {id: 8, name: 'E', age: 8},
 ];
var dataToUpdate = [
 {id: 1, name: 'Foo-change', age: 11},
 {id: 5, name: 'B-change', age: 51},
 {id: 8, name: 'E-change', age: 91}
];

module.exports = function(app) {
  var db = app.dataSources.couchdbDS;
  var Employee = app.models.Employee;

  db.automigrate(function(err) {
    if (err) throw err;

    Employee.create(dataToCreate, function(err, result) {
    if (err) throw err;
    console.log('\nCreated instance: ' + JSON.stringify(result));

    dataToUpdate[0].id = result[0].id;
    dataToUpdate[0]._rev = result[0]._rev;
    dataToUpdate[1].id = result[4].id;
    dataToUpdate[1]._rev = result[4]._rev;
    dataToUpdate[2].id = result[7].id;
    dataToUpdate[2]._rev = result[7]._rev;

    // note: it is called `db.connector.bulkReplace`
    // rather than `Employee.bulkReplace`
    db.connector.bulkReplace('Employee', dataToUpdate, function(err, result) {
        if (err) throw err;

        console.log('\nBulk replace performed: ' + JSON.stringify(result));

        Employee.find(function(err, result) {
        if (err) throw err;

        console.log('\nFound all instances: ' + JSON.stringify(result));
        });
    });
  });
});
};
```

# Testing

## Docker
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a Couch instance on your local:
```bash
source setup.sh <HOST> <USER> <PASSWORD> <PORT> <DATABASE>
```
 where `<HOST>`, `<PORT>`, `<USER>`, `<PASSWORD>` and `<DATABASE>` are optional parameters. The default values are `localhost`, `5984`, `admin`, `pass` and `testdb` respectively.
- Run the test:
```bash
npm run mocha
```

# More Info
For more detailed information regarding connector-specific functions and behaviour,
see the [docs section](https://github.com/strongloop/loopback-connector-couchdb2/tree/master/doc).
