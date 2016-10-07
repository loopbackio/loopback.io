---
title: "Updating to the latest version"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Updating-to-the-latest-version.html
summary:
---

For application dependencies, npm will automatically update packages that your application requires, based on the information in the `package.json` file.  For more information on `package.json`, see the [npm documentation](https://npmjs.org/doc/json.html).  

The below information is for updating the StrongLoop command-line tool.

{% include warning.html content="

See [Security advisories](https://docs.strongloop.com/display/LB/Security+advisories) for important upgrade information required to address security issues.

" %}

## Clean up old installations

If you installed StrongLoop software **before 6 Aug 2014**, enter these commands to clean up your installation:

```
$ npm uninstall -g strong-cli
$ npm uninstall -g loopback-sdk-angular-cli
```

For information why this is necessary, see the [StrongLoop blog post on the subject](http://strongloop.com/strongblog/update-to-installer/). 

{% include important.html content="

If you get errors running these commands, you may need to use `sudo` or manually delete the directories where these modules are installed.

" %}

Then follow the instructions in [Getting started with LoopBack](https://docs.strongloop.com/display/LB/Getting+started+with+LoopBack) to install.

If you installed **after 6 Aug 2014** then update your installation with this command:

`$ npm install -g strongloop`

## If you have a LoopBack 1.x app

{% include warning.html content="

You must make changes to your old app to run it with LoopBack 2.0.

" %}

Follow the instructions in [Migrating apps to version 2.0](https://docs.strongloop.com/display/LB/Migrating+apps+to+version+2.0) to move your application to version 2.

## Updating your Node.js installation

To update your version of Node, simply reinstall Node as you did previously.  See [nodejs.org](http://nodejs.org/) for details.
