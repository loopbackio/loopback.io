---
title: "common directory"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/common-directory.html
summary:
---

The /common directory contains files shared by the server and client parts of the application.  By default, [slc loopback](https://docs.strongloop.com/display/NODE/slc+loopback) creates a `/models` sub-directory with one JSON file per model in the application.  See [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) for a description of the format of this file. 

{% include note.html content="

Put all your model JSON and JavaScript files in the `/common/models` directory.

" %}
