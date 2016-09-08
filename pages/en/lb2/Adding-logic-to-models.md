---
title: "Adding logic to models"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Adding-logic-to-models.html
summary:
---

{% include see-also.html content="
* [Defining boot scripts](Defining-boot-scripts.html)
* [Defining middleware](Defining-middleware.html)
" %}

There are three ways to add custom application logic to models:

* [Remote methods](/doc/{{page.lang}}/lb2/Remote-methods.html) - REST endpoints mapped to Node functions.
* [Remote hooks](/doc/{{page.lang}}/lb2/Remote-hooks.html) - Logic that triggers when a remote method is executed (before or after).
* [Operation hooks](/doc/{{page.lang}}/lb2/Operation-hooks.html) - Logic triggered when a model performs create, read, update, and delete operations against a data source.

You can further refine the timing of custom logic by configuring how you call each method.
In any case, you will be required to code your own logic as LoopBack simply provides the mechanisms to trigger your logic.
