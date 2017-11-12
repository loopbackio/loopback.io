---
title: "データベースのトランザクションを使用する"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Using-database-transactions.html
summary:
---

{% include note.html content="

トランザクションのサポートは loopback-datasource-juggler バージョン 2.28.0 で追加されました。

" %}

## 概要

 _トランザクション_  は単一の論理的な仕事の単位を実行するための、一連のデータ操作です。
多くのリレーショナルデータベースは、データの一貫性を保ち、業務ロジックの要求に応えるために、トランザクションをサポートしています。

LoopBack モデルは、以下のコネクタのいずれかに結びつけられている時に、トランザクション操作が行なえます。

* [MySQL コネクタ](MySQL-connector.html) (重要:  InnoDB  ストレージエンジンのみ).
* [PostgreSQL コネクタ](PostgreSQL-connector.html)
* [SQL Server コネクタ](SQL-Server-connector.html)
* [Oracle コネクタ](Oracle-connector.html)

## トランザクションAPI

LoopBackでは、DataSource Juggler の [v3.12.0](https://github.com/strongloop/loopback-datasource-juggler/tree/v3.12.0)から、トランザクションを扱う方法が２つあります。

*  [`TransactionMixin`](http://apidocs.loopback.io/loopback-datasource-juggler/#transactionmixin)  は、低レベルのトランザクションAPIを使うことができます。
これは、ユーザがトランザクションオブジェクトを作成したり、管理したり、成功時にコミットしたり、意図しない操作の最後にロールバックしたりすることができます。
詳細は、下にある[低レベルトランザクション API](#lower-level-transaction-api) を参照してください。

* トランザクション操作を単純かつ効率的にするために、[`dataSource.transaction()`](https://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-transaction) メソッドは、低レベルトランザクションAPIの高レベルな抽象化を単一メソッドで提供しています。
詳細は、下にある[高レベルトランザクションAPI](#higher-level-transaction-api) を参照してください。

## 高レベルトランザクションAPI

[Objection.js](http://vincit.github.io/objection.js/#binding-models-to-a-transaction)がトランザクションを処理する方法に触発されて、[`dataSource.transaction(execute, options, cb)`](https://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-transaction) メソッドはトランザクションを作成し、モデルに結びつけます。こうすることで、明示的にトランザクションオブジェクトを作ったり、それをモデルのデータベースメソッドに渡したり、最後にコミットやロールバックを行う必要がなくなるのです。

トランザクションを作成する代わりに、`transaction(execute, options, cb)`メソッドを呼び出すと、（もしあれば）引数の `execute` 関数が、データソース内の全モデルへの参照を持った `models` 引数付きで呼び出されます。これらのモデル参照は、`app.models`とことなり、作られた時点で自動的にトランザクションと結びついています。スマートキャッシングによって、実際にアクセスされた `models` 引数のプロパティのモデルだけが作成されます。

最後に、処理中に例外が発生したかどうかによって、`transaction.commit()` または `transaction.rollback()`が自動的に呼び出されます。最後に呼び出されるコールバック関数が提供されていなければ、Promiseオブジェクトが返され、実行が完了すると直ちに、トランザクションがコミットされたかロールバックされたかに応じて、resolved か rejected になります。

### 例

トランザクションを作成しコミットする方法
```js
await app.dataSources.db.transaction(async models => {
  const {MyModel} = models;
  console.log(await MyModel.count()); // 0
  await MyModel.create({foo: 'bar'});
  console.log(await MyModel.count()); // 1
});
console.log(await app.models.MyModel.count()); // 1
```

実行中に例外が発生すると、トランザクションは自動的にロールバックします。
```js
try {
  await app.dataSources.db.transaction(async models => {
    const {MyModel} = models;
    console.log(await MyModel.count()); // 0
    await MyModel.create({foo: 'bar'});
    console.log(await MyModel.count()); // 1
    throw new Error('Oops');
  });
} catch (e) {
  console.log(e); // Oops
}
console.log(await app.models.MyModel.count()); // 0
```

### オプション

低レベルの[`beginTransaction()`](http://apidocs.loopback.io/loopback-datasource-juggler/#transactionmixin-begintransaction)メソッドの `options` 引数と同じオプションが使えます。

* `options.isolationLevel`: [隔離レベル](#isolation-levels) を参照。
* `options.timeout`: [タイムアウト処理](#timeout-handling) を参照。

### タイムアウト処理

高レベルAPIの場合、ユーザがトランザクションオブジェクトを目にすることがないため、低レベルAPI（[タイムアウト設定](#set-up-timeout)）とはタイムアウト処理が少し異なります。実行中にタイムアウトが発生した場合、コールバック関数が、エラーオブジェクト付きで呼び出され、`error.code` が`'TRANSACTION_TIMEOUT'`にセットされます。コールバック関数がない場合に返されるpromiseは、エラーでrejectedになります。

```js
try {
  await app.dataSources.db.transaction(async models => {
    await Promise.delay(100);
    await models.MyModel.create({foo: 'bar'});
  }, {
    timeout: 50
  });
} catch (e) {
  console.log(e); // Error: Transaction is rolled back due to timeout
  console.log(e.code); // TRANSACTION_TIMEOUT
}
```


## 低レベルトランザクションAPI

完全なトランザクションの低レベルAPIのドキュメントは、 [API リファレンス](http://apidocs.loopback.io/loopback-datasource-juggler/#transactionmixin)  を参照。

トランザクションにおける操作の実行は、以下のステップを含みます。

* 新しいトランザクションを開始する。
* トランザクション中で、作成・読取・更新・削除操作を行う。
* トランザクションをコミットまたはロールバックする。

### トランザクション開始

新しいトランザクションを開始するには、[`beginTransaction()`](http://apidocs.loopback.io/loopback-datasource-juggler/#transactionmixin-begintransaction) メソッドを使います。

例えば、`Post`モデルの場合

```javascript
Post.beginTransaction({isolationLevel: Post.Transaction.READ_COMMITTED}, function(err, tx) {
  // トランザクション (tx) が使用可能
});
```

#### 隔離レベル

`beginTransaction()`を呼び出すとき、 トランザクション隔離レベルを指定することができます。LoopBack のトランザクションは以下のレベルをサポートしています。

* `Transaction.READ_UNCOMMITTED`
* `Transaction.READ_COMMITTED` (既定)
* `Transaction.REPEATABLE_READ`
* `Transaction.SERIALIZABLE`

隔離レベルを指定しなかった場合、トランザクションは READ_COMMITTED を使います。

{% include important.html content="

**Oracle は READ_COMMITTED と SERIALIZABLE だけが使用可能です。**

" %}

データベース毎の隔離レベルについては、以下を参照してください。

* [MySQL SET TRANSACTION Syntax](https://dev.mysql.com/doc/refman/5.7/en/set-transaction.html)
* [Oracle Isolation Levels](http://docs.oracle.com/cd/B14117_01/server.101/b10743/consist.htm#i17856) 
* [PostgreSQL Transaction Isolation](http://www.postgresql.org/docs/9.4/static/transaction-iso.html)
* [SQL Server SET TRANSACTION ISOLATION LEVEL](https://msdn.microsoft.com/en-us/library/ms173763.aspx)

### トランザクションで操作を実行する

作成・取得・更新・削除操作をトランザクションで実行するには、標準的な
[`create()`](http://apidocs.loopback.io/loopback/#persistedmodel-create)・
[`upsert()`](http://apidocs.loopback.io/loopback/#persistedmodel-upsert)・
[`destroyAll()`](http://apidocs.loopback.io/loopback/#persistedmodel-destroyall) 等のメソッドに、トランザクションオブジェクトを持つ２番目の引数を追加します。

たとえば、再び `Post` モデルを仮定すると、

```javascript
Post.create({title: 't1', content: 'c1'}, {transaction: tx}, function(err, post) {
  post.updateAttributes({content: 'c2', {transaction: tx}, function(err, newPost) {
    //
    newPost.reviews.create({content: 'r1'}, {transaction: tx}, function(err, newPost) {
    });
  }
});
```

### コミットとロールバック

トランザクションをコミットする

```javascript
transaction.commit(function(err) {
});
```

トランザクションをロールバックする

```javascript
transaction.rollback(function(err) {
});
```

３つのAPIは全て、Promiseの処理が行えることに注意してください。
[https://github.com/strongloop/loopback-connector-mysql/blob/master/test/transaction.promise.test.js](https://github.com/strongloop/loopback-connector-mysql/blob/master/test/transaction.promise.test.js) にあるサンプルを参照してください。

## タイムアウトの設定

トランザクション開始時に、タイムアウトを（ミリ秒単位で）指定することができます。
タイムアウト前にトランザクションが完了（コミットまたはロールバック）しなかった場合、既定ではタイムアウトすると自動的にロールバックします。
タイムアウトイベントはタイムアウトフックを使うことで捕捉可能です。

例えば、再び `Post` モデルを仮定します。

```javascript
Post.beginTransaction({
    isolationLevel: Transaction.READ_COMMITTED,
    timeout: 30000 // 30000ミリ秒 = 30秒
  }, function(err, tx) {
    tx.observe('timeout', function(context, next) {
      // タイムアウト処理
      next();
    });
});
```

## トランザクションの伝播

トランザクションの伝播は、全ての作成・取得・更新・削除関連のメソッドの options 引数を介して、明示的にトランザクションオブジェクトを引き渡すことで行います。

例えば、再び `Post` モデルを仮定します。

```javascript
var options = {transaction: tx};
Post.create({title: 't1', content: 'c1'}, options, function(err, post) {
  post.updateAttributes({content: 'c2', options, function(err, newPost) {
    //
    newPost.reviews.create({content: 'r1'}, options, function(err, newPost) {
    });
  }
});
```

## トランザクションフックの設定

トランザクションについて監視可能なイベントが５つあります。

* `before commit`
* `after commit`
* `before rollback`
* `after rollback`
* `timeout`

```javascript
tx.observe('before commit', function(context, next) {
  // ...
  next();
});

tx.observe('after commit', function(context, next) {
  // ...
  next();
});

tx.observe('before rollback', function(context, next) {
  // ...
  next();
});

tx.observe('after rollback', function(context, next) {
  // ...
  next();
});

//タイムアウトについては上の例を参照。
```

## 長い待機やデッドロックを回避する

ある種の隔離レベルのトランザクションはデータベースオブジェクトをロックすることに注意してください。
トランザクション中で、複数のメソッドを非同期に実行することは、他のトランザクションを（明示的または暗黙的に）ブロックしてしまう大きな可能性を秘めています。
デッドロックや長い待機を避けるために、以下のことを徹底すべきです。

1.  トランザクションを出来る限り短くする。
2.  複数のトランザクションをまたいだメソッド実行をシリアライズしない。
