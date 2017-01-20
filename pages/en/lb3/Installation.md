---
title: Installation
lang: en
keywords: LoopBack
tags: [installation]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Installation.html
summary: Install the LoopBack CLI tool to create and develop LoopBack 3.0 apps.
---

Although in theory, you could code a LoopBack
application from scratch, installing the LoopBack CLI tool makes it much easier to get
started.  It will scaffold an application that you can then customize to suit
your needs.  For more information, see [Command-line tools](Command-line-tools.html).


<div id="lb3apic" class="sl-hidden" markdown="1">
You have two options for LoopBack tools:

- **[Install IBM API Connect developer toolkit](Installing-IBM-API-Connect.html)**, which includes:
  - The graphical _API Designer_ tool that you can use to create and modify LoopBack applications.
  - The `apic` command-line tool for scaffolding and modifying LoopBack applications.
</div>

## Prerequisite: install Node.js

If you haven't already installed Node, [download and install Node.js](http://nodejs.org/en/download).  For best results, use the latest LTS (long-term support) release of Node.js.

{% include warning.html content="LoopBack does not support Node.js versions prior to 4.x.
" %}

## Install the LoopBack CLI tool

To install the LoopBack command-line interface (CLI) tool, enter the command:

```
npm install -g loopback-cli
```

This installs the `lb` command-line tool for scaffolding and modifying LoopBack applications.
For more information, see [Command-line tools](Command-line-tools.html).

## Next steps

Follow [Getting started with LoopBack](Getting-started-with-LoopBack.html)
and read [LoopBack core concepts](LoopBack-core-concepts).
