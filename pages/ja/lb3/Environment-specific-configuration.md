---
title: "環境別の設定"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Environment-specific-configuration.html
summary:
---

## 概要

LoopBackアプリケーションには、以下の設定ファイルが存在します。

* **アプリケーション全体設定ファイル**は、既定では [`server/config.json`](config.json.html)です。
  単純なJSONで表現できない値が必要な時は、 `server/config.local.js`  を使うこともできます。
* **データソース設定ファイル**は、既定では [`server/datasources.json`](datasources.json.html)です。
  単純なJSONで表現できない値が必要な時は、 `server/datasources.local.js`  を使うこともできます。
* **モデルに関するアプリケーションレベルの設定**は、既定では `server/model-config.json`です。
* **ミドルウェア設定ファイル**は、既定では `server/middleware.json`です。
* **LoopBackコンポーネントの設定ファイル**は、既定では `server/component-config.json`です。

{% include note.html content="`*.js` ファイルを使った LoopBack アプリケーションの設定は、オリジナルの
`.json` ファイルが正しい位置にある場合のみ、動作します。`.json` ファイルを `.js`ファイルで置き換えるには、
`.json`ファイルの設定値を `.js` ファイルで上書きしてください。 つまり、既定の `.json` ファイルが空でも、
全ての設定が `.js` ファイルで行えることを意味します。
"%}

LoopBack は、以下の設定ファイルが存在している場合、常にこれらを読み込みます。

* `server/config.json`.
* `server/config.local.json` _または_ `server/config.local.js`. 
* `server/datasources.json`
* `server/datasources.local.json` _または_ `server/datasources.local.js`
* `server/model-config.json`
* `server/model-config.local.json` _または_ `server/model-config.local.js`
* `server/middleware.json`
* `server/middleware.local.json` _または_ `server/middleware.local.js`
* `server/component-config.json`
* `server/component-config.local.json` _または_ `server/component-config.local.js`

さらに、NODE_ENV環境変数がセットされている場合、LoopBackは以下の設定を読み込もうとします。

* <code>server/config.<i>env</i>.json/js</code>
* <code>server/datasources.<i>env</i>.json/js</code>
* <code>server/model-config.<i>env</i>.json/js</code>
* <code>server/middleware.<i>env</i>.json/js</code>
* <code>server/component-config.<i>env</i>.json/js</code>

 _`env`_  には、NODE_ENVの値（典型的なものは "development"・"staging"・"production"など）が入ります。
これを利用することで、開発・テスト・本番環境別の設定が可能になります。

{% include note.html content="
LoopBackアプリケーションは複数の設定ファイルを読み込めるため、潜在的にそれらが衝突する可能性があります。
最も優先度の高いファイルでの設定値が常に有効となります。優先度は以下のとおりです。

1.  NODE_ENVの値による **環境別の設定**。例えば `server/config.staging.json` などです。
2.  **ローカル設定ファイル**。 例えば `server/config.local.json` などです。
3.  **既定の設定ファイル**。例えば `server/config.json` などです。
" %}

アプリケーション設定ファイルの例：

* [config.json](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/config.json)
* [config.local.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/config.local.js)

データソース設定ファイルの例：

* [datasources.json](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.json)
* [datasources.production.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.production.js)
* [datasources.staging.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.staging.js)

ミドルウェア設定ファイルの例：

* [middleware.json](middleware.json.html)
* [middleware.development.json](middleware.development.json.html)

サンプルアプリケーションは、 [https://github.com/strongloop/loopback-example-full-stack/tree/master/server](https://github.com/strongloop/loopback-example-full-stack/tree/master/server) を参照してください。

{% include important.html content="
環境別の設定ファイルがある場合でも、LoopBackでは、既定のベースファイルが必要です。空のオブジェクトが書かれたJSONファイルで十分です。
" %}

## アプリケーション全体の設定

アプリケーションのサーバサイド設定は [`server/config.json`](config.json.html) で定義します。

 `config.json` でセットされた値は、以下のもので上書きできます。

* `config.local.js` または `config.local.json`
* <code>config.<i>env</i>.js</code> または <code>config.<i>env</i>.json</code>, _`env`_ の場所には、 `NODE_ENV` の値(典型的なものは `development` や `production`)が入ります。
  例えば `config.production.json` です。

{% include important.html content="追加のファイルが上書きできるのは、最上位レベルの値型（文字列・数値）のキーのみです。入れ子になったオブジェクトや配列はサポートされていません。
" %}

例えば

{% include code-caption.html content="config.production.js" %}
```javascript
module.exports = {
  host: process.env.CUSTOM_HOST,
  port: process.env.CUSTOM_PORT
};
```

### スタックトレースが出力されないようにする

既定では、スタックトレースはJSONレスポンスには返されませんが、開発中やデバッグ中はそれを有効にし、本番ではオフにしたいということがあります。

* NODE_ENV 環境変数を "production" にセットします。
* 以下の記述を `server/middleware.production.json` に追加します。

{% include code-caption.html content="server/middleware.production.json" %}
```javascript
"final:after": {
    "strong-error-handler": {}
  }
```

{% include note.html content="[アプリケーション生成ツール](Application-generator.html) は上記の設定を持つ `middleware.developmnet.json` ファイルを作成します。
NODE_ENV環境変数が `development` でないことを確認すればOKです。
" %}

### API Explorerを無効化する

LoopBack [API Explorer](Use-API-Explorer) は、アプリケーションの開発中には非常に便利ですが、
本番環境ではセキュリティ上の理由から公開したくないと思うかもしれません。

[loopback-component-explorer](https://github.com/strongloop/loopback-component-explorer)を使っているアプリケーションで、本番環境でexplorerを無効化するには以下のようにします。

* NODE_ENV 環境変数を "production" にセットします。
* `server/component-config.production.json` にて、以下のように設定します。

{% include code-caption.html content="server/component-config.production.json" %}
```javascript
{
  "loopback-component-explorer": null
}
```

### HTTPレスポンスにスタックトレースを含める

既定では、LoopBack 3.0アプリケーションは、HTTPレスポンスにスタックトレースを含めません（本番環境で一般的）。開発やデバッグ用に、それらを含めたい場合、`NODE_ENV` 環境変数の値を `development` にしてください。すると、アプリケーションは、`middleware.development.json` を使うようになります。

このファイルは、以下のような設定を含んでおり、HTTPレスポンスにスタックトレースが含まれるようになります。

```
{
  "final:after": {
    "strong-error-handler": {
      "params": {
        "debug": true,
        "log": true
      }
    }
  }
}
```

## データソース設定

You can override values set in `datasources.json` in the following files:

* `datasources.local.js` or `datasources.local.json`
* <code>datasources.<i>env</i>.js</code> or <code>datasources.<i>env</i>.json</code>, where _`env`_ is the value of `NODE_ENV` environment variable (typically `development` or `production`).
  For example, `datasources.production.json`.

Example data sources:

{% include code-caption.html content="datasources.json" %}
```javascript
{
  db: {
    connector: 'memory'
  }
}
```

{% include code-caption.html content="datasources.production.json" %}
```javascript
{
  db: {
    connector: 'mongodb',
    database: 'myapp',
    user: 'myapp',
    password: 'secret'
  }
}
```

You can also configure your <code>datasource.<i>env</i>.js</code> file to use environment variables:

{% include code-caption.html content="datasources.production.js" %}
```javascript
module.exports = {
  db: {
    connector: 'mongodb',
    hostname: process.env.DB_HOST,
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'myapp',
  }
```

In the above example, running `export PRODUCTION=true` (or `set PRODUCTION=true` for Windows) will load
the datasource.

## Getting values from environment variables

You can easily get the value of an environment variable in an application. The command you use depends on your operating system.

### MacOS and Linux

Use this command to set an environment variable and run an application in one command:

```shell
$ MY_CUSTOM_VAR="some value" node .
```

or in separate commands:

```shell
$ export MY_CUSTOM_VAR="some value"
$ node .
```

Then this variable is available to your application as `process.env.MY_CUSTOM_VAR`.

### Windows

On Windows systems, use these commands:

```
C:\> set MY_CUSTOM_VAR="some value"
C:\> node .
```
