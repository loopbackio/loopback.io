---
lang: ja
title: 'GraphQL APIの公開'
keywords: LoopBack 4.0, LoopBack 4, GraphQL
sidebar: lb4_sidebar
permalink: /doc/en/lb4/exposing-graphql-apis.html
---

## 概要

[OpenAPI-to-GraphQL module](https://www.npmjs.com/package/openapi-to-graphql)モジュールは、 OpenAPIの仕様で説明されている、既存のREST APIのGraphQLラッパーを作成します。このチュートリアルでは、既存のLoopBackアプリケーションでGraphQL APIを公開する方法を示します。


### 前提条件

実行中のLoopBack 4アプリケーションがあることを確認してください。このチュートリアルでは、 `todo` 例を使用します。以下のコマンドを実行して、このアプリケーションを作成できます。

```sh
lb4 example todo
```

### OpenAPI-to-GraphQL・その他必要な依存関係のインストール

LoopBackアプリケーションから次のコマンドを実行して、OpenAPI-to-GraphQLと必要な依存関係をインストールします。

```sh
npm i --save openapi-to-graphql-cli
```

### GraphQLサーバーの起動

`http://localhost:3000/openapi.json`にアクセスして、LoopBackアプリケーションが実行されていることを確認します。実行されていない場合は、`npm start` コマンドを実行して起動できます 。

ここで、OpenAPI-to-GraphQL CLIを使用して、ポート3001でExpressによってバックアップされたGraphQL HTTPサーバーをセットアップします。todo-applicationによって生成されたOpenAPI仕様をパラメーターとして指定し、次のコマンドを実行して、サーバーを起動します。

```sh
npx openapi-to-graphql --port=3001 http://localhost:3000/openapi.json
```

_`npx` について馴染みがないでしょうか。`npm` とNode.js 8.x以降から提供される、便利なヘルパーです。詳細については、[Introducing npx: an npm package runner](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)をご参照ください。_


完了です！これで、http：// localhost：3001 / graphqlのブラウザで、いくつかのテストとリクエストを試す準備ができました。

{% include note.html content="
現在、同じHTTPホストとポートで、メインREST APIとともにGraphQLエンドポイントを公開する方法を検討しています。[issue #1905](https://github.com/strongloop/loopback-next/issues/1905)をご参照ください 。
" %}

### GraphQL APIsを試してみましょう

まず、`query` と `mutation`呼び出しの例を示します。

1. 全てのタスクインスタンスを取得するには、次のクエリコマンドを実行します。

   ```
   query{
     todos {
       id
       title
       desc
     }
   }
   ```

   予想される出力は、次のようになります。

   ```json
   {
     "data": {
       "todos": [
         {
           "id": 1,
           "title": "Take over the galaxy",
           "desc": "MWAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA"
         },
         {
           "id": 2,
           "title": "destroy alderaan",
           "desc": "Make sure there are no survivors left!"
         },
         {
           "id": 3,
           "title": "play space invaders",
           "desc": "Become the very best!"
         },
         {"id": 4, "title": "crush rebel scum", "desc": "Every.Last.One."}
       ]
     }
   }
   ```

2. 次のミューテーションコマンドを使用して、to-doインスタンスを作成し、応答オブジェクトでそのIDとタイトルを取得します。

   ```
   mutation {
     todoControllerCreateTodo(newTodoInput: {
       title: "Take over the universe"
     }) {
       id
       title
     }
   }
   ```

   予想される出力は、次のようになります。

   ```json
   {
     "data": {
       "todoControllerCreateTodo": {
         "id": 5,
         "title": "Take over the universe"
       }
     }
   }
   ```
