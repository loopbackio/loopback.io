---
title: "Connecting models to data sources"
lang: en
layout: page
keywords: LoopBack
tags: [data_sources]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Connecting-models-to-data-sources.html
summary:
---

## Overview

{% include image.html file="9830484.png" alt="" %} 

LoopBack models connect to backend systems such as databases via _data sources_ that provide create, retrieve, update, and delete (CRUD) functions.
LoopBack also generalizes other backend services, such as REST APIs, SOAP web services, and storage services, and so on, as data sources.

Data sources are backed by _connectors_ that implement the data exchange logic using database drivers or other client APIs.
In general, applications don't use connectors directly, rather they go through data sources using the
[DataSource](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-new-datasourcename-settings) 
and 
[PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel-new-persistedmodel) APIs.

### Basic procedure

To connect a model to a data source, follow these steps:

1.  Use the  [data source generator](Data-source-generator.html)  to create a new data source.

    For example: 

    ```shell
    $ apic create --type datasource
    ? Enter the data-source name: mysql-corp
    ? Select the connector for mysql: MySQL (supported by StrongLoop)
    ```

    ```shell
    $ slc loopback:datasource
    ? Enter the data-source name: mysql-corp
    ? Select the connector for mysql: MySQL (supported by StrongLoop)
    ```

    Follow the prompts to name the datasource and select the connector to use.
    This adds the new data source to [`datasources.json`](datasources.json.html).

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

    For information on the  properties that each connector supports, see
    documentation for the specific connector under [Connectors reference](Connectors-reference).

3.  Install the corresponding connector as a dependency of your app with `npm`.

    For example: 

    ```shell
    $ cd <your-app>
    $ npm install --save loopback-connector-mysql
    ```

    See [Connectors reference](Connectors-reference). for the list of connectors.

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

