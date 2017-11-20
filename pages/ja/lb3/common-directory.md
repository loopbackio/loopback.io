---
title: "common directory"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/common-directory.html
summary:
---

The /common directory contains files shared by the server and client parts of the application.
When you create models that are shared by client and server, the
[Application generator](Application-generator.html) 
creates a `/models` sub-directory with one JSON file per model in the application.
See [Model definition JSON file](Model-definition-JSON-file.html) for a description of the format of this file. 

{% include note.html content="

If you want to be able to share models between client and server parts of your app, put your model JSON and JavaScript files in the `/common/models` directory.

If you want to have separate client and server models, then put your model JSON and JavaScript files in the `/server/models` directory.

" %}