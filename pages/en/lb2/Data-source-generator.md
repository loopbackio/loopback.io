---
title: "Data source generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Data-source-generator.html
summary:
---

{% include important.html content="
Before running this generator, you must create an application using the [Application generator](/doc/en/lb2/Application-generator.html).

Then you must run the command from the root directory of the application."
%}

### Synopsis

Adds a new data source definition to a LoopBack application.

```shell
$ apic create --type datasource [options] [<name>]
```

Or

```shell
$ slc loopback:datasource [options] [<name>]
```

### Options

`-h, --help`
Print the generator's options and usage.

`--skip-cache`
Do not remember prompt answers. Default is false.

`--skip-install`
Do not automatically install dependencies. Default is false.

### Arguments

You can optionally provide the name of the data source to create as an argument.  If you do, the tool will use that as the default when it prompts for the name.

### Interactive Prompts

The tool will prompt you for:

* Name of the new data source.  If you supplied a name on the command-line, just hit Enter to use it.
* Connector to use for the data source.

{% include important.html content="

You must install the [connector](/doc/en/lb2/Connecting-models-to-data-sources.html) for the new data source; for example: `npm install --save loopback-connector-mysql`
" %}

### Output

This adds an entry to [`datasources.json`](/doc/en/lb2/datasources.json.html) with the specified settings.
