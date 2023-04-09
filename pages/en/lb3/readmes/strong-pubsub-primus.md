# strong-pubsub-primus

[Primus](https://www.npmjs.com/package/primus) compatibility layer for [`strong-pubsub`][strong-pubsub-repo].

## Installation

```
npm install --save strong-pubsub-primus
```

## Use

Create a client as you would normally do using [`strong-pubsub`][strong-pubsub-repo] and pass in the Primus transport as the third argument:

```js
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');
var PrimusTransport = require('strong-pubsub-primus'); // require the primus tranport

var client = new Client({
  host: 'localhost',
  port: 1883
}, Adapter, PrimusTranport); // pass it in as the third argument
```

**NOTE**: You will need a preconfigured Primus server to act as the broker.

[strong-pubsub-repo]: https://github.com/strongloop/strong-pubsub
