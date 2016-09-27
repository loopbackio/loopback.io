---
title: "Other connectors"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Other-connectors.html
summary: LoopBack supports a number of connectors to backend systems beyond databases.
---

Other LoopBack connectors include:

* [Email connector](/doc/{{page.lang}}/lb2/Email-connector.html)
* [Push connector](/doc/{{page.lang}}/lb2/Push-connector.html)
* [Remote connector](/doc/{{page.lang}}/lb2/Remote-connector.html)
* [REST connector](/doc/{{page.lang}}/lb2/REST-connector.html)
* [SOAP connector](/doc/{{page.lang}}/lb2/SOAP-connector.html)
* [Storage connector](/doc/{{page.lang}}/lb2/Storage-connector.html)
* [Swagger connector](/doc/{{page.lang}}/lb2/Swagger-connector.html)

These types of connectors often implement specific methods depending on the underlying system.
For example, the REST connector delegates calls to REST APIs while the Push connector integrates with iOS and Android push notification services. 

Models attached to non-database data sources can serve as controllers (a model class that only has methods).
Such models usually don't have property definitions as the backing connector doesn't support CRUD operations.
For example, to define a model for an external REST API, we can have a model as follows:

{% include code-caption.html content="common/models/my-rest-service.json" %}
```javascript
{
  "name": "MyRestService",
  "base": "Model",
  "properties": {},
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": []
}
```

The model is configured to attach to the REST data source.

{% include code-caption.html content="server/model-config.json" %}
```javascript
...
  "MyRestService": {
    "dataSource": "myRestDataSource",
    "public": true
  }
...
```
