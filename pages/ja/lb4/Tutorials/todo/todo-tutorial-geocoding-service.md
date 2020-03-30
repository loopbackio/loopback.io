---
lang: ja
title: 'ジオコーディングサービスと統合する'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/ja/lb4/todo-tutorial-geocoding-service.html
summary:
  LoopBack 4 Todoアプリケーションチュートリアル-ジオコーディングサービスとの統合
---

### サービス

LoopBackアプリケーションから、他のAPIとWebサービスを呼び出すには、[Service Proxies](../../Services.md)の使用をお勧めします。

サードパーティサービスとの通信の低レベルの実装詳細をカプセル化し、コントローラーなどから簡単に使用できるJavaScript / TypeScript APIを提供するための設計パターンとして、サービスプロキシを使用することをお勧めします。詳しくは、他のAPIおよびWebサービスの呼び出しを参照 してください。

To call other APIs and web services from LoopBack applications, we recommend to
use [Service Proxies](../../Services.md) as a design pattern for encapsulating
low-level implementation details of communication with 3rd-party services and
providing JavaScript/TypeScript API that's easy to consume e.g. from
Controllers. See
[Calling other APIs and web services](../../Calling-other-APIs-and-Web-Services.md)
for more details.

LoopBackでは、各サービスプロキシは[DataSource](./todo-tutorial-datasource.md)によってサポートされ す。このデータソースは、サービスコネクタの1つを利用して、送信リクエストを作成し、サービスから返された応答を解析します。

