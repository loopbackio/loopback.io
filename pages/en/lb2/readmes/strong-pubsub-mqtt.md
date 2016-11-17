# strong-pubsub-mqtt

**An MQTT `Adapter` for strong-pubsub**

## Installation

```
$ npm install strong-pubsub-mqtt
```

## Use

```js
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');

var client = new Client({host: 'http://my.message-broker.com', port: 3000}, Adapter);

client.publish('my topic', 'my message');
```
