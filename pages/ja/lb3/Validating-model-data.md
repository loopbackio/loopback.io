---
title: "モデルのデータを検証する"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Validating-model-data.html
summary:
---

_スキーマ_ は、例えばモデルが対応するデータベースのテーブルにデータを保存できるように、モデルに制約を課します。

モデルは、データベースのようなデータストアにデータを渡す前に、バックエンドスキーマに適しているか、それを検証することができます。

## モデルにスキーマを追加する

データを検証する方法の一つは、モデルにスキーマを作ることです。すると、LoopBackはスキーマ定義に適したデータになっているかどうか確認するようになります。
たとえば、productモデルがあるとします。以下のコードはスキーマを定義し、それをproductモデルに割り当てています。
スキーマは２つのプロパティを定義します。name は必須の文字列プロパティであり、price は任意の数値プロパティです。

{% include code-caption.html content="common/models/product.js" %}
```javascript
var productSchema = {
  "name": { "type": "string", "required": true },
  "price": "number"
};
var Product = Model.extend('product', productSchema);
```

クライアントが、追加のプロパティ（例えば、`description`）を持つproductを保存しようとした場合、これらのプロパティはアプリケーションがモデルのデータを保存する前に削除されます。
また、`name` は必須の値であるため、`name`プロパティに値を持つproduct _だけ_ が保存されます。

## 検証メソッドを使用する

