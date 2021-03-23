---
title: "Security advisory 06-17-2019"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: security
sidebar: security_sidebar
permalink: /doc/en/sec/Security-advisory-06-17-2019.html
---

- **Security risk**: Medium (CVSS: 5.3)
- **Vulnerability**: `loopback@2.x` or `loopback@3.x` allows logging into a user account by trying weak passwords without knowing the exact username/email.

### Description

The built-in `User` model's `login` method allows search criteria objects to be passed as values for its `email`, `username`, and `realm` parameters.
Using conditional properties like `neq` and `regexp`, an unspecific but valid username or email can be used for trying the weak password.

For example, if the hacker guesses there are some users in the system have a weak password 'x', this query:

```js
User.login({username: {'regexp': '^ap'}, password: 'x'});
```

will set the username to the first user whose username starts with `ap`, against whose account the password-guessing attack can be performed.

### The Fix

`User.login` does not accept objects as parameters anymore. `email`, `username`, and `realm` values must be strings, else
a 400 Bad Request error is returned.

### Reported by

[@gabjauf](https://github.com/gabjauf) via [GitHub Issue #4195](https://github.com/strongloop/loopback/issues/4195)

### Versions affected

`loopback` 3 version 3.25.0 and below, `loopback` 2 version 2.41.0 and below.

### Solution

For LoopBack 3 users: upgrade to `loopback` 3.26.0 or later if your repository is using an outdated package.

For LoopBack 2 users: upgrade to `loopback` 2.42.0 or later.

Ensure that your application's `package.json` has the following line.

LoopBack 3 app:

```js
"dependencies": {
   ...
   "loopback": "^3.26.0",
   ...
 },
```

LoopBack 2 app:

```js
"dependencies": {
   ...
   "loopback": "^2.42.0",
   ...
 },
 ```

Then upgrade your project dependencies to use the latest version:

```
$ cd <app-root>
$ npm update
```
