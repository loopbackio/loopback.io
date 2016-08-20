---
title: "package.json"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/package.json.html
summary:
---

The `package.json` file is the standard file for npm package management.
Use it to set up package dependencies, among other things. This file must be in the application root directory.

For more information, see the [package.json documentation](https://www.npmjs.org/doc/files/package.json.html).

For example:

```javascript
{
  "name": "myapp",
  "version": "1.0.0",
  "main": "server/server.js",
  "scripts": {
    "start": "node .",
    "pretest": "jshint ."
  },
  "dependencies": {
    "compression": "^1.0.3",
    "cors": "^2.5.2",
    "loopback": "^2.22.0",
    "loopback-boot": "^2.6.5",
    "loopback-component-explorer": "^2.1.0",
    "loopback-datasource-juggler": "^2.39.0",
    "serve-favicon": "^2.0.1"
  },
  "devDependencies": {
    "jshint": "^2.5.6"
  },
  "repository": {
    "type": "",
    "url": ""
  },
  "description": "myapp"
}
```