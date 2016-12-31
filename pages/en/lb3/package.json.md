---
title: "package.json"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/package.json.html
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
    "lint": "eslint .",
    "start": "node .",
    "posttest": "npm run lint && nsp check"
  },
  "dependencies": {
    "compression": "^1.0.3",
    "cors": "^2.5.2",
    "helmet": "^1.3.0",
    "loopback-boot": "^2.6.5",
    "serve-favicon": "^2.0.1",
    "strong-error-handler": "^1.0.1",
    "loopback-component-explorer": "^4.0.0",
    "loopback": "^3.0.0"
  },
  "devDependencies": {
    "eslint": "^2.13.1",
    "eslint-config-loopback": "^4.0.0",
    "nsp": "^2.1.0"
  },
  "repository": {
    "type": "",
    "url": ""
  },
  "license": "UNLICENSED",
  "description": "myapp"
}
```
