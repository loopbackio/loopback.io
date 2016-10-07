---
title: "Non-database connectors"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Non-database-connectors.html
summary:
---

LoopBack supports a number of connectors to backend systems beyond databases:

*   [ATG connector](/doc/{{page.lang}}/lb2/ATG-connector.html)
*   [Email connector](/doc/{{page.lang}}/lb2/Email-connector.html)
*   [Push connector](/doc/{{page.lang}}/lb2/Push-connector.html)
*   [Remote connector](/doc/{{page.lang}}/lb2/Remote-connector.html)
*   [REST connector](/doc/{{page.lang}}/lb2/REST-connector.html)
*   [SOAP connector](/doc/{{page.lang}}/lb2/SOAP-connector.html)
*   [Storage connector](/doc/{{page.lang}}/lb2/Storage-connector.html)

These types of connectors often implement specific methods depending on the underlying system. For example, the REST connector delegates calls to REST APIs while the Push connector integrates with iOS and Android push notification services. 

Models attached to non-database data sources can serve as controllers (a model class that only has methods). Such models usually don't have property definitions as the backing connector doesn't support CRUD operations. For example, to define a model for an external REST API, we can have a model as follows:

**common/models/my-rest-service.json**

```js
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

```js
... 
"MyRestService": {
  "dataSource": "myRestDataSource",
  "public": true
}
...
```
