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

#### 可注入类形式（Injectable Class）

可注入类指的是一个被`@injectable`装饰的类，其类型可以如下：

- 一个类（Class）
- 一个提供器（Provider）
- 一个工厂方法（Factory Function）

`toInjectable()`方法是一种类似于`toClass() / toProvider() / toDynamicValue()`等方法的用来绑定值的快捷方法。`@injectable`装饰器可以将`Binding`的元数据添加到其中。

```ts
@injectable({scope: BindingScope.SINGLETON})
class MyController {
  constructor(@inject('my-options') private options: MyOptions) {
    // ...
  }
}

binding.toInjectable(MyController);
```

如上所示，其代码等价于下面：

```ts
const binding = createBindingFromClass(MyController);
```

{% include note.html content="
如果使用了`binding.toClass(MyController)`方法，则通过`@injectable`装饰器设置的`Binding`的`Scope`是不会生效的。
" %}

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
- `BindingScope.CONTEXT`（同级作用域）（已弃用）
- `BindingScope.SINGLETON`（常态作用域）
- `BindingScope.APPLICATION`（应用程序作用域）
- `BindingScope.SERVER`（服务作用域）
- `BindingScope.REQUEST`（请求作用域）

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

下面是`Scope`为`SINGLETON`的适用场景：

1.  共享单个实例的状态

    通过`Binding`在多个使用者之间分享同一个实例的状态。

    ```ts
    // 声明一个全局计数器
    export class GlobalCounter {
      public count = 0;
    }

    // 将全局计数器绑定至上下文中
    ctx
      .bind('global-counter')
      .toClass(GlobalCounter)
      .inScope(BindingScope.SINGLETON);
    
    const c1: GlobalCounter = await ctx.get('global-counter');
    c1.count++;
    console.log(c1.count); // `c1.count`的值是`1`

    const c2: GlobalCounter = await ctx.get('global-counter');
    console.log(c2.count); // `c2.count`的值还是`1`
    ```

2.  共享单个实例的本体
    
    若单个实例可以被共享，则避免创建多个实例。因为使用者无须保持或访问不同的实例的状态。比如，下面的`GreetingController`类中，除了方法参数外，没有访问任何信息。通过一个`GreetingController`类的共享实例，可以重复调用其`greet()`方法，但是传参却可以是不同的（调用形式相当于`c1.greet('John')`或`c1.greet('Jane')`）。

    ```ts
    // 标记此类的`Scope`为`SINGLETON`
    @bind({scope: BindingScope.SINGLETON})
    export class GreetingController {
      greet(name: string) {
        return `Hello, ${name}`;
      }
    }
    ```

    类似于`GreetingController`类的控制器是使用`SINGLETON`的理想场景。因此在应用程序的上下文中，只有一个控制器的实例被创建，但是却可以分享给所有的请求。通过将`Scope`的值设置为`SINGLETON`，可以有效避免为每个请求重复创建`GreetingController`类的实例。

    ```ts
    // `createBindingFromClass()`方法听从`@bind`装饰器的配置，并将绑定的`Scope`设置为`SINGLETON`
    const binding = ctx.add(createBindingFromClass(GreetingController));
    const c1 = ctx.getSync(binding.key);
    const c2 = ctx.getSync(binding.key);
    // c2和c1是同一个实例
    c1.greet('John'); // 调用后得到'Hello, John'
    c2.greet('Jane'); // 调用后得到'Hello, Jane'
    ```

选择`TRANSIENT`：如果您不知道应该如何选择，则将其视为一个安全的默认值。<br/>
选择`SINGLETON`：如果您想为每个消费者不间断地提供一个相同的实例。

下面是一个需要从当前的请求对象中获取信息（用于获取http地址或记录日志等）的代码示例：

```ts
export class GreetingCurrentUserController {
  @inject(SecurityBindings.USER)
  private currentUserProfile: UserProfile;

  greet() {
    return `Hello, ${this.currentUserProfile.name}`;
  }
}
```

如上所示，`GreetingCurrentUserController`内部的`greet()`方法的返回值取决于被注入的`currentUserProfile`属性对象。

因此在上面的例子中，我们需要将`Scope`设置为`TRANSIENT`。每次请求发生时，当前请求的用户信息`UserProfile`通过属性注入方式赋值于`GreetingCurrentUserController`的实例化对象的`currentUserProfile`属性之中。如果错误地将`Scope`设置为`SINGLETON`，则不同的请求发生时，用户信息可能是一样的。


```ts
export class SingletonGreetingCurrentUserController {
  greet(@inject(SecurityBindings.USER) currentUserProfile: UserProfile) {
    return `Hello, ${this.currentUserProfile.name}`;
  }
}
```

如上所示，`SingletonGreetingCurrentUserController`内部的`currentUserProfile`属性对象被删除了，取而代之的是`greet()`方法中的`@inject(SecurityBindings.USER) currentUserProfile: UserProfile`方法注入。

因此在上面的例子中，我们需要将`Scope`设置为`SINGLETON`。每次请求发生时，当前请求的用户信息`UserProfile`通过方法注入方式赋值于`SingletonGreetingCurrentUserController`的实例化对象的`greet()`方法的第一个参数`currentUserProfile`之中。如果错误地将`Scope`设置为`TRANSIENT`，则不同的请求发生时，每次都会进行无意义的实例化行为。

```ts
ctx
  .bind('controllers.SingletonGreetingCurrentUserController')
  .toClass(SingletonGreetingCurrentUserController)
  .inScope(BindingScope.SINGLETON);
```

如上所示，`SingletonGreetingCurrentUserController`的实例化对象是由拥有`Binding`的`Context`对象创建的。但是`SingletonGreetingCurrentUserController`的`greet()`方法仍然可以被携带了当前请求的用户信息的请求级别`Context`对象所调用。方法注入正是由不同的请求级别`Context`对象所实现的，不同于其他的`Context`对象（比如`application`的`Context`对象，仅用于将类实例化为单例）。

{% include note.html content="
为了理解 `@bind()` 和 `ctx.bind()`之间的区别, 详见
[Configure binding attributes for a class](#configure-binding-attributes-for-a-class).
" %}

`SINGLETON`、`CONTEXT`和`TRANSIENT`有一些使用上的限制。假设一个经典的REST应用程序中拥有如下等级制度的`Context`：

```ts
// `Context`链: invocationCtx（调用级别Context） -> requestCtx（请求级别Context） -> serverCtx（服务级别Context） -> appCtx（应用程序级别Context）
appCtx
  .bind('services.MyService')
  .toClass(MyService)
   // 将`MyService`类设置为`TRANSIENT`
   // 并将其绑定到应用程序级别Context中
  .inScope(BindingScope.TRANSIENT); 
```

我们将`Controllers`（控制器）对象和`Services`（服务）对象的`Scope`设置为`TRANSIENT`，以便于在每次请求产生时都可以获得到一个新的实例化对象。但是，如果`Controllers`对象和`Services`对象是由`Invocation Context（调用级别上下文）`解析的（比如，`Interceptors`拦截器），那么一个新的实例化对象会被重复创建。

```ts
// 在中间件中
const serviceInst1 = requestCtx.get<MyService>('services.MyService');
// 在拦截器中
const serviceInst2 = invocationCtx.get<MyService>('services.MyService');
// 注意：serviceInst2 是一个新的实例化对象，并且不同于 serviceInst1
```

类似的事情可能还会发生在依赖注入中：

```ts
class MyMiddlewareProvider implements Provider<Middleware> {
  // 依赖注入，并用于此中间件中
  constructor(@inject('services.MyService') private myService) {}
}

class MyInterceptor {
  // 依赖注入，并用于此拦截器中
  constructor(@inject('services.MyService') private myService) {}
}
// 注意： 在同一个请求中，中间件和拦截器会收到两个不同的'MyService'的实例化对象
```

理想状态下，我们应该在`requestCtx`，即`Request Context（请求级别上下文）`的子节点中获得相同的`MyService`的实例化对象。但是实际情况可能会更糟糕，在`requestCtx`中解析一个`Binding`两次甚至会得到两个不同的`MyService`的实例化对象。

无论是`SINGLETON`还是`CONTEXT`都无法解决上面的问题。通常情况下，`Controllers`对象和`Services`对象是由`Application Context（应用程序级别上下文）`查询并解析的。继承于`Component`的组件类（比如，`RestComponent`组件）也会向`Application Context`贡献其自身的`Binding`，而不是向`Server Context（服务器级别上下文）`。在`Scope`为`SINGLETON`的情况下，我们可以从`Application Context`中获得`MyService`的相同的实例化对象。在`Scope`为`CONTEXT`的情况下，我们可以从任意`Context`中获得`MyService`的不同的实例化对象。下面是可以将`Binding`的解析过程变得更加准确的`Scope`：

- `BindingScope.APPLICATION`
- `BindingScope.SERVER`
- `BindingScope.REQUEST`

使用上面的`Scope`时，程序会从`Context`链中按照层级依次查找并匹配首个符合条件的`Context`。被解析的`Binding`的值会被缓存在同级别的`Context`中并被允许分享。这样就解决了上面的问题，同时确保了在同级别的`Context`中同一个值不会被解析多次。

{% include note.html content="在某些特殊场景中（比如，测试），在`Context`链中不会存在`Scope`为`REQUEST`的`Context`，解析过程会失败并转而在当前的`Context`中进行查找。这样方便于将`REQUEST`用于控制器或其他组件中。
" %}

```ts
// `Context`链: invocationCtx（调用级别Context） -> requestCtx（请求级别Context） -> serverCtx（服务级别Context） -> appCtx（应用程序级别Context）
appCtx
  .bind('services.MyService')
  .toClass(MyService)
   // 将`MyService`类设置为`REQUEST`
   // 并将其绑定到应用程序级别Context中
  .inScope(BindingScope.REQUEST);
```

如上面的代码所示，在将`Scope`的改为`REQUEST`后，在`MyMiddleware`和`MyInterceptor`中，`MyService`将永远被解析为相同的实例对象。

### 根据Binding的Key和Scope在Context等级制结构中解析Binding

`Binding`的解析事件通常发生在使用`ctx.get()`、`ctx.getSync()`或`binding.getValue(ctx)`等方法的时候。当一个类被实例化或类中的一个方法被调用时，`Binding`的解析事件也伴随着依赖注入而发生。

在`Context等级制结构`中，解析一个`Binding`通常会涉及到很多的`Context`对象。根据不同的`Context`链和`Binding`的`Scope`的设置，解析过程所涉及到的`Context`对象也可能是不同的或相同的。

假设我们现在有如下的`Context`链：

```ts
import {Context} from '@loopback/core';

const appCtx = new Context('application');
appCtx.scope = BindingScope.APPLICATION;

const serverCtx = new Context(appCtx, 'server');
serverCtx.scope = BindingScope.SERVER;

const reqCtx = new Context(serverCtx, 'request');
reqCtx.scope = BindingScope.REQUEST;
```

1.  所有者级Context

    `Binding`直接通过`Context.bind()`或`Context.add()`方法添加到`Context`对象中。那么这个`Context`就可以称为是这个`Binding`的`所有者级Context`。

    现在让我们在`Context`链中添加一些`Binding`：

    ```ts
    appCtx.bind('foo.app').to('app.bar');
    serverCtx.bind('foo.server').to('server.bar');
    ```

    如上所示，`Binding`的`所有者级Context`分别是：

    - 'foo.app': appCtx
    - 'foo.server': serverCtx

2.  目击者级Context

    在`Context`上直接显式地发起针对`Binding`的解析行为，或隐式地使用了依赖注入的`Context`。那么这个`Context`就可以称为是这个`Binding`的`目击者级Context`。

    ```ts
    const val1 = await reqCtx.get('foo.app');
    const val2 = await reqCtx.get('foo.server');
    ```

    如上所示，`Binding`的`目击者级Context`分别是：

    - 'foo.app': reqCtx
    - 'foo.server': reqCtx

3.  解析者级Context

    被用来在`Context`链中根据`Binding`的`Key`来查找或解析`Binding`的`Context`。那么这个`Context`就可以称为是这个`Binding`的`解析者级Context`。

    只有`解析者级Context`本身和其祖先`Context`对解析过程可见。
    
    确定`解析者级Context`通常按照如下流程：

    a. 依次在`目击者级Context`及其祖先`Context`中根据`Binding`的`Key`进行查找并匹配第一个符合条件的`Binding`

    b. 根据已经查找到的`Binding`的`Scope`查找`解析者级Context`：

    - `CONTEXT / TRANSIENT`： `目击者级Context`
    - `SINGLETON`： `所有者级Context`
    - `APPLICATION / SERVER / REQUEST`： 依次在`目击者级Context`及其祖先`Context`中进行查找并匹配第一个符合条件的`Context`

    ```ts
    import {generateUniqueId} from '@loopback/core';

    appCtx.bind('foo').to('app.bar');
    serverCtx
      .bind('foo')
      .toDynamicValue(() => `foo.server.${generateUniqueId()}`)
      .inScope(BindingScope.SERVER);

    serverCtx
      .bind('xyz')
      .toDynamicValue(() => `abc.server.${generateUniqueId()}`)
      .inScope(BindingScope.SINGLETON);

    // line 1
    const val = await reqCtx.get('foo');
    // line 2
    const appVal = await appCtx.get('foo');
    // line 3
    const xyz = await reqCtx.get('xyz');
    ```

    如上所示：

    | 代码行 | 解析出的`Binding`的信息 | 解析出的`Binding`的`解析者级Context` |
    | ------ | ------ | ------ |
    | line 1 | 在`serverCtx`中`Key`为`foo`的`Binding` | `serverCtx` |  
    | line 2 | 在`appCtx`中`Key`为`foo`的`Binding` | `appCtx` |  
    | line 3 | 在`serverCtx`中`Key`为`xyz`的`Binding` | `serverCtx` |  
    
    对于依赖注入而言，`目击者级Context`将会是声明了注入的类的`Binding`的`解析者级Context`。每次注入时，`解析者级Context`都会被查找并匹配出来。如果一个被注入的`Binding`对于`解析者级Context`是不可见的（比如，`Binding`的`Key`不存在或只存在于衍生对象中），则会抛出异常。

{% include note.html content="如果`所有者级Context`和`解析者级Context`是同一个对象，则`Scope`为`APPLICATION / SERVER / REQUEST`时，就等价于`SINGLETON`。如下所示，两个`Binding`实际上是一样的。

```ts
let count = 0;
appCtx
  .bind('app.counter')
  .toDynamicValue(() => count++)
  .inScope(BindingScope.APPLICATION);
```

```ts
let count = 0;
appCtx
  .bind('app.counter')
  .toDynamicValue(() => count++)
  .inScope(BindingScope.SINGLETON);
```

" %}
