---
title: "LoopBack in the client"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/LoopBack-in-the-client.html
summary:
---

{% include content/ja/strongloop-labs.html %}

LoopBack in the client is sometimes referred to as _isomorphic LoopBack_, because it provides the exact same API as the LoopBack server framework.

To run LoopBack in the browser,  you must use [Browserify](http://browserify.org/).
You can create models and use the memory adapter and have your LoopBack app fully running in the browser.
To further extend this, you can seamlessly connect models using the Remote Connector to connect LoopBack to LoopBack.
For example, browser to server or server to server.

This capability is implemented in [strong-remoting](http://apidocs.loopback.io/strong-remoting/) which can accept and return ModelTypes in addition to the JSON and JSON primitives.
Because models don't need to know where they are being run other than in LoopBack, you can share the same API regardless of where your code is running, thus making the API isomorphic.

Models are referenced through one way, "local" versus "remote" as seen in [loopback-example-offline-sync](https://github.com/strongloop/loopback-example-offline-sync).
This is the foundation of the replication API for data synchronization between browser and server.
