---
title: "Include filter"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Include-filter.html
summary:
---

**See also**: [Querying related models](Querying-related-models.html).

An _include_ filter enables you to include results from related models in a query, for example models that have belongsTo or hasMany relations, to optimize the number of requests.
See [Creating model relations](Creating-model-relations.html) for more information.

The value of the include filter can be a string, an array, or an object.

{% include important.html content="You can use an _include_ filter with `find(),` `findOne()` and `findById()`.
" %}

### **REST API**

filter[include][_relatedModel_]=_propertyName_
You can also use [stringified JSON format](Querying-data.html#using-stringified-json-in-rest-queries) in a REST query.

### Node API

{% include content/angular-methods-caveat.html lang=page.lang %}

```javascript
{include: 'relatedModel'}
{include: ['relatedModel1', 'relatedModel2', ...]}
{include: {relatedModel1: [{relatedModel2: 'relationName'} , 'relatedModel']}}
```

Where:

* _relatedModel_, _relatedModel1_, and _relatedModel2_ are the names (pluralized) of related models.
* _relationName_ is the name of a relation in the related model.

### Examples

Include relations without filtering:

```javascript
User.find({include: 'posts'}, function() { /* ... */ });
```

Return all user posts and orders with two additional requests:

```javascript
User.find({include: ['posts', 'orders']}, function() { /* ... */ });
```

Return all post owners (users), and all orders of each owner:

```javascript
Post.find({include: {owner: 'orders'}}, function() { /* ... */ });
```

Return all post owners (users), and all friends and orders of each owner:

```javascript
Post.find({include: {owner: ['friends', 'orders']}}, function() { /* ... */ });
```

Return all post owners (users), and all posts and orders of each owner. The posts also include images.

```javascript
Post.find({include: {owner: [{posts: 'images'} , 'orders']}}, function() { /* ... */ });
```

#### Combined use of `fields` and `include` for a `belongsTo` relation

If you want to use both `include` and `fields` to display only specific fields of a model and a specific belongsTo relation, you need to add the relation foreign key in the `fields` :

Return all posts only with field title and the relation category:
```javascript
Post.find({include: 'category', fields: ['title', 'categoryId']}, function() { /* ... */ });
```

#### Include with filters

In some cases, you may want to apply filters to related models to be included.

{% include note.html content="

When you apply filters to related models, the query returns results from the first model plus any results from related models with the filter query,
similar to a \"left join\" in SQL.

" %}

LoopBack supports that with the following syntax (for example):

```javascript
Post.find({
  include: {
    relation: 'owner', // include the owner object
    scope: { // further filter the owner object
      fields: ['username', 'email'], // only show two fields
      include: { // include orders for the owner
        relation: 'orders', 
        scope: {
          where: {orderId: 5} // only select order with id 5
        }
      }
    }
  }
}, function() { /* ... */ });
```

For real-world scenarios where only users in `$authenticated` or `$owner` roles should have access, use `findById()`.
For example, the following example uses filters to perform pagination:

```javascript
Post.findById('123', {
  include: {
    relation: 'orders',
    scope: { // fetch 1st "page" with 5 entries in it
      skip:0,
      limit:5
    }
  }
}, function() { /* ... */ });
```

#### Access included objects

In the Node.js API, call `toJSON()` to convert the returned model instance with related items into a plain JSON object. For example:

```javascript
Post.find({include: {owner: [{posts: 'images'} , 'orders']}}, function(err, posts) {
 posts.forEach(function(post) {
   // post.owner points to the relation method instead of the owner instance
   var p = post.toJSON();
   console.log(p.owner.posts, p.owner.orders);
 });
 //... 
});
```

Note the relation properties such as `post.owner` reference a JavaScript **function** for the relation method.

#### REST examples

These examples assume a customer model with a hasMany relationship to a reviews model. 

Return all customers including their reviews:

`/customers?filter[include]=reviews`

Return all customers including their reviews which also includes the author:

`/customers?filter[include][reviews]=author`

Return all customers whose age is 21, including their reviews which also includes the author:

`/customers?filter[include][reviews]=author&filter[where][age]=21`

Return first two customers including their reviews which also includes the author

`/customers?filter[include][reviews]=author&filter[limit]=2`

Return all customers including their reviews and orders

`/customers?filter[include]=reviews&filter[include]=orders`
