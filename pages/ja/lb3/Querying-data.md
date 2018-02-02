---
title: "データの検索"
lang: ja
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Querying-data.html
summary:
---
{% include content/ja/angular-methods-caveat.html %}

{% include see-also.html content="
* [Fields フィルタ](Fields-filter.html)
* [Include フィルタ](Include-filter.html)
* [Limit フィルタ](Limit-filter.html)
* [Order フィルタ](Order-filter.html)
* [Skip フィルタ](Skip-filter.html)
* [Where フィルタ](Where-filter.html)
* [関連するモデルの検索](Querying-related-models.html).
" %}

{% include toc.html %}

## 概要

_検索_ は、データまたは結果のセットを返すモデルの読取操作です。
次の表に示すように、_フィルタ_ を使用して、Node APIとREST APIでLoopBackモデルを検索することができます。フィルタは、戻されるデータセットの基準を指定します。
2つのAPIの機能とオプションは同じですが、唯一の違いはHTTPリクエストとNode関数呼び出しで使用される構文です。
いずれの場合も、LoopBackモデルはJSONを返します。

<table>
  <thead>
    <tr>
      <th>検索</th>
      <th>モデル API (Node)</th>
      <th>REST API</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>
        指定したフィルタを使用して、すべてのモデルインスタンスを検索します。
      </td>
      <td>
        <code><a href="https://apidocs.loopback.io/loopback/#persistedmodel-find" class="external-link">find(filter, callback)</a></code>
        ここで filter は検索フィルタを含むJSONオブジェクトです。
        以下の<a href="Querying-data.html">フィルタ</a>を参照してください。
      </td>
      <td>
         <code>GET /<em>modelName</em>?filter...</code>
        <a href="PersistedModel-REST-API.html#find-matching-instances">モデル REST API - 一致するインスタンスの検索</a>を参照してください。
        以下の<a href="Querying-data.html">フィルタ</a>を参照してください。
      </td>
    </tr>
    <tr>
      <td>指定したフィルタを使用して最初のモデルインスタンスを検索します。</td>
      <td>
        <code><a href="https://apidocs.loopback.io/loopback/#persistedmodel-findone" class="external-link">findOne(filter, callback)</a></code>
        ここで filter は検索フィルタを含むJSONオブジェクトです。
        以下の<a href="Querying-data.html">フィルタ</a>を参照してください。
      </td>
      <td>
        <code><span>GET /<em>modelName</em>/findOne?filter...</span></code>
        <a href="PersistedModel-REST-API.html#find-matching-instances">モデル REST API - 最初のインスタンスの検索</a>を参照してください。
        以下の<a href="Querying-data.html">フィルタ</a>を参照してください。
      </td>
    </tr>
    <tr>
      <td>IDでインスタンスを検索します。</td>
      <td>
        <code><a href="https://apidocs.loopback.io/loopback/#persistedmodel-findbyid" class="external-link">findById(id, [filter,] callback)</a></code>
        ここで省略可の filter は検索フィルタを含むJSONオブジェクトです。
        以下の<a href="Querying-data.html">フィルタ</a>を参照してください。
      </td>
      <td>
        <code><span>GET /</span><em>modelName</em><span>/</span><em>modelID</em></code>
        <a href="PersistedModel-REST-API.html#find-matching-instances">モデル REST API - IDによる検索</a>を参照してください。
      </td>
    </tr>
  </tbody>
</table>

{% include important.html content="
RESTによる検索は、URLクエリ文字列にリテラル文字列「filter」を含める必要があります。
Node API呼び出しには、JSONのリテラル文字列「filter」を含めません。

[LoopBack APIエクスプローラ](Use-API-Explorer.html)は検索文字列に「filter」を追加しますが、
**filter** フィールドに[文字列化したJSON](#using-stringified-json-in-rest-queries)を入力する必要があります。
また、あなたが使用している引用符が、丸くなっていたり活字風だったりの引用符（“ や ”）ではなく、適切なストレート引用符（\"）であることを確認してください。これらは、しばしば視覚的に区別することが難しい場合があります。
" %}

{% include tip.html content="
[検索フィルタ](#filters)をcurlで試す場合、`-g` または `--globoff` オプションを使ってブラケット（`[`と`]`）をリクエストURLの中で使えるようにしてください。
" %}

LoopBackは、次の種類のフィルタをサポートしています。

* [Fields filter](Fields-filter.html)
* [Include filter](Include-filter.html)
* [Limit filter](Limit-filter.html)
* [Order filter](Order-filter.html)
* [Skip filter](Skip-filter.html)
* [Where filter](Where-filter.html)

詳細は以下の[フィルタ](#filters) を参照してください。

### 例

フィルタに関する追加の例は、各種類のフィルタの記事を参照してください（例：[Whereフィルタ](Where-filter.html)）。

`find()`メソッドで _where_ と _limit_ フィルタの両方を使用する例：

```javascript
Account.find({where: {name: 'John'}, limit: 3}, function(err, accounts) { /* ... */ });
```

RESTを使った等価な例：

`/accounts?filter[where][name]=John&filter[limit]=3`

## フィルタ

RESTとNode APIの両方で、任意の数のフィルタを使用して検索を定義できます。

LoopBackは、特定のフィルタ構文をサポートしています。SQLによく似ていますが、インジェクションなしで安全にシリアル化でき、JavaScriptネイティブであるように特別に設計されています。
以前は、この構文をサポートしていたのは[`PersistedModel.find()`](http://apidocs.loopback.io/loopback/#persistedmodel-find)メソッド（および関連するメソッド）のみでした。

The following table describes LoopBack's filter types:

<table>
  <thead>
    <tr>
      <th>フィルタ種別</th>
      <th>型</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fields</td>
      <td>Object・Array・String</td>
      <td>
        応答に含めたり除外したりするフィールドを指定します。
        <a href="Fields-filter.html">Fields フィルタ</a>を参照してください。
      </td>
    </tr>
    <tr>
      <td>include</td>
      <td>String・Object・Array</td>
      <td>
        <em>belongsTo</em>や<em>hasMany</em>などの関係について、関連するモデルの結果を含めます。
        <a href="Include-filter.html">Include フィルタ</a>を参照してください。
      </td>
    </tr>
    <tr>
      <td>limit</td>
      <td>Number</td>
      <td>
        返すインスタンスの数を制限します。
        <a href="Limit-filter.html">Limit フィルタ</a>を参照してください。
      </td>
    </tr>
    <tr>
      <td>order</td>
      <td>String</td>
      <td>
        ソート順を指定指定します。（昇順・降順）
        <a href="Order-filter.html">Order フィルタ</a>を参照してください。
      </td>
    </tr>
    <tr>
      <td>skip (オフセット)</td>
      <td>Number</td>
      <td>
        指定した数のインスタンスを飛ばします。
        <a href="Skip-filter.html">Skip フィルタ</a>を参照してください。
      </td>
    </tr>
    <tr>
      <td>where</td>
      <td>Object</td>
      <td>
        検索条件を指定します。SQLのWHERE句に似ています。
        <a href="Where-filter.html">Where フィルタ</a>を参照してください。
      </td>
    </tr>
  </tbody>
</table>

### REST 構文

[HTTP クエリ文字列](http://en.wikipedia.org/wiki/Query_string)にフィルタを指定するには以下のようにします。

`?filter_filterType_=_spec_&_filterType_=_spec_....`

１回のリクエストに適用できるフィルタの数は、URLの最大長によってのみ、制限されます。これは一般的に使用するクライアントに依存します。

{% include important.html content="
クエリ文字列では、`?filter` の直後に等号は書きません。例：
`http://localhost:3000/api/books?filter[where][id]=1` 
" %}

{% include note.html content="詳細は [https://github.com/hapijs/qs](https://github.com/hapijs/qs) を参照してください。
" %}

### Node 構文

`find()` や `findOne()`の最初の引数としてフィルタを指定するには以下のようにします。

```javascript
{ filterType: spec, filterType: spec, ... }
```

適用できるフィルタの数に理論的な限界はありません。

ここで、

* _filterType_ はフィルタの種類： [where](Where-filter.html)・[include](Include-filter.html)・[order](Order-filter.html)・
  [limit](Limit-filter.html)・[skip](Skip-filter.html)・[fields](Fields-filter.html)のいずれかです。
* _spec_  はフィルタの仕様です。例えば _where_ フィルタなら、 結果が一致しなければならない条件を書きます。
  _include_ フィルタなら、結果に含める関連フィールドを指定します。

### REST 検索で「文字列化した」JSON を使う

上記の標準的なREST構文の代わりに、REST検索で「文字列化されたJSON」を使用することもできます。
これを行うには、次のようにNode構文用のJSONを使用します。

`?filter={ Stringified-JSON }`

_Stringified-JSON_ はNode構文に沿った文字列化したJSONです。ただし、JSONではすべてのテキストキー/文字列を引用符（"）で囲む必要があります。

{% include important.html content="
文字列化されたJSONを使用する場合、クエリ文字列の`?filter` の直後に等号を使用する必要があります。

例： `http://localhost:3000/api/books?filter={%22where%22:{%22id%22:2}}` 
" %}

例： `GET /api/activities/findOne?filter={"where":{"id":1234}}`

### オブジェクトの配列をフィルタリングする

[loopback-filters](https://github.com/strongloop/loopback-filters) モジュールは、LoopBackのフィルタ構文を実装します。
このモジュールを使用すると、`MyModel.find(filter)`でサポートされているのと同じフィルタ構文を使用して、オブジェクトの配列をフィルタリングできます。

{% include note.html content="
すべてのモジュールが`loopback-filter`を使用するように変換する予定です。このモジュールはLoopBackの一般的な「組み込み」フィルタリング機構になるでしょう。
" %}

ここでは、新しいモジュールを使用した基本的な例を示します。

```javascript
var data = [{n: 1}, {n: 2}, {n: 3, id: 123}];
var filter = {where: {n: {gt: 1}}, skip: 1, fields: ['n']};
var filtered = require('loopback-filters')(data, filter);
console.log(filtered); // => [{n: 3}]
```

もう少し詳しく説明すると、コンマ区切り値（CSV）ファイルを解析して、価格列が10〜100のすべての値を出力する必要があるとします。
LoopBackフィルタ構文を使用するには、CSVコネクタか、メモリコネクタを使用する必要があります。両方とも、実際の目的には関係ない余分な作業が必要です。

CSVを（`node-csv`のようなモジュールを使って）解析すると、次のようなオブジェクトの配列が得られます（ユニークなアイテムは10,000個あるとします）。

```javascript
[
  {price: 85, id: 79},
  {price: 10, id: 380},
  //...
]
```

これらの行をフィルタするには、以下のように一般的なJavaScriptを使うこともできます。

```javascript
data.filter(function(item) {
  return item.price < 100 && item.price >= 10
});
```

これはフィルタリングには非常に簡単ですが、ソート、フィールド選択、さらに高度な操作はややこしくなります。
さらに、通常は入力としてパラメータを受け入れます。

例えば以下のようなものです。

```javascript
var userInput = {min: 10, max: 100}

data.filter(function(item) {
  return item.price < userInput.min && item.price >= userInput.max
});
```

これを簡単にループバックフィルタとして書き直すことができます。

```javascript
filter(data, {where: {input: {gt: userInput.min, lt: userInput.max}}})
```

または、フィルタオブジェクト構文をユーザー入力として採用するだけの場合は、次のようにします。

```javascript
filter(data, userInput)
```

しかし  loopback-filter、単に除外したり、含めたりするだけではありません。
フィールドの選択（フィールドを含む/除外する）・並べ替え・位置情報/距離の並べ替え・制限とスキップをサポートしています。
すべてがユーザー入力から簡単に作成できる宣言構文です。

LoopBackユーザーにとって、これは非常に強力なものです。
`find()` フィルタ構文を使用して複雑なクエリを作成する典型的な方法を学びました。前提として、JavaScriptで（underscore.jsなどのライブラリを使用して）同じことを行う方法を理解する必要があります。一方、`loopback-filters` モジュールを使えば、LoopBackサーバーと全く対話することなく、データベースをフィルタするためにサーバーに送信したのと正確に同じフィルタオブジェクトを、クライアントアプリケーションで再利用することができます。

### 入れ子になったプロパティのフィルタリング

Loopbackは、Mongodb、Cloudant、Memoryの3つのNoSQLコネクタで、入れ子になったプロパティをフィルタリングすることをサポートしています。

For example, model `User` contains a nested property `user.address.tags.tag`:

```javascript
db.define('User', {
  name: {type: String, index: true},
  email: {type: String, index: true},
  address: {
    street: String,
    city: String,
    tags: [
      {
        tag: String,
      }
    ]
  }
});
```

users can do a nested query like `User.find({where: {'address.tags.tag': 'business'}}`.

リレーショナル・データベースのコネクタは、入れ子になったプロパティのフィルタリングをサポートしていません。
