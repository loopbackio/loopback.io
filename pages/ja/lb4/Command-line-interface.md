---
lang: ja
title: 'コマンドラインインターフェース'
keywords: LoopBack 4.0, LoopBack 4
sidebar: ja_lb4_sidebar
permalink: /doc/ja/lb4/Command-line-interface.html
---

LoopBack4には、便利なコマンドラインツールが用意されおり、すぐに使い始めることができます。 コマンドラインツールは、アプリケーションプロジェクトと拡張プロジェクトをそれぞれ生成し、それらの依存関係をインストールします。 また、CLIは、プロジェクトのコントローラーなどの成果物を生成するのにも役立ちます。 生成されたソースは、必要に応じてユーザー独自のコードで拡張できます。

LoopBack4のCLIコマンドを使用するには、次のコマンドを実行します。

```sh
npm install -g @loopback/cli
```

## LoopBackプロジェクトの生成

{% include_relative tables/lb4-project-commands.html %}

## LoopBackアーティファクトの生成

{% include_relative tables/lb4-artifact-commands.html %}

## LoopBack依存関係のアップグレード

アプリケーションが最初に `lb4`コマンドでソースを生成するとき、cliバージョンを以下のように` .yo.rc.json` に追加します。

```json
{
  "@loopback/cli": {
    "version": "1.21.4"
  }
}
```

特定のバージョンのcliに対応するLoopBackモジュールのリストを確認するには、以下のコマンドを実行します。

```sh
lb4 -v
```

以下のように現在のバージョンのcliでリリースされている互換モジュールを確認できます。

```
@loopback/cli version: 1.23.1

@loopback/* dependencies:
  - @loopback/authentication: ^3.1.1
  - @loopback/boot: ^1.5.8
  - @loopback/build: ^2.0.13
  - @loopback/context: ^1.23.2
  - @loopback/core: ^1.10.4
  - @loopback/metadata: ^1.3.4
  - @loopback/openapi-spec-builder: ^1.2.15
  - @loopback/openapi-v3: ^1.9.9
  - @loopback/repository-json-schema: ^1.10.2
  - @loopback/repository: ^1.15.1
  - @loopback/rest: ^1.20.1
  - @loopback/testlab: ^1.9.1
  - @loopback/docs: ^2.2.1
  - @loopback/example-hello-world: ^1.2.16
  - @loopback/example-log-extension: ^1.2.16
  - @loopback/example-rpc-server: ^1.2.16
  - @loopback/example-todo: ^1.8.2
  - @loopback/example-soap-calculator: ^1.6.17
  - @loopback/service-proxy: ^1.3.8
  - @loopback/http-caching-proxy: ^1.1.15
  - @loopback/http-server: ^1.4.15
  - @loopback/example-todo-list: ^1.11.1
  - @loopback/dist-util: ^0.4.0
  - @loopback/rest-explorer: ^1.4.1
  - @loopback/eslint-config: ^4.1.1
  - @loopback/example-express-composition: ^1.7.1
  - @loopback/example-greeter-extension: ^1.3.16
  - @loopback/booter-lb3app: ^1.3.2
  - @loopback/example-lb3-application: ^1.1.16
  - @loopback/example-greeting-app: ^1.2.2
  - @loopback/example-context: ^1.2.16
  - @loopback/repository-tests: ^0.5.1
  - @loopback/extension-health: ^0.2.8
  - @loopback/authorization: ^0.4.1
  - @loopback/rest-crud: ^0.3.2
  - @loopback/security: ^0.1.4
  - @loopback/authentication-passport: ^1.0.1
```

プロジェクトが生成されたら、`lb4`コマンドを実行します。 するとプロジェクトに現在のCLIと互換性のないバージョンがあるかどうかが確認され、続行または終了するようにユーザーに求められます。

`package.json`の依存関係を更新するには、`npm update`または[npm-check](https://www.npmjs.com/package/npm-check)を使用します。 依存関係の変更により、既存のアプリケーションが壊れる可能性がある点は注意が必要です。 アップグレード後もビルド/テスト/実行が成功することを確認してください。

## 命名規則

LoopBack4では、クラス、変数、およびファイルの命名に異なる規則を使用しています。

- クラス名： `PascalCase`
- ファイル名： `kebab-case`
- 変数名： `camelCase`

以下ではいくつかの例を示します。

{% include_relative tables/lb4-class-file-naming-convention.html %}
