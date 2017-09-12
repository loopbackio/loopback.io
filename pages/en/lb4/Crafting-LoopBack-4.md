---
lang: en
title: 'Crafting LoopBack Next'
keywords: LoopBack 4.0, LoopBack-Next
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Crafting-LoopBack-Next.html
summary:
---
## Background

[LoopBack](http://loopback.io) is an open source [Node.js](https://nodejs.org) framework built for API developers. Its primary goal is to help create APIs as microservices from existing services/databases and expose them as endpoints for client applications, such as Web, Mobile, and IoT. LoopBack connects the dots between accepting API requests and interacting with backend resources. By facilitating developers to implement API logic with out of box integration capabilities, LoopBack establishes itself as the API composition layer to [differentiate](http://loopback.io/resources/#compare) from other frameworks, such as [Express](https://expressjs.com), [Hapi](https://hapijs.com), and [Sails](http://sailsjs.com).

![loopback-composition](/images/loopback-composition.png)

Up to version 3.x, LoopBack is built on top of the popular [Express framework](https://expressjs.com). In retrospect, that was the right and wise decision we made four years ago when LookBack was born. Standing on the shoulders of Express, LoopBack can focus on adding values for better API creation experience without reinventing the wheel. It also has been benefiting from the Express ecosystem, especially around ready-to-use middleware modules from NPM as well as valuable knowledge and support by the community.

With LoopBack, developers can create and expose APIs just like cooking your own dishes by following recipes and adding ingredients. LoopBack introduces a set of core concepts to represent the key aspects of API implementation. Descriptions for such building blocks can be found at http://loopback.io/doc/en/lb3/LoopBack-core-concepts.html. To create APIs out of existing databases or services, developers can simply scaffold a LoopBack application, then add necessary JSON declarations and Node.js code to get your APIs up and running in a few minutes.

Behind the scene, LoopBack uses Express routing and middleware as the plumbing to build its flavor of request/response pipeline for API use cases, such as authentication, authorization, and routing. Beyond the inbound HTTP processing, LoopBack provides integration facilities such as models, datasources and connectors to allow API logic to interact with various backend systems, including but not limited to, databases, REST APIs, SOAP Web Services and gRPC microservices. The ability to glue inbound communication and outbound integration makes LoopBack a very powerful framework for API developers. The diagram below illustrates how LoopBack fits into a typical end-to-end API processing flow.

![loopback-overview](/images/loopback-overview.png)

With many years of development and multiple releases, LoopBack has grown significantly in features and users. Many good parts of LoopBack are well received. As an indication, [many extensions](https://github.com/pasindud/awesome-loopback) have been developed by our community members. We the core team have also learned a lot from what we have done as well as great feedback from the community.

## Why LoopBack Next?

Like any other framework, we start to experience the growing pains with LoopBack too, especially around the following observations:

1. The code base becomes more complicated over time with more modules and more functionality. We would like to have more maintainers and contributors to help out. But the learning curve is getting steep. One of the things to blame is JavaScript itself, which is weakly-typed and lack of constructs such as interfaces to explicitly define contracts between code. There is quite a bit hidden knowledge that is not explicit or obvious for new comers.

2. Technical debts are accumulating, such as inconsistent designs across modules and feature flags for different behaviors. Here are a few examples:
    - Multiple registries are introduced by various modules to manage different types of artifacts, such as remoting metadata, models, datasources, and middleware.
    - Different flavors are used to allow custom logic to intercept requests/responses at various layers, such as middleware, remote hooks, CRUD operation hooks, and connector hooks.
    - More and more feature flags are added over time to keep backward compatibility while allowing users to opt in new behaviors.

3. It is becoming more difficult to add new features or fix bugs as some areas start to reach the limit of the current design.
    - The loopback-datasource-juggler module is a kitchen sink for many things, such as typing, data modeling, validation, aggregation, persistence, and service integration.
    - Models are overloaded with multiple responsibilities, such as data representation, persistence, and mapping to REST. Models are tied to datasources and it's not easy to reuse the same model definition against different datasources.

4. It's not very easy to extend the framework without requesting the core team to make code changes in LoopBack modules. The current version of LoopBack has ad-hoc extensibility at various layers. Extension points are not consistently defined. For example,
    - Use Express to register middleware
    - Use remoting hooks to intercept remote method invocations
    - Use CRUD hooks to add logic around CRUD operations

5. More projects start to use LoopBack as the underlying platform. Such use cases require more knowledge of LoopBack internals and more flexibility and dynamicity to leverage LoopBack to manage and compose artifacts using a metadata driven approach. Some good examples are:
    - Multi-tenancy
    - Metadata APIs to manage/activate model definitions and datasources
    - New interaction patterns for connectors, such as event stream or real time messaging based
    - Extensions for model definitions

Since the release of 3.x, the team have been brainstorming around how to sustain and advance LoopBack. We have done a lot of homework, such as triaging existing github issues, reaching out to community members and downstream products, and evaluating relevant frameworks and technologies. The team is trying to find answers to the following questions to decide what's next for LoopBack.  

- Who are the target audience of LoopBack? Why are they interested in LoopBack? What do they use LoopBack for and how do they use it?
- What are the critical pain points? Can we address them incrementally without a bold move to rebuild a new foundation?
- What are the most requested features? Is it possible to add such features with the current design?
- What are latest and greatest technologies in our space? What value will they bring in if we start to adopt them for LoopBack?
- How to scale the development and maintenance of LoopBack? How do we allow larger development teams to collaborate on creating APIs using LoopBack?
- How to further grow the community and expand its ecosystem? What can we do to bring more users and contributors to LoopBack?

The team realize that LoopBack has gained traction among a spectrum of users beyond Node.js application developers.

1. API Developers - use LoopBack to create APIs in Node.js
2. LoopBack Maintainers and Contributors - build and maintain modules by the LoopBack project
2. Extension Developers - contribute extensions to LoopBack to augment the framework
3. Platform Developers - leverage LoopBack as the base to build their value-added offerings

![loopback-ecosystem](/images/loopback-ecosystem.png)

The consensus from the core team is to take a bold move and rebuild LoopBack to meet the needs of all above. The decision leads to the inception of LoopBack Next - a new generation of API creation platform.
See more information at https://strongloop.com/strongblog/announcing-loopback-next/

## Objectives for LoopBack Next

LoopBack Next is designated to meet the following objectives which will further evolve the framework for even better API creation experiences.

1. Catch up with latest and greatest technology advances
   - ES2016/2017, TypeScript
   - OpenAPI Spec, GraphQL, ...

2. Promote extensibility to grow the ecosystem
   - A framework cannot solve all problems out of box. What's important is to allow itself to be extended or customized.
   - https://github.com/strongloop/loopback-next/issues/512

3. Align with cloud native experience for microservices
   - Adopt cloud native microservices by adopting initiatives such as [Cloud Native Computing Foundation](https://www.cncf.io/)
   - Make LoopBack a first-class citizen of the microservices ecosystem

4. Remove the complexity and inconsistency across modules
   - Pay down the technical debts

5. Separate concerns for better composability
   -

## Strategies toward LoopBack Next

We decide not to take a big-bang approach to build LoopBack next. Instead, we are doing it incrementally in multiple stages with smaller steps following the principles that allow us to pursue architectural simplicity and extensibility.

1. Imperative first, declarative later

   Everything can be done by code via `APIs`. The LoopBack team or community contributors can then create varieties of user experiences with such APIs. For example, with APIs to define models, we allow applications to declare models in JSON or YAML files so that they can be discovered and loaded. An extension can parse other forms of model definition, such as JSON schemas, ES6 classes with decorators, schemas in OpenAPI spec, or even XML schemas into LoopBack model definitions.

   We can also leverage programming constructs such as [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) allow developers to supply metadata in code. Furthermore, LoopBack artifacts can be declared in JSON or YAML files, which will be handy for users to generate and manipulate them by hand or tooling.

2. Build minimum features and add more later if necessary

   Apply YAGNI (You Aint’t Gonna Need). Design and build for what is needed now, not for what you think you may need in the future. There are many different perspectives in API creation and people ask for a lot of features. Starting with MVP allow us to reach the root of the issues without being derailed by noises and build the absolutely necessary features as the core building blocks.  

3. Developer experience first

   Always keep in mind that LoopBack are built for developers by developers. Our first priority is to make API developers' life easier. When we design APIs and user interfaces such as CLI or UI, we want to make sure they are intuitive to our users and natural to their thought process.  

Here are the stages we are marching through toward the final version of LoopBack Next as illustrated below.

![loopback-stack](/images/loopback-stack.png)

1. Rebase and rewrite the core
    - TypeScript - Language advantages
      * Provide optional type system for JavaScript.
      * Provide planned features from future JavaScript editions to current JavaScript engines

    - Promise & Async/Await - Async programming model
      * 100% promise-based APIs and async/await as first-class async programming style.

    - IoC Container - Key enabler for the framework for better visibility and extensibility
      * Universal registry
      * Dependency injection

    - Component - packaging model for extensions  

2. Validate the core design by implementing an HTTP invocation chain
    - Add top-down REST API creation with OpenAPI spec
    - Build sequence of actions for inbound http processing
      - Introduce sequence as the composition of actions
      - Typical actions

    - Introduce controllers as entry points for API related business logic
      In current versions of LoopBack, models are the center pieces of the whole application. They take multiple responsibilities:

        - Data modeling
        - Anchor for API related business logic
        - Persistence or service invocation
        - Mapping to REST HTTP/JSON endpoints

    - Authentication as a component

3. Rebuild our integration and composition capabilities

    - Introduce repositories
    - Provide a reference implementation of CRUD and KV flavors of repository interfaces using the legacy juggler and connectors
    - Refactor/rewrite the juggler into separate modules
    - Define interfaces for connectors
    - Rewrite connectors

4. Declarative metadata and bootstrapping

5. Enable cloud native experience
    - Allow controllers to be exposed as gRPC services
    - Allow interaction with other gRPC services
    - Integration with microservices deployment infrastructure such as Docker and Kubernetes
    - Integration with service mesh  

6. Tooling (CLI & UI)
    - Add CLIand UI  tools to:
      - Scaffold LoopBack Next applications
      - Manage artifacts such as sequences, actions, controllers, repositories, services, datasources and models  


## A new core foundation

### Key ingredients for an ideal core

LoopBack itself is very modular. For example, a typical LoopBack application's dependency graph will have the following npm modules:

- loopback
- strong-remoting
- loopback-datasource-juggler
- loopback-connector-*
- loopback-component-explorer

Management of these artifacts is a key part of LoopBack but it's beyond the scope of Express and we have to introduce our own ways to manage them as they are added to LoopBack. Express helped LoopBack quickly got off the ground and grew with good success. But LoopBack needs a more flexible foundation to further build out its capabilities and ecosystem.

LoopBack manages more and more artifacts across different modules. The following are a list of built-in types of artifacts that LoopBack support out of box:

- Model definitions/relations: describes data models and their relations
- Validation: validates model instances and properties
- Model configurations: configures models and attaches them to data sources
- Datasources: configures connectivity to the backend
- Connectors: implements interactions with the underlying backend
- Components: wraps a module
- Remoting: maps JavaScript methods to REST API operations
- ACLs
- Express middleware like actions
- Utility functions
- Built-in models
- Remote hooks
- CRUD operation hooks
- Connector hooks

- Hooks/interceptors
  - Express middleware
  - remote hooks
  - CRUD operation hooks
  - connector hooks

- Security integration
  - Identity and token management
  - Authentication schemes
    - Passport component for various authentication strategies
  - Authorization (ACL)

- Storage component for various local/cloud object storage systems
- Push component for IOS and Android push notifications

- Different api styles
  - jsonapi.org
  - gRPC
  - GraphQL

Metadata for these artifacts form the knowledge base for LoopBack to glue all the pieces together and build some magic to deal with API use cases.

Representation of such knowledge base is the most critical construct for LoopBack. This knowledge base will bring all internal and external build blocks together by providing a consistent way to contribute and consume.     

- A consistent registry to provide visibility and addressability for all artifacts
- Extensibility
- Ability to compose with dependency resolution

- Visibility

  Each artifact has a unique address and can be accessed via a uri or key. Artifacts can also be visible at different scopes.

- Extensibility

  LoopBack artifacts are managed by types. New artifact types can be introduced. Instances for a given type can be added, removed, or replaced.

- Composability

  It's common that one artifact has dependencies on other artifacts.

- Pluggability

  Extensions can be organized and contributed as a whole. We need to have a packaging model so that extension developers can create their own modules as bundles and plug into a LoopBack application.


### Why not Express?

Do we need to build our own core foundation? Can we continue to use Express? Our conclusion is no. Here are the gaps between what Express and LoopBack's need.

- Lack of extensibility

Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls. See more information at http://expressjs.com/en/guide/using-middleware.html.

Express is only extensibile via middleware.  It neither exposes a registry nor provides APIs to manage artifacts such as middleware or routers. For its purpose, Express only deals with middleware-like extensions that intercept http requests/responses. LoopBack needs much more extension points and extensions.

- Lack of composability

For example, `app.use()` is the only way to register a middleware. The order of middleware is determined by the order of `app.use`. This simplistic approach works for a single monolithic application where all middleware are known and arranged ahead of time. But it does not support the case that middleware from other components need to be added between existing ones. LoopBack has to introduce phase based extension and hack the Express to allow so.    

Express doesn't provide any ways to manage dependencies between artifact instances either.

- Lack of declarative support

In Express, everything is done by JavaScript code as it works exactly as the web site claims: `Fast, unopinionated, minimalist web framework for Node.js`. On contrast, LoopBack is designed to facilitate API creations and compositions by conventions and patterns as best practices. More types of constructs are introduced.   

## Deep-diving into the building blocks

### Service Registry/Container

![loopback-ioc](/images/loopback-ioc.png)

### Dependency Injection

### Component as the packaging model for extensions

![loopback-component](/images/loopback-component.png)

## Rebuilding LoopBack on top of the new core

With the extensible foundation in place, we start to rebuild the LoopBack REST API experience by "eating your own dog food".

### Sequence and actions

See [Sequence and actions](Sequence.html).

### Controllers

### Repositories

## Example for application developers

Before we go further, let's try to build a 'hello world' application with LoopBack next.

### Hello-World

## Example for extension developers

LoopBack next
### Hello-Extension

## References

- https://strongloop.com/strongblog/announcing-loopback-next/
- https://github.com/strongloop/loopback-next-hello-world
- https://www.infoq.com/articles/driving-architectural-simplicity
- https://strongloop.com/strongblog/creating-a-multi-tenant-connector-microservice-using-loopback/
- https://strongloop.com/strongblog/loopback-as-an-event-publisher/
- https://strongloop.com/strongblog/loopback-as-a-service-using-openwhisk/
