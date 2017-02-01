---
title: "Security advisory 08-16a-2016"
lang: en
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Security-advisory-08-16a-2016.html
v2only: true
summary:
---

*   **Security risk**: Medium critical
*   **Vulnerability**: bcrypt has a maximum password length

### Description

The secret encryption key processes only up to the first 72 characters of the password. A password that contains 72 characters would be encrypted the same as another password of (73-_n_) characters if the first 72 are identical. 

### Reported by

Question on [http://security.stackexchange.com](http://security.stackexchange.com/).

### Versions affected

loopback 2.29.1 and earlier

### Solution

Password will be validated for new accounts and/or existing users who try to reset their password. A password that exceeds 72 characters will be rejected. 

LoopBack version 2.30.0 fixes this issue. Ensure that your application's package.json has the following line:

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
