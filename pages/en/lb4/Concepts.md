---
lang: en
title: 'Key concepts'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Concepts.html
summary:
---

LoopBack 4 introduces some new concepts that are important to understand:

- [**Sequence**](Sequence.html): A stateless grouping of [Actions](Sequence.html#actions) that control how a Server responds to requests.
- [**Route**](Routes.html): Mapping between your API specification and an Operation (JavaScript implementation). It tells LoopBack which function to invoke() given an HTTP request.
- [**Schema**](Schemas.html): Represents the definition of a model in LoopBack, with respect to the datasource juggler. The `@loopback/repository` module provides special decorators for adding metadata to TypeScript/JavaScript classes to use them with the legacy implementation of Datasource Juggler.
- [**Controller**](Controllers.html): Class that implements operations defined by application’s REST API. It implements an application’s business logic and acts as a bridge between the HTTP/REST API and domain/database models. A Controller operates only on processed input and abstractions of backend services / databases.
- [**Context**](Context.html): An abstraction of all state and dependencies in your application, that LoopBack uses to “manage” everything. It's a global registry for everything in your app (configurations, state, dependencies, classes, and so on).
- [**Dependency Injection**](Dependency-injection.html): Technique that separates the construction of dependencies of a class or function from its behavior, to keep the code loosely coupled.
- [**Repository**](Repositories.html): Type of Service that represents a collection of data within a DataSource.
- [**Decorator**](Decorators.html): Enables you to annotate or modify your class declarations and members with metadata.

{% include note.html title="Review Note" content="_Perhaps this should include some of the material in <a href='Thinking-in-LoopBack.html'> Thinking in LoopBack</a>_.
" %}
