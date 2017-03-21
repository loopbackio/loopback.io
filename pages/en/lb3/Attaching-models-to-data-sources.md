---
title: "Attaching models to data sources"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Attaching-models-to-data-sources.html
summary:
---

## Overview

A data source enables a model to access and modify data in backend system such as a relational database. 
Data sources encapsulate business logic to exchange data between models and various back-end systems such as relational databases,
REST APIs, SOAP web services, storage services, and so on. Data sources generally provide create, retrieve, update, and delete (CRUD) functions. 

Models access data sources through _connectors_ that are extensible and customizable. In general, application code does not use a connector directly.
Rather, the `DataSource` class provides an API to configure the underlying connector.

The built-in [memory connector](Memory-connector.html) is suitable for development. To use a different data source:

1.  Use the [data source generator](Data-source-generator.html) 
    to create the new data source and add it to the application's `datasources.json`.
2.  Edit [`datasources.json`](datasources.json.html) to add the appropriate credentials for the data source.
3.  Create a model to connect to the data source or modify an existing model definition to use the connector.

## Add a data source

To add a new data source, use the [data source generator](Data-source-generator.html):

```shell
$ lb datasource
```
<div id="lb3apic" class="sl-hidden" markdown="1">
Or, with API Connect:

```shell
$ apic create --type datasource
```
You can also add and modify data sources using the API Designer tool.
</div>

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

This example creates a MongoDB data source called "mongo1". The identifier determines the name by which you refer to the data source and can be any string.

## Add database credentials

Edit `datasources.json` to add the necessary authentication credentials for the data source; typically hostname, username, password, and database name.

For example:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"corp1": {
    "name": "corp1",
    "connector": "mongodb",
    "host": "your-mongodb-server.foo.com",
    "user": "db-username",
    "password": "db-password",
    "database": "your-db-name"
  }
```

{% include warning.html content="Putting production database credentials in a JSON file is not recommended for security reasons.
Instead, load the credentials from environment variables, as explained [below](#specifying-database-credentials-with-environment-variables).
"%}

### Specifying database credentials with environment variables

Best practice is not to put production database credentials explicitly in JSON or JavaScript files, where they could be  a security vulnerability.  Instead, define the values in environment variables and reference them in the data source configuration file.

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

### Using multiple data source configurations

LoopBack merges environment-specific configurations (for example in `datasources.production.json`) with the baseline configuration in `datasources.json`.
Environment-specific configurations can override the top-level values with string and number values only. You cannot use objects or array values.

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

## Make the model use the data source

When you create a new model with the [model generator](Model-generator.html),
you can specify the data source you want it to use from among those you've added to the application using the
[Data source generator](Data-source-generator.html) and the default `db`
data source (that uses the [memory connector](Memory-connector.html)).

To change the data source a model uses after you've created the model, edit the application's `server/model-config.json`
and set the dataSource property for the model. For example, to make myModel use the corp1 data source:

{% include code-caption.html content="server/model-config.json" %}
```javascript
"myModel": {
    "dataSource": "corp1",
    "public": true
  }
```

By default, the model generator creates models to use the `db` data source.
