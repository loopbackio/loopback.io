---
lang: zh
title: 'API docs: authentication.authenticationbindings.metadata'
keywords: LoopBack 4.0, LoopBack 4
sidebar: lb4_sidebar
permalink: /doc/zh/lb4/apidocs.authentication.authenticationbindings.metadata.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/authentication](./authentication.md) &gt; [AuthenticationBindings](./authentication.authenticationbindings.md) &gt; [METADATA](./authentication.authenticationbindings.metadata.md)

## AuthenticationBindings.METADATA variable

Key used to inject authentication metadata, which is used to determine whether a request requires authentication or not.

<b>Signature:</b>

```typescript
METADATA: BindingKey<AuthenticationMetadata | undefined>
```

## Example


```ts
class MyPassportStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) {}
  value(): ValueOrPromise<Strategy | undefined> {
    if (this.metadata) {
      const name = this.metadata.strategy;
      // logic to determine which authentication strategy to return
    }
  }
}

```

