---
title: "Create new data source"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Create-new-data-source.html
summary: You can easily connect a LoopBack application to multiple different data sources.
---

{% include content/gs-prereqs.html two="true" lang=page.lang %}

## Add a data source

You're going to add a MongoDB data source in addition to the MySQL data source created in [Connect your API to a data source](Connect-your-API-to-a-data-source.html).

`$ slc loopback:datasource`

When prompted, respond as follows:

```
? Enter the data-source name: mongoDs
? Select the connector for mongoDs: MongoDB (supported by StrongLoop)
```

Next, the generator will prompt you to type the datasource settings, such as
host, port, user, password and database name, as well as to install the database connector.

```shell
? Enter the datasource name: mongodb
? Select the connector for mongodb: MongoDB (supported by StrongLoop)
? Connection String url to override other settings (eg: mongodb://username:password@hostname:port/database):
? host: localhost
? port: 27017
? user: demo
? password: ****
? database: demo
? Install loopback-connector-mongodb@^1.4 Yes
```

Install the database connector when it prompts you or if you wish to install separately you can do so by `npm install loopback-connector-<connector_name> --save`. If you do not enter the database credentials when prompted, then you must add them manually to `server/datasources.json` as shown below.

## Install MongoDB connector

`$ npm install --save loopback-connector-mongodb`

## Configure data source

{% include important.html content="
If you have a MongoDB database server that you can use, please do so. Create a new database called \"getting_started_intermediate\". If you wish, you can use a different database name. Just make sure the `mongoDs.database` property in `server/datasources.json` matches it (see below).

If not, you can use the StrongLoop MongoDB server running on [demo.strongloop.com](http://demo.strongloop.com/). However, be aware that it is a shared resource. There is a small chance that two users may perform operations that conflict. For this reason, we recommend you use your own MongoDB server if you have one.
" %}

Edit `server/datasources.json` to configure the data source so that it connects to the StrongLoop demo MongoDB server.  Add the following JSON after the two existing data source definitions (for "db" and "mysqlDs"):

{% include code-caption.html content="server/datasources.json" %}
```javascript
...
"mongoDs": {
  "name": "mongoDs",
  "connector": "mongodb",
  "host": "demo.strongloop.com",
  "port": 27017,
  "database": "getting_started_intermediate",
  "username": "demo",
  "password": "L00pBack"
}
```

{% include next.html content="Continue to [Create new models](Create-new-models.html)."
%}
