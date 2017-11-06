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

Our best practice follows an "API first" and test-driven development approach:

1. [**Defining and Validating the API**](./Defining-and-validating-the-API.html): This section guides you through constructing your API first before any internal logic is added.
2. [**Testing the API**](./Testing-the-API.html): This section describes the process of writing smoke test for your API and its spec.
3. [**Implementing Features**](./Implementing-features.html): This section demonstrates how the tests for each feature of your application should be written, and how to write the logic to make these tests pass. In the example, the tests for the controller, model, repository, data source, and sequence are written and then implemented.
4. [**Preparing API for Consumption**](./Preparing-API-for-consumption.html): WIP
