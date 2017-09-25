---
lang: en
title: 'Migration guide'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Migration-guide.html
summary:
---

This topic will explain how to migrate a LoopBack v3 app to v4.

## LB3 vs LB4

In Loopback 3.x (and earlier), models were responsible for both accessing data in other systems (databases, SOAP services, etc.) and providing the application's external REST API. This made it easy to quickly build a REST interface for an existing database, but difficult to customize the REST API and fine-tune it to the needs of application clients.

LoopBack v4 is moving to the well-known Model-(View-)Controller pattern, where the code responsible for data access and manipulation is separated from the code responsible for implementing the REST API.

[loopback-next-example](https://github.com/strongloop/loopback-next-example) demonstrates this loose coupling. Facade is the top-level service that serves the account summary API, and is dependent on the three services Account, Customer, and Transaction. But the facade only aggregates the calls to the three services, and is not tightly coupled with the service implementation; that's why it is independent of the three services. We can define the APIs in facade the way we want. Thus, code responsible for data access and manipulation is separated from the code responsible for implementing client side APIs.

## What happened to models?

{% include content/tbd.html %}

## How to transform an LB3 app to an LB4 app

{% include content/tbd.html %}
