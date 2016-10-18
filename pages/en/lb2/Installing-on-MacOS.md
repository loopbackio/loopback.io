---
title: "Installing on MacOS"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Installing-on-MacOS.html
summary:
---

## Prerequisites

### Install compiler tools

If you want features such as [application profiling](https://docs.strongloop.com/display/SLC/Profiling) or [monitoring](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics), you may need to install compiler tools before you start.  See [Installing compiler tools](Installing-compiler-tools.html#macos) for more information.

### Set directory permissions

{% include content/node-dir-privs.md %}

### Install Node.js

If you haven't already installed Node, download the [native installer from nodejs.org](http://nodejs.org/en/download) and run it.

{% include tip.html content="For best results, use the latest LTS (long-term support) release of Node.js.
" %}

## Install StrongLoop

Follow these steps:

1.  Open a Terminal window.
2.  Enter this command:

    `$ npm install -g strongloop`

    If you didn't set your file and directory privileges as instructed above, use this command (not recommended):

    `$ sudo npm install -g strongloop`

    {% include note.html content="During installation, you may see a number of errors from `node-gyp` if you don't have [compiler tools](Installing-compiler-tools.html) installed. You can ignore the errors for now.
    " %}

If you run into any problems, see [Installation troubleshooting](Installation-troubleshooting.html).