永続的なデータソースに紐付いている全てのモデルは、[Validatable](http://apidocs.loopback.io/loopback-datasource-juggler/#validatable) 由来の検証メソッドを持っています。

<table>
  <tbody>
    <tr>
      <th>メソッド</th>
      <th>説明</th>
    </tr>
    <tr>
      <td><a href="https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validatesabsenceof" class="external-link" rel="nofollow">validatesAbsenceOf</a></td>
      <td>１以上の指定したプロパティが存在しないことを検証する。プロパティに値がない場合に成功する。検証するフィールドがブランクでない場合、失敗する。</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validatesexclusionof" class="external-link" rel="nofollow">validatesExclusionOf</a></td>
      <td>含まれないことを検証する。プロパティの値は、指定された配列にない値である必要がある。</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validatesformatof" class="external-link" rel="nofollow">validatesFormatOf</a></td>
      <td>
        <p>Validate format. Require a model to include a property that matches the given format.</p>
        <p>書式を検証する。モデルは、与えられた書式にマッチするプロパティを持つ必要がある。</p>
      </td>
    </tr>
    <tr>
      <td><a href="https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validatesinclusionof" class="external-link" rel="nofollow">validatesInclusionOf</a></td>
      <td>含まれることを検証する。プロパティの値は、指定された配列に含まれる値である必要がある。</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validateslengthof" class="external-link" rel="nofollow">validatesLengthOf</a></td>
      <td>
        <p>長さを検証する。値の長さが指定された範囲にある必要がある。"min"・"max"・"is"の３種類の検証がある。 既定のエラーメッセージは以下の通り。</p>
        <ul>
          <li>min: too short</li>
          <li>max: too long</li>
          <li>is: length is wrong</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validatesnumericalityof" class="external-link" rel="nofollow">validatesNumericalityOf</a></td>
      <td>数値であることを検証する。プロパティの値が整数か数字である必要がある。</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validatespresenceof" class="external-link" rel="nofollow">validatesPresenceOf</a></td>
      <td>１つ以上のプロパティに値があることを検証する。プロパティに値がある場合に成功する。検証するフィールドがブランクである場合、失敗する。</td>
    </tr>
    <tr>
      <td><a href="https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validatesuniquenessof" class="external-link" rel="nofollow">validatesUniquenessOf</a></td>
      <td>
        <p>唯一性を検証する。プロパティの値がモデルの中で唯一であることを検証する。全てのコネクタで利用できるわけではない。現在、以下のコネクタでのみ使用可能。</p>
        <ul>
          <li>In Memory</li>
          <li>Oracle</li>
          <li>MongoDB</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href="https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validatesDateOf" class="external-link" rel="nofollow">validatesDateOf</a></td>
      <td>
        <p>プロパティの値が日付であるかどうか検証する。プロパティの値がDate型である必要がある。</p>
      </td>
    </tr>
  </tbody>
</table>

これらのメソッドを使って、個別のデータ検証を以下のように実施する。

### Options オブジェクト

ほとんどの検証メソッドは、`options` 引数を受け取ります。このプロパティは、使用するメソッドによって様々です。しかし、全てのメソッドに共通して２つのプロパティを持ちます。

- `message` - 検証が失敗した時に使われるエラーメッセージを既定のもの以外にする時に使用する。
- `allowNull` - null値が許容されるかどうか。

### 例

{% include code-caption.html content="common/models/user.js" %}
```javascript
module.exports = function(user) {
  user.validatesPresenceOf('name', 'email');
  user.validatesLengthOf('password', {min: 5, message: {min: 'Password is too short'}});
  user.validatesInclusionOf('gender', {in: ['male', 'female']});
  user.validatesExclusionOf('domain', {in: ['www', 'billing', 'admin']});
  user.validatesNumericalityOf('age', {int: true});
  user.validatesUniquenessOf('email', {message: 'email is not unique'});
};
```

{% include tip.html content="
検証メソッドは[`isValid()`](http://apidocs.loopback.io/loopback-datasource-juggler/#validatable-prototype-isvalid)が呼び出された時や、モデルのインスタンスが作成されたり更新されたりした時に自動的に呼び出されます。データを検証するために `isValid()` を呼び出す必要はありません。
[`upsert()`](http://apidocs.loopback.io/loopback/#persistedmodel-upsert) メソッドを呼出した時に制約の検証を強制するには、[モデル定義JSONファイル](Model-definition-JSON-file.html) で `validateUpsert` オプションを `true` にセットしてください。
既定では、[モデル生成ツール](Model-generator.html)はこのプロパティをtrueにセットします。
" %}

明示的に制約の検証を呼び出すには、[`isValid()`](http://apidocs.loopback.io/loopback-datasource-juggler/#validatable-prototype-isvalid) を呼出します。

例えば以下のようにします。

```javascript
user.isValid(function (valid) {
  if (!valid) {
    user.errors // hash of errors {attr: [errmessage, errmessage, ...], attr: ...}
  }
```

検証ルールを定義する別の例として、正規表現を使用します。

{% include code-caption.html content="common/models/user.js" %}
```javascript
var re = /^(([^<>()[\]\\.,;:\s@\"]-(\.[^<>()[\]\\.,;:\s@\"]-)*)|(\".-\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]-\.)-[a-zA-Z]{2,}))$/;

UserModel.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});
if (!(UserModel.settings.realmRequired || UserModel.settings.realmDelimiter)) {
  UserModel.validatesUniquenessOf('email', {message: 'Email already exists'});
  UserModel.validatesUniquenessOf('username', {message: 'User already exists'});
}
```

新しいモデルを作成するときに検証を追加する時は、`isValid()` を呼び出す必要は _ありません_ 。
単に検証ルールの呼出しを追加するだけで、OKです。

{% include code-caption.html content="common/models/MyModel.js" %}
```javascript
module.exports = function(MyModel) {
  MyModel.validatesLengthOf('name', { min: 5, message: { min: 'Name should be 5- characters' } });
  //...
};
```

妥当性をチェックするためのアドホックな方法として、`isValid()`を使用できます。
また、独自の検証関数と [`validate()`](https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validate) や
[`validateAsync()`](https://apidocs.loopback.io/loopback-datasource-juggler/#validatable-validateasync) メソッドを呼び出すことも可能です。

## 検証メッセージをローカライズする

サーバから返されるエラーレスポンスを変更するように、クライアント上のエラーメッセージをローカライズすることができます。
検証エラーのレスポンスは、`error.details.codes` にエラーコードを持っているので、クライアントではローカライズしたメッセージにこれらのエラーを割り当てることができます。

エラーレスポンスの例は以下のとおりです。

{% include code-caption.html content="error.details.codes" %}
```javascript
{
  "name": "ValidationError",
  "status": 422,
  "message": "The Model instance is not valid. See error object `details` property for more info.",
  "statusCode": 422,
  "details": {
    "context": "user",
    "codes": {
      "password": [
        "presence"
      ],
      "email": [
        "uniqueness"
      ]
   },
    "messages": {
      "password": [
       "can't be blank"
     ],
      "email": [
        "Email already exists"
      ]
    }
  }
}
```
