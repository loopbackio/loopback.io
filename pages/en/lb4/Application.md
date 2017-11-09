---
lang: en
title: 'Application'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Application.html
summary:
---

## What is an Application?

In LoopBack 4, the [`Application`](http://apidocs.strongloop.com/@loopback%2fcore/#Application)
class is the central class for setting up all of your module's components,
controllers, servers and bindings. The `Application` class extends 
[Context](Context.html), and provides the controls for starting and stopping
itself and its associated servers.

When using LoopBack 4, we strongly encourage you to create your own subclass
of `Application` to better organize your configuration and setup.

## Making your own application class

By making your own application class, you can perform several additional
tasks as a part of your setup:
- Pass configuration into the base class constructor
- Perform some asynchronous wireup before application start
- Perform some graceful cleanup on application stop 

{% include code-caption.html content="src/widget-application.ts" %}
```ts
import {Application} from '@loopback/core';
import {RestComponent, RestServer} from '@loopback/rest';
import {SamoflangeController, DoohickeyController} from './src/controllers';
import {WidgetApi} from './apidef/';

export class WidgetApplication extends Application {
  constructor() {
    // This is where you would pass configuration to the base constructor
    // (as well as handle your own!)
    super({
      components: [RestComponent],
    });
    const app = this; // For clarity.
    // You can bind to the Application-level context here.
    // app.bind('foo').to(bar);
    app.controller(SamoflangeController);
    app.controller(DoohickeyController);
  }

  async start() {
    // This is where you would asynchronously retrieve servers, providers and
    // other components to configure them before launch.
    const server = await app.getServer(RestServer);
    server.bind('rest.port').to(8080);
    server.api(WidgetApi);
    return await super.start();
  }

  async stop() {
    // This is where you would do whatever is necessary before stopping your
    // app (graceful closing of connections, flushing buffers, etc)
    console.log('Widget application is shutting down...')
    await super.stop();
  }
}

```

## Configuring your application
Your application can be configured with constructor arguments, bindings, or
a combination of both.

### Binding configuration
Binding is the most commonly-demonstrated form of application configuration
throughout our examples, and in most cases, is the recommended method for
setting up your application.

In addition to the binding functions provided by [Context](Context.html),
the `Application` class also provides some sugar functions for commonly used
bindings, like `component`, `server` and `controller`:

```ts
export class MyApplication extends Application {
  constructor() {
    super();
    this.component(MagicSuite);
    this.server(RestServer, 'public');
    this.server(RestServer, 'private');

    this.controller(FooController);
    this.controller(BarController);
    this.controller(BazController);
  }
}
```

You can find a complete list of these functions on the
[`Application`](http://apidocs.loopback.io/@loopback%2fcore/#Application) API
docs page.

Additionally, you can use more advanced forms of binding to fine-tune your
application's configuration:

```ts
export class MyApplication extends Application {
  constructor() {
    super();
  }
  this.server(RestServer);
  this.controller(FooController);
  this.bind('fooCorp.logger').toProvider(LogProvider);
  this.bind('repositories.widget')
    .toClass(WidgetRepository)
    .inScope(BindingScope.SINGLETON);
}
```
In the above example:
- injection calls for `fooCorp.logger` will be handled by the `LogProvider`
  class.
- injection calls for `repositories.widget` will be handled by a singleton
instance of the `WidgetRepository` class.

### Constructor configuration

The `Application` class constructor also accepts an
[`ApplicationConfig`](http://apidocs.strongloop.com/@loopback%2fcore/#ApplicationConfig)
object which contains three collections: `components`, `controllers` and `servers`.
It will automatically create bindings for each of these collections as a part
of defining the application instance.

{% include note.html content="
  More advanced binding configuration such as provider binding, or binding scopes
  are not possible with the constructor-based configuration approach.
" %}

```ts
export class MyApplication extends Application {
  constructor() {
    super({
      components: [
        MagicSuite,
      ],
      servers: {
        'public': RestServer,
        'private': RestServer,
      },
      controllers: {
        FooController,
        BarController,
        BazController,
      }
    });
  }
}
```

#### Components
The components collection allows bulk binding of component constructors within
your `Application` instance's context.

For more information on how to make use of components,
see [Using Components](http://loopback.io/doc/en/lb4/Using-components.html).

#### Controllers
Much like the components collection, the controllers collection allows bulk
binding of [Controllers](http://loopback.io/doc/en/lb4/Controllers.html) to
the `Application` context.

#### Servers
The servers collection is a Map of server constructors, whose keys are used
as part of the server's binding name.

```ts
const app = new Application({
  servers: {
    'public': RestServer,
    'private': RestServer,
  },
});
```
In the above example, the two server instances would be bound to the Application
context under the keys `servers.public`, and `servers.private` respectively.

## Tips for application setup
Here are some tips to help avoid common pitfalls and mistakes.

### Use unique bindings
Use binding names that are prefixed with a unique string that does not overlap
with loopback's bindings. As an example, if your application is built for
your employer FooCorp, you can prefix your bindings with `fooCorp`.
```ts
// This is unlikely to conflict with keys used by other component developers
// or within loopback itself!
app.bind('fooCorp.widgetServer.config').to(widgetServerConfig);
```

### Avoid use of `getSync`
We provide the [`getSync`](http://apidocs.loopback.io/@loopback%2fcontext/#getSync)
function for scenarios where you cannot asynchronously retrieve your bindings,
such as in constructor bodies.

However, the number of scenarios in which you must do this are limited, and you
should avoid potential race conditions and retrieve your bindings asynchronously
using the [`get`](http://apidocs.loopback.io/@loopback%2fcontext/#get) function
whenever possible.

### Use caution with singleton binding scopes
By default, bindings for controllers will instantiate a new instance whenever
they are injected or retrieved from their binding. Your application should only
set singleton binding scopes on controllers when it makes sense to do so.
