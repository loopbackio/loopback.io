---
title: "Prototype versus instance methods"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Prototype-versus-instance-methods.html
summary:
---

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>This was created based on <a href="https://github.com/strongloop-internal/scrum-cs/issues/66" class="external-link" rel="nofollow">https://github.com/strongloop-internal/scrum-cs/issues/66</a>. Need to find
  the right place for it.</div>

## Question

When I use the swagger spec to generate a javascript client I end up with something like the attached UsedModel client file. From a Node.js best practices perspective, I want to find out: what's the point of dividing methods between prototype and object in a client?

Why have:

```
this.login = function(parameters) {...};
UserModel.prototype.updateAttributes = function(parameters) {...};
```

When both can be:

```
this.login = function(parameters) {...};
this.updateAttributes = function(parameters) {...};
```

## Answer

One visible difference is in the URLs. Static methods have URL `/api/modelName/methodName`, while prototype methods have URL `/api/modelName/id/methodName`.

The second difference is in the way how to use the method on the server. Static methods always have to fetch the model instance from the database, which is inefficient when a single HTTP request involves several calls. On the other hand, prototype methods operate on the same instance.
Example (using sync code to keep it simple):

```js
/** static-only methods **/
OrderItem.addCount(id, count); // database calls - read, write
OrderItem.updatePrice(id); // 2 database calls - read, write

/* prototype methods */
var order = OrderItem.findById(123); // database call - read
order.addCount(1);
order.updatePrice();
order.save(); // database call - write
```

When it comes to client SDKs, the situation is little bit more complex. The isomorphic client can share the implementation of `addCount` and `updatePrice` with the server, thus the code above would involve two REST requests only - `GET /api/OrderItems/123` and `PUT /api/OrderItems/123`.

Other clients (iOS, Android, Angular, swagger-generated js client) are not able to use that. However, it is always possible to wrap the code in a new shared method and call this new method from the client, e.g. `POST /api/OrderItems/123/add/1` or `POST /api/OrderItems/add { id: 123, amount: 1 }`.

As a rule of thumb, you should use static methods for actions that are not necessarily bound to a model instance known by a client (e.g. `User.login`, `PersistedModel.create`,`PersistedModel.find`). Use prototype (instance) methods for actions that operate on a single given model instance (`PersistedModel.prototype.updateAttributes`, `OrderItem.prototype.updatePrice()`).

Looking at the problem from the client side, the benefit of saving DB calls is not applicable. It all boils down to what kind of API do you prefer. Since all prototype methods require model id, you can convert prototype methods to static methods with an extra argument - this is exactly what we do in Angular SDK.

```
// server
var pm = new PersistedModel({ id: modelId });
pm.updateAttributes(data, cb)

// Angular client
PersistedModel.prototype$updateAttributes({ id: modelId }, data);
If your client is smart enough to map model properties to request parameters (e.g. path params), then a prototype method may keep the code more concise.

OrderItem.find({ where: { productName: 'pen' } }, function(err, list) {
  async.each(list, function(it, next) {
    // 1\. prototype method
    it.updateAttributes({ count: 2 }, next); // automagically build URL using `it.id`

    // 2\. static method
    OrderItem.updateAttributes(it.id, { count: 2 }, next);

  }, cb);
});
```

To make it short, there is no hard rule for the client SDK (API) prescribing how to map static and prototype methods. Use whatever works best for you.
