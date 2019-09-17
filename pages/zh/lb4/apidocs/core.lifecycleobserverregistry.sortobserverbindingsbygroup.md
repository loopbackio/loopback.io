---
lang: zh
title: 'API docs: core.lifecycleobserverregistry.sortobserverbindingsbygroup'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.core.lifecycleobserverregistry.sortobserverbindingsbygroup.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/core](./core.md) &gt; [LifeCycleObserverRegistry](./core.lifecycleobserverregistry.md) &gt; [sortObserverBindingsByGroup](./core.lifecycleobserverregistry.sortobserverbindingsbygroup.md)

## LifeCycleObserverRegistry.sortObserverBindingsByGroup() method

Sort the life cycle observer bindings so that we can start/stop them in the right order. By default, we can start other observers before servers and stop them in the reverse order

<b>Signature:</b>

```typescript
protected sortObserverBindingsByGroup(bindings: Readonly<Binding<LifeCycleObserver>>[]): LifeCycleObserverGroup[];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  bindings | <code>Readonly&lt;Binding&lt;LifeCycleObserver&gt;&gt;[]</code> | Life cycle observer bindings |

<b>Returns:</b>

`LifeCycleObserverGroup[]`

