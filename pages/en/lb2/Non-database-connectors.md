---
title: "Non-database connectors"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Non-database-connectors.html
summary:
---

LoopBack supports a number of connectors to backend systems beyond databases:

* [Email connector](/doc/en/lb2/Email-connector.html)
* [Push connector](/doc/en/lb2/Push-connector.html)
* [Remote connector](/doc/en/lb2/Remote-connector.html)
* [REST connector](/doc/en/lb2/REST-connector.html)
* [SOAP connector](/doc/en/lb2/SOAP-connector.html)
* [Storage connector](/doc/en/lb2/Storage-connector.html)
* [Swagger connector](/doc/en/lb2/Swagger-connector.html)

These types of connectors often implement specific methods depending on the underlying system.
For example, the REST connector delegates calls to REST APIs while the Push connector integrates with iOS and Android push notification services. 

Models attached to non-database data sources can serve as controllers (a model class that only has methods).
Such models usually don't have property definitions as the backing connector doesn't support CRUD operations.
For example, to define a model for an external REST API, we can have a model as follows:

**common/models/my-rest-service.json**

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

**server/model-config.json**

```javascript
...
  "MyRestService": {
    "dataSource": "myRestDataSource",
    "public": true
  }
...
```