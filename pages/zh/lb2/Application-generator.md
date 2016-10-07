---
title: "Application generator"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Application-generator.html
summary:
---

The LoopBack application generator creates a new LoopBack application:

`$ slc loopback`

You will be greeted by the friendly Yeoman ASCII art (under the hood `slc` uses [Yeoman](http://yeoman.io/)) and prompted for:

*   Name of the directory in which to create your application.  Press **Enter** to create the application in the current directory.
*   Name of the application, that defaults to the directory name you previously entered.

The tool creates the standard LoopBack application structure.  See [项目结构参考](/doc/{{page.lang}}/lb2/6095052.html) for details.

{% include note.html content="

By default, a generated application exposes only the User model over REST. To expose other [built-in models](/doc/zh/lb2/Built-in-models-reference.html), edit `/server/model-config.json` and change the model's \"public\" property to \"true\". See [model-config.json](/doc/zh/lb2/model-config.json.html) for more information.

" %}
