---
title: "datasources.json"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/datasources.json.html
summary: Configure data sources in <code>datasources.json</code>.
---

## Overview

Configure data sources in `/server/datasources.json`. You can set up as many data sources as you want in this file. The easiest way to set up a new data source is to use the [data source generator](Data-source-generator.html), which will prompt your for all the
appropriate settings, add them to `/server/datasources.json`, and then install the connector from npm.

For example:

```javascript
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mySQLdb": {
    "name": "mySQLdb",
    "connector": "mysql",
    "host": "demo.strongloop.com",
    "port": 3306,
    "database": "demo",
    "username": "demo",
    "password": "L00pBack"
  }
}
```
To store data in a file for memory connector, add <code> "file": <i>"file_name"</i></code>. For more information see [Memory connector - data persistence](https://loopback.io/doc/en/lb3/Memory-connector.html#data-persistence).

For example:

```javascript
{
  "db": {
    "name": "db",
    "connector": "memory",
    "file": "db.json",
  },
}
```

To access data sources in application code, use <code>app.datasources.<i>datasourceName</i></code>.

## Standard properties

All data sources support a few standard properties. Beyond that, specific properties and defaults depend on the connector being used.

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>connector</td>
      <td>LoopBack connector to use:
        <ul>
          <li>memory</li>
          <li>loopback-connector-oracle or just "oracle"</li>
          <li>loopback-connector-mongodb or just "mongodb"</li>
          <li>loopback-connector-mysql or just "mysql"</li>
          <li>loopback-connector-postgresql or just "postgresql"</li>
          <li>loopback-connector-soap or just "soap"</li>
          <li>loopback-connector-mssql or just "mssql"</li>
          <li>loopback-connector-rest or just "rest"</li>
          <li>loopback-component-storage</li>
          <li>Another LoopBack data source connector</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>name</td>
      <td>Name of the data source being defined.</td>
    </tr>
  </tbody>
</table>

## Database connector properties

Although each data source connector has a different set of properties,
database connectors typically have properties that include
properties for the database server and credentials to log in to it.

For information on the properties that each connector supports, see
the specific connector documentation in [Database connectors](Database-connectors.html).

{% include warning.html content="Don't put production database credentials in configuration files, where they could be a security vulnerability.  Instead, load the values from environment variables.  For more information, see [Specifying database credentials with environment variables](Defining-data-sources.html#specifying-database-credentials-with-environment-variables)
"%}

The following table list common properties that most database connectors provide.
See documentation for the specific connector for full details.

<table>
  <thead>
    <tr>
      <th width="150">Property</th>
      <th width="80">Type</th>
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
      <td>host</td>
      <td>String</td>
      <td>Database host name</td>
    </tr>

    <tr>
      <td>password</td>
      <td>String</td>
      <td>Password to connect to database</td>
    </tr>

    <tr>
      <td>port</td>
      <td>Number</td>
      <td>Database TCP port</td>
    </tr>

    <tr>
      <td>url</td>
      <td>String</td>
      <td>Connection URL that overrides other connection settings.</td>
    </tr>

    <tr>
      <td>username</td>
      <td>String</td>
      <td>Username to connect to database</td>
    </tr>
  </tbody>
</table>

To connect a model to a data source, [follow these steps](#properties-for-database-connectors) to create a datasource.
