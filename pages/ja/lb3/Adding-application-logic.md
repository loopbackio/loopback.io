---
title: "Adding application logic"
lang: ja
layout: page
keywords: LoopBack
tags: [application_logic]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Adding-application-logic.html
summary:
---

When building an application, you'll generally need to implement custom logic to process data and perform other operations before responding to client requests.
In LoopBack, there are three ways to do this:

* **[Adding logic to models](Adding-logic-to-models.html)** - adding [remote methods](Remote-methods.html), [remote hooks](Remote-hooks.html) and [operation hooks](Operation-hooks.html).
* **[Defining boot scripts](Defining-boot-scripts.html)** - writing scripts (in the `/server/boot` directory) that run when the application starts.
* **[Defining middleware](Defining-middleware.html)** - adding custom [middleware](http://expressjs.com/api.html#middleware) to the application .
