---
title: "Polymorphic relations"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Polymorphic-relations.html
summary:
---

<div class="sl-hidden"><strong>REVIEW COMMENT from Yaapa</strong><br>
  <div>The docs for "Polymorphic relations", "HasManyThrough relations", and "Embedded models and relations" all share common areas of improvement.</div>
  <ul>
    <li>Some example files lack context.</li>
    <li>There are references to objects in the example files, without any explanation of where they came from or how they may be initialized.</li>
    <li>There are certain properties in the objects in examples files, they need to be explained, and the reader informed of other possible properties. For example, here are my observations on Polymorphic relations</li>
  </ul>
  <p><code>common/models/author.json</code>: Should explain what "imageable" in <code>{ "polymorphic": "imageable" }</code> means. And, list other possible properties.</p>
  <div>
    <p><code>common/models/reader.json</code>:</p><pre>   "polymorphic": {</pre><pre>    "as": "imageable",</pre><pre>    "foreignKey": "imageableId",</pre><pre>    "discriminator": "imageableType"</pre><pre>   }</pre>
    <div>- The structure has changed from "common/models/author.json". Should explain "as", "foreignKey", and "discriminator". And, list other possible properties.</div>
    <div><code>common/models/author.js</code> - Where does the Picture object come from?</div>
    <div><code>common/models/picture.js</code> - belongsTo is undefined in Picture.</div>
    <div><code>common/models/model.js</code> - Is this file created by default? Where do Author, Reader, Picture objects come from?</div>
  </div>
  <div>As mentioned in the beginning, "HasManyThrough relations" and "Embedded models and relations" have similar issues. I can come up with a wholesome example which includes all these three types of model relations coming week.</div>
</div>

