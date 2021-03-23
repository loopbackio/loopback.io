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
1. **[Instalar as ferramentas do LoopBack](Installation)**, com IBM API Connect (`apic`) ou Ferramenta StrongLoop (`slc`).
1. **Leia [Conceitos básicos de LoopBack](LoopBack-core-concepts.html)** para entender melhor a utilização do framework.
1. **Segue [Iniciando com LoopBack](Getting-started-with-LoopBack.html)** para um rápido tutorial introdutório.

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

**Se você é cliente IBM, para suporte técnico consulte [Portal de suporte IBM](http://www-01.ibm.com/support/docview.wss?uid=swg21593214).**

## O Framework LoopBack

O framework LoopBack é um conjunto de módulos em Node.js que podem ser usados de forma independente ou em conjunto para construir rapidamente APIs REST.

Uma aplicação LoopBack interage com fonte de dados por meio da API de modelo LoopBack, disponível localmente no Node.js, [remotely over REST](Built-in-models-REST-API), e via cliente nativo APIs para [iOS, Android, e HTML5](Client-SDKs). Usando essas APIs, apps podem consultar bancos de dados, armazenar dados, upload de arquivos, enviar e-mails, criar notificações push, registrar usuários e executar outras ações fornecidas pelos serviços e fonte de dados.

Clientes podem chamar APIs LoopBack diretamente usando [Strong Remoting](Strong-Remoting.html), uma conexão automática da camada de transporte, permite que você forneça métodos back-end da API em REST, WebSockets, e outros transportes.

O diagrama a seguir ilustra os principais módulos do LoopBack, e como eles estão relacionados, e suas dependências.

{% include image.html file="9830413.png" alt="LoopBack modules" %}

### Módulos do Framework LoopBack

<table style="width: 1000px;">
  <thead>
    <tr>
      <th style="width: 80px;">Categoria</th>
      <th style="width:200px;">Descrição</th>
      <th>Use para…</th>
      <th style="width: 280px;">Módulos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Modelos</td>
      <td>Modelo e API do servidor</td>
      <td>Dynamically mock-up models e mostrar como APIs sem se preocupar com persistência.</td>
      <td>Loopback</td>
    </tr>
    <tr>
      <td>Abstração</td>
      <td>Modelo de abstração de dados para persistência física</td>
      <td>Conecta-se a vários banco de dados ou serviços e obtendo como resposta um modelo abstrato com recursos CRUD independente do banco de dados ou serviço usado.</td>
      <td>loopback-datasource-juggler</td>
    </tr>
    <tr>
      <td>Inicialização</td>
      <td>Inicialização do Aplicativo</td>
      <td>Configurar base de dados, personalizar modelos, configurar modelos e vinculá-los à base de dados, definir configurações de aplicativo e executar scripts de inicialização personaliados.</td>
      <td>loopback-boot</td>
    </tr>
    <tr>
      <td>Sequenciamento</td>
      <td>Execução de middleware</td>
      <td>Configurar middleware para ser executado em vários pontos durante o ciclo de vida do aplicativo.</td>
      <td>loopback-phase</td>
    </tr>
    <tr>
      <td>Dados</td>
      <td>Base de dados física de RDBMS e noSQL</td>
      <td>Habilitar conexões com base de dados RDBMS e noSQL, recuperando um modelo abstrato.</td>
      <td markdown="1">
- loopback-connector-mongodb
- loopback-connector-mysql
- loopback-connector-postgresql
- loopback-connector-msssql
- loopback-connector-oracle
- [Muitos outros...](Connectors-reference.html)
</td>
    </tr>
    <tr>
      <td>Integração</td>
      <td>Conectores de sistema em geral</td>
      <td>Conecta-se a um sistema existente que expoem regras de negócio comuns através de APIs e interfaces web</td>
      <td markdown="1">
- loopback-connector-rest
- loopback-connector-soap
</td>
    </tr>
    <tr>
      <td>Componentes</td>
      <td>Complementos para o núcleo LoopBack</td>
      <td>Integrar com serviços pre-built empacotados em componentes</td>
      <td markdown="1">
- loopback-component-push
- loopback-component-storage
- loopback-component-passport
</td>
    </tr>
    <tr>
      <td>Clientes</td>
      <td>Clientes SDKs</td>
      <td>Desenvolver aplicativos clientes usando plataforma nativa (iOS, Android, AngularJS) que interagem com o LoopBack APIs via REST.</td>
<td markdown="1">
- loopback-sdk-ios
- loopback-sdk-android
- loopback-sdk-angular
</td>
    </tr>
  </tbody>
</table>
