---
lang: zh
title: 'Todo tutorial'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/todo-tutorial.html
---

# @loopback/example-todo

这是 LoopBack 4 的基础入门教程！

## 概览

本教程演示了如何使用 LoopBack 4 为待办事项列表创建基本的 API。仅需 [5 个步骤](#steps)，即可为您的应用创建一个 REST 风格的 API。

![todo-tutorial-overview](https://loopback.io/pages/en/lb4/imgs/todo-overview.png)

## 准备

首先，您需要安装一个支持版本范围内的 Node：

- v10 版本或更高版本的 [Node.js](https://nodejs.org/en/)。

此外，本教程假定您熟悉相应的技术，语言和概念。

- JavaScript (ES6)
- [REST](http://www.restapitutorial.com/lessons/whatisrest.html)

最后，您需要安装 LoopBack 4 CLI 工具箱：

```sh
npm i -g @loopback/cli
```

## 教程

如遵循本教程，请从 [创建应用脚手架](http://loopback.io/doc/en/lb4/todo-tutorial-scaffolding.html) 部分开始。

### 步骤

1.  [创建应用脚手架](http://loopback.io/doc/en/lb4/todo-tutorial-scaffolding.html)
2.  [添加 Todo 的数据模型](http://loopback.io/doc/en/lb4/todo-tutorial-model.html)
3.  [添加一个数据源](http://loopback.io/doc/en/lb4/todo-tutorial-datasource.html)
4.  [添加一个存储库](http://loopback.io/doc/en/lb4/todo-tutorial-repository.html)
5.  [添加一个控制器](http://loopback.io/doc/en/lb4/todo-tutorial-controller.html)
6.  [整合到一起](http://loopback.io/doc/en/lb4/todo-tutorial-putting-it-together.html)
7.  奖励：
    [集成 geo-coding 服务](http://loopback.io/doc/en/lb4/todo-tutorial-geocoding-service.html)

## 试一试

如果您希望以示例应用程序的形式查看本教程的最终结果，请按照以下步骤操作：

1.  运行 `lb4 example` 命令，选择并克隆 todo 仓库：

    ```sh
    lb4 example todo
    ```

2.  进入对应目录：

    ```sh
    cd loopback4-example-todo
    ```

3.  运行应用：

    ```sh
    $ npm start

    Server is running at http://127.0.0.1:3000
    ```

您可以随意浏览应用程序的代码，以了解其工作方式。如果有兴趣逐步学习它的构建过程，请继续阅读本教程！

### 需要帮助?

查看我们的
[Slack](https://join.slack.com/t/loopbackio/shared_invite/zt-2s5ttd53m-yaYSDEpU5LSv9APk0KKVng)
来寻找关于本教程的帮助。

### 错误/反馈

在 [loopback-next](https://github.com/strongloop/loopback-next) 
中开一个问题，我们将为您解决。

## 贡献

- [指引](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)
- [加入团队](https://github.com/strongloop/loopback-next/issues/110)

## 测试

在根文件夹下运行 `npm test`。

## 贡献者

参见
[all contributors](https://github.com/strongloop/loopback-next/graphs/contributors).

## 许可

MIT
