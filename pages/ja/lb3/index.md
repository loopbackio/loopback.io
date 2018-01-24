---
lang: ja
title: LoopBack 3.x
toc: false
keywords: LoopBack 3.0
tags: [getting_started]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/index.html
summary: LoopBack 3.0 が現在のリリース版です。
---

{% include note.html content="This is a community translation into Japanese. For the latest information, see the [English version](/doc/en/lb3/index.html).
" %}

{% include important.html content="LoopBack 3.x が現在のリリース版です。
2016年12月21日に一般向けにリリースされました。[release announcement](https://strongloop.com/strongblog/announcing-loopback-3-0-ga/)を参照ください。
LoopBack 2.x は現在 [LTSリリース](/doc/en/contrib/Long-term-support.html) です。
" %}

## LoopBack ツールのインストール

LoopBackアプリを作成・編集するために、LoopBack コマンドラインインターフェース（CLI）ツールをインストールします。

LoopBack CLI ツールをインストールするには、以下のコマンドを実行します。

```
npm install -g loopback-cli
```

詳しくは、[インストール](Installation)を参照してください。

## Upgrading an existing StrongLoop installation to version 3

For instructions to upgrade existing StrongLoop installation, see [Updating to the latest version](Updating-to-the-latest-version.html).

## Migrating your app to version 3

Read the [Migration Guide](Migrating-to-3.0.html) for instructions on upgrading
to LoopBack 3.0.

The [Release Notes](3.0-Release-Notes) provide a comprehensive reference for
all the changes between 2.x and 3.x.

## はじめに

1. **[LoopBack ツールのインストール](Installation)**.  
1. **[LoopBack の核となる概念](LoopBack-core-concepts.html)を読んで** LoopBackを使う上で理解する必要のある重要な概念を学ぶ。
1. **[LoopBack を始めよう](Getting-started-with-LoopBack.html)に沿って** クイックチュートリアルを試す。

[LoopBack Developer Forum](https://groups.google.com/forum/#!forum/loopbackjs)を調べて、LoopBackの使い方について質問したり、議論したりできます。

{% include note.html content ="[IBM API Connect](https://developer.ibm.com/apiconnect/) is an end-to-end API management solution that uses LoopBack to create APIs, and provides integrated build and deployment tools.  For more information, see [Installing IBM API Connect](Installation.html#install-ibm-api-connect-developer-toolkit).
" %}

**If you are an IBM customer, for technical support see the [IBM Support Portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214).**

## LoopBack フレームワーク

LoopBack フレームワークは、REST API を素早く構築するために、個別に使うことも、組み合わせて使うこともできる Node.js モジュールの集合体です。

LoopBackアプリケーションは、LoopBackモデルAPIを通してデータソースと相互作用します。APIは、Node.jsからローカルに、あるいは[リモートからREST経由](Built-in-models-REST-API)や[iOS・Android・HTML5](Client-SDKs)用のネイティブクライアントAPIを介して利用できます。
これらのAPIを使って、アプリケーションはデータベースに問い合わせたり、データを保存したり、ファイルをアップロードしたり、メールを送信したり、プッシュ通知を行ったり、ユーザを登録したり、データソースやサービスが提供するその他のアクションを実行したりできます。

REST・WebSockets・その他の転送方法を通じてバックエンドAPIを提供する、着脱可能な転送レイヤーである[Strong Remoting](Strong-Remoting.html)を直接使って、クライアントは LoopBack API を呼出すことができます。

以下の図は、LoopBackの重要モジュールがどのように関連・依存しているかを示したものです。

{% include image.html file="9830413.png" alt="LoopBack モジュール" %}

### LoopBack フレームワークのモジュール

<table style="width: 1000px;">
  <thead>
    <tr>
      <th style="width: 80px;">カテゴリー</th>
      <th style="width:200px;">詳細</th>
      <th>用途</th>
      <th style="width: 280px;">モジュール</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>モデル</td>
      <td>モデルとAPIサーバ</td>
      <td>動的にモデルのモックアップを作り、それらのAPIを永続化のことは心配せずに公開する。</td>
      <td>loopback</td>
    </tr>
    <tr>
      <td>抽象化</td>
      <td>物理的な永続化をモデルデータに抽象化する</td>
      <td>複数のデータソースやサービスに接続し、背後にあるデータソースとは独立してCRUDが行える抽象化モデルを返す。</td>
      <td>loopback-datasource-juggler</td>
    </tr>
    <tr>
      <td>初期化</td>
      <td>アプリケーションの初期化</td>
      <td>データソースの設定・モデルのカスタマイズ・モデルの設定とデータソースの紐付け・アプリケーション設定とカスタム起動スクリプトの実行</td>
      <td>loopback-boot</td>
    </tr>
    <tr>
      <td>順序付け</td>
      <td>ミドルウェアの実行</td>
      <td>アプリケーションのライフサイクルにおいて複数のポイントでミドルウェアが実行されるように設定する</td>
      <td>loopback-phase</td>
    </tr>
    <tr>
      <td>データ</td>
      <td>RDBMS と noSQL の物理データソース</td>
      <td>RDBMSとnoSQLデータソースに接続を可能にし、抽象化モデルを返す。</td>
      <td markdown="1">
- loopback-connector-mongodb
- loopback-connector-mysql
- loopback-connector-postgresql
- loopback-connector-msssql
- loopback-connector-oracle
- [その他多数](Connectors-reference.html)
</td>
    </tr>
    <tr>
      <td>統合</td>
      <td>汎用的なシステム間接続</td>
      <td>既存システムが公開しているAPIに、一般的なWebインターフェースで接続する。</td>
      <td markdown="1">
- loopback-connector-rest
- loopback-connector-soap
</td>
    </tr>
    <tr>
      <td>コンポーネント</td>
      <td>LoopBack コアへのアドオン</td>
      <td>コンポーネントにパッケージ化されたビルド済みサービスを統合する。</td>
      <td markdown="1">
- loopback-component-push
- loopback-component-storage
- loopback-component-passport
</td>
    </tr>
    <tr>
      <td>クライアント</td>
      <td>クライアントSDK</td>
      <td>ネイティブプラットフォームオブジェクト(iOS, Android, AngularJS)を使って、LoopBackとREST経由で通信するクライアントアプリを開発する。</td>
<td markdown="1">
- loopback-sdk-ios
- loopback-sdk-android
- loopback-sdk-angular
</td>
    </tr>
  </tbody>
</table>
