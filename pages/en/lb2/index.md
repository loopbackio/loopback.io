---
lang: en
title: LoopBack 2.x
toc: false
keywords: LoopBack 2.x
tags: [getting_started]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/index.html
summary: LoopBack is a highly-extensible, open-source Node.js framework that enables you to <ul><li>create dynamic end-to-end REST APIs with little or no coding;</li><li> access data from major relational databases, MongoDB, SOAP and REST APIs;</li><li> incorporate model relationships and access controls for complex APIs.</li></ul>
---

Read [LoopBack core concepts](/doc/{{page.lang}}/lb2/LoopBack-core-concepts.html) to learn about key concepts you need to understand to use LoopBack.

Check out the [LoopBack Developer Forum](https://groups.google.com/forum/#!forum/loopbackjs) to ask questions and discuss how you are using LoopBack.

{% include styled-box.html
content="
[IBM API Connect](https://developer.ibm.com/apiconnect/) is an end-to-end API management solution that uses LoopBack to create APIs, and provides integrated build and deployment tools:

- **Integrated experience across the entire API lifecycle**, including API and micro-service creation in Node.js and Java.
-  **Self-service access to APIs** with built-in developer portals and social collaboration tools.
-  **Unified management and orchestration of Node.js and Java** for deployment on-premises and in Bluemix.
-  **Built-in security and gateway policies** with extensive security options and governance policies.

For more information, see [IBM API Connect](https://developer.ibm.com/apiconnect/).
" %}    

**If you are an IBM customer, for technical support see the [IBM Support Portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214).**

## The LoopBack framework

The LoopBack framework is a set of Node.js modules that you can use independently or together to quickly build REST APIs.

A LoopBack application interacts with data sources through the LoopBack model API, available locally within Node.js, [remotely over REST](/doc/{{page.lang}}/lb2/Built-in-models-REST-API), and via native client APIs for
[iOS, Android, and HTML5](/doc/{{page.lang}}/lb2/Client-SDKs). Using these APIs, apps can query databases,
store data, upload files, send emails, create push notifications, register users, and perform other actions provided by data sources and services.

Clients can call LoopBack APIs directly using [Strong Remoting](/doc/{{page.lang}}/lb2/Strong-Remoting.html), a pluggable transport layer that enables you to provide backend APIs over REST, WebSockets, and other transports.

The following diagram illustrates key LoopBack modules, how they are related, and their dependencies.

{% include image.html file="9830413.png" alt="LoopBack modules" %}

### LoopBack framework modules

|  Category  |  Description |  Use to... |  Modules
|  ------------- |  ------------- |  -------------- |  --------------|  
| Models | Model and API server| Dynamically mock-up models and expose them as APIs without worrying about persisting. | loopback |
| Abstraction | Model data abstraction to physical persistence| Connect to multiple data sources or services and get back an abstracted model with CRUD capabilities independent on how it is physically stored. |  loopback-datasource-juggler |
| Initialization | Application initialization | Configure data-sources, custom models, configure models and attach them to data sources; Configure application settings and run custom boot scripts. | loopback-boot |
| Sequencing | Middleware execution | Configure middleware to be executed at various points during application lifecycle. | loopback-phase |
| Data | RDBMS and noSQL physical data sources | Enable connections to RDBMS, noSQL data sources and get back an abstracted model. | loopback-connector-mongodb loopback-connector-mysql   loopback-connector-postgresql loopback-connector-msssql loopback-connector-oracle |
| Integration | General system connectors | Connect to an existing system that expose APIs through common enterprise and web interfaces |  loopback-connector-rest   loopback-connector-soap   |
| Components | Add-ons to core LoopBack | Integrate with pre-built services packaged into components. | loopback-component-push loopback-component-storage  loopback-component-passport    |
| Clients | Client SDKs | Develop your client app using native platform objects (iOS, Android, AngularJS) that interact with LoopBack APIs via REST. | loopback-sdk-ios loopback-sdk-android loopback-sdk-angular |
