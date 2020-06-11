# loopback-connector-openapi

The Swagger connector enables LoopBack applications to interact with other REST APIs described by the [OpenAPI (Swagger) Specification v2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) or [OpenAPI (Swagger) Specification v3.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md).

We use [Swagger Client](https://github.com/swagger-api/swagger-js) and [Swagger Parser](https://github.com/APIDevTools/swagger-parser) internally.

## Installation

In your application root directory, enter:

```
$ npm install loopback-connector-openapi --save
```

This will install the module from npm and add it as a dependency to the application's `package.json` file.

## Configuration

### LoopBack 4 Usage

To interact with OpenAPI spec:

1. Create a LoopBack 4 DataSource with OpenAPI connector using the `lb4 datasource` command.

2. Create a service that maps to the operations using the `lb4 service` command.

3. Create a controller that calls the service created in the above step using `lb4 controller` command.

For details, refer to the [Calling other APIs and web services documentation page](https://loopback.io/doc/en/lb4/Calling-other-APIs-and-web-services.html).

### LoopBack 3 Usage

To interact with a Swagger API, configure a data source backed by the OpenAPI connector:

With code:

```js
var ds = loopback.createDataSource('swagger', {
  connector: 'loopback-connector-openapi',
  spec: 'http://petstore.swagger.io/v2/swagger.json',
});
```

With JSON in `datasources.json` (for example, with basic authentication):

```json
"SwaggerDS": {
    "name": "SwaggerDS",
    "connector": "swagger",
    "spec": "http://petstore.swagger.io/v2/swagger.json",
    "authorizations": {
      "basic": {
        "username": "your-username",
        "password": "your-password"
      }
    }
}
```

## Data source properties

Specify the options for the data source with the following properties.

| Property          | Description                                                                                                                                                                       | Default     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| connector         | Must be `'loopback-connector-openapi'` to specify Swagger connector                                                                                                               | None        |
| spec              | HTTP URL or path to the Swagger specification file (with file name extension `.yaml/.yml` or `.json`). File path must be relative to current working directory (`process.cwd()`). | None        |
| validate          | When `true`, validates provided `spec` against Swagger specification 2.0 before initializing a data source.                                                                       | `false`     |
| authorizations    | Security configuration for making authenticated requests to the API.                                                                                                              |             |
| positional        | Use positional parameters instead of named parameters                                                                                                                             | `false`     |
| forceOpenApi30    | Convert the Swagger 2.0 spec to OpenAPI 3.0                                                                                                                                       | `false`     |
| mapToMethods      | map OpenAPI operations to method names                                                                                                                                            | `undefined` |
| transformResponse | Transform the response object                                                                                                                                                     | `undefined` |

### Mapping operations to methods

By default, the connector adds the following method names to the model:

1. `x-operation-name` of the operation spec
2. `operationId` of the operation spec
3. The names from 1 and 2 with `<tag>_` prefix
4. The camel case for all of the names above

For an operation with `{operationId: 'get_books', 'x-operation-name': 'getBooks'}`
under tag `BookController`, the following methods are added:

- getBooks
- get_books
- BookController_getBooks
- BookController_get_books
- bookControllerGetBooks

For tagged interfaces, the connector adds the following method names to `apis.<tag>`:

1. `x-operation-name` of the operation spec
2. `operationId` of the operation spec
3. The camel case for all of the names above

For an operation with `{operationId: 'get_books', 'x-operation-name': 'getBooks'}`
under tag `BookController`, the following methods are added:

- getBooks
- get_books

A custom `mapToMethods` can be set on the connector to override the naming
conventions. The signature of the method is as follows:

```js
/**
 * Get the method name for an operation
 * @param {string} tag - The tag. It will be '' for tagged interfaces.
 * @param {object} operationSpec - Operation spec
 * @param {string[]} existingNames - Optional array to track used names
 *
 * @returns A method name or an array of method names. Return undefined to
 * skip the operation.
 */
function mapToMethods(tag, operationSpec, existingNames) {}
```

Now we can configure the connector to use our custom `mapToMethod`.

```js
var ds = loopback.createDataSource('swagger', {
  connector: 'loopback-connector-openapi',
  spec: 'http://petstore.swagger.io/v2/swagger.json',
  mapToMethods: mapToMethods,
});
```

### Return value

By default, the methods return a `response` object with the following properties:

```js
{
  url,
  method,
  status,
  statusText,
  headers, // See note below regarding headers
  text,    // The textual content
  body,    // The body object
}
```

See https://github.com/swagger-api/swagger-js#response-shape for more details.

The return value can be transformed by a custom `transformResponse` function
configured for the connector:

```js
function transformResponse(res, operationSpec) {
  if (res.status < 400) {
    return res.body;
  }
  const err = new Error(`${res.status} ${res.statusText}`);
  err.details = res;
  throw err;
}
```

Now we can configure the connector to use our custom `transformResponse`.

```js
var ds = loopback.createDataSource('swagger', {
  connector: 'loopback-connector-openapi',
  spec: 'http://petstore.swagger.io/v2/swagger.json',
  transformResponse: transformResponse, // or transformResponse: true for a default transformer
});
```

### Authentication

#### Basic authentication

```js
{
  authorizations: {
    my_basic_auth: { username: 'foo', password: 'bar' },
  }
}
```

#### API Key

```js
{
  authorizations: {
    my_query_api_key_auth: 'my-api-key',
    my_header_api_key_auth: 'my-api-key',
  }
}
```

#### OAuth2

```js
{
  authorizations: {
    my_oauth2_token: { token: { access_token: 'abcabc' } },
  }
}
```

**Note**: The key must correspond to a security scheme declared in the [Security Definitions object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#security-definitions-object) within the `spec` document.

### Creating a model from the Swagger data source

The Swagger connector loads the API specification document asynchronously. As a result, the data source won't be ready to create models until it is connected. For best results, use an event handler for the `connected` event of data source:

```js
ds.once('connected', function(){
  const PetService = ds.createModel('PetService', {});
  ...
});
```

Once the model is created, all available Swagger API operations can be accessed as model methods, for example:

```js
...
PetService.getPetById({petId: 1}, function (err, res){
  ...
});
```

#### How model methods are named for given Swagger API Operations:

This connector uses [swagger-client](https://github.com/swagger-api/swagger-js) which dominates the naming of generated methods for calling client API operations.

Following is how it works:

- When `operationId` is present, for example:

```js
paths: {
  /weather/forecast:
  get:
    ...
    operationId: weather.forecast
    ...
```

Here, as `operationId` is present in Swagger specification, the generated method is named equivalent to `operationId`.

Note:
if `operationId` is of format equivalent to calling a nested function such as: `weather.forecast`, the resulting method name will replace `.` with `_` i.e. `weather.forecast` will result into `weather_forecast`.This means you can call `MyModel.weather_forecast()` to access this endpoint programmatically.

- When `operationId` is not provided in Swagger specification, the method name is formatted as following:
  `<operationType (i.e. get, post, etc)> + _ + <path parts separated by underscores>`

For example:

```
/weather/forecast:
  get:
    ...
```

for above operation, the resulting method name will be: `get_weather_forecast`.

This means you can call `MyModel.get_weather_forecast()` to access this endpoint programmatically.

### Named parameters vs. positional parameters

The `positional` setting allows a method to be invoked with positional parameters based on the
parameters/requestBody of the OpenAPI operation spec.

```js
const result = await MyModel.my_operation(
  // Parameters
  '94555',
  // Request body
  {
    verbose: true
  },
  // Additional options
  {
    requestContentType: 'application/json'
  });
});
```

Without `positional` set to `true`, named parameters are expected:

```js
const result = await MyModel.my_operation({
  {
    zipCode: '94555',
  },
  {
    requestBody: {verbose: true},
    requestContentType: 'application/json'
  }
});
```

### Extend a model to wrap/mediate API Operations

Once you define the model, you can wrap or mediate it to define new methods. The following example simplifies the `getPetById` operation to a method that takes `petID` and returns a Pet instance.

```js
PetService.searchPet = function (petID, cb) {
  PetService.getPetById({ petId: petID }, function (err, res) {
    if (err) cb(err, null);
    var result = res.data;
    cb(null, result);
  });
};
```

This custom method on the `PetService` model can be exposed as REST API end-point. It uses `loopback.remoteMethod` to define the mappings:

```js
loopback.remoteMethod(PetService.searchPet, {
  accepts: [
    { arg: 'petID', type: 'string', required: true, http: { source: 'query' } },
  ],
  returns: { arg: 'result', type: 'object', root: true },
  http: { verb: 'get', path: '/searchPet' },
});
```

### Caching

As an experimental feature, loopback-connector-openapi is able to cache the result of `GET` requests.

**Important: we support only one cache invalidation mechanism - expiration based on a static TTL value.**

To enable caching, you need to specify:

- `cache.model` (required) - name of the model providing access to the cache.
  The model should be extending loopback's built-in `KeyValueModel`
  and be attached to one of key-value datasources (e.g. Redis or
  eXtremeScale).

- `cache.ttl` (required) - time to live for cache entries, the value
  is in milliseconds. Note that certain cache implementations (notably
  eXtremeScale) do not support sub-second precision for TTL.

#### Example configuration

`server/datasources.json`

```json
{
  "SwaggerDS": {
    "connector": "swagger",
    "cache": {
      "model": "SwaggerCache",
      "ttl": 100
    }
  },
  "cache": {
    "connector": "kv-redis"
  }
}
```

`common/models/swagger-cache.json`

```
{
  "name": "SwaggerCache",
  "base": "KeyValueModel",
  // etc.
}
```

`server/model-config.json`

```
{
  "SwaggerCache": {
    "dataSource": "cache",
    "public": false
  }
}
```

### Connector Hooks

The connector can be observed for `before execute` and `after execute` events. For example:

```js
const ds = loopback.createDataSource('swagger', {
    connector: 'loopback-connector-openapi',
    spec: spec,
    authorizations: authz || {},
  });
  ds.on('connected', function() {
    ds.connector.observe('before execute', (ctx, next) => {
      done(null, ctx.req);
    });
    ...
  });
```
