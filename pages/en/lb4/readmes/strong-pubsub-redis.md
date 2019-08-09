# strong-pubsub-redis

**[Redis](http://redis.io/) `Adapter` for strong-pubsub**

## Installation

```
$ npm install strong-pubsub-redis
```

## Use

```js
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-redis');

var client = new Client({host: 'http://my.message-broker.com', port: 3000}, Adapter);

client.publish('my topic', 'my message');
```
