---
lang: zh
title: 'API docs: testlab.createunexpectedhttperrorlogger'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.testlab.createunexpectedhttperrorlogger.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/testlab](./testlab.md) &gt; [createUnexpectedHttpErrorLogger](./testlab.createunexpectedhttperrorlogger.md)

## createUnexpectedHttpErrorLogger() function

Creates a Logger that logs an Error if the HTTP status code is not expected

<b>Signature:</b>

```typescript
export declare function createUnexpectedHttpErrorLogger(expectedStatusCode?: number): LogError;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  expectedStatusCode | <code>number</code> | HTTP status code that is expected |

<b>Returns:</b>

`LogError`

