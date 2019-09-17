---
lang: zh
title: 'API docs: repository-json-schema.getjsonschemaref'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.repository-json-schema.getjsonschemaref.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/repository-json-schema](./repository-json-schema.md) &gt; [getJsonSchemaRef](./repository-json-schema.getjsonschemaref.md)

## getJsonSchemaRef() function

Describe the provided Model as a reference to a definition shared by multiple endpoints. The definition is included in the returned schema.

<b>Signature:</b>

```typescript
export declare function getJsonSchemaRef<T extends object>(modelCtor: Function & {
    prototype: T;
}, options?: JsonSchemaOptions<T>): JSONSchema;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  modelCtor | <code>Function &amp; {</code><br/><code>    prototype: T;</code><br/><code>}</code> | The model constructor (e.g. <code>Product</code>) |
|  options | <code>JsonSchemaOptions&lt;T&gt;</code> | Additional options |

<b>Returns:</b>

`JSONSchema`

## Example


```ts
const schema = {
  $ref: '/definitions/Product',
  definitions: {
    Product: {
      title: 'Product',
      properties: {
        // etc.
      }
    }
  }
}

```

