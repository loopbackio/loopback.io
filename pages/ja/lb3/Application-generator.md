---
title: "Application generator"
lang: ja
layout: page
keywords: LoopBack
tags: [tools]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Application-generator.html
summary:
---

### Synopsis

Creates a new LoopBack application.

```
lb [app] [options] [<name>]
```

With IBM API Connect developer toolkit:

```
apic loopback --type api [options]
```

{% include note.html content="The `apic` tool has a number of additional command options that are
not available with `lb` or `slc`.  Consult the CLI help for details.
" %}

With legacy StrongLoop tools:

```
slc loopback [options] [<name>]
```

### Options

`--bluemix`
: Configure the app for deployment to IBM Cloud. With this option, the tool will present   additional prompts for generating IBM Cloud application artifacts.

`--explorer`
: Add Loopback Explorer to the project. If `lb` and `slc loopback` commands are used, the default is true, otherwise the default is false.

`-n, --name <name>`
: Only with IBM API Connect developer toolkit; specify name of LoopBack application project.

`--skip-next-steps`
: Do not print "next steps" information.

{% include_relative includes/CLI-std-options.md %}

### Arguments

Provide the application name as an optional argument (or, with API Connect, as value of `--name` option).  The tool will create a directory of that name to contain the application.

### Interactive Prompts

The generator will prompt you for:

* Name of the directory in which to create your application.  Press **Enter** to create the application in the current directory.
* Name of the application, that defaults to the directory name you previously entered.

The tool creates the standard LoopBack application structure.  See [Project layout reference](Project-layout-reference.html) for details.

{% include note.html content="By default, a generated application exposes only the User model over REST.
To expose other [built-in models](Using-built-in-models.html), edit `/server/model-config.json` and change the model's \"public\" property to \"true\".
See [model-config.json](model-config.json.html) for more information.
" %}

After you create an application, you can run additional generators from the application root directory:

* [ACL generator](ACL-generator.html)
* [API definition generator](API-definition-generator.html)
* [Application generator](Application-generator.html)
* [Boot script generator](Boot-script-generator.html)
* [Data source generator](Data-source-generator.html)
* [Middleware generator](Middleware-generator.html)
* [Model generator](Model-generator.html)
* [Property generator](Property-generator.html)
* [Relation generator](Relation-generator.html)
* [Remote method generator](Remote-method-generator.html)
* [Swagger generator](Swagger-generator.html)
* [Refresh definitions command](Refresh-definitions-command.html)
