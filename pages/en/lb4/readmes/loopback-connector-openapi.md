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

To interact with a Swagger API, configure a data source backed by the Swagger connector:

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

| Property       | Description                                                                                                                                                                       | Default |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| connector      | Must be `'loopback-connector-openapi'` to specify Swagger connector                                                                                                               | None    |
| spec           | HTTP URL or path to the Swagger specification file (with file name extension `.yaml/.yml` or `.json`). File path must be relative to current working directory (`process.cwd()`). | None    |
| validate       | When `true`, validates provided `spec` against Swagger specification 2.0 before initializing a data source.                                                                       | `false` |
| authorizations | Security configuration for making authenticated requests to the API.                                                                                                              |         |
| positional     | Use positional parameters instead of named parameters                                                                                                                             | `false` |

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
const result = await MyModel.my_operation('94555', {});
});
```

Without `positional` set to `true`, named parameters are expected:

```js
const result = await MyModel.my_operation({
  {
    zipCode: '94555',
  },
  {
    requestBody: {}
  }
});
```

### Extend a model to wrap/mediate API Operations

Once you define the model, you can wrap or mediate it to define new methods. The following example simplifies the `getPetById` operation to a method that takes `petID` and returns a Pet instance.

```js
PetService.searchPet = function(petID, cb) {
  PetService.getPetById({petId: petID}, function(err, res) {
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
    {arg: 'petID', type: 'string', required: true, http: {source: 'query'}},
  ],
  returns: {arg: 'result', type: 'object', root: true},
  http: {verb: 'get', path: '/searchPet'},
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
