---
lang: ja
title: 'よくある質問'
keywords: LoopBack 4.0, LoopBack 4
sidebar: ja_lb4_sidebar
permalink: /doc/ja/lb4/FAQ.html
summary: LoopBack4は完全に新しいフレームワークで、LoopBack-Nextとも呼ばれます。
---

### LoopBack4の裏にあるビジョンは何か？

- 複雑な統合を必要とするアプリの構築をさらに簡単にする
- 拡張機能のエコシステムを有効にする
- 小型、高速、柔軟、強力なコア
- 小規模および大規模なチームに適する
- 最小限の意見で、代わりにチームの意見を強化する

詳細については、[LoopBack4の作成](Crafting-LoopBack-4.md)を参照してください。

### チュートリアルはどこにあるか？

[サンプル](Examples.md)および[チュートリアル](Tutorials.md)を参照してください。

### 今後、どんな機能が計画されているか？

我々のロードマップは[ここ](https://github.com/strongloop/loopback-next/labels/roadmap)にキャプチャされています。 加えて、[毎月のマイルストーンプラン](https://github.com/strongloop/loopback-next/labels/Monthly%20Milestone)も是非ご覧ください。

LoopBack 3のユーザー向けには、今後実装したいLB3機能パリティのリストを共有します。
https://github.com/strongloop/loopback-next/issues/1920.

それ以外にあなたが考える機能があれば、是非、[loopback-next/issues/new](https://github.com/strongloop/loopback-next/issues/new)から機能のリクエストをください。

### TypeScriptを選ぶ理由

開発者は引き続きJavaScriptまたはTypeScriptのいずれかでアプリケーションロジックを記述できますが、LoopBack4のコアはTypeScriptで記述されています。その理由は次のとおりです。

- **開発者の生産性とスケーラビリティの向上**。
  私たちの顧客は、数十、さらには数百の開発者にまで拡張できるフレームワークを必要としています。
  この拡張性こそが、TypeScriptが存在し、近年その勢いを増している理由と言えます。
- **拡張性の向上**と柔軟性。
  LoopBack4のコアは、明確に定義された拡張ポイントを備えたLoopBack3.xよりもシンプルです。 
  多くの責任は、JavaScriptまたはTypeScriptである拡張機能（コンポーネント）にシフトされています。
- 統一されたツール。 TypeScript開発者は全員、同じIDEであるVisual Studio Codeを使用しています。
  LoopBackエコシステムは、いつの日かそのIDEに関する便利なベストプラクティスや、優れた開発者プラグインで満たされる可能性があります。 現在、その取り組みはさまざまなエディターに分かれており、まだ存在しません。
- **将来を見据えて**。最新および将来のJavaScriptの構成を活用する力があります。

TypeScriptの静的分析のサポートにより、より堅牢なツールが使用可能になり、スケーラビリティのベースを構成しています。 これには、一般的な人為的エラーなしでコードを簡単にリファクタリングする機能、開発およびコンパイル時のエラーチェック機能が含まれています。 例えば、多くの人は、複雑なリンティングソリューション（多くのプロジェクトで機能するリンティング構成など）をセットアップするための専門知識と時間を持っていません。

詳細については、[#6](https://github.com/strongloop/loopback-next/issues/6) の議論を参照ください。

### JavaScriptは引き続き機能するか？

LoopBack4自体は、[TypeScript](https://www.typescriptlang.org)（JavaScriptにコンパイルされる）で記述されていますが、TypeScriptとJavaScriptの両方で記述されたアプリケーションをサポートしています。 ドキュメントでは、JavaScript言語の基本的な知識があることを前提として記載しています。 ドキュメントの「JavaScript」と表示されている部分は、ECMAScriptバージョン6（ES6）を前提として記載しています。

※ 一部の例ではES6構文を使用しています。 アロー関数、クラス、テンプレートリテラル、let、constステートメントなどのES6構成に慣れることをお勧めします。

### LoopBack3 vs LoopBack4

現在のユーザーは、LoopBack4に移行することをお勧めします。対応の開始は、[移行ガイド](migration-overview.html) に従って実施してください。
2つのバージョンの違いに興味がある場合は、[LoopBack v3とv4の違い](Understanding-the-differences.md) を参照してください。

### API Explorerを無効にするにはどうすればよいか？

LoopBackは、自己ホスト型と[外部API Explorer](https://explorer.loopback.io) へのリダイレクトを提供します。

両方のAPI Explorerを無効にするためのドキュメント：

- [API Explorerへのリダイレクトを無効にする](https://loopback.io/doc/en/lb4/Self-hosted-rest-api-explorer.html#disable-self-hosted-api-explorer)
- [セルフホストAPIエクスプローラーを無効にする](https://loopback.io/doc/en/lb4/Self-hosted-rest-api-explorer.html#disable-self-hosted-api-explorer)

### カスタム応答を送信するにはどうすればよいか？

#### カスタムレスポンス本文を返す

応答は通常、呼び出されるコントローラー関数によって返される値で決定されます。 その代表例は、すべてのLoopBack4アプリケーションに組み込まれたデフォルトの `PingController`です。：

```ts
// 注：簡潔にするためにコードを短くしました

// 「GET/ping」 にマッピングします
@get('/ping', {
  responses: {
    '200': PING_RESPONSE,
  },
})
ping(): object {
  // 返すgreetingメッセージ、現在時刻、URL、リクエストヘッダーを設定します
  return {
    greeting: 'Hello from LoopBack',
    date: new Date(),
    url: this.req.url,
    headers: Object.assign({}, this.req.headers),
  };
}
}

```

この例では、 `ping()`関数がカスタムオブジェクトを返すことがわかります。 これは、APIコンシューマーが `/ping`にリクエストを送信すると、応答本文に反映されます。

#### 応答をさらにカスタマイズする方法

応答の他の部分（HTTPヘッダーなど）を変更する必要がある場合があります。 その場合は、 `Response`オブジェクトをコントローラーに注入することで対応できます。：

```ts
import {inject} from '@loopback/context';
import {get, Response, RestBindings} from '@loopback/rest';

export class PingController {
  constructor(@inject(RestBindings.Http.RESPONSE) private res: Response) {}

  // 「GET/ping」にマッピングします
  @get('/ping', {
    responses: {
      '200': {
        description: 'Ping Response',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              title: 'PingResponse',
              properties: {
                greeting: {type: 'string'},
                additionalProperties: false,
              },
            },
          },
        },
      },
    },
  })
  ping(): object {
    this.res.setHeader('x-secret-sauce', 'Sugar, spice and everything nice.');

    // 返すgreetingメッセージを設定します
    return {
      greeting: 'Hello from LoopBack',
    };
  }
}
```

これにより、カスタムレスポンスの本文と新しいヘッダー `x-secret-sauce`が生成されます。

{% include note.html content="現在、LoopBack4はOpenAPI仕様に対してサーバーの応答を検証していませんが、 上記のコードで示したように`responses`オブジェクトを実際の応答と一致させて、APIコンシューマーとOAS3ジェネレーターが別の応答を期待して誤解されないように対応することをお勧めします 。" %}

### デフォルトのバインディングキーはどこにあるか？

`@loopback/*`パッケージで使用されるバインディングキーは、[予約済みバインディングキー](https://loopback.io/doc/en/lb4/Reserved-binding-keys.html) に統合されます。

### 一般バインディングと構成バインディングの違いは何か？

構成バインディングは、一般的なバインディングAPIを利用して、完全に別個のキーを作成する必要がある構成バインディングキーの命名規則を標準化するAPIです。 [慣例による設定](https://loopback.io/doc/en/lb4/Context.html#configuration-by-convention) を参照してください。

### Expressルーターを接続できるか？

はい。 [Expressルーターのマウント](https://loopback.io/doc/en/lb4/Routes.html#mounting-an-express-router) を参照してください。

### Expressミドルウェアをマウントできるか？

LoopBack4は、Expressミドルウェアについてファーストクラスのサポートに対応していません。 ただし、[回避策](https://github.com/strongloop/loopback-next/issues/1293) があります。
