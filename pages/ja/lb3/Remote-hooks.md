---
title: "リモートフック"
lang: ja
layout: navgroup
navgroup: app-logic
keywords: LoopBack
tags: application_logic
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Remote-hooks.html
summary: リモートフックは、モデルのリモートメソッドが実行される前か、実行された後に動きます。
---
## 概要

LoopBackは３種類のフックを提供しています。

* **リモートフック** リモートメソッドの呼出し前または呼出し後に実行する。メソッドは独自の[リモートメソッド](Remote-methods.html)でも、
  [PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel) から継承した標準的な作成・取得・更新・削除メソッドでもよい。
  REST操作に対応するNodeメソッドについては[PersistedModelのREST API](PersistedModel-REST-API.html)を参照。
* **[操作フック](Operation-hooks.html)** モデルが作成・取得・更新・削除の操作を行った時に実行する。操作フックは、非推奨になったモデルフックを置き換えるものである。
- **[コネクタフック](Connector-hooks.html)** はリクエストがデータソースコネクタを要求する前か、コネクタの応答後に実行する。

_リモートフック_ は、クライアントによって呼び出されたリモートメソッドが実行される前、または後に、関数を実行できるようにするものです。

* `beforeRemote()` はリモートメソッドの前に実行します。
* `afterRemote()` はリモートメソッドが正常に終了した後に実行します。
* `afterRemoteError()` はリモートメソッドがエラーになった後に実行します。

