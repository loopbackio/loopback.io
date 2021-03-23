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

With IBM API Connect v5 developer toolkit:

```
apic create --type datasource [options] --name [<name>]
```

With legacy StrongLoop tools:

```
slc loopback:datasource [options] [<name>]
```

### Options

`--bluemix`
 : Fetch provisioned data source services from IBM Cloud and present them in the list of choices for
 data source to add. Currently lists only Cloudant, MongoDB, and IBM Object Storage services. You will be prompted to log in if you are not already authenticated.

`-n, --name`
: With IBM API Connect v5 developer toolkit only, optionally provide the name of the
data source as the value of this option. 
If provided, the tool will use that as the default when it prompts for the name.

 {% include_relative includes/CLI-std-options.md %}

### Arguments

You can optionally provide the name of the data source to create as an argument.  If you do, the tool will use that as the default when it prompts for the name.

### Interactive Prompts

The tool will prompt you for:

* Name of the new data source.  If you supplied a name on the command-line, just hit Enter to use it.
* Connector to use for the data source.
  If you run the generator with the `--bluemix` option, you will be presented with a list of provisioned data services from IBM Cloud.

You must install the [connector](Connecting-models-to-data-sources.html) for the new data source; for example: `npm install --save loopback-connector-mysql`

### Output

This adds an entry to [`datasources.json`](datasources.json.html) with the specified settings.

If you selected a IBM Cloud data source, it will be entered in the `.bluemix/datasources-config.json` file.
