---
title: "Limit フィルタ"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Limit-filter.html
summary:
---

_limit_ フィルタは返されるレコードの件数を指定した数（またはそれ未満）に制限します。

{% include content/ja/angular-methods-caveat.html %}

### REST API

<pre>
filter[limit]=<i>n</i>
</pre>

REST検索の[文字列化したJSON形式](Querying-data.html#using-stringified-json-in-rest-queries) を参照してください。

### Node API

<pre>
{ limit: <i>n</i> }
</pre>

ここで _n_ は返される結果（レコード）の最大値です。

### 例

検索結果のうち、最初の５件だけを返します。

**REST**

`/cars?filter[limit]=5`

{% include code-caption.html content="Node API" %}
```javascript
Cars.find({limit: 5},  function() {
    //...
})
```
