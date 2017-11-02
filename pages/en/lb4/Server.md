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
Usually a Server is responsible for interacting with events outside, process incoming things
and give corresponding responses.

## Implement a Server

A Server is essencially a Context, see [Context](Context.htm) to learn more before
you design a Server.

User can extend the context system to implement their own Server and integrate it with their app.
A Server module contains the following parts:

- a Server Context class
- a namespace for Context Binding

### Context Binding

It is recommended that each Server implementation creates its own child
Context, which inherits from the parent Application context. This way,
any Server-specific bindings will remain local to the Server instance,
and will avoid polluting its parent module scope.

A Server module can export its own Bindings as `namespace` and 
receive app level config from `coreBindings`.
Let's start with building a server that listen on some event:

{% include code-caption.html content="myServer/src/keys.ts" %}
```js
import {CoreBindings} from '@loopback/core';

export namespace MyServerBindings {
  export const CONFIG = `${CoreBindings.APPLICATION_CONFIG}#myserver`;
  export const EMITTER_EVENT = 'myserver.emitter.event';
}
```

### Extend Context Class

The Server class extends `Context` from `@loopback/context`.
Its constructor takes in an `Application` instance as its parent `Context` and
a configuration(optional) specific to a particular server instance.

{% include code-caption.html content="myServer/src/MyServer.ts" %}
```js
import {Context} from '@loopback/context';
import {Server} from '@loopback/core';

export class MyServer extends Context implements Server {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
    @inject(MyServerBindings.CONFIG) options?: MyServerConfig
  ) {
    super(app);
  }  
}

export interface MyServerConfig {
  x: string;
  y: number;
}
```

### Implement Server Functions

You may already notice that the Server declaration above also implements a `Server` interface.
There are two basic functions a Server must have:

- start()
- stop()

`start` spins up the server to a working state, keep doing one or more things 
and could interact with events from outside.

`stop` stops a server by exiting its working state.

{% include code-caption.html content="myServer/src/MyServer.ts" %}
```js
import {Server, Application, CoreBindings} from '@loopback/core';
import {Context, inject} from '@loopback/context';
import * as EventEmitter from 'events';

class MyEmitter extends EventEmitter {}

export class MyServer extends Context implements Server {
  myEmitter: MyEmitter;

  constructor(
      @inject(CoreBindings.APPLICATION_INSTANCE) public app: Application
  ) {
    super(app);
    // an Emitter listen on a certain event whose name is returned by `getEventName()`
    this.myEmitter = new MyEmitter();
  }

  // return the event name
  async getEventName(): Promise<string> {
    return await this.get('MyServerBindings.EMITTER_EVENT');
  }

  async start(): Promise<void> {
    console.log('Your server startted!');
    let eventName = await this.getEventName();
    // listen on an event and give some response
    this.myEmitter.on(eventName, () => {
      console.log('Your server is responding to an event...');
    });
    return Promise.resolve();
  }

  async stop(): Promise<void> {
    let eventName = await this.getEventName();
    // remove listeners
    this.myEmitter.removeAllListeners(eventName);
    console.log('Your server stopped!');
    return Promise.resolve();
  }
}
```

### Bind a Server to Application

Now you can bind a Server to your Application by calling `this.server()` 
in the Application constructor.

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

When instanciating `MyApp`, a server instance named `serverFoo` will be 
bound to the app, `start()` and `stop()` will be mounted to `Application` level functions.

There are several ways to bind a server to an app, the strategy in the example above
is the most staightforward one:

```js
app.server(MyServer, 'nameOfYourServer');
```

Or you can levarage a component to do it:

```js
const app = new MyApplication({
  components: [MyComponent]
});
// OR
app.component(MyComponent);
```

Please see [Creating components](Creating-components.htm) and our implementation of 
[RestComponent](https://github.com/strongloop/loopback-next/blob/master/packages/rest/src/rest-component.ts)
for details.

Finally you can create an app instance, start your app by `app.start()`,
and stop it by `app.strop()`:

{% include code-caption.html content="index.ts" %}
```ts
import { MyApp } from './src/application';
import {MyServer} from './src/server/myServer/src/MyServer';

const app = new MyApp();
const eventName = 'working';
app.bind('MyServerBindings.EMITTER_EVENT').to(eventName);

app
  .start()
  .then(async () => {
    // Or `const server = <MyServer> await app.getServer('serverFoo');`
    const server = await app.getServer(MyServer);
    setInterval(()=> {server.myEmitter.emit(eventName);}, 500);
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

*Please note, currently each app can only have one server.*

## REST Server

LoopBack implements a REST HTTP server for you to quickly get REST apis to work.
By setting up a REST server, it processes the coming requests on its port, 
invokes the corresponding controller functions and sends the returned result as responses.

`start()` runs your server instance on a port to listen on the coming-in requests.

`stop()` kills the server instance, any APIs exposed on that server will not be available.

If you are interested in creating your own Web server by using `Sequence`, `Routing`, 
and leveraging `Controller`, please see 
[the implementation of `RestServer`](https://github.com/strongloop/loopback-next/tree/master/packages/rest)
to learn more.
