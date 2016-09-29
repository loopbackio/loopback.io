---
title: "Model definition JSON file"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Model-definition-JSON-file.html
summary:
---

**Related articles**

<div class="panelContent" style="background-color: #CCE0CC;">

*   [Creating models](https://docs.strongloop.com/display/zh/Creating+models)
*   [Customizing models](https://docs.strongloop.com/display/zh/Customizing+models)
*   [Creating model relations](https://docs.strongloop.com/display/zh/Creating+model+relations)
*   [Querying data](https://docs.strongloop.com/display/zh/Querying+data)
*   [Model definition JSON file](https://docs.strongloop.com/display/zh/Model+definition+JSON+file)
*   [PersistedModel REST API](https://docs.strongloop.com/display/zh/PersistedModel+REST+API)

</div>

## Overview

The LoopBack [Model generator](/doc/{{page.lang}}/lb2/Model-generator.html) creates model JSON files in the `/common/models` directory named `_model-name_.json`, where _`model-name`_ is the model name of each model; for example, `customer.json`.   The model JSON file defines models, relations between models, and access to models. 

Here is an excerpt from an example model definition file for a customer model that would be in `/common/models/customer.json`:

**customer.json**

```js
{
  "name": "Customer", // See Top-level properties below
  "description": "A Customer model representing our customers.",
  "base": "User",
  "idInjection": false,
  "strict": true,
  "options": {...
  }, // See Options below - can also declare as top-level properties
  "properties": {...
  }, // See Properties below
  "validations": [...], // See Validations below
  "relations": {...
  }, // See Relations below
  "acls": [...], // See ACLs below
  "scopes": {...
  }, // See Scopes below
  "indexes": {...
  }, // See Indexes below
  "methods": [...], // See Methods below - New for LB2.0 - Remoting metadata
  "http": {
    "path": "/foo/mypath"
  }
}
```

## Top-level properties

Properties are required unless otherwise designated.

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>Name of the model.</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String or Array</td>
      <td>
        <p>Optional description of the model.</p>
        <p>You can split long descriptions into arrays of strings (lines) to keep line lengths manageable.</p><pre>[<br>  "<span style="color: rgb(0,0,0);">Lorem ipsum dolor sit amet, consectetur adipiscing elit,"<br></span><span style="color: rgb(0,0,0);"> "sed do eiusmod tempor incididunt ut labore et dolore",<br></span><span style="color: rgb(0,0,0);"> "magna aliqua."<br></span><span style="color: rgb(0,0,0);">]&nbsp;</span></pre></td>
    </tr>
    <tr>
      <td>plural</td>
      <td>String</td>
      <td>
        <p>Plural form of the model name.</p>
        <p><strong>Optional</strong>: Defaults to plural of name property using standard English conventions.</p>
      </td>
    </tr>
    <tr>
      <td>base</td>
      <td>String</td>
      <td>
        <p>Name of another model that this model extends. The model will "inherit" properties and methods of the base model.</p>
      </td>
    </tr>
    <tr>
      <td>idInjection</td>
      <td>Boolean</td>
      <td>
        <p>Whether to automatically add an id property to the model:</p>
        <ul>
          <li><code>true</code>:&nbsp;<code>id</code>&nbsp;property is added to the model automatically. This is the default.</li>
          <li><code>false</code>:&nbsp;<code>id</code>&nbsp;property is not added to the model</li>
        </ul>
        <p>See <a href="/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html">ID properties</a> for more information.</p>
        <p><strong>Optional</strong>; default is <code>true</code>. If present, the <code>idInjection</code> propery in <code>options</code> takes precedence.</p>
      </td>
    </tr>
    <tr>
      <td>http.path</td>
      <td>String</td>
      <td>Customized HTTP path for REST endpoints of this model.</td>
    </tr>
    <tr>
      <td>strict</td>
      <td>Boolean</td>
      <td>
        <p>Specifies whether the model accepts only predefined properties or not. One of:</p>
        <ul>
          <li><code>true</code>: Only properties defined in the model are accepted. Use if you want to ensure the model accepts only predefined properties.</li>
          <li><code>false</code>: The model is an open model and accepts all properties, including ones not predefined in the model. This mode is useful to store free-form JSON data to a schema-less database such as MongoDB.</li>
          <li>"throw": Throws an exception if properties not defined for the model are used in an operation.</li>
          <li>Undefined: Defaults to false unless the data source is backed by a relational database such as Oracle or MySQL.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <p>options</p>
      </td>
      <td>Object</td>
      <td>
        <p>JSON object that specifies model options. See <a href="/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html">Options</a> below.</p>
      </td>
    </tr>
    <tr>
      <td>properties</td>
      <td>Object</td>
      <td>
        <p>JSON object that specifies the properties in the model. See <a href="/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html">Properties</a> below.</p>
      </td>
    </tr>
    <tr>
      <td>relations</td>
      <td>Object</td>
      <td>
        <p>Object containing relation names and relation definitions.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html">Relations</a> below.</p>
      </td>
    </tr>
    <tr>
      <td>acls</td>
      <td>Array</td>
      <td>
        <p>Set of&nbsp;<code>ACL</code>&nbsp;specifications that describes access control for the model.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html">Acls</a> below.</p>
      </td>
    </tr>
  </tbody>
</table>

## Options

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>What can we say about these properties? Are they all specific to data sources? Are there any common properties? Can we describe properties valid for each connector?</div>

The `options` key specifies data source-specific options.  When a model is attached a data source of certain type such as Oracle or MySQL, you can specify the name of the database schema and table as properties under the key with the name of the connector type. 

```js
...
  "options": {
    "mysql": {
      "table": "location"
    },
    "mongodb": {
      "collection": "location"
    },
    "oracle": {
      "schema": "BLACKPOOL",
      "table": "LOCATION"
    }
  },
  ...
```

{% include note.html content="

You can set `idInjection` here in `options` or at the top-level. The value set here takes precedence over the top-level value of `idInjection`.

" %}

## Properties

The properties key defines one or more  properties, each of which is an object that has keys described in the following table.  Below is an example a basic property definition:

```js
...
"properties": {
  "firstName": {
    "type": "String",

    "required": "true"
  },
  "id": {
    "type": "Number",

    "id": true,

    "doc": "User ID"
  },
  ...
```

### General property properties

<table>
  <tbody>
    <tr>
      <th>Key</th>
      <th>Required?</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><span style="color: rgb(61,60,64);">default</span></td>
      <td>No</td>
      <td>Any*</td>
      <td>Default value for the property. The type must match that specified by <code>type</code>.</td>
    </tr>
    <tr>
      <td>description</td>
      <td>No</td>
      <td>String or Array</td>
      <td>
        <p>Documentation for the property.</p>
        <p><span style="line-height: 1.4285715;">You can split long descriptions into arrays of strings (lines) to keep line lengths manageable.</span></p><pre>[<br>  "<span style="color: rgb(0,0,0);">Lorem ipsum dolor sit amet, consectetur adipiscing elit,"<br></span><span style="color: rgb(0,0,0);"> "sed do eiusmod tempor incididunt ut labore et dolore",<br></span><span style="color: rgb(0,0,0);"> "magna aliqua."<br></span><span style="color: rgb(0,0,0);">]&nbsp;</span>&nbsp;</pre></td>
    </tr>
    <tr>
      <td>doc</td>
      <td>No</td>
      <td>String</td>
      <td>Documentation for the property. <strong>Deprecated, use "description" instead.</strong></td>
    </tr>
    <tr>
      <td>id</td>
      <td>No</td>
      <td>Boolean</td>
      <td>
        <p><span>Whether the property is a unique identifier. Default is false.</span></p>
        <p><span>See </span><a href="/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html">Id property</a><span> below.</span></p>
      </td>
    </tr>
    <tr>
      <td>required</td>
      <td>No</td>
      <td>Boolean</td>
      <td>
        <p>Whether a value for the property is required.</p>
        <p>Default is false.</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>type</p>
      </td>
      <td>Yes</td>
      <td>
        <p>String</p>
      </td>
      <td>
        <p><span>Property type. Can be any type described in <a href="/doc/{{page.lang}}/lb2/LoopBack-types.html">LoopBack types</a>.</span></p>
      </td>
    </tr>
    <tr>
      <td>*</td>
      <td>No</td>
      <td>Any</td>
      <td>See below.</td>
    </tr>
  </tbody>
</table>

### ID properties

A model representing data to be persisted in a database usually has one or more _ID properties_ that uniquely identify the model instance. For example, the `user` model might have user IDs.

By default, if no ID properties are defined and the `idInjection` property is `true` (or is not set, since `true` is the default), LoopBack automatically adds an `id` property to the model as follows:

` id: {type: Number, generated: true, id: true}`

The `generated` property indicates the ID will be automatically generated by the database. If true, the connector decides what type to use for the auto-generated key. For relational databases, such as Oracle or MySQL, it defaults to `number`. If your application generates unique IDs, set it to false.

To explicitly specify a property as ID, set the `id` property of the option to `true`. The `id` property value must be one of:

*   `true`: the property is an ID.

*   `false` (or any value that converts to false): the property is not an ID (default).

*   Positive number, such as 1 or 2: the property is the index of a composite ID.

In database terms, key column(s) are ID properties. Such properties are defined with the 'id' attribute set to true or a number as the position for a composite key. For example,

```js
{
  "myId": {
    "type": "string",

    "id": true 
  }
}
```

Then:

1.  If a model doesn't have explicitly-defined ID properties, LoopBack automatically injects a property named "id" unless the `idInjection` option is set to false.

2.  If an ID property has `generated` set to true, the connector decides what type to use for the auto-generated key. For example for SQL Server, it defaults to `number`.

3.  LoopBack CRUD methods expect the model to have an "id" property if the model is backed by a database.

4.  A model without any "id" properties can only be used without attaching to a database.

### Composite IDs

LoopBack supports the definition of a composite ID that has more than one property. For example:

```js
var InventoryDefinition = { 
  productId: {
    type: String,
    id: 1
  },

  locationId: {
    type: String,
    id: 2
  },

  qty: Number 
}
```

The composite ID is (productId, locationId) for an inventory model.

{% include important.html content="

Composite IDs are not currently supported as query parameters in REST APIs.

" %}

### Data mapping properties

When using a relational database data source, you can specify the following properties that describe the columns in the database.  

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>columnName</td>
      <td>String</td>
      <td>Column name</td>
    </tr>
    <tr>
      <td>dataType</td>
      <td>String</td>
      <td>Data type as defined in the database</td>
    </tr>
    <tr>
      <td>dataLength</td>
      <td>Number</td>
      <td>Data length</td>
    </tr>
    <tr>
      <td>dataPrecision</td>
      <td>Number</td>
      <td>Numeric data precision</td>
    </tr>
    <tr>
      <td>dataScale</td>
      <td>Number</td>
      <td>Numeric data scale</td>
    </tr>
    <tr>
      <td>nullable</td>
      <td>Boolean</td>
      <td>If true, data can be null</td>
    </tr>
  </tbody>
</table>

For example, to map a property to a column in an Oracle database table, use the following:

```js
...
"name": {
  "type": "String",
  "required": false,
  "length": 40,
  "oracle": {
    "columnName": "NAME",
    "dataType": "VARCHAR2",
    "dataLength": 40,
    "nullable": "Y"
  }
}
...
```

### Conversion and formatting properties

Format conversions are declared in properties, as described in the following table:

<table>
  <tbody>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>trim</td>
      <td>Boolean</td>
      <td>Whether to trim the string</td>
    </tr>
    <tr>
      <td>lowercase</td>
      <td><span>Boolean</span></td>
      <td>Whether to convert a string to lowercase</td>
    </tr>
    <tr>
      <td>uppercase</td>
      <td><span>Boolean</span></td>
      <td>Whether to convert a string to uppercase</td>
    </tr>
    <tr>
      <td>format</td>
      <td>Regular expression</td>
      <td>Format for a date property.</td>
    </tr>
  </tbody>
</table>

## Validations

{% include warning.html content="

This is not yet implemented. You must currently validate in code; see [Validating model data](/doc/{{page.lang}}/lb2/Validating-model-data.html).

" %}

Specify constraints on data with `validations` properties.  See also [Validatable class](https://docs.strongloop.com/display/zh/Validatable+class).

<table>
  <tbody>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>default</td>
      <td>Any</td>
      <td>Default value of the property.</td>
    </tr>
    <tr>
      <td>required</td>
      <td>Boolean</td>
      <td>Whether the property is required.</td>
    </tr>
    <tr>
      <td>pattern</td>
      <td>String</td>
      <td>Regular expression pattern that a string should match</td>
    </tr>
    <tr>
      <td>max</td>
      <td>
        <p>Number</p>
      </td>
      <td>Maximum length for string types.</td>
    </tr>
    <tr>
      <td>min</td>
      <td>Number</td>
      <td>Minimum length for string types.&nbsp;</td>
    </tr>
    <tr>
      <td>length</td>
      <td>Number</td>
      <td>Maximum size of a specific type, for example for CHAR types.</td>
    </tr>
  </tbody>
</table>

For example:

```js
"username": {
  "type": "string",

  "doc": “User account name,

  "min": 6,

  "max": 24
}
```

## Relations

The `relations` key defines relationships between models through a JSON object.  Each key in this object is the name of a related model, and the value is a JSON object as described in the table below.  For example:

```js
...
"relations": {
  "accessTokens": {
    "model": "accessToken",
    "type": "hasMany",
    "foreignKey": "userId"
  },
  "account": {
    "model": "account",
    "type": "belongsTo"
  },
  "transactions": {
    "model": "transaction",
    "type": "hasMany"
  }
},  
...
```

<table>
  <tbody>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>
        <p>model</p>
      </td>
      <td>
        <p>String</p>
      </td>
      <td>
        <p>Name of the related model. Required.</p>
      </td>
    </tr>
    <tr>
      <td>type</td>
      <td>String</td>
      <td>
        <p>Relation type. Required. See <a href="/doc/{{page.lang}}/lb2/Creating-model-relations.html">Creating model relations</a> for more information.</p>
        <p>One of:</p>
        <ul>
          <li>hasMany</li>
          <li>belongsTo</li>
          <li>hasAndBelongsToMany</li>
        </ul>
        <p>For hasMany, you can also specify a hasManyThrough relation by adding a "through" key:</p>
        <p><code>{through: 'modelName'}</code></p>
        <p>See example below.</p>
      </td>
    </tr>
    <tr>
      <td>foreignKey</td>
      <td>String</td>
      <td>Optional foreign key used to find related model instances.</td>
    </tr>
    <tr>
      <td>through</td>
      <td>String</td>
      <td>Name of model creating hasManyThrough relation. See example below.</td>
    </tr>
  </tbody>
</table>

Example of hasManyThrough:

```js
"patient": {
  "model": "physician",
  "type": "hasMany",

  "through": "appointment"
}
```

## ACLs

The value of the `acls` key is an array of objects that describes the access controls for the model.  Each object has the keys described in the table below.

```js
"acls": [{
    "permission": "ALLOW",
    "principalType": "ROLE",
    "principalId": "$everyone",
    "property": "myMethod"
  },  
  ...
]
```

<table>
  <tbody>
    <tr>
      <th>Key</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>accessType</td>
      <td>String</td>
      <td>
        <p>The type of access to apply. One of:</p>
        <ul>
          <li>READ</li>
          <li>WRITE</li>
          <li>EXECUTE</li>
          <li>ALL (default)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <p>permission</p>
      </td>
      <td>
        <p>String</p>
        <p>&nbsp;</p>
      </td>
      <td>
        <p>Type of permission granted. Required.</p>
        <p>One of:</p>
        <ul>
          <li><strong>ALARM</strong>&nbsp;- Generate an alarm, in a system dependent way, the access specified in the permissions component of the ACL entry.</li>
          <li><strong>ALLOW</strong>&nbsp;- Explicitly grants access to the resource.</li>
          <li><strong>AUDIT</strong>&nbsp;- Log, in a system dependent way, the access specified in the permissions component of the ACL entry.</li>
          <li><strong>DENY</strong>&nbsp;- Explicitly denies access to the resource.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>principalId</td>
      <td>String</td>
      <td>
        <p>Principal identifier. Required.</p>
        <p>The value must be one of:</p>
        <ul>
          <li>A user ID (String|number|any)</li>
          <li>One of the following predefined dynamic roles:
            <ul>
              <li><code>$everyone</code>&nbsp;- Everyone</li>
              <li><code>$owner</code>&nbsp;- Owner of the object</li>
              <li><code>$related</code>&nbsp;- Any user with a relationship to the object</li>
              <li><code>$authenticated</code>&nbsp;- Authenticated user</li>
              <li><code>$unauthenticated</code>&nbsp;- Unauthenticated user</li>
            </ul>
          </li>
          <li>A static role name</li>
        </ul>
        <div class="aui-message warning shadowed information-macro"><span class="aui-icon icon-warning">Icon</span>
          <div class="message-content">
            <p>$related principalId is not yet implemented.</p>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>principalType</td>
      <td>String</td>
      <td>
        <p>Type of the principal. Required.</p>
        <p>One of:</p>
        <ul>
          <li>Application</li>
          <li>User</li>
          <li>Role</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>property</td>
      <td>&nbsp;</td>
      <td><span style="color: rgb(34,34,34);">Specifies a property/method/relation on a given model. It further constrains where the ACL applies.</span></td>
    </tr>
  </tbody>
</table>

## Scopes

_Scopes_ enable you to specify commonly-used queries that you can reference as method calls on a model.

The `scopes `key defines one or more scopes (named queries) for models. A scope maps a name to a predefined filter object to be used by the model's `find()` method; for example:

```js
"scopes":  {
  "vips": {
    "where": {
      "vip": true
    }
  },

  "top5": {
    "limit": 5,
    "order": "age"
  }
}
```

The snippet above defines two named queries for the model:

*   vips: Find all model instances with vip flag set to true
*   top5: Find top five model instances ordered by age

Within the scopes object, the keys are the names, and each value defines a filter object for [Model.find()](http://docs.strongloop.com/display/DOC/Model#modelfindfilter-callback).

You can also define a scope programmatically using a model's `scope()` method, for example:

```
User.scope('vips', {where: {vip: true});
User.scope('top5': {limit: 5, order: 'age'});
```

Now you can call the methods defined by the scopes; for example:

```
User.vips(function(err, vips) {
...
});
```

### Default scope

If you wish for a scope to be applied across all queries to the model, you can use the default scope for the model itself.

For example:

```js
{
  "name": "Product",
  "properties": {
    ...
  }
  "scope": {
    "order": "name",
    "limit": 100 "where": {
      "deleted": false
    }
  }
}
```

Now, any CRUD operation with a query parameter runs in the default scope will be applied; for example, assuming the above scope, a find opearation such as

`Product.find({offset: 0}, cb);`

Becomes the equivalent of this:

`Product.find({order: "name", offset: 0, limit: 100, where: {deleted: false}}, cb)`

## Methods

You can declare remote methods here.  Until this feature is implemented, you must declare remote methods in code; see [远程方法（Remote methods）](/doc/{{page.lang}}/lb2/6095040.html).

{% include warning.html content="

This feature is not yet implemented.

" %}

## Indexes

Declare indexes for a model with the `indexes` property, for example:

```js
"indexes": {
  "name_age_index": {
    "keys": {
      "name": 1,
      "age": -1
    }
  },
  "age_index": {
    "age": -1
  }
}
```

The snippet above creates two indexes for the declaring model:

*   A composite index named `name_age_index` with two keys: `name` in ascending order and `age` in descending order.
*   A simple index named `age_index` with one key: `age` in descending order.

The full syntax for an individual index is:

```js
"<indexName>": {
  "keys": {
    "<key1>": 1,
    "<key2>": -1
  },
  "options": {
    "unique": true
  }
}
```

{% include note.html content="

A key value of 1 specifies ascending order, and -1 specifies descending order.

" %}

If you don't need to specify any options, you can use a shortened form:

```js
"<indexName>": {
  "<key1>": 1,
  "<key2>": -1
}
```

You can specify indexes at the model property level too, for example:

```js
{
  "name": {
    "type": "String",
    "index": true
  },
  "email": {
    "type": "String",
    "index": {
      "unique": true
    }
  },
  "age": "Number"
}
```

This example creates two indexes: one for the `name` key and another one for the `email` key. The `email` index is unique.
