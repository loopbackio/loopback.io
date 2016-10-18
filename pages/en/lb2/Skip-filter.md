---
title: "Skip filter"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Skip-filter.html
summary:
---

A skip filter omits the specified number of returned records. This is useful, for example, to paginate responses.

Use `offset` as an alias for `skip`.

{% include content/angular-methods-caveat.html lang=page.lang %}

### REST API

`?filter=[skip]=n`

You can also use [stringified JSON format](Querying-data.html#using-stringified-json-in-rest-queries) in a REST query.

### Node

`{skip: n}`

Where _n_ is the number of records to skip.

### Examples

This REST request skips the first 50 records returned:

`/cars?filter[skip]=50`

The equivalent query using the Node API:

```javascript
Cars.find( {skip: 50},  function() { /* ... */ } )
```

**Pagination example**

The following REST requests illustrate how to paginate a query result.
Each request request returns ten records: the first returns the first ten, the second returns the 11th through the 20th, and so on...

```
/cars?filter[limit]=10&filter[skip]=0
/cars?filter[limit]=10&filter[skip]=10
/cars?filter[limit]=10&filter[skip]=20
...
```

Using the Node API:

```javascript
Cars.find({limit: 10, skip: 0},  function() { /* ... */ });
Cars.find({limit: 10, skip: 10}, function() { /* ... */ });
Cars.find({limit: 10, skip: 20}, function() { /* ... */ });
```
