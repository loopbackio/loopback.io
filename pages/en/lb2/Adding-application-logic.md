---
title: "Adding application logic"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Adding-application-logic.html
summary:
---

When building an application, you'll generally need to implement custom logic to process data and perform other operations before responding to client requests.
In LoopBack, there are three ways to do this:

* **[Adding logic to models](/doc/{{page.lang}}/lb2/Adding-logic-to-models.html)** - adding [remote methods](/doc/{{page.lang}}/lb2/Remote-methods.html), [remote hooks](/doc/{{page.lang}}/lb2/Remote-hooks.html) and [operation hooks](/doc/{{page.lang}}/lb2/Operation-hooks.html).
* **[Defining boot scripts](/doc/{{page.lang}}/lb2/Defining-boot-scripts.html)** - writing scripts (in the `/server/boot` directory) that run when the application starts.
* **[Defining middleware](/doc/{{page.lang}}/lb2/Defining-middleware.html)** - adding custom [middleware](http://expressjs.com/api.html#middleware) to the application .
