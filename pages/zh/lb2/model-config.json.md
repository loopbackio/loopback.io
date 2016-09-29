---
title: "model-config.json"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/model-config.json.html
summary:
---

## Overview

The file `/server/model-config.json` configures LoopBack models, for example it binds models to data sources and specifies whether a model is exposed over REST.  The models referenced in this file must be either a [built-in models](/doc/{{page.lang}}/lb2/Using-built-in-models.html) or custom models defined by a JSON file in the `common/models/` folder.  

{% include note.html content="

You can also use a `/client/model-config.json` for client-specific (browser) model configuration.

" %}

For example, here is the default `model-config.json` that lists all the built-in models:

**model-config.json**

```js
{
  "_meta": {
    "sources": [
      "../common/models",
      "./models"
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

## Model configuration properties

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
      <td>Array of relative paths to custom model definitions.</td>
    </tr>
    <tr>
      <td><em>model-name</em>.datasource</td>
      <td>String</td>
      <td>Name of data source to which the model is connected</td>
    </tr>
    <tr>
      <td><em>model-name</em>.public</td>
      <td>Boolean</td>
      <td>
        <p>If true, then the model is exposed over REST. Does not affect accessibility of Node API.</p>
      </td>
    </tr>
  </tbody>
</table>

### _meta.sources

By default, LoopBack applications load models from `/common/models` subdirectory. To specify a different location (or even multiple locations) use the  `_meta.sources` property, whose value is an array of directory paths.
