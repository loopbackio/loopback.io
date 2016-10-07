---
title: "Managing users"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Managing-users.html
summary:
---

{% include important.html content="

Prerequisites

*   [Install StrongLoop software](https://docs.strongloop.com/pages/viewpage.action?pageId=6095101).
*   Read [LoopBack 核心概念](https://docs.strongloop.com/pages/viewpage.action?pageId=6095111) first.
*   Follow [LoopBack初级教程](https://docs.strongloop.com/pages/viewpage.action?pageId=6095006) for a basic introduction to LoopBack.

" %}

**See also**: **See also**: [用户认证和授权](/doc/{{page.lang}}/lb2/6094988.html)

LoopBack's built-in [User](http://apidocs.strongloop.com/loopback/#user-new-user) model provides essential user management features such as:

*   Registration and confirmation via email.
*   Login and logout.
*   Creating an access token.
*   Password reset.  

You can [extend the User model](/doc/{{page.lang}}/lb2/Extending-built-in-models.html) to suit your specific needs, so in most cases, you don't need to create your own User model from scratch.  

The basic process to create and authenticate users is:

1.  Register a new user with the [`User.create()`](http://apidocs.strongloop.com/loopback/#persistedmodel-create) method, inherited from the generic `PersistedModel` object.  See [Registering users](/doc/{{page.lang}}/lb2/Registering-users.html) for more information.
2.  Log in a user by calling [`User.login()`](http://apidocs.strongloop.com/loopback/#userlogincredentials-callback) to get an access token.  See [Logging in users](/doc/{{page.lang}}/lb2/Logging-in-users.html) for more information.
3.  Make subsequent API calls using the access token.  Provide the access token in the HTTP header or as a query parameter to the REST API call, as shown in [Making authenticated requests with access tokens](/doc/{{page.lang}}/lb2/Managing-users.html).
