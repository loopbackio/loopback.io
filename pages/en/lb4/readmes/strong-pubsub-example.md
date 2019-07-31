# Strong PubSub Example

This example demonstrates the end-to-end functionality of the **strong-pubsub** modules.

 - Publishing (from a node.js CLI program)
 - Subscribing (from a browser and node.js CLI program)
 - Bridge connections (from the browser or TCP)
 - Browserify + Primus (for use in browsers)

## Prerequisites

1. Install [Mosquitto](http://mosquitto.org/) 
2. Make sure that the path to the Mosquito executable is on your system PATH.  For example, on Mac OS, you might need to add `/usr/local/sbin` to your PATH.

## Run the example

To run:

```
$ git clone https://github.com/strongloop/strong-pubsub-example.git
$ cd strong-pubsub-example
$ npm install
$ node server.js
```

To subscribe:

```
# open http://localhost:3000 in a browser
# and open the browser's console
# note: the browser client will subscribe to the topic "foo"

# subscribe directly to mosquitto
$ TOPIC=foo PORT=6000 node sub

# subscribe to the TCP bridge
$ TOPIC=foo PORT=3000 node sub
```

To publish a message:

```
# publish directly to mosquitto
$ TOPIC=foo PORT=6000 node pub

# publish to the TCP bridge
$ TOPIC=foo PORT=3000 node pub
```
