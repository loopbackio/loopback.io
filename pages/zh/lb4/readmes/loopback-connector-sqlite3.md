# loopback-connector-sqlite3

[SQLite](https://sqlite.org/) is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL database engine. This is the official SQLite3 connector module for the LoopBack framework.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-sqlite3 --save
```

The `--save` option adds the dependency to the application's `package.json` file.

## Connector settings

Configure the connector with the following data source properties:

* `file`: The path to the database file or `:memory:`
* `debug`: Display debug information. Default is false.

The SQLite3 connector uses [node-sqlite3](https://github.com/mapbox/node-sqlite3) as the driver.

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

| LoopBack type | Mapped to SQLite3 type |
|-----|-----|
| Number| Primary key stored as INTEGER, others as REAL |
| Boolean | INTEGER 1 or 0 |
| Date | INTEGER (ms since Jan 01 1970 00:00:00 0000) |
| String | ? |
| Complex types: GeoPoint, Point, List, Array, Object, and sub-models | TEXT in JSON format |
| JSON | TEXT |

SQLite3 does not enforce types. Any data can be stored in any column regardless of definiton.
This connector attempts to check for invalid Date, Number and JSON types.

## Unsupported features

### Discovering Models

The SQLite3 connector does not currently support model discovery.

### Auto Migrate / Auto Update

The SQLite3 connector does not currently support auto-migrate or auto-upgrade.

## Running tests

The tests in this repository are mainly integration tests, meaning you will need
to run them using our preconfigured test server.

1. Ask a core developer for instructions on how to set up test server
   credentials on your machine
2. `npm test`
