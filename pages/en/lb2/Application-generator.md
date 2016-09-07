---
title: "Application generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Application-generator.html
summary:
---

### Synopsis

Creates a new LoopBack application.

```shell
$ [slc | apic] loopback:app [options] [<name>]
```

### Options

`-h, --help`
Print the generator's options and usage.

`--skip-cache`
Do not remember prompt answers. Default is false.

`--skip-install`
Do not automatically install dependencies. Default is false.

### Arguments

Provide the application name as an optional argument.  The tool will create a directory of that name to contain the application.

### Interactive Prompts

The generator will prompt you for:

* Name of the directory in which to create your application.  Press **Enter** to create the application in the current directory.
* Name of the application, that defaults to the directory name you previously entered.

The tool creates the standard LoopBack application structure.  See [Project layout reference](/doc/{{page.lang}}/lb2/Project-layout-reference.html) for details.

{% include note.html content="
By default, a generated application exposes only the User model over REST.
To expose other [built-in models](/doc/en/lb2/Using-built-in-models.html), edit `/server/model-config.json` and change the model's \"public\" property to \"true\".
See [model-config.json](/doc/en/lb2/model-config.json.html) for more information.
" %}

After you create an application, you can run additional generators from the application root directory:

* [ACL generator](/doc/{{page.lang}}/lb2/ACL-generator.html)
* [API definition generator](/doc/{{page.lang}}/lb2/API-definition-generator.html)
* [Application generator](/doc/{{page.lang}}/lb2/Application-generator.html)
* [Boot script generator](/doc/{{page.lang}}/lb2/Boot-script-generator.html)
* [Data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html)
* [Middleware generator](/doc/{{page.lang}}/lb2/Middleware-generator.html)
* [Model generator](/doc/{{page.lang}}/lb2/Model-generator.html)
* [Property generator](/doc/{{page.lang}}/lb2/Property-generator.html)
* [Relation generator](/doc/{{page.lang}}/lb2/Relation-generator.html)
* [Remote method generator](/doc/{{page.lang}}/lb2/Remote-method-generator.html)
* [Swagger generator](/doc/{{page.lang}}/lb2/Swagger-generator.html)
* [Refresh definitions command](/doc/{{page.lang}}/lb2/Refresh-definitions-command.html)
