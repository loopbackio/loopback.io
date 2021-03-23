---
title: "API definition generator"
lang: en
layout: page
keywords: LoopBack
tags: [tools]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/API-definition-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

### Synopsis

Exports a Swagger API definition for a LoopBack application.

```shell
$ [slc | apic] loopback:export-api-def [options]
```

### Options

`-h, --help`
Print the generator's options and usage.

`--skip-cache`
Do not remember prompt answers. Default is false.

`--skip-install`
Do not automatically install dependencies. Default is false.

### ADDITIONAL OPTIONS

`-o,   --output`
Name and full path to the output file. By default, the generator displays the API definition to the screen (stdout). Use this option to save the definition to a file instead.

`--json`
By default, the generator exports the API definition in YAML format. Use this option to export in JSON format instead; or specify a file with a `.json` format.
