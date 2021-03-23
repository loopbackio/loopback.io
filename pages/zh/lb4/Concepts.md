---
lang: zh
title: "关键概念（Key Concepts）"
keywords: LoopBack 4.0, LoopBack 4
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/Concepts.html
layout: translation
---

LoopBack 4 定义了一些组件模块来表达典型的 API 和微微服务应用程序的职责。

![Key concepts overview diagram](imgs/key-concepts-overview-diagram.png)

- [**应用（Application）**](Application.md)：这是一个重要的类，用于设置你所有的模块组件、控制器、服务器和绑定。Application 类扩展了[上下文（Context）](Context.md) ，并且提供了启动和停止相关服务器的控制方法。
- [**控制器（Controller）**](Controllers.md)： 用于实现 REST API 的定义的操作的类。它实现了一个应用的业务逻辑，并作为“HTTP/REST API”和“域/数据库模型”之间的桥梁。 控制器仅对“已处理的输入”和“后端服务/数据库”的抽象进行操作。
- [**拦截器（Interceptors）**](Interceptors.md)：用于拦截“类的静态方法”或“对象的实例方法”的调用的函数。
- [**路由（Route）**](Routes.md)：映射你的 API 规范（Specification）和操作（Operation）。它告诉 LoopBack，当获得一个 HTTP 请求时，要去`invoke()` （调用）哪个操作（Operation）。
- [**时序（Sequence）**](Sequence.md)：无状态的[Actions](Sequence.md#actions)组，用于控制服务器如何响应（Response）一个请求（Request）。
- [**数据模型（Model）**](Model.md)：遵照数据源映射（DataSource Juggler）定义对象。`@loopback/repository`模块提供了特殊的修饰符（Decorators）以添加元数据到 TypeScript 或 JavaScript 类，可以用于传统的数据源映射实现。此外，`@loopback/repository-json-schema`模块使用修饰符元数据来构建对应的 JSON 架构。
- [**数据源（DataSources）**](DataSources.md)： 连接器（Connector）的命名配置实例，代表了外部系统的数据。
- [**存储库（Repository）**](Repositories.md)：代表了一个数据源（DataSource）中的数据集合的服务。
- [**关系（Relation）**](Relations.md)：描述了两个数据模型（Models）在现实世界的关联的映射。它基于配置，暴露 CRUD 相关 API。
- [**修饰符（Decorator）**](Decorators.md)： 用元数据注释和修改你的类及其成员的方式。
