---
title: "Executing native SQL"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Executing-native-SQL.html
summary:
---
<br/>
{% include warning.html content="This feature has not been fully tested and is not officially supported: the API may change in future releases.

In general, it is always better to perform database actions through connected models.
Directly executing SQL may lead to unexpected results, corrupted data, and other issues.
" %}

To execute SQL directly against your data-connected model, use the following:

<pre>
dataSource.connector.execute(<i>sql_stmt</i>, <i>params</i>, <i>callback</i>);
</pre>

or

<pre>
dataSource.connector.query(<i>sql_stmt</i>, <i>params</i>, <i>callback</i>); // For 1.x connectors
</pre>

Where:

* _sql_stmt_ - The SQL string.
* _params_ - parameters to the SQL statement.
* _callback_ - callback function

{% include important.html content="
The actual method signature depends on the specific connector being used. See connector source code.  For example, [loopback-connector-mysql](https://github.com/strongloop/loopback-connector-mysql/blob/master/lib/mysql.js#L130).

Use caution and be advised that the API may change in the future.
" %}
