---
title: "Understanding data sources"
lang: en
layout: page
keywords: LoopBack
tags: [data_sources]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Advanced-topics-data-sources.html
summary:
---

{% include image.html file="9830485.png" alt="Relationship between models, data sources, and connectors" %}

## Overview

The diagram illustrates the relationship between LoopBack `Model`, `DataSource`, and `Connector`.

1.  Define the model.

2.  Create an instance of `ModelBuilder` or `DataSource`. `DataSource` extends from `ModelBuilder`.
    ModelBuilder is responsible for compiling model definitions to JavaScript constructors representing model classes.
    DataSource inherits that function from ModelBuilder.

3.  Use `ModelBuilder` or `DataSource` to build a JavaScript constructor (i.e. the model class) from the model definition.
    Model classes built from `ModelBuilder` can be later attached to a DataSource to receive the mixin of data access functions.

4.  As part of step 2, `DataSource` initializes the underlying `Connector` with a settings object which provides configurations to the connector instance. 
    `Connector` collaborates with `DataSource` to define the functions as `DataAccessObject` to be mixed into the model class.
    The `DataAccessObject` consists of a list of static and prototype methods.
    It can be create, retrieve, update, and delete operations or other specific functions depending on the connector's capabilities.

The `DataSource` object is the unified interface for LoopBack applications to integrate with backend systems.
It's a factory for data access logic around model classes. With the ability to plug in various connectors,
`DataSource` provides the necessary abstraction to interact with databases or services to decouple the business logic from plumbing technologies.

## Creating a DataSource programmatically

The [`DataSource` constructor](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource) accepts the following arguments:

* name: Optional name of the data source instance being created. 
* settings: An object of properties to configure the connector. Must include a `connector` property, specifying the connector to use.
  See [Connecting models to data sources (Connectors)](Connecting-models-to-data-sources.html#connectors).

For example:

```javascript
var DataSource = require('loopback-datasource-juggler').DataSource;

var dataSource = new DataSource({
    connector: require('loopback-connector-mongodb'),
    host: 'localhost',
    port: 27017,
    database: 'mydb'
});
```

The `connector` argument passed the `DataSource` constructor can be one of the following:

* The connector module from `require(connectorName)`
* The full name of the connector module, such as 'loopback-connector-oracle'
* The short name of the connector module, such as 'oracle', which will be converted to 'loopback-connector-'
* A local module under ./connectors/ folder

```
var ds1 = new DataSource('memory');
var ds2 = new DataSource('loopback-connector-mongodb'));
var ds3 = new DataSource(require('loopback-connector-oracle'));
```

LoopBack provides the built-in memory connector that uses in-memory store for create, retrieve, update, and delete operations. 

The `settings` argument configures the connector. Settings object format and defaults depends on specific connector, but common fields are:

* `host`: Database host
* `port`: Database port
* `username`: Username to connect to database
* `password`: Password to connect to database
* `database`: Database name
* `debug`: Turn on verbose mode to debug db queries and lifecycle

For more information, see 
[Connecting models to data sources (Data source properties)](Connecting-models-to-data-sources.html#data-source-properties).
For connector-specific settings, see the connector's documentation.

## Creating a model from a data source

`DataSource` extends from `ModelBuilder`, which is a factory for plain model classes that only have properties.
`DataSource` connects to databases and other backend systems using `Connector`.

```javascript
var DataSource = require('loopback-datasource-juggler').DataSource;
var ds = new DataSource('memory');

var User = ds.define('User', {
  name: String,
  bio: String,
  approved: Boolean,
  joinedAt: Date,
  age: Number
});
```

All model classes within single data source share the same connector type and one database connection or connection pool.
But it's possible to use more than one data source to connect to different databases.

Alternatively, you can attach a plain model constructor created from `ModelBuilder` to a `DataSource`.

```javascript
var ModelBuilder = require('loopback-datasource-juggler').ModelBuilder;
var builder = new ModelBuilder();

var User = builder.define('User', {
  name: String,
  bio: String,
  approved: Boolean,
  joinedAt: Date,
  age: Number
});

var DataSource = require('loopback-datasource-juggler').DataSource;
var ds = new DataSource('memory');

User.attachTo(ds); // The create, retrieve, update, and delete
                   // methods will be mixed into the User constructor
```

### Creating a data source for a connector

Application code does not directly use a connector. Rather, you create a DataSource to interact with the connector.

The simplest example is for the in-memory connector:

```javascript
var memory = loopback.createDataSource({
  connector: loopback.Memory
});
```

Here is another example, this time for the Oracle connector:

```javascript
var DataSource = require('loopback-datasource-juggler').DataSource;
var oracleConnector = require('loopback-connector-oracle');

var ds = new DataSource(oracleConnector, {
  host: 'localhost',
  database: 'XE',
  username: 'username',
  password: 'password',
  debug: true
});
```

The connector argument passed the DataSource constructor can be one of the following:

* The connector module from `require('connectorName')`
* The full name of the connector module, such as `'loopback-connector-oracle'`.
* The short name of the connector module, such as `'oracle'`, that LoopBack converts to `'loopback-connector-oracle'` (for example).
* A local module in the `/connectors` folder

### Initializing a connector

The connector module can export an `initialize` function to be called by the owning DataSource instance.

```javascript
exports.initialize = function (dataSource, postInit) {

  var settings = dataSource.settings || {};   // The settings is passed in from the dataSource

  var connector = new MyConnector(settings);  // Construct the connector instance
  dataSource.connector = connector;           // Attach connector to dataSource
  connector.dataSource = dataSource;          // Hold a reference to dataSource
  // ...
};
```

The DataSource calls the `initialize` method with itself and an optional `postInit` callback function.
The connector receives the settings from the `dataSource` argument and use it to configure connections to backend systems.

Please note connector and dataSource set up a reference to each other.

Upon initialization, the connector might connect to database automatically.
Once connection established dataSource object emit 'connected' event, and set `connected` flag to true,
but it is not necessary to wait for 'connected' event because all queries cached and executed when dataSource emit 'connected' event.

To disconnect from database server call `dataSource.disconnect` method.
This call is forwarded to the connector if the connector have ability to connect/disconnect.
