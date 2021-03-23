---
title: "Attaching models to data sources"
lang: en
layout: page
keywords: LoopBack, data sources, models
tags: [models, data_sources]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Attaching-models-to-data-sources.html
summary:
---
Models are connected to backend systems via data sources that use data source connectors.  You use the model APIs to interact with the model and the data source to which it is attached.

Best practice is to first add data sources to your app, as explained in [Defining data sources](Defining-data-sources.html).  Then, create models and attach them to the
data sources as desired.

When you create a new model with the [model generator](Model-generator.html),
you specify which data source to attach it to from among those you've added to the application and the default `db` data source (that uses the [memory connector](Memory-connector.html)).

For example:

```
$ lb model
? Enter the model name: myModel
? Select the data-source to attach myModel to: mysql (mysql)
? Select model's base class: PersistedModel
? Expose myModel via the REST API? Yes
? Custom plural form (used to build REST URL):
Let's add some myModel properties now.
...
```

Or with API Connect v5: 

```
$ apic create --type model
? Enter the model name: myModel
? Select the data-source to attach myModel to: mongoDS (mongodb)
? Select model's base class: PersistedModel
? Expose myModel via the REST API? Yes
? Custom plural form (used to build REST URL):
Let's add some test2 properties now.
...
```

When prompted for the data source to attach to, select a data source that you created previously or the default `db` data source that uses the [in-memory](Memory-connector.html) connector. 

```shell
? Enter the model name: myModel
? Select the data-source to attach myModel to:
  db (memory)
❯ mongoDS (mongodb)
  (no data-source)
```

To change the data source a model uses after you've created the model, edit the application's `server/model-config.json` and set the `dataSource` property for the model. For example, to make `myModel` use the `corp1` data source:

{% include code-caption.html content="server/model-config.json" %}
```javascript
"myModel": {
    "dataSource": "corp1",
    "public": true
  }
```

By default, the model generator attaches models to the `db` (in-memory) data source.
