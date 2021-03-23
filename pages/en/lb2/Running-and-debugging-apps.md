---
title: "Running and debugging apps"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Running-and-debugging-apps.html
summary:
---

In general, when you are developing an application, use the `node` command to run it.
This enables you to see stack traces and console output immediately.

For example:

```shell
$ cd myapp
$ node .
```

{% include tip.html content="When running an application, you can specify debug strings that the application will display to the console (or save to a file).  For more information, see [Setting debug strings](Setting-debug-strings.html).
" %}

To run your application under control of StrongLoop Process Manager use the `slc start` command.
Doing this enables you to profile the app and monitor app metrics to help find memory leaks and optimize performance.
See [Profiling](https://docs.strongloop.com/display/SLC/Profiling) and 
[Monitoring app metrics](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics) for more information.

With API Connect, to run your application and the MicroGateway, use the `apic start` command.  You can also [run your app using the API Designer](https://developer.ibm.com/apiconnect/getting-started/run-your-api/).
