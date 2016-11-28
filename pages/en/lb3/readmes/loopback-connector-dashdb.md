# loopback-connector-dashdb

[IBM® DashDB®]() is the database of choice for robust, enterprise-wide solutions handling high-volume workloads.
It is optimized to deliver industry-leading performance while lowering costs.  The `loopback-connector-dashdb`
module is the LoopBack connector for dashDB.

The LoopBack DashDB connector supports:

- All [CRUD operations](http://loopback.io/doc/en/lb2/Creating-updating-and-deleting-data.html).
- [Queries](http://loopback.io/doc/en/lb2/Querying-data.html) with fields, limit, order, skip and where filters.
- All supported DASHDB LUW versions as well as dashDB.  Note for dashDB set supportDashDB in the loopback datasource definition.  Column organized tables are not supported.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-dashdb --save
```

The `--save` option adds the dependency to the application's `package.json` file.

## Configuration

Use the [data source generator](http://loopback.io/doc/en/lb2/Data-source-generator.html) (`slc loopback:datasource`) to add the DASHDB data source to your application.
The entry in the application's `server/datasources.json` will look something like this:

```
"mydb": {
  "name": "mydb",
  "connector": "dashdb"
}
```

Edit `server/datasources.json` to add other supported properties as required:

```
"mydb": {
  "name": "mydb",
  "connector": "dashdb",
  "username": <username>,
  "password": <password>,
  "database": <database name>,
  "hostname": <dashdb server hostname>,
  "port":     <port number>
}
```

The following table describes the connector properties.

Property       | Type    | Description
---------------| --------| --------
database       | String  | Database name
schema         | String  | Specifies the default schema name that is used to qualify unqualified database objects in dynamically prepared SQL statements. The value of this property sets the value in the CURRENT SCHEMA special register on the database server. The schema name is case-sensitive, and must be specified in uppercase characters
username       | String  | DASHDB Username
password       | String  | DASHDB password associated with the username above
hostname       | String  | DASHDB server hostname or IP address
port           | String  | DASHDB server TCP port number
useLimitOffset | Boolean | LIMIT and OFFSET must be configured on the DASHDB server before use (compatibility mode)
supportDashDB  | Boolean | Create ROW ORGANIZED tables to support dashDB.


Alternatively, you can create and configure the data source in JavaScript code.
For example:

```
var DataSource = require('loopback-datasource-juggler').DataSource;
var DASHDB = require('loopback-connector-dashdb');

var config = {
  username: process.env.DASHDB_USERNAME,
  password: process.env.DASHDB_PASSWORD,
  hostname: process.env.DASHDB_HOSTNAME,
  port: 50000,
  database: 'SQLDB',
};

var db = new DataSource(DASHDB, config);

var User = db.define('User', {
  name: { type: String },
  email: { type: String },
});

db.autoupdate('User', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  User.create({
    name: 'Tony',
    email: 'tony@t.com',
  }, function(err, user) {
    console.log(err, user);
  });

  User.find({ where: { name: 'Tony' }}, function(err, users) {
    console.log(err, users);
  });

  User.destroyAll(function() {
    console.log('example complete');
  });
});
```
