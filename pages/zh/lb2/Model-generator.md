---
title: "Model generator"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Model-generator.html
summary:
---

The LoopBack model generator  creates a new model in an existing LoopBack application.

```
$ cd <loopback-app-dir>
$ slc loopback:model [model-name]
```

where _`model-name`_ is the name of the model you want to create (optional on command line).

The tool will prompt you for:

*   The name of the model.  If you supplied a name on the command-line, just hit **Enter** to use it.
*   The data source to which to attach the model.  By default, only the [Memory connector](/doc/{{page.lang}}/lb2/Memory-connector.html) data source exists.  You can add additional data sources using the [Data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html).
*   Whether you want to expose the model over a REST API.  If the model is exposed over REST, then all the standard create, read, update, and delete (CRUD) operations are available via REST endpoints; see [PersistedModel REST API](/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html) for more information.  You can also add your own custom remote methods that can be called via REST operations; see [远程方法（Remote methods）](/doc/{{page.lang}}/lb2/6095040.html).
*   If you choose to expose the model over REST, the custom plural form of the model.  By default, the LoopBack uses the standard English plural of the word.  The plural form is used in the REST API; for example `http:``//localhost:3000/api/locations`.

The tool will create a new file `/common/models/_model-name_.json` defining the specified model.  See [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) for details.

Then, the tool will invoke the [Property generator](/doc/{{page.lang}}/lb2/Property-generator.html) and prompt you to enter model properties; for example:

```
$ slc loopback:model
[?] Enter the model name: inventory
[?] Select the data-source to attach inventory to: db (memory)
[?] Expose inventory via the REST API? Yes
Let's add some inventory properties now.
...
```
