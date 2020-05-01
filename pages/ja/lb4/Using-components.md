---
lang: ja
title: 'コンポーネントの使用方法'
keywords: LoopBack 4.0, LoopBack 4
sidebar: ja_lb4_sidebar
permalink: /doc/ja/lb4/Using-components.html
---

コンポーネントは、サードパーティの貢献をグループ化する手段として機能し、アプリケーションの拡張を容易にします。 詳細については、[コンポーネント](Components.md) を参照してください。

`app.component（）` メソッドを使用してアプリケーションにコンポーネントを追加できます。

以下は、コンポーネントのインストールと使用例です。

次の依存関係をインストールします。

```sh
npm install --save @loopback/authentication
```

アプリケーションにコンポーネントをロードするには、以下のように記述します。

```ts
import {RestApplication} from '@loopback/rest';
import {AuthenticationComponent} from '@loopback/authentication';

const app = new RestApplication();
// コンポーネントをアプリケーションに追加します。
// このコンポーネントは、認証された要求をシークエンスで解決するために使用されるバインディングを提供します。
app.component(AuthenticationComponent);
```

## 利用可能なコンポーネント

LoopBackには次のコンポーネントが用意されています。

### Boot コンポーネント

- [@loopback/boot](Booting-an-Application.md)

### Rest コンポーネント

- [@loopback/rest](Server.md)

### RestExplorer コンポーネント

- [@loopback/rest-explorer](Self-hosted-REST-API-Explorer.md)

### CrudRest コンポーネント

- [@loopback/rest-crud](Creating-CRUD-REST-apis.md)

### Authentication コンポーネント

- [@loopback/authentication](Loopback-component-authentication.md)

### Authorization コンポーネント

- [@loopback/authorization](Loopback-component-authorization.md)

### Lb3AppBooter コンポーネント

- [@loopback/booter-lb3app](Boot-and-Mount-a-LoopBack-3-application.md)

### Cron コンポーネント

- [@loopback/cron](Running-cron-jobs.md)

### クラウドネイティブ拡張機能

- ヘルスチェック: [@loopback/extension-health](Health.md) (テスト用)
- プロメテウスの指標: [@loopback/extension-metrics](Metrics.md)
  (テスト用)
