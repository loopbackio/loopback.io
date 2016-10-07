---
title: "Strong Remoting"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Strong-Remoting.html
summary:
---

See also [Strong remoting API](http://apidocs.strongloop.com/strong-remoting/)

## Overview

Objects (and, therefore, data) in Node applications commonly need to be accessible by other Node processes, browsers, and even mobile clients. Strong remoting:

* Makes local functions remotable, exported over adapters.
* Supports multiple transports, including custom transports.
* Manages serialization to JSON and deserialization from JSON.
* Supports multiple client SDKs, including mobile clients.

### Client SDK support

For higher-level transports, such as REST and Socket.IO, existing clients will work well.
If you want to be able to swap out your transport, use one of our supported clients.
The same adapter model available on the server applies to clients, so you can switch transports on both the server and all clients without changing your application-specific code.

## Installation

## Quick start

The following example illustrates how to set up a basic strong-remoting server with a single remote method, user.greet.

```js
// Create a collection of remote objects.
var remoting = require('../');
var SharedClass = remoting.SharedClass
var remotes = remoting.create();

// define a class-like object (or constructor)
function User() {

}

User.greet = function (fn) {
  fn(null, 'hello, world!');
}

// create a shared class to allow strong-remoting to map
// http requests to method invocations on your class
var userSharedClass = new SharedClass('user', User);

// Tell strong-remoting about your greet method
userSharedClass.defineMethod('greet', {
  isStatic: true, // not an instance method
  returns: [{
    arg: 'msg',
    type: 'string' // define the type of the callback arguments
  }]
});
// Expose it over the REST transport.
require('http')
  .createServer(remotes.handler('rest'))
  .listen(3000);
```

Then, invoke `User.greet()` easily with `curl` (or any HTTP client)!

```shell
$ curl http://localhost:3000/user/greet?str=hello
```

Result:

```javascript
{
  "msg": "hello world"
}
```

## Concepts

### Remote objects

Most Node applications expose a remotely-available API.
Strong-remoting enables you to build your app in vanilla JavaScript and export remote objects over the network the same way you export functions from a module.
Since they're just plain JavaScript objects, you can always invoke methods on your remote objects locally in JavaScript, whether from tests or other, local objects.

### Remote object collections

Collections that are the result of `require('strong-remoting').create()` are responsible for binding their remote objects to transports,
allowing you to swap out the underlying transport without changing any of your application-specific code.

### Adapters

Adapters provide the transport-specific mechanisms to make remote objects (and collections thereof) available over their transport.
The REST adapter, for example, handles an HTTP server and facilitates mapping your objects to RESTful resources.
Other adapters, on the other hand, might provide a less opinionated, RPC-style network interface.
Your application code doesn't need to know what adapter it's using.

### Hooks

Hooks enable you to run code before remote objects are constructed or methods on those objects are invoked.
For example, you can prevent actions based on context (HTTP request, user credentials, and so on).

Hooks accept an asynchronous handler function that is called for every request.
This handler function signals the completion either by accepting a callback argument or returning a promise. For example:

See the before-after example for more info.

### Streams

Strong-remoting supports methods that expect or return Readable and Writable streams.
This enables you to stream raw binary data such as files over the network without writing transport-specific behavior.

For example, the following code exposes a method of the `fs` Remote Object, `fs.createReadStream`, over the REST adapter:

Then you can invoke fs.createReadStream() using curl as follows:

```shell
$ curl http://localhost:3000/fs/createReadStream?path=some-file.txt
```
