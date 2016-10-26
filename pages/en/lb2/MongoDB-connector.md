---
title: "MongoDB connector"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/MongoDB-connector.html
summary:
---

{% include see-also.html content="
* [Connecting to MongoDB](Connecting-to-MongoDB.html)
* [Using MongoLab](Using-MongoLab.html)
* [Example app](https://github.com/strongloop/loopback-example-database)
"%}

{% include note.html content="
The MongoDB connector requires MongoDB 2.6 - 3.x.
" %}

## Installation

{% include important.html content="The MongoDB connector indirectly uses [bson](https://www.npmjs.org/package/bson), that requires you to have a standard set of compiler tools on your system. See [Installing compiler tools](Installing-compiler-tools) for details.
" %}

In your application root directory, enter:

```shell
$ npm install loopback-connector-mongodb --save
```

This will install the module from npm and add it as a dependency to the application's [package.json](package.json.html) file.

## Creating a MongoDB data source 

Use the [Data source generator](Data-source-generator.html) to add a MongoDB data source to your application.
The entry in the application's `/server/datasources.json` will look like this:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
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
        <p>Connection string URI; see
          <a href="http://docs.mongodb.org/manual/reference/connection-string/" class="external-link" rel="nofollow">http://docs.mongodb.org/manual/reference/connection-string/</a>.
        </p>
        <p>See <a href="MongoDB-connector.html">Replica set configuration</a> below.</p>
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

{% include code-caption.html content="/server/datasources.json" %}
```javascript
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
LoopBack does not currently support property mapping for MongoDB; you can customize only collection names. 
" %}

### Using MongoDB operators in update operations

Enable the `allowExtendedOperators` option to include [MongoDB operators](http://docs.mongodb.org/manual/reference/operator/update/) in update operations.
There are two ways to enable the allowExtendedOperators flag: in the [model definition JSON file](Model-definition-JSON-file.html) and as an option passed to the update method.

To set the option in the model definition file, set the property `settings.mongodb.allowExtendedOperators` to true.

For example:

{% include code-caption.html content="common/models/my-model.json" %}
```javascript
{
  "name": "MyModel",
  "settings": {
    "mongodb": {
      "allowExtendedOperators": true
    }
  ...
```

To set the option when calling an update method from code, set it in the options object; for example the following call to `updateAll()` uses the `$rename` operator:

```javascript
User.updateAll(
  {name: 'Al'},
  {'$rename': {name: 'firstname'}},
  {allowExtendedOperators: true}
);
```

The following operators are compatible and a default value of  $set will be applied if no operator is used:

<table>
  <tbody>
    <tr>
      <th>Update Operator</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>$inc</td>
      <td>Increments the value of the field by the specified amount.</td>
    </tr>
    <tr>
      <td>$mul</td>
      <td>Multiplies the value of the field by the specified amount.</td>
    </tr>
    <tr>
      <td>$rename</td>
      <td>Renames a field.</td>
    </tr>
    <tr>
      <td>$setOnInsert</td>
      <td>Sets the value of a field if an update results in an insert of a document.
        Has no effect on update operations that modify existing documents.
      </td>
    </tr>
    <tr>
      <td>$set</td>
      <td>Sets the value of a field in a document. (Default)</td>
    </tr>
    <tr>
      <td>$unset</td>
      <td>Removes the specified field from a document.</td>
    </tr>
    <tr>
      <td>$min</td>
      <td>Only updates the field if the specified value is less than the existing field value.</td>
    </tr>
    <tr>
      <td>$max</td>
      <td>Only updates the field if the specified value is greater than the existing field value.</td>
    </tr>
  </tbody>
</table>

### Customizing the collection name

You might want to customize the collection name for a LoopBack model. It can be done in the model definition JSON file.
In the example below, the Post model will be mapped to the PostCollection collection in MongoDB.

{% include code-caption.html content="/common/models/model.json" %}
```javascript
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

The LoopBack MongoDB connector supports the replica set configuration using the [MongoDB connection string URI format](http://docs.mongodb.org/manual/reference/connection-string/).
For example, here is a snippet for the data source configuration:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "connector": "mongodb",
  "url": "mongodb://example1.com,example2.com,example3.com/?readPreference=secondary"
}
```

### Handling MongoDB server restart

MongoDB has some options to control the `reconnect`.

* auto_reconnect: true, // default to true
* reconnectTries: 30, // default to 30
* reconnectInterval: 1000 // default to 1000ms

By default, after a connection failure, mongodb driver tries to reconnect up to 30 times, once per second.
If your server doesn't come back within 30 seconds, the driver gives up. You can bump up the `reconnectTries` or `reconnectInterval`.

For example:

{% include code-caption.html content="server/datasources.json" %}
```javascript
{
  "accountDB": {
    "name": "accountDB",
    "connector": "mongodb",
    "host": "localhost",
    "port": 27017,
    "server": {
      "auto_reconnect": true,
      "reconnectTries": 100,
      "reconnectInterval": 1000
    },
    "database": "demo"
  }
}
```

### About MongoDB _id field

MongoDB uses a specific ID field with BSON `ObjectID` type, named `_id`

The MongoDB connector does not expose the MongoDB `_id` field, to be consistent with other connectors.
Instead, it is transparently mapped to the `id` field, which is declared by default in the model if you do not define any `id`.

To access the `_id` property, you must define it explicitly as your model ID, along with its type; For example:

{% include code-caption.html content="/server/script.js" %}
```javascript
var ds = app.dataSources.db;
MyModel = ds.createModel('mymodel', {
  _id: { type: ds.ObjectID, id: true }
});
```

Example with a Number _id :

{% include code-caption.html content="/server/script.js" %}
```javascript
MyModel = ds.createModel('mymodel', {
  _id: { type: Number, id: true }
});
```

## MongoDB query examples

### Query with logical operators (since v1.2.3)

MongoDB supports queries with logical operators such as $and, $or, and $nor.
See [Logical Query Operators (MongoDB documentation)](http://docs.mongodb.org/manual/reference/operator/query-logical/) for more information.

To use the logical operators with LoopBack's query filter, use a `where` clause as follows (for example):

{% include code-caption.html content="/server/script.js" %}
```javascript
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

### Case-insensitive query

Since version 1.8.0, the MongoDB connector supports using a regular expression as the value of the `like` operator; this enables case-insensitive queries, for example:

```javascript
var pattern = new RegExp('.*'-query-'.*', "i"); /* case-insensitive RegExp search */
Post.find({ where: {title: { like: pattern} } };
```

Using the REST API:

`?filter={"where":{"title":{"like":"someth.*","options":"i"}}}`

### Aggregate (group by) query

To perform an aggregate (group by) query on a MongoDB data source, follow this example:

```javascript
var bookCollection = Book.getDataSource().connector.collection(Book.modelName);
bookCollection.aggregate({
  $match: {}
},
{
  $group: {
    _id: { category: "$category", author: "$author" },
    total: { $sum: 1 }
  }
},
...,
function(err, groupByRecords) {
  if(err) {
    next(err);
  } else {
    next();
  }
});
```
