---
title: "Cloudant connector"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Cloudant-connector.html
summary:
---

**See also**: [Getting Started with LoopBack and IBM Cloudant](https://developer.ibm.com/bluemix/2015/09/10/getting-started-node-js-loopback-framework-ibm-cloudant/)

## Overview

[IBM Cloudant](http://www-01.ibm.com/software/data/cloudant/)® is a NoSQL database platform built for the cloud.
You can use Cloudant as a fully-managed DBaaS running on public cloud platforms like Bluemix, SoftLayer or via an on-premise version called Cloudant Local.
For more information, see [Getting Started with Cloudant NoSQL DB](https://www.ng.bluemix.net/docs/services/Cloudant/index.html).

### Key features

* Uses Cloudant Query (Lucene) to support ad-hoc searching.
* [Loopback query](/doc/{{page.lang}}/lb2/Querying-data.html) support for fields, limit, order, skip and where filters.
* Performs query and filtering on the database for optimal efficiency.
* Uses different DB instances per model definition.
* Supports basic model discovery.

## Installation

To install the connector, enter the following command when you are in the top level of your Loopback application directory:

```shell
$ npm install loopback-connector-cloudant --save
```

The --save option automatically updates the dependency in the application's `package.json` file.

## Configuring the Cloudant datasource

Use the [data source generator](https://docs.strongloop.com/display/public/LB/Data-source-generator) to add the Cloudant data source to your application.
The entry in the applications `server/datasources.json` will look like this:

```javascript
"mydb": {
  "name": "mydb",
  "connector": "cloudant",
  "username": "XXXX-bluemix",
  "password": "YYYYYYYYYYYY",
  "database": "test"
}
```

Edit the `datasources.json` to add other supported properties as required:

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
      <td>database</td>
      <td>String</td>
      <td>Database name</td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Cloudant username, use either 'url' or username/password</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Cloudant password</td>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>Cloudant URL containing both username and password</td>
    </tr>
    <tr>
      <td>modelIndex</td>
      <td>String</td>
      <td>Specify the model name to document mapping, defaults to 'loopback__model__name'</td>
    </tr>
  </tbody>
</table>

### Model-specific configuration

Per-model configuration is also supported for database selection and to specify different LoopBack model to document mappings:

{% include code-caption.html content="common/models/MyUser.json" %}
```javascript
{
  "name": "MyUser",
  "base": "PersistedModel",
  "idInjection": true,
  ...
  "settings": {
    "cloudant": {
      "modelIndex": "myPropertyName",
      "database": "test2"
    }
  },
  ...
```

Model specific configuration settings:

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
      <td>database</td>
      <td>String</td>
      <td>Database name</td>
    </tr>
    <tr>
      <td>modelIndex</td>
      <td>String</td>
      <td>Specify the model name to document mapping, defaults to 'loopback__model__name'</td>
    </tr>
  </tbody>
</table>

### Example

```javascript
var DataSource = require('loopback-datasource-juggler').DataSource,
  Cloudant = require('loopback-connector-cloudant');

var config = {
  username: 'XXXXX-bluemix',
  password: 'YYYYYYYYYYYYY',
  database: 'test'
};

var db = new DataSource(Cloudant, config);

User = db.define('User', {
  name: {
    type: String
  },
  email: {
    type: String
  }
});

User.create({
  name: "Tony",
  email: "tony@t.com"
}, function(err, user) {
  console.log(user);
});

User.find({
  where: {
    name: "Tony"
  }
}, function(err, users) {
  console.log(users);
});

User.destroyAll(function() {
  console.log('test complete');
});
```