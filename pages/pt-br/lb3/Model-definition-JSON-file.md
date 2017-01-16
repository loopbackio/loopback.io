---
title: "Model definition JSON file"
lang: en
layout: navgroup
navgroup: models
keywords: LoopBack
tags: models
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Model-definition-JSON-file.html
summary: The model JSON file declaratively defines a LoopBack model.
---

## Overview

The LoopBack [Model generator](Model-generator.html) creates a model JSON file for each model in either the `server/models`
or the `common/models` directory (depending on your response to the generator's prompts).
The file is named <code><i>model-name</i>.json</code>, where _`model-name`_ is the model name; for example, `customer.json`.
The model JSON file defines models, relations between models, and access to models. 

{% include important.html content="
The LoopBack [model generator](Model-generator.html) automatically converts camel-case model names (for example MyModel)
to lowercase dashed names (my-model). For example, if you create a model named \"FooBar\" with the model generator, it creates files `foo-bar.json` and `foo-bar.js` in `common/models`.
However, the model name (\"FooBar\") will be preserved via the model's name property.
" %}

For example, here is an excerpt from a model definition file for a customer model that would be in `/common/models/customer.json`:

{% include code-caption.html content="customer.json" %}
```javascript
{
  "name": "Customer",  // See Top-level properties below
  "description": "A Customer model representing our customers.",
  "base": "User",
  "idInjection": false,
  "strict": true,
  "options": { ... }, // See Options below - can also declare as top-level properties
  "properties": { ... }, // See Properties below
  "hidden": [...], // See Hidden properties below
  "validations": [...],  // See Validations below
  "relations": {...},  // See Relations below
  "acls": [...],  // See ACLs below
  "scopes": {...},  // See Scopes below
  "indexes" : { ...}, // See Indexes below
  "methods": [...],  // See Methods below - New for LB2.0 - Remoting metadata
  "http": {"path": "/foo/mypath"}
}
```

## Top-level properties

Properties are required unless otherwise designated.

<table>
    <tr>
      <th>Property</th>
      <th width="100">Type</th>
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
        Optional description of the model.<br/><br/>
        You can split long descriptions into arrays of strings (lines) to keep line lengths manageable; for example:
        <pre>[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
"sed do eiusmod tempor incididunt ut labore et dolore",<br> "magna aliqua." ] </pre>
      </td>
    </tr>
    <tr>
      <td>plural</td>
      <td>String</td>
      <td>
        Plural form of the model name.  <strong>Optional</strong>: Defaults to plural of name property using standard English conventions.
      </td>
    </tr>
    <tr>
      <td>base</td>
      <td>String</td>
      <td>
        Name of another model that this model extends. The model will "inherit" properties and methods of the base model.
      </td>
    </tr>
    <tr>
      <td>idInjection</td>
      <td>Boolean</td>
      <td>
        Whether to automatically add an <code>id</code> property to the model:
        <ul>
          <li><code>true</code>: <code>id</code> property is added to the model automatically. This is the default.</li>
          <li><code>false</code>: <code>id</code> property is not added to the model</li>
        </ul>
        See <a href="#id-properties">ID properties</a> for more information.  <strong>Optional</strong>; default is <code>true</code>. If present, the <code>idInjection</code> property in <code>options</code> takes precedence.
      </td>
    </tr>
    <tr>
      <td>forceId</td>
      <td>Boolean</td>
      <td>
        If true, prevents clients from setting the auto-generated ID value manually.
        The default is false.
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
        Specifies whether the model accepts only predefined properties or not. One of:
        <ul>
          <li><code>true</code>: Only properties defined in the model are accepted. Use if you want to ensure the model accepts only predefined properties.
          If you try to save a model instance with properties that are not predefined, LoopBack throws a `ValidationError`.
          </li>
          <li><code>false</code>: The model is an open model and accepts all properties, including ones not predefined in the model.
            This mode is useful to store free-form JSON data to a schema-less database such as MongoDB.
          </li>
          <li>Undefined: Defaults to false unless the data source is backed by a relational database such as Oracle or MySQL.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        options
      </td>
      <td>Object</td>
      <td>
        JSON object that specifies model options. See <a href="#options">Options</a> below.
      </td>
    </tr>
    <tr>
      <td>properties</td>
      <td>Object</td>
      <td>
        JSON object that specifies the properties in the model. See <a href="#properties">Properties</a> below.
      </td>
    </tr>
    <tr>
      <td>relations</td>
      <td>Object</td>
      <td>
        Object containing relation names and relation definitions.
        See <a href="#relations">Relations</a> below.
      </td>
    </tr>
    <tr>
      <td>acls</td>
      <td>Array</td>
      <td>
        Set of <code>ACL</code> specifications that describes access control for the model.
        See <a href="#acls">ACLs</a> below.
      </td>
    </tr>
    <tr>
      <td>scopes</td>
      <td>Object</td>
      <td>See <a href="#scopes">Scopes</a> below.</td>
    </tr>
    <tr>
      <td>replaceOnPUT</td>
      <td>Boolean</td>
      <td>If true, <a href="https://apidocs.strongloop.com/loopback/#persistedmodel-replaceorcreate">replaceOrCreate()</a>  and <a href="https://apidocs.strongloop.com/loopback/#persistedmodel-replacebyid">replaceById()</a> use the HTTP PUT method; if false, updateOrCreate() and <a href="https://apidocs.strongloop.com/loopback/#persistedmodel-prototype-updateattributes">updateAttributes()</a>/patchAttributes() use the HTTP PUT method.</td>
    </tr>    
</table>

## Options

The `options` key specifies advanced options, for example data source-specific options.

{% include note.html content="You can set `idInjection` here in `options` or at the top-level. The value set here takes precedence over the top-level value of `idInjection`.
" %}

### Advanced options

| Property | Type | Description |
| -------- | ---- | ----------- |
| `validateUpsert` | Boolean | By default, the <a href="http://apidocs.strongloop.com/loopback/#persistedmodel-upsert">upsert()</a> method (also known as `updateOrCreate()` ) does not enforce valid model data. Instead, it logs validation errors to the console. This is not optimal, but necessary to preserve backwards compatibility with older 2.x versions. <br/><br/>Set this property to true to ensure that `upsert()` returns an error when validation fails. The next major version of LoopBack will enable this option (set as true) by default.<br/><br/> Set this property to false to prevent `upsert()` from calling any validators at all. <br/><br/> By default, `upsert()` calls all validators and reports any validation errors to the console log.|
| `allowEternalTokens` | Boolean | Allow access tokens that never expire. |

### Data source-specific options

When a model is attached a data source of certain type such as Oracle or MySQL,
you can specify the name of the database schema and table as properties under the key with the name of the connector type.
The value of this key must match the value of the corresponding `connector` property in [datasources.json](datasources.json.html).
For example, in the snippet below, there would be an entry in `datasources.json` like this:  `"myDB": { "name": "myDB",  "connector": "mysql", ... }`.

```javascript
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

## Properties

The properties key defines one or more  properties, each of which is an object that has keys described in the following table. Below is an example a basic property definition:

```javascript
...
"properties": {
  "firstName": {
    "type": "String", 
    "required": "true"
  },
  "id": {
    "type": "Number", 
    "id": true, 
    "description": "User ID"
},
...
```

### General property properties

Each model property can have the properties described in the following table. Only the `type` property is required; for properties with only a `type`, you can use the following shorthand:


```javascript
"propertyName": "type"
```

For example:

```javascript
...
"emailVerified": "boolean",
"status": "string",
...
```

<table>
  <tbody>
    <tr>
      <th>Key</th>
      <th>Required?</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>default</td>
      <td>No</td>
      <td>Any*</td>
      <td>
        Default value for the property. The type must match that specified by <code>type</code>.
      </td>
    </tr>
    <tr>
      <td>defaultFn</td>
      <td>No</td>
      <td>String</td>
      <td>
        A name of the function to call to set the default value for the property. Must be one of:
        <ul>
          <li>
            <code>"guid"</code>: generate a new globally unique identifier (GUID) using the computer MAC address and current time (UUID version 1).
          </li>
          <li><code>"uuid"</code>: generate a new universally unique identifier (UUID) using the computer MAC address and current time (UUID version 1).</li>
          <li><code>"uuidv4"</code>: generate a new universally unique identifier using the UUID version 4 algorithm.</li>
          <li>"<code>now"</code>: use the current date and time as returned by <code>new Date()</code></li>
        </ul>
        NOTE: For discussion of providing additional options, see
          <a href="https://github.com/strongloop/loopback/issues/292" class="external-link" rel="nofollow">LoopBack issue 292</a> on GitHub.
      </td>
    </tr>
    <tr>
      <td>description</td>
      <td>No</td>
      <td>String or Array</td>
      <td>
        Documentation for the property.
        You can split long descriptions into arrays of strings (lines) to keep line lengths manageable. For example:
        <pre>[<br>  "Lorem ipsum dolor sit amet, consectetur adipiscing elit",<br>
      "sed do eiusmod tempor incididunt ut labore et dolore",<br> "magna aliqua."<br>]&nbsp;&nbsp;</pre>
      </td>
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
        Whether the property is a unique identifier. Default is false.
        See <code>Id</code> property below.
      </td>
    </tr>
    <tr>
      <td>index</td>
      <td>No</td>
      <td>Boolean</td>
      <td>Whether the property represents a column (field) that is a database index.</td>
    </tr>
    <tr>
      <td>required</td>
      <td>No</td>
      <td>Boolean</td>
      <td>
        Whether a value for the property is required. If true, then adding or updating a model instance requires a value for the property.<br/><br/>
        Default is false.
      </td>
    </tr>
    <tr>
      <td>
        type
      </td>
      <td>Yes</td>
      <td>
        String
      </td>
      <td>
        Property type. Can be any type described in <a href="LoopBack-types.html">LoopBack types</a>.
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

A model representing data to be persisted in a database usually has one or more _ID properties_ that uniquely identify the model instance.
For example, the `user` model might have user IDs.

By default, if no ID properties are defined and the `idInjection` property is `true` (or is not set, since `true` is the default),
LoopBack automatically adds an `id` property to the model as follows:

```
id: {type: Number, generated: true, id: true}
```

The `generated` property indicates the ID will be automatically generated by the database.
If true, the connector decides what type to use for the auto-generated key. For relational databases, such as Oracle or MySQL, it defaults to `number`.
If your application generates unique IDs, set it to false.

To explicitly specify a property as ID, set the `id` property of the option to `true`. The `id` property value must be one of:

* `true`: the property is an ID.
* `false` (or any value that converts to false): the property is not an ID (default).
* Positive number, such as 1 or 2: the property is the index of a composite ID.

In database terms, ID properties are primary key column(s) are. Such properties are defined with the 'id' attribute set to true or a number as the position for a composite key.

For example,

```javascript
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

```javascript
var InventoryDefinition = { 
  productId: {type: String, id: 1}, 
  locationId: {type: String, id: 2}, 
  qty: Number 
}
```

The composite ID is (productId, locationId) for an inventory model.

{% include important.html content="Composite IDs are not currently supported as query parameters in REST APIs and DAO methods like `findOrCreate`, `updateOrcreate` and `replaceOrCreate`.
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

```javascript
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

<div class="sl-hidden"><strong>Non-public Information</strong><br>
  Removed until <a href="https://github.com/strongloop/loopback-datasource-juggler/issues/128" class="external-link" rel="nofollow">https://github.com/strongloop/loopback-datasource-juggler/issues/128</a> is resolved.
  <p>Conversion and formatting properties</p>
  <p>Format conversions are declared in properties, as described in the following table:</p>
  <div class="table-wrap">
    <div class="table-wrap">
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
            <td>Boolean</td>
            <td>Whether to convert a string to lowercase</td>
          </tr>
          <tr>
            <td>uppercase</td>
            <td>Boolean</td>
            <td>Whether to convert a string to uppercase</td>
          </tr>
          <tr>
            <td>format</td>
            <td>Regular expression</td>
            <td>Format for a date property.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

## Exclude properties from base model

By default, a model inherits all properties from the base. To exclude some base properties from being visible, you need to set the property to `false` or `null`.

For example,

{% include code-caption.html content="common/models/customer.json" %}
```javascript
... 
"base": "User",
"properties": {
  "lastUpdated": false,
  "credentials": null,
  "challenges": null,
  "modified": "date"
}
...
```

## Hidden properties

A hidden property is not sent in the JSON data in the application's HTTP response.
The property value is an array of strings, and each string in the array must match a property name defined for the model.

An example of a hidden property is User.password:

{% include code-caption.html content="common/models/user.json" %}
```javascript
...
  "properties": {
    ...
    "password": {
      "type": "string",
      "required": true
    },
...
   "hidden": ["password"],
...
```

If you want to white-list the fields returned instead of black-listing them, consider:

* Applying the `fields` of the model's default`scope`.
  This will operate at the database response layer so limiting your ability to check a field in the database that
  you otherwise would not wish exposed to the outside world (a private flag, for example).
* Overriding your model's `toJSON` method

See discussion of white-listing on [GitHub](https://github.com/strongloop/loopback/issues/1554).

## Protected properties

A protected property is not sent in the JSON data in the application's HTTP response if the object is nested inside another object.
For instance if you have an Author object and a Book object. A book has a relation to with Author, and book is public API.
Author will have personal information such as social security number etc, and they can now be "protected" such that anyone looking up
the author of the book will not get those information back (from [GitHub](https://github.com/strongloop/loopback-datasource-juggler/pull/400) pull request).
The property value is an array of strings, and each string in the array must match a property name defined for the model.

An example of a hidden property is User.email:

{% include code-caption.html content="common/models/user.json" %}
```javascript
...
  "properties": {
    ...
    "email": {
      "type": "string",
      "required": true
    },
...
   "protected": ["email"],
...
```

## Validations

{% include warning.html content="This is not yet implemented. You must currently validate in code; see [Validating model data](Validating-model-data.html).
" %}

Specify constraints on data with `validations` properties. See also [Validatable class](http://apidocs.strongloop.com/loopback-datasource-juggler/#validatable).

| Key | Type | Description |
|---|---|---|
| default | Any | Default value of the property. |
| required | Boolean | Whether the property is required. |
| pattern | String | Regular expression pattern that a string should match |
| max | Number| Maximum length for string types. |
| min | Number | Minimum length for string types.  |
| length | Number | Maximum size of a specific type, for example for CHAR types. |

For example:

```javascript
"username": {
  "type": "string", 
  "description": "User account name",  
  "min": 6, 
  "max": 24
}
```

## Relations

The `relations` key defines relationships between models through a JSON object.
Each key in this object is the name of a related model, and the value is a JSON object as described in the table below.

For example:

```javascript
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
      <td>foreignKey</td>
      <td>String</td>
      <td>Optional foreign key used to find related model instances.</td>
    </tr>
    <tr>
      <td>keyThrough</td>
      <td>String</td>
      <td>Foreign key to be used in a <a href="HasMany-relations.html">HasMany relation</a>.</td>
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
        <p>Relation type. Required. See <a href="Creating-model-relations.html">Creating model relations</a> for more information.</p>
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
      <td>through</td>
      <td>String</td>
      <td>Name of model creating hasManyThrough relation. See example below.</td>
    </tr>
  </tbody>
</table>

Example of hasManyThrough:

```javascript
"patient": {
    "model": "physician",
    "type": "hasMany", 
    "through" : "appointment"
}
```

## ACLs

The value of the `acls` key is an array of objects that describes the access controls for the model. Each object has the keys described in the table below.

```javascript
"acls": [
    {
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
        The type of access to apply. One of:
        <ul>
          <li>READ</li>
          <li>WRITE</li>
          <li>EXECUTE</li>
          <li>* (default)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        permission
      </td>
      <td>
        String
      </td>
      <td>
        Type of permission granted. Required.
        One of:
        <ul>
          <li><strong>ALLOW</strong>&nbsp;- Explicitly grants access to the resource.</li>
          <li><strong>DENY</strong>&nbsp;- Explicitly denies access to the resource.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>principalId</td>
      <td>String</td>
      <td>
        Principal identifier. Required.
        The value must be one of:
        <ul>
          <li>A user ID (String|number|any)</li>
          <li>
            One of the following predefined dynamic roles:
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
        NOTE:
            <code>$related principalId</code> is not yet implemented.
      </td>
    </tr>
    <tr>
      <td>principalType</td>
      <td>String</td>
      <td>
        Type of the principal. Required.
        One of:
        <ul>
          <li>Application</li>
          <li>User</li>
          <li>Role</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>property</td>
      <td>String<br>Array of Strings&nbsp;</td>
      <td>
        Specifies a property/method/relation on a given model. It further constrains where the ACL applies.
        Can be:
        <ul>
          <li>A string, for example: <code>"create"</code></li>
          <li>An array of strings, for example: <code>["create", "update"]</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Scopes

_Scopes_ enable you to specify commonly-used queries that you can reference as method calls on a model.

The `scopes `key defines one or more scopes (named queries) for models.
A scope maps a name to a predefined filter object to be used by the model's `find()` method; for example:

```javascript
"scopes": {
	"vips": {"where": {"vip": true}}, 
	"top5": {"limit": 5, "order": "age"}
}
```

The snippet above defines two named queries for the model:

* vips: Find all model instances with vip flag set to true
* top5: Find top five model instances ordered by age

Within the scopes object, the keys are the names, and each value defines a filter object for [PersistedModel.find()](http://apidocs.strongloop.com/loopback/#persistedmodel-find).

You can also define a scope programmatically using a model's `scope()` method, for example:

```javascript
User.scope('vips', {where: {vip: true}});
User.scope('top5', {limit: 5, order: 'age'});
```

Now you can call the methods defined by the scopes; for example:

```javascript
User.vips(function(err, vips) {
  //...
});
```

### Default scope

If you wish for a scope to be applied across all queries to the model, you can use the default scope for the model itself.

For example:

```javascript
{
  "name": "Product",
  "properties": {
    ...
  }
  "scope": {
    "order": "name",
    "limit": 100
    "where": {
      "deleted": false
    }
  }
}
```

Now, any CRUD operation with a query parameter runs in the default scope will be applied; for example, assuming the above scope, a find opearation such as

```javascript
Product.find({offset: 0}, cb);
```

Becomes the equivalent of this:

```javascript
Product.find({order: "name", offset: 0, limit: 100, where: {deleted: false}}, cb)
```

### Default scopes with where filters

Adding a `scope` to a model definition (in the model.json file) automatically adds a method to model called `defaultScope()`.
LoopBack will call this method whenever a model is created, updated, or queried.

{% include tip.html content="Default scopes with a `where` filter may not work as you expect!
" %}

Each time a model instance is created or updated, the generated `defaultScope()` method will modify the model's properties matching the `where` filter to enforce the values specified.

If you don't want to have the default scope applied in this way, use named scopes where possible.

If you must use a default scope, but don't want it to affect `upsert()`, for example, simply override the model's `defaultScope()` method prior to calling `upsert()`; for  example:

```javascript
var defaultScope = Report.defaultScope;
  Report.defaultScope = function(){};
  Report.upsert({id: reportId, 'deleted': true}, function(...) {
    Report.defaultScope = defaultScope;
    //...
  });
```

## Methods

You can declare remote methods here. Until this feature is implemented, you must declare remote methods in code. See [Remote methods](Remote-methods.html).

{% include warning.html content="This feature is not yet implemented.
" %}

## Indexes

Declare indexes for a model with the `indexes` property, for example:

```javascript
"indexes": {
  "name_age_index": {
    "keys": {"name": 1, "age": -1}
  },
  "age_index": {"age": -1}
}
```

The snippet above creates two indexes for the declaring model:

* A composite index named `name_age_index` with two keys: `name` in ascending order and `age` in descending order.
* A simple index named `age_index` with one key: `age` in descending order.

The full syntax for an individual index is:

```javascript
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

{% include note.html content="A key value of 1 specifies ascending order, and -1 specifies descending order.
" %}

If you don't need to specify any options, you can use a shortened form:

```javascript
"<indexName>": {
  "<key1>": 1,
  "<key2>": -1
}
```

You can specify indexes at the model property level too, for example:

```javascript
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

### MySQL indexes

For MySQL, you can declare multi-column indexes as follows (for example):

```javascript
...
"indexes":
{
    "UNIQUE_INDEX":  {
        "columns": "column1,column2,...",
        "kind": "unique"
    }
},
...
```
