---
lang: zh
title: "入门"
keywords: LoopBack 4.0, LoopBack 4
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/Getting-started.html
summary: 使用TypeScript编写和运行LoopBack 4 "Hello World"项目。
layout: translation
---

## 前置需求

安装[Node.js](https://nodejs.org/en/download/) （8.9 或更高版本），如果之前未曾安装。

## 安装 LoopBack 4 CLI

LoopBack 4 CLI 是基于命令行的项目脚手架，也是一个用于生成基本代码的扩展。CLI 提供了快速创建 LoopBack 4 项目的方式， 采取这种方式是一个良好的实践。

在命令行运行以下代码以安装全局的 CLI 程序。

```sh
npm i -g @loopback/cli
```

## 建立一个新的项目

CLI 工具会搭建项目的脚手架，配置 TypeScript 的编译器，并且安装所有其他需要的依赖。运行以下 CLI 命令来建立一个新的项目，然后依据提示输入信息：

```sh
lb4 app
```

根据提示输入信息如下：
（依序是：项目名、项目描述、项目根目录、Application 类名、开启功能选项）

```sh
? Project name: getting-started
? Project description: Getting started tutorial
? Project root directory: (getting-started)
? Application class name: StarterApplication
? Select features to enable in the project:
❯◉ Enable eslint: add a linter with pre-configured lint rules
 ◉ Enable prettier: install prettier to format code conforming to rules
 ◉ Enable mocha: install mocha to run tests
 ◉ Enable loopbackBuild: use @loopback/build helpers (e.g. lb-eslint)
 ◉ Enable vscode: add VSCode config files
 ◉ Enable docker: include Dockerfile and .dockerignore
 ◉ Enable repositories: include repository imports and RepositoryMixin
 ◉ Enable services: include service-proxy imports and ServiceMixin
```

### 启动项目

项目带有"ping"路由以便于测试。让我们试着启动项目：

```sh
cd getting-started
npm start
```

在浏览器中，访问<http://127.0.0.1:3000/ping>。

## 添加你自己的控制器

现在我们已经有了一个基本的项目，是时候添加我们自己的[controller](Controllers.md)（控制类）. 让我们添加一个简单的"Hello World"控制类，运行以下命令：

```sh
lb4 controller
```

- _注意： 如果你的项目仍然在运行中，在运行命令前，按**CTRL+C**来停止它。_

- 根据提示输入信息如下：
  （依序是：类名、自动生成代码模板。模板有空控制类和带有 CRUD 的控制类两种可供选择。）

  ```sh
  ? Controller class name: hello
  ? What kind of controller would you like to generate? Empty Controller
    create src/controllers/hello.controller.ts
    update src/controllers/index.ts

  Controller hello was now created in src/controllers/
  ```

- 复制并粘贴以下内容到文件`/src/controllers/hello.controller.ts`：

```ts
import { get } from "@loopback/rest";

export class HelloController {
  @get("/hello")
  hello(): string {
    return "Hello world!";
  }
}
```

- 用 `npm start`命令启动项目.

- 在浏览器中，访问<http://127.0.0.1:3000/hello> ，可以看到文字`Hello world!`

## 代码示例

此项目代码可在此处查看：
[hello-world](https://github.com/strongloop/loopback-next/tree/master/examples/hello-world)
