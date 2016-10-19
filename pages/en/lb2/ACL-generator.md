---
title: "ACL generator"
lang: en
layout: page
keywords: LoopBack
tags: [authentication]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/ACL-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

### Synopsis

Adds a new access control list (ACL) entry to a LoopBack application.

```shell
$ [slc | apic] loopback:acl [options]
```

{% include content/generator-builtin-model-caveat.html lang=page.lang%}

### Options

`-h, --help`
Print the generator's options and usage.

`--skip-cache`
Do not remember prompt answers. Default is false.

`--skip-install`
Do not automatically install dependencies. Default is false.

### Interactive Prompts

The tool will prompt you for the necessary information and then modify the [Model definition JSON file](Model-definition-JSON-file.html) accordingly.

The generator prompts for:

* Name of the model to which you want to apply access control or all models.
* Scope of access control: All methods and properties or a specific method.
* If you choose a specific method, the method's name.
* Access type: read, write, execute, or all.
* Role: all users, any unauthenticated user, any authenticated user, the object owner.
* Permission to apply: explicitly grant access or explicitly deny access.

For general information about setting up ACLs, see [Controlling data access](Controlling-data-access.html).
