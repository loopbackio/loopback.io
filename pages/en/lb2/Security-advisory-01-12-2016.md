---
title: "Security advisory 01-12-2016"
lang: en
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Security-advisory-01-12-2016.html
v2only: true
summary:
---

*   **Security risk**: Medium critical
*   **Vulnerability**: Hijacking Local Accounts

### Description

If a user creates a local account, then tries to log in with a third-party account (for example, Facebook, Twitter, Google, etc.) that uses the same email address, then the local account gets hijacked and taken over by the third-party account.

### Reported by

GitHub account jamesjjk

### Versions affected

loopback-component-passport 1.6.0 and earlier.

### Solution

Version 2.0.0 of loopback-component-passport fixes this issue.

Ensure that your application's `package.json` has the following line:

```js
"dependencies": {
   ...
   "loopback-component-passport": "^1.6.0",
   ...
 },
```

Then upgrade your project dependencies to use the latest version :

```
$ cd <app-root>
$ npm update
```

{% include warning.html content="
Be sure that you have updated to loopback-component-passport **version 2.0.0** or higher.
" %}
