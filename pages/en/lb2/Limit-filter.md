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

{% include warning.html content="

Methods of models in the [AngularJS client](https://docs.strongloop.com/display/APIC/AngularJS+JavaScript+SDK) have a different signature than those of the Node API.
For more information, see [AngularJS SDK API](http://apidocs.strongloop.com/loopback-sdk-angular/).

" %}

### REST API

`filter[limit]=_n_`

You can also use [stringified JSON format](/doc/en/lb2/Querying-data.html#Queryingdata-UsingstringifiedJSONinRESTqueries) in a REST query.

### Node API

`{limit: _n_}`

Where _n_ is the maximum number of results (records) to return.

### Examples

Return only the first five query results:

**REST**

`/cars?filter[limit]=5`

**Node API**

```javascript
Cars.find({limit: 5},  function() {
    //...
})
```