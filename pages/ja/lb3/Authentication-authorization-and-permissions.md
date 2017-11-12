---
title: "認証・認可・パーミッション"
lang: ja
layout: navgroup
toc_level: 2
navgroup: user-mgmt
keywords: LoopBack
tags: authentication
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Authentication-authorization-and-permissions.html
summary: LoopBack は組み込みのトークンに基づく認証が含まれています。
---

多くのアプリケーションは、誰（何）がデータにアクセスしたりサービスを呼出したりできるのかを制御する必要があります。
一般的に、これは保護されたデータにアクセスするために、ユーザにログインを求めたり、アプリケーションに認証トークンを求めたりすることを含みます。

LoopBackのアクセス制御の実装に関する単純な例は、GitHubの
[loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control) リポジトリを参照してください。

LoopBack アプリケーションはモデル（[モデルの定義](Defining-models.html)を参照）を通じてデータにアクセスするため、
データへのアクセス制御は、モデルに制限を加えることを意味します。
つまり、誰または何がデータを読み書きできるのか、モデルのメソッドを実行できるのか指定する、ということです。

## アクセス制御の概念

LoopBackのアクセス制御システムは、幾つかの核となる概念から構成されています。以下の表にまとめます。

| 用語 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 説明 | 責任 | 例 |
|---|---|---|---|
| プリンシパル | 識別されたり認証されたりできる実体 | 保護されたリソースへの要求のIDを表します。 | ユーザー <br/> アプリケーション <br/> ロール (ロールもまたプリンシパルであることに注意してください) |
| ロール | 同じパーミッションを持つプリンシパルのグループ | プリンシパルを扱いやすくグループにまとめる。 | **動的ロール**: <br/>`$everyone` (すべてのユーザー) <br/>`$unauthenticated` (認証されていないユーザー) <br/> `$owner` (モデルのインスタンスを所有するプリンシパル), 可能ならば、<br/>&nbsp;&nbsp;&#9702; `userId` と呼ばれる単純なID<br/>&nbsp;&nbsp;&#9702; `owner` と呼ばれる単純なプロパティ<br/>&nbsp;&nbsp;&#9702; Userを拡張したモデルとの関係 <br/><br/> **静的ロール**: 管理者 (管理者向けに定義されたロール) |
| ロールマッピング | ロールに割り当てたプリンシパル | ロールに静的に割り当てたプリンシパル | ID 1 のユーザをロール 1 に割り当てる<br/> 「管理者」ロールをロール 1 に割り当てる |
| ACL | アクセス制御リスト | プリンシパルがモデルに対して幾つかの操作を行えるか制御するもの | project モデルに対する全ユーザのアクセスを拒否する<br/> 「管理者」ロールに、project モデルに対する `find()` メソッドの実行を許可する |

## 一般的な手続き

アプリケーションにアクセス制御を実装する一般的な手続きは以下のとおりです。

1.  **認証の実装**
    アプリケーションにおいて、新しいユーザーを作成（登録）し、ユーザーがログイン（認証トークンを取得・使用）し、ユーザがログアウトするコードを追加します。
2.  **ユーザーロールの設定**
    アプリケーションが必要とするユーザーのロールを定義します。
    例えば、匿名ユーザー・認証済みユーザー・グループメンバー・管理者のようなロールを作るかもしれません。
3.  **各ロール・モデルのメソッドについて、アクセス可能かどうかを決める**.
    例えば、匿名ユーザーには銀行のリストを読み取ることを許可して、他はすべて禁止するかもしれません。
    LoopBackのモデルは、組み込みのメソッド一式を持っており、それぞれのメソッドは、読み取りまたは書き込みのどちらかのアクセス種別に当たります。
    本質的には、このステップでは各ロールと各モデルのアクセス種別ごとに、どのアクセスが許可されるかを指定する事になります。後ほど例を示します。<br/><br/>
		注：アクセス権を特定のユーザーやアプリケーションに直接割り当てることもできます。
