# loopback-connector-mysql

[MySQL](https://www.mysql.com/) is a popular open-source relational database
management system (RDBMS). The `loopback-connector-mysql` module provides the
MySQL connector module for the LoopBack framework.

## Installation

In your application root directory, enter this command to install the connector:

```sh
npm install loopback-connector-mysql --save
```

**Note**: The MySQL connector requires MySQL 5.0+.

This installs the module from npm and adds it as a dependency to the
application's `package.json` file.

If you create a MySQL data source using the data source generator as described
below, you don't have to do this, since the generator will run `npm install` for
you.

## Creating a MySQL data source

For LoopBack 4 users, use the LoopBack 4
[Command-line interface](https://loopback.io/doc/en/lb4/Command-line-interface.html)
to generate a DataSource with MySQL connector to your LB4 application. Run
[`lb4 datasource`](https://loopback.io/doc/en/lb4/DataSource-generator.html), it
will prompt for configurations such as host, post, etc. that are required to
connect to a MySQL database.

After setting it up, the configuration can be found under
`src/datasources/<DataSourceName>.datasource.ts`, which would look like this:

```ts
const config = {
  name: 'db',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: 'pass',
  database: 'testdb',
};
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

Use
the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to
add a MySQL data source to your application.  
The generator will prompt for the database server hostname, port, and other
settings required to connect to a MySQL database. It will also run the
`npm install` command above for you.

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

</details>

Edit `<DataSourceName>.datasources.ts` to add any other additional properties
that you require.

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

**NOTE**: In addition to these properties, you can use additional parameters
supported by [`node-mysql`](https://github.com/felixge/node-mysql).

## Type mappings

See [LoopBack types](http://loopback.io/doc/en/lb3/LoopBack-types.html) for
details on LoopBack's data types.

### LoopBack to MySQL types

<table>
  <thead>
    <tr>
      <th width="450">LoopBack Type</th>
      <th width="450">MySQL Type</th>
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
  <thead>
    <tr>
      <th width="450">MySQL Type</th>
      <th width="450">LoopBack Type</th>
    </tr>
  </thead>
  <tbody>
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

_NOTE_ as of v3.0.0 of MySQL Connector, the following flags were introduced:

- `treatCHAR1AsString` default `false` - treats CHAR(1) as a String instead of a
  Boolean
- `treatBIT1AsBit` default `true` - treats BIT(1) as a Boolean instead of a
  Binary
- `treatTINYINT1AsTinyInt` default `true` - treats TINYINT(1) as a Boolean
  instead of a Number

## Data mapping properties

### Table/Column Names

Besides the basic LoopBack types, as we introduced above, you can also specify
additional MySQL-specific properties for a LoopBack model. It would be mapped to
the database.

Use the `mysql.<property>` in the model definition or the property definition to
configure the table/column definition.

For example, the following settings would allow you to have custom table name
(`Custom_User`) and column name (`custom_id` and `custom_name`). Such mapping is
useful when you'd like to have different table/column names from the model:

{% include code-caption.html content="user.model.ts" %}

```ts
@model({
  settings: { mysql: { schema: 'testdb', table: 'Custom_User'} },
})
export class User extends Entity {
  @property({
    type: 'number',
    required: true,
    id: true,
    mysql: {
      columnName: 'custom_id',
    },
  })
  id: number;

  @property({
    type: 'string',
    mysql: {
      columnName: 'custom_name',
    },
  })
  name?: string;
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

```javascript
{
  "name": "User",
  "options": {
    "mysql": {
      "schema": "testdb",
      "table": "Custom_User"
    }
  },
  "properties": {
    "id": {
      "type": "Number",
      "required": true,
      "mysql": {
        "columnName": "custom_id",
      }
    },
    "name": {
      "type": "String",
      "mysql": {
        "columnName": "custom_name",
      }
    },
  }
}
```

</details>

### Numeric Types

Except the names, you can also use the dataType column/property attribute to
specify what MySQL column type to use. The following MySQL type-dataType
combinations are supported:

- number
- integer
- tinyint
- smallint
- mediumint
- int
- bigint
- float
- double
- decimal

The following examples will be in LoopBack 4 style, but it's the same if you
provide `mysql.<property>` to the LB3 property definition.

#### Floating-point types

For Float and Double data types, use the `precision` and `scale` options to
specify custom precision. Default is (16,8).

<details><summary markdown="span"><strong>Example</strong></summary>

```ts
@property({
  type: 'Number',
  mysql: {
    dataType: 'float',
    precision: 20,
    scale: 4
  }
})
price: Number;
```

</details>

#### Fixed-point exact value types

For Decimal and Numeric types, use the `precision` and `scale` options to
specify custom precision. Default is (9,2). These aren't likely to function as
true fixed-point.

<details><summary markdown="span"><strong>Example</strong></summary>

```ts
@property({
  type: 'Number',
  mysql: {
    dataType: 'decimal',
    precision: 12,
    scale: 8
  }
})
price: Number;
```

</details>

### Text types

Convert String / DataSource.Text / DataSource.JSON to the following MySQL types:

- varchar
- char
- text
- mediumtext
- tinytext
- longtext

<details><summary markdown="span"><strong>Example</strong></summary>

```ts
@property({
  type: 'String',
  mysql: {
    dataType: 'char',
    dataLength: 24 // limits the property length
  },
})
userName: String;
```

</details>

### Dat types

Convert JSON Date types to datetime or timestamp.

<details><summary markdown="span"><strong>Example</strong></summary>

```ts
@property({
  type: 'Date',
  mysql: {
    dataType: 'timestamp',
  },
})
startTime: Date;
```

</details>

### Enum

Enums are special. Create an Enum using Enum factory:

```ts
const MOOD = dataSource.EnumFactory('glad', 'sad', 'mad');
MOOD.SAD; // 'sad'
MOOD(2); // 'sad'
MOOD('SAD'); // 'sad'
MOOD('sad'); // 'sad'

export class User extends Entity {
  //..
  @property({
    type: MOOD,
  })
  mood: MOOD;
}
```

### Default Clause/Constant

Use the `default` property to have MySQL handle setting column `DEFAULT` value.

<details><summary markdown="span"><strong>Example</strong></summary>

```ts
@property({
  type: 'String',
  mysql: {
    default: 'pending'
  }
})
status: String;

@property({
  type: 'Number',
  mysql: {
    default: 42
  }
})
maxDays: Number;
```

</details>

For the date or timestamp types use `CURRENT_TIMESTAMP` or `now`.

<details><summary markdown="span"><strong>Example</strong></summary>

```ts
@property({
  type: 'Date',
  mysql: {
    default: 'CURRENT_TIMESTAMP'
  }
})
last_modified: Date;
```

</details>

**NOTE**: The following column types do **NOT** supported
[MySQL Default Values](https://dev.mysql.com/doc/refman/5.7/en/data-type-defaults.html):

- BLOB
- TEXT
- GEOMETRY
- JSON

## Discovery and auto-migration

### Model discovery

The MySQL connector supports _model discovery_ that enables you to create
LoopBack models based on an existing database schema. Once you defined your
datasource:

- LoopBack 4 users could use the commend
  [`lb4 discover`](https://loopback.io/doc/en/lb4/Discovering-models.html) to
  discover models.
- For LB3 users, please check
  [Discovering models from relational databases](https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html).
  (See
  [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels)
  for related APIs information)

### Auto-migration

The MySQL connector also supports _auto-migration_ that enables you to create a
database schema from LoopBack models. For example, based on the following model,
the auto-migration method would create/alter existing `Customer` table in the
database. Table `Customer` would have two columns: `name` and `id`, where `id`
is also the primary key that has `auto_increment` set as it has definition of
`type: 'Number'` and `generated: true`:

```ts
@model()
export class Customer extends Entity {
  @property({
    id: true,
    type: 'Number',
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  name: string;
}
```

Moreover, additional MySQL-specific properties mentioned in the
[Data mapping properties](#data-mapping-properties) section work with
auto-migration as well.

#### Auto-generated ids

For now LoopBack MySQL connector only supports auto-generated id
(`generated: true`) for integer type as for MySQL, the default id type is
_integer_. If you'd like to use other types such as string (uuid) as the id
type, you can:

- use uuid that is **generated by your LB application** by setting
  [`defaultFn: uuid`](https://loopback.io/doc/en/lb4/Model.html#property-decorator).

```ts
  @property({
    id: true,
    type: 'string'
    defaultFn: 'uuidv4',
    // generated: true,  -> not needed
  })
  id: string;
```

- Alter the table in your database to use a certain function if you prefer
  having **the database to generate the value**.

```ts
  @property({
    id: true,
    type: 'string'
    generated: true,  // to indicate the value generates by the db
    useDefaultIdType: false,  // needed
  })
  id: string;
```

#### Auto-migrate/Auto-update models with foreign keys

Foreign key constraints can be defined in the model definition.

**Note**: The order of table creation is important. A referenced table must
exist before creating a foreign key constraint.

Define your models and the foreign key constraints as follows:

{% include code-caption.html content="customer.model.ts" %}

```ts
@model()
export class Customer extends Entity {
  @property({
    id: true,
    type: 'Number',
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  name: string;
}
```

`order.model.ts`:

```ts
@model({
  settings: {
    foreignKeys: {
      fk_order_customerId: {
        name: 'fk_order_customerId',
        entity: 'Customer',
        entityKey: 'id',
        foreignKey: 'customerId',
      },
    },
  })
export class Order extends Entity {
  @property({
    id: true,
    type: 'Number',
    generated: true
  })
  id: number;

  @property({
    type: 'string'
  })
  name: string;

  @property({
    type: 'Number'
  })
  customerId: number;
}
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

```json
({
  "name": "Customer",
  "options": {
    "idInjection": false
  },
  "properties": {
    "id": {
      "type": "Number",
      "id": 1
    },
    "name": {
      "type": "String",
      "required": false
    }
  }
},
{
  "name": "Order",
  "options": {
    "idInjection": false,
    "foreignKeys": {
      "fk_order_customerId": {
        "name": "fk_order_customerId",
        "entity": "Customer",
        "entityKey": "id",
        "foreignKey": "customerId"
      }
    }
  },
  "properties": {
    "id": {
      "type": "Number"
      "id": 1
    },
    "customerId": {
      "type": "Number"
    },
    "description": {
      "type": "String",
      "required": false
    }
  }
})
```

</details>

MySQL handles the foreign key integrity by the referential action specified by
`ON UPDATE` and `ON DELETE`. You can specify which referential actions the
foreign key follows in the model definition upon auto-migrate or auto-update
operation. Both `onDelete` and `onUpdate` default to `restrict`.

Take the example we showed above, let's add the referential action to the
foreign key `customerId`:

```ts
@model({
  settings: {
    foreignKeys: {
      fk_order_customerId: {
        name: 'fk_order_customerId',
        entity: 'Customer',
        entityKey: 'id',
        foreignKey: 'customerId',
        onUpdate: 'restrict', // restrict|cascade|set null|no action|set default
        onDelete: 'cascade'   // restrict|cascade|set null|no action|set default
      },
    },
  })
export class Order extends Entity {
...
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

**model-definiton.json**

```json
{
  "name": "Customer",
  "options": {
    "idInjection": false
  },
  "properties": {
    "id": {
      "type": "Number",
      "id": 1
    },
    "name": {
      "type": "String",
      "required": false
    }
  }
},
{
  "name": "Order",
  "options": {
    "idInjection": false,
    "foreignKeys": {
      "fk_order_customerId": {
        "name": "fk_order_customerId",
        "entity": "Customer",
        "entityKey": "id",
        "foreignKey": "customerId",
        "onUpdate": "restrict",
        "onDelete": "cascade"
      }
    }
  },
  "properties": {
    "id": {
      "type": "Number"
      "id": 1
    },
    "customerId": {
      "type": "Number"
    },
    "description": {
      "type": "String",
      "required": false
    }
  }
}
```

**boot-script.js**

```js
module.exports = function (app) {
  var mysqlDs = app.dataSources.mysqlDS;
  var Book = app.models.Order;
  var Author = app.models.Customer;

  // first autoupdate the `Customer` model to avoid foreign key constraint failure
  mysqlDs.autoupdate('Customer', function (err) {
    if (err) throw err;
    console.log('\nAutoupdated table `Customer`.');

    mysqlDs.autoupdate('Order', function (err) {
      if (err) throw err;
      console.log('\nAutoupdated table `Order`.');
      // at this point the database table `Order` should have one foreign key `customerId` integrated
    });
  });
};
```

</details>

#### Breaking Changes with GeoPoint since 5.x

Prior to `loopback-connector-mysql@5.x`, MySQL connector was saving and loading
GeoPoint properties from the MySQL database in reverse. MySQL expects values to
be `POINT(X, Y)` or `POINT(lng, lat)`, but the connector was saving them in the
opposite order(i.e. `POINT(lat,lng)`).

Use the `geopoint` type to achieve so:

```ts
  @property({
    type: 'geopoint'
  })
  name: GeoPoint;
```

If you have an application with a model that has a GeoPoint property using
previous versions of this connector, you can migrate your models using the
following programmatic approach:

<details><summary markdown="span"><strong>Click here to expend</strong></summary>

**NOTE** Please back up the database tables that have your application data
before performing any of the steps.

1. Create a boot script under `server/boot/` directory with the following:

```js
'use strict';
module.exports = function (app) {
  function findAndUpdate() {
    var teashop = app.models.teashop;
    //find all instances of the model we'd like to migrate
    teashop.find({}, function (err, teashops) {
      teashops.forEach(function (teashopInstance) {
        //what we fetch back from the db is wrong, so need to revert it here
        var newLocation = {
          lng: teashopInstance.location.lat,
          lat: teashopInstance.location.lng,
        };
        //only update the GeoPoint property for the model
        teashopInstance.updateAttribute('location', newLocation, function (
          err,
          inst,
        ) {
          if (err) console.log('update attribute failed', err);
          else console.log('updateAttribute successful');
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

</details>

## Running tests

### Own instance

If you have a local or remote MySQL instance and would like to use that to run
the test suite, use the following command:

- Linux

```bash
MYSQL_HOST=<HOST> MYSQL_PORT=<PORT> MYSQL_USER=<USER> MYSQL_PASSWORD=<PASSWORD> MYSQL_DATABASE=<DATABASE> CI=true npm test
```

- Windows

```bash
SET MYSQL_HOST=<HOST> SET MYSQL_PORT=<PORT> SET MYSQL_USER=<USER> SET MYSQL_PASSWORD=<PASSWORD> SET MYSQL_DATABASE=<DATABASE> SET CI=true npm test
```

### Docker

If you do not have a local MySQL instance, you can also run the test suite with
very minimal requirements.

- Assuming you have [Docker](https://docs.docker.com/engine/installation/)
  installed, run the following script which would spawn a MySQL instance on your
  local:

```bash
source setup.sh <HOST> <PORT> <USER> <PASSWORD> <DATABASE>
```

where `<HOST>`, `<PORT>`, `<USER>`, `<PASSWORD>` and `<DATABASE>` are optional
parameters. The default values are `localhost`, `3306`, `root`, `pass` and
`testdb` respectively.

- Run the test:

```bash
npm test
```
