---
lang: ja
title: 'レポジトリを追加する'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/ja/lb4/todo-tutorial-repository.html
summary: LoopBack 4 Todo Application Tutorial - Add a Repository
---

### レポジトリ
レポジトリパターンは、LoopBack 3と4の最も根本的な差異の1つです。LoopBack3では、モデルクラス定義自体を使用してCRUD操作を実行します。LoopBack 4では、これを担当するレイヤーは、モデル自体の定義からリポジトリレイヤーに分離されています。

`Repository`は、基になるデータベースやサービスに対するドメインモデルの、厳密に型指定されたデータアクセス（CRUDなど）操作を提供する、特殊な`Service`インターフェイスを表します。

リポジトリの詳細については、[リポジトリ](../../Repositories.md)を参照してください 。

### リポジトリを作成する

プロジェクトフォルダー内から`lb4 repository`コマンドを実行し、前のステップで作ったデータソースを使用して、to-doモデルのリポジトリを作成します。`db`データソースは、`DbDataSource`可能なデータソースのリストから、そのクラス名によって現れます。

```sh
lb4 repository
? Please select the datasource DbDatasource
? Select the model(s) you want to generate a repository Todo
? Please select the repository base class DefaultCrudRepository (Legacy juggler
bridge)

   create src/repositories/todo.repository.ts
   update src/repositories/index.ts

Repository TodoRepository was created in src/repositories/
```

この`src/repositories/index.ts` ファイルにより、成果物のエクスポートが中心になり、インポートも容易になります。

新しく作成された `todo.repository.ts`クラスには、to-doモデルのCRUD操作を実行するために接続が必要です。これは、Todoモデル定義と「db」データソース設定を活用し[Dependency Injection](https://loopback.io/doc/en/lb4/Dependency-injection.html)をしようしてデータソースを取得します。

完成したファイルを表示するには、[`Todo` example](https://github.com/strongloop/loopback-next/blob/master/examples/todo/src/repositories/todo.repository.ts)をご参照ください。

これで、`Todo` APIを[controller](todo-tutorial-controller.md)を介して公開できます。

### ナビゲーション

前のステップ: [データソースを追加する](todo-tutorial-datasource.md)

次のステップ: [コントローラを追加する](todo-tutorial-controller.md)
