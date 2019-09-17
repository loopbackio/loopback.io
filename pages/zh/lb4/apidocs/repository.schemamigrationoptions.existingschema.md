---
lang: zh
title: 'API docs: repository.schemamigrationoptions.existingschema'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.repository.schemamigrationoptions.existingschema.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/repository](./repository.md) &gt; [SchemaMigrationOptions](./repository.schemamigrationoptions.md) &gt; [existingSchema](./repository.schemamigrationoptions.existingschema.md)

## SchemaMigrationOptions.existingSchema property

When set to 'drop', schema migration will drop existing tables and recreate them from scratch, removing any existing data along the way.

When set to 'alter', schema migration will try to preserve current schema and data, and perform a non-destructive incremental update.

<b>Signature:</b>

```typescript
existingSchema?: 'drop' | 'alter';
```
