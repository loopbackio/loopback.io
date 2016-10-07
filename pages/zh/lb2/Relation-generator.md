---
title: "Relation generator"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Relation-generator.html
summary:
---

The LoopBack relation generator creates a new [model relation](/doc/{{page.lang}}/lb2/Creating-model-relations.html) in the LoopBack application.

```
$ cd <loopback-app-dir>
$ slc loopback:relation
```

Then `slc` will prompt you for:

*   Name of the model to create the relationship from.
*   Relation type ([HasMany](/doc/{{page.lang}}/lb2/HasMany-relations.html), [BelongsTo](/doc/{{page.lang}}/lb2/BelongsTo-relations.html), [HasAndBelongsToMany](/doc/{{page.lang}}/lb2/HasAndBelongsToMany-relations.html), or [HasOne](/doc/{{page.lang}}/lb2/HasOne-relations.html)).
*   Name of the model to create a relationship with.
*   Name for the relation (property name).

*   Custom foreign key (optional)

*   Whether a "through" model is required.  Repy "Y" to create a [HasManyThrough relations](/doc/{{page.lang}}/lb2/HasManyThrough-relations.html). 

    *   Name of the "through" model, if appropriate.
