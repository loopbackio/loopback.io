---
lang: zh
title: 'API docs: context.invokemethodwithinterceptors'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.context.invokemethodwithinterceptors.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/context](./context.md) &gt; [invokeMethodWithInterceptors](./context.invokemethodwithinterceptors.md)

## invokeMethodWithInterceptors() function

Invoke a method with the given context

<b>Signature:</b>

```typescript
export declare function invokeMethodWithInterceptors(context: Context, target: object, methodName: string, args: InvocationArgs, options?: InvocationOptions): ValueOrPromise<InvocationResult>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  context | <code>Context</code> | Context object |
|  target | <code>object</code> | Target class (for static methods) or object (for instance methods) |
|  methodName | <code>string</code> | Method name |
|  args | <code>InvocationArgs</code> | An array of argument values |
|  options | <code>InvocationOptions</code> | Options for the invocation |

<b>Returns:</b>

`ValueOrPromise<InvocationResult>`

