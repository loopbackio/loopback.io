---
title: "Include フィルタ"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Include-filter.html
summary:
---

**参照**: [関連するモデルの検索](Querying-related-models.html).

_include_ フィルタを使用すると、検索の結果に関連するモデルを含めることができます。例えば、モデルがbelongsToや、hasManyの関係を持つとき、要求の回数を最適化できます。
詳細は、[モデルの関連を作成する](Creating-model-relations.html)を参照してください。

include フィルタの値は、文字列、配列、またはオブジェクトのいずれかです。

{% include important.html content="_include_ フィルタは `find()`・`findOne()`・`findById()`メソッドで使用できます。
" %}

### **REST API**

<pre>
filter[include][_relatedModel_]=_propertyName_
</pre>

REST検索で[文字列化したJSON形式](Querying-data.html#using-stringified-json-in-rest-queries) を利用することもできます。

### Node API

{% include content/ja/angular-methods-caveat.html %}

```javascript
{include: 'relatedModel'}
{include: ['relatedModel1', 'relatedModel2', ...]}
{include: {relatedModel1: [{relatedModel2: 'relationName'} , 'relatedModel']}}
```

ここで、

* _relatedModel_・_relatedModel1_・_relatedModel2_ は関連するモデルの名前（複数形）です。
* _relationName_ 関連するモデルにおける関連の名前です。

### 例

フィルタリングなしに関連を含める。

```javascript
User.find({include: 'posts'}, function() { /* ... */ });
```

全ユーザの投稿と注文を返す。追加のリクエストは２回。

```javascript
User.find({include: ['posts', 'orders']}, function() { /* ... */ });
```

全ての投稿の所有者（ユーザ）と、それぞれの所有者の全注文を返す。

```javascript
Post.find({include: {owner: 'orders'}}, function() { /* ... */ });
```

全ての投稿の所有者（ユーザ）と、それぞれの所有者の全友達と全注文を返す。

```javascript
Post.find({include: {owner: ['friends', 'orders']}}, function() { /* ... */ });
```

全ての投稿の所有者（ユーザ）と、それぞれの所有者の全投稿と全注文を取得する。投稿には画像を含める。

```javascript
Post.find({include: {owner: [{posts: 'images'} , 'orders']}}, function() { /* ... */ });
```

#### Include with filters

場合によっては、結果に含まれる関連モデルにフィルタを適用することができます。

{% include note.html content="

関連モデルにフィルタを適用すると、検索は最初のモデルから返す結果と、フィルタ検索によって得られた関連モデルの全結果を合わせたものになります。
これは、SQLの「left join」に似ています。

" %}

LoopBack は（例えば）以下のような構文をサポートします。

```javascript
Post.find({
  include: {
    relation: 'owner', // owner オブジェクトを含める。
    scope: { // owner オブジェクトへの更なるフィルタ
      fields: ['username', 'email'], // ２つのフィールドしか取得しない。
      include: { // owner の orders を含める。
        relation: 'orders', 
        scope: {
          where: {orderId: 5} // idが５の注文に絞り込む。
        }
      }
    }
  }
}, function() { /* ... */ });
```

現実世界のシナリオでは、ユーザーは `$authenticated` または `$owner` ロールのみに属しており、`findById()` を使うアクセス権を持つ必要があります。
たとえば、次の例では、フィルタを使用してページネーションを実行しています。

```javascript
Post.findById('123', {
  include: {
    relation: 'orders',
    scope: { // ここでは、「最初のページ」を取得して、データを５件ずつ取得します。
      skip:0,
      limit:5
    }
  }
}, function() { /* ... */ });
```

#### 含まれているオブジェクトにアクセスする

Node.js APIでは、`toJSON()`を呼出して、関連項目と共に返されたモデルインスタンスを変換して、プレーンなJSONオブジェクトに変換します。例えば以下のようにします。

```javascript
Post.find({include: {owner: [{posts: 'images'} , 'orders']}}, function(err, posts) {
 posts.forEach(function(post) {
   // post.owner は、ownerのインスタンスの代わりに、関連についてのメソッドを指している。
   var p = post.toJSON();
   console.log(p.owner.posts, p.owner.orders);
 });
 //... 
});
```

`post.owner`のような関連プロパティは、関係メソッドとしてJavaScriptの **関数** を参照していることに気をつけてください。

#### REST examples

これらの例は、顧客モデルと hasManyの関連をもつレビューモデルがあると仮定してのものです。

全ての顧客を、自分のレビューを含めて返します。

`/customers?filter[include]=reviews`

全ての顧客を、自分のレビューを含め、さらにレビューに作者を含めて返します。

`/customers?filter[include][reviews]=author`

年齢が21である全ての顧客と、それらの全レビューに、作者を含めて返します。

`/customers?filter[include][reviews]=author&filter[where][age]=21`

顧客のうち最初の２件と、それらのレビューに、作者を含めて返します。

`/customers?filter[include][reviews]=author&filter[limit]=2`

全ての顧客と、それに関連する全てのレビューと注文を含めて返します。

`/customers?filter[include]=reviews&filter[include]=orders`
