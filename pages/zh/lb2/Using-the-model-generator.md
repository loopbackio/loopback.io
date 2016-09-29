---
title: "Using the model generator"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Using-the-model-generator.html
summary:
---

{% include important.html content="

If you already have a back-end schema (like a database), create models based on it using LoopBack's discovery feature. See [Discovering models from relational databases](/doc/{{page.lang}}/lb2/Discovering-models-from-relational-databases.html).

" %}

## Overview

The easiest way to create a new model is with `slc loopback:model`, the [model generator](/doc/{{page.lang}}/lb2/Model-generator.html).  When creating a new model, the generator will prompt you for the properties in the model.  Subsequently, you can add more properties to it using the [Property generator](/doc/{{page.lang}}/lb2/Property-generator.html).

When you create a model (for example, called "myModel"), the tool:

*   Creates `/common/models/myModel.json`, the [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html).
*   Creates `/common/models/myModel.js`, where you can extend the model programmatically; for example to add remote methods.  See [添加应用逻辑](/doc/{{page.lang}}/lb2/6095037.html) for more information.
*   Adds an entry to `/server/model-config.json` for the model, specifying the model's data source.  See [model-config.json](/doc/{{page.lang}}/lb2/model-config.json.html) for more information.

Once you've created your model, you may want to read:

*   [Customizing models](/doc/{{page.lang}}/lb2/Customizing-models.html)
*   [Attaching models to data sources](/doc/{{page.lang}}/lb2/Attaching-models-to-data-sources.html)
*   [Exposing models over REST](/doc/{{page.lang}}/lb2/Exposing-models-over-REST.html)

## Basic use

Use the LoopBack [model generator](/doc/{{page.lang}}/lb2/Model-generator.html) to create a new model.   In your application root directory, enter the command (for example, to create a "books" model):

`$ slc loopback:model book`

Then `slc` will prompt you to:

*   Choose the data source to which the model will connect.  By default, there will be only the in-memory data source (named "db").  When you create additional data sources with slc loopback:datasource, the [data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html), they will be listed as options.
*   Choose the model's base class, from a list of [built-in models](/doc/{{page.lang}}/lb2/Using-built-in-models.html) classes and existing custom models in the application.  

    {% include note.html content="

    In general, use `PersistedModel` as the base model when you want to store your data in a database using a connector such as MySQL or MongoDB.  Use `Model` as the base for models that don't have CRUD semantics, for example, using connectors such as SOAP and REST.

    " %}
*   Choose whether to expose the model over REST; the default is yes. 
*   Enter a custom plural form; the default is to use standard plural (for example, "books").
*   Add properties to the model; for each property it will prompt you for:
    *   Name of the property
    *   Type of the property; see [LoopBack types](/doc/{{page.lang}}/lb2/LoopBack-types.html).  This sets the `type` property in the [model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html).
    *   Whether the property is required.  This sets the `required` property in the [model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html).

## Adding properties

After you create a model, you can add more properties with the [property generator](/doc/{{page.lang}}/lb2/Property-generator.html).

`$ slc loopback:property`

Then `slc` will prompt you to choose the model to which you want to add the property, along with the other property settings (as before).  Then, `slc` will modify the [model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) accordingly.

### Adding default values

One way to set a default value for a property is to set the "default" property in the models JSON file.  See the [General property properties](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html#ModeldefinitionJSONfile-Generalpropertyproperties) section.
