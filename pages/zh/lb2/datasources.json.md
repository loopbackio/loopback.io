---
title: "datasources.json"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/datasources.json.html
summary:
---

## 概要

在/server/datasources.json中配置数据源Configure data sources in 。你可以在这个文件中设置多个数据源。

例如：

```js
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

在应用代码里面通过使用`app.datasources._datasourceName_`得到数据源。

## 标准属性

所有的数据源都支持下面的标准属性。有些特别的属性依赖于使用的connector。

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>描述</th>
    </tr>
    <tr>
      <td>connector</td>
      <td>
        <p>要使用的connector：</p>
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
      <td>定义的数据源的名字</td>
    </tr>
  </tbody>
</table>

## Properties for database connectors

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
        <p>Only valid with <a href="https://docs.strongloop.com/display/zh/MongoDB+connector">MongoDB connector</a>, <a href="https://docs.strongloop.com/display/zh/PostgreSQL+connector">PostgreSQL connector</a>, and <a href="https://docs.strongloop.com/display/zh/SQL+Server+connector">SQL Server connector</a>.</p>
      </td>
    </tr>
    <tr>
      <td>username</td>
      <td><span>String</span></td>
      <td>Username to connect to database</td>
    </tr>
  </tbody>
</table>

## 特定环境的配置

你可以在洗面的文件中覆盖datasource.json中设置的值：

*   `datasources.local.js` 或 `datasources.local.json`
*   `datasources._env_.js` 或 `datasources._env_.json`, 这里的_`env`_ 是`NODE_ENV`环境变量的值。 (一般是`development` 或 `production`)；例如，`datasources.production.json`.

{% include important.html content="

这些文件只能使用值类型（字符串，数字）来覆盖顶层的属性。目前还不支持聚合对象和数组。

" %}

Example data sources:

**datasources.json**

```js
{
  // 键是数据源的名字
  // 值是传给app.dataSource(name, config)的config对象
  db: {
    connector: 'memory'
  }
}
```

**datasources.production.json**

```
{
  db: {
    connector: 'mongodb',
    database: 'myapp',
    user: 'myapp',
    password: 'secret'
  }
}
```
