---
lang: zh
title: 'API docs: repository.property.array'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.repository.property.array.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/repository](./repository.md) &gt; [property](./repository.property.md) &gt; [array](./repository.property.array.md)

## property.array() function

<b>Signature:</b>

```typescript
function array(itemType: PropertyType, definition?: Partial<PropertyDefinition>): (target: object, propertyName: string) => void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  itemType | <code>PropertyType</code> | The type of array items. Examples: <code>number</code>, <code>Product</code>, <code>() =&gt; Order</code>. |
|  definition | <code>Partial&lt;PropertyDefinition&gt;</code> | Optional PropertyDefinition object for additional metadata |

<b>Returns:</b>

`(target: object, propertyName: string) => void`

