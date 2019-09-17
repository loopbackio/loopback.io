# loopback-connector-db2iseries

[IBM® DB2® for iSeries](http://www-03.ibm.com/systems/power/software/i/db2/) is the database of choice for robust, enterprise-wide solutions handling high-volume workloads.
It is optimized to deliver industry-leading performance while lowering costs.  The `loopback-connector-db2iseries`
module is the LoopBack connector for DB2 for iSeries.

The LoopBack DB2 for iSeries connector supports:

- All [create, retrieve, update, and delete operations](http://loopback.io/doc/en/lb2/Creating-updating-and-deleting-data.html).
- [Queries](http://loopback.io/doc/en/lb2/Querying-data.html) with fields, limit, order, skip and where filters.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-db2iseries --save
```

The `--save` option adds the dependency to the application's `package.json` file.

## Configuration

Use the [data source generator](http://loopback.io/doc/en/lb2/Data-source-generator.html) to add the DB2 for iSeries data source to your application.
The entry in the application's `server/datasources.json` will look something like this:

```js
"mydb": {
  "name": "mydb",
  "connector": "db2iseries"
}
```

Edit `server/datasources.json` to add other supported properties as required:

```js
"mydb": {
  "name": "mydb",
  "connector": "db2iseries",
  "username": <username>,
  "password": <password>,
  "database": <database name>,
  "hostname": <db2 server hostname>,
  "port":     <port number>
}
```

The following table describes the connector properties.

Property&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type&nbsp;&nbsp;    | Description
---------------| --------| --------
database       | String  | Database name
schema         | String  | Specifies the default schema name that is used to qualify unqualified database objects in dynamically prepared SQL statements. The value of this property sets the value in the CURRENT SCHEMA special register on the database server. The schema name is case-sensitive, and must be specified in uppercase characters
username       | String  | DB2 Username
password       | String  | DB2 password associated with the username above
hostname       | String  | DB2 server hostname or IP address
port           | String  | DB2 server TCP port number
useLimitOffset | Boolean | LIMIT and OFFSET must be configured on the DB2 server before use (compatibility mode)
supportDashDB  | Boolean | Create ROW ORGANIZED tables to support dashDB.


Alternatively, you can create and configure the data source in JavaScript code.
For example:

```js
var DataSource = require('loopback-datasource-juggler').DataSource;
var DB2 = require('loopback-connector-db2iseries');

var config = {
  username: process.env.DB2_USERNAME,
  password: process.env.DB2_PASSWORD,
  hostname: process.env.DB2_HOSTNAME,
  port: 50000,
  database: 'SQLDB',
};

var db = new DataSource(DB2, config);

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
