# loopback-connector-oracle

[Oracle](https://www.oracle.com/database/index.html) is an object-relational database management system produced by Oracle Corporation. The `loopback-connector-oracle` module is the Oracle connector for the LoopBack framework based on the [node-oracledb](https://github.com/oracle/node-oracledb) module.

## Prerequisites

**Node.js**: The Oracle connector requires Node.js version 6.x and up.

**Windows**: On 32-bit Windows systems, you must use the 32-bit version of Node.js. On 64-bit Windows systems, you must use the 64-bit version of Node.js. For more information, see [Node-oracledb Installation on Windows](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#-7-node-oracledb-installation-on-windows).

**Oracle**: The Oracle connector requires Oracle client libraries 11.2+ and can connect to Oracle Database Server 9.2+.

## Installation

Before installing this module, please follow instructions at [https://oracle.github.io/node-oracledb/INSTALL.html](https://oracle.github.io/node-oracledb/INSTALL)
to make sure all the prerequisites are satisfied.

In your application root directory, enter this command to install the connector:

```shell
$ npm install loopback-connector-oracle --save
```

If you create a Oracle data source using the data source generator as described below, you don’t have to do this, since the generator will run `npm install` for you.

The `libaio` library is required on Linux systems:

On Ubuntu/Debian, get it with this command:

```
sudo apt-get install libaio1
```

On Fedora/CentOS/RHEL, get it with this command:

```
sudo yum install libaio
```

## Creating an Oracle data source

For LoopBack 4 users, use the LoopBack 4
[Command-line interface](https://loopback.io/doc/en/lb4/Command-line-interface.html)
to generate a DataSource with Oracle connector to your LB4 application. Run
[`lb4 datasource`](https://loopback.io/doc/en/lb4/DataSource-generator.html), it
will prompt for configurations such as host, post, etc. that are required to
connect to an Oracle database.

After setting it up, the configuration can be found under
`src/datasources/<DataSourceName>.datasource.ts`, which would look like this:

```ts
const config = {
  name: "db",
  connector: "oracle",
  tns: "",
  host: "localhost",
  port: 1521,
  user: "admin",
  password: "pass",
  database: "XE",
};
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a Oracle data source to your application.
The generator will prompt for the database server hostname, port, and other settings
required to connect to a Oracle database. It will also run the `npm install` command above for you.

The entry in the application's `/server/datasources.json` will look like this:

{% include code-caption.html content="/server/datasources.json" %}

```javascript
"mydb": {
  "name": "mydb",
  "connector": "oracle",
  "tns": "demo",
  "host": "myserver",
  "port": 1521,
  "database": "mydb",
  "password": "mypassword",
  "user": "admin"
 }
```

</details>

Edit `<DataSourceName>.datasources.ts` to add any other additional properties
that you require.

## Connector properties

The connector properties depend on [naming methods](http://docs.oracle.com/cd/E11882_01/network.112/e10836/naming.htm#NETAG008) you use for the Oracle database.
LoopBack supports three naming methods:

- Easy connect: host/port/database.
- Local naming (TNS): alias to a full connection string that can specify all the attributes that Oracle supports.
- Directory naming (LDAP): directory for looking up the full connection string that can specify all the attributes that Oracle supports.

### Easy Connect

Easy Connect is the simplest form that provides out-of-the-box TCP/IP connectivity to databases.
The data source then has the following settings.

<table>
  <thead>
    <tr>
      <th width="200">Property</th>
      <th width="200">Type</th>
      <th width="150">Default</th>
      <th width="350">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>host or hostname</td>
      <td>String</td>
      <td>localhost</td>
      <td>Host name or IP address of the Oracle database server</td>
    </tr>
    <tr>
      <td>port</td>
      <td>Number</td>
      <td>1521</td>
      <td>Port number of the Oracle database server</td>
    </tr>
    <tr>
      <td>username or user</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>User name to connect to the Oracle database server</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>Password to connect to the Oracle database server</td>
    </tr>
    <tr>
      <td>database</td>
      <td>String</td>
      <td>XE</td>
      <td>Oracle database listener name</td>
    </tr>
  </tbody>
</table>

For example (LB4 form):

{% include code-caption.html content="src/datasources/db.datasource.ts" %}

```ts
const config = {
  name: "db",
  connector: "oracle",
  host: "oracle-demo.strongloop.com",
  port: 1521,
  user: "admin",
  password: "pass",
  database: "XE",
};
```

### Local and directory naming

Both local and directory naming require that you place configuration files in a TNS admin directory, such as `/oracle/admin`.

**sqlnet.ora**

This specifies the supported naming methods; for example:

```
NAMES.DIRECTORY_PATH=(LDAP,TNSNAMES,EZCONNECT)
```

**nsnames.ora**

This maps aliases to connection stringsl for example:

```
demo1=(DESCRIPTION=(CONNECT_DATA=(SERVICE_NAME=))(ADDRESS=(PROTOCOL=TCP)(HOST=demo.strongloop.com)(PORT=1521)))
```

**ldap.ora**

This configures the LDAP server.

```
DIRECTORY_SERVERS=(localhost:1389)
DEFAULT_ADMIN_CONTEXT="dc=strongloop,dc=com"
DIRECTORY_SERVER_TYPE=OID
```

#### Set up TNS_ADMIN environment variable

For the Oracle connector to pick up the configurations, you must set the environment variable 'TNS_ADMIN' to the directory containing the `.ora` files.

```
export TNS_ADMIN=<directory containing .ora files>
```

Now you can use either the TNS alias or LDAP service name to configure a data source:

```ts
const config = {
  name: "db",
  connector: "oracle",
  tns: "demo", // The tns property can be a tns name or LDAP service name
  username: "demo",
  password: "L00pBack",
});
```

### Connection pooling options

<table>
  <thead>
    <tr>
      <th>Property name</th>
      <th>Description</th>
      <th>Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>minConn</td>
      <td>Minimum number of connections in the connection pool</td>
      <td>1</td>
    </tr>
    <tr>
      <td>maxConn</td>
      <td>Maximum number of connections in the connection pool</td>
      <td>10</td>
    </tr>
    <tr>
      <td>incrConn</td>
      <td>
        <p>Incremental number of connections for the connection pool.</p>
      </td>
      <td>1</td>
    </tr>
    <tr>
      <td>timeout</td>
      <td>
        Time-out period in seconds for a connection in the connection pool.
          The Oracle connector
          will terminate connections in this
          connection pool that are idle longer than the time-out period.
      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>

For example,

{% include code-caption.html content="src/datasources/db.datasource.ts" %}

```ts
const config = {
  name: "db",
  connector: "oracle",
  minConn:1,
  maxConn:5,
  incrConn:1,
  timeout: 10,
  ...
};
```

### Connection troubleshooting

If you encounter this error:

```
Error: ORA-24408: could not generate unique server group name
```

Then the Oracle 11g client requires an entry with your hostname pointing to
`127.0.0.1`.

To resolve:

Get your hostname. Check your hostname by running this command (for example, if your machine's name is "earth"):

```
$ hostname
earth
```

Update `/etc/hosts` and map `127.0.0.1` to your hostname "earth":

```
...
127.0.0.1 localhost earth
...
```

Verify the fix. Run the app:

```
$ npm start
```

For more information, see [StackOverflow question](http://stackoverflow.com/questions/10484231/ora-24408-could-not-generate-unique-server-group-name).

## How LoopBack models map to Oracle tables

There are several properties you can specify to map the LoopBack models to the existing tables in the Oracle database:

**Model definition** maps to Oracle schema/table

- `oracle.schema`: the schema name of the table
- `oracle.table`: the table name of the model

**Property definition** maps to Oracle column

- `oracle.columnName`: the column name of the property
- `oracle.dataType`: the type of the column

(Check out more available database settings in the section [Data mapping properties](https://loopback.io/doc/en/lb4/Model.html#data-mapping-properties).)

The following example model `User` maps to the table `USER` under schema `XE` in the database with its columns:

{% include code-caption.html content="/models/user.model.ts" %}

```ts
@model({
  settings: {
    oracle: {
      schema: 'XE',
      table: 'USER'
    }
  }
})
export class User extends Entity {
  @property({
    type: 'number',
    required: true,
    id: true,
    oracle: {
      columnName: 'ID',
      dataType: 'NUMBER',
      nullable: 'N'
    },
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    oracle:{
      columnName: 'LOCALTIONID',
      dataType: 'VARCHAR2',
      nullable: 'N'
    }
  })
  locationId: string;
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

{% include code-caption.html content="/common/models/model.json" %}

```javascript
{
    "name":"User",
    "options":{
      "idInjection":false,
      "oracle":{
        "schema":"XE",
        "table":"USER"
      }
    },
    "properties":{
      "myId":{
        "type":"number",
        "required":true,
        "id":1,
        "oracle":{
          "columnName":"MYID",
          "dataType":"NUMBER",
        }
      },
      "locationId":{
        "type":"String",
        "required":true,
        "length":20,
        "id":2,
        "oracle":{
          "columnName":"LOCATION_ID",
          "dataType":"VARCHAR2",
          "dataLength":20,
          "nullable":"N"
        }
      },
    }
  }
```

</details>

**Notice**: the Oracle database default type is UPPERCASE. If the oracle settings are not specified in the model, for example:

```ts
export class Demo extends Entity {
  @property({
    type: 'number',
    required: true,
    id: true,
  })
  id: number;
```

the connector would look for a table named `DEMO` under the default schema in the database and also map the id property to a column named `ID` in that table. This might cause errors if the default table/colum name doesn't exist. Please do specify the settings if needed.

### Configure a custom table/column name

On the other hand, such settings would also allow you to have different names for models and tables. Take the `User` model as an example, we can map the `User` model to the table `MYUSER` and map the `id` property to column `MY_ID`as long as they are specified correctly:

```ts
@model({
  settings: {
    oracle: {
      schema: 'XE',
      table: 'MYUSER' // customized name
    }
  }
})
export class User extends Entity {
  @property({
    type: 'number',
    required: true,
    id: true,
    oracle: {
      columnName: 'MYID' // customized name
    },
  })
  id: number;
  //...
```

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

```javascript
{
    "name":"User",
    "options":{
      "idInjection":false,
      "oracle":{
        "schema":"XE",
        "table":"MYUSER" // customized name
      }
    },
    "properties":{
      "id":{
        "type":"number",
        "required":true,
        "id":1,
        "oracle":{
          "columnName":"MYID", // customized name
          "dataType":"NUMBER",
        }
      },
      //...
    }
  }
```

</details>

### Type mapping

See [LoopBack 4 types](http://loopback.io/doc/en/lb4/LoopBack-types.html) (or [LoopBack 3 types](http://loopback.io/doc/en/lb3/LoopBack-types.html)) for
details on LoopBack's data types.

#### JSON to Oracle Types

<table>
  <thead>
    <tr>
      <th width="450">LoopBack Type</th>
      <th width="450">Oracle Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>String<br>JSON<br>Text<br>default</td>
      <td>VARCHAR2
      <br/>Default length is 1024
      </td>
    </tr>
    <tr>
      <td>Number</td>
      <td>NUMBER</td>
    </tr>
    <tr>
      <td>Date</td>
      <td>DATE</td>
    </tr>
    <tr>
      <td>Timestamp</td>
      <td>TIMESTAMP(3)</td>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>CHAR(1)</td>
    </tr>
  </tbody>
</table>

#### Oracle Types to JSON

<table>
  <thead>
    <tr>
      <th width="450">Oracle Type</th>
      <th width="450">LoopBack Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CHAR(1)</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>CHAR(n)<br>VARCHAR<br>VARCHAR2,<br>LONG VARCHAR<br>NCHAR<br>NVARCHAR2</td>
      <td>String</td>
    </tr>
    <tr>
      <td>LONG, BLOB, CLOB, NCLOB</td>
      <td>Node.js <a class="external-link" href="http://nodejs.org/api/buffer.html">Buffer object</a></td>
    </tr>
    <tr>
      <td>NUMBER<br>INTEGER<br>DECIMAL<br>DOUBLE<br>FLOAT<br>BIGINT<br>SMALLINT<br>REAL<br>NUMERIC<br>BINARY_FLOAT<br>BINARY_DOUBLE<br>UROWID<br>ROWID</td>
      <td>Number</td>
    </tr>
    <tr>
      <td>DATE<br>TIMESTAMP</td>
      <td>Date</td>
    </tr>
  </tbody>
</table>

## Discovery and auto-migration

### Model discovery

The Oracle connector supports _model discovery_ that enables you to create LoopBack models based on an existing database schema. Once you defined your datasource:

- LoopBack 4 users could use the commend
  [`lb4 discover`](https://loopback.io/doc/en/lb4/Discovering-models.html) to
  discover models.
- For LB3 users, please check
  [Discovering models from relational databases](https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html).
  (See
  [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels)
  for related APIs information)

### Auto-migration

The Oracle connector also supports _auto-migration_ that enables you to create a database schema
from LoopBack models.

For example, based on the following model, the auto-migration method would create/alter existing `CUSTOMER` table under `XE` schema in the database. Table `CUSTOMER` would have two columns: `NAME` and `ID`, where `ID` is also the primary key, and its value would be generated by the database as it has `type: 'Number'` and `generated: true` set:

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

<details><summary markdown="span"><strong>For LoopBack 3 users</strong></summary>

```javascript
{
    "name":"Customer",
    "options":{
      "idInjection":false,
    },
    "properties":{
      "id":{
        "type":"number",
        "required":true,
        "id":1,
      },
      "name":{
        "type":"string",
        "required":false,
      },
    }
  }
```

</details>

LoopBack Oracle connector creates the following schema objects for a given model:

- A table, for example, PRODUCT
- A sequence for the primary key, for example, PRODUCT_ID_SEQUENCE
- A trigger to generate the primary key from the sequence, for example, PRODUCT_ID_TRIGGER

#### Specifying database schema definition via model

By default, table and column names are generated in uppercase.

Besides the basic model metadata, you can also to specify part of the database schema definition via the
property definition then run the migration script. They will be mapped to the database. The setting is the same as what we introduced in the section [Configure a custom table/column name](#configure-a-custom-table/column-name). One just needs to create models first, then run the migration script.

For how to run the script and more details:

- For LB4 users, please check [Database Migration](https://loopback.io/doc/en/lb4/Database-migrations.html)
- For LB3 users, please check [Creating a database schema from models](https://loopback.io/doc/en/lb3/Creating-a-database-schema-from-models.html)
- Check discovery/migration section the Oracle tutorial

(See [LoopBack auto-migrate method](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate) for related APIs information)

Here are some limitations and tips:

- If you defined `generated: true` in the id property, it generates **integers** by default. The Oracle connector does not support other auto-generated id types yet. Please check the [Auto-generated ids](#auto-generated-ids) section below if you would like use auto-generated id in different types such as uuid.
- Only the id property supports the auto-generation setting `generated: true` for now
- Destroying models may result in errors due to foreign key integrity. First delete any related models by calling delete on models with relationships.

#### Auto-generated ids

Auto-migrate supports the automatic generation of property values for the id property. For Oracle, the default id type is **integer**. Thus if you have `generated: true` set in the id property definition, it generates integers by default:

```ts
{
  id: true,
  type: 'Number',
  required: false,
  generated: true // enables auto-generation
}
```

It might be a case to use UUIDs as the primary key in Oracle instead of integers. You can enable it with either the following ways:

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

- alter the table to use Oracle built-in uuid functions (`SYS_GUID()` for example):

```ts
  @property({
  id: true,
  type: 'String',
  required: false,
  // settings below are needed
  generated: true,
  useDefaultIdType: false,
})
  id: string;
```

Then you will need to alter the table manually.

## Running tests

### Own instance

If you have a local or remote Oracle instance and would like to use that to run the test suite, use the following command:

- Linux

```bash
ORACLE_HOST=<HOST> ORACLE_PORT=<PORT> ORACLE_USER=<USER> ORACLE_PASSWORD=<PASSWORD> ORACLE_DATABASE=<DATABASE> npm test
```

- Windows

```bash
SET ORACLE_HOST=<HOST>
SET ORACLE_PORT=<PORT>
SET ORACLE_USER=<USER>
SET ORACLE_PASSWORD=<PASSWORD>
SET ORACLE_DATABASE=<DATABASE>
npm test
```

### Docker

If you do not have a local Oracle instance, you can also run the test suite with very minimal requirements.

- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn an Oracle instance on your local machine:

```bash
source setup.sh <HOST> <PORT>
```

where `<HOST>`, `<PORT>`, `<USER>`, and `PASSWORD` are optional parameters. The default values are `localhost`, `1521`, `admin`, and `0raclep4ss` respectively. The `DATABASE` setting is always `XE`.

- Run the test:

```bash
npm test
```
