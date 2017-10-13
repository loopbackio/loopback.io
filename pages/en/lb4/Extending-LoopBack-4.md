---
lang: en
title: 'Extending LoopBack 4'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Extending-LoopBack-4.html
summary:
---

## Overview

LoopBack 4 is designed to be highly extensible. For architectural rationale and motivation, see [Crafting LoopBack 4](Crafting-LoopBack-4.html).

## Building blocks for extensibility

The `@loopback/context` module implements an [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control) (IoC) container (`Context`) as a service registry that supports [Dependency injection](Dependency-injection.html).

![loopback-ioc](/images/lb4/loopback-ioc.png)

The IoC container decouples service providers and consumers. A service provider can be bound to the context with a key, which can be treated as an address of the service provider. Service consumers can then either locate the provider using the binding key or declare a dependency using `@inject('a-service-provider')` so that the service provider can be injected into the consumer class. For example,

```ts
import {inject, Context} from '@loopback/context';

/**
 * A logger implementation that depends on log.prefix and log.level
 */
class Logger {
  // Prefix and level are injected via the constructor
  constructor(
    @inject('log.prefix') private prefix: string, 
    @inject('log.level') private level: string),
  ) {}

  log(msg: string) {
    if (this.level === 'INFO') {
      console.log(`[${this.prefix}] ${msg}`);
    }
  }
}

const ctx = new Context();
// Bind log prefix as a constant value to the context
ctx.bind('log.prefix').to('LoopBack');
// Bind log level as a dynamic value derived from LOG_LEVEL environment variable
ctx.bind('log.level').toDynamicValue(() => process.env.LOG_LEVEL);
// Bind the Logger class as the logger implementation
ctx.bind('logger').toClass(Logger);

// Locate the an instance of Logger from the context
const logger: Logger = await ctx.get('logger');
// Run the log()
logger.log('Hello');
```

How does the IoC container have anything to do with extensibility?

1. An alternative implementation of the service provider can be bound the context to replace the existing one. For example, we can implement different hashing functions for password encryption. The user management system can then receive a custom password hashing.

2. Services can be organized as extension points and extensions. For example, to allow multiple authentication strategies, the `authentication` component can define an extension point as `authentication-manager` and various authentication strategies such as user/password, LDAP, oAuth2 can be contributed to the extension point as extensions. The relation will look like:

![loopback-extension](/images/lb4/loopback-extension.png)

To allow a list of extensions to be contributed to LoopBack framework and applications, we introduce `Component` as the packaging model to bundle extensions. A component is either a npm module or a local folder structure that contains one or more extensions. It's then exported as a class implementing the `Component` interface. For example:

```ts
...
import {Component, ProviderMap} from '@loopback/core';

export class LogComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {
      [LogBindings.LOG_ACTION]: LogProvider,
    };
  }
}
```

![loopback-component](/images/lb4/loopback-component.png)

See [Creating components](Creating-components.html)
See [Using Components](Using-components.html)

## Types of extensions

- Binding providers
- Decorators
- Sequence & Actions
- Connectors
- Utility functions
- Controllers
- Repositories
- Models
- Mixins

For a list of candidate extensions, see [loopback-next issue #512](https://github.com/strongloop/loopback-next/issues/512).

### System vs Application extensions

Some extensions are meant to extend the programming model and integration capability of the LoopBack 4 framework.

An application can be decomposed into multiple components too

## Examples & Tutorials

- loopback4-example-log-extension
- @loopback/authentication
