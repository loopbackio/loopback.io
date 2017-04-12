# loopback-connector-cassandra

The official Cassandra Connector module for [loopback-datasource-juggler](http://docs.strongloop.com/loopback-datasource-juggler/).

<div class="gh-only">Please also see <a href="http://loopback.io/doc/en/lb3/Cassandra-connector.html">LoopBack Cassandra Connector</a> in LoopBack documentation.
</div>

## Installation

In your application root directory, enter this command to install the connector:

```sh
npm install loopback-connector-cassandra --save
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

If you create a Cassandra data source using the data source generator as described below, you don't have to do this, since the generator will run `npm install` for you.

## Creating a Cassandra data source

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a Cassandra data source to your application.  
The generator will prompt for the database server hostname, port, and other settings
required to connect to a Cassandra database.  It will also run the `npm install` command above for you.

The entry in the application's `/server/datasources.json` will look like this:

```javascript
"mycass": {
  "name": "mycass",
  "connector": "cassandra",
  "host": "cassserver",
  "port": 9042,
  "database": "mycassdb",
  "password": "mypassword",
  "user": "admin"
 }
```

Edit `datasources.json` to add any other additional properties such as `connectTimeout` and `readTimeout` supported by
 [`cassandra-driver`](https://github.com/datastax/nodejs-driver) as `socketOptions`.

## Type mappings

See [LoopBack types](http://loopback.io/doc/en/lb3/LoopBack-types.html) for details on LoopBack's data types.

### LoopBack to/from Cassandra types

In addition to the standard data types such as String, Boolean, and Number, several Cassandra specific types are supported as shown in the table blow.

<table>
  <thead>
    <tr>
      <th>LoopBack Type</th>
      <th>Cassandra Type</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>Uuid</td>
      <td>UUID</td>
    </tr>
    <tr>
      <td>TimeUuid</td>
      <td>TIMEUUID</td>
    </tr>
    <tr>
      <td>Tuple</td>
      <td>TUPLE</td>
    </tr>
  </tbody>
</table>

## Primary Keys

### Auto generated partition keys

In case no `id` is defined, LoopBack adds ***id*** with Cassandra connector's default type: `Uuid`.

LoopBack notation:

```javascript
    cass = db.define('cass', {
      str: String,
      num: Number,
      });
```

Cql equivalent:

```sql
CREATE TABLE cass (
   str VARCHAR,
   num INT,
   id UUID,
   PRIMARY KEY (id)
);
```

### User defined partition keys

LoopBack notation:

When `id: true` is defined, LoopBack does not add `id` and uses it as a partition key.

```javascript
tupletime = db.define('tupletime', {
  tuple: {type: 'Tuple'},
  str: String,
  num: Number,
  time: {type: 'TimeUuid', id: true},
  });
```

Cql equivalent:

```sql
CREATE TABLE tupletime (
   tuple TUPLE,
   str VARCHAR,
   num INT,
   time TIMEUUID,
   PRIMARY KEY (time)
);
```

### Compound partition keys

LoopBack notation:

`id` value can be either boolean or number (base 1).  Compound partition key is created by combining the ones with number in ascending order
then boolean.  In case conflict, first-come first-served.

```javascript
compound = db.define('compound', {
  patBool: {type: Boolean, id: 2},
  str: String,
  patStr: {type: String, id: true},
  num: Number,
  patNum: {type: Number, id: 1},
  });
```

Cql equivalent:

```sql
CREATE TABLE compound (
   patBool BOOLEAN,
   str VARCHAR,
   patStr VARCHAR,
   num INT,
   patNum INT,
   PRIMARY KEY ((patNum, patBool, patStr))
);
```

## Clustering keys and Sorting

LoopBack notation:

Cassandra connector supports clustering key as a custom option.  Sorting order can be associated with clustering keys as `ASC` or `DESC`.

```javascript
compound = db.define('compound', {
  patBool: {type: Boolean, id: 2},
  str: String,
  patStr: {type: String, id: true},
  num: Number,
  patNum: {type: Number, id: 1},
  }, {
  cassandra: {
    clusteringKeys: ['str', 'num DESC'],
    },
  });
```

Cql equivalent:

```sql
CREATE TABLE compound (
   patBool BOOLEAN,
   str VARCHAR,
   patStr VARCHAR,
   num INT,
   patNum INT,
   PRIMARY KEY ((patNum, patBool, patStr), str, num)
) WITH CLUSTERING ORDER BY (str ASC, num DESC);
```

## Secondary Indexes

Additional searchable fields can be defined as secondary indexes.

LoopBack notation:

```javascript
searchable = db.define('searchable', {
  str: {type: String, index: true},
  timeuuid: {type: TimeUuid, id: true},
  });
```

Cql equivalent:

```sql
CREATE TABLE searchable (
   str VARCHAR,
   timeuuid TIMEUUID,
   PRIMARY KEY (timeuuid)
);
CREATE INDEX ON searchable (str);
```

## V1 Limitations

Because of the Cassandra architecture, Cassandra connector V1 supports `where` and `limit`.
Other filter conditions are not supported.

### `order` filter not supported

Use clustering keys for sorting.  The database side sorting determines the order or rows to be return
when ordering matters such as `where limit` or `findOne`.  Adhoc sorting with `sort` filter is ignored.

### `or` filter not supported

`and` is supported, but `or` is not in `where` filter.

### `offset` is not supported

Pagination is not supported in V1.


## Running tests

The tests in this repository are mainly integration tests, meaning you will need to run them using our pre-configured test server.

1. Ask a core developer for instructions on how to set up test server credentials on your machine
2. `npm test`

The Cassandra connector package has its custom test cases under **test** directory.  They are good examples of Cassandra specific table definition and operations in action.