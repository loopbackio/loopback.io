---
title: "Model class"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Model-class.html
summary:
---

Module: loopback

*   [Class: Model](about:blank#model)
*   [Model.setup](about:blank#model-setup)
*   [Model.checkAccess](about:blank#model-checkaccess)
*   [Model.getApp](about:blank#model-getapp)
*   [Model.remoteMethod](about:blank#model-remotemethod)
*   [Model.disableRemoteMethod](about:blank#model-disableremotemethod)
*   [Model.nestRemoting](about:blank#model-nestremoting)

<section class="code-doc ">

### Class: Model(data)

The base class for **all models**.

**Inheriting from `Model`**

```
var properties = {...};
var options = {...};
var MyModel = loopback.Model.extend('MyModel', properties, options);
```

**Options**

*   `trackChanges` - If true, changes to the model will be tracked. **Required for replication.**

**Events**

#### Event: `changed`

Emitted after a model has been successfully created, saved, or updated. Argument: `inst`, model instance, object

```js
MyModel.on('changed', function(inst) {
  console.log('model with id %s has been changed', inst.id);
  // => model with id 1 has been changed
});
```

#### Event: `deleted`

Emitted after an individual model has been deleted. Argument: `id`, model ID (number).

```js
MyModel.on('deleted', function(id) {
  console.log('model with id %s has been deleted', id);
  // => model with id 1 has been deleted
});
```

#### Event: `deletedAll`

Emitted after an individual model has been deleted. Argument: `where` (optional), where filter, JSON object.

```js
MyModel.on('deletedAll', function(where) {
  if (where) {
    console.log('all models where ', where, ' have been deleted');
    // => all models where
    // => {price: {gt: 100}}
    // => have been deleted
  }
});
```

#### Event: `attached`

Emitted after a `Model` has been attached to an `app`.

#### Event: `dataSourceAttached`

Emitted after a `Model` has been attached to a `DataSource`.

#### Event: set

Emitted when model property is set. Argument: `inst`, model instance, object

```js
MyModel.on('set', function(inst) {
  console.log('model with id %s has been changed', inst.id);
  // => model with id 1 has been changed
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
      <td><strong class="code-arg-name">data</strong></td>
      <td><code>Object</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

Class Properties

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">Model.modelName</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The name of the model. Static property.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">Model.dataSource</strong></td>
      <td><code>DataSource</code></td>
      <td>
        <p>Data source to which the model is connected, if any. Static property.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">Model.sharedMethod</strong></td>
      <td><code>SharedClass</code></td>
      <td>
        <p>The <code>strong-remoting</code> <a href="http://apidocs.strongloop.com/strong-remoting/#sharedclass">SharedClass</a> that contains remoting (and http) metadata. Static property.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Contains additional model settings.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings.http.path</strong></td>
      <td><code>string</code></td>
      <td>
        <p>Base URL of the model HTTP route.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[{string}]</strong></td>
      <td><code></code></td>
      <td>
        <p>settings.acls Array of ACLs for the model.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>
