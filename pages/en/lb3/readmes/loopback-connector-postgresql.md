# loopback-connector-postgresql

[PostgreSQL](https://www.postgresql.org/), is a popular open-source object-relational database.
The `loopback-connector-postgresql` module is the PostgreSQL connector for the LoopBack framework.

<div class="gh-only">For more information, see the <a href="http://loopback.io/doc/en/lb3/PostgreSQL-connector.html">documentation</a>.
<br/><br/>
NOTE: The PostgreSQL connector requires PostgreSQL 8.x or 9.x.
</div>

## Installation

In your application root directory, enter this command to install the connector:

```shell
$ npm install loopback-connector-postgresql --save
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

If you create a PostgreSQL data source using the data source generator as described below, you don't have to do this, since the generator will run `npm install` for you.

## Creating a data source

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a PostgreSQL data source to your application.  
The generator will prompt for the database server hostname, port, and other settings
required to connect to a PostgreSQL database.  It will also run the `npm install` command above for you.

The entry in the application's `/server/datasources.json` will look like this:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"mydb": {
  "name": "mydb",
  "connector": "postgresql"

  "host": "mydbhost",
      "port": 5432,
      "url": "postgres://admin:admin@myhost/db",
      "database": "db1",
      "password": "admin",
      "user": "admin"
}
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a PostgreSQL database.

### Properties

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
      <td>connector</td>
      <td>String</td>
      <td>
        Connector name, either "loopback-connector-postgresql" or "postgresql"
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
      <td>Use instead of the<code>host</code>,<code>port</code>,<code>user</code>,<code>password</code>,
        and<code>database</code>properties. For example:'postgres://test:mypassword@localhost:5432/dev'.
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Username to connect to database</td>
    </tr>
  </tbody>
</table>

**NOTE**: By default, the 'public' schema is used for all tables.

The PostgreSQL connector uses [node-postgres](https://github.com/brianc/node-postgres) as the driver. For more
information about configuration parameters, see [node-postgres documentation](https://github.com/brianc/node-postgres/wiki/Client#constructors).

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
  <thead>
    <tr>
      <th>Property</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>    
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

## Type mapping

See [LoopBack types](http://loopback.io/doc/en/lb3/LoopBack-types.html) for details on LoopBack's data types.

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
        VARCHAR2<br/>
        Default length is 1024
      </td>
    </tr>
    <tr>
      <td>Number</td>
      <td>INTEGER</td>
    </tr>
    <tr>
      <td>Date</td>
      <td>TIMESTAMP WITH TIME ZONE</td>
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
        VARCHAR<br>CHARACTER VARYING<br>CHARACTER<br>CHAR<br>TEXT
      </td>
      <td>String</td>
    </tr>
    <tr>
      <td>BYTEA</td>
      <td>Node.js <a href="http://nodejs.org/api/buffer.html">Buffer object</a></td>
    </tr>
    <tr>
      <td>SMALLINT<br>INTEGER<br>BIGINT<br>DECIMAL<br>NUMERIC<br>REAL<br>DOUBLE<br>SERIAL<br>BIGSERIAL</td>
      <td>Number</td>
    </tr>
    <tr>
      <td>DATE<br>TIMESTAMP<br>TIME</td>
      <td>Date</td>
    </tr>
    <tr>
      <td>POINT</td>
      <td><a href="http://apidocs.strongloop.com/loopback-datasource-juggler/#geopoint">GeoPoint</a></td>
    </tr>
  </tbody>
</table>

## Discovery and auto-migration

### Model discovery

The PostgreSQL connector supports _model discovery_ that enables you to create LoopBack models
based on an existing database schema using the unified [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).  For more information on discovery, see [Discovering models from relational databases](https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html).

### Auto-migratiion

The PostgreSQL connector also supports _auto-migration_ that enables you to create a database schema
from LoopBack models using the [LoopBack automigrate method](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate).

For more information on auto-migration, see [Creating a database schema from models](https://loopback.io/doc/en/lb3/Creating-a-database-schema-from-models.html) for more information.

LoopBack PostgreSQL connector creates the following schema objects for a given
model: a table, for example, PRODUCT under the 'public' schema within the database.

The auto-migrate method:

* Defines a primary key for the properties whose `id` property is true (or a positive number).
* Creates a column with 'SERIAL' type if the `generated` property of the `id` property is true.

Destroying models may result in errors due to foreign key integrity. First delete any related models by calling delete on models with relationships.

## Running tests

The tests in this repository are mainly integration tests, meaning you will need to run them using our preconfigured test server.

1. Ask a core developer for instructions on how to set up test server
   credentials on your machine
2. `npm test`

If you wish to run the tests using your own test database instance,

__Set up the database__

1. Go to pgAdmin.  
By default, the local database is one of the servers under Server Groups > Servers.  
2. Under Login Roles, add a user called ```strongloop```.

__Change configuration for database connection__

In ```test\init.js```, change the value of ```config``` to be pointing to the local database.  For example, 
```
  var config = {
    host: 'localhost',
    port: '5432',
    database:'strongloop',
    username: 'postgres',
    password: 'postgres',
  };
```

2. (`Linux Only`) `CI=true PGHOST=localhost PGPORT=<pgport> PGDATABASE=<dbname> PGUSER=<username> PGPASSWORD=<password> npm test`

__Troubleshooting__

When running `npm test`, it runs the ```pretest.js``` which eventually runs ```schema.sql``` to set up the database and tables. 
If there is problem, you can run the ```schema.sql``` manually.  To do this:

1. Go to SQL Shell (psql)
2. Run:
```
\i <<file path>>

For example on Windows,
\i c:\somepath\test\schema.sql
```