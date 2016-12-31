## Installation

```
$ npm install strong-pubsub
```

## Use

**NOTE: until version `1.0.0` the API may change!**

```js
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');

// two clients connecting to the same broker
var siskel = new Client({host: 'my.message-broker.com', port: 3000}, Adapter);
var ebert = new Client({host: 'my.message-broker.com', port: 3000}, Adapter);

siskel.subscribe('movies');
siskel.on('message', function(topic, msg) {
 console.log(topic, msg.toString()); // => movies birdman
});

ebert.publish('movies', 'birdman');
```

## Client (strong-pubsub)

The `Client` class provides a unified pubsub client in Node.js and browsers. It supports subscribing
to topics or topic patterns (topics and wildcards). Clients can connect to brokers or bridges that support
the `client.adapter`’s protocol.

## Bridge ([strong-pubsub-bridge](https://github.com/strongloop/strong-pubsub-bridge))

In some cases, clients should not connect directly to a message broker. The Bridge class allows you to create a bridge between a client connecting to your **node.js** server and a broker. It supports hooks for injecting logic before the bridge performs an action on behalf of the client. Hooks allow you to implement client authentication and client action (publish, subscribe)
authorization using vanilla node.js (usually in place of broker specific access controls and authentication).

Bridges also allow clients to connect to brokers over a protocol that the broker may not support. For example, a client can connect to the bridge using one protocol (eg. MQTT) and the bridge will connect
to the broker using another (eg. **Redis** or **STOMP**).

![Bridge](https://raw.githubusercontent.com/strongloop/strong-pubsub/master/assets/bridge.png "Pubsub Bridge")

**Note:** It is not possible to guarantee all features when bridging connections of one protocol to a broker that speaks another protocol. For example MQTT quality of service (`options.qos`) will be not be guaranteed when a bridge is accepting MQTT protocol connections and bridging to a redis broker.

### Creating a bridge

Here is an example setting up a bridge. This would bridge messages between MQTT clients and a RabbitMQ server.

```js
// my-bridge-server.js
var server = require('./my-existing-server');

var Adapter = require('strong-pubsub-mqtt');
var client = new Client('mqtt://my.mosquitto.org', Adapter);
var Connection = require('strong-pubsub-connection-mqtt');

server.on('connection', function(connection) {
  mqttConnection = new Connection(connection);
  var bridge = new Bridge(mqttConnection, client);
});
```

This example shows how to connect a `Client` to a `Bridge` and then a `Bridge` to a broker (using another `Client`).

```js
server.on('connection', function(connection) {
  var bridge = new Bridge(
    new MqttConnection(connection),
    new Client({port: MOSQUITTO_PORT}, Adapter)
  );

  bridge.connect();
});
```

## Message broker

To distribute a message published to a topic, a client connects to a message broker.
Client adapters allow pubsub clients to connect to various brokers. Clients can connect directly
to brokers or indirectly using a bridge.

## Adapter

Client adapters implement the `Client` API in a broker protocol-specific way.

Specify the adapter specific options using the name as the key.

```js
{
  mqtt: {
    clientId: 'foobar'
  }
}
```

###Protocols

Strong-pubsub supports these two protocols:

- [MQTT](http://mqtt.org/)
- [STOMP](https://stomp.github.io/)

It is possible to extend **strong-pubsub** to support other protocols, but that is beyond the scope of this README.

###Transports

Adapters / Clients require a tranpsort to create a connection and read / write data to / from.

A module (or object) that implements `net.createConnection()`.

- The standard TCP protocol: `require('net')`
- Transport Layer Security (TLS), a secure cryptographic protocol: `require('tls')`
- [Primus](https://github.com/primus/primus) (in development): `require('strong-pubsub-transport-primus')`

## Transport swapping

This example shows how to switch betweenn different transports on the client.

```js
//
// client side transport switching
//
var Adapter = require('strong-pubsub-mqtt');

// default
var TcpTransport = require('net'); // tcp (the default)
var client = new Client({host: 'localhost', port: 3000}, Adapter, TcpTransport);

// primus
var PrimusTransport = require('strong-pubsub-primus');
var client = new Client({host: 'localhost', port: 3000}, Adapter, PrimusTransport);

// tls
var TlsTransport = require('tls');
var client = new Client({host: 'localhost', port: 3000}, Adapter, TlsTransport);

//
// bridge transport swapping
//
var primusServer = PrimusTransport.createServer();
var tlsServer = TlsTransport.createServer();
var tcpServer = TcpTransport.createServer();

primusServer.on('connection', bridgeConnection);
tlsServer.on('connection', bridgeConnection);
tcpServer.on('connection', bridgeConnection);

function bridgeConnection(connection) {
  var bridge = new Bridge(
    new MqttConnection(connection),
    new Client({port: MOSQUITTO_PORT}, Adapter)
  );

  bridge.connect();
}
```

## Connection

A Protocol connection implements a specific pubsub protocol in Node.js for use by strong-pubsub-bridge.

## Architecture

This diagram illustrates how messages flow between clients, bridges, servers and brokers.
The blue arrows represent a message published to a topic. The green arrow represents the message
being sent to a subscriber.

![Pubsub Architecture](https://github.com/strongloop/strong-pubsub/raw/master/assets/pubsub-arch.png?v2 "Pubsub Architecture")

## Modules / Plugins

- [strong-pubsub-bridge](http://github.com/strongloop/strong-pubsub-bridge)
- [strong-pubsub-mqtt](http://github.com/strongloop/strong-pubsub-mqtt)
- [strong-pubsub-redis](http://github.com/strongloop/strong-pubsub-redis)
- [strong-pubsub-connection-mqtt](http://github.com/strongloop/strong-pubsub-connection-mqtt)

## Examples

[See the strong-pubsub-example repo.](http://github.com/strongloop/strong-pubsub-example)
