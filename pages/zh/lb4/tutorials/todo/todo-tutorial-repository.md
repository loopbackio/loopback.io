---
lang: zh
title: '添加存储库(Repository)'
layout: translation
keywords: LoopBack 4.0, LoopBack 4, Node.js, TypeScript, OpenAPI, Tutorial
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/todo-tutorial-repository.html
---

### 存储库（Repository）

存储库模式使 LoopBack 3 和 LoopBack 4 最根本的区别之一。在 LoopBack 3 中，您将使用模型类中定义它们以执行 CRUD 操作。在 LoopBack 4 中，该操作将从模型的定义中分离出来，并转移到存储库层中完成。

`存储库`表示一个专用的`服务`接口，该接口将针对基础数据库，提供模型域的强类型数据访问（例如 CRUD）操作。

了解有关存储库的更多信息，参见
[存储库](../../Repositories.md).

### 创建存储库

在项目文件夹内部，运行 `lb4 repository` 命令，使用上一步中的 db 数据源为您的待办事项模型创建一个存储库。`db` 数据源在可用的数据源列表中将以其类名 `DbDataSource` 被显式出来。

```sh
lb4 repository
? Please select the datasource DbDatasource
? Select the model(s) you want to generate a repository Todo
? Please select the repository base class DefaultCrudRepository (Legacy juggler
bridge)

   create src/repositories/todo.repository.ts
   update src/repositories/index.ts

Repository TodoRepository was created in src/repositories/
```


在 `src/repositories/index.ts` 中集中导出所有 repository，其他文件在导入时也会更加便捷。

新创建的 `todo.repository.ts` 类中含有为 to-do 模型执行 CRUD 操作所需的必要连接。
它利用 Todo 模型的定义和 “db” 数据源的配置，以及使用[依赖注入](https://loopback.io/doc/en/lb4/Dependency-injection.html)的方式来检索数据源。


查看最终文件，参见
[`Todo` 示例](https://github.com/strongloop/loopback-next/blob/master/examples/todo/src/repositories/todo.repository.ts).

现在，我们可以通过
[控制器](todo-tutorial-controller.md) 发布 `Todo` API 了。

### 导航

上一步: [添加数据源](todo-tutorial-datasource.md)

下一步: [添加控制器](todo-tutorial-controller.md)
