# loopback-connector-soap

The SOAP connector enables LoopBack applications to interact with
[SOAP](http://www.w3.org/TR/soap)-based web services described using
[WSDL](http://www.w3.org/TR/wsdl).

<p class="gh-only">
For more information, see the
<a href="http://loopback.io/doc/en/lb3/SOAP-connector.html">LoopBack documentation</a>.
</p>

## Installation

In your application root directory, enter:

```shell
$ npm install loopback-connector-soap --save
```

This will install the module from npm and add it as a dependency to the application's 
[package.json](http://loopback.io/doc/en/lb2/package.json.html) file.

## Overview

There are two ways to use the SOAP connector:

- Use the LoopBack CLI `lb soap` command to automatically create a set of models based on a SOAP service WSDL file.  Often, this will be the easiest way to connect to a SOAP web service, but may not be suitable for all applications.  For more information, see [SOAP generator](http://loopback.io/doc/en/lb3/SOAP-generator.html).
- Write the code manually, calling the `loopback-connector-soap` and data source APIs directly.  **This is the approach illustrated here**.

While both approaches use the `loopback-connector-soap` data source connector, they appear quite different.

## SOAP data source properties

The following table describes the SOAP data source properties you can set in `datasources.json`.

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>    
<tr>
<td>url</td>
<td>String</td>
<td>URL to the SOAP web service endpoint. If not present, defaults to the
<code>location</code> attribute of the SOAP address for the service/port
from the WSDL document; for example below it is <code>http://www.webservicex.net/periodictable.asmx</code>:
<pre>
&lt;wsdl:service name="periodictable"&gt;
&lt;wsdl:port name="periodictableSoap" binding="tns:periodictableSoap"&gt;
&lt;soap:address location="http://www.webservicex.net/periodictable.asmx"/&gt;
&lt;/wsdl:port&gt;
&lt;/wsdl:service&gt;</pre>
</td>
</tr>
<tr>
<td>wsdl</td>
<td>String</td>
<td>HTTP URL or local file system path to the WSDL file. Default is <code>?wsdl</code>.
In the example above, it would be <code>http://www.webservicex.net/periodictable.asmx?wsdl</code>.
</td>
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
<td>wsdl_headers</td>
<td>Object</td>
<td>Indicates additonal headers to pass to the SOAP connector, for example for sending http authorizations header.
For example:
<pre><code>wsdl_headers: {
  Authorization: "Basic UGVyc29uYWwgYWNjb3VudDpORVdsazIwMTVAKSEl"
}</code></pre></td>    
</tr>  
<tr>
<td>remotingEnabled</td>
<td>Boolean</td>
<td>Indicates whether the operations are exposed as REST APIs. To expose or hide a specific method, override with:
<pre><code>&lt;Model&gt;.&lt;method&gt;.shared = true | false;</code></pre>
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

Here is an example operations property for the periodic table service:

```javascript
operations: {
  // The key is the method name
  periodicTable: {
    service: 'periodictable', // The WSDL service name
    port: 'periodictableSoap', // The WSDL port name
    operation: 'GetAtomicNumber' // The WSDL operation name
  }
}
```

**IMPORTANT**: When using the CLI data source generator, you must supply the "stringified JSON" value for this property.
For example:

```
{"getAtomicWeight":{"service":"periodictable","port":"periodictableSoap","operation":"GetAtomicWeight"},"getAtomicNumber":{"service":"periodictable","port":"periodictableSoap","operation":"GetAtomicNumber"}}
```

To generate the stringified value, you can use the following code (for example):

```
var operations = {
  "operations": {
    "getAtomicWeight": {
      "service": "periodictable",
      "port": "periodictableSoap",
      "operation": "GetAtomicWeight"
    },
    "getAtomicNumber": {
      "service": "periodictable",
      "port": "periodictableSoap",
      "operation": "GetAtomicNumber"
    }
  }
};

var stringifiedOps = JSON.stringify (operations);
console.log(stringifiedOps);
```

### security property

The `security` property value is a JSON object with a `scheme` property.
The other properties of the object depend on the value of `scheme`.  For example:

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
    <td>BasicAuth<sup>1</sup></td>
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

1 **currently unsupported**, use `"wsdl_headers": { "Authorization": "Basic …" },` instead, details: <a href="https://github.com/strongloop/loopback-connector-soap/issues/92" target="_blank">issue #92</a>.

## Creating a model from a SOAP data source

Instead of defining a data source with `datasources.json`, you can define a data source in code; for example:

```js
ds.once('connected', function () {

  // Create the model
  var PeriodictableService = ds.createModel('PeriodictableService', {});

  // External PeriodTable WebService operation exposed as REST APIs through LoopBack
  PeriodictableService.atomicnumber = function (elementName, cb) {
    PeriodictableService.GetAtomicNumber({ElementName: elementName || 'Copper'}, function (err, response) {
      var result = response;
      cb(err, result);
    });
  };
...
}
```

## Extending a model to wrap and mediate SOAP operations

You can extend a LoopBack model to wrap or mediate SOAP operations
and define new methods.
The following example simplifies the `GetAtomicNumber` operation:

```javascript
periodictableperiodictableSoap.GetAtomicNumber = function(GetAtomicNumber, callback) {
    periodictableperiodictableSoap.GetAtomicNumber(GetAtomicNumber, function (err, response) {
      var result = response;
      callback(err, result);
    });
}
```

## Creating a model from a SOAP data source

The SOAP connector loads WSDL documents asynchronously.
As a result, the data source won't be ready to create models until it's connected.
The recommended way is to use an event handler for the 'connected' event; for example
as shown below.

Once you define the model, you can extend it to wrap or mediate SOAP operations
and define new methods. The example below shows adding a LoopBack remote method
for the SOAP service's `GetAtomicNumber` operation.

```javascript
...
ds.once('connected', function () {

  // Create the model
  var PeriodictableService = ds.createModel('PeriodictableService', {});

  // External PeriodTable WebService operation exposed as REST APIs through LoopBack
  PeriodictableService.atomicnumber = function (elementName, cb) {
    PeriodictableService.GetAtomicNumber({ElementName: elementName || 'Copper'}, function (err, response) {
      var result = response;
      cb(err, result);
    });
  };

  // Map to REST/HTTP
  loopback.remoteMethod(
      PeriodictableService.atomicnumber, {
        accepts: [
          {arg: 'elementName', type: 'string', required: true,
            http: {source: 'query'}}
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'get', path: '/GetAtomicNumber'}
      }
  );
})
...
```

## Example

For a complete example using the LoopBack SOAP connector, see [loopback-example-connector](https://github.com/strongloop/loopback-example-connector/tree/soap).  The repository provides examples in the `soap` branch.
