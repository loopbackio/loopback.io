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

{% include important.html content="

Follow these instructions to install StrongLoop for development.  To install a production system, see [Setting up a production host](https://docs.strongloop.com/display/SLC/Setting-up-a-production-host).

" %}

## Prerequisites

### Install compiler tools.

If you want features such as [application profiling](https://docs.strongloop.com/display/SLC/Profiling) or [monitoring](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics), you may need to install compiler tools before you start.  

{% include tip.html content="

Many Linux distributions come with the necessary tools. See [Installing compiler tools](/doc/en/lb2/Installing-compiler-tools.html#Installingcompilertools-Linu) for detailed requirements.

" %}

### Set directory privileges

{% include warning.html content="

Changing privileges like this is appropriate _only_ on your local development system. Never do this on a server system.

" %}

To install Node and StrongLoop , you need permissions to write to directories:

*   `/usr/local/bin` 
*   `/usr/local/lib/node_modules` 

If you see errors such as:

```
npm ERR! Error: EACCES, mkdir '/usr/local/lib/node_modules/strongloop'
...
npm ERR! Please try running this command again as root/Administrator
...
```

Then you don't have the required rights to create files or directories.  Either change the rights for the specified directories, or run the command using `sudo`.  In general, it's better to fix the directory rights as follows:

`$ sudo chown -R $USER /usr/local`

This command makes your user account the owner of the `/usr/local` directory. Then you won't ever have to use `sudo` to install Node or install packages globally with `npm`. For more information, see [How to Node](http://howtonode.org/introduction-to-npm).

{% include warning.html content="

**DO NOT** use the above `chown` command on the `/usr/bin` directory. Doing so can severely misconfigure your system.

" %}

If you have to use `sudo`, use the following command:

`$ sudo npm install -g --unsafe-perm install strongloop`

Install Node.js

Follow the instructions in [Installing Node.js via package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).  See also [NodeSource Node.js and io.js Binary Distributions](https://github.com/nodesource/distributions/blob/master/README.md).

{% include tip.html content="

For best results, use the latest LTS (long-term support) release of Node.js.

" %}

## Install StrongLoop  

Follow these steps:

1.  Open a terminal window

2.  Enter this command:

    `$ npm install -g strongloop`

    If you didn't set your file and directory privileges as instructed above, you may need to use this command (not recommended):

    `$ sudo npm install -g strongloop`

    {% include note.html content="

    During installation, you may see a number of errors from `node-gyp` if you don't have [compiler tools](/doc/en/lb2/Installing-compiler-tools.html) installed. These errors only prevent you from performing certain monitoring and management functions such as [CPU profiling](https://docs.strongloop.com/display/SLC/CPU-profiling) and [Heap memory profiling](https://docs.strongloop.com/display/TRASH/Heap-memory-profiling) with `slc`; If you need those functions, then [install compiler tools](/doc/en/lb2/Installing-compiler-tools.html) before continuing. Otherwise, you can ignore the errors for now.

    " %}

If you run into any problems, see [Installation troubleshooting](/doc/en/lb2/Installation-troubleshooting.html).

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