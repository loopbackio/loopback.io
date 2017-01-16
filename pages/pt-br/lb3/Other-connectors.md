---
title: "Other connectors"
redirect_from:
  - /doc/en/lb2/Non-database-connectors.html
lang: en
layout: page
keywords: LoopBack
tags: [data_sources]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Other-connectors.html
summary: LoopBack supports a number of connectors to backend systems beyond databases.
---

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

## Available connectors

Officially-supported non-database connectors include:

* [Email connector](Email-connector.html)
* [JSON-RPC connector](JSON-RPC-connector.html)
* [MQ Light connector](MQLight-connector.html)
* [Push connector](Push-connector.html)
* [Remote connector](Remote-connector.html)
* [REST connector](REST-connector.html)
* [SOAP connector](SOAP-connector.html)
* [Storage connector](Storage-connector.html)
* [Swagger connector](Swagger-connector.html)
