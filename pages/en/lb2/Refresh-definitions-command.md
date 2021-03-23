---
title: "Refresh definitions command"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Refresh-definitions-command.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

Use:

```shell
$ apic loopback:refresh
```

Creates or re-creates product and an API definition files from the LoopBack application models.
The generator creates or re-creates two files in the `definitions` directory:

- `<project-name>.yaml` - API definition in [OpenAPI 2.0 (Swagger)](http://swagger.io/specification/) format.
- `<project-name>-product.yaml` - Product definition file in YAML format.  See the [API Connect documentation](http://www.ibm.com/support/knowledgecenter/en/SSFS6T/com.ibm.apic.toolkit.doc/capim_cli_product_yaml_example.html) for an example.

Where `<project-name>` is the name of the project (app).
