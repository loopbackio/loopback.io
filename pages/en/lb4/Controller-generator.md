---
lang: en
title: 'Controller generator'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Controller-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

### Synopsis

Adds a new empty controller to a LoopBack application.

```
lb4 controller [options] [<name>]
```

### Options

{% include_relative includes/CLI-std-options.md %}

### Arguments

`<name>` - Optional name of the controller to create as an argument to the command. 
If provided, the tool will use that as the default when it prompts for the name.

### Interactive Prompts

The tool will prompt you for:

- Name of the controller. If the name had been supplied from the command line, the prompt is skipped and the controller is built with the name from the command line argument.

### Output

The tool will create a new file as <code>/src/controllers/<i>controllerName</i>.controller.ts</code>. The file will contain an empty constructor and common package imports that can be uncommented.
