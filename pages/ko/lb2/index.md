---
title: "LoopBack - 한국어"
layout: translation
sidebar: ko_lb2_sidebar
lang: ko
tags:
permalink: /doc/ko/lb2/index.html
summary: 한국어로 문서를 번역 도와주세요.
---

{% include important.html content="LoopBack을 처음 사용할 경우에는 현재 릴리스를 사용하십시오.,
[LoopBack 3.0](/doc/en/lb3/index.html).
" %}

LoopBack 사용에 대한 질문과 논의는 [LoopBack 개발자 포럼](https://groups.google.com/forum/#!forum/loopbackjs)을 확인하세요.

{% include note.html content ="[IBM API Connect](https://developer.ibm.com/apiconnect/)는 LoopBack을 사용하여 API를 작성하고, 통합 빌드 및 배치 도구를 제공하는 end-to-end API 관리 솔루션입니다. 자세한 정보는 [Installing IBM API Connect](Installing-IBM-API-Connect.html)를 참조하세요.

**IBM 고객인 경우, 기술지원을 받으려면 [IBM Support Portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214)을 참고하세요.**
"%}

## The LoopBack framework

The LoopBack framework is a set of Node.js modules that you can use independently or together to quickly build REST APIs.

A LoopBack application interacts with data sources through the LoopBack model API, available locally within Node.js, [remotely over REST](Built-in-models-REST-API), and via native client APIs for
[iOS, Android, and HTML5](Client-SDKs). Using these APIs, apps can query databases,
store data, upload files, send emails, create push notifications, register users, and perform other actions provided by data sources and services.

Clients can call LoopBack APIs directly using [Strong Remoting](Strong-Remoting.html), a pluggable transport layer that enables you to provide backend APIs over REST, WebSockets, and other transports.

The following diagram illustrates key LoopBack modules, how they are related, and their dependencies.

{% include image.html file="9830413.png" alt="LoopBack modules" %}

### LoopBack framework modules

<table style="width: 1000px;">
  <thead>
    <tr>
      <th style="width: 80px;">Category</th>
      <th style="width:200px;">Description</th>
      <th>Use to…</th>
      <th style="width: 280px;">Modules</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Models</td>
      <td>Model and API server</td>
      <td>Dynamically mock-up models and expose them as APIs without worrying about persisting.</td>
      <td>loopback</td>
    </tr>
    <tr>
      <td>Abstraction</td>
      <td>Model data abstraction to physical persistence</td>
      <td>Connect to multiple data sources or services and get back an abstracted model with CRUD capabilities independent of backing data source.</td>
      <td>loopback-datasource-juggler</td>
    </tr>
    <tr>
      <td>Initialization</td>
      <td>Application initialization</td>
      <td>Configure data sources, customize models, configure models and attach them to data sources; Configure application settings and run custom boot scripts.</td>
      <td>loopback-boot</td>
    </tr>
    <tr>
      <td>Sequencing</td>
      <td>Middleware execution</td>
      <td>Configure middleware to be executed at various points during application lifecycle.</td>
      <td>loopback-phase</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>RDBMS and noSQL physical data sources</td>
      <td>Enable connections to RDBMS and noSQL data sources and get back an abstracted model.</td>
      <td markdown="1">
- loopback-connector-mongodb
- loopback-connector-mysql
- loopback-connector-postgresql
- loopback-connector-msssql
- loopback-connector-oracle
- [Many others...](Connectors-reference.html)
</td>
    </tr>
    <tr>
      <td>Integration</td>
      <td>General system connectors</td>
      <td>Connect to an existing system that expose APIs through common enterprise and web interfaces</td>
      <td markdown="1">
- loopback-connector-rest
- loopback-connector-soap
</td>
    </tr>
    <tr>
      <td>Components</td>
      <td>Add-ons to core LoopBack</td>
      <td>Integrate with pre-built services packaged into components.</td>
      <td markdown="1">
- loopback-component-push
- loopback-component-storage
- loopback-component-passport
</td>
    </tr>
    <tr>
      <td>Clients</td>
      <td>Client SDKs</td>
      <td>Develop client app using native platform objects (iOS, Android, AngularJS) that interact with LoopBack APIs via REST.</td>
<td markdown="1">
- loopback-sdk-ios
- loopback-sdk-android
- loopback-sdk-angular
</td>
    </tr>
  </tbody>
</table>
