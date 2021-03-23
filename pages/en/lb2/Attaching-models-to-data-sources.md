---
title: "Attaching models to data sources"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Attaching-models-to-data-sources.html
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
$ slc loopback:datasource
```

Or, with API Connect:

```shell
$ apic create --type datasource
```

You can also add and modify data sources using the API Designer tool.

The tool will prompt you for the name of the new data source and the connector to use; for example, MySQL, Oracle, REST, and so on.
The tool will then add an entry such as the following to `datasources.json`:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
  ...
  "corp1": {
    "name": "corp1",
    "connector": "mysql"
  }
  ...
```

This example creates a MySQL data source called "corp1". The identifier determines the name by which you refer to the data source and can be any string.

Next, the generator will prompt you to type the datasource settings, such as
host, port, user, password and database name, as well as to install the database connector.

```shell
? Enter the datasource name: corp1
? Select the connector for corp1: MySQL (supported by StrongLoop)
? Connection String url to override other settings (eg: mysql://user:pass@host/db):
? host: your-mysql-server.foo.com
? port: 3306
? user: demo
? password: ****
? database: demo
? Install loopback-connector-mysql@^1.4 Yes
```

Install the database connector when it prompts you or if you wish to install separately you can do so by `npm install loopback-connector-<connector_name> --save`. If you do not enter the database credentials when prompted, then you must add them manually to `server/datasources.json` as shown below.

## Add data source credentials

Edit `server/datasources.json` to add the necessary authentication credentials for the data source; typically hostname, username, password, and database name.

For example:

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"corp1": {
    "name": "corp1",
    "connector": "mysql",
    "host": "your-mysql-server.foo.com",
    "user": "db-username",
    "password": "db-password",
    "database": "your-db-name"
  }
```

## Make the model use the data source

When you create a new model with the [model generator](Model-generator.html),
you can specify the data source you want it to use from among those you've added to the application using the
[Data source generator](Data-source-generator.html) and the default `db`
data source (that uses the [memory connector](Memory-connector.html)).

To create a model, run `slc loopback:model` or `apic create --type model`.

```shell
? Enter the model name: myModel
? Select the data-source to attach myModel to:
   db (memory)
 ❯ corp1 (mysql)
   (no data-source) 
```

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
