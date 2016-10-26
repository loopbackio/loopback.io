**PLEASE CREATE ISSUES AT https://github.com/strongloop/loopback/issues**

---

#loopback-connector-db2z

[IBM® DB2® for z/OS®](https://www-01.ibm.com/software/data/db2/zos/family/) is the database of choice for robust, enterprise-wide solutions handling high-volume workloads.
It is optimized to deliver industry-leading performance while lowering costs.  The `loopback-connector-db2z`
module is the LoopBack connector for DB2z.

The LoopBack DB2z connector supports:

- All [CRUD operations](https://docs.strongloop.com/display/LB/Creating%2C+updating%2C+and+deleting+data).
- [Queries](https://docs.strongloop.com/display/LB/Querying+data) with fields, limit, order, skip and where filters.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-db2z --save
```

The `--save` option adds the dependency to the application's `package.json` file.

This module is dependent on the node-ibm_db module which requires appropriate licenses be available as per instructions found at https://github.com/ibmdb/node-ibm_db/blob/master/README.md.  Once loopback-connector-db2z is installed please copy the required license file to the location described.

## Configuration

Use the [data source generator](https://docs.strongloop.com/display/LB/Data+source+generator) (`slc loopback:datasource`) to add the DB2z data source to your application.
The entry in the application's `server/datasources.json` will look something like this:

```
"mydb": {
  "name": "mydb",
  "connector": "db2z"
}
```

Edit `server/datasources.json` to add other supported properties as required:

```
"mydb": {
  "name": "mydb",
  "connector": "db2z",
  "username": <username>,
  "password": <password>,
  "database": <database name>,
  "hostname": <db2z server hostname>,
  "port":     <port number>
}
```

The following table describes the connector properties.

Property       | Type    | Description
---------------| --------| --------
database       | String  | Database name
schema         | String  | Specifies the default schema name that is used to qualify unqualified database objects in dynamically prepared SQL statements. The value of this property sets the value in the CURRENT SCHEMA special register on the database server. The schema name is case-sensitive, and must be specified in uppercase characters
username       | String  | DB2z Username
password       | String  | DB2z password associated with the username above
hostname       | String  | DB2z server hostname or IP address
port           | String  | DB2z server TCP port number
useLimitOffset | Boolean | LIMIT and OFFSET must be configured on the DB2z server before use (compatibility mode)
supportDashDB  | Boolean | Create ROW ORGANIZED tables to support dashDB.


Alternatively, you can create and configure the data source in JavaScript code.
For example:

```
var DataSource = require('loopback-datasource-juggler').DataSource;
var DB2Z = require('loopback-connector-db2z');

var config = {
  username: process.env.DB2Z_USERNAME,
  password: process.env.DB2Z_PASSWORD,
  hostname: process.env.DB2Z_HOSTNAME,
  port: 50000,
  database: 'SQLDB',
};

var db = new DataSource(DB2Z, config);

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
