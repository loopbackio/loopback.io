---
title: "LoopBack in the client"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/LoopBack-in-the-client.html
summary:
---

<div class="aui-message hint shadowed information-macro has-no-icon">

This is a StrongLoop Labs project

{% include image.html file="6258830.png" alt="" %}

This project provides early access to advanced or experimental functionality. It may lack usability, completeness, documentation, and robustness, and may be outdated.

However, StrongLoop supports this project: Paying customers can open issues using the StrongLoop customer support system (Zendesk). Community users, please report bugs on GitHub. For more information, see [StrongLoop Labs](https://docs.strongloop.com/display/zh/StrongLoop+Labs).

</div>

LoopBack in the client is sometimes referred to as _isomorphic LoopBack_, because it provides the exact same API as the LoopBack server framework.

To run LoopBack in the browser,  you must use [Browserify](http://browserify.org/). You can create models and use the memory adapter and have your LoopBack app fully running in the browser. To further extend this, you can seamlessly connect models using the Remote Connector to connect LoopBack to LoopBack. For example, browser to server or server to server.

This capability is implemented in [strong-remoting](http://apidocs.strongloop.com/strong-remoting/) which can accept and return ModelTypes in addition to the JSON and JSON primitives. Because models don’t need to know where they are being run other than in LoopBack, you can share the same API regardless of where your code is running, thus making the API isomorphic.

Models are referenced through one way, “local” versus “remote” as seen in [loopback-example-full-stack](https://github.com/strongloop/loopback-example-full-stack). This is foundation of the replication API for data synchronization between browser and server.
