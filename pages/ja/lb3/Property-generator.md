---
title: "Property generator"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Property-generator.html
summary:
---

{% include content/ja/generator-create-app.html %}

### Synopsis

Adds a new property to an existing LoopBack model.

```
lb property [options]
```

With IBM API Connect developer toolkit:

```
apic create --type model [options]
```

With legacy StrongLoop tools:

```
slc loopback:property [options]
```

### Options

{% include_relative includes/CLI-std-options.md title='no' %}

`-n, --name`
: With IBM API Connect developer toolkit only, optionally provide the name of the
property as the value of this option. 
If provided, the tool will use that as the default when it prompts for the name.

### Interactive Prompts

The tool will prompt you for the:

*   Model to which to add the new property.
*   Name of the property to add.
*   Data type of the property.
*   Whether the property is required.

### Output

The tool modifies the [Model definition JSON file](Model-definition-JSON-file.html) to add the specified property to the specified model.
