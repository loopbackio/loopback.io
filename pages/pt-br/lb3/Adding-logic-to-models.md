---
title: "Adding logic to models"
lang: en
keywords: LoopBack
tags: [models]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Adding-logic-to-models.html
summary:
---
There are three ways to add custom application logic to models:

* [Remote methods](Remote-methods.html) - REST endpoints mapped to Node functions.
* [Remote hooks](Remote-hooks.html) - Logic that triggers when a remote method is executed (before or after).
* [Operation hooks](Operation-hooks.html) - Logic triggered when a model performs create, read, update, and delete operations against a data source.

You can further refine the timing of custom logic by configuring how you call each method.
In any case, you will be required to code your own logic as LoopBack simply provides the mechanisms to trigger your logic.
