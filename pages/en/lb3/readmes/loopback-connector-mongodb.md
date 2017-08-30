# loopback-connector-mongodb

The official MongoDB connector for the LoopBack framework.

Please see the full documentation at [loopback.io](http://loopback.io/doc/en/lb3/MongoDB-connector.html).

## Installation

In your application root directory, enter this command to install the connector:

```sh
npm install loopback-connector-mongodb --save
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

If you create a MongoDB data source using the data source generator as described below, you don't have to do this, since the generator will run `npm install` for you.

## Creating a MongoDB data source

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a MongoDB data source to your application.  
The generator will prompt for the database server hostname, port, and other settings
required to connect to a MongoDB database.  It will also run the `npm install` command above for you.

The entry in the application's `/server/datasources.json` will look like this:

```javascript
"mydb": {
  "host": "myserver",
  "port": 27017,
  "url":  "",
  "database": "test",
  "password": "mypassword",
  "name": "mydb",
  "user": "me",
  "connector": "mongodb"  
}
```

Edit `datasources.json` to add any other additional properties that you require.

### Connection properties

| Property | Type&nbsp;&nbsp; | Description |
| --- | --- | --- |
| connector | String | Connector name, either “loopback-connector-mongodb” or “mongodb”. |
| database | String | Database name |
| host | String | Database host name |
| password | String | Password to connect to database |
| port | Number | Database TCP port |
| url | String | Connection URL of form `mongodb://user:password@host/db`. Overrides other connection settings (see below). |
| username | String | Username to connect to database |

**NOTE**: In addition to these properties, you can use additional Single Server Connection parameters supported by [`node-mongodb-native`](http://mongodb.github.io/node-mongodb-native/core/driver/reference/connecting/connection-settings/).

### Additional properties

- **allowExtendedOperators**: Set to `true` to enable using MongoDB operators such as
`$currentDate`, `$inc`, `$max`, `$min`, `$mul`, `$rename`, `$setOnInsert`, `$set`, `$unset`, `$addToSet`,
`$pop`, `$pullAll`, `$pull`, `$pushAll`, `$push`, and `$bit`.  Default is `false`.
- **enableGeoIndexing**: Set to `true` to enable 2dsphere indexing for model properties
of type `GeoPoint`. This allows for indexed ```near``` queries.  Default is `false`.
- **lazyConnect**: 
  - Default is `false`.
  - If set to `true`, the database instance will not be attached to the datasource and the connection is deferred.
  - It will try to establish the connection automatically once users hit the endpoint. If the mongodb server is offline, the app will start, however, the endpoints will not work.

### Setting the url property in datasource.json

You can set the `url` property to a connection URL in `datasources.json` to override individual connection parameters such as `host`, `user`, and `password`.  

Additionally, you can override the global `url` property in environment-specific data source configuration files, for example for production in `datasources.production.json`, and use the individual connection parameters `host`, `user`, `password`, and `port`.  To do this, you _must_ set `url` to `false`, null, or “” (empty string).
If you set `url` to `undefined` or remove the `url` property altogether, the override will not work.

For example, for production, use `datasources.production.json` as follows (for example) to overide the `url` setting in `datasources.json:

```javascript
"mydb": {
  "host": "myserver",
  "port": 27017,
  "url":  false,
  "database": "test",
  "password": "mypassword",
  "name": "mydb",
  "user": "me",
  "connector": "mongodb"  
}
```

For more information on setting data source configurations for different environments, see [Environment-specific configuration](https://loopback.io/doc/en/lb3/Environment-specific-configuration.html#data-source-configuration).

## Type mappings

See [LoopBack types](http://loopback.io/doc/en/lb3/LoopBack-types.html) for details on LoopBack's data types.

### LoopBack to MongoDB types

Type conversion is mainly handled by Mongodb. See ['node-mongodb-native'](http://mongodb.github.io/node-mongodb-native/) for details.

## Customizing MongoDB configuration for tests/examples

By default, examples and tests from this module assume there is a MongoDB server
instance running on localhost at port 27017.

To customize the settings, you can drop in a `.loopbackrc` file to the root directory
of the project or the home folder.

**Note**: Tests and examples in this project configure the data source using the deprecated '.loopbackrc' file method,
which is not suppored in general.
For information on configuring the connector in a LoopBack application, please refer to [loopback.io](http://loopback.io/doc/en/lb2/MongoDB-connector.html).

The .loopbackrc file is in JSON format, for example:

    {
        "dev": {
            "mongodb": {
                "host": "127.0.0.1",
                "database": "test",
                "username": "youruser",
                "password": "yourpass",
                "port": 27017
            }
        },
        "test": {
            "mongodb": {
                "host": "127.0.0.1",
                "database": "test",
                "username": "youruser",
                "password": "yourpass",
                "port": 27017
            }
        }
    }

**Note**: username/password is only required if the MongoDB server has
authentication enabled.

## Running tests

### Own instance
If you have a local or remote MongoDB instance and would like to use that to run the test suite, use the following command:
- Linux
```bash
MONGODB_HOST=<HOST> MONGODB_PORT=<PORT> MONGODB_DATABASE=<DATABASE> CI=true npm test
```
- Windows
```bash
SET MONGODB_HOST=<HOST> SET MONGODB_PORT=<PORT> SET MONGODB_DATABASE=<DATABASE> SET CI=true npm test
```

### Docker
If you do not have a local MongoDB instance, you can also run the test suite with very minimal requirements.
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a MongoDB instance on your local:
```bash
source setup.sh <HOST> <PORT> <DATABASE>
```
where `<HOST>`, `<PORT>` and `<DATABASE>` are optional parameters. The default values are `localhost`, `27017` and `testdb` respectively.
- Run the test:
```bash
npm test
```

### Leak detection

Tests run for 100 iterations by default, but can be increased by setting the
env var `ITERATIONS`.

```
make leak-detection # run 100 iterations (default)
```

or

```
ITERATIONS=1000 make leak-detection # run 1000 iterations
```

## Running benchmarks

**Benchmarks must be run on a Unix-like operating system.**

```
make benchmarks
```

The results will be output in `./benchmarks/results.md`.

## strictObjectIDCoercion flag

In version 1.17.0, the id of string type is being converted to ObjectID, when the string length is 12 or 24 and has the format of an ObjectID i.e /^[0-9a-fA-F]{24}$/. To avoid this issue, the strictObjectIDCoercion flag should be set to true in the model-definition file.

model-definition.js

```js
{
  "name": "myModelName",
  "base": "PersistedModel",
  "idInjection": false,
  "options": {
    "validateUpsert": true,
    "strictObjectIDCoercion": true
  },
...
}
```
boot-script.js

```js
'use strict';
var util = require('util');

module.exports = function(app) {
  var db = app.dataSources.mongoDs;
  var myModelName = app.models.myModelName;

  db.automigrate(function(err) {
    if (err) throw err;
    console.log('Automigrate complete');

    myModelName.create([{
      id: '59460487e9532ae90c324b59',
      name: 'Bob',
    }, {
      id: '59460487e9532ae90c324b5a',
      name: 'Sam',
    }, {
      id: '420',
      name: 'Foo',
      age: 1,
    }, {
      id: '21',
      name: 'Bar',
    }], function(err, result) {
      if (err) throw err;
      console.log('\nCreated instances of myModelName: ' + util.inspect(result, 4));

      myModelName.find({where: {id: {inq: ['59460487e9532ae90c324b59',
        '59460487e9532ae90c324b5a']}}},
      function(err, result) {
        if (err) throw err;
        console.log('\nFound instance with inq: ' + util.inspect(result, 4));
      });
    });
  });
};
```

## Release notes

  * 1.1.7 - Do not return MongoDB-specific _id to client API, except if specifically specified in the model definition
