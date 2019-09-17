---
lang: zh
title: 'API docs: openapi-v3.param.query'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.openapi-v3.param.query.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/openapi-v3](./openapi-v3.md) &gt; [param](./openapi-v3.param.md) &gt; [query](./openapi-v3.param.query.md)

## param.query variable

Query parameter decorator

<b>Signature:</b>

```typescript
query: {
        string: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        number: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        boolean: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        integer: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        long: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        float: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        double: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        byte: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        binary: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        date: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        dateTime: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        password: (name: string, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
        object: (name: string, schema?: SchemaObject | ReferenceObject, spec?: Partial<ParameterObject> | undefined) => (target: object, member: string, index: number) => void;
    }
```
