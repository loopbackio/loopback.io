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

StrongLoop's Node API platform consists of:

*   [LoopBack](/doc/{{page.lang}}/lb2/index.html), an open-source Node application framework based on [Express](http://expressjs.com/).
*   [StrongLoop Process Manager](https://strong-pm.io) and related devops tools for Node applications.

{% include important.html content="StrongLoop Arc and `slc` are no longer under active development, and will soon be deprecated. Arc's features are being included in the [IBM API Connect Developer Toolkit](https://developer.ibm.com/apiconnect).
" %}

## What you're going to do

Follow the instructions for your operating system:

* [MacOS](/doc/{{page.lang}}/lb2/Installing-on-MacOS.html)
* [Windows](/doc/{{page.lang}}/lb2/Installing-on-Windows.html)
* [Linux](/doc/{{page.lang}}/lb2/Installing-on-Linux.html)

You're going to run **`npm install -g strongloop`**, which installs:

*   The StrongLoop command-line tool, `slc`, for creating LoopBack applications and for running and managing Node applications.
*   [LoopBack Angular command line tools](https://github.com/strongloop/loopback-sdk-angular-cli). See [AngularJS JavaScript SDK](/doc/{{page.lang}}/lb2/AngularJS-JavaScript-SDK) for details.
*   StrongLoop Arc, a graphical tool suite for the API lifecycle, including tools for building, profiling and monitoring Node apps. **NOTE**: StrongLoop Arc is deprecated in favor of [API Connect](https://developer.ibm.com/apiconnect/) API Designer.
*   Various other tools, Including [Yeoman](http://yeoman.io/), the LoopBack Yeoman generators to create and scaffold LoopBack applications, and [Grunt](http://gruntjs.com/), the JavaScript task runner.
