---
title: "Oracle インストーラコマンド"
lang: ja
layout: page
tags: [data_sources, tools]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Oracle-installer-command.html
summary:
---
{% include content/ja/generator-create-app.html %}

[loopback-connector-oracle](https://github.com/strongloop/loopback-connector-oracle) モジュールのインストールやトラブルシューティングを行うユーティリティ。

{% include note.html content="このコマンドは、LoopBack CLI 2.4.0以上が必要です。LoopBack CLI の最新版をインストールするには、`npm i -g loopback-cli` を実行してください。
" %}

### 概要

```
lb oracle [options]
```

### オプション

`--connector`     
: loopback-connector-oracle モジュールをインストールします。

`--driver`
: oracledb モジュールをインストールします。

`--verbose`
: 詳細な情報を出力します。

{% include_relative includes/CLI-std-options.md %}

### 対話型のプロンプト

このツールは、Oracle インスタントクライアントがインストールされているか、`loopback-connector-oracle` モジュールがロードできるか確認します。
`loopback-connector-oracle` モジュールは、バイナリ形式のアドオンである Oracke Node.js ドライバ [oracledb](https://github.com/oracle/node-oracledb) に依存しています。
`oracledb` モジュールはビルドおよび実行の両方に [Oracle Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html) を必要とします。詳しくは [Installation Guide for oracledb](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md) を参照してください。

`loopback-connector-oracle` が使える場合、このツールは `Oracle connector is ready` と表示して終了します。
さもなくば、以下のいずれかをインストールするか確認してきます。

- Oracle インスタントクライアント
- loopback-connector-oracle
- oracledb モジュール
