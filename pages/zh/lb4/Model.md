---
lang: zh
title: "数据模型（Model）"
keywords: LoopBack 4.0, LoopBack 4
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/Model.html
layout: translation
---

## 总览

数据模型（Model）用于描述业务域对象，例如：`Customer`（客户），`Address`（地址），`Order`（订单）。它通常用使用名字、类型以及其他约束，来定义一系列属性（Property）。

{% include note.html content="数据模型定义数据形状（Shape of data）。CRUD操作等行为会被存储库（Repository）添加。这与LoopBack 3.x中，在数据模型中实现行为不同。" %}

{% include tip.html content="一个数据模型可以被用于不同的存储库（Repository）" %}

数据模型（Model）可以用于线上数据交换，也可以用于不同系统的数据交换。
例如，一个 JSON 对象符合`Customer`（客户）数据模型的定义，它可以在 REST/HTTP 负载中上传，以用于创建一个新的客户，或者存储到文档或数据库（例如 MongoDB）。数据模型的定义可以被映射到其他格式，例如：关系型数据库的架构（Schema）, XML 架构，JSON 架构，OpenAPI 架构，gRPC 信息（Message）定义，也可以从这些格式映射到数据模型。

数据模型的域对象有 2 种不同类型的：

- 值对象（Value Object）：没有标识（Identity、ID）的域对象。依据构造的值来判断是否等同。例如，`Address`（地址）可以被建模为一个值对象，因为当两个地址有同样的城市、街道名、街道号码、和邮政编码，那么它们是等同的。
  示例如下：

```json
{
  "name": "Address",
  "properties": {
    "streetNum": "string",
    "streetName": "string",
    "city": "string",
    "zipCode": "string"
  }
}
```

- 实体（Entity）：有标识（Identity、ID）的域对象。依据标识来判断是否等同。 例如，`Customer`可以被建模为一个实体，因为每个客户有一个唯一的标识（id）。`Customer`的两个拥有相同标识（id）的实例是相等的，因为它们引用自同一个客户。
  示例如下：

```json
{
  "name": "Customer",
  "properties": {
    "id": "string",
    "lastName": "string",
    "firstName": "string",
    "email": "string",
    "address": "Address"
  }
}
```

