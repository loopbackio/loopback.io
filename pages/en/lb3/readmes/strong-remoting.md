# strong-remoting

**This module is in Active LTS mode, new features are no longer accepted.**
<br/>(See [Module Long Term Support Policy](#module-long-term-support-policy)
below.)

LoopBack 3 users looking for new features are encouraged to upgrade
to LoopBack 4. Refer to
[loopback-next#1849](https://github.com/strongloop/loopback-next/issues/1849)
for more information on how to upgrade.

If you are building directly on top of strong-remoting without LoopBack,
then please [open a new GitHub issue](https://github.com/strongloop/strong-remoting/issues/new)
to discuss the specifics.

## Overview

Objects (and, therefore, data) in Node applications commonly need to be accessible by other Node processes, browsers, and even mobile clients.   Strong remoting:

 * Makes local functions remotable, exported over adapters.
 * Supports multiple transports, including custom transports.
 * Manages serialization to JSON and deserialization from JSON.
 * Supports multiple client SDKs, including mobile clients.

<div class="gh-only">
Also see the <a href="http://loopback.io/doc/en/lb2/Strong-Remoting.html">official StrongLoop documentation</a>.</div>

### Client SDK support

For higher-level transports, such as REST and Socket.IO, existing clients will work well. If you want to be able to swap out your transport, use one of our supported clients. The same adapter model available on the server applies to clients, so you can switch transports on both the server and all clients without changing your application-specific code.

## Module Long Term Support Policy

This module adopts the [Module Long Term Support (LTS)](http://github.com/CloudNativeJS/ModuleLTS) policy, with the following End Of Life (EOL) dates:

| Version           | Status          | Published | EOL      |
| ----------------- | --------------- | --------- | -------- |
| strong-remoting@3 | Active LTS      | Dec 2016  | Dec 2019 |
| strong-remoting@2 | Maintenance LTS | Jul 2014  | Apr 2019 |

Learn more about our LTS plan in [docs](https://loopback.io/doc/en/contrib/Long-term-support.html).

## Installation

```sh
$ npm install strong-remoting
```

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

    $ curl http://localhost:3000/user/greet?str=hello

Result:

```
{
  "msg": "hello world"
}
```

## Concepts

### Remote objects

Most Node applications expose a remotely-available API.  Strong-remoting enables you to build your app in vanilla JavaScript and export remote objects over the network the same way you export functions from a module. Since they're just plain JavaScript objects, you can always invoke methods on your remote objects locally in JavaScript, whether from tests or other, local objects.

### Remote object collections

Collections that are the result of require('strong-remoting').create() are responsible for binding their remote objects to transports, allowing you to swap out the underlying transport without changing any of your application-specific code.

### Adapters

Adapters provide the transport-specific mechanisms to make remote objects (and collections thereof) available over their transport. The REST adapter, for example, handles an HTTP server and facilitates mapping your objects to RESTful resources. Other adapters, on the other hand, might provide a less opinionated, RPC-style network interface. Your application code doesn't need to know what adapter it's using.

### Hooks

Hooks enable you to run code before remote objects are constructed or methods on those objects are invoked. For example, you can prevent actions based on context (HTTP request, user credentials, and so on).

```js
// Do something before any hook is executed
remotes.authorization = function(ctx, next) {
  if(checkContext(ctx)) {
    // allow
    next();
  } else {
    // deny
    var err = new Error('denied!');
    err.statusCode = 401;
    next(err);
  }
}

// Do something before our `user.greet` example, earlier.
remotes.before('user.greet', function (ctx, next) {
  if((ctx.req.param('password') || '').toString() !== '1234') {
    next(new Error('Bad password!'));
  } else {
    next();
  }
});

// Do something before any `user` method.
remotes.before('user.*', function (ctx, next) {
  console.log('Calling a user method.');
  next();
});

// Do something before a `dog` instance method.
remotes.before('dog.prototype.*', function (ctx, next) {
  var dog = this;
  console.log('Calling a method on "%s".', dog.name);
  next();
});

// Do something after the `speak` instance method.
// NOTE: you cannot cancel a method after it has been called.
remotes.after('dog.prototype.speak', function (ctx, next) {
  console.log('After speak!');
  next();
});

// Do something before all methods.
remotes.before('**', function (ctx, next, method) {
  console.log('Calling:', method.name);
  next();
});

// Modify all returned values named `result`.
remotes.after('**', function (ctx, next) {
  ctx.result += '!!!';
  next();
});
```

Hooks accept an asynchronous handler function that is called for every request. This handler function signals the completion either by accepting a callback argument or returning a promise.  For example:

```js
// accepting a callback argument
remotes.after('dog.prototype.speak', function(ctx, next) {
  console.log('After speak!');
  next();
});

// returning a promise
remotes.after('dog.prototype.speak', function(ctx) {
  console.log('After speak!');
  return Promise.resolve();
});
```

See the before-after example for more info.

### Streams

Strong-remoting supports methods that expect or return Readable and Writeable streams. This enables you to stream raw binary data such as files over the network without writing transport-specific behavior.

For example, the following code exposes a method of the `fs` Remote Object, `fs.createReadStream`, over the REST adapter:

```js
// Create a Collection.
var remotes = require('strong-remoting').create();

// Share some fs module code.
var fs = remotes.exports.fs = require('fs');

// Specifically export the `createReadStream` function.
fs.createReadStream.shared = true;

// Describe the arguments.
fs.createReadStream.accepts = {arg: 'path', type: 'string'};

// Describe the stream destination.
fs.createReadStream.http = {
  // Pipe the returned `Readable` stream to the response's `Writable` stream.
  pipe: {
    dest: 'res'
  }
};

// Expose the Collection over the REST Adapter.
require('http')
  .createServer(remotes.handler('rest'))
  .listen(3000);
```

Then you can invoke `fs.createReadStream()` using curl as follows:

```sh
$ curl http://localhost:3000/fs/createReadStream?path=some-file.txt
```
