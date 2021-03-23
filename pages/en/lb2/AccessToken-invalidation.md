---
title: "Access token invalidation"
lang: en
layout: page
keywords: LoopBack
tags: authentication
sidebar: lb2_sidebar
v2only: true
permalink: /doc/en/lb2/AccessToken-invalidation.html
summary: When a user changes their email or password, other sessions are logged out for security reasons.
---

When a user's account is compromised (for example their password is leaked or
an attacker gains access to their email account), the app needs to be able to
prevent continued use of the hijacked account.

To address this case, LoopBack invalidates access tokens (logs out sessions)
when a change of password or email was detected. By default, this feature is
disabled in 2.x LTS for backwards compatibility and a warning is printed at
startup time to notify the app developer about a possible security issue.

To enable access-token invalidation, set the flag
`logoutSessionsOnSensitiveChanges` to `true` in the `server/config.json` file.

{% include tip.html content="
If your application implements access-token invalidation itself, then set `logoutSessionsOnSensitiveChanges` to `false`, to prevent interference between the built-in invalidation and your custom solution. This will also disable the warning. This flag is not available in LoopBack 3.x.
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

To allow the access-token invalidation code to detect and preserve current sessions,
enable context propagation via the "options" argument
in the settings of your User model. You can't change this setting in the
built-in User model.  Instead,  configure a custom model that
[extends the built-in User model](Extending-built-in-models.html).

Example of a `Customer` model extending the built-in `User` model:

```json
{
  "name": "Customer",
  "base": "User",
  "idInjection": true,
  "options": {
    "injectOptionsFromRemoteContext": true,
    "validateUpsert": true
  },
  "properties": {},
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```
