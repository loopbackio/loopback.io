---
title: "Updating to the latest version"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Updating-to-the-latest-version.html
summary:
---
{% include content/slc-warning.md %}

When you run `npm install` in an application root directory, npm will update
application dependencies, as specified by the `package.json` file.  For more information on `package.json`, see [npm documentation](https://npmjs.org/doc/json.html).  

## Basic update

Update your installation with this command:

```
$ npm install -g strongloop
```

## Performing a clean re-installation

To perform a clean reinstallation, follow these steps:

```
$ npm uninstall -g strongloop
$ npm cache clear
$ npm install -g strongloop
```

## Updating your Node.js installation

To update your version of Node, simply reinstall Node as you did previously.  See [nodejs.org](http://nodejs.org/) for details.
