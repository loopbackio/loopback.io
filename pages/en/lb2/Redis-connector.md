---
title: "Redis connector"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Redis-connector.html
summary:
---

{% include note.html content="

This project provides early access to advanced or experimental functionality.
It may lack usability, completeness, documentation, and robustness, and may be outdated.

However, StrongLoop supports this project. Community users, please report bugs on GitHub.

For more information, see [StrongLoop Labs](/doc/en/lb2/StrongLoop-Labs.html).

" %}

{% include note.html content="

The Redis connector requires Redis 3.0.3+.

" %}

## Installation

In your application root directory, enter this command to install the connector:

```shell
$ npm install loopback-connector-redis --save
```

This will install the module and add it as a dependency to the application's [`package.json`](http://docs.strongloop.com/display/LB/package.json) file.

## Creating a Redis data source

Use the [data source generator](/doc/en/lb2/Data-source-generator.html) to add a Redis data source to your application.
When prompted for the connector, choose **other,** then enter **redis** for the connector name.
The entry in the application's `server/datasources.json` will look like this:

**server/datasources.json**

```javascript
"redisDS": {
  "name": "redisDS",
  "connector": "redis",
}
```

Edit `datasources.json` to add other properties that enable you to connect the data source to a Redis database.

### Properties

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
        <p>Connector name, either "loopback-connector-redis" or "redis"</p>
      </td>
    </tr>
    <tr>
      <td>database</td>
      <td>String</td>
      <td>Database name</td>
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
      <td>Use instead host and port properties.</td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>Username to connect to database</td>
    </tr>
  </tbody>
</table>