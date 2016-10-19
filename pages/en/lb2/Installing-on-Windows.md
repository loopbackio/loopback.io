---
title: "Installing on Windows"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Installing-on-Windows.html
summary:
---

Installing Node and StrongLoop on Windows presents some special challenges and requirements. 

{% include important.html content="
StrongLoop Process Manager does not run on Windows. Therefore, you cannot use it to deploy an application _to_ a Windows system. However, you can build and deploy on a Windows system and deploy from there to a Linux or MacOS system.
" %}

## Prerequisites

### Install compiler tools

If you want features such as [application profiling](https://docs.strongloop.com/display/SLC/Profiling) or [monitoring](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics), you must install compiler tools and Python before you start.  See [Installing compiler tools](Installing-compiler-tools.html#windows) for more information.

### Install Git

The Node package manager tool, npm, uses Git to download packages from Github. 

To install Git:

1.  Go to [http://git-scm.com/download](http://git-scm.com/download),
2.  Download the version for Windows.  Currently this is version 1.9.4.
3.  Run installer:
    *   Accept default install location
    *   Accept or modify Components
    *   Accept start menu folder
    *   Modify "Adjusting your PATH environment" to "Use Git from Windows Command Prompt"
    *   Accept default "Configuring the line ending conversions"

**Configuration**

By default, Git on Windows does not support paths longer than 260 characters; to avoid errors you must enable long paths with the following command:

`C:\> git config --system core.longpaths true`

### Install Node.js

1.  Go to [http://nodejs.org/download/](http://nodejs.org/download/).
2.  Download the latest "Windows Installer (.msi)", 32 or 64-bit, as appropriate.
3.  Run the installer.

{% include tip.html content="
For best results, use the latest LTS (long-term support) release of Node.js.
" %}

## Install latest version of npm

The version of npm installed as part of the Node installation has known issues on Windows. To avoid these problems, install the latest version of [npm](https://www.npmjs.com/package/npm):

`C:\> npm install -g npm`

## Install StrongLoop

{% include important.html content="
Node does not support Cygwin. You must use the Windows Command Prompt (shell).
" %}

Follow these steps:

1.  After installing the prerequisites as instructed above, restart your machine to ensure all configuration changes have taken effect.
2.  Open a Windows Command Prompt. 
3.  Install StrongLoop:

    `C:\> npm install -g strongloop`

## Troubleshooting

Try the following:

1.  Restart Windows, to ensure configuration has taken effect.

2.  Verify dependencies are installed:

    *   `python --version`
        Should be 2.7.x
    *   `node --version`
        Should be v0.10.x or v0.12.x.
    *   `npm --version`
        Should be 1.x or 2.x.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>FIXME any way to determine what vs-- is installed? FIXME is there any way to determine what python and msbuild node-gyp has found?</div>

If you continue to have problems installing StrongLoop:

*   IBM customers entitled to support, please open an issue in the [IBM support portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214).
*   Open-source customers, please search the [LoopBack Developer Forum](https://groups.google.com/forum/#!forum/loopbackjs).  If you don't find an answer, post your issue there.

In general, provide as much information as possible.  If `npm install` failed, attach the `npm-debug.log` file.

### Confirm basic npm actions

Ensure you can install a simple npm package.  Enter this command in a Windows Command Prompt shell:

`C:\> npm install -g semver`

You should not see any error messages.  Then enter:

`C:\> semver --help`

You should see a usage message displayed in the Command Prompt window.

Ensure you can install a simple Node compiled addon.  Enter this command in a Windows Command Prompt shell:

`C:\> npm install -g buffertools`

This command should compile and install without errors.

### Tips and tricks

1.  If you have multiple versions of python installed, you can select which on is used by npm for building compiled addons:

    *   `npm config set python c:/Python2.7/python`
2.  If you have multiple versions of Microsoft Visual Studio installed, you can select which one npm uses to build compiled add-ons like this:

*   *   `set GYP_MSVS_VERSION=2012`, or
    *   Append `npm --msvs_version=2012` or `--msvs_version=2013` (as appropriate) to the end of npm install commands, for example: `npm install -g strongloop --msvs_version=2012`
