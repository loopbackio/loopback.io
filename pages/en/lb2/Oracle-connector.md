---
title: "Oracle connector"
lang: en
layout: page
keywords: LoopBack
tags: connectors
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Oracle-connector.html
summary: The Oracle connector enables LoopBack applications to connect to Oracle data sources.
---

{% include warning.html content="
The Oracle connector does not work on Mac OSX 10.11 (El Capitan) due to [SIP](https://en.wikipedia.org/wiki/System_Integrity_Protection) runtime protections and restrictions.
Specifically, DYLD environment variables are now ignored; hence, rendering the Oracle connector inoperable due to the DYLD_LIBRARY_PATH dependency.
For a workaround, see [How to Disable SIP in OS X El Capitan](http://osxdaily.com/2015/10/05/disable-rootless-system-integrity-protection-mac-os-x/).
" %}

{% include see-also.html content="
* [Installing the Oracle connector](Installing-the-Oracle-connector.html)
* [Connecting to Oracle](Connecting-to-Oracle.html)
* [loopback-example-database](https://github.com/strongloop/loopback-example-database/tree/oracle)
* [Database discovery API]([Database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels). "
%}

{% include note.html content="The Oracle connector requires Oracle 8.x - 12.x.
" %}

## Installation

In your application root directory, enter this command to install the connector:

```shell
$ npm install loopback-connector-oracle --save
```

See [Installing the Oracle connector](Installing-the-Oracle-connector.html) for further installation instructions.

{% include warning.html content="
On 64-bit Windows systems, the Oracle connector runs only on 64-bit version of Node.js.
" %}

## Connector properties

The connector properties depend on [naming methods](http://docs.oracle.com/cd/E11882_01/network.112/e10836/naming.htm#NETAG008) you use for the Oracle database.
LoopBack supports three naming methods:

* Easy connect: host/port/database.
* Local naming (TNS): alias to a full connection string that can specify all the attributes that Oracle supports.
* Directory naming (LDAP): directory for looking up the full connection string that can specify all the attributes that Oracle supports.

### Easy Connect

Easy Connect is the simplest form that provides out-of-the-box TCP/IP connectivity to databases.
The data source then has the following settings.

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>host or hostname</td>
      <td>String</td>
      <td>localhost</td>
      <td>Host name or IP address of the Oracle database server</td>
    </tr>
    <tr>
      <td>port</td>
      <td>Number</td>
      <td>1521</td>
      <td>Port number of the Oracle database server</td>
    </tr>
    <tr>
      <td>username or user</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>User name to connect to the Oracle database server</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>Password to connect to the Oracle database server</td>
    </tr>
    <tr>
      <td>database</td>
      <td>String</td>
      <td>XE</td>
      <td>Oracle database listener name</td>
    </tr>
  </tbody>
</table>

For example:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "demoDB": {
    "connector": "oracle",
    "host": "oracle-demo.strongloop.com",
    "port": 1521,
    "database": "XE",
    "username": "demo",
    "password": "L00pBack"
  }
}
```

### Local and directory naming

Both local and directory naming require that you place configuration files in a TNS admin directory, such as `/oracle/admin`.

#### sqlnet.ora (specifying the supported naming methods)

`NAMES.DIRECTORY_PATH=(LDAP,TNSNAMES,EZCONNECT)`

#### tnsnames.ora (mapping aliases to connection strings)

`demo1=(DESCRIPTION=(CONNECT_DATA=(SERVICE_NAME=))(ADDRESS=(PROTOCOL=TCP)(HOST=demo.strongloop.com)(PORT=1521)))`

#### ldap.ora (configuring the LDAP server)

```
DIRECTORY_SERVERS=(localhost:1389)
DEFAULT_ADMIN_CONTEXT="dc=strongloop,dc=com"
DIRECTORY_SERVER_TYPE=OID
```

#### Set up TNS_ADMIN environment variable

 For the Oracle connector to pick up the configurations, you must set the environment variable 'TNS_ADMIN' to the directory containing the `.ora` files.

`export TNS_ADMIN=<directory containing .ora files>`

Now you can use either the TNS alias or LDAP service name to configure a data source:

```javascript
var ds = loopback.createDataSource({
  "tns": "demo", // The tns property can be a tns name or LDAP service name
  "username": "demo",
  "password": "L00pBack"
});
```

Here is an example for `datasources.json`:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "demoDB": {
    "connector": "oracle",
    "tns": "demo",
    "username": "demo",
    "password": "L00pBack"
  }
}
```

### Connection pooling options

<table>
  <tbody>
    <tr>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
    </tr>
    <tr>
      <td>minConn</td>
      <td>Maximum number of connections in the connection pool</td>
      <td>1</td>
    </tr>
    <tr>
      <td style="text-align: left;">maxConn&nbsp;</td>
      <td>Minimum number of connections in the connection pool</td>
      <td>10</td>
    </tr>
    <tr>
      <td style="text-align: left;">incrConn&nbsp;</td>
      <td>
        <p>Incremental number of connections for the connection pool.</p>
      </td>
      <td>1</td>
    </tr>
    <tr>
      <td style="text-align: left;">timeout&nbsp;</td>
      <td>
        <p>Time-out period in seconds for a connection in the connection pool.
          The Oracle connector
          will terminate connections in this
          connection pool that are idle longer than the time-out period.
        </p>
      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>

For example,

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "demoDB": {
    "connector": "oracle",
    "minConn":1,
    "maxConn":5,
    "incrConn":1,
    "timeout": 10,
    ...
  }
}
```

## Model definition for Oracle

The model definition consists of the following properties:

* name: Name of the model, by default, it's the camel case of the table.
* options: Model level operations and mapping to Oracle schema/table.
* properties: Property definitions, including mapping to Oracle column.

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
    "name":"Inventory",
    "options":{
      "idInjection":false,
      "oracle":{
        "schema":"STRONGLOOP",
        "table":"INVENTORY"
      }
    },
    "properties":{
      "productId":{
        "type":"String",
        "required":true,
        "length":20,
        "id":1,
        "oracle":{
          "columnName":"PRODUCT_ID",
          "dataType":"VARCHAR2",
          "dataLength":20,
          "nullable":"N"
        }
      },
      "locationId":{
        "type":"String",
        "required":true,
        "length":20,
        "id":2,
        "oracle":{
          "columnName":"LOCATION_ID",
          "dataType":"VARCHAR2",
          "dataLength":20,
          "nullable":"N"
        }
      },
      "available":{
        "type":"Number",
        "required":false,
        "length":22,
        "oracle":{
          "columnName":"AVAILABLE",
          "dataType":"NUMBER",
          "dataLength":22,
          "nullable":"Y"
        }
      },
      "total":{
        "type":"Number",
        "required":false,
        "length":22,
        "oracle":{
          "columnName":"TOTAL",
          "dataType":"NUMBER",
          "dataLength":22,
          "nullable":"Y"
        }
      }
    }
  }
```

## Type mapping

See [LoopBack types](LoopBack-types.html) for details on LoopBack's data types.

### JSON to Oracle Types

<table>
  <tbody>
    <tr>
      <th>LoopBack Type</th>
      <th>Oracle Type</th>
    </tr>
    <tr>
      <td>String<br>JSON<br>Text<br>default</td>
      <td>
        <p>VARCHAR2</p>
        <p>Default length is 1024</p>
      </td>
    </tr>
    <tr>
      <td>Number</td>
      <td>NUMBER</td>
    </tr>
    <tr>
      <td>Date</td>
      <td>DATE</td>
    </tr>
    <tr>
      <td>Timestamp</td>
      <td>TIMESTAMP(3)</td>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>CHAR(1)</td>
    </tr>
  </tbody>
</table>

### Oracle Types to JSON

<table>
  <tbody>
    <tr>
      <th>Oracle Type</th>
      <th>LoopBack Type</th>
    </tr>
    <tr>
      <td>CHAR(1)</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>CHAR(n)<br>VARCHAR<br>VARCHAR2,<br>LONG VARCHAR<br>NCHAR<br>NVARCHAR2</td>
      <td>String</td>
    </tr>
    <tr>
      <td>LONG, BLOB, CLOB, NCLOB</td>
      <td>Node.js&nbsp;<a class="external-link" href="http://nodejs.org/api/buffer.html" rel="nofollow">Buffer object</a></td>
    </tr>
    <tr>
      <td>NUMBER<br>INTEGER<br>DECIMAL<br>DOUBLE<br>FLOAT<br>BIGINT<br>SMALLINT<br>REAL<br>NUMERIC<br>BINARY_FLOAT<br>BINARY_DOUBLE<br>UROWID<br>ROWID</td>
      <td>Number</td>
    </tr>
    <tr>
      <td>DATE<br>TIMESTAMP</td>
      <td>Date</td>
    </tr>
  </tbody>
</table>

## Destroying models

Destroying models may result in errors due to foreign key integrity.
Make sure to delete any related models first before calling delete on model's with relationships.

## Auto-migrate / Auto-update

LoopBack _auto-migration_ creates a database schema based on your application's models.
Auto-migration creates a table for each model, and a column in the table for each property in the model. 
Once you have defined a model, LoopBack can create or update (synchronize) the database schemas accordingly, if you need to adjust the database to match the models.
See [Creating a database schema from models](Creating-a-database-schema-from-models.html) for more information.

After making changes to your model properties call `Model.automigrate()` or `Model.autoupdate()`.
Call `Model.automigrate()` only on new models since it will drop existing tables.

LoopBack Oracle connector creates the following schema objects for a given model:

* A table, for example, PRODUCT
* A sequence for the primary key, for example, PRODUCT_ID_SEQUENCE
* A trigger to generate the primary key from the sequnce, for example, PRODUCT_ID_TRIGGER

## Discovery methods

LoopBack provides a unified API to create models based on schema and tables in relational databases.
 The same discovery API is available when using connectors for Oracle, MySQL, PostgreSQL, and SQL Server.
 For more information, see [Creating a database schema from models](Creating-a-database-schema-from-models.html).
