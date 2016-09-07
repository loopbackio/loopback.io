---
title: "Relation generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Relation-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

The models involved in the relation must also exist before running this generator.

### Synopsis

Creates a new [model relation](/doc/{{page.lang}}/lb2/Creating-model-relations.html) in a LoopBack application.

```shell
$ [slc | apic] loopback:relation [options]
```

### Options

`-h, --help`
Print the generator's options and usage.

`--skip-cache`
Do not remember prompt answers. Default is false.

`--skip-install`
Do not automatically install dependencies. Default is false.

### Interactive Prompts

The tool will prompt you for:

* Name of the model to create the relationship from.
* Relation type:
  * [HasMany](/doc/{{page.lang}}/lb2/HasMany-relations.html)
  * [BelongsTo](/doc/{{page.lang}}/lb2/BelongsTo-relations.html)
  * [HasAndBelongsToMany](/doc/{{page.lang}}/lb2/HasAndBelongsToMany-relations.html)
  * [HasOne](/doc/{{page.lang}}/lb2/HasOne-relations.html).
* Name of the model to create a relationship with.
* Name for the relation (property name).

{% include important.html content="The name of the relation must be different than a property it references." %}

* Custom foreign key (optional)
* Whether a "through" model is required.  Repy "Y" to create a [HasManyThrough relations](/doc/{{page.lang}}/lb2/HasManyThrough-relations.html). 
* Name of the "through" model, if appropriate.

### Output

Updates the [Model definition JSON files](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) for the models involved in the relation.
