---
title: "AccessToken invalidation"
lang: en
layout: page
keywords: LoopBack
tags: authentication
sidebar: lb2_sidebar
permalink: /doc/en/lb2/AccessToken-invalidation.html
summary: When a user changes their email or password, other sessions are logged out for security reasons.
---

When user's account is compromised, for example when their password is leaked,
or the attacker gains access to their email account, the user need means for
recovering from the situation and preventing the attacker from continued use
of the services under the attacked user's name.

To address this case, LoopBack invalidates access tokens (logs out sessions)
when a change of password or email was detected. By default, this feature is
disabled in 2.x LTS for backwards compatibility and a warning is printed at
startup time to notify the app developer about a possible security issue.

To enable access-token invalidation, one should set the flag
`"logoutSessionsOnSensitiveChanges`" to `true` in `server/config.json` file.

{% include tip.html content="
If your application implements an own solution for access-token invalidation, then set `logoutSessionsOnSensitiveChanges` to `false`, to prevent interference between the built-in invalidation and your custom solution. This will also disable the warning. However, note that this flag is not available in LoopBack 3.x.
"%}

Example:

```json
{
  "restApiRoot": "/api",
  "host": "0.0.0.0",
  "port": 3000,
  "remoting": {
    // ...
  },
  "logoutSessionsOnSensitiveChanges": true,
}
```

To allow the access-token invalidation code detect and preserve the current
sessions, one has to enable context propagation via "options" argument
in the settings of your User model. This setting cannot be changed in the
built-in User model, the application must configure a custom model [extending
the built-in `User` model](Extending-built-in-models.html).

Example of a `Customer` model extending the built-in `User` model:

```json
{
  "name": "Customer",
  "base": "User",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {},
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```


