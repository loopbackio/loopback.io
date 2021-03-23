---
title: "Security advisory 09-21-2017"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: security
sidebar: security_sidebar
permalink: /doc/en/sec/Security-advisory-09-21-2017.html
---

- **Security risk**: Medium
- **Vulnerability**: Remote Memory Exposure

### Description

Remote memory exposure in nano@6.3.0. Nano was using package `follow` that has
2 packages with reported node security vulnerability. Packages are:

- [request@2.55.0](https://nodesecurity.io/advisories/77)
- [hawk@2.3.1](https://nodesecurity.io/advisories/309)
  Our module `loopback-connector-couchdb2` use the affected versions. Also, `loopback-connector-cloudant` use `couchdb2` as a dependency so it could be affected as well.

### Reported by

github user `konrad-2013` on `apache\couchdb-nano` side.
Aidan Harbison on StrongLoop side

### Versions affected

nano@6.4..0 and earlier.

### Solution

Upgrade to nano 6.4.2 or later if your repository is using an outdated nano package.

Ensure that your application's `package.json` has the following line:

```js
"dependencies": {
   ...
   "nano": "^6.4.2",
   ...
 },
```

Then upgrade your project dependencies to use the latest version :

```
$ cd <app-root>
$ npm update
```
