---
title: "PostgreSQL connector"
lang: en
layout: page
keywords: LoopBack
tags: connectors
sidebar: lb2_sidebar
permalink: /doc/en/lb2/PostgreSQL-connector.html
summary: The PostgreSQL connector enables LoopBack applications to connect to PostgreSQL data sources.
---

{% include see-also.html content="
* [Connecting to PostgreSQL](Connecting-to-PostgreSQL.html)
* [loopback-example-database](https://github.com/strongloop/loopback-example-database/tree/postgresql)
* [Database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).
" %}

{% include note.html content="The PostgreSQL connector requires PostgreSQL 8.x or 9.x.
" %}

## Installation

In your application root directory, enter this command to install the connector:

```shell
$ npm install loopback-connector-postgresql --save
```

This will install the module from npm and add it as a dependency to the application's [package.json](package.json.html) file.

## Creating a data source

Use the [Data source generator](Data-source-generator.html) to add a PostgreSQL data source to your application. 

The entry in the application's `server/datasources.json` will look like this:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"mydb": {
  "name": "mydb",
  "connector": "postgresql"
}
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a PostgreSQL database.

### Properties

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>connector</td>
      <td>String</td>
      <td>
        <p>Connector name, either "loopback-connector-postgresql" or "<span>postgresql</span>"</p>
      </td>
    </tr>
    <tr>
      <td>database</td>
      <td>String</td>
      <td>Database name</td>
    </tr>
    <tr>
      <td>debug</td>
      <td>Boolean</td>
      <td>If true, turn on verbose mode to debug database queries and lifecycle.</td>
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
      <td>Use instead of the&nbsp;<code>host</code>,&nbsp;<code>port</code>,&nbsp;<code>user</code>,&nbsp;<code>password</code>,
        and&nbsp;<code>database</code>&nbsp;properties. &nbsp;For example:&nbsp;'postgres://test:mypassword@localhost:5432/dev'.
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Username to connect to database</td>
    </tr>
    <tr>
      <td>ssl</td>
      <td>Boolean or Object</td>
      <td>Connect to database using SSL. Set to <code>true</code> for username/password authentication. You can also add a TLS object to establish a cert based connection (you must also omit the password property). See <a href="https://nodejs.org/dist/latest-v4.x/docs/api/tls.html#tls_tls_connect_options_callback">TLS (SSL) of nodejs for more info.</a></td>
    </tr>
  </tbody>
</table>

{% include important.html content="
By default, the 'public' schema is used for all tables.
" %}

### Connecting to UNIX domain socket

A common PostgreSQL configuration is to connect to the UNIX domain socket `/var/run/postgresql/.s.PGSQL.5432` instead of using the TCP/IP port. For example:

```javascript
{
  "postgres": {
    "host": "/var/run/postgresql/",
    "port": "5432",
    "database": "dbname",
    "username": "dbuser",
    "password": "dbpassword",
    "name": "postgres",
    "debug": true,
    "connector": "postgresql"
  }
}
```

## Defining models

The model definition consists of the following properties.

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>name</td>
      <td>Camel-case of the database table name</td>
      <td>Name of the model.</td>
    </tr>
    <tr>
      <td>options</td>
      <td>N/A</td>
      <td>Model level operations and mapping to PostgreSQL schema/table</td>
    </tr>
    <tr>
      <td>properties</td>
      <td>N/A</td>
      <td>Property definitions, including mapping to PostgreSQL column</td>
    </tr>
  </tbody>
</table>

For example:

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
  "name": "Inventory",
  "options": {
    "idInjection": false,
    "postgresql": {
      "schema": "strongloop",
      "table": "inventory"
    }
  },
  "properties": {
    "id": {
      "type": "String",
      "required": false,
      "length": 64,
      "precision": null,
      "scale": null,
      "postgresql": {
        "columnName": "id",
        "dataType": "character varying",
        "dataLength": 64,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "NO"
      }
    },
    "productId": {
      "type": "String",
      "required": false,
      "length": 20,
      "precision": null,
      "scale": null,
      "id": 1,
      "postgresql": {
        "columnName": "product_id",
        "dataType": "character varying",
        "dataLength": 20,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "YES"
      }
    },
    "locationId": {
      "type": "String",
      "required": false,
      "length": 20,
      "precision": null,
      "scale": null,
      "id": 1,
      "postgresql": {
        "columnName": "location_id",
        "dataType": "character varying",
        "dataLength": 20,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "YES"
      }
    },
    "available": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 32,
      "scale": 0,
      "postgresql": {
        "columnName": "available",
        "dataType": "integer",
        "dataLength": null,
        "dataPrecision": 32,
        "dataScale": 0,
        "nullable": "YES"
      }
    },
    "total": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 32,
      "scale": 0,
      "postgresql": {
        "columnName": "total",
        "dataType": "integer",
        "dataLength": null,
        "dataPrecision": 32,
        "dataScale": 0,
        "nullable": "YES"
      }
    }
  }
}
```

### Destroying models

If you destroy models,  you may get errors due to foreign key integrity.
Make sure to delete any related models first before calling `delete()` on models that have relationships.

### Auto-migrate and auto-update

<div class="sl-hidden"><strong>REVIEW COMMENT from Raymond via Rand</strong><br>
  <p><em>Removed temporarily. Is any of this still true?</em></p>
  <p>The PostgreSQL connector creates the following schema objects for a given model:</p>
  <ul>
    <li>A table, for example, PRODUCT.</li>
    <li>A sequence for the primary key, for example, PRODUCT_ID_SEQUENCE.</li>
    <li>A trigger to generate the primary key from the sequnce, for example, PRODUCT_ID_TRIGGER.</li>
  </ul>
</div>

After making changes to your model properties, you must call `Model.automigrate()` or `Model.autoupdate()`.
Call `Model.automigrate()` only on new models since it will drop existing tables. These methods will

* Define a primary key for the properties whose `id` property is true (or a positive number).
* Create a column with 'SERIAL' type if the `generated` property of the `id` property is true.

See [Creating a database schema from models](Creating-a-database-schema-from-models.html) for more information.

## Type mapping

See [LoopBack types](LoopBack-types.html) for details on LoopBack's data types.

### LoopBack to PostgreSQL types

<table>
  <tbody>
    <tr>
      <th>LoopBack Type</th>
      <th>PostgreSQL Type</th>
    </tr>
    <tr>
      <td>String<br>JSON<br>Text<br>Default</td>
      <td>
        <p>VARCHAR2</p>
        <p>Default length is 1024</p>
      </td>
    </tr>
    <tr>
      <td>Number</td>
      <td>INTEGER</td>
    </tr>
    <tr>
      <td>Date</td>
      <td><span>TIMESTAMP WITH TIME ZONE</span></td>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>BOOLEAN</td>
    </tr>
  </tbody>
</table>

### PostgreSQL types to LoopBack

<table>
  <tbody>
    <tr>
      <th>PostgreSQL Type</th>
      <th>LoopBack Type</th>
    </tr>
    <tr>
      <td>BOOLEAN</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>
        <p><span>VARCHAR<br></span>CHARACTER VARYING<br>CHARACTER<br>CHAR<br>TEXT</p>
      </td>
      <td>String</td>
    </tr>
    <tr>
      <td>BYTEA</td>
      <td>Node.js&nbsp;<a class="external-link" href="http://nodejs.org/api/buffer.html" rel="nofollow">Buffer object</a></td>
    </tr>
    <tr>
      <td><span>SMALLINT<br>INTEGER<br>BIGINT<br>DECIMAL<br>NUMERIC<br>REAL<br>DOUBLE<br>SERIAL<br>BIGSERIAL</span></td>
      <td>Number</td>
    </tr>
    <tr>
      <td>DATE<br>TIMESTAMP<br>TIME&nbsp;</td>
      <td>Date</td>
    </tr>
    <tr>
      <td>POINT</td>
      <td><a href="http://apidocs.strongloop.com/loopback-datasource-juggler/#geopoint">GeoPoint</a></td>
    </tr>
  </tbody>
</table>

## Discovery methods

LoopBack provides a unified API to create models based on schema and tables in relational databases.
The same discovery API is available when using connectors for Oracle, MySQL, PostgreSQL, and SQL Server.
For more information, see [Database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).
