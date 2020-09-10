# loopback-connector-cloudant

IBM Cloudant® is a NoSQL database platform built for the cloud. You can
use Cloudant as a fully-managed DBaaS running on public cloud platforms
like Bluemix and SoftLayer or via an on-premises version called Cloudant
Local.

For more information, see [Getting started with Cloudant NoSQL DB](https://www.ng.bluemix.net/docs/services/Cloudant/index.html)

The `loopback-connector-cloudant` module is the Cloudant connector for the LoopBack framework.

# Getting Started

## Design
LoopBack tries best to fit its model to a specific database's design, while limited by the nature of database, it's not always possible to support all LoopBack features perfectly, and user should be aware of some key features about Cloudant before they start to design a Cloudant model.

### Partial Update

*Cloudant does not support the idea of updating a document. All "updates" on a document are _destructive_ replacements.*

It implies that if you do want to partially update a document, please make sure unchanged values are included in the update object.

For example:

```
// original document
{
  "id": ...,
  "_rev": ...,
  "prop1": "1",
  "prop2": "2",
}

// data to be updated
ds.updateOrCreate('User', {
  prop1: 'updated1',
}, function (err, res) {});

// document after update
{
  "id": ...,
  "_rev": ...,
  "prop1": "updated1",
}
```

*Please note how property `prop2` was completely dropped upon update.*

We have some discussion on update methods, the issue link can be found in [Feature Backlog](https://github.com/strongloop/loopback-connector-cloudant#feature-backlog) section

### Frequent Modification

Cloudant is not designed to change same document frequently and multiple times. It stores status changes by creating different documents and including the same unique id to tell that they are attached to the same item, not updating the same document.

By modeling the data in separate documents that are only written once, we can reduce the chance of concurrent access to the same document by separate processes.

And by properly controlling the conflict, developer can still do a safe modify. For details, refer to [Conflict Control](https://github.com/strongloop/loopback-connector-cloudant#conflict-control)

### Conflict Control

The basic idea is when modifying a document, user needs to control conflict by handling the revision of a document, currently the connector controls this process, after retriving the latest revision, connector uses it to update/delete doc, and returns 409 conflict error if doc changes during that time slot. In the middle, user could not interfere and provide their own conflict solution.

## Model 

### Map Between Model And Document

Unlike relational db or mongodb, Cloudant doesn't have a concept as 'table' or 'collection', data in a Cloudant database are all stored as documents.

The connector uses a design document to represent a LoopBack model, and common documents to represent model instances.

The following is a comparison among different databases:

|               | Model                        | Model Property                        | Model Instance         |
|---------------|------------------------------|---------------------------------------|------------------------|
| Relational DB | table                        | column in table                       | row in table           |
| Mongodb       | collection                   | createIndex if property.index is true | document in collection |
| Cloudant      | Design documents in database | NOT stored in document                     | common documents in database  |

To create a model, the connector creates a design document with the following config:

```
type: 'text',
name: 'lb-index-' + modelName,
ddoc: 'lb-index-ddoc-' + modelName,
index: {
  default_field: {
    enabled: false,
  },
  selector: {
    [modelIndex]: modelName
  },
},
```

By default, `modelIndex` is 'loopback__model__name', and `modelSelector` is {[modelIndex]: modelName}. User can customize `modelSelector` and `modelIndex` in datasource's json file, for details please check [model-specific configuration](https://github.com/strongloop/loopback-connector-cloudant#model-specific-configuration)

To create a model instance, the connector creates a non-design document with value of property 'loopback__model__name' equals to `modelName`. 

For model properties, we plan to create index for property that has config `index: true`. In the future, it will be the same way as what mongodb connector does.

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
  "cloudant": {
    "modelIndex": "custom_doc_type_property_name",
    "modelSelector": { "doc_type": "user" },
    "database": "test2"
  },
  ...
```

Model-specific configuration settings:

Property&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  | Type | Description
----------| -----| --------
database  | String | Database name
modelIndex | String | Specify the model name to document mapping, defaults to `loopback__model__name`.
modelSelector | JSON | Use the Cloudant Query selector syntax to associate models to existing data. NOTE: modelSelector and modelIndex are mutually exclusive; see [Selector syntax](https://console.bluemix.net/docs/services/Cloudant/api/cloudant_query.html#selector-syntax).

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

**Note:** Cloudant does not allow customized `_rev` value, hence creating an instance with a `_rev` value will not give the expected result (i.e Cloudant's CREATE operation ignores the `_rev` value when provided and generates a random unique one). The onus is on the user if they fail to comply to this rule.

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

# Force Id

In loopback `forceId` means user can specify the value of the primary key when creating a model instance, instead of using an auto-generated one. Learn more about LoopBack's [forceId](https://loopback.io/doc/en/lb3/Model-definition-JSON-file.html).

We recommend user to be careful when creating customized model id instead of using the auto-generated one because data belonging to different models can interfere with each other.

Every document stored in Cloudant has an unique id, stored as `_id`, and the database has built-in index for it. Retrieving data by its `_id` gives a better performance than querying by other field. Therefore, the connector always assign the `_id` field as the loopback model's primary key.

If you have two models that allow customized `_id` as primary key set with ```"forceId": false``` in the model definition, it could result in a document update conflict.

For example:
```
{_id: 'myid', loopback__model__name: 'Foo'}
{_id: 'myid', loopback__model__name: 'Bar'}
```

Here is an example of a case that would result in a document update conflict using ```"forceId": false```:

### model-definitions

```json
{
  "name": "Employee",
  "base": "PersistedModel",
  "idInjection": true,
  "forceId": false,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "_id": {
      "type": "number",
      "id": true,
      "required": true
    },
    "name": {
      "type": "string"
    },
    "age": {
      "type": "number"
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}

```

```json
{
  "name": "Car",
  "base": "PersistedModel",
  "idInjection": true,
  "forceId": false,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "_id": {
      "type": "number",
      "id": true,
      "required": true
    },
    "make": {
      "type": "string"
    },
    "model": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```

### boot-script

```js
'use strict';

var util = require('util');
var _ = require('lodash');

module.exports = function(app) {
  var db = app.datasources.cloudantDs;
  var Employee = app.models.Employee;
  var Car = app.models.Car;

  db.once('connected', function() {
    db.automigrate(function(err) {
      if (err) throw err;
      console.log('\nAutomigrate completed');

      Employee.create([{
        _id: 1,
        name: 'Foo',
      }, {
        _id: 2,
        name: 'Bar',
      }], function(err, result) {
        if (err) throw err;
        console.log('\nCreated employee instance: ' + util.inspect(result));

        Car.create([{
          _id: 1,
          make: 'Toyota',
        }, {
          _id: 2,
          name: 'BMW',
        }], function(err, result) {
          if (err) throw err;
          console.log('\nCreated car instance: ' + util.inspect(result));
        });
      });
    });
  });
};
```

Running the above script will throw a document update conflict because there exists a model instance with `_id` value of 1 and 2.

```bash
Web server listening at: http://localhost:3000
Browse your REST API at http://localhost:3000/explorer

Automigrate completed
Created employee instance: [ { _id: '1', name: 'Foo' }, { _id: '2', name: 'Bar' } ]

/Users/ssh/workspace/sandbox/loopback-sandbox/apps/cloudant/cloudant-forceId-app/server/boot/script.js:33
          if (err) throw err;
                   ^
Error: Document update conflict. (duplicate?),Error: Document update conflict. (duplicate?)
```

In order to avoid this pitfall, please set ```"forceId": true``` on either of the model definition which would allow one of the models to have an auto-generated id or do not set ```"forceId": false``` on either of the model definitions.

# Setup Cloudant Instance

For user that don't have a cloudant server to develop or test, here are some suggestions can help you quickly setup one.

For development use, a docker container of Cloudant local is easy to setup and there is no request limit per second.

Bluemix Cloudant will be more stable for production.

- Cloudant local (docker image)

  - No request limit.
  - Please follow https://hub.docker.com/r/ibmcom/cloudant-developer/ to create your Cloudant local instance

- Cloudant on Bluemix

  - Limit request per second by default.
  - Choose Bluemix Cloudant if you already have a Bluemix account with a better situation than limited-days' free trial.

  - Setup steps:

    1. Open Bluemix console: https://console.ng.bluemix.net
    1. Login with your account.
    1. Click on "CATALOG" in navigation bar.
    1. Search with keyword "cloudant" and choose the "Cloudant NOSQLDB" under "Data and Analytics".
    1. Click on the green button "create" in the popup page to create your Cloudant database.
    1. Go to "DASHBOARD" where you will see your new Cloudant DB icon under "Services".
    1. Click on the icon, and it will direct you to the database page. Check "Service Credentials" on the left to see your credentials.
    1. Check "Manage" then click on button "LAUNCH" to see your Cloudant dashboard.

- Cloudant DBaaS account
  
  - Limit request per second.
  - Limited free trial.
  - Sign up with https://cloudant.com/sign-up/ then you will see your Cloudant dashboard.
  
To view the Cloudant dashboard on both DBaaS and Bluemix, [sign in](https://cloudant.com/sign-in/) with your Cloudant username and password.

# Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-cloudant --save
```

The `--save` option adds the dependency to the application’s `package.json` file.

# Configuration

## Generate Datasource

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add the Cloudant data source to your
application. The entry in the applications `/server/datasources.json` will
look something like this:

```
"mydb": {
  "name": "mydb",
  "connector": "cloudant",
  "url": "https://<username>:<password>@<host>"
  "database": "test"
}
```
or

```
"mydb": {
  "name": "mydb",
  "connector": "cloudant",
  "username": "XXXX-bluemix",
  "password": "YYYYYYYYYYYY",
  "database": "test"
}
```

## Datasource Config

### `url` vs `username` & `password`
- *NOTE: The `url` property will override `username` and `password`.*

- It means only when missing `url`, cloudant will use `username` and `password` to create connection. 

- If `url` is wrong, even user provide correct `username` and `password`, the connection still fails.

- Only specify the `username` and `password` fields if you are using the root/admin user for the Cloudant server which has the same
string as the hostname for the Cloudant server, because the Cloudant driver used by the connector appends `.cloudant.com` to the
`username` field when `username` and `password` fields are specified. Therefore, it is good practice to use the `url` field instead
of `username` and `password` if your host is not `username.cloudant.com`.

- Edit `datasources.json` to add other supported properties as required:

Property  | Type | Description
----------| -----| --------
database  | String | Database name
username  | String | Cloudant username, use either 'url' or username/password
password  | String | Cloudant password
url       | String | Cloudant URL containing both username and password
modelIndex | String | Specify the model name to document mapping, defaults to `loopback__model__name`

### iamApiKey

We honor the plugins’ configuration and passes them to the driver. 
[Cloudant plugins](https://github.com/cloudant/nodejs-cloudant#the-plugins) has section 'iamauth' to show how the IAM authentication is handled by the driver.

To connect to the Cloudant database using IAM authentication, you can configure your LoopBack datasource as:

```ts
"mydb": {
 "name": "mydb",
 "connector": "cloudant",
 // make sure you provide the password here
 "url": "https://<username>:<password>@<host>"
 "database": "test",
 "plugins": {
   "iamauth": { "iamApiKey": "xxxxxxxxxx"}
 }
}
```

### Advanced configuration
Besides the basic configuration properties, user can provide advanced configuration information, for example proxy, in `requestDefaults`:

```
"mydb": {
  "name": "mydb",
  "connector": "cloudant",
  "url": "https://<username>:<password>@<host>"
  "database": "test",
  "requestDefaults": {"proxy": "http://localhost:8080"}
}
```

For details, refer to the [driver(nodejs-cloudant) document](https://github.com/cloudant/nodejs-cloudant#advanced-configuration)

### Requests Plugin

User can provide plugin name and parameters in datasource object. For example, connect to a Cloudant server with plugin called `retry`, with parameters `retryAttempts` and `retryTimeout`:

```
"mydb": {
  "name": "mydb",
  "connector": "cloudant",
  "url": "https://<username>:<password>@<host>"
  "database": "test",
  "plugin": "retry",
  "retryAttempts": 5,
  "retryTimeout": 1000
}
```

Please note user can only use one of the plugins list in Cloudant driver's doc, not multiple:
https://github.com/cloudant/nodejs-cloudant#request-plugins

## Example Usage

```javascript
// Inside file /server/script.js
var util = require('util');

// Here we create datasource dynamically.
// If you already define a static datasource in server/datasources.json,
// please check how to load it in 
// https://github.com/cloudant/nodejs-cloudant#example-code
var DataSource = require ('loopback-datasource-juggler').DataSource,
    Cloudant   = require ('loopback-connector-cloudant');

var config = {
    username: 'your_cloudant_username',
    password: 'your_cloudant_password',
    database: 'your_cloudant_database'
};

var db = new DataSource (Cloudant, config);

Test = db.define ('Test', {
  name: { type: String },
});

// wait for connected event on the
// datasource before doing any database
// operations since we connect asynchronously
db.once('connected', function() {
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

- Use different DB instances per model definition. Refer to https://github.com/strongloop/loopback-connector-cloudant/blob/master/doc/multiple-db-instances.md

# CRUD

User can find most CRUD operation apis documented in https://loopback.io/doc/en/lb3/Built-in-models-REST-API.html

We are still in progress of refactoring some methods, more details to be updated.

## Update

Currently `update` does the same thing as `replace`, for details, refer to https://github.com/strongloop/loopback-connector-cloudant#no-partial-update

# Migration

After attaching a model to a Cloudant datasource, either statically with `model.json` file or dynamically in boot script code, user need to run `automigrate` or `autoupdate` to migrate models to database. Cloudant connector does NOT automatically migrate them.

The following migration functions take either an array of multiple model's name, or a string of a single model's name. The example code will show how to do it.

## autoupdate vs automigrate

`autoupdate` does not destroy existing model instances if model already defined in database. It only creates design document for new models. 
Under the hood Cloudant allows creating same design doc multiple times, it doesn't return error, but returns `existed` as result to tell is it a new design doc or existing one.

`automigrate` destroys existing model instances if model already defined in database. Please make sure you do want to clean up data before running `automigrate`. Then it does same thing as `autoupdate`

## isActual

User can call this function to check if model exists in database.

## Example Code

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

Not implemented yet, track it in story https://github.com/strongloop/loopback-connector-cloudant/issues/118 

# Query

-  Uses Cloudant Query (Lucene) to support ad-hoc searching.
-  [LoopBack query](http://loopback.io/doc/en/lb3/Querying-data.html) support for: fields, limit, order, skip and where filters.
- Please check [Advanced Queries](https://github.com/strongloop/loopback-connector-cloudant/blob/master/doc/advanced-queries.md) for details about regex filter, nested filter and order.

# View

Given a design doc name and the view name in it, user can use a connector level function `viewDocs` to query the view.

Since `viewDocs` is a specific api for Cloudant connector only, it is not attached to the dataSource Object defined in loopback-datasource-juggler, which means the correct way to call it is `ds.connector.viewDocs`:

*/server/script.js*
```javascript
module.exports = function(server) {
  // Get Cloudant dataSource as `ds`
  // 'cloudantDB' is the name of Cloudant datasource created in 
  // 'server/datasources.json' file
  var ds = server.datasources.cloudantDB;

  ds.once('connected', function() {
    // 1. Please note `ds.connector.viewDocs()` is the correct way to call it,
    // NOT `ds.viewDocs()`
    // 2. This api matches the Cloudant endpoint:
    // GET /db/_design/<design-doc>/_view/<view-name>
    ds.connector.viewDocs('design_doc', 'view_name', function(err, results) {
      // `results` would be the data returned by querying that view
    });

    // Alternatively user can also specify the filter for view query
    ds.connector.viewDocs('design_doc', 'view_name', {key: 'filter'}, 
      function(err, results) {});
  });
};
```

# Geospatial

Given a design doc name and the filter name in it, user can use a connector level function `geoDocs` to query a geospatial index.

Since `geoDocs` is a specific api for Cloudant connector only, it is not attached to the dataSource Object defined in loopback-datasource-juggler, which means the correct way to call it is `ds.connector.geoDocs`:

*/server/script.js*

```javascript
module.exports = function(server) {
  // Get Cloudant dataSource as `ds`
  // 'cloudantDB' is the name of Cloudant datasource created in 
  // 'server/datasources.json' file
  var ds = server.datasources.cloudantDB;

  ds.once('connected', function() {
    // 1. Please note `ds.connector.geoDocs()` is the correct way to call it,
    // NOT `ds.geoDocs()`
    // 2. This api matches the Cloudant endpoint:
    // GET /db/_design/<design-doc>/_geo/<index-name>
    ds.connector.geoDocs('design_doc', 'index_name', function(err, results) {
      // `results` would be the data returned by querying that geospatial index
    });

    // Alternatively user can also specify the filter for geospatial query
    ds.connector.geoDocs('design_doc', 'index_name', {key: 'filter'}, 
      function(err, results) {});
  });
};
```

# Bulk replace

Given an array of data to be updated, Cloudant supports the idea of performing bulk replace on a model instance. Please note, unlike other CRUD operations, bulk replace does not invoke any operation hooks.

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
  var db = app.dataSources.cloudantDS;
  var Employee = app.models.Employee;

  db.once('connected', function() {
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
  });
};
```

# Partitioned database

If you're using partitioned database, see details on how to configure your model and make use of the partitioned search in https://github.com/strongloop/loopback-connector-cloudant/blob/master/doc/partitioned-db.md

# Testing

- Cloudant local(docker image)
  
  - url: given the dashboard address 'http://myhost:8080/dashboard.html', the connection url would be 'http://admin:pass@myhost:8080'
  - database: create your own database for testing

- Cloudant DBaaS account

  - username: your sign up username
  - password: your sign up password
  - database: create your own database for testing

- Cloudant on Bluemix

  - username: see services credentials
  - password: see services credentials
  - database: create your own database for testing

To run the tests:

```bash
CLOUDANT_USERNAME=username CLOUDANT_PASSWORD=password CLOUDANT_HOST=localhost CLOUDANT_HOST=5984 CLOUDANT_DATABASE=database npm run mocha
```

### Docker

If you do not have a local Cloudant instance, you can also run the test suite
with very minimal requirements. We use couchDB docker image to run the test
locally.

NOTICE: we use `couchDB3` docker image for testing Cloudant because Cloudant
doesn't have a maintained image, and most of the their functionalities are the
same (except couchDB doesn't support geosearch).

- First have [Docker](https://docs.docker.com/engine/installation/) installed.

- To simply run the tests, the following script would spawn a CouchDB3 instance and run tests automatically on your end:

```bash
npm t
```

- If you'd like to create a container locally with custom configurations, run the following script instead:

```bash
source setup.sh <HOST> <USER> <PASSWORD> <PORT> <DATABASE>
```

Where `<HOST>`, `<PORT>`, `<USER>`, `<PASSWORD>` and `<DATABASE>` are optional parameters. The default values are `localhost`, `5984`, `admin`, `pass` and `testdb` respectively. The `<USER>` and `<PASSWORD>` you set above will be the admin/password of this couchDB3 container.

The script `cloudant-config.sh` is generated by the above script. It has all needed environment variables for the tests.

- Then run the following command to test out your code:

```bash
source cloudant-config.sh && npm run mocha
```

# More Info
For more detailed information regarding connector-specific functions and behaviour,
see the [docs section](https://github.com/strongloop/loopback-connector-cloudant/tree/master/doc).

# Feature backlog

* [Partial update](https://github.com/strongloop/loopback-connector-cloudant/issues/35)
* [Discovery](https://github.com/strongloop/loopback-connector-cloudant/issues/118)
* Index-only model properties marked with index=true
* Configurable "view based" or JSON indexes. [More Info>>](https://cloudant.com/blog/mango-json-vs-text-indexes)
* [Support uuid](https://github.com/strongloop/loopback-connector-cloudant/issues/104)

## Index

To be updated
