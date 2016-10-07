---
title: "Remote connector"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Remote-connector.html
summary:
---

**See also**: Example application: [loopback-example-remote](https://github.com/strongloop/loopback-example-remote)

The remote connector enables you to use a LoopBack application as a data source via REST.  The client can be a LoopBack application, a Node application, or a browser-based application running [LoopBack in the client](/doc/{{page.lang}}/lb2/LoopBack-in-the-client.html).  The connector uses [Strong Remoting](https://docs.strongloop.com/display/LB/Strong+Remoting).

In general, using the remote connector is more convenient than calling into REST API, and enables you to switch the transport later if you need to.

## Installation

In your application root directory, enter:

`$ npm install loopback-connector-remote --save`

This will install the module and add it as a dependency to the application's [`package.json`](http://docs.strongloop.com/display/LB/package.json) file.

## Creating an remote data source

Create a new remote data source with the [datasource generator](/doc/{{page.lang}}/lb2/Data-source-generator.html):

`$ slc loopback:datasource`

When prompted:

*   For connector, scroll down and select **other**.  
*   For connector name without the loopback-connector- prefix, enter **remote**.

This creates an entry in `datasources.json`; Then you need to edit this to add the data source properties, for example:

**/server/datasources.json**

```js
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
      <td>Path to API root of <span>LoopBack application providing remote <span>data source</span>.</span>
      </td>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>Full URL of <span>LoopBack application providing remote connector. Use instead of host, port, and root properties.</span></td>
    </tr>
  </tbody>
</table>

## Example

The example has the following structure:

*   `server`: A LoopBack application that connects to a backend data source (just the in-memory data source here) and provides a CRUD API (both Node and REST) to interact with the data source.
*   `client`: A Node application that connects to the LoopBack server application using the [remote connector](https://github.com/strongloop/loopback-connector-remote). This acts as a very simple Node client SDK for LoopBack.
*   `common/models`: Model definitions shared between client and server applications. Using a shared model definition ensures that client and server expect the same model structures. This simple example defines only one model: `Person`, with a single property, `name`.
*   `examples`: Contains examples of using the Node SDK in `client` to connect to the server API.
    *   `create.js`: A simple example script that creates a new Person record (instance).

### How to run the example

Initially, you need to run `npm install` to install all the dependencies for both client and server.
Then, start the server application.

```
$ cd client
$ npm install
$ cd ../server
$ npm install
$ slc run
```

Now in another shell, run the example that uses the client "SDK."

```
$ cd loopback-example-remote
$ node examples/create.js
Created Person...
{ name: 'Fred', id: 1 }
```

Now open LoopBack Explorer at [http://0.0.0.0:3001/explorer/](http://0.0.0.0:3001/explorer/).

This provides a view into the server application REST API.

Go to [http://0.0.0.0:3001/explorer/#!/People/find](http://0.0.0.0:3001/explorer/#!/People/find) to expand the `GET /People` operation. Then click**Try it!**.

In **Response Body**, you will see the record that `create.js` created via the Node client SDK:

```js
[{
  "name": "Fred",
  "id": 1
}]
```
