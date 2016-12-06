---
title: "MySQL connector"
lang: en
layout: page
keywords: LoopBack
tags: connectors
sidebar: lb2_sidebar
permalink: /doc/en/lb2/MySQL-connector.html
summary: The MySQL connector enables LoopBack applications to connect to MySQL data sources.
---

{% include note.html content="The MySQL connector requires MySQL 5.0+.
" %}

## Installation

In your application root directory, enter this command to install the connector:

```shell
$ npm install loopback-connector-mysql --save
```

This will install the module from npm and add it as a dependency to the application's [package.json](package.json.html) file.

## Creating a MySQL data source

Use the [Data source generator](Data-source-generator.html) to add a MySQL data source to your application.
The entry in the application's `/server/datasources.json` will look like this:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"mydb": {
    "name": "mydb",
    "connector": "mysql",
}
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a MySQL database.

### Properties

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>connector</td>
      <td>String</td>
      <td>
        <p>Connector name, either "loopback-connector-mysql" or "mysql"</p>
      </td>
    </tr>
    <tr>
      <td>database</td>
      <td>String</td>
      <td>Database name</td>
    </tr>
    <tr>
      <td>debug</td>
      <td>Boolean</td>
      <td>If true, turn on verbose mode to debug database queries and lifecycle.</td>
    </tr>
    <tr>
      <td>host</td>
      <td>String</td>
      <td>Database host name</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Password to connect to database</td>
    </tr>
    <tr>
      <td>port</td>
      <td>Number</td>
      <td>Database TCP port</td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Username to connect to database</td>
    </tr>
  </tbody>
</table>

In addition to these properties, you can use additional parameters supported by [`node-mysql`](https://github.com/felixge/node-mysql),
for example `password` and `collation`. `Collation` currently defaults to `utf8_general_ci`.
The `collation` value will also be used to derive the connection charset.

## Type mappings

See [LoopBack types](LoopBack-types.html) for details on LoopBack's data types.

### LoopBack to MySQL types

<table>
  <tbody>
    <tr>
      <th>LoopBack Type</th>
      <th>MySQL Type</th>
    </tr>
    <tr>
      <td>String/JSON</td>
      <td>VARCHAR</td>
    </tr>
    <tr>
      <td>Text</td>
      <td>TEXT</td>
    </tr>
    <tr>
      <td>Number</td>
      <td>INT</td>
    </tr>
    <tr>
      <td>Date</td>
      <td>DATETIME</td>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>TINYINT(1)</td>
    </tr>
    <tr>
      <td><a href="http://apidocs.strongloop.com/loopback-datasource-juggler/#geopoint" class="external-link" rel="nofollow">GeoPoint</a>&nbsp;object</td>
      <td>POINT</td>
    </tr>
    <tr>
      <td>Custom Enum type<br>(See <a href="MySQL-connector.html#enum">Enum</a> below)&nbsp;</td>
      <td>ENUM</td>
    </tr>
  </tbody>
</table>

### MySQL to LoopBack types

<table>
  <tbody>
    <tr>
      <th>MySQL Type</th>
      <th>LoopBack Type</th>
    </tr>
    <tr>
      <td>CHAR</td>
      <td>String</td>
    </tr>
    <tr>
      <td>CHAR(1)</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>VARCHAR<br>TINYTEXT<br>MEDIUMTEXT<br>LONGTEXT<br>TEXT<br>ENUM<br>SET</td>
      <td>String</td>
    </tr>
    <tr>
      <td>TINYBLOB<br>MEDIUMBLOB<br>LONGBLOB<br>BLOB<br>BINARY<br>VARBINARY<br>BIT</td>
      <td>Node.js&nbsp;<a class="external-link" href="http://nodejs.org/api/buffer.html" rel="nofollow">Buffer object</a></td>
    </tr>
    <tr>
      <td>TINYINT<br>SMALLINT<br>INT<br>MEDIUMINT<br>YEAR<br>FLOAT<br>DOUBLE<br>NUMERIC<br>DECIMAL</td>
      <td>
        <p>Number<br>For FLOAT and DOUBLE, See <a href="MySQL-connector.html#floating-point-types">Floating-point types</a>.&nbsp;</p>
        <p>For NUMERIC and DECIMAL, see <a href="MySQL-connector.html">Fixed-point exact value types</a></p>
      </td>
    </tr>
    <tr>
      <td>DATE<br>TIMESTAMP<br>DATETIME</td>
      <td>Date</td>
    </tr>
  </tbody>
</table>

## Using the datatype field/column option with MySQL

`loopback-connector-mysql` allows mapping of LoopBack model properties to MySQL columns using the 'mysql' property of the property definition.

For example:

{% include code-caption.html content="/common/models/model.json" %}
```javascript
"locationId":{
    "type":"String",
    "required":true,
    "length":20,
    "mysql":
    {
        "columnName":"LOCATION_ID",
        "dataType":"VARCHAR2",
        "dataLength":20,
        "nullable":"N"
    }
}
```

You can also use the dataType column/property attribute to specify what MySQL column type to use for many loopback-datasource-juggler types. 
The following type-dataType combinations are supported:

* Number
* integer
* tinyint
* smallint
* mediumint
* int
* bigint

Use the `limit` option to alter the display width. Example:

```javascript
{ count : { type: Number, dataType: 'smallInt' }}
```

### Floating-point types

For Float and Double data types, use the `precision` and `scale` options to specify custom precision. Default is (16,8). For example:

```javascript
{ average : { type: Number, dataType: 'float', precision: 20, scale: 4 }}
```

### Fixed-point exact value types

For Decimal and Numeric types, use the `precision` and `scale` options to specify custom precision. Default is (9,2).
These aren't likely to function as true fixed-point.

Example:

```javascript
{ stdDev : { type: Number, dataType: 'decimal', precision: 12, scale: 8 }}
```

### Other types

Convert String / DataSource.Text / DataSource.JSON to the following MySQL types:

* varchar
* char
* text
* mediumtext
* tinytext
* longtext

Example: 

```javascript
{ userName : { type: String, dataType: 'char', limit: 24 }}
```

Example: 

```javascript
{ biography : { type: String, dataType: 'longtext' }}
```

Convert JSON Date types to  datetime or timestamp

Example: 

```javascript
{ startTime : { type: Date, dataType: 'timestamp' }}
```

### Enum

Enums are special. Create an Enum using Enum factory:

```javascript
var MOOD = dataSource.EnumFactory('glad', 'sad', 'mad'); 
MOOD.SAD; // 'sad' 
MOOD(2); // 'sad' 
MOOD('SAD'); // 'sad' 
MOOD('sad'); // 'sad'
{ mood: { type: MOOD }}
{ choice: { type: dataSource.EnumFactory('yes', 'no', 'maybe'), null: false }}
```

## Discovery methods

LoopBack provides a unified API to create models based on schema and tables in relational databases.
The same discovery API is available when using connectors for Oracle, MySQL, PostgreSQL, and SQL Server.
For more information, see [Discovering models from relational databases](Discovering-models-from-relational-databases.html) and 
[Database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).
