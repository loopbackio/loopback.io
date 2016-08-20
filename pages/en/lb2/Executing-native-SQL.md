---
title: "Executing native SQL"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Executing-native-SQL.html
summary:
---

{% include warning.html content="

This feature has not been fully tested and is not officially supported: the API may change in future releases.

In general, it is always better to perform database actions through connected models.
Directly executing SQL may lead to unexpected results, corrupted data, and other issues.

" %}

To execute SQL directly against your data-connected model, use the following:

```javascript
dataSource.connector.execute(_sql_, _params_, _cb_);
```

or

```javascript
dataSource.connector.query(_sql_, _params_, _cb_); // For 1.x connectors
```

Where:

* _sql_ - The SQL string.
* _params_ - parameters to the SQL statement.
* _cb_ - callback function

{% include important.html content="

The actual method signature depends on the specific connector being used. See connector source code.
For example, [loopback-connector-mysql](https://github.com/strongloop/loopback-connector-mysql/blob/master/lib/mysql.js#L130).

Use caution and be advised that the API may change in the future.

" %}