---
title: "Oracle installer command"
lang: en
layout: page
tags: [data_sources, tools]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Oracle-installer-command.html
summary:
---
{% include content/generator-create-app.html lang=page.lang %}

Utilities to install and troubleshoot [loopback-connector-oracle](https://github.com/strongloop/loopback-connector-oracle) module.

{% include note.html content="This command requires LoopBack CLI version 2.4.0+. Install the latest version of LoopBack CLI by entering the command `npm i -g loopback-cli`.
" %}

### Synopsis

```
lb oracle [options]
```

### Options

`--connector`     
: Install loopback-connector-oracle module

`--driver`
: Install oracledb module.

`--verbose`
: Print verbose information

{% include_relative includes/CLI-std-options.md %}

### Interactive Prompts

The tool determines if the Oracle Instant Client is installed and then checks
if the `loopback-connector-oracle` module can be loaded.
The `loopback-connector-oracle` module depends on the Oracle Node.js Driver [oracledb](https://github.com/oracle/node-oracledb),
which is a binary addon.
The `oracledb` module requires [Oracle Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html) at
both build and run time. See [Installation Guide for oracledb](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md)
for more information.

If `loopback-connector-oracle` is ready to use, the tool will print `Oracle connector is ready` and exit.
Otherwise, it will prompt you to install:

- Oracle Instant Client
- loopback-connector-oracle
- oracledb module
