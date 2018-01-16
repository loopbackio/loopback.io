---
title: "LoopBackのオブジェクトを扱う"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Working-with-LoopBack-objects.html
summary:
---

## Overview

主要なLoopBackのJavaScriptオブジェクトは以下のものです。

* [App](http://apidocs.loopback.io/loopback/#var-app-loopback) オブジェクト
* [モデル](http://apidocs.loopback.io/loopback/#model)
* [データソース](http://apidocs.loopback.io/loopback-datasource-juggler/#define-new-datasource)

コードの場所（起動スクリプトの中・モデルのJavaScriptファイル`/common/models/model.js`の中など）に応じてこれらのオブジェクトの参照を取得する方法は、
とても知りたいことだと思います。

## app オブジェクトを取得する

`app` オブジェクトの参照を取得できれば、その他のモデルやデータソースなどのオブジェクトも取得できるので、これを取得することは、極めて重要です。
`app`オブジェクトを操作したい場所はだいたい以下のようになります。

* モデルスクリプト： `/common/models/_モデル名_.js` (_`モデル名`_ にはモデルの名前が入ります).
* `/``server/boot` 内の起動スクリプト
* ミドルウェア (起動スクリプトで登録するか、`/server/server.js` にあるもの)
* 自身の独自スクリプト

`app` オブジェクトは、典型的なLBアプリケーションの様々な場所で、コンテキストを提供します。

### 起動スクリプトから

起動スクリプト内で、`app`オブジェクトの参照を取得するには、公開された関数の最初の引数で受け取ります。

コールバック関数を持つ非同期の起動スクリプトの場合、

{% include code-caption.html content="Asynchronous boot script - /server/boot/your-script.js" %}
```javascript
module.exports = function(app, cb) { // LoopBack が app を注入する
  //...
};
```

コールバック関数のない同期起動スクリプトの場合、

{% include code-caption.html content="Synchronous boot script - /server/boot/your-script.js" %}
```javascript
module.exports = function(app) { // LoopBack が app を注入する
  //...
};
```

それぞれの例から分かる通り、LoopBackは自動的に`app`オブジェクトを、起動スクリプトの最初の引数として渡します。

起動スクリプトについて、詳しくは[起動スクリプトの定義](Defining-boot-scripts.html) を参照してください。

### ミドルウェアから

LoopBackは、自動的に`app`オブジェクトをミドルウェアの`request`オブジェクトの中にセットします（実際には裏側でExpressがそれをやっています）。
`server/server.js` において、以下のようにアクセス可能です。

{% include code-caption.html content="Middleware - /server/server.js" %}
```javascript
...
app.use(function(req, res, next) {
  var app = req.app;
  //...
});
...
```

ミドルウェアに関する詳細は、[ミドルウェアの定義](Defining-middleware.html) を参照してください。

### 独自スクリプトから

独自のスクリプトから `app`を参照する必要がある場合、（モデルの例のように）単に取り込むだけです。

{% include code-caption.html content="A custom script - /server/your-script.js" %}
```javascript
var app = require('/server/server');
...
```

その他のNodeモジュールと同じように、`/server/server.js`を取り込みます。

### モデルスクリプトから

[モデル生成ツール](Model-generator.html)によって作られたモデルの中で`app`オブジェクトを扱うには、
その他のNodeモジュールと同じように「取り込み」ます。

{% include code-caption.html content="Model - /common/models/book.js" %}
```javascript
var app = require('../../server/server'); // 他のnode.jsアプリのように`server.js` を取り込む

module.exports = function(Book) {
  //...
};
```

{% include tip.html content="この技は関連のないモデルの参照を取得するときにも有効です。下にある[関連のないモデルの参照を取得する](#getting-a-reference-to-an-unrelated-model)を参照してください。
" %}

モデルがあれば、特殊な方法が使えます。`/common/models/model.js` を除くあらゆる場所で、モデルの`model.app`を通じて`app`の参照を取得することができます。

例えば以下のように。

```
...
Book.app
...
```

しかし、一つ注意しなければならないのは、`/common/models/model.js` の中では、`model.app`が参照できないということです。なぜなら、このファイルは起動が完全に終わるまで`app`プロパティを追加しないからです。
`/common/models/model.js` では、以下のようなことが **できません**。

{% include code-caption.html content="モデルスクリプトではできません" %}
```javascript
module.exports = function(Book) {
  Book.app... // `.app` はまだBookオブジェクトに追加されていないため動作しない。
});
```

ただし、リモートメソッド・リモートフック・モデルフックの内側であれば、appの参照を使うことができます。これらは、アプリケーションの読み込みが完了した後に実行されるからです。（それは、loopback.boot が実行された後、あるいは /server/server.js で boot(..)が呼び出された後です）

以下のことは **できます**。

```javascript
module.exports = function(Book) {
  Book.read(cb) {
    var app = Book.app;
    console.log(app.models...)
    cb();
  };
  Book.remoteMethod(
    'read',
    ...
  });
};
```

もちろん、同じことがリモートフックやリモートメソッドでも可能ですが、読み込みタイミングには気をつけてください。
単純に言えば、`model.app`は、`/server/server.js` で `boot()` が実行されて、アプリケーションが完全に起動し終わるまでは利用できません。
この考え方は、アプリケーションに追加される _前に_ モデルを定義しているためです。
アプリケーションが起動完了したら、モデルの `app` プロパティにアクセスできるようになります。

appオブジェクトにアクセスする最も簡単な方法は、`Model.on('attached')` イベントを介するものです。

```javascript
module.exports = function(MyModel) {
  var app;
  MyModel.on('attached', function(a) {
    app = a;
    // app オブジェクトが必要なセットアップを行う。
  });
};
```

## app オブジェクトを扱う

LoopBackのappオブジェクトは、メインスクリプトで以下のように定義されています。

{% include code-caption.html content="/server/server.js" %}
```javascript
var loopback = require('loopback');
var app = loopback();
```

appオブジェクトは、[Expressのappオブジェクト](http://expressjs.com/4x/api.html#application)を拡張しており、全てのプロパティやメソッドを継承しており、
[LoopBackのappオブジェクト](http://apidocs.loopback.io/loopback/#var-app-loopback)で追加されたプロパティやメソッド同様に使えます。

{% include important.html content="起動スクリプトなど、幾つかの場所では `app` の代わりに `server`という名前が使われています。
" %}

## モデルオブジェクトを扱う

### モデルの参照を取得する

`app`オブジェクをと扱えるようになったら、特定のモデルは`app`オブジェクトの`models`プロパティを介して扱うことができます。

{% include code-caption.html content="起動スクリプト - /server/boot/your-script.js" %}
```javascript
module.exports = function(app) {
  var app = app.models.Book;
  //...
};
```

独自スクリプトにおいては、

{% include code-caption.html content="独自スクリプト - /server/your-script.js" %}
```javascript
var app = require('/server/server');
```

### モデルオブジェクトを使用する

基本的なモデルオブジェクトの情報は、[基本的なモデルオブジェクト](Basic-model-object.html)を参照ください。
永続化データソースに接続されたモデルに関する情報は、[接続されたモデルオブジェクト](Connected-model-object.html)を参照ください。

### 関連のないモデルの参照を取得する

関連のあるモデルは、`MyModel.app.models.MyRelatedModel`のように、簡単に参照することができます。
しかし、関連のない他のモデルの場合は、このようにいきません。このような場合、参照を取得するにはappオブジェクトを使う必要があります。

```javascript
require('../../server/server')
```

例えば、オブザーバー（フック）の中でUserモデルを参照したいとすると、以下のようになります。

{% include code-caption.html content="common/models/my-model.js" %}
```javascript
module.exports = function(MyModel) {
  var app = require('../../server/server');

  MyModel.observe('loaded', function( ctx, next) {
   var User = app.models.User;
   ...
   User.create(...);
   ...
});
```

## データソースオブジェクトを扱う

### データソースの参照を取得する

モデルを扱えるようにするのに似て、まず、`app`オブジェクトを扱えるようにし、その上で `app.datasources` プロパティにアクセスします。

{% include code-caption.html content="起動スクリプト - /server/boot/your-script.js" %}
```javascript
module.exports = function(app) {
  var dataSource = app.datasources.db; // db は`/server/datasources.json` に登録されたデータソースならなんでもよい
  ...
};
```

そして、独自スクリプトでは以下のようにします。

{% include code-caption.html content="独自スクリプト - /server/your-script.js" %}
```javascript
var app = require('./server/server');
...
var datasource = app.datasources.db;
...
```

ミドルウェアでは以下のようにします。

{% include code-caption.html content="ミドルウェア - /server/server.js" %}
```javascript
...
app.use(function(req, res, next) {
  var dataSource = app.datasources.db;
  ...
});
...
```

モデルでは以下のようにします。

{% include code-caption.html content="モデル - /common/models/model.js" %}
```javascript
module.exports = function(Book) {
  Book.read = function() {
    var dataSource = Book.app.datasources.db;
  };
  Book.remoteMethod(
    'read',
     ...
  );
};
```

モデルでは、以下のような書き方では _動作しません_ ので注意してください。

{% include code-caption.html content="モデル - /common/models/model.js" %}
```javascript
module.exports = function(Book) {
  Book.app... //`Book` にはまだ登録されていないので動作しません！
};
```

### データソースオブジェクトを使用する

{% include note.html content="このセクションは作成中です。お待たせしてすみません。
" %}
