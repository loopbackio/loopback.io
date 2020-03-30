---
lang: jp
title: 'アプリの土台を構築する'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/jp/lb4/todo-tutorial-scaffolding.html
summary: LoopBack 4 Todo Application Tutorial - Create app scaffolding
---

### アプリの土台を構築する

CLIツールキットには、アプリケーション全体を生成するテンプレートと、既存のアプリケーションのアーティファクト（コントローラー、モデル、リポジトリなど）が付属しています。

ツールキットを使用してアプリケーションを生成するには、`lb4 app`コマンドを実行し、以下の通り入力します。

```sh
$ lb4 app
? Project name: todo-list
? Project description: A todo list API made with LoopBack 4.
? Project root directory: (todo-list)
? Application class name: (TodoListApplication)
? Select features to enable in the project:
 ◉ Enable eslint: add a linter with pre-configured lint rules
 ◉ Enable prettier: install prettier to format code conforming to rules
 ◉ Enable mocha: install mocha to run tests
 ◉ Enable loopbackBuild: use @loopback/build helpers (e.g. lb-eslint)
 ◉ Enable vscode: add VSCode config files
 ◉ Enable docker: include Dockerfile and .dockerignore
 ◉ Enable repositories: include repository imports and RepositoryMixin
 ◉ Enable services: include service-proxy imports and ServiceMixin
 # npm will install dependencies now
 Application todo-list was created in todo-list.
```

なお、このチュートリアルでは、特定のプロジェクト機能（LoopBackのビルド、eslint、mochaなど）を有効にするためのオプションが表示された場合、すべて有効のままにします。

### ストラクチャ

アプリケーションが生成されると、次のようなフォルダー構造になります。

```text
public/
  index.html
src/
  __tests__/
    README.md
    acceptance/
      home-page.acceptance.ts
      ping.controller.acceptance.ts
      test-helper.ts
  controllers/
    index.ts
    README.md
    ping.controller.ts
  datasources/
    README.md
  models/
    README.md
  repositories/
    README.md
  application.ts
  index.ts
  migrate.ts
  sequence.ts
node_modules/
  ***
LICENSE
README.md
index.js
index.ts
package.json
tsconfig.json
.eslintrc.js
.prettierrc
.mocharc.json
```

※なお、ここにリストされていないファイルがある可能性もあります。

| ファイル名                                                     | 目的x                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `index.ts`                                               | フォルダーのコンテンツのインポートを許可します（他の場所で使用するため）。                                                                                                                                                                                                                                                                                                       |
| `index.js`                                               | アプリケーションのコンポーネントを接続する、最上位のファイルです。|
| `package.json`                                           | アプリケーションのパッケージマニフェスト。詳細については、 [package.json](https://docs.npmjs.com/files/package.json) をご参照ください。                                                                                                                                                                                                                                                  |
| `tsconfig.json`                                          | TypeScriptプロジェクト構成です。詳細については、 [tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html) をご参照ください。                                                                                                                                                                                                                                   |
| `.eslintrc.js`                                           | [ESLint configuration](https://eslint.org/docs/user-guide/configuring)をご参照ください。                                                                                                                                                                                                                                                                                                   |
| `.prettierrc`                                            | [Prettier configuration](https://prettier.io/docs/en/configuration.html) をご参照ください。                                                                                                                                                                                                                                                                                                |
| `README.md`                                              | 	このアプリケーション用に生成された、MarkdownベースのREADMEです。                                                                                                                                                                                                                                                                                                               |
| `LICENSE`                                                | MITライセンスのコピーです。このライセンスを使用しない場合は、このファイルを削除してください。                                                                                                                                                                                                                                                                             |
| `src/application.ts`                                     | [`RestApplication`](https://loopback.io/doc/en/lb4/apidocs.rest.restapplication.html) デフォルトで拡張されるアプリケーションクラスです。これはアプリケーションのルートであり、アプリケーションが構成される場所です。 また、データソースを定義する [`RepositoryMixin`](https://loopback.io/doc/en/lb4/apidocs.repository.repositorymixin.html) の拡張も行います。 |
| `src/index.ts`                                           | マイクロサービスの開始点。このファイルは、アプリケーションのインスタンスを作成し、ブーターを実行してRestServerから、アプリケーションにバインドされている [`RestServer`](https://loopback.io/doc/en/lb4/apidocs.rest.restserver.html) インスタンスを起動させます。                   |
| `src/sequence.ts`                                        | REST要求/応答中に実行する一連のアクションを定義するために使用される[Sequence](Sequence.md) クラスの拡張です。                                                                                                                             |
| `src/controllers/README.md`                              | コントローラディレクトリ、新しいコントローラを生成する方法、および詳細情報の入手先に関する情報を提供します。                                                                                                                                         |
| `src/controllers/ping.controller.ts`                     |  `/ping`のGETリクエストに応答する基本コントローラです。                                                                                                                                                                                                                                                                                                             |
| `src/datasources/README.md`                              | データソースディレクトリ、新しいデータソースを生成する方法、および詳細情報の入手先に関する情報を提供します。                                                                                             |
| `src/models/README.md`                                   | モデルディレクトリ、新しいモデルの生成方法、および詳細情報の入手先に関する情報を提供します。                                                                                                                                                                                                  |
| `src/repositories/README.md`                             | リポジトリー・ディレクトリー、新しいリポジトリーの生成方法、および詳細情報の入手先に関する情報を提供します。                                                                                                                                                                                                                                            |
| `src/__tests__/`                                         | 	テストはこのフォルダ上にを配置してください。                                                                                                                                                                                                                                                  |
| `src/__tests__/acceptance/ping.controller.acceptance.ts` | `src/controllers`のpingコントローラを使用するテストのサンプルです。                                                                                                                                                                                                                                                                                                    |
| `.mocharc.json`                                          | アプリケーションのテストを実行するための[Mocha](https://mochajs.org/) 構成です。                                                                         |

### ナビゲーション

次のステップ: [Todo Modelを追加する](todo-tutorial-model.md)
