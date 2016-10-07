---
title: "loopback class"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/loopback-class.html
summary:
---

Module: loopback

*   [Class: loopback](about:blank#loopback)
*   [if](about:blank#if)
*   [loopback.remoteMethod](about:blank#loopback-remotemethod)
*   [loopback.template](about:blank#loopback-template)
*   [loopback.createModel](about:blank#loopback-createmodel)
*   [loopback.configureModel](about:blank#loopback-configuremodel)
*   [loopback.findModel](about:blank#loopback-findmodel)
*   [loopback.getModel](about:blank#loopback-getmodel)
*   [loopback.getModelByType](about:blank#loopback-getmodelbytype)
*   [loopback.createDataSource](about:blank#loopback-createdatasource)
*   [loopback.memory](about:blank#loopback-memory)
*   [loopback.setDefaultDataSourceForType](about:blank#loopback-setdefaultdatasourcefortype)
*   [loopback.getDefaultDataSourceForType](about:blank#loopback-getdefaultdatasourcefortype)
*   [loopback.autoAttach](about:blank#loopback-autoattach)

<section class="code-doc ">

### Class: loopback

#### loopback

LoopBack core module. It provides static properties and methods to create models and data sources. The module itself is a function that creates loopback `app`. For example:

```js
var loopback = require('loopback');
var app = loopback();
```

Class Properties

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">version</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Version of LoopBack framework. Static read-only property.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">mime</strong></td>
      <td><code>String</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">isBrowser</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>True if running in a browser environment; false otherwise. Static read-only property.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">isServer</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>True if running in a server environment; false otherwise. Static read-only property.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">registry</strong></td>
      <td><code>Registry</code></td>
      <td>
        <p>The global <code>Registry</code> object.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">faviconFile</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Path to a default favicon shipped with LoopBack. Use as follows: <code>app.use(require('serve-favicon')(loopback.faviconFile));</code></p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.autoAttach()

Attach any model that does not have a dataSource to the default dataSource for the type the Model requests

</section>

<section class="code-doc ">

#### loopback.configureModel(ModelCtor, config)

Alter an existing Model class.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">ModelCtor</strong></td>
      <td><code>Model</code></td>
      <td>
        <p>The model constructor to alter.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">config</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Additional configuration to apply</p>
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
      <td><code>DataSource</code></td>
      <td>
        <p>Attach the model to a dataSource.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[relations]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Model relations to add/update.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.createDataSource(name, options)

Create a data source with passing the provided options to the connector.

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
        <p>Optional name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Data Source options</p>
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
      <td><strong class="code-arg-name">connector</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>LoopBack connector.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[*]</strong></td>
      <td><code></code></td>
      <td>
        <p>Other&nbsp;connector properties. See the relevant connector documentation.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.createModel

Create a named vanilla JavaScript class constructor with an attached set of properties and options.

This function comes with two variants:

*   `loopback.createModel(name, properties, options)`
*   `loopback.createModel(config)`

In the second variant, the parameters `name`, `properties` and `options` are provided in the config object. Any additional config entries are interpreted as `options`, i.e. the following two configs are identical:

```
{ name: 'Customer', base: 'User' }
{ name: 'Customer', options: { base: 'User' } }
```

**Example**

Create an `Author` model using the three-parameter variant:

```js
loopback.createModel(
  'Author', {
    firstName: 'string',
    lastName: 'string'
  }, {
    relations: {
      books: {
        model: 'Book',
        type: 'hasAndBelongsToMany'
      }
    }
  }
);
```

Create the same model using a config object:

```js
loopback.createModel({
  name: 'Author',
  properties: {
    firstName: 'string',
    lastName: 'string'
  },
  relations: {
    books: {
      model: 'Book',
      type: 'hasAndBelongsToMany'
    }
  }
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
      <td><strong class="code-arg-name">name</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Unique name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">properties</strong></td>
      <td><code>Object</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>(optional)</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.findModel(modelName)

Look up a model class by name from all models created by `loopback.createModel()`

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">modelName</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The model name</p>
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
      <td><code>Model</code></td>
      <td>
        <p>The model class</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.getDefaultDataSourceForType(type)

Get the default `dataSource` for a given `type`.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">type</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The datasource type.</p>
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
      <td><code>DataSource</code></td>
      <td>
        <p>The data source instance</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.getModel(modelName)

Look up a model class by name from all models created by `loopback.createModel()`. Throw an error when no such model exists.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">modelName</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The model name</p>
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
      <td><code>Model</code></td>
      <td>
        <p>The model class</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.getModelByType(modelType)

Look up a model class by the base model class. The method can be used by LoopBack to find configured models in models.json over the base model.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">modelType</strong></td>
      <td><code>Model</code></td>
      <td>
        <p>The base model class</p>
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
      <td><code>Model</code></td>
      <td>
        <p>The subclass if found or the base class</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### if()

Expose path to the default favicon file

**_only in node_**

</section>

<section class="code-doc ">

#### loopback.memory([name])

Get an in-memory data source. Use one if it already exists.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[name]</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The name of the data source. If not provided, the <code>'default'</code> is used.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.remoteMethod(fn, options)

Add a remote method to a model.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">fn</strong></td>
      <td><code>Function</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>(optional)</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.setDefaultDataSourceForType(type, dataSource)

Set the default `dataSource` for a given `type`.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">type</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The datasource type.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">dataSource</strong></td>
      <td><code>Object or DataSource</code></td>
      <td>
        <p>The data source settings or instance</p>
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
      <td><code>DataSource</code></td>
      <td>
        <p>The data source instance.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### loopback.template(path)

Create a template helper.

```js
var render = loopback.template('foo.ejs');
var html = render({
  foo: 'bar'
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
      <td><strong class="code-arg-name">path</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Path to the template file.</p>
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
      <td><code>Function</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>
