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

## Install MongoDB connector

`$ npm install --save loopback-connector-mongodb`

## Configure data source

{% include important.html content="
If you have a MongoDB database server that you can use, please do so. Create a new database called \"getting_started_intermediate\". If you wish, you can use a different database name. Just make sure the `mongoDs.database` property in `datasources.json` matches it (see below).

If not, you can use the StrongLoop MongoDB server running on [demo.strongloop.com](http://demo.strongloop.com/). However, be aware that it is a shared resource. There is a small chance that two users may perform operations that conflict. For this reason, we recommend you use your own MongoDB server if you have one.
" %}

Edit `datasources.json` to configure the data source so that it connects to the StrongLoop demo MongoDB server.  Add the following JSON after the two existing data source definitions (for "db" and "mysqlDs"):

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
