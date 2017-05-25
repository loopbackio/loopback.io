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

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a Cassandra data source to your application.  Select `Cassandra` connector as follows:
```
$ lb datasource
? Enter the data-source name: mycass
? Select the connector for mycass: 
  IBM Cloudant DB (supported by StrongLoop) 
  IBM DB2 for z/OS (supported by StrongLoop) 
  IBM WebSphere eXtreme Scale key-value connector (supported by StrongLoop) 
❯ Cassandra (supported by StrongLoop) 
  Redis key-value connector (supported by StrongLoop) 
  MongoDB (supported by StrongLoop) 
  MySQL (supported by StrongLoop) 
(Move up and down to reveal more choices)
```
The generator will then prompt for the database server hostname, port, and other settings
required to connect to a Cassandra database.  It will also run the `npm install` command for you.
```
$ lb datasource
? Enter the data-source name: mycass
? Select the connector for mycass: Cassandra (supported by StrongLoop)
Connector-specific configuration:
? host: localhost
? port: 9042
? user: 
? password: 
? database: test
? connectTimeout(ms): 30000
? readTimeout(ms): 30000
? Install loopback-connector-cassandra@^1.0.0 Yes
loopback-connector-cassandra@1.0.0 node_modules/loopback-connector-cassandra
...
```

The entry in the application's `/server/datasources.json` will look like this:
```javascript
"mycass": {
  "host": "localhost",
  "port": 9042,
  "database": "test",
  "password": "",
  "name": "mycass",
  "user": "",
  "connectTimeout": 30000,
  "readTimeout": 30000,
  "connector": "cassandra"
}
```

