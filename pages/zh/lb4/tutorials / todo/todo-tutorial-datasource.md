---
lang: zh
title: '添加数据源'
layout: translation
keywords: LoopBack 4.0, LoopBack 4, Node.js, TypeScript, OpenAPI, Tutorial
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/todo-tutorial-datasource.html
---

### 数据源

顾名思义，数据源是 LoopBack 连接到各种数据源（例如数据库，API，消息队列等）的一种方式。LoopBack 4 中使用 `DataSource` 作为连接器实例的配置，表示外部系统中的数据。`legacy-juggler-bridge` 使用连接器，提供了数据操作 LoopBack 4 存储库的能力。

在 LoopBack 4 中，数据源可以表示为强类型对象，并可以在整个应用程序中自由地传递给[注入器](../../Dependency-injection.md)。通常，在 LoopBack 4 中，数据源与[存储库](../../Repositories.md)结合使用以提供对数据的访问。

有关 LoopBack 中数据源的更多信息，参见[数据源](../../DataSources.md)。

由于我们的 Todo API 需要保留单个 Todo 的实例，因此我们需要创建一个数据源定义来实现这一点。

### 建立数据源

在项目文件夹中，我们将运行 `lb4 datasource` 命令来创建一个数据源。在本教程中，我们将使用 Juggler 随附的内存连接器。

```sh
lb4 datasource
? Datasource name: db
? Select the connector for db: In-memory db (supported by StrongLoop)
? window.localStorage key to use for persistence (browser only):
? Full path to file for persistence (server only): ./data/db.json

  create src/datasources/db.datasource.ts
  update src/datasources/index.ts

Datasource Db was created in src/datasources/
```

查看完整文件，参见
[`Todo` 示例](https://github.com/strongloop/loopback-next/tree/master/examples/todo/src/datasources).

{% include code-caption.html content="data/db.json" %}

```json
{
  "ids": {
    "Todo": 5
  },
  "models": {
    "Todo": {
      "1": "{\"title\":\"Take over the galaxy\",\"desc\":\"MWAHAHAHAHAHAHAHAHAHAHAHAHAMWAHAHAHAHAHAHAHAHAHAHAHAHA\",\"id\":1}",
      "2": "{\"title\":\"destroy alderaan\",\"desc\":\"Make sure there are no survivors left!\",\"id\":2}",
      "3": "{\"title\":\"play space invaders\",\"desc\":\"Become the very best!\",\"id\":3}",
      "4": "{\"title\":\"crush rebel scum\",\"desc\":\"Every.Last.One.\",\"id\":4}"
    }
  }
}
```

{% include note.html content="如果您使用关系数据库作为数据源，请不要忘了创建相应的表，或按照 [数据库迁移说明](https://loopback.io/doc/en/lb4/Database-migrations.html) 的编程方式创建它。" %}

准备就绪后，我们将继续为数据源添加
[存储库](todo-tutorial-repository.md) 了。

### 导航

上一步: [添加 Todo 数据模型](todo-tutorial-model.md)

下一步: [添加存储库](todo-tutorial-repository.md)
