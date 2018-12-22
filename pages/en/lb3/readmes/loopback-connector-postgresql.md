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
  "url": "postgres://admin:admin@mydbhost:5432/db1?ssl=false",
  "database": "db1",
  "password": "admin",
  "user": "admin",
  "ssl": false
}
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a PostgreSQL database.

### Connection Pool Settings

You can also specify connection pool settings in `datasources.json`. For instance you can specify the minimum and the maximum pool size, and the maximum pool client's idle time before closing the client.

Example of `datasource.json`:
```
{
  "mypostgresdb": {
    "host": "mydbhost",
    "port": 5432,
    "url": "postgres://admin:password1@mydbhost:5432/db1?ssl=false",
    "database": "db1",
    "password": "password1",
    "name": "mypostgresdb",
    "user": "admin",
    "connector": "postgresql",
    "min": 5,
    "max": 200,
    "idleTimeoutMillis": 60000,
    "ssl": false
  }
}
```
Check out [node-pg-pool](https://github.com/brianc/node-pg-pool) and [node postgres pooling example](https://github.com/brianc/node-postgres#pooling-example) for more information.

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
    <tr>
      <td>min</td>
      <td>Integer</td>
      <td>Minimum number of clients in the connection pool</td>
    </tr>
    <tr>
      <td>max</td>
      <td>Integer</td>
      <td>Maximum number of clients in the connection pool</td>
    </tr>
    <tr>
      <td>idleTimeoutMillis</td>
      <td>Integer</td>
      <td>Maximum time a client in the pool has to stay idle before closing it</td>
    </tr>
    <tr>
      <td>ssl</td>
      <td>Boolean</td>
      <td>Whether to try SSL/TLS to connect to server</td>
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

## Numeric Data Type

**Note**: The [node.js driver for postgres](https://github.com/brianc/node-postgres) by default casts `Numeric` type as a string on `GET` operation. This is to avoid _data precision loss_ since `Numeric` types in postgres cannot be safely converted to JavaScript `Number`.

For details, see the corresponding [driver issue](https://github.com/brianc/node-pg-types/issues/28).

## Querying JSON fields

**Note** The fields you are querying should be setup to use the JSON postgresql data type - see Defining models

Assuming a model such as this:

```json
{
  "name": "Customer",
  "properties": {
    "address": {
      "type": "object",
      "postgresql": {
        "dataType": "json"
      }
    }
  }
}
```

You can query the nested fields with dot notation:

```javascript
Customer.find({
  where: {
    'address.state': 'California'
  },
  order: 'address.city'
})
```

## Discovery and auto-migration

### Model discovery

The PostgreSQL connector supports _model discovery_ that enables you to create LoopBack models
based on an existing database schema using the unified [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).  For more information on discovery, see [Discovering models from relational databases](https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html).

### Auto-migration

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

### Own instance
If you have a local or remote PostgreSQL instance and would like to use that to run the test suite, use the following command:
- Linux
```bash
POSTGRESQL_HOST=<HOST> POSTGRESQL_PORT=<PORT> POSTGRESQL_USER=<USER> POSTGRESQL_PASSWORD=<PASSWORD> POSTGRESQL_DATABASE=<DATABASE> CI=true npm test
```
- Windows
```bash
SET POSTGRESQL_HOST=<HOST> SET POSTGRESQL_PORT=<PORT> SET POSTGRESQL_USER=<USER> SET POSTGRESQL_PASSWORD=<PASSWORD> SET POSTGRESQL_DATABASE=<DATABASE> SET CI=true npm test
```

### Docker
If you do not have a local PostgreSQL instance, you can also run the test suite with very minimal requirements.
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a PostgreSQL instance on your local:
```bash
source setup.sh <HOST> <PORT> <USER> <PASSWORD> <DATABASE>
```
where `<HOST>`, `<PORT>`, `<USER>`, `<PASSWORD>` and `<DATABASE>` are optional parameters. The default values are `localhost`, `5432`, `root`, `pass` and `testdb` respectively.
- Run the test:
```bash
npm test
```