Edit `datasources.json` to add any other additional properties supported by [`cassandra-driver`](https://github.com/datastax/nodejs-driver).

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
zipCodes = db.define('zipCodes', {
  state: String,
  zipCode: Number,
  });
```

Cql equivalent:

```sql
CREATE TABLE zipCodes (
   state TEXT,
   zipCode INT,
   id UUID,
   PRIMARY KEY (id)
);
```

### User defined partition keys

LoopBack notation:

When `id: true` is defined, LoopBack does not add `id` and uses it as a partition key.

```javascript
customers = db.define('customers', {
  name: String,
  state: String,
  zipCode: Number,
  userId: {type: 'TimeUuid', id: true},
  });
```

Cql equivalent:

```sql
CREATE TABLE customers (
   name TEXT,
   state TEXT,
   zipCode INT,
   userId TIMEUUID,
   PRIMARY KEY (userId)
);
```

### Compound partition keys

LoopBack notation:

`id` value can be either boolean or number (base 1).  Compound partition key is created by combining the ones with number in ascending order
then boolean.  In case conflict, first-come first-served.

```javascript
customers = db.define('customers', {
  isSignedUp: {type: Boolean, id: 2},
  state: String,
  contactSalesRep: {type: String, id: true},
  zipCode: Number,
  userId: {type: Number, id: 1},
  });
```

Cql equivalent:

```sql
CREATE TABLE customers (
   isSignedUp BOOLEAN,
   state TEXT,
   contactSalesRep TEXT,
   zipCode INT,
   userId INT,
   PRIMARY KEY ((userId, isSignedUp, contactSalesRep))
);
```

## Clustering keys and Sorting

Cassandra stores data on each node according to the hashed TOKEN value of the partition key in the range that the node is responsible for.
Since hashed TOKEN values are generally random, `find` with `limit: 10` filter will return apparently random 10 (or less) rows.
The Cassandra connector supports on-disk sorting by setting `clustering key` as ASCending or DESCending at table creation time.
`order` filter is ignored.  Since sorting is done on node by node basis, the returned result is property sorted only when the partition key is specified.

For example, in case you want to find the most recently added row, create a table with time-based column as a clustering key with DESC property.
Then, use `find` with `limit: 1` or `findOne`.

Concrete example is as follows assuming all the rows fall in the same partition range.
Note that `clusteringKeys` is defined as an array because the order of the sorting keys is important:

<table>
  <thead>
    <tr>
      <th>isSignedUp</th>
      <th>state</th>
      <th>contactSalesRep</th>
      <th>zipCode</th>
      <th>userId</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>true</td>
      <td>Arizona</td>
      <td>Ted Johnson</td>
      <td>85003</td>
      <td>2003</td>
    </tr>
    <tr>
      <td>true</td>
      <td>Arizona</td>
      <td>David Smith</td>
      <td>85002</td>
      <td>16002</td>
    </tr>
    <tr>
      <td>true</td>
      <td>Arizona</td>
      <td>Mary Parker</td>
      <td>85001</td>
      <td>15001</td>
    </tr>
    <tr>
      <td>true</td>
      <td>California</td>
      <td>David Smith</td>
      <td>90001</td>
      <td>21002</td>
    </tr>
    <tr>
      <td>true</td>
      <td>Colorado</td>
      <td>Mary Parker</td>
      <td>80002</td>
      <td>2010</td>
    </tr>
    <tr>
      <td>true</td>
      <td>Colorado</td>
      <td>Jane Miller</td>
      <td>80001</td>
      <td>12002</td>
    </tr>
    <tr>
      <td>true</td>
      <td>Nevada</td>
      <td>Ted Johnson</td>
      <td>75173</td>
      <td>28006</td>
    </tr>
  </tbody>
</table>

LoopBack notation:

Cassandra connector supports clustering key as a custom option.  Sorting order can be associated with clustering keys as `ASC` or `DESC`.

```javascript
customers = db.define('customers', {
  isSignedUp: {type: Boolean, id: true},
  state: String,
  contactSalesRep: String,
  zipCode: Number,
  userId: Number,
  }, {
  cassandra: {
    clusteringKeys: ['state', 'zipCode DESC'],
    },
  });
```

Cql equivalent:

```sql
CREATE TABLE customers (
   isSignedUp BOOLEAN,
   state TEXT,
   contactSalesRep TEXT,
   zipCode INT,
   userId INT,
   PRIMARY KEY (isSignedUp, state, zipCode)
) WITH CLUSTERING ORDER BY (state ASC, zipCode DESC);
```

## Secondary Indexes

Additional searchable fields can be defined as secondary indexes.  For example, in case the table `customers` below is defined with `name` as just `{type: String}`,
 then `find` with `where: {name: "Martin Taylor"}` filter will fail.  However, `find` with `where: {namee: "Martin Taylor"}` filter will succeed on the table defined with `index: true` as follows:


LoopBack notation:

```javascript
customers = db.define('customers', {
  name: {type: String, index: true},
  userId: {type: Number, id: true},
  });
```

Cql equivalent:

```sql
CREATE TABLE customers (
   name TEXT,
   userId INT,
   PRIMARY KEY (userId)
);
CREATE INDEX ON customers (name);
```

## V1 Limitations

Because of the Cassandra architecture, Cassandra connector V1 supports `where` and `limit`.
Other filter conditions are not supported.

### `order` filter not supported

Use clustering keys for sorting.  The database side sorting determines the order or rows to be return
when ordering matters such as `where limit` or `findOne`.  Ad hoc sorting with `sort` filter is not supported.

### `or` filter not supported

`and` is supported, but `or` is not in `where` filter.

### `offset` is not supported

Pagination is not supported in V1.

## Running tests

### Own instance
If you have a local or remote Cassandra instance and would like to use that to run the test suite, use the following command:
- Linux
```bash
CASSANDRA_HOST=<HOST> CASSANDRA_PORT=<PORT> CASSANDRA_KEYSPACE=<KEYSPACE> CI=true npm test
```
- Windows
```bash
SET CASSANDRA_HOST=<HOST>
SET CASSANDRA_PORT=<PORT>
SET CASSANDRA_KEYSPACE=<KEYSPACE>
SET CI=true
npm test
```

### Docker
If you do not have a local Cassandra instance, you can also run the test suite with very minimal requirements.
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a Cassandra instance on your local:
```bash
source setup.sh <HOST> <PORT> <KEYSPACE>
```
where `<HOST>`, `<PORT>` and `<KEYSPACE>` are optional parameters. The default values are `localhost`, `9042` and `test` respectively.
- Run the test:
```bash
npm test
```