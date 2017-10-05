---
lang: en
title: 'Sequence'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Sequence.html
summary:
---

## What is a Sequence?

A `Sequence` is a stateless grouping of [Actions](#actions) that control how a
`Server` responds to requests.

```js
const server = await app.getServer(RestServer);
server.handler((sequence, request, response) => {
  const spec = {parameters: {name: 'string', source: 'query'}};
  const params = sequence.parseParams(request, spec);
  sequence.send(response, `hello ${params.name}`);
});
```

In the following example, we define a `handler` function that uses the
`Sequence` to respond to every HTTP request our server instance receives
with `hello $name` (eg. `GET /?name=bob => 'hello bob'`).

```js
class MySequence extends DefaultSequence {
  // this is the same as using `server.handler(handle)`
  handle(request, response) {
    const spec = {params: {name: {type: 'string', in: 'query'}}};
    const params = this.parseParams(request, spec);
    this.send(response, `hello ${params.name}`);
  }
}
```

The contract of a `Sequence` is simple: it must produce a response to a request.
Creating your own `Sequence` gives you full control over how your `Server`
instances handle requests and responses. The `DefaultSequence` looks like this:

<!--
  FIXME(kev): Should we be copying this logic into the docs directly?
  What if this code changes?
-->
```js
class DefaultSequence {
  async handle(request, response) {
    try {
      const route = this.findRoute(request);
      const params = this.parseParams(request, route);
      const result = await this.invoke(route, params);
      await this.send(response, result);
    } catch(err) {
      await this.reject(response, err);
    }
  }
}
```

## Elements

In the example above, `route`, `params`, and `result` are all Elements. When building sequences, you use LoopBack Elements to respond to a request:

- [`Route`](http://apidocs.strongloop.com/loopback-next/Routes) // missing API docs link
- [`Request`](http://apidocs.strongloop.com/loopback-next/Request) // missing API docs link
- [`Response`](http://apidocs.strongloop.com/loopback-next/Response) // missing API docs link
- [`OperationRetVal`](http://apidocs.strongloop.com/loopback-next/OperationRetVal) // missing API docs link
- [`Params`](http://apidocs.strongloop.com/loopback-next/Params) // missing API docs link
- [`OpenAPISpec`](http://apidocs.strongloop.com/loopback-next/OpenAPISpec) // missing API docs link
- [`OperationError`](http://apidocs.strongloop.com/loopback-next/OperationError) // (TBD) missing API docs link
- [`OperationMeta`](http://apidocs.strongloop.com/loopback-next/OperationMeta) // (TBD) missing API docs link
- [`OperationRetMeta`](http://apidocs.strongloop.com/loopback-next/OperationRetMeta) // (TBD) missing API docs link

## Actions

Actions are JavaScript functions that only accept or return `Elements`. Since the input of one action (an Element) is the output of another action (Element) you can easily compose them. Below is an example that uses several built-in Actions:

```js
class MySequence extends DefaultSequence {
  async handle(request, response) {
    // findRoute() produces an element
    const route = this.findRoute(request);
    // parseParams() uses the route element and produces the params element
    const params = this.parseParams(request, route);
    // invoke() uses both the route and params elements to produce the result (OperationRetVal) element
    const result = await this.invoke(route, params);
    // send() uses the result element
    await this.send(response, result);
  }
}
```

## Custom Sequences

Most use cases can be accomplished with `DefaultSequence` or by slightly customizing it:

```js
class MySequence extends DefaultSequence {
  log(msg) {
    console.log(msg);
  }
  async handle(request, response) {
    this.log('before request');
    await super.handle(request, response);
    this.log('after request');
  }
}
```

In order for LoopBack to use your custom sequence, you must register it on any
applicable `Server` instances before starting your `Application`:

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

## Advanced topics

### Custom routing

A custom `Sequence` enables you to control exactly how requests are routed to endpoints such as `Controller` methods, plain JavaScript functions, Express applications, and so on.

This example demonstrates determining which endpoint (controller method) to invoke based on an API specification.

```ts
import {findRoute} from '@loopback/rest'

const API_SPEC = {
  basePath: '/',
  paths: {
    '/greet': {
      get: {
        'x-operation-name': "greet",
        responses: {
          200: {
            description: "greeting text",
            schema: { type: "string" }
          }
        }
      }
    }
  }
};

class MySequence extends DefaultSequence {
  async run(request) {
    const {methodName} = this.findRoute(request, API_SPEC);
    await this.sendResponse(methodName); // => greet
  }
}
```

### Using Sequence actions

{% include content/tbd.html %}

How to use non-core Sequence Actions (authenticate, authorize, log, debug, etc).

### Query string parameters

{% include content/tbd.html %}

How to get query string param values.

### Parsing Requests

{% include content/tbd.html %}

Parsing and validating arguments from the request url, headers, and body.

### Invoking controller methods

{% include content/tbd.html %}

 - How to use `invoke()` in simple and advanced use cases.
 - Explain what happens when you call `invoke()`
 - Mention caching use case
 - Can I call invoke multiple times?

### Writing the response

{% include content/tbd.html %}

 - Must call `sendResponse()` exactly once
 - Streams?

### Sending errors

{% include content/tbd.html %}

 - try/catch details

### Keeping your Sequences

{% include content/tbd.html %}

 - Try and use existing actions
 - Implement your own version of built in actions
 - Publish reusable actions to npm
