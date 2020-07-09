---
lang: zh
title: '创建应用脚手架'
keywords: LoopBack 4.0, LoopBack 4, Node.js, TypeScript, OpenAPI, Tutorial
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/todo-tutorial-scaffolding.html
---

### Create your app scaffolding

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
| `src/application.ts`                                     | The application class, which extends [`RestApplication`](https://loopback.io/doc/en/lb4/apidocs.rest.restapplication.html) by default. This is the root of your application, and is where your application will be configured. It also extends [`RepositoryMixin`](https://loopback.io/doc/en/lb4/apidocs.repository.repositorymixin.html) which defines the datasource. |
| `src/index.ts`                                           | The starting point of your microservice. This file creates an instance of your application, runs the booter, then attempts to start the [`RestServer`](https://loopback.io/doc/en/lb4/apidocs.rest.restserver.html) instance bound to the application.                                                                                                                   |
| `src/sequence.ts`                                        | An extension of the [Sequence](../../Sequence.md) class used to define the set of actions to take during a REST request/response.                                                                                                                                                                                                                                        |
| `src/controllers/README.md`                              | Provides information about the controller directory, how to generate new controllers, and where to find more information.                                                                                                                                                                                                                                                |
| `src/controllers/ping.controller.ts`                     | A basic controller that responds to GET requests at `/ping`.                                                                                                                                                                                                                                                                                                             |
| `src/datasources/README.md`                              | Provides information about the datasources directory, how to generate new datasources, and where to find more information.                                                                                                                                                                                                                                               |
| `src/models/README.md`                                   | Provides information about the models directory, how to generate new models, and where to find more information.                                                                                                                                                                                                                                                         |
| `src/repositories/README.md`                             | Provides information about the repositories directory, how to generate new repositories, and where to find more information.                                                                                                                                                                                                                                             |
| `src/__tests__/`                                         | Please place your tests in this folder.                                                                                                                                                                                                                                                                                                                                  |
| `src/__tests__/acceptance/ping.controller.acceptance.ts` | An example test to go with the ping controller in `src/controllers`.                                                                                                                                                                                                                                                                                                     |
| `.mocharc.json`                                          | [Mocha](https://mochajs.org/) configuration for running your application's tests.                                                                                                                                                                                                                                                                                        |

### Navigation

Next step: [Add the Todo Model](todo-tutorial-model.md)
