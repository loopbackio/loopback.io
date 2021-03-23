---
title: "Remote method generator"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Remote-method-generator.html
summary:
---

{% include content/ja/generator-create-app.html %}

### Synopsis

Adds a new remote method to an existing application.

```
lb remote-method [options] [<modelName>] [<methodName>]
```

With API Connect developer toolkit:

```
apic loopback:remote-method [options]
```

With legacy StrongLoop tools:

```
slc loopback:remote-method [options] [<modelName>] [<methodName>]
```

### Options

{% include_relative includes/CLI-std-options.md title='no' %}

### Arguments

All arguments are optional.

| Argument      | Description               | Type   |
|---------------|---------------------------|--------|
| modelName     | Name of the model         | String |
| methodName    | Name of the remote method | String |

### Interactive Prompts

The tool will prompt you for:

* Name of the model to which to add the remote method.
* Name of the remote method.
* Whether the method is static (or an instance method).
* Description of the method.
* One or more HTTP endpoints, with corresponding accept and return arguments and their types.
