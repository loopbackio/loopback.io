---
title: "Model generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Model-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

### Synopsis

Adds a new model to a LoopBack application.

```shell
apic create --type model [options] [<name>]
```

Or:

```shell
slc loopback:model
```

### Options

`-h, --help`
Print the generator's options and usage.

`--skip-cache`
Do not remember prompt answers. Default is false.

`--skip-install`
Do not automatically install dependencies. Default is false.

### Arguments

You can optionally provide the name of the model to create as an argument to the command. 
If you do, the tool will use that as the default when it prompts for the name.

### Interactive Prompts

The tool will prompt you for:

* Name of the model.  
  If you supplied a name on the command-line, just hit Enter to use it.
* Data source to which to attach the model. 
  The tool will list all data sources defined in the application's [`datasources.json`](datasources.json.html) file.
  By default, only the [Memory connector](Memory-connector.html) data source exists. 
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

Depending your response to the last prompt, the tool will create a new file defining the model; either `/common/models/_model-name_.json` (for use by client and server) or `/server/models/_model-name_.json` (server only).  See [Model definition JSON file](Model-definition-JSON-file.html) for details.
