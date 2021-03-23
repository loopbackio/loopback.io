---
title: "Remote connector"
lang: en
layout: page
keywords: LoopBack
tags: connectors
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Remote-connector.html
summary: The remote connector enables you to use a LoopBack application as a data source via REST.
---

**See also**: [Example application](https://github.com/strongloop/loopback-example-connector/tree/remote)

The remote connector enables you to use a LoopBack application as a data source via REST.
The client can be a LoopBack application, a Node application, or a browser-based application running [LoopBack in the client](LoopBack-in-the-client.html).
The connector uses [Strong Remoting](Strong-Remoting.html).

In general, using the remote connector is more convenient than calling into REST API, and enables you to switch the transport later if you need to.

## Installation

In your application root directory, enter:

```shell
$ npm install loopback-connector-remote --save
```

This will install the module and add it as a dependency to the application's [`package.json`](package.json.html) file.

## Creating an remote data source

Create a new remote data source with the [datasource generator](Data-source-generator.html):

```shell
$ apic create --type datasource
```

```shell
$ slc loopback:datasource
```

When prompted:

* For connector, scroll down and select **other**.
* For connector name without the loopback-connector- prefix, enter **remote**.

This creates an entry in `datasources.json`; Then you need to edit this to add the data source properties, for example:

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

## Remote data source properties

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
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

The remote connector does not support JSON-based configuration of the authentication credentials; see [issue #3](https://github.com/strongloop/loopback-connector-remote/issues/3).
You can use the following code as a workaround. It assumes that your data source is called "remote" and the AccessToken id is provided in the variable "token".

```javascript
app.dataSources.remote.connector.remotes.auth = {
  bearer: new Buffer(token).toString('base64'),
  sendImmediately: true
};
```

## Using with MongoDB connector

When using the **MongoDB** connector on the server and a **Remote** connector on the client, the following **id** property should be used.

```javascript
"id": {"type": "string", "generated": true, "id": true}
```
