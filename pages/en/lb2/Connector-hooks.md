---
title: "Connector hooks"
lang: en
layout: navgroup
navgroup: app-logic
keywords: LoopBack
tags: application_logic
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Connector-hooks.html
summary: Connector hooks are triggered by actions of connectors.
---
## Overview

Connectors are responsible for interacting with the backend systems on behalf of model methods.
Connector hooks enable applications to intercept the connector execution.

## Hooks

### before execute

The 'before execute' hook is invoked before a connector sends a request to the backend.

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

The 'after execute' hook is invoked after the connector receives a response from the backend.

```javascript
connector.observe('after execute', function(ctx, next) {
  // ...
  next();
});
```

## Context

The context object contains information for the hooks to act on. It varies based on the type of connectors. 

### SQL based connectors (MySQL, PostgreSQL, SQL Server, Oracle)

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

_req.command_ is the command for the [mongodb collection](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html).

_req.params_ is the parameters passing to the [mongodb driver](https://github.com/mongodb/node-mongodb-native).

_res_ is the object received from the [mongodb driver](https://github.com/mongodb/node-mongodb-native).

### REST connector

```
before: {req: {...}, end: ...}
```

```
after: {req: {...}, res: {...}, end: ...}
```

_req_ is the object passing to [request](https://github.com/request/request) module.

_res_ is the object received from [request](https://github.com/request/request) module.

### SOAP connector

```
before: {req: {...}, end: ...}
```

```
after: {req: {...}, res: {...}, end: ...}
```

_req_ is the object passing to [request](https://github.com/request/request) module.

_res_ is the object received from [request](https://github.com/request/request) module.
