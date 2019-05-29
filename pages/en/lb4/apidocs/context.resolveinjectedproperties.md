---
lang: en
title: 'API docs: context.resolveinjectedproperties'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/en/lb4/apidocs.context.resolveinjectedproperties.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/context](./context.md) &gt; [resolveInjectedProperties](./context.resolveinjectedproperties.md)

## resolveInjectedProperties() function

Given a class with properties decorated with `@inject`<!-- -->, return the map of properties resolved using the values bound in `ctx`<!-- -->.

The function returns an argument array when all dependencies were resolved synchronously, or a Promise otherwise.

<b>Signature:</b>

```typescript
export declare function resolveInjectedProperties(constructor: Function, ctx: Context, session?: ResolutionSession): ValueOrPromise<MapObject<BoundValue>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  constructor | <code>Function</code> | The class for which properties should be resolved. |
|  ctx | <code>Context</code> | The context containing values for <code>@inject</code> resolution |
|  session | <code>ResolutionSession</code> | Optional session for binding and dependency resolution |

<b>Returns:</b>

`ValueOrPromise<MapObject<BoundValue>>`

