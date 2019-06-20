# loopback-connector-ibmi


This is a database connectior for Db2 on IBM i intended for use with LoopBack 3 (LoopBack 4 testing soon). It uses the npm `odbc` package to connect to the database, so installing an ODBC driver manager and driver and setting up a datasource is required for use (see below).

[IBM® Db2® for i](http://www-03.ibm.com/systems/power/software/i/db2/) is the database of choice for robust, enterprise-wide solutions handling high-volume workloads. It is optimized to deliver industry-leading performance while lowering costs and is fully integrated into the [IBM i operating system](https://www.ibm.com/it-infrastructure/power/os/ibm-i).  The `loopback-connector-ibmi` module is the LoopBack connector for Db2 for i.

## Major differences from version 0.x of loopback-connector-ibmi
Version 1.x (and newer) of `loopback-connector-ibmi` is significantly different from version 0.x and constitutes a complete rewrite. This project is a derivative of [loopback-connector-db2iseries](https://github.com/strongloop/loopback-connector-db2iseries) and the v0.x [loopback-connector-ibmi](https://github.com/andrescolodrero/loopback-connector-ibmi).

The main difference between this and the other packages for IBM i (including v0.x of this package) is that it uses ODBC to communicate to the database. Version 0.x of this package was built using the Db2 for i CLI API set. 

## Major differences from loopback-connector-db2iseries
- `loopback-connector-db2iseries` is powered by the [IBM Data Server Driver for ODBC and CLI](https://www.ibm.com/support/knowledgecenter/en/SSEPGG_9.7.0/com.ibm.swg.im.dbclient.install.doc/doc/c0023452.html). As noted, this package is powered by the IBM i Access ODBC driver. There may be differences in functionality as a result. From a server protocol perspective, `loopback-connector-db2iseries` module uses [DRDA](https://www.ibm.com/support/knowledgecenter/en/SSGU8G_11.70.0/com.ibm.admin.doc/ids_admin_0206.htm), and this module uses the [IBM i Host Servers](https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_74/rzajr/rzajrmst27.htm) used by the rest of the IBM i Access family.
- `loopback-connector-db2iseries` requires separate licensing to be fully functional. This module does not.
- This package requires manual installation of prerequisites (see below), whereas `loopback-connector-db2iseries` can handle this automatically as part of the npm install

## Prerequisites
Before installing this package, you will need an ODBC driver and a driver manager (with development libraries). 
This package is primarily developed and tested with the [IBM i Access ODBC driver](https://www.ibm.com/support/knowledgecenter/ssw_ibm_i_74/rzaik/rzaikappodbc.htm), which is supported as part of IBM i software maintenance agreements (SWMA) and comes with no additional licensing fees. 

### On IBM i
- Install the `unixODBC-devel` package. See [the RPM and yum documentation for IBM i](http://ibm.biz/ibmi-rpms) for more detailed steps.
### On Linux
- Install the `unixODBC-devel` package with your operating system's package manager (apt-get, zypper, yum, etc).
- Install the "Linux Application Package" of IBM i Access Client Solutions. Consult [this document](http://www-01.ibm.com/support/docview.wss?uid=nas8N1010355) for assistance.
### On Windows
- Install the "Windows Application Package" of IBM i Access Client Solutions. Consult [this document](http://www-01.ibm.com/support/docview.wss?uid=nas8N1010355) for assistance.


## Installation
Once the prerequisites are satisfied, enter the following in the top-level directory of your LoopBack application and install this package:

```
$ npm install loopback-connector-ibmi 
```

## Configuration

In LoopBack, datasources are used to store the information about your database so it can be used by the program. Use the [data source generator](https://loopback.io/doc/en/lb3/Data-source-generator.html) to add  to your application:

```
lb datasource
```

The datasource generator will then walk you through the process of setting up a datasource:
1. `Enter the datasource name:` Any name will do, such as the name of the schema you will use or the name of your system.
2. `Select connector for <name>:` LoopBack 3 does not have knowledge of `loopback-connector-ibmi`, so just press up on the arrow key once and select `other`.
3. `Enter the connector's module name:` Enter `loopback-connector-ibmi`.
4. `Install loopback-connector-ibmi`: If you haven't installed it, enter `Y`. If you have already installed it, select `n`.

This will generate an entry in your `server/datasources.json` file. It should know have an entry similar to:

```json
  "test": {
    "name": "test",
    "connector": "loopback-connector-ibmi"
  }
  ```
You should edit this entry to add information on how to connect to Db2. For `loopback-connector-ibmi`, you need to pass either a `connectionString`, or pass your `username`, `password`, and `dsn` (which will be the DSN name you set up for your ODBC driver).

```json
"test": {
  "name": "test",
  "connector": "loopback-connector-ibmi",
  "connectionString": "DSN=MYDSN"
}
```

or

```json
"test": {
  "name": "test",
  "connector": "loopback-connector-ibmi",
  "dsn": "MYDSN",
  "username": "FIRSTLAST",
  "password": "password123"
}
```

The following table describes the connector properties.

Property| Type | Description
---| --------| --------
connectionString | String  | ODBC connection string for connecting to the database
dsn            | String  | ODBC DSN to use for the connection
username       | String  | Username on the IBM i
password       | String  | Password on the IBM i
schema         | String  | Specifies the default schema name that is used to qualify unqualified database objects in dynamically prepared SQL statements. The schema name is case-sensitive.

**More connector properties will be added as requested by the community**

Alternatively, you can create and configure the data source in JavaScript code.
For example:

```JavaScript
var DataSource = require('loopback-datasource-juggler').DataSource;
var DB2 = require('loopback-connector-ibmi');

var config = {
  dsn:      process.env.DSN
  username: process.env.DB2_USERNAME,
  password: process.env.DB2_PASSWORD,
};

var db = new DataSource(DB2, config);

var User = db.define('User', {
  name: { type: String },
  email: { type: String },
});

// Will make sure that 'User' table has the same format as the model
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
