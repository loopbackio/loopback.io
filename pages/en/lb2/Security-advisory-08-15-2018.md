---
title: "Security advisory 08-15-2018"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: security
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Security-advisory-08-15-2018.html
---

* **Security risk**: High (CVSS: 7.1)
* **Vulnerability**: `loopback-connector-mongodb` allows NoSQL Injections

### Description

MongoDB Connector for LoopBack fails to properly sanitize a filter passed to query the database by allowing the dangerous `$where` property to be passed to the MongoDB Driver. The Driver allows the special `$where` property in a filter to execute JavaScript (client can pass in a malicious script) on the database Driver. This is an [intended feature of MongoDB](https://docs.mongodb.com/manual/core/server-side-javascript/) unless [disabled (instructions here)](https://docs.mongodb.com/manual/core/server-side-javascript/#disable-server-side-js).

An example malicious query:
```
GET /POST filter={"where": {"$where": "function(){sleep(5000); return this.title.contains('Hello');}"}}
```

The above makes the database sleep for 5 seconds and then returns all "Posts" with the title containing the word `Hello`.

### The Fix

The connector now sanitizes all queries passed to the MongoDB Driver by default and deletes the `$where` and `mapReduce` properties. If you need to use these properties from within LoopBack programatically, you can disable the sanitization by passing in an `options` object with `disableSanitization` property set to `true`. 

**Example:**
```js
Post.find(
    {where: {$where: 'function() { /*dangerous function here*/}'}},
    {disableSanitization: true},
    (err, p) => {
        // code to handle results / error.
    }
);
```

### Reported by

[@NelsonBrandao](https://github.com/NelsonBrandao) via [GitHub Issue #403](https://github.com/strongloop/loopback-connector-mongodb/issues/403)

### Versions affected

`loopback-connector-mongodb` version 3.5.0 and below

### Solution

Upgrade to `loopback-connector-mongodb` 3.6.0 or later if your repository is using an outdated package.

Ensure that your application's `package.json` has the following line:

```js
"dependencies": {
   ...
   "loopback-connector-mongodb": "^3.6.0",
   ...
 },
```

Then upgrade your project dependencies to use the latest version :

```
$ cd <app-root>
$ npm update
```
