# loopback-connector-mssql

[Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/default.aspx) is a relational database management system developed by Microsoft.
The `loopback-connector-mssql` module is the Microsoft SQL Server connector for the LoopBack framework.

<div class="gh-only">
For more information, see <a href="http://loopback.io/doc/en/lb3/SQL-Server-connector.html">LoopBack documentation</a>.
</div>

## Installation

In your application root directory, enter:

```shell
$ npm install loopback-connector-mssql --save
```

This will install the module from npm and add it as a dependency to the application's `package.json` file.

If you create a SQL Server data source using the data source generator as described below, you don't have to do this, since the generator will run `npm install` for you.

## Creating a SQL Server data source

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a SQL Server data source to your application.  
The generator will prompt for the database server hostname, port, and other settings
required to connect to a SQL Server database.  It will also run the `npm install` command above for you.

The entry in the application's `/server/datasources.json` will look like this (for example):

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"sqlserverdb": {
    "name": "sqlserverdb",
    "connector": "mssql",
    "host": "myhost",
    "port": 1234,
    "url": "mssql://username:password@dbhost/dbname",
    "database": "mydb",
    "password": "admin",
    "user": "admin",
  }
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a SQL Server database.

To connect to a SQL Server instance running in Azure, you must specify a qualified user name with hostname, and add the following to the data source declaration:

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
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>connector</td>
      <td>String</td>
      <td> </td>
      <td>
        Either "loopback-connector-mssql" or "mssql"
      </td>
    </tr>
    <tr>
      <td>database</td>
      <td>String</td>
      <td> </td>
      <td>Database name</td>
    </tr>
    <tr>
      <td>debug</td>
      <td>Boolean</td>
      <td> </td>
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
      <td> </td>
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
      <td> </td>
      <td>Use instead of the <code>host</code>, <code>port</code>, <code>user</code>, <code>password</code>,
        and <code>database</code> properties.  For example: 'mssql://test:mypassword@localhost:1433/dev'.
      </td>
    </tr>
    <tr>
      <td>user</td>
      <td>String</td>
      <td> </td>
      <td>Qualified username with host name, for example "user@your.sqlserver.dns.host".</td>
    </tr>
  </tbody>
</table>

Instead of specifying individual connection properties, you can use a single `url` property that combines them into a single string, for example:

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


### Model discovery

The SQL Server connector supports _model discovery_ that enables you to create LoopBack models
based on an existing database schema using the unified [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).  For more information on discovery, see [Discovering models from relational databases](https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html).

### Auto-migratiion

The SQL Server connector also supports _auto-migration_ that enables you to create a database schema
from LoopBack models using the [LoopBack automigrate method](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate).
For each model, the LoopBack SQL Server connector creates a table in the 'dbo' schema in the database.

For more information on auto-migration, see [Creating a database schema from models](https://loopback.io/doc/en/lb3/Creating-a-database-schema-from-models.html) for more information.

Destroying models may result in errors due to foreign key integrity. First delete any related models by calling delete on models with relationships.

## Defining models

The model definition consists of the following properties:

* `name`: Name of the model, by default, the table name in camel-case.
* `options`: Model-level operations and mapping to Microsoft SQL Server schema/table. Use the `mssql` model property to specify additional SQL Server-specific properties for a LoopBack model.
* `properties`: Property definitions, including mapping to Microsoft SQL Server columns.
  - For each property, use the `mssql` key to specify additional settings for that property/field.

For example:

{% include code-caption.html content="/common/models/inventory.json" %}
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

## Type mapping

See [LoopBack types](http://loopback.io/doc/en/lb3/LoopBack-types.html) for details on LoopBack's data types.

### LoopBack to SQL Server types

<table>
  <thead>
    <tr>
      <th>LoopBack Type</th>
      <th>SQL Server Type</th>
    </tr>
  </thead>
  <tbody>    
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
        String
        JSON
      </td>
      <td>
        NVARCHAR
      </td>
    </tr>
  </tbody>
</table>

### SQL Server to LoopBack types

<table>
  <thead>
    <tr>
      <th>SQL Server Type</th>
      <th>LoopBack Type</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>BIT</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>
        BINARY<br>VARBINARY<br>IMAGE
      </td>
      <td>Node.js <a class="external-link" href="http://nodejs.org/api/buffer.html" rel="nofollow">Buffer object</a></td>
    </tr>
    <tr>
      <td>
        DATE<br>DATETIMEOFFSET<br>DATETIME2<br>SMALLDATETIME<br>DATETIME<br>TIME
      </td>
      <td>Date</td>
    </tr>
    <tr>
      <td>POINT</td>
      <td><a href="http://apidocs.strongloop.com/loopback-datasource-juggler/#geopoint">GeoPoint</a></td>
    </tr>
    <tr>
      <td>
        BIGINT<br>NUMERIC<br>SMALLINT<br>DECIMAL<br>SMALLMONEY<br>INT<br>TINYINT<br>MONEY<br>FLOAT<br>REAL
      </td>
      <td>Number</td>
    </tr>
    <tr>
      <td>
        CHAR<br>VARCHAR<br>TEXT<br>NCHAR<br>NVARCHAR<br>NTEXT<br>CHARACTER VARYING<br>CHARACTER
      </td>
      <td>String</td>
    </tr>
  </tbody>
</table>

## Running tests

### Own instance
If you have a local or remote MSSQL instance and would like to use that to run the test suite, use the following command:
- Linux
```bash
MSSQL_HOST=<HOST> MSSQL_PORT=<PORT> MSSQL_USER=<USER> MSSQL_PASSWORD=<PASSWORD> MSSQL_DATABASE=<DATABASE> CI=true npm test
```
- Windows
```bash
SET MSSQL_HOST=<HOST> SET MSSQL_PORT=<PORT> SET MSSQL_USER=<USER> SET MSSQL_PASSWORD=<PASSWORD> SET MSSQL_DATABASE=<DATABASE> SET CI=true npm test
```

### Docker
If you do not have a local MSSQL instance, you can also run the test suite with very minimal requirements.
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a MSSQL instance on your local:
```bash
source setup.sh <HOST> <PORT> <USER> <PASSWORD> <DATABASE>
```
where `<HOST>`, `<PORT>`, `<USER>`, `<PASSWORD>` and `<DATABASE>` are optional parameters. The default values are `localhost`, `1433`, `sa`, `M55sqlT35t` and `master` respectively.
- Run the test:
```bash
npm test
```