{% include warning.html content="

This documentation is still a work in progress.

" %}

LoopBack supports _polymorphic relations_ in which a model can belong to more than one other model, on a single association.
For example, you might have a Picture model that belongs to either an Author model or a Reader model. 

The examples below use three example models: Picture, Author, and Reader, where a picture can belong to either an author or reader.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p>Is it actually "... a picture can belong to <em>both</em> an author and a reader." ?</p>
  <p>Do polymorphic relations add methods to the models as the standard relations do? If so, what?</p>
</div>

## HasMany polymorphic relations

The usual options apply, for example: `as: 'photos'` to specify a different relation name/accessor.

{% include code-caption.html content="common/models/author.json" %}
```javascript
{
  "name": "Author",
  "base": "PersistedModel",
  ...
  "relations": {
    "pictures": {
      "type": "hasMany",
      "model": "Picture",
      { "polymorphic": "imageable" }
    }
  }
...
```

And:

{% include code-caption.html content="common/models/reader.json" %}
```javascript
{
  "name": "Reader",
  "base": "PersistedModel",
  ...
  "relations": {
    "pictures": {
      "type": "hasMany",
      "model": "Picture",
      "polymorphic": {
        "as": "imageable",
        "foreignKey": "imageableId",
        "discriminator": "imageableType"
       } 
    }
  }
...
```

Alternatively, you can define the relation in code:

{% include code-caption.html content="common/models/author.js" %}
```javascript
Author.hasMany(Picture, { polymorphic: 'imageable' });
```

And:

{% include code-caption.html content="common/models/reader.js" %}
```javascript
Reader.hasMany("imageables", {
    model: Picture 
    polymorphic: {
      foreignKey: 'imageableId', // defaults to 'as - Id'
      discriminator: 'imageableType' // defaults to 'as - Type'
  } 
});
```

## HasManyThrough polymorphic relations

To define a hasMany polymorphic relation, there must be a "through" model, similarly to a standard [HasManyThrough relation](HasManyThrough-relations.html).

For example, "ImageLink":

{% include code-caption.html content="/common/models/ImageLink.json" %}
```javascript
{
  "name": "ImageLink",
  "base": "PersistedModel",
  ...
  "relations": {
    "author": {
      "type": "belongsTo",
      "model": "Author",
      "foreignKey": "authorId"
    },
    "pictures": {
      "type": "hasMany",
      "model": "Picture",
      "polymorphic": {
        "foreignKey": "imageableId",
        "discriminator": "imageableType"
      }
    }
  },
...
}
```

Then here's an example of a polymorphic hasManyThrough relation:

{% include code-caption.html content="/common/models/Author.json" %}
```javascript
{
  "name": "Author",
  "base": "PersistedModel",
  ...
  "relations": {
    "pictures": {
      "type": "hasMany",
      "model": "Picture",
      "polymorphic": {
        "foreignKey": "imageableId",
        "discriminator": "imageableType"
      },
      "through": "ImageLink",
      "keyThrough": "authorId"
    }
  },
...
}
```

Equivalently, in JavaScript:

{% include code-caption.html content="/common/models/Author.js" %}
```javascript
Author.hasMany(Picture, {
  as: 'pictures',
  polymorphic: {
    foreignKey: 'imageableId',
    discriminator: 'imageableType'
  },
  through: ImageLink,
  keyThrough: 'authorId'
});
```

## BelongsTo polymorphic relations

Because you define the related model dynamically, you cannot declare it up front.
So instead of passing in the related model (name), you specify the name of the polymorphic relation.

{% include code-caption.html content="common/models/picture.json" %}
```javascript
{
  "name": "Picture",
  "base": "PersistedModel",
  ...
  "relations": {
    "author": {
      "type": "belongsTo",
      "polymorphic": {
        "foreignKey": "imageableId",
        "discriminator": "imageableType"
      }
    }
  },
...
```

Or, in code:

{% include code-caption.html content="common/models/picture.js" %}
```javascript
Picture.belongsTo('imageable', {
  polymorphic: true
}); 
// Alternatively, use an object for setup
Picture.belongsTo('imageable', {
  polymorphic: {
    foreignKey: 'imageableId',
    discriminator: 'imageableType'
  }
});
```

## HasAndBelongsToMany polymorphic relations

This requires an explicit 'through' model, in this case: PictureLink

The relations `Picture.belongsTo(PictureLink)` and `Picture.belongsTo('imageable', { polymorphic: true });` will be setup automatically.

The same is true for the needed properties on PictureLink.

{% include code-caption.html content="/common/models/model.js" %}
```javascript
Author.hasAndBelongsToMany(Picture, {
  through: PictureLink,
  polymorphic: 'imageable'
});
Reader.hasAndBelongsToMany(Picture, {
  through: PictureLink,
  polymorphic: 'imageable'
});
// Optionally, define inverse hasMany relations with '(invert: true)'
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

## HasOne polymorphic relations

As shown here, you can specify `as: 'avatar'` to explicitly set the name of the relation. If not set, it defaults to the polymorphic name.

{% include code-caption.html content="/common/models/model.js" %}
```javascript
Picture.belongsTo('imageable', {polymorphic: true});
Author.hasOne(Picture, {as: 'avatar', polymorphic: 'imageable'});
Reader.hasOne(Picture, {polymorphic: {as: 'imageable'}});
```

## Dealing with polymorphic.idType

Because `modelTo` is unknown up-front (it's polymorphic), you cannot rely on `modelTo` for getting the `foreignKey` type. 
You can explicitly declare the idType as shown below. 

The example below should provide the following results:

```javascript
[{
  url: 'john.jpg',
  imageableType: 'Author',
  imageableId: '1',
  id: 1
}, {
  url: 'joe.jpg',
  imageableType: 'Reader',
  imageableId: '1',
  id: 2
}]

Authors: [{
  username: 'John',
  id: 1
}]

Readers: [{
  name: 'Joe',
  id: 1
}]
```

```javascript
var Author = app.models.Author;
var Reader = app.models.Reader;
var Picture = app.models.Picture;

Author.hasOne(Picture, {
  as: 'avatar',
  polymorphic: {
    foreignKey: 'imageableId',
    discriminator: 'imageableType'
  }
});

Reader.hasOne(Picture, {
  as: 'imageable',
  polymorphic: {
    foreignKey: 'imageableId',
    discriminator: 'imageableType'
  }
});

Picture.belongsTo('owner', {
  idName: 'username',
  polymorphic: {
    idType: Author.definition.properties.username.type,
    foreignKey: 'imageableId',
    discriminator: 'imageableType'
  }
});

//Creating demo author, reader pictures then listing them
function createAuthor(cb) {
  Author.create({
    username: "John"
  }).then(function(author) {
    author.avatar.create({
      url: "john.jpg"
    }, function() {
      cb();
    });
  });
}

function createReader(cb) {
  Reader.create({
    name: "Joe"
  }).then(function(reader) {
    reader.imageable.create({
      url: "joe.jpg"
    }, function() {
      cb();
    });
  });
}

function listPictures() {
  Picture.find(function(err, res) {
    console.log("\nPictures:\n", res);
  })
}

function listReaders() {
  Reader.find(function(err, res) {
    console.log("\nReaders:\n", res);
  })
}

function listAuthors() {
  Author.find(function(err, res) {
    console.log("\nAuthors:\n", res);
  })
}

//executing the demo
createAuthor(function() {
  createReader(function() {
    listPictures();
    listAuthors();
    listReaders();
  });
});
```
