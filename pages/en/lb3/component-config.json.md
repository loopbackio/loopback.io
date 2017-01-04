---
title: "component-config.json"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/component-config.json.html
summary:
---

The file `component-config.json` configures and loads [components](LoopBack-components.html) of a LoopBack application. The file contains a top-level key for each component to load, where the key is the module name of a npm package or the relative path of a local component. For a component to be loaded, the value must be a JavaScript object that does not evaluate to false.

The default file that the [Application generator](Application-generator.html) creates is:

```javascript
{
  "loopback-component-explorer": {
    "mountPath": "/explorer"
  }
}
```

When configuring a local component, the `.js` extension is optional.
Following is an example of a `component-config.json` file that loads a component installed using npm, and two local components.

```javascript
{
  "loopback-component-explorer": {
    "mountPath": "/explorer"
  },
  "./components/my-component.js": {
    "path": "/my-component"
  },
  "./components/new-component": "myApp"
}
```

As seen in the above example, the configuration properties of components depend on the individual components. Refer to the component's documentation for details.
