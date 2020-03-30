---
lang: ja
title: 'Todo Modelを追加する'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/ja/lb4/todo-tutorial-model.html
summary: LoopBack 4 Todo Application Tutorial - Add the Todo Model
---

### モデル

ここから、LoopBack 4で使用するデータの表現に取り掛かります。そのために、Todoリストのタスクのインスタンスを表すための、Todoモデルを作成します。Todoモデルは 、リクエストの着信Todoインスタンスを表すための[データ転送オブジェクト](https://en.wikipedia.org/wiki/Data_transfer_object)（DTOとも呼ばれます）と、loopback-datasource-jugglerで使用するためのデータ構造の両方として機能します。

モデルはビジネスドメインオブジェクトを記述し、名前、タイプ、およびその他の制約を持つプロパティのリストを定義します。
また、モデルはネットワーク上または異なるシステム間のデータ交換に使用されます。

モデルの詳細と、LoopBackでのモデルの使用方法については、[モデル](../../Model.md)を参照してください 。

{% include note.html content="LoopBack 3では、モデルを操作の「中心」として扱っていましたが、LoopBack　4では異なります。LoopBack 4は、同じ方法でモデルを利用できるようにするヘルパーメソッドとデコレーターの多くを提供しますが、必ずしも必須ではなくなりました。


LoopBack 3 treated models as the 'center' of operations; in LoopBack 4, that is no longer the case. While LoopBack 4 provides many of the helper methods and decorators that allow you to utilize models in a similar way, you are no longer _required_ to do so!
" %}

### Todo モデルの作成

todo リストは、タスクの追跡に関するものです。これを有効にするには、タスクを区別できるようにタスクにラベルを付け、それらのタスクを説明する追加情報を追加し、最後に、タスクが完了したかどうかを追跡する方法を提供できるようにする必要があります。

to-do モデルには次のプロパティがあります。

- `id`: ユニークなid
- `title`: タイトル
- `desc`: 実行するタスクの詳細説明
- `isComplete`:タスクが完了したかどうかを示すブールフラグ

`lb4 model` コマンドを使用してプロンプトに答えることで、モデルを生成できます。空のプロパティ名を指定して`return` で、モデルを生成します。
次の手順を実行します：

```sh
lb4 model
? Model class name: todo
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Model Todo will be created in src/models/todo.model.ts

Let's add a property to Todo
Enter an empty property name when done

? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is id generated automatically? No
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name: title
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name: desc
? Property type: string
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name: isComplete
? Property type: boolean
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name:

   create src/models/todo.model.ts
   update src/models/index.ts

Model Todo was created in src/models/
```

完成したファイルを表示するには、[`Todo` example](https://github.com/strongloop/loopback-next/blob/master/examples/todo/src/models/todo.model.ts)を参照してください。

これでモデルができました！次は
[データソース](todo-tutorial-datasource.md) を追加して実際のCRUD操作を実行できるようにしましょう。

### ナビゲーション

前のステップ: [アプリの土台を作成する](todo-tutorial-scaffolding.md)

次のステップ: [データソースを追加する](todo-tutorial-datasource.md)