このチュートリアルでは、 [US Census Geocoder API](https://geocoding.geo.census.gov/geocoder/) を利用して、テキストのUSアドレスをGPS座標に変換します。これにより、Todo APIのクライアントアプリケーションが、ロケーションベースのリマインダーを表示できるようになります。

{% include tip.html content="
ヒント： 実際のプロジェクトでは、アメリカ以外の国をカバーし、アメリカの国勢調査ジオコーダーAPIよりも高速なレスポンスを提供するジオコーディングサービス（例えば、IBMの[Weather Company Data](https://console.bluemix.net/catalog/services/weather-company-data)や[Google Maps Platform](https://developers.google.com/maps/documentation/geocoding)などを使用することができます。
" %}

### 　バッキングデータソースを構成する

 `lb4 datasource`を実行して、 Geocoder RESTサービスに接続する新しいデータソースを定義します。使用するコネクタを求められたら、「RESTサービス」を選択します。

```
$ lb4 datasource
? Datasource name: geocoder
? Select the connector for geocoder: REST services (supported by StrongLoop)
? Base URL for the REST service:
? Default options for the request:
? An array of operation templates:
? Use default CRUD mapping: No
   create src/datasources/geocoder.datasource.config.json
   create src/datasources/geocoder.datasource.ts
 # npm will install dependencies now
    update src/datasources/index.ts

Datasource Geocoder was created in src/datasources/
```

新しく作成したデータソース構成を編集して、Geocoder APIエンドポイントを構成します。RESTコネクタによって提供される構成オプションについては、こちらのドキュメント[REST connector](/doc/en/lb4/REST-connector.html)で説明しています。

{% include code-caption.html content="/src/datasources/geocoder.datasource.config.json" %}

```json
{
  "name": "geocoder",
  "connector": "rest",
  "options": {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json"
    }
  },
  "operations": [
    {
      "template": {
        "method": "GET",
        "url": "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress",
        "query": {
          "format": "{format=json}",
          "benchmark": "Public_AR_Current",
          "address": "{address}"
        },
        "responsePath": "$.result.addressMatches[*].coordinates"
      },
      "functions": {
        "geocode": ["address"]
      }
    }
  ]
}
```

### サービスプロバイダーを実装する

ジオコーダーサービスを作成するため、`lb4 service`コマンドと次のコードを書きます。

```sh
lb4 service
? Service type: Remote service proxy backed by a data source
? Please select the datasource GeocoderDatasource
? Service name: geocoder
   create src/services/geocoder.service.ts
   update src/services/index.ts

Service Geocoder was created in src/services/
```

次のように、`src/services/geocoder.service.ts`で、 `GeoPoint` インターフェイスと
`geocode` 関数を、`Geocoder`インターフェイスに追加します。

{% include code-caption.html content="src/services/geocoder.service.ts" %}

```ts
import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GeocoderDataSource} from '../datasources';

// Add the following interface
export interface GeoPoint {
  /**
   * latitude
   */
  y: number;

  /**
   * longitude
   */
  x: number;
}

export interface Geocoder {
  // Add the following property
  geocode(address: string): Promise<GeoPoint[]>;
}

export class GeocoderProvider implements Provider<Geocoder> {
  constructor(
    // geocoder must match the name property in the datasource json file
    @inject('datasources.geocoder')
    protected dataSource: GeocoderDataSource = new GeocoderDataSource(),
  ) {}

  value(): Promise<Geocoder> {
    return getService(this.dataSource);
  }
}
```

### ロケーションデータでTo doモデルを強化する

To doモデルに、 `remindAtAddress` and `remindAtGeo`の２つの新しいモデルを追加します。

{% include code-caption.html content="src/models/todo.model.ts" %}

```ts
@model()
export class Todo extends Entity {
  // original code remains unchanged, add the following two properties:

  @property({
    type: 'string',
  })
  remindAtAddress?: string; // address,city,zipcode

  @property({
    type: 'string',
  })
  remindAtGeo?: string; // latitude,longitude
}
```

### コントローラでアドレスの場所を検索します

最後に、`TodoController`を修正して、住所を検索し、新しいTodoアイテムが作成されたときにGPS座標に変換するようにします。
`TodoController` に`Geocoder` をインポートし、コントローラコンストラクタを変更して、`Geocoder`を新しい依存関係として受け取ります。

{% include code-caption.html content="src/controllers/todo.controller.ts" %}

```ts
import {inject} from '@loopback/core';
import {Geocoder} from '../services';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
    @inject('services.Geocoder') protected geoService: Geocoder,
  ) {}

  // etc.
}
```

 `create`メソッドを修正して、`remindAtAddress`プロパティ内の住所を検索して、`remindAtGeo`内のGPS座標に変更できるようにします。
プロパティでcreate指定された住所を検索して、にremindAtAddress保存されているGPS座標に変換するようにメソッドを変更しremindAtGeoます。

{% include code-caption.html content="src/controllers/todo.controller.ts" %}

```ts
export class TodoController {
  // constructor, etc.

  @post('/todos', {
    responses: {
      '200': {
        description: 'Todo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {title: 'NewTodo', exclude: ['id']}),
        },
      },
    })
    todo: Omit<Todo, 'id'>,
  ): Promise<Todo> {
    if (todo.remindAtAddress) {
      const geo = await this.geoService.geocode(todo.remindAtAddress);

      if (!geo[0]) {
        // address not found
        throw new HttpErrors.BadRequest(
          `Address not found: ${todo.remindAtAddress}`,
        );
      }

      // Encode the coordinates as "lat,lng" (Google Maps API format). See also
      // https://stackoverflow.com/q/7309121/69868
      // https://gis.stackexchange.com/q/7379
      todo.remindAtGeo = `${geo[0].y},${geo[0].x}`;
    }
    return this.todoRepository.create(todo);
  }

  // other endpoints remain unchanged
}
```

{% include warning.html content="
警告：一部のアドレスは見つからない可能性があり、その場合リクエストは拒否されます。
" %}

Congratulations! Now your Todo API makes it easy to enter an address for a
reminder and have the client application show the reminder when the device
reaches close proximity of that address based on GPS location.

### ナビゲーション

前のステップ: [統合する](todo-tutorial-putting-it-together.md)