4.  **ユーザーのアクセス制御をセットアップします**.  以下のいずれか一つを実施します。
  - ロールモデルを使って事前に作成したロールに、ユーザを静的に割り当てる。詳細は、[静的ロール](Defining-and-using-roles.html#static-roles)を参照。
  - 事前に設定された条件に基づいて、ユーザがロールを持つかどうかを実行時に解決する、動的ロールリゾルバを登録するコードを追加する。詳細は、[動的ロール](Defining-and-using-roles.html#dynamic-roles)を参照。

## 初期セットアップ

### アクセス制御を有効にする

LoopBackの[アプリケーション生成ツール](Application-generator.html)で作成したアプリケーションは、
アプリケーション種別に「空のサーバ」を選んだ場合を _除き_ 、既定でアクセス制御が有効になっています。
「空のサーバ」アプリケーションで、アクセス制御を有効にするには、起動スクリプトで
[`enableAuth()`](https://apidocs.loopback.io/loopback/#app-enableauth)を呼び出すようにします。

{% include code-caption.html content="server/boot/authentication.js" %}
```javascript
module.exports = function enableAuthentication(server) {
  server.enableAuth();
};
```

### アクセス制御モデルを準備する

セットアップするには、`User`モデルを（そしておそらくは`AccessToken`モデルも）設定しなければなりません。

ベストプラクティスは、組み込みの`User`モデルをそのまま使うのではなく、[組み込みモデルの利用](Using-built-in-models.html#user-model) にあるように、
それを拡張した独自ユーザモデルを少なくとも１つ実装することです。

通常、組み込みの`Role`・`RoleMapping`・`ACL`モデルを拡張したりカスタマイズしたりする必要はありません。`model-config.json` 設定ファイルで
それらが宣言されていることを確認してください。`AccessToken`モデルをカスタマイズする必要がなければ、`enableAuth()`メソッドにデータソースを渡してください。

```javascript
server.enableAuth({ datasource: 'db' });
```

{% include note.html content="ここで示したように`datasource`を`enableAuth()`メソッドに渡すと、LoopBackがアクセス制御機能に必要な組み込みモデルが全て揃っているかを確認できます。多くのアプリケーションにおいてこれは適切な動作です。
" %}

{% include tip.html content="組み込みの`User`モデルを拡張したモデルをいくつ使うかによって、以下に示すように、組み込みの `AccessToken` モデルを使うことも、`AccessToken`を拡張した独自モデルを使うこともできます。
" %}

#### 単一ユーザモデルによるアクセス制御

最も一般的なシナリオでは、アプリケーションは組み込みの`User`モデルを拡張したモデルをひとつだけと、組み込みの`AccessToken`モデルを使います。
この場合、組み込み`AccessToken`モデルの「belongsTo」関係を、独自のユーザモデルを参照するように変更する必要があります。
これを行うには、以下のように`server/model-config.json`ファイルを編集してください。

{% include code-caption.html content="server/model-config.json" %}
```json
{
  // ...
  "AccessToken": {
    "dataSource": "db",
    "public": false,
    "relations": {
      "user": {
        "type": "belongsTo",
        "model": "user",
        "foreignKey": "userId"
      }
    }
  }
  // ...
}
```

{% include tip.html content="モデルを拡張したとき、モデルの関係は保存されます。従って、独自の`User`モデルも自動的に、既定の`AccessToken` モデルと
hasMany 関係を持ちます。
" %}

##### AccessTokenモデルのカスタマイズ

`AccessToken`モデルをカスタマイズする必要がある場合、例えば追加のプロパティを増やしたいときなどは、
認証のために新しい`AccessToken`モデルを使うように`User`モデルを変更する必要があります。

独自の`User`モデル定義ファイルにおいて、`relations`セクションの「accessTokens」関係が独自の`AccessToken`モデルを使うように設定してください。

{% include code-caption.html content="common/models/custom-user.json" %}
```json
{
  "name": "CustomUser",
  "base": "User",
  // ...
  "relations": {
    "accessTokens": {
      "type": "hasMany",
      "model": "AccessToken",
      "foreignKey": "userId",
      "options": {
        "disableInclude": true
      }
    }
  },
  // ...
}
```

#### 複数のユーザーモデルを使ったアクセス制御

全く異なるタイプのユーザーがいるアプリケーションでは、複数のユーザーモデルを必要とするかもしれません。

ユーザーの違いが、幾つかのプロパティにとどまるのであれば、必要なプロパティを全て持つ単一の独自ユーザーモデルを上書きして、ユーザー種別ごとに静的ロールを
割り当ててアクセス制御の振る舞いの違いを表すのが最も簡単な方法です。

しかし、異なるアクセス権や他のモデルとの関係が異なっていたり、それぞれのプロパティがかけ離れている場合など、複数の独立したユーザーモデルが必要になるかもしれません。たとえば、組織の概念が関係するアプリケーションでは、関係の絡み合った階層やアクセス制御を作成するでしょう。

以下のような例を考えます。

- **アプリケーション** には複数の`Users`が属する。_app-admins, app-managers, app-auditors, など_  
- **アプリケーション** には複数の組織が属する。
- **組織** には複数の `Users` が属する。 _org-admins, org-managers, org-marketing, org-sales_  
- **組織** には複数の顧客 (`Users`でもある) が属する。

このようなアプリケーションでは３つの異なるユーザー種別が必要です。

- `App-Managers`
- `Org-Managers`
- `Org-Customers`

それぞれのユーザー種別は、アプリケーションを構成するモデルと異なる関係を持ち、異なるアクセス権を持ちます。

##### セットアップ

{% include important.html content="When using multiple user models, you should not let LoopBack auto-attach built-in models required by the access control feature.  Instead, call the `enableAuth()` method with no argument and manually define all models required in the `server/model-config.json` configuration file.
" %}

To use several models extending the built-in `User` model, you must modify the relations between the `users` models and the `AccessToken` models to allow a single `AccessToken` model to host access tokens for multiple types of users while at the same time allowing each `user` model instance to be linked to unique related access tokens.  

This is achieved by changing the **hasMany** relation from `User` to `AccessToken` and the **belongsTo** relation from `AccessToken` to `User` by their [polymorphic](Polymorphic-relations.html) equivalents, in which the `principalType` property is used as a _discriminator_ to resolve which of the potential `user` model instance an 'accessToken' instance belongs to. In addition to having custom user models this requires you also define a **custom AccessToken** model extending the built-in `AccessToken` model.

{% include note.html content="Adapt the following configuration snippets in your custom `users` and `accessToken` model definitions.
"%}

{% include code-caption.html content="common/models/any-custom-user.json" %}
```json
{
  "name": "AnyCustomUser",
  "base": "User",
  // ..
  "relations": {
    "accessTokens": {
      "type": "hasMany",
      "model": "CustomAccessToken",
      "polymorphic": {
        "foreignKey": "userId",
        "discriminator": "principalType"
      },
      "options": {
        "disableInclude": true
      }
    }
  },
  // ..
}
...
```

{% include code-caption.html content="common/models/custom-access-token.json" %}
```json
{
  "name": "CustomAccessToken",
  "base": "AccessToken",
  // ..
  "relations": {
    "user": {
    "type": "belongsTo",
      "idName": "id",
      "polymorphic": {
        "idType": "string",
        "foreignKey": "userId",
        "discriminator": "principalType"
      }
    }
  },
  // ...
}
```

{% include important.html content="
In particular, pay attention to:  

*  The `model` name used to refer to the access token model in the different user models (here named \"CustomAccessToken\")
*  The `idName` used for the foreignKey in the access token model referring to the user instance (here named \"id\")
*  The `idType` used for this foreignKey, according to the type of connector used for the related user models (here using \"string\" for a MongoDB connector for example)
*  Use \"principalType\" for the `discriminator` name. This is mandatory and cannot be changed
" %}

Don't forget to specify the custom `accessToken` model as follows:

{% include code-caption.html content="server/middleware.json" %}
```json
{
  // ...
  "auth": {
    "loopback#token": {
      "params": {
        "model": "CustomAccessToken"
      }
    }
  }
  // ...
}
```

**Note**: Alternatively, you can put these lines in the `server.js` file or in a boot script, once again paying attention to the _name_ of the custom `accessToken` model.

{% include code-caption.html content="server/server.js" %}
```javascript
var loopback = require('loopback');
...
app.use(loopback.token({
  model: app.models.CustomAccessToken
}));
```

{% include tip.html content="From this point you should be able to use LoopBack access control over multiple user models extending the built-in `User` model, with barely no modification compared to the way you're used to handle it with a single user model.  
" %}

##### Methods and parameters impacted when using multiple user models

{% include important.html content="
Pay attention to the following methods and parameters impacted by the switch to multiple user models support.
" %}

Anytime a method is expecting the **principalType** for a principal of the `User` type (as-is or nested in an [AccessContext](https://apidocs.loopback.io/loopback/#accesscontext) object), provide the name of the targeted `user` model name (e.g. `'oneCustomUserModelName'`) instead of the usual `Principal.USER` (or `'USER'`).<br>
Such methods include: `Role.getRoles()` and `Role.isInRole()`. For example:

```javascript
Role.getRoles({
  principalType: 'oneCustomUserModelName',
  principalId: 123,
});
```

`Role` instance method `Role.prototype.users()`: the method which return all the users mapped with a given role instance should now be called with the following syntax:

```javascript
roleInstance.users({where: {
  principalType: 'oneCustomUserModelName'
});
```

`RoleMapping` static methods: these methods either accessed directly or through the relation `principals` of the `Role` model should also use the new `principalType` syntax, for example:

```javascript
roleInstance.principals.create({
  principalType: 'oneCustomUserModelName',
  principalId: 123
});
```

## Exposing and hiding models, methods, and endpoints

To expose a model over REST, set the `public` property to true in `/server/model-config.json`:

```javascript
...
  "Role": {
    "dataSource": "db",
    "public": false
  },
...
```

### Hiding methods and REST endpoints

If you don't want to expose certain create, retrieve, update, and delete operations, you can easily hide them by calling 
[`disableRemoteMethodByName()`](https://apidocs.loopback.io/loopback/#model-disableremotemethodbyname) on the model. 
For example, following the previous example, by convention custom model code would go in the file `common/models/location.js`.
You would add the following lines to "hide" one of the predefined remote methods:

{% include code-caption.html content="common/models/location.js" %}
```javascript
MyModel.disableRemoteMethodByName('deleteById');
```

Now the `deleteById()` operation and the corresponding REST endpoint will not be publicly available.

For a method on the prototype object, such as `updateAttributes()`:

{% include code-caption.html content="common/models/location.js" %}
```javascript
MyModel.disableRemoteMethod('prototype.updateAttributes');
```

{% include important.html content="
Be sure to call `disableRemoteMethodByName()` on your own custom model, not one of the built-in models;
in the example below, for instance, the calls are `MyUser.disableRemoteMethodByName()` _not_ `User.disableRemoteMethodByName()`.
" %}

Here's an example of hiding all methods of the `MyUser` model, except for `login` and `logout`. It assumes `MyUser` is an extended built-in User model:

```javascript
MyUser.disableRemoteMethodByName("upsert");                               // disables PATCH /MyUsers
MyUser.disableRemoteMethodByName("find");                                 // disables GET /MyUsers
MyUser.disableRemoteMethodByName("replaceOrCreate");                      // disables PUT /MyUsers
MyUser.disableRemoteMethodByName("create");                               // disables POST /MyUsers

MyUser.disableRemoteMethodByName("prototype.updateAttributes");           // disables PATCH /MyUsers/{id}
MyUser.disableRemoteMethodByName("findById");                             // disables GET /MyUsers/{id}
MyUser.disableRemoteMethodByName("exists");                               // disables HEAD /MyUsers/{id}
MyUser.disableRemoteMethodByName("replaceById");                          // disables PUT /MyUsers/{id}
MyUser.disableRemoteMethodByName("deleteById");                           // disables DELETE /MyUsers/{id}

MyUser.disableRemoteMethodByName('prototype.__get__accessTokens');        // disable GET /MyUsers/{id}/accessTokens
MyUser.disableRemoteMethodByName('prototype.__create__accessTokens');     // disable POST /MyUsers/{id}/accessTokens
MyUser.disableRemoteMethodByName('prototype.__delete__accessTokens');     // disable DELETE /MyUsers/{id}/accessTokens

MyUser.disableRemoteMethodByName('prototype.__findById__accessTokens');   // disable GET /MyUsers/{id}/accessTokens/{fk}
MyUser.disableRemoteMethodByName('prototype.__updateById__accessTokens'); // disable PUT /MyUsers/{id}/accessTokens/{fk}
MyUser.disableRemoteMethodByName('prototype.__destroyById__accessTokens');// disable DELETE /MyUsers/{id}/accessTokens/{fk}

MyUser.disableRemoteMethodByName('prototype.__count__accessTokens');      // disable  GET /MyUsers/{id}/accessTokens/count

MyUser.disableRemoteMethodByName("prototype.verify");                     // disable POST /MyUsers/{id}/verify
MyUser.disableRemoteMethodByName("changePassword");                       // disable POST /MyUsers/change-password
MyUser.disableRemoteMethodByName("createChangeStream");                   // disable GET and POST /MyUsers/change-stream

MyUser.disableRemoteMethodByName("confirm");                              // disables GET /MyUsers/confirm
MyUser.disableRemoteMethodByName("count");                                // disables GET /MyUsers/count
MyUser.disableRemoteMethodByName("findOne");                              // disables GET /MyUsers/findOne

//MyUser.disableRemoteMethodByName("login");                                // disables POST /MyUsers/login
//MyUser.disableRemoteMethodByName("logout");                               // disables POST /MyUsers/logout

MyUser.disableRemoteMethodByName("resetPassword");                        // disables POST /MyUsers/reset
MyUser.disableRemoteMethodByName("setPassword");                          // disables POST /MyUsers/reset-password
MyUser.disableRemoteMethodByName("update");                               // disables POST /MyUsers/update
MyUser.disableRemoteMethodByName("upsertWithWhere");                      // disables POST /MyUsers/upsertWithWhere
```

### Read-only endpoints example

You may want to only expose read-only operations on your model; in other words hiding all operations that use HTTP POST, PUT, DELETE method.

**common/models/model.js**

```js
Product.disableRemoteMethodByName('create');		// Removes (POST) /products
Product.disableRemoteMethodByName('upsert');		// Removes (PUT) /products
Product.disableRemoteMethodByName('deleteById');	// Removes (DELETE) /products/:id
Product.disableRemoteMethodByName("updateAll");		// Removes (POST) /products/update
Product.disableRemoteMethodByName("prototype.updateAttributes"); // Removes (PUT) /products/:id
Product.disableRemoteMethodByName("prototype.patchAttributes");  // Removes (PATCH) /products/:id
Product.disableRemoteMethodByName('createChangeStream'); // Removes (GET|POST) /products/change-stream
```

### Hiding endpoints for related models

To disable REST endpoints for related model methods, use [disableRemoteMethodByName()](https://apidocs.loopback.io/loopback/#model-disableremotemethodbyname).

{% include note.html content="For more information, see [Accessing related models](Accessing-related-models.html).
" %}

For example, if there are post and tag models, where a post hasMany tags, add the following code to `/common/models/post.js` 
to disable the remote methods for the related model and the corresponding REST endpoints: 

{% include code-caption.html content="common/models/model.js" %}
```javascript
module.exports = function(Post) {
  Post.disableRemoteMethodByName('prototype.__get__tags');
  Post.disableRemoteMethodByName('prototype.__create__tags');
  Post.disableRemoteMethodByName('prototype.__destroyById__accessTokens'); // DELETE
  Post.disableRemoteMethodByName('prototype.__updateById__accessTokens'); // PUT
};
```

### Hiding properties

To hide a property of a model exposed over REST, define a hidden property.
See [Model definition JSON file (Hidden properties)](Model-definition-JSON-file.html#hidden-properties).

{% include content/ja/hidden-vs-protected.html xref='true' %}
