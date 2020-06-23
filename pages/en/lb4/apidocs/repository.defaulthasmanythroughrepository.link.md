---
lang: en
title: 'API docs: repository.defaulthasmanythroughrepository.link'
keywords: LoopBack 4.0, LoopBack 4, Node.js, TypeScript, OpenAPI
sidebar: lb4_sidebar
editurl: https://github.com/strongloop/loopback-next/tree/master/packages/repository
permalink: /doc/en/lb4/apidocs.repository.defaulthasmanythroughrepository.link.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/repository](./repository.md) &gt; [DefaultHasManyThroughRepository](./repository.defaulthasmanythroughrepository.md) &gt; [link](./repository.defaulthasmanythroughrepository.link.md)

## DefaultHasManyThroughRepository.link() method

<b>Signature:</b>

```typescript
link(targetModelId: TargetID, options?: Options & {
        throughData?: DataObject<ThroughEntity>;
        throughOptions?: Options;
    }): Promise<TargetEntity>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  targetModelId | TargetID |  |
|  options | [Options](./repository.options.md) &amp; { throughData?: [DataObject](./repository.dataobject.md)<!-- -->&lt;ThroughEntity&gt;; throughOptions?: [Options](./repository.options.md)<!-- -->; } |  |

<b>Returns:</b>

Promise&lt;TargetEntity&gt;

