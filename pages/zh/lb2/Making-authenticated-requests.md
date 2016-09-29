---
title: "Making authenticated requests"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Making-authenticated-requests.html
summary:
---

The basic process for an application to create and authenticate users is:

1.  Register a new user with the [`User.create()`](http://apidocs.strongloop.com/loopback/#persistedmodel-create) method, inherited from the generic Model object.  See  [Registering users](/doc/{{page.lang}}/lb2/Registering-users.html) for details.
2.  Call [`User.login()`](http://apidocs.strongloop.com/loopback/#userlogincredentials-callback) to request an access token from the client application on behalf of the user.  See [Logging in users](/doc/{{page.lang}}/lb2/Logging-in-users.html) for details.
3.  Invoke an API using the access token.  Provide the access token in the HTTP header or as a query parameter to the REST API call, as illustrated below.

## Making authenticated requests with access tokens

Once a user is logged in, LoopBack creates a new AccessToken referencing the user. This token is required when making subsequent REST requests for the access control system to validate that the user can invoke methods on a given `Model`.

**shell**

```
ACCESS_TOKEN=6Nb2ti5QEXIoDBS5FQGWIz4poRFiBCMMYJbYXSGHWuulOuy0GTEuGx2VCEVvbpBK

# Authorization Header
curl -X GET -H "Authorization: $ACCESS_TOKEN" \
http://localhost:3000/api/widgets

# Query Parameter
curl -X GET http://localhost:3000/api/widgets?access_token=$ACCESS_TOKEN
```

To use cookies for authentication, add the following to server.js (before boot):

**/server/server.js**

`app.use(loopback.token({ model: app.models.accessToken }));`

## Deleting access tokens

A user will be effectively logged out by deleting the access token they were issued at login. This affects only the specified access token; other tokens attached to the user will still be valid.

**/server/boot/script.js**

```js
var USER_ID = 1;
var ACCESS_TOKEN = '6Nb2ti5QEXIoDBS5FQGWIz4poRFiBCMMYJbYXSGHWuulOuy0GTEuGx2VCEVvbpBK';
// remove just the token
var token = new AccessToken({
  id: ACCESS_TOKEN
});
token.destroy();
// remove all user tokens
AccessToken.destroyAll({
  where: {
    userId: USER_ID
  }
});
```

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p>Removed</p>
  <p>/common/models/model.js</p>
</div>
