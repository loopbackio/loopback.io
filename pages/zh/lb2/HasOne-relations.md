---
title: "HasOne relations"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/HasOne-relations.html
summary:
---

{% include warning.html content="

This article is currently incomplete and in-progress. See [LoopBack issue #718](https://github.com/strongloop/loopback/issues/718).

" %}

## Overview

A `hasOne` relation sets up a one-to-one connection with another model, such that each instance of the declaring model "has one" one instance of the other model. 

{% include note.html content="

Example TBD

" %}

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p>Add: example and description of foreign/primary keys, etc.</p>
  <p>How is <strong>hasOne</strong> different than <strong>belongsTo</strong> ?</p>
  <p>See <a href="https://groups.google.com/forum/#!topic/loopbackjs/raza2iRvVns" class="external-link" rel="nofollow">https://groups.google.com/forum/#!topic/loopbackjs/raza2iRvVns</a></p>
</div>

## Defining a hasOne relation

Use `slc loopback:relation` to create a relation between two models.  You'll be prommpted to enter the name of the model, the name of related model, and other required information.  The tool will then modify the [Model definition JSON file](https://docs.strongloop.com/display/zh/Model+definition+JSON+file) (for example, `/common/models/customer.json`) accordingly.

For more information, see [Relation generator](https://docs.strongloop.com/display/zh/Relation+generator).

For example:

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Fix example below to correspond to example given above.</div>

**/common/models/model.json**

```js
"foos": {
      "type": "hasOne",
      "model": "bar",
      "foreignKey": "baz"
    }
    ...
```

Alternatively, you can define a “hasOne” relation in code, though in general this is not recommended:

**/common/models/model.js**

`User.belongsTo(Project, {foreignKey: ‘ownerId’});`

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Is below true for hasOne?</div>

If the declaring model doesn’t have a foreign key property, LoopBack will add a property with the same name.  The type of the property will be the same as the type of the target model’s **id** property.

If you don’t specify them, then LoopBack derives the relation name and foreign key as follows:

*   Relation name: Camel case of the model name, for example, for the "Customer" model the relation is "customer".
*   Foreign key: The relation name appended with ‘Id’, for example, for relation name "customer" the default foreign key is "customerId".

## Methods added to the model

Once you define the hasOne relation, LoopBack automatically adds a method with the relation name to the declaring model class’s prototype, for example: `Order.prototype.customer(...)`.

Depending on the arguments, the method can be used to get or set the owning model instance.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Fill in table below.</div>

<table>
  <tbody>
    <tr>
      <th>Example method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><pre>&nbsp;</pre></td>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>
