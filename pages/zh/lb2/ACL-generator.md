---
title: "ACL generator"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/ACL-generator.html
summary:
---

The LoopBack ACL generator adds a new access control list (ACL) entry to the LoopBack application.

```shell
$ cd <loopback-app-dir>
$ slc loopback:acl
```

The tool will prompt you for the necessary information and then modify the [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) accordingly.

The generator prompts for:

*   Name of the model to which you want to apply access control or all models.
*   Scope of access control: All methods and properties or a specific method.
*   If you choose a specific method, the method's name.
*   Access type: read, write, execute, or all.
*   Role: all users, any unauthenticated user, any authenticated user, the object owner.
*   Permission to apply: explicitly grant access or explicitly deny access
