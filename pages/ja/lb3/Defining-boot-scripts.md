---
title: "起動スクリプトの定義"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Defining-boot-scripts.html
summary:
---

{% include see-also.html content="
* [モデルにロジックを追加する](Adding-logic-to-models.html)
* [ミドルウェアの定義](Defining-middleware.html)
" %}

## 概要

LoopBack のブートストラップである [loopback-boot](https://github.com/strongloop/loopback-boot) はアプリケーションの初期化 (_ブートスラッピング_ とも呼ばれます).
アプリケーションが開始するとき、ブートストラップは以下のことを行います。

* データソースを設定する。
* 独自モデルを定義する。
* モデルを設定し、データソースをモデルを紐付ける。
* アプリケーション設定を行う。
* `/server/boot` ディレクトリ内の起動スクリプトを実行する。

loopback-bootモジュールは、アプリケーションを初期化する `boot()` 関数を提供します。
例えば、標準的な [server.js](server.js.html) スクリプトにおいては以下のように使われます。

```js
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
// ...
boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
```

詳しくは[loopback-boot API docs](http://apidocs.loopback.io/loopback-boot/)を参照してください。

{% include note.html content="[アプリケーション生成ツール](Application-generator.html)でアプリケーションを作成する場合、アプリケーションを起動するために何もする必要はありません。上記のコードは自動的に作成されます！
" %}

### 起動スクリプトを使う

LoopBackブートストラップによって実行されるものに加えて、_起動スクリプト_ を使用して独自の初期化を実行します。
アプリケーションが起動すると、LoopBackは`server/boot` ディレクトリ内のすべてのスクリプトをロードします。
既定では、LoopBackは起動スクリプトをアルファベット順にロードします。
[boot()](http://apidocs.loopback.io/loopback-boot/#boot) の options引数を使用して、起動スクリプトのロード順序をカスタマイズできます。
詳細については、[起動スクリプトのロード順序](#boot-script-loading-order)を参照してください。

## 定義済み起動スクリプト

[アプリケーション生成ツール](Application-generator.html) は以下の起動スクリプトを作成します。

* `/server/boot/root.js` は [loopback.status()](http://apidocs.loopback.io/loopback/#loopback-status) ミドルウェアを
ルートエンドポイント ("/") にバインドして、基本的なステータス情報を提供します。
* `/server/boot/authentication.js` - [app.enableAuth()](http://apidocs.loopback.io/loopback/#app-enableauth) を呼出して、アプリケーションの認証を有効にします。

### Earlier versions

Prior to `generator-loopback` v. 1.12, the application generator created two additional boot scripts, but this functionality is now handled in middleware:

* `explorer.js` - Enables [API Explorer](Use-API-Explorer.html). 
* `rest-api.js` - Exposes the application's models over REST using [`loopback.rest()`](http://apidocs.loopback.io/loopback/#loopback-rest) middleware.

### API Connect

The API Connect LoopBack generator does not create the  `authentication.js` boot script that enables authentication.  To enable user model authentication you must add this script (or the equivalent) yourself.

## 起動スクリプト生成ツールを使う

あらかじめ定義された起動スクリプトに加えて、独自の起動スクリプトを定義して、アプリケーションの起動時に独自のロジックを実行することもできます。

[起動スクリプト生成ツール](Boot-script-generator.html)を使用すると、起動スクリプトテンプレートをすばやく生成できます。
生成ツールの質問にどのように応答するかに応じて、同期起動スクリプトまたは非同期起動スクリプトのいずれかのテンプレートが生成されます。

{% include code-caption.html content="同期起動スクリプトテンプレート" %}
```javascript
module.exports = function(app) {
};
```

簡潔にするため、コメントは省略されています。

{% include code-caption.html content="非同期起動スクリプトテンプレート" %}
```javascript
module.exports = function(app, cb) {
  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
```

起動時に実行したいコードを関数に追加するだけです。

## 同期および非同期起動スクリプト

LoopBackは、同期スクリプトと非同期スクリプトの両方をサポートします。使用するタイプはタスクの性質によって異なります。
データベース要求やネットワーク操作など、プログラムの実行をブロックしたくないタスクには、非同期起動スクリプトを使用します。

どちらのタイプの起動スクリプトも、スクリプトのアクションを含む関数をエクスポートする必要があります。
この関数のシグネチャは、両方の種類の起動スクリプトで同様ですが、非同期起動スクリプト関数は追加のコールバック引数を取ります。

### ブートストラップ関数の引数

```javascript
module.exports = function(app, [callback]) {
  ...
}
```

<table>
  <thead>
    <tr>
      <th width="100">名前</th>
      <th width="100">型</th>
      <th>必須</th>
      <th>説明</th>
    </tr>
  </thead>    
  <tbody>    
    <tr>
      <td>app</td>
      <td>Object</td>
      <td>Yes</td>
      <td>
        <p>アプリケーションコンテキストオブジェクト。アプリケーションのハンドルを提供するので、（たとえば）モデルオブジェクトを取得できます。</p>
        <pre>var User = app.models.User;</pre>
      </td>
    </tr>
    <tr>
      <td>callback</td>
      <td>Function</td>
      <td>非同期起動スクリプトのみ</td>
      <td>アプリケーションロジックが完了したら、コールバック関数を呼び出します。</td>
    </tr>
  </tbody>
</table>

### 非同期起動スクリプト

非同期起動スクリプトは、2つの引数をとる関数をエクスポートする必要があります。

1.  アプリケーションオブジェクト、`app`。このオブジェクトを使用すると、システム定義の変数と構成にアクセスできます。
2.  アプリケーションロジックに従って応答時間を計ることができるコールバック関数。

{% include important.html content="スクリプトが終了したら、アプリケーションに制御を戻すためにコールバック関数を呼び出す必要があります。
" %}

たとえば、この起動スクリプトは "hello world"を出力し、3秒（3000ミリ秒）後にコールバック関数を起動します。

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
module.exports = function(app, callback) {
  setTimeout(function() {
    console.log('Hello world');
    callback();
  }, 3000);
};
```

この起動スクリプトをアプリケーションに追加すると、起動時にコンソールに「Hello world」と表示されます。

### 同期起動スクリプト

同期起動スクリプトは、1つの引数を取る関数をエクスポートする必要があります。アプリケーションオブジェクト `app`です。
このオブジェクトを使用すると、システム定義の変数と構成にアクセスできます。

たとえば、この起動スクリプトは、アプリケーションに登録されているすべてのモデルの名前を取得し、コンソールに表示します。

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
module.exports = function(app) {
  var modelNames = Object.keys(app.models);
  var models = [];
  modelNames.forEach(function(m) {
    var modelName = app.models[m].modelName;
    if (models.indexOf(modelName) === -1) {
      models.push(modelName);
    }
  });
  console.log('Models:', models);
};
```

この起動スクリプトを「空の」アプリケーションに追加すると、次のように表示されます。

```javascript
...
Models: ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']
...
```

## 起動スクリプトの読み込み順序

LoopBackは、起動スクリプトをファイル名のアルファベット順に実行するので、起動スクリプトのロード順序をそのファイル名で指定するのが最も簡単な方法です。
たとえば、起動スクリプトに `01-your-first-script.js`・`02-your-second-script.js` などの名前を付けることができます。これにより、LoopBackは必要な順序でスクリプトをロードできます。
たとえば、`/server/boot`にある既定の起動スクリプトの前に。

{% include note.html content="LoopBackは起動スクリプトをアルファベット順に１つずつ処理します（並列ではありません）。これは、同期および非同期の両方の起動スクリプトに適用されます。
" %}

また、`/server/server.js` における [`boot()`](http://apidocs.loopback.io/loopback-boot/#boot)関数呼び出しのオプションを使って読み込み順序を指定することもできます。既定の関数呼び出しの以下の部分を、

{% include code-caption.html content="/server/server.js" %}
```javascript
...
boot(app, __dirname);
...
```

以下のようにします。

```javascript
...
bootOptions = { "appRootDir": __dirname, 
                "bootScripts" : [ "/full/path/to/boot/script/first.js", "//full/path/to/boot/script/second.js", ... ]
};
boot(app, bootOptions);
...
```

すると、アプリケーションは`bootScripts`配列で指定された順序でスクリプトを実行します。
各スクリプトへの完全なディレクトリパスを指定します。

相対ディレクトリパスを指定することもできます。

{% include important.html content="上記の方法を使用すると、アプリケーションは、`bootScripts` に指定された独自順序の起動スクリプトのあとで、（それらを移動したり削除したりしなければ）`/server/boot` にある起動スクリプトを全てアルファベット順に実行します。
" %}

必要に応じて、`bootDirs` プロパティに1つまたは複数のディレクトリを指定することもできます。
アプリケーションは、`bootScripts`に指定したスクリプトの後、`/server/boot` ディレクトリ内のスクリプトの前に、ディレクトリ内のスクリプトをアルファベット順に実行します。
