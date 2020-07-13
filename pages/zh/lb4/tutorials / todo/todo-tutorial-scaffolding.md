---
lang: zh
title: '创建应用脚手架'
layout: translation
keywords: LoopBack 4.0, LoopBack 4, Node.js, TypeScript, OpenAPI, Tutorial
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/todo-tutorial-scaffolding.html
---

### 创建应用脚手架

Loopback 4 CLI 工具箱附带了可以生成整个应用程序的模板，以及用于现有应用程序的工件（例如控制器、模型、存储库）。

使用工具箱生成应用程序，请运行 `lb4 app` 命令并填写屏幕提示。

```sh
$ lb4 app
? Project name: todo-list
? Project description: A todo list API made with LoopBack 4.
? Project root directory: (todo-list)
? Application class name: (TodoListApplication)
? Select features to enable in the project:
 ◉ Enable eslint: add a linter with pre-configured lint rules
 ◉ Enable prettier: install prettier to format code conforming to rules
 ◉ Enable mocha: install mocha to run tests
 ◉ Enable loopbackBuild: use @loopback/build helpers (e.g. lb-eslint)
 ◉ Enable vscode: add VSCode config files
 ◉ Enable docker: include Dockerfile and .dockerignore
 ◉ Enable repositories: include repository imports and RepositoryMixin
 ◉ Enable services: include service-proxy imports and ServiceMixin
 # npm will install dependencies now
 Application todo-list was created in todo-list.
```

在本教程中，请启用提示中的所有功能选项（如 LoopBack 版本、eslint、mocha 等）

### 结构

应用生成后的目录结构如下所示：

```text
public/
  index.html
src/
  __tests__/
    README.md
    acceptance/
      home-page.acceptance.ts
      ping.controller.acceptance.ts
      test-helper.ts
  controllers/
    index.ts
    README.md
    ping.controller.ts
  datasources/
    README.md
  models/
    README.md
  repositories/
    README.md
  application.ts
  index.ts
  migrate.ts
  sequence.ts
node_modules/
  ***
LICENSE
README.md
package.json
tsconfig.json
.eslintrc.js
.prettierrc
.mocharc.json
```

请注意，这里可能有一些额外的文件未被列举出来。

| 文件                                                     | 作用                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `package.json`                                           | 应用的 package 清单文件。 查看 [package.json](https://docs.npmjs.com/files/package.json) 获取更多细节。                                                                                                                                                                                                                                                             |
| `tsconfig.json`                                          | 用于配置 TypeScript 项目. 查看 [tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 获取更多细节。                                                                                                                                                                                                                                   |
| `.eslintrc.js`                                           | [ESLint configuration](https://eslint.org/docs/user-guide/configuring)                                                                                                                                                                                                                                                                                                   |
| `.prettierrc`                                            | [Prettier configuration](https://prettier.io/docs/en/configuration.html)                                                                                                                                                                                                                                                                                                 |
| `README.md`                                              | 为应用生成的基于 Markdown 的 README 文件。                                                                                                                                                                                                                                                                                                                |
| `LICENSE`                                                | MIT 许可证的副本。如果您不想使用此许可证，请删除此文件。                                                                                                                                                                                                                                                                              |
| `src/application.ts`                                     | 应用类，默认情况下继承了 [`RestApplication`](https://loopback.io/doc/en/lb4/apidocs.rest.restapplication.html) 。这是应用程序的起点，同时也是应用配置的地方。它还继承了定义数据源的 [`RepositoryMixin`](https://loopback.io/doc/en/lb4/apidocs.repository.repositorymixin.html) |
| `src/index.ts`                                           | 您的微服务的入口，可以在该文件中创建您的应用程序的实例，运行启动程序，然后运行 [`RestServer`](https://loopback.io/doc/en/lb4/apidocs.rest.restserver.html) 并将其实例绑定在应用上。                                                                                                                   |
| `src/sequence.ts`                                        | Sequence 类的扩展，用于定义 REST 请求/响应期间要采取的一系列操作。                                                                                                                                                                                                                                        |
| `src/controllers/README.md`                              | 控制器目录下的 README 文件，提供如何生成新控制器以及在何处查找更多信息的说明。                                                                                                                                                                                                                                                |
| `src/controllers/ping.controller.ts`                     | 一个基本的控制器，定义了 GET `/ping` 的请求和响应。                                                                                                                                                                                                                                                                                                             |
| `src/datasources/README.md`                              | 数据源目录下的 README 文件，提供如何生成新数据源以及在何处查找更多信息的说明。                                                                                                                                                                                                                                               |
| `src/models/README.md`                                   | 模型目录下的 README 文件，提供如何生成新模型以及在何处查找更多信息的说明。                                                                                                                                                                                                                                                         |
| `src/repositories/README.md`                             | 存储库目录下的README文件，提供如何生成新的存储库以及在何处查找更多信息的说明。                                                                                                                                                                                                                                             |
| `src/__tests__/`                                         | 请将测试用例程序放在此文件夹下。                                                                                                                                                                                                                                                                                                                                  |
| `src/__tests__/acceptance/ping.controller.acceptance.ts` | `src/controllers` 目录下 ping 控制器的示例测试程序。                                                                                                                                                                                                                                                                                                     |
| `.mocharc.json`                                          | [Mocha](https://mochajs.org/) 配置文件，用于在应用中运行测试用例。                                                                                                                                                                                                                                                                                        |

### 导航

下一步: [添加 todo 的数据模型](todo-tutorial-model.md)
