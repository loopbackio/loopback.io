---
title: "datasources.json"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/datasources.json.html
summary:
---

## Overview

Configure data sources in `/server/datasources.json`. You can set up as many data sources as you want in this file.

For example:

```javascript
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "myDB": {
    "name": "myDB",
    "connector": "mysql",
    "host": "demo.strongloop.com",
    "port": 3306,
    "database": "demo",
    "username": "demo",
    "password": "L00pBack"
  }
}
```

To access data sources in application code, use `app.datasources._datasourceName_`.

## Standard properties

All data sources support a few standard properties. Beyond that, specific properties and defaults depend on the connector being used.

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>connector</td>
      <td>
        <p>LoopBack connector to use; one of:</p>
        <ul>
          <li>memory</li>
          <li>loopback-connector-oracle or just "oracle"</li>
          <li>loopback-connector-mongodb or just "mongodb"</li>
          <li>loopback-connector-mysql or just "mysql"</li>
          <li>loopback-connector-postgresql or just "postgresql"</li>
          <li>loopback-connector-soap or just "soap"</li>
          <li>loopback-connector-mssql or just "mssql"</li>
          <li>
            <p>loopback-connector-rest or just "rest"</p>
          </li>
          <li>loopback-storage-service</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>name</td>
      <td>Name of the data source being defined.</td>
    </tr>
  </tbody>
</table>

## Properties for database connectors

To connect a model to a data source, follow these steps:

1.  Use the [data source generator](Data-source-generator.html) to create a new data source. For example: 

    ```shell
    $ apic create --type datasource
    ? Enter the data-source name: mysql-corp
    ? Select the connector for mysql-corp: MySQL (supported by StrongLoop)
    ```

    ```shell
    $ slc loopback:datasource
    ? Enter the data-source name: mysql-corp
    ? Select the connector for mysql-corp: MySQL (supported by StrongLoop)
    ```

    Respond to the prompts to set data source properties such as database credentials.
    To change the data source properties, edit `server/datasources.json`.

2.  Edit `server/datasources.json` to add the necessary authentication credentials: typically hostname, username, password, and database name.

    For example:

    **server/datasources.json**

    ```javascript
    "mysql-corp": {
        "name": "mysql-corp",
        "connector": "mysql",
        "host": "your-mysql-server.foo.com",
        "user": "db-username",
        "password": "db-password",
        "database": "your-db-name"
      }
    ```

    For information on the properties that each connector supports, see
    the specific connector documentation in [Database connectors](Database-connectors.html).

3.  Install the corresponding connector as a dependency of your app with `npm`, for example: 

    ```shell
    $ cd <your-app>
    $ npm install --save loopback-connector-mysql
    ```

    See [Connectors](Connecting-models-to-data-sources.html) for the list of connectors.

4.  Use the [model generator](Using-the-model-generator.html) to create a model.

    ```shell
    $ apic create --type model
    ? Enter the model name: myModel
    ? Select the data-source to attach myModel to: mysql (mysql)
    ? Select model's base class: PersistedModel
    ? Expose myModel via the REST API? Yes
    ? Custom plural form (used to build REST URL):
    Let's add some test2 properties now.
    ...
    ```

    ```shell
    $ slc loopback:model
    ? Enter the model name: myModel
    ? Select the data-source to attach myModel to: mysql (mysql)
    ? Select model's base class: PersistedModel
    ? Expose myModel via the REST API? Yes
    ? Custom plural form (used to build REST URL):
    Let's add some test2 properties now.
    ...
    ```

    When prompted for the data source to attach to, select the one you just created. 

{% include note.html content="
The model generator lists the [memory connector](Memory-connector.html), \"no data source,\" and data sources listed in `datasources.json`.  That's why you created the data source first in step 1.
" %}

You can also create models from an existing database.
See [Creating models](Creating-models.html) for more information.

## Environment-specific configuration

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
