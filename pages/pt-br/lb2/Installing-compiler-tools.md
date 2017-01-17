---
title: "Instalação de ferramentas de compilação"
lang: pt-br
trans_complete: false
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: pt-br_lb2_sidebar
permalink: /doc/pt-br/lb2/Installing-compiler-tools.html
summary: Para instalar as ferramentas StrongLoop (não o API Connect), você deve ter ferramentas de compilação instaladas.
---

{% include see-also.html title="no" content="
**Porque eu preciso instalar um compilador?**

Alguns recursos devops tais como [monitoramento](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics) e [memória / criação de perfil de CPU](https://docs.strongloop.com/display/SLC/Profiling) obriga código nativo (C++). StrongLoop distribui seu software com npm, mas npm compila código nativo após a instalação.  Therefore, to take advantage of these features, you must install a compiler.  If you don't want these features, you may see error messages, but you should still be able install successfully.
" %}

{% include toc.html level=1 %}

## Visão geral

Se você não tiver um compilador C++ (Visual C++ on Windows or XCode on OSX) e ferramentas de linha de comando associadas, você não será capaz de visualizar métricas úteis, e você não será capaz de realizar [criação de perfil de CPU](https://docs.strongloop.com/display/SLC/CPU-profiling) ou [take heap snapshots](https://docs.strongloop.com/display/SLC/Taking-heap-snapshots). 

{% include important.html content="Se você não tiver ferramentas de compilação, quando executar sua aplicação, poderá ver mensagens de erro tais como \"**strong-agent could not load optional native add-on**\".

To eliminate the error messages and enable monitoring and tracing features, install the appropriate C++ compiler and related tools as described below.
" %}

### Configuring Python directory

Npm uses [node-gyp](https://www.npmjs.org/package/node-gyp) to compile native modules, and node-gyp requires Python.  If you installed Python in a non-standard directory, run this command to configure your setup:

`$ npm config set python /path/to/python`

where `/path/to/python` is the directory where Python is installed.

For more information, see the [node-gyp documentation](https://github.com/TooTallNate/node-gyp/blob/master/README.md#installation).

## Windows

Install the following:

*   [Python](http://www.python.org/getit/windows) ([v2.7.3](http://www.python.org/download/releases/2.7.3#download) recommended, v3.x.x is **_not_** supported). 
*   [Microsoft Visual Studio](http://www.visualstudio.com/) C++ 2013 (or later) for Windows Desktop.  The [Express](http://go.microsoft.com/) version works well.

For Windows 7:

*   For 64-bit builds of Node and native modules you will also need the [Windows 7 64-bit SDK](http://www.microsoft.com/en-us/download/details.aspx).  If the install fails, try uninstalling any C++ 2010 x64&x86 Redistributable that you have installed first.
*   If you get errors that the 64-bit compilers are not installed you may also need the [compiler update for the Windows SDK 7.1](http://www.microsoft.com/en-us/download/details.aspx).

### Python

`npm` uses Python 2.7 (not 3.x, and not 2.6.x or earlier) to install packages with compiled add-ons (such as strong-agent, or websocket support).

Download Python 2.7.x from [http://python.org](http://python.org/):

1.  Go to [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
2.  Download latest stable 2.7.x Windows MSI Installer, either x86 or x86-64, as appropriate
3.  Run installer, and make sure to add to Path:
    *   Accept the default, **Install for all users**.
    *   Accept default "c:\Python27" for Python files.
    *   Enable the option **Add python.exe to Path**.

### Visual Studio

{% include note.html content="
Visual Studio Community is free, and more than adequate to support Node.js.

Node.js does not support gcc, mingw, Cygwin, and other ports of non-Microsoft compilers to Windows.
" %}

`npm` uses Visual Studio 2012 or later to install packages with compiled add-ons (like strong-agent, or websocket support).  

For Windows 7 and 8, use **Microsoft Visual Studio 2015** (Community):

1.  Go to: [https://www.visualstudio.com/downloads/download-visual-studio-vs](https://www.visualstudio.com/downloads/download-visual-studio-vs)
2.  Select "Download Community Free", then download "**vs_community_ENU.exe**" , and next

If the download doesn't start, click the **Click here** link, then on the next download page, click the **Click here** link beside **vs_community_ENU.exe**.

Run the installer, check "Visual C++" under "Programming Languages", and accept the default location.

{% include note.html content="This installation may take a long time.
" %}

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
