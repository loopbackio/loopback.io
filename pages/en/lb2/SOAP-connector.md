---
title: "SOAP connector"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/SOAP-connector.html
summary:
---

**See also**:

* [Turn SOAP into REST APIs with LoopBack](https://strongloop.com/strongblog/soap-into-rest-apis-with-loopback-node-js/) (Blog)
* [Example app](https://github.com/strongloop/loopback-example-connector/tree/soap)

The SOAP connector enables LoopBack applications to interact with [SOAP](http://www.w3.org/TR/soap)-based web services described using [WSDL](http://www.w3.org/TR/wsdl).

## Installation

In your application root directory, enter:

```shell
$ npm install loopback-connector-soap --save
```

This will install the module from npm and add it as a dependency to the application's [package.json](http://docs.strongloop.com/display/LB/package.json) file.

## Creating a data source

Use the [Data source generator](https://docs.strongloop.com/display/APIC/Data+source+generator) to add a SOAP data source to your application.

```shell
$ apic create --type datasource
```

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
        <p>URL to the SOAP web service endpoint. If not present, defaults to the&nbsp;<code>location</code>&nbsp;attribute of the SOAP address for the service/port from the WSDL document; for example:</p>
        <p><code>&lt;wsdl:service name="Weather"&gt; &lt;wsdl:port name="WeatherSoap" binding="tns:WeatherSoap"&gt; &lt;soap:address <strong>location="http://wsf.cdyne.com/WeatherWS/Weather.asmx"</strong> /&gt; &lt;/wsdl:port&gt; ... &lt;/wsdl:service&gt;</code></p>
      </td>
    </tr>
    <tr>
      <td>wsdl</td>
      <td>String</td>
      <td>HTTP URL or local file system path to the WSDL file, if not present, defaults to <code>?wsdl</code>.</td>
    </tr>
    <tr>
      <td>remotingEnabled</td>
      <td><span>Boolean</span></td>
      <td>
        <p>Indicates whether the operations are exposed as REST APIs.</p>
        <p>To expose or hide a specific method, you can override this with:</p>
        <p><code>&lt;Model&gt;.&lt;method&gt;.shared = true / false;</code></p>
      </td>
    </tr>
    <tr>
      <td>operations</td>
      <td>Object</td>
      <td>Maps WSDL binding operations to Node.js methods. Each key in the JSON object becomes the name of a method on the model. See <a href="/doc/en/lb2/SOAP-connector.html">Operations property</a> below.</td>
    </tr>
  </tbody>
</table>

### **Operations property**

The operations property value is a JSON object that has a property (key) for each method being defined for the model. The corresponding value is an object with the following properties:

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>service</td>
      <td>String</td>
      <td>WSDL service name</td>
    </tr>
    <tr>
      <td>port</td>
      <td>String</td>
      <td>WSDL port name</td>
    </tr>
    <tr>
      <td>operation</td>
      <td>String</td>
      <td>
        <p>WSDL operation name</p>
      </td>
    </tr>
  </tbody>
</table>

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>Below--Why is the port a symbol( 'StockQuoteSoap')? Where is the numeric value defined? Is it possible to use a number directly?</div>

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
As a result, the data source won't be ready to create models until it's connected. The recommended way is to use an event handler for the 'connected' event; for example:

```javascript
ds.once('connected', function () {
   // Create the model
   var WeatherService = ds.createModel('WeatherService', {});
   //...
}
```

## Extending a model to wrap and mediate SOAP operations

Once you define the model, you can extend it to wrap or mediate SOAP operations and define new methods.
The following example simplifies the `GetCityForecastByZIP` operation to a method that takes `zip` and returns an array of forecasts.

```javascript
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

The custom method on the model can be exposed as REST APIs. It uses the `loopback.remoteMethod` to define the mappings.

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

## Use boot script to create model and expose apis to explorer

The SOAP connector is a bit special as it builds the operations from WSDL asynchronously.
To expose such methods over REST, you need to do the following with a boot script, such as server/a-soap.js:

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

The [loopback-example-connector](https://github.com/strongloop/loopback-example-connector/tree/soap) repository provides several examples in the `soap` branch:

Get stock quotes by symbols: [stock-ws.js](https://github.com/strongloop/loopback-example-connector/blob/soap/stock-ws.js).
Run with the command:

```shell
$ node example/stock-ws
```

Get weather and forecast information for a given zip code: [weather-ws.js](https://github.com/strongloop/loopback-connector-soap/blob/master/example/weather-ws.js).
Run with the command:

```shell
$ node example/weather-ws
```

Expose REST APIs to proxy the SOAP web services:  [weather-rest.js](https://github.com/strongloop/loopback-example-connector/blob/soap/weather-rest.js).
Run with the command:

```shell
$ node example/weather-rest
```

View the results at [http://localhost:3000/explorer](http://localhost:3000/explorer).