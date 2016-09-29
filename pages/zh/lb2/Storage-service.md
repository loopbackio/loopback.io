---
title: "Storage service"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Storage-service.html
summary:
---

**See also**:

See also:

*   [Storage service REST API](/doc/{{page.lang}}/lb2/Storage-service-REST-API.html)
*   [Storage service API](/doc/{{page.lang}}/lb2/Storage-service-API.html)

## Overview

[LoopBack storage service](https://github.com/strongloop/loopback-component-storage) makes it easy to upload and download files to cloud storage providers and the local (server) file system. It has Node.js and REST APIs for managing binary content in cloud providers, including:

*   Amazon
*   Rackspace
*   Openstack
*   Azure

You use the storage service like any other LoopBack data source such as a database.  Like other data sources, it supports create, read, update, and delete (CRUD) operations with exactly the same LoopBack and REST APIs.

## Installation

Install the storage service component as usual for a Node package:

`$ npm install loopback-component-storage`

## Containers and files

The storage service organizes content as _containers_ and _files_. A container holds a collection of files, and each file belongs to one container.

*   **Container** groups files, similar to a directory or folder. A container defines the namespace for objects and is uniquely identified by its name, typically within a user account.  NOTE: A container cannot have child containers.
*   **File** stores the data, such as a document or image. A file is always in one (and only one) container. Within a container, each file has a unique name. Files in different containers can have the same name.

## Creating a storage service data source

You can create a storage service data source either using slc and the `/server/datasources.json` file or programmatically in JavaScript.

### Using slc and JSON

Create a new data source as follows:

```
$ slc loopback:datasource
[?] Enter the data-source name: myfile
[?] Select the connector for myfile: other
[?] Enter the connector name without the loopback-connector- prefix: loopback-component-storage
```

Then edit `/server/datasources.json` and manually add the properties of the data source (properties other than "name" and "connector"; for example:

```js
"myfile": {
   "name": "myfile",
   "connector": "loopback-component-storage",
   "provider": "amazon",
   "key": "your amazon key",
   "keyId": "your amazon key id"
 }
```

### Using JavaScript

You can also create a storage service data source programmatically with the `loopback.createDataSource()` method, putting code in `/server/server.js`. For example, using local file system storage:

**server/server.js**

```js
var ds = loopback.createDataSource({
  connector: require('loopback-component-storage'),
  provider: 'filesystem',
  root: path.join(__dirname, 'storage')
});

var container = ds.createModel('container');
```

Here's another example, this time for Amazon:

**server/server.js**

```js
var ds = loopback.createDataSource({
  connector: require('loopback-component-storage'),
  provider: 'amazon',
  key: 'your amazon key',
  keyId: 'your amazon key id'
});
var container = ds.createModel('container');
app.model(container);
```

You can also put this code in the `/server/boot` directory, as an exported function:

```js
module.exports = function(app) { 
  // code to set up data source as shown above 
};
```

### Provider credentials

Each cloud storage provider requires different credentials to authenticate.  Provide these credentials as properties of the JSON object argument to `createDataSource()`, in addition to the `connector` property, as shown in the following table.

<table>
  <tbody>
    <tr>
      <th>Provider</th>
      <th>Property</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
    <tr>
      <td rowspan="3">
        <p><strong>Amazon</strong></p>
        <p>&nbsp;</p>
      </td>
      <td><span>provider: 'amazon'</span></td>
      <td>&nbsp;</td>
      <td rowspan="3"><code>{<br>provider: 'amazon',&nbsp;</code><br><code>key: '...',&nbsp;</code><br><code>keyId: '...'<br>}</code></td>
    </tr>
    <tr>
      <td><span>key</span><br><br></td>
      <td>Amazon key</td>
    </tr>
    <tr>
      <td><span>keyId</span></td>
      <td><span>Amazon key ID</span></td>
    </tr>
    <tr>
      <td rowspan="3">
        <p><strong>Rackspace</strong></p>
      </td>
      <td>
        <p>provider: 'rackspace'</p>
      </td>
      <td>&nbsp;</td>
      <td rowspan="3"><code>{<br>provider: 'rackspace',&nbsp;</code><br><code>username: '...',&nbsp;</code><br><code>apiKey: '...'<br>}</code></td>
    </tr>
    <tr>
      <td><span>username</span></td>
      <td>Your username</td>
    </tr>
    <tr>
      <td><span>apiKey</span></td>
      <td>Your API key</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>Azure</strong></td>
      <td>
        <p><span>provider: 'azure'</span></p>
      </td>
      <td>&nbsp;</td>
      <td rowspan="3"><code><span>{<br>provider: 'azure',<br></span><span>storageAccount: "test-storage-account",</span></code><br><code><span>storageAccessKey: "test-storage-access-key"<br>}</span></code></td>
    </tr>
    <tr>
      <td><span>storageAccount</span></td>
      <td><span>Name of your storage account</span></td>
    </tr>
    <tr>
      <td><span>storageAccessKey</span></td>
      <td><span>Access key for storage account</span></td>
    </tr>
    <tr>
      <td rowspan="4"><strong>OpenStack</strong></td>
      <td><span>provider: 'openstack'<br></span></td>
      <td>&nbsp;</td>
      <td rowspan="4"><code><span>{<br>provider: 'openstack',</span></code><br><code><span>username: 'your-user-name',</span></code><br><code><span>password: 'your-password',</span></code><br><code><span>authUrl: '</span><span class="nolink"><span class="nolink">https://your-identity-service</span></span><span>'<br>}</span></code></td>
    </tr>
    <tr>
      <td><span>username</span></td>
      <td>Your username</td>
    </tr>
    <tr>
      <td><span>password</span></td>
      <td>Your password</td>
    </tr>
    <tr>
      <td><span>authUrl</span></td>
      <td>Your identity service</td>
    </tr>
    <tr>
      <td rowspan="2"><strong>Local File System</strong></td>
      <td>provider: 'filesystem'</td>
      <td>&nbsp;</td>
      <td rowspan="2">
        <p><code>{<br>provider: 'filesystem',</code><br><code>root: '/tmp/storage'<br>}</code></p>
      </td>
    </tr>
    <tr>
      <td><span>root</span></td>
      <td>File path to storage root directory.</td>
    </tr>
  </tbody>
</table>

## API

Once you create a container, it will provide both a REST and Node API, as described in the following table.  For details, see the complete [API documentation](http://apidocs.strongloop.com/loopback-component-storage/).

<table>
  <tbody>
    <tr>
      <th>Description</th>
      <th>
        <p>Container Model Method</p>
      </th>
      <th>REST URI</th>
    </tr>
    <tr>
      <td>List all containers.</td>
      <td>
        <p>getContainers(cb)</p>
        <div style="300px;">
          <p>&nbsp;</p>
        </div>
      </td>
      <td><span>GET<br></span><span>/api/containers</span></td>
    </tr>
    <tr>
      <td>Get information about specified container.</td>
      <td>getContainer(container, cb)</td>
      <td><span>GET<br></span><span>/api/containers/:container</span></td>
    </tr>
    <tr>
      <td>Create a new container.</td>
      <td>createContainer(options, cb)</td>
      <td><span>POST<br></span><span>/api/containers</span></td>
    </tr>
    <tr>
      <td>Delete specified container.</td>
      <td>destroyContainer(container, cb)</td>
      <td><span>DELETE<br></span><span>/api/containers/:container</span></td>
    </tr>
    <tr>
      <td>List all files within specified container.</td>
      <td>getFiles(container, download, cb)</td>
      <td><span>GET<br></span><span>/api/containers/:container/files</span></td>
    </tr>
    <tr>
      <td>Get information for specified file within specified container.</td>
      <td>getFile(container, file, cb)</td>
      <td><span>GET<br></span><span>/api/containers/:container/files/:file</span></td>
    </tr>
    <tr>
      <td>Delete a file within a given container by name.</td>
      <td>removeFile(container, file, cb)</td>
      <td><span>DELETE </span><span>/api/containers/:container/files/:file</span></td>
    </tr>
    <tr>
      <td>Upload one or more files into the specified container. The request body must use multipart/form-data which the file input type for HTML uses.</td>
      <td>upload(req, res, cb)</td>
      <td><span>POST<br></span><span>/api/containers/:container/upload</span></td>
    </tr>
    <tr>
      <td>Download a file within specified container.</td>
      <td>download(container, file, res, cb)</td>
      <td><span>GET<br></span><span>/api/containers/:container/download/:file</span></td>
    </tr>
    <tr>
      <td>Get a stream for uploading.</td>
      <td><span>uploadStream(container, file, options, cb)</span></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Get a stream for downloading.</td>
      <td><span>downloadStream(container, file, options, cb)</span></td>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>

## Example

For an example of using the storage service, see the [LoopBack Storage Service GitHub repository](https://github.com/strongloop/loopback-component-storage/tree/master/example).

Follow these steps to run the example:

```
$ git clone http://github.com/strongloop/loopback-component-storage.git
$ cd loopback-component-storage
$ npm install
$ node example/app
```

Then load [http://localhost:3000](http://localhost:3000/) in your browser.
