---
title: "package.json"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/package.json.html
summary:
---

The `package.json` file is the standard file for npm package management.  Use it to set up package dependencies, among other things.  This file must be in the application root directory.

For more information, see the [package.json documentation](https://www.npmjs.org/doc/files/package.json.html).

{% include important.html content="

Your application `package.json` must have an \"name\" property to monitor the application with StrongOps.

" %}

For example:

```js
{
  "name": "loopback-example-app",
  "version": "0.0.0",
  "main": "server/server.js",
  "dependencies": {
    "compression": "^1.0.3",
    "errorhandler": "^1.1.1",
    "loopback": "~2.0.0-beta5",
    "loopback-boot": "2.0.0-beta2",
    "loopback-datasource-juggler": "~2.0.0-beta2",
    "function-rate-limit": "~0.0.1",
    "async": "~0.9.0",
    "loopback-connector-rest": "^1.1.4"
  },
  "optionalDependencies": {
    "loopback-explorer": "^1.1.0",
    "loopback-connector-mysql": "^1.2.1",
    "loopback-connector-mongodb": "^1.2.5",
    "loopback-connector-oracle": "^1.2.1"
  },
  "devDependencies": {
    "mocha": "^1.20.1",
    "supertest": "^0.13.0"
  },
  "scripts": {
    "test": "mocha -R spec server/test",
    "pretest": "jshint ."
  }
}
```
