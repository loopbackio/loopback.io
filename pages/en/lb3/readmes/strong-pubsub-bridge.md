# strong-pubsub-bridge

**Create a bridge between a `Client` and a broker.**

## Installation

```
$ npm install strong-pubsub-bridge
```

## Use

Use `Bridge` for the following:

 - Bridge connections to brokers
 - Inject logic inbetween client actions (publish / subscribe / etc) and brokers
 - Adapt a connection that speaks one protocol to a broker that requires another 

**TCP**

Below is an example accepting a **tcp** connection, upgrading it to a
**strong-pubsub** `Connection`, and creating a bridge to an **MQTT** broker.

```js
// tcp server
tcpServer.on('connection', function(socket) {
  var bridge = new Bridge(
    // upgrade the tcp socket into a strong-pubsub-connection
    new Connection(socket),
    new Client({port: MOSQUITTO_PORT}, Adapter)
  );

  bridge.connect();
});
```

**Primus**

Here is an example that upgrades a **primus** `Spark` into a
**strong-pubsub** `Connection` and creating a bridge to an **MQTT** broker.

```js
// primus server
primus.on('connection', function(spark) {
  var bridge = new Bridge(
    new Connection(spark),
    new Client({port: MOSQUITTO_PORT}, Adapter)
  );

  bridge.connect();
});
```

**Hooks**

Below is an example using a hook to inject a function to be invoked before an
action is performed by the bridge on behalf of a `Connection`.

```js
bridge.before(action, function(ctx, next) {
  console.log('about to publish to');
  console.log(ctx.topic); // => "my topic"
  next();
});
```

## API

[See the API docs.](http://apidocs.strongloop.com/strong-pubsub-bridge)
