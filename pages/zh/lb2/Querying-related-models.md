---
title: "Querying related models"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Querying-related-models.html
summary:
---

## Overview

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p>Add <span>usage of all the filter params (where, order, fields, include, ...) on included relations p</span>er <a href="https://github.com/strongloop/loopback-datasource-juggler/pull/324" class="external-link" rel="nofollow">https://github.com/strongloop/loopback-datasource-juggler/pull/324</a>.</p>
  <p>Examples:</p>
  <p>Find ALL Student and also return ALL their Classes with the Teacher who teaches those Classes and also ALL of the Students enrolled in those Classes...</p>
  <div>
    <div>&nbsp; &nbsp; &nbsp; Student.find({"filter":</div>
    <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</div>
    <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "include": {"relation": "classes", "scope": {"include": ["teachers","students"]}}</div>
    <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }})</div>
  </div>
  <div>_____</div>
  <div>Find a specific Teacher and &nbsp;also return ALL their Classes and also ALL of the Students enrolled in those Classes...</div>
  <div>
    <div>Teacher.find({"filter":</div>
    <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {</div>
    <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "where": {"id": $<a href="http://state.params.id/" class="external-link" rel="nofollow">state.params.id</a>},</div>
    <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "include": {"relation": "classes", "scope": {"include": ["students"]}}</div>
    <div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }})</div>
  </div>
</div>

A relation defines the connection between two models by connecting a foreign key property to a primary key property.  For each relation type, LoopBack automatically mixes in helper methods to the model class to help navigate and associate the model instances to load or build a data graph.

Often, client applications want to select relevant data from the graph, for example to get user information and recently-placed orders. LoopBack provides a few ways to express such requirements in queries.

The [LoopBack Relations example](https://github.com/strongloop/loopback-example-relations) application provides some examples.  For general information on queries, see [Querying data](/doc/{{page.lang}}/lb2/Querying-data.html).

## Inclusion

To include related models in the response for a query, use the ‘include’ property of the query object or use the `include()` method on the model class. The ‘include’ can be a string, an array, or an object.  For more information, see [Include（加载导航属性）过滤器](/doc/{{page.lang}}/lb2/6095115.html).

The following examples illustrate valid formats.

Load all user posts with only one additional request:

**/server/script.js**

```
User.find({include: 'posts'}, function() {
  ...
});
```

Or, equivalently:

**/server/script.js**

```
User.find({include: ['posts']}, function() {
  ...
});
```

Load all user posts and orders with two additional requests:

**/server/script.js**

```
User.find({include: ['posts', 'orders']}, function() {
  ...
});
```

Load all post owners (users), and all orders of each owner:

**/server/script.js**

```
Post.find({include: {owner: ‘orders’}}, function() {
  ...
});
```

Load all post owners (users), and all friends and orders of each owner:

**/server/script.js**

```
Post.find({include: {owner: [‘friends’, ‘orders’]}}, function() {
  ...
});
```

Load all post owners (users), all posts (including images), and orders of each owner:

**/server/script.js**

```
Post.find({include: {owner: [{posts: ‘images’} , ‘orders’]}}, function() {
  ...
});
```

The model class also has an `include()` method.  For example, the code snippet below will populate the list of user instances with posts:

**/server/script.js**

```
User.include(users, 'posts', function() {
  ...
});
```

## Scope

Scoping enables you to define a query as a method to the target model class or prototype. For example,

**/server/boot/script.js**

```
User.scope(‘top10Vips’, {where: {vip: true}, limit: 10});

User.top10Vips(function(err, vips) {
});
```

You can create the same function using a custom method too:

**/server/boot/script.js**

```js
User.top10Vips = function(cb) {
  User.find({
    where: {
      vip: true
    },
    limit: 10
  }, cb);
}
```
