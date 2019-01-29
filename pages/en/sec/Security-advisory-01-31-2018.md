---
title: "Security advisory 01-31-2018"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: security
sidebar: security_sidebar
permalink: /doc/en/sec/Security-advisory-01-31-2018.html
---

- **Security risk**: Medium (CVSS: 4.3)
- **Vulnerability**: Prevent unauthorized alteration of records on same table

### Description

In a Many-to-Many relationship, it was possible for an authenticated user to edit the foreign keys of records to transfer ownership.

Example:
A Physician has many appointments with many patients.
Physician 1 can create an appointment with Patient 1 via a POST as expected.
Physician 1 can then update the intermediate record and change the FK of
phyisicianId to that of a different physician via a PUT request.

Physician 1 will no longer be able to access the record but Physician 2
now has an appointment that wasn't created by that physician.

### Reported by

Josh West & Zach Metcalf of Super Humane via Email.

### Versions affected

loopback-datasource-juggler version 3.14.0 and below
** This is a default dependency of `loopback`.**

### Solution

Upgrade to loopback 3.18.1 or later if your repository is using an outdated loopback package.

Ensure that your application's `package.json` has the following line:

```js
"dependencies": {
   ...
   "loopback": "^3.18.1",
   ...
 },
```

Then upgrade your project dependencies to use the latest version :

```
$ cd <app-root>
$ npm update
```
