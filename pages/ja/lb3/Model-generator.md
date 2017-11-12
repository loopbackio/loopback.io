---
title: "Model generator"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Model-generator.html
summary:
---

{% include content/ja/generator-create-app.html %}

### Synopsis

Adds a new model to a LoopBack application.

```
lb model [options] [<name>]
```

With IBM API Connect developer toolkit:

```
apic create --type model [options] [--name <name>]
```

With legacy StrongLoop tools:

```
slc model [options] [<name>]
```

### Options

`--bluemix`
: Lists only IBM Cloud data sources in the datasource option for the new model.

{% include_relative includes/CLI-std-options.md %}

### Arguments

`<name>` - Optional name of the model to create as an argument to the command. 
If provided, the tool will use that as the default when it prompts for the name.

### Interactive Prompts

The tool will prompt you for:

* Name of the model.  
  If you supplied a name on the command-line, just hit Enter to use it.
* Data source to which to attach the model. 
  If you run the generator without the `--bluemix` option, the tool will list all data sources defined in the application's [`datasources.json`](datasources.json.html) file.
  By default, only the [Memory connector](Memory-connector.html) data source exists. 
  If you run the generator with the `--bluemix` option, you will be prompted to select a IBM Cloud datasource. If no IBM Cloud datasource was added, the generator will exit with an error message. 
  Add additional data sources using the [Data source generator](Data-source-generator.html).
* Whether you want to expose the model over a REST API.
  If the model is exposed over REST, then all the standard create, read, update, and delete (CRUD) operations are available via REST endpoints.
  See [PersistedModel REST API](PersistedModel-REST-API.html) for more information.
  You can also add your own custom remote methods that can be called via REST operations; see [Remote methods](Remote-methods.html).
* If you choose to expose the model over REST, the custom plural form of the model.  
  By default, the LoopBack uses the standard English plural of the word.  
  The plural form is used in the REST API; for example `http:``//localhost:3000/api/locations`.
* Whether you want to create the model on the server only or for both server and client LoopBack APIs
  (see [LoopBack in the client](LoopBack-in-the-client.html) for more information on the LoopBack client API).

Then, the tool will invoke the [Property generator](Property-generator.html) and prompt you to enter model properties

### Output

Depending your response to the last prompt, the tool will create a new file defining the model; either <code>/common/models/<i>model-name</i>.json</code> (for use by client and server) or <code>/server/models/<i>model-name</i>.json</code> (server only).  See [Model definition JSON file](Model-definition-JSON-file.html) for details.
