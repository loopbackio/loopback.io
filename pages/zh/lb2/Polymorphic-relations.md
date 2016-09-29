---
title: "Polymorphic relations"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Polymorphic-relations.html
summary:
---

{% include warning.html content="

This documentation is still a work in progress.

" %}

LoopBack supports _polymorphic relations_ in which a model can belong to more than one other model, on a single association. For example, you might have a Picture model that belongs to either an Author model or a Reader model. 

The examples below use three example models: Picture, Author, and Reader.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Do polymorphic relations add methods to the models as the standard relations do? If so, what?</div>

## HasMany

The usual options apply, for example: `as: 'photos'` to specify a different relation name/accessor.

**/common/models/model.js**

```js
Author.hasMany(Picture, {
  polymorphic: 'imageable'
});
Reader.hasMany(Picture, {
  polymorphic: { // alternative syntax
    as: 'imageable', // if not set, default to: reference
    foreignKey: 'imageableId', // defaults to 'as + Id'
    discriminator: 'imageableType' // defaults to 'as + Type'
  }
});
```

## BelongsTo

Because you define the related model dynamically, you cannot declare it up front.  So instead of passing in the related model (name), you specify the name of the polymorphic relation.

**/common/models/model.js**

```js
Picture.belongsTo('imageable', {
  polymorphic: true
});

// Alternatively, use an object for setup:

Picture.belongsTo('imageable', {
  polymorphic: {
    foreignKey: 'imageableId',
    discriminator: 'imageableType'
  }
});
```

## HasAndBelongsToMany

This requires an explicit 'through' model, in this case: PictureLink

The relations `Picture.belongsTo(PictureLink)` and `Picture.belongsTo('imageable', { polymorphic: true });` will be setup automatically.

The same is true for the needed properties on PictureLink.

**/common/models/model.js**

```js
Author.hasAndBelongsToMany(Picture, {
  through: PictureLink,
  polymorphic: 'imageable'
});
Reader.hasAndBelongsToMany(Picture, {
  through: PictureLink,
  polymorphic: 'imageable'
});

// Optionally, define inverse hasMany relations (invert: true):

Picture.hasMany(Author, {
  through: PictureLink,
  polymorphic: 'imageable',
  invert: true
});
Picture.hasMany(Reader, {
  through: PictureLink,
  polymorphic: 'imageable',
  invert: true
});
```

## HasOne

As shown here, you can specify `as: 'avatar'` to explicitly set the name of the relation. If not set, it defaults to the polymorphic name.

**/common/models/model.js**

```js
Picture.belongsTo('imageable', {
  polymorphic: true
});

Author.hasOne(Picture, {
  as: 'avatar',
  polymorphic: 'imageable'
});
Reader.hasOne(Picture, {
  polymorphic: {
    as: 'imageable'
  }
});
```
