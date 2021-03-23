---
title: "アプリケーションロジックの追加"
lang: ja
layout: page
keywords: LoopBack
tags: [application_logic]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Adding-application-logic.html
summary:
---

アプリケーションを構築するとき、一般的に、データを処理したり、クライアントからの要求に応じてその他の処理を行うように、独自のロジックを実装する必要があります。
LoopBackでは、３通りの方法があります。

* **[モデルにロジックを追加する](Adding-logic-to-models.html)** - [リモートメソッド](Remote-methods.html)・[リモートフック](Remote-hooks.html)・[操作フック](Operation-hooks.html)を追加します。
* **[起動スクリプトを定義する](Defining-boot-scripts.html)** - アプリケーション起動時に実行されるスクリプトを(`/server/boot`ディレクトリ内に)作成します。
* **[ミドルウェアを定義する](Defining-middleware.html)** - 独自の [ミドルウェア](http://expressjs.com/api.html#middleware) を追加します。
