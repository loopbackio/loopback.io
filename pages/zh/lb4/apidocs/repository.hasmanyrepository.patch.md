---
lang: zh
title: 'API docs: repository.hasmanyrepository.patch'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.repository.hasmanyrepository.patch.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/repository](./repository.md) &gt; [HasManyRepository](./repository.hasmanyrepository.md) &gt; [patch](./repository.hasmanyrepository.patch.md)

## HasManyRepository.patch() method

Patch multiple target model instances

<b>Signature:</b>

```typescript
patch(dataObject: DataObject<Target>, where?: Where<Target>, options?: Options): Promise<Count>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  dataObject | <code>DataObject&lt;Target&gt;</code> | The fields and their new values to patch |
|  where | <code>Where&lt;Target&gt;</code> | Instances within the where scope are patched |
|  options | <code>Options</code> |  |

<b>Returns:</b>

`Promise<Count>`

A promise which resolves the patched target model instances

