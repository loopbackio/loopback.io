---
title: Installation
lang: en
keywords: LoopBack
tags: [getting_started]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Installation.html
summary: You can install LoopBack via either API Connect or StrongLoop.
---

{% include tip.html content="Although in theory, you could code a LoopBack
application from scratch, installing LoopBack tools makes it much easier to get
started.  They will scaffold an application that you can then customize to suit
your needs.  For more information, see [Command-line tools](Command-line-tools.html).
" %}

You have two options for LoopBack tools:

- **[Install IBM API Connect developer toolkit](Installing-IBM-API-Connect.html)**, which includes:
  - The graphical _API Designer_ tool that you can use to create and modify LoopBack applications.
  - The `apic` command-line tool for scaffolding and modifying LoopBack applications.

- **[Install StrongLoop](Installing-StrongLoop.html)**, which includes:
  - The `slc` command-line tool for scaffolding and modifying LoopBack applications.
  - Tools for the [AngularJS client SDK](AngularJS-JavaScript-SDK.html).
  - [StrongLoop Process Manager](http://strong-pm.io/) and related devops tools.
  - The graphical _StrongLoop Arc_ tool for creating and modifying LoopBack applications. 

  {% include important.html content="StrongLoop Arc and `slc` are no longer under active development, and will soon be deprecated. Arc's features are being included in the [IBM API Connect Developer Toolkit](https://developer.ibm.com/apiconnect).

  If you're new to LoopBack, [install the LoopBack CLI tool](../lb3/Installation.html) instead.  It supports both LoopBack 2.x and 3.x.
  " %}
