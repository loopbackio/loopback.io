---
title: "データの作成・更新・削除"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Creating-updating-and-deleting-data.html
summary:
---

{% include content/ja/angular-methods-caveat.html %}

[PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel-new-persistedmodel)には、データの作成・更新・削除のための多数のメソッドがあります。

モデルデータは、_モデルインスタンス_ とも呼ばれます。
概念的には、モデルは表に対応し、モデル・インスタンスは表の _行_ または _レコード_ に対応します。

{% include note.html content="モデルの読取操作については、[データの検索](Querying-data.html)を参照してください。
" %}

## データ（モデルインスタンス）の作成

インスタンスを挿入または作成するために、次の[PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel)のメソッドを使用してデータを追加します。

* [create](http://apidocs.loopback.io/loopback/#persistedmodel-create) - 新しいモデルインスタンス（レコード）を作成します。
* [upsert](http://apidocs.loopback.io/loopback/#persistedmodel-upsert) - インスタンス（レコード）が存在するかどうかを、
  指定された[IDプロパティ](Model-definition-JSON-file.html#id-properties)に基づいてチェックし ます。インスタンスがすでに存在する場合、
  メソッドはそのインスタンスを更新します。それ以外の場合は、新しいインスタンスが挿入されます。
* [findOrCreate](http://apidocs.loopback.io/loopback/#persistedmodel-findorcreate) - 最初のパラメータとして指定されたフィルタオブジェクトに一致する1つのインスタンスを検索します。
  見つかった場合、オブジェクトを返します。見つからなければ、新しいインスタンス（レコード）を作成します。

    {% include important.html content="フィルタオブジェクトには`where`句を必ず含めてください。
    `where` がなければ、`findOrCreate`はエラーなしに、コレクション内の最初のレコードを、発見し返します。これは意図しない動作を引き起こす可能性があります。
    " %}
* [save](http://apidocs.loopback.io/loopback/#persistedmodel-prototype-save) - モデルインスタンスを保存します。
  インスタンスにIDがない場合は、 代わりに[create](http://apidocs.loopback.io/loopback/#persistedmodel-create)を呼び出します。
  トリガー：validate、save、updateまたはcreate

## データ（モデルインスタンス）の更新

静的メソッド（Modelオブジェクトで呼び出されます）：

* [updateAll](http://apidocs.loopback.io/loopback/#persistedmodel-updateall) - 指定された[where 句](Where-filter.html)に一致する複数のインスタンス（レコード）を更新します。

{% include important.html content="`updateAll()` で使用するwhere句は、他の検索とは少し異なります。where句から`{ where : ... }` を省略してください。
条件を最初の引数として指定するだけです。

詳細については、 [Whereフィルタ](Where-filter.html)を参照してください。
" %}

インスタンスメソッド（単一のモデルインスタンスで呼び出されます）：

* [updateAttribute](http://apidocs.loopback.io/loopback/#persistedmodel-prototype-updateattribute) - 単一の属性（プロパティ）を更新します。
* [updateAttributes](http://apidocs.loopback.io/loopback/#persistedmodel-prototype-updateattributes) - 属性（プロパティ）のセットを更新します。
  更新前に検証を実行します。

### 一括更新の実行

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Describe why you would perform bulk updates. &nbsp;Used with sync, for example.</div>

* [createUpdates](http://apidocs.loopback.io/loopback/#persistedmodel-createupdates)
* [bulkUpdate](http://apidocs.loopback.io/loopback/#persistedmodel-bulkupdate)

## データの削除

静的メソッド（Modelオブジェクトで呼び出されます）：

* [destroyAll](http://apidocs.loopback.io/loopback/#persistedmodel-destroyall) - オプションの[Whereフィルタ](Where-filter.html)と一致するすべてのモデルインスタンスを削除します。
* [destroyById](http://apidocs.loopback.io/loopback/#persistedmodel-destroybyid) - 指定されたIDを持つモデルインスタンスを削除します。

{% include important.html content="`destroyAll()` で使用するwhere句は、他の検索とは少し異なります。where句から`{ where : ... }` を省略してください。
条件を最初の引数として指定するだけです。

詳細については、 [Whereフィルタ](Where-filter.html)を参照してください。
" %}
