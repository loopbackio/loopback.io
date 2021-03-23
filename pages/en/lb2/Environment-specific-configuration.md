---
title: "Environment-specific configuration"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Environment-specific-configuration.html
summary:
---

## Overview

LoopBack applications have the following types of configuration files:

* **Application-wide configuration files**, by default [`server/config.json`](config.json.html).
  You can also use `server/config.local.js` to set values that you can't with simple JSON.
* **Data source configuration files**, by default [`server/datasources.json`](datasources.json.html).
  You can also use `server/datasources.local.js` to set values that you can't with simple JSON.
* **Application-level configuration of Models**, by default `server/model-config.json`.
* **Middleware configuration files**, by default `server/middleware.json`.
* **Configuration files for LoopBack components**, by default server/component-config.json.

LoopBack will always load the following configuration files, if they exist:

* `server/config.json`.
* `server/config.local.json` _or_ `server/config.local.js`. 
* `server/datasources.json`
* `server/datasources.local.json` _or_ `server/datasources.local.js`
* `server/model-config.json`
* `server/model-config.local.json` _or_ `server/model-config.local.js`
* `server/middleware.json`
* `server/middleware.local.json` _or_ `server/middleware.local.js`
* `server/component-config.json`
* `server/component-config.local.json` _or_ `server/component-config.local.js`

Additionally, when the NODE_ENV environment variable is set, LoopBack will load configuration from:

* `server/config.{_env_}.json/js`
* `server/datasources.{_env_}.json/js`
* `server/model-config.{_env_}.json/js`
* `server/middleware.{_env_}.json/js`
* `server/component-config.{_env_}.json/js`

where `{_env_}` is the value of NODE_ENV (typically "development," "staging," or "production").
This enables you to set up configurations for specific environments (for example, development, staging, and production). 

{% include note.html content="
A LoopBack application can load multiple configuration files, that can potentially conflict with each other.
The value set by the file with the highest priority will always take effect. The priorities are:

1.  **Environment-specific configuration**, based on the value of NODE_ENV; for example, `server/config.staging.json`.
2.  **Local configuration file**; for example, `server/config.local.json`.
3.  **Default configuration file**; for example, `server/config.json`.
" %}

Here are some examples of the application configuration files:

* [config.json](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/config.json)
* [config.local.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/config.local.js)

Here are some examples of data source configuration files:

* [datasources.json](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.json)
* [datasources.production.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.production.js)
* [datasources.staging.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.staging.js)

Here are some examples of the middleware configuration files, the `server/middleware{._env_}.json` file:

* [middleware.json](middleware.json.html)
* middleware.production.json

For an example application, see [https://github.com/strongloop/loopback-example-full-stack/tree/master/server](https://github.com/strongloop/loopback-example-full-stack/tree/master/server).

{% include important.html content="
Even with environment-specific configuration files, LoopBack still requires the default base file(s). An empty object within the JSON file is sufficient.
" %}

## Application-wide configuration

Define application server-side settings in [`server/config.json`](config.json.html).

You can override values that are set in `config.json` in:

* `config.local.js` or `config.local.json`
* `config._env_.js` or `config._env_.json`, where _`env`_ is the value of `NODE_ENV` (typically `development` or `production`).
  For example `config.production.json`.

{% include important.html content="
The additional files can override the top-level keys with value-types (strings, numbers) only.
Nested objects and arrays are not supported at the moment.
" %}

For example:

{% include code-caption.html content="config.production.js" %}
```javascript
module.exports = {
  host: process.env.CUSTOM_HOST,
  port: process.env.CUSTOM_PORT
};
```

### Turning off stack traces

By default, stack traces are returned in JSON responses. To turn disable stack traces in JSON responses:

* Set the NODE_ENV environment variable to "production"
* Include the following in `server/middleware.production.json`:

{% include code-caption.html content="server/middleware.production.json" %}
```javascript
"final:after": {
    "loopback#errorHandler": {
      "params": {
        "includeStack": false
      }
    }
  }
```

{% include note.html content="
The [Application generator](Application-generator.html) creates a `middleware.production.json` file
with the above configuration for you, so all you have to do is set the NODE_ENV environment variable.
" %}

### Disabling API Explorer

LoopBack [API Explorer](Use-API-Explorer) is great when you're developing your application,
but for security reasons you may not want to expose it in production.

For an application using [loopback-component-explorer](https://github.com/strongloop/loopback-component-explorer), to disable explorer in production:

* Set the NODE_ENV environment variable to "production".
* Then in `server/component-config.production.json`:

{% include code-caption.html content="server/component-config.production.json" %}
```javascript
{
  "loopback-component-explorer": null
}
```

### Customizing REST error handling

You can customize the REST error handler by adding the error handler callback function to `server/config.local.js` as follows:

{% include code-caption.html content="server/config.local.js" %}
```javascript
module.exports = {
  remoting: {
    errorHandler: {
      handler: function(err, req, res, next) {
        // custom error handling logic
        var log = require('debug')('server:rest:errorHandler'); // example
        log(req.method, req.originalUrl, res.statusCode, err);
        next(); // call next() to fall back to the default error handler
      }
    }
  }
};
```

### Exclude stack traces from HTTP responses

To exclude error stack traces from HTTP responses (typical in production), set the includeStack option of LoopBack errorHandler middleware to false in 
[middleware.json](middleware.json.html).

The standard configuration for development is:

{% include code-caption.html content="server/middleware.json" %}
```javascript
...
"final:after": {
  "loopback#errorHandler": {}
}
```

For production, exclude stack traces from HTTP responses as follows:

{% include code-caption.html content="server/middleware.production.json" %}
```javascript
...
"final:after": {
  "loopback#errorHandler": {
    "params": {
      "includeStack": false
    }
  }
}
```

## Data source configuration

You can override values set in `datasources.json` in the following files:

* `datasources.local.js` or `datasources.local.json`
* `datasources._env_.js` or `datasources._env_.json`, where _`env`_ is the value of `NODE_ENV` environment variable (typically `development` or `production`).
  For example, `datasources.production.json`.

{% include important.html content="
The additional files can override the top-level data-source options with string and number values only. You cannot use objects or array values.
" %}

Example data sources:

{% include code-caption.html content="datasources.json" %}
```javascript
{
  // the key is the datasource name
  // the value is the config object to pass to
  // app.dataSource(name, config).
  db: {
    connector: 'memory'
  }
}
```

{% include code-caption.html content="datasources.production.json" %}
```javascript
{
  db: {
    connector: 'mongodb',
    database: 'myapp',
    user: 'myapp',
    password: 'secret'
  }
}
```

## Getting values from environment variables

You can easily set an environment variable when you run an application. The command you use depends on your operating system.

### MacOS and Linux

Use this command to set an environment variable and run an application in one command:

```shell
$ MY_CUSTOM_VAR="some value" node .
```

or in separate commands:

```shell
$ export MY_CUSTOM_VAR="some value"
$ node .
```

Then this variable is available to your application as `process.env.MY_CUSTOM_VAR`.

### Windows

On Windows systems, use these commands:

```
C:\> set MY_CUSTOM_VAR="some value"
C:\> node .
```
