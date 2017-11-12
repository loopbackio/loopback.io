---
title: "HasMany relations"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/HasMany-relations.html
summary:
---

## Overview

A `hasMany` relation builds a one-to-many connection with another model. You'll often find this relation on the "other side" of a `belongsTo` relation.
This relation indicates that each instance of the model has zero or more instances of another model.
For example, in an application with customers and orders, a customer can have many orders, as illustrated in the diagram below.

{% include image.html file="9830481.png" alt="" %}

The target model, **Order**, has a property, **customerId**, as the foreign key to reference the declaring model (Customer) primary key **id**.

## Defining a hasMany relation

Use the [relation generator](Relation-generator.html)  to create a relation between two models.
The tool will prompt you to enter the name of the model, the name of related model, and other required information.
The tool will then modify the [model definition JSON file](Model-definition-JSON-file.html) (for example, `common/models/customer.json`) accordingly.

For example, here is the model JSON file for the customer model in [loopback-example-relations](https://github.com/strongloop/loopback-example-relations):

{% include code-caption.html content="common/models/customer.json" %}
```javascript
{
  "name": "Customer",
  "base": "PersistedModel",
  ...
  "relations": {
    "orders": {
      "type": "hasMany",
      "model": "Order",
      "foreignKey": "customerId",
      "primaryKey": "id" // optional
    },
  ...
```

Alternatively, you can define the relation in code, though in general this is not recommended:

{% include code-caption.html content="common/models/customer.js" %}
```javascript
Customer.hasMany(Review, {as: 'reviews', foreignKey: 'authorId'});
```

If not specified, LoopBack derives the relation name and foreign key as follows:

* **Relation name**: The plural form of the camel case of the model name; for example, for model name "Order" the relation name is "orders".
* **Foreign key**: The camel case of the declaring model name appended with `Id`, for example, for model name "Customer" the foreign key is "customerId".

## Methods added to the model

Once you define a "hasMany" relation, LoopBack adds a method with the relation name to the declaring model class's prototype automatically.
For example: `Customer.prototype.orders(...)`.

<table>
  <tbody>
    <tr>
      <th style="width: 400px;">Example method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>
        <pre>customer.orders([filter],
  function(err, orders) {<br>  ...<br>});</pre>
      </td>
      <td>Find orders for the customer, optionally using provided [filter](Querying-data.html)</td>
    </tr>
    <tr>
      <td>
        <pre>var order = customer.orders.build(data);</pre>
        <p>Or equivalently:</p>
        <pre>var order = new Order({customerId: customer.id, ...});</pre>
      </td>
      <td>Build a new order for the customer with the customerId to be set to the id of the customer. No persistence is involved.</td>
    </tr>
    <tr>
      <td>
        <pre>customer.orders.create(data,
  function(err, order) {<br>  ...<br>});</pre>
        <p>Or, equivalently:</p>
        <pre>Order.create({customerId: customer.id, ...},
  function(err, order) {<br>  ...<br>});</pre>
      </td>
      <td>Create a new order for the customer.</td>
    </tr>
    <tr>
      <td>
        <pre>customer.orders.destroyAll(function(err) {<br>  ...<br>});</pre>
      </td>
      <td>Remove all orders for the customer.</td>
    </tr>
    <tr>
      <td>
        <pre>customer.orders.findById(orderId,
  function(err, order) {<br>   ...<br>});</pre>
      </td>
      <td>Find an order by ID.</td>
    </tr>
    <tr>
      <td>
        <pre>customer.orders.destroy(orderId,
  function(err) {<br>  ...<br>});</pre>
      </td>
      <td>Delete an order by ID.</td>
    </tr>
  </tbody>
</table>
