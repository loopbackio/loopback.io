# loopback-connector-oracle

[Oracle](https://www.oracle.com/database/index.html) is an object-relational database management system produced by Oracle Corporation. The `loopback-connector-oracle` module is the Oracle connector for the LoopBack framework.

For more information, see the [LoopBack documentation](http://loopback.io/doc/en/lb3/Oracle-connector.html).

## Prerequisites

**Node.js**: The Oracle connector is compatible with Node v.0.10.x, v.12.x, and later.  

**MacOS**: The Oracle connector does not work on Mac OSX 10.11 (El Capitan) due to [SIP](https://en.wikipedia.org/wiki/System_Integrity_Protection) runtime protections and restrictions.
Specifically, DYLD environment variables are now ignored; hence, rendering the Oracle connector inoperable due to the DYLD_LIBRARY_PATH dependency.
For a workaround, see [How to Disable SIP in OS X El Capitan](http://osxdaily.com/2015/10/05/disable-rootless-system-integrity-protection-mac-os-x/).

**Windows**: On 64-bit Windows systems, the Oracle connector runs only on 64-bit version of Node.js.

**Oracle**: The Oracle connector requires Oracle 8.x - 12.x.

## Installation

In your application root directory, enter this command to install the connector:

```shell
$ npm install loopback-connector-oracle --save
```

If you create a Oracle data source using the data source generator as described below, you don’t have to do this, since the generator will run npm install for you.

See [Installing the Oracle connector](http://loopback.io/doc/en/lb3/Installing-the-Oracle-connector.html) for further installation instructions.

To simplify the installation of [node-oracledb](https://github.com/oracle/node-oracledb) module and Oracle instant clients, use [loopback-oracle-installer](https://github.com/strongloop/loopback-oracle-installer) as a dependency to install and configure `node-oracledb` (oracledb) upon `npm install`.

Please note `config.oracleUrl` is the property to define the base URL to download the corresponding node-oracle (oracledb) bundle for the local
environment.

The bundle file name is `loopback-oracle-<platform>-<arch>-<version>.tar.gz`. The `version` is the same as the `version` in package.json.

```javascript
  "dependencies": {
      "loopback-oracle-installer": "git+ssh://git@github.com:strongloop/loopback-oracle-installer.git",
           ...
  },
  "config": {
      "oracleUrl": "http://7e9918db41dd01dbf98e-ec15952f71452bc0809d79c86f5751b6.r22.cf1.rackcdn.com"
  },
  ...
```

You can override the `oracleUrl` setting with the LOOPBACK_ORACLE_URL environment variable.

For example, the full URL for v1.5.0 for MacOSX is:

http://7e9918db41dd01dbf98e-ec15952f71452bc0809d79c86f5751b6.r22.cf1.rackcdn.com/loopback-oracle-MacOSX-x64-1.5.0.tar.gz

The `libaio` library is required on Linux systems:

On Ubuntu/Debian, get it with this command:

```
sudo apt-get install libaio1
```

On Fedora/CentOS/RHEL, get it with this command:

```
sudo yum install libaio
```

**IMPORTANT**: Ensure `c:\instantclient_12_1\vc10` comes before `c:\instantclient_12_1`.

## Creating an Oracle data source

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a Oracle data source to your application.  
The generator will prompt for the database server hostname, port, and other settings
required to connect to a Oracle database.  It will also run the `npm install` command above for you.

The entry in the application's `/server/datasources.json` will look like this:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"mydb": {
  "name": "mydb",
  "connector": "oracle",
  "tns": "demo",  
  "host": "myserver",
  "port": 3306,
  "database": "mydb",
  "password": "mypassword",
  "user": "admin"
 }
```

Edit `datasources.json` to add any other additional properties that you require.

## Connector properties

The connector properties depend on [naming methods](http://docs.oracle.com/cd/E11882_01/network.112/e10836/naming.htm#NETAG008) you use for the Oracle database.
LoopBack supports three naming methods:

* Easy connect: host/port/database.
* Local naming (TNS): alias to a full connection string that can specify all the attributes that Oracle supports.
* Directory naming (LDAP): directory for looking up the full connection string that can specify all the attributes that Oracle supports.

### Easy Connect

Easy Connect is the simplest form that provides out-of-the-box TCP/IP connectivity to databases.
The data source then has the following settings.

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
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

For example:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "demoDB": {
    "connector": "oracle",
    "host": "oracle-demo.strongloop.com",
    "port": 1521,
    "database": "XE",
    "username": "demo",
    "password": "L00pBack"
  }
}
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

```javascript
var ds = loopback.createDataSource({
  "tns": "demo", // The tns property can be a tns name or LDAP service name
  "username": "demo",
  "password": "L00pBack"
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
      <td>Maximum number of connections in the connection pool</td>
      <td>1</td>
    </tr>
    <tr>
      <td>maxConn</td>
      <td>Minimum number of connections in the connection pool</td>
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

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "demoDB": {
    "connector": "oracle",
    "minConn":1,
    "maxConn":5,
    "incrConn":1,
    "timeout": 10,
    ...
  }
}
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

Verify the fix. Run the example in `examples/app.js`:

```
$ node examples/app.js
```

For more information, see [StackOverflow question](http://stackoverflow.com/questions/10484231/ora-24408-could-not-generate-unique-server-group-name).

## Model properties

An Oracle model definition consists of the following properties:

* `name`: Name of the model, by default, it's the camel case of the table.
* `options`: Model-level operations and mapping to Oracle schema/table.
* `properties`: Property definitions, including mapping to Oracle column.

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
    "name":"Inventory",
    "options":{
      "idInjection":false,
      "oracle":{
        "schema":"STRONGLOOP",
        "table":"INVENTORY"
      }
    },
    "properties":{
      "productId":{
        "type":"String",
        "required":true,
        "length":20,
        "id":1,
        "oracle":{
          "columnName":"PRODUCT_ID",
          "dataType":"VARCHAR2",
          "dataLength":20,
          "nullable":"N"
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
      "available":{
        "type":"Number",
        "required":false,
        "length":22,
        "oracle":{
          "columnName":"AVAILABLE",
          "dataType":"NUMBER",
          "dataLength":22,
          "nullable":"Y"
        }
      },
      "total":{
        "type":"Number",
        "required":false,
        "length":22,
        "oracle":{
          "columnName":"TOTAL",
          "dataType":"NUMBER",
          "dataLength":22,
          "nullable":"Y"
        }
      }
    }
  }
```

## Type mapping

See [LoopBack types](http://loopback.io/doc/en/lb3/LoopBack-types.html) for details on LoopBack's data types.

### JSON to Oracle Types

<table>
  <thead>
    <tr>
      <th>LoopBack Type</th>
      <th>Oracle Type</th>
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

### Oracle Types to JSON

<table>
  <thead>
    <tr>
      <th>Oracle Type</th>
      <th>LoopBack Type</th>
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

The Oracle connector supports _model discovery_ that enables you to create LoopBack models
based on an existing database schema using the unified [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).  For more information on discovery, see [Discovering models from relational databases](https://loopback.io/doc/en/lb3/Discovering-models-from-relational-databases.html).

For an example of model discover, see [`example/app.js`](https://github.com/strongloop/loopback-connector-oracle/blob/master/example/app.js).

### Auto-migratiion

The Oracle connector also supports _auto-migration_ that enables you to create a database schema
from LoopBack models using the [LoopBack automigrate method](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate).

For more information on auto-migration, see [Creating a database schema from models](https://loopback.io/doc/en/lb3/Creating-a-database-schema-from-models.html) for more information.

LoopBack Oracle connector creates the following schema objects for a given model:

* A table, for example, PRODUCT
* A sequence for the primary key, for example, PRODUCT_ID_SEQUENCE
* A trigger to generate the primary key from the sequnce, for example, PRODUCT_ID_TRIGGER

Destroying models may result in errors due to foreign key integrity. First delete any related models by calling delete on models with relationships.

## Running tests

The tests in this repository are mainly integration tests, meaning you will need
to run them using our preconfigured test server.

1. Ask a core developer for instructions on how to set up test server
   credentials on your machine
2. `npm test`
