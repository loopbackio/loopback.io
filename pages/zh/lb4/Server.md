---
lang: zh
title: 'Server（服务器）'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/Server.html
---

## 总览

[Server](https://loopback.io/doc/zh/lb4/apidocs.core.server.html)（服务器）接口定义了必须的函数（start和stop）和一个“listening”属性
以实现LoopBack应用程序。在LoopBack 4中，Server（服务器）用于代表“入站传输”和/或“协议”，例如：REST over http，gRPC over http2，graphQL over https等。它们一般监听特定端口的Request（请求），处理请求，并且返回适当的Response（响应）。
一个Application（应用）可以有多个Server（服务器）实例、监听不同的端口、以不同的协议工作。

## 用法

LoopBack 4提供[`@loopback/rest`](https://github.com/strongloop/loopback-next/tree/master/packages/rest)这一“开箱即用”包，它提供了基于HTTP/HTTPS的服务器`RestServer`用于处理REST请求。

要在你的应用中使用此包，你的Application类需要扩展`RestApplication`以提供一个`RestServer`的实例用于监听3000端口。
下列实例代码展示了如何使用`RestApplication`：

```ts
import {RestApplication, RestServer} from '@loopback/rest';

export class HelloWorldApp extends RestApplication {
  constructor() {
    super();
    // 给我们的RestServer实例一个时序处理函数，
    // 此函数会为所有的RestApplication请求返回"Hello World“字符串，
    // 处理函数可以注册在应用层。
    this.handler((sequence, request, response) => {
      sequence.send(response, 'Hello World!');
    });
  }

  async start() {
    // 在application类调用start，会启动所有的注册的服务器。
    await super.start();

    // 获得HTTP服务器的实例。
    const rest = await this.getServer(RestServer);
    console.log(`REST server running on port: ${await rest.get('rest.port')}`);
  }
}
```

## 配置

配置REST服务器，可以通过在你的RestApplication选项中传入`rest` 属性 。例如，下列代码可以自定义REST服务器的监听端口。

```ts
const app = new RestApplication({
  rest: {
    port: 3001,
  },
});
```

### 自定义如何提供OpenAPI规范

在`rest.openApiSpec`有一些选项可以配置REST 服务器如何提供OpenAPI规范。

- servers: 配置OpenAPI规范的servers（服务器）。
- setServersFromRequest: 基于HTTP请求头设置`servers`，默认为`false`。
- disabled: 设为`true`以禁用OpenAPI规范。这同时也会禁用API Explorer。
- endpointMapping: 为不同格式的规范提供映射url。默认为：

```js
    {
      '/openapi.json': {version: '3.0.0', format: 'json'},
      '/openapi.yaml': {version: '3.0.0', format: 'yaml'},
    }
```

```ts
const app = new RestApplication({
  rest: {
    openApiSpec: {
      servers: [{url: 'http://127.0.0.1:8080'}],
      setServersFromRequest: false,
      endpointMapping: {
        '/openapi.json': {version: '3.0.0', format: 'json'},
        '/openapi.yaml': {version: '3.0.0', format: 'yaml'},
      },
    },
  },
});
```

### 配置API Explorer

LoopBack允许为REST服务器提供外部托管API Explorer界面，此类URL使用`rest.apiExplorer`指明：

- url：托管API Explorer界面的URL，默认为`https://loopback.io/api-explorer`。
- httpUrl：托管API explorer界面的URL，通过普通的http提供，以处理当规范通过HTTP暴露时，浏览器默认的混合内容安全加强。
  详情查看此页面：https://github.com/strongloop/loopback-next/issues/1603。
  默认使用`url`的值。

```ts
const app = new RestApplication({
  rest: {
    apiExplorer: {
      url: 'https://petstore.swagger.io',
      httpUrl: 'http://petstore.swagger.io',
    },
  },
});
```

#### 禁止重定向到API Explorer

如要禁止重定向到外部托管的API Explorer，设置配置选项`rest.apiExplorer.disabled`为`true`。

```ts
const app = new RestApplication({
  rest: {
    apiExplorer: {
      disabled: true,
    },
  },
});
```

### 使用自托管的API Explorer

托管API Explorer到外部URL有一些缺点，例如，需要一个可以正常工作的互联网以浏览API。作为一个替代建议，LoopBack带有扩展，用于提供自托管的API Explorer界面。
更多详情参见[自托管的REST API Explorer](./Self-hosted-REST-API-Explorer.md)。

### 启用HTTPS

为LoopBack REST服务器启用HTTPS，只需要指明协议为`https`并指明证书。

下面这个应用中，我们配置了一个使用秘钥-证书链的变种HTTPS的最小应用。

```ts
import {RestApplication, RestServer, RestBindings} from '@loopback/rest';
import * as fs from 'fs';

export async function main() {
  const options = {
    rest: {
      protocol: 'https',
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
    },
  };
  const app = new RestApplication(options);
  app.handler(handler => {
    handler.response.send('Hello');
  });
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
}
```

### 自定义CORS

REST服务器默认使用以下选项启用[CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

```ts
{
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400,
  credentials: true,
}
```

Application通过REST配置自定义CORS：

```ts
export async function main() {
  const options = {
    rest: {
      cors: {...},
    },
  };
  const app = new RestApplication(options);
}
```

CORS的完整选项列表，参见此页：https://github.com/expressjs/cors#configuration-options。

### 快捷设置

覆盖默认的快捷设置和/或分配你自己的设置：

```ts
const app = new RestApplication({
  rest: {
    expressSettings: {
      'x-powered-by': false,
      env: 'production',
      ...
    },
  },
});
```

查看`express` [documentation](http://expressjs.com/fr/api.html#app.set)以了解更多关于内置设置的详情。

### 配置基本路径（Base Path）

有时候，合意使用基本路径（Base Path）暴露REST服务端，例如`/api`。
基本路径（Base Path）是RestServer配置的一部分。

```ts
const app = new RestApplication({
  rest: {
    basePath: '/api',
  },
});
```

`RestApplication`和`RestServer`都提供`basePath()` API：

```ts
const app: RestApplication;
// ...
app.basePath('/api');
```

当有配置`basePath`时，所有的REST API和静态资产都通过`basePath`开头的URL提供。

### 配置路由器

路由器可以由以下方式被配置为强制`strict`（严格）模式：

1. `strict`为`true`：

- 请求`/orders`符合路由`/orders`但不符合`/orders/`
- 请求`/orders/` 符合路由`/orders/`但不符合`/orders`

2. `strict`为`false `（默认）

- 请求`/orders`首先符合路由`/orders`然后才是`/orders/`
- 请求`/orders/`首先符合路由`/orders/`然后才是`/orders`

查阅`strict routing`（严格路由）http://expressjs.com/en/4x/api.html#app以获得更多信息。

### 配置请求体Parser（解析器）选项

我们可以通过下列代码配置请求体解析器：

```ts
const app = new Application({
  rest: {requestBodyParser: {json: {limit: '1mb'}}},
});
```

`rest.requestBodyParser`的值会被绑定到`RestBindings.REQUEST_BODY_PARSER_OPTIONS`。
查阅[Customize request body parser options](Parsing-requests.md#customize-parser-options)以了解详情。

### `rest`选项

| 属性              | 类型                     | 描述                                                         |
| ----------------- | ------------------------ | ------------------------------------------------------------ |
| host              | string                   | 指明RestServer将要监听的服务器名或IP地址。                   |
| port              | number                   | 指明RestServer将要监听的端口。                               |
| protocol          | string (http/https)      | 指明RestServer将要监听的协议。                               |
| basePath          | string                   | 指明RestServer暴露的HTTP服务端的base path（基本路径）。      |
| key               | string                   | 为HTTPS指明SSL私钥。                                         |
| cert              | string                   | 为HTTPS指明SSL证书。                                         |
| cors              | CorsOptions              | 指明CORS选项。                                               |
| sequence          | SequenceHandler          | 使用自定义的SequenceHandler以改变RestServer 的Request（请求）-Response（响应）生命周期。 |
| openApiSpec       | OpenApiSpecOptions       | 自定义如何提供OpenAPI规范。                                  |
| apiExplorer       | ApiExplorerOptions       | 自定义如何提供API Explorer。                                 |
| requestBodyParser | RequestBodyParserOptions | 自定义如何解析请求体。                                       |
| router            | RouterOptions            | 自定义如何路由以`/`结尾的请求。                              |

## 为application实例添加服务器

你可以通过个别调用`app.server()`函数，或以数组的方式使用`app.servers()`函数。
使用`app.server()`允许你为每个服务器实例设置独立的键。
下列代码演示了如何使用这些函数：

```ts
import {Application} from '@loopback/core';
import {RestServer} from '@loopback/rest';

export class HelloWorldApp extends Application {
  constructor() {
    super();
    // 这个服务器实例会被绑定到“servers.fooServer”。
    this.server(RestServer, 'fooServer');
    // 为"servers.MQTTServer"和"servers.SOAPServer"创建绑定。
    this.servers([MQTTServer, SOAPServer]);
  }
}
```

你同样可以在你的Application类的构造函数中添加多个服务器，请参考[这个页面](Application.md#servers).

## 下一步

- 学习关于 [服务器层上下文](Context.md#server-level-context)
- 学习关于[创建你自己的服务器](Creating-components.md#creating-your-own-servers)
