## loopback-connector-postgresql

The PostgreSQL Connector module for for [loopback-datasource-juggler](http://docs.strongloop.com/loopback-datasource-juggler/).

Please see the [official documentation](http://docs.strongloop.com/display/LB/PostgreSQL+connector).


## Connector settings

The connector can be configured using the following settings from the data source.
* url: The URL to the database, such as 'postgres://test:mypassword@localhost:5432/dev'
* host or hostname (default to 'localhost'): The host name or ip address of the PostgreSQL DB server
* port (default to 5432): The port number of the PostgreSQL DB server
* username or user: The user name to connect to the PostgreSQL DB
* password: The password
* database: The PostgreSQL database name
* debug (default to false)

**NOTE**: By default, the 'public' schema is used for all tables.

The PostgreSQL connector uses [node-postgres](https://github.com/brianc/node-postgres) as the driver. See more
information about configuration parameters, check [https://github.com/brianc/node-postgres/wiki/Client#constructors](https://github.com/brianc/node-postgres/wiki/Client#constructors).

## Discovering Models

PostgreSQL data sources allow you to discover model definition information from existing postgresql databases. See the following APIs:

 - [dataSource.discoverModelDefinitions([username], fn)](https://github.com/strongloop/loopback#datasourcediscovermodeldefinitionsusername-fn)
 - [dataSource.discoverSchema([owner], name, fn)](https://github.com/strongloop/loopback#datasourcediscoverschemaowner-name-fn)


## Model definition for PostgreSQL

The model definition consists of the following properties:

* name: Name of the model, by default, it's the camel case of the table
* options: Model level operations and mapping to PostgreSQL schema/table
* properties: Property definitions, including mapping to PostgreSQL column

```json

    {"name": "Inventory", "options": {
      "idInjection": false,
      "postgresql": {
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
    }}

```

## Type Mapping

 - Number
 - Boolean
 - String
 - Object
 - Date
 - Array
 - Buffer

### JSON to PostgreSQL Types

* String|JSON|Text|default: VARCHAR, default length is 1024
* Number: INTEGER
* Date: TIMESTAMP WITH TIME ZONE
* Timestamp: TIMESTAMP WITH TIME ZONE
* Boolean: BOOLEAN

### PostgreSQL Types to JSON

* BOOLEAN: Boolean
* VARCHAR|CHARACTER VARYING|CHARACTER|CHAR|TEXT: String
* BYTEA: Binary;
* SMALLINT|INTEGER|BIGINT|DECIMAL|NUMERIC|REAL|DOUBLE|SERIAL|BIGSERIAL: Number
* DATE|TIMESTAMP|TIME: Date
* POINT: GeoPoint

## Destroying Models

Destroying models may result in errors due to foreign key integrity. Make sure
to delete any related models first before calling delete on model's with
relationships.

## Auto Migrate / Auto Update

After making changes to your model properties you must call `Model.automigrate()`
or `Model.autoupdate()`. Only call `Model.automigrate()` on new models
as it will drop existing tables.

LoopBack PostgreSQL connector creates the following schema objects for a given
model:

* A table, for example, PRODUCT under the 'public' schema within the database


## Running tests

The tests in this repository are mainly integration tests, meaning you will need
to run them using our preconfigured test server.

1. Ask a core developer for instructions on how to set up test server
   credentials on your machine
2. `npm test`