{% include note.html content="The model generator lists the [memory connector](Memory-connector.html), \"no data source,\" and data sources listed in [`datasources.json`](datasources.json.html).  That's why you created the data source first in step 1.
" %}

You can also create models from an existing database; see [Creating models](Creating-models.html) for more information.

## Connectors

{% include note.html content="In addition to the connectors below that IBM/StrongLoop supports,
[community connectors](Community-connectors.html) developed and maintained by the LoopBack community enable you to connect to CouchDB, Neo4j, Elasticsearch, and many others.
See [Community connectors](Community-connectors.html) for more information.
" %}

The following table lists commercially-supported LoopBack connectors. For more information, see [Database connectors](Database-connectors.html) and [Non-database connectors](Non-database-connectors.html).

<table>
  <thead>
    <tr>
      <td colspan="3" data-highlight-colour="red" style="text-align: center;"><strong>Database connectors</strong></td>
    </tr>
    <tr>
      <th style="text-align: center;">Connector</th>
      <th>Module</th>
      <th>Installation</th>
    </tr>
    <tr>
      <td><a href="https://cloudant.com/" class="external-link" rel="nofollow">IBM Cloudant</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-cloudant" class="external-link" rel="nofollow">loopback-connector-cloudant</a></td>
      <td><code>npm install --save loopback-connector-cloudant</code></td>
    </tr>
    <tr>
      <td><a href="http://www.ibm.com/analytics/us/en/technology/cloud-data-services/dashdb/" class="external-link" rel="nofollow">IBM DashDB</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-dashdb" class="external-link" rel="nofollow">loopback-connector-dashdb</a></td>
      <td><code>npm install --save loopback-connector-dashdb</code></td>
    </tr>
    <tr>
      <td><a href="http://www.ibm.com/analytics/us/en/technology/db2/" class="external-link" rel="nofollow">IBM DB2</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-db2z" class="external-link" rel="nofollow">loopback-connector-db2</a></td>
      <td><code>npm install --save loopback-connector-db2</code></td>
    </tr>
    <tr>
      <td><a href="https://www-01.ibm.com/software/data/db2/zos/family/" class="external-link" rel="nofollow">IBM DB2 for z/OS</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-db2z" class="external-link" rel="nofollow">loopback-connector-db2z</a></td>
      <td><code>npm install --save loopback-connector-db2z</code></td>
    </tr>
    <tr>
      <td><a href="https://www-01.ibm.com/software/data/informix/" class="external-link" rel="nofollow">IBM Informix</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-informix" class="external-link" rel="nofollow">loopback-connector-informix</a></td>
      <td><code>npm&nbsp;install&nbsp;loopback-connector-informix&nbsp;--save</code></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="Memory-connector.html">Memory connector</a></td>
      <td>Built in to LoopBack</td>
      <td>Not required; suitable for development and debugging only.</td>
    </tr>
    <tr>
      <td><a href="MongoDB-connector.html">MongoDB</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-mongodb" class="external-link" rel="nofollow">loopback-connector-mongodb</a></td>
      <td><code>npm install --save loopback-connector-mongodb</code></td>
    </tr>
    <tr>
      <td><a href="MySQL-connector.html">MySQL</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-mysql" class="external-link" rel="nofollow">loopback-connector-mysql</a></td>
      <td><code>npm install --save loopback-connector-mysql</code></td>
    </tr>
    <tr>
      <td><a href="Oracle-connector.html">Oracle</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-oracle" class="external-link" rel="nofollow">loopback-connector-oracle</a></td>
      <td><code>npm install --save loopback-connector-oracle</code></td>
    </tr>
    <tr>
      <td><a href="PostgreSQL-connector.html">PostgreSQL</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-mysql" class="external-link" rel="nofollow">loopback-connector-postgresql</a></td>
      <td><code>npm install --save loopback-connector-postgresql</code></td>
    </tr>
    <tr>
      <td><a href="SQL-Server-connector.html">SQL Server</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-mssql" class="external-link" rel="nofollow">loopback-connector-mssql</a></td>
      <td><code>npm install --save loopback-connector-mssql</code></td>
    </tr>
    <tr>
      <td><a href="https://www.sqlite.org/" class="external-link" rel="nofollow">SQLite 3.x</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-sqlite3" class="external-link" rel="nofollow">loopback-connector-sqlite3</a></td>
      <td><code>npm install --save loopback-connector-sqlite3</code></td>
    </tr>
    <tr>
      <td colspan="3"><strong>Other connectors</strong></td>
    </tr>
    <tr>
      <td><a href="Email-connector.html">Email connector</a></td>
      <td>Built in to LoopBack</td>
      <td>
        <p>Not required</p>
      </td>
    </tr>
    <tr>
      <td><a href="Push-connector.html">Push connector</a>  </td>
      <td><a href="https://github.com/strongloop/loopback-component-push" class="external-link" rel="nofollow">loopback-component-push</a></td>
      <td><code>npm install --save loopback-component-push</code></td>
    </tr>
    <tr>
      <td><a href="Remote-connector.html">Remote connector</a></td>
      <td><a href="https://github.com/strongloop/loopback-connector-remote" class="external-link" rel="nofollow">loopback-connector-remote</a></td>
      <td><code>npm install --save loopback-connector-remote</code></td>
    </tr>
    <tr>
      <td><a href="REST-connector.html">REST</a></td>
      <td><a href="http://github.com/strongloop/loopback-connector-rest" class="external-link" rel="nofollow">loopback-connector-rest</a></td>
      <td><code>npm install --save loopback-connector-rest</code></td>
    </tr>
    <tr>
      <td><a href="SOAP-connector.html">SOAP</a></td>
      <td><a href="http://github.com/strongloop/loopback-connector-soap" class="external-link" rel="nofollow">loopback-connector-soap</a></td>
      <td><code>npm install --save loopback-connector-soap</code></td>
    </tr>
    <tr>
      <td><a href="Storage-connector.html">Storage connector</a></td>
      <td><a href="https://github.com/strongloop/loopback-component-storage" class="external-link" rel="nofollow">loopback-component-storage</a>    </td>
      <td><code>npm install --save loopback-component-storage</code></td>
    </tr>
  </tbody>
</table>

## Installing a connector

Run `npm install --save <_connector-module_>` in your application root directory to add the dependency to `package.json`;
for example, to install the Oracle database connector:

```shell
$ cd <your-app>
$ npm install --save loopback-connector-oracle
```

This command adds the following entry to `package.json`: 

{% include code-caption.html content="package.json" %}
```javascript
...
"dependencies": {
  "loopback-connector-oracle": "latest"
}
...
```

## Creating a data source

Use the [data source generator](Data-source-generator.html) to create a new data source:

```shell
$ apic create --type datasource
```

```shell
$ slc loopback:datasource
```

Follow the prompts to add the desired data source.

You can also create a data source programmatically;
see [Advanced topics: data sources](Advanced-topics-data-sources.html) for more information.

### Data source properties

Data source properties depend on the specific data source being used.
However, data sources for database connectors (Oracle, MySQL, PostgreSQL, MongoDB, and so on) share a common set of properties,
as described in the following table.

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>connector</td>
      <td>String</td>
      <td>
        <p>Connector name; for example:</p>
        <ul>
          <li>"memory"</li>
          <li>"loopback-connector-mongodb" or "mongodb"</li>
          <li>"loopback-connector-mysql" or "mysql"</li>
          <li>"loopback-connector-oracle" or "oracle"</li>
          <li>"loopback-connector-postgresql" or "postgresql"</li>
          <li>"loopback-connector-rest" or "rest"</li>
          <li>"loopback-connector-mssql" or "mssql"</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>database</td>
      <td>String</td>
      <td>Database name</td>
    </tr>
    <tr>
      <td>debug</td>
      <td>Boolean</td>
      <td>If true, turn on verbose mode to debug database queries and lifecycle.</td>
    </tr>
    <tr>
      <td>host</td>
      <td>String</td>
      <td>Database host name</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>Password to connect to database</td>
    </tr>
    <tr>
      <td>port</td>
      <td>Number</td>
      <td>Database TCP port</td>
    </tr>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>
        <p>Combines and overrides <code>host</code>,&nbsp;<code>port</code>,&nbsp;<code>user</code>,&nbsp;<code>password</code>, and&nbsp;<code>database</code>&nbsp;properties.</p>
        <p>Only valid with <a href="MongoDB-connector.html">MongoDB connector</a>, <a href="PostgreSQL-connector.html">PostgreSQL connector</a>, and <a href="SQL-Server-connector.html">SQL Server connector</a>.</p>
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Username to connect to database</td>
    </tr>
  </tbody>
</table>
