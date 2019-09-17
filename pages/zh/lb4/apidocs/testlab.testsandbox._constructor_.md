---
lang: zh
title: 'API docs: testlab.testsandbox._constructor_'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.testlab.testsandbox._constructor_.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/testlab](./testlab.md) &gt; [TestSandbox](./testlab.testsandbox.md) &gt; [(constructor)](./testlab.testsandbox._constructor_.md)

## TestSandbox.(constructor)

Will create a directory if it doesn't already exist. If it exists, you still get an instance of the TestSandbox.

<b>Signature:</b>

```typescript
constructor(path: string);
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  path | <code>string</code> | Path of the TestSandbox. If relative (it will be resolved relative to cwd()). |

