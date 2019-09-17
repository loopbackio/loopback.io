---
lang: zh
title: 'API docs: repository.repositorymixindoc.datasource'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.repository.repositorymixindoc.datasource.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/repository](./repository.md) &gt; [RepositoryMixinDoc](./repository.repositorymixindoc.md) &gt; [dataSource](./repository.repositorymixindoc.datasource.md)

## RepositoryMixinDoc.dataSource() method

Add the dataSource to this application.

<b>Signature:</b>

```typescript
dataSource(dataSource: Class<juggler.DataSource> | juggler.DataSource, name?: string): Binding;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  dataSource | <code>Class&lt;juggler.DataSource&gt; &#124; juggler.DataSource</code> | The dataSource to add. |
|  name | <code>string</code> | The binding name of the datasource; defaults to dataSource.name |

<b>Returns:</b>

`Binding`

## Example


```ts

const ds: juggler.DataSource = new juggler.DataSource({
  name: 'db',
  connector: 'memory',
});

app.dataSource(ds);

// The datasource can be injected with
constructor(@inject('datasources.db') dataSource: DataSourceType) {

}

```

