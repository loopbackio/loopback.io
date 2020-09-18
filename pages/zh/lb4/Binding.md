---
lang: zh
title: 'Binding'
keywords: LoopBack 4.0, LoopBack 4, Binding
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/Binding.html
layout: translation
---

## 什么是`Binding`?

> Binding译为“绑定”，下略。

`Binding`可以在一个实例化后的[`Context（上下文）`](Context.md)中作为一个或多个对象的代表。一个`Binding`使用一个不重复的键作为地址，在`Context`中可以通过此地址获取到`Binding`所对应的值。

### `Binding`的属性

一个`Binding`通常拥有以下属性：

- key（键）: 在上下文中，每个`Binding`都有一个用于标记自己的唯一键；
- scope（范围）: 在上下文中，用来控制如何创建或缓存`Binding`的值；
- tags（标签）: 可以是`名称`字符串或`名称-值`键值对，用来描述或注释一个`Binding`；
- value（值）: 每个`Binding`必须设置一个可以解析出绑定的值的提供装置（比如，类、方法、常量等），这样`Binding`才可以被解析成一个常量或动态值；

![Binding](imgs/binding.png)

## 如何创建一个`Binding`？

有几种方式可以创建一个`Binding`：

- 使用`Binding`类的构造器

  ```ts
  import {Context, Binding} from '@loopback/core';
  // 实例化一个上下文
  const context = new Context();
  // 实例化一个绑定，并将其'key'属性设置为'my-key'
  const binding = new Binding('my-key');
  // 将绑定添加至上下文中
  ctx.add(binding);
  ```

- 使用`Binding`类的`.bind()`静态方法

  ```ts
  import {Context, Binding} from '@loopback/core';
  // 实例化一个上下文
  const context = new Context();
  // 实例化一个绑定，并将其'key'属性设置为'my-key'
  const binding = Binding.bind('my-key');
  // 将绑定添加至上下文中
  ctx.add(binding);
  ```

- 使用`Context`类的`.bind()`方法

  ```ts
  import {Context, Binding} from '@loopback/core';
  // 实例化一个上下文
  const context = new Context();
  // 在上下文中添加一个绑定，并将其'key'属性设置为'my-key'
  context.bind('my-key');
  ```

  {% include note.html content="`@loopback/core`包会重复导出所有关于`@loopback/context`的公共API。为了保持写法上的一致，我们推荐使用`@loopback/core`包进行各种对象的引用，除非某个对象需要通过`@loopback/context`包显式引用. 下面的2行代码在作用上是相等的：

  ```ts
  import {inject} from '@loopback/context';
  import {inject} from '@loopback/core';
  ```

  " %}

## 如何设置一个`Binding`?

`Binding`类通过一套流畅的API提供了有关`Binding`的创建和配置的操作。

### 解析一个`Binding`的值的形式

`Binding`可以通过多种形式以解析出一个具体的值。具体如下：

#### 常量形式（Constant）

适用场景：在解析一个`Binding`时，`Binding`的值是一个固定的值。<br/>
比如，`Binding`的值是一个字符串（String）、一个方法（Function）、一个对象（Object）、一个数组（Array）或者任何其他类型的值。

```ts
binding.to('my-value');
```

请注意，在常量形式下为了避免混淆，值的类型不能是`Promise`。

#### 工厂形式（Factory Function）

适用场景：在解析一个`Binding`时，`Binding`的值是需要被动态计算的。<br/>
比如，`Binding`的值是当前系统时间、`Binding`的值是远程接口的返回值、`Binding`的值是远程数据库的数据等。

```ts
binding.toDynamicValue(() => 'my-value');
binding.toDynamicValue(() => new Date());
binding.toDynamicValue(() => Promise.resolve('my-value'));
```

工厂方法可以接收一个涵盖了上下文信息、绑定信息和解析选项信息的参数。

```ts
import {ValueFactory} from '@loopback/core';

// 现在可以通过工厂方法的第一个传参获取到解析时的相关信息了
const factory: ValueFactory<string> = resolutionCtx => {
  return `Hello, ${resolutionCtx.context.name}#${
    resolutionCtx.binding.key
  } ${resolutionCtx.options.session?.getBindingPath()}`;
};
const b = ctx.bind('msg').toDynamicValue(factory);
```
通过[ 解构赋值（Destructuring assignment）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
可以进一步简化并快速访问到`context`、`binding`和`options`等对象。 

```ts
const factory: ValueFactory<string> = ({context, binding, options}) => {
  return `Hello, ${context.name}#${
    binding.key
  } ${options.session?.getBindingPath()}`;
};
```

进阶用法：使用内置了静态方法`value`的类，该静态方法允许参数注入。（具体见`提供器形式（Provider）`）

```ts
import {inject} from '@loopback/core';

class GreetingProvider {
  static value(@inject('user') user: string) {
    return `Hello, ${user}`;
  }
}

const b = ctx.bind('msg').toDynamicValue(GreetingProvider);
```

#### 类形式（Class）

适用场景：在解析一个`Binding`时，`Binding`的值是一个类的实例化对象。<br/>
比如，控制器（Controller）等。`Binding`的值可以是一个被实例化的类。依赖注入通常用于影响被注入依赖的类的内部成员对象身上。

