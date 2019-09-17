---
lang: zh
title: 'API docs: context.createproxywithinterceptors'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.context.createproxywithinterceptors.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/context](./context.md) &gt; [createProxyWithInterceptors](./context.createproxywithinterceptors.md)

## createProxyWithInterceptors() function

Create a proxy that applies interceptors for method invocations

<b>Signature:</b>

```typescript
export declare function createProxyWithInterceptors<T extends object>(target: T, context?: Context): AsyncProxy<T>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  target | <code>T</code> | Target class or object |
|  context | <code>Context</code> | Context object |

<b>Returns:</b>

`AsyncProxy<T>`

