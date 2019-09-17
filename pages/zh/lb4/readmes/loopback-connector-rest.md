# loopback-connector-rest

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

This will install the module from npm and add it as a dependency to the application's [package.json](http://loopback.io/doc/en/lb3/package.json.html) file.

## Creating a REST data source

Use the [data source generator](http://loopback.io/doc/en/lb3/Data-source-generator) to add a REST data source to your application.

For LoopBack 2.x:

```shell
$ apic create --type datasource
```

For LoopBack 2.x or 3.0:

```shell
$ lb datasource
```

When prompted, scroll down in the list of connectors and choose **REST services (supported by StrongLoop)**.
This adds an entry to [datasources.json](http://loopback.io/doc/en/lb3/datasources.json.html), for example:

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

**/server/datasources.json**

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

The `operations` property is an array of objects, each of which can have these properties:

* `template`: An object that defines a custom method using a template; see [Defining a custom method using a template](#defining-a-custom-method-using-a-template).
* `functions`: An object that maps a JavaScript function to a list of parameter names.  

The example above creates a function `geocode(street, city, zipcode)` whose first argument is `street`, second is `city`, and third is `zipcode`.  LoopBack application code can call the function anywhere; for example, in a boot script, via  middleware, or within a model's JavaScript file if attached to the REST datasource. 

## Configure options for request

The REST connector uses the [request](https://www.npmjs.com/package/request) module as the HTTP client.
You can configure the same options as for the `request()` function.
See [`request(options, callback)`](https://www.npmjs.com/package/request#request-options-callback).

You can configure options `options` property at two levels:

* Data source level (common to all operations)
* Operation level (specific to the declaring operation)

The following example sets `Accept` and `Content-Type` to `"application/json"` for all requests.
It also sets `strictSSL` to false so the connector allows self-signed SSL certificates.

**/server/datasources.json**

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

If the REST API supports create, read, update, and delete (CRUD) operations for resources,
you can simply bind the model to a REST endpoint that follows REST conventions.

For example, the following methods would be mixed into your model class:

* create: `POST /users`
* findById: `GET /users/:id`
* delete: `DELETE /users/:id`
* update: `PUT /users/:id`
* find: `GET /users?limit=5&username=ray&order=email`

For example:

**/server/boot/script.js**

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

The `template` object specifies the REST API invocation as a JSON template, with the following properties:

| Property | Description | Type |
|----------|-------------|------|
| `method`| HTTP method | String (one of "GET", "POST", "PUT", and so on). |
| `url`| The URL of the request | String; template values allowed. |
| `headers`| HTTP headers | Object |
| `query`| Query strings | Object; template values allowed. |
| `responsePath`| Optional JSONPath applied to the HTTP body. See [https://github.com/s3u/JSONPath](https://github.com/s3u/JSONPath) for syntax of JSON paths.| String |

The template variable syntax is:

`{name=defaultValue:type}`

To specify that the variable value is required, add the prefix `!` or `^`.

For example:

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

The following table provides several examples:

<table>
  <tbody>
    <tr>
      <th>Variable definition</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>'{x=100:number}'</code></td>
      <td>Define a variable x of number type and default value 100.</td>
    </tr>
    <tr>
      <td><code>'{x:number}'</code></td>
      <td>Define a variable x of number type</td>
    </tr>
    <tr>
      <td><code>'{x}'</code></td>
      <td>Define a variable x</td>
    </tr>
    <tr>
      <td><code>'{x=100}ABC{y}123'</code></td>
      <td>
        <p>Define two variables x and y. The default value of x is 100. The resolved value will be a concatenation of x, 'ABC', y, and '123'. For example, x=50, y=YYY will produce '50ABCYYY123'</p>
      </td>
    </tr>
    <tr>
      <td><code>'{!x}'</code></td>
      <td>Define a required variable x</td>
    </tr>
    <tr>
      <td><code>'{x=100}ABC{^y}123'</code></td>
      <td>Define two variables, x and y. The default value of x is 100, and y is required.</td>
    </tr>
  </tbody>
</table>

To use custom methods, configure the REST connector with the `operations` property, which is an array of objects, each of which can have these properties:

- `template` defines the API structure. 
- `functions` defines JavaScript methods that accept the specified list of parameter names.

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

Now you can invoke the geocode API in Node.js as follows:

```javascript
Model.geocode('107 S B St', 'San Mateo', '94401', processResponse);
```

By default, the REST connector also provides an 'invoke' method to call the REST API with an object of parameters, for example:

```javascript
Model.invoke({street: '107 S B St', city: 'San Mateo', zipcode: '94401'}, processResponse);
```

## Parameter/variable mapping to HTTP (since 2.0.0)

NOTE: This feature is available with `loopback-connector-rest` version 2.0.0 and later.

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
