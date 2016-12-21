---
title: "Order filter"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Order-filter.html
summary:
---

An _order_ filter specifies how to sort the results: ascending (ASC) or descending (DESC) based on the specified property.

### REST API

Order by one property: 

`filter[order]=propertyName <ASC|DESC>`

Order by two or more properties:

`filter[order][0]=propertyName <ASC|DESC>&filter[order][1][propertyName]=<ASC|DESC>...`

You can also use [stringified JSON format](Querying-data.html#using-stringified-json-in-rest-queries) in a REST query.

{% include note.html content="
Default ordering can be configured in [default scope](Model-definition-JSON-file.html#default-scope).
" %}

### Node API

{% include content/angular-methods-caveat.html lang=page.lang %}

Order by one property:

`{ order: 'propertyName <ASC|DESC>' }`

Order by two or more properties:

`{ order: ['propertyName <ASC|DESC>', 'propertyName <ASC|DESC>',...] }`

Where:

* _propertyName_ is the name of the property (field) to sort by. 
* `<ASC|DESC>` signifies either ASC for ascending order or DESC for descending order.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p>I could not get multiple sort fields to work with REST. I would expect to be able to sort by (A,B) where it sorts by A and then by B:</p>
  <p><code>filter[order]=<em>propertyName</em> &lt;ASC|DESC&gt;,<em>propertyName</em> &lt;ASC|DESC&gt;, ...</code></p>
  <p>But for example</p>
  <p><a rel="nofollow">http://localhost:3000/api/cars?filter[order]=color%20ASC,id%20ASC</a></p>
  <p>Does not seem to be sorted in any order.</p>
  <p>Nor does <a rel="nofollow">http://localhost:3000/api/cars?filter[order][0]=color%20ASC[order][1]=make%20ASC</a></p>
  <p><u>rfeng: </u>filter[order][0]=color%20ASC&amp;filter[order][1]=make%20ASC should be used.</p>
  <p><strong>Also</strong>: Is there any way to sort numerical properties as numbers instead of string? For example, if I sort by ID the records are returned in this order: 1, 10, 100, 101, 102, ..., 11, 110, 111, ...</p>
</div>

### Examples

Return the three loudest three weapons, sorted by the `audibleRange` property:

**REST**

`/weapons?filter[order]=audibleRange%20DESC&filter[limit]=3`

{% include code-caption.html content="Node API" %}
```javascript
weapons.find({
  order: 'price DESC',
  limit: 3
});
```