```ts
class MyController {
  constructor(@inject('my-options') private options: MyOptions) {
    // ...
  }
}

binding.toClass(MyController);
```

#### 提供器形式（Provider）

适用场景：在解析一个`Binding`时，用于解析`Binding`的值的工厂方法需要用到依赖注入（Dependency Injection）。<br/>
提供器指的是，内置了`value()`方法的类，该方法可以在实例化后用来解析`Binding`的值。

```ts
class MyValueProvider implements Provider<string> {
  constructor(@inject('my-options') private options: MyOptions) {
    // ...
  }

  value() {
    return this.options.defaultValue;
  }
}

binding.toProvider(MyValueProvider);
```

提供器被当做一个内置了依赖注入功能的空壳，可以理解为是一个进阶版本的工厂方法。如果工厂方法没有使用到依赖注入，则直接使用普通的工厂方法和`toDynamicValue()`方法即可。

#### 同族形式（Alias）

适用场景：在解析一个`Binding`时，此`Binding`的值的来源是另外一个`Binding`的值。<br/>
同族指的是，一个允许携带可选路径的键值，这个键值可以用来从另外一个`Binding`上解析出值。
比如，我们在设置`Api Explorer（API浏览页面）`的时候，需要用到`RestServer`对象的相关属性，我们可以创建一个`Binding`并将它通过`.toAlias()`方法设置为`key`为`servers.RestServer.options#apiExplorer`的`Binding`的同族。

```ts
// 创建`key`为`servers.RestServer.options`的绑定
ctx.bind('servers.RestServer.options').to({apiExplorer: {path: '/explorer'}});
// 创建`key`为`apiExplorer.options`的绑定
ctx
  .bind('apiExplorer.options')
// 声明此绑定是`key`为`servers.RestServer.options`的绑定的同族
  .toAlias('servers.RestServer.options#apiExplorer');
const apiExplorerOptions = await ctx.get('apiExplorer.options'); // => {path: '/explorer'}
```

### 配置`Binding`的`Socpe`

> Socpe译为“作用域”，下略。

一个`Binding`可以为多个请求提供解析值，通过`Binding`所在的`Context`对象的`.get()`和`.getSync()`方法，或者依赖注入。
在解析`Binding`的值时，`Scope`用来控制解析过程的策略。即可以返回一个新的值，或为从属于同一层级的`Context`的多个请求返回一个相同的值。<br/>
如下示例中，虽然`Binding`都是`"my-key"`，但是`value1`变量和`value2`变量的值可能是相同的或不同的，这都取决于`Binding`的`Scope`是如何设置的。

```ts
const value1 = await ctx.get('my-key');
const value2 = ctx.getSync('my-key');
```

在相同的`Context`中解析一个`Binding`时，我们允许使用如下的`Scope`：

- `BindingScope.TRANSIENT`（临时作用域，此项为默认值）
- `BindingScope.CONTEXT`（同级作用域）
- `BindingScope.SINGLETON`（常态作用域）

请参见[BindingScope](https://loopback.io/doc/en/lb4/apidocs.context.bindingscope.html).

```ts
binding.inScope(BindingScope.SINGLETON);
```

`Binding`的`Scope`可以通过`BindingScope`枚举引用到。

### 配置正确的`Scope`

在配置`Binding`的`Scope`时，请先思考如下问题：

1. 在解析`Binding`的值时，是否有必要为每个请求都返回一个新的值？ 
2. 在解析`Binding`的值时，是否解析值会得到保留，或是因请求不同而变化？

请注意，使用了`Binding`类`.to()`方法的`Binding`的值不会受到`Scope`的影响，如下所示：

```ts
ctx.bind('my-name').to('John Smith');
```

`key`属性为`'my-name'`的`Binding`的值将被永远解析为`'John Smith'`。

`Scope`只会影响到使用`.toDynamicValue()`、`.toClass()`和`.toProvider()`方法提供解析值的`Binding`。

假设我们需要满足一个需求：需要创建一个可以提供当前系统日期的`Binding`。

```ts
ctx
  .bind('current-date')
  .toDynamicValue(() => new Date());
const d1 = ctx.getSync('current-date');
const d2 = ctx.getSync('current-date');
// d1 !== d2
```

在上面的代码中，`Binding`的`Scope`的默认值为`TRANSIENT`，即临时作用域。
`d1`和`d2`的值都是来源于`new Date()`方法，并且都是通过`ctx.getSync('current-date')`方法解析出来的。两个不同的日期被分配到了`d1`和`d2`的值上，相当于每次解析`Binding`的值时，值都会成为解析时的系统日期。


```ts
ctx
  .bind('current-date')
  .toDynamicValue(() => new Date())
  .inScope(BindingScope.SINGLETON);
const d1 = ctx.getSync<Date>('current-date');
const d2 = ctx.getSync<Date>('current-date');
// d1 === d2
```

在上面的代码中，`Binding`的`Scope`的值被设置为`SINGLETON`，即常态作用域。自然就可以推理出`d1`和`d2`的值都是相同的日期，也就是不符合我们的需求。
