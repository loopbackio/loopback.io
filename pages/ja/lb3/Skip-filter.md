---
title: "Skip フィルタ"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Skip-filter.html
summary:
---

skip フィルタは、返されたレコードから指定された件数分を消去します。これは、例えば、ページごとのレスポンスに役立ちます。

`skip` の別名として `offset` が使えます。

{% include content/ja/angular-methods-caveat.html %}

### REST API

<pre>
?filter[skip]=<i>n</i>
</pre>

REST検索で、[文字列化したJSON形式](Querying-data.html#using-stringified-json-in-rest-queries)を使うこともできます。

### Node

<pre>
{skip: <i>n</i>}
</pre>

ここで、 _n_ はスキップするレコード件数です。

### 例

このREST リクエストは、返されたレコードから最初の50件を飛ばします。

`/cars?filter[skip]=50`

Node APIを使った等価な検索は以下のようになります。

```javascript
Cars.find( {skip: 50},  function() { /* ... */ } )
```

**ページめくりの例**

以下のRESTリクエストは、検索結果をページごとに分割する方法を説明したものです。
それぞれのリクエストは10件のレコードを返します。最初は先頭の10件、次は11件目から20件目、といった具合です。

```
/cars?filter[limit]=10&filter[skip]=0
/cars?filter[limit]=10&filter[skip]=10
/cars?filter[limit]=10&filter[skip]=20
...
```

Node APIでは以下のようになります。

```javascript
Cars.find({limit: 10, skip: 0},  function() { /* ... */ });
Cars.find({limit: 10, skip: 10}, function() { /* ... */ });
Cars.find({limit: 10, skip: 20}, function() { /* ... */ });
```
