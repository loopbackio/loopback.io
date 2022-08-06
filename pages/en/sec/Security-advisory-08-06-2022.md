---
title: 'Security advisory 11-30-2020 (LBSEC-20220806-1)'
lang: en
layout: page
toc: false
keywords: LoopBack
tags: security
sidebar: security_sidebar
permalink: /doc/en/sec/Security-advisory-08-06-2022.html
---

- **Security risk**: Critical (CVSS: 9.3), CVE issuance in progress.
- **Vulnerability**: Improper input validation on the contains LoopBack filter may allow for arbitrary SQL injection.

### Description

When the extended filter property `contains` is permitted to be interpreted by the Postgres connector, it is possible to inject arbitrary SQL which may affect the confidentiality and integrity of data stored on the connected database.

This affects users who does any of the following:

- Connect to the database via the DataSource with `allowExtendedProperties: true` setting OR
- Uses the connector's CRUD methods directly OR
- Uses the connector's other methods to interpret the LoopBack filter.

### The Fix

Proper input sanitisation of the `contains` filter was added.

### Workaround

Users who are unable to upgrade should do the following if applicable:

- Remove `allowExtendedProperties: true` DataSource setting
- Add `allowExtendedProperties: false` DataSource setting
- When passing directly to the connector functions, manually sanitize the user input for the `contains` LoopBack filter beforehand.

### Reported by

- Matthew Gabeler-Lee (6 River Systems)

### Versions affected

`loopback-connector-postgresql@5.5.0` and below.

### Solution

Upgrade to `loopback-connector-postgresql` 5.5.1 or later.

Ensure that your application's `package.json` has the following line.

```json
"dependencies": {
   ...
   "loopback-connector-postgresql": "^5.5.1",
   ...
 },
```

