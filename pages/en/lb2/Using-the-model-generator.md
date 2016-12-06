---
title: "Using the model generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Using-the-model-generator.html
summary:
---

{% include important.html content="If you already have a back-end schema (like a database), create models based on it using LoopBack's discovery feature.
See [Discovering models from relational databases](Discovering-models-from-relational-databases.html).
" %}

## Overview

The easiest way to create a new model is with the [model generator](Model-generator.html);
With IBM API Connect:

```shell
$ apic create --type model
```

Or with StrongLoop tools:

```shell
$ slc loopback:model
```

When creating a new model, the generator will prompt you for the properties in the model.
Subsequently, you can add more properties to it using the [property generator](Property-generator.html).

When you create a model (for example, called "myModel"), the tool:

* Creates `/common/models/myModel.json`, the [model definition JSON file](Model-definition-JSON-file.html).
* Creates `/common/models/myModel.js`, where you can extend the model programmatically.
  For example to add remote methods. See [Adding application logic](Adding-application-logic.html) for more information.
* Adds an entry to `/server/model-config.json` for the model, specifying the model's data source.
  See [model-config.json](model-config.json.html) for more information.

Once you've created your model, you may want to read:

* [Customizing models](Customizing-models.html)
* [Attaching models to data sources](Attaching-models-to-data-sources.html)
* [Exposing models over REST](Exposing-models-over-REST.html)

## Basic use

Use the LoopBack [model generator](Model-generator.html) to create a new model.
In your application root directory, enter the command (for example, to create a "books" model):

```shell
$ [ slc | apic ] loopback:property
```

Then the tool will prompt you to:

* Choose the data source to which the model will connect. By default, there will be only the in-memory data source (named "db").
  When you create additional data sources with apic create --type datasource,
  the [data source generator](Data-source-generator.html), they will be listed as options.

* Choose the model's base class, from a list of [built-in models](Using-built-in-models.html) classes and existing custom models in the application.

{% include note.html content="In general, use `PersistedModel` as the base model when you want to store your data in a database using a connector such as MySQL or MongoDB.
Use `Model` as the base for models that don't have CRUD semantics, for example, using connectors such as SOAP and REST.
" %}

* Choose whether to expose the model over REST; the default is yes. 
* Enter a custom plural form; the default is to use standard plural (for example, "books").
* Add properties to the model; for each property it will prompt you for:
  * Name of the property
  * Type of the property; see [LoopBack types](LoopBack-types.html).
    This sets the `type` property in the [model definition JSON file](Model-definition-JSON-file.html).
  * Whether the property is required. This sets the `required` property in the [model definition JSON file](Model-definition-JSON-file.html).

### Adding properties

After you create a model, you can add more properties with the [property generator](Property-generator.html).

```shell
$ [ slc | apic ] loopback:property
```

The tool will prompt you to choose the model to which you want to add the property, along with the other property settings (as before).
Then, it will modify the [model definition JSON file](Model-definition-JSON-file.html) accordingly.

### Adding default values

One way to set a default value for a property is to set the "default" property in the models JSON file.
You can also set the defaultFn property to set the default value to a globally-unique identifer (GUID) or the timestamp.

For more information, see the model JSON file 
[General property properties](Model-definition-JSON-file.html#general-property-properties) section.
