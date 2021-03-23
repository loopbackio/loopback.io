---
title: "Installing on Linux"
lang: en
layout: page
keywords: LoopBack
tags: installation
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Installing-on-Linux.html
summary: Follow the procedure below to install StrongLoop on Linux.
---
{% include content/slc-warning.md %}

{% include important.html content="These instructions are for a development installation, not production.
" %}

## Prerequisites

{% include content/install-compiler-tools.md %} 

{% include tip.html content="Many Linux distributions come with the necessary tools. See [Installing compiler tools](Installing-compiler-tools.html#linux) for detailed requirements.
" %}

{% include content/node-dir-privs.md %}

### Install Node.js

If you haven't already installed Node, [download and install Node.js](http://nodejs.org/en/download).  For best results, use the latest LTS (long-term support) release of Node.js.

{% include warning.html content="LoopBack does not support Node.js versions prior to 4.x.
" %}

{% include content/install-sl.md %}

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

```
$ update-alternatives --install /usr/bin/node node /usr/bin/nodejs 99
```
