# loopback-connector-mysql

[MySQL](https://www.mysql.com/) is a popular open-source relational database management system (RDBMS).  The `loopback-connector-mysql` module provides the MySQL connector module for the LoopBack framework.

<div class="gh-only">See also <a href="http://loopback.io/doc/en/lb3/MySQL-connector.html">LoopBack MySQL Connector</a> in LoopBack documentation.
<br/><br/>
<b>NOTE</b>: The MySQL connector requires MySQL 5.0+.
</div>

## Installation

In your application root directory, enter this command to install the connector:

```sh
npm install loopback-connector-mysql --save
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

If you create a MySQL data source using the data source generator as described below, you don't have to do this, since the generator will run `npm install` for you.

## Creating a MySQL data source

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a MySQL data source to your application.  
The generator will prompt for the database server hostname, port, and other settings
required to connect to a MySQL database.  It will also run the `npm install` command above for you.

The entry in the application's `/server/datasources.json` will look like this:

```javascript
"mydb": {
  "name": "mydb",
  "connector": "mysql",
  "host": "myserver",
  "port": 3306,
  "database": "mydb",
  "password": "mypassword",
  "user": "admin"
 }
```

Edit `datasources.json` to add any other additional properties that you require.

### Properties

<table>
  <thead>
    <tr>
      <th width="150">Property</th>
      <th width="80">Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>collation</td>
      <td>String</td>
      <td>Determines the charset for the connection.  Default is utf8_general_ci.</td>
    </tr>
    <tr>
      <td>connector</td>
      <td>String</td>
      <td>Connector name, either “loopback-connector-mysql” or “mysql”.</td>
    </tr>
    <tr>
      <td>connectionLimit</td>
      <td>Number</td>
      <td>The maximum number of connections to create at once.  Default is 10.</td>
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
      <td>socketPath</td>
      <td>String</td>
      <td>The path to a unix domain socket to connect to. When used host and port are ignored.</td>
    </tr>
    <tr>
      <td>supportBigNumbers</td>
      <td>Boolean</td>
      <td>Enable this option to deal with big numbers (BIGINT and DECIMAL columns) in the database. Default is false.</td>
    </tr>
    <tr>
      <td>timeZone</td>
      <td>String</td>
      <td>The timezone used to store local dates.  Default is ‘local’.</td>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>Connection URL of form <code>mysql://user:password@host/db</code>.  Overrides other connection settings.</td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Username to connect to database</td>
    </tr>
  </tbody>
</table>

**NOTE**: In addition to these properties, you can use additional parameters supported by [`node-mysql`](https://github.com/felixge/node-mysql).

## Type mappings

See [LoopBack types](http://loopback.io/doc/en/lb3/LoopBack-types.html) for details on LoopBack's data types.

### LoopBack to MySQL types

<table>
  <thead>
    <tr>
      <th>LoopBack Type</th>
      <th>MySQL Type</th>
    </tr>
  </thead>
  <tbody>    
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
      <td><a href="http://apidocs.strongloop.com/loopback-datasource-juggler/#geopoint" class="external-link">GeoPoint</a> object</td>
      <td>POINT</td>
    </tr>
    <tr>
      <td>Custom Enum type<br>(See <a href="#enum">Enum</a> below)</td>
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
      <td>BIT(1)<br>CHAR(1)<br>TINYINT(1)</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>VARCHAR<br>TINYTEXT<br>MEDIUMTEXT<br>LONGTEXT<br>TEXT<br>ENUM<br>SET</td>
      <td>String</td>
    </tr>
    <tr>
      <td>TINYBLOB<br>MEDIUMBLOB<br>LONGBLOB<br>BLOB<br>BINARY<br>VARBINARY<br>BIT</td>
      <td>Node.js <a href="http://nodejs.org/api/buffer.html">Buffer object</a></td>
    </tr>
    <tr>
      <td>TINYINT<br>SMALLINT<br>INT<br>MEDIUMINT<br>YEAR<br>FLOAT<br>DOUBLE<br>NUMERIC<br>DECIMAL</td>
      <td>
        <p>Number<br>For FLOAT and DOUBLE, see <a href="#floating-point-types">Floating-point types</a>. </p>
        <p>For NUMERIC and DECIMAL, see <a href="MySQL-connector.html">Fixed-point exact value types</a></p>
      </td>
    </tr>
    <tr>
      <td>DATE<br>TIMESTAMP<br>DATETIME</td>
      <td>Date</td>
    </tr>
  </tbody>
</table>

*NOTE* as of v3.0.0 of MySQL Connector, the following flags were introduced:

* `treatCHAR1AsString`
  default `false` - treats CHAR(1) as a String instead of a Boolean
* `treatBIT1AsBit`
  default `true` - treats BIT(1) as a Boolean instead of a Binary
* `treatTINYINT1AsTinyInt`
  default `true` - treats TINYINT(1) as a Boolean instead of a Number

## Using the datatype field/column option with MySQL

Use the `mysql` model property to specify additional MySQL-specific properties for a LoopBack model.

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
        "dataType":"VARCHAR",
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
{ userName : {
    type: String,
    dataType: 'char',
    limit: 24
  }
}
```

### Default Clause/Constant
Use the `default` property to have MySQL handle setting column `DEFAULT` value.
```javascript
"status": {
  "type": "string",
  "mysql": {
    "default": "pending"
  }
},
"number": {
  "type": "number",
  "mysql": {
    "default": 256
  }
}
```
For the date or timestamp types use `CURRENT_TIMESTAMP` or `now`:
```javascript
"last_modified": {
  "type": "date",
  "mysql": {
    "default":"CURRENT_TIMESTAMP"
  }
}
```
**NOTE**: The following column types do **NOT** supported [MySQL Default Values](https://dev.mysql.com/doc/refman/5.7/en/data-type-defaults.html):
- BLOB
- TEXT
- GEOMETRY
- JSON

### Floating-point types

For Float and Double data types, use the `precision` and `scale` options to specify custom precision. Default is (16,8). For example:

```javascript
{ average :
  { type: Number,
    dataType: 'float',
    precision: 20,
    scale: 4
  }
}
```

### Fixed-point exact value types

For Decimal and Numeric types, use the `precision` and `scale` options to specify custom precision. Default is (9,2).
These aren't likely to function as true fixed-point.

Example:

```javascript
{ stdDev :
  { type: Number, 
    dataType: 'decimal',
    precision: 12,
    scale: 8
  }
}
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
{ userName :
  { type: String,
    dataType: 'char',
    limit: 24
  }
}
```

Example: 

```javascript
{ biography :
  { type: String,
  dataType: 'longtext'
  }
}
```

Convert JSON Date types to  datetime or timestamp

Example: 

```javascript
{ startTime :
  { type: Date,
    dataType: 'timestamp'
  }
}
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

## Discovery and auto-migration

### Model discovery

The MySQL connector supports _model discovery_ that enables you to create LoopBack models
based on an existing database schema using the unified [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).  For more information on discovery, see [Discovering models from relational databases](https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html).

### Auto-migration

The MySQL connector also supports _auto-migration_ that enables you to create a database schema
from LoopBack models using the [LoopBack automigrate method](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate).

For more information on auto-migration, see [Creating a database schema from models](https://loopback.io/doc/en/lb3/Creating-a-database-schema-from-models.html) for more information.

#### Auto-migrate/Auto-update models with foreign keys

MySQL handles the foreign key integrity of the related models upon auto-migrate or auto-update operation. It first deletes any related models before calling delete on the models with the relationship.

Example:

**model-definiton.json**
```json
{
  "name": "Book",
  "base": "PersistedModel",
  "idInjection": false,
  "properties": {
    "bId": {
      "type": "number",
      "id": true,
      "required": true
    },
    "name": {
      "type": "string"
    },
    "isbn": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "author": {
      "type": "belongsTo",
      "model": "Author",
      "foreignKey": "authorId"
    }
  },
  "acls": [],
  "methods": {},
  "foreignKeys": {
    "authorId": {
      "name": "authorId",
      "foreignKey": "authorId",
      "entityKey": "aId",
      "entity": "Author"
    }
  }
}
```

```json
{
  "name": "Author",
  "base": "PersistedModel",
  "idInjection": false,
  "properties": {
    "aId": {
      "type": "number",
      "id": true,
      "required": true
    },
    "name": {
      "type": "string"
    },
    "dob": {
      "type": "date"
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```

**boot-script.js**
```js
module.exports = function(app) {
  var mysqlDs = app.dataSources.mysqlDS;
  var Book = app.models.Book;
  var Author = app.models.Author;

  // first autoupdate the `Author` model to avoid foreign key constraint failure
  mysqlDs.autoupdate('Author', function(err) {
    if (err) throw err;
    console.log('\nAutoupdated table `Author`.');

    mysqlDs.autoupdate('Book', function(err) {
      if (err) throw err;
      console.log('\nAutoupdated table `Book`.');
      // at this point the database table `Book` should have one foreign key `authorId` integrated
    });
  });
};
```
#### Breaking Changes with GeoPoint since 5.x
Prior to `loopback-connector-mysql@5.x`, MySQL connector was saving and loading GeoPoint properties from the MySQL database in reverse.
MySQL expects values to be POINT(X, Y) or POINT(lng, lat), but the connector was saving them in the opposite order(i.e. POINT(lat,lng)).
If you have an application with a model that has a GeoPoint property using previous versions of this connector, you can migrate your models
using the following programmatic approach:
**NOTE** Please back up the database tables that have your application data before performing any of the steps.
1. Create a boot script under `server/boot/` directory with the following:
```js
'use strict';
module.exports = function(app) {
  function findAndUpdate() {
    var teashop = app.models.teashop;
    //find all instances of the model we'd like to migrate
    teashop.find({}, function(err, teashops) {
      teashops.forEach(function(teashopInstance) {
        //what we fetch back from the db is wrong, so need to revert it here
        var newLocation = {lng: teashopInstance.location.lat, lat: teashopInstance.location.lng};
        //only update the GeoPoint property for the model
        teashopInstance.updateAttribute('location', newLocation, function(err, inst) {
          if (err)
            console.log('update attribute failed ', err);
          else
        console.log('updateAttribute successful');
        });
      });
    });
  }

  findAndUpdate();
};
```
2. Run the boot script by simply running your application or `node .`

For the above example, the model definition is as follows:
```json
{
  "name": "teashop",
  "base": "PersistedModel",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "name": {
      "type": "string",
      "default": "storename"
    },
    "location": {
      "type": "geopoint"
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```

## Running tests

### Own instance
If you have a local or remote MySQL instance and would like to use that to run the test suite, use the following command:
- Linux
```bash
MYSQL_HOST=<HOST> MYSQL_PORT=<PORT> MYSQL_USER=<USER> MYSQL_PASSWORD=<PASSWORD> MYSQL_DATABASE=<DATABASE> CI=true npm test
```
- Windows
```bash
SET MYSQL_HOST=<HOST> SET MYSQL_PORT=<PORT> SET MYSQL_USER=<USER> SET MYSQL_PASSWORD=<PASSWORD> SET MYSQL_DATABASE=<DATABASE> SET CI=true npm test
```

### Docker
If you do not have a local MySQL instance, you can also run the test suite with very minimal requirements.
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a MySQL instance on your local:
```bash
source setup.sh <HOST> <PORT> <USER> <PASSWORD> <DATABASE>
```
where `<HOST>`, `<PORT>`, `<USER>`, `<PASSWORD>` and `<DATABASE>` are optional parameters. The default values are `localhost`, `3306`, `root`, `pass` and `testdb` respectively.
- Run the test:
```bash
npm test
```
