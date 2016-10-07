---
title: "Using LoopBack tools"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Using-LoopBack-tools.html
summary:
---

LoopBack provides two powerful tools for creating and working with applications:

*   The [command-line tool slc loopback](/doc/{{page.lang}}/lb2/6095063.html).
*   [StrongLoop Arc](https://docs.strongloop.com/display/ARC/StrongLoop+Arc), a graphical tool.

## The slc loopback command-line tool

Use the `slc loopback` command to create and _scaffold_ applications.  Scaffolding simply means generating the basic code for your application.  You can then extend and modify the code as desired for your specific needs.

The `slc loopback` command provides an [Application generator](https://docs.strongloop.com/display/zh/Application+generator) to create a new LoopBack application and a number of sub-generators to scaffold an application:

*   [ACL generator](https://docs.strongloop.com/display/zh/ACL+generator)
*   [Application generator](https://docs.strongloop.com/display/zh/Application+generator)
*   [Data source generator](https://docs.strongloop.com/display/zh/Data+source+generator)
*   [Example generator](https://docs.strongloop.com/display/zh/Example+generator)
*   [Model generator](https://docs.strongloop.com/display/zh/Model+generator)
*   [Property generator](https://docs.strongloop.com/display/zh/Property+generator)
*   [Relation generator](https://docs.strongloop.com/display/zh/Relation+generator)
*   [Swagger generator](https://docs.strongloop.com/display/zh/Swagger+generator)

{% include note.html content="

The `slc` command has many additional sub-commands not specific to LoopBack for building, deploying, and managing Node applications. See [Operating Node applications](https://docs.strongloop.com/display/SLC/Operating+Node+applications) for more information and [Command-line reference](https://docs.strongloop.com/display/NODE/Command-line+reference) for the command reference.

" %}

## StrongLoop Arc

StrongLoop Arc is a graphical tool for building, deploying, and monitoring LoopBack applications. 

For more information, see [StrongLoop Arc](https://docs.strongloop.com/display/ARC/StrongLoop+Arc).
