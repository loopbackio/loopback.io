---
title: "Informix"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Informix.html
summary:
---

# loopback-connector-informix

It is the database of choice for robust, enterprise-wide solutions handling high-volume workloads.
It is optimized to deliver industry-leading performance while lowering costs. The `loopback-connector-informix`
module is the LoopBack connector for Informix.

The LoopBack Informix connector supports:

* All [CRUD operations](https://docs.strongloop.com/display/LB/Creating%2C+updating%2C+and+deleting+data).
* [Queries](/doc/en/lb2/Querying-data.html) with fields, limit, order, skip and where filters.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```shell
$ npm install loopback-connector-informix --save
```

The `--save` option adds the dependency to the application's `package.json` file.

## Configuration

Use the [data source generator](https://docs.strongloop.com/display/LB/Data+source+generator) (`slc loopback:datasource`) to add the Informix data source to your application.
The entry in the application's `server/datasources.json` will look something like this:

```javascript
"mydb": {
  "name": "mydb",
  "connector": "informix"
}
```

Edit `server/datasources.json` to add other supported properties as required:

```javascript
"mydb": {
  "name": "mydb",
  "connector": "informix",
  "username": <username>,
  "password": <password>,
  "database": <database name>,
  "hostname": <informix server hostname>,
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
      <td>Specifies the default schema name that is used to qualify unqualified database objects in dynamically prepared SQL statements.
        The value of this property sets the value in the CURRENT SCHEMA special register on the database server.
        The schema name is case-sensitive, and must be specified in uppercase characters
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Informix Username</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Informix password associated with the username above</td>
    </tr>
    <tr>
      <td>hostname</td>
      <td>String</td>
      <td>Informix server hostname or IP address</td>
    </tr>
    <tr>
      <td>port</td>
      <td>String</td>
      <td>Informix server TCP port number</td>
    </tr>
  </tbody>
</table>


Alternatively, you can create and configure the data source in JavaScript code.
For example:

```javascript
var DataSource = require('loopback-datasource-juggler').DataSource;
var Informix = require('loopback-connector-informix');

var config = {
  username: process.env.INFORMIX_USERNAME,
  password: process.env.INFORMIX_PASSWORD,
  hostname: process.env.INFORMIX_HOSTNAME,
  port: 50000,
  database: 'informixdb',
};

var db = new DataSource(Informix, config);

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