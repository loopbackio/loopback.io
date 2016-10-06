---
title: "Connecting models to data sources"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Connecting-models-to-data-sources.html
summary:
---

## Overview

LoopBack models connect to backend systems such as databases via _data sources_ that provide create, retrieve, update, and delete (CRUD) functions. LoopBack also generalizes other backend services, such as REST APIs, SOAP web services, and storage services, and so on, as data sources.

Data sources are backed by _connectors_ that implement the data exchange logic using database drivers or other client APIs. In general, applications don't use connectors directly, rather they go through data sources using the [DataSource](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-new-datasourcename-settings) and [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel-new-persistedmodel) APIs.

{% include image.html file="9830484.png" alt="" %} 

### Basic procedure

The easiest way to connect a model to a data source is to use the LoopBack command line tool, [`slc loopback`](https://docs.strongloop.com/display/NODE/slc+loopback).  Follow these steps:

1.  Use the [data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html), `slc loopback:datasource`, to create a new data source.  For example: 

    ```
    $ slc loopback:datasource
    $ Enter the data-source name: mysql
    $ Select the connector for mysql: MySQL (supported by StrongLoop)
    ```

    Follow the prompts to name the datasource and select the connector to use.  See [Connecting models to data sources](/doc/{{page.lang}}/lb2/Connecting-models-to-data-sources.html) for more information.  This adds the new data source to [`datasources.json`](/doc/{{page.lang}}/lb2/datasources.json.html) .

2.  Install the corresponding connector with `npm`, for example: 

    `$ npm install --save loopback-connector-mysql`

    See [Connectors](/doc/{{page.lang}}/lb2/Connecting-models-to-data-sources.html) for the list of connectors.

3.  Use the [model generator](/doc/{{page.lang}}/lb2/Using-the-model-generator.html), `slc loopback:model`, to create a model.  When prompted for the data source to attach to, select the one you just created. 

    {% include note.html content="

    The model generator lists the [memory connector](/doc/{{page.lang}}/lb2/Memory-connector.html), \"no data source,\" and data sources listed in [`datasources.json`](/doc/{{page.lang}}/lb2/datasources.json.html). That's why you created the data source first in step 1.

    " %}

    ```
    $ slc loopback:model
    $ Enter the model name: myModel
    $ Select the data-source to attach test2 to: mysql (mysql)
    $ Select model's base class: PersistedModel
    $ Expose test2 via the REST API? Yes
    $ Custom plural form (used to build REST URL):
    Let's add some test2 properties now.
    ...
    ```

    You can also create models from an existing database; see [Creating models](/doc/{{page.lang}}/lb2/Creating-models.html) for more information.

## Connectors

The following LoopBack connectors are available:

<table>
  <thead>
    <tr>
      <td colspan="3" data-highlight-colour="red"><strong>Database connectors</strong></td>
    </tr>
    <tr>
      <th>Connector</th>
      <th>Module</th>
      <th>Installation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/Memory-connector.html">Memory connector</a></td>
      <td>Built in to LoopBack</td>
      <td>Not required; suitable for development and debugging only.</td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/MongoDB-connector.html">MongoDB</a></td>
      <td><a href="http://github.com/strongloop/loopback-connector-mongodb" class="external-link" rel="nofollow">loopback-connector-mongodb</a></td>
      <td><code>npm install --save loopback-connector-mongodb</code></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/MySQL-connector.html">MySQL</a></td>
      <td><a href="http://github.com/strongloop/loopback-connector-mysql" class="external-link" rel="nofollow">loopback-connector-mysql</a></td>
      <td><code>npm install <span>--save </span>loopback-connector-mysql</code></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/Oracle-connector.html">Oracle</a></td>
      <td><a href="http://github.com/strongloop/loopback-connector-oracle" class="external-link" rel="nofollow">loopback-connector-oracle</a></td>
      <td><code>npm install --save loopback-connector-oracle</code></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/PostgreSQL-connector.html">PostgreSQL</a></td>
      <td><a href="http://github.com/strongloop/loopback-connector-mysql" class="external-link" rel="nofollow">loopback-connector-postgresql</a></td>
      <td><code>npm install <span>--save </span>loopback-connector-postgresql</code></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/SQL-Server-connector.html">SQL Server</a></td>
      <td><a href="https://github.com/strongloop/loopback-connector-mssql" class="external-link" rel="nofollow">loopback-connector-mssql</a></td>
      <td><code>npm install <span>--save </span>loopback-connector-mssql</code></td>
    </tr>
    <tr>
      <td colspan="3" data-highlight-colour="red"><strong>Other connectors</strong></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/Email-connector.html">Email connector</a></td>
      <td>Built in to LoopBack</td>
      <td>
        <p>Not required</p>
      </td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/Push-connector.html">Push connector</a><span>&nbsp;</span></td>
      <td><a href="https://github.com/strongloop/loopback-component-push" class="external-link" rel="nofollow">loopback-component-push</a></td>
      <td><code><span>npm install </span><span>--save </span><span>loopback-component-push</span></code></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/REST-connector.html">REST</a></td>
      <td><a href="http://github.com/strongloop/loopback-connector-rest" class="external-link" rel="nofollow">loopback-connector-rest</a></td>
      <td><code>npm install <span>--save </span>loopback-connector-rest</code></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/SOAP-connector.html">SOAP</a></td>
      <td><a href="http://github.com/strongloop/loopback-connector-soap" class="external-link" rel="nofollow">loopback-connector-soap</a></td>
      <td><code><span><span>npm install <span>--save </span></span>loopback-connector-soap</span></code></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/Storage-connector.html">Storage connector</a></td>
      <td><a href="https://github.com/strongloop/loopback-component-storage" class="external-link" rel="nofollow">loopback-component-storage</a><span>&nbsp;</span><span>&nbsp;</span></td>
      <td><code><span>npm install </span><span>--save </span><span>loopback-component-push</span></code></td>
    </tr>
  </tbody>
</table>

{% include note.html content="

In addition to the connectors listed above that StrongLoop provides, [Community connectors](/doc/{{page.lang}}/lb2/Community-connectors.html) developed and maintained by the LoopBack community enable you to connect to CouchDB, Neo4j, Elasticsearch, and many others.  See [Community connectors](/doc/{{page.lang}}/lb2/Community-connectors.html) for more information.

" %}

## Installing a connector

Run `npm install --save` for the connector module to add the dependency to `package.json`; for example, to install the Oracle database connector:

`$ npm install --save loopback-connector-oracle`

This command adds the following entry to `package.json`: 

**/package.json**

```js
...
"dependencies": {
  "loopback-connector-oracle": "latest"
}
...
```

## Creating a data source

Use the [Data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html) to create a new data source:

`$ slc loopback:datasource`

Follow the prompts to add the desired data source.

You can also create a data source programmatically; see [Advanced topics: data sources](https://docs.strongloop.com/display/LB/Advanced+topics%3A+data+sources) for more information.

### Data source properties

Data source properties depend on the specific data source being used. However, data sources for database connectors (Oracle, MySQL, PostgreSQL, MongoDB, and so on) share a common set of properties, as described in the following table.

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
        <p>Connector name; one of:</p>
        <ul>
          <li>"memory"</li>
          <li><span>"loopback-connector-mongodb" or "mongodb"</span></li>
          <li><span><span>"loopback-connector-mysql" or "mysql"</span></span>
          </li>
          <li><span><span><span>"loopback-connector-oracle" or "oracle"</span></span>
            </span>
          </li>
          <li><span><span><span><span>"loopback-connector-postgresql" or "postgresql"</span></span>
            </span>
            </span>
          </li>
          <li><span><span><span><span><span>"loopback-connector-rest" or "rest"</span></span>
            </span>
            </span>
            </span>
          </li>
          <li><span><span><span><span><span><span>"loopback-connector-mssql" or "mssql"</span></span>
            </span>
            </span>
            </span>
            </span>
          </li>
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
      <td><span>Boolean</span></td>
      <td>If true, turn on verbose mode to debug database queries and lifecycle.</td>
    </tr>
    <tr>
      <td>host</td>
      <td><span>String</span></td>
      <td>Database host name</td>
    </tr>
    <tr>
      <td>password</td>
      <td><span>String</span></td>
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
        <p>Only valid with <a href="/doc/{{page.lang}}/lb2/MongoDB-connector.html">MongoDB connector</a>, <a href="/doc/{{page.lang}}/lb2/PostgreSQL-connector.html">PostgreSQL connector</a>, and <a href="/doc/{{page.lang}}/lb2/SQL-Server-connector.html">SQL Server connector</a>.</p>
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td><span>String</span></td>
      <td>Username to connect to database</td>
    </tr>
  </tbody>
</table>
