---
title: "Installing StrongLoop"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: installation
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Installing-StrongLoop.html
summary:
---
{% include content/slc-warning.md %}

StrongLoop's Node platform consists of:

*   [LoopBack](index.html), an open-source Node application framework based on [Express](http://expressjs.com/).
*   [StrongLoop Process Manager](https://strong-pm.io) and related devops tools for Node applications.

{% include important.html content="StrongLoop Arc and `slc` are no longer under active development, and will soon be deprecated. Arc's features are being included in the [IBM API Connect v5 developer toolkit](https://developer.ibm.com/apiconnect).  
" %}

## What you're going to do

Follow the instructions for your operating system:

* [MacOS](Installing-on-MacOS.html)
* [Windows](Installing-on-Windows.html)
* [Linux](Installing-on-Linux.html)

You're going to run **`npm install -g strongloop`**, which installs:

*   The StrongLoop command-line tool, `slc`, for creating LoopBack applications and for running and managing Node applications.
*   [LoopBack Angular command line tools](https://github.com/strongloop/loopback-sdk-angular-cli). See [AngularJS JavaScript SDK](AngularJS-JavaScript-SDK) for details.
*   StrongLoop Arc, a graphical tool suite for the API lifecycle, including tools for building, profiling and monitoring Node apps. **NOTE**: StrongLoop Arc is deprecated in favor of [API Connect](https://developer.ibm.com/apiconnect/) API Designer.
*   Various other tools, Including [Yeoman](http://yeoman.io/), the LoopBack Yeoman generators to create and scaffold LoopBack applications, and [Grunt](http://gruntjs.com/), the JavaScript task runner.
