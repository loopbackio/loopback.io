---
title: "Environment-specific configuration"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Environment-specific-configuration.html
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
* **Configuration files for LoopBack components**, by default `server/component-config.json`.

{% include note.html content="Using `*.js` files to configure a LoopBack application will only work
when the original `.json` files are kept in place. Rather than replacing `.json` files with `.js`
files, you should be overriding values from `.json` files in `.js` files. That said, by leaving
the default `.json` files empty, all configuration can be done in `.js` files.
"%}

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

* <code>server/config.<i>env</i>.json/js</code>
* <code>server/datasources.<i>env</i>.json/js</code>
* <code>server/model-config.<i>env</i>.json/js</code>
* <code>server/middleware.<i>env</i>.json/js</code>
* <code>server/component-config.<i>env</i>.json/js</code>

where _`env`_ is the value of NODE_ENV (typically "development," "staging," or "production").
This enables you to set up configurations for development, staging, and production environments. 

For testing this on your localhost, you can set the value of NODE_ENV variable, or any other environment variable, in your shell.
Node server uses the same variables from your shell.

You can use _`process.env.NODE_ENV`_ to access NODE_ENV variable in your code.

{% include note.html content="
A LoopBack application can load multiple configuration files, that can potentially conflict with each other.
The value set by the file with the highest priority will always take effect. The priorities are:

1.  **Environment-specific configuration**, based on the value of NODE_ENV; for example, `server/config.staging.json`.
2.  **Local configuration file**; for example, `server/config.local.json`.
3.  **Default configuration file**; for example, `server/config.json`.
" %}

Examples of the application configuration files:

* [config.json](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/config.json)
* [config.local.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/config.local.js)

Examples of data source configuration files:

* [datasources.json](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.json)
* [datasources.production.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.production.js)
* [datasources.staging.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.staging.js)

Examples of the middleware configuration files:

* [middleware.json](middleware.json.html)
* [middleware.development.json](middleware.development.json.html)

For an example application, see [https://github.com/strongloop/loopback-example-full-stack/tree/master/server](https://github.com/strongloop/loopback-example-full-stack/tree/master/server).

{% include important.html content="
Even with environment-specific configuration files, LoopBack still requires the default base file(s). An empty object within the JSON file is sufficient.
" %}

## Application-wide configuration

Define application server-side settings in [`server/config.json`](config.json.html).

You can override values that are set in `config.json` in:

* `config.local.js` or `config.local.json`
* <code>config.<i>env</i>.js</code> or <code>config.<i>env</i>.json</code>, where _`env`_ is the value of `NODE_ENV` (typically `development` or `production`).
  For example `config.production.json`.

{% include important.html content="The additional files can override the top-level keys with value-types (strings, numbers) only.  Nested objects and arrays are not supported.
" %}

For example:

{% include code-caption.html content="config.production.js" %}
```javascript
module.exports = {
  host: process.env.CUSTOM_HOST,
  port: process.env.CUSTOM_PORT
};
```

### Ensure stack traces are not returned

By default, stack traces are not returned in JSON responses, but if they were enabled for development and debugging, ensure they are turned off for production.

* Set the NODE_ENV environment variable to "production"
* Include the following in `server/middleware.production.json`:

{% include code-caption.html content="server/middleware.production.json" %}
```javascript
"final:after": {
    "strong-error-handler": {}
  }
```

{% include note.html content="The [Application generator](Application-generator.html) creates a `middleware.development.json` file
with the above configuration for you, so all you have to do is ensure that the NODE_ENV environment variable is not `development`.
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

### Include stack traces in HTTP responses

By default, LoopBack 3.0 applications exclude error stack traces from HTTP responses (typical in production).  For development and debugging, you may wish to include them; to do so, set the `NODE_ENV` environment variable to `development` so the app will use `middleware.development.json`.

This file includes the following that will include stack traces in HTTP responses:

```
{
  "final:after": {
    "strong-error-handler": {
      "params": {
        "debug": true,
        "log": true
      }
    }
  }
}
```

## Data source configuration

You can override values set in `datasources.json` in the following files:

* `datasources.local.js` or `datasources.local.json`
* <code>datasources.<i>env</i>.js</code> or <code>datasources.<i>env</i>.json</code>, where _`env`_ is the value of `NODE_ENV` environment variable (typically `development` or `production`).
  For example, `datasources.production.json`.

Example data sources:

{% include code-caption.html content="datasources.json" %}
```javascript
{
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

You can also configure your <code>datasource.<i>env</i>.js</code> file to use environment variables:

{% include code-caption.html content="datasources.production.js" %}
```javascript
module.exports = {
  db: {
    connector: 'mongodb',
    hostname: process.env.DB_HOST,
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'myapp',
  }
```

In the above example, running `export PRODUCTION=true` (or `set PRODUCTION=true` for Windows) will load
the datasource.

## Getting values from environment variables

You can easily get the value of an environment variable in an application. The command you use depends on your operating system.

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
