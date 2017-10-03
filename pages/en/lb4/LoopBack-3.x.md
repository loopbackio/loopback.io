---
lang: en
title: 'What to expect for LB 3.x users'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/LoopBack-3.x.html
summary:
---

This topic will help existing users of LoopBack 3.x (or earlier versions) to understand the implication of LoopBack 4:

- How to connect LoopBack 3.x concepts to LoopBack 4 terms
- What takes to rewrite/migrate a LoopBack 3.x application to LoopBack 4
- What's new and exciting in LoopBack 4
- What's available in the beta release
- What's on the roadmap to achieve functional parity
- What you can try with the beta release 

## Overview

At high-level, LoopBack 3.x applications consist of three big "parts"

  - Persistence layer (this includes talking to backend services like SOAP/REST)
  - Outwards facing REST API
  - App-wide setup - Express middleware, boot scripts, etc.

In the persistence layer, users can contribute the following artifacts:

  1. Definitions of Model data types (properties, validations)
  2. Definition of data sources
  3. Configuration of models (which datasource are they attached to)
  4. Operation hooks

At the public API side, users can define:

  1. Which built-in methods should be exposed (think of `disableRemoteMethodByName`)
  1. Custom remote methods
  2. before/after/afterError hooks at application-level
  3. before/after/afterError hooks at model-level
  4. before/after/afterError hooks at model method level

LoopBack Next was intentionally designed to allow users to choose their ORM/persistence solution, and our initial version of @loopback/repository is based on juggler 3.x. That makes it possible for users to reuse their existing model definitions, migrating their application incrementally.

## Concept/feature mapping

In Loopback 3.x (and earlier), models were responsible for both accessing data in other systems (databases, SOAP services, etc.) and providing the application's external REST API. This made it easy to quickly build a REST interface for an existing database, but difficult to customize the REST API and fine-tune it to the needs of application clients.

LoopBack v4 is moving to the well-known Model-(View-)Controller pattern, where the code responsible for data access and manipulation is separated from the code responsible for implementing the REST API.

[loopback-next-example](https://github.com/strongloop/loopback-next-example) demonstrates this loose coupling. Facade is the top-level service that serves the account summary API, and is dependent on the three services Account, Customer, and Transaction. But the facade only aggregates the calls to the three services, and is not tightly coupled with the service implementation; that's why it is independent of the three services. We can define the APIs in facade the way we want. Thus, code responsible for data access and manipulation is separated from the code responsible for implementing client side APIs.


| Concept/Feature       | LoopBack 3.x | LoopBack 4                        |
| --------------------- | ------------ | --------------------------------- |
| Programming Language  | JavaScript   | TypeScript & JavaScript           |
| Core foundation       | Express      | IoC                               |
| Model Definition      | code/json    |            |
| Model Persistence     |              |            |
| Model Relation        |              |            |
| Model Remoting        |              |            |
| API Spec              |              |            |
| API Explorer          |              |            |
| DataSource            |              |            |
| Connector             |              |            |
| Mixin                 |              |            |
| Middleware            |              |            |
| Remote hooks          |              |            |
| Boot script           |              |            |
| CRUD operation hooks  |              |            |
| Built-in models       |              |            |
| Authentication        |              |            |
| Authorization         |              |            |
| Component             |              |            |
| Tooling               |              |            |


## What's in the beta release

## Tentative roadmap 

