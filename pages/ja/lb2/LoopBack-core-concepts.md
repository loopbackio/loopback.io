---
title: "LoopBack コアコンセプト"
layout: translation
sidebar: ja_lb2_sidebar
lang: ja
keywords: LoopBack
tags:
permalink: /doc/ja/lb2/LoopBack-core-concepts.html
summary:
---

{% include important.html content="
LoopBackがどのように動くかを理解するには**まずこのページをお読みください。次に、LoopBackアプリケーションを作成するための基本的な紹介として [Getting started with LoopBack](Getting-started-with-LoopBack.html) を参照してください。
" %}

**Model inheritance** 

{% include image.html file="9830550.png" alt="" %}

## Models

&#95;モデル_はLoopBackの中心部にあり、データベースやその他のサービス（RESTやSOAP等）のようなバックエンドデータソースを代表します。LoopBackのモデルは、NodeとRESTの両方のAPIを備えたJavaScriptオブジェクトです。

**モデルはLoopBackの強力な主要機能です。モデルを定義すると、CRUD(create, read, update, delete)のすべての操作が可能な、事前定義されたREST APIが**自動的に**提供されます。** 

[基本的なモデルオブジェクト](Basic-model-object.html)には[フック](Model-hooks.html)を追加するためのメソッドと、 [データバリデーション](Validating-model-data.html)のためのメソッドが備わっています。その他のモデルはすべて基本的なモデルオブジェクトから「継承」されています。モデルには、右図に示すような継承ヒエラルキーがあります。モデルに永続データソースをアタッチすると、[接続されたモデル](Connected-model-object.html)(Connected model)となり、CRUD操作が提供されます。LoopBackの組み込みモデルはそれらから継承しています。

### ビルトインモデル

すべてのLoopBackアプリケーションは、User、Role、Applicationのような事前定義された[ビルトインモデル](Using-built-in-models.html)を備えています。こういったありふれたモデルを一から作る必要はありません。

### カスタムモデル

あなたのアプリケーションに特化した[カスタムモデル](Creating-models.html)を定義することができます。[User](https://apidocs.strongloop.com/loopback/#user)、[Application](https://apidocs.strongloop.com/loopback/#application)などのビルトインモデルの既存機能をもとに、[ビルトインモデルを継承](Extending-built-in-models.html)してモデルを作成することもできます。

You can create LoopBack models in various ways, depending on what kind of data source the model is based on.  You can create models:

*   [With the model generator](Using-the-model-generator.html), `slc loopback:model`.
*   [From an existing relational database](Discovering-models-from-relational-databases.html) using _model discovery_.  Then you can keep your model synchronized with the database using LoopBack's [schema / model synchronization](Creating-a-database-schema-from-models.html) API.
*   [By instance introspection](Creating-models-from-unstructured-data.html) for free-form data in NoSQL databases or REST APIs.

All three of these methods create a[Model definition JSON file](Model-definition-JSON-file.html) that defines your model in LoopBack, by convention in a LoopBack project's `common/models` directory; for example, `common/models/Account.json`.

You can also create and customize models programmatically using the [LoopBack API](http://apidocs.strongloop.com/loopback/#loopback-createmodel), or by manually editing the [Model definition JSON file](Model-definition-JSON-file.html). In most cases, you shouldn't need to use those techniques to create models, but generally will to customize models for your use.

{% include note.html content="
[モデル定義JSONファイル](Model-definition-JSON-file.html)は、LoopBackがモデルにユニークな `id` プロパティを自動的に付加するかどうかを示す `idInjection` プロパティを含みます。モデルをデータベースに接続する場合、id プロパティはプライマリキーに相当します。詳しくは [ID properties](Model-definition-JSON-file.html) を参照して下さい。
" %}

モデルの関連

[BelongsTo](BelongsTo-relations.html)、[HasMany](HasMany-relations.html)や[HasAndBelongsToMany](HasAndBelongsToMany-relations.html)といったような、[モデル間の関連](Creating-model-relations.html) を記述することができます。

### モデルのCRUD操作

データベースのような永続化データソースとモデルを接続すると、[PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel) クラスから継承したCRUD操作（create, read, update, delete）を備える [connected model](Connected-model-object.html) になります。

<table>
  <tbody>
    <tr>
      <th>操作</th>
      <th>REST</th>
      <th>LoopBack model メソッド<br>(Node API)*</th>
      <th>対応する SQL<br>操作</th>
    </tr>
    <tr>
      <td>Create</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#PersistedModelRESTAPI-Createmodelinstance">PUT /<em>modelName</em></a></p>
        <p><a href="PersistedModel-REST-API.html#PersistedModelRESTAPI-Update/insertinstance">POST /<em>modelName</em></a></p>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-create" class="external-link" rel="nofollow">create()</a><sup>*</sup></code></td>
      <td>INSERT</td>
    </tr>
    <tr>
      <td>Read (取得)</td>
      <td><a href="PersistedModel-REST-API.html#PersistedModelRESTAPI-Findmatchinginstances">GET /modelName?filter=...</a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-find" class="external-link" rel="nofollow">find()</a><sup>*</sup></code></td>
      <td>SELECT</td>
    </tr>
    <tr>
      <td>Update (編集)</td>
      <td>
        <p><a href="PersistedModel-REST-API.html">POST /<em>modelName</em></a>&nbsp;</p>
        <p><a href="PersistedModel-REST-API.html">PUT /modelName</a></p>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-updateall" class="external-link" rel="nofollow">updateAll()</a><sup>*</sup></code></td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>Delete (破棄)</td>
      <td><a href="PersistedModel-REST-API.html#PersistedModelRESTAPI-Deletemodelinstance">DELETE /<em>modelName</em>/<em>modelID</em></a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-destroybyid" class="external-link" rel="nofollow">destroyById()</a><sup>*</sup></code></td>
      <td>DELETE</td>
    </tr>
  </tbody>
</table>

*主要なメソッドのみ例示しましたが、他のメソッドも同様の機能を提供しています。他には `findById()`, `findOne()`, and findOrCreate() などがあります。詳しくは [`PersistedModel API documentation`](http://apidocs.strongloop.com/loopback/#persistedmodel) を参照してください。

## アプリケーションロジック

いくつかの方法で、カスタムアプリケーションロジックを追加することができます。下記のことが可能です:

*   [リモートメソッド](Remote-methods.html)（カスタムRESTエンドポイント）経由で[アプリケーションロシックをモデルに追加します](Adding-logic-to-models.html)。[リモートフック](Remote-hooks.html)はリモートメソッドによりトリガされ、[オペレーションフック](Operation-hooks.html)はモデルのCRUDメソッド経由でトリガされます。
*   アプリケーション起動時に実行される「ブートスクリプト」を追加します。
*   カスタム[ミドルウェア](Defining-middleware.html)を定義します。カスタムミドルウェアは、Expressのミドルウェアと似たものです。

モデルとバックエンドデータストアにデータを保存する前に、[データバリデーション](Validating-model-data.html)を実行するため、コードを追加することもできます。

### ミドルウェアフェーズ

RESTエンドポイントに対してHTTPリクエストが発行されたとき、_ミドルウェア_は実行されるファンクションを参照します。LoopBackは[Express](http://expressjs.com/)をベースにしているため、LoopBackのミドルウェアは[Expressのミドルウェア](http://expressjs.com/api.html#middleware)と同じです。しかしLoopBackでは、ミドルウェアの実行順序を明確にするために、Expressミドルウェアにフェーズのコンセプトを追加しています。Expressミドルウェアでは実行順序に起因する問題が発生することがありますが、フェーズを使うことでこの問題を回避しやすくなります。

詳しくは[Defining middleware](Defining-middleware.html)を参照してください。

## データソースとコネクタ

{% include image.html file="9830484.png" alt="" %}

LoopBackはデータベースやREST API、SOAP Webサービス、ストレージサービスなどのバックエンドサービスを一般化します。

データソースはデータベースやその他のバックエンドサービスと直接通信する「_コネクタ_」によって支援されます。アプリケーションはコネクタを直接使うことはなく、[DataSource](https://apidocs.strongloop.com/loopback-datasource-juggler/#datasource)と[PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel) APIを使ったデータソース経由で利用します。

## LoopBack コンポーネント

LoopBack コンポーネントは、追加の「プラグイン」機能を提供します:

*   [Push notifications](Push-notifications.html) -  モバイルアプリに対して、「バッジ」やアラート、ポップアップメッセージのような形で端末上に即座に表示される情報の送信を可能にします。
*   [Storage service](Storage-service.html) - サーバのファイルシステムと同様に、クラウドストレージプロバイダ(Amazon、Rackspace、Openstack、Azure)へのアップロード及びダウンロードを可能にします。
*   [Third-party login](Third-party-login-using-Passport.html) - Facebook、Google、Twitter、GithubまたはOAuth、OAuth 2、OpenIDをサポートしているシステムのサードパーティ証明書を利用して、[Passport](http://passportjs.org/)と連携したユーザログイン（及びアカウントのリンク）を可能にします。
*   [Synchronization](Synchronization.html) - モバイルアプリケーションでのオフライン操作と、再接続時のサーバアプリケーションとのデータ同期を可能にします。
*   [OAuth 2.0](OAuth-2.0.html) -  アクセス制限されたAPIエンドポイントへの認証とオーソライズを行う OAuth 2.0プロバイダ機能をLoopBackアプリケーションに追加します。

## 開発ツール

LoopBackは２つの主要な開発ツールを提供してします:

*   [`slc loopback`](Command-line-tools.html) … LoopBackアプリケーションの生成と編集のためのコマンドラインツールです。

`slc loopback` コマンドラインツールは対話的なプロンプトで開発手順をガイドします:

1.  Start with the [application generator](Application-generator.html) to initially create and scaffold the basic structure of the application: **`slc loopback`**.
2.  Add models (and model properties) using the [model generator](Model-generator.html): **`slc loopback:model`**.  
    If you need to add properties to existing models, use the [property generator](Property-generator.html), **`slc loopback:property`**. 
3.  Add data sources using the [data source generator](Data-source-generator.html), **`slc loopback:datasource`**.
4.  Add relationships between models with the [relation generator](Relation-generator.html), **`slc loopback:relation`**.

## Examples

StrongLoop provides numerous LoopBack example applications.  The table below lists some of the key examples.  Refer to [https://github.com/strongloop/loopback-example](https://github.com/strongloop/loopback-example) for a complete list.

<table>
  <thead>
    <tr>
      <th>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-getting-started" class="external-link" rel="nofollow">loopback-getting-started</a></td>
      <td>The basics of LoopBack. Follow along in&nbsp;<a href="Getting-started-with-LoopBack" class="external-link" rel="nofollow">Getting started with LoopBack</a>&nbsp;to build the example.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-getting-started-intermediate" class="external-link" rel="nofollow">loopback-getting-started-intermediate</a></td>
      <td>Full-stack example that builds on&nbsp;<code>loopback-getting-started</code>&nbsp;to demonstrate intermediate level features of LoopBack. Follow instructions in <a href="Getting-started-part-II" class="external-link"
          rel="nofollow">Getting started part II</a>&nbsp;to build the example.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-example-mongodb" class="external-link" rel="nofollow">loopback-example-mongodb</a></td>
      <td>LoopBack with MongoDB.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-example-mssql" class="external-link" rel="nofollow">loopback-example-mssql</a></td>
      <td>LoopBack with Microsoft SQL Server.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-example-mysql" class="external-link" rel="nofollow">loopback-example-mysql</a></td>
      <td>LoopBack with MySQL.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-example-oracle" class="external-link" rel="nofollow">loopback-example-oracle</a></td>
      <td>LoopBack with Oracle.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-example-postgresql" class="external-link" rel="nofollow">loopback-example-postgresql</a></td>
      <td>LoopBack with PostgreSQL.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-example-relations" class="external-link" rel="nofollow">loopback-example-relations</a></td>
      <td>Model relations and filtering via REST</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-example-app-logic" class="external-link" rel="nofollow">loopback-example-app-logic</a></td>
      <td>How to add your own logic to a LoopBack app</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-example-access-control" class="external-link" rel="nofollow">loopback-example-access-control</a></td>
      <td>Controlling access to your API endpoints</td>
    </tr>
  </tbody>
</table>
