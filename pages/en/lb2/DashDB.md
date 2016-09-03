---
title: "DashDB"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/DashDB.html
summary:
---

# loopback-connector-dashdb

It is the database of choice for robust, enterprise-wide solutions handling high-volume workloads.
It is optimized to deliver industry-leading performance while lowering costs. The `loopback-connector-dashdb` module is the LoopBack connector for dashDB.

The LoopBack DashDB connector supports:

* All [CRUD operations](/doc/en/lb2/Creating%2C-updating%2C-and-deleting-data).
* [Queries](/doc/en/lb2/Querying-data.html) with fields, limit, order, skip and where filters.
* All supported DASHDB LUW versions as well as dashDB. Note for dashDB set supportDashDB in the loopback datasource definition.
  Column organized tables are not supported.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```shell
$ npm install loopback-connector-dashdb --save
```

The `--save` option adds the dependency to the application's `package.json` file.

## Configuration

Use the [data source generator](/doc/en/lb2/Data-source-generator) (`slc loopback:datasource`) to add the DASHDB data source to your application.
The entry in the application's `server/datasources.json` will look something like this:

```javascript
"mydb": {
  "name": "mydb",
  "connector": "dashdb"
}
```

Edit `server/datasources.json` to add other supported properties as required:

```javascript
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

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>database</td>
      <td>String</td>
      <td>Database name</td>
    </tr>
    <tr>
      <td>schema</td>
      <td>String</td>
      <td>Specifies the default schema name that is used to qualify unqualified database objects in dynamically prepared SQL statements. The value of this property sets the value in the CURRENT SCHEMA special register on the database server. The schema name is case-sensitive, and must be specified in uppercase characters</td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>DASHDB Username</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>DASHDB password associated with the username above</td>
    </tr>
    <tr>
      <td>hostname</td>
      <td>String</td>
      <td>DASHDB server hostname or IP address</td>
    </tr>
    <tr>
      <td>port</td>
      <td>String</td>
      <td>DASHDB server TCP port number</td>
    </tr>
    <tr>
      <td>useLimitOffset</td>
      <td>Boolean</td>
      <td>LIMIT and OFFSET must be configured on the DASHDB server before use (compatibility mode)</td>
    </tr>
    <tr>
      <td>supportDashDB</td>
      <td>Boolean</td>
      <td>Create ROW ORGANIZED tables to support dashDB.</td>
    </tr>
  </tbody>
</table>

Alternatively, you can create and configure the data source in JavaScript code.

For example:

```javascript
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
  name: {
    type: String
  },
  email: {
    type: String
  },
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

  User.find({
    where: {
      name: 'Tony'
    }
  }, function(err, users) {
    console.log(err, users);
  });

  User.destroyAll(function() {
    console.log('example complete');
  });
});
```