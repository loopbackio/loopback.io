---
title: Installation
lang: en
keywords: LoopBack
tags: [installation]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Installation.html
summary: Install LoopBack tools to create and develop LoopBack 3.0 apps.
---

## Prerequisite: install Node.js

If you haven't already installed Node, [download and install Node.js](http://nodejs.org/en/download).  For best results, use the latest LTS (long-term support) release of Node.js.

{% include warning.html content="LoopBack does not support Node.js versions prior to 4.x.
" %}

## Install LoopBack tools

Although in theory, you could code a LoopBack
application from scratch, installing a LoopBack CLI tool makes it much easier to get
started.  It will scaffold an application that you can then customize to suit
your needs.  For more information, see [Command-line tools](Command-line-tools.html).

You have two options for LoopBack tools:

- **[LoopBack CLI tool](#install-loopback-cli-tool)**
- **[IBM API Connect v5 developer toolkit](#install-ibm-api-connect-developer-toolkit)**

You can also use the legacy StrongLoop CLI tool `slc`.

### Install LoopBack CLI tool

To install the LoopBack command-line interface (CLI) tool, enter the command:

```
npm install -g loopback-cli
```

This installs the `lb` command-line tool for scaffolding and modifying LoopBack applications.
For more information, see [Command-line tools](Command-line-tools.html).

### Install IBM API Connect v5 developer toolkit

[IBM API Connect](https://developer.ibm.com/apiconnect/) is an end-to-end API management solution that uses LoopBack to create APIs, and provides integrated build and deployment tools:

- **Integrated experience across the entire API lifecycle**, including API and micro-service creation in Node.js and Java.
-  **Self-service access to APIs** with built-in developer portals and social collaboration tools.
-  **Unified management and orchestration of Node.js and Java** for deployment on-premises and in IBM Cloud.
-  **Built-in security and gateway policies** with extensive security options and governance policies.

For more information, see [IBM API Connect](https://developer.ibm.com/apiconnect/).


IBM API Connect v5 developer toolkit includes:
  - The graphical _API Designer_ tool that you can use to create and modify LoopBack applications.
  - The `apic` command-line tool for scaffolding and modifying LoopBack applications.

To install IBM API Connect v5 developer toolkit:

```sh
$ npm install -g apiconnect
```

For more information, see [Installing the API Connect Developer Toolkit](http://www.ibm.com/support/knowledgecenter/SSFS6T/com.ibm.apic.toolkit.doc/tapim_cli_install.html).

{% include important.html content="**If you are an IBM customer, for technical support see the [IBM Support Portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214).**
" %}

## Updating your installation

Update your installation with this command:

```
$ npm install -g strongloop
```

If you encounter any problems, you may need to perform a clean reinstallation.  Follow these steps:

```
$ npm uninstall -g strongloop
$ npm cache clear
$ npm install -g strongloop
```

## Next steps

Follow [Getting started with LoopBack](Getting-started-with-LoopBack.html)
and read [LoopBack core concepts](LoopBack-core-concepts).
