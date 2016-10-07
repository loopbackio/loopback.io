---
title: "Embedded models and relations"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Embedded-models-and-relations.html
summary:
---

{% include warning.html content="

This documentation is still a work in progress.

" %}

Embedded relations are conceptually similar to [sub-documents in MongooseJS](http://mongoosejs.com/docs/subdocs.html).

Embedded models are usually not persisted separately, however, you can do so to de-normalize or "freeze" data.

Example models: TodoList, TodoItem

**/server/boot/script.js**

```js
// the accessor name defaults to: 'singular + List' (todoItemList)
TodoList.embedsMany(TodoItem, {
  as: 'items'
});
TodoList.create({
  name: 'Work'
}, function(err, list) {
  list.items.build({
    content: 'Do this',
    priority: 5
  });
  list.items.build({
    content: 'Do that',
    priority: 1
  });
  list.save(function(err, list) {
    console.log(err, list);
  });
});
TodoList.findOne(function(err, list) {
  console.log(list.todoItems[0].content); // `Do this`
  console.log(list.items.at(1).content); // `Do that`
  list.items.find({
    where: {
      priority: 1
    }
  }, function(err, item) {
    console.log(item.content); // `Do that`
  });
});
```

## Advanced example: embed with belongsTo

Embedded models can have relations, just like any other model. This is a powerful technique that can simplify certain setups, and enables de-normalization of data. An added benefit is that the internal array explicitly defines the order of items.

The following example creates a relation similar to a [HasManyThrough relation](/doc/{{page.lang}}/lb2/HasManyThrough-relations.html).  However, it uses an embedded model  called `Link` instead of a separately-persisted through-model.  The models involved are Category, Product, and Link.

The new relation options `scope` and `properties` come in to play here as well.

**/server/boot/script.js**

```js
var Category = db.define('Category', {
    name: String
  });
  var Product = db.define('Product', {
    name: String
  });
  var Link = db.define('Link', {
    notes: String
  });

  Category.embedsMany(Link, {
    as: 'items', // rename (default: productList)
    scope: {
      include: 'product'
    }
  });

  Link.belongsTo(Product, {
    foreignKey: 'id', // re-use the actual product id
    properties: {
      id: 'id',
      name: 'name'
    }, // denormalize, transfer id
    // For info on invertProperties see https://github.com/strongloop/loopback-datasource-juggler/pull/219
    options: {
      invertProperties: true
    }
  });

  Category.create({
    name: 'Category B'
  }, function(err, cat) {
    var category = cat;
    var link = cat.items.build({
      notes: 'Some notes...'
    });
    link.product.create({
      name: 'Product 1'
    }, function(err, p) {
      //cat.links[0].id.should.eql(p.id);
      console.log(cat.links[0].id); // 1
      console.log(cat.links[0].name); // Product 1
      console.log(cat.links[0].notes); // Some notes...
      console.log(cat.items.at(0)); // Should equal(cat.links[0]);

      Category.findById(category.id, function(err, cat) {
        console.log(cat.name); // Should equal('Category B');
        console.log(cat.links); // Should equal "{id: 1, name: 'Product 1', notes: 'Some notes...'}"
        console.log(cat.items.at(0)); // Should Equal(cat.links[0]);
        cat.items(function(err, items) { // alternative access
          console.log(items);
          /* Should equal: [{ notes: 'Some notes...', id: 1, name: 'Product 1',  
                                                           product: { name: 'Product 1', id: 1 }}] */
          items[0].product(function(err, p) {
            console.log(p.name); // Should equal ('Product 1');
          });
        });
      });
    })
  });
```

## Another example

{% include important.html content="

This example requires [should.js](https://github.com/shouldjs/should.js) and [Mocha](http://visionmedia.github.io/mocha/).

" %}

The following example creates a relation similar to a hasManyThrough relation.  However, it uses an embedded model called `Link` instead of a separately persisted "through" model.  The example uses models named Category, Product, and Link

The example also uses relation options `scope` and `properties` as well.

**/server/boot/script.js**

```js
var Category = db.define('Category', {
  name: String
});
var Product = db.define('Product', {
  name: String
});
var Link = db.define('Link', {
  notes: String
});
Category.embedsMany(Link, {
  as: 'items', // rename (default: productList)
  scope: {
    include: 'product'
  }
});
Link.belongsTo(Product, {
  foreignKey: 'id', // re-use the actual product id
  properties: {
    id: 'id',
    name: 'name'
  }, // denormalize, transfer id
  options: {
    invertProperties: true
  }
});

Category.create({
  name: 'Category B'
}, function(err, cat) {
  category = cat;
  var link = cat.items.build({
    notes: 'Some notes...'
  });
  link.product.create({
    name: 'Product 1'
  }, function(err, p) {
    cat.links[0].id.should.eql(p.id);
    cat.links[0].name.should.equal('Product 1'); // denormalized
    cat.links[0].notes.should.equal('Some notes...');
    cat.items.at(0).should.equal(cat.links[0]);
    done();
  })
});

Category.findById(category.id, function(err, cat) {
  cat.name.should.equal('Category B');
  cat.links.toObject().should.eql([{
    id: 5,
    name: 'Product 1',
    notes: 'Some notes...'
  }]);
  cat.items.at(0).should.equal(cat.links[0]);
  cat.items(function(err, items) { // alternative access
    items.should.be.an.array;
    items.should.have.length(1);
    items[0].product(function(err, p) {
      p.name.should.equal('Product 1'); // actual value
      done();
    });
  });
});
```

## Defining in model JSON (LDL)

**/common/models/model.json**

```js
{
  "name": "Person",
  "plural": "people",
  "base": "PersistedModel",
  "properties": {
    "firstName": {
      "type": "string",
      "required": true
    },
    "lastName": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "addresses": {
      "type": "embedsMany",
      "model": "Location",
      "options": {
        "validate": true,
        "autoId": false
      }
    },
    "pictures": {
      "type": "hasMany",
      "model": "Picture",
      "polymorphic": "imageable"
    }
  },
  "acls": [],
  "methods": [],
  "mixins": {
    "ObjectId": true
  }
}
```
