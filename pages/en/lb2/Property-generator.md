---
title: "Property generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Property-generator.html
summary:
---

{% include important.html content="
Before running this generator, you must create an application using the [Application generator](Application-generator.html).

Then you must run the command from the root directory of the application."
%}

### SYNOPSIS

Adds a new property to an existing LoopBack model.

```shell
[slc | apic] loopback:property [options]
```

### OPTIONS

`-h, --help`  
Print the generator's options and usage.

`--skip-cache`  
Do not remember prompt answers. Default is false.

`--skip-install`  
Do not automatically install dependencies. Default is false.

### INTERACTIVE PROMPTS

The tool will prompt you for the:

*   Model to which to add the new property.
*   Name of the property to add.
*   Data type of the property.
*   Whether the property is required.

### OUTPUT

The tool modifies the [Model definition JSON file](Model-definition-JSON-file.html) to add the specified property to the specified model.
