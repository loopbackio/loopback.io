---
title: "Where フィルタ"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Where-filter.html
summary: <i>where</i>フィルタは、SQL検索のWHERE句に似て、一致すべき条件のセットを指定します。
---
## REST API

下の最初の形式は、等価条件です。つまり、_プロパティ_ が _値_ と等しいかどうかをテストします。
下の2番目のフォームは、他のすべての条件です。

```
filter[where][property]=value
```

```
filter[where][property][op]=value
```

例えば、`odo`プロパティを持つ自動車(car)モデルがあったとして、以下の検索では `odo` が5000より大きいインスタンスを抽出します。

```
/cars?filter[where][odo][gt]=5000
```

例えば、これは `odo` が30,000よりも小さい自動車を検索します。

```
/cars?filter[where][odo][lt]=30000
```

REST検索では、[文字列化したJSON形式](Querying-data.html#using-stringified-json-in-rest-queries)を使うこともできます。

### フィルタの制限

{% include important.html content="[qs](https://github.com/ljharb/qs#parsing-arrays) を使用するため、この形式の使用には（ANDまたはORと組み合わせて）20個のフィルタまでの制限があります。20を超えるフィルタがある場合、フィルタは `Arary` が期待される場所で、`Object` に変換されるためエラーになります。詳細については[LoopBack issue #2824](https://github.com/strongloop/loopback/issues/2824)を参照してください。
" %}

フィルタの制限を回避する方法は２つあります。

- 大きなフィルタオブジェクトを、「文字列化したJSON」に変換する。
- `server/server.js` で `boot()` が呼び出される前に、制限値を変更する。

**フィルタオブジェクトをJSONに変換する**

```
http://localhost:3000/api/Books
?filter={"where":{"or":[{"id":1},{"id":2},...,{"id":20"},{"id":21}]}}
```

**`server.js` で制限値を上書きする**

```javascript
// In `server/server.js`, before boot is called
var loopback = require('loopback');
var boot = require('loopback-boot');
var qs = require('qs');

var app = module.exports = loopback();
app.set('query parser', function(value, option) {
  return qs.parse(value, {arrayLimit: 500});
});

app.start = function() {
  ...
```

## Node API

{% include content/ja/angular-methods-caveat.html %}

### 検索のwhere句

`find()`・`findOrCreate()`・`findOne()` などの検索メソッドでは、等価性（ _プロパティ_ が _値_ と等しいこと）のテストに下の最初の形式を使ってください。
その他全ての条件については、下の２つ目の形式を使ってください。

```javascript
{where: {property: value}} 
```

```javascript
{where: {property: {op: value}}}
```

ここで、

* _property_ は、検索されるモデル内のプロパティ（フィールド）の名前です。
* _value_ はリテラル値です。
* _op_ は以下に挙げる[演算子](#operators)のいずれかになります。

```javascript
Cars.find({where: {carClass:'fullsize'}});
```

等価な REST 検索は以下のようになります。

```
/api/cars?filter[where][carClass]=fullsize
```

{% include tip.html content="上記のwhere句構文は検索用であり、[`count()`](http://apidocs.loopback.io/loopback/#persistedmodel-count)用ではありません。
`count()`を含む、その他全てのメソッドでは、`{ where : ... }` の囲みを外してください。以下の[他のメソッドでのwhere句](#where-clause-for-other-methods)を参照してください。
" %}

### 他のメソッドでのwhere句

{% include important.html content="_検索以外のメソッド_ つまり、更新や削除のメソッド（そして[`count()`](http://apidocs.loopback.io/loopback/#persistedmodel-count)）のNode APIを呼び出すときは、where句を `{ where : ... }` オブジェクトで囲まないで、以下に示すように単に引数として指定するようにしてください。以下の例を参照してください。
" %}

下の最初の形式は、等価条件です。つまり、_プロパティ_ が _値_ と等しいかどうかをテストします。下の2番目のフォームは、他のすべての条件です。

```javascript
{property: value}
```

```javascript
{property: {op: value}}
```

ここで、

* _property_ は、検索されるモデル内のプロパティ（フィールド）の名前です。
* _value_ はリテラル値です。
* _op_ は以下に挙げる[演算子](#operators)のいずれかになります。

例えば、以下に示すのが、モデルの[updateAll()](http://apidocs.loopback.io/loopback/#persistedmodel-updateall)メソッドの呼出しにおけるwhere句です。
引数では`{ where : ... }`がないことに注意してください。

```javascript
var myModel = req.app.models.Thing;
var theId = 12;
myModel.updateAll( {id: theId}, {regionId: null}, function(err, results) {
	return callback(err, results);
});
```

他の例として、今度は [destroyAll()](http://apidocs.loopback.io/loopback/#persistedmodel-destroyall) を呼び出す場合です。

```javascript
var RoleMapping = app.models.RoleMapping;
RoleMapping.destroyAll( { principalId: userId }, function(err, obj) { ... } );
```

cost プロパティが100より大きいレコードを削除するには、以下のようになります。

```javascript
productModel.destroyAll({cost: {gt: 100}}, function(err, obj) { ... });
```

### whereフィルタの既定スコープ

([`model.json` ファイル](Model-definition-JSON-file.html)内の)モデル定義に `scope` を追加すると、
自動的に `defaultScope()` メソッドが追加されます。LoopBack はモデルが作成・更新・検索される時はいつでもこのメソッドを呼出します。

{% include tip.html content="`where`フィルタを使用したデフォルトスコープは、期待どおりに機能しない可能性があります。
" %}

モデルインスタンスが生成されたり更新されたりする都度、生成された `defaultScope()` メソッドは `where` フィルタに一致するモデルのプロパティを変更して、指定された値を適用します。

このようにデフォルトスコープを適用したくない場合は、可能であれば名前付きスコープを使用してください。

デフォルトのスコープを使用する必要があるが、そのスコープに影響されたくない場合、`upsert()`などは、たとえば、 `upsert()` の呼び出し前にモデルの`defaultScope()`メソッドをオーバーライドするだけです。

例えば以下のようにします。

```javascript
var defaultScope = Report.defaultScope;
  Report.defaultScope = function(){};
  Report.upsert({id: reportId, 'deleted': true}, function(...) {
    Report.defaultScope = defaultScope;
    ...
  });
```

## 演算子

この表では、「where」フィルタで使用できる演算子について説明します。 以下の[例](#examples)を参照してください。

| 演算子  | 説明|
| ------------- | ------------- |
| = | 等価性。 以下の[例](#equivalence) 参照。|
| and | 論理 AND 演算子。 下の[ANDとOR演算子](#and-and-or-operators)と[例](#and--or)を参照。|
| or | 論理 OR 演算子。 下の[ANDとOR演算子](#and-and-or-operators)と[例](#and--or)を参照。|
| gt, gte | 数値がより大きい (&gt;)、以上 (&gt;=)。数値と日付にのみ使用できます。下の[例](#gt-and-lt) を参照。<br/><br/> 位置情報の値は、既定ではマイル単位です。詳細は、 [Geopoint](http://apidocs.loopback.io/loopback-datasource-juggler/#geopoint)を参照してください。|
| lt, lte | 数値がより小さい (&lt;)、以下 (&lt;=)。数値と日付にのみ使用できます。<br/><br/>位置情報の値は、既定ではマイル単位です。詳細は、 [Geopoint](http://apidocs.loopback.io/loopback-datasource-juggler/#geopoint)を参照してください。 |
| between | 値が、２つの指定された値の間にある（１つ目の値以上かつ、２つ目の値以下）場合は true。下の[例](#gt-and-lt)を参照。<br/><br/> 位置情報の値は、既定ではマイル単位です。 詳細は、 [Geopoint](http://apidocs.loopback.io/loopback-datasource-juggler/#geopoint)を参照してください。|
| inq, nin | 値の配列に含まれる／含まれない。下の[例](#inq)を参照。|
| near | 位置情報において、距離でソートしたときに最も近い点を返す。`limit` を使って、最も近い _n_ 個の点を返すことができる。下の [例](#near) を参照。|
| neq | 等しくない (!=) |
| like, nlike | 正規表現を使用する LIKE / NOT LIKE 演算子。正規表現の形式は、バックエンドのデータソースに依存します。下の[例](#like-and-nlike) を参照。|
| like, nlike, オプション：i| 大文字・小文字を無視するフラグのついた、正規表現を使用する LIKE / NOT LIKE 演算子。memory と MongoDB コネクタで使用可能。options プロパティを 'i' にセットすることで、LoopBack は 大文字小文字を無視したマッチングを行う。下の[例](#like-and-nlike-insensitive) を参照。|
| ilike, nilike | 正規表現を使用する ILIKE / NOT ILIKE 演算子。memory と Postgresql コネクタでのみ使用可能。下の [例](#ilike-and-nilike) を参照。 |
| regexp | 正規表現。 下の [例](#regular-expressions) を参照。 |

### AND と OR 演算子

AND演算子とOR演算子を使用して、次の構文で、単純なwhereフィルタ条件に基づいて複合論理フィルタを作成します。

{% include code-caption.html content="Node API" %}
```javascript
{where: {<and|or>: [condition1, condition2, ...]}}
```

**REST**

```
[where][<and|or>][0]condition1&[where][<and|or>]condition2...
```

ここで、_condition1_ と _condition2_ はフィルタ条件です。

下の[例](#examples)を参照してください。

### 正規表現

whereフィルタでは、次の構文で正規表現を使用できます。where句の正規表現を使用して、検索同様に更新と削除を行うことができます。

基本的に `regexp` は、比較値として正規表現の値を与える演算子のようなものです。

{% include tip.html content="正規表現の値には、1つ以上の[フラグ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags)を含めることもできます。たとえば `/i`を正規表現に追加して大文字小文字を区別しないマッチを実行します。
" %}

{% include code-caption.html content="Node API" %}

```javascript
{where: {property: {regexp: <expression>}}}
```

ここで、`<expression>` は以下のいずれかを取りえます。

* 正規表現を定義する文字列 (例えば、`'^foo'`)。
* 正規表現リテラル (例えば、`/^foo/`)。
* 正規表現オブジェクト (例えば、`new RegExp(/John/)`)。

より単純な形式も可能です。

```javascript
{where: {property: <expression>}}}
```

ここで、`<expression>` は以下のいずれかを取りえます。

* 正規表現リテラル (例えば、`/^foo/`)。
* 正規表現オブジェクト (例えば、`new RegExp(/John/)`)。

JavaScriptの正規表現についてより詳細な情報は、
[正規表現 (Mozilla Developer Network)](https://developer.mozilla.org/ja-JP/docs/Web/JavaScript/Guide/Regular_Expressions)を参照してください。

{% include tip.html content="上記のwhere句構文は検索用です。
更新および削除の場合は、{ where : ... }の囲みを省略します。
以下の[他のメソッドでのWhere句](#where-clause-for-other-methods)を参照してください。
" %}

たとえば、この検索は、車種(model)が大文字の "T"で始まるすべての車を返します。

```javascript
Cars.find( {"where": {"model": {"regexp": "^T"}}} );
```

または、単純な形式を使うと以下のようになります。

```javascript
Cars.find( {"where": {"model": /^T/} } );
```

**REST**

```
filter[where][property][regexp]=expression
```

ここで、

* _property_ は、検索されるモデル内のプロパティ（フィールド）の名前です。
* _expression_ はJavaScriptの正規表現文字列です。[正規表現 (Mozilla Developer Network)](https://developer.mozilla.org/ja-JP/docs/Web/JavaScript/Guide/Regular_Expressions)を参照してください。

正規表現の値は、１つ以上の[フラグ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Advanced_searching_with_flags)を含めることができます。
例えば、正規表現に `/i` を追加すると、大文字小文字を区別しないマッチを行います。

{% include important.html content="REST APIで正規表現のフラグを使用する場合は、
正規表現の前にスラッシュ文字（`/`）を _付けなければ_ なりません。
" %}

次のREST検索は、車種(model)が大文字の「T」で始まるすべての自動車(car)を返します。

```
/api/cars?filter[where][model][regexp]=^T
```

次のREST検索は、大文字の「T」または小文字の「t」で始まるすべての車種(model)を返します。

```
/api/cars?filter[where][model][regexp]=/^t/i
```

正規表現にはフラグが含まれているため、スラッシュ（`/`）が前に付いています。

## 例

### 等価性

「M1911」という名前の武器：

**REST**

```
/weapons?filter[where][name]=M1911
```

carClassが「fullsize」である自動車：

**REST**

```
/api/cars?filter[where][carClass]=fullsize
```

Nodeで等価な処理：

```javascript
Cars.find({ where: {carClass:'fullsize'} });
```

### gt と lt

```javascript
ONE_MONTH = 30 * 24 * 60 * 60 * 1000;  // ミリ秒で１ヶ月
transaction.find({
      where: {
        userId: user.id,
        time: {gt: Date.now() - ONE_MONTH}
      }
    }
```

例えば、以下の検索は従業員（employee）モデルから、_where_ フィルタを使って、dateプロパティが指定した日時より大きいインスタンスを返します。

```
/employees?filter[where][date][gt]=2014-04-01T18:30:00.000Z
```

Node APIで同じ検索を行います。

```javascript
Employees.find({
  where: { 
    date: {gt: new Date('2014-04-01T18:30:00.000Z')}
  }
});
```

有効射程が900メートルを超える武器の最初の３件：

```
/weapons?filter[where][effectiveRange][gt]=900&filter[limit]=3
```

可聴域が10未満の武器：

```
/weapons?filter[where][audibleRange][lt]=10
```

### and / or

以下のコードは、「and」演算子を使って、題名が「My Post」かつ、内容が「Hello」である投稿を検索する例です。

```javascript
Post.find({where: {and: [{title: 'My Post'}, {content: 'Hello'}]}}, 
          function (err, posts) {
            ...
});
```

RESTで等価な検索：

```
?filter[where][and][0][title]=My%20Post&filter[where][and][1][content]=Hello
```

以下のコードは、「or」演算子を使って、題名が「My Post」または、内容が「Hello」である投稿を検索する例です。


```javascript
Post.find({where: {or: [{title: 'My Post'}, {content: 'Hello'}]}}, 
          function (err, posts) {
            ...
});
```

より複雑な例として、以下のような式 `(field1= foo and field2=bar) OR field1=morefoo` を考えます。

```javascript
{
   or: [
     { and: [{ field1: 'foo' }, { field2: 'bar' }] },
     { field1: 'morefoo' }
   ]
 }
```

### between

between演算子の例：

```
filter[where][price][between][0]=0&filter[where][price][between][1]=7
```

Node APIの場合：

```javascript
Shirts.find({where: {size: {between: [0,7]}}}, function (err, posts) { ... } )
```

### near

`where.<field>.near` フィルタは他のフィルタと異なります。多くのwhereフィルタが返されるレコードの数を **制限する** 一方で、
`near` はSQLの`order by`句のようにレコードを**並び替え**ます。
これを [`limit`](Limit-filter.html) と組み合わせることで、たとえば、**特定の場所に最も近い3つのレコード** を取得する検索を作成できます。

例えば以下のようにします。

```
/locations?filter[where][geo][near]=153.536,-28.1&filter[limit]=3
```

位置情報は、以下のいずれかの方法で表現できます。

```javascript
location = new GeoPoint({lat: 42.266271, lng: -72.6700016}); // GeoPoint
location = '42.266271,-72.6700016';                          // 文字列
location = [42.266271, -72.6700016];                         // 配列
location = {lat: 42.266271, lng: -72.6700016};               // オブジェクトリテラル

Restaurants.find({where: {geo: {near: location }}}, function callback(...
```

### near ( _距離による制限_ と並び替え)

near フィルタは２つの追加プロパティをとることができます。

*   `maxDistance`
*   `unit`

`maxDistance`がフィルタに含まれると、nearは典型的なwhereフィルタのように動作し、その結果を与えられた距離内のものに限定します。
既定では、`maxDistance` は距離をマイル単位で測定します。

与えられた位置情報から2マイル以内にある全てのレストランを見つける例：

```javascript
var userLocation = new GeoPoint({
  lat: 42.266271,
  lng: -72.6700016
});
var resultsPromise = Restaurants.find({
  where: {
    location: {
      near: userLocation,
      maxDistance: 2
    }
  }
});
```

To change the units of measurement, specify `unit` property to one of the following:
測定単位を変更するには、`unit` プロパティを次のいずれかに指定します。

* `kilometers`
* `meters`
* `miles`
* `feet`
* `radians`
* `degrees`

たとえば、上記の検索をマイルの代わりにキロメートルを使用するように変更するには、次のようにします。

```javascript
var resultsPromise = Restaurants.find({
  where: {
    location: {
      near: userLocation,
      maxDistance: 2,
      unit: 'kilometers'
    }
  }
});
```

{% include warning.html content="スペルミスに注意！

`unit` の値が誤って入力された場合、例えば `'miles'` の代わりに `'mile'`と入力すると、ループバックは黙ってフィルタを無視します！
" %}

### like と nlike

like と nlike（not like）演算子を使用すると、SQLの正規表現に一致させることができます。正規表現の形式は、バックエンドのデータソースによって異なります。

like演算子の例：

```javascript
Post.find({where: {title: {like: 'M.-st'}}}, function (err, posts) { ... });
```

nlike演算子の例：

```javascript
Post.find({where: {title: {nlike: 'M.-XY'}}}, function (err, posts) {
```

memoryコネクタを使うとき：

```javascript
User.find({where: {name: {like: '%St%'}}}, function (err, posts) { ... });
User.find({where: {name: {nlike: 'M%XY'}}}, function (err, posts) { ... });
```

### 大文字小文字を区別しない like と nlike

```javascript
var pattern = new RegExp('.*'+query+'.*', "i"); /* case-insensitive RegExp search */
Post.find({ where: {title: { like: pattern} } },
```

REST API経由：

```
?filter={"where":{"title":{"like":"someth.*","options":"i"}}}
```

### ilike と nilike

ilikeとnilike（not ilike）演算子は、大文字小文字を区別しない正規表現によるマッチを可能にします。これは、memoryコネクタと Postgresqlコネクタでのみサポートされています。

ilike演算子の例：

```javascript
Post.find({where: {title: {ilike: 'm.-st'}}}, function (err, posts) { ... });
```

nilike演算子の例：

```javascript
Post.find({where: {title: {nilike: 'm.-xy'}}}, function (err, posts) {
```

memoryコネクタを使う場合：

```javascript
User.find({where: {name: {ilike: '%st%'}}}, function (err, posts) { ... });
User.find({where: {name: {nilike: 's%xy'}}}, function (err, posts) { ... });
```

Postgresqlコネクタを使う場合：

```javascript
User.find({where: {name: {ilike: 'john%'}}}, function (err, posts) { ... });
```

### inq

inq 演算子は、指定されたプロパティの値が、与えられた配列の値のいずれかと等しいかどうかを検査します。
一般的な構文は以下のとおりです。

```javascript
{where: { property: { inq: [val1, val2, ...]}}}
```

ここで、

* _property_ は、検索されるモデル内のプロパティ（フィールド）の名前です。
* _val1, val2_ などは配列内のリテラル値です。

inq 演算子の例：

```javascript
Posts.find({where: {id: {inq: [123, 234]}}}, 
  function (err, p){... });
```

REST:

```
/medias?filter[where][keywords][inq]=foo&filter[where][keywords][inq]=bar
```

または

```
?filter={"where": {"keywords": {"inq": ["foo", "bar"]}}}
```
