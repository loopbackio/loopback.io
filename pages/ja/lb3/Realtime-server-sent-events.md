---
title: "Realtime server-sent events"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Realtime-server-sent-events.html
summary:
---

## Overview

The [PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel) API supports streaming changes from servers to clients using a combination
of the CRUD methods and the [`createChangeStream()`](http://apidocs.loopback.io/loopback/#persistedmodel-createchangestream) method.

A ChangeStream enables a server to send model changes to a client. A client makes an initial request to be notified of changes and then the server "pushes" these changes to the client.

## Creating ChangeStreams on the server

### Setup

First, add event-stream to your Node app as follows:

```shell
$ npm install -save event-stream
```

This will add a line something like this to the app's `package.json` file:

```javascript
...
"event-stream": "^3.3.1",
...
```

### Disable compression

Event streams don't work with [Node compression](https://www.npmjs.com/package/compression).
To disable npm compression, delete the entry from `server/middleware.json` so it looks like this:

```javascript
...
"compression": {
  "enabled":false
},
...
```

### Script

Below is a basic example using the `createChangeStream()` method in a LoopBack application.

{% include code-caption.html content="server/boot/realtime.js" %}
```javascript
var es = require('event-stream');
module.exports = function(app) {
  var MyModel = app.models.MyModel;
  MyModel.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });
  MyModel.create({
    foo: 'bar'
  });
}
```

This example will print the following to the console:

```javascript
{"target":1,"data":{"foo":"bar","id":1},"type":"create"}
```

## Pushing data to clients

This example shows how to consume the `ChangeStream` from a browser using the [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) API,
which is built in to JavaScript implemented in most browsers.
The example code below assumes a model called `MyModel` and simply logs the response to the browser JavaScript console.

{% include code-caption.html content="Browser script" %}
```javascript
var urlToChangeStream = '/api/MyModels/change-stream?_format=event-stream';
var src = new EventSource(urlToChangeStream);
src.addEventListener('data', function(msg) {
  var data = JSON.parse(msg.data);
  console.log(data); // the change object
});
```

To push data, the model on the server must change; for example, if you add a new record (model instance).

When this occurs, then in the browser JavaScript console, you will see (for example):

```javascript
Object {target: 2, data: Object, type: "create"}
```

## Using ChangeStreams in AngularJS

The [angular-live-set](https://github.com/strongloop/angular-live-set) module makes it easy to use `ChangeStream` in your AngularJS applications.
