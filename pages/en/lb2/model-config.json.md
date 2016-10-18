---
title: "model-config.json"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/model-config.json.html
summary:
---

## Overview

The file `/server/model-config.json` configures LoopBack models, for example it binds models to data sources and specifies whether a model is exposed over REST.
The models referenced in this file must be either a [built-in models](Using-built-in-models.html) or custom models defined by a JSON file in the `common/models/` folder.

{% include note.html content="

You can also use a `/client/model-config.json` for client-specific (browser) model configuration.

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
  }
}
```

## Top-level properties

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>_meta.sources</td>
      <td>Array</td>
      <td>
        <p>Array of relative paths to custom model definitions.</p>
        <p><span>By default, LoopBack applications load models from&nbsp;</span><code>/common/models</code><span>&nbsp;subdirectory.
          To specify a different location (or even multiple locations) use the &nbsp;</span><code>_meta.sources</code><span>&nbsp;property,
          whose value is an array of directory paths.</span>
        </p>
      </td>
    </tr>
    <tr>
      <td>_meta.mixins</td>
      <td>Array</td>
      <td>Array of <span>relative paths to custom mixin definitions. See <a href="Defining-mixins.html">Defining mixins</a> for more information.</span></td>
    </tr>
    <tr>
      <td>modelName</td>
      <td>String</td>
      <td><span>Name of a model, either a&nbsp;</span><a href="Using-built-in-models.html">built-in model</a><span>&nbsp;or a custom model defined in the&nbsp;</span><code>common/models/</code><span>&nbsp;folder.</span></td>
    </tr>
  </tbody>
</table>

### Model properties

Each JSON key is the name of a model and an object with the following properties.

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>datasource</td>
      <td>String</td>
      <td>
        <p>Name of the data source to which the model is connected. Must correspond to a data source defined in <a href="datasources.json.html">datasources.json</a>.</p>
      </td>
    </tr>
    <tr>
      <td>public</td>
      <td>Boolean</td>
      <td>
        <p>Whether the model API is exposed.</p>
        <p><span>If true, then the model is exposed over REST. Does not affect accessibility of Node API.</span></p>
      </td>
    </tr>
  </tbody>
</table>
