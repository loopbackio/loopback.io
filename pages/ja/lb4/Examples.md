---
lang: ja
title: プロジェクトサンプル
keywords: LoopBack 4.0, LoopBack 4
sidebar: ja_lb4_sidebar
permalink: /doc/ja/lb4/Examples.html
---

LoopBack4には、次のサンプルプロジェクトが用意されています。

### LoopBackの機能を紹介するショッピングアプリケーションのサンプル

- **[loopback4-example-shopping](https://github.com/strongloop/loopback4-example-shopping)**:
  LoopBack4フレームワークの使い方を検証/テストするためのオンラインeコマースデモ。

### 初心者向けのサンプル

- **[hello-world](https://github.com/strongloop/loopback-next/tree/master/examples/hello-world)**:
  LoopBack4を使用して簡単なアプリケーションを設定する方法を示すサンプル。

- **[todo](https://github.com/strongloop/loopback-next/tree/master/examples/todo)**:
  LoopBack4でアプリケーションを構築する方法を示すサンプル。 
  [チュートリアルの説明](https://loopback.io/doc/en/lb4/todo-tutorial.html) を確認。

- **[todo-list](https://github.com/strongloop/loopback-next/tree/master/examples/todo-list)**: 
  LoopBack4でリレーションを使用する方法を示すサンプル。 Todoサンプルの続き。
  [チュートリアルの説明](https://loopback.io/doc/en/lb4/todo-list-tutorial.html) を確認。

- **[soap-calculator](https://github.com/strongloop/loopback-next/tree/master/examples/soap-calculator)**:
  SOAP Webサービスを統合する方法を示すサンプル。
  [チュートリアルの説明](https://loopback.io/doc/en/lb4/soap-calculator-tutorial.html) を確認。

### 拡張機能を実装/使用したサンプル

- **[greeter-extension](https://github.com/strongloop/loopback-next/tree/master/examples/greeter-extension)**:
  拡張ポイント/拡張パターンを実装する方法を示すサンプル。

- **[log-extension](https://github.com/strongloop/loopback-next/tree/master/examples/log-extension)**:
  LoopBack4での複雑なログ拡張を作成する方法を示すサンプル。

- **[metrics-prometheus](https://github.com/strongloop/loopback-next/tree/master/examples/metrics-prometheus)**:
  [@loopback/extension-metrics extension](https://github.com/strongloop/loopback-next/blob/master/extensions/metrics)
  と [Prometheus](https://prometheus.io/) によって提供されるメトリックスを示すサンプル。

### 移行方法のサンプル

- **[lb3-application](https://github.com/strongloop/loopback-next/tree/master/examples/lb3-application)**:
  既存のLoopBack3アプリケーションを新しいLoopBack4プロジェクトにマウントする方法を示すサンプル。

- **[access-control-migration](https://github.com/strongloop/loopback-next/blob/master/examples/access-control-migration)**:
  Role Based Access Control（RBAC）システムを実装する方法を示すサンプル。

### その他のサンプル

- **[context](https://github.com/strongloop/loopback-next/tree/master/examples/context)**:
  [`@loopback/context`](https://github.com/strongloop/loopback-next/tree/master/packages/context)
  をInversion of Control（IoC）および、Dependency Injection（DI）コンテナーとして使用する方法を示すスタンドアローンサンプル。

- **[file-transfer](https://github.com/strongloop/loopback-next/tree/master/examples/file-transfer)**:
  ファイルをアップロードおよびダウンロードするためのAPIを公開する方法を示すサンプル。

- **[greeting-app](https://github.com/strongloop/loopback-next/tree/master/examples/greeting-app)**:
  コンポーネント、コントローラー、インターセプター、オブザーバーからアプリケーションを作成する方法を示すサンプル。

- **[rpc-server](https://github.com/strongloop/loopback-next/tree/master/examples/rpc-server)**:
  構成済みRPCプロトコルを実装する方法を示すサンプル。

- **[rest-crud](https://github.com/strongloop/loopback-next/tree/master/examples/rest-crud)**:
  `CrudRestComponent`を使用して、クラスを作成せずにモデルのデフォルトのリポジトリおよびコントローラークラスを定義する方法を示すサンプル。

- **[validation-app](https://github.com/strongloop/loopback-next/tree/master/examples/validation-app)**:
  LoopBackアプリケーションでバリデーションを追加する方法を示すサンプル。

## サンプルのダウンロード方法

以下の`lb4`コマンドを使用して、任意のプロジェクトサンプルをダウンロードすることができます。

```sh
lb4 example <プロジェクトサンプル名>
```

例えば、以下のコマンドを使って、`hello-world`のプロジェクトサンプルを`loopback4-example-hello-world`にダウンロードすることができます。

```sh
lb4 example hello-world
```

`lb4`をまだインストールしていない場合は、[はじめに](Getting-started.md#install-loopback-4-cli) を確認してLoopBack 4 CLIをインストールしてください。
