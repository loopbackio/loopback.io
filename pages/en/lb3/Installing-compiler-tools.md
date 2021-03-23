---
title: "Installing compiler tools"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [installation]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Installing-compiler-tools.html
summary: To install StrongLoop tools (but not API Connect), you must have compiler tools installed.
---
{% include content/slc-warning.md %}

{% include see-also.html title="Why do I need to install a compiler?" content="
Some devops features such as [monitoring](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics) and [memory / CPU profiling](https://docs.strongloop.com/display/SLC/Profiling) require native (C++) code.  StrongLoop distributes its software with npm, but npm compiles native code upon installation.  Therefore, to take advantage of these features, you must install a compiler.  If you don't want these features, you may see error messages, but you should still be able install successfully.
" %}

{% include toc.html level=1 %}

## Overview  

If you don't have a C++ compiler (Visual C++ on Windows or XCode on OSX) and associated command-line tools, you won't be able to view most useful metrics, and you won't be able to perform [CPU profiling](https://docs.strongloop.com/display/SLC/CPU-profiling) or [take heap snapshots](https://docs.strongloop.com/display/SLC/Taking-heap-snapshots). 

{% include important.html content="If you don't have compiler tools, when you run your application, you may see error messages such as \"**strong-agent could not load optional native add-on**\".

To eliminate the error messages and enable monitoring and tracing features, install the appropriate C++ compiler and related tools as described below.
" %}

### Configuring Python directory

Npm uses [node-gyp](https://www.npmjs.org/package/node-gyp) to compile native modules, and node-gyp requires Python.  If you installed Python in a non-standard directory, run this command to configure your setup:

`$ npm config set python /path/to/python`

where `/path/to/python` is the directory where Python is installed.

For more information, see the [node-gyp documentation](https://github.com/TooTallNate/node-gyp/blob/master/README.md#installation).

## Windows

Install [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools):

`C:\> npm install --global --production windows-build-tools`

This downloads Python 2.7.x and and Visual C++ Build Tools 2015. These tools are required to compile popular native modules. It will also configure your machine and npm appropriately. Both installations are conflict-free, meaning that they do not mess with existing installations of Visual Studio, C++ Build Tools, or Python.

## MacOS

Install:

*   Apple [Xcode](https://developer.apple.com/xcode/).
*   Depending on your version of MacOS and Xcode, you may need to also install the command-line tools.  To install them in Xcode:
    1.  Click **Xcode > Preferences**.
    2.  Choose **Downloads**.
    3.  Click the install button next to "Command-line Tools".

Most versions of OSX come with Python by default.  If for some reason you don't have it, [download and install Python](https://www.python.org/downloads/mac-osx/).

### Xcode license issues

If you see errors such as:

`Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.`

Then you recently upgraded or installed Xcode and haven't agreed to the license yet. 

Enter the following command to validate your Xcode license, then reinstall StrongLoop:

`$ sudo xcode-select`

## Linux

Many Linux systems come with the necessary tools.   The specific requirements are:

*   Python (v2.7 recommended; v3.x.x is **_not_** supported).  If you installed Python in a non-standard location, see [Configuring Python directory](#configuring-python-directory).
*   `make`
*   A proper C/C++ compiler toolchain, like GCC.  **NOTE**: g-- version 4.2 or later is required.

On Debian and Debian-derived distributions (Ubuntu, Mint, and so on), use the command:

`$ apt-get install build-essential`

### Adding swap space

If during installation, you see the error message:

`virtual memory exhausted: Cannot allocate memory`

Then you need to add swap space so the compiler will have enough RAM.  For example:

```
$ dd if=/dev/zero of=/swap bs=1M count=1024 
$ mkswap /swap 
$ swapon /swap
```

After entering these commands, reinstall StrongLoop.

Note that the above command does not make the change permanent.  When you reboot, you'll need to re-run the `swapon /swap` command if you want to reinstall or if your application uses binary add-ons.

For more information, see [How To Configure Virtual Memory (Swap File) on a VPS](https://www.digitalocean.com/community/tutorials/how-to-configure-virtual-memory-swap-file-on-a-vps).
