---
title: "middleware.development.json"
lang: ja
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/middleware.development.json.html
summary:
---

## Overview

Set up [middleware](Defining-middleware.html) in a development and debugging environment in `middleware.development.json`.
The application will use this file when NODE_ENV is set to `development`.
For more information, see [Environment-specific configuration](Environment-specific-configuration.html).

Here is the default version created by the [Application generator](Application-generator.html): 

```javascript
{
  "final:after": {
    "strong-error-handler": {
      "params": {
        "debug": true,
        "log": true
      }
    }
  }
}
```

For information on the properties you can set in this file, see [middleware.json](middleware.json.html).
