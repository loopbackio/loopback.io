---
title: "Email connector"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Email-connector.html
summary:
---

The email connector is built in to LoopBack, so you don't need to install it.

## Creating an email data source

Create a new email data source with the [data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html):

`$ slc loopback:datasource`

When prompted, select **Email** as the connector.  This creates an entry in `datasources.json` like this (for example):

**/server/datasources.json**

```js
...
 "myEmailDataSource": {
   "name": "myEmailDataSource",
   "connector": "mail"
 }
 ...
```

## Configuring an email data source

Configure the email data source by editing `/server/datasources.json` (for example):

**/server/datasources.json**

```js
{
  ...
  "myEmailDataSource": {
    "connector": "mail",
    "transports": [{
      "type": "smtp",
      "host": "smtp.private.com",
      "secure": false,
      "port": 587,
      "tls": {
        "rejectUnauthorized": false
      },
      "auth": {
        "user": "me@private.com",
        "pass": "password"
      }
    }]
  }
  ...
}
```

## Connecting a model to the email data source

Then, connect models to the data source in `/server/model-config.json` as follows (for example):

**/server/model-config.json**

```js
{
  ...
  "Email": {
    "dataSource": "myEmailDataSource",
  },
  ...
}
```
