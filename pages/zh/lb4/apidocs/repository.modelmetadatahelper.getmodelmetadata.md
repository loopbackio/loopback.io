---
lang: zh
title: 'API docs: repository.modelmetadatahelper.getmodelmetadata'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.repository.modelmetadatahelper.getmodelmetadata.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/repository](./repository.md) &gt; [ModelMetadataHelper](./repository.modelmetadatahelper.md) &gt; [getModelMetadata](./repository.modelmetadatahelper.getmodelmetadata.md)

## ModelMetadataHelper.getModelMetadata() method

A utility function to simplify retrieving metadata from a target model and its properties.

<b>Signature:</b>

```typescript
static getModelMetadata(target: Function, options?: InspectionOptions): ModelDefinition | {};
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  target | <code>Function</code> | The class from which to retrieve metadata. |
|  options | <code>InspectionOptions</code> | An options object for the MetadataInspector to customize the output of the metadata retrieval functions. |

<b>Returns:</b>

`ModelDefinition | {}`