{% include tip.html content="beforeRomote フックを使うと、リモートメソッドへの入力を検証あるいは無害化できます。
beforeRemote フックは、リモートメソッドが実行される _前に_ 実行されるので、リモートメソッドの入力にアクセスすることはできますが、結果にはできません。

afterRemote フックは、リモートメソッドの結果を、クライアントに送信する前に、修正・記録・その他に使用することができます。
afterRemote フックは、リモートメソッドが実行された _後に_ 実行されるので、リモートメソッドの結果にアクセスできますが、入力引数を変更することはできません。
" %}

### シグネチャ

`beforeRemote()` も `afterRemote()` も同じシグネチャです。以下の構文は beforeRemote を使っていますが、afterRemoteも同じです。

静的な独自のリモートメソッドの場合は、以下のようになります。

```javascript
modelName.beforeRemote( methodName, function( ctx, next) {
    //...
    next();
});
```

ここで、

- `modelName` は、リモートメソッドをもつモデル名です。
- `methodName` は、リモートメソッドの名前です。

[`upsert()`](http://apidocs.loopback.io/loopback/#persistedmodel-upsert)や、[`create()`](http://apidocs.loopback.io/loopback/#persistedmodel-create) のような
インスタンスメソッドあるいは静的な組み込みメソッドは、３番目の引数としてコールバックが必要です。

```javascript
modelName.beforeRemote( methodName, function( ctx, modelInstance, next) {
    //...
    next();
});
```

`afterRemoteError()` は少し異なるシグネチャです。ハンドラ関数は２つの引数しかありません。

```javascript
modelName.afterRemoteError( methodName, function( ctx, next) {
    //...
    next();
});
```

ここで、

* `modelName` は、リモートフックが接続されたモデルの名前です。
* `methodName` は、リモートフックを起動するメソッドの名前です。独自の[リモートメソッド](Remote-methods.html)でも、
  [PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel) から継承した、標準の作成・読取・更新・削除メソッドでも構いません。
  一つ以上のメソッドにマッチさせるために、ワイルドカードを使うことができます。（以下参照）
* `ctx` は [コンテキストオブジェクト](#context-object)です。
* `modelInstance` は作用を受けるモデルのインスタンスです。

`next()`の呼出しを含む上の構文は、リモートフックのコールバック関数のどこかで、必ず `next()` を呼び出さねばならないことのリマインダです。
必ずしも関数の最後である必要はありませんが、関数の処理が終わる前に、どこかで呼び出す必要があります。

#### ワイルドカード

`methodName` では、以下のようなワイルドカードを使えます。

* アスタリスク `'*'` は、最初に区切り文字 `'.'` （ピリオド）が現れるまで、あらゆる文字にマッチします。
* ２重アスタリスクは、区切り文字 `'.'` （ピリオド）を含むあらゆる文字にマッチします。

例えば、`'*.*'` とすると、全ての静的メソッドにマッチし、`'prototype.*'`とすると、全てのインスタンスメソッドにマッチします。

## 例

次の例では、`revEngine()` リモートメソッドのbeforeRemoteフックとafterRemoteフックを定義しています。

{% include code-caption.html content="common/models/car.js" %}
```javascript
module.exports = function(Car) {
  // リモートメソッド
  Car.revEngine = function(sound, cb) {
    cb(null, sound - ' ' - sound - ' ' - sound);
  };
  Car.remoteMethod(
    'revEngine',
    {
      accepts: [{arg: 'sound', type: 'string'}],
      returns: {arg: 'engineSound', type: 'string'},
      http: {path:'/rev-engine', verb: 'post'}
    }
  );
  // リモートメソッド前のフック
  Car.beforeRemote('revEngine', function(context, unused, next) {
    console.log('Putting in the car key, starting the engine.');
    next();
  });
  // リモートメソッド後のフック
  Car.afterRemote('revEngine', function(context, remoteMethodOutput, next) {
    console.log('Turning off the engine, removing the key.');
    next();
  });
...
}
```

次の例では、リモートメソッド名にワイルドカードを使用しています。このリモートフックは、 "save"で終わる名前のリモートメソッドが実行されるたびに呼び出されます

{% include code-caption.html content="common/models/customer.js" %}
```javascript
Customer.beforeRemote('*.save', function(ctx, unused, next) {
  if(ctx.req.accessToken) {
    next();
  } else {
    next(new Error('must be logged in to update'))
  }
});

Customer.afterRemote('*.save', function(ctx, user, next) {
  console.log('user has been saved', user);
  next();
});
```

{% include important.html content="

フックの2番目の引数は（上の例では `user`）は、`ctx.result` ですが、常に利用できるわけではありません。

" %}

以下に、リモートメソッドが呼び出される前に関数を実行するためのワイルドカードを使用したリモートフックの例を示します。

{% include code-caption.html content="common/models/customer.js" %}
```javascript
// ** prototype.* と *.* の両方にマッチする
Customer.beforeRemote('**', function(ctx, user, next) {
  console.log(ctx.methodString, 'was invoked remotely'); // customers.prototype.save was invoked remotely
  next();
});

Other wildcard examples
// 全ての静的メソッドの前に実行される 例：User.find
Customer.beforeRemote('*', ...);

// 全てのインスタンスメソッドの前に実行される 例：User.prototype.save
Customer.beforeRemote('prototype.*', ...);

// パスワードハッシュがクライアントに送信されるのを防ぐ
Customer.afterRemote('**', function (ctx, user, next) {
  if(ctx.result) {
    if(Array.isArray(ctx.result)) {
      ctx.result.forEach(function (result) {
        delete result.password;
      });
    } else {
      delete ctx.result.password;
    }
  }

  next();
});
```

値を新しいオブジェクトにコピーすることによって、返されるフィールドを効果的にホワイトリストする安全な手段です。

{% include code-caption.html content="common/models/account.js" %}
```javascript
var WHITE_LIST_FIELDS = ['account_id', 'account_name'];

Account.afterRemote('**', function(ctx, modelInstance, next) {
  if (ctx.result) {
    if (Array.isArray(modelInstance)) {
      var answer = [];
      ctx.result.forEach(function (result) {
        var replacement ={};
        WHITE_LIST_FIELDS.forEach(function(field) {
          replacement[field] = result[field];
        });
        answer.push(replacement);
      });
    } else {
      var answer ={};
      WHITE_LIST_FIELDS.forEach(function(field) {
        answer[field] = ctx.result[field];
      });
    }
    ctx.result = answer;
  }
  next();
});
```

### afterRemoteErrorの例

インスタンスメソッド`speak()`が失敗したときに追加のアクションを実行するには以下のようにします。

{% include code-caption.html content="common/models/dog.js" %}
```javascript
Dog.afterRemoteError('prototype.speak', function(ctx, next) {
  console.log('Cannot speak!', ctx.error);
  next();
});
```

エラーオブジェクトにメタデータを加えます。

{% include code-caption.html content="common/models/dog.js" %}
```javascript
Dog.afterRemoteError('**', function(ctx, next) {
  if (!ctx.error.details) ctx.error.details = {};
  ctx.error.details.info = 'intercepted by a hook';
  next();
})
```

呼び出し元に別のエラーを報告します。

{% include code-caption.html content="common/models/dog.js" %}
```javascript
Dog.afterRemoteError('prototype.speak', function(ctx, next) {
  console.error(ctx.error);
  next(new Error('See server console log for details.'));
});
```

## コンテキストオブジェクト

リモートフックには、プロトコル固有のデータ（HTTPの場合 `req`と`res`）を含むコンテキストオブジェクト`ctx`が用意されています。`ctx` オブジェクトは、プロトコル間で一貫したAPI一式を持っています。

[loopback.rest()](https://apidocs.loopback.io/loopback/#loopback-rest) ミドルウェアを使うアプリケーションは、次の追加`ctx`プロパティが提供されます。

* `ctx.req`: Expressの[Request](http://expressjs.com/api.html#req)オブジェクト

* `ctx.res`: Expressの[Response](http://expressjs.com/api.html#res)オブジェクト

`afterRemoteError()` フックに渡されたコンテキストオブジェクトには、リモートメソッドによって報告されたエラーが設定された追加のプロパティ `ctx.error` があります。

その他のプロパティ：

* `ctx.args` - HTTPリクエストの引数定義を含むオブジェクト。arg定義を使用して、リクエストから値を探します。これらは、リモートメソッドへの入力値です。
* `ctx.result` - 引数名をキーとするオブジェクト
    例外：rootプロパティがtrueの場合、ルートがtrueに設定されている引数の値になります。

### ctx.req.accessToken

リモートメソッドを呼び出したユーザの `accessToken`。

{% include important.html content="

ログインしているユーザー（または他のプリンシパル）によってリモートメソッドが呼び出されない場合、`ctx.req.accessToken`は undefined です。
" %}

### ctx.result

`afterRemote` フック中で `ctx.result` には、クライアントに送信される予定のデータが格納されます。このオブジェクトを変更して送信前にデータを変換します。

{% include important.html content="

`ctx.result` の値は、常に利用できるとは限りません。

" %}

リモートメソッドが返された値を明示的に指定している場合のみ、ctx.resultが設定されます。したがって、リモートメソッドは次のようなことをしなければなりません。

```javascript
MyModel.remoteMethod('doSomething', {
  // ...
  returns: {arg: 'redirectUrl', type: 'string'}
});
```
