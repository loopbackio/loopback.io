---
title: "Database discovery API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Database-discovery-API.html
summary:
---

**See also**: See also: [API reference documentation for loopback-datasource-juggler](http://apidocs.strongloop.com/loopback-datasource-juggler/).

## Overview

LoopBack provides a unified API to discover model definition information from relational databases. The same discovery API is available when using any of these connectors:

*   **Oracle**: loopback-connector-oracle
*   **MySQL**: loopback-connector-mysql
*   **PostgreSQL**: loopback-connector-postgresql
*   **SQL Server**: loopback-connector-mssql

### Synchronous methods

The methods described below are asynchronous. For Oracle, there are also corresponding synchronous methods that accomplish the same things and return the same results:

*   `discoverModelDefinitionsSync(options)`
*   `discoverModelPropertiesSync(table, options)`
*   `discoverPrimaryKeysSync(table, options)`
*   `discoverForeignKeysSync(table, options)`
*   `discoverExportedForeignKeysSync(table, options)`

Note there are performance implications in using synchronous methods.

## Methods

{% include important.html content="

In general, _schema/owner_ is the name of the table schema. It’s a namespace that contains a list of tables.  Each database uses slightly different terminology:

*   MySQL: databases and schemas are exactly the same thing.
*   Oracle: the schema is the user/owner.
*   PostgreSQL: a database contains one or more named schemas, which in turn contain tables. The schema defaults to \"public\".
*   MS SQL Server: the schema defaults to \"dbo\".

" %}

### discoverAndBuildModels

Discover and build models from the specified owner/modelName.

```
dataSource.discoverAndBuildModels(_modelName_ [, _options_] [, _cb_])
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
      <td>modelName</td>
      <td><code>String</code></td>
      <td>
        <p>The model name.</p>
      </td>
    </tr>
    <tr>
      <td>[options]</td>
      <td><code>Object</code></td>
      <td>
        <p>Options; see below.</p>
      </td>
    </tr>
    <tr>
      <td>[cb]</td>
      <td><code>Function</code></td>
      <td>
        <p>The callback function</p>
      </td>
    </tr>
  </tbody>
</table>

Options 

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>owner / schema</td>
      <td><code>String</code></td>
      <td>
        <p>Database owner or schema name.</p>
      </td>
    </tr>
    <tr>
      <td>relations</td>
      <td><code>Boolean</code></td>
      <td>
        <p>True if relations (primary key/foreign key) are navigated; false otherwise.</p>
      </td>
    </tr>
    <tr>
      <td>all</td>
      <td><code>Boolean</code></td>
      <td>
        <p>True if all owners are included; false otherwise.</p>
      </td>
    </tr>
    <tr>
      <td>views</td>
      <td><code>Boolean</code></td>
      <td>
        <p>True if views are included; false otherwise.</p>
      </td>
    </tr>
  </tbody>
</table>

### discoverModelDefinitions

Call `discoverModelDefinitions()` to discover model definitions (table or collection names), based on tables or collections in a data source.   This method returns list of table/view names.

`discoverModelDefinitions(_options_, _cb_)`

#### Parameters

<table>
  <tbody>
    <tr>
      <td>options</td>
      <td>Object with properties described below.</td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Get a list of table/view names; see example below.</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner">Parameter</div>
      </th>
      <th>
        <div class="tablesorter-header-inner">Description</div>
      </th>
    </tr>
  </thead>
</table>

#### Options

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>all</td>
      <td>Boolean</td>
      <td>If true,&nbsp;include tables/views from all schemas/owners</td>
    </tr>
    <tr>
      <td>owner/schema</td>
      <td>String</td>
      <td>Schema/owner name</td>
    </tr>
    <tr>
      <td>views</td>
      <td>Boolean</td>
      <td>If true, include views.</td>
    </tr>
  </tbody>
</table>

Example of callback function return value:

```
{type: 'table', name: 'INVENTORY', owner: 'STRONGLOOP' }
{type: 'table', name: 'LOCATION', owner: 'STRONGLOOP' }
{type: 'view', name: 'INVENTORY_VIEW', owner: 'STRONGLOOP' }
```

**Example**

For example:

```js
datasource.discoverModelDefinitions(function(err, models) {
  models.forEach(function(def) {
    // def.name ~ the model name
    datasource.discoverSchema(null, def.name, function(err, schema) {
      console.log(schema);
    });
  });
});
```

### discoverModelProperties

Call `discoverModelProperties()` to discover metadata on columns (properties) of a database table.  This method returns column information for a given table/view.

`discoverModelProperties(_table_, _options_, _cb_)`

<table>
  <tbody>
    <tr>
      <td>table</td>
      <td>The name of a table or view</td>
    </tr>
    <tr>
      <td>options</td>
      <td>Options object that can have only the "owner/schema" property to specify the owner or schema name.</td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Callback function to return a list of model property definitions; see example below.</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner">Parameter</div>
      </th>
      <th>
        <div class="tablesorter-header-inner">Description</div>
      </th>
    </tr>
  </thead>
</table>

Example return value of callback function:

```
{ owner: 'STRONGLOOP',
        tableName: 'PRODUCT',
        columnName: 'ID',
        dataType: 'VARCHAR2',
        dataLength: 20,
        nullable: 'N',
        type: 'String' }
      { owner: 'STRONGLOOP',
        tableName: 'PRODUCT',
        columnName: 'NAME',
        dataType: 'VARCHAR2',
        dataLength: 64,
        nullable: 'Y',
        type: 'String' }
```

### discoverPrimaryKeys

Call `discoverPrimaryKeys()` to discover primary key definitions in a database.

`discoverPrimaryKeys(_table_, _options_, _cb_)`

<table>
  <tbody>
    <tr>
      <td>table</td>
      <td>The name of a table or view</td>
    </tr>
    <tr>
      <td>options</td>
      <td>Options object that can have only the "owner/schema" property to specify the owner or schema name.</td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Callback function to return a list of model property definitions; see example below.</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner">Parameter</div>
      </th>
      <th>
        <div class="tablesorter-header-inner">Description</div>
      </th>
    </tr>
  </thead>
</table>

Example return value of callback function:

```
{
  { owner: 'STRONGLOOP',
    tableName: 'INVENTORY',
    columnName: 'PRODUCT_ID',
    keySeq: 1,
    pkName: 'ID_PK' },
  { owner: 'STRONGLOOP',
    tableName: 'INVENTORY',
    columnName: 'LOCATION_ID',
    keySeq: 2,
    pkName: 'ID_PK' },
...
}
```

### discoverForeignKeys

Call `discoverForeignKeys()` to discover foreign key definitions from a database. 

`discoverForeignKeys(_table_, _options_, _cb_)`

<table>
  <tbody>
    <tr>
      <td>table</td>
      <td>The name of a table or view</td>
    </tr>
    <tr>
      <td>options</td>
      <td>Options object that can have only the "owner/schema" property to specify the owner or schema name.</td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Callback function to return a list of model property definitions; see example below.</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner">Parameter</div>
      </th>
      <th>
        <div class="tablesorter-header-inner">Description</div>
      </th>
    </tr>
  </thead>
</table>

Example return value of callback function:

```
{ fkOwner: 'STRONGLOOP',
      fkName: 'PRODUCT_FK',
      fkTableName: 'INVENTORY',
      fkColumnName: 'PRODUCT_ID',
      keySeq: 1,
      pkOwner: 'STRONGLOOP',
      pkName: 'PRODUCT_PK',
      pkTableName: 'PRODUCT',
      pkColumnName: 'ID' }
```

### discoverExportedForeignKeys

Call `discoverExportedForeignKeys()` to discover foreign key definitions that are exported from a database. 

`discoverExportedForeignKeys(_table_, _options_, _cb_)`

<table>
  <tbody>
    <tr>
      <td>table</td>
      <td>The name of a table or view</td>
    </tr>
    <tr>
      <td>options</td>
      <td>Options object that can have only the "owner/schema" property to specify the owner or schema name.</td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Callback function to return a list of model property definitions; see example below.</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner">Parameter</div>
      </th>
      <th>
        <div class="tablesorter-header-inner">Description</div>
      </th>
    </tr>
  </thead>
</table>

Example return value of callback function:

```
{ fkName: 'PRODUCT_FK',
      fkOwner: 'STRONGLOOP',
      fkTableName: 'INVENTORY',
      fkColumnName: 'PRODUCT_ID',
      keySeq: 1,
      pkName: 'PRODUCT_PK',
      pkOwner: 'STRONGLOOP',
      pkTableName: 'PRODUCT',
      pkColumnName: 'ID' }
```

### discoverSchemas

Use `discoverSchema` to discover LDL models from a database.  Starting with one table/view, if the `relations` option is set to true, it follows foreign keys to discover related models.

`discoverSchema(_modelName_ [, _options_] [, _cb_])`

Properties of options parameter:

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>modelName</td>
      <td>String</td>
      <td>Name of model to define</td>
    </tr>
    <tr>
      <td>options</td>
      <td>Object</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Function</td>
      <td>Callback function</td>
    </tr>
  </tbody>
</table>

#### Options

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>owner / schema</td>
      <td><code>String</code></td>
      <td>
        <p>Database owner or schema name.</p>
      </td>
    </tr>
    <tr>
      <td>relations</td>
      <td><code>Boolean</code></td>
      <td>
        <p>If true, the function will follow foreign key relations to discover related tables.</p>
      </td>
    </tr>
    <tr>
      <td>all</td>
      <td><code>Boolean</code></td>
      <td>
        <p>True to include all owners; false otherwise.</p>
      </td>
    </tr>
    <tr>
      <td>views</td>
      <td><code>Boolean</code></td>
      <td>
        <p>True to include views; false otherwise.</p>
      </td>
    </tr>
  </tbody>
</table>

**Example**

**/server/script.js**

```
dataSource.discoverSchema('INVENTORY', {owner: 'STRONGLOOP'}, function (err, schema) {
    ...
}
```

The result is shown below.

{% include important.html content="

**The result below is an example for MySQL** that contains MySQL-specific properties in addition to the regular LDL model options and properties. The 'mysql' objects contain the MySQL-specific mappings. For other databases, the key 'mysql' would be replaced by the database type, for example 'oracle', and the data type mappings would be different.

" %}

**/common/models/model.json**

```js
{
  "name": "Inventory",
  "options": {
    "idInjection": false,
    "mysql": {
      "schema": "STRONGLOOP",
      "table": "INVENTORY"
    }
  },
  "properties": {
    "productId": {
      "type": "String",
      "required": false,
      "length": 60,
      "precision": null,
      "scale": null,
      "id": 1,
      "mysql": {
        "columnName": "PRODUCT_ID",
        "dataType": "varchar",
        "dataLength": 60,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "NO"
      }
    },
    "locationId": {
      "type": "String",
      "required": false,
      "length": 60,
      "precision": null,
      "scale": null,
      "id": 2,
      "mysql": {
        "columnName": "LOCATION_ID",
        "dataType": "varchar",
        "dataLength": 60,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "NO"
      }
    },
    "available": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 10,
      "scale": 0,
      "mysql": {
        "columnName": "AVAILABLE",
        "dataType": "int",
        "dataLength": null,
        "dataPrecision": 10,
        "dataScale": 0,
        "nullable": "YES"
      }
    },
    "total": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 10,
      "scale": 0,
      "mysql": {
        "columnName": "TOTAL",
        "dataType": "int",
        "dataLength": null,
        "dataPrecision": 10,
        "dataScale": 0,
        "nullable": "YES"
      }
    }
  }
}
```

## Example of building models via discovery

The following example uses `discoverAndBuildModels()` to discover, build and try the models.

Note that the string arguments to this function are **case-sensitive**; specifically the table name (in the example below, 'account') and the owner (schema) name (in the example below, 'demo'). 

**/server/script.js**

```js
dataSource.discoverAndBuildModels('account', {
  owner: 'demo'
}, function(err, models) {
  models.Account.find(function(err, act) {
    if (err) {
      console.error(err);
    } else {
      console.log(act);
    }
    dataSource.disconnect();
  });
});
```
