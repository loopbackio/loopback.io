---
title: "Defining models"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Defining-models.html
summary:
---

{% include important.html content="

Prerequisites

*   [Install StrongLoop software](https://docs.strongloop.com/pages/viewpage.action?pageId=6095101).
*   Read [LoopBack 核心概念](https://docs.strongloop.com/pages/viewpage.action?pageId=6095111) first.
*   Follow [LoopBack初级教程](https://docs.strongloop.com/pages/viewpage.action?pageId=6095006) for a basic introduction to LoopBack.

" %}

A _LoopBack model_ represents data in backend systems such as databases, and by default has both Node and REST APIs.  Additionally, you can add functionality such as validation rules and business logic to models.

Every LoopBack application has a set of predefined [built-in models](/doc/{{page.lang}}/lb2/Using-built-in-models.html) such as User, Role, and Application.  You can [extend built-in models](/doc/{{page.lang}}/lb2/Extending-built-in-models.html) to suit your application's needs.   

Additionally, you can [define your own custom models](/doc/{{page.lang}}/lb2/Creating-models.html) specific to your application: 

*   Use the `slc loopback:model` [model generator](/doc/{{page.lang}}/lb2/Model-generator.html) to create cusom models from scratch.  See [Using the model generator](/doc/{{page.lang}}/lb2/Using-the-model-generator.html) for more information.
*   Use [`Datasource.buildModelFromInstance()`](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-buildmodelfrominstance) to create _dynamic_ schema-less models for data sources such as SOAP and REST services.  See [Creating models from unstructured data](/doc/{{page.lang}}/lb2/Creating-models-from-unstructured-data.html) for more information.
*   For data sources backed by a relational database, a model typically corresponds to a table.  Use [model discovery](/doc/{{page.lang}}/lb2/Discovering-models-from-relational-databases.html) to create_ static_, schema-driven models for database-backed data sources.   See [Discovering models from relational databases](/doc/{{page.lang}}/lb2/Discovering-models-from-relational-databases.html) for more information.
