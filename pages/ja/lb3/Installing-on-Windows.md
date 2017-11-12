---
title: "Installing on Windows"
lang: ja
layout: page
keywords: LoopBack
tags: installation
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Installing-on-Windows.html
summary: Follow the procedure below to install StrongLoop on Windows.
---
{% include content/slc-warning.md %}

Installing Node and StrongLoop on Windows presents some special challenges and requirements. 

{% include important.html content="StrongLoop Process Manager does not run on Windows. Therefore, you cannot use it to deploy an application _to_ a Windows system. However, you can build and deploy on a Windows system and deploy from there to a Linux or MacOS system.
" %}

## Prerequisites

{% include content/install-compiler-tools.md %}

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

```
C:\> git config --system core.longpaths true
```

### Install Node.js

If you haven't already installed Node, [download and install Node.js](http://nodejs.org/en/download).  For best results, use the latest LTS (long-term support) release of Node.js.

{% include warning.html content="LoopBack does not support Node.js versions prior to 4.x.
" %}

## Install latest version of npm

The version of npm installed as part of the Node installation has known issues on Windows. To avoid these problems, install the latest version of [npm](https://www.npmjs.com/package/npm):

```
C:\> npm install -g npm
```

## Install StrongLoop

{% include important.html content="Node does not support Cygwin. You must use the Windows Command Prompt (shell).
" %}

Follow these steps:

1.  After installing the prerequisites as instructed above, restart your machine to ensure all configuration changes have taken effect.
2.  Open a Windows Command Prompt. 
3.  Install StrongLoop:

    ```
    C:\> npm install -g strongloop
    ```

## Troubleshooting

Try the following:

1.  Restart Windows, to ensure configuration has taken effect.

2.  Verify dependencies are installed:

    *   `python --version`
        Should be 2.7.x
    *   `node --version`
        Should be v4.0 or greater.
    *   `npm --version`
        Should be 2.x or 3.x.

If you continue to have problems installing StrongLoop:

*   IBM customers entitled to support, please open an issue in the [IBM support portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214).
*   Open-source users, please search the [LoopBack Developer Forum](https://groups.google.com/forum/#!forum/loopbackjs).  If you don't find an answer, post your issue there.

In general, provide as much information as possible.  If `npm install` failed, attach the `npm-debug.log` file.

### Confirm basic npm actions

Ensure you can install a simple npm package.  Enter this command in a Windows Command Prompt shell:

```
C:\> npm install -g semver
```

You should not see any error messages.  Then enter:

```
C:\> semver --help
```

You should see a usage message displayed in the Command Prompt window.

Ensure you can install a simple Node compiled addon.  Enter this command in a Windows Command Prompt shell:

```
C:\> npm install -g buffertools
```

This command should compile and install without errors.

### Tips and tricks

If you have multiple versions of Python installed, use this command to select which one npm uses for building compiled add-ons:

```
npm config set python c:/Python2.7/python
```

If you have multiple versions of Microsoft Visual Studio installed, use this command to select which one npm uses to build compiled add-ons:

```
set GYP_MSVS_VERSION=2012
```

Or append `npm --msvs_version=2012` or `--msvs_version=2013` (as appropriate) to the end of npm install commands, for example: `npm install -g strongloop --msvs_version=2012`.

If you are behind a corporate proxy, you may need to configure npm to use it:

```
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```
