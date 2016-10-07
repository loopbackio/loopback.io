---
title: "Running apps"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Running-apps.html
summary:
---

The recommended way to run a LoopBack application is:

**shell**

```
$ cd <app-root-dir>
$ slc run
```

You can also run it from another working directory.  For example, if you app is in the `myApp` directory under the current working directory:

**shell**

`$ slc run myApp`

In general, it's best to simply make the application directory your current working directory.  See [slc run](https://docs.strongloop.com/display/NODE/slc+run) for more information.

You'll see the following output in your console:

**shell**

```
Browse your REST API at http://localhost:3000/explorer
Web server listening at: http://localhost:3000/
```

This tells you your app is running at [http://localhost:3000/](http://localhost:3000/) and [使用API浏览器](/doc/{{page.lang}}/lb2/6095009.html) is available at [http://localhost:3000/explorer](http://localhost:3000/explorer). 

You can customize the host name, port number and API root path in [config.json](/doc/{{page.lang}}/lb2/config.json.html).
