---
lang: en
title: 'Best Practices with Loopback 4'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Best-practices-with-Loopback-4.html
summary:
---

LoopBack 4 is more than just a framework: It’s an ecosystem that encourages developers to follow best practices through predefined standards. This section will walk through some important guidelines by building an example API for a catalog of products.


The practice follows an "API first" and test-driven development approach:

1. [**Defining and Validating the API**](./Defining-and-validating-the-API.html): The API is defined first before any internal logic is added to your application.
2. [**Testing the API**](./Testing-the-API.html): The smoke test for your API and its spec is written.
3. [**Implementing Features**](./Implementing-features.html): The tests for each feature of your application are written, and then logic to make these tests pass is written. In the example, the tests for the controller, model, repository, data source, and sequence are written and then implemented.
4. [**Preparing API for Consumption**](./Preparing-API-for-consumption.html): WIP
