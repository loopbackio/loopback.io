---
title: "Logging in users"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Logging-in-users.html
summary:
---

## Login with the LoopBack User model

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Use remote hooks for this, (or boot script), link to loopback-example-access-control tutorial for an example (/server/boot/routes.js)</div>

### Logging in

Login (authenticate) a user by calling the [`User.login()`](http://apidocs.strongloop.com/loopback/#user-login) method and providing an object containing `password` and `email or username` properties as the first parameter.  The method returns an access token.

**Boot script**

```js
User.login({
  username: 'foo',
  password: 'bar'
}, function(err, accessToken) {
  console.log(accessToken);
});
```

{% include important.html content="

[`User.login()`](http://apidocs.strongloop.com/loopback/#user-login) has an optional second parameter that is a string or an array of strings.  Pass in \"user\" for this parameter to include the user information. For REST apis, using _?include=user_.

" %}

You may also specify how long the access token is valid by providing a `ttl` (time to live) property with a value in **milliseconds**.  For example:

**Boot script**

```js
var TWO_WEEKS = 1000 * 60 * 60 * 24 * 7 * 2;
User.login({
  email: 'me@domain.com', // must provide email or "username"
  password: 'secret', // required by default
  ttl: TWO_WEEKS // keep the AccessToken alive for at least two weeks
}, function(err, accessToken) {
  console.log(accessToken.id); // => GOkZRwg... the access token
  console.log(accessToken.ttl); // => 1209600 time to live
  console.log(accessToken.created); // => 2013-12-20T21:10:20.377Z
  console.log(accessToken.userId); // => 1
});
```

If a login attempt is unsuccessful, an error will be returned in the following format.

```js
{
  "status": 401, // or 400 if the credentails object is invalid
  "message": "login failed" // could also be "realm is required" or "username or email is required"
}
```

Over REST, use the `POST /users/login` endpoint; for example:

**Shell**

```js
curl - X POST - H "Content-Type:application/json"\ -
  d '{"email": "me@domain.com", "password": "secret", "ttl": 1209600000}'\
http: //localhost:3000/api/users/login
```

The return value is a JSON object with an `id` property that is the access token to be used in subsequent requests; for example:

**Shell**

```js
{
  "id": "GOkZRwgZ61q0XXVxvxlB8TS1D6lrG7Vb9V8YwRDfy3YGAN7TM7EnxWHqdbIZfheZ",
  "ttl": 1209600,
  "created": "2013-12-20T21:10:20.377Z",
  "userId": 1
}
```

See [User REST API](/doc/{{page.lang}}/lb2/User-REST-API.html#UserRESTAPI-Loginuser) for more information.

### Logging out

Use the [`User.logout()`](http://apidocs.strongloop.com/loopback/#user-logout) method to log out a user, providing the user's access token as the parameter.

**Boot script**

```js
// login a user and logout
User.login({
  "email": "foo@bar.com",
  "password": "bar"
}, function(err, accessToken) {
  User.logout(accessToken.id, function(err) {
    // user logged out
  });
});

// logout a user (server side only)
User.findOne({
  email: 'foo@bar.com'
}, function(err, user) {
  user.logout();
});
```

Over REST, use the `POST /users/logout` endpoint, again providing the user's access token in the `sid` property of the POST payload.

To destroy access tokens over REST API, use the `POST /users/logout` endpoint.

**Shell**

```
ACCESS_TOKEN=6Nb2ti5QEXIoDBS5FQGWIz4poRFiBCMMYJbYXSGHWuulOuy0GTEuGx2VCEVvbpBK
VERB=POST # any verb is allowed

# Authorization Header
curl -X VERB -H "Authorization: $ACCESS_TOKEN" \
http://localhost:3000/api/users/logout

# Query Parameter
curl -X VERB http://localhost:3000/api/users/logout?access_token=$ACCESS_TOKEN
```

See [User REST API](/doc/{{page.lang}}/lb2/User-REST-API.html#UserRESTAPI-Logoutuser) for more information.

## Login using third-party systems

Instead of using LoopBack's user system, you can integrate with a third-party system that supports OAuth, such as Google, FaceBook, or Twitter.  

For more information, see [Third-party login (Passport)](/doc/{{page.lang}}/lb2/6095015.html).

## Resetting a user's password

Use the [`User.resetPassword()`](http://apidocs.strongloop.com/loopback/#user-resetpassword) method to reset a user's password.  This method creates a short-lived acess token for temporary login that allows users to change passwords if forgotten.

**Boot script**

```js
User.resetPassword({
  email: 'foo@bar.com'
}, function() {
  console.log('ready to change password');
});
```

Or, over REST use the `POST /users/reset` endpoint.  see [User REST API](/doc/{{page.lang}}/lb2/User-REST-API.html#UserRESTAPI-Resetpassword) for more information.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>What does return value look like?</div>
