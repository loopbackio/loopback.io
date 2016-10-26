# loopback-connector-soap

The SOAP connector enables LoopBack applications to interact with [SOAP](http://www.w3.org/TR/soap) based Web
Services described using [WSDL](http://www.w3.org/TR/wsdl).

Please see the [official documentation](http://docs.strongloop.com/display/LB/SOAP+connector).

## Configure a SOAP data source

To invoke a SOAP web service, we first configure a data source backed by the SOAP
connector.

```js
    var ds = loopback.createDataSource('soap', {
        connector: 'loopback-connector-soap'
        remotingEnabled: true,
        wsdl: 'http://wsf.cdyne.com/WeatherWS/Weather.asmx?WSDL'
    });
```

## Options for the SOAP connector

- **url**: url to the SOAP web service endpoint, if not present, the `location`
attribute of the soap address for the service/port from the WSDL document will be
used. For example,

```xml
    <wsdl:service name="Weather">
        <wsdl:port name="WeatherSoap" binding="tns:WeatherSoap">
            <soap:address location="http://wsf.cdyne.com/WeatherWS/Weather.asmx" />
        </wsdl:port>
        ...
    </wsdl:service>
```

- **wsdl**: http url or local file system path to the wsdl file, if not present,
defaults to <url>?wsdl.

- **remotingEnabled**: indicates if the operations will be further exposed as REST
APIs

- **wsdl_options**: Indicates additonal options to pass to the soap connector. for example allowing self signed certificates:

```js
    wsdl_options: {
        rejectUnauthorized: false,
        strictSSL: false,
        requestCert: true,
    },
```

- **operations**: maps WSDL binding operations to Node.js methods

```js
    operations: {
      // The key is the method name
      stockQuote: {
        service: 'StockQuote', // The WSDL service name
        port: 'StockQuoteSoap', // The WSDL port name
        operation: 'GetQuote' // The WSDL operation name
      },
      stockQuote12: {
        service: 'StockQuote', // The WSDL service name
        port: 'StockQuoteSoap12', // The WSDL port name
        operation: 'GetQuote' // The WSDL operation name
      }
    }
```

- **security**: security configuration

```js
    security: {
        scheme: 'WS',
        username: 'test',
        password: 'testpass',
        passwordType: 'PasswordDigest'
   }
```

The valid schemes are 'WS' (or 'WSSecurity'), 'BasicAuth', and 'ClientSSL'.

  - WS
    - username: the user name
    - password: the password
    - passwordType: default to 'PasswordText'

  - BasicAuth
    - username: the user name
    - password: the password

  - ClientSSL
    - keyPath: path to the private key file
    - certPath: path to the certificate file

- **soapHeaders**: custom soap headers

```js
    soapHeaders: [{
        element: {myHeader: 'XYZ'}, // The XML element in JSON object format
        prefix: 'p1', // The XML namespace prefix for the header
        namespace: 'http://ns1' // The XML namespace URI for the header
    }]
```
The property value should be an array of objects that can be mapped to xml elements
or xml strings.

## Create a model from the SOAP data source

**NOTE** The SOAP connector loads the WSDL document asynchronously. As a result,
the data source won't be ready to create models until it's connected. The
recommended way is to use an event handler for the 'connected' event.

```js
    ds.once('connected', function () {

        // Create the model
        var WeatherService = ds.createModel('WeatherService', {});

        ...
    }
```

## Extend a model to wrap/mediate SOAP operations

Once the model is defined, it can be wrapped or mediated to define new methods.
The following example simplifies the `GetCityForecastByZIP` operation to a method
that takes `zip` and returns an array of forecasts.

```js

    // Refine the methods
    WeatherService.forecast = function (zip, cb) {
        WeatherService.GetCityForecastByZIP({ZIP: zip || '94555'}, function (err, response) {
            console.log('Forecast: %j', response);
            var result = (!err && response.GetCityForecastByZIPResult.Success) ?
            response.GetCityForecastByZIPResult.ForecastResult.Forecast : [];
            cb(err, result);
        });
    };
```

The custom method on the model can be exposed as REST APIs. It uses the `loopback.remoteMethod`
to define the mappings.

```js

    // Map to REST/HTTP
    loopback.remoteMethod(
        WeatherService.forecast, {
            accepts: [
                {arg: 'zip', type: 'string', required: true,
                http: {source: 'query'}}
            ],
            returns: {arg: 'result', type: 'object', root: true},
            http: {verb: 'get', path: '/forecast'}
        }
    );

```

## Examples

See https://github.com/strongloop/loopback-example-connector/tree/soap.
