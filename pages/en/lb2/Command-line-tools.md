---
title: "Command-line-tools"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Command-line-tools.html
summary: This article summarizes LoopBack CLI tool commands.
---
Two command-line tools are available for Loopback:

- StrongLoop command-line tools: `slc loopback`.
- IBM API Connect developer toolkit CLI: `apic loopback`.

You use these tools to create and _scaffold_ applications.  Scaffolding simply means generating the basic code for your application.
You can then extend and modify the code as desired for your specific needs.

The command-line tools provide an [Application generator](Application-generator.html) to create a new LoopBack application
and a number of sub-generators to scaffold an application, as described in the following table.
The commands are listed roughly in the order that you would use them.

## Commands

{% include content/commands.html %}

## Using Yeoman

Under the hood, the command-line tools use [Yeoman](http://yeoman.io/). If you are already using Yeoman and are comfortable with it, you can install the LoopBack generator directly with the command:

```shell
$ npm install -g generator-loopback.
```

Then instead of using `slc loopback:<command>` use `yo loopback:<command>` instead. For example, to create a new model, use `yo loopback:model`.
