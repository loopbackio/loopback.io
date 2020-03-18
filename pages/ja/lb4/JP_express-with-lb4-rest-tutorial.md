---
lang: ja
title: 'Loopback REST APIでExpress Applicationを構築する'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/en/lb4/express-with-lb4-rest-tutorial.html
summary: A simple Express application with LoopBack 4 REST API
---

## Overview

[Express](https://expressjs.com) は、特定の形式に固執しないNode.jsのフレームワークです。 LoopBack REST APIは、Expressアプリケーションにマウントして、ミドルウェアとして使用できます。こうして、ユーザーはニーズに合わせて両方のフレームワークの機能を組み合わせることが可能です。

{% include note.html content="
ホストとしてLoopBackを使用し、LoopBack4アプリケーションにExpressアプリケーションをマウントする場合は、[Express Routerのマウント](Routes.md#mounting-an-express-router)を参照してください 。
 %}

このチュートリアルでは、LoopBack 4アプリケーションの土台・['モデル']・['データソース']・['レポジトリ']・['コントローラー']の背景知識があることを前提としています。各機能のアプリ内での働きについては、[`Todo` チュートリアル](todo-tutorial.md)をご参照ください.


## Try it out

先に、このチュートリアルの最終結果である、アプリケーション例を見たい場合は、次の手順に従ってください。


1.  `lb4 example` コマンドを実行、エクスプレス構成リポジトリを選択してクローンを作成します。

    ```sh
    lb4 example express-composition
    ```

2.  ディレクトリを切り替えます。

    ```sh
    cd loopback4-example-express-composition
    ```

3.  アプリケーションを起動します

    ```sh
    $ npm start

    Server is running at http://127.0.0.1:3000
    ```

## LoopBackアプリケーションを作成する

### 土台の構築

`lb4 app note` を実行し、下記のプロンプトを入力してアプリケーションの土台を作成します。

```sh
$ lb4 app note
? Project description: An application for recording notes.
? Project root directory: (note)
? Application class name: (NoteApplication)
 ◉ Enable eslint: add a linter with pre-configured lint rules
 ◉ Enable prettier: install prettier to format code conforming to rules
 ◉ Enable mocha: install mocha to run tests
 ◉ Enable loopbackBuild: use @loopback/build helpers (e.g. lb-eslint)
 ◉ Enable vscode: add VSCode config files
❯◯ Enable docker: include Dockerfile and .dockerignore
 ◉ Enable repositories: include repository imports and RepositoryMixin
 ◉ Enable services: include service-proxy imports and ServiceMixin
 # npm will install dependencies now
 Application note was created in note.
```

### Note モデルを追加する

プロジェクトフォルダー内で `lb4 model`を実行し、`Note`モデルを構築します。`id`プロパティのデータ型は`number`、`title`プロパティは`string`、`content`プロパティは`string`で`Entity`を作成します。


### データソースを追加する

`lb4 datasource ds`コマンドと`./data/ds.json`ファイルパスを実行して、メモリ内データソースを作成します。

`Todo` チュートリアルの例と同様、アプリケーションのルート内にデータフォルダを作成し、`ds.json`を作成します。　

```sh
$ mkdir data
$ touch data/ds.json
```

次に、以下をコピーして`ds.json`ファイルに貼り付けます。

```json
{
  "ids": {
    "Note": 3
  },
  "models": {
    "Note": {
      "1": "{\"title\":\"Things I need to buy\",\"content\":\"milk, cereal, and waffles\",\"id\":1}",
      "2": "{\"title\":\"Great frameworks\",\"content\":\"LoopBack is a great framework\",\"id\":2}"
    }
  }
}
```

###  Note レポジトリを追加する

To create the repository, run the `lb4 repository` command and choose the
`DsDataSource`, as the datasource, `Note` model as the model, and
`DefaultCrudRepository` as the repository base class.

### Note コントローラーを追加する

`lb4 controller note`コマンドを実行して、Noteアプリケーションを完了させます。各項目で、`REST Controller with CRUD functions` タイプ、`Note`モデル、および`NoteRepository`リポジトリを選択します。`id`タイプのデータ型は`number`、ベースHTTPパス名は、デフォルトの`/notes`を選択します。

## Facade Express アプリケーションを作成する

まず、`express`モジュールの依存関係をインストールします。

```sh
npm install --save express
npm install --save-dev @types/express
```

新しいクラス**src/server.ts**を作成して、Express classを作成します。

{% include code-caption.html content="src/server.ts" %}

```ts
import express from 'express';

export class ExpressServer {
  constructor() {}
}
```

Expressアプリケーションインスタンスと、LoopBackアプリケーションインスタンスの2つのプロパティを作成します。

```ts
import {NoteApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import express from 'express';

export class ExpressServer {
  private app: express.Application;
  private lbApp: NoteApplication;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new NoteApplication(options);
  }
}
```

次に、コンストラクター内でベースパスを追加し、Expressを介してフロントエンドアセットを公開します。

```ts
this.app.use('/api', this.lbApp.requestHandler);
```
 
**public/index.html** を修正して、base pathを更新します。

{% include code-caption.html content="public/index.html" %}

```html
<h3>OpenAPI spec: <a href="/api/openapi.json">/openapi.json</a></h3>
<h3>API Explorer: <a href="/api/explorer">/explorer</a></h3>
```

カスタムExpressルートも、以下の通り追加します。

```ts
import {Request, Response} from 'express';
import path from 'path';

export class ExpressServer {
  private app: express.Application;
  private lbApp: NoteApplication;

  constructor(options: ApplicationConfig = {}) {
    // earlier code

    // Custom Express routes
    this.app.get('/', function(_req: Request, res: Response) {
      res.sendFile(path.resolve('public/express.html'));
    });
    this.app.get('/hello', function(_req: Request, res: Response) {
      res.send('Hello world!');
    });
  }
}
```

また、[public/express.html](https://github.com/strongloop/loopback-next/blob/master/examples/express-composition/public/express.html)
ファイルをプロジェクトに追加します。

[`p-event`](https://www.npmjs.com/package/p-event) をインストールし、サーバーがListenしているか確認しましょう。

```sh
npm install --save p-event
```

最後に、 `Note` applicationとExpressアプリケーションを起動する機能を追加しましょう。 

```ts
import pEvent from 'p-event';

export class ExpressServer {
  private app: express.Application;
  private lbApp: NoteApplication;

  constructor(options: ApplicationConfig = {}) {
    //...
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    this.server = this.app.listen(port, host);
    await pEvent(this.server, 'listening');
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    await pEvent(this.server, 'close');
    this.server = undefined;
  }
}
```

**src/server.ts** ファイルは準備完了しました。**src/index.ts** を修正して、アプリケーションを起動させましょう。

{% include code-caption.html content="src/index.ts" %}

```ts
import {ExpressServer} from './server';
import {ApplicationConfig} from '@loopback/core';

export {ExpressServer, NoteApplication};

export async function main(options: ApplicationConfig = {}) {
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
  console.log('Server is running at http://127.0.0.1:3000');
}
```

{% include code-caption.html content="index.js" %}

```js
const application = require('./dist');

module.exports = application;

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +process.env.PORT || 3000,
      host: process.env.HOST || 'localhost',
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
      // Use the LB4 application as a route. It should not be listening.
      listenOnStart: false,
    },
  };
  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
```

[注意]Expressサーバーを`Listen`させるためにLB4アプリケーションを起動した際、LB4 アプリケーションがHTTPを`Listen`しないようにするために、`listenOnStart`が `false` に設定されていることを確認してください。　

それでは、アプリケーションを起動してhttp://127.0.0.1:3000
にアクセスしてみましょう。

```sh
npm start

Server is running at http://127.0.0.1:3000
```


我々はに行けばエクスプローラ、私たちはループバックアプリケーションの要求を行うことができます。サーバーがhttp://127.0.0.1:3000/api
であることに注意してください 。

カスタム/helloエクスプレスルートを表示するには、http：//127.0.0.1：3000 / hello にアクセスすると、「Hello world！」が表示されます。

アプリケーションで静的ファイルを提供するには、コンストラクタの最後に次を追加します。

[Explorer](http://127.0.0.1:3000/api/explorer)を開くと、 Loopbackアプリケーションからリクエストを送ることができます。サーバーは<http://127.0.0.1:3000/api>です。

カスタムの`/hello` Expressルートを表示するには、<http://127.0.0.1:3000/hello>を開いて'Hello world!'を確認します。

アプリケーションで静的ファイルを提供するには、コンストラクタの最後に次の記述を追加します。

{% include code-caption.html content="src/server.ts" %}

```ts
export class ExpressServer {
  private app: express.Application;
  private lbApp: NoteApplication;

  constructor(options: ApplicationConfig = {}) {
    // earlier code

    // Serve static files in the public folder
    this.app.use(express.static('public'));
  }

  // other functions
}
```

これで、**public/**フォルダーに静的ファイルをロードできます。
一例として、[public/notes.html](https://github.com/strongloop/loopback-next/blob/master/examples/express-composition/public/notes.html)のファイルをプロジェクトに追加して`npm start`し、<http://127.0.0.1:3000/notes.html>を開いてみてください。メモを表形式で表示する静的ファイルを確認できます。詳細は、[Serving static files in Express](https://expressjs.com/en/starter/static-files.html)をご参照ください。

お疲れ様でした。LoopBack4 REST APIをExpressアプリケーションにマウントできました。

