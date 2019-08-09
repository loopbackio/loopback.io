# loopback-connector-remote

The remote connector enables you to use a LoopBack application as a data source via REST.
You can use the remote connector with a LoopBack application, a Node application, or a browser-based application that uses [LoopBack in the client](LoopBack-in-the-client.html).
The connector uses [Strong Remoting](Strong-Remoting.html).

In general, using the remote connector is more convenient than calling into REST API, and enables you to switch the transport later if you need to.

Use loopback-connector-remote:
- Version 3.x with LoopBack v3 and later.
- Prior versions with LoopBack v2.

## Installation

In your application root directory, enter:

```shell
$ npm install loopback-connector-remote --save
```

This will install the module and add it as a dependency to the application's [`package.json`](http://loopback.io/doc/en/lb3/package.json.html) file.

## Creating a remote data source

Create a new remote data source with the [datasource generator](http://loopback.io/doc/en/lb3/Data-source-generator.html):

```shell
$ lb datasource
```

When prompted:

* For connector, scroll down and select **other**.
* For connector name without the loopback-connector- prefix, enter **remote**.

This creates an entry in `datasources.json`; Then you need to edit this to add the data source properties, for example:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
...
 "myRemoteDataSource": {
    "name": "myRemoteDataSource",
    "connector": "remote",
    "url": "http://localhost:3000/api"
  }
 ...
```

The `url` property specifies the root URL of the LoopBack API.
If you do not specify a `url` property, the remote connector will point to it's own host name, port it's running on, etc.

The connector will generate models on the myRemoteDataSource datasource object based on the models/methods exposed from the remote service.  Those models will have methods attached that are
from the model's remote methods.  So if the model `foo` exposes a remote method called `bar`,
the connector will automatically generate the following:

`app.datasources.myRemoteDataSource.models.foo.bar()`

### Access it in any model file

To access the remote Loopback service in a model:

```javascript
module.exports = function(Message) {

  Message.test = function (cb) {
    Message.app.datasources.myRemoteDataSource.models.
      SomeModel.remoteMethodNameHere(function () {});

    cb(null, {});
  };

};
```

## Remote data source properties

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th width="100">Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>host</td>
      <td>String</td>
      <td>Hostname of <span>LoopBack</span> application <span>providing remote data source.</span></td>
    </tr>
    <tr>
      <td>port</td>
      <td>Number</td>
      <td>Port number of <span>LoopBack</span> application providing remote <span>data source</span>.</td>
    </tr>
    <tr>
      <td>root</td>
      <td>String</td>
      <td>Path to API root of <span>LoopBack application providing remote <span>data source</span>.</span></td>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>Full URL of <span>LoopBack application providing remote connector.
        Use instead of host, port, and root properties.</span>
      </td>
    </tr>
  </tbody>
</table>

## Configuring authentication

The remote connector does not support JSON-based configuration of the authentication credentials (see [issue #3](https://github.com/strongloop/loopback-connector-remote/issues/3)).
You can use the following code as a workaround. It assumes that your data source is called "remote" and the AccessToken id is provided in the variable "token".

```javascript
app.dataSources.remote.connector.remotes.auth = {
  bearer: new Buffer(token).toString('base64'),
  sendImmediately: true
};
```

## Using with MongoDB connector

When using the MongoDB connector on the server and a remote connector on the client,
use the following `id` property:

```javascript
"id": {
  "type": "string",
  "generated": true,
  "id": true
}
```
