---
title: "REST connector"
lang: en
layout: page
keywords: LoopBack
tags: connectors
sidebar: lb2_sidebar
permalink: /doc/en/lb2/REST-connector.html
summary: The REST connector enables LoopBack applications to interact with other (third party) REST APIs.
---

{% include see-also.html content="
* [REST connector API doc](http://apidocs.strongloop.com/loopback-connector-rest/)
* [Example](https://github.com/strongloop/loopback-example-connector/tree/rest)
" %}

## Overview

The LoopBack REST connector enables applications to interact with other (third party) REST APIs using a template-driven approach.
It supports two different styles of API invocations:

* [Resource operations](#resource-operations)
* [Defining a custom method using a template](#defining-a-custom-method-using-a-template)

## Installation

In your application root directory, enter:

```shell
$ npm install loopback-connector-rest --save
```

This will install the module from npm and add it as a dependency to the application's [package.json](package.json.html) file.

## Creating a REST data source

Use the [DataSource generator](Data-source-generator) to add a REST data source to your application.

```shell
$ apic create --type datasource
```

```shell
$ slc loopback:datasource
```

When prompted, scroll down in the list of connectors and choose **REST services (supported by StrongLoop)**.
This adds an entry to [datasources.json](datasources.json.html) (for example):

```javascript
...
  "myRESTdatasource": {
    "name": "myRESTdatasource",
    "connector": "rest"
  }
...
```

## Configuring a REST data source

Configure the REST connector by editing `datasources.json` manually (for example using the Google Maps API):

{% include code-caption.html content="/server/datasources.json" %}
```javascript
...
"geoRest": {
  "connector": "rest",
  "debug": "false",
  "operations": [{
    "template": {
      "method": "GET",
      "url": "http://maps.googleapis.com/maps/api/geocode/{format=json}",
      "headers": {
        "accepts": "application/json",
        "content-type": "application/json"
      },
      "query": {
        "address": "{street},{city},{zipcode}",
        "sensor": "{sensor=false}"
      },
      "responsePath": "$.results[0].geometry.location"
    },
    "functions": {
      "geocode": ["street", "city", "zipcode"]
    }
  }]
}
...
```

For a REST data source, you can define an array of  _operation_ objects to specify the REST API mapping. Each operation object can have the following two properties:

* template: See how to define a custom method template [below](#defining-a-custom-method-using-a-template).
* functions: An object that maps a JavaScript function to a list of parameter names.
  For example, a function geocode(street, city, zipcode) will be created so that the first argument will be the value of street variable in the template, second for city, and third for zipcode. 
  The function can be executed anywhere by the server (in a boot script, through middleware, or within a model's .js file if it is attached to the REST datasource). 

## Configure options for request

The REST connector uses the [request](https://www.npmjs.com/package/request) module as the HTTP client.
You can configure the same options as for the `request()` function.
See [`request(options, callback)`](https://www.npmjs.com/package/request#request-options-callback).

You can configure options `options` property at two levels:

* Data source level (common to all operations)
* Operation level (specific to the declaring operation)

For example, the following example sets `Accept` and `Content-Type` to `"application/json"` for all requests.
It also sets `strictSSL` to false so that the connector allows self-signed SSL certificates.

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "connector": "rest",
  "debug": false,
  "options": {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json"
    },
    "strictSSL": false
  },
  "operations": [
    {
      "template": {
        "method": "GET",
        "url": "http://maps.googleapis.com/maps/api/geocode/{format=json}",
        "query": {
          "address": "{street},{city},{zipcode}",
          "sensor": "{sensor=false}"
        },
        "options": {
          "strictSSL": true,
          "useQuerystring": true
        },
        "responsePath": "$.results[0].geometry.location"
      },
      "functions": {
        "geocode": ["street", "city", "zipcode"]
      }
    }
  ]
}
```

### Resource operations

If the REST API supports create, read, update, and delete (CRUD) operations for resources, such as users or orders,
you can simply bind the model to a REST endpoint that follows REST conventions.

For example, the following methods would be mixed into your model class:

* create: POST /users
* findById: GET /users/:id
* delete: DELETE /users/:id
* update: PUT /users/:id
* find: GET /users?limit=5&username=ray&order=email

For example:

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
module.exports = function(app) {
  var ds = app.loopback.createDataSource({
    connector: require("loopback-connector-rest"),
    debug: false,
    baseURL: 'http://localhost:3000'
  });

  var User = ds.createModel('user', {
    name: String,
    bio: String,
    approved: Boolean,
    joinedAt: Date,
    age: Number
  });

  User.create(new User({
    name: 'Mary'
  }), function(err, user) {
    console.log(user);
  });

  User.find(function(err, user) {
    console.log(user);
  });

  User.findById(1, function(err, user) {
    console.log(err, user);
  });

  User.update(new User({
    id: 1,
    name: 'Raymond'
  }), function(err, user) {
    console.log(err, user);
  });
}
```

### Setting the resource URL

You can set the remote URL when using create, read, update, or delete functionality by setting the `resourceName` property on a model definition.
This allows for a local model name that is different from the remote resource name.

For example:

```javascript
var config = {
  "name": "ServiceTransaction",
  "base": "PersistedModel",
  "resourceName": "transactions"
}

var ServiceTransaction = ds.createModel('ServiceTransaction', {}, config);
```

Now there will be a resource model named `ServiceTransaction`, but whose URLs call out to `baseUrl - '/transactions'`

Without setting `resourceName` the calls would have been made to `baseUrl - '/ServiceTransaction'`.

## Defining a custom method using a template

Imagine that you use a web browser or REST client to test drive a REST API; you will specify the following HTTP request properties:

* `method`: HTTP method
* `url`: The URL of the request
* `headers`: HTTP headers
* `query`: Query strings
* `responsePath`: an optional JSONPath applied to the HTTP body. See [https://github.com/s3u/JSONPath](https://github.com/s3u/JSONPath) for syntax of JSON paths.

Then you define the API invocation as a JSON template. For example:

```javascript
template: {
    "method": "GET",
    "url": "http://maps.googleapis.com/maps/api/geocode/{format=json}",
    "headers": {
      "accepts": "application/json",
      "content-type": "application/json"
    },
    "query": {
      "address": "{street},{city},{zipcode}",
      "sensor": "{sensor=false}"
    },
    "responsePath": "$.results[0].geometry.location"
  }
```

The template variable syntax is:

`{name=defaultValue:type}`

The variable is required if the name has a prefix of ! or ^

For example:

<table>
  <tbody>
    <tr>
      <th>Variable definition</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>
        <pre><code>'{x=100:number}'</code>
        </pre>
      </td>
      <td>Define a variable x of number type and default value 100</td>
    </tr>
    <tr>
      <td>
        <pre><code>'{x:number}'</code>
        </pre>
      </td>
      <td>Define a variable x of number type</td>
    </tr>
    <tr>
      <td>
        <pre><code>'{x}'</code>
        </pre>
      </td>
      <td>Define a variable x</td>
    </tr>
    <tr>
      <td>
        <pre><code>'{x=100}ABC{y}123'</code>
        </pre>
      </td>
      <td>
        <p>Define two variables x and y. The default value of x is 100\. The resolved value will be a concatenation of x, 'ABC', y, and '123'. For example, x=50, y=YYY will produce '50ABCYYY123'</p>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>'{!x}'</code>
        </pre>
      </td>
      <td>Define a required variable x</td>
    </tr>
    <tr>
      <td>
        <pre><code>'{x=100}ABC{^y}123'</code>
        </pre>
      </td>
      <td>Define two variables x and y. The default value of x is 100\. y is required.</td>
    </tr>
  </tbody>
</table>

To use custom methods, you can configure the REST connector with the `operations` property, which is an array of objects that contain `template` and `functions`.
The `template` property defines the API structure while the `functions` property defines JavaScript methods that takes the list of parameter names.

```javascript
var loopback = require("loopback");

var ds = loopback.createDataSource({
  connector: require("loopback-connector-rest"),
  debug: false,
  operations: [{
    template: {
      "method": "GET",
      "url": "http://maps.googleapis.com/maps/api/geocode/{format=json}",
      "headers": {
        "accepts": "application/json",
        "content-type": "application/json"
      },
      "query": {
        "address": "{street},{city},{zipcode}",
        "sensor": "{sensor=false}"
      },
      "responsePath": "$.results[0].geometry.location"
    },
    functions: {
      "geocode": ["street", "city", "zipcode"]
    }
  }]
});
```

Now you can invoke the geocode API as follows:

```javascript
Model.geocode('107 S B St', 'San Mateo', '94401', processResponse);
```

By default, LoopBack REST connector also provides an 'invoke' method to call the REST API with an object of parameters, for example:

```javascript
Model.invoke({street: '107 S B St', city: 'San Mateo', zipcode: '94401'}, processResponse);
```

## Parameter/variable mapping to HTTP (since 2.0.0)

{% include important.html content="

This feature is available starting with loopback-connector-rest version 2.0.0.

" %}

By default, variables in the template are mapped to HTTP sources based on their root property.

<table>
  <tbody>
    <tr>
      <th>Root property</th>
      <th>HTTP source</th>
    </tr>
    <tr>
      <td>url</td>
      <td>path</td>
    </tr>
    <tr>
      <td>query</td>
      <td>query</td>
    </tr>
    <tr>
      <td>body</td>
      <td>body</td>
    </tr>
    <tr>
      <td>headers</td>
      <td>header</td>
    </tr>
  </tbody>
</table>

You can further customize the source in the parameter array of the function mapping, for example:

```javascript
{
  "template": {
    "method": "POST",
    "url": "http://localhost:3000/{p}",
    "headers": {
      "accept": "application/{format}"
    },
    "query": {
      "x": "{x}",
      "y": 2
    },
    "body": {
      "a": "{a:number}",
      "b": "{b=true}"
    }
  },
  "functions": {
    "myOp": [
      "p",
      "x",
      "a",
      {
        "name": "b",
        "source": "header"
      }
    ]
  }
}
```

For the template above, the variables will be mapped as follows:

* p - path
* x - query
* a - body
* b - header

Please note that path variables are appended to the path, for example, `/myOp/:p.`
