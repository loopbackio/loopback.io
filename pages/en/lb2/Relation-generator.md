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

{% include important.html content="
Before running this generator, you must create an application using the [Application generator](Application-generator.html).

Then you must run the command from the root directory of the application."
%}

The models involved in the relation must also exist before running this generator.

### SYNOPSIS

Creates a new [model relation](Creating+model+relations.html) in a LoopBack application.

```shell
[slc | apic] loopback:relation [options]
```

### OPTIONS

`-h, --help`  
Print the generator's options and usage.

`--skip-cache`  
Do not remember prompt answers. Default is false.

`--skip-install`  
Do not automatically install dependencies. Default is false.

### INTERACTIVE PROMPTS

The tool will prompt you for:

*   Name of the model to create the relationship from.
*   Relation type:
 - ([HasMany](HasMany+relations.html)
 - [BelongsTo](BelongsTo+relations.html)
 - [HasAndBelongsToMany](HasAndBelongsToMany+relations.html)
 - [HasOne](HasOne+relations.html).
*   Name of the model to create a relationship with.
*   Name for the relation (property name).

{% include important.html content="

The name of the relation must be different than a property it references.
" %}

*   Custom foreign key (optional)
*   Whether a "through" model is required.  Repy "Y" to create a [HasManyThrough relations](HasManyThrough+relations.html). 
*   Name of the "through" model, if appropriate.

### OUTPUT

Updates the [Model definition JSON files](Model-definition-JSON-file.html) for the models involved in the relation.
