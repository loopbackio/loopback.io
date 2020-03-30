---
lang: ja
title: 'データソースを追加する'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/ja/lb4/todo-tutorial-datasource.html
summary: LoopBack 4 Todo Application Tutorial - Add a Datasource
---

### データソース

データソースは、データベース、API、メッセージキューなど、さまざまなデータソースに接続するLoopBackのメソッドです。そして、Loopback 4の`DataSource`は、外部システム内のデータを表すコネクタインスタンスの名前を付けたコンフィグレーションです。コネクターは、データ操作のためにLoopBack 4リポジトリを強化するために`legacy-juggler-bridge`によって使用されます。

LoopBack 4ではデータソースを、強く型付けされたオブジェクトとして表すことができ、またアプリケーション全体で自由に [injection](../../Dependency-injection.md)に適用できるようになります。通常、LoopBack 4では、データソースを [Repositories](../../Repositories.md)と組み合わせて使用​​して、データへのアクセスを提供します。

LoopBackのデータソースの詳細については、[DataSources](../../DataSources.md)を参照してください。
また、APIはTodoアイテムのインスタンスを永続化する必要があるため、これを可能にするためにデータソース定義を作成する必要があります。

### データソースの構築

プロジェクトフォルダー内から、`lb4 datasource`コマンドを実行してDataSourceを作成します。このチュートリアルでは、Jugglerに付属のメモリコネクタを使用します。

```sh
lb4 datasource
? Datasource name: db
? Select the connector for db: In-memory db (supported by StrongLoop)
? window.localStorage key to use for persistence (browser only):
? Full path to file for persistence (server only): ./data/db.json

  create src/datasources/db.datasource.config.json
  create src/datasources/db.datasource.ts
  update src/datasources/index.ts

Datasource Db was created in src/datasources/
```

完成したファイルを表示するには、[`Todo` example](https://github.com/strongloop/loopback-next/tree/master/examples/todo/src/datasources).
を参照してください 。
アプリケーションルート内に `data`フォルダを作成し、サンプルデータを置いた`db.json` を作成し、格納します。

{% include code-caption.html content="data/db.json" %}

```json
{
  "ids": {
    "Todo": 5
  },
  "models": {
    "Todo": {
      "1": "{\"title\":\"Take over the galaxy\",\"desc\":\"MWAHAHAHAHAHAHAHAHAHAHAHAHAMWAHAHAHAHAHAHAHAHAHAHAHAHA\",\"id\":1}",
      "2": "{\"title\":\"destroy alderaan\",\"desc\":\"Make sure there are no survivors left!\",\"id\":2}",
      "3": "{\"title\":\"play space invaders\",\"desc\":\"Become the very best!\",\"id\":3}",
      "4": "{\"title\":\"crush rebel scum\",\"desc\":\"Every.Last.One.\",\"id\":4}"
    }
  }
}
```

{% include note.html content=" 既にデータソースとしてリレーショナルデータベースを使用している場合は、対応するテーブルを作成するか、[データベースの以降手順](https://loopback.io/doc/en/lb4/Database-migrations.html) に従ってプログラムで作成してください。
" %}

準備ができたら、データソースに[レポジトリ](todo-tutorial-repository.md) を追加します。

### Navigation

前のステップ: [モデルを追加する](todo-tutorial-model.md)

次のステップ: [レポジトリを追加する](todo-tutorial-repository.md)
