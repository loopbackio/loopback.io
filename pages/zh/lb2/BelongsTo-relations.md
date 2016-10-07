---
title: "BelongsTo relations"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/BelongsTo-relations.html
summary:
---

## Overview

A `belongsTo` relation sets up a one-to-one connection with another model, such that each instance of the declaring model "belongs to" one instance of the other model. For example, if your application includes customers and orders, and each order can be placed by exactly one customer.

{% include image.html file="9830480.png" alt="" %}

The declaring model (Order) has a foreign key property that references the primary key property of the target model (Customer). If a primary key is not present, LoopBack will automatically add one.

## Defining a belongsTo relation

Use `slc loopback:relation` to create a relation between two models.  You'll be prommpted to enter the name of the model, the name of related model, and other required information.  The tool will then modify the [Model definition JSON file](https://docs.strongloop.com/display/zh/Model+definition+JSON+file) (for example, `/common/models/customer.json`) accordingly.

For more information, see [Relation generator](https://docs.strongloop.com/display/zh/Relation+generator).

For example, here is the model JSON file for the order model in [loopback-example-relations-basic](https://github.com/strongloop/loopback-example-relations-basic):

**/common/models/model.json**

```js
{
  "name": "Order",
  "base": "PersistedModel",
  "properties": {
    "description": {
      "type": "string"
    },
    "total": {
      "type": "number"
    }
  },
  "validations": [],
  "relations": {
    "customer": {
      "type": "belongsTo",
      "model": "Customer",
      "foreignKey": ""
    }
  },
  ...
```

Alternatively, you can define a “belongsTo” relation in code, though in general this is not recommended:

**/common/models/model.js**

`User.belongsTo(Project, {foreignKey: ‘ownerId’});`

If the declaring model doesn’t have a foreign key property, LoopBack will add a property with the same name.  The type of the property will be the same as the type of the target model’s **id** property.

If you don’t specify them, then LoopBack derives the relation name and foreign key as follows:

*   Relation name: Camel case of the model name, for example, for the "Customer" model the relation is "customer".
*   Foreign key: The relation name appended with ‘Id’, for example, for relation name "customer" the default foreign key is "customerId".

## Methods added to the model

Once you define the belongsTo relation, LoopBack automatically adds a method with the relation name to the declaring model class’s prototype, for example: `Order.prototype.customer(...)`.

Depending on the arguments, the method can be used to get or set the owning model instance. The results of method calls are cached internally and available via later synchronous calls to the method. 

<table>
  <tbody>
    <tr>
      <th>Example method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><pre>order.customer(function(err, customer) {<br>  ...<br>});</pre></td>
      <td>Get the customer for the order asynchronously</td>
    </tr>
    <tr>
      <td><pre>var customer = order.customer();</pre></td>
      <td>
        <p>Synchronously get the results of a previous get call to <span>customer(...)</span></p>
      </td>
    </tr>
    <tr>
      <td><pre>order.customer(customer);</pre></td>
      <td>Set the customer for the order</td>
    </tr>
  </tbody>
</table>
