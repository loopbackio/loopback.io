---
title: "Querying related models"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Querying-related-models.html
summary:
---

**See also**: [Relation REST API](Relation-REST-API.html).

## Overview

A relation defines the connection between two models by connecting a foreign key property to a primary key property.
For each relation type, LoopBack automatically mixes in helper methods to the model class to help navigate and associate the model instances to load or build a data graph.

Often, client applications want to select relevant data from the graph, for example to get user information and recently-placed orders.
LoopBack provides a few ways to express such requirements in queries.

The [LoopBack Relations example](https://github.com/strongloop/loopback-example-relations) application provides some examples.
For general information on queries, see [Querying data](Querying-data.html).

## Inclusion

To include related models in the response for a query, use the `include` property of the query object or use the `include()` method on the model class. 
The `include` can be a string, an array, or an object. For more information, see [Include filter](Include-filter.html).

The following examples illustrate valid formats.

Load all user posts with only one additional request:

{% include code-caption.html content="/server/script.js" %}
```javascript
User.find({include: 'posts'}, function() {
  //...
});
```
Or, Add scope into a model user.json
```
  "scope": {
    "include": "posts"
  },
```

Or, equivalently:

{% include code-caption.html content="/server/script.js" %}
```javascript
User.find({include: ['posts']}, function() {
  //...
});
```

Load all user posts and orders with two additional requests:

{% include code-caption.html content="/server/script.js" %}
```javascript
User.find({include: ['posts', 'orders']}, function() {
  //...
});
```

Load all post owners (users), and all orders of each owner:

{% include code-caption.html content="/server/script.js" %}
```javascript
Post.find({include: {owner: 'orders'}}, function() {
  //...
});
```

Load all post owners (users), and all friends and orders of each owner:

{% include code-caption.html content="/server/script.js" %}
```javascript
Post.find({include: {owner: ['friends', 'orders']}}, function() {
  //...
});
```

Load all post owners (users), all posts (including images), and orders of each owner:

{% include code-caption.html content="/server/script.js" %}
```javascript
Post.find({include: {owner: [{posts: 'images'} , 'orders']}}, function() {
  //...
});
```

The model class also has an `include()` method. For example, the code snippet below will populate the list of user instances with posts:

{% include code-caption.html content="/server/script.js" %}
```javascript
User.include(users, 'posts', function() {
  //...
});
```

## Scope

Scoping enables you to define a query as a method to the target model class or prototype. For example,

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
User.scope('top10Vips', {where: {vip: true}, limit: 10});

User.top10Vips(function(err, vips) {
});
```

You can create the same function using a custom method too:

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
User.top10Vips = function(cb) {
  User.find({where: {vip: true}, limit: 10}, cb);
};
```

## Using filters parameters with included relations

You can use parameters on filters such as where, order, fields, include filters when querying related models to return the data from the related models.

For example, consider Student, Class, and Teacher models, where a Student hasMany Classes, and a Teacher hasMany Classes.

Find ALL Student and also return ALL their Classes with the Teacher who teaches those Classes and also ALL of the Students enrolled in those Classes...

```javascript
Student.find({
  include: {
    relation: "classes",
    scope: {
      include: ["teachers", "students"]
    }
  }
});
```

Another example: find a specific teacher and also return ALL their classes and also ALL of the students enrolled in those classes.

```javascript
Teacher.find({
  where: {
    id: $state.params.id
  },
  include: {
    relation: "classes",
    scope: {
      include: ["students"]
    }
  }
});
```
