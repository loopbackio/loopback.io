---
title: "Installing on Linux"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Installing-on-Linux.html
summary:
---

{% include important.html content="These instructions are for a development installation, not production.
" %}

## Prerequisites

### Install compiler tools.

If you want features such as [application profiling](https://docs.strongloop.com/display/SLC/Profiling) or [monitoring](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics), you may need to install compiler tools before you start.  

{% include tip.html content="
Many Linux distributions come with the necessary tools. See [Installing compiler tools](Installing-compiler-tools.html#linux) for detailed requirements.
" %}

### Set directory privileges

{% include content/node-dir-privs.md %}

### Install Node.js

If you haven't already installed Node, [download and install Node.js](http://nodejs.org/en/download).

{% include tip.html content="For best results, use the latest LTS (long-term support) release of Node.js.
" %}

## Install StrongLoop  

Follow these steps:

1.  Open a terminal window

2.  Enter this command:

    `$ npm install -g strongloop`

    If you didn't set your file and directory privileges as instructed above, you may need to use this command (not recommended):

    `$ sudo npm install -g strongloop`

    {% include note.html content="
    During installation, you may see a number of errors from `node-gyp` if you don't have [compiler tools](Installing-compiler-tools.html) installed. You can ignore the errors for now."
    %}

If you run into any problems, see [Installation troubleshooting](Installation-troubleshooting.html).

## Errors on Ubuntu

You may see the following errors when installing on Ubuntu:

```
sqlite3@3.1.1 install /usr/local/lib/node_modules/strong-pm/node_modules/minkelite/node_modules/sqlite3
node-pre-gyp install --fallback-to-build

/usr/bin/env: node: No such file or directory
npm WARN This failure might be due to the use of legacy binary "node"
npm WARN For further explanations, please read
/usr/share/doc/nodejs/README.Debian
npm ERR! weird error 127
npm ERR! not ok code 0
```

To fix this, enter the following command:

`$ update-alternatives --install /usr/bin/node node /usr/bin/nodejs 99`
