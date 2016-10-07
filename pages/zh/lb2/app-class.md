---
title: "app class"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/app-class.html
summary:
---

Module: loopback

*   [Class: LoopBackApplication](about:blank#var-app-loopback)
*   [app.remotes](about:blank#app-remotes)
*   [app.model](about:blank#app-model)
*   [app.models](about:blank#app-models)
*   [app.dataSource](about:blank#app-datasource)
*   [app.connector](about:blank#app-connector)
*   [app.remoteObjects](about:blank#app-remoteobjects)
*   [app.dataSources](about:blank#app-datasources)
*   [app.enableAuth](about:blank#app-enableauth)
*   [app.listen](about:blank#app-listen)

<section class="code-doc ">

### var app = loopback()

#### LoopBackApplication

The `App` object represents a Loopback application.

The App object extends [Express](http://expressjs.com/api.html#express) and supports Express middleware. See [Express documentation](http://expressjs.com/) for details.

```js
var loopback = require('loopback');
var app = loopback();

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(3000);
```
</section>

<section class="code-doc ">

#### app.connector(name, connector)

Register a connector.

When a new data-source is being added via `app.dataSource`, the connector name is looked up in the registered connectors first.

Connectors are required to be explicitly registered only for applications using browserify, because browserify does not support dynamic require, which is used by LoopBack to automatically load the connector module.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">name</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Name of the connector, e.g. 'mysql'.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">connector</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Connector object as returned by <code>require('loopback-connector-{name}')</code>.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### app.dataSource(name, config)

Define a DataSource.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">name</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The data source name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">config</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>The data source config</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### app.enableAuth()

Enable app wide authentication.

</section>

<section class="code-doc ">

#### app.listen([cb])

Listen for connections and update the configured port.

When there are no parameters or there is only one callback parameter, the server will listen on `app.get('host')` and `app.get('port')`.

For example, to listen on host/port configured in app config:

`app.listen();`

Otherwise all arguments are forwarded to `http.Server.listen`.

For example, to listen on the specified port and all hosts, and ignore app config.

`app.listen(80);`

The function also installs a `listening` callback that calls `app.set('port')` with the value returned by `server.address().port`. This way the port param contains always the real port number, even when listen was called with port number 0.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[cb]</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>If specified, the callback is added as a listener for the server's "listening" event.</p>
      </td>
    </tr>
  </tbody>
</table>

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>http.Server</code></td>
      <td>
        <p>A node <code>http.Server</code> with this application configured as the request handler.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### app.model(Model, config)

Attach a model to the app. The `Model` will be available on the `app.models` object.

Example - Attach an existing model:

```js
var User = loopback.User;
app.model(User);
```

Example - Attach an existing model, alter some aspects of the model:

```js
var User = loopback.User;
app.model(User, {
  dataSource: 'db'
});
```

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">Model</strong></td>
      <td><code>Object or String</code></td>
      <td>
        <p>The model to attach.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">config</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>The model's configuration.</p>
      </td>
    </tr>
  </tbody>
</table>

config

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">dataSource</strong></td>
      <td><code>String or DataSource</code></td>
      <td>
        <p>The <code>DataSource</code> to which to attach the model.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[public]</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Whether the model should be exposed via REST API.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[relations]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Relations to add/update.</p>
      </td>
    </tr>
  </tbody>
</table>

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>ModelConstructor</code></td>
      <td>
        <p>the model class</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### app.models()

Get the models exported by the app. Returns only models defined using `app.model()`

There are two ways to access models:

1.  Call `app.models()` to get a list of all models.

```js
var models = app.models();

models.forEach(function(Model) {
  console.log(Model.modelName); // color
});
```

1.  Use `app.model` to access a model by name. `app.models` has properties for all defined models.

The following example illustrates accessing the `Product` and `CustomerReceipt` models using the `models` object.

```js
var loopback = require('loopback');
var app = loopback();
app.boot({
  dataSources: {
    db: {
      connector: 'memory'
    }
  }
});

app.model('product', {
  dataSource: 'db'
});
app.model('customer-receipt', {
  dataSource: 'db'
});

// available based on the given name
var Product = app.models.Product;

// also available as camelCase
var product = app.models.product;

// multi-word models are avaiable as pascal cased
var CustomerReceipt = app.models.CustomerReceipt;

// also available as camelCase
var customerReceipt = app.models.customerReceipt;
```

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>Array</code></td>
      <td>
        <p>Array of model classes.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### app.remoteObjects()

Get all remote objects.

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>Object</code></td>
      <td>
        <p><a href="http://apidocs.strongloop.com/strong-remoting/#remoteobjectsoptions">Remote objects</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### app.remotes()

Lazily load a set of [remote objects](http://apidocs.strongloop.com/strong-remoting/#remoteobjectsoptions).

**NOTE:** Calling `app.remotes()` more than once returns only a single set of remote objects.

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>RemoteObjects</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>
