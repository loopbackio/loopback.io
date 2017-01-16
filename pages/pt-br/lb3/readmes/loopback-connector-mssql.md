# loopback-connector-mssql

`loopback-connector-mssql` is the Microsoft SQL Server connector module for [loopback-datasource-juggler](https://github.com/strongloop/loopback-datasource-juggler/).

For complete documentation, see [Documentation | SQL Server Connector](http://loopback.io/doc/en/lb2/SQL-Server-connector.html).

## Installation

````sh
npm install loopback-connector-mssql --save
````

## Basic use

To use it you need `loopback-datasource-juggler`.

1. Setup dependencies in `package.json`:

    ```json
    {
      ...
      "dependencies": {
        "loopback-datasource-juggler": "latest",
        "loopback-connector-mssql": "latest"
      },
      ...
    }
    ```

2. Use:

    ```javascript
        var DataSource = require('loopback-datasource-juggler').DataSource;
        var dataSource = new DataSource('mssql', {
            host: 'demo.strongloop.com',
            port: 1433,
            database: 'mydb',
            username: 'myuser',
            password: 'mypass',
            
            // You need this if using Microsoft Azure SQL database
            // options: { encrypt: true }
        });
    ```

## Running tests

The tests in this repository are mainly integration tests, meaning you will need
to run them using our preconfigured test server.

1. Ask a core developer for instructions on how to set up test server
   credentials on your machine
2. `npm test`
