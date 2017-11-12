---
title: "LoopBack の核となる概念"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/LoopBack-core-concepts.html
summary: LoopBackを理解するために必要な最重要概念の導入。
---

{% include tip.html content="LoopBackがどのように動作するかを理解するために **最初に読むこと**。
" %}

<div style="float: right;">
{% include image.html file="9830550.png" alt="モデル継承図" caption="モデルの継承" max-width="400"%}
</div>

## モデル

_モデル_ はLoopBackの心臓部であり、データベースやその他のバックエンドサービス（REST、SOAPなど）のようなバックエンドのデータソースを表現します。
LoopBackのモデルは、NodeやREST API で使用するJavaScriptのオブジェクトです。

**モデルを定義すると、自動的に作成・読取・更新・削除の全ての操作が揃った、定義済みのREST APIがついてくるのは、LoopBackの重要かつ強力な機能です。**

[基本的なモデルオブジェクト](Basic-model-object.html) は [フック](Operation-hooks.html) を追加したり、[データを検証](Validating-model-data.html)したりするためのメソッドを持っています。
その他のモデルオブジェクトは、これらを全て継承しています。モデルには、右図のような継承の階層があります。
モデルを永続化データソースに紐付けると、それは作成・読取・更新・削除の操作を備えた[接続済みモデル](Connected-model-object.html)になります。
LoopBackの組み込みモデルもこれらを継承しています。

### 組み込みモデル

全てのLoopBackアプリケーションは、User・Role・Application など、幾つかの [組み込みモデル](Using-built-in-models.html)を持っており、これらの一般的なモデルをゼロから作る必要はありません。

### 独自モデル

アプリケーションに固有の [独自モデルを定義する](Creating-models.html) ことができます。
[組み込みモデルを拡張](Extending-built-in-models.html)して、[User](https://apidocs.loopback.io/loopback/#user)・[Application](https://apidocs.loopback.io/loopback/#application) やその他の組み込みモデルが予め持っている機能の上に
独自のモデルを作ることもできます。

LoopBackモデルは、モデルが基づくデータソースの種類によって、いくつかの方法で作ることができます。

* [LoopBackモデル生成ツールを使用する](Using-the-model-generator.html)。
* [既存のリレーショナルデータベースから](Discovering-models-from-relational-databases.html) _モデルの発見_ を使って。
  この場合、モデルとデータベースを LoopBack の [スキーマ / モデル同期](Creating-a-database-schema-from-models.html) APIを使用して同期することができます。
* NoSQL データベースや REST API の自由形式データの[インスタンス内部調査](Creating-models-from-unstructured-data.html)によって。

3つの方法はすべて、LoopBackのモデルを定義する[モデル定義JSONファイル](Model-definition-JSON-file.html)を、LoopBackプロジェクトの規約に従って `common/models` ディレクトリ内に作成します。例えば、`common/models/account.json` のようなファイルです。

また、[LoopBack API](http://apidocs.loopback.io/loopback/#loopback-createmodel) を使って独自のモデルをプログラム的に作成したり、
[モデル定義JSONファイル](Model-definition-JSON-file.html) を手作業で編集したりできます。
ほとんどの場合、モデルを作成するときにこれらの方法は不要ですが、モデルを変更したりカスタマイズしたりするときにはよく使うでしょう。

{% include note.html content="
[モデル定義JSONファイル](Model-definition-JSON-file.html) は LoopBack が自動的に一意の `id` プロパティを追加するかどうかを示す
`idInjection` プロパティを持っています。データベースに紐付けられたモデルでは、idプロパティはプライマリキーに対応します。
詳細は、[ID プロパティ](Model-definition-JSON-file.html#id-properties) を参照してください。
" %}

### モデルのリレーション

[多対１](BelongsTo-relations.html)・
[１対多](HasMany-relations.html)・
[多対多](HasAndBelongsToMany-relations.html) などの、[モデル同士のリレーション](Creating-model-relations.html)を表現できます。

### モデルの作成・読取・更新・削除操作

モデルを永続化データソースに紐付けると、それは、[PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel) クラスに由来する、作成・読取・更新・削除の操作を備えた _[接続済みモデル](Connected-model-object.html)_ になります。

<table>
  <tbody>
    <tr>
      <th>操作</th>
      <th>REST</th>
      <th>LoopBack モデルのメソッド<br>(Node API)* </th>
      <th>対応する SQLの<br>操作</th>
    </tr>
    <tr>
      <td>作成</td>
      <td>
        <a href="PersistedModel-REST-API.html#create-model-instance">PUT /<em>modelName</em></a>
        <br/><a href="PersistedModel-REST-API.html#update--insert-instance">POST /<em>modelName</em></a>
      </td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-create" class="external-link" rel="nofollow">create()</a><sup>* </sup></code></td>
      <td>INSERT</td>
    </tr>
    <tr>
      <td>読取（取得）</td>
      <td><a href="PersistedModel-REST-API.html#find-matching-instances">GET /modelName?filter=...</a></td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-find" class="external-link" rel="nofollow">find()</a><sup>* </sup></code></td>
      <td>SELECT</td>
    </tr>
    <tr>
      <td>更新（変更）</td>
      <td>
        <a href="PersistedModel-REST-API.html#update-model-instance-attributes">PUT /modelName</a>
      </td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-updateall" class="external-link" rel="nofollow">updateAll()</a><sup>* </sup></code></td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>削除（破壊）</td>
      <td><a href="PersistedModel-REST-API.html#delete-model-instance">DELETE /<em>modelName</em>/<em>modelID</em></a></td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-destroybyid" class="external-link" rel="nofollow">destroyById()</a><sup>* </sup></code></td>
      <td>DELETE</td>
    </tr>
  </tbody>
</table>

(* ) 記載されたメソッドは代表例です。同様な機能のメソッドが他にもあります。例：`findById()`・`findOne()`・`findOrCreate()`

詳細は、[PersistedModel API documentation](http://apidocs.loopback.io/loopback/#persistedmodel) を参照してください。

## アプリケーションロジック

いくつかの方法で、独自のアプリケーションロジックを追加できます。

* [リモートメソッド](Remote-methods.html) (独自のRESTエンドポイント)や、リモートメソッドによって起動される [リモートフック](Remote-hooks.html)、あるいはモデルの作成・読取・更新・削除操作によって起動される [操作フック](Operation-hooks.html) として、[モデルにアプリケーションロジックを追加する](Adding-logic-to-models.html)。
* アプリケーション開始時に実行される起動スクリプトを追加する。
* Expressのミドルウェアに似た、独自の [ミドルウェア](Defining-middleware.html) を定義する。

モデルやバックエンドのデータベースに保存する前に、[データを検証する](Validating-model-data.html)コードを追加できます。

### ミドルウェアのフェーズ

_ミドルウェア_ は、HTTPリクエストがRESTエンドポイントに届いた時に、実行される関数のことです。
LoopBack は [Express](http://expressjs.com/)にもとづいているので、LoopBackのミドルウェアは、[Expressのミドルウェア](http://expressjs.com/en/guide/using-middleware.html)と同じです。
しかし、LoopBackは _フェーズ_ の概念を追加し、ミドルウェアが呼び出される順番を明快に定義しました。
フェーズを使うことで、標準的な Express のミドルウェアで起こりうる呼出し順の問題を回避しています。

詳細は、[ミドルウェアの定義](Defining-middleware.html) を参照してください。

## データソースとコネクタ

{% include image.html file="9830484.png" alt="" %}

LoopBackは、データベース・REST API・SOAP Webサービスといったバックエンドービスを、_データソース_ として一般化しています。

データソースの背後には _コネクタ_ があり、データベースやその他のバックエンドサービスと直接通信します。
アプリケーションが直接コネクタを使用することはなく、[DataSource](https://apidocs.loopback.io/loopback-datasource-juggler/#datasource)・
[PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel) API を使用してデータソース経由で使用します。

## LoopBack コンポーネント

LoopBack コンポーネントは、追加の「プラグイン」機能を提供します。

* [プッシュ通知](Push-notifications.html) -  モバイルアプリに情報を送信し、
  モバイルデバイス上にバッジ・アラート・ポップアップメッセージが直ちに表示できるようにします。
* [ストレージコンポーネント](Storage-component.html) - サーバのファイルシステムと同様に、クラウドストレージ(Amazon・Rackspace・Openstack・Azureなど)と
  ファイルのアップロード・ダウンロードが行えるようにします。
* [サードパーティーのログイン](Third-party-login-using-Passport.html) - [Passport](http://passportjs.org/) を統合し、
  ユーザが、Facebook・Google・Twitter・GitHub などのOAuth・OAuth2・OpenID をサポートする、サードパーティーの資格情報を使って
  ログイン（そしてアカウントのリンク）を行えるようにします。
* [同期](Synchronization.html) - モバイルアプリケーションがオフラインでも動作し、
  再接続時にサーバアプリケーションとデータを同期できるようにします。
* [OAuth 2.0](OAuth-2.0.html) - LoopBack アプリケーションが OAuth 2.0 プロバイダとして機能できるようにし、
  保護されたAPIエンドポイントにアクセスしようとするクライアントアプリケーションやユーザを認証できるようにします。
