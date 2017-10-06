---
lang: en
title: 'Dependency injection'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Dependency-injection.html
summary:
---
## Introduction

[Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) is a technique where the construction of dependencies of a class or function is separated from its behavior, in order to keep the code [loosely coupled](https://en.wikipedia.org/wiki/Loose_coupling).

For example, the Sequence Action `authenticate` supports different authentication strategies (e.g. HTTP Basic Auth, OAuth2, etc.). Instead of hard-coding some sort of a lookup table to find the right strategy instance, `authenticate` uses dependency injection to let the caller specify which strategy to use.

```ts
class AuthenticationProvider {
  constructor(
    @inject('authentication.strategy')
    strategy
  ) {
    this.strategy = strategy;
  }

  value() {
    // this is the function invoked by "authenticate()" sequence action
    return async (request) => {
      const adapter = new StrategyAdapter(this.strategy);
      const user = await adapter.authenticate(request);
      return user;
    }
  }
}
```

Dependency Injection makes the code easier to extend and customize, because the dependencies can be easily rewired by the application developer. It makes the code easier to test in isolation (in a pure unit test), because the test can inject a custom version of the dependency (a mock or a stub). This is especially important when testing code interacting with external services like a database or an OAuth2 provider. Instead of making expensive network requests, the test can provide a lightweight implementation returning pre-defined responses.

## Configuring what to inject

Now that we wrote a class that gets the dependencies injected, you are probably wondering where are these values going to be injected from and how to configure what should be injected. This part is typically handled by an IoC Container, where IoC means [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control).

In LoopBack, we use [Context](Context.html) to keep track of all injectable dependencies.

There are several different ways for configuring the values to inject, the simplest options is to call `app.bind(key).to(value)`. Building on top of the example above, one can configure the app to use a Basic HTTP authentication strategy as follows:

```ts
// TypeScript example

import {BasicStrategy} from 'passport-http';
import {Application} from '@loopback/core';
import {RestServer} from '@loopback/rest';
// basic scaffolding stuff happens in between...

const server = await app.getServer(RestServer); // The REST server has its own context!
server.bind('authentication.strategy').to(new BasicStrategy(loginUser));

function loginUser(username, password, cb) {
  // check that username + password are valid
}
```

However, when you want to create a binding that will instantiate a class and automatically inject required dependencies, then you need to use `.toClass()` method:

```ts
server.bind('authentication.provider').toClass(AuthenticationProvider);

const provider = await server.get('authentication.provider');
// provider is an AuthenticationProvider instance
// provider.strategy was set to the value returned by server.get('authentication.strategy')
```

When a binding is created via `.toClass()`, [Context](Context.html) will create a new instance of the class when resolving the value of this binding, injecting constructor arguments and property values as configured via `@inject` decorator.

Note that the dependencies to be injected could be classes themselves, in which case [Context](Context.html) will recursively instantiate these classes first, resolving their dependencies as needed.

In this particular example, the class is a [Provider](Writing-Components#providers). Providers allow you to customize the way how a value is created by the Context, possibly depending on other Context values. A provider is typically bound using `.toProvider(.html)` API:

```js
app.bind('authentication.provider').toProvider(AuthenticationProvider);

const authenticate = await app.get('authentication.provider');

// authenticate is the function returned by provider's value() method
```

You can learn more about Providers in [Creating Components](Creating-components.html).
## Flavors of Dependency Injection

LoopBack supports two kinds of dependency injection:

 1. constructor injection: the dependencies are provided as arguments of the class constructor.
 2. property injection: the dependencies are stored in instance properties after the class was constructed.

### Constructor injection

This is the most common flavor that should be your default choice.

```js
class ProductController {
  constructor(
    @inject('repositories.Product')
    repo
  ) {
    this.repo = repo;
  }

  async list() {
    return await this.repo.find({where: {available: true}});
  }
}
```

### Property injection

Property injection is usually used for optional dependencies which are not required for the class to function or for dependencies that have a reasonable default.

```ts
class InfoController {
  @inject('logger')
  private logger = ConsoleLogger();

  status() {
    this.logger.info('Status endpoint accessed.');
    return {pid: process.pid};
  }
}
```

## Additional resources

 - [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) on Wikipedia
 - [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) on Wikipedia
