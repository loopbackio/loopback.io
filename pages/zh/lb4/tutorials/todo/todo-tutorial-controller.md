---
lang: zh
title: '添加控制器(Controller)'
layout: translation
keywords: LoopBack 4.0, LoopBack 4, Node.js, TypeScript, OpenAPI, Tutorial
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/todo-tutorial-controller.html
---

### 控制器（Controllers）

在 LoopBack 4 中，[控制器](../../Controllers.md) 处理的是 API 的请求 - 响应生命周期。控制器上的每个函数都可以单独寻址，用以处理传入的请求（例如 `/todos` 对应的 POST 请求），函数方法内可以执行一些业务逻辑，并且返回一个响应。

`Controller` 是一个类，用于实现有应用的 API 定义的操作，它实现了应用的业务逻辑，并充当了 HTTP/REST API 和 域/数据库模型 之间的桥梁。

也就是说，控制器是大多数业务逻辑存在的地方。

有关控制器的更多信息，请参见
[控制器](https://loopback.io/doc/en/lb4/Controllers.html).

### 创建控制器

您可以使用 CLI 创建 REST 控制器，如下所示：

```sh
lb4 controller
? Controller class name: todo
Controller Todo will be created in src/controllers/todo.controller.ts

? What kind of controller would you like to generate? REST Controller with CRUD functions
? What is the name of the model to use with this CRUD repository? Todo
? What is the name of your CRUD repository? TodoRepository
? What is the name of ID property? id
? What is the type of your ID? number
? Is the id omitted when creating a new instance? Yes
? What is the base HTTP path name of the CRUD operations? /todos
   create src/controllers/todo.controller.ts
   update src/controllers/index.ts

Controller Todo was created in src/controllers/
```

我们来看一下 `src/controllers/todo.controller.ts` 中的 `Todo 控制器`，每当接收到请求时，`@repository` 将检索并注入 TodoRepository 的实例。控制器对象的生命周期就是每个请求的生命周期，这意味着每个请求都将有一个新的控制器实例。最终，我们要注入 `TodoRepository`，因为创建这些实例比创建新的控制器实例要复杂得多。

{% include note.html content="您可以 LoopBack 4 中所有绑定设置自定义的生命周期。控制器可以轻松地使用单例生命周期，将启动成本缩减到最低。更多相关信息请参见文档中的[依赖注入](../../Dependency-injection.md) 部分。" %}

在此示例中，两个新的装饰器会为 LoopBack 提供路由、动作和请求体的接收格式：

- `@post('/todos')` 为 `@loopback/rest` 创建元数据，以便在路径和动作匹配时可以将请求重定向到此函数上。
- `@requestBody()` 将待办事项的 OpenAPI 架构与请求体相关联，以便 LoopBack 可以验证传入请求的格式。

有关此示例的其他注意事项：

- 像 `@get('/todos/{id}')` 这样的路由可以和 `@param.path` 配对，以在请求时将这些值注入处理程序的函数中。
- LoopBack 的 `@param` 装饰器有一个完整包含其他“子装饰器”的命名空间，比如`@param.path`，`@param.query`，和 `@param.header` ，它们允许为 REST 请求的相关部分指定元数据。
- LoopBack 的 `@param.path` 和 `@param.query` 还提供了子修饰符，用于指定某些值的基类型，例如
`@param.path.number('id')`。

查看完整项目，请参见
[`Todo` 示例](https://github.com/strongloop/loopback-next/blob/master/examples/todo/src/controllers/todo.controller.ts).

现在我们已经连接了控制器，最后一步是将其全部绑定在[Application](todo-tutorial-putting-it-together.md)中!

### 导航

上一步: [添加存储库](todo-tutorial-repository.md)

最后一步: [整合](todo-tutorial-putting-it-together.md)
