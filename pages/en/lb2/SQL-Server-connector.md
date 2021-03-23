---
title: "SQL Server connector"
lang: en
layout: page
keywords: LoopBack
tags: connectors
sidebar: lb2_sidebar
permalink: /doc/en/lb2/SQL-Server-connector.html
summary: The SQL Server connector enables LoopBack applications to connect to Microsoft SQL Server data sources.
---

{% include note.html content="The SQL Server connector requires SQL Server 2005+.
" %}

## Installation

In your application root directory, enter:

```shell
$ npm install loopback-connector-mssql --save
```

This will install the module from npm and add it as a dependency to the application's [package.json](package.json.html) file.

## Creating a SQL Server data source

Use the [Data source generator](Data-source-generator.html) to add a SQL Server data source to your application.
The generator will add the following entry to the `/server/datasources.json` file:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"sqlserverdb": {
    "name": "sqlserverdb",
    "connector": "mssql"
}
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a SQL Server database.

To connect to a SQL Server instance running in Azure, you must specify a qualified user name with hostname, and add to the following to the data source declaration:

```js
"options": {
   "encrypt": true
   ...
}
```

### Connector settings

To configure the data source to use your MS SQL Server database, edit `datasources.json` and add the following settings as appropriate.
The MSSQL connector uses [node-mssql](https://github.com/patriksimek/node-mssql) as the driver. For more information about configuration parameters,
see [node-mssql documentation](https://github.com/patriksimek/node-mssql#configuration-1).

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>connector</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>
        <p>Either "loopback-connector-mssql" or "mssql"</p>
      </td>
    </tr>
    <tr>
      <td>database</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>Database name</td>
    </tr>
    <tr>
      <td>debug</td>
      <td>Boolean</td>
      <td>&nbsp;</td>
      <td>If true, turn on verbose mode to debug database queries and lifecycle.</td>
    </tr>
    <tr>
      <td>host</td>
      <td>String</td>
      <td>localhost</td>
      <td>Database host name</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>Password to connect to database</td>
    </tr>
    <tr>
      <td>port</td>
      <td>Number</td>
      <td>1433</td>
      <td>Database TCP port</td>
    </tr>
    <tr>
      <td>schema</td>
      <td>String</td>
      <td>dbo</td>
      <td>Database schema</td>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>Use instead of the&nbsp;<code>host</code>,&nbsp;<code>port</code>,&nbsp;<code>user</code>,&nbsp;<code>password</code>,
        and&nbsp;<code>database</code>&nbsp;properties. &nbsp;For example:&nbsp;'mssql://test:mypassword@localhost:1433/dev'.
      </td>
    </tr>
    <tr>
      <td>user</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>Qualified username with host name, for example "user@your.sqlserver.dns.host".</td>
    </tr>
  </tbody>
</table>

For example:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
...
"accountDB": {
    "connector": "mssql",
    "host": "demo.strongloop.com",
    "port": 1433,
    "database": "demo",
    "username": "demo",
    "password": "L00pBack"
  }
...
```

Alternatively you can use a single 'url' property that combines all the database configuration settings, for example:

```javascript
"accountDB": {
    "url": "mssql://test:mypassword@localhost:1433/demo?schema=dbo"
}
```

The application will automatically load the data source when it starts. You can then refer to it in code, for example:

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
var app = require('./app');
var dataSource = app.dataSources.accountDB;
```

Alternatively, you can create the data source in application code; for example:

{% include code-caption.html content="/server/script.js" %}
```javascript
var DataSource = require('loopback-datasource-juggler').DataSource;
var dataSource = new DataSource('mssql', config);
config = { ... };  // JSON object as specified above in "Connector settings"
```

## Defining models

The model definition consists of the following properties:

* name: Name of the model, by default, it's the camel case of the table
* options: Model level operations and mapping to Microsoft SQL Server schema/table
* properties: Property definitions, including mapping to Microsoft SQL Server columns

For example:

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{"name": "Inventory", 
     "options": {
       "idInjection": false,
       "mssql": {
         "schema": "strongloop",
         "table": "inventory"
       }
     }, "properties": {
      "id": {
        "type": "String",
        "required": false,
        "length": 64,
        "precision": null,
        "scale": null,
        "mssql": {
          "columnName": "id",
          "dataType": "varchar",
          "dataLength": 64,
          "dataPrecision": null,
          "dataScale": null,
          "nullable": "NO"
        }
      },
      "productId": {
        "type": "String",
        "required": false,
        "length": 64,
        "precision": null,
        "scale": null,
        "id": 1,
        "mssql": {
          "columnName": "product_id",
          "dataType": "varchar",
          "dataLength": 64,
          "dataPrecision": null,
          "dataScale": null,
          "nullable": "YES"
        }
      },
      "locationId": {
        "type": "String",
        "required": false,
        "length": 64,
        "precision": null,
        "scale": null,
        "id": 1,
        "mssql": {
          "columnName": "location_id",
          "dataType": "varchar",
          "dataLength": 64,
          "dataPrecision": null,
          "dataScale": null,
          "nullable": "YES"
        }
      },
      "available": {
        "type": "Number",
        "required": false,
        "length": null,
        "precision": 10,
        "scale": 0,
        "mssql": {
          "columnName": "available",
          "dataType": "int",
          "dataLength": null,
          "dataPrecision": 10,
          "dataScale": 0,
          "nullable": "YES"
        }
      },
      "total": {
        "type": "Number",
        "required": false,
        "length": null,
        "precision": 10,
        "scale": 0,
        "mssql": {
          "columnName": "total",
          "dataType": "int",
          "dataLength": null,
          "dataPrecision": 10,
          "dataScale": 0,
          "nullable": "YES"
        }
      }
    }}
```

### Auto migrating and auto-updating

After making changes to model properties you must call `Model.automigrate()` or `Model.autoupdate()`.
Call `Model.automigrate()` only on a new model, since it will drop existing tables.
See [Creating a database schema from models](Creating-a-database-schema-from-models.html) for more information.

For each model, the LoopBack SQL Server connector creates a table in the 'dbo' schema in the database.

### Destroying models

Destroying models may result in errors due to foreign key integrity. First delete any related models first calling delete on models with relationships.

## Type mapping

See [LoopBack types](LoopBack-types.html) for details on LoopBack's data types.

### LoopBack to SQL Server types

<table>
  <tbody>
    <tr>
      <th>LoopBack Type</th>
      <th>SQL Server Type</th>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>BIT</td>
    </tr>
    <tr>
      <td>Date</td>
      <td>DATETIME</td>
    </tr>
    <tr>
      <td>GeoPoint</td>
      <td>FLOAT</td>
    </tr>
    <tr>
      <td>Number</td>
      <td>INT</td>
    </tr>
    <tr>
      <td>
        <p>String</p>
        <p>JSON</p>
      </td>
      <td>
        <p>NVARCHAR</p>
      </td>
    </tr>
  </tbody>
</table>

### SQL Server to LoopBack types

<table>
  <tbody>
    <tr>
      <th>SQL Server Type</th>
      <th>LoopBack Type</th>
    </tr>
    <tr>
      <td>BIT</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>
        <p>BINARY<br>VARBINARY<br>IMAGE</p>
      </td>
      <td>Node.js&nbsp;<a class="external-link" href="http://nodejs.org/api/buffer.html" rel="nofollow">Buffer object</a></td>
    </tr>
    <tr>
      <td>
        <p>DATE<br>DATETIMEOFFSET<br>DATETIME2<br>SMALLDATETIME<br>DATETIME<br>TIME</p>
      </td>
      <td>Date</td>
    </tr>
    <tr>
      <td>POINT</td>
      <td><a href="http://apidocs.strongloop.com/loopback-datasource-juggler/#geopoint">GeoPoint</a></td>
    </tr>
    <tr>
      <td>
        <p>BIGINT<br>NUMERIC<br>SMALLINT<br>DECIMAL<br>SMALLMONEY<br>INT<br>TINYINT<br>MONEY<br>FLOAT<br>REAL</p>
      </td>
      <td>Number</td>
    </tr>
    <tr>
      <td>
        <p>CHAR<br>VARCHAR<br>TEXT<br>NCHAR<br>NVARCHAR<br>NTEXT<br>CHARACTER VARYING<br>CHARACTER</p>
      </td>
      <td>String</td>
    </tr>
  </tbody>
</table>

## Discovery methods

LoopBack provides a unified API to create models based on schema and tables in relational databases.
The same discovery API is available when using connectors for Oracle, MySQL, PostgreSQL, and SQL Server.
For more information, see [Database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).
