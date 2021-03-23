---
title: "Built-in models REST API"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Built-in-models-REST-API.html
summary:
---

**See also**: [Exposing models over REST](Exposing-models-over-REST.html)

LoopBack provides a number of [built-in models](Using-built-in-models.html) that have REST APIs. Many of them inherit endpoints from the generic 
[PersistedModel REST API](PersistedModel-REST-API.html).

By default, LoopBack uses `/api` as the URI root for the application REST API.
To change it, set the `apiPath` variable in the application `app.js` file. 

The built-in models are:

* [PersistedModel REST API](PersistedModel-REST-API.html)
* [Access token REST API](Access-token-REST-API.html)
* [ACL REST API](ACL-REST-API.html)
* [Application REST API](Application-REST-API.html)
* Email (See the [email connector](Email-connector.html) page)
* [Relation REST API](Relation-REST-API.html)
* [Role REST API](Role-REST-API.html)
* [User REST API](User-REST-API.html)