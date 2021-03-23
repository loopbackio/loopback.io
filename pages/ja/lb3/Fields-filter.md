---
title: "Fields フィルタ"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Fields-filter.html
summary:
---

_fields_ フィルタは、結果に含める、または結果から除外するプロパティ（フィールド）を指定します。

### REST API

<pre>
filter[fields][<i>propertyName</i>]=<true|false>&filter[fields][<i>propertyName</i>]=<true|false>...
</pre>

RESTに複数のフィールドを含めるには、複数のフィルタを使用することに注意してください。

また、REST検索で[文字列化したJSON形式](Querying-data.html#using-stringified-json-in-rest-queries)を使用することもできます。

### Node API

{% include content/ja/angular-methods-caveat.html %}

<pre>
{ fields: {<i>propertyName</i>: <true|false>, <i>propertyName</i>: <true|false>, ... } }
</pre>

ここで、

* _propertyName_ は含める、または除外するプロパティ（フィールド）の名前と同じです。
* `<true|false>` は、`true` または `false` の真偽値リテラルを表します。プロパティを結果に含めるには `true` を、結果から除外するには `false` を使います。

既定では、検索は結果内のすべてのモデルプロパティを返します。ただし、値が `true`のfieldsフィルタを１つでも指定すると、既定では、特にフィルタに含まれているフィールド **のみ** が検索されます。

### 例

`id`・`make`・`model`プロパティのみを返します。

**REST**

`?filter[fields][id]=true&filter[fields][make]=true&filter[fields][model]=true`

{% include code-caption.html content="Node API" %}
```javascript
{ fields: {id: true, make: true, model: true} }
```

戻り値：

```javascript
[{
    "id": "1",
    "make": "Nissan",
    "model": "Titan"
  }, {
    "id": "2",
    "make": "Nissan",
    "model": "Avalon"
  },
  ...
]
```

`vin` プロパティを除外します。

**REST**

`?filter[fields][vin]=false`

{% include code-caption.html content="Node API" %}
```javascript
{ fields: {vin: false} }
```
