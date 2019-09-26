---
lang: zh
title: "应用（Application）"
keywords: LoopBack 4.0, LoopBack 4
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/Application.html
layout: translation
---

## 什么是应用（Application）?

在 LoopBack 4 中，[`Application`](https://loopback.io/doc/zh/lb4/apidocs.core.application.html)（应用）类是一个重要的类，用于设置你所有的模块组件、控制器、服务器和绑定。`Application`扩展了[Context](Context.md) （上下文），并且提供了启动和停止相关服务器的控制方法。

使用 LoopBack 4 时，我们强烈鼓励你建立你自己的`Application`的子类，以更好地组织你的配置（Configuration）和设置（Setup）。

## 编写你自己的 Application 类

通过编写你自己的 Application 类，你可以执行下列其他几项任务，将其作为你的设置的一部分：

- Pass the configuration into the base class constructor
- 在启动应用程序之前，执行异步启动功能。
- 在应用程序停止时，执行优雅的清理功能。

{% include code-caption.html content="src/widget.application.ts" %}

```ts
import { Application } from "@loopback/core";
import { RestComponent } from "@loopback/rest";
import { UserController, ShoppingCartController } from "./controllers";

export class WidgetApplication extends Application {
  constructor() {
    // 在此处传递配置给基类的构造函数
    // （当然，你也可以自己处理）
    super({
      rest: {
        port: 8080
      }
    });

    const app = this;
    // 为了使代码更清晰，
    // 你可以在此处绑定应用层上下文。
    // app.bind('foo').to(bar);
    app.component(RestComponent);
    app.controller(UserController);
    app.controller(ShoppingCartController);
  }

  async stop() {
    // 应用停止之前，在此处进行必要的清理工作。
    // （优雅地关闭链接、刷新缓冲区等）
    console.log("Widget application is shutting down...");
    // 基类的stop方法会调用所有绑定到此应用的Servers（服务器）的的stop方法。
    await super.stop();
  }
}
```

## 配置你的应用

你可以通过“构造函数的参数”和“绑定”配置你的应用，或同时使用以上两者。

### 绑定（Binding）配置

Binding（绑定）是我们的示例代码中最常见的配置应用的方式。建议你在设置你的应用时使用绑定（Binding）方法。

进一步地，绑定函数由[上下文（Context）](Context.md)提供，`Application`类同样提供了一些语法糖函数用于常见的绑定，例如`component`, `server`和`controller`:

```ts
export class MyApplication extends Application {
  constructor() {
    super();
    this.component(MagicSuite);
    this.server(RestServer, "public");
    this.server(RestServer, "private");

    this.controller(FooController);
    this.controller(BarController);
    this.controller(BazController);
  }
}
```

你可以在[`Application`](https://loopback.io/doc/zh/lb4/apidocs.core.application.html)的 API 文档页面查看完整的函数列表。

更进一步，你可以使用更高级的形式进行绑定，以便微调你的应用配置：

```ts
export class MyApplication extends Application {
  constructor() {
    super();
    this.server(RestServer);
    this.controller(FooController);
    this.bind("fooCorp.logger").toProvider(LogProvider);
    this.bind("repositories.widget")
      .toClass(WidgetRepository)
      .inScope(BindingScope.SINGLETON);
  }
}
```

在上述示例代码中：

- 注入调用`fooCorp.logger` 会被 `LogProvider`类处理。
- 注入调用`repositories.widget` 会被单例`WidgetRepository`类处理。

#### 组件（Components）

```ts
app.component(MyComponent);
app.component(RestComponent);
```

`component` 函数允许在你的 Application 实例的上下文中，绑定组件的构造函数。

关于如何利用组件的更多信息，请查看[使用组件（Components）](Using-components.md)页面。

#### 控制器（Controller）

```ts
app.controller(FooController);
app.controller(BarController);
```

与`component`函数类似，`controller` 函数允许你在`Application`的上下文中，绑定[控制器（Controller）](Controllers.md) 。

#### 服务器（Server）

```ts
app.server(RestServer);
app.servers([MyServer, GrpcServer]);
```

`server` 函数与前述函数类似，但是使用`servers`函数能够对[服务器（Server）](Server.md) 进行批量绑定。

```ts
const app = new Application();
app.server(RestServer, "public"); // {'public': RestServer}
app.server(RestServer, "private"); // {'private': RestServer}
```

在上述示例代码中，有两个服务器的实例被绑定到了 Application 的上下文中，这两个实例分别绑定到了`servers.public`和`servers.private`键。

### 构造函数（Constructor）配置

`Application` 类的构造函数同样接受包含了组件层配置的[`ApplicationConfig`](https://loopback.io/doc/en/lb4/apidocs.core.applicationconfig.html)对象，例[`RestServerConfig`](https://loopback.io/doc/en/lb4/apidocs.rest.restserverconfig.html).
它将自动为这些配置创建绑定，之后通过“Dependency Injection（依赖注入）”进行注入。
访问[依赖注入（Dependency Injection）](Dependency-injection.md) 以了解更多信息。

{% include note.html content="
绑定配置（例如组件绑定component binding、提供者绑定provider binding、绑定范围binding scopes）无法与基于构造函数的配置同时使用。
" %}

```ts
export class MyApplication extends RestApplication {
  constructor() {
    super({
      rest: {
        port: 4000,
        host: "my-host"
      }
    });
  }
}
```

## 设置应用的小提示

这里是一些小提示，可以在设置应用时避开常见的陷阱和错误。

### 使用`RestServer`，从`RestApplication` 扩展

如果你希望使用 `@loopback/rest` 包的`RestServer`，我们建议你在你的应用中扩展`RestApplication` 而不是手动绑定`RestServer`或`RestComponent`。`RestApplication`已经使用了`RestComponent`，并且在`RestServer` 中提供了一些可用的应用层函数，例如`handler()`。
这意味着你可以在在应用的构造函数中，调用`RestServer`函数来执行你所有服务器层的设置，而不需明确地获取你的 Server（服务器）的实例。

### 提供静态文件

`RestServer`允许提供静态文件。通过调用`static()` 来设置 API。

```ts
app.static("/html", rootDirForHtml);
```

或者

```ts
server.static(["/html", "/public"], rootDirForHtml);
```

静态资产不允许被挂载到`/`以避免性能惩罚。因为`/` 符合所有的路径，使得每个 HTTP 请求都会导致文件系统的访问。

static() API 委托[serve-static](https://expressjs.com/en/resources/middleware/serve-static.html)提供静态文件。

请访问下列链接以了解详情：
https://expressjs.com/en/starter/static-files.html
https://expressjs.com/en/4x/api.html#express.static

**警告**:

> 静态资产在 LoopBack 的动作时序之前提供。如果一个错误被抛出，`reject`动作**不会**被触发。

### 使用唯一绑定

使用带有前缀字符串的绑定名，以避免与 LoopBack 的绑定重复。例如，如果你的应用是为你的雇主 FooCorp 开发的，你可以为你的绑定添加前缀`fooCorp`。

```ts
// 这个绑定的键，不太可能被其他的组件开发者或者LoopBack自身使用。
app.bind("fooCorp.widgetServer.config").to(widgetServerConfig);
```

### 避免使用`getSync`

我们提供[`getSync`](https://loopback.io/doc/zh/lb4/apidocs.context.getsync.html)函数是为了应对你无法异步获取你的绑定的情形，例如在构造函数体内。

然而，你必须这样做的情形有限，你需要避免潜在的竞争条件，并且尽可能使用[`get`](https://loopback.io/doc/en/lb4/apidocs.context.get.html)以异步获取你的绑定。

### 小心使用单例绑定范围

默认情况下，每当被注入或获取时，绑定的 Controller（控制器）会实例化一个新的实例。你的应用应当仅在有理由时才为 Controller（控制器）设置单例绑定范围。
