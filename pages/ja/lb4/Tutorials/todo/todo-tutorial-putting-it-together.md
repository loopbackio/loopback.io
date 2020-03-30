---
lang: ja
title: '統合する'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/ja/lb4/todo-tutorial-putting-it-together.html
summary: LoopBack 4 Todo Application Tutorial - Putting it all together
---

### 統合する
これで、全てのアーティファクトが用意できました。これらはすべて[Application](../../Application.md) で自動的にバインドされるので、LoopBackの[Dependency injection](../../Dependency-injection.md) がすべてのアーティファクトを結合できます。

LoopBackの[ブートモジュール](https://github.com/strongloop/loopback-next/tree/master/packages/boot)は、コントローラー、リポジトリ、データソース、その他のアーティファクトを自動的に検出し、アプリケーションに挿入して使用します。

> **注意**: ブートモジュールは、アーティファクトディレクトリに対して確立された規則に従うアーティファクトを検出して挿入します。ここではいくつかの例を示します。
>
> - コントローラ: `./src/controllers`
> - データソース: `./src/datasources`
> - モデル: `./src/models`
> - レポジトリ: `./src/repositories`
>
> この動作をカスタマイズする方法を調べるには、　
> [Booters](../../Booting-an-Application.md#booters)セクションの
> [Booting an Application](../../Booting-an-Application.md)を参照してください。

アプリケーションを試してみましょう！まず、アプリを起動します。

```sh
$ npm start

Server is running at http://127.0.0.1:3000
```

次に、[API Explorer](http://localhost:3000/explorer) でAPIを確認しましょう。リクエストを行うことができます。

ここでは、以下のリクエストを試すことができます。

- `POST /todos` with a body of `{ "title": "get the milk" }`
- `GET /todos/{id}` using the ID you received from your `POST`, and see if you
  get your Todo object back.
- `PATCH /todos/{id}`, using the same ID, with a body of
  `{ "desc": "need milk for cereal" }`

以上です！最初の LoopBack 4 アプリケーションが作成されました。

_注意: アプリケーションを停止するには **CTRL+C** を行います_

### このチュートリアルの続編

`TodoListApplication`上に構築できる機能はまだたくさんあります。以下は、追加機能の追加をガイドする、続編のチュートリアル例です。
- **RESTベースのジオコーディングサービスとの統合**: 一般的なREST APIサーバーは、SOAPやRESTサービスなど、さまざまなソースからのデータにアクセスする必要があります。ボーナスセクションとして[ジオコーディングサービスと統合する](todo-tutorial-geocoding-service.md)を学び、LoopBackコネクタが他のサービスからデータをいかに簡単にフェッチするかを体験してください。

- **TodoListApplicationを使用して、関連モデルを追加する**: リレーションなど、LoopBack 4のより高度な機能を試してみたい場合は、ここから先の[TodoList tutorial](https://loopback.io/doc/en/lb4/todo-list-tutorial.html) を試してください。


### その他の例

LoopBack 4についてさらに知りたいですか?
[Examples](../../Examples.md) ・ [Tutorials](../../Tutorials.md) セクションをチェックして、目的に合ったカスタムコンポーネント、シーケンスなどを作成する例を見つけてください！

実際、これらの例は、モデルとデータソースのみを定義するように簡略化できますが、動作は同じです。[`CrudRestComponent`](https://loopback.io/doc/en/lb4/apidocs.rest-crud.crudrestcomponent.html)を使用すると、[rest-crud example](https://github.com/strongloop/loopback-next/tree/master/examples/rest-crud)の例にあるように、リポジトリクラスとコントローラクラスを省略できます。

### ナビゲーション

前のステップ: [コントローラを追加する](todo-tutorial-controller.md)
