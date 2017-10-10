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


| Concept/Feature       | LoopBack 3.x                                   | LoopBack 4                                        |
| --------------------- | ---------------------------------------------- | ------------------------------------------------- |
| Programming Language  | Built with JavaScript ES5<br>Node.js callback  | TypeScript 2.5.x & JavaScript ES2016/2017<br>Promise & Async/Await         |
| Core foundation       | Express with LoopBack extensions               | Home-grown IoC container                           |
| Model Definition      | Models can be defined with JavaScript or json  | Models can be defined with TypeScript/JavaScript/JSON           |
| Model Persistence     | A model can be attached to a datasource backed by a connector that implements CRUD operations | Repository APIs are introduced to represent persistence related operations. Repository is the binding of model metadata to a datasource |
| Model Relation        | Relations can be defined between models        | (TBA) Relations can be defined between models but they will be realized between repositories |
| Model Remoting        | JavaScript/JSON remoting metadata is used to describe method signatures and their mapping to REST/HTTP<br>Swagger specs are generated after the fact                  | Remoting metadata can be supplied by OpenAPI JSON/YAML documents or TypeScript decorators |
| API Spec              | Swagger 2.0                                    | Swagger 2.0 and OpenAPI Spec 3.0, potentially other forms such as gRPC or GraphQL |
| API Explorer          | Built-in UI based on swagger-ui (/explorer)            |  (Beta) Expose Swagger/OpenAPI specs and a browser redirect to editor.swagger.io          |
| DataSource            |               |            |
| Connector             |              |            |
| Mixin                 | Use a utility to add methods from the mixin to the target model class | Use class extend            |
| Middleware            | Express middleware with phase-based registration and ordering | Sequence consists of actions            |
| Remote hooks          | Before/After hooks for remote methods             | Controller-level sequnce/actions            |
| Boot script           | Scripts to be invoked during bootstrapping             |  (TBD)          |
| CRUD operation hooks  | Hooks for CRUD operations             |            |
| Built-in models       | Built-in User/AccessToken/Application/ACL/Role/RoleMapping for AAA       | (TBD)           |
| Authentication        | User model as the login provider<br>loopback-component-passport             | Authentication component with extensibility to strategy providers           |
| Authorization         | Use built-in User/Application/AccessToken model for identity and ACL/Role/RoleMapping for authorization |       Authorization component     |
| Component             | A very simple implementation to configure and invoke other modules        | A fully-fledged packaging model that allows contribution of extensions from other modules             |
| Tooling               | loopback-cli and API Connect UI             | (TBA)            |


## What's in the beta release

## Tentative roadmap 

