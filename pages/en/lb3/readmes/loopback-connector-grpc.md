# loopback-connector-grpc
The gRPC connector enables LoopBack applications to interact with [gRPC](http://www.grpc.io/) services.

## Installation 

In your application root directory, enter:
```
$ npm install loopback-connector-grpc --save
```

This will install the module from npm and add it as a dependency to the application's `package.json` file.

## Configuration

To interact with a gRPC API, configure a data source backed by the gRPC connector:

With code:

```javascript
  var ds = loopback.createDataSource('grpc', {
    connector: 'loopback-connector-grpc',
    spec: 'note.proto',
  });
```

With JSON in `datasources.json` (for example, with basic authentication):

```
"gRPCDataSource": {
    "name": "gRPCDataSource",
    "connector": "grpc",
    "spec": "note.proto",
    "security": {
      "type" : "basic", 
      "username": "the user name",
      "password": "thepassword"
}    
```

## Data source properties

Specify the options for the data source with the following properties. 

| Property | Description | Default   |
|----------|-------------|-----------|
| connector | Must be `'loopback-connector-grpc'` to specify gRPC connector| None |
|spec      | HTTP URL or path to the gRPC specification file (with file name extension `.yaml/.yml` or `.json`).  File path must be relative to current working directory (`process.cwd()`).| None |
|validate | When `true`, validates provided `spec` against gRPC specification 2.0 before initializing a data source. | `false`|
| security | Security configuration for making authenticated requests to the API. | None |

### Authentication

Basic authentication:

```javascript
security: {
  rootCerts: 'rootCerts.crt', // Path to root certs
  key: 'gprc.key', // Path to client SSL private key
  cert: 'grpc.crt' // Path to client SSL certificate
}
```

### Creating a model from the gRPC data source

The gRPC connector loads the API specification document asynchronously. As a result, the data source won't be ready to create models until it is connected.  For best results, use an event handler for the `connected` event of data source:

```javascript
ds.once('connected', function(){
  var PetService = ds.createModel('PetService', {});
  ...
});
```
Once the model is created, all available gRPC API operations can be accessed as model methods, for example:

```javascript
...
PetService.getPetById({petId: 1}, function (err, res){
  ...
});
```

The model methods can also be called as promises:

```javascript
PetService.getPetById({petId: 1}).then(function(res) {
  ...
}, function(err) {
  ...
});
// in async/await flavor
const res = await PetService.getPetById({petId: 1});
```

### Extend a model to wrap/mediate API Operations
Once you define the model, you can wrap or mediate it to define new methods. The following example simplifies the `getPetById` operation to a method that takes `petID` and returns a Pet instance.

```javascript
PetService.searchPet = function(petID, cb){
  PetService.getPetById({petId: petID}, function(err, res){
    if(err) cb(err, null);
    var result = res.data;
    cb(null, result);
  });
};
```

This custom method on the `PetService` model can be exposed as REST API end-point. It uses `loopback.remoteMethod` to define the mappings:

```javascript
PetService.remoteMethod(
  'searchPet', {
    accepts: [
      { arg: 'petID', type: 'string', required: true,
        http: { source: 'query' }
      }
    ],
    returns: {arg: 'result', type: 'object', root: true },
    http: {verb: 'get', path: '/searchPet'}
  }
);
```

### Example

Coming soon...
