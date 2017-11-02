---
lang: en
title: 'Server'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Server.html
summary:
---

Server is a system that enters a working state of doing something by starting it, 
and exits the working state by stopping it.

## Implement a Server

User can extend the context system to implement their own server and integrate it with your app.

### Context Binding

It is recommended that each Server implementation creates its own child
Context, which inherits from the parent Application context. This way,
any Server-specific bindings will remain local to the Server instance,
and will avoid polluting its parent module scope.

A server module can export its own Bindings as `namespace` and 
receive app level config from `coreBindings`:

{% include code-caption.html content="myServer/src/keys.ts" %}
```js
import {CoreBindings} from '@loopback/core';

export namespace MyServerBindings {
  export const CONFIG = `${CoreBindings.APPLICATION_CONFIG}#myserver`;
  export const FOO = 'myserver.foo';
}
```

And the server class extends `Context` from `@loopback/context`.
Its constructor takes in an `Application` instance as its parent `Context` and
a configuration specific to a particular server instance.

{% include code-caption.html content="myServer/src/MyServer.ts" %}
```js
import {Context} from '@loopback/context';
import {Server} from '@loopback/core';

class MyServer extends Context implements Server {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
    @inject(MyServerBindings.CONFIG) options?: RestServerConfig
  ) {
    super(app);
  }  
}
```

### Implement Server Functions

You may already notice that the server declaration above also implements a `Server` interface.
There are two basic functions a server must have:

- start()
- stop()

`start` spins up the server to a working state, keep doing one or more things 
and could interact with events from outside.

`stop` stops a server by exiting its working state.

{% include code-caption.html content="myServer/src/MyServer.ts" %}
```js
import {Context} from '@loopback/context';
import {Server} from '@loopback/core';
import * as EventEmitter from 'events';

class MyEmitter extends EventEmitter {}

class MyServer extends Context implements Server {
  myEmitter: MyEmitter;
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
    @inject(MyServerBindings.CONFIG) options?: RestServerConfig
  ) {
    super(app);
    this.myEmitter = new MyEmitter();
  }  

  async start(): Promise<void> {
    this.myEmitter.on('event', () => {
      console.log('an event occurred!');
    });
    return Promise.resolve();
  }

  async stop(): Promise<void> {
    this.myEmitter.removeListener('event', ()=>{
      return Promise.resolve();
    });
  }
}
```

### Bind a Server

Now you can create a server instance and bind it to your app. 
When instanciating the `Application`, `start()` and `stop()` will be 
mounted to `Application` level functions.

{% include code-caption.html content="application.ts" %}
```js
import { Application, ApplicationConfig } from '@loopback/core';
import {MyServer} from './myServer/src/MyServer';

export class MyApp extends Application {
  constructor(options?: ApplicationConfig) {
  super(options);
  this.server(MyServer, 'serverFoo');
  }
}
```

There are several ways to bind a server to an app

```js
app.server(RestServer, 'nameOfYourServer');
```

Or levarage a component to do it:

```js
const app = new MyApplication({
  components: [RestComponent]
});
// OR
app.component(RestComponent);
```

Finally you can start your server/app by:
(This part needs more clarification about one app with multiple server)

{% include code-caption.html content="index.ts" %}
```js
import { MyApp } from './src/application';
const app = new MyApp();
app
  .start()
  .then(async () => {
    const server = await app.getServer('jannyserverFoo');
    // it doesn't work
    server.myEmitter.emit('event');
  })
  .catch(err => {
    console.error(`Unable to start application: ${err}`);
  });

async function stopServer() {
  await app.stop();
  process.exit(0);
}

process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);
```


### Create Component

TBD


## REST Server

LoopBack implements a REST HTTP server for you to quickly get REST apis to work.
By setting up a server, it processes the coming request on its port, 
invokes the corresponding controller function and sends the returned result as response.

`start()` runs your server instance on a port to listen on the coming-in requests.

`stop()` kills the server instance, any APIs exposed on that server will not be available.


DRAFT, DONNOT READ PLEASE.


Topics

- create web server: context, controller, sequence, start, stop
- create http server: use our sequence
- relation between server, component, extension, app, controller


### Sequence

- elements
- actions

- findRoute
- parseParams
- invoke
- send

A `Sequence` is a stateless grouping of [Actions](#actions) that control how a
`Server` responds to requests.

The contract of a `Sequence` is simple: it must produce a response to a request.
Creating your own `Sequence` gives you full control over how your `Server`
instances handle requests and responses.

Make sure you use LoopBack elements in your custom sequence

Question: Does soap server fit well with current sequence?

Register sequence to your server:

```js
import {Application} from '@loopback/core';
import {RestComponent, RestServer} from '@loopback/rest';

const app = new Application({
  components: [RestComponent],
});

// or
(async function start() {
  const server = await app.getServer(RestServer);
  server.sequence(MySequence);
  await app.start();
})();
```

### Controller


In order for LoopBack to use your custom sequence, you must register it on any
applicable `Server` instances before starting your `Application`:



