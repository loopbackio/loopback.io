---
lang: en
title: 'Controllers'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Controllers.html
summary:
---

## Overview

A `Controller` is a class that implements operations defined by application's REST API. It implements an application's business logic and acts as a bridge between the HTTP/REST API and domain/database models.
A `Controller` operates only on processed input and abstractions of backend services / databases.

### Review questions

{% include content/tbd.html %}

Simplest possible example of a Controller
- app.controller()
- a few methods
- no usage of @api

How to create a basic `Controller` (beyond the hello world)
- Using DI (@inject)
- Using annotations (eg. @authenticate)
- Defining routes via sugar annoations (@get, @post, @all)
- Errors
- Using `async` / `await` and `Promise`s

## Operations

In the previous Operation example, the `greet()` operation was defined as a plain JavaScript function. The example below shows this as a Controller method.

```js
// plain function Operation
function greet(name) {
  return `hello ${name}`;
}

// Controller method Operation
class MyController {
  greet(name) {
    return `hello ${name}`;
  }
}
```

## Routing to Controllers

This is a basic API Specification used in the following examples. It is an [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/0e51e2a1b2d668f434e44e5818a0cdad1be090b4/versions/2.0.md#operation-object).

```js
const spec = {
  parameters: [{name: 'name', type: 'string', in: 'query'}],
  responses: {
    '200': {
      description: 'greeting text',
      schema: {type: 'string'},
    }
  }
};
```

There are several ways to define `Routes` to Controller methods. The first example defines a route to the Controller without any magic.

```js
app.route('get', '/greet', spec, MyController, 'greet');
```

Decorators allow you to annotate your Controller methods with routing metadata, so LoopBack can call the `app.route()` function for you.

```js
class MyController {
  @get('/greet', spec)
  greet(name) {
  }
}

app.controller(MyController);
```

## Specifying Controller APIs

For larger LoopBack applications, you can organize your routes into API Specifications using the OpenAPI specification. The `@api` decorator takes a spec with type `ControllerSpec` which comprises of a string `basePath` and a [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/0e51e2a1b2d668f434e44e5818a0cdad1be090b4/versions/2.0.md#paths-object). It is _not_ a full [Swagger](https://github.com/OAI/OpenAPI-Specification/blob/0e51e2a1b2d668f434e44e5818a0cdad1be090b4/versions/2.0.md#swagger-object) specification.

```js
app.api({
  basePath: '/',
  paths: {
    '/greet': {
      get: {
        'x-operation-name': 'greet',
        'x-controller-name': 'MyController',
        parameters: [{name: 'name', type: 'string', in: 'query'}],
        responses: {
          '200': {
            description: 'greeting text',
            schema: {type: 'string'},
          }
        }
      }
    }
  }
});
app.controller(MyController);
```

The `@api` decorator allows you to annotate your Controller with a specification, so LoopBack can call the `app.api()` function for you.

```js
@api({
  basePath: '/',
  paths: {
    '/greet': {
      get: {
        'x-operation-name': 'greet',
        'x-controller-name': 'MyController',
        parameters: [{name: 'name', type: 'string', in: 'query'}],
        responses: {
          '200': {
            description: 'greeting text',
            schema: {type: 'string'},
          }
        }
      }
    }
  }
})
class MyController {
  greet(name) {
  }
}
app.controller(MyController);
```

## Writing Controller methods

Below is an example Controller that uses several built in helpers (decorators). These helpers give LoopBack hints about the Controller methods.

```js
class HelloController {
  constructor() {
    this.messages = new Repository('messages');
  }
  @get('/messages')
  @param.query.number('limit')
  list(limit = 10) {
    if (limit > 100) limit = 100; // your logic
    return this.messages.find({limit});
  }
}
```

- A `Repository` is LoopBack's database abstraction. See [Repositories](Repositories.html) for more.
- `@get('/messages')` creates the `Route` for the Operation using `app.route()`.
- `@param.query.number` adds a `number` param with a source of `query`.

## Handling Errors in Controllers

In order to specify errors for controller methods to throw, the class `HttpErrors` is used. `HttpErrors` can be found in the `@loopback/rest` package.

The example below shows how `HttpErrors` can be used inside a controller method and how it can be tested.

```js
// the test
import {HelloController} from 'path.to.controller'
import {expect} from '@loopback/testlab'
// ...

// ...
describe('Hello Controller', () => {
  // ...
  it('returns 412 Precondition Failed for non-positive limit', () => {
    const controller = new HelloController();
    try {
      controller.list(0);
      throw new Error('should have thrown an error');
    } catch (err) {
      expect(err).to.have.property('statusCode', 412);
      expect(err.message).to.match(/precondition failed/i);
    }
  })
  // ...
})
// ...
```
```js
// the controller
import 'HttpErrors' from '@loopback/rest'

class HelloController {
  constructor() {
    this.messages = new Repository('messages');
  }
  @get('/messages')
  @param.query.number('limit')
  list(limit = 10)
    if (limit < 1)
      throw new HttpErrors.PreconditionFailed('limit is non-positive');
    else if (limit > 100)
      limit = 100; // your logic
    return this.messages.find({limit});
  }
}
```
