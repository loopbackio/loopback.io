---
title: インストール
lang: ja
keywords: LoopBack
tags: [installation]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Installation.html
summary: LoopBack 3.0 アプリを作成・開発するために、LoopBack ツールをインストールします。
---

## 前提条件: Node.js をインストールする

まだ Node がインストールされていない場合、 [Node.jsをダウンロードしてインストールします](http://nodejs.org/en/download)。最新の LTS (long-term support) リリースを使いましょう。

{% include warning.html content="LoopBack は、バージョン 4.x より前の Node.js では動作しません。
" %}

## LoopBack ツールをインストールする

理論上は、ゼロからLoopBackアプリケーションを書くこともできますが、LoopBack CLI ツールをインストールすることで、最初の一歩がとても簡単になります。
このツールは、自分のニーズに合わせてカスタマイズできるアプリケーションの土台を作ります。
詳しくは、[コマンドラインツール](Command-line-tools.html)を参照してください。

LoopBackツールには２つの選択肢があります。

- **[LoopBack CLI ツール](#install-loopback-cli-tool)**
- **[IBM API Connect 開発ツールキット](#install-ibm-api-connect-developer-toolkit)**

また、レガシーのStrongLoop CLIツール `slc` を使うこともできます。

### LoopBack CLI ツールのインストール

LoopBack コマンドラインインターフェース(CLI)ツールをインストールするには、以下のコマンドを実行します。

```
npm install -g loopback-cli
```

これで、LoopBackアプリケーションの土台を作ったり、修正したりする `lb`コマンドラインツールがインストールされます。

詳細は、[コマンドラインツール](Command-line-tools.html)を参照ください。

### Install IBM API Connect developer toolkit

[IBM API Connect](https://developer.ibm.com/apiconnect/) is an end-to-end API management solution that uses LoopBack to create APIs, and provides integrated build and deployment tools:

- **Integrated experience across the entire API lifecycle**, including API and micro-service creation in Node.js and Java.
-  **Self-service access to APIs** with built-in developer portals and social collaboration tools.
-  **Unified management and orchestration of Node.js and Java** for deployment on-premises and in IBM Cloud.
-  **Built-in security and gateway policies** with extensive security options and governance policies.

For more information, see [IBM API Connect](https://developer.ibm.com/apiconnect/).


IBM API Connect developer toolkit includes:
  - The graphical _API Designer_ tool that you can use to create and modify LoopBack applications.
  - The `apic` command-line tool for scaffolding and modifying LoopBack applications.

To install IBM API Connect Developer Toolkit:

```sh
$ npm install -g apiconnect
```

For more information, see [Installing the API Connect Developer Toolkit](http://www.ibm.com/support/knowledgecenter/SSFS6T/com.ibm.apic.toolkit.doc/tapim_cli_install.html).

{% include important.html content="**If you are an IBM customer, for technical support see the [IBM Support Portal](http://www-01.ibm.com/support/docview.wss?uid=swg21593214).**
" %}

## Updating your installation

Update your installation with this command:

```
$ npm install -g strongloop
```

If you encounter any problems, you may need to perform a clean reinstallation.  Follow these steps:

```
$ npm uninstall -g strongloop
$ npm cache clear
$ npm install -g strongloop
```

## 次のステップ

[LoopBack を始めよう](Getting-started-with-LoopBack.html)をなぞって、
[LoopBack の核となる概念](LoopBack-core-concepts)を読みましょう。
