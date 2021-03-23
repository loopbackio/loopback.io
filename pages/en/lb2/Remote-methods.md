---
title: "Remote methods"
lang: en
layout: navgroup
toc_level: 1
navgroup: app-logic
keywords: LoopBack
tags: [models, application_logic]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Remote-methods.html
summary: A remote method is a static method of a model, exposed over a custom REST endpoint.

---
## Overview

A _remote method_ is a static method of a model, exposed over a custom REST endpoint.
Use a remote method to perform operations not provided by LoopBack's [standard model REST API](PersistedModel-REST-API.html).

{% include note.html content="The easiest way to define a remote method is by using the command-line [remote method generator](Remote-method-generator.html).

For an introductory example of defining a remote method, see [Extend your API](Extend-your-API.html) in Getting Started.
" %}

## How to define a remote method

To define a remote method:

1.  Edit the [Model definition JSON file](Model-definition-JSON-file.html) in `/common/models` directory; for example, to attach a remote method to the Person model, edit `/common/models/person.js`.
If you created the model with the [Model generator](Model-generator.html), then this file will already exist.

2.  Define a static method that will handle the request.

3.  Call [`remoteMethod()`](http://apidocs.strongloop.com/loopback/#model-remotemethod), to register the method, calling it with two parameters: 
    - First parameter is a string that is the name of the method you defined in step 2 
    - Second (optional) parameter provides additional configuration for the REST endpoint.

{% include important.html content="The LoopBack [model generator](Model-generator.html) automatically converts camel-case model names (for example MyModel) to lowercase dashed names (my-model).
For example, if you create a model named \"FooBar\" with the model generator, it creates files `foo-bar.json` and `foo-bar.js` in `common/models`. 
However, the model name (\"FooBar\") will be preserved via the model's name property.
" %} 

### Example

See additional introductory examples in [Extend your API](Extend-your-API.html).

Suppose you have a Person model and you want to add a REST endpoint at `/greet` that returns a greeting with a name provided in the request.
You add this code to `/common/models/person.js`:

{% include code-caption.html content="/common/models/person.js" %}
```javascript
module.exports = function(Person){

    Person.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Person.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};
```

Now, for example, a request to

`POST /api/people/greet`

with data `{"msg": "John"}`

will return:

**shell**

`Greetings... John!`

{% include note.html content="
Notice the REST API request above uses the plural form \"people\" instead of \"person\". LoopBack exposes the
[plural form of model names for REST API routes](Exposing-models-over-REST.html#REST-paths).
" %}

### Using async/await

Remote methods can also return a promise instead of using the callback parameter.

{% include code-caption.html content="/common/models/person.js" %}
```javascript
module.exports = function(Person){

    Person.greet = async function(msg) {
        return 'Greetings... ' + msg;
    }

    Person.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};
```

## Registering a remote method

All LoopBack models have a [`remoteMethod()`](http://apidocs.strongloop.com/loopback/#model-remotemethod) static method that you use to register a remote method:

```javascript
model.remoteMethod(requestHandlerFunctionName, [options])
```

Where:

* _`model`_ is the model object to which you're adding the remote method. In our example, `Person`.
* _`requestHandlerFunctionName`_ is a string that specifies name of the remote method, for example `'greet'`.
* _`options`_ is an object that specifies parameters to configure the REST endpoint; see below.

### Options

The options argument is a Javascript object containing key/value pairs to configure the remote method REST endpoint.

{% include important.html content="
All of the options properties are optional. However, if the remote method requires arguments, you must specify `accepts`; if the remote method returns a value, you must specify `returns`.
" %}

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>accepts</td>
      <td>
        <p>Defines arguments that the remote method accepts. These arguments map to the static method you define. For the example above, you can see the function signature:</p>
        <pre>Person.greet(name, age, callback)...</pre>
        <p>`name` is the first argument, `age` is the second argument and callback is automatically provided by LoopBack (do not specify it in your `accepts` array). For more info, see <a href="Remote-methods.html#argument-descriptions">Argument descriptions</a>.</p>
        <p>Default if not provided is the empty array, <code>[]</code>.</p>
      </td>
      <td>
        <pre>{  ...
  accepts: [
   {arg: 'name', type: 'string'},
   {arg: 'age', type: 'number'},...],
  ... }</pre>
      </td>
    </tr>
    <tr>
      <td>description</td>
      <td>
        <p>Text description of the method, used by API documentation generators such as Swagger.</p>
        <p>You can put long strings in an array if needed (see note below).</p>
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>http.path</td>
      <td>
        <p>HTTP path (relative to the model) at which the method is exposed.</p>
      </td>
      <td>
        <pre>http: {path: '/sayhi'}</pre>
      </td>
    </tr>
    <tr>
      <td>http.verb</td>
      <td>
        <p>HTTP method (verb) at which the method is available. One of:</p>
        <ul>
          <li>get</li>
          <li>post (default)</li>
          <li>patch</li>
          <li>put</li>
          <li>del</li>
          <li>all</li>
        </ul>
      </td>
      <td>
     <pre>http: {path: '/sayhi', verb: 'get'}</pre>
      </td>
    </tr>
    <tr>
      <td>http.status</td>
      <td>Default HTTP status set when the callback is called without an error.</td>
      <td>
      <pre>http: {status: 201}</pre>
      </td>
    </tr>
    <tr>
      <td>http.errorStatus</td>
      <td>Default HTTP status set when the callback is called with an error.</td>
      <td>
        <pre>http: {errorStatus: 400}</pre>
      </td>
    </tr>
    <tr>
      <td>isStatic</td>
      <td>Boolean. Whether the method is static (for example <code>MyModel.myMethod</code>). Use <code>false</code> to define the method on the prototype (for example, <code>MyModel.prototype.myMethod</code>). Default is true.
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>notes</td>
      <td>
        <p>Additional notes, used by API documentation generators like Swagger.</p>
        <p>You can put long strings in an array if needed (see note below).</p>
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>returns</td>
      <td>
        <p>Describes the remote method's callback arguments; See <a href="Remote-methods.html#argument-descriptions">Argument descriptions</a>. The <code>err </code>argument is assumed; do not specify.</p>
        <p>Default if not provided is the empty array,  <code>[]</code>.</p>
      </td>
      <td>
        <pre>returns: {arg: 'greeting', type: 'string'}</pre>
      </td>
    </tr>
  </tbody>
</table>

{% include important.html content="
You can split long strings in the `description` and `notes` options into arrays of strings (lines) to keep line lengths manageable. For example:

```javascript
[
 \"Lorem ipsum dolor sit amet, consectetur adipiscing elit,\",
 \"sed do eiusmod tempor incididunt ut labore et dolore\",
 \"magna aliqua.\"
]
```
" %}

### Argument descriptions

The `accepts` and `returns` options properties define either a single argument as an object or an ordered set of arguments as an array.
The following table describes the properties of each individual argument.

<table>
  <tbody>
    <tr>
      <th>Property (key)</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>arg</td>
      <td>String</td>
      <td>Argument name</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String or Array</td>
      <td>
        <p>A text description of the argument. This is used by API documentation generators like Swagger.</p>
        <p>You can split long descriptions into arrays of strings (lines) to keep line lengths manageable.</p>
        <pre>[<br> "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"<br>
      "sed do eiusmod tempor incididunt ut labore et dolore",<br> "magna aliqua."
      <br>] </pre>
      </td>
    </tr>
    <tr>
      <td>http</td>
      <td>Object or Function</td>
      <td>For input arguments: a function or an object describing mapping from HTTP request to the argument value. See <a href="Remote-methods.html">HTTP mapping of input arguments</a> below.</td>
    </tr>
    <tr>
      <td>http.target</td>
      <td>String</td>
      <td>
        <p>Map the callback argument value to the HTTP response object. The following values are supported.</p>
        <ul>
          <li><code>status</code> sets the <code>res.statusCode</code> to the provided value</li>
          <li><code>header</code> sets the <code>http.header</code> or <code>arg</code> named header to the value</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>required</td>
      <td>Boolean</td>
      <td>True if argument is required; false otherwise.</td>
    </tr>
    <tr>
      <td>root</td>
      <td>Boolean</td>
      <td>For callback arguments: set this property to <code>true</code>
         if your function has a single callback argument to use as the root object returned to remote caller.
        Otherwise the root object returned is a map (argument-name to argument-value).
      </td>
    </tr>
    <tr>
      <td>type</td>
      <td>String</td>
      <td>Argument datatype; must be a <a href="LoopBack-types.html">Loopback type</a>. Additionally, callback arguments allow a special type "file"; see below.</td>
    </tr>
    <tr>
      <td>default</td>
      <td>String</td>
      <td>Default value that will be used to populate loopback-explorer input fields and swagger documentation.
        <strong>Note</strong>: This value will not be passed into remote methods function if argument is not present.
      </td>
    </tr>
  </tbody>
</table>

For example, a single argument, specified as an object:

```javascript
{arg: 'myArg', type: 'number'}
```

Multiple arguments, specified as an array:

```javascript
[
  {arg: 'arg1', type: 'number', required: true},
  {arg: 'arg2', type: 'array'}
]
```

#### Returning a file (stream) response

You can specify `{ type: 'file', root: true }` for a callback argument that will be sent directly as the response body. A file argument can be set to one of the following values:

* String
* [Buffer](https://nodejs.org/api/buffer.html)
* [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) (anything that exposes `.pipe()` method)

Example:

```javascript
module.exports = function(MyModel) {
  MyModel.download = function(cb) {
    // getTheStreamBody() can be implemented by calling http.request() or fs.readFile() for example
    getTheStreamBody(function(err, stream) {
      if (err) return cb(err);
      // stream can be any of: string, buffer, ReadableStream (e.g. http.IncomingMessage)
      cb(null, stream, 'application/octet-stream');
    });
  };

  MyModel.remoteMethod('download', {
    isStatic: true,
    returns: [
      {arg: 'body', type: 'file', root: true},
      {arg: 'Content-Type', type: 'string', http: { target: 'header' }}
    ]
  });
};
```

### HTTP mapping of input arguments

There are two ways to specify HTTP mapping for input parameters (what the method accepts):

* Provide an object with a `source` property
* Specify a custom mapping function

**Using an object with a source property**

To use the first way to specify HTTP mapping for input parameters, provide an object with a `source` property that has one of the values shown in the following table.

<table>
  <thead>
    <tr>
      <th>Value of source property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>body</td>
      <td>The whole request body is used as the value.</td>
    </tr>
    <tr>
      <td>form<br>query<br>path </td>
      <td>
        <p>The value is looked up using <code>req.param</code>, which searches route arguments, the request body and the query string.</p>
        <p>Note that <code>query</code> and <code>path</code> are aliases for <code>form</code>.</p>
      </td>
    </tr>
    <tr>
      <td>req</td>
      <td>The <a href="http://expressjs.com/4x/api.html#req" class="external-link" rel="nofollow">Express HTTP request object</a>.</td>
    </tr>
    <tr>
      <td>res</td>
      <td>The <a href="http://expressjs.com/4x/api.html#res" class="external-link" rel="nofollow">Express HTTP response object</a>.</td>
    </tr>
    <tr>
      <td>context</td>
      <td>The whole context object, which holds request and response objects.</td>
    </tr>
  </tbody>
</table>

For example, an argument getting the whole request body as the value:

```javascript
{ arg: 'data', type: 'object', http: { source: 'body' } }
```

Another example showing the Express HTTP request and response objects:

```javascript
[
 {arg: 'req', type: 'object', 'http': {source: 'req'}},
 {arg: 'res', type: 'object', 'http': {source: 'res'}}
]
```

**Using a custom mapping function**

The second way to specify HTTP mapping for input parameters is to specify a custom mapping function; for example:

```javascript
{
  arg: 'custom',
  type: 'number',
  http: function(ctx) {
    // ctx is LoopBack Context object

    // 1\. Get the HTTP request object as provided by Express
    var req = ctx.req;

    // 2\. Get 'a' and 'b' from query string or form data and return their sum.
    return -req.param('a') - req.param('b');
  }
}
```

If you don't specify a mapping, LoopBack will determine the value as follows (assuming `name` as the name of the input parameter to resolve):

1.  If there is an HTTP request parameter `args` with JSON content, then it uses the value of `args['name']`.
2.  Otherwise, it uses `req.param('name')`.

### Returning data outside of a JSON field

Specifying a return argument with the _arg_ property will automatically return a JSON object with your data stored within a field of the same name.

If you want to return data as the main response, for example an array, you can do so by setting the _root_ property within the returns object and omitting _arg_. 

```javascript
returns: {type: 'array', root: true}
```

## Setting a remote method route

By default, a remote method is exposed at:

`POST http://apiRoot/modelName/methodName`

Where

* _apiRoot_ is the application API root path.
* _modelName_ is the plural name of the model.
* _methodName_ is the function name.

Following the above example, then by default the remote method is exposed at:

`POST /api/people/greet`

To change the route, use the `http.path` and` http.verb` properties of the options argument to `remoteMethod()`, for example:

{% include code-caption.html content="/common/models/model.js" %}
```javascript
Person.remoteMethod('greet',{
  accepts: {arg: 'msg', type: 'string'},
  returns: {arg: 'greeting', type: 'string'},
  http: {path: '/sayhi', verb: 'get'}
});
```

This call changes the default route to 

`GET /api/people/sayhi`

So a GET request to `http://localhost:3000/api/people/sayhi?msg=LoopBack%20developer` returns:

```javascript
{"greeting": "Greetings... LoopBack developer"}
```

<div class="sl-hidden"><strong>Non-public Information</strong><br>
  <p><strong>Extending a model</strong></p>
  <p>Add default functions for properties</p>

    <div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;"><b>common/models/order.js</b></div>
    <pre class="theme: Emacs; brush: js; gutter: false" style="font-size:12px;">module.exports = function(Order) {
  Order.definition.rawProperties.created.default = function() {
    return new Date();
  };
  Order.definition.rebuild(true);
}</pre></div>
  </div>
  <p>Add custom methods</p>
  <p> </p>

    <div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;"><b>common/models/customer.js</b></div>
    <pre class="theme: Emacs; brush: js; gutter: false" style="font-size:12px;">module.exports = function(Customer) {
    Customer.prototype.getFullName = function() {
      return this.firstName - ' ' - this.lastName;
    };
    Customer.listVips = function(cb) {
      this.find({where: {vip: true}}, cb);
    }
    } </pre></div>
  </div>
</div>

## Adding ACLs to remote methods

To constrain access to custom remote methods, use the [ACL generator](ACL-generator.html) in the same way you control access to any model API.
The access type for custom remote methods is Execute.

### Basic use

For example, to deny invocation of the `greet` method used in the examples above:

**shell**

```shell
$ slc loopback:acl
[?] Select the model to apply the ACL entry to: Person
[?] Select the ACL scope: A single method
[?] Enter the method name: greet
[?] Select the access type: Execute
[?] Select the role: All users
[?] Select the permission to apply: Explicitly deny access
```

**shell**

```shell
$ apic loopback:acl
[?] Select the model to apply the ACL entry to: Person
[?] Select the ACL scope: A single method
[?] Enter the method name: greet
[?] Select the access type: Execute
[?] Select the role: All users
[?] Select the permission to apply: Explicitly deny access
```

The tool then creates the following access control specification:

{% include code-caption.html content="/common/models/person.json" %}
```javascript
...
"acls": [{
  "principalType": "ROLE",
  "principalId": "$everyone",  // apply the ACL to everyone
  "permission": "DENY",        // DENY attempts to invoke this method
  "property": "greet"          // applies the access control to the greet() method
}],
...
```

### Advanced use

Another example, to allow invocation of the a remote method only for the `$owner` of that model object:

{% include code-caption.html content="/common/models/YourModel.js" %}
```javascript
module.exports = function(YourModel) {
  //...
  YourModel.remoteMethod(
    'someRemoteMethod',
    {
      accepts: [
        {arg: 'id', type: 'number', required: true}
      ],
      // mixing ':id' into the rest url allows $owner to be determined and used for access control
      http: {path: '/:id/some-remote-method', verb: 'get'}
    }
  );
};
```

## Formatting remote method responses

You can reformat the response returned by all remote methods by adding a [boot script](Defining-boot-scripts.html) 
that modifies the object returned by [`app.remotes()`](http://apidocs.strongloop.com/loopback/#app-remotes) as follows:

{% include code-caption.html content="/server/boot/hook.js" %}
```javascript
module.exports = function(app) {
  var remotes = app.remotes();
  // modify all returned values
  remotes.after('**', function (ctx, next) {
    ctx.result = {
      data: ctx.result
    };

    next();
  });
};
```
