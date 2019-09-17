---
lang: zh
title: 'API docs: context.bindingkey.create'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.context.bindingkey.create.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/context](./context.md) &gt; [BindingKey](./context.bindingkey.md) &gt; [create](./context.bindingkey.create.md)

## BindingKey.create() method

Create a new key for a binding bound to a value of type `ValueType`<!-- -->.

<b>Signature:</b>

```typescript
static create<ValueType>(key: string, propertyPath?: string): BindingKey<ValueType>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  key | <code>string</code> | The binding key. When propertyPath is not provided, the key is allowed to contain propertyPath as encoded via <code>BindingKey#toString()</code> |
|  propertyPath | <code>string</code> | Optional path to a deep property of the bound value. |

<b>Returns:</b>

`BindingKey<ValueType>`

## Example


```ts
BindingKey.create<string>('application.name');
BindingKey.create<number>('config', 'rest.port);
BindingKey.create<number>('config#rest.port');

```

