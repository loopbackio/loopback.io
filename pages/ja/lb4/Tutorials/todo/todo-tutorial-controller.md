---
lang: ja
title: 'コントローラを追加する'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/ja/lb4/todo-tutorial-controller.html
summary: LoopBack 4 Todo Application Tutorial - Add a Controller
---

### コントローラ

LoopBack 4では、[コントローラ](../../Controllers.md) がAPIの要求/応答ライフサイクルを処理します。コントローラーの各関数は、着信要求（`/todos`へのPOST要求など）を処理し、ビジネスロジックを実行し、レスポンスを返すために個別にアドレス指定できます。

`Controller`は、アプリケーションのAPIによって定義された操作を実装するクラスです。アプリケーションのビジネスロジックを実装し、HTTP / REST APIとドメイン/データベースモデル間のブリッジとして機能します。

この点で、コントローラーは、_ビジネスロジックのほとんどが存在する領域_ということになります。

詳細については、[コントローラ](https://loopback.io/doc/en/lb4/Controllers.html)をご参照ください。

### コントローラを作成する

以下のCLIコマンドで RESTコントローラを作成できます。 

```sh
lb4 controller
? Controller class name: todo
Controller Todo will be created in src/controllers/todo.controller.ts

? What kind of controller would you like to generate? REST Controller with CRUD functions
? What is the name of the model to use with this CRUD repository? Todo
? What is the name of your CRUD repository? TodoRepository
? What is the name of ID property? id
? What is the type of your ID? number
? Is the id omitted when creating a new instance? Yes
? What is the base HTTP path name of the CRUD operations? /todos
   create src/controllers/todo.controller.ts
   update src/controllers/index.ts

Controller Todo was created in src/controllers/
```

`src/controllers/todo.controller.ts`内の `TodoController`を確認してみましょう。`@repository` デコレータはインバウンドリクエストが処理されるたびに、 `TodoRepository`のインスタンスを受け取り、インジェクトします。コントローラオブジェクトのライフサイクルは、リクエストごとです。つまり、リクエストごとに新しいコントローラインスタンスが作成されるということです。これらのインスタンスの作成は、新しいコントローラーインスタンスを作成するよりも複雑で手間がかかるため、結果として、`TodoRepository` のインジェクションを行うこととなります。

{% include note.html content="
注：LoopBack 4では 、_すべての_バインディングのライフサイクルをカスタマイズできます。コントローラは、シングルトンライフサイクルを使用して、起動コストを最小限に抑えて簡単に作成できます。詳細については、 [Dependency injection](../../Dependency-injection.md)セクションを参照してください。" %}

この例では、LoopBackにルート、動詞、および受信リクエスト本文の形式に関するメタデータを提供する2つの新しいデコレーターがあります。

- `@post('/todos')`は、 パスと動詞が一致したときにリクエストをこの関数にリダイレクトできるように、メタデータを `@loopback/rest` に作成します。
- `@requestBody()` は、 LoopBackが着信要求のフォーマットを検証できるように、TodoのOpenAPIスキーマを要求の本文に関連付けます。

この例について注意すべき追加事項:

-  `@get('/todos/{id}')` といったルートは、リクエスト時にこれらの値をハンドラ関数にインジェクトするために`@param.path`のデコレータにペアできます。
- LoopBackの `@param` デコレータは、他の「サブデコレータ」で満たされたネームスペースを含みます。「サブデコレータ」は`@param.path`、`@param.query`、 `@param.header`といったもので、これらはRESTリクエストの部分へのメタデータの指定を可能にします。
- LoopBackの `@param.path` や `@param.query` は、  `@param.path.number('id')`といった、特定の値のプリミティブなタイプを指定するためのサブデコレータを供給します。

完成したファイルは[`Todo` example](https://github.com/strongloop/loopback-next/blob/master/examples/todo/src/controllers/todo.controller.ts)をご参照ください。

これでコントローラーを配線しました。最後のステップはすべてを[アプリケーション](todo-tutorial-putting-it-together.md)に結び付けることです！

### ナビゲージョン

前のステップ: [レポジトリを追加する](todo-tutorial-repository.md)

最終ステップ: [統合する](todo-tutorial-putting-it-together.md)
