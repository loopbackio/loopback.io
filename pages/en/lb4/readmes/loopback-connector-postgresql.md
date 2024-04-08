# loopback-connector-postgresql

[PostgreSQL](https://www.postgresql.org/), is a popular open-source object-relational database.
The `loopback-connector-postgresql` module is the PostgreSQL connector for the LoopBack framework.

<div class="gh-only">
The PostgreSQL connector supports both LoopBack 3 and LoopBack 4. For more information, see
<a href="https://loopback.io/doc/en/lb4/PostgreSQL-connector.html">LoopBack 4 documentation</a>,
<a href="http://loopback.io/doc/en/lb3/PostgreSQL-connector.html">LoopBack 3 documentation</a>
and <a href="#module-long-term-support-policy">Module Long Term Support Policy</a> below.
<br/><br/>
NOTE: The PostgreSQL connector requires PostgreSQL 8.x or 9.x.
</div>

## Installation

In your application root directory, enter this command to install the connector:

```shell
$ npm install loopback-connector-postgresql --save
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

If you create a PostgreSQL data source using the data source generator as described below, you don't have to do this, since the generator will run `npm install` for you.

## Creating a data source

For LoopBack 4 users, use the LoopBack 4 [Command-line interface](https://loopback.io/doc/en/lb4/Command-line-interface.html) to generate a DataSource with PostgreSQL connector to your LB4 application. Run [`lb4 datasource`](https://loopback.io/doc/en/lb4/DataSource-generator.html), it will prompt for configurations such as host, post, etc. that are required to connect to a PostgreSQL database.

After setting it up, the configuration can be found under `src/datasources/<DataSourceName>.datasource.ts`, which would look like this:

```ts
const config = {
  name: 'db',
  connector: 'postgresql',
  url: '',
  host:'localhost',
  port: 5432,
  user: 'user',
  password: 'pass',
  database: 'testdb',
};
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a PostgreSQL data source to your application.
The generator will prompt for the database server hostname, port, and other settings
required to connect to a PostgreSQL database. It will also run the `npm install` command above for you.

The entry in the application's `/server/datasources.json` will look like this:

{% include code-caption.html content="/server/datasources.json" %}

```javascript
"mydb": {
  "name": "mydb",
  "connector": "postgresql"
  "host": "mydbhost",
  "port": 5432,
  "url": "postgres://admin:admin@mydbhost:5432/db1?ssl=false",
  "database": "db1",
  "password": "admin",
  "user": "admin",
  "ssl": false
}
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a PostgreSQL database.

</details>

### Connection Pool Settings

You can also specify connection pool settings in `<DataSourceName>.datasource.ts` ( or `datasources.json` for LB3 users). For instance you can specify the minimum and the maximum pool size, and the maximum pool client's idle time before closing the client.

Example of `db.datasource.ts`:

```ts
const config = {
  name: 'db',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'user',
  password: 'pass',
  database: 'testdb',
  min: 5,
  max: 200,
  idleTimeoutMillis: 60000,
  ssl: false
};
```

Check out [node-pg-pool](https://github.com/brianc/node-pg-pool) and [node postgres pooling example](https://github.com/brianc/node-postgres#pooling-example) for more information.

### Configuration options

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
    <tbody>
    <tr>
      <td>connector</td>
      <td>String</td>
      <td>
        Connector name, either "loopback-connector-postgresql" or "postgresql"
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
      <td>url</td>
      <td>String</td>
      <td>Use instead of the<code>host</code>,<code>port</code>,<code>user</code>,<code>password</code>,
        and<code>database</code>properties. For example:'postgres://test:mypassword@localhost:5432/dev'.
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Username to connect to database</td>
    </tr>
    <tr>
      <td>min</td>
      <td>Integer</td>
      <td>Minimum number of clients in the connection pool</td>
    </tr>
    <tr>
      <td>max</td>
      <td>Integer</td>
      <td>Maximum number of clients in the connection pool</td>
    </tr>
    <tr>
      <td>idleTimeoutMillis</td>
      <td>Integer</td>
      <td>Maximum time a client in the pool has to stay idle before closing it</td>
    </tr>
    <tr>
      <td>ssl</td>
      <td>Boolean</td>
      <td>Whether to try SSL/TLS to connect to server</td>
    </tr>
    <tr>
      <td>defaultIdSort</td>
      <td>Boolean/String</td>
      <td>Set to <code>false</code> to disable default sorting on <code>id</code> column(s). Set to <code>numericIdOnly</code> to only apply to IDs with a number type <code>id</code>.</td>
    </tr>
    <tr>
      <td>allowExtendedOperators</td>
      <td>Boolean</td>
      <td>Set to <code>true</code> to enable PostgreSQL-specific operators
          such as <code>contains</code>. Learn more in
          <a href="#extended-operators">Extended operators</a> below.
      </td>
    </tr>
  </tbody>
</table>

**NOTE**: By default, the 'public' schema is used for all tables.

The PostgreSQL connector uses [node-postgres](https://github.com/brianc/node-postgres) as the driver. For more
information about configuration parameters, see [node-postgres documentation](https://github.com/brianc/node-postgres/wiki/Client#constructors).

### Connecting to UNIX domain socket

A common PostgreSQL configuration is to connect to the UNIX domain socket `/var/run/postgresql/.s.PGSQL.5432` instead of using the TCP/IP port. For example:

```ts
const config = {
  name: 'db',
  connector: 'postgresql',
  url: '',
  host: '/var/run/postgresql/',
  port: 5432,
  user: 'user',
  password: 'pass',
  database: 'testdb',
  debug: true
};
```

## Defining models

LoopBack allows you to specify some database settings through the model definition and/or the property definition. These definitions would be mapped to the database. Please check out the CLI [`lb4 model`](https://loopback.io/doc/en/lb4/Model-generator.html) for generating LB4 models. The following is a typical LoopBack 4 model that specifies the schema, table and column details through model definition and property definitions:

```ts
@model({
  settings: { postgresql: { schema: 'public', table: 'inventory'} },
})
export class Inventory extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'name',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  name?: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {
      columnName: 'available',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  available: boolean;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

The model definition consists of the following properties.

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>Camel-case of the database table name</td>
      <td>Name of the model.</td>
    </tr>
    <tr>
      <td>options</td>
      <td>N/A</td>
      <td>Model level operations and mapping to PostgreSQL schema/table</td>
    </tr>
    <tr>
      <td>properties</td>
      <td>N/A</td>
      <td>Property definitions, including mapping to PostgreSQL column</td>
    </tr>
  </tbody>
</table>

For example:

{% include code-caption.html content="/common/models/model.json" %}

```javascript
{
  "name": "Inventory",
  "options": {
    "idInjection": false,
    "postgresql": {
      "schema": "strongloop",
      "table": "inventory"
    }
  },
  "properties": {
    "id": {
      "type": "String",
      "required": false,
      "length": 64,
      "precision": null,
      "scale": null,
      "postgresql": {
        "columnName": "id",
        "dataType": "character varying",
        "dataLength": 64,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "NO"
      }
    },
    "productId": {
      "type": "String",
      "required": false,
      "length": 20,
      "precision": null,
      "scale": null,
      "id": 1,
      "postgresql": {
        "columnName": "product_id",
        "dataType": "character varying",
        "dataLength": 20,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "YES"
      }
    },
    "locationId": {
      "type": "String",
      "required": false,
      "length": 20,
      "precision": null,
      "scale": null,
      "id": 1,
      "postgresql": {
        "columnName": "location_id",
        "dataType": "character varying",
        "dataLength": 20,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "YES"
      }
    },
    "available": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 32,
      "scale": 0,
      "postgresql": {
        "columnName": "available",
        "dataType": "integer",
        "dataLength": null,
        "dataPrecision": 32,
        "dataScale": 0,
        "nullable": "YES"
      }
    },
    "total": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 32,
      "scale": 0,
      "postgresql": {
        "columnName": "total",
        "dataType": "integer",
        "dataLength": null,
        "dataPrecision": 32,
        "dataScale": 0,
        "nullable": "YES"
      }
    }
  }
}
```

</details>

To learn more about specifying database settings, please check the section [Data Mapping Properties](https://loopback.io/doc/en/lb4/Model.html#data-mapping-properties).

## Type mapping

See [LoopBack 4 types](http://loopback.io/doc/en/lb4/LoopBack-types.html) (or [LoopBack 3 types](http://loopback.io/doc/en/lb3/LoopBack-types.html)) for
details on LoopBack's data types.

### LoopBack to PostgreSQL types

<table>
  <thead>
    <tr>
      <th width="450">LoopBack Type</th>
      <th width="450">PostgreSQL Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>String<br>JSON<br>Text<br>Default</td>
      <td>
        VARCHAR2<br/>
        Default length is 1024
      </td>
    </tr>
     <tr>
      <td>String[]</td>
      <td>
        VARCHAR2[]
      </td>
    </tr>
    <tr>
      <td>Number</td>
      <td>INTEGER</td>
    </tr>
    <tr>
      <td>Date</td>
      <td>TIMESTAMP WITH TIME ZONE</td>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>BOOLEAN</td>
    </tr>
  </tbody>
</table>

Besides the basic LoopBack types, as we introduced above, you can also specify the database type for model properties. It would be mapped to the database (see [Data Mapping Properties](https://loopback.io/doc/en/lb4/Model.html#data-mapping-properties)). For example, we would like the property `price` to have database type `double precision` in the corresponding table in the database, we have specify it as following:

```ts
  @property({
    type: 'number',
    postgresql: {
      dataType: 'double precision',
    },
  })
  price?: number;
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

```javascript
"properties": {
    // ..
    "price": {
      "type": "Number",
      "postgresql": {
        "dataType": "double precision",
      }
    },
```

</details>

{% include warning.html content="
Not all database types are supported for operating CRUD operations and queries with filters. For example, type Array cannot be filtered correctly, see GitHub issues: [# 441](https://github.com/loopbackio/loopback-connector-postgresql/issues/441) and [# 342](https://github.com/loopbackio/loopback-connector-postgresql/issues/342).
" %}

### PostgreSQL types to LoopBack

<table>
  <thead>
    <tr>
      <th width="450">PostgreSQL Type</th>
      <th width="450">LoopBack Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>BOOLEAN</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>
        VARCHAR<br>CHARACTER VARYING<br>CHARACTER<br>CHAR<br>TEXT
      </td>
      <td>String</td>
    </tr>
    <tr>
      <td>BYTEA</td>
      <td>Node.js <a href="http://nodejs.org/api/buffer.html">Buffer object</a></td>
    </tr>
    <tr>
      <td>SMALLINT<br>INTEGER<br>BIGINT<br>DECIMAL<br>NUMERIC<br>REAL<br>DOUBLE PRECISION<br>FLOAT<br>SERIAL<br>BIGSERIAL</td>
      <td>Number</td>
    </tr>
    <tr>
      <td>DATE<br>TIMESTAMP<br>TIMESTAMP WITH TIME ZONE<br>TIMESTAMP WITHOUT TIME ZONE<br>TIME<br>TIME WITH TIME ZONE<br>TIME WITHOUT TIME ZONE</td>
      <td>Date</td>
    </tr>
    <tr>
      <td>POINT</td>
      <td><a href="http://apidocs.strongloop.com/loopback-datasource-juggler/#geopoint">GeoPoint</a></td>
    </tr>
  </tbody>
</table>

## Numeric Data Type

**Note**: The [node.js driver for postgres](https://github.com/brianc/node-postgres) by default casts `Numeric` type as a string on `GET` operation. This is to avoid _data precision loss_ since `Numeric` types in postgres cannot be safely converted to JavaScript `Number`.

For details, see the corresponding [driver issue](https://github.com/brianc/node-pg-types/issues/28).

## Querying JSON fields

**Note** The fields you are querying should be setup to use the JSON postgresql data type - see Defining models

Assuming a model such as this:

```ts
  @property({
    type: 'number',
    postgresql: {
      dataType: 'double precision',
    },
  })
  price?: number;
```

You can query the nested fields with dot notation:

```ts
CustomerRepository.find({
  where: {
    address.state: 'California',
  },
  order: 'address.city',
});
```

## Extended operators

PostgreSQL supports the following PostgreSQL-specific operators:

- [`contains`](#operator-contains)
- [`containedBy`](#operator-containedby)
- [`containsAny`](#operator-containsany)
- [`match`](#operator-match)

Please note extended operators are disabled by default, you must enable
them at datasource level or model level by setting `allowExtendedOperators` to
`true`.

### Operator `contains`

The `contains` operator allow you to query array properties and pick only
rows where the stored value contains all of the items specified by the query.

The operator is implemented using PostgreSQL [array operator
`@>`](https://www.postgresql.org/docs/current/functions-array.html).

**Note** The fields you are querying must be setup to use the postgresql array data type - see [Defining models](#defining-models) above.

Assuming a model such as this:

```ts
@model({
  settings: {
    allowExtendedOperators: true,
  }
})
class Post {
  @property({
    type: ['string'],
    postgresql: {
      dataType: 'varchar[]',
    },
  })
  categories?: string[];
}
```

You can query the tags fields as follows:

```ts
const posts = await postRepository.find({
  where: {
    {
      categories: {'contains': ['AA']},
    }
  }
});
```

### Operator `containedBy`

Inverse of the `contains` operator, the `containedBy` operator allow you to query array properties and pick only
rows where the all the items in the stored value are contained by the query.

The operator is implemented using PostgreSQL [array operator
`<@`](https://www.postgresql.org/docs/current/functions-array.html).

**Note** The fields you are querying must be setup to use the postgresql array data type - see [Defining models](#defining-models) above.

Assuming a model such as this:

```ts
@model({
  settings: {
    allowExtendedOperators: true,
  }
})
class Post {
  @property({
    type: ['string'],
    postgresql: {
      dataType: 'varchar[]',
    },
  })
  categories?: string[];
}
```

You can query the tags fields as follows:

```ts
const posts = await postRepository.find({
  where: {
    {
      categories: {'containedBy': ['AA']},
    }
  }
});
```

### Operator `containsAnyOf`

The `containsAnyOf` operator allow you to query array properties and pick only
rows where the any of the items in the stored value matches any of the items in the query.

The operator is implemented using PostgreSQL [array overlap operator
`&&`](https://www.postgresql.org/docs/current/functions-array.html).

**Note** The fields you are querying must be setup to use the postgresql array data type - see [Defining models](#defining-models) above.

Assuming a model such as this:

```ts
@model({
  settings: {
    allowExtendedOperators: true,
  }
})
class Post {
  @property({
    type: ['string'],
    postgresql: {
      dataType: 'varchar[]',
    },
  })
  categories?: string[];
}
```

You can query the tags fields as follows:

```ts
const posts = await postRepository.find({
  where: {
    {
      categories: {'containsAnyOf': ['AA']},
    }
  }
});
```

### Operator `match`

The `match` operator allows you to perform a [full text search using the `@@` operator](https://www.postgresql.org/docs/10/textsearch-tables.html#TEXTSEARCH-TABLES-SEARCH) in PostgreSQL.

Assuming a model such as this:
```ts
@model({
  settings: {
    allowExtendedOperators: true,
  }
})
class Post {
  @property({
    type: 'string',
  })
  content: string;
}
```
You can query the content field as follows:

```ts
const posts = await postRepository.find({
  where: {
    {
      content: {match: 'someString'},
    }
  }
});
```

## Discovery and auto-migration

### Model discovery

The PostgreSQL connector supports _model discovery_ that enables you to create LoopBack models
based on an existing database schema. Once you defined your datasource:
-  LoopBack 4 users could use the commend [`lb4 discover`](https://loopback.io/doc/en/lb4/Discovering-models.html) to discover models.
- For LB3 users, please check [Discovering models from relational databases](https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html).

(See [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels) for related APIs information)

### Auto-migration

The PostgreSQL connector also supports _auto-migration_ that enables you to create a database schema
from LoopBack models.

For example, based on the following model, the auto-migration method would create/alter existing `customer` table under `public` schema in the database. Table `customer` would have two columns: `name` and `id`, where `id` is also the primary key and has the default value `SERIAL` as it has definition of `type: 'Number'` and `generated: true`:

```ts
@model()
export class Customer extends Entity {
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
}
```

By default, tables generated by the auto-migration are under `public` schema and named in lowercase.

Besides the basic model metadata, LoopBack allows you to specify part of the database schema definition via the
property definition, which would be mapped to the database.

For example, based on the following model, after running the auto-migration script, a table named `CUSTOMER` under schema `market` will be created. Moreover, you can also have different names for your property and the corresponding column. In the example, by specifying the column name, the property `name` will be mapped to the `customer_name` column. This is useful when your database has a different naming convention than LoopBack (camelCase).

```ts
@model(
  settings: {
    postgresql: {schema: 'market', table: 'CUSTOMER'},
  }
)
export class Customer extends Entity {
  @property({
    id: true,
    type: 'Number',
    generated: true
  })
  id: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'customer_name'
    }
  })
  name: string;
}
```

For how to run the script and more details:
- For LB4 users, please check [Database Migration](https://loopback.io/doc/en/lb4/Database-migrations.html)
- For LB3 users, please check [Creating a database schema from models](https://loopback.io/doc/en/lb3/Creating-a-database-schema-from-models.html)

(See [LoopBack auto-migrate method](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate) for related APIs information)

Here are some limitations and tips:

- If you defined `generated: true` in the id property, it generates integers by default. For auto-generated uuid, see [Auto-generated id property](#auto-generated-id-property)
- Only the id property supports the auto-generation setting `generated: true` for now
- Auto-migration doesn't create foreign key constraints by default. But they can be defined through the model definition. See [Auto-migrate with foreign keys](#auto-migrateauto-update-models-with-foreign-keys)
- Destroying models may result in errors due to foreign key integrity. First delete any related models by calling delete on models with relationships.

### Auto-migrate/Auto-update models with foreign keys

Foreign key constraints can be defined in the model definition.

**Note**: The order of table creation is important. A referenced table must exist before creating a foreign key constraint.

Define your models and the foreign key constraints as follows:

`customer.model.ts`:

```ts
@model()
export class Customer extends Entity {
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
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
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
        "foreignKey": "customerId",
        "onDelete": "CASCADE",
        "onUpdate": "SET NULL"
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
<br>
{% include tip.html content="
Removing or updating the value of `foreignKeys` will be updated or delete or update the constraints in the db tables. If there is a reference to an object being deleted then the `DELETE` will fail. Likewise if there is a create with an invalid FK id then the `POST` will fail. The `onDelete` and `onUpdate` properties are optional and will default to `NO ACTION`.
" %}

### Auto-generated ids

Auto-migrate supports the automatic generation of property values for the id property. For PostgreSQL, the default id type is _integer_. Thus if you have `generated: true` in the id property, it generates integers by default:

```ts
{
  id: true,
  type: 'Number',
  required: false,
  generated: true // enables auto-generation
}
```

It is common to use UUIDs as the primary key in PostgreSQL instead of integers. You can enable it with either the following ways:

- use uuid that is **generated by your LB application** by setting [`defaultFn: uuid`](https://loopback.io/doc/en/lb4/Model.html#property-decorator):


```ts
  @property({
    id: true,
    type: 'string'
    defaultFn: 'uuid',
    // generated: true,  -> not needed
  })
  id: string;
```

- use PostgreSQL built-in (extension and) uuid functions:

```ts
  @property({
  id: true,
  type: 'String',
  required: false,
  // settings below are needed
  generated: true,
  useDefaultIdType: false,
  postgresql: {
    dataType: 'uuid',
  },
})
  id: string;
```

The setting uses `uuid-ossp` extension and `uuid_generate_v4()` function as default.

If you'd like to use other extensions and functions, you can do:

```ts
  @property({
  id: true,
  type: 'String',
  required: false,
  // settings below are needed
  generated: true,
  useDefaultIdType: false,
  postgresql: {
    dataType: 'uuid',
    extension: 'myExtension',
    defaultFn: 'myuuid'
  },
})
  id: string;
```

WARNING: It is the users' responsibility to make sure the provided extension and function are valid.

## Module Long Term Support Policy

This module adopts the [Module Long Term Support (LTS)](http://github.com/CloudNativeJS/ModuleLTS) policy, with the following End Of Life (EOL) dates:

| Version | Status     | Published | EOL                  |
| ------- | ---------- | --------- | -------------------- |
| 5.x     | Current    | Apr 2020  | Apr 2023 _(minimum)_ |
| 3.x     | Active LTS | Mar 2017  | Apr 2022             |

Learn more about our LTS plan in [docs](https://loopback.io/doc/en/contrib/Long-term-support.html).

## Running tests

### Own instance

If you have a local or remote PostgreSQL instance and would like to use that to run the test suite, use the following command:

- Linux

```bash
POSTGRESQL_HOST=<HOST> POSTGRESQL_PORT=<PORT> POSTGRESQL_USER=<USER> POSTGRESQL_PASSWORD=<PASSWORD> POSTGRESQL_DATABASE=<DATABASE> CI=true npm test
```

- Windows

```bash
SET POSTGRESQL_HOST=<HOST> SET POSTGRESQL_PORT=<PORT> SET POSTGRESQL_USER=<USER> SET POSTGRESQL_PASSWORD=<PASSWORD> SET POSTGRESQL_DATABASE=<DATABASE> SET CI=true npm test
```

### Docker

If you do not have a local PostgreSQL instance, you can also run the test suite with very minimal requirements.

- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a PostgreSQL instance on your local:

```bash
source setup.sh <HOST> <PORT> <USER> <PASSWORD> <DATABASE>
```

where `<HOST>`, `<PORT>`, `<USER>`, `<PASSWORD>` and `<DATABASE>` are optional parameters. The default values are `localhost`, `5432`, `root`, `pass` and `testdb` respectively.

- Run the test:

```bash
npm test
```
