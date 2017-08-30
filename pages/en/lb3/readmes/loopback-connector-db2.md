# loopback-connector-db2

[IBM® DB2®](http://www.ibm.com/analytics/us/en/technology/db2/) is the database of choice for robust, enterprise-wide solutions handling high-volume workloads.
It is optimized to deliver industry-leading performance while lowering costs.  The `loopback-connector-db2` module is the LoopBack connector for DB2.

The LoopBack DB2 connector supports:

- All [create, retrieve, update, and delete operations](http://loopback.io/doc/en/lb2/Creating-updating-and-deleting-data.html).
- [Queries](http://loopback.io/doc/en/lb2/Querying-data.html) with fields, limit, order, skip and where filters.
- All supported DB2 LUW versions.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-db2 --save
```

The `--save` option adds the dependency to the application's `package.json` file.

## Configuration

Use the [data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html)  to add the DB2 data source to your application.
The entry in the application's `server/datasources.json` will look something like this:

```js
"mydb": {
  "name": "mydb",
  "connector": "db2"
}
```

Edit `server/datasources.json` to add other supported properties as required:

```js
"mydb": {
  "name": "mydb",
  "connector": "db2",
  "username": <username>,
  "password": <password>,
  "database": <database name>,
  "hostname": <db2 server hostname>,
  "port":     <port number>
}
```

The following table describes the connector properties.

Property&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type&nbsp;&nbsp;    | Description
---------------| --------| --------
database       | String  | Database name
schema         | String  | Specifies the default schema name that is used to qualify unqualified database objects in dynamically prepared SQL statements. The value of this property sets the value in the CURRENT SCHEMA special register on the database server. The schema name is case-sensitive, and must be specified in uppercase characters
username       | String  | DB2 Username
password       | String  | DB2 password associated with the username above
hostname       | String  | DB2 server hostname or IP address
port           | String  | DB2 server TCP port number
useLimitOffset | Boolean | LIMIT and OFFSET must be configured on the DB2 server before use (compatibility mode)
supportDashDB  | Boolean | Create ROW ORGANIZED tables to support dashDB.


Alternatively, you can create and configure the data source in JavaScript code.
For example:

```js
var DataSource = require('loopback-datasource-juggler').DataSource;
var DB2 = require('loopback-connector-db2');

var config = {
  username: process.env.DB2_USERNAME,
  password: process.env.DB2_PASSWORD,
  hostname: process.env.DB2_HOSTNAME,
  port: 50000,
  database: 'SQLDB',
};

var db = new DataSource(DB2, config);

var User = db.define('User', {
  name: { type: String },
  email: { type: String },
});

db.autoupdate('User', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  User.create({
    name: 'Tony',
    email: 'tony@t.com',
  }, function(err, user) {
    console.log(err, user);
  });

  User.find({ where: { name: 'Tony' }}, function(err, users) {
    console.log(err, users);
  });

  User.destroyAll(function() {
    console.log('example complete');
  });
});
```

## Running tests

### Own instance

If you have a local or remote DB2 instance and would like to use that to run the test suite, use the following command:
- Linux
```bash
DB2_HOSTNAME=<HOST> DB2_PORTNUM=<PORT> DB2_USERNAME=<USER> DB2_PASSWORD=<PASSWORD> DB2_DATABASE=<DATABASE> DB2_SCHEMA=<SCHEMA> CI=true npm test
```
- Windows
```bash
SET DB2_HOSTNAME=<HOST>
SET DB2_PORTNUM=<PORT>
SET DB2_USERNAME=<USER>
SET DB2_PASSWORD=<PASSWORD>
SET DB2_DATABASE=<DATABASE>
SET DB2_SCHEMA=<SCHEMA>
SET CI=true
npm test
```

#### How to get a local DB2 instance:

- Go to [IBM DB2 trials](http://www.ibm.com/analytics/us/en/technology/db2/db2-trials.html) page.
- Register for an account.
- Download either IBM DB2 or IBM DB2 Express-C.
- For documentation or more information about the installation or setup, see http://www.ibm.com/support/knowledgecenter/SSEPGG_11.1.0/com.ibm.db2.luw.kc.doc/welcome.html

#### IBM DB2 Express-C scenario on Windows:
- Run the setup file.
- Set user information for the DB2 Administration server.
- Write down the user information and the password that you create. User name is `db2admin` by default but it could be modified.
- Configure DB2 instance and write down the port number. It is 50000 by default.
- Once setup is done, Start the `default DB2 and Database Client Interface Selection Wizard`, and proceed with the configuration.
- Ensure that the DB2 Data server runtime client is started. The default name is `DB2COPY1`.
- Let's assume your database name is `sample`, and schema name is `STRONGLOOP`.
- In Windows, start the DB2 Command window-Administrator (In Mac or Linux, use terminal with proper privileges).
- Make sure that you are in this path `...\IBM\SQLLIB\BIN` (In mac, it should be ` /Users/<userid>/sqllib\bin`), and type the following commands:

```
>set db2instance=server1

>db2 connect to sample

>db2 set schema to STRONGLOOP
```

### Docker
If you do not have a local DB2 instance, you can also run the test suite with very minimal requirements.
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn a DB2 instance on your local:
```bash
source setup.sh <HOST> <PORT> <PASSWORD> <DATABASE>
```
where `<HOST>`, `<PORT>`, `<PASSWORD>` and `<DATABASE>` are optional parameters. By default, the user is `db2inst1`.
- Run the test:
```bash
npm test
```
