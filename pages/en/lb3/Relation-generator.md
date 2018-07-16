---
title: "Relation generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Relation-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

The models involved in the relation must also exist before running this generator.

### Synopsis

Creates a new [model relation](Creating-model-relations.html) in a LoopBack application.

```
lb relation [options]
```

With IBM API Connect v5 developer toolkit:

```
apic loopback:relation [options]
```

With legacy StrongLoop tools:

```
$ slc relation [options]
```

### Options

{% include_relative includes/CLI-std-options.md title='no' %}

### Interactive Prompts

The tool will prompt you for:

* Name of the model to create the relationship from.
* Relation type:
  * [HasMany](HasMany-relations.html)
  * [BelongsTo](BelongsTo-relations.html)
  * [HasAndBelongsToMany](HasAndBelongsToMany-relations.html)
  * [HasOne](HasOne-relations.html).
* Name of the model to create a relationship with.
* Name for the relation (property name).

{% include important.html content="The name of the relation must be different than a property it references.
" %}

* Custom foreign key (optional)
* Whether a "through" model is required.  Repy "Y" to create a [HasManyThrough relations](HasManyThrough-relations.html). 
* Name of the "through" model, if appropriate.

### Output

Updates the [Model definition JSON files](Model-definition-JSON-file.html) for the models involved in the relation.
