---
title: "アプリケーションの実行とデバッグ"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Running-and-debugging-apps.html
summary:
---

一般に、アプリケーションを開発するときは、`node` コマンドを使用してアプリケーションを実行します。
これにより、スタックトレースとコンソール出力をすぐに確認することができます。

例えば以下のようにします。

```
$ cd myapp
$ node .
```

{% include tip.html content="アプリケーションを実行するときに、アプリケーションがコンソールに表示する（またはファイルに保存する）デバッグ文字列を指定できます。詳細については、[デバッグ文字列の設定](Setting-debug-strings.html)を参照してください。
" %}

StrongLoop Process Managerの制御下でアプリケーションを実行するには、`slc start`コマンドを使用します。
これにより、アプリのプロファイルを作成し、アプリのメトリックを監視してメモリリークを見つけてパフォーマンスを最適化することができます。
詳細については、[プロファイリング](https://docs.strongloop.com/display/SLC/Profiling)と
[アプリメトリックのモニタリング](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics)をご覧ください。

API Connectを使用して、アプリケーションとMicroGatewayを実行するには、`apic start` コマンドを使用します。
[API Designerを使用してアプリを実行する](https://developer.ibm.com/apiconnect/getting-started/run-your-api/)こともできます。
