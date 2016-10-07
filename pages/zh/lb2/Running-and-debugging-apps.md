---
title: "Running and debugging apps"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Running-and-debugging-apps.html
summary:
---

If you created your application using the `slc loopback` [Application generator](/doc/{{page.lang}}/lb2/Application-generator.html), then you can run your application with the `slc run` command, as explained in [Running apps](/doc/{{page.lang}}/lb2/Running-apps.html).  In the simplest case, this command does the same thing as `node .` or node `server/server.js`, however [slc run](https://docs.strongloop.com/display/NODE/slc+run) provides many additional options, for example, clustering, logging, and for monitoring and management; See[Operating Node applications](https://docs.strongloop.com/display/SLC/Operating+Node+applications) for more information.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Are there other reasons to use "slc run" vs. "node ." ?</div>

When running an application, you can specify debug strings that the application will display to the console (or save to a file), and you can also use [Node Inspector](https://docs.strongloop.com/display/SLC/Using+Node+Inspector) to debug the running app. For more information, see:

*   [Running apps](/doc/{{page.lang}}/lb2/Running-apps.html)
*   [Setting debug strings](/doc/{{page.lang}}/lb2/Setting-debug-strings.html)
