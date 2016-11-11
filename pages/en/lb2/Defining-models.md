---
title: "Defining models"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: models
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Defining-models.html
summary: Models are at the heart of LoopBack, and represent back-end data sources such as databases or other back-end services (REST, SOAP, and so on).
---

{% include content/gs-prereqs.html lang=page.lang %}

A _LoopBack model_ represents data in backend systems such as databases, and by default has both Node and REST APIs.
Additionally, you can add functionality such as validation rules and business logic to models.

Every LoopBack application has a set of predefined [built-in models](Using-built-in-models.html) such as User, Role, and Application.
You can [extend built-in models](Extending-built-in-models.html) to suit your application's needs.  

Additionally, you can [define your own custom models](Creating-models.html) specific to your application: 

* Use the [model generator](Model-generator.html) to create custom models from scratch. 
  This creates a [Model definition JSON file](Model-definition-JSON-file.html) that defines your model in LoopBack.
* Use [`Datasource.buildModelFromInstance()`](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-buildmodelfrominstance)
  to create _dynamic_ schema-less models for data sources such as SOAP and REST services.
  See [Creating models from unstructured data](Creating-models-from-unstructured-data.html) for more information.
* For data sources backed by a relational database, a model typically corresponds to a table.
  Use [model discovery](Discovering-models-from-relational-databases.html) to create _static_, schema-driven models for database-backed data sources.
  See [Discovering models from relational databases](Discovering-models-from-relational-databases.html) for more information.
