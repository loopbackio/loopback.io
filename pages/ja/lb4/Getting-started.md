---
lang: ja
title: 'はじめに'
keywords: LoopBack 4.0, LoopBack 4
sidebar: ja_lb4_sidebar
permalink: /doc/ja/lb4/Getting-started.html
summary: TypeScriptでLoopBack4の "Hello World"プロジェクトを作成/実行する方法を説明。
---

## 前提条件

[Node.js](https://nodejs.org/en/download/) (version 10 以上) をインストールする。 ※ まだ実行するマシーンに未インストールの場合。

## LoopBack4 CLI のインストール

LoopBack4 CLIは、基本的なコードを生成することによってプロジェクトまたは拡張機能のベースを作るコマンドラインインターフェイスです。 CLIは、ベストプラクティスに準拠したLoopBack4プロジェクトを開始する最も速い方法を提供します。

以下のコマンドを実行し、CLIをグローバルにインストールします。

```sh
npm i -g @loopback/cli
```

## 新規プロジェクトの作成

CLIツールはプロジェクトを土台とし、TypeScriptコンパイラーを構成して、必要なすべての依存関係をインストールします。 新しいプロジェクトを作成するには、次のCLIコマンドを実行し、プロンプトの質問に答えます。

```sh
lb4 app
```

以下のプロンプトの質問:

```sh
? Project name: getting-started
? Project description: Getting started tutorial
? Project root directory: (getting-started)
? Application class name: StarterApplication
? Select features to enable in the project:
❯◉ Enable eslint: add a linter with pre-configured lint rules
 ◉ Enable prettier: install prettier to format code conforming to rules
 ◉ Enable mocha: install mocha to run tests
 ◉ Enable loopbackBuild: use @loopback/build helpers (e.g. lb-eslint)
 ◉ Enable vscode: add VSCode config files
 ◉ Enable docker: include Dockerfile and .dockerignore
 ◉ Enable repositories: include repository imports and RepositoryMixin
 ◉ Enable services: include service-proxy imports and ServiceMixin
```

### プロジェクトを実行する

作成したプロジェクトには、プロジェクトをテストするための「ping」ルートが予め用意されています。 以下のコマンドからプロジェクトを実行して試してみましょう。

```sh
cd getting-started
npm start
```

ウェブブラウザーで <http://127.0.0.1:3000/ping> にアクセスします。

## 独自のコントローラーを追加する

基本的なプロジェクトが作成されたので、今度は独自の [コントローラー](Controllers.md) を追加します。 以下のコマンドを実行し、単純な「Hello World」コントローラを追加してみましょう。

```sh
lb4 controller
```

- _注：アプリケーションがまだ実行中の場合は、コマンドを呼び出す前に**CTRL+C**を押してアプリケーションを停止します。_

- 以下のようにプロンプトに回答します。

  ```sh
  ? Controller class name: hello
  ? What kind of controller would you like to generate? Empty Controller
    create src/controllers/hello.controller.ts
    update src/controllers/index.ts

  Controller hello was now created in src/controllers/
  ```

- 以下の内容を次のファイルに貼り付けます。
  `/src/controllers/hello.controller.ts`

  ```ts
  import {get} from '@loopback/rest';

  export class HelloController {
    @get('/hello')
    hello(): string {
      return 'Hello world!';
    }
  }
  ```

- `npm start`を実行してアプリケーションを起動します。

- <http://127.0.0.1:3000/hello>にアクセスして、 `Hello world!` を確認します。

## サンプルコード

この例で生成できるコードは、次のリンクから確認できます。
[hello-world](https://github.com/strongloop/loopback-next/tree/master/examples/hello-world)
