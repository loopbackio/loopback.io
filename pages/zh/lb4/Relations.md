---
lang: zh
title: "关系（Relations）"
keywords: LoopBack 4.0, LoopBack 4
sidebar: zh_lb4_sidebar
permalink: /doc/zh/lb4/Relations.html
layout: translation
---

## 总览

独立的数据模型，一般容易被理解和使用。但是现实中，多个数据模型之间，经常有各种关联（connected or related）。当你在使用多个数据模型，构架一个现实世界的应用时，你通常需要定义模型之间的关系。例如：

- 一位顾客有（Have）许多订单，每个订单都被一位顾客拥有（Owned）。
- 一名用户可以被分派一个或多个（One or more）角色，同一角色可以有零个或多个用户（Zero or more）。
- 一名医师根据预约，可以关照多名（Many）患者，一名患者也可以在多名（Many）医师处就医。

当连接数据模型时，LoopBack 将会暴露一套 API 用于多个数据模型实例的交互，以及基于客户端的需要查询和过滤信息。

LoopBack 3 中，数据模型关系是它最强大的功能之一，它帮助用户将现实世界中关联，映射到数据模型之间的关系（Relation）、访问每个模型的恰当的 CRUD API、并在用户搭建他们的 LoopBack 应用脚手架之后为关系（Relation）添加查询和过滤能力。

在 LoopBack 4 中的[存储库（Repositories）](Repositories.md)的说明中，我们通过创建受约束（Constrained）的存储库，以简化开发途径。这意味着某些目标数据模型的存储库必须完全根据关系定义，因此我们将其约束（Constrained）形式在源存储库上生成为导航属性（Navigation Property）。

Here are the currently supported relations:

- [HasMany（有很多）关系](HasMany-relation.md)
- [BelongsTo（属于）关系](BelongsTo-relation.md)
- [HasOne（有一个）关系](hasOne-relation.md)

{% include note.html content="
`hasMany`（有很多） 关系，也可以实现为`referencesMany`（引用很多）或者 `embedsMany` （嵌入很多）关系。这些关系（Relations）很像，但不完全相同。因为每个数据库的范式有着不同的权衡，因此不同的数据库需要应用使用不同的关系类型，参考[最符合你数据库的关系（Relation）](https://github.com/strongloop/loopback-next/issues/2341).
" %}

上述文章中，会展示每种关系（Relation）如何依赖于关系引擎来定义并配置你的 LoopBack 应用中的关系（Relation）。

可以使用 CLI 来生成`HasMany`或`BelongsTo`关系，详见[关系（Relation）生成器](Relation-generator.md).
