---
title: "Preparing for deployment"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Preparing-for-deployment.html
summary:
---

## Configuration for deployment

When you move from deployment to production or staging, you typically want to change your datasource from your internal testing database
(or even the in-memory data store) to a production database where your live application data will reside.
Additionally, you may want to change application properties such as host name and port number.

By default, a LoopBack application created with the [application generator](Application-generator.html)
has two kinds of configuration files in the server directory that you use to configure production settings:

* [`config.json`](config.json.html) containing general application configuration.
  You can override the settings in this file with <code>config.<i>env</i>.json</code>, where _env_ is the value of `NODE_ENV` environment variable.
* [`datasources.json`](datasources.json.html) containing data source configuration.
  You can override the settings in this file with <code>datasources.<i>env</i>.json</code>, where _env_ is the value of `NODE_ENV` environment variable.

Set `NODE_ENV` to a string reflecting the host environment, for example "development" or "production".

To get ready for production, create at least two copies of these files: 
`config.production.json` and `config.development.json`; and
`datasources.production.json` and `datasources.development.json`. 

You can create additional files (for example, `config.staging.json`) if desired.
Then, make sure on your development system you set the `NODE_ENV` to "development" and on your production system you set `NODE_ENV` to "production".

{% include note.html content="Setting `NODE_ENV` to \"production\" will automatically turn off stack traces in JSON responses.
" %}

For more information, see [Environment-specific configuration](Environment-specific-configuration.html).

### Disabling API Explorer

LoopBack [API Explorer](Use-API-Explorer) is great when you're developing your application,
but for security reasons you may not want to expose it in production.

For an application using [loopback-component-explorer](https://github.com/strongloop/loopback-component-explorer), to disable explorer in production:

* Set the `NODE_ENV` environment variable to "production".
* Then in `server/component-config.production.json`:

{% include code-caption.html content="server/component-config.production.json" %}
```javascript
{
  "loopback-component-explorer": null
}
```

{% include tip.html content="For an application using the old `loopback-explorer` (prior to version 2.0), disable API Explorer by deleting or renaming `server/boot/explorer.js`. 
" %}

### Other changes

When you move your app from development to staging, you may want to make additional changes.
For example, you might want to install your own custom error-handling middleware.
See [Error-handling middleware](Defining-middleware.html#error-handling-middleware) for more information.

## Using SSL

For a working example app demonstrating how to use SSL with LoopBack, see [loopback-example-ssl](https://github.com/strongloop/loopback-example-ssl).
The example code below is drawn from that repository.

### Generate your own SSL certificate

Here's an example of generating an SSL certificate: 

```shell
$ openssl genrsa -out privatekey.pem 1024
$ openssl req -new -key privatekey.pem -out certrequest.csr
$ openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```

### Load the SSL certificate

Once you've generated a certificate, load it in your app, for example:

{% include code-caption.html content="ssl-config.js" %}
```javascript
var path = require('path'),
fs = require("fs");
exports.privateKey = fs.readFileSync(path.join(__dirname, './private/privatekey.pem')).toString();
exports.certificate = fs.readFileSync(path.join(__dirname, './private/certificate.pem')).toString();
```

### Configure the app 

```javascript
{
  "restApiRoot": "/api",
  "host": "0.0.0.0",
  "port": 3000,
  "url": "https://localhost:3000/",
  "swagger": {
    "protocol": "https"
  }
}
```

### Create the HTTPS server

{% include code-caption.html content="server/server.js" %}
```javascript
var https = require('https');
var sslConfig = require('./ssl-config');
//...
var options = {
  key: sslConfig.privateKey,
  cert: sslConfig.certificate
};
//...

server.listen(app.get('port'), function() {
    var baseUrl = (httpOnly? 'http://' : 'https://') - app.get('host') - ':' - app.get('port');
    app.emit('started', baseUrl);
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
});
return server;
```
