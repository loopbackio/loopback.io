---
title: "Define model relations"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Define-model-relations.html
summary: Relations among models enable you to query related models and perform corresponding validations.
---

{% include content/gs-prereqs.html two="true" lang=page.lang %}

Individual models are easy to understand and work with. But in reality, models are often connected or related.   For applications with multiple models, you typically need to define _relations_ between models.  

{% include note.html content="
If you followed the previous step in the tutorial, go to [Introducing model relations](#introducing-model-relations).

If you're just jumping in, follow the steps below to catch up...
" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cd loopback-getting-started-intermediate
$ git checkout step2
$ npm install
```

## Introducing model relations

LoopBack supports many different kinds of model relations, including: [BelongsTo](BelongsTo-relations), [HasMany](HasMany-relations), [HasManyThrough](HasManyThrough-relations), and [HasAndBelongsToMany](HasAndBelongsToMany-relations), among others. For more information, see [Creating model relations](Creating-model-relations).

In the Coffee Shop Reviews app, the models are related as follows:

*   A coffee shop has many reviews.
*   A coffee shop has many reviewers.
*   A review belongs to a coffee shop.
*   A review belongs to a reviewer.
*   A reviewer has many reviews.

## Define relations

Now, you're going to define these relationships between the models.  In all there are five relations.  Once again, you'll use the `lb` command, but this time you'll use the `relation` sub-command ([relation generator](Relation-generator)).  For each relation, enter:

```
$ lb relation
```

The tool will prompt you to provide the information required to define the relation, as summarized below.

**A coffee shop has many reviews**; No through model and no foreign key.

```
? Select the model to create the relationship from: CoffeeShop
? Relation type: has many
? Choose a model to create a relationship with: Review
? Enter the property name for the relation: reviews
? Optionally enter a custom foreign key:
? Require a through model? No
? Allow the relation to be nested in REST APIs: No
? Disable the relation from being included: No

```

**A coffee shop has many reviewers**; No through model and no foreign key.

```
? Select the model to create the relationship from: CoffeeShop
? Relation type: has many
? Choose a model to create a relationship with: Reviewer
? Enter the property name for the relation: reviewers
? Optionally enter a custom foreign key:
? Require a through model? No
? Allow the relation to be nested in REST APIs: No
? Disable the relation from being included: No
```

**A review belongs to a coffee shop**; No foreign key.

```
? Select the model to create the relationship from: Review
? Relation type: belongs to
? Choose a model to create a relationship with: CoffeeShop
? Enter the property name for the relation: coffeeShop
? Optionally enter a custom foreign key:
? Allow the relation to be nested in REST APIs: No
? Disable the relation from being included: No

```

**A review belongs to a reviewer**; foreign key is `publisherId`.

```
? Select the model to create the relationship from: Review
? Relation type: belongs to
? Choose a model to create a relationship with: Reviewer
? Enter the property name for the relation: reviewer
? Optionally enter a custom foreign key: publisherId
? Allow the relation to be nested in REST APIs: No
? Disable the relation from being included: No

```

**A reviewer has many reviews**; foreign key is `publisherId`.

```
? Select the model to create the relationship from: Reviewer
? Relation type: has many
? Choose a model to create a relationship with: Review
? Enter the property name for the relation: reviews
? Optionally enter a custom foreign key: publisherId
? Require a through model? No
? Allow the relation to be nested in REST APIs: No
? Disable the relation from being included: No

```

## Review the model JSON files

Now, look at `common/models/review.json`.  You should see this:

{% include code-caption.html content="common/models/review.json" %}
```javascript
...
"relations": {
  "coffeeShop": {
    "type": "belongsTo",
    "model": "CoffeeShop",
    "foreignKey": ""
  },
  "reviewer": {
    "type": "belongsTo",
    "model": "Reviewer",
    "foreignKey": "publisherId"
  }
},
...
```

Likewise, `common/models/reviewer.json` should have this:

{% include code-caption.html content="common/models/reviewer.json" %}
```javascript
...
"relations": {
  "reviews": {
    "type": "hasMany",
    "model": "Review",
    "foreignKey": "publisherId"
  }
},
...
```

And `common/models/coffee-shop.json` should have this:

{% include code-caption.html content="common/models/coffee-shop.json" %}
```javascript
...
"relations": {
  "reviews": {
    "type": "hasMany",
    "model": "Review",
    "foreignKey": ""
  },
  "reviewers": {
    "type": "hasMany",
    "model": "Reviewer",
    "foreignKey": ""
  }
},
...
```

{% include next.html content="Continue to [Define access controls](Define-access-controls.html).
" %}
