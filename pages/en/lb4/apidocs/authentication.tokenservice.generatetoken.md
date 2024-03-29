---
lang: en
title: 'API docs: authentication.tokenservice.generatetoken'
keywords: LoopBack 4.0, LoopBack 4, Node.js, TypeScript, OpenAPI
sidebar: lb4_sidebar
editurl: https://github.com/loopbackio/loopback-next/tree/master/packages/authentication
permalink: /doc/en/lb4/apidocs.authentication.tokenservice.generatetoken.html
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@loopback/authentication](./authentication.md) &gt; [TokenService](./authentication.tokenservice.md) &gt; [generateToken](./authentication.tokenservice.generatetoken.md)

## TokenService.generateToken() method

Generates a token string based on a user profile

**Signature:**

```typescript
generateToken(userProfile: UserProfile): Promise<string>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  userProfile | [UserProfile](./security.userprofile.md) | A UserProfile for which a token should be generated. |

**Returns:**

Promise&lt;string&gt;

a generated token/secret for a given UserProfile.


