## loopback-connector-cloudant

Cloudant DB connector for the StrongLoop Loopback framework.

Please see the full documentation at [loopback.io](http://loopback.io/doc/en/lb2/Cloudant-connector.html)

### Key Features

* Uses Cloudant Query (Lucene) to support ad-hoc searching
* [Loopback Query](http://loopback.io/doc/en/lb2/Querying-data.html) support for: fields, limit, order, skip and where filters
* Query and filtering is performed on the database for optimal efficiency
* Use different DB instances per Model definition
* Support basic Model discovery

### LoopBack Connectors

LoopBack provides connectors for popular relational and NoSQL databases.
These connectors implement CRUD operations as a common set of methods
across different databases and allow quick and easy API creation for new
or existing datasources.

[More Info>>](https://www.ng.bluemix.net/docs/starters/LoopBack/index.html)

### IBM Cloudant

IBM Cloudant® is a NoSQL database platform built for the cloud. You can
use Cloudant as a fully-managed DBaaS running on public cloud platforms
like Bluemix, SoftLayer or via an on-premise version called Cloudant
Local.

[More Info>>](https://www.ng.bluemix.net/docs/services/Cloudant/index.html)

### Install

To install the connector cd into the top level directory of your
loopback application, enter:

```
$ npm install loopback-connector-cloudant --save
```

The --save options automatically as the dependency to the package.json
file

### Configuring the Cloudant datasource

Use the [Data source generator](http://loopback.io/doc/en/lb2/Data-source-generator.html) to add the Cloudant data source to your
application. The entry in the applications /server/datasources.json will
look something like this:

```
"mydb": {
  "name": "mydb",
  "connector": "cloudant",
  "username": "XXXX-bluemix",
  "password": "YYYYYYYYYYYY",
  "database": "test"
}
```

Edit the datasources.json to add other supported properties as required:

Property  | Type | Description
----------| -----| --------
database  | String | Database name
username  | String | Cloudant username, use either 'url' or username/password
password  | String | Cloudant password
url       | String | Cloudant URL containing both username and password
modelIndex | String | Specify the model name to document mapping, defaults to 'loopback\_\_model\_\_name'


### Model Specific Configuration

Per Model configuration is also supported for database selection and to
specify different Loopback Model to document mappings:

common/models/<model_name>.json
```
{
  "name": "User",
  "base": "PersistedModel",
  "idInjection": true,
  ...
  "cloudant": {
    "modelIndex": "custom_doc_type_property_name",
    "modelSelector": { "doc_type": "user" },
    "database": "test2"
  },
  ...
```
Model specific configuration settings:

Property  | Type | Description
----------| -----| --------
database  | String | Database name
modelIndex | String | Specify the model name to document mapping, defaults to 'loopback\_\_model\_\_name'. 
modelSelector | JSON | Use the Cloudant Query selector syntax to associate models to existing data. modelSelector and modelIndex are mutually exclusive. https://docs.cloudant.com/cloudant_query.html#selector-syntax

### Example Usage

```
var DataSource = require ('loopback-datasource-juggler').DataSource,
    Cloudant   = require ('loopback-connector-cloudant');

var config = {
    username: 'XXXXX-bluemix',
    password: 'YYYYYYYYYYYYY',
    database: 'test'
};

var db = new DataSource (Cloudant, config);

User = db.define ('User', {
  name: { type: String },
  email: { type: String }
});

User.create ({
  name: "Tony",
  email: "tony@t.com"
}, function (err, user) {
  console.log (user);
});

User.find ({ where: { name: "Tony" }}, function (err, users) {
  console.log (users);
});

User.destroyAll (function () {
  console.log ('test complete');
})
```

### Feature Backlog

* Index only Model properties marked with index=true
* Configurable "view based" or JSON indexes. [More Info>>](https://cloudant.com/blog/mango-json-vs-text-indexes)

### Setup Cloudant Instance

There is no free version of local Cloudant to download, so to develop or test with cloudant connector, users can setup their instance in two ways:

#### Create Cloudant DBaaS account

  - Limited days free trial
  - Sign up with https://cloudant.com/sign-up/ then you will see your Cloudant dashboard

#### Setup Cloudant on Bluemix

  - Choose bluemix Cloudant if you already have a bluemix account with a better situation than limited-days' free trial.

  - Setup steps:

    - Open bluemix website: https://console.ng.bluemix.net
    - Login with your account
    - Click on "CATALOG" in navigation bar 
    - Search with keyword "cloudant" and choose the "Cloudant NOSQLDB" under "Data and Analytics"
    - Click on the green button "create" in the popup page to create your Cloudant database
    - Go to "DASHBOARD", you will see your new cloudant DB Icon under "Services"
    - Click on the Icon, it will direct you to the database page. Check "Service Credentials" on the left to see your credentials.
    - Check "Manage" then click on button "LAUNCH" to see your Cloudant dashboard

For cloudant on both DBaaS and Bluemix, to get access to the cloudant dashboard, you can sign in  https://cloudant.com/sign-in/ with your cloudant username and password.

### Testing

After having Cloudant instance, you will need three config properties to run the tests: `username`, `password`, `database` 

#### Cloudant DBaaS account
  
  - username: your sign up username
  - password: your sign up password
  - database: create your own database for testing

#### Cloudant on Bluemix

  - username: see services credentials
  - password: see services credentials
  - database: create your own database for testing

To run the tests:

```
CLOUDANT_USERNAME=username CLOUDANT_PASSWORD=password CLOUDANT_DATABASE=database npm test
```