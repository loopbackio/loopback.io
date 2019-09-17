---
lang: zh
title: 'API docs: repository.crudconnector.createall'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.repository.crudconnector.createall.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/repository](./repository.md) &gt; [CrudConnector](./repository.crudconnector.md) &gt; [createAll](./repository.crudconnector.createall.md)

## CrudConnector.createAll() method

Create multiple entities

<b>Signature:</b>

```typescript
createAll?(modelClass: Class<Entity>, entities: EntityData[], options?: Options): Promise<EntityData[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  modelClass | <code>Class&lt;Entity&gt;</code> | The model class |
|  entities | <code>EntityData[]</code> | An array of entity instances or data |
|  options | <code>Options</code> | Options for the operation |

<b>Returns:</b>

`Promise<EntityData[]>`

A promise of an array of entities created

