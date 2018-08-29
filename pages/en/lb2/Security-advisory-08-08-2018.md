---
title: "Security advisory 08-08-2018"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: security
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Security-advisory-08-08-2018.html
---

* **Security risk**: High (CVSS: 7.7)
* **Vulnerability**: AccessToken API (if exposed) allows anyone to create a Token

### Description

LoopBack provides a built-in `User` management / authentication and authorization solution. As part of this solution, a User must have an `AccessToken` to authenticate themselves against APIs requiring authentication / authorization for data access.

By default the `AccessToken` Model is not exposed over a REST API but this configuration can be changed by a user in `model-config.json` by changing the `public` property to `true` or removing it (defaults to true if missing). Unless this API is exposed, a user is not vulnerable.

If the `AccessToken` Model is exposed over a REST API, it is then possible for anyone to create an `AccessToken` for any `User` provided they know the `userId` and can hence get access to the other user's data / access to their privileges (if the user happens to be an Admin for example).

### Reported by

[@zbarbutos](https://github.com/zbarbuto) via Gitter

### Versions affected

loopback version 2.39.2 and below

### Solution

Upgrade to loopback 2.40.0 or later if your repository is using an outdated loopback package.

Ensure that your application's `package.json` has the following line:

```js
"dependencies": {
   ...
   "loopback": "^2.40.0",
   ...
 },
```

Then upgrade your project dependencies to use the latest version :

```
$ cd <app-root>
$ npm update
```
