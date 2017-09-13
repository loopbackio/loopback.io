---
title: "Creating model relations"
lang: en
layout: navgroup
navgroup: models
keywords: LoopBack
tags: models
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Creating-model-relations.html
summary: Relations enable you to specify how models are related to each other, with "BelongsTo,"  "HasOne", and "HasMany" relations, among others.
---

## Overview of model relations

Individual models are easy to understand and work with. But in reality, models are often connected or related.
When you build a real-world application with multiple models, you'll typically need to define _relations_ between models. For example:

* A customer has many orders and each order is owned by a customer.
* A user can be assigned to one or more roles and a role can have zero or more users.
* A physician takes care of many patients through appointments. A patient can see many physicians too.

With connected models, LoopBack exposes as a set of APIs to interact with each of the model instances and query and filter the information based on the client's needs.

You can define the following relations between models:

* [BelongsTo relations](BelongsTo-relations.html)
* [HasOne relations](HasOne-relations.html)
* [HasMany relations](HasMany-relations.html)
* [HasManyThrough relations](HasManyThrough-relations.html)
* [HasAndBelongsToMany relations](HasAndBelongsToMany-relations.html)
* [Polymorphic relations](Polymorphic-relations.html)
* [Embedded relations](Embedded-models-and-relations.html) (embedsOne and embedsMany)

You can define models relations in JSON in the [model definition JSON file](Model-definition-JSON-file.html) file or in JavaScript code.
The end result is the same.

When you define a relation for a model, LoopBack adds a set of methods to the model, as detailed in the article on each type of relation.

{% include note.html content="It's important to understand that all models inherit from the
[Model class](https://apidocs.loopback.io/loopback/#model) and they can have relations between them regardless of the specific type of model or the backing data source.
Models backed by different data sources can have relations between them.
" %}

## Using the relation generator

The easiest way to create a new relation between existing models is to use the 
[relation generator](Relation-generator.html).

The tool will prompt you to enter the type of relation (belongsTo, hasMany, and so on) and the affected models.

{% include important.html content="

The name of the relation must be different than a property it references.

" %}

## Relation options

There are three options for most relation types:

* Scope
* Properties
* Custom scope methods

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>"Most"? Which ones DON'T they apply to?</div>

### Scope

The scope property can be an object or function, and applies to all filtering/conditions on the related scope.

The object or returned object (in case of the function call) can have all the usual filter options: `where`, `order`, `include`, `limit`, `offset`, ...

These options are merged into the default filter, which means that the `where` part will be `AND`-ed.
The other options usually override the defaults (standard mergeQuery behavior).

When scope is a function, it will receive the current instance, as well as the default filter object.

For example:

```javascript
// only allow products of type: 'shoe', always include products
Category.hasMany(Product, {
    as: 'shoes', 
    scope: {
        where: { type: 'shoe' }, 
        include: 'products'
    }
});
Product.hasMany(Image, {
    scope: function(inst, filter) {
        return { type: inst.type }; 
    }
});  // inst is a category - match category type with product type.
```

### Properties

You can specify the `properties` option in two ways:

* As an object: the keys refer to the instance, the value will be the attribute key on the related model (mapping)
* As a function: the resulting object (key/values) are merged into the related model directly.

For example, the following relation transfers the type to the product, and de-normalizes the category name into `categoryName` on creation:

```javascript
Category.hasMany(Product, {
    as: 'shoes', 
    properties: {
        type: 'type',
        category: 'categoryName'
    }
});
```

To accomplish the same thing with a callback function:

```javascript
Product.hasMany(Image, {
    properties: function(inst) { // inst is a category
        return {type: inst.type, categoryName: inst.name};
  }
});
```

### invertProperties

Normally, `properties` are transferred from parent to child, but there are cases where it makes sense to do the opposite.
To enable this, use the `invertProperties` option.
See an example in [Embedded models (embed with belongsTo)](Embedded-models-and-relations.html).

### Custom scope methods

Finally, you can add custom scope methods using the `scopeMethods` property. Again, the option can be either an `object` or a `function` (advanced use).

{% include important.html content="

By default custom scope methods are not exposed as remote methods; You must set `functionName.shared = true`.

" %}

For example:

```javascript
var reorderFn = function(ids, cb) {
  console.log(this.name); // `this` refers to the RelationDefinition  - `images` (relation name) 
  // Do some reordering here & save cb(null, [3, 2, 1]); }; 
  // Manually declare remoting params 
  reorderFn.shared = true; 
  reorderFn.accepts = { arg: 'ids', type: 'array', http: { source: 'body' } }; 
  reorderFn.returns = { arg: 'ids', type: 'array', root: true }; 
  reorderFn.http = { verb: 'put', path: '/images/reorder' }; 
  Product.hasMany(Image, { scopeMethods: { reorder: reorderFn } });
}
```

## Exposing REST APIs for related models

The following example demonstrates how to access connected models via REST APIs.

{% include code-caption.html content="/server/script.js" %}
```javascript
var db = loopback.createDataSource({connector: 'memory'});
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

  Customer.scope("youngFolks", {where: {age: {lte: 22}}});
  Review.belongsTo(Customer, {foreignKey: 'authorId', as: 'author'});
  Customer.hasMany(Review, {foreignKey: 'authorId', as: 'reviews'});
  Customer.hasMany(Order, {foreignKey: 'customerId', as: 'orders'});
  Order.belongsTo(Customer, {foreignKey: 'customerId'});
```
