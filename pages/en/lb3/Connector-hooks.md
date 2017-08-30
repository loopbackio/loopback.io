---
title: "Connector hooks"
lang: en
layout: navgroup
navgroup: app-logic
keywords: LoopBack
tags: application_logic
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Connector-hooks.html
summary: Connector hooks are triggered by actions of connectors.
---
## Overview

Connectors are responsible for interacting with the backend systems on behalf of model methods.
Connector hooks enable applications to intercept the connector execution.

Two connector hooks are available:

- 'before execute'
- 'after execute'

### before execute

The 'before execute' hook is invoked before a connector sends a request to the backend data source.

```javascript
var connector = MyModel.getDataSource().connector;
connector.observe('before execute', function(ctx, next) {
  // ...
  next();
});
```

To terminate the invocation, call `ctx.end(err, result)`, for example:

```javascript
var connector = MyModel.getDataSource().connector;
connector.observe('before execute', function(ctx, next) {
  // ...
  ctx.end(null, cachedResponse);
});
```

### after execute

The 'after execute' hook is invoked after the connector receives a response from the backend data source.

```javascript
connector.observe('after execute', function(ctx, next) {
  // ...
  next();
});
```

## Context

The context object contains information for the hooks to act on. It varies based on the type of connectors. 

### Relational database connectors

[Relational database connectors](Database-connectors.html) include connectors for  MySQL, PostgreSQL, SQL Server, Oracle, and so on.

```
before: {req: {sql: 'SELECT ...', params: [1, 2]}, end: ...}
```

```
after: {req: {sql: 'SELECT ...', params: [1, 2]}, res: ..., end: ...}
```

### MongoDB connector

```
before: {req: {command: ..., params: ...}, end: ...}
```

```
after: {req: {...}, res: {...}, end: ...}
```

Where:

- `req.command` is the command for the [MongoDB collection](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html).
- `req.params` is the request parameters passing to the [MongoDB driver](https://github.com/mongodb/node-mongodb-native).
- `res` is the response object received from the [MongoDB driver](https://github.com/mongodb/node-mongodb-native).

### REST connector

```
before: {req: {...}, end: ...}
```

```
after: {req: {...}, res: {...}, end: ...}
```

Where:

- `req` is the request object being passed to [request](https://github.com/request/request) module.
- `res` is the response object received from [request](https://github.com/request/request) module.

Connector hooks give you access to the Loopback context object, `ctx`, that contains information that won’t make it to the end of your method.  Typically, at the end of a call you get the body of the response, so the headers are only available in the `ctx` object.

You have to use the connector hook during application boot; for example:

{% include code-caption.html content="server/boot/set-headers-in-body.js" %}
```js
module.exports = function(server) {
  var APIConnector;
  APIConnector = server.datasources.APIDataSource.connector;
  return APIConnector.observe('after execute', function(ctx, next) {

  });
};
```

Now inside this function you have access to this information:

- Response headers: `ctx.res.headers`.
- HTTP response code: `ctx.res.body.code`.
- HTTP method of the request: `ctx.req.method`.

The hook is triggered every time the connector is called, so every request with the REST connector will go through this function.

However, every call to the API won’t go through this hook because it does not call the `next()` function yet.

To hook every POST request the server makes and put the location from the header inside the body, for example:

```js
module.exports = function(server) {
  var APIConnector;
  APIConnector = server.datasources.APIDataSource.connector;
  return APIConnector.observe('after execute', function(ctx, next) {
    if (ctx.req.method === 'POST') {
      ctx.res.body.location = ctx.res.headers.location;
      return ctx.end(null, ctx, ctx.res.body);
    } else {
      return next();
    }
  });
};
```

The `ctx.end` method needs three arguments: `err`, `ctx`, and `result`. The result is what is sent in the end, when the remote method is called.

{% include note.html title="Caution" content="With the above code, for example, the connector never sends any errors after a POST request for instance. "
%}

To avoid most bugs, specify the cases where you touch `ctx`; for example:

```js
if (ctx.req.method === 'POST'
    && ((ref = ctx.res) != null ? (ref1 = ref.body) != null ? ref1.code : void 0 : void 0) === 200
    && ctx.res.headers.location) {
      // ...
    }
```

#### Error handling

There are many uses of a connector hook, such as reformatting responses from the API, useful for APIs that return XML.  You can also use a connector hook to handle errors from the API before it comes to your model inside your promise.

If you're using an API gateway, every error sent may be a HTTP error `502 Bad Gateway` when it should be `403 Forbidden`.  To avoid confusion between server errors and gateway errors, customize error handling in the hook; for example:

```js
module.exports = function(server) {
  var APIConnector;
  APIConnector = server.datasources.APIDataSource.connector;
  return APIConnector.observe('after execute', function(ctx, next) {
    var err, ref, ref1;
    if (/^[5]/.test((ref = ctx.res) != null ? (ref1 = ref.body) != null ? ref1.code : void 0 : void 0)) {
      err = new Error('Error from the API');
      err.status = 403;
      err.message = ctx.res.body.message;
      return ctx.end(err, ctx, ctx.res.body);
    } else {
      return next();
    }
  });
};
```


### SOAP connector

```
before: {req: {...}, end: ...}
```

```
after: {req: {...}, res: {...}, end: ...}
```

Where:

- `req` is the request object being passed to [request](https://github.com/request/request) module.
- `res` is the response object received from [request](https://github.com/request/request) module.
