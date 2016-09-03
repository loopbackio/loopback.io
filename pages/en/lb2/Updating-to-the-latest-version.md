---
title: "Updating to the latest version"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Updating-to-the-latest-version.html
summary:
---

For application dependencies, npm will automatically update packages that your application requires, based on the information in the `package.json` file.  For more information on `package.json`, see the [npm documentation](https://npmjs.org/doc/json.html).  

{% include warning.html content="
See [Security advisories](/doc/en/lb2/Security-advisories) for important upgrade information required to address security issues." %}

## Basic update

Update your installation with this command:

`$ npm install -g strongloop`

## Performing a clean re-installation

To perform a clean reinstallation, follow these steps:

```
$ npm uninstall -g strongloop
$ npm cache clear
$ npm install -g strongloop
```

Follow the instructions in [Migrating apps to version 2.0](https://docs.strongloop.com/display/LB/Migrating+apps+to+version+2.0) to move your application to version 2.

## Updating your Node.js installation

To update your version of Node, simply reinstall Node as you did previously.  See [nodejs.org](http://nodejs.org/) for details.
