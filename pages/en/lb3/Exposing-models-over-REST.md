---
title: "Exposing models over REST"
lang: en
layout: page
toc_level: 2
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Exposing-models-over-REST.html
summary:
---

## Overview

LoopBack models automatically have a [standard set of HTTP endpoints](http://apidocs.loopback.io/loopback/#persistedmodel)
that provide REST APIs for create, read, update, and delete (CRUD) operations on model data.
The `public` property in [model-config.json](model-config.json.html) specifies whether to expose the model's REST APIs, for example:

{% include code-caption.html content="/server/model-config.json" %}
```javascript
...
"MyModel": {
  "public": true,
  "dataSource": "db"
},
...
```

To "hide" the model's REST API, simply change `public` to `false`.

### REST paths

By default, the REST APIs are mounted to the plural of the model name; specifically:

* `Model.settings.http.path`
* `plural`, if defined in the [Model definition JSON file](Model-definition-JSON-file.html).
* Automatically-pluralized model name (the default). For example, if you have a location model, by default it is mounted to `/locations`. 

### Using the REST Router

By default, scaffolded applications expose models over REST using the `loopback.rest` router.

{% include important.html content="
If you created your application using the [application generator](Application-generator.html), LoopBack will automatically set up REST middleware and register public models.  You don't need to do anything additional.
" %}

To manually expose a model over REST with the `loopback.rest` router, use the following code, for example:

{% include code-caption.html content="/server/server.js" %}
```javascript
var app = loopback();
app.use(loopback.rest());

// Expose the `Product` model
app.model(Product);
```

After this, the `Product` model will have create, read, update, and delete functions working remotely from mobile.
At this point, the model is schema-less and the data are not checked.

You can then view generated REST documentation at [http://localhost:3000/explorer](http://localhost:3000/explorer)

LoopBack provides a number of [built-in models](Using-built-in-models.html) that have REST APIs.
See [Built-in models REST API](Built-in-models-REST-API.html) for more information.

### Request format

For POST and PUT requests, the request body can be JSON, XML or URL-encoded format, with the **Content-Type** header set to one of:

- `application/json`
- `application/xml`
- `application/x-www-form-urlencoded`

The **Accept** header indicates its preference for the response format.

{% include tip.html content="
Setting the request's **Accept** header to `application/vnd.api-json` will result in the response's **Content-Type** header being automatically set to `application/vnd.api-json` if `application/vnd.api-json` is in the array of supported types.

Set the supported types with the `remoting.``rest.supportedTypes` property in [config.json](config.json.html).
" %}

#### Passing JSON object or array using HTTP query string

Some REST APIs take a JSON object or array from the query string. LoopBack supports two styles to encode the object/array value as query parameters.

* Syntax from node-querystring (qs)
* Stringified JSON

For example,

```
http://localhost:3000/api/users?filter[where][username]=john&filter[where][email]=callback@strongloop.com
http://localhost:3000/api/users?filter={"where":{"username":"john","email":"callback@strongloop.com"}}
```

The table below illustrates how to encode the JSON object/array in different styles:

<table style="width: 800px;">
  <thead>
    <tr>
      <th>JSON object/array</th>
      <th>qs style</th>
      <th>Stringified JSON</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>
        <pre><code>{
where: {
  username: 'john',
  email: 'a@b.com'
  }
}</code></pre>
      </td>
      <td>
        <pre>?filter[where][username]=john
&filter[where][email]=a@b.com</pre>
      </td>
      <td>
        <pre><code>?filter={
  "where": {
    "username":"john",
    "email":"a@b.com"
  }
}</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>{
  where: {
    username: {inq:
      ['john', 'mary']}
  }
}</code></pre>
      </td>
      <td>
        <pre>?filter[where][username][inq][0]=john
&filter[where][username][inq][1]=mary</pre>
      </td>
      <td>
        <pre><code>?filter={
  "where": {
    "username": {
      "inq":["john","mary"]
    }
  }
}</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>{
  include: ['a', 'b']
}</code></pre>
      </td>
      <td>
        <pre><code>?filter[include]=a&filter[include]=b</code></pre>
      </td>
      <td>
        <pre><code>?filter={
  "include": ["a","b"]
}</code></pre>
      </td>
    </tr>
  </tbody>
</table>

### Response format

The response format for all requests is typically a JSON object/array or XML in the body and a set of headers.
Some responses have an empty body. For example,

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
Content-Length: 59
Vary: Accept-Encoding
Date: Fri, 24 Oct 2014 18:02:34 GMT
Connection: keep-alive

{"title":"MyNote","content":"This is my first note","id":1}
```

The HTTP status code indicates whether a request succeeded:

* Status code 2xx indicates success
* Status code 4xx indicates request related issues.
* Status code 5xx indicates server-side problems

The response for an error is in the following JSON format:

* message: String error message.
* stack: String stack trace.
* statusCode: Integer [HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).

For example,

```javascript
{
  "error": {
    "message": "could not find a model with id 1",
    "stack": "Error: could not find a model with id 1\n ...",
    "statusCode": 404
  }
}
```

### Disabling API Explorer

LoopBack [API Explorer](Use-API-Explorer) is great when you're developing your application,
but for security reasons you may not want to expose it in production.

For an application using [loopback-component-explorer](https://github.com/strongloop/loopback-component-explorer), to disable explorer in production:

* Set the NODE_ENV environment variable to "production".
* Then in `server/component-config.production.json`:

{% include code-caption.html content="server/component-config.production.json" %}
```javascript
{
  "loopback-component-explorer": null
}
```

## Predefined remote methods

By default, for a model backed by a data source that supports it,
LoopBack exposes a REST API that provides all the standard create, read, update, and delete (CRUD) operations.

As an example, consider a simple model called `Location` (that provides business locations) to illustrate the REST API exposed by LoopBack.
LoopBack automatically creates a number of Node methods with corresponding REST endpoints, including:

The following table describes remote methods exposed in LoopBack 3.x:

| Model (Node) API | HTTP Method | Example Path |
|---|---|---|
| [create()](https://apidocs.loopback.io/loopback/#persistedmodel-create)                                        | POST   | /locations                 |
| [replaceOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-replaceorcreate)                      | PUT    | /locations                 |
| [patchOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-upsert)                                 | PATCH  | /locations                 |
| [exists()](https://apidocs.loopback.io/loopback/#persistedmodel-exists)                                        | GET    | /locations/:id/exists      |
| [findById()](https://apidocs.loopback.io/loopback/#persistedmodel-findbyid)                                    | GET    | /locations/:id             |
| [find()](https://apidocs.loopback.io/loopback/#persistedmodel-find)                                            | GET    | /locations                 |
| [findOne()](https://apidocs.loopback.io/loopback/#persistedmodel-findone)                                      | GET    | /locations/findOne         |
| [destroyById() or deleteById()](https://apidocs.loopback.io/loopback/#persistedmodel-destroybyid)              | DELETE | /locations/:id             |
| [count()](https://apidocs.loopback.io/loopback/#persistedmodel-count)                                          | GET    | /locations/count           |
| [replaceById()](https://apidocs.loopback.io/loopback/#persistedmodel-replacebyid)                              | PUT    | /locations/:id             |
| [prototype.patchAttributes()](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-updateattributes) | PATCH  | /locations/:id             |
| [createChangeStream()](https://apidocs.loopback.io/loopback/#persistedmodel-createchangestream)                | POST   | /locations/change-stream   |
| [updateAll()](https://apidocs.loopback.io/loopback/#persistedmodel-updateall)                                  | POST   | /locations/update          |
| [replaceOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-replaceorcreate)                      | POST   | /locations/replaceOrCreate |
| [replaceById()](https://apidocs.loopback.io/loopback/#persistedmodel-replacebyid)                              | POST   | /locations/:id/replace     |

As you see the only difference between LoopBack 2.x and 3.0 in default configuration is the behaviour of HTTP PUT endpoints (both `PUT /api/my-models` and `PUT /api/my-models/:id`). By default in LoopBack 2.x, these endpoints invoke patch methods and perform a partial update, while in LoopBack 3.0, these methods perform a full replace.

## replaceOnPUT flag

Use the replaceOnPUT property in `model.json` to change the behavior of mapping replace and update methods. If replaceOnPUT is true, replaceOrCreate and replaceById  use the HTTP PUT method; if it is false, updateOrCreate and updateAttributes/patchAttributes use the HTTP PUT method.

The following example illustrates how to set `replaceOnPUT` in `location.json`:

```javascript
...
{
  name: "location",
  plural: "locations",
  relations: {…},
  acls: […],
  properties: { … },
  replaceOnPUT: true
}...
```

{% include tip.html content="
The above table provides a partial list of methods and REST endpoints.
See the [API documentation](https://apidocs.loopback.io/loopback/#persistedmodel) for a complete list of all the Node API methods.  See [PersistedModel REST API](PersistedModel-REST-API.html) for details on the REST API.
" %}

## Exposing and hiding models, methods, and endpoints

To expose a model over REST, set the `public` property to true in `/server/model-config.json`:

```javascript
...
"Role": {
  "dataSource": "db",
  "public": false
},
...
```

### Hiding methods and REST endpoints

If you don't want to expose certain operations, hide them by calling 
[`disableRemoteMethodByName()`](http://apidocs.loopback.io/loopback/#model-disableremotemethodbyname) on the model. 
For example, following the previous example, by convention custom model code would go in the file `common/models/location.js`.
You would add the following lines to "hide" one of the predefined remote methods:

{% include code-caption.html content="common/models/location.js" %}
```javascript
Location.disableRemoteMethodByName('deleteById');
```

Now the `deleteById()` operation and the corresponding REST endpoint will not be publicly available.

For a method on the prototype object, such as `updateAttributes()`:

{% include code-caption.html content="common/models/location.js" %}
```javascript
Location.disableRemoteMethodByName('prototype.updateAttributes');
```

{% include important.html content="Be sure to call `disableRemoteMethodByName()` on your own custom model, not one of the built-in models; in the example below, for instance, the calls are `MyUser.disableRemoteMethodByName()` _not_ `User.disableRemoteMethodByName()`.
" %}

Here's an example of hiding all methods of the `MyUser` model through configuration, except for `login` and `logout`:

In `server/model-config.json`:

```javascript
"MyUser": {
  "dataSource": "db",
  "public": true,
  "options": {
    "remoting": {
      "sharedMethods": {
        "*": false,
        "login": true,
        "logout": true
      }
    }
  }
}
```

You can also hide common methods across all models through `config.json`'s `remoting` object as follows:

```javascript
"remoting": {
  "context": false,
  ...
  "sharedMethods": {
    "*": false,
    "login": true,
    "logout": true
  }
}
```

Alternatively you can also disable remoteMethods through javascript in your `myUser.js` model:

```javascript
MyUser.disableRemoteMethodByName('create');
MyUser.disableRemoteMethodByName('upsert');
MyUser.disableRemoteMethodByName('updateAll');
MyUser.disableRemoteMethodByName('prototype.updateAttributes');

MyUser.disableRemoteMethodByName('find');
MyUser.disableRemoteMethodByName('findById');
MyUser.disableRemoteMethodByName('findOne');

MyUser.disableRemoteMethodByName('deleteById');

MyUser.disableRemoteMethodByName('confirm');
MyUser.disableRemoteMethodByName('count');
MyUser.disableRemoteMethodByName('exists');
MyUser.disableRemoteMethodByName('resetPassword');

MyUser.disableRemoteMethodByName('prototype.__count__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__create__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__delete__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__findById__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__get__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__updateById__accessTokens');
```

### Read-Only endpoints example

You may want to only expose read-only operations on your model hiding all POST, PUT, DELETE verbs

{% include code-caption.html content="common/models/model.js" %}
```javascript
Product.disableRemoteMethodByName('create');     // Removes (POST) /products
Product.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
Product.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
Product.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
Product.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
Product.disableRemoteMethodByName('createChangeStream');
    // Removes (GET|POST) /products/change-stream
```

### Hiding endpoints for related models

To disable a REST endpoints for related model methods, use [disableRemoteMethodByName()](https://apidocs.loopback.io/loopback/#model-disableRemoteMethodByName).

{% include note.html content="For more information, see [Accessing related models](Accessing-related-models.html).
"
%}

For example, if there are post and tag models, where a post hasMany tags, add the following code to `/common/models/post.js` 
to disable the remote methods for the related model and the corresponding REST endpoints: 

{% include code-caption.html content="common/models/model.js" %}
```javascript
module.exports = function(Post) {
  Post.disableRemoteMethodByName('prototype.__get__tags');
  Post.disableRemoteMethodByName('prototype.__create__tags');
  Post.disableRemoteMethodByName('prototype.__destroyById__accessTokens'); // DELETE
  Post.disableRemoteMethodByName('prototype.__updateById__accessTokens'); // PUT
};
```

### Hiding properties

To hide a property of a model exposed over REST, define a hidden property.
See [Model definition JSON file (Hidden properties)](Model-definition-JSON-file.html#hidden-properties).

{% include content/hidden-vs-protected.html xref='true' %}
