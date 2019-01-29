---
title: "Security advisory 03-10-2017"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: security
sidebar: security_sidebar
permalink: /doc/en/sec/Security-advisory-03-10-2017.html
---

- **Security risk**: Medium-high
- **Vulnerability**: `loopback-component-storage` to directory traversal attack

### Description

A security leak exposing `loopback-component-storage` to directory traversal attack. The component was exposed to a vulnerability where an attacker could use a command to retrieve the content of the `server.js` file of a LoopBack application and crash the server.

### Reported by

Juho Nurminen at 2NS - Second Nature Security Oy.

### Versions affected

loopback-component-storage 3.0.0 and earlier

### Solution

Upgrade to loopback-component-storage 3.0.1 or later.

Ensure that your application's `package.json` has the following line:

```js
"dependencies": {
   ...
  "loopback-component-storage": "^3.0.1",
   ...
 },
```

Then upgrade your project dependencies to use the latest version :

```
$ cd <app-root>
$ npm update
```
