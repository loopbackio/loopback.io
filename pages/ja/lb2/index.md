---
title: "LoopBack - 日本語"
layout: translation
sidebar: ja_lb2_sidebar
lang: ja
tags:
permalink: /doc/ja/lb2/index.html
summary:
---

**LoopBack は、高い機能拡張性を持った、オープンソースの Node.js のフレームワーク** です。

*   ほとんど、あるいは全くコードを書かずに、動的な end-to-end の REST APIs を作成できる。
*   主要なリレーショナル・データベース、MongoDB、SOAPやREST APIのデータにアクセスできる。
*   モデル・リレーションシップと複雑なAPIへのアクセス制御を統合できる。
*   モバイルアプリのための、プッシュ通知、Geolocation、ファイル管理が扱える。
*   Android、iOS、JavaScript SDK のクライアントアプリを簡単に作ることができる。
*   オンプレミスでもクラウドでも動かすことができる。

{% include note.html content="
**LoopBackを使ったアプリ作成に必要なキー・コンセプトを学ぶには、 [LoopBack core concepts](LoopBack-core-concepts.html) をお読み下さい。**

**LoopBackの特徴についての入門は [Getting started with LoopBack](Getting-started-with-LoopBack.html)**** を参照して下さい。**
" %}

## LoopBackフレームワーク

{% include see-also.html content="
**Node.jsは初めてですか?** **他の言語からNode.jsに入門する方は以下の記事を読んで下さい:**

*   [PHP Developers](http://strongloop.com/strongblog/node-js-php-get-started/)
*   [Rails Developers](http://strongloop.com/strongblog/node-js-ruby-on-rails-getting-started/)
*   [Java Developers](http://strongloop.com/strongblog/node-js-java-getting-started/)
" %}

LoopBackフレームワークは、Node.jsモジュールの集合体です。それぞれのモジュールは一緒に利用することも、個別に利用することも出来ます。

LoopBackアプリケーションは、LoopBackモデルAPIを通して、データソースと通信します。APIはローカル環境のNode.jsでも利用できますし、[REST経由でリモートでも利用できますし](Built-in-models-REST-API.html)、[iOS、Android及びHTML5](Client-SDKs.html)のネイティブクライアントAPI経由でも利用できます。これらのAPIを利用すると、データベースへの問い合わせや、データの保存、ファイルアップロード、Eメールの送信、Push通知、ユーザ登録、その他のデータソースやサービスで提供されるアクションを実行することができます。

クライアントは[Strong Remoting](Strong-Remoting.html)を利用して直接LoopBack APIを呼ぶことができます。Strong Remotingは、REST、WebSocketsなどの通信方法によるバックエンドを提供する、プラガブルな通信レイヤです。

以下の図は、主要なLoopBackモジュールが互いにどう関連し、どのような依存関係にあるかを説明しています。

{% include image.html file="9830413.png" alt="" %}

### LoopBackフレームワークのモジュール

<table>
  <tbody>
    <tr>
      <th>
        <p>カテゴリ</p>
      </th>
      <th>
        <p>説明</p>
      </th>
      <th>
        <p>用途</p>
      </th>
      <th>
        <p>モジュール名</p>
      </th>
    </tr>
    <tr>
      <td>
        <p>Models</p>
      </td>
      <td>
        <p>ModelとAPIサーバ</p>
      </td>
      <td>
        <p>素早く直接的にモデルをモックアップし、APIとして公開します。永続化について考える必要はありません。</p>
      </td>
      <td>loopback</td>
    </tr>
    <tr>
      <td>
        <p>Abstraction</p>
      </td>
      <td>
        <p>物理永続化のための<span>モデルデータの抽象化</span></p>
      </td>
      <td>
        <p>複数のデータソースまたはサービスに接続し、抽象化されたモデルを返します。モデルはどのように物理的に保存されているかに依存しない<span style="line-height: 1.42857;">CRUD機能を提供します。</span></p>
      </td>
      <td>
        <div style="width: 200px;">
          <p>loopback-datasource-juggler</p>
        </div>
      </td>
    </tr>
    <tr>
      <td>Initialization</td>
      <td>アプリケーション初期化</td>
      <td>
        <p>データソースの環境設定、モデルのカスタマイズ、モデルの環境設定やデータソースへのアタッチの設定を行います。また、アプリケーションの設定とカスタムブートスクリプトを実行します。</p>
      </td>
      <td>loopback-boot</td>
    </tr>
    <tr>
      <td>Sequencing</td>
      <td>ミドルウェア実行</td>
      <td>
        <p>ミドルウェアを設定します。ミドルウェアは、<span>アプリケーションライフサイクル中のいろいろな時点で実行されます。</span></p>
      </td>
      <td>loopback-phase</td>
    </tr>
    <tr>
      <td>
        <p>Data</p>
      </td>
      <td>
        <p>RDBMSやnoSQL物理データソース</p>
      </td>
      <td>
        <p>RDBMSやnoSQLデータソースとの接続を可能にし、抽象化されたモデルを返します。</p>
      </td>
      <td>
        <p>loopback-connector-mongodb</p>
        <p>loopback-connector-mysql</p>
        <p>loopback-connector-postgresql</p>
        <p>loopback-connector-msssql</p>
        <p>loopback-connector-oracle</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Integration</p>
      </td>
      <td>
        <p>一般的なシステムコネクタ</p>
      </td>
      <td>
        <p>RESTのようなWebインターフェースや、SOAPのような一般的なエンタープライズインターフェースを用いてAPIを公開している既存のシステムと接続します。</p>
      </td>
      <td>
        <p>loopback-connector-rest</p>
        <p>loopback-connector-soap</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Services</p>
      </td>
      <td>
        <p>構築済みサービス</p>
      </td>
      <td>
        <p>よくあるユースケースに便利に使うことが出来る、コンポーネント化された構築済みサービスと連携します。</p>
      </td>
      <td>
        <p>loopback-component-push</p>
        <p>loopback-component-storage</p>
        <p>loopback-component-passport</p>
        <p>loopback-component-sync<br>(in development)</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Gateway</p>
      </td>
      <td>
        <p>APIゲートウェイ</p>
      </td>
      <td>
        <p>APIをセキュアにし、呼び出しと応答のワークフローに、QoSの視点を導入します。</p>
      </td>
      <td>
        <p>loopback-gateway</p>
        <p>loopback-component-oauth2</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Clients</p>
      </td>
      <td>
        <p>クライアントSDK</p>
      </td>
      <td>
        <p><span style="line-height: 1.42857;">ネイティブプラットフォームオブジェクト</span><span style="line-height: 1.42857;"> (iOS, Android, AngularJS) を用いて、</span>REST経由でLoopBack APIと通信する<span style="line-height: 1.42857;">クライアントアプリを開発します。</span></p>
      </td>
      <td>
        <p>loopback-sdk-ios</p>
        <p>loopback-sdk-android</p>
        <p>loopback-sdk-angular</p>
      </td>
    </tr>
  </tbody>
</table>
