---
lang: en
title: 'Using components'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Using-components.html
summary:
---

One of the many ways LoopBack 4 allows for extensibility is through Components.
A Component makes it easy for independent developer to contribute additional
features to LoopBack. Components provide a package that allows you to extends
your Application.

A typical LoopBack component is an [npm](https://www.npmjs.com) package
exporting a Component class whih can be added to your application.

```ts
import { RestApplication } from "@loopback/rest";
import { AuthenticationComponent } from "@loopback/authentication";

const app = new RestApplication();
// Add component to Application, which provides bindings for
// authenticate sequence action
app.component(AuthenticationComponent);
```

Components can contribute the following items:

* [Controllers](Controllers.html)
* Providers of additional [Context values](Context.html)

Certain Components may require the use of a (Mixin)[Mixin.html] so they may
contribute additional artifacts. For example,

* `RepositoryMixin` from `@loopback/repository` enables a Component to
  contribute (Repositories)[Repositories.html]
* `BootMixin` from `@loopback/boot` enables a Component to
  contribute (Booters)[Booting-an-Application.html#booters]

**Note:** Always check the instructions for a component to see if it requires
the use of a Mixin. Adding a Mixin to your Application class doesn't change how
a component is added to the Application (using `app.component()`).`
