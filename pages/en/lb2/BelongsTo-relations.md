---
title: "BelongsTo relations"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/BelongsTo-relations.html
summary:
---

## Overview

A `belongsTo` relation sets up either a many-to-one or a one-to-one connection with another model.
In a many-to-one relationship each instance of the declaring model "belongs to" at most one instance of the other model,
while the target model can have many of the declaring model.

For example, consider an application with customers and orders:

* Each order can be placed by exactly one customer: "Order belongsTo (one) Customer".
* A customer may place many orders: "Customer hasMany Orders" .

This kind of `belongsTo` relation is the logical reflection of a `hasMany` relation.

{% include image.html file="9830480.png" alt="" %}

The declaring model (Order) has a foreign key property that references the primary key property of the target model (Customer).
If a primary key is not present, LoopBack will automatically add one.

Another kind of `belongsTo` relation is a one-to-one relationship, which is similar to many-to-one,
except that each instance of the owning model can have only one instance of the declaring model.

For example, consider an application that includes customers and addresses:

* Each address can be associated with exactly one customer: "Address belongsTo (one) Customer".
* A customer can have only one address: "Customer hasOne Address".

This kind of `belongsTo` relation is the logical reflection of a `hasOne` relation.

{% include image.html file="9830479.png" alt="" %}

## Defining a belongsTo relation

Use `apic loopback:relation` to create a relation between two models.
The tool will prompt you to enter the name of the model, the name of related model, and other required information.
The tool will then modify the [model definition JSON file](Model-definition-JSON-file.html) 
(for example, `common/models/customer.json`) accordingly.

Use `slc loopback:relation` to create a relation between two models.
The tool will prompt you to enter the name of the model, the name of related model, and other required information.
The tool will then modify the [model definition JSON file](Model-definition-JSON-file.html) 
(for example, `common/models/customer.json`) accordingly.

For more information, see [Relation generator](Relation-generator.html).

For example, here is the model JSON file for the order model in
[loopback-example-relations](https://github.com/strongloop/loopback-example-relations):

{% include code-caption.html content="common/models/order.json" %}
```javascript
{
  "name": "Order",
  "base": "PersistedModel",
  ...
  "relations": {
    "customer": {
      "type": "belongsTo",
      "model": "Customer",
      "foreignKey": ""
    }
  },
  ...
```

Alternatively, you can define a "belongsTo" relation in code, though in general this is not recommended:

{% include code-caption.html content="common/models/order.js" %}
```javascript
Order.belongsTo(Customer, {foreignKey: 'customerId'});
```

If the declaring model doesn't have a foreign key property, LoopBack will add a property with the same name.
The type of the property will be the same as the type of the target model's **id** property.

If you don't specify them, then LoopBack derives the relation name and foreign key as follows:

* Relation name: Camel case of the model name, for example, for the "Customer" model the relation is "customer".
* Foreign key: The relation name appended with `Id`, for example, for relation name "customer" the default foreign key is "customerId".

## Methods added to the model

Once you define the belongsTo relation, LoopBack automatically adds a method with the relation name to the declaring model class's prototype,
for example: `Order.prototype.customer(...)`.

Depending on the arguments, the method can be used to get or set the owning model instance.
The results of method calls are cached internally and available via later synchronous calls to the method. 

<table>
  <tbody>
    <tr>
      <th style="width: 400px;">Example method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>
        <pre>order.customer(function(err, customer) {<br>  ...<br>});</pre>
      </td>
      <td>Get the customer for the order asynchronously</td>
    </tr>
    <tr>
      <td>
        <pre>var customer = order.customer();</pre>
      </td>
      <td>
        <p>Synchronously get the results of a previous get call to <span>customer(...)</span></p>
      </td>
    </tr>
    <tr>
      <td>
        <pre>order.customer(customer);</pre>
      </td>
      <td>Set the customer for the order</td>
    </tr>
  </tbody>
</table>
