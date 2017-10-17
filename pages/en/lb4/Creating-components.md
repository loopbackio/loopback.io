---
lang: en
title: 'Creating components'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Creating-components.html
summary:
---
> Cover "What is a decorator?"

As explained in [Using Components](Using-components.html), a typical LoopBack component is an npm package exporting a Component class.

```js
import MyController from './controllers/my-controller';
import MyValueProvider from './providers/my-value-provider';

export class MyComponent {
  constructor() {
    this.controllers = [MyController];
    this.providers = {
      'my.value': MyValueProvider
    };
  }
}
```

When a component is mounted to an application, a new instance of the component class is created and then
 - each Controller class is registered via `app.controller()`,
 - each Provider is bound to its key in `providers` object.

The example `MyComponent` above will add `MyController` to application's API and create a new binding `my.value` that will be resolved using `MyValueProvider`.

## Providers

Providers are the mechanism allowing components to export values that can be used by the target application or other components. A provider is a class that provides `value()` function, this function is called by [Context](Context.html) whenever another entity requests a value to be injected.

```js
import {Provider} from '@loopback/context';

export class MyValueProvider implements Provider<string>{
  value(): string {
    return 'Hello world';
  }
}
```

### Specifying binding key

Notice that the provider class itself does not specify any binding key, the key is assigned by the component class.

```js
import MyValueProvider from './providers/my-value-provider';

export class MyComponent {
  constructor() {
    this.providers = {
      'my-component.my-value': MyValueProvider
    };
  }
}
```

### Accessing values from Providers

Applications should use `@inject` decorators to access the value provided by our exported provider.

```js
const app = new Application({
  components: [MyComponent]
});

class MyController {
  constructor(@inject('my-component.my-value') greeting) {
    // LoopBack sets greeting to 'Hello World' when creating a controller instance
    this.greeting = greeting;
  }

  @get('/greet')
  greet() {
    return this.greeting;
  }
}
```

A note on binding names: In order to avoid name conflicts, always add a unique prefix to your binding key (`my-component.` in the example above). See [Reserved binding keys](Reserved-binding-keys.html) for the list of keys reserved for the framework use.

### Asynchronous providers

Provider's `value()` method can be asynchronous too:

```js
import {Provider} from '@loopback/context';
const request = require('request-promise-native');
const weatherUrl =
  'http://samples.openweathermap.org/data/2.5/weather?appid=b1b15e88fa797225412429c1c50c122a1'

export class CurrentTemperatureProvider implement Provider<number>{
  async value():number {
    const data = await(request(`${weatherUrl}&q=Prague,CZ`, {json:true});
    return data.main.temp;
  }
}
```

In this case, LoopBack will wait until the promise returned by `value()` is resolved, and use the resolved value for dependency injection.

### Working with HTTP request/response

In some cases, the provider may depend on other parts of LoopBack, for example the current `request` object. Such dependencies should be listed in provider's constructor and annotated with `@inject` keyword, so that LoopBack runtime can resolve them automatically for you.

```js
import {Provider} from '@loopback/context';
const uuid = require('uuid/v4');

class CorrelationIdProvider implement Provider<any>{
  constructor(@inject('http.request') request) {
    this.request = request;
  }

  value():any {
    return this.request.headers['X-Correlation-Id'] || uuid();
  }
}
```

## Modifying request handling logic

A frequent use case for components is to modify the way how all requests are handled. For example, the authentication component needs to verify user credentials before the actual handler can be invoked, a logger component needs to record start time and write a log entry when the request has been handled.

The idiomatic solution has two parts:

 1. The component should define and bind a new [Sequence action](Sequence.html#actions), for example `authentication.actions.authenticate`:

    ```js
    class AuthenticationComponent {
      constructor() {
        this.providers = {
          'authentication.actions.authenticate': AuthenticateActionProvider
        };
      }
    }
    ```

 2. The application should use a custom `Sequence` class which calls this new sequence action in an appropriate place.

    ```js
    class AppSequence implements SequenceHandler {
      constructor(
        @inject('sequence.actions.findRoute') findRoute,
        @inject('sequence.actions.invokeMethod') invoke,
        @inject('sequence.actions.send') send: Send,
        @inject('sequence.actions.reject') reject: Reject,
        // Inject the new action here:
        @inject('authentication.actions.authenticate') authenticate
      ) {
        this.findRoute = findRoute;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
        this.authenticate = authenticate;
      }

      async handle(req: ParsedRequest, res: ServerResponse) {
        try {
          const route = this.findRoute(req);

          // Invoke the new action:
          const user = await this.authenticate(req);

          const args = await parseOperationArgs(req, route);
          const result = await this.invoke(route, args);
          this.send(res, result);
        } catch (err) {
          this.reject(res, req, err);
        }
      }
    }
    ```

### Accessing Elements contributed by other Sequence Actions

When writing a custom sequence action, you need to access Elements contributed by other actions run in the sequence. For example, `authenticate()` action needs information about the invoked route in order to decide whether and how to authenticate the request.

Because all Actions are resolved before the Sequence `handle` function is run, Elements contributed by Actions are not available for injection yet. To solve this problem, use `@inject.getter` decorator to obtain a getter function instead of the actual value. This allows you to defer resolution of your dependency only until the sequence action contributing this value has already finished.

```js
export class AuthenticationProvider {
  constructor(
    @inject.getter(BindingKeys.Authentication.STRATEGY)
    readonly getStrategy
  ) {
    this.getStrategy = getStrategy;
  }

  value() {
    return async (request: ParsedRequest) => {
      const strategy = await getStrategy();
      // ...
    };
  }
}
```


### Contributing Elements from Sequence Actions

Use `@inject.setter` decorator to obtain a setter function that can be used to contribute new Elements to the request context.

```js
export class AuthenticationProvider {
  constructor(
    @inject.getter(BindingKeys.Authentication.STRATEGY)
    readonly getStrategy,
    @inject.setter(BindingKeys.Authentication.CURRENT_USER)
    readonly setCurrentUser,
  ) {
    this.getStrategy = getStrategy;
    this.setCurrentUser = setCurrentUser;
  }

  value() {
    return async (request: ParsedRequest) => {
      const strategy = await getStrategy();
      const user = // ... authenticate
      setCurrentUser(user);
      return user;
    };
  }
}
```

## Configuring components

More often than not, the component may want to offer different value providers depending on the configuration. For example, a component providing Email API may offer different transports (stub, SMTP, etc.).

Components should use constructor-level [Dependency Injection](Context.html#dependency-injection) to receive the configuration from the application.

```js
class EmailComponent {
  constructor(@inject('config#components.email') config) {
    this.config = config;
    this.providers = {
      'sendEmail': config.transport == 'stub' ?
        StubTransportProvider :
        SmtpTransportProvider,
    };
  }
}
```

## Interact with Mixin

TBD.

- create a new concept Mixin
- use `RepositoryMixin` as an example to show mount component repositories in a mixin
