{% include important.html content="All of the options properties are optional. However, if the remote method requires arguments, you must specify `accepts`; if the remote method returns a value, you must specify `returns`.
" %}
<table width="800">
  <thead>
    <tr>
      <th width="120">Option</th>
      <th>Description</th>
      <th width="280">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>accepts</td>
      <td>
        Defines arguments that the remote method accepts that map to the static method you define. For the example above, the function signature is <pre>Person.greet(name, age, callback)...</pre> so
        <code>name</code> is the first argument, <code>age</code> is the second argument and callback is automatically provided by LoopBack (do not specify it in your <code>accepts</code> array). For more information, see <a href="Remote-methods.html#argument-descriptions">Argument descriptions</a>.<br/><br/>
        The default value is the empty array, <code>[ ]</code>.
      </td>
      <td>
        <pre style="font-size: 80%;">{  ...
accepts: [
 {arg: 'name', type: 'string'},
 {arg: 'age',  type: 'number'},
 ...],
... }</pre>
      </td>
    </tr>
    <tr>
      <td>accessScopes</td>
      <td>
        Defines <em>access scopes</em>. A user will be allowed to invoke this remote
        method only when their access token was granted at least one of
        the scopes defined by `accessScopes` list. See also
        <a href="/doc/en/lb3/Controlling-data-access.html#authorization-scopes">Authorization scopes</a>.
        <br/><br/>
        The default value is a list with a single scope <code>DEFAULT</code>.
      </td>
      <td>
        <pre>accessScopes: [
  'read',
  'read:user'
]</pre>
      </td>
    </tr>
    <tr>
      <td>description</td>
      <td>
        Text description of the method, used by API documentation generators such as OpenAPI (formerly Swagger).
        You can put long strings in an array if needed (see note below).
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>http</td>
      <td>
        Specifies information about the route at which the method is exposed.
        See <a href="#http-property">http property</a> below.
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>notes</td>
      <td>
        Additional notes, used by OpenAPI (formerly Swagger).
        You can put long strings in an array if needed (see note below).
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>documented</td>
      <td>
        If set to <code>false</code>, this method will not be present in generated OpenAPI (formerly Swagger) documentation.
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>returns</td>
      <td>
        Describes the remote method's callback arguments; See <a href="Remote-methods.html#argument-descriptions">Argument descriptions</a>. The <code>err </code>argument is assumed; do not specify.
        Default if not provided is the empty array,  <code>[]</code>.
      </td>
      <td>
        <pre>returns: {arg: 'greeting',
          type: 'string'}</pre>
      </td>
    </tr>
  </tbody>
</table>

{% include tip.html content="You can split long strings in the `description` and `notes` options into arrays of strings (lines) to keep line lengths manageable. For example:

```javascript
[
 \"Lorem ipsum dolor sit amet, consectetur adipiscing elit,\",
 \"sed do eiusmod tempor incididunt ut labore et dolore\",
 \"magna aliqua.\"
]
```
" %}

### http property

The `http` property provides information on HTTP route at which the remote
method is exposed.

<table width="800">
  <thead>
    <tr>
      <th width="120">Option</th>
      <th>Description</th>
      <th width="280">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>path</td>
      <td>
        HTTP path (relative to the model) at which the method is exposed.
      </td>
      <td>
        <pre>http: {path: '/sayhi'}</pre>
      </td>
    </tr>
    <tr>
      <td><a name="http.verb"></a>verb</td>
      <td>
        HTTP method (verb) at which the method is available. One of:
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
     <pre>http: {path: '/sayhi',
       verb: 'get'}</pre>
      </td>
    </tr>
    <tr>
      <td>status</td>
      <td>Default HTTP status set when the callback is called without an error.</td>
      <td>
      <pre>http: {status: 201}</pre>
      </td>
    </tr>
    <tr>
      <td>errorStatus</td>
      <td>Default HTTP status set when the callback is called with an error.</td>
      <td>
        <pre>http: {errorStatus: 400}</pre>
      </td>
    </tr>
  </tbody>
</table>

### Argument descriptions

The `accepts` and `returns` options properties define either a single argument as an object or an ordered set of arguments as an array.
The following table describes the properties of each individual argument.

<table>
  <thead>
    <tr>
      <th width="100">Property (key)</th>
      <th width="100">Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>arg</td>
      <td>String</td>
      <td>Argument name</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String or Array</td>
      <td>
        A text description of the argument. This is used by API documentation generators like OpenAPI (formerly Swagger).
        You can put long strings in an array if needed (see note above).
      </td>
    </tr>
    <tr>
      <td>http</td>
      <td>Object or Function</td>
      <td>For input arguments: a function or an object describing mapping from HTTP request to the argument value. See <a href="#http-mapping-of-input-arguments">HTTP mapping of input arguments</a> below.</td>
    </tr>
    <tr>
      <td>http.target</td>
      <td>String</td>
      <td>
        Map the callback argument value to the HTTP response object. The following values are supported.
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
    <tr>
      <td>documented</td>
      <td>Boolean</td>
      <td>If set to <code>false</code>, this parameter will not be present in generated OpenAPI (formerly Swagger) documentation.</td>
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

Specify `{ type: 'file', root: true }` for a callback argument that will be sent directly as the response body. A file argument can be set to one of the following values:

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
      <td>form</td>
      <td>
        The value is looked up using <code>req.body</code> which searches the request body
      </td>
    </tr>
    <tr>
      <td>query</td>
      <td>
        The value is looked up using <code>req.query</code> which searches the query string
      </td>
    </tr>
    <tr>
      <td>path</td>
      <td>
        The value is looked up using <code>req.params</code> which searches the route arguments
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
