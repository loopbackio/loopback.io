---
title: "Built-in models REST API"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Built-in-models-REST-API.html
summary:
---

**See also**: [Exposing models over REST](/doc/en/lb2/Exposing-models-over-REST.html)

LoopBack provides a number of [built-in models](/doc/en/lb2/Using-built-in-models.html) that have REST APIs. Many of them inherit endpoints from the generic 
[PersistedModel REST API](/doc/en/lb2/PersistedModel-REST-API.html).

By default, LoopBack uses `/api` as the URI root for the application REST API.
To change it, set the `apiPath` variable in the application `app.js` file. 

The built-in models are:

* [PersistedModel REST API](/doc/en/lb2/PersistedModel-REST-API.html)
* [Access token REST API](/doc/en/lb2/Access-token-REST-API.html)
* [ACL REST API](/doc/en/lb2/ACL-REST-API.html)
* [Application REST API](/doc/en/lb2/Application-REST-API.html)
* [Email REST API](/doc/en/lb2/Email-REST-API.html)
* [Relation REST API](/doc/en/lb2/Relation-REST-API.html)
* [Role REST API](/doc/en/lb2/Role-REST-API.html)
* [User REST API](/doc/en/lb2/User-REST-API.html)