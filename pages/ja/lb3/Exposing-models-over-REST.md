---
title: "REST経由でモデルを公開する"
lang: ja
layout: page
toc_level: 2
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Exposing-models-over-REST.html
summary:
---

## 概要

LoopBackのモデルは自動的に、モデルのデータに対して作成・読取・更新・削除（CRUD）操作を行うREST APIを提供する、 [標準的なHTTPエンドポイント一式](http://apidocs.loopback.io/loopback/#persistedmodel)を持ちます。
[model-config.json](model-config.json.html) ファイルの `public` プロパティは、モデルのREST APIを公開するかどうかを指定します。

{% include code-caption.html content="/server/model-config.json" %}
```javascript
...
"MyModel": {
  "public": true,
  "dataSource": "db"
},
...
```

モデルのREST API を「隠す」には、単に `public` を `false` に変更します。

### RESTパス

既定では、REST APIはモデル名の複数形としてマウントされます。具体的には以下のとおりです。

* `Model.settings.http.path`
* `plural` （[モデル定義JSONファイル](Model-definition-JSON-file.html)で定義されている場合）
* 自動的に複数形に変換されたモデル名（既定）。例えば、location モデルがあった場合、既定では `/locations` としてマウントされます。

### RESTルータを使う

既定では、土台を作ったアプリケーションは `loopback.rest` ルータを使って、モデルをREST経由で公開します。

{% include important.html content="
[アプリケーション生成ツール](Application-generator.html) を使ってアプリケーションを作成した場合、LoopBackは自動的にRESTミドルウェアを設定し、公開するモデルを登録します。何か追加の作業は必要ありません。
" %}

手動で、`loopback.rest` ルータを使って、REST経由でモデルを公開するには、以下のようなコードを使用します。

{% include code-caption.html content="/server/server.js" %}
```javascript
var app = loopback();
app.use(loopback.rest());

// `Product` モデルを公開する
app.model(Product);
```

After this, the `Product` model will have create, read, update, and delete functions working remotely from mobile.
At this point, the model is schema-less and the data are not checked.

You can then view generated REST documentation at [http://localhost:3000/explorer](http://localhost:3000/explorer)

LoopBackは、REST APIを持つ幾つかの[組み込みモデル](Using-built-in-models.html)を提供しています。
詳細は、[組み込みモデルのREST API](Built-in-models-REST-API.html) を参照してください。

### リクエスト形式

POST・PUTリクエストについては、リクエストボディはJSON・XML・URLエンコードされた形式が使えます。
**Content-Type** ヘッダは以下のいずれかにしてください。

- `application/json`
- `application/xml`
- `application/x-www-form-urlencoded`

**Accept** ヘッダは、好ましいレスポンス形式を示します。

{% include tip.html content="
リクエストの **Accept** ヘッダを `application/vnd.api-json` にセットすると、`application/vnd.api-json` がサポートされるタイプにあれば、レスポンスの **Content-Type** ヘッダは自動的に `application/vnd.api-json` にセットされます。

サポートされるタイプは [config.json](config.json.html) ファイルの `remoting.rest.supportedTypes` プロパティで設定します。
" %}

#### HTTPクエリ文字列を使って、JSONのオブジェクトや配列を渡す

幾つかのREST APIは、クエリ文字列にJSONオブジェクトや配列を受け取ります。LoopBackは、オブジェクトや配列の値をクエリパラメータとしてエンコードする方式を２つサポートしています。

* node-querystring (qs) の文法
* 文字列化した JSON

例えば以下のようなものです。

```
http://localhost:3000/api/users?filter[where][username]=john&filter[where][email]=callback@strongloop.com
http://localhost:3000/api/users?filter={"where":{"username":"john","email":"callback@strongloop.com"}}
```

以下のテーブルは、JSONオブジェクト・配列を異なる方式でエンコードする方法を説明しています。

<table style="width: 800px;">
  <thead>
    <tr>
      <th>JSON オブジェクト・配列</th>
      <th>qs方式</th>
      <th>文字列化したJSON</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>
        <pre><code>{
where: {
  username: 'john',
  email: 'a@b.com'
  }
}</code></pre>
      </td>
      <td>
        <pre>?filter[where][username]=john
&filter[where][email]=a@b.com</pre>
      </td>
      <td>
        <pre><code>?filter={
  "where": {
    "username":"john",
    "email":"a@b.com"
  }
}</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>{
  where: {
    username: {inq:
      ['john', 'mary']}
  }
}</code></pre>
      </td>
      <td>
        <pre>?filter[where][username][inq][0]=john
&filter[where][username][inq][1]=mary</pre>
      </td>
      <td>
        <pre><code>?filter={
  "where": {
    "username": {
      "inq":["john","mary"]
    }
  }
}</code></pre>
      </td>
    </tr>
    <tr>
      <td>
        <pre><code>{
  include: ['a', 'b']
}</code></pre>
      </td>
      <td>
        <pre><code>?filter[include]=a&filter[include]=b</code></pre>
      </td>
      <td>
        <pre><code>?filter={
  "include": ["a","b"]
}</code></pre>
      </td>
    </tr>
  </tbody>
</table>

### レスポンス形式

全てのリクエストのレスポンス形式は通常、ボディ部にJSONオブジェクト・配列またはXMLと、ヘッダ一式からなります。
レスポンスによってはボディは空です。

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
Content-Length: 59
Vary: Accept-Encoding
Date: Fri, 24 Oct 2014 18:02:34 GMT
Connection: keep-alive

{"title":"MyNote","content":"This is my first note","id":1}
```

HTTPステータスコードは、リクエストが成功したかどうかを示します。

* ステータスコード 2xx は成功を表します。
* ステータスコード 4xx はリクエスト関連の問題を表します。
* ステータスコード 5xx はサーバ側の問題を表します。

エラーに対するレスポンスは、以下のようなJSON形式になります。

* message: エラーメッセージ文字列
* stack: スタックトレース文字列
* statusCode: [HTTP ステータスコード](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)の整数値

例えば以下のようになります。

```javascript
{
  "error": {
    "message": "could not find a model with id 1",
    "stack": "Error: could not find a model with id 1\n ...",
    "statusCode": 404
  }
}
```

### Disabling API Explorer

LoopBack [API Explorer](Use-API-Explorer) is great when you're developing your application,
but for security reasons you may not want to expose it in production.

For an application using [loopback-component-explorer](https://github.com/strongloop/loopback-component-explorer), to disable explorer in production:

* Set the NODE_ENV environment variable to "production".
* Then in `server/component-config.production.json`:

{% include code-caption.html content="server/component-config.production.json" %}
```javascript
{
  "loopback-component-explorer": null
}
```

## 事前に定義されたリモートメソッド

既定では、背後にデータソースが存在するモデルについては、
LoopBackは標準的な作成・読取・更新・削除（CRUD）操作を全て備えたREST APIを公開します。

LoopBackが公開するREST APIを説明するための例として、 `Location`（営業拠点を表します）と呼ばれる単純なモデルを考えます。
LoopBackは自動的に、いくつものRESTエンドポイントに対応するNodeのメソッドを作成します。

以下の表は、LoopBack 3.x にて公開されるリモートメソッドのリストです。

| モデル (Node) API | HTTPメソッド | パスの例 |
|---|---|---|
| [create()](https://apidocs.loopback.io/loopback/#persistedmodel-create)                                        | POST   | /locations                 |
| [replaceOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-replaceorcreate)                      | PUT    | /locations                 |
| [patchOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-upsert)                                 | PATCH  | /locations                 |
| [exists()](https://apidocs.loopback.io/loopback/#persistedmodel-exists)                                        | GET    | /locations/:id/exists      |
| [findById()](https://apidocs.loopback.io/loopback/#persistedmodel-findbyid)                                    | GET    | /locations/:id             |
| [find()](https://apidocs.loopback.io/loopback/#persistedmodel-find)                                            | GET    | /locations                 |
| [findOne()](https://apidocs.loopback.io/loopback/#persistedmodel-findone)                                      | GET    | /locations/findOne         |
| [destroyById() or deleteById()](https://apidocs.loopback.io/loopback/#persistedmodel-destroybyid)              | DELETE | /locations/:id             |
| [count()](https://apidocs.loopback.io/loopback/#persistedmodel-count)                                          | GET    | /locations/count           |
| [replaceById()](https://apidocs.loopback.io/loopback/#persistedmodel-replacebyid)                              | PUT    | /locations/:id             |
| [prototype.patchAttributes()](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-updateattributes) | PATCH  | /locations/:id             |
| [createChangeStream()](https://apidocs.loopback.io/loopback/#persistedmodel-createchangestream)                | POST   | /locations/change-stream   |
| [updateAll()](https://apidocs.loopback.io/loopback/#persistedmodel-updateall)                                  | POST   | /locations/update          |
| [replaceOrCreate()](https://apidocs.loopback.io/loopback/#persistedmodel-replaceorcreate)                      | POST   | /locations/replaceOrCreate |
| [replaceById()](https://apidocs.loopback.io/loopback/#persistedmodel-replacebyid)                              | POST   | /locations/:id/replace     |

ご覧の通り、既定の設定でLoopBack 2.x と 3.0 の違いは HTTP PUTエンドポイントの振る舞い( `PUT /api/my-models` と `PUT /api/my-models/:id` の両方)だけです。LoopBack 2.x の既定では、これらのエンドポイントは patch メソッドを呼出して部分的な更新を行っていましたが、LoopBack 3.0 では、これらのメソッドは完全な置き換えを実行します。

## replaceOnPUT フラグ

replaceとupdateメソッドの振る舞いを変更するには、 `model.json`  内の replaceOnPUT プロパティを使用します。もし、replaceOnPUT が trueならば、replaceOrCreate と replaceById がHTTP PUT メソッドを使用し、false ならば、updateOrCreate と updateAttributes/patchAttributes が HTTP PUT メソッドを使用します。

以下は、`location.json` にて `replaceOnPUT` を設定する方法のサンプルです。

```javascript
...
{
  name: "location",
  plural: "locations",
  relations: {…},
  acls: […],
  properties: { … },
  replaceOnPUT: true
}...
```

{% include tip.html content="
上の表はRESTエンドポイントやメソッドの部分的なリストです。
Node APIメソッドの完全な一覧は、[API documentation](https://apidocs.loopback.io/loopback/#persistedmodel) を参照ください。  REST API についての詳細は、[PersistedModel REST API](PersistedModel-REST-API.html) を参照ください。
" %}

## モデル・メソッド・エンドポイントの公開と隠蔽

モデルをREST経由で公開するには、`/server/model-config.json` ファイルの `public` プロパティを true にセットします。

```javascript
...
"Role": {
  "dataSource": "db",
  "public": false
},
...
```

### メソッドとRESTエンドポイントの隠蔽

幾つかの操作を公開したくない場合、モデルで [`disableRemoteMethodByName()`](http://apidocs.loopback.io/loopback/#model-disableremotemethodbyname) を呼び出すことで、それらを隠蔽できます。
例えば、以下に示すサンプルは、規約によって `common/models/location.js` に書かれるべきものです。
事前定義されたリモートメソッドの一つを「隠蔽」するには、以下のような行を追加します。

{% include code-caption.html content="common/models/location.js" %}
```javascript
Location.disableRemoteMethodByName('deleteById');
```

これで、`deleteById()`メソッドと対応するRESTエンドポイントは外部から利用できなくなります。

`updateAttributes()` のようにオブジェクトのプロトタイプに存在しているメソッドについては以下のようにします。

{% include code-caption.html content="common/models/location.js" %}
```javascript
Location.disableRemoteMethodByName('prototype.updateAttributes');
```

{% include important.html content="以下の例で示すように、`disableRemoteMethodByName()` は組み込みモデルではなく、独自モデルで呼び出すようにしてください。例えば、`User.disableRemoteMethodByName()` ではなく、`MyUser.disableRemoteMethodByName()` のように呼び出してください。
" %}

これは、`MyUser` モデルにおいて`login` と `logout` 以外の全メソッドを隠蔽する例です。

In `server/model-config.json`:

```javascript
"MyUser": {
  "dataSource": "db",
  "public": true,
  "options": {
    "remoting": {
      "sharedMethods": {
        "*": false,
        "login": true,
        "logout": true
      }
    }
  }
}
```

`config.json` ファイルの `remoting` オブジェクトを通じて、全モデルに渡って共通のメソッドを隠蔽することもできます。

```javascript
"remoting": {
  "context": false,
  ...
  "sharedMethods": {
    "*": false,
    "login": true,
    "logout": true
  }
}
```

代わりに、`myUser.js` モデルのJavaScriptを使って、リモートメソッドを無効化することもできます。

```javascript
MyUser.disableRemoteMethodByName('create');
MyUser.disableRemoteMethodByName('upsert');
MyUser.disableRemoteMethodByName('updateAll');
MyUser.disableRemoteMethodByName('prototype.updateAttributes');

MyUser.disableRemoteMethodByName('find');
MyUser.disableRemoteMethodByName('findById');
MyUser.disableRemoteMethodByName('findOne');

MyUser.disableRemoteMethodByName('deleteById');

MyUser.disableRemoteMethodByName('confirm');
MyUser.disableRemoteMethodByName('count');
MyUser.disableRemoteMethodByName('exists');
MyUser.disableRemoteMethodByName('resetPassword');

MyUser.disableRemoteMethodByName('prototype.__count__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__create__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__delete__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__findById__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__get__accessTokens');
MyUser.disableRemoteMethodByName('prototype.__updateById__accessTokens');
```

### 読み取り専用エンドポイントの例

全てのPOST, PUT, DELETE 動詞を隠して、読み取り専用の操作だけを公開したいこともあるかもしれません。

{% include code-caption.html content="common/models/model.js" %}
```javascript
Product.disableRemoteMethodByName('create');     // (POST) /products を削除
Product.disableRemoteMethodByName('upsert');     // (PUT) /products を削除
Product.disableRemoteMethodByName('deleteById'); // (DELETE) /products/:id を削除
Product.disableRemoteMethodByName('updateAll');  // (POST) /products/update を削除
Product.disableRemoteMethodByName('prototype.updateAttributes');
    // (PUT) /products/:id を削除
Product.disableRemoteMethodByName('createChangeStream');
    // (GET|POST) /products/change-stream を削除
```

### 関連するモデルのエンドポイントの隠蔽

関連するモデルのメソッドについて、RESTエンドポイントを無効化するには、[disableRemoteMethodByName()](https://apidocs.loopback.io/loopback/#model-disableRemoteMethodByName)を使用します。

{% include note.html content="詳細については、[関連するモデルへのアクセス](Accessing-related-models.html) を参照ください。
"
%}

例えば、投稿(Post)とタグ(Tag)のモデルがあったとして、投稿は複数のタグを持ちます。以下のコードを `/common/models/post.js` に書くことで、
関連するモデルのリモートメソッドと、対応するRESTエンドポイントを無効化することができます。

{% include code-caption.html content="common/models/model.js" %}
```javascript
module.exports = function(Post) {
  Post.disableRemoteMethodByName('prototype.__get__tags');
  Post.disableRemoteMethodByName('prototype.__create__tags');
  Post.disableRemoteMethodByName('prototype.__destroyById__accessTokens'); // DELETE
  Post.disableRemoteMethodByName('prototype.__updateById__accessTokens'); // PUT
};
```

### プロパティの隠蔽

REST経由で公開されているモデルのプロパティを隠蔽するには、hidden プロパティを定義します。
[モデル定義JSONファイル (Hidden プロパティ)](Model-definition-JSON-file.html#hidden-properties)を参照ください。

{% include content/ja/hidden-vs-protected.html xref='true' %}
