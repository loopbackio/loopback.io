---
title: "リレーショナルデータベースからモデルを発見する"
lang: ja
layout: page
keywords: LoopBack
tags: [models, data_sources]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Discovering-models-from-relational-databases.html
redirect_from: "/doc/ja/lb2/Database-discovery-API.html"
summary:
---

## 概要

LoopBack は、既存のリレーショナル・データベースからモデルを作成することが簡単にできます。
この処理は_発見_と呼ばれ、以下のコネクタで使用可能です。

* [MySQL コネクタ](MySQL-connector.html)
* [PostgreSQL コネクタ](PostgreSQL-connector.html)
* [Oracle コネクタ](Oracle-connector.html)
* [SAP HANA](https://www.npmjs.org/package/loopback-connector-saphana) - Not officially supported; see [Community connectors](Community-connectors.html).
* [SQL Server コネクタ](SQL-Server-connector.html)

MongoDBのようなNoSQLデータベースについては、代わりに [instance introspection](Creating-models-from-unstructured-data.html)を使います。

リレーショナルデータベースに接続されたデータソースは、自動的に非同期の~[データベース発見API](http://apidocs.loopback.io/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels)が使えます。

### 基本的な手続き

基本的な手続きは以下のとおりです。

1.  アプリケーションで使用するモデルの定義を、スクリプトを実行して発見する。
詳しくは、[下の例](#additional-discovery-functions)を参照。
2.  `fs.writeFile()`を使って、出力を `common/models/model-name.json` に保存する。
3.  新しいモデルのエントリを `server/model-config.json` に追加する。
4.  アプリケーションを実行する。

    ```shell
    $ node .
    ```

5.  LoopBack Explorerを使って、スキーマが正しく定義されているか確認する。

## 発見のサンプル

例えば、Oracleデータベースの場合を考えます。まず、Oracleデータソースをセットアップします。
そして、`discoverAndBuildModels()` を呼び出すと、データベースのテーブルからモデルが作られます。
 `associations: true` オプションをつけて実行すると、プライマリ／外部キーの関係も辿るようになります。

{% include code-caption.html content="/server/bin/script.js" %}
```javascript
var loopback = require('loopback');
var ds = loopback.createDataSource('oracle', {
  "host": "oracle-demo.strongloop.com",
  "port": 1521,
  "database": "XE",
  "username": "demo",
  "password": "L00pBack"
});

// INVENTORY テーブルからモデルを発見・作成する。
ds.discoverAndBuildModels('INVENTORY', {visited: {}, associations: true},
function (err, models) {
  // モデル名をキーに持つモデルのリストが使えます。
  // inventory の最初のレコードを取得します。
  models.Inventory.findOne({}, function (err, inv) {
    if(err) {
      console.error(err);
      return;
    }
    console.log("\nInventory: ", inv);
    // product モデルに導いています。
    // inventory テーブルが、product テーブルに対して外部キー関係を持っていることを仮定しています。
    inv.product(function (err, prod) {
      console.log("\nProduct: ", prod);
      console.log("\n ------------- ");
    });
  });
});
```

## さらなる発見の関数

いくつかのコネクタは、データソースを使って、既存のデータベーススキーマからモデルの定義を発見することができます。
以下のAPIは、データベーススキーマ定義を発見し、LoopBackモデルを構築するために使うことができます。

`discoverModelDefinitions()` は、既定ではデータベースに接続しているユーザが所有しているデータベーススキーマを発見します。
`all: true` オプションをつけて実行することで、全てのスキーマを発見の対象に含められます。

{% include code-caption.html content="/server/bin/script.js" %}
```javascript
// データベースのテーブル・ビューを列挙する
ds.discoverModelDefinitions({views: true, limit: 20}, cb);

// 与えられたテーブル／ビューの列を列挙する
ds.discoverModelProperties('PRODUCT', cb);
ds.discoverModelProperties('INVENTORY_VIEW', {owner: 'STRONGLOOP'}, cb);

// 与えられたテーブルのプライマリキーを列挙する
ds.discoverPrimaryKeys('INVENTORY',  cb);

// 与えられたテーブルの外部キーを列挙する
ds.discoverForeignKeys('INVENTORY',  cb);

// 与えられたテーブルのプライマリキーを外部キーとして参照している者を列挙する
ds.discoverExportedForeignKeys('PRODUCT',  cb);

// 与えられたテーブルからモデル定義を発見によって作成する
ds.discoverSchema(table, {owner: 'STRONGLOOP'}, cb);
```
