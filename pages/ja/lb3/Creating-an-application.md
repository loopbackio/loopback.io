---
title: "アプリケーションの作成"
lang: ja
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Creating-an-application.html
summary: LoopBackアプリケーション生成ツールを使って、新しいアプリケーションを作ります。
---

{% include content/ja/gs-prereqs.html %}

## アプリケーション生成ツールを使う

アプリケーションを作る最も簡単な方法は、[アプリケーション生成ツール](Application-generator.html)を使うものです。

LoopBackアプリケーションをゼロからコーディングすることも可能ですが、
アプリケーション生成ツールは、[標準的なプロジェクト構成](Project-layout-reference.html)に沿った基本的な土台を作るという、「重量挙げ」を全て代わりにやってくれます。
そして、アプリケーションを必要に応じてCLIツールでカスタマイズすることができます。

一般的に、LoopBackのドキュメントはアプリケーションをアプリケーション生成ツールで作成したものと仮定して書かれています。

アプリケーションを作成したら、以下のようなことを設定したいと思うでしょう。
スタックトレースをオフにする・API Explorerを無効化する・環境変数の値を取得する、など
詳しくは、 [環境別の設定](Environment-specific-configuration.html) を参照してください。

## 標準的なプロジェクト構成

アプリケーション生成ツールは、[標準的なプロジェクト構成](Project-layout-reference.html)に沿ってアプリケーションを作成します。

およそ以下のようなものです。

* `server` ディレクトリ
  * `server.js` - メインアプリケーションスクリプト。下を参照。
  * `config.json` - アプリケーション全体の設定。REST APIのルート・ホスト名とポート番号など。
      [config.json](config.json.html) を参照。
  * `model-config.json` - モデルとデータソースを結びつけて、モデルをREST経由で公開するかどうかを指定する、などの設定。
      [model-config.json](model-config.json.html) を参照。
  * `datasources.json` - データソース設定ファイル。
      [datasources.json](datasources.json.html) を参照。
* `client` ディレクトリ (READMEのスタブがある以外は空っぽ)
* `common/models` ディレクトリ - [モデル生成ツール](Model-generator.html)でモデルを作成した時に作られる。
  * 各モデルのJSONファイルとJavaScriptファイル (例えば、`my-model.json` と `my-model.js`)

## メインアプリケーションスクリプト (server.js)

```javascript
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
app.start = function() {
  // Webサーバを開始する
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
// アプリケーションを起動し、モデル・データソース・ミドルウェアを設定する。
// REST APIのようなサブアプリケーションは、bootスクリプトで接続される。
boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
```

これは、[アプリケーション生成ツール](Application-generator.html)によって生成された
標準的なアプリケーションのメインアプリケーションスクリプトです。

**1 - 3**:
LoopBackモジュールを取り込み、標準的なオブジェクト
[`loopback`](http://apidocs.loopback.io/loopback/#loopback)・
[`app`](http://apidocs.loopback.io/loopback/#var-app-loopback)・
[`boot`](http://apidocs.loopback.io/loopback-boot/#boot) をセットアップする。

**4**:
Webサーバを開始する。

**7**:
'started' [イベント](Events.html)を起こす。

**10 - 13**:
API Explorerを起動する。

**18**: [アプリケーションの初期化(起動)](Defining-boot-scripts.html).
