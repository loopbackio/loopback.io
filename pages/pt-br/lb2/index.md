---
title: "LoopBack - português"
layout: translation
trans_complete: false
sidebar: pt-br_lb2_sidebar
lang: pt-br
tags:
permalink: /doc/pt-br/lb2/index.html
summary: Por favor, ajudar a traduzir a documentação em Português.
---
Leia [Conceitos básicos de LoopBack](LoopBack-core-concepts.html) para entender sobre conceitos-chave de utilização do framework.

Grupo de discussão: [LoopBack Developer Forum](https://groups.google.com/forum/#!forum/loopbackjs).

{% include styled-box.html
content="
[IBM API Connect](https://developer.ibm.com/apiconnect/) é uma solução de gerenciamento de APIs end-to-end que usa o LoopBack para criação de APIs fornecendo ferramentas de build e deployment integradas:

- **Experiência integrada em todo o ciclo de vida da API**, incluindo a API e a criação de micro-serviços em Node.js e Java.
- **Self-service access to APIs** com portais de desenvolvedores e ferramentas de colaboração.
- **Gerenciamento unificado e dirigido em Node.js e Java** para deployment on-premises e no Bluemix.
- **Inclui políticas de segurança e gateway** com vasta opções de segurança e políticas de controle.

Consulte [IBM API Connect](https://developer.ibm.com/apiconnect/) para mais informações.
" %}

**Se você for cliente IBM, para suporte técnico consulte [Portal de suporte IBM](http://www-01.ibm.com/support/docview.wss?uid=swg21593214).**

## O Framework LoopBack

O framework LoopBack é um conjunto de módulos em Node.js que podem ser usados de forma independente ou em conjunto para construir rapidamente APIs REST.

Uma aplicação LoopBack interage com fonte de dados por meio da API de modelo LoopBack, disponível localmente no Node.js, [remotely over REST](Built-in-models-REST-API), e via cliente nativo APIs para [iOS, Android, e HTML5](Client-SDKs). Usando essas APIs, apps podem consultar bancos de dados, armazenar dados, upload de arquivos, enviar e-mails, criar notificações push, registrar usuários e executar outras ações fornecidas pelos serviços e fonte de dados.

Clientes podem chamar APIs LoopBack diretamente usando [Strong Remoting](Strong-Remoting.html), uma conexão automática da camada de transporte, permite que você forneça métodos back-end da API em REST, WebSockets, e outros transportes.

O diagrama a seguir ilustra os principais módulos do LoopBack, e como eles estão relacionados, e suas dependências.

{% include image.html file="9830413.png" alt="LoopBack modules" %}

### LoopBack framework modules

|  Category  |  Description |  Use to... |  Modules
|  ------------- |  ------------- |  -------------- |  --------------|
| Models | Model and API server| Dynamically mock-up models and expose them as APIs without worrying about persisting. | loopback |
| Abstraction | Model data abstraction to physical persistence| Connect to multiple data sources or services and get back an abstracted model with CRUD capabilities independent on how it is physically stored. |  loopback-datasource-juggler |
| Initialization | Application initialization | Configure data-sources, custom models, configure models and attach them to data sources; Configure application settings and run custom boot scripts. | loopback-boot |
| Sequencing | Middleware execution | Configure middleware to be executed at various points during application lifecycle. | loopback-phase |
| Data | RDBMS and noSQL physical data sources | Enable connections to RDBMS, noSQL data sources and get back an abstracted model. | loopback-connector-mongodb loopback-connector-mysql   loopback-connector-postgresql loopback-connector-msssql oopback-connector-oracle |
| Integration | General system connectors | Connect to an existing system that expose APIs through common enterprise and web interfaces |  loopback-connector-rest   loopback-connector-soap   |
| Components | Add-ons to core LoopBack | Integrate with pre-built services packaged into components. | loopback-component-push loopback-component-storage  loopback-component-passport    |
| Clients | Client SDKs | Develop your client app using native platform objects (iOS, Android, AngularJS) that interact with LoopBack APIs via REST. | loopback-sdk-ios loopback-sdk-android loopback-sdk-angular |
