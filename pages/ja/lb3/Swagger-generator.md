---
title: "Swagger 生成ツール"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Swagger-generator.html
summary:
---

{% include content/ja/generator-create-app.html %}

### 概要

Creates a fully-functional application with an API defined using the [Swagger](http://swagger.io/) 2.0 specification.
[Swagger](http://swagger.io/) 2.0 仕様を使って定義されたAPIを備える、完全に機能するアプリケーションを作成する。
Swaggerについての詳細は [Swagger RESTful API 文書化仕様 (バージョン 2.0)](https://github.com/t-eimizu/OpenAPI-Specification/blob/master/versions/2.0-ja.md) を参照。

```
lb swagger [options] [<name>]
```

API Connect 開発者ツールキットの場合：

```
apic loopback:swagger [options]
```

旧StrongLoopツールの場合：

```
slc loopback:swagger [options] [<url>]
```

### オプション

{% include_relative includes/CLI-std-options.md title='no' %}

### 引数

`<url>` - 使用するSwagger仕様のオプションのURL。与えられた場合、ツールは対話型の質問の既定値として使用します。

### 対話型の質問

このツールは以下の質問をします。

* Swagger JSON 仕様ファイルの場所。URLまたは相対パスを入力してください。
* Swaggerファイルに定義されたREST API にもとづいて生成するモデル。
  矢印キーでカーソルを動かし、スペースバーを押下して選択してください。
  最後に Enter を押下すると選択された全てのモデルが生成されます。
* 使用するデータソース。

### 例

例えば、Swaggerのシンプルなペット屋のサンプルのURLを入力した場合、

`https://raw.githubusercontent.com/wordnik/swagger-spec/master/examples/v2.0/json/petstore-simple.json`

ツールは以下のように表示します。

```
[?] Select models to be generated:
❯⬢ swagger_api
 ⬢ pet
 ⬢ petInput
 ⬢ errorModel
```

矢印キーでカーソルを動かし、スペースバーを押下して選択してください。
最後に Enter を押下すると選択された全てのモデルが生成されます。

以下のように、ツールの作業状態が表示されます。

```
[?] Select the data-source to attach models to: db (memory)
Creating model definition for swagger_api...
Creating model definition for pet...
Creating model definition for petInput...
Creating model definition for errorModel...
...
```

### 出力

ツールは、Swagger ファイルの指定に基づいて、[モデル定義JSONファイル](Model-definition-JSON-file.html)や関連する JavaScript のファイルも含め、
アプリケーションの全てのファイルを生成します。
