---
title: "Storage component"
lang: en
layout: page
keywords: LoopBack
tags: components
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Storage-component.html
summary:
---

{% include see-also.html content="
* [Storage connector](Storage-connector.html)
* [Storage component API docs](https://apidocs.strongloop.com/loopback-component-storage/)
* [Storage component REST API](Storage-component-REST-API.html)
" %}

## Overview

The [LoopBack storage component](https://github.com/strongloop/loopback-component-storage)
makes it easy to upload and download files to cloud storage providers and the local (server) file system. 
It has Node.js and REST APIs for managing binary content in cloud providers, including:

* Amazon
* Rackspace
* Openstack
* Azure

You use the storage component like any other LoopBack data source such as a database.
Like other data sources, it supports create, read, update, and delete (CRUD) operations with exactly the same LoopBack and REST APIs.

{% include note.html content="
This component does not yet provide metadata management \"out of the box\".
For an example of how to store metadata along with files,
see [How to store files with metadata in LoopBack?](http://stackoverflow.com/questions/28885282/how-to-store-files-with-meta-data-in-loopback)
" %}

## Installation

Install the storage component as usual for a Node package:

```shell
$ npm install loopback-component-storage
```

### Example

For an example of using the storage component, see [https://github.com/strongloop/loopback-example-storage](https://github.com/strongloop/loopback-example-storage). 

{% include tip.html content="
This repository contains two directories: `example-2.0` for the LoopBack 2.x app, and `example`, for the legacy LoopBack 1.x app. 
**Use the version 2.x example** unless you are working with a legacy LoopBack 1.x app.
" %}

Follow these steps to run the LoopBack 2.x example:

```shell
$ git clone https://github.com/strongloop/loopback-example-storage.git
$ cd loopback-example-storage/example-2.0
$ npm install
$ node .
```

Then load [http://localhost:3000](http://localhost:3000/) in your browser.

## Containers and files

The storage component organizes content as _containers_ and _files_. A container holds a collection of files, and each file belongs to one container.

* **Container** groups files, similar to a directory or folder. A container defines the namespace for objects and is uniquely identified by its name, typically within a user account.
  **NOTE**: A container cannot have child containers.
* **File** stores the data, such as a document or image. A file is always in one (and only one) container. Within a container, each file has a unique name.
  Files in different containers can have the same name.

## Creating a storage component data source

You can create a storage component data source either using the command-line tools and the `/server/datasources.json` file or programmatically in JavaScript.

### Using CLI and JSON

Create a new data source as follows:

```shell
$ apic create --type datasource
[?] Enter the data-source name: myfile
[?] Select the connector for myfile: other
[?] Enter the connector name without the loopback-connector- prefix: loopback-component-storage
```

```shell
$ slc loopback:datasource
[?] Enter the data-source name: myfile
[?] Select the connector for myfile: other
[?] Enter the connector name without the loopback-connector- prefix: loopback-component-storage
[?] Install storage (Y/n)
```

Then edit `/server/datasources.json` and manually add the properties of the data source (properties other than "name" and "connector".

For example:

```javascript
"myfile": {
  "name": "myfile",
  "connector": "loopback-component-storage",
  "provider": "amazon",
  "key": "your amazon key",
  "keyId": "your amazon key id"
}
```

### Using JavaScript

You can also create a storage component data source programmatically with the `loopback.createDataSource()` method, putting code in `/server/server.js`. 
For example, using local file system storage:

{% include code-caption.html content="server/server.js" %}
```javascript
var ds = loopback.createDataSource({
    connector: require('loopback-component-storage'),
    provider: 'filesystem',
    root: path.join(__dirname, 'storage')
});

var container = ds.createModel('container');
```

Here's another example, this time for Amazon:

{% include code-caption.html content="server/server.js" %}
```javascript
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

```javascript
module.exports = function(app) { 
  // code to set up data source as shown above 
};
```

### Provider credentials

Each cloud storage provider requires different credentials to authenticate.
Provide these credentials as properties of the JSON object argument to `createDataSource()`, in addition to the `connector` property,
as shown in the following table.

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
      <td>provider: 'amazon'</td>
      <td>&nbsp;</td>
      <td rowspan="3">
        <div class="code panel pdl" style="border-width: 1px;">
          <div class="codeContent panelContent pdl">
            <pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  provider: 'amazon',
  key: '...',
  keyId: '...'
}</pre>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>key<br><br></td>
      <td>Amazon key</td>
    </tr>
    <tr>
      <td>keyId</td>
      <td>Amazon key ID</td>
    </tr>
    <tr>
      <td rowspan="3">
        <p><strong>Rackspace</strong></p>
      </td>
      <td>
        <p>provider: 'rackspace'</p>
      </td>
      <td>&nbsp;</td>
      <td rowspan="3">
        <div class="code panel pdl" style="border-width: 1px;">
          <div class="codeContent panelContent pdl">
            <pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  provider: 'rackspace',
  username: '...',
  apiKey: '...'
}</pre>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td>Your username</td>
    </tr>
    <tr>
      <td>apiKey</td>
      <td>Your API key</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>Azure</strong></td>
      <td>
        <p>provider: 'azure'</p>
      </td>
      <td>&nbsp;</td>
      <td rowspan="3">
        <div class="code panel pdl" style="border-width: 1px;">
          <div class="codeContent panelContent pdl">
            <pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
 provider: 'azure',
 storageAccount: '...',
 storageAccessKey: '...'
}</pre>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>storageAccount</td>
      <td>Name of your storage account</td>
    </tr>
    <tr>
      <td>storageAccessKey</td>
      <td>Access key for storage account</td>
    </tr>
    <tr>
      <td rowspan="4"><strong>OpenStack</strong></td>
      <td>provider: 'openstack'</td>
      <td>&nbsp;</td>
      <td rowspan="4">
        <div class="code panel pdl" style="border-width: 1px;">
          <div class="codeContent panelContent pdl">
            <pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
 provider: 'openstack',
 username: '...',
 password: '...',
 authUrl: 'https://your-identity-service'
}</pre>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td>Your username</td>
    </tr>
    <tr>
      <td>password</td>
      <td>Your password</td>
    </tr>
    <tr>
      <td>authUrl</td>
      <td>Your identity service</td>
    </tr>
    <tr>
      <td rowspan="2"><strong>Local File System</strong></td>
      <td>provider: 'filesystem'</td>
      <td>&nbsp;</td>
      <td rowspan="2">
        <div class="code panel pdl" style="border-width: 1px;">
          <div class="codeContent panelContent pdl">
            <pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  provider: 'filesystem',
  root: '/tmp/storage',
  maxFileSize: "10485760"
}</pre>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>root</td>
      <td>File path to storage root directory.</td>
    </tr>
  </tbody>
</table>

**API**

Once you create a container, it will provide both a REST and Node API, as described in the following table.
For details, see the complete [API documentation](http://apidocs.strongloop.com/loopback-component-storage/).

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
