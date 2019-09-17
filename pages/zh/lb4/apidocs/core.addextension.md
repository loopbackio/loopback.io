---
lang: zh
title: 'API docs: core.addextension'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.core.addextension.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/core](./core.md) &gt; [addExtension](./core.addextension.md)

## addExtension() function

Register an extension for the given extension point to the context

<b>Signature:</b>

```typescript
export declare function addExtension(context: Context, extensionPointName: string, extensionClass: Constructor<unknown>, options?: BindingFromClassOptions): Binding<unknown>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  context | <code>Context</code> | Context object |
|  extensionPointName | <code>string</code> | Name of the extension point |
|  extensionClass | <code>Constructor&lt;unknown&gt;</code> | Class or a provider for an extension |
|  options | <code>BindingFromClassOptions</code> | Options Options for the creation of binding from class |

<b>Returns:</b>

`Binding<unknown>`