目前，我们提供了`@loopback/repository`模块，它提供了一些特殊的修饰符，可以添加元数据到你的 TypeScript 或 JavaScript 类，用来实现传统的[数据源映射（Datasource Juggler）](https://github.com/strongloop/loopback-datasource-juggler)。

## 定义数据模型

作为其核心，LoopBack 中的数据模型，是一个简单的 JavaScript 类。

```ts
export class Customer {
  email: string;
  isMember: boolean;
  cart: ShoppingCart;
}
```

可扩展性，是 LoopBack 的核心特征。外部的包可以添加额外的特征，例如，与“映射桥（juggler bridge）”或“JSON 架构生成器”集成。通过`@loopback/repository`模块的`@model`和`@property`修饰符，使这些特征可以用于 LoopBack 数据模型。

```ts
import { model, property } from "@loopback/repository";

@model()
export class Customer {
  @property()
  email: string;
  @property()
  isMember: boolean;
  @property()
  cart: ShoppingCart;
}
```

## 数据模型发现（Model Discovery）

通过探索（discovering）你的数据库架构，LoopBack 可以自动生成数据模型。
查阅[数据模型发现（Discovering models）](Discovering-models.md)以了解更多信息，以及支持数据模型发现的连接器的列表。

## 使用映射桥（Juggler Bridge）

以如下方式定义一个使用映射桥的数据模型：从`Entity`（实体）扩展你的类，为域对象添加`@model`和`@property`修饰符。

```ts
import { model, property, Entity } from "@loopback/repository";

@model()
export class Product extends Entity {
  @property({
    id: true,
    description: "The unique identifier for a product"
  })
  id: number;

  @property()
  name: string;

  @property()
  slug: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}
```

数据模型主要以 TypeScript 的类定义。默认情况下，类禁止使用未指明类型定义的额外属性。持久层（Persistence Layer）尊抽这一约束，配置底层 PersistedModel（持久数据模型）类以强制`strict`模式。

创建一个既明确、又使用“任意额外属性”的数据模型，你需要通过 CLI 在数据模型设置中禁用`strict`模式，并且在数据模型的实例中告诉 TypeScript 允许“任意额外属性”。

```ts
@model({ settings: { strict: false } })
class MyFlexibleModel extends Entity {
  @property({ id: true })
  id: number;

  // 在此处定义明确的属性。

  // 添加一个索引属性，以允许额外数据。
  [prop: string]: any;
}
```

### 数据模型修饰符

可以使用无参数的数据模型修饰符，也可以为修饰符传递 ModelDefinitionSyntax（数据模型定义语法）：

<!-- 应当尽可能使用LoopBack 4版本替换此示例 -->
<!-- 依据 https://github.com/strongloop/loopback-datasource-juggler/blob/master/lib/model-builder.js#L283 和传统的映射文件。-->

```ts
@model({
  name: "Category",
  settings: {
    // 省略...
  }
  // 在下面使用@property修饰符
})
class Category extends Entity {
  // 省略...
  @property({ type: "number" })
  categoryId: number;
}
```

数据模型修饰符知道你的数据模型类的名字，你可以略去它。

```ts
@model()
class Product extends Entity {
  name: string;
  // 其他属性...
}
```

然而，数据模型修饰符在 LoopBack 4 和 LoopBack 3 中不完全相同。
例如，在[lb3](https://loopback.io/doc/zh/lb3/Model-definition-JSON-file.html)中，我们可以在数据模型修饰符中传递一个数据模型定义语法，就像属性、选项、关系等。但是这些项在 LooopBack 4 的数据模型修饰符中并不都是可用的。

<!-- 当选项（options）可用时，修改此处 -->

注意：在 LoopBack 4 中，我们当前在 ModelDefinitionSyntax 中仅支持`settings`。LoopBack 3 中的那些`top-level properties`（顶级属性）现在在`settings`中传递。

- `properties`现在在 `@property`修饰符中定义（查看下面内容以获得更多信息）。
- LoopBack 3 中的[`options`](https://loopback.io/doc/zh/lb3/Model-definition-JSON-file.html#options)，在 LoopBack 4 中，还没有映射特征。（查看[issue #2142](https://github.com/strongloop/loopback-next/issues/2142)中的进一步讨论）

`settings`的实体中，现在 LoopBack 4 支持下列内置实体：

#### 支持的 Settings 实体

<!-- 当我们有所改动时，下列实体可能需要更新:

  - description [在LB3中，我们支持数组或字符串，但是这里我们仅公开其支持字符串]
    这两项看起来在LB4中不工作。已经将其移至“不支持”表。
-->

<table>
  <thead>
  <tr>
    <th width="160">属性</th>
    <th width="100">类型</th>
    <th>默认</th>
    <th>描述</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>description</code></td>
    <td>String</td>
    <td>None</td>
    <td>
    数据模型的描述（可选）。我们现在只支持字符串。（参见<a href="https://github.com/strongloop/loopback-next/issues/3428">issue #3428</a>的更多讨论。)
    </td>
  </tr>
  <tr>
    <td><code>forceId</code></td>
    <td>Boolean</td>
    <td><code>true</code></td>
    <td>如果为true，防止客户端手动设置为“自动生成ID”</td>
  </tr>
  <tr>
    <td><code>strict</code></td>
    <td>Boolean or String</td>
    <td><code>true</code>.<br/></td>
    <td>
      LB4中，此项默认设置为<code>true</code>。<br/>
      此项用于指定数据模型是否仅接受预定义属性。可以为：
      <ul>
      <li><code>true</code>：仅接受模型中定义的属性。<br />
          当你希望确保数据模型仅接受预定义的属性时，使用此项。<br />
          如果你试图保存“带有未预先定义的属性”的数据模型实例时，LoopBack会抛出ValidationError（验证错误）。
      </li>
      <li><code>false</code>：开放数据模型，接受所有属性，包括未在数据模型中预先定义的属性。<br />
          此模式用于存储“自由格式”的JSON数据到无架构数据库（例如MongoDB）。
      </li>
      <li><code>"filter"</code>：仅接受模型中定义的属性，忽略其他。<br />
          当你读取或保存“带有未预先定义的属性”的数据模型时，LoopBack将忽略那些“未预先定义的属性”。<br />
          当你希望在“无脚本”迁移旧数据时不要丢失数据，此选项特别有用。
      </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>idInjection</code></td>
    <td>Boolean</td>
    <td><code>true</code></td>
    <td>是否自动为数据模型生成<code>id</code>属性：
    <ul>
    <li><code>true</code>：<code>id</code>属性会自动添加到数据模模型。这是默认值。</li>
    <li><code>false</code>: <code>id</code>属性不会自动添加到数据模型</li>。
    </ul>
    查阅<a href="#id-properties">ID属性</a>以了解更多详情。<code>options</code>中的<code>idInjection</code>属性（如有）有更高优先级。
    </td>
  </tr>
  <tr>
    <td><code>name</code></td>
    <td>String</td>
    <td>None</td>
    <td>数据模型的名字。</td>
  </tr>
  <tr>
    <td><code>scopes</code></td>
    <td>Object</td>
    <td>N/A</td>
    <td>查阅LB3文档：<a href="https://loopback.io/doc/zh/lb3/Model-definition-JSON-file.html#scopes">Scopes</a>。</td>
  </tr>
  </tbody>
</table>

​

#### 不支持的 Settings 实体

<!-- 当ACLS字段（field）可用时，请更新OPTIONS。 -->

<table>
  <thead>
    <tr>
      <th width="160">属性</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>acls</code></td>
    <td>
      （未定）
    </td>
  </tr>
  <tr>
      <td><code>base</code></td>
      <td>此项不再使用。LB4中，它以典型的JavaScript或TypeScript的类继承方式实现：
      <pre><code>@model() class MySuperModel extends MyBaseModel {...}</code>
      </pre>
      </td>
  </tr>
  <tr>
  <td><code>excludeBaseProperties</code></td>
  <td>（未定）</td>
  </tr>
  <tr>
  <td><code>http</code></td>
  <td>在LB3中，此项影响HTTP配置。因为在LB4中，HTTP配置由控制器（Controller）成员和REST服务器推断，此字段不再生效。</td>
  </tr>
  <tr>
    <td><code>options</code></td>
    <td>
      （未定），参见<a href="https://github.com/strongloop/loopback-next/issues/2142">issue #2142</a>的更多讨论。
    </td>
  </tr>
  <tr>
    <td><code>plural</code></td>
    <td>此项是LB3的HTTP配置的一部分。同上述<code>http</code>字段，不再生效。</td>
  </tr>
  <tr>
    <td><code>properties</code></td>
    <td>此项不再使用，因为我们在LB4中带来了<code>@property</code>修饰符。查看下面的<code>@property</code>修饰符以了解如何为你的数据模型定义属性（property）。</td>
  </tr>
  <tr>
    <td><code>relations</code></td>
    <td>
      参见说明 <a href="https://loopback.io/doc/zh/lb4/Repositories.html">repositories（存储库）</a>，在LB4中 关系（Relations）通过<code>relations</code>修饰符定义。<br />
      查阅<a href="https://loopback.io/doc/zh/lb4/Relations.html">Relations（关系）</a>了解更多详情
    </td>
  </tr>
  <tr>
    <td><code>remoting.<br/>normalizeHttpPath</code></td>
    <td>此项是LB3的HTTP配置的一部分。同上述<code>http</code>字段，不再生效。</td>
  </tr>
  <tr>
    <td><code>replaceOnPUT</code></td>
    <td>此项不再受LB4控制器（Controller）脚手架支持，PUT总是会调用replaceById。<br />
        必要时，用户可以修改自动生成的代码以调用<code>patchById</code>。</td>
  </tr>
  </tbody>
</table>

更多关于 LoopBack 4 中`Model Decorator`（数据模型修饰符）的信息，请查阅
[legacy-juggler-bridge file](https://github.com/strongloop/loopback-next/blob/2fa5df67181cdcd23a5dce90c9c640fe75943cb8/packages/repository/src/repositories/legacy-juggler-bridge.ts)
和
[model-builder file](https://github.com/strongloop/loopback-datasource-juggler/blob/master/lib/model-builder.js).

### 属性修饰符

<!-- 此段翻译自LB3文档。[Model definition section](https://loopback.io/doc/zh/lb3/Model-definition-JSON-file.html#properties) -->

属性修饰符与 LoopBack 3 的属性使用同样的参数。

对于每一个属性项，属性修饰符为它定义一些属性，示例如下：

```ts
@model()
class Product extends Entity {
  @property({
    name: "name",
    description: "The product's common name.",
    type: "string"
  })
  public name: string;

  @property({
    type: "number",
    id: true
  })
  id: number;
}
```

#### 属性的基本属性

每一个数据模型的属性，都有一些以关键字（Key）定义的属性用于描述，详见下表。只有`type`（类型）属性是必须的；对于只有`type`属性的属性，你可以使用下面示例的快速写法：

```javascript
"propertyName": "type"
```

例如：

```javascript
...
"emailVerified": "boolean",
"status": "string",
...
```

属性关键字列表：

<table>
  <thead>
    <tr>
      <th width="100">关键字</th>
      <th width="50">必须?</th>
      <th>类型</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>default</td>
      <td>否</td>
      <td>Any*</td>
      <td>属性的默认值。 类型必须与<code>type</code>指定的类型相同。
      </td>
    </tr>
    <tr>
      <td>defaultFn</td>
      <td>否</td>
      <td>String</td>
      <td>用于生成属性默认值的函数名。必须是下列之一：
        <ul>
          <li>
            <code>"guid"</code>：生成一个新的全局唯一标识符（GUID），使用计算机MAC地址和当前时间（UUID v1）。
          </li>
          <li><code>"uuid"</code>：生成一个新的通用唯一标识符（UUID），使用计算机的MAC地址和当前时间（UUID v1）。</li>
          <li><code>"uuidv4"</code>：生成一个新的通用唯一标识符（UUID），使用UUID v4算法。</li>
          <li>"<code>now"</code>：使用<code>new Date()</code>返回的当前日期和时间。</li>
        </ul>
        注意：关于提供额外选项的讨论，请访问此GitHub议题<a href="https://github.com/strongloop/loopback/issues/292" class="external-link" rel="nofollow">LoopBack issue 292</a>。
      </td>
    </tr>
    <tr>
      <td>description</td>
      <td>否</td>
      <td>String或Array</td>
      <td>
        此属性的描述，用于生成文档。<br />
        你可以将较长的描述分解为字符串数组（每行一项），以控制每行的长度。例如：
        <pre>[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "sed do eiusmod tempor incididunt ut labore et dolore",
            "magna aliqua."
            ]
        </pre>
      </td>
    </tr>
    <tr>
      <td>doc</td>
      <td>否</td>
      <td>String</td>
      <td>此属性的文档。<strong>以过期，使用<code>description</code>代替。</strong></td>
    </tr>
    <tr>
      <td>id</td>
      <td>否</td>
      <td>Boolean</td>
      <td>
        此属性是否为唯一标识符。默认为<code>false</code>。
        请查看下面的<code>Id</code>属性。
      </td>
    </tr>
    <tr>
      <td>index</td>
      <td>否</td>
      <td>Boolean</td>
      <td>此属性所代表的列（字段）是否为数据库的索引（Index）。</td>
    </tr>
    <tr>
      <td>required</td>
      <td>否</td>
      <td>Boolean</td>
      <td>
        此属性是否为“必须”。如果是<code>true</code>，那么新增或更新此数据模型实例时，需要提供此属性的值。<br/>
        默认为<code>false</code>。
      </td>
    </tr>
    <tr>
      <td>
        type
      </td>
      <td>是</td>
      <td>
        String
      </td>
      <td>
        属性类型，可以为<a href="LoopBack-types.html">LoopBack类型</a>描述的任意类型。
      </td>
    </tr>
    <tr>
      <td>*</td>
      <td>否</td>
      <td>Any</td>
      <td>详情见后。</td>
    </tr>
  </tbody>
</table>

#### ID 属性

代表数据库中的持久数据的数据模型，通常有一个或多个 ID 属性，可以唯一标识出此数据库模型的每个实例。
例如：`user`数据模型可以包含用户的 ID（标识符）。

默认情况下，如果没有定义 ID 属性，同时`idInjection`属性为`true`（或者没有设置，`true` 是默认值），LoopBack 会自动为数据模型添加`id`属性，如下所示：

```
id: {type: Number, generated: true, id: true}
```

`generated` 属性表明，此 ID 是否由数据库自动生成。
如果为`true`，连接器（Connector）将决定自动生成的 ID 的数据类型。对于关系型数据库来说（例如 Oracle 或 MySQL），它的默认类型是`number`。
如果你的应用会生成 ID，设置此属性为`false`。

为了明确指明某个属性是 ID，须设置此属性的`id`属性为`true`。`id`属性的值必须是下列之一：

- `true`：此属性是一个 ID。
- `false`（或者任何会被转换成 false 的值）：此属性不是一个 ID，此项为默认值。
- 正整数（例如 1 或者 2）：此属性是一个复合 ID 的索引（index）。

在数据库术语中，ID 属性是主键列。此类`id`属性被设置为`true`，或一个表示复合键顺序的正整数。

例如：

```javascript
{
  "myId": {
    "type": "string",
    "id": true
   }
}
```

重要：

1. 如果一个数据模型没有明确定义的 ID 属性，LoopBack 会自动注入一个名为“id”的属性作为标识符，除非`idInjection`选项被设置为`false`。
2. 如果一个 ID 属性的`generated`设置为`true`，连接器（Connector）将决定自动生成的 ID 的数据类型。对于关系型数据库来说（例如 Oracle 或 MySQL），它的默认类型是`number`。
3. 如果数据模型需要支持数据库，LoopBack 的 CRUD 方法需要此数据模型拥有一个“id”属性。
4. 没有任何“id”属性的数据模型，只能在无关数据库处使用。

#### 复合 ID

LoopBack 支持定义由“多个属性”组成的复合 ID，示例如下：

```javascript
var InventoryDefinition = {
  productId: { type: String, id: 1 },
  locationId: { type: String, id: 2 },
  qty: Number
};
```

这个复合 ID 是(productId, locationId)，用于一个库存数据模型。

{% include important.html content="复合ID现在不被REST API和DAO方法的查询参数（Query Parameter）支持，例如`findOrCreate`，`updateOrcreate`和`replaceOrCreate`。" %}

#### 数据映射属性

当使用关系型数据库作为数据源时，你可以使用下列属性来描述数据库中的列。

<table>
  <thead>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>描述</th>
    </tr>
  </thead>    
  <tbody>    
    <tr>
      <td>columnName</td>
      <td>String</td>
      <td>列名</td>
    </tr>
    <tr>
      <td>dataType</td>
      <td>String</td>
      <td>数据库中定义的数据类型</td>
    </tr>
    <tr>
      <td>dataLength</td>
      <td>Number</td>
      <td>数据长度</td>
    </tr>
    <tr>
      <td>dataPrecision</td>
      <td>Number</td>
      <td>数字类数据的精度</td>
    </tr>
    <tr>
      <td>dataScale</td>
      <td>Number</td>
      <td>数字类数据的比例（缩放）</td>
    </tr>
    <tr>
      <td>nullable</td>
      <td>Boolean</td>
      <td>如果是<code>true</code>，数据可以为空。</td>
    </tr>
  </tbody>
</table>

要映射一个属性到一个 Oracle 数据库的表的一列，示例如下：

```javascript
...
"name": {
      "type": "String",
      "required": false,
      "length": 40,
      "oracle": {
        "columnName": "NAME",
        "dataType": "VARCHAR2",
        "dataLength": 40,
        "nullable": "Y"
      }
    }
...
```

<div class="sl-hidden"><strong>非公开信息</strong><br>
  在此问题解决前暂时隐藏<a href="https://github.com/strongloop/loopback-datasource-juggler/issues/128" class="external-link" rel="nofollow">https://github.com/strongloop/loopback-datasource-juggler/issues/128</a>
  <p>数据转换和格式属性</p>
  <p>声明格式转换属性，如下表：</p>
      <table>
        <tbody>
          <tr>
            <th>关键字</th>
            <th>类型</th>
            <th>描述</th>
          </tr>
          <tr>
            <td>trim</td>
            <td>Boolean</td>
            <td>是否修剪（Trim）字符串</td>
          </tr>
          <tr>
            <td>lowercase</td>
            <td>Boolean</td>
            <td>是否转换字符串为小写</td>
          </tr>
          <tr>
            <td>uppercase</td>
            <td>Boolean</td>
            <td>是否转换字符串为大写</td>
          </tr>
          <tr>
            <td>format</td>
            <td>Regular expression</td>
            <td>正则表达式，用于格式化日期属性。</td>
          </tr>
        </tbody>
      </table>
    </div>

#### 从基类数据模型（Base Model）排除属性

默认情况下，一个数据模型会继承基类数据模型的所有属性。要使某些基类属性不可见，你需要设置`excludeBaseProperties = ['property-be-excluded-from-base-model']`。
相较于此前使用的“设置基类属性为`null`或`false`”方式，更建议使用`excludeBaseProperties`这一方式。

例如：
{% include code-caption.html content="common/models/customer.json" %}

```javascript
...
"base": "User",
"excludeBaseProperties" = ["lastUpdated", "credentials", "challenges"],
"properties": {
  ...
}
...
```

另一个示例：

从基类“Model”排除“id”属性

```javascript
...
"base": "Model",
"excludeBaseProperties" = ["id"],
"properties": {
  ...
}
...
```

不推荐下列排除基类属性的方式——设置基类属性为`null`或`false`。建议使用`excludeBaseProperties`如上所示。

{% include code-caption.html content="common/models/customer.json" %}

```javascript
...
"base": "User",
"properties": {
  "lastUpdated": false,
  "credentials": null,
  "challenges": null,
  "modified": "date"
}
...
```

#### 隐藏属性

这些属性存储于数据库，在 JavaScript 和 TypeScript 代码中可用，可以通过 POST/PUT/PATCH 请求修改，但在响应体（response body，`.toJSON()`的输出）中被移除。

使用`hiddenProperties`设置，以隐藏属性，示例如下：

```ts
@model({
  settings: {
    hiddenProperties: ['password']
  }
})
class MyUserModel extends Entity {
  @property({id: true})
  id: number;
   @property({type: 'string'})
  email: string;
   @property({type: 'string'})
  password: string;
  ...
}
```

如果你想使用白名单控制返回字段，而不是黑名单，考虑以下方式：

- 应用`fields`（字段）到数据模型的默认`scope`。
  这将会操作数据库的响应层，以限制你检查数据库中字段的能力，以免暴露你不希望的内容给外界（例如：私有标志）。
- 覆盖你的数据模型的`toJSON`方法。

请参考白名单的相关讨论：[GitHub](https://github.com/strongloop/loopback/issues/1554).

#### 受保护属性

`protected`属性是一个字符串数组，数组中的每项都必须对应数据模型中定义的属性名。

当 HTTP 响应 JSON 数据时，受保护的属性不会嵌套在其他对象中。
例如，有 Author（作者）对象和 Book（书籍）对象，Book 有属性关联到 Author，同时 Book 是一个公开的 API。
Author 数据模型包含一些个人信息（例如身份证号码）应当“受保护”（protected），以使得任何人在查阅书籍作者时，不会获得此类信息。

<!-- 译注：此处的“身份证号码”原文为“社保号码”，用于在美国证明身份，修改为“身份证号码”以符合中国习惯。 -->

{% include content/hidden-vs-protected.html %}

这个示例设置 `email`属性为“受保护属性”：

{% include code-caption.html content="common/models/user.json" %}

```javascript
{
  ...
  "properties": {
    ...
    "email": {
      "type": "string",
      "required": true
    },
    ...
  },
  "protected": ["email"],
  ...
}
```

#### 验证属性

你可以在`jsonSchema`中，指定验证字段的规则，例如：

```ts
@model()
class Product extends Entity {
  @property({
    name: "name",
    description: "The product's common name.",
    type: "string",
    // 在此定义JSON的验证规则
    jsonSchema: {
      maxLength: 30,
      minLength: 10
    }
  })
  public name: string;
}
```

请查阅此文档[Parsing requests](Parsing-requests.md#request-body) 以了解它的工作详情。

<!-- NOTE(kjdelisle): Until we have a metadata docs section, link to the
package in the repository. -->

属性修饰符使用了 LoopBack 的[metadata（元数据）](https://github.com/strongloop/loopback-next/tree/master/packages/metadata)包以确定特定属性的数据类型。

```ts
@model()
class Product extends Entity {
  @property()
  public name: string; // 此属性的类型信息是string（字符串）
}
```

### 数组属性（Array Property）修饰符

LoopBack 中，自动推测元数据的功能受到限制，因为 JavaScript 中数组的性质。在 JavaScript 中，数组不具有其成员的任何数据类型相关的信息，你可以检查数组的成员以确定它们是原始类型（string，number，array，boolean）对象或者函数，但当它们是对象或函数时，你无法获知任何细节。

为了确保一致性，我们要求使用`@property.array`修饰符，来为你的数组属性添加适当的元数据，用于类型推断。

```ts
@model()
class Order extends Entity {
  @property.array(Product)
  items: Product[];
}

@model()
class Thread extends Entity {
  // 注意，即使是原始类型，我们仍然需要设置数组属性！
  @property.array(String)
  posts: string[];
}
```

此外，`@property.array`修饰符接受可选的第二参数，用于定义或覆盖元数据， 用法与`@property`修饰符相同。

```ts
@model()
class Customer extends Entity {
  @property.array(String, {
    name: "names",
    required: true
  })
  aliases: string[];
}
```

### JSON 架构推断

使用`@loopback/repository-json-schema`模块来从“已修饰”的数据模型构建 JSON 架构。类型信息从`@model`和`@property`修饰符中推断。`@loopback/repository-json-schema` 模块包括`getJsonSchema`函数用于访问修饰符存储的元数据，以构建与你的数据模型匹配的 JSON 架构。

```ts
import { model, property } from "@loopback/repository";
import { getJsonSchema } from "@loopback/repository-json-schema";

@model()
class Category {
  @property()
  name: string;
}

@model()
class Product {
  @property({ required: true })
  name: string;
  @property()
  type: Category;
}

const jsonSchema = getJsonSchema(Product);
```

上述模型的`jsonSchema`会返回以下：

```json
{
  "title": "Product",
  "properties": {
    "name": {
      "type": "string"
    },
    "type": {
      "$ref": "#/definitions/Category"
    }
  },
  "definitions": {
    "Category": {
      "properties": {
        "name": {
          "type": "string"
        }
      }
    }
  },
  "required": ["name"]
}
```

在数据模型定义中，如果一个已修饰的属性是一个自定义类型，那么一个引用[`$ref`](http://json-schema.org/latest/json-schema-core.html#rfc.section.8)字段会被创建，并且一个`definitions`子架构会被在顶级架构中创建。`definitions`子架构通过递归调用`getJsonSchema`来构建并填充它的属性。这允许复杂并且嵌套自定义类型的定义的构架。

上述示例通过在`Product`数据模型中包含一个自定义类型的`Category`属性说明了这点。

#### 支持的 JSON 关键字

{% include note.html content="此功能仍然在开发中，尚未完成。" %}

下列是支持的关键字列表，可以被明确地在修饰符中传递，以更好地剪裁生成的 JSON 架构：

| 关键字      | 修饰符      | 类型    | 默认值       | 描述               |
| ----------- | ----------- | ------- | ------------ | ------------------ |
| title       | `@model`    | string  | _model name_ | 数据模型的名字     |
| description | `@model`    | string  |              | 数据模型的描述     |
| array       | `@property` | boolean |              | 指明属性是否为数组 |
| required    | `@property` | boolean |              | 指明属性是否为必须 |

## 其他的 ORM（对象关系映射）

你可以决定在你的 LoopBack 应用中使用一个替代的 ORM 或 ODM。
在路由时，LoopBack 4 不再需要你使用它自定义的数据模型格式来提供你的数据，这意味着你可以自由修改你的类来切合那些 ORM 或 ODM。

然而，这同样意味着，提供架构修饰符给 ORM 或 ODM 没有用处。某些框架可能也提供了有冲突的修饰符（例如，另一个`@model`修饰符），这可能保证避免提供的架构修饰符冲突。
