---
lang: zh
title: '关键概念'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/Concepts.html
---

LoopBack 4 定义了一些组件模块来表达典型的API和微微服务应用程序的职责。

![Key concepts overview diagram](imgs/key-concepts-overview-diagram.png)

- [**Application**](Application.md)（应用）：这是一个重要的类，用于设置你所有的模块组件、控制器、服务器和绑定。Application类扩展了[Context](Context.md) （上下文），并且提供了启动和停止相关服务器的控制方法。
- [**Controller**](Controllers.md)（控制器）： 用于实现REST API的操作定义的类。它实现了一个应用的业务逻辑，并作为“HTTP / REST API”和“域 / 数据库模型”之间的桥梁。 控制器仅对已“处理的输入”和“后端服务/数据库”的抽象进行操作。
- [**Interceptors**](Interceptors.md)（拦截器）：用于拦截“类的静态方法”或“对象的实例方法”的调用的函数。
- [**Route**](Routes.md)（路由）：映射你的API规范和Operation（操作）。它告诉LoopBack，当获得一个HTTP请求时，要去`invoke()` （调用）哪个Operation（操作）。
- [**Sequence**](Sequence.md)（序列）：无状态的[Actions](Sequence.md#actions)组，用于控制服务器如何回复（Response）一个请求（Request）。
- [**Model**](Model.md)（数据模型）：遵照DataSource Juggler（数据源映射）定义对象。`@loopback/repository`模块提供了特殊的Decorators（修饰符）以添加元数据到TypeScript/JavaScript类，可以用于传统的数据源映射实现。此外，`@loopback/repository-json-schema`模块使用修饰符元数据来构建对应的JSON架构。
- [**DataSources**](DataSources.md)（数据源）： Connector（连接器）的命名配置实例，代表了外部系统的数据。
- [**Repository**](Repositories.md)（存储库）：代表了一个DataSource（数据源）中的数据集合的服务。
- [**Relation**](Relations.md)（关系）：描述了两个Models（数据模块）在现实世界的关联的映射。它基于配置，暴露CRUD相关API。
- [**Decorator**](Decorators.md)（修饰符）： 用元数据注释和修改你的类及其成员的方式。
