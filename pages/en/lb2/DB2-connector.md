---
title: "DB2 connector"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/DB2-connector.html
summary:
---

## Overview

[IBM® DB2®](http://www-01.ibm.com/software/data/db2/) is the database of choice for robust, enterprise-wide solutions handling high-volume workloads.
It is optimized to deliver industry-leading performance while lowering costs.

The LoopBack DB2 connector supports:

* All create, retrieve, update, and delete operations.
* [Queries](/doc/en/lb2/Querying-data.html) with fields, limit, order, skip and where filters.

The following features are not yet implemented:

* Model discovery
* Auto migration and update

For more information on using LoopBack on BlueMix, see [Creating apps with LoopBack Starter](https://www.ng.bluemix.net/docs/starters/LoopBack/index.html).

## Installation

Enter the following in the top-level directory of your LoopBack application:

```shell
$ npm install loopback-connector-db2 --save
```

The `--save` option adds the dependency to the application's [package.json](/doc/en/lb2/package.json.html) file.

## Configuration

Use the [data source generator](https://docs.strongloop.com/display/public/LB/Data+source+generator) to add the DB2 data source to your application.
The entry in the applications `server/datasources.json` will look something like this:

**server/datasources.json**

```javascript
"mydb": {
  "name": "mydb",
  "connector": "db2",
  "username": <username>,
  "password": <password>,
  "database": <database name>,
  "hostname": <db2 server hostname>,
  "port":     <port number>
}
```

Edit the `datasources.json` to add other supported properties as required:

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
      <td>hostname</td>
      <td>String</td>
      <td>DB2 server hostname or IP address</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>DB2 password associated with the username above</td>
    </tr>
    <tr>
      <td>port</td>
      <td>String</td>
      <td>DB2 server TCP port number</td>
    </tr>
    <tr>
      <td>useLimitOffset</td>
      <td>Boolean</td>
      <td>LIMIT and OFFSET must be configured on the DB2 server before use (compatibility mode)</td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>DB2 Username</td>
    </tr>
  </tbody>
</table>

### Example

Here's an example of configuring the data source in JavaScript code:

```javascript
var DataSource = require('loopback-datasource-juggler').DataSource;
var DB2 = require('loopback-connector-db2');

var config = {
  username: process.env.DB2_USERNAME,
  password: process.env.DB2_PASSWORD,
  hostname: process.env.DB2_HOSTNAME,
  port: 50000,
  database: 'SQLDB',
};

var db = new DataSource(DB2, config);

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