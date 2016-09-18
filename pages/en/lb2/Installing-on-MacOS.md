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

### Compiler tools

If you want features such as [application profiling](https://docs.strongloop.com/display/SLC/Profiling) or [monitoring](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics), you may need to install compiler tools before you start.  See [Installing compiler tools](/doc/{{page.lang}}/lb2/Installing-compiler-tools.html#macos) for more information.

### Set directory permissions

{% include warning.html content="
Changing privileges like this is appropriate _only_ on your local development system. Never do this on a production or public-facing server system.
" %}

To install Node and StrongLoop, you need to have permission to write to the following directories:

*   `/usr/local/bin` 

*   `/usr/local/lib/node_modules`

{% include important.html content="
If these directories do not exist, you will need to create them.
" %}

Although you can work around this by using `sudo`, in general, it's not a good idea. Rather, best practice is to explicitly set directory ownership and privileges explicitly as follows:

```
$ sudo chown -R $USER /usr/local/bin
$ sudo chown -R $USER /usr/local/lib/node_modules
```

These commands make your user account the owner of the `/usr/local/bin`  and `/usr/local/lib/node_modules` directories. Then you won't have to use `sudo` to install Node or install packages globally with `npm`.  For more information, see [How to Node](http://howtonode.org/introduction-to-npm).

### Install Node.js

If you haven't already installed Node, download the [native installer from nodejs.org](http://nodejs.org/download) and run it.

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

If you run into any problems, see [Installation troubleshooting](/doc/{{page.lang}}/lb2/Installation-troubleshooting.html).
