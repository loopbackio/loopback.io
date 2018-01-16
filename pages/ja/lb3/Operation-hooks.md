---
title: "操作フック"
redirect_from:
- /doc/ja/lb3/Operation-hooks-version-3.0.html
lang: ja
layout: navgroup
toc_level: 2
navgroup: app-logic
keywords: LoopBack
tags: [application_logic]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Operation-hooks.html
summary: 操作フックは、作成・読取・更新・削除に関する高レベルの操作を実行するすべてのメソッドによって起動されます。LoopBackバージョン3.0の操作フックには多くの変更が加えられました。
---

## 概要

_操作フック_ は特定のメソッドに束縛されず、作成・読取・更新・削除に関する高レベルの操作を実行するすべてのメソッドから起動されます。

対象は、アプリケーションモデルが継承する [永続化モデル](https://apidocs.loopback.io/loopback/#persistedmodel) のすべてのメソッドです。
操作フックを使用すると、それらの操作を呼び出す特定のメソッド（たとえば`create`・`save`・`updateOrCreate`）に関係なく、データを変更するアクションを割り込ませることができます。

APIは単純です。メソッド<code>Model.observe(<i>name</i>, <i>observer</i>)</code>で、_`name`_ は操作フックの名前の文字列、例えば「before save」など、そして、
_`observer`_ は `function observer(context, callback)` です。オブザーバーを継承する子供のモデルは、複数のオブザーバーを登録できます。

次の表は、PersistedModelのcreate・retrieve・update・deleteメソッドによって呼び出される操作フックをまとめたものです。

<table>
  <tbody>
    <tr>
      <th>
        <p>メソッド&nbsp;→<br>&nbsp;</p>
        <p>操作フック ↓</p>
      </th>
      <th>find<br>findOne<br>findById</th>
      <th>exists</th>
      <th>count</th>
      <th>create</th>
      <th>upsert</th>
      <th>findOrCreate</th>
      <th>deleteAll<br>deleteById </th>
      <th>updateAll</th>
      <th>prototype<br>.save</th>
      <th>prototype<br>.delete</th>
      <th>prototype<br>.updateAttributes</th>
      <th>
        prototype<br>.replaceAttributes
      </th>
      <th>replaceById</th>
      <th>replaceOrCreate</th>
      <th>upsertWithWhere</th>
    </tr>
    <tr>
      <th>access</th>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>before save</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>after save</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>before delete</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th>after delete</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th>loaded</th>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>persist</th>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td style="text-align: center;">X</td>
      <td>&nbsp;</td>
      <td style="text-align: center;">X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
  </tbody>
</table>

### 操作フックコンテキストオブジェクト

`context`オブジェクトは操作フックに固有で、`Model.beforeRemote`や`Model.afterRemote`を介して登録されたリモートフックに渡されるコンテキストオブジェクトとは何の関係もありません。詳細については、[リモートフック](Remote-hooks.html) を参照してください。
コンテキストオブジェクトは、`loopback.getCurrentContext()`によって提供される「現在のコンテキスト」にも関係しないことに注意してください。

#### すべてのフックと操作に共通のプロパティ

##### ターゲットモデル

`context.Model` プロパティは、操作の対象となるモデルのコンストラクタに設定されます。例えば、`Product.find()` では `context.Model = Product` をセットします。

##### 操作オプション

モデルの特定のメソッド（操作）の呼び出し元が提供するオプションに、フックがアクセスできるようにするために、コンテキストオブジェクトには `options` プロパティがあります。

例えば、以下のようになります。

```javascript
var FILTERED_PROPERTIES = ['immutable', 'birthday'];
MyModel.observe('before save', function filterProperties(ctx, next) {
  if (ctx.options && ctx.options.skipPropertyFilter) return next();
  if (ctx.instance) {
    FILTERED_PROPERTIES.forEach(function(p) {
      ctx.instance.unsetAttribute(p);
    });
  } else {
    FILTERED_PROPERTIES.forEach(function(p) {
      delete ctx.data[p];
    });
  }
  next();
});

// immutable is not updated
MyModel.updateOrCreate({
  id: 1,
  immutable: 'new value'
}, cb);

// immutable is changed
MyModel.updateOrCreate({
  id: 2,
  immutable: 'new value'
}, {
  skipPropertyFilter: true
}, cb);
```

##### 共有フック状態プロパティ

フック間（たとえば、「before save」と「after save」）でデータを共有するには、`ctx.hookState` プロパティを使用します。`ctx.hookState` プロパティの値は、1回の操作で呼び出されるすべてのフックで保持されます。

例えば、`MyModel.create()`は「access」「before save」「after save」フックを呼出しますが、それらは `ctx.hookState` に同じオブジェクトを持ちます。

対照的に、`ctx.options`は`MyModel.find()`や`MyModel.create()`のようなPersistedModelのメソッドが提供するoptions引数を使用して設定されます。
options引数が指定されなかった場合は、`ctx.options` は空のオブジェクトに設定されるため、フックは `ctx.options` が設定されているかどうかを確認する必要がありません。

#### フックと操作固有のプロパティ

上記の共通のプロパティに加えて、各フックは、操作の影響を受けるモデルインスタンスと適用された変更を識別する追加のプロパティを提供します。
一般的な規則は、コンテキストが`instance`プロパティまたは一組の`data`と`where`プロパティのいずれかを提供します。

##### instance

このプロパティは、操作が単一のインスタンスに影響を与え、_かつ_ すべてのモデルプロパティについて完全な更新・作成・削除が実行された時に、提供されます。
例えば、`PersistedModel.create()`などです。

##### where + data

操作が複数のインスタンスに影響を与える場合（例えば、`PersistedModel.updateAll()`）_または_ モデルプロパティの一部に部分的な更新が行われる場合（例えば、`PersistedModel.prototype.updateAttributes()`）、コンテキストは、影響を受けたレコードを見つけるために使われる[where filter](Where-filter.html)と、
なされるべき変更を含む`data`オブジェクトを提供する。

##### isNewInstance

いくつかの操作は、CREATE操作とUPDATE操作を区別するためのフラグを提供します。詳細については、個々のフックのドキュメントを参照してください。

{% include important.html content="
特定のコネクタのみ `ctx.isNewInstance` をサポートしています。他のコネクタでは未定義です。
[ctx.isNewInstance サポートの確認](Operation-hooks-version-3.0-.html)を参照してください。
" %}

##### currentInstance

このプロパティは、単一インスタンスの部分的な変更を実行するフックによって提供されます。
影響を受けるモデルインスタンスが含まれているため、値を読み取り専用（不変）として扱う必要があります。

### ctx.isNewInstance サポートの確認

`ctx.isNewInstance` の最初の実装では、メモリ・MongoDB・MySQLコネクタのみがサポートされていました。
"after save"フックで返された値をテストすることで、コネクタがこの機能をサポートしているかどうかを確認することができます。

例えば以下のようにします。

```javascript
MyModel.observe('after save', function(ctx, next) {
  console.log('supports isNewInstance?', ctx.isNewInstance !== undefined);
  next();
});
// It's important to provide a value for the id property
// Include also values for any required properties
MyModel.updateOrCreate({
  id: 123
}, console.log);
```

この機能がサポートされていない場合は、GitHub のコネクタプロジェクトで問題を報告してください。

### 影響を受けるインスタンスへのアクセス

単一のインスタンスのみに影響を与える操作（`PersistedModel.deleteAll`と`PersistedModel.updateAll`を除く、すべての作成・取得・更新・削除操作）は通常コンテキストオブジェクトに影響を受けたインスタンスを提供します。
ただし、操作に応じて、このインスタンスは変更可能な`ctx.instance`または読み取り専用の`ctx.currentInstance`のいずれかで提供されます。

<table width="800">
  <thead>
    <tr>
      <th width="220">メソッド</th>
      <th width="200">before save</th>
      <th width="200">persist</th>
      <th width="160">after save</th>
      <th>before delete</th>
      <th>after delete</th>
    </tr>
  </thead>
  <tbody style="font-size: 85%;">    
    <tr>
      <td><code>create</code></td>
      <td><code>ctx.instance</code></td>
      <td><code>ctx<br/>.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
    </tr>
    <tr>
      <td><code>findOrCreate</code></td>
      <td><code>ctx.instance</code></td>
      <td><code>ctx<br/>.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
    </tr>
    <tr>
      <td><code>updateOrCreate</code></td>
      <td>n/a*</td>
      <td><code>ctx<br/>.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
    </tr>
    <tr>
      <td><code>upsertWithWhere</code></td>
      <td>n/a*</td>
      <td><code>ctx<br/>.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
    </tr>
    <tr>
      <td><code>updateAll</code></td>
      <td>n/a</td>
      <td>n/a</td>
      <td>n/a</td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
    </tr>
    <tr>
      <td><code>prototype.save</code></td>
      <td><code>ctx.instance</code></td>
      <td><code>ctx<br/>.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
    </tr>
    <tr>
      <td><code>prototype<br/>.updateAttributes</code></td>
      <td><code>ctx<br/>.currentInstance</code></td>
      <td><code>ctx<br/>.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
    </tr>
    <tr>
      <td><code>prototype.delete</code></td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
      <td><code>ctx.where.id</code></td>
      <td><code>ctx.where.id</code></td>
    </tr>
    <tr>
      <td><code>deleteAll</code></td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
      <td style="text-align: center;">---</td>
      <td>n/a</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td><code>replaceOrCreate</code></td>
      <td><code>ctx.instance</code></td>
      <td><code>ctx<br/>.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td>---</td>
      <td>---</td>
    </tr>
    <tr>
      <td><code>prototype<br/>.replaceAttributes<br/>
replaceById</code>
      </td>
      <td><code>ctx.instance</code></td>
      <td><code>ctx<br/>.currentInstance</code></td>
      <td><code>ctx.instance</code></td>
      <td>---</td>
      <td>---</td>
    </tr>
  </tbody>
</table>

(&#42;) 操作 `updateOrCreate`と`upsertWithWhere`は、 "before save"フックにインスタンスを提供しません。
操作がUPDATEまたはCREATEになるかどうかを事前に伝えることは不可能であるため、既存の「currentInstance」が操作の影響を受けるかどうかを知る方法はありません。

詳細については、次のセクションを参照してください。

## フック

LoopBackは、次の操作フックを提供します。

* [access](Operation-hooks.html#access)
* [before save](Operation-hooks.html#before-save)
* [after save](Operation-hooks.html#after-save)
* [before delete](Operation-hooks.html#before-delete)
* [after delete](Operation-hooks.html#after-delete)
* [loaded](Operation-hooks.html#loaded)
* [persist](Operation-hooks.html#persist)

次の表は、PersistedModelメソッドが呼び出すフックの一覧です。

<table>
  <tbody>
    <tr>
      <th width="160">メソッドの名前</th>
      <th>呼び出されるフック</th>
    </tr>
    <tr>
      <td>
        <p>all<br>find<br>findOne <br>findById  <br>exists<br>count </p>
      </td>
      <td>access, loaded</td>
    </tr>
    <tr>
      <td>create</td>
      <td>before save, after save, loaded, persist</td>
    </tr>
    <tr>
      <td>upsert (別名 updateOrCreate)</td>
      <td>access, before save, after save, loaded, persist</td>
    </tr>
    <tr>
      <td>upsertWithWhere</td>
      <td>access, before save, after save, loaded, persist</td>
    </tr>
    <tr>
      <td>findOrCreate</td>
      <td>access, before save*, after save*, loaded, persist</td>
    </tr>
    <tr>
      <td>deleteAll (destroyAll)<br>deleteById (destroyById)</td>
      <td>access, before delete, after delete</td>
    </tr>
    <tr>
      <td>updateAll</td>
      <td>access, before save, after save, persist</td>
    </tr>
    <tr>
      <td>prototype.save</td>
      <td>before save, after save, persist, loaded</td>
    </tr>
    <tr>
      <td>prototype.delete</td>
      <td>before delete, after delete</td>
    </tr>
    <tr>
      <td>prototype.<br/>updateAttributes</td>
      <td>before save, after save, loaded, persist</td>
    </tr>
    <tr>
      <td>replaceOrCreate</td>
      <td>access, before save, after save, loaded, persist</td>
    </tr>
    <tr>
      <td>prototype.<br/>replaceAttributes
        <br/>replaceById
      </td>
      <td>before save, after save, loaded, persist</td>
    </tr>
  </tbody>
</table>

(&#42;) `findOrCreate` が既存のモデルを見つけたとき、saveフックは起動されません。
ただし、アトミック実装を提供するコネクタは、モデルが作成されるかどうかを事前に判断できないため、モデルが作成されていなくても`before save`を起動するかもしれません。

### access

`access` フックは、データベースがモデルに照会されるたび、つまり、[PersistedModel](https://apidocs.loopback.io/loopback/#persistedmodel) の
_あらゆる_ 作成・取得・更新・削除メソッドが呼び出されるときに起動します。
オブザーバーは、例えば追加の制限を加えるなどして、クエリを変更することができます。

{% include note.html content="
データベースからモデルインスタンスを読み込んだメソッドによって`access`フックが既に起動されているため、プロトタイプメソッドはフックを起動しません。

たとえば、REST APIを使用してプロトタイプメソッドを呼び出すと、静的 `findById()` （「access」フックを起動する）とプロトタイプメソッドの2つのモデル呼び出しが要求されます。
" %}

コンテキストプロパティ

* `Model` - 照会されるモデルのコンストラクタ
* `query` - `where`・`include`・`order`フィールドを含むクエリ

例：

```javascript
MyModel.observe('access', function logQuery(ctx, next) {
  console.log('Accessing %s matching %s', ctx.Model.modelName, ctx.query.where);
  next();
});

MyModel.observe('access', function limitToTenant(ctx, next) {
  ctx.query.where.tenantId = loopback.getCurrentContext().tenantId;
  next();
});
```

### before save

before save フックは、モデル・インスタンスが変更（作成・更新）される前に起動されます。具体的には、以下のPersistedModelのメソッドが呼び出されたときです。

* [create()](https://apidocs.loopback.io/loopback/#persistedmodel-create)
* [upsert()](https://apidocs.loopback.io/loopback/#persistedmodel-upsert)
* [upsertWithWhere()](http://apidocs.loopback.io/loopback/#persistedmodel-upsertwithwhere)
* [findOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-findorcreate) - `findOrCreate`が既存のモデルを見つけた場合、saveフックを起動しません。ただし、アトミック実装を提供するコネクタは、モデルが作成されなくても `before save`フックを起動する可能性があります。これは、モデルが作成されるかどうかを事前に判断できないためです。
* [updateAll()](https://apidocs.loopback.io/loopback/#persistedmodel-updateall)
* [prototype.save()](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-save)
* [prototype.updateAttributes()](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-updateattributes)
* [replaceOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-replaceorcreate)
* [prototype.replaceById()](https://apidocs.loopback.io/loopback/#persistedmodel-replacebyid) / [replaceAttributes()](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-replaceattributes)

フックは、 [モデル検証](Validating-model-data.html) 関数が呼び出される _前に_ 起動されます。

{% include tip.html content="
`before save` フックはバリデータが呼び出される前に起動されるので、空または欠損値が既定値で満たされていることを確認できます。
" %}

このフックをトリガするメソッドに応じて、コンテキストは次のプロパティセットのいずれかを持ちます。

* 単一モデルの完全保存
  * `Model` - 保存されるモデルのコンストラクタ
  * `instance` -  保存されるモデルのインスタンス。 値は`Model`クラスのインスタンスです。

* おそらく複数のモデルの部分的更新
  * `Model` - 保存されるモデルのコンストラクタ
  * `where` - どのインスタンスが影響を受けるかを記述するwhereフィルタ
  * `data` - 更新中に適用される（部分的な）データ
  * `currentInstance` - 影響を受けるインスタンス

#### ctx.isNewInstance

before save フックは、`ctx.instance` が設定されている場合に、`ctx.isNewInstance` プロパティを次のように提供します。

* すべてのCREATE操作で true です。
* すべてのUPDATEおよびREPLACE操作で false です。
* `updateOrCreate`・`upsertWithWhere`・`replaceOrCreate`・`prototype.save`・`prototype.updateAttributes`・`updateAll` 操作は undefined です。

#### 埋め込まれた関係

別のモデルに[埋め込まれている](Embedded-models-and-relations.html)モデルのbefore saveフックを定義することができます。
そして、包含モデルのインスタンスを更新または作成すると、埋め込まれたモデルの操作フックが起動されます。
この場合、コンテナモデルの新しいインスタンスのみが作成されるため、`ctx.isNewInstance` はfalseになります。

たとえば、`Customer emdedsOne Address` だとすると、Addressモデルに`before save`フックを定義し、新しいCustomerのインスタンスを作成すると操作フックが起動されます。

#### "before save" フックでモデルデータを操作する

上で説明したように、コンテキストは `instance` プロパティ、または一組の `data` および  `where` プロパティのいずれかを提供します。
`ctx.instance`の完全なモデルインスタンスを公開すると、フックは独自モデルのインスタンスメソッドを呼び出すことができます（たとえば、住所などの注文データが変更されたときに `order.recalculateShippingAndTaxes()` を呼び出すことができます）。
LoopBackの作成・取得・更新・削除操作が可能な限りインスタンスを提供するのはこのためです。

インスタンスオブジェクトを提供することが実現できない場合として、2つの特徴的な例外があります。

1.  `PersistedModel.updateAll` は与えられた条件に一致する複数のインスタンスを更新します。
    LoopBackはデータベースからデータをロードすることさえできません。これらのインスタンスを見つけて必要な変更を適用するのはデータベースの責任です。
2.  `PersistedModel.updateAttributes` が部分的な更新を実行すると、モデルのプロパティの一部のみが変更されます。
    LoopBackには利用可能なモデルインスタンスがありますが、データベース内でどのモデルプロパティを変更すべきかも知る必要があります。
    操作対象のデータを `ctx.data`（変更すべきプロパティだけを含むプレーンオブジェクト）で渡すことで、フックの実装に、変更するプロパティを簡単に追加/削除できるようになります。
    `ctx.currentInstance` を不変（読み取り専用）として扱う限り、変更されるモデルインスタンスにアクセスできます。

#### 例

```javascript
MyModel.observe('before save', function updateTimestamp(ctx, next) {
  if (ctx.instance) {
    ctx.instance.updated = new Date();
  } else {
    ctx.data.updated = new Date();
  }
  next();
});

MyModel.observe('before save', function computePercentage(ctx, next) {
  if (ctx.instance) {
    ctx.instance.percentage = 100 * ctx.instance.part / ctx.instance.total;
  } else if (ctx.data.part && ctx.data.total) {
    ctx.data.percentage = 100 * ctx.data.part / ctx.data.total;
  } else if (ctx.data.part || ctx.data.total) {
    // エラーを報告するか、欠けているプロパティをDBから読み取る
  }
  next();
});
```

#### 不要なプロパティの削除

モデルインスタンス内のプロパティを削除（設定解除）するには、その値を未定義に設定するか、またはプロパティを削除するだけで十分ではありません。
代わりに、インスタンスには`unsetAttribute(name)` を呼び出さなければなりません。ただし、コンテキストにdataプロパティがある場合を処理することを忘れないでください！
dataオブジェクトは単純なオブジェクトなので、削除演算子を使用して通常の方法でプロパティを削除できます。

例：

```javascript
MyModel.observe('before save', function removeUnwantedField(ctx, next) {
  if (ctx.instance) {
    ctx.instance.unsetAttribute('unwantedField');
  } else {
    delete ctx.data.unwantedField;
  }
  next();
});
```

これにより、フィールドが完全に削除され、誤ったデータがデータベースに挿入されなくなります。

### after save

`after save` フックは、モデルの変更がデータソース上で永続化された後に呼び出されます。 具体的には、PersistedModel の以下のメソッドが呼び出されたときです。

* [create()](https://apidocs.loopback.io/loopback/#persistedmodel-create)
* [upsert()](https://apidocs.loopback.io/loopback/#persistedmodel-upsert)
* [upsertWithWhere()](http://apidocs.loopback.io/loopback/#persistedmodel-upsertwithwhere)
* [findOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-findorcreate)*
* [updateAll()](https://apidocs.loopback.io/loopback/#persistedmodel-updateall)
* [prototype.save()](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-save)
* [prototype.updateAttributes()](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-updateattributes)
* [prototye.replaceAttributes()](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-replaceattributes) / [replaceById()](https://apidocs.loopback.io/loopback/#persistedmodel-replacebyid)
* [replaceOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-replaceorcreate)

(&#42;) `findOrCreate` が既存のモデルを見つけると、saveフックは起動されません。
ただし、アトミック実装を提供するコネクタは、モデルが作成されるかどうかを事前に判断できないため、
モデルが作成されていなくても`before save`フックを起動する可能性があります。

このフックを起動するメソッドに応じて、コンテキストは次のプロパティセットのいずれかを持ちます。

* 単一のモデルが更新された場合：
  * `Model` - 保存されるモデルのコンストラクタです。
  * `instance` - 保存されたモデルのインスタンス。 値は`Model`クラスのインスタンスであり、データストアによって計算された更新値（たとえば、自動生成ID）を含みます。

    {% include note.html content="
    after saveフックは、`ctx.instance` に加えられた変更を呼び出し元（RESTクライアント）に返しますが、データベースに保存はしません。
    " %}

* `Model.updateAll`によって複数のモデルの部分的な更新が行われた場合：
  * `Model` - 保存されるモデルのコンストラクタです。
  * `where` - 問い合わせられたインスタンスを記述するwhereフィルタ。以下の警告を参照。
  * `data`- 更新中に適用された（部分的な）データ。

    注：after saveフックで 「where」クエリを使用して、影響を受けるモデルを確実に見つけることはできません。次の呼び出しを考えてみましょう。

    ```javascript
    MyModel.updateAll({ color: 'yellow' }, { color: 'red' }, cb);
    ```

    「after save」フックが実行される時点では、`{ color: 'yellow' }`の条件にマッチするレコードは存在しません。

The `after save` hook provides the `ctx.isNewInstance` property whenever `ctx.instance` is set, with the following values:
`after save` フックは、`ctx.instance`がセットされる時はいつでも`ctx.isNewInstance` プロパティを以下の値に設定して提供します。

* 全ての CREATE 操作の後なら True
* 全ての UPDATE/REPLACE 操作の後なら false
* `updateOrCreate`・`prototype.save`・`prototype.updateAttributes`操作は、新しいインスタンスが作成されたか、既存のインスタンスを更新したかを、コネクタが知らせることが必要。
  コネクタがこの情報を提供する場合、`ctx.isNewInstance`は true またはfalse。
  コネクタがまだこの機能をサポートしていない場合は、値は undefined。

{% include important.html content="
特定のコネクタのみが、`ctx.isNewInstance`をサポートしています。他のコネクタでは未定義です。
[ctx.isNewInstance サポートの確認](#checking-for-support-of-ctx.isnewinstance)を参照してください。
" %}

#### 埋め込まれた関係

別のモデルに[埋め込まれ](Embedded-models-and-relations.html)ているモデルの`after save`フックを定義することができます。
そして、包含モデルのインスタンスを更新または作成すると、埋め込みモデルの操作フックが起動されます。
これが発生する と、コンテナモデルの新しいインスタンスのみが作成されるため、`ctx.isNewInstance` はfalseになります。

たとえば、`Customer emdedsOne Address` だとすると、Addressモデルに`after save`フックを定義し、
新しいCustomerのインスタンスを作成すると操作フックが起動されます。

#### 例

```javascript
MyModel.observe('after save', function(ctx, next) {
  if (ctx.instance) {
    console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id);
  } else {
    console.log('Updated %s matching %j',
      ctx.Model.pluralModelName,
      ctx.where);
  }
  next();
});
```

### before delete

`before delete`フックは、モデルがデータソースから削除される時に起動されます。具体的には、PersistedModelの以下のメソッドが呼び出されたときです。

* [`destroyAll()`](https://apidocs.loopback.io/loopback/#persistedmodel-destroyall) (`deleteAll()` と同じ)
* [`destroyById()`](https://apidocs.loopback.io/loopback/#persistedmodel-destroybyid)(`deleteById()` と同じ)
* [`prototype.destroy()`](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-destroy) (`prototype.delete()` と同じ)

{% include important.html content="
`before delete` 操作フックは、リレーショナルまたはNoSQLデータベースなどのバックエンドのデータストアがこの情報を提供していないため、削除されたモデルインスタンスIDのリストを受け取りません。
ただし、_単一のモデルインスタンスを削除する場合_ 、削除されるインスタンスの`id`を含む `ctx.where` をフックが受け取ります。
" %}

コンテキストプロパティ

* `Model` - 照会されるモデルのコンストラクタ。
* `where` - どのインスタンスが削除されるかを記述するwhereフィルタ。

例：

```javascript
MyModel.observe('before delete', function(ctx, next) {
  console.log('Going to delete %s matching %j',
    ctx.Model.pluralModelName,
    ctx.where);
  next();
});
```

なんらかの条件に基づいてモデルの削除を拒否するには、`next()`にエラーを渡して、削除操作を中止します。

例：

```javascript
if (subscriptions.length > 0) {
  //Stop the deletion of this Client
  var err = new Error("Client has an active subscription, cannot delete");
  err.statusCode = 400;
  console.log(err.toString());
  next(err);
} else {
  next();
}
```

### after delete

{% include important.html content="
`after delete` 操作フックは、リレーショナルまたはNoSQLデータベースなどのバックエンドのデータストアがこの情報を提供していないため、削除されたモデルインスタンスIDのリストを受け取りません。
ただし、_単一のモデルインスタンスを削除する場合_ 、削除されたインスタンスの`id`を含む `ctx.where` をフックが受け取ります。
" %}

The `after delete` hook is triggered after some models are removed from the datasource, specifically when the following methods of PersistedModel are called:
`after delete`フックは、モデルがデータソースから削除された時に起動されます。具体的には、PersistedModelの以下のメソッドが呼び出されたときです。

* [`destroyAll()`](https://apidocs.loopback.io/loopback/#persistedmodel-destroyall) (`deleteAll()`と同じ)
* [`destroyById()`](https://apidocs.loopback.io/loopback/#persistedmodel-destroybyid)(`deleteById()`と同じ)
* [`prototype.destroy()`](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-destroy) (`prototype.delete()`と同じ)

コンテキストプロパティ

* `Model` - 照会されたモデルのコンストラクタ
* `where` -  削除されたインスタンスを記述するwhereフィルタ

例：

```javascript
MyModel.observe('after delete', function(ctx, next) {
  console.log('Deleted %s matching %j',
    ctx.Model.pluralModelName,
    ctx.where);
  next();
});
```

### loaded

このフックは、PersistedModelの以下のメソッドによって起動されます。

* [`find()`](https://apidocs.loopback.io/loopback/#persistedmodel-find)
* [`findOne()`](https://apidocs.loopback.io/loopback/#persistedmodel-findone)
* [`findById()`](https://apidocs.loopback.io/loopback/#persistedmodel-findbyid)
* [`exists()`](https://apidocs.loopback.io/loopback/#persistedmodel-exists)
* [`count()`](https://apidocs.loopback.io/loopback/#persistedmodel-count)
* [`create()`](https://apidocs.loopback.io/loopback/#persistedmodel-create)
* [`upsert()`](https://apidocs.loopback.io/loopback/#persistedmodel-upsert) (`updateOrCreate()`と同じ)
* [`upsertWithWhere()`](http://apidocs.loopback.io/loopback/#persistedmodel-upsertwithwhere)
* [`findOrCreate()`](https://apidocs.loopback.io/loopback/#persistedmodel-findorcreate)*
* [`prototype.save()`](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-save)
* [`prototype.updateAttributes()`](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-updateattributes)
* [`replaceOrCreate()`](https://apidocs.loopback.io/loopback/#persistedmodel-replaceorcreate)
* [`prototype.replaceAttributes()`](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-replaceattributes)
  / [`replaceById()`](https://apidocs.loopback.io/loopback/#persistedmodel-replacebyid)

{% include important.html content="
既定では、 `create` と `updateAttributes`は、 コールバックに返されたモデルインスタンスへデータベースの更新を適用しないので、「loaded」フックによって行われた変更は破棄されます。この動作を変更するには、モデルごとのオプションで `updateOnLoad: true` を設定します。
" %}

LoopBackは、コネクターがデータを読み取った後で、そのデータからモデルインスタンスを作成する前に、このフックを呼び出します。
これにより、フックはデータを復号化することができます（たとえば）。注：このフックは、フルモデルのインスタンスではなく、未加工のデータベースデータで呼び出されます。

コンテキストプロパティ

* `data` - コネクタによって返されたデータ（データベースからロードされたもの）

### persist

このフックは、データをデータソースに永続化する操作、具体的にはPersistedModelの次のメソッドによって起動されます。

* [`create()`](https://apidocs.loopback.io/loopback/#persistedmodel-create)
* [`upsert()`](https://apidocs.loopback.io/loopback/#persistedmodel-upsert) (`updateOrCreate()` と同じ)
* [`upsertWithWhere()`](http://apidocs.loopback.io/loopback/#persistedmodel-upsertwithwhere)
* [`findOrCreate()`](https://apidocs.loopback.io/loopback/#persistedmodel-findorcreate)*
* [`prototype.save()`](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-save)
* [`prototype.updateAttributes()`](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-updateattributes)
* [`updateAll()`](https://apidocs.loopback.io/loopback/#persistedmodel-updateall)
* [`replaceOrCreate()`](https://apidocs.loopback.io/loopback/#persistedmodel-replaceorcreate)
* [`prototype.replaceAttributes()`](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-replaceattributes)
  / [`replaceById()`](https://apidocs.loopback.io/loopback/#persistedmodel-replacebyid)

このフックと「before save 」フックを混同しないでください：

* **before save** – 保存しようとしているモデルインスタンスを観察して操作するために、このフックを使います。（たとえば、国コードが設定されていて、国名がなく、国名をセットしたい場合）
* **persist** – データソースに永続化される直前のデータを監視（および操​​作）するためにこのフックを使います。（たとえば、データベース内の値を暗号化したい場合）

`create` の最中、`persist` フックで行った変更は、データベースに反映されます。
しかし、`create`のコールバックによって得られた `instance` への変更は、反映されません。

第2に、アトミックを実装するコネクターで`findOrCreate`は、既存のレコードが後でデータベース内で見つかった場合でも、毎回オブジェクトの新しいインスタンスが作成されます。そのため、

* [`ctx.data.id`](http://ctx.data.id/) と [`ctx.currentInstance.id`](http://ctx.currentinstance.id/) は新しいIDがセットされます。
* `ctx.isNewInstance` は `true` です。

コンテキストプロパティ

* `data` - コネクタに送信されるデータ（データベースに保存されます）
* `currentInstance` - 影響を受けるモデルインスタンス
* `isNewInstance` - 下記参照

このフックで`ctx.isNewInstance`は、

* 全ての CREATE 操作において true
* 全ての UPDATE 操作においてい false
* updateOrCreate・upsertWithWhere・replaceOrCreate・prototype.save・prototype.updateAttributes・updateAll 操作については undefined

## afterInitialize フック

{% include important.html content="
`afterInitialize` は厳密には操作フックではありません。実際には非推奨ではない唯一の[モデルフック](/doc/en/lb2/Model-hooks.html)です。

これは同期メソッドであり、コールバック関数は使用しません。フックでロジックを実行した後に next() を呼び出す必要はありません。
" %}

このフックは、モデルが初期化された後に呼び出されます。

### 例

**/common/models/coffee-shop.js**

```
...
CoffeeShop.afterInitialize = function() {
  //your logic goes here
};
...
```

ほとんどの操作は、実際にアクションを実行する前に、モデルを初期化する必要があるが、initializeイベントが起動されていないいくつかの例がある。
例えば、`exists`, `count` や一括更新のRESTエンドポイントへのHTTPリクエストなどである。

## モデルフックからの移行

次の表は、推奨されていない各[モデルフック](/doc/en/lb2/Model-hooks.html)に代わって使用する新しいフックを示しています。

<table>
  <thead>
    <tr>
      <th>モデルフック</th>
      <th>代替となる操作フック</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>beforeValidate</td>
      <td>before save</td>
    </tr>
    <tr>
      <td>afterValidate</td>
      <td>persist</td>
    </tr>
    <tr>
      <td>beforeCreate</td>
      <td>before save</td>
    </tr>
    <tr>
      <td>afterCreate</td>
      <td>after save</td>
    </tr>
    <tr>
      <td>beforeSave</td>
      <td>before save</td>
    </tr>
    <tr>
      <td>afterSave</td>
      <td>after save</td>
    </tr>
    <tr>
      <td>beforeUpdate</td>
      <td>before save</td>
    </tr>
    <tr>
      <td>afterUpdate</td>
      <td>after save</td>
    </tr>
    <tr>
      <td>beforeDestroy</td>
      <td>before delete</td>
    </tr>
    <tr>
      <td>afterDestroy</td>
      <td>after delete</td>
    </tr>
  </tbody>
</table>
