---
title: "Email connector"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Email-connector.html
summary:
---

The email connector is built in to LoopBack, so you don't need to install it.

## Creating an email data source

Create a new email data source with the [data source generator](/doc/en/lb2/Data-source-generator.html):

```shell
$ apic create --type datasource
```

```shell
$ slc loopback:datasource
```

When prompted, select **Email** as the connector. This creates an entry in `datasources.json` like this (for example):

**server/datasources.json**

```javascript
...
"myEmailDataSource": {
  "name": "myEmailDataSource",
  "connector": "mail"
}
...
```

## Configuring an email data source

Configure the email data source by editing `/server/datasources.json` (for example):

**server/datasources.json**

```javascript
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

### Using GMail

{% include tip.html content="

With GMail, you may need to enable the \"access for less secure apps\" option.
See [Nodemailer - Using GMail](https://github.com/andris9/Nodemailer#using-gmail)
and [Nodemailer - Authentication](https://github.com/andris9/nodemailer-smtp-transport#authentication) for more information.

" %}

For GMail, configure your email data source as follows:

**server/datasources.json**

```javascript
...
"Email": {
  "name": "mail",
  "defaultForType": "mail",
  "connector": "mail",
  "transports": [{
    "type": "SMTP",
    "host": "smtp.gmail.com",
    "secure": true,
    "port": 465,
    "auth": {
      "user": "name@gmail.com",
      "pass": "pass"
    }
  }]
}
...
```

## Connecting a model to the email data source

Then, connect models to the data source in `/server/model-config.json` as follows (for example):

**server/model-config.json**

```javascript
{
  ...
  "Email": {
    "dataSource": "myEmailDataSource"
  },
  ...
}
```