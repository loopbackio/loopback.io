---
title: "model-config.json"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/model-config.json.html
summary:
---

## Overview

The file `/server/model-config.json` configures LoopBack models, for example it binds models to data sources and specifies whether a model is exposed over REST.
The models referenced in this file must be either a [built-in models](Using-built-in-models.html) or custom models defined by a JSON file in the `common/models/` folder.

{% include note.html content="You can also use a `/client/model-config.json` for client-specific (browser) model configuration.
" %}

For example, here is the default `model-config.json` that lists all the built-in models:

{% include code-caption.html content="model-config.json" %}
```javascript
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "loopback/server/mixins",
      "../common/mixins",
      "./mixins"
    ]
  },
  "User": {
    "dataSource": "db"
  },
  "AccessToken": {
    "dataSource": "db",
    "public": false
  },
  "ACL": {
    "dataSource": "db",
    "public": false
  },
  "RoleMapping": {
    "dataSource": "db",
    "public": false
  },
  "Role": {
    "dataSource": "db",
    "public": false
  },
  "Message": {
    "dataSource": null
  }
}
```

## Top-level properties

<table>
  <thead>
    <tr>
      <th width="130">Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>&#95;meta.sources</td>
      <td>Array</td>
      <td>
        Array of relative paths to custom model definitions.
        By default, LoopBack applications load models from <code>/common/models</code> subdirectory.
          To specify a different location (or even multiple locations) use the  <code>&#95;meta.sources</code> property,
          whose value is an array of directory paths.

      </td>
    </tr>
    <tr>
      <td>&#95;meta.mixins</td>
      <td>Array</td>
      <td>Array of relative paths to custom mixin definitions. See <a href="Defining-mixins.html">Defining mixins</a> for more information.</td>
    </tr>
    <tr>
      <td><i>modelName</i></td>
      <td>String</td>
      <td>Name of a model, either a <a href="Using-built-in-models.html">built-in model</a> or a custom model defined in the <code>common/models/</code> folder.</td>
    </tr>
  </tbody>
</table>

### Model properties

Each JSON key is the name of a model and an object with the following properties.

<table>
  <thead>
    <tr>
      <th width="110">Property</th>
      <th width="70">Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>datasource</td>
      <td>String</td>
      <td>
        Name of the data source to which the model is connected. Must correspond to a data source defined in <a href="datasources.json.html">datasources.json</a>.
      </td>
    </tr>
    <tr>
      <td>public</td>
      <td>Boolean</td>
      <td>
        Whether the model API is exposed.
        If true, then the model is exposed over REST. Does not affect accessibility of Node API.
      </td>
    </tr>
  </tbody>
</table>
