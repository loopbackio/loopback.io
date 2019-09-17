---
lang: zh
title: 'API docs: testlab.tojson_3'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.testlab.tojson_3.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/testlab](./testlab.md) &gt; [toJSON](./testlab.tojson_3.md)

## toJSON() function

JSON encoding does not preserve properties that are undefined As a result, deepEqual checks fail because the expected model value contains these undefined property values, while the actual result returned by REST API does not. Use this function to convert a model instance into a data object as returned by REST API

<b>Signature:</b>

```typescript
export declare function toJSON(value: object): object;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  value | <code>object</code> |  |

<b>Returns:</b>

`object`

