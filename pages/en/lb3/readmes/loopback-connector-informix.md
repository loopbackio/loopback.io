# loopback-connector-informix

[IBM® Informix®](https://www-01.ibm.com/software/data/informix/) is the database of choice for robust, enterprise-wide solutions handling high-volume workloads.
It is optimized to deliver industry-leading performance while lowering costs.  The `loopback-connector-informix` module is the LoopBack connector for Informix.

The LoopBack Informix connector supports:

- All [create, retrieve, update, and delete operations](http://loopback.io/doc/en/lb2/Creating-updating-and-deleting-data.html).
- [Queries](http://loopback.io/doc/en/lb2/Querying-data.html) with fields, limit, order, skip and where filters.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-informix --save
```

The `--save` option adds the dependency to the application's `package.json` file.

## Configuration

Use the [data source generator](http://loopback.io/doc/en/lb2/Data-source-generator.html) to add the Informix data source to your application.
The resulting entry in the application's `server/datasources.json` will look something like this:

```js
"mydb": {
  "name": "mydb",
  "connector": "informix"
}
```

Edit `server/datasources.json` to add other supported properties as required:

```js
"mydb": {
  "name": "mydb",
  "connector": "informix",
  "username": <username>,
  "password": <password>,
  "database": <database name>,
  "hostname": <informix server hostname>,
  "port":     <port number>
}
```

The following table describes the connector properties.

Property       | Type    | Description
---------------| --------| --------
database       | String  | Database name
schema         | String  | Specifies the default schema name that is used to qualify unqualified database objects in dynamically prepared SQL statements. The value of this property sets the value in the CURRENT SCHEMA special register on the database server. The schema name is case-sensitive, and must be specified in uppercase characters
username       | String  | Informix Username
password       | String  | Informix password associated with the username above
hostname       | String  | Informix server hostname or IP address
port           | String  | Informix server TCP port number


Alternatively, you can create and configure the data source in JavaScript code.
For example:

```js
var DataSource = require('loopback-datasource-juggler').DataSource;
var Informix = require('loopback-connector-informix');

var config = {
  username: process.env.INFORMIX_USERNAME,
  password: process.env.INFORMIX_PASSWORD,
  hostname: process.env.INFORMIX_HOSTNAME,
  port: 50000,
  database: 'informixdb',
};

var db = new DataSource(Informix, config);

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
If you have a local or remote Informix instance and would like to use that to run the test suite, use the following command:
- Linux
```bash
INFORMIX_HOSTNAME=<HOST> INFORMIX_PORTNUM=<PORT> INFORMIX_USERNAME=<USER> INFORMIX_PASSWORD=<PASSWORD> INFORMIX_DATABASE=<DATABASE> INFORMIX_PROTOCOL=<PROTOCOL> INFORMIX_SERVER=<SERVER> INFORMIX_DRIVER=<DRIVER> INFORMIX_AUTH=<AUTH> CI=true npm test
```
- Windows
```bash
SET INFORMIX_HOSTNAME=<HOST>
SET INFORMIX_PORTNUM=<PORT>
SET INFORMIX_USERNAME=<USER>
SET INFORMIX_PASSWORD=<PASSWORD>
SET INFORMIX_DATABASE=<DATABASE>
SET INFORMIX_PROTOCOL=<PROTOCOL>
SET INFORMIX_SERVER=<SERVER>
SET INFORMIX_DRIVER=<DRIVER>
SET INFORMIX_AUTH=<AUTH>
SET CI=true
npm test
```

### Docker
If you do not have a local Informix instance, you can also run the test suite with very minimal requirements.
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn an Informix instance on your local:
```bash
source setup.sh
```
- Run the test:
```bash
npm test
```
