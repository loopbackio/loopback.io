---
title: "Attaching models to data sources"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Attaching-models-to-data-sources.html
summary:
---

## Overview

A data source enables a model to access and modify data in backend system such as a relational database. Data sources encapsulate business logic to exchange data between models and various back-end systems such as relational databases, REST APIs, SOAP web services, storage services, and so on. Data sources generally provide create, retrieve, update, and delete (CRUD) functions. 

Models access data sources through _connectors_ that are extensible and customizable.  In general, application code does not use a connector directly. Rather, the `DataSource` class provides an API to configure the underlying connector.

By default, `slc` creates and uses the [memory connector](/doc/{{page.lang}}/lb2/Memory-connector.html), which is suitable for development.  To use a different data source:

1.  Use` slc loopaback:datasource` to create the new data source and add it to the application's `datasources.json`.
2.  Edit [`datasources.json`](/doc/{{page.lang}}/lb2/datasources.json.html) to add the appropriate credentials for the data source.  
3.  Create a model to connect to the data source or modify an existing model definition to use the connector.

## Add a data source

To add a new data source, use the [Data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html):

**shell**

`$ slc loopback:datasource`

It will prompt you for the name of the new data source and the connector to use; for example, MySQL, Oracle, REST, and so on.  The tool will then add an entry such as the following to `datasources.json`:

**/server/datasources.json**

```js
...
"corp1": {
  "name": "corp1",
  "connector": "mysql"
}
...
```

This example creates a MySQL data source called "corp1".  The identifier determines the name by which you refer to the data source and can be any string.

## Add data source credentials

Edit `datasources.json` to add the necessary authentication credentials for the data source; typically hostname, username, password, and database name.  For example:

**/server/datasources.json**

```js
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

Edit the application [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) to set the data source used by a model:

For example, using the previous example where the data source was named "mysql," if you followed the procedure in [Creating an application](/doc/{{page.lang}}/lb2/Creating-an-application.html) to create the example "books" data source, edit it to change the "dataSource" property from "db" to "corp1" to use the corresponding MySQL database:

**/common/models/model.json**

```js
"book": {
   "properties": {
     ...
   },
   "public": true,
   "dataSource": "corp1",
   "plural": "books"
 }
```

Then the books model would use the "corp1" data source that uses the MySQL connector instead of the "db" data source that uses the memory connector.
