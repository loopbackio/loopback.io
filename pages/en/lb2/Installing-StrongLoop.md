---
title: "Installing StrongLoop"
lang: en
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Installing-StrongLoop.html
summary:
---

StrongLoop Node.js API Platform

StrongLoop's Node API platform consists of:

*   [LoopBack](/doc/en/lb2/LoopBack), an open-source Node application framework based on [Express](http://expressjs.com/).
*   [StrongLoop Process Manager](https://strong-pm.io) and related tools for working with any Node applications to:


{% include important.html content="
**If you're ready to take your API to the next level, LoopBack support is now built-in to [IBM API Connect](https://developer.ibm.com/apiconnect/)**!

For more information, see [Using LoopBack with IBM API Connect](https://docs.strongloop.com/display/APIC/Using-LoopBack-with-IBM-API-Connect)." %}

**NOTE**

StrongLoop Arc and `slc` are no longer under active development, and will soon be deprecated. Arc's features are being included in the [IBM API Connect Developer Toolkit](https://developer.ibm.com/apiconnect): Please use it instead.

## What you're going to do

Follow the instructions for your operating system:

*   [MacOS](/doc/en/lb2/Installing-on-MacOS.html)
*   [Windows](/doc/en/lb2/Installing-on-Windows.html)
*   [Linux](/doc/en/lb2/Installing-on-Linux.html)

You're going to run **`npm install -g strongloop`**, which installs:

*   The [LoopBack](/doc/en/lb2/LoopBack) framework, including [loopback](https://github.com/strongloop/loopback), [loopback-datasource-juggler](https://github.com/strongloop/loopback-datasource-juggler) modules, and numerous other related StrongLoop modules, along with modules that they require.
*   The StrongLoop command-line tool, `slc`, for creating LoopBack applications and for running and managing Node applications.
*   [StrongLoop Arc](https://docs.strongloop.com/display/APIS/Using-Arc), the unified graphical tool suite for the API lifecycle, including tools for building, profiling and monitoring Node apps.
*   [LoopBack Angular command line tools](https://github.com/strongloop/loopback-sdk-angular-cli). See [AngularJS JavaScript SDK](/doc/en/lb2/AngularJS-JavaScript-SDK) for details.
*   Various other tools, Including [Yeoman](http://yeoman.io/), the LoopBack Yeoman generators to create and scaffold LoopBack applications, and [Grunt](http://gruntjs.com/), the JavaScript task runner.
