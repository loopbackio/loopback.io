---
title: "Limit filter"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Limit-filter.html
summary:
---

A _limit_ filter limits the number of records returned to the specified number (or less).

{% include content/angular-methods-caveat.html lang=page.lang %}

### REST API

`filter[limit]=_n_`

You can also use [stringified JSON format](Querying-data.html#using-stringified-json-in-rest-queries) in a REST query.

### Node API

`{limit: _n_}`

Where _n_ is the maximum number of results (records) to return.

### Examples

Return only the first five query results:

**REST**

`/cars?filter[limit]=5`

{% include code-caption.html content="Node API" %}
```javascript
Cars.find({limit: 5},  function() {
    //...
})
```
