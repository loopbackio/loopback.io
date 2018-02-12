---
title: "モデルにロジックを追加する"
lang: ja
keywords: LoopBack
tags: [models]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Adding-logic-to-models.html
summary:
---
モデルに独自のロジックを追加する方法は３つあります。

* [リモートメソッド](Remote-methods.html) - Node関数に紐付けられたRESTエンドポイントです。
* [リモートフック](Remote-hooks.html) - リモートメソッドが実行された時（前または後）に起動できるロジックです。
* [操作フック](Operation-hooks.html) - モデルが、データソースに作成・読取・更新・削除の操作を行った時に起動できるロジックです。

独自ロジックのタイミングをさらに改良するには、各メソッドの呼出しを設定します。
いずれの場合でも、LoopBackはロジックを起動する仕組みを提供するだけなので、独自のロジックをコーディングする必要があります。
