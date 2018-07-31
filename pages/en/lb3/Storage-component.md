---
title: "Storage component"
lang: en
layout: navgroup
navgroup: storage
keywords: LoopBack
tags: components
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Storage-component.html
summary: The LoopBack storage component enables you to upload and download files to cloud storage providers and the local (server) file system.  It has Node.js and REST APIs.
---

## Overview

The [LoopBack storage component](https://github.com/strongloop/loopback-component-storage)
makes it easy to upload and download files to cloud storage providers and the local (server) file system. 
It has Node.js and REST APIs for managing binary content in cloud providers, including:

* Amazon
* Azure
* Google Cloud
* Openstack
* Rackspace

You use the storage component like any other LoopBack data source such as a database.
Like other data sources, it supports create, read, update, and delete (CRUD) operations with exactly the same LoopBack and REST APIs.

{% include warning.html content="
The LoopBack storage component uses [formidable](https://www.npmjs.com/package/formidable) for parsing forms, use of other form-parsing middleware in your app can lead to unexpected results.
" %}

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
  Files in different containers can have the same name. By default, files with the same name will overwrite each other.

## Creating a storage component data source

You can create a storage component data source either using the command-line tools and the `/server/datasources.json` file or programmatically in JavaScript.

### Using CLI and JSON

Create a new data source as follows:

```
$ lb datasource
[?] Enter the data-source name: myfile
[?] Select the connector for myfile: other
[?] Enter the connector name without the loopback-connector- prefix: loopback-component-storage
[?] Install storage (Y/n)
```

Using IBM API Connect v5 developer toolkit, use this command:

```
$ apic create --type datasource
...
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


<table width="800">
  <thead>
    <tr>
      <th>Provider</th>
      <th>Property</th>
      <th>Description</th>
      <th width="350">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">
        <strong>Amazon</strong>
      </td>
      <td>provider</td>
      <td>'amazon'</td>
      <td rowspan="3">
<pre style="font-size:11px;">{
  provider: 'amazon',
  key: '...',
  keyId: '...'
}</pre>
      </td>
    </tr>
    <tr>
      <td>key</td>
      <td>Amazon key</td>
    </tr>
    <tr>
      <td>keyId</td>
      <td>Amazon key ID</td>
    </tr>
    <tr>
      <td rowspan="3">
        <strong>Rackspace</strong>
      </td>
      <td>provider</td>
      <td>'rackspace'</td>
      <td rowspan="3">
<pre style="font-size:11px;">{
  provider: 'rackspace',
  username: '...',
  apiKey: '...'
}</pre>
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
      <td>provider</td>
      <td>'azure'</td>
      <td rowspan="3">
<pre style="font-size:11px;">{
 provider: 'azure',
 storageAccount: '...',
 storageAccessKey: '...'
}</pre>
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
      <td>provider</td>
      <td>'openstack'</td>
      <td rowspan="4">
<pre style="font-size:11px;">{
 provider: 'openstack',
 username: '...',
 password: '...',
 authUrl: 'https://your-identity-service'
}</pre>
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
      <td rowspan="3"><strong>Google Cloud</strong></td>
      <td>provider</td>
      <td>'google'</td>
      <td rowspan="3">
<pre style="font-size:11px;">{
 provider: 'google',
 keyFilename: 'path/to/keyfile.json',
 projectId: '...',
 nameConflict: 'makeUnique'
}</pre>
      </td>
    </tr>
    <tr>
      <td>keyFilename</td>
      <td>Path to key file.</td>
    </tr>
    <tr>
      <td>projectID</td>
      <td>Google Cloud project ID.</td>
    </tr>

    <tr>
      <td rowspan="2"><strong>Local File System</strong></td>
      <td>provider</td>
      <td>'filesystem'</td>
      <td rowspan="2">
<pre style="font-size:11px;">{
  provider: 'filesystem',
  root: '/tmp/storage',
  nameConflict: 'makeUnique'
}</pre>
      </td>
    </tr>
    <tr>
      <td>root</td>
      <td>File path to storage root directory.</td>
    </tr>
  </tbody>
</table>


## Automatic Unique Filenames

As documented above, a file uploaded with the same name as an existing file will be overwritten. By adding the configuration key `nameConflict` with the value `makeUnique`, files will automatically be renamed with a UUID and the existing file extension of the original file name. Most likely this is an option that you will want to enable, otherwise you will need to ensure uniqueness on the code calling the API.

## Renaming files

You can rename files being uploaded before they reach their destination - file system or cloud - by setting the `getFilename` function in its datasource options. This can be done either in a model file or in a boot script, or anywhere you can access the datasource object.

`getFilename` has a signature of `getFilename(uploadingFile, req, res)`, where `uploadingFile` is an object containing the details of the uploading file, `req` is the request object, and `res` is the response object.

The string returned by `getFilename` will become the new name of the file.

Below are two examples of setting the `getFilename` option for a datasource named `files`.

1. Renaming using a model file (`User` is the model):

```
module.exports = function(User) {
  User.getApp(function (err, app) {
    if (err) return err;
    app.dataSources.files.connector.getFilename = function(uploadingFile, req, res) {
      return Math.random().toString().substr(2) + '.jpg';
    };
  });
};
```

2. Renaming using a boot script (`./server/boot/storage-config.js`):

```
module.exports = function(app) {
  app.dataSources.files.connector.getFilename = function(uploadingFile, req, res) {
    return Math.random().toString().substr(2) + '.jpg';
  };
};
```

## API

Once you create a container, it will provide both a REST and Node API, as described in the following table. For details, see the complete [API documentation](http://apidocs.loopback.io/loopback-component-storage/).


<table >
  <thead>
    <tr>
      <th>Description</th>
      <th width="320">Container Model Method</th>
      <th>REST URI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>List all containers.</td>
      <td>
        getContainers(cb)
      </td>
      <td>GET<br>/api/containers</td>
    </tr>
    <tr>
      <td>Get information about specified container.</td>
      <td>getContainer(container, cb)</td>
      <td>GET<br>/api/containers/:container</td>
    </tr>
    <tr>
      <td>Create a new container.</td>
      <td>createContainer(options, cb)</td>
      <td>POST<br>/api/containers</td>
    </tr>
    <tr>
      <td>Delete specified container.</td>
      <td>destroyContainer(container, cb)</td>
      <td>DELETE<br>/api/containers/:container</td>
    </tr>
    <tr>
      <td>List all files within specified container.</td>
      <td>getFiles(container, download, cb)</td>
      <td>GET<br>/api/containers/:container/files</td>
    </tr>
    <tr>
      <td>Get information for specified file within specified container.</td>
      <td>getFile(container, file, cb)</td>
      <td>GET<br>/api/containers/:container/files/:file</td>
    </tr>
    <tr>
      <td>Delete a file within a given container by name.</td>
      <td>removeFile(container, file, cb)</td>
      <td>DELETE /api/containers/:container/files/:file</td>
    </tr>
    <tr>
      <td>Upload one or more files into the specified container. The request body must use multipart/form-data which is the file input type for HTML uses.</td>
      <td>upload(container, req, res, cb)</td>
      <td>POST<br>/api/containers/:container/upload</td>
    </tr>
    <tr>
      <td>Download a file within specified container.</td>
      <td>download(container, file, req, res, cb)</td>
      <td>GET<br>/api/containers/:container/download/:file</td>
    </tr>
    <tr>
      <td>Get a stream for uploading.</td>
      <td>uploadStream(container, file, options, cb)</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Get a stream for downloading.</td>
      <td>downloadStream(container, file, options, cb)</td>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>
