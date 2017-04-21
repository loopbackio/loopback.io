---
title: "Data source generator"
lang: en
layout: page
keywords: LoopBack
tags: [data_sources, tools]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Data-source-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

### Synopsis

Adds a new data source definition to a LoopBack application.

```
lb datasource [options] [<name>]
```

With IBM API Connect developer toolkit:

```
apic create --type datasource [options] --name [<name>]
```

With legacy StrongLoop tools:

```
slc loopback:datasource [options] [<name>]
```

### Options

`-n, --name`
With IBM API Connect developer toolkit only, optionally provide the name of the
data source as the value of this option. 
If provided, the tool will use that as the default when it prompts for the name.

`-h, --help`
Print the generator's options and usage.

`--skip-cache`
Do not remember prompt answers. Default is false.

`--skip-install`
Do not automatically install dependencies. Default is false.

`--bluemix`
Add a datasource from Bluemix.

### Arguments

You can optionally provide the name of the data source to create as an argument.  If you do, the tool will use that as the default when it prompts for the name.

### Interactive Prompts

If you run the generator without the `--bluemix` option, the tool will prompt you for:

* Name of the new data source.  If you supplied a name on the command-line, just hit Enter to use it.
* Connector to use for the data source.

You must install the [connector](Connecting-models-to-data-sources.html) for the new data source; for example: `npm install --save loopback-connector-mysql`

If you run the generator with the `--bluemix` option, the tool will prompt you for:

* Selecting a data service provisioned on Bluemix

A Bluemix datasource can only be added once.

### Output

This adds an entry to [`datasources.json`](datasources.json.html) with the specified settings.

If you selected a Bluemix datasource, it will be entered in the `.bluemix/datasources-config.json` file.
