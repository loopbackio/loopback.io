---
title: "Making authenticated requests"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Making-authenticated-requests.html
summary:
---

The basic process for an application to create and authenticate users is:

1.  Register a new user with the [`User.create()`](http://apidocs.loopback.io/loopback/#persistedmodel-create) method,
    inherited from the [`PersistedModel`](https://apidocs.loopback.io/loopback/#persistedmodel) object.
    See [Registering users](Registering-users.html) for details.
2.  Call [`User.login()`](https://apidocs.loopback.io/loopback/#user-login) to request an access token from the client application on behalf of the user.
    See [Logging in users](Logging-in-users.html) for details.
3.  Invoke an API using the access token. Provide the access token in the HTTP header or as a query parameter to the REST API call, as illustrated below.

## Making authenticated requests with access tokens

Once a user is logged in, LoopBack creates a new AccessToken referencing the user.
This token is required when making subsequent REST requests for the access control system to validate that the user can invoke methods on a given `Model`.

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

{% include code-caption.html content="/server/server.js" %}
```javascript
app.use(loopback.token({
    model: app.models.accessToken
}));
```

{% include note.html content="

The Loopback Angular SDK doesn't support using cookies, and expects you to be using an access token returned from `User.login()`.

" %}

## Enable vanity user URLs

To display vanity user URLs, configure the token middleware with currentUserLiteral options. 

{% include code-caption.html content="/server/server.js" %}
```javascript
app.use(loopback.token({
    model: app.models.accessToken,
    currentUserLiteral: 'me'
}));
```

The _currentUserLiteral_ defines a special token that can be used in the URL for REST APIs, for example:

`curl -X GET http://localhost:3000/api/users/me/orders?access_token=$ACCESS_TOKEN`

Please note the URL will be rewritten to `http://localhost:3000/api/users/<currentLoggedInUserId>/orders?access_token=$ACCESS_TOKEN` by LoopBack.

## Deleting access tokens

A user will be effectively logged out by deleting the access token they were issued at login.
This affects only the specified access token; other tokens attached to the user will still be valid.

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
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
