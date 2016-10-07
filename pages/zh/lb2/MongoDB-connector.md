---
title: "MongoDB connector"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/MongoDB-connector.html
summary:
---

## Installation

{% include important.html content="

The MongoDB connector indirectly uses [bson](https://www.npmjs.org/package/bson), that requires you to have a standard set of compiler tools on your system. See [Installing compiler tools](https://docs.strongloop.com/display/SL/Installing+compiler+tools) for details.

" %}

In your application root directory, enter:

**shell**

`$ npm install loopback-connector-mongodb --save`

This will install the module from npm and add it as a dependency to the application's [package.json](/doc/{{page.lang}}/lb2/package.json.html) file.

## Creating a MongoDB data source 

Use the [Data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html) to add a MongoDB data source to your application.  The entry in the application's `/server/datasources.json` will look like this:

**/server/datasources.json**

```js
"mydb": {
  "name": "mydb",
  "connector": "mongodb",
}
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a MongoDB database.

### Properties

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>connector</td>
      <td>String</td>
      <td>
        <p>Connector name, either "loopback-connector-mongodb" or "mongodb"</p>
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
      <td>Database host name or IP address.</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Password to connect to database, if required.</td>
    </tr>
    <tr>
      <td>port</td>
      <td>Number</td>
      <td>Database TCP port</td>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>
        <p>Connection string URI; see <a href="http://docs.mongodb.org/manual/reference/connection-string/" class="external-link" rel="nofollow">http://docs.mongodb.org/manual/reference/connection-string/</a>.</p>
        <p>See <a href="/doc/{{page.lang}}/lb2/MongoDB-connector.html">Replica set configuration</a> below.</p>
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Username to connect to database, if required.</td>
    </tr>
  </tbody>
</table>

{% include important.html content="

Username and password are required only if the MongoDB server has authentication enabled.

" %}

For example:

**/server/datasources.json**

```js
{
  "mongodb_dev": { 
    "name": "mongodb_dev",
    "connector": "mongodb",
    "host": "127.0.0.1",

    "database": "devDB",

    "username": "devUser",

    "password": "devPassword",

    "port": 27017 
  },
  "mongodb_staging": {
    "name": "mongodb_staging",
    "connector": "mongodb",
    "host": "127.0.0.1",

    "database": "stagingDB",

    "username": "stagingUser",

    "password": "stagingPassword",

    "port": 27017 
  }
}
```

## Using the MongoDB connector

{% include warning.html content="

LoopBack currently does not currently support property mapping for MongoDB; you can customize only collection names. 

" %}

### Customize the collection name

You might want to customize the collection name for a LoopBack model. It can be done in the model definition JSON file. In the example below, the Post model will be mapped to the PostCollection collection in MongoDB.

**/common/models/model.json**

```js
{
  "name": "Post",
  "mongodb": {
    "collection": "PostCollection"
  },
  "properties": {
    ...
  }
}
```

### Replica set configuration

The LoopBack MongoDB connector supports the replica set configuration using the [MongoDB connection string URI format](http://docs.mongodb.org/manual/reference/connection-string/).  For example, here is a snippet for the data source configuration:

**/server/datasources.json**

```
{
	“connector": “mongodb”,
	“url”: "mongodb://example1.com,example2.com,example3.com/?readPreference=secondary"
}
```

### About MongoDB _id field

MongoDB uses a specific ID field with BSON `ObjectID` type, named `_id`

The MongoDB connector does not expose the MongoDB `_id` field, to be consistent with other connectors. Instead, it is transparently mapped to the `id` field, which is declared by default in the model if you do not define any `id`.

To access the `_id` property, you must define it explicitly as your model ID, along with its type; For example:

**/server/script.js**

```js
var ds = app.dataSources.db;
MyModel = ds.createModel('mymodel', {
  _id: {
    type: ds.ObjectID,
    id: true
  }
});
```

Example with a Number _id :

**/server/script.js**

```js
MyModel = ds.createModel('mymodel', {
  _id: {
    type: Number,
    id: true
  }
});
```

## Query with logical operators (since v1.2.3)

MongoDB supports queries with logical operators such as $and, $or, and $nor. See [Logical Query Operators (MongoDB documentation)](http://docs.mongodb.org/manual/reference/operator/query-logical/) for more information.

To use the logical operators with LoopBack's query filter, use a `where` clause as follows (for example):

**/server/script.js**

```
// Find posts that have title = 'My Post' and content = 'Hello'
Post.find({where: {and: [{title: 'My Post'}, 
                         {content: 'Hello'}]}}, 
          function (err, posts) {
            ...
});

// Find posts that either have title = 'My Post' or content = 'Hello'
Post.find({where: {or: [{title: 'My Post'}, 
                        {content: 'Hello1'}]}}, 
          function (err, posts) {
            ...
});

// Find posts that neither have title = 'My Post1' nor content = 'Hello1'
Post.find({where: {nor: [{title: 'My Post1'}, 
                         {content: 'Hello1'}]}}, 
          function (err, posts) {
            ...
});
```
