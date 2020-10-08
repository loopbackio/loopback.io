---
lang: zh
title: '添加 Todo 数据模型'
layout: translation
keywords: LoopBack 4.0, LoopBack 4, Node.js, TypeScript, OpenAPI, Tutorial
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/todo-tutorial-model.html
---

### 数据模型

现在我们将开始处理如何用 LoopBack 4 来表示数据。为此，我们将创建一个Todo模型，该模型可以代表 Todo 列表中的任务实例。Todo 模型既可以用作[数据传输对象](https://en.wikipedia.org/wiki/Data_transfer_object) （也称为 DTO），也可用于表示请求中传入的 Todo 实例，还可以用作与 loopback-datasource-juggler 一起使用的数据结构。

模型描述业务中的对象，并定义具有名称，类型和其他约束的属性列表。

模型用于线上或不同系统之间的数据交换。

关于模型以及如何在 LoopBack 中使用它们的更多信息，请参见[模型](../../Model.md)。

{% include note.html content="LoopBack 3 将模型视为操作的“中心”；在 LoopBack 4 中，情况则不再如此。LoopBack 4 提供了许多帮助方法和装饰器，允许您通过类似的方式使用模型，从而不再需要用 _required_ 来做这些事了。
" %}

### 建立 Todo 数据模型

待办事项列表和任务跟踪有关，其中最基础的功能是创建一条任务，这条任务中包含一个用于区分它们的唯一标识，一个标题，可能还要附带一些用以进一步描述它的额外信息，最后，还需要提供一种跟踪任务是否完成的方法。

所以，Todo 模型将拥有如下属性：

- `id`: 唯一标识
- `title`: 标题
- `desc`: 任务的详细描述
- `isComplete`: 一个布尔类型的标记，用于告知我们是否已完成任务

我们可以使用 `lb4 model` 命令来生成模型，过程中只要依据提示回答即可，最后，按 `return` 以生成模型。步骤如下：

```sh
lb4 model
? Model class name: todo
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Model Todo will be created in src/models/todo.model.ts

Let's add a property to Todo
Enter an empty property name when done

? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is id generated automatically? No
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name: title
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name: desc
? Property type: string
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name: isComplete
? Property type: boolean
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name:

   create src/models/todo.model.ts
   update src/models/index.ts

Model Todo was created in src/models/
```

查看最终文件，可参考
[`Todo` 示例](https://github.com/strongloop/loopback-next/blob/master/examples/todo/src/models/todo.model.ts).

现在我们有了数据模型，是时候添加一个用以执行实际 CRUD 操作的
[数据源](todo-tutorial-datasource.md)了！

### 导航

上一页: [创建应用脚手架](todo-tutorial-scaffolding.md)

下一页: [添加数据源](todo-tutorial-datasource.md)
