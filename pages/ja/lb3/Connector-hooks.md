---
title: "コネクタフック"
lang: ja
layout: navgroup
navgroup: app-logic
keywords: LoopBack
tags: application_logic
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Connector-hooks.html
summary: コネクタフックは、コネクタの動作によって起動されます。
---
## 概要

コネクタは、モデルメソッドに代わってバックエンドシステムと対話する役割を担います。
コネクタフックにより、アプリケーションはコネクタの実行に介入できます。

2つのコネクタフックを使用できます。

- 'before execute'
- 'after execute'

### before execute

'before execute'フックは、コネクタがバックエンドデータソースに要求を送信する前に呼び出されます。

```javascript
var connector = MyModel.getDataSource().connector;
connector.observe('before execute', function(ctx, next) {
  // ...
  next();
});
```

呼び出しを終了するには、次のように`ctx.end(err, result)`を呼び出します。

```javascript
var connector = MyModel.getDataSource().connector;
connector.observe('before execute', function(ctx, next) {
  // ...
  ctx.end(null, cachedResponse);
});
```

### after execute

'after execute'フックは、コネクタがバックエンドデータソースから応答を受け取った後に呼び出されます。

```javascript
connector.observe('after execute', function(ctx, next) {
  // ...
  next();
});
```

## コンテキスト

コンテキストオブジェクトには、フックが動作するための情報が含まれています。コネクタの種類によって異なります。

### リレーショナルデータベースコネクタ

[リレーショナルデータベースコネクタ](Database-connectors.html) には、MySQL・PostgreSQL・SQL Server・Oracle コネクタなどが含まれます。

```
before: {req: {sql: 'SELECT ...', params: [1, 2]}, end: ...}
```

```
after: {req: {sql: 'SELECT ...', params: [1, 2]}, res: ..., end: ...}
```

### MongoDB コネクタ

```
before: {req: {command: ..., params: ...}, end: ...}
```

```
after: {req: {...}, res: {...}, end: ...}
```

ここで、

- `req.command` は [MongoDB collection](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html) への命令です。
- `req.params` は [MongoDB driver](https://github.com/mongodb/node-mongodb-native) に渡されるリクエストパラメータです。
- `res` は [MongoDB driver](https://github.com/mongodb/node-mongodb-native)から受け取ったレスポンスオブジェクトです。

### REST コネクタ

```
before: {req: {...}, end: ...}
```

```
after: {req: {...}, res: {...}, end: ...}
```

ここで、

- `req` は [request](https://github.com/request/request) モジュールに渡される要求オブジェクトです。
- `res` は [request](https://github.com/request/request) モジュールから受け取った応答オブジェクトです。

コネクタフックは、メソッドの最後までは情報を持たない LoopBackコンテキストオブジェクト `ctx` にアクセスできるようにします。通常、呼び出しの最後には応答の本体が得られるので、ヘッダーは`ctx`オブジェクト内でのみ使用できます。

アプリケーションの起動時にコネクタフックを使用する必要があります。例えば：

{% include code-caption.html content="server/boot/set-headers-in-body.js" %}
```js
module.exports = function(server) {
  var APIConnector;
  APIConnector = server.datasources.APIDataSource.connector;
  return APIConnector.observe('after execute', function(ctx, next) {

  });
};
```

この関数の中で以下の情報にアクセスできます。

- レスポンスヘッダ： `ctx.res.headers`
- HTTP レスポンスコード： `ctx.res.body.code`
- リクエストのHTTPメソッド： `ctx.req.method`

フックは、コネクタが呼び出されるたびに起動されるため、RESTコネクタを使用するすべての要求はこの関数を経由します。

ただし、APIの呼出しはnext()関数を呼び出さないため、APIを呼び出すたびにはこの呼び出しは行われません。

すべてのPOST要求をフックするには、サーバーはヘッダのlocationをボディ内にコピーします。たとえば、次のようにします。

```js
module.exports = function(server) {
  var APIConnector;
  APIConnector = server.datasources.APIDataSource.connector;
  return APIConnector.observe('after execute', function(ctx, next) {
    if (ctx.req.method === 'POST') {
      ctx.res.body.location = ctx.res.headers.location;
      return ctx.end(null, ctx, ctx.res.body);
    } else {
      return next();
    }
  });
};
```

`ctx.end` メソッドは、3つの引数を必要とします。`err`・`ctx`・`result`です。result は、リモートメソッドが呼び出されたときに最後に送信されるものです。

{% include note.html title="注意" content="
たとえば、上記のコードでは、たとえば、POSTリクエストの後にコネクターがエラーを送信することはありません。
" %}

多くのバグを回避するために、`ctx`に触る場所で、場合分けをしておきます。例えば以下のようにします。

```js
if (ctx.req.method === 'POST'
    && ((ref = ctx.res) != null ? (ref1 = ref.body) != null ? ref1.code : void 0 : void 0) === 200
    && ctx.res.headers.location) {
      // ...
    }
```

#### エラー処理

コネクタフックには、APIからの応答を再フォーマットするような、XMLを返すAPIに有効な、多くの用途があります。また、コネクタフックを使用して、APIからのエラーを、プロミス内のモデルに伝わる前に処理することもできます。

APIゲートウェイを使用している場合、HTTPエラー`502 Bad Gateway`送信されうるすべてのエラーは、`403 Forbidden`であるべきです。サーバーエラーとゲートウェイエラーの混乱を避けるため、フックでエラー処理をカスタマイズしてください。例えば以下のようにします。

```js
module.exports = function(server) {
  var APIConnector;
  APIConnector = server.datasources.APIDataSource.connector;
  return APIConnector.observe('after execute', function(ctx, next) {
    var err, ref, ref1;
    if (/^[5]/.test((ref = ctx.res) != null ? (ref1 = ref.body) != null ? ref1.code : void 0 : void 0)) {
      err = new Error('Error from the API');
      err.status = 403;
      err.message = ctx.res.body.message;
      return ctx.end(err, ctx, ctx.res.body);
    } else {
      return next();
    }
  });
};
```


### SOAP コネクタ

```
before: {req: {...}, end: ...}
```

```
after: {req: {...}, res: {...}, end: ...}
```

ここで、

- `req` は [request](https://github.com/request/request) モジュールに渡される要求オブジェクトです。
- `res` は [request](https://github.com/request/request) モジュールから返される応答オブジェクトです。
