---
title: "Using LoopBack with IBM API Connect"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Using-LoopBack-with-IBM-API-Connect.html
summary:
---

**LoopBack is a highly-extensible, open-source Node.js framework** that enables you to:

* Create dynamic end-to-end REST APIs with little or no coding.
* Access data from major relational databases, MongoDB, SOAP and REST APIs.
* Incorporate model relationships and access controls for complex APIs.
* Separable components for file storage, third-party login, and OAuth 2.0.

**Read [LoopBack core concepts](/doc/{{page.lang}}/lb2/LoopBack-core-concepts.html)** to learn about key concepts you need to understand to use LoopBack.

Check out the [LoopBack Developer Forum](https://groups.google.com/forum/#!forum/loopbackjs) to ask questions and discuss how you are using LoopBack.

**[IBM API Connect](https://developer.ibm.com/apiconnect/) is an end-to-end API management solution** that uses LoopBack to create APIs, and provides integrated build and deployment tools:

* **Integrated experience across the entire API lifecycle**, including API and micro-service creation in Node.js and Java.
* **Self-service access to APIs** with built-in developer portals and social collaboration tools.
* **Unified management and orchestration of Node.js and Java** for deployment on-premises and in Bluemix.
* **Built-in security and gateway policies** with extensive security options and governance policies.

For more information, see **[IBM API Connect](https://developer.ibm.com/apiconnect/)**.

{% include note.html content="

### If you are an IBM customer, for technical support see the [IBM Support Portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214).

" %}

## The LoopBack framework

**New to Node.js?** **Read Getting Started with Node.js for**:

* [PHP Developers](http://strongloop.com/strongblog/node-js-php-get-started/)
* [Rails Developers](http://strongloop.com/strongblog/node-js-ruby-on-rails-getting-started/)
* [Java Developers](http://strongloop.com/strongblog/node-js-java-getting-started/)

The LoopBack framework is a set of Node.js modules that you can use independently or together to quickly build REST APIs.

A LoopBack application interacts with data sources through the LoopBack model API, available locally within Node.js, 
[remotely over REST](/doc/{{page.lang}}/lb2/Built-in-models-REST-API.html), and via native client APIs for [iOS, Android, and HTML5](/doc/{{page.lang}}/lb2/Client-SDKs.html).
Using these APIs, apps can query databases, store data, upload files, send emails, create push notifications, register users,
and perform other actions provided by data sources and services.

Clients can call LoopBack APIs directly using [Strong Remoting](/doc/{{page.lang}}/lb2/Strong-Remoting.html), a pluggable transport layer that enables you
to provide backend APIs over REST, WebSockets, and other transports.

The following diagram illustrates key [LoopBack modules](#loopback-framework-modules), how they are related, and their dependencies.

{% include image.html file="9830413.png" alt="" %}

### LoopBack framework modules

<table>
  <tbody>
    <tr>
      <th>
        <p>Category</p>
      </th>
      <th>
        <p>Description</p>
      </th>
      <th>
        <p>Use to...</p>
      </th>
      <th>
        <p>Modules</p>
      </th>
    </tr>
    <tr>
      <td>
        <p>Models</p>
      </td>
      <td>
        <p>Model and API server</p>
      </td>
      <td>
        <p>Quickly and dynamically mock up models and expose them as APIs without worrying about persisting.</p>
      </td>
      <td>loopback</td>
    </tr>
    <tr>
      <td>
        <p>Abstraction</p>
      </td>
      <td>
        <p>Model data abstraction to physical persistence</p>
      </td>
      <td>
        <p>Connect to multiple data sources or services and get back an abstracted model with CRUD capabilities independent on how it is physically stored.</p>
      </td>
      <td>
        <div style="width: 200px;">
          <p><span>loopback-datasource-juggler</span></p>
        </div>
      </td>
    </tr>
    <tr>
      <td>Initialization</td>
      <td>Application initialization</td>
      <td>
        <p>Configure data-sources, custom models, configure models and attach them to data sources; Configure application settings and run custom boot scripts.</p>
      </td>
      <td>loopback-boot</td>
    </tr>
    <tr>
      <td>Sequencing</td>
      <td>Middleware execution</td>
      <td>Configure middleware to be executed at various points during application lifecycle.</td>
      <td>loopback-phase</td>
    </tr>
    <tr>
      <td>
        <p>Data</p>
      </td>
      <td>
        <p>RDBMS and noSQL physical data sources</p>
      </td>
      <td>
        <p>Enable connections to RDBMS, noSQL data sources and get back an abstracted model.</p>
      </td>
      <td>
        <p>loopback-connector-mongodb</p>
        <p><span>loopback-connector-mysql</span></p>
        <p><span><span>loopback-connector-postgresql</span></span></p>
        <p><span><span><span>loopback-connector-msssql</span></span></span></p>
        <p><span><span><span><span>loopback-connector-oracle</span></span></span></span></p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Integration</p>
      </td>
      <td>
        <p>General system connectors</p>
      </td>
      <td>
        <p>Connect to an existing system that expose APIs through common enterprise and web interfaces</p>
      </td>
      <td>
        <p><span>loopback-connector-rest</span></p>
        <p><span><span>loopback-connector-soap</span></span></p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Components</p>
      </td>
      <td>
        <p>Add-ons to core LoopBack</p>
      </td>
      <td>
        <p>Integrate with pre-built services packaged into components.</p>
      </td>
      <td>
        <p>loopback-component-push</p>
        <p><span>loopback-component-storage</span></p>
        <p><span>loopback-component-passport</span></p>
        <p><span><span>loopback-component-sync<br>(in development)</span></span></p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Clients</p>
      </td>
      <td>
        <p>Client SDKs</p>
      </td>
      <td>
        <p>Develop your client app using native platform objects (iOS, Android, AngularJS) that interact with LoopBack APIs via REST.</p>
      </td>
      <td>
        <p>loopback-sdk-ios</p>
        <p>loopback-sdk-android</p>
        <p>loopback-sdk-angular</p>
      </td>
    </tr>
  </tbody>
</table>
