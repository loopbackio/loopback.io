---
title: "Create new data source"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Create-new-data-source.html
summary:
---

{% include important.html content="

**Prerequisites**:

*   Install StrongLoop software as described in [安装 StrongLoop](https://docs.strongloop.com/pages/viewpage.action?pageId=6095101)
*   Follow [LoopBack初级教程](https://docs.strongloop.com/pages/viewpage.action?pageId=6095006).

**Recommended**: Read [LoopBack 核心概念](https://docs.strongloop.com/pages/viewpage.action?pageId=6095111).

" %}

You can easily connect a LoopBack application to multiple different data sources.

## Add a data source

You're going to add a MongoDB data source in addition to the MySQL data source created in [将API连接至一个数据源](/doc/{{page.lang}}/lb2/6095008.html).

`$ slc loopback:datasource`

When prompted, respond as follows:

```
? Enter the data-source name: mongoDs
? Select the connector for mongoDs: MongoDB (supported by StrongLoop)
```

## Install MongoDB connector

`$ npm install --save loopback-connector-mongodb`

## Configure data source

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Do we want to give the option to connect to your own MongoDB server?</div>

Edit `datasources.json` to configure the data source so that it connects to the StrongLoop demo MongoDB server.  Add the following JSON after the two existing data source definitions (for "db" and "mysqlDs"):

**server/datasources.json**

```js
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

Next: Continue to [Create new models](/doc/{{page.lang}}/lb2/Create-new-models.html).
