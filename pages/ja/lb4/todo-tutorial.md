---
lang: ja
layout: translation
title: Todo Tutorial
keywords: LoopBack 4.0, LoopBack 4
sidebar: ja_lb4_sidebar
permalink: /doc/ja/lb4/todo-tutorial.html
---

# @loopback/example-todo

Loopback4を始める、基本のチュートリアルをご紹介します！

## 概観

このチュートリアルでは、LoopBack 4を使用して、ToDoリスト用の基本のAPIの作成方法をご紹介します。わずか[5 steps](#steps)で、REST APIを作成する方法を体験します。

![todo-tutorial-overview](https://loopback.io/pages/en/lb4/imgs/todo-overview.png)

## セットアップ

まず、サポートされているバージョンのNodeをインストールします。

- v8.9以降の[Node.js](https://nodejs.org/en/) 

なお、このチュートリアルは、以下のテクノロジ、言語、および概念の背景知識があることを前提としています。

- JavaScript (ES6)
- [REST](http://www.restapitutorial.com/lessons/whatisrest.html)

最後に、LoopBack 4 CLIツールキットをインストールします。

```sh
npm i -g @loopback/cli
```

## チュートリアル

このチュートリアルを進めるには、[Create your app scaffolding](http://loopback.io/doc/en/lb4/todo-tutorial-scaffolding.html)セクションから始めます。

### 手順

1.  [アプリの土台を作成する](http://loopback.io/doc/en/lb4/todo-tutorial-scaffolding.html)
2.  [Todoモデルを追加する](http://loopback.io/doc/en/lb4/todo-tutorial-model.html)
3.  [データソースを追加する](http://loopback.io/doc/en/lb4/todo-tutorial-datasource.html)
4.  [リポジトリを追加する](http://loopback.io/doc/en/lb4/todo-tutorial-repository.html)
5.  [コントローラーを追加する](http://loopback.io/doc/en/lb4/todo-tutorial-controller.html)
6.  [結合する](http://loopback.io/doc/en/lb4/todo-tutorial-putting-it-together.html)
7.  補足:
    [ジオコーディングサービスと統合する](http://loopback.io/doc/en/lb4/todo-tutorial-geocoding-service.html)

## 試してみましょう

このチュートリアルの最終結果をアプリケーションの例として見たい場合は、次の手順に従ってください。

1.  `lb4 example` コマンドを実行して、todoリポジトリを選択してクローンを作成します。

    ```sh
    lb4 example todo
    ```

2.  ディレクトリを切り替えます。

    ```sh
    cd loopback4-example-todo
    ```

3.  アプリケーションを起動しましょう！

    ```sh
    $ npm start

    Server is running at http://127.0.0.1:3000
    ```

アプリケーションのコードを色々と試して、動作するかを確認してみてください。引き続き、アプリケーションの構築方法を学びたい場合は、このチュートリアルを続けてください。



### お困りですか？
 [Gitter channel](https://gitter.im/strongloop/loopback) を参照してください。

### バグ/フィードバック

[loopback-next](https://github.com/strongloop/loopback-next)へお寄せください。



## 貢献する

- [ガイドライン](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)
- [チームに参加](https://github.com/strongloop/loopback-next/issues/110)

## テスト

Rootフォルダから `npm test` を実行します。

## Contributor

こちらから[Contributor](https://github.com/strongloop/loopback-next/graphs/contributors)を確認できます。

## ライセンス

MIT
