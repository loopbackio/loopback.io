---
lang: zh
title: 'API docs: rest.restserver.route_2'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.rest.restserver.route_2.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/rest](./rest.md) &gt; [RestServer](./rest.restserver.md) &gt; [route](./rest.restserver.route_2.md)

## RestServer.route() method

Register a new generic route.

<b>Signature:</b>

```typescript
route(route: RouteEntry): Binding;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  route | <code>RouteEntry</code> | The route to add. |

<b>Returns:</b>

`Binding`

## Example


```ts
function greet(name: string) {
 return `hello ${name}`;
}
const route = new Route('get', '/', operationSpec, greet);
app.route(route);

```

