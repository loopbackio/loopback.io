---
title: "Storage service API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Storage-service-API.html
summary:
---

Module: loopback-component-storage

*   [Class: StorageService](about:blank#storageservice)
*   [storageService.getContainers](about:blank#storageservice-prototype-getcontainers)
*   [storageService.createContainer](about:blank#storageservice-prototype-createcontainer)
*   [storageService.destroyContainer](about:blank#storageservice-prototype-destroycontainer)
*   [storageService.getContainer](about:blank#storageservice-prototype-getcontainer)
*   [storageService.uploadStream](about:blank#storageservice-prototype-uploadstream)
*   [storageService.downloadStream](about:blank#storageservice-prototype-downloadstream)
*   [storageService.getFiles](about:blank#storageservice-prototype-getfiles)
*   [storageService.getFile](about:blank#storageservice-prototype-getfile)
*   [storageService.removeFile](about:blank#storageservice-prototype-removefile)
*   [storageService.upload](about:blank#storageservice-prototype-upload)
*   [storageService.download](about:blank#storageservice-prototype-download)

<section class="code-doc ">

### Class: StorageService(options)

Storage service constructor. Properties of options object depend on the storage service provider.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options to create a provider; see below.</p>
      </td>
    </tr>
  </tbody>
</table>

options

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">provider</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Storage service provider. Must be one of:</p>
        <ul>
          <li>'filesystem' - local file system.</li>
        </ul>
        <p></p>
        <p></p>
        <li>'amazon'</li>
        <p></p>
        <p></p>
        <li>'rackspace'</li>
        <p></p>
        <p></p>
        <li>'azure'</li>
        <p></p>
        <p></p>
        <li>'openstack'</li>
        <p></p>
        <p>Other supported values depend on the provider. See the <a href="https://docs.strongloop.com/display/LB/Storage+component">documentation</a> for more information.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.createContainer(options, cb)

Create a new storage service container.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options to create a container. Option properties depend on the provider.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

options

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
        <p>Container name</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Object or String</code></td>
      <td>
        <p>Error string or object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Container metadata object</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.destroyContainer(container, callback)

Destroy an existing storage service container.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Container name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Object or String</code></td>
      <td>
        <p>Error string or object</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.download(container, file, req, res, cb)

Download middleware

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Container name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">file</strong></td>
      <td><code>String</code></td>
      <td>
        <p>File name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">req</strong></td>
      <td><code>Request</code></td>
      <td>
        <p>HTTP request</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">res</strong></td>
      <td><code>Response</code></td>
      <td>
        <p>HTTP response</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.downloadStream(container, file, options, callback)

Get the stream for downloading.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Container name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">file</strong></td>
      <td><code>String</code></td>
      <td>
        <p>File name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options for downloading</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>String or Object</code></td>
      <td>
        <p>Error string or object</p>
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
      <td><code>Stream</code></td>
      <td>
        <p>Stream for downloading</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.getContainer(container, callback)

Look up a container metadata object by name.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Container name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Object or String</code></td>
      <td>
        <p>Error string or object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Container metadata object</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.getContainers(callback)

List all storage service containers.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Object or String</code></td>
      <td>
        <p>Error string or object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">containers</strong></td>
      <td><code>Array.&lt;Object&gt;</code></td>
      <td>
        <p>An array of container metadata objects</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.getFile(container, file, cb)

Look up the metadata object for a file by name

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Container name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">file</strong></td>
      <td><code>String</code></td>
      <td>
        <p>File name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Object or String</code></td>
      <td>
        <p>Error string or object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">file</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>File metadata object</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.getFiles(container, [options], cb)

List all files within the given container.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Container name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options for download</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Object or String</code></td>
      <td>
        <p>Error string or object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">files</strong></td>
      <td><code>Array.&lt;Object&gt;</code></td>
      <td>
        <p>An array of file metadata objects</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.removeFile(container, file, cb)

Remove an existing file

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Container name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">file</strong></td>
      <td><code>String</code></td>
      <td>
        <p>File name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Object or String</code></td>
      <td>
        <p>Error string or object</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.upload(req, res, [options], cb)

Upload middleware for the HTTP request/response

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">req</strong></td>
      <td><code>Request</code></td>
      <td>
        <p>Request object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">res</strong></td>
      <td><code>Response</code></td>
      <td>
        <p>Response object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options for upload</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### storageService.uploadStream(container, file, [options], Callback)

Get the stream for uploading

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">container</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Container name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">file</strong></td>
      <td><code>String</code></td>
      <td>
        <p>File name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options for uploading</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">Callback</strong></td>
      <td><code>callback</code></td>
      <td>
        <p>function</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>String or Object</code></td>
      <td>
        <p>Error string or object</p>
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
      <td><code>Stream</code></td>
      <td>
        <p>Stream for uploading</p>
      </td>
    </tr>
  </tbody>
</table>

</section>
