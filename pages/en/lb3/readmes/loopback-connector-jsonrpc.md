# LoopBack JSON-RPC Connector

The LoopBack JSON-RPC Connector allows you to call [JSON-RPC](http://www.jsonrpc.org) services from LoopBack models. It
uses [jayson](https://github.com/tedeh/jayson) as the client library.

## Usage


```js

    var ds = loopback.createDataSource({
        connector: require("loopback-connector-jsonrpc"),
        debug: false,
        baseURL: 'http://localhost:3000',
        operations: ['add', 'subtract']});

    var model = ds.createModel('dummy');

    model.add(1, 2, function(err, data) {
        console.log(err, data);
    });
```

Options to configure the connector:

* url: Base URL to the json-rpc server
* operations: An array of operation names

You can also configure the baseURL as follows.

    {
        host: 'localhost',
        port: 3000
    }

Other properties will be passed to `jayson`.

* reviver: Function to use as a JSON reviver
* replacer: Function to use as a JSON replacer
* generator: Function to generate request ids with. If omitted, Jayson will just generate a "random" number that is RFC4122
compliant and looks similar to this: 3d4be346-b5bb-4e28-bc4a-0b721d4f9ef9
* version: Can be either 1 or 2 depending on which specification should be followed in communicating with the server.
Defaults to 2 for JSON-RPC 2.0
* encoding: String that determines the encoding to use and defaults to utf8



## License
MIT
