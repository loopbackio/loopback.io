---
lang: ja
title: LoopBack 4
toc: false
keywords: LoopBack 4
sidebar: ja_lb4_sidebar
permalink: /doc/ja/lb4/index.html
summary: LoopBack is a platform for building APIs and microservices in Node.js
---

{％include see-also.html title = "GitHub レポジトリ" content = 'LoopBack 4フレームワークのコードは、Loopback version3のように複数リポジトリに跨らず、
1つの「モノリポジトリ」[loopback-next]（https://github.com/strongloop/loopback-next）にて開発されています。
ただし、exampleと外部開発によるコンポーネントは、別のリポジトリに格納されます。
'％}

{％include note.html content = "この記事は、コミュニティによる日本語翻訳です。最新情報については、[英語版]（/ doc / en / lb4 / index.html）を参照してください。"％}

LoopBackは、Expressをベースにした非常に拡張性の高い、オープンソースのNode.jsフレームワークです。
これにより、データベースやSOAPまたはRESTサービスなどへ接続を行うAPIおよびマイクロサービスを迅速に作成できます。

以下の図はLoopBackがコンポジションブリッジとして提供する、送られてきたリクエストをどのように他のサービス(DBなど)へ接続しているかを示す構成図です。
またLoopBackが提供するさまざまな機能に対し、どのような登場人物がどこで関わるかも示しています。

![LoopBack 4 Overview](../../en/lb4/imgs/lb4-high-level.png)

## API開発者としてのメリット
- APIエンドポイントを[OpenAPI](https://www.openapis.org/) 標準にしたがって定義しましょう。
- エンドポイントをモダンなJavaScript、ES2017の`async` / `await`,modulesを使って書きましょう。
- 定義済みのエンドポイントとスキーマをソースコードとして使用できます。コードを生成する必要はありません。

## チームとしてのメリット
- 全てのJavaScriptコードを見ずともAPIをレビューできます。
- エンドポイントとスキーマの検証を自動化して一貫性を維持することができます。
- [TypeScript](https://www.typescriptlang.org) が標準的な開発言語になります。

## プラットフォームとしてのメリット
 -  LoopBackを自分のフレームワークまたはプラットフォームの呼び出し地点として使用できます。
 - 標準化された方法で再利用可能なコンポーネントのライブラリを構築できます。
 - コネクタを使用してデータベース、Webサービス、およびその他のプラットフォームと統合できます。
