---
title: "Data source generator"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Data-source-generator.html
summary:
---

The LoopBack data source generator adds a new data source definition to an existing application.

```
$ cd <loopback-app-dir>
$ slc loopback:datasource [name]
```

The tool will prompt you:

*   To enter the name of the new data source.  If you supplied a name on the command-line, just hit **Enter** to use it.
*   To select the connector to use for the data source.

For example:

```
$ slc loopback:datasource
[?] Enter the data-source name: corp2
[?] Select the connector for corp2: (Use arrow keys)
  other
❯ In-memory db (supported by StrongLoop)
  MySQL (supported by StrongLoop)
  PostgreSQL (supported by StrongLoop)
  Oracle (supported by StrongLoop)
  Microsoft SQL (supported by StrongLoop)
  MongoDB (supported by StrongLoop)
  SOAP webservices (supported by StrongLoop)
  REST services (supported by StrongLoop)
  Neo4j (provided by community)
  Kafka (provided by community)
  other
```

{% include important.html content="

By default, not all the choices are shown initially. Move the cursor down to display additional choices.

" %}
