---
title: "Security advisory 10-24-2017"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: security
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Security-advisory-10-24-2017.html
---
*   **Security risk**: Medium
*   **Vulnerability**: Multi User Password Reset Exploit

### Description

When multiple User models were deployed it was possible for a `resetToken` for `UserA` to be used to reset the password for `UserB` or vice-versa.

See [issue](https://github.com/strongloop/loopback/issues/3577) for more details.

### Reported by

GitHub user [sebastianfelipe](https://github.com/sebastianfelipe) via [Issue #3577](https://github.com/strongloop/loopback/issues/3577).

### Versions affected

loopback < 3.16.0 >= 3.3.0

### Solution

Upgrade to loopback 3.16.0 or later if your repository is using an outdated loopback package.

Ensure that your application's `package.json` has the following line:

```js
"dependencies": {
   ...
   "loopback": "^3.16.0",
   ...
 },
```

Then upgrade your project dependencies to use the latest version :

```
$ cd <app-root>
$ npm update
```
