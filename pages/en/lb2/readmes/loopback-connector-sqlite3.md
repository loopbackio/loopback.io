## loopback-connector-sqlite3

The SQLite3 Connector module for for [loopback-datasource-juggler](http://docs.strongloop.com/loopback-datasource-juggler/).

## Connector settings

The connector can be configured using the following settings from the data source.
* file: The path to the database file or `:memory:`
* debug (default to false)

The SQLite3 connector uses [node-sqlite3](https://github.com/mapbox/node-sqlite3) as the driver.

## Discovering Models

The SQLite3 connector does not currently support discovery of models.

## Model definition for SQLite3

The model definition consists of the following properties:

* name: Name of the model, by default, it's the camel case of the table
* properties: Property definitions, including default value mapping

```json

    {"name": "Inventory", "options": {
      "idInjection": false,
    }, "properties": {
      "id": {
        "type": "String",
        "required": false,
        "length": 64,
        "precision": null,
        "scale": null
      },
      "productId": {
        "type": "String",
        "required": false,
        "length": 20,
        "precision": null,
        "scale": null,
        "id": 1
      },
      "locationId": {
        "type": "String",
        "required": false,
        "length": 20,
        "precision": null,
        "scale": null,
        "id": 1
      },
      "available": {
        "type": "Number",
        "required": false,
        "length": null,
        "precision": 32,
        "scale": 0
      },
      "total": {
        "type": "Number",
        "required": false,
        "length": null,
        "precision": 32,
        "scale": 0
      },
      "createdOn": {
       "type": "Date",
        "required": false,
        "sqlite3": {
          "dbDefault": "now"
        }
      }
    }}

```

## Type Mapping

 - Number
    - Primary key is stored as INTEGER
    - Others are stored as REAL
 - Boolean
    - Stored as INTEGER 1 or 0
 - Date
    - Stored as INTEGER (Millis since Jan 01 1970 00:00:00 0000)
 - String
 - Complex types (GeoPoint, Point, List, Array, Object, Sub-models)
    - Stored as TEXT in JSON form
 - JSON
    - Stored as TEXT
    
SQLite3 does not enforce types. I.e. any data can be stored in any column regardless of definiton.
This connector attempts to check for invalid Date, Number and JSON types.

## Auto Migrate / Auto Update

The SQLite3 connector does not currently support auto-migrate or auto-upgrade.

## Running tests

The tests in this repository are mainly integration tests, meaning you will need
to run them using our preconfigured test server.

1. Ask a core developer for instructions on how to set up test server
   credentials on your machine
2. `npm test`
