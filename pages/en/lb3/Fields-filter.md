---
title: "Fields filter"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Fields-filter.html
summary:
---

A _fields_ filter specifies properties (fields) to include or exclude from the results.

### REST API

<pre>
filter[fields][<i>propertyName</i>]=<true|false>&filter[fields][<i>propertyName</i>]=<true|false>...
</pre>

Note that to include more than one field in REST, use multiple filters.

You can also use [stringified JSON format](Querying-data.html#using-stringified-json-in-rest-queries) in a REST query.

### Node API

{% include content/angular-methods-caveat.html lang=page.lang %}

<pre>
{ fields: {<i>propertyName</i>: <true|false>, <i>propertyName</i>: <true|false>, ... } }
</pre>

Where:

* _propertyName_ is the name of the property (field) to include or exclude.
* `<true|false>` signifies either `true` or `false` Boolean literal. Use `true` to include the property or `false` to exclude it from results.

By default, queries return all model properties in results. However, if you specify at least one fields filter with a value of `true`,
then by default the query will include **only** those you specifically include with filters.

### Examples

Return only `id`, `make`, and `model` properties:

**REST**

`?filter[fields][id]=true&filter[fields][make]=true&filter[fields][model]=true`

{% include code-caption.html content="Node API" %}
```javascript
{ fields: {id: true, make: true, model: true} }
```

Returns:

```javascript
[{
    "id": "1",
    "make": "Nissan",
    "model": "Titan"
  }, {
    "id": "2",
    "make": "Nissan",
    "model": "Avalon"
  },
  ...
]
```

Exclude the `vin` property:

**REST**

`?filter[fields][vin]=false`

{% include code-caption.html content="Node API" %}
```javascript
{ fields: {vin: false} }
```
