---
title: "Defining models"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Defining-models.html
summary:
---

{% include important.html content="
**Prerequisites**

Install [API Connect](https://developer.ibm.com/apiconnect/) or [StrongLoop](https://docs.strongloop.com/display/SL/Installing-StrongLoop) and read [LoopBack core concepts](/doc/en/lb/LoopBack-core-concepts.html).
" %}

A _LoopBack model_ represents data in backend systems such as databases, and by default has both Node and REST APIs.
Additionally, you can add functionality such as validation rules and business logic to models.

Every LoopBack application has a set of predefined [built-in models](/doc/{{page.lang}}/lb2/Using-built-in-models.html) such as User, Role, and Application.
You can [extend built-in models](/doc/{{page.lang}}/lb2/Extending-built-in-models.html) to suit your application's needs.  

Additionally, you can [define your own custom models](/doc/{{page.lang}}/lb2/Creating-models.html) specific to your application: 

* Use the [model generator](/doc/{{page.lang}}/lb2/Model-generator.html) to create custom models from scratch. 
  This creates a [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) that defines your model in LoopBack.
* Use [`Datasource.buildModelFromInstance()`](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-buildmodelfrominstance)
  to create _dynamic_ schema-less models for data sources such as SOAP and REST services.
  See [Creating models from unstructured data](/doc/{{page.lang}}/lb2/Creating-models-from-unstructured-data.html) for more information.
* For data sources backed by a relational database, a model typically corresponds to a table.
  Use [model discovery](/doc/{{page.lang}}/lb2/Discovering-models-from-relational-databases.html) to create_ static_, schema-driven models for database-backed data sources.
  See [Discovering models from relational databases](/doc/{{page.lang}}/lb2/Discovering-models-from-relational-databases.html) for more information.
