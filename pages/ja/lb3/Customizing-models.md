---
title: "モデルのカスタマイズ"
layout: navgroup
navgroup: models
to_level: 2
keywords: LoopBack
tags: models
lang: ja
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Customizing-models.html
summary: 基本的なモデルを、JSONやJavaScriptを使ってカスタマイズできます。
---

[モデル生成ツール](Model-generator.html)でモデルを作成したら、それをカスタマイズできます。
コマンドラインツールを使ったり、[モデル定義JSONファイル](Model-definition-JSON-file.html)を編集したり、JavaScriptのコードを追加したりすることで、カスタマイズ可能です。

## コマンドラインツールによるカスタマイズ

{% include note.html content="既存のモデルを[モデル生成ツール](Model-generator.html)で変更することはできません。しかし、コマンドラインツールを使えば、ある程度のカスタマイズが可能です。以下をご覧ください。
" %}

モデルを最初に作成したあとで、~コマンドラインツール~を使ってカスタマイズすることができます。以下のことが可能です。

*  [プロパティ生成ツール](Property-generator.html) を使って、モデルにプロパティを追加する。
*  [リレーション生成ツール](Relation-generator.html) を使って、 [モデル間のリレーションを追加する](Creating-model-relations.html)。
* [ACL生成ツール](ACL-generator.html) を使って、モデルに [アクセス制御](Controlling-data-access.html) を追加する。

## JSONを使ってモデルをカスタマイズする

 `common/models` にある[モデル定義JSONファイル](Model-definition-JSON-file.html) (例えば `customer.json`) を単純に編集することで、
幾つもの側面をカスタマイズできます。既定の状態は以下のようになっています。

{% include code-caption.html content="common/models/model.json" %}
```javascript
{
  "name": "myModel",
  "base": "PersistedModel",
  "properties": {
     // Properties listed here depend on your responses to the CLI
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": []
}
```

LoopBack はこれらの基本モデルに対して、モデルJSONファイルの設定を_追加する_。
多くの場合とても簡単ですが、ACL設定に関しては、何らかのACL設定が他のものに優先されることがあるため、複雑になることがあります。
詳細は、 [ACLルール優先順位](Controlling-data-access.html#acl-rule-precedence) を参照してください。


### 他のモデルを拡張する

Userのようなビルトインモデルや、アプリケーションのカスタムモデルのいずれかについて、モデルを拡張したり、既存のモデルを「継承」したりすることができます。
[モデル生成ツール](Model-generator.html) を使ってこれらのことを実施するには、「モデルの基本クラスを選択してください」と尋ねられたときに、単に希望するモデルを選択します。
代わりに、拡張したいモデル名の[モデル定義JSONファイル](Model-definition-JSON-file.html)を編集して、「base」プロパティを設定することもできます。

{% include note.html content="
一般的に、MySQLやMongoDBといったデータベースにデータを保存したい場合は、基本モデルとして  `PersistedModel`  を使います。
 `Model`  は、CRUD操作を持たないモデル、例えばSOAPやRESTのようなコネクタを使用する場合に使います。
" %}

例えば以下は、組み込みのUserモデルを拡張した、Customerモデルを定義している `customer.json` ファイルの抜粋です。

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
  "name": "Customer",
  "base": "User",
  "idInjection": false,
...
```

一般的に、この方法では組み込みモデル以外のあらゆるモデルを拡張できます。

{% include important.html content="
現在は、組み込みモデルの必須プロパティを変更することはできません。もしそうする必要がある場合、それらの置き換えとして独自のモデルを作成してください。
" %}

一つの基本独自モデルを拡張した独自モデルを作ることができます。
例えば、自分で定義した`MyBaseModel`を拡張して `MyModel` というモデルを定義するには、 [モデル生成ツール](Model-generator.html) を使って MyModel を作り、
JSONファイル  `common/models/MyModel.json`  を以下のように編集します。

{% include code-caption.html content="/common/models/MyModel.json" %}
```javascript
{
  "name": "Example",
  "base": "MyBaseModel",
}
```

モデルを拡張する時に、新しいプロパティを追加できます。例えば以下のように。

{% include code-caption.html content="/common/models/MyModel.json" %}
```javascript
{
   "name": "Customer",
   "base": "User",
   "properties": {
      "favoriteMovie": {
        "type": "string"
      }
   }
}
```

サポートしているデータ型については、[LoopBackの型](LoopBack-types.html) を参照してください。

### 他のモデル設定のカスタマイズ

カスタマイズできる最も重要な設定が幾つかあります。

* **plural（複数形）** - 標準的な複数形の形を使う代わりに、独自の文字列を使用する場合に設定します。
* **strict（厳密な）** - 事前に定義されたプロパティだけを持つインスタンスしか、保存できないようにする場合にtrueを設定します。
  保存・更新の操作において、追加のプロパティはデータソースに永続化されません。既定では false です。
* **idInjection（ID注入）** - モデルに、自動的に id プロパティを追加するかどうかを設定します。既定では true です。
* **http.path** - REST エンドポイントの HTTP パスをカスタマイズします。

詳細は、[モデル定義JSONファイル](Model-definition-JSON-file.html#top-level-properties) を参照してください。

## JavaScript でモデルをカスタマイズする

プログラム的にモデルを拡張する基本的な方法は、 `common/models/`  ディレクトリにある、モデルのJavaScriptファイルを編集することです。
例えば、「customer」モデルには、 `common/models/customer.js`  があります（モデルを[モデル生成ツール](Model-generator.html)
で作成した場合）。
このスクリプトは、モデルが定義された後、すぐに実行されます。
これは、モデルの設定や登録に使われるので、モデル定義の一部とみなすことができます。
モデルの関係・複雑な検証・幾つかのプロパティに関する既定の関数など、基本的にJSONではできないことでも可能です。
しかし、この時点ではスクリプトはappインスタンスにはアクセス出来ないことに注意してください。

 [リモートメソッド](Remote-methods.html) や、[運用フック](Operation-hooks.html)を追加することで、モデルを拡張することもできる。

もし、REST経由でメソッドを公開したくない場合、単に `remoteMethod()` の呼出しをやめるだけでできます。

JavaScriptを使ってモデルをカスタマイズする方法については、 [アプリケーションロジックを追加する](Adding-application-logic.html) を参照してください。
サポートしているデータ型については、 [LoopBackの型](LoopBack-types.html) を参照してください。

### 組み込みメソッドの実装を変更する

#### サーバ起動スクリプト経由

モデルを永続的なデータソースに紐付けると、それは、[PersistedModel](https://apidocs.loopback.io/loopback/#persistedmodel)を拡張した _永続化モデル_ となり、
LoopBackは自動的にCRUD操作用の組み込みメソッド一式を追加します。
しばしば、その実装を変更したいと思うでしょう。`/server/boot` ディレクトリ内のJavaScriptファイルを使うとこれができます。
例えば、以下のコードは、組み込みの [`find()`](http://apidocs.loopback.io/loopback/#persistedmodelfindfilter-callback) メソッドを上書きするために
`Note.find()` を再実装する方法を示しています。

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
module.exports = function(app) {
  var Note = app.models.Note;
  var find = Note.find;
  var cache = {};

  Note.find = function(filter, cb) {
    var key = '';
    if(filter) {
      key = JSON.stringify(filter);
    }
    var cachedResults = cache[key];
    if(cachedResults) {
      console.log('serving from cache');
      process.nextTick(function() {
        cb(null, cachedResults);
      });
    } else {
      console.log('serving from db');
      find.call(Note, function(err, results) {
        if(!err) {
          cache[key] = results;
        }
        cb(err, results);
      });
    }
  }
}
```

#### モデルのスクリプト経由

 `common/models` ディレクトリのJavaScriptを使うこともできます。

{% include code-caption.html content="common/models/MyModel.js" %}
```javascript
module.exports = function(MyModel) {
  MyModel.on('dataSourceAttached', function(obj){
    var find = MyModel.find;
    MyModel.find = function(filter, cb) {
      return find.apply(this, arguments);
    };
  });
};
```

参照（外部サイト）：

* [リモートメソッドを上書きする方法](https://github.com/strongloop/loopback/issues/443)
* [juggler 2.15.0でUser.findの上書きができない](https://github.com/strongloop/loopback-datasource-juggler/issues/427)
* [モデルの「find」関数を上書きする方法](https://github.com/strongloop/loopback/issues/1077)
