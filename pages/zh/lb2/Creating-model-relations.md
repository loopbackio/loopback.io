---
title: "Creating model relations"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Creating-model-relations.html
summary:
---

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p>From Fabien: Normally,&nbsp;<code>properties</code>&nbsp;are transferred from parent to child, but there are cases<br>where it makes sense to do the opposite. This was the case with the advanced example, and to enable this, a new option:&nbsp;<code>invertProperties</code>&nbsp;was
    introduced.</p>
  <p><em>What's best place for this</em>?</p>
</div>

**Related articles**

<div class="panelContent" style="background-color: #CCE0CC;">

*   [Creating models](https://docs.strongloop.com/display/zh/Creating+models)
*   [Customizing models](https://docs.strongloop.com/display/zh/Customizing+models)
*   [Creating model relations](https://docs.strongloop.com/display/zh/Creating+model+relations)
*   [Querying data](https://docs.strongloop.com/display/zh/Querying+data)
*   [Model definition JSON file](https://docs.strongloop.com/display/zh/Model+definition+JSON+file)
*   [PersistedModel REST API](https://docs.strongloop.com/display/zh/PersistedModel+REST+API)

</div>

## Overview of model relations

Individual models are easy to understand and work with. But in reality, models are often connected or related.  When you build a real-world application with multiple models, you'll typically need to define _relations_ between models. For example:

*   A customer has many orders and each order is owned by a customer.
*   A user can be assigned to one or more roles and a role can have zero or more users.
*   A physician takes care of many patients through appointments. A patient can see many physicians too.

With connected models, LoopBack exposes as a set of APIs to interact with each of the model instances and query and filter the information based on the client’s needs.  

You can define the following relations between models:

*   [BelongsTo relations](/doc/{{page.lang}}/lb2/BelongsTo-relations.html)
*   [HasMany relations](/doc/{{page.lang}}/lb2/HasMany-relations.html)
*   [HasManyThrough relations](/doc/{{page.lang}}/lb2/HasManyThrough-relations.html)
*   [HasAndBelongsToMany relations](/doc/{{page.lang}}/lb2/HasAndBelongsToMany-relations.html)
*   [Polymorphic relations](/doc/{{page.lang}}/lb2/Polymorphic-relations.html)
*   [Embedded relations](/doc/{{page.lang}}/lb2/Embedded-models-and-relations.html) (embedsOne and embedsMany)

You can define models relations in JSON in the [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) file or in JavaScript code.  The end result is the same.

When you define a relation for a model, LoopBack adds a set of methods to the model, as detailed in the article on each type of relation.

## Relation options

There are three options for most relation types:

*   Scope
*   Properties
*   Custom scope methods

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>"Most"? Which ones DON'T they apply to?</div>

### Scope

The scope property can be an object or function, and applies to all filtering/conditions on the related scope.

The object or returned object (in case of the function call) can have all the usual filter options: `where`, `order`, `include`, `limit`, `offset`, ...

These options are merged into the default filter, which means that the `where` part will be `AND`-ed. The other options usually override the defaults (standard mergeQuery behavior).

When scope is a function, it will receive the current instance, as well as the default filter object.

For example:

```
// only allow products of type: 'shoe', always include products
Category.hasMany(Product, 
                 { as: 'shoes', 
                   scope: { where: { type: 'shoe' }, 
                   include: 'products'
});
Product.hasMany(Image, 
                { scope: function(inst, filter) {
                           return { type: inst.type }; 
                         }
});  // inst is a category - match category type with product type.
```

### Properties

You can specify the `properties` option in two ways:

*   As an object: the keys refer to the instance, the value will be the attribute key on the related model (mapping)
*   As a function: the resulting object (key/values) are merged into the related model directly.

For example, the following relation transfers the type to the product, and de-normalizes the category name into `categoryName` on creation:

```
Category.hasMany(Product, 
                 { as: 'shoes', 
                 properties: { type: 'type', category: 'categoryName' });
```

To accomplish the same thing with a callback function:

```js
Product.hasMany(Image,   {
  properties: function(inst) { // inst is a category
    return {
      type: inst.type,
      categoryName: inst.name
    };
  }
});
```

### Custom scope methods

Finally, you can add custom scope methods using the `scopeMethods` property.  Again, the option can be either an `object` or a `function` (advanced use).

{% include important.html content="

By default custom scope methods are not exposed as remote methods; You must set `functionName.shared = true`.

" %}

For example:

```js
var reorderFn = function(ids, cb) {
  // `this` refers to the RelationDefinition
  console.log(this.name); // `images` (relation name)
  // do some reordering here & save
  cb(null, [3, 2, 1]);
};

// manually declare remoting params
reorderFn.shared = true;
reorderFn.accepts = {
  arg: 'ids',
  type: 'array',
  http: {
    source: 'body'
  }
};
reorderFn.returns = {
  arg: 'ids',
  type: 'array',
  root: true
};
reorderFn.http = {
  verb: 'put',
  path: '/images/reorder'
};

Product.hasMany(Image, {
  scopeMethods: {
    reorder: reorderFn
  }
});
```

## Exposing REST APIs for related models

The following example demonstrates how to access connected models via REST APIs.

**/server/script.js**

```js
var db = loopback.createDataSource({
  connector: 'memory'
});
Customer = db.createModel('customer', {
  name: String,
  age: Number
});
Review = db.createModel('review', {
  product: String,
  star: Number
});
Order = db.createModel('order', {
  description: String,
  total: Number
});

Customer.scope("youngFolks", {
  where: {
    age: {
      lte: 22
    }
  }
});
Review.belongsTo(Customer, {
  foreignKey: 'authorId',
  as: 'author'
});
Customer.hasMany(Review, {
  foreignKey: 'authorId',
  as: 'reviews'
});
Customer.hasMany(Order, {
  foreignKey: 'customerId',
  as: 'orders'
});
Order.belongsTo(Customer, {
  foreignKey: 'customerId'
});
```

The code is available at [https://github.com/strongloop/loopback-example-relations-basic](https://github.com/strongloop/loopback-example-relations-basic).

If you run the example application, the REST API is available at [http://localhost:3000/api](http://localhost:3000/api).  The home page at [http://0.0.0.0:3000/](http://0.0.0.0:3000/) contains the links shown below.  Here are the example endpoints and queries:

<table>
  <tbody>
    <tr>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>/api/customers</td>
      <td>
        <p>List all customers</p>
      </td>
    </tr>
    <tr>
      <td>/api/customers?filter[fields][0]=name</td>
      <td>List all customers with the name property only</td>
    </tr>
    <tr>
      <td>/api/customers/1</td>
      <td>Return customer record for id of 1</td>
    </tr>
    <tr>
      <td>/api/customers/youngFolks</td>
      <td>List a predefined scope ‘youngFolks’</td>
    </tr>
    <tr>
      <td>/api/customers/1/reviews</td>
      <td>List all reviews posted by a given customer</td>
    </tr>
    <tr>
      <td>/api/customers/1/orders</td>
      <td>List all orders placed by a given customer</td>
    </tr>
    <tr>
      <td>/api/customers?filter[include]=reviews</td>
      <td>List all customers including their reviews</td>
    </tr>
    <tr>
      <td>/api/customers?filter[include][reviews]=author</td>
      <td>List all customers including their reviews which also includes the author</td>
    </tr>
    <tr>
      <td>/api/customers?filter[include][reviews]=author&amp;filter[where][age]=21</td>
      <td>List all customers whose age is 21, including their reviews which also includes the author</td>
    </tr>
    <tr>
      <td>/api/customers?filter[include][reviews]=author&amp;filter[limit]=2</td>
      <td>List first two customers including their reviews which also includes the author</td>
    </tr>
    <tr>
      <td>/api/customers?filter[include]=reviews&amp;filter[include]=orders</td>
      <td>List all customers including their reviews and orders</td>
    </tr>
  </tbody>
</table>
