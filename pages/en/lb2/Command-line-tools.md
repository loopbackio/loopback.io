---
title: "Command-line-tools"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Command-line-tools.html
summary:
---
{% include note.html content="There are two similar command-line tools available for Loopback: the StrongLoop `slc loopback` commands and the IBM API Connect `apic loopback` commands.
" %}

You use these tools to create and _scaffold_ applications.  Scaffolding simply means generating the basic code for your application.  You can then extend and modify the code as desired for your specific needs.

The command-line tools provide an [Application generator](Application-generator.html) to create a new LoopBack application and a number of sub-generators to scaffold an application, as described in the following table. The commands are listed roughly in the order that you would use them.

Under the hood, the command-line tools use [Yeoman](http://yeoman.io/). If you are already using Yeoman and are comfortable with it, you can install the LoopBack generator directly with the command:

```sh
npm install -g generator-loopback.
```

Then instead of using `slc loopback <command>` use `yo loopback:<command>` instead. For example, to create a new model, use `yo loopback:model`.

<table>
  <thead><tr>
  <th width="270">Commands</th>
  <th width="200">See</th>
  <th>Description</th>
  </thead>
  <tbody>
<tr markdown="1">
<td markdown="1"> `slc loopback` <br/>`apic loopback`
<td markdown="1">  [Application generator](/doc/en/lb2/Application-generator.html)
<td markdown="1">  Create a new LoopBack application.

<tr markdown="1">
<td markdown="1"> `slc loopback:datasource` <br/> `apic create --type datasource`
<td markdown="1"> [Data source generator](/doc/en/lb2/Data-source-generator.html)
<td markdown="1"> Add a new data source to a LoopBack application
<tr>
<td markdown="1"> `slc loopback:model` <br/> `apic create --type model`
<td markdown="1"> [Model generator](/doc/en/lb2/Model-generator.html)
<td markdown="1"> Add a new model to a LoopBack application.
<tr>
<td markdown="1"> `slc loopback:property` <br/> `apic loopback:property`
<td markdown="1"> [Property generator](/doc/en/lb2/Property-generator.html)
<td markdown="1"> Add a new property to an existing model.
<tr>
<td markdown="1"> `slc loopback:acl` <br/> `apic loopback:acl`
<td markdown="1"> [ACL generator](/doc/en/lb2/ACL-generator.html)
<td markdown="1"> Add a new access control list (ACL) entry to the LoopBack application.
<tr>
<td markdown="1"> `slc loopback:relation` <br/> `apic loopback:relation`
<td markdown="1"> [Relation generator](/doc/en/lb2/Relation-generator.html)
<td markdown="1"> Add a new model relationship.
<tr>
<td markdown="1"> `slc loopback:remote-method` <br/> `apic loopback:remote-method`
<td markdown="1"> [Remote method generator](/doc/en/lb2/Remote-method-generator.html)
<td markdown="1"> Add a new [remote method.](/doc/en/lb2/Remote-methods.html)
<tr>
<td markdown="1"> `slc loopback:middleware` <br/> `apic loopback:middleware`
<td markdown="1"> [Middleware generator](/doc/en/lb2/Middleware-generator.html)
<td markdown="1"> Add a new [middleware](/doc/en/lb2/Defining-middleware.html) configuration.
<tr>
<td markdown="1"> `slc loopback:boot-script` <br/> `apic loopback:boot-script`
<td markdown="1"> [Boot script generator](/doc/en/lb2/Boot-script-generator.html)
<td markdown="1"> Add a new [boot scripts](/doc/en/lb2/Defining-boot-scripts.html).
<tr>
<td markdown="1"> `slc loopback:export-api-def` <br/> `apic loopback:export-api-def`
<td markdown="1"> [API definition generator](/doc/en/lb2/API-definition-generator.html)
<td markdown="1"> Export Swagger API definition.
<tr>
<td markdown="1"> `slc loopback:swagger` <br/> `apic loopback:swagger`
<td markdown="1"> [Swagger generator](/doc/en/lb2/Swagger-generator.html)
<td markdown="1"> Generates a fully-functional application that provides APIs conforming to the [Swagger](http://swagger.io/) 2.0 specification.
<tr>
<td> <code>apic loopback:refresh</code></td>
<td>&nbsp;</td>  
<td> Generate a product and an OpenAPI (Swagger) definition</td></tr>
