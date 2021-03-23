---
title: "Security advisory 08-16-2016"
lang: en
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Security-advisory-08-16-2016.html
v2only: true
summary:
---

*   **Security risk**: Medium critical
*   **Vulnerability**: AccessToken not deleted even if user is deleted

### Description

If a user account is deleted while the user is logged in, then the accessToken does not get deleted. 

### Reported by

GitHub account bluestaralone

### Versions affected

loopback 2.29.1 and earlier

### Solution

Version 2.30.0 of loopback fixes this issue.

Ensure that your application's `package.json` has the following line:

```js
"dependencies": {
   ...
   "loopback": "^2.30.0",
   ...
 },
```

Then upgrade your project dependencies to use the latest version :

```
$ cd <app-root>
$ npm update
```
