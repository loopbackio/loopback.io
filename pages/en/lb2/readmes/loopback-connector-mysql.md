# loopback-connector-mysql

`loopback-connector-mysql` is the MySQL connector module for [loopback-datasource-juggler](https://github.com/strongloop/loopback-datasource-juggler/).

For complete documentation, see [StrongLoop Documentation | MySQL Connector](http://loopback.io/doc/en/lb2/MySQL-connector.html).

## Installation

````sh
npm install loopback-connector-mysql --save
````

## Basic use

To use it you need `loopback-datasource-juggler`.

1. Setup dependencies in `package.json`:

    ```json
    {
      ...
      "dependencies": {
        "loopback-datasource-juggler": "latest",
        "loopback-connector-mysql": "latest"
      },
      ...
    }
    ```

2. Use:

    ```javascript
        var DataSource = require('loopback-datasource-juggler').DataSource;
        var dataSource = new DataSource('mysql', {
            host: 'localhost',
            port: 3306,
            database: 'mydb',
            username: 'myuser',
            password: 'mypass'
        });
    ```
    You can optionally pass a few additional parameters supported by [`node-mysql`](https://github.com/felixge/node-mysql),
    most particularly `password` and `collation`. `Collation` currently defaults
    to `utf8_general_ci`. The `collation` value will also be used to derive the
    connection charset.

## Running Tests

The tests in this repository are mainly integration tests, meaning you will need to run them using our preconfigured test server.

1. Ask a core developer for instructions on how to set up test server credentials on your machine
2. `npm test`
