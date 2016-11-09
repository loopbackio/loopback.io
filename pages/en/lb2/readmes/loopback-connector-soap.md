# loopback-connector-soap

The SOAP connector enables LoopBack applications to interact with
[SOAP](http://www.w3.org/TR/soap)-based web services described using
[WSDL](http://www.w3.org/TR/wsdl).

<p class="gh-only">
For more information, see the
<a href="http://loopback.io/doc/en/lb2/SOAP-connector.html">LoopBack documentation</a>.
</p>

## Installation

In your application root directory, enter:

```shell
$ npm install loopback-connector-soap --save
```

This will install the module from npm and add it as a dependency to the application's 
[package.json](http://loopback.io/doc/en/lb2/package.json.html) file.

## Creating a data source

Use the [Data source generator](http://loopback.io/doc/en/lb2/Data-source-generator.html) to add a SOAP data source
to your application.

With the API Connect toolkit:

```shell
$ apic create --type datasource
```

With StrongLoop tools:

```shell
$ slc loopback:datasource
```

Choose "SOAP webservices" as the data source type when prompted.

## SOAP data source properties

The following table describes the SOAP data source properties you can set in `datasources.json`.

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>
        <p>URL to the SOAP web service endpoint. If not present, defaults to the
        <code>location</code> attribute of the SOAP address for the service/port
        from the WSDL document; for example:</p>
        <pre><code>&lt;wsdl:service name="Weather"&gt;
  &lt;wsdl:port name="WeatherSoap"
    binding="tns:WeatherSoap"&gt;
  &lt;soap:address
    location="http://wsf.cdyne.com/WeatherWS/Weather.asmx" /&gt;
  &lt;/wsdl:port&gt; ...
&lt;/wsdl:service&gt;</code></pre>
      </td>
    </tr>
    <tr>
      <td>wsdl</td>
      <td>String</td>
      <td>HTTP URL or local file system path to the WSDL file. Default is <code>?wsdl</code>.</td>
    </tr>
    <tr>
      <td>wsdl_options</td>
      <td>Object</td>
      <td>Indicates additonal options to pass to the SOAP connector, for example allowing self signed certificates.
      For example:
      <pre><code>wsdl_options: {
  rejectUnauthorized: false,
  strictSSL: false,
  requestCert: true,
}</code></pre></td>    
    </tr>
    <tr>
      <td>remotingEnabled</td>
      <td>Boolean</td>
      <td>
        <p>Indicates whether the operations are exposed as REST APIs.</p>
        <p>To expose or hide a specific method, override with:</p>
        <p><code>&lt;Model&gt;.&lt;method&gt;.shared = true | false;</code></p>
      </td>
    </tr>
    
    <tr>
      <td>operations</td>
      <td>Object</td>
      <td>Maps WSDL binding operations to Node.js methods. Each key in the JSON
      object becomes the name of a method on the model.
      See <a href="#operations-property">operations property</a> below.</td>
    </tr>
    
    <tr>
      <td>security</td>
      <td>Object</td>
      <td>security configuration.
      See <a href="#security-property">security property</a> below.
      </td>
     </tr>
     
      <tr>
       <td>soapHeaders</td>
       <td>Array of objects.</td>
       <td>Custom SOAP headers. An array of header properties.
       For example:
<pre><code>soapHeaders: [{
 element: {myHeader: 'XYZ'}, // The XML element in JSON object format
 prefix: 'p1', // The XML namespace prefix for the header
 namespace: 'http://ns1' // The XML namespace URI for the header
}]</code></pre>
       </td>       
      </tr>
  </tbody>
</table>

### operations property

The `operations` property value is a JSON object that has a property (key) for each
method being defined for the model. The corresponding value is an object with the
following properties:

| Property | Type | Description |
|---|---|---|
| service | String | WSDL service name |
| port | String | WSDL port name |
| operation | String | WSDL operation name |

Here is an example operations property for the stock quote service:

```javascript
operations: {
  // The key is the method name
  stockQuote: {
    service: 'StockQuote', // The WSDL service name
    port: 'StockQuoteSoap', // The WSDL port name
    operation: 'GetQuote' // The WSDL operation name
  },
  stockQuote12: {
    service: 'StockQuote',
    port: 'StockQuoteSoap12',
    operation: 'GetQuote'
  }
}
```

### security property

The `security` property value is a JSON object witha `scheme` property.
The other properties of the object depend on the value of that property.  For example:

```javascript
security: {
    scheme: 'WS',
    username: 'test',
    password: 'testpass',
    passwordType: 'PasswordDigest'
}
```

<table>
  <tbody>
   <tr>
    <th>Scheme</th>
    <th>Description</th>
    <th>Other properties</th>    
   </tr>
    
   <tr>
    <td>WS</td>
    <td>WSSecurity scheme</td>
    <td>
    <ul>
     <li>username: the user name</li>
     <li>password: the password</li>
     <li>passwordType: default is 'PasswordText'</li>
    </ul>
    </td>    
   </tr>

   <tr>
    <td>BasicAuth</td>
    <td>Basic auth scheme</td>
    <td>    
    <ul>
     <li>username: the user name</li>
     <li>password: the password</li>
    </ul>
    </td>    
   </tr>

   <tr>
    <td>ClientSSL</td>
    <td>ClientSSL scheme</td>
    <td>
     <ul>
     <li>keyPath: path to the private key file</li>
     <li>certPath: path to the certificate file</li>
    </ul>    
    </td>    
   </tr>
   
  </tbody>
</table>

## Example datasource.json 

A complete example datasource.json:

```javascript
{
  "WeatherServiceDS": {
    "url": "http://wsf.cdyne.com/WeatherWS/Weather.asmx",
    "name": "WeatherServiceDS",
    "connector": "soap",
    "wsdl": "http://wsf.cdyne.com/WeatherWS/Weather.asmx?WSDL",
    "remotingEnabled": true,
    "operations": {
      "stockQuote": {
        "service": "StockQuote",
        "port": "StockQuoteSoap",
        "operation": "GetQuote"
      },
      "stockQuote12": {
        "service": "StockQuote",
        "port": "StockQuoteSoap12",
        "operation": "GetQuote"
      }
    }
  }
}
```

## Creating a model from a SOAP data source

The SOAP connector loads WSDL documents asynchronously.
As a result, the data source won't be ready to create models until it's connected.
The recommended way is to use an event handler for the 'connected' event; for example:

```javascript
ds.once('connected', function () {
   // Create the model
   var WeatherService = ds.createModel('WeatherService', {});
   //...
}
```

## Extending a model to wrap and mediate SOAP operations

Once you define the model, you can extend it to wrap or mediate SOAP operations
and define new methods.
The following example simplifies the `GetCityForecastByZIP` operation to a method
that takes `zip` and returns an array of forecasts.

```javascript
// Refine the methods
WeatherService.forecast = function (zip, cb) {
    WeatherService.GetCityForecastByZIP({ZIP: zip || '94555'},
      function (err, response) {
        console.log('Forecast: %j', response);
        var result = (!err && response.GetCityForecastByZIPResult.Success) ?
        response.GetCityForecastByZIPResult.ForecastResult.Forecast : [];
        cb(err, result);
      });
};
```

The custom method on the model can be exposed as REST APIs.
It uses the `loopback.remoteMethod` to define the mappings.

```javascript
// Map to REST/HTTP
loopback.remoteMethod(
  WeatherService.forecast, {
    accepts: [{
      arg: 'zip',
      type: 'string',
      required: true,
      http: {
        source: 'query'
      }
    }],
    returns: {
      arg: 'result',
      type: 'object',
      root: true
    },
    http: {
      verb: 'get',
      path: '/forecast'
    }
  }
);
```

## Use boot script to create model and expose APIs to API Explorer

The SOAP connector builds operations from WSDL asynchronously.
To expose such methods over REST, you need to do the following with a boot script,
such as `server/a-soap.js`:

```javascript
module.exports = function(app, cb) {
  var ds = app.dataSources.WeatherServiceDS;
  if (ds.connected) {
    var weather = ds.createModel('weather', {}, {base: 'Model'});
    app.model(weather);
    process.nextTick(cb);
  } else {
    ds.once('connected', function() {
      var weather = ds.createModel('weather', {}, {base: 'Model'});
      app.model(weather);
      cb();
    });
  }
};
```

## Examples

The [loopback-example-connector]
(https://github.com/strongloop/loopback-example-connector/tree/soap)
repository provides several examples in the `soap` branch:

Get stock quotes by symbols: 
[stock-ws.js]
(https://github.com/strongloop/loopback-example-connector/blob/soap/stock-ws.js).
Run with the command:

```shell
$ node example/stock-ws
```

Get weather and forecast information for a given zip code: 
[weather-ws.js]
(https://github.com/strongloop/loopback-connector-soap/blob/master/example/weather-ws.js).
Run with the command:

```shell
$ node example/weather-ws
```

Expose REST APIs to proxy the SOAP web services:
[weather-rest.js]
(https://github.com/strongloop/loopback-example-connector/blob/soap/weather-rest.js).
Run with the command:

```shell
$ node example/weather-rest
```

View the results at 
[http://localhost:3000/explorer](http://localhost:3000/explorer).
