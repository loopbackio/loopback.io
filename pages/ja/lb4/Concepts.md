---
lang: ja
title: 'キーコンセプト'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: ja_lb4_sidebar
permalink: /doc/ja/lb4/Concepts.html
---

LoopBack 4は、典型的なAPIおよび/またはマイクロサービスアプリケーションに対するさまざまな役割を果たすために、いくつかのキーとなる構成要素を定義しています。

![Key concepts overview diagram](imgs/key-concepts-overview-diagram.png)

- [**アプリケーション**](Application.md): モジュールのすべてのコンポーネント、コントローラー、サーバー、およびバインディングをセットアップするための、中心的なクラスです。 Applicationクラスは[Context](Context.md)を拡張し、関連するサーバーを起動および停止するための制御を提供します。

- [**サーバー**](Server.md): REST（http、https）、gRPC（http2）、graphQL（http、https）などのインバウンドトランスポート/プロトコルの実行パートです。 通常、特定のエンドポイント（プロトコル/ホスト/ポート）でListenし、着信要求を処理してから、適切な応答を返します。

- [**コントローラー**](Controllers.md): アプリケーションのREST APIによって定義された操作を実行するクラスです。 アプリケーションのビジネスロジックを実行し、HTTP / REST APIとドメイン/データベースモデル間のブリッジとして機能します。 なお、コントローラは、処理された入力およびバックエンドサービス/データベースの抽象化でのみ動作します。

- [**インターセプター**](Interceptors.md): クラスまたはオブジェクトでの、静的またはインスタンスメソッドの呼び出しをインターセプトする関数です。

- [**ルート**](Routes.md): API仕様と操作の間のマッピングです。 HTTPリクエストが与えられたときに、どの操作を`invoke()` するかをLoopBackに指示します。

- [**シーケンス**](Sequence.md): サーバーが要求に応答する方法を制御する、 [Actions](Sequence.md#actions)のステートレスグループです。

- [**モデル**](Model.md): データソースジャグラーに関するオブジェクトの定義です。 この`@loopback/repository` モジュールは、メタデータをTypeScript / JavaScriptクラスに追加して、DataSource Jugglerのレガシー実行で使用するための専用のデコレーターを提供します。 さらに、`@loopback/repository-json-schema` モジュールは、デコレータのメタデータを使用して、一致するJSONスキーマを構築します。
　
- [**データソース**](DataSources.md): 外部システムのデータを表すコネクタインスタンスの、名前付きの設定です。

- [**リポジトリ**](Repositories.md): データソース内の、データのコレクションを表すサービスです。

- [**リレーション**](Relations.md): 2つのモデル間のマッピング。モデル間の実際のリンクを記述し、設定に基づいてCRUD APIを公開します。

- [**デコレーター**](Decorators.md): クラス宣言とそのメンバーに、メタデータを注釈または変更するために使用されるパターンです。
