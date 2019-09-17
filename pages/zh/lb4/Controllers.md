---
lang: zh
title: 'Controllers（控制器）'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/Controllers.html
---

## 总览

`Controller`是一个用于实现应用API定义的操作的类。它实现一个应用的业务逻辑， 它实现了一个应用的业务逻辑，并作为“HTTP / REST API”和“域 / 数据库模型”之间的桥梁。 

添加修饰符到`Controller`类及其成员，可以映射应用的API操作到对应的Controller（控制器）操作。 
`Controller`（控制器）仅对“已处理的输入”和“后端服务/数据库”的抽象进行操作。

本页面仅涵盖用于REST API的`Controller`（控制器）。

## Operations（操作）

在[Routes（路由）](Routes.md)示例的Operation（操作）中，`greet()`操作被定义为一个普通的JavaScript函数。The 

```ts
// 普通函数Operation
function greet(name: string) {
  return `hello ${name}`;
}

// 控制器方法Operation
class MyController {
  greet(name: string) {
    return `hello ${name}`;
  }
}
```

## 路由到Controller（控制器）

下面的示例是一个基本的API规范。这是一个[Operation Object（操作对象）](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#operationObject).

```ts
const spec = {
  parameters: [{name: 'name', schema: {type: 'string'}, in: 'query'}],
  responses: {
    '200': {
      description: 'greeting text',
      content: {
        'application/json': {
          schema: {type: 'string'},
        },
      },
    },
  },
};
```

定义`Routes`（路由）到Controller（控制器）方法，有数种方式。
第一个示例是普通地定义路由到控制器方法：

```ts
// ... 在你的application构造函数中
this.route('get', '/greet', spec, MyController, 'greet');
```

修饰符允许你使用路由元数据描述你的控制器方法，然后LoopBack可以替你调用`app.route()`函数。

```ts
import {get} from '@loopback/rest';

class MyController {
  @get('/greet', spec)
  greet(name: string) {
    return `hello ${name}`;
  }
}

// ... 在你的application构造函数中
this.controller(MyController);
```

## 指明Controller（控制器）的API

大型的LoopBack应用中，你可以使用OpenAPI规范来组织你的路由。
`@api`修饰符会取得一个类型为`ControllerSpec`，包含`basePath`字符串和[Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#paths-object)的规范。
注意，这_不是_一个完整的[OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#oasObject)规范。

```ts
// ... 在你的application构造函数中
this.api({
  openapi: '3.0.0',
  info: {
    title: 'Hello World App',
    version: '1.0.0',
  },
  paths: {
    '/greet': {
      get: {
        'x-operation-name': 'greet',
        'x-controller-name': 'MyController',
        parameters: [{name: 'name', schema: {type: 'string'}, in: 'query'}],
        responses: {
          '200': {
            description: 'greeting text',
            content: {
              'application/json': {
                schema: {type: 'string'},
              },
            },
          },
        },
      },
    },
  },
});
this.controller(MyController);
```

`@api`修饰符允许你使用一个规范来描述你的Controller（控制器），然后LoopBack可以替你调用`app.api()` 函数。

```ts
@api({
  openapi: '3.0.0',
  info: {
    title: 'Hello World App',
    version: '1.0.0',
  },
  paths: {
    '/greet': {
      get: {
        'x-operation-name': 'greet',
        'x-controller-name': 'MyController',
        parameters: [{name: 'name', schema: {type: 'string'}, in: 'query'}],
        responses: {
          '200': {
            description: 'greeting text',
            content: {
              'application/json': {
                schema: {type: 'string'},
              },
            },
          },
        },
      },
    },
  },
})
class MyController {
  greet(name: string) {
    return `hello ${name}`;
  }
}
app.controller(MyController);
```

## 编写Controller（控制器）方法

下面是一个Controller（控制器）的示例，使用了数种内置的助手（修饰符）。
这些助手给了LoopBack关于Controller（控制器）方法的提示。

```ts
import {HelloRepository} from '../repositories';
import {HelloMessage} from '../models';
import {get, param} from '@loopback/rest';
import {repository} from '@loopback/repository';

export class HelloController {
  constructor(
    @repository(HelloRepository) protected repository: HelloRepository,
  ) {}

  // 返回我们的对象的列表
  @get('/messages')
  async list(@param.query.number('limit') limit = 10): Promise<HelloMessage[]> {
    if (limit > 100) limit = 100; // 我们的逻辑
    return this.repository.find({limit}); // 来自我们的存储库的CRUD方法
  }
}
```

- `HelloRepository`扩展自`Repository`（存储库），这是LoopBack的一个数据库抽象。
  查阅[Repositories（存储库）](./Repositories.md) 获得更多信息。
- `HelloMessage` 返回一个随意的对象的`list`列表。
- `@get('/messages')`为OpenAPI规范自动创建[Paths Item Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#path-item-object)，同时也处理请求路由。
- `@param.query.number`指明了此规范的路由接受一个参数，此参数通过Query（查询）传递，并且为一个数字。

## 在Controller（控制器）中处理错误

为了Controller（控制器）方法抛出异常，需要用到`HttpErrors`类。`HttpErrors`导出自
[http-errors](https://www.npmjs.com/package/http-errors)，包含在`@loopback/rest` 包中。

Listed below are some of the most common error codes. The full list of supported
codes is found
[here](https://github.com/jshttp/http-errors#list-of-all-constructors).

| Status Code（状态码） | 错误                | 描述           |
| --------------------- | ------------------- | -------------- |
| 400                   | BadRequest          | 错误请求       |
| 401                   | Unauthorized        | 未授权         |
| 403                   | Forbidden           | 被禁止         |
| 404                   | NotFound            | 未找到         |
| 500                   | InternalServerError | 内部服务器错误 |
| 502                   | BadGateway          | 错误网关       |
| 503                   | ServiceUnavailable  | 服务不可用     |
| 504                   | GatewayTimeout      | 网关超时       |

下列示例展示了上述示例带有`HttpErrors`的改版，并附加了一个测试，以验证错误能够被确实地抛出。

{% include code-caption.html content="src/__tests__/integration/controllers/hello.controller.integration.ts" %}

```ts
import {HelloController} from '../../../controllers';
import {HelloRepository} from '../../../repositories';
import {testdb} from '../../fixtures/datasources/testdb.datasource';
import {expect} from '@loopback/testlab';
import {HttpErrors} from '@loopback/rest';

const HttpError = HttpErrors.HttpError;

describe('Hello Controller', () => {
  it('returns 422 Unprocessable Entity for non-positive limit', () => {
    const repo = new HelloRepository(testdb);
    const controller = new HelloController(repo);

    return expect(controller.list(0.4)).to.be.rejectedWith(HttpError, {
      message: 'limit is non-positive',
      statusCode: 422,
    });
  });
});
```

{% include code-caption.html content="src/controllers/hello.controller.ts" %}

```ts
import {HelloRepository} from '../repositories';
import {HelloMessage} from '../models';
import {get, param, HttpErrors} from '@loopback/rest';
import {repository} from '@loopback/repository';

export class HelloController {
  constructor(@repository(HelloRepository) protected repo: HelloRepository) {}

  // returns a list of our objects
  @get('/messages')
  async list(@param.query.number('limit') limit = 10): Promise<HelloMessage[]> {
    // throw an error when the parameter is not a non-positive integer
    if (!Number.isInteger(limit) || limit < 1) {
      throw new HttpErrors.UnprocessableEntity('limit is non-positive');
    } else if (limit > 100) {
      limit = 100;
    }
    return this.repo.find({limit});
  }
}
```
