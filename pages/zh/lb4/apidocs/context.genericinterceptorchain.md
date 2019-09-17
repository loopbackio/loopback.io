---
lang: zh
title: 'API docs: context.genericinterceptorchain'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.context.genericinterceptorchain.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/context](./context.md) &gt; [GenericInterceptorChain](./context.genericinterceptorchain.md)

## GenericInterceptorChain class

A chain of generic interceptors to be invoked for the given context

<b>Signature:</b>

```typescript
export declare class GenericInterceptorChain<C extends Context = Context> 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(context, interceptors)](./context.genericinterceptorchain._constructor_.md) |  | Create an invocation chain with a list of interceptor functions or binding keys |
|  [(constructor)(context, filter, comparator)](./context.genericinterceptorchain._constructor__1.md) |  | Create an invocation interceptor chain with a binding filter and comparator. The interceptors are discovered from the context using the binding filter and sorted by the comparator (if provided). |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [getInterceptors](./context.genericinterceptorchain.getinterceptors.md) |  | <code>() =&gt; GenericInterceptorOrKey&lt;C&gt;[]</code> | A getter for an array of interceptor functions or binding keys |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [invokeInterceptors()](./context.genericinterceptorchain.invokeinterceptors.md) |  | Invoke the interceptor chain |

