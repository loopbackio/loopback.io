---
title: "Defining data sources"
lang: ja
layout: page
keywords: LoopBack, data sources, connectors
tags: data_sources
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Defining-data-sources.html
redirect_from: /doc/ja/lb3/Connecting-models-to-data-sources.html
summary: LoopBack generalizes backend services such as databases as data sources.  Data sources are backed by connectors that then communicate directly with the database or other back-end service.
---
## Overview

LoopBack _data sources_ represent backend systems such as databases, external REST APIs, SOAP web services, and storage services.  Data sources provide create, retrieve, update, and delete (CRUD) functions through the  [DataSource](http://apidocs.loopback.io/loopback-datasource-juggler/#datasource-new-datasourcename-settings) and [PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel-new-persistedmodel) APIs.

Data source _connectors_ implement data exchange logic using database drivers or other client APIs.

{% include image.html file="9830484.png" alt="Models, data sources, and connectors" %} 

LoopBack provides connectors for:

* Popular relational and NoSQL databases; see [Database connectors](Database-connectors.html).
* Backend systems beyond databases (SOAP, REST services, and so on); see [Non-database connectors](Non-database-connectors.html).

Also see [Community connectors](Community-connectors.html) for a list of connectors developed by the StrongLoop developer community.

## How to add a data source to an app

To add a new data source, use the [data source generator](Data-source-generator.html):

```shell
$ lb datasource
```

Or, with API Connect:

```shell
$ apic create --type datasource
```
You can also add and modify data sources using the API Designer tool.

The tool will prompt you for the name of the new data source and the connector to use; for example, MongoDB, MySQL, Oracle, REST, and so on.
The tool will then add an entry such as the following to `datasources.json`:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
  ...
  "corp1": {
    "name": "mongo1",
    "connector": "mongodb"
  }
  ...
```

This example creates a MongoDB data source called "mongo1". The identifier is the name by which you refer to the data source in code an other JSON files.

### Entering data source settings

The [data source generator](Data-source-generator.html) prompts you to type the data source settings, such as host, port, user, password and database name.  The specific settings depend on the data source being used.
For information on the  properties that each connector supports, see
documentation for the specific connector under [Connectors reference](Connectors-reference).

```shell
? Enter the datasource name: mongo1
? Select the connector for mongo1: MongoDB (supported by StrongLoop)
? Connection String url to override other settings (eg: mongodb://username:password@hostname:port/database):
? host: your-mongodb-server.foo.com
? port: 27017
? user: demo
? password: ****
? database: demo
? Install loopback-connector-mongodb@^1.4 Yes
```

The tool adds these credentials to `server/datasources.json`.  For example:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"corp1": {
    "name": "mongo1",
    "connector": "mongodb",
    "host": "your-mongodb-server.foo.com",
    "user": "db-username",
    "password": "db-password",
    "database": "your-db-name"
  }
```

If you do not enter the database credentials when prompted (or if you want to change the settings), then you must edit the entry in `server/datasources.json`.

{% include warning.html content="Do not put production database credentials in JSON or JavaScript files, where they could be a security vulnerability.  Instead, load the values from environment variables as explained [below](#specifying-database-credentials-with-environment-variables).
"%}

### Installing a connector

The data source generator asks if you want it to install the data source connector using `npm install`.

If the generator doesn't do it for you, you must run `npm install --save <connector-module>` in your application root directory to add the dependency to `package.json`; for example, to install the MySQL database connector:

```shell
$ cd my-app
$ npm install --save loopback-connector-mysql
```

This command adds the following entry to `package.json`: 

{% include code-caption.html content="package.json" %}
```javascript
...
"dependencies": {
  "loopback-connector-mysql": "latest"
}
...
```

## Specifying database credentials with environment variables

Don't put production database credentials explicitly in JSON or JavaScript files, where they could be a security vulnerability.  Instead, define the values in environment variables and reference them in the data source configuration file.

Refer to an environment variable in JSON as <code>${<i>varname</i>}</code>, where <i>varname</i>
is the name of the environment variable.
For example, assuming you have set a valid MongoDB username and password in the
environment variables MONGO_USER and MONGO_PASS, respectively:

{% include code-caption.html content="datasources.json" %}
```javascript
  ...
  "accountDS": {
    "name": "accountDS",
    "connector": "mongodb",
    "host": "demo.strongloop.com",
    "port": 27017,
    "database": "demo",
    "username": "${MONGO_USER}",
    "password": "${MONGO_PASS}"
  }
  ...
 ```

You can use different data source definitions (including database credentials) for development and production by using the NODE_ENV
environment variable, as explained in [Environment-specific configuration](Environment-specific-configuration.html#data-source-configuration),
for example `datasources.production.json` for production environment when NODE_ENV is 'production'.

## Using multiple data source configurations

LoopBack merges environment-specific configurations (for example in `datasources.production.json`) with the baseline configuration in `datasources.json`.
Environment-specific configurations can override the top-level values with string,  number, object, and array values.

It can be difficult to clear extra datasource settings inherited from the top-level `datasources.json` file in environment-specific files.  To avoid issues, use a single `datasources.json` file that includes both individual settings such as `host`, `port`, and `database` for local environment and a `url` connection string setting that  overrides the other settings for staging and production. For example:

{% include code-caption.html content="datasources.json" %}
```js
{
  "db": {
    "connector": "mongodb",
    // The url setting will be used only when MONGODB_URL env var is defined
    "url": "${MONGODB_URL}",
    // configuration below is for development/staging environments only
    "host": "localhost",
    "database": "my-database-name",
    ...
  }
}
```
