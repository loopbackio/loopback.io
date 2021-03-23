---
title: "リモートメソッド"
lang: ja
layout: navgroup
toc_level: 2
navgroup: app-logic
keywords: LoopBack
tags: [models, application_logic]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Remote-methods.html
summary: リモートメソッドは、独自のRESTエンドポイントを通じて公開される、モデルの静的メソッドです。

---
## 概要

_リモートメソッド_ は、独自のRESTエンドポイントを通じて公開される、モデルのメソッドです。
LoopBackの[標準モデルREST API](PersistedModel-REST-API.html)で提供されていない操作を行うには、リモートメソッドを使います。

{% include note.html content="リモートメソッドを定義する最も簡単な方法は、コマンドラインで[リモートメソッド生成ツール](Remote-method-generator.html)を使うことです。リモートメソッドを定義することの導入的なサンプルは、はじめににある[APIを拡張する](Extend-your-API.html) を参照してください。
" %}

## モデルにリモートメソッドを追加する方法

モデルにリモートメソッドを追加するには、以下のようにします。

1. [モデル拡張ファイル](Model-extension-file.html) に関数を作成します。メソッド名によってリモートメソッドが静的メソッドかインスタンスメソッドか決まります。メソッド名が`prototype.`で始まるものは、インスタンスメソッドになります。さもなくば、静的メソッドになります。**注**：既定では、リモートメソッドは静的です。インスタンスメソッドを作るには、メソッド名の先頭に`prototype.`を指定しなければなりません。

1.  以下の方法のいずれかで、リモートメソッドを登録します。
   - [モデル定義JSONファイル](Model-definition-JSON-file.html)で、JSONを使って登録する。
   詳しくは [JSONにリモートメソッドを登録する](#registering-a-remote-method-in-json)を参照してください。
   - [モデル拡張ファイル](Model-extension-file.html) で、JavaScriptを使って [`remoteMethod()`](http://apidocs.loopback.io/loopback/#model-remotemethod) を呼出して登録する。
   詳しくは、[リモートメソッドをコードで登録する](#registering-a-remote-method-in-code) を参照してください。

### 例

{% include tip.html content="リモートメソッドのその他の例は[APIを拡張する](Extend-your-API.html)を参照してください。
" %}

Perosonモデルが既に存在し、`/greet` というエンドポイントを追加して、リクエストで与えられた名前に対して挨拶を返すようにしたいとします。
`/common/models/person.js`に以下のようなコードを追加してください。

{% include code-caption.html content="/common/models/person.js" %}
```javascript
module.exports = function(Person){

    Person.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Person.remoteMethod('greet', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
    });
};
```

そして、例えば、以下のURLに対して、

```
POST /api/people/greet
```

`{"msg": "John"}` というデータを送信すると、以下のような応答が得られるはずです。

```
Greetings... John!
```

{% include note.html content="上述のとおり、REST API は\"person\"の代わりに\"people\"という複数形を使うように要求します。LoopBackは [REST APIルートとしてモデル名の複数形](Exposing-models-over-REST.html#REST-paths)を公開します。
" %}

## リモートメソッドを登録する

リモートメソッドを登録する方法は２つあります。
- [モデル拡張ファイル](Model-extension-file.html)  (`modelName.js`) に [コードで](#registering-a-remote-method-in-code)。
- [モデル定義JSONファイル](Model-definition-JSON-file.html#methods) (`modelName.json`) に[JSONで](#registering-a-remote-method-in-json)。

### コードでリモートメソッドを登録する

LoopBack のモデルは[`remoteMethod()`](http://apidocs.loopback.io/loopback/#model-remotemethod) という、リモートメソッドを登録する静的メソッドを持っています。

```javascript
Model.remoteMethod(requestHandlerFunctionName, [options])
```

ここで、

* _`model`_ は、リモートメソッドを追加したいモデルオブジェクトです。例えば `Person` などです。
* _`requestHandlerFunctionName`_ はリモートメソッドの名前を指定する文字列です。例えば `'greet'` などです。
* _`options`_ は、RESTエンドポイントを設定するパラメータを指定するオブジェクトです。以下の [オプション](#options) を参照してください。

### JSONでリモートメソッドを登録する

[モデル定義JSONファイル](Model-definition-JSON-file.html#methods) でリモートメソッドを登録するには、
`methods` キーの下にメソッド名を追加します。インスタンスメソッドを定義するには、メソッド名の前に`prototype.`をつけてください。

```
"methods": {
    "prototype.getProfile": {
      "accepts": [],
      "returns": { "arg": "data", "type": "User", "root": true},
      "http": {"verb": "get", "path": "/profile"},
      "accessScopes": ["read", "read:profile"]
    },
    "someStaticMethod" : { ... }
```

`methods`のは以下にあるそれぞれのキーの値は、以下で説明するオプションオブジェクトです。

## オプション

オプション引数は、リモートメソッドがどのように動作するかを定義するJavaScriptオブジェクトです。

{% include content/ja/rm-options.md %}

## リモートメソッドルートを指定する

既定では、リモートメソッドは以下のURLで公開されます。

<pre><code>POST http://<i>apiRoot</i>/<i>modelName</i>/<i>methodName</i></code></pre>

ここで、

* _apiRoot_  はアプリケーションのAPI最上位パスです。
* _modelName_ はモデル名の複数形です。
* _methodName_ は関数の名前です。

上の例に従うと、リモートメソッドは以下のように公開されます。

```
POST /api/people/greet
```

ルートを変更するには、`remoteMethod()` に渡すオプションの `http.path` と `http.verb` プロパティを使います。例えば以下のようにします。

{% include code-caption.html content="/common/models/model.js" %}
```javascript
Person.remoteMethod('greet',{
  accepts: {arg: 'msg', type: 'string'},
  returns: {arg: 'greeting', type: 'string'},
  http: {path: '/sayhi', verb: 'get'}
});
```

こうすることで、ルートが以下のように変更されます。

```
GET /api/people/sayhi
```

すると、 `http://localhost:3000/api/people/sayhi?msg=LoopBack%20developer` への GETリクエストは、以下のような値を返します。

```javascript
{"greeting": "Greetings... LoopBack developer"}
```

## リモートメソッドにACLを追加する

独自のリモートメソッドへのアクセスを制限するには、他のAPIへのアクセス制御と同様に、[ACL生成ツール](ACL-generator.html)を使います。
独自のリモートメソッドをアクセス種別は「Execute」です。

### 基本的な使い方

たとえば、上の例で使った `greet` メソッドの呼出しを禁止する場合、以下のようにします。

```shell
$ lb acl
[?] Select the model to apply the ACL entry to: Person
[?] Select the ACL scope: A single method
[?] Enter the method name: greet
[?] Select the access type: Execute
[?] Select the role: All users
[?] Select the permission to apply: Explicitly deny access
```

これで、以下のようなアクセス制御設定が作成されます。

{% include code-caption.html content="/common/models/person.json" %}
```javascript
...
"acls": [{
  "principalType": "ROLE",
  "principalId": "$everyone",  // 全員にACLを適用する
  "permission": "DENY",        // メソッド呼び出しを拒否する
  "property": "greet"          // greet() メソッドにアクセス制御を適用する
}],
...
```

### 進んだ使い方

他の例として、リモートメソッドの呼出しをモデルの `$owner` に限定するには以下のようにします。

{% include code-caption.html content="/common/models/YourModel.js" %}
```javascript
module.exports = function(YourModel) {
  //...
  YourModel.remoteMethod(
    'someRemoteMethod',
    {
      accepts: [
        {arg: 'id', type: 'number', required: true}
      ],
      // ':id' を RESTのURLに入れることで、 $owner を判断してアクセス制御が行えるようにする
      http: {path: '/:id/some-remote-method', verb: 'get'}
    }
  );
};
```

## リモートメソッドのレスポンスを整形する

[起動スクリプト](Defining-boot-scripts.html)に[`app.remotes()`](http://apidocs.loopback.io/loopback/#app-remotes)が
返すオブジェクトを修正する処理を追加することで、全てのリモートメソッドの戻り値を整形することができます。

{% include code-caption.html content="/server/boot/hook.js" %}
```javascript
module.exports = function(app) {
  var remotes = app.remotes();
  // 全ての戻り値を修正する
  remotes.after('**', function (ctx, next) {
    ctx.result = {
      data: ctx.result
    };

    next();
  });
};
```

## リモートメソッドを無効化する

リモートメソッドを無効化するには、`Model.disableRemoteMethod(name, isStatic)` と `Model.disableRemoteMethodByName(name)` を使います。詳細は以下を参照してください。

- [Model.disableRemoteMethod](http://apidocs.loopback.io/loopback/#model-disableremotemethod)
- [Model.disableRemoteMethodByName](http://apidocs.loopback.io/loopback/#model-disableremotemethodbyname)
