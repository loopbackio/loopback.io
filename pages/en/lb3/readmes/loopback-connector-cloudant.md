# loopback-connector-cloudant

IBM Cloudant® is a NoSQL database platform built for the cloud. You can
use Cloudant as a fully-managed DBaaS running on public cloud platforms
like Bluemix and SoftLayer or via an on-premises version called Cloudant
Local.

For more information, see [Getting started with Cloudant NoSQL DB](https://www.ng.bluemix.net/docs/services/Cloudant/index.html)

The `loopback-connector-cloudant` module is the Cloudant connector for the Loopback framework.

## Key features

* Uses Cloudant Query (Lucene) to support ad-hoc searching.
* [Loopback query](http://loopback.io/doc/en/lb3/Querying-data.html) support for: fields, limit, order, skip and where filters.
* Query and filtering is performed on the database for optimal efficiency.
* Use different DB instances per model definition.
* Supports basic model discovery.

## Installation

Enter the following in the top-level directory of your LoopBack application:

```
$ npm install loopback-connector-cloudant --save
```

The `--save` option adds the dependency to the application’s `package.json` file.

## Configuration

Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add the Cloudant data source to your
application. The entry in the applications `/server/datasources.json` will
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

Edit `datasources.json` to add other supported properties as required:

Property  | Type | Description
----------| -----| --------
database  | String | Database name
username  | String | Cloudant username, use either 'url' or username/password
password  | String | Cloudant password
url       | String | Cloudant URL containing both username and password
modelIndex | String | Specify the model name to document mapping, defaults to `loopback__model__name`

**NOTE: The `url` property will override other settings.**

## Model-specific configuration

You can also specify per-model configuration for database selection and to
map a model to a different document:

**common/models/_model-name_.json**

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

Model-specific configuration settings:

Property&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  | Type | Description
----------| -----| --------
database  | String | Database name
modelIndex | String | Specify the model name to document mapping, defaults to `loopback__model__name`.
modelSelector | JSON | Use the Cloudant Query selector syntax to associate models to existing data. NOTE: modelSelector and modelIndex are mutually exclusive; see [Selector syntax](https://docs.cloudant.com/cloudant_query.html#selector-syntax).

## Example usage

```javascript
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

#### Note on using `updateOrCreate` functionality:
**Cloudant does not support the idea of updating a document. All "updates" on a document are _destructive_ replacements.**

For example:

```
// original document
{
  "id": ...,
  "_rev": ...,
  "prop1": "1",
  "prop2": "2",
}

// data to be updated
ds.updateOrCreate('User', {
  prop1: 'updated1',
}, function (err, res) {});

// document after update
{
  "id": ...,
  "_rev": ...,
  "prop1": "updated1",
}
```

**Please note how property `prop2` was completely dropped upon update.**

**Solution:** Do not pass partial values for the data object to be updated. If there are properties that are not being updated, please include the old value to keep data persistent.

## Feature backlog

* Index-only model properties marked with index=true
* Configurable "view based" or JSON indexes. [More Info>>](https://cloudant.com/blog/mango-json-vs-text-indexes)

## Setup Cloudant instance

There is no free version of local Cloudant to download, so to develop or test with Cloudant connector, you must set up either a Cloudant DBaas instance or a Bluemix Cloudant instance.

### Create Cloudant DBaaS account

  - Limited free trial.
  - Sign up with https://cloudant.com/sign-up/ then you will see your Cloudant dashboard.

### Setup Cloudant on Bluemix

  - Choose Bluemix Cloudant if you already have a Bluemix account with a better situation than limited-days' free trial.

  - Setup steps:

    1. Open Bluemix console: https://console.ng.bluemix.net
    1. Login with your account.
    1. Click on "CATALOG" in navigation bar.
    1. Search with keyword "cloudant" and choose the "Cloudant NOSQLDB" under "Data and Analytics".
    1. Click on the green button "create" in the popup page to create your Cloudant database.
    1. Go to "DASHBOARD" where you will see your new Cloudant DB icon under "Services".
    1. Click on the icon, and it will direct you to the database page. Check "Service Credentials" on the left to see your credentials.
    1. Check "Manage" then click on button "LAUNCH" to see your Cloudant dashboard.

To view the Cloudant dashboard on both DBaaS and Bluemix, [sign in](https://cloudant.com/sign-in/) with your Cloudant username and password.

## Testing

After creating a Cloudant instance, you will need three configuration properties to run the tests: `username`, `password`, `database`

### Cloudant DBaaS account

  - username: your sign up username
  - password: your sign up password
  - database: create your own database for testing

### Cloudant on Bluemix

  - username: see services credentials
  - password: see services credentials
  - database: create your own database for testing

To run the tests:

```
CLOUDANT_USERNAME=username CLOUDANT_PASSWORD=password CLOUDANT_DATABASE=database npm test
```

## More Info
For more detailed information regarding connector-specific functions and behaviour,
see the [docs section](https://github.com/strongloop/loopback-connector-cloudant/tree/master/doc).
