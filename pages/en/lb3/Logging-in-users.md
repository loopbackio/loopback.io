---
title: "Logging in users"
lang: en
layout: navgroup
navgroup: user-mgmt
keywords: LoopBack
tags: authentication
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Logging-in-users.html
summary: The built-in User model provides methods to log in a user, log out a user, and reset a user's password.
---

## Using the LoopBack User model

### Logging in

Login (authenticate) a user by calling the [`User.login()`](http://apidocs.loopback.io/loopback/#user-login) method and providing an object
containing `password` and `email or username` properties as the first parameter. The method returns an access token.

This example creates a route in [boot script](Defining-boot-scripts.html) to handle login request:

{% include code-caption.html content="/server/boot/routes.js" %}
```javascript
...
app.post('/login', function(req, res) {
  User.login({
    email: req.body.email,
    password: req.body.password
  }, 'user', function(err, token) {
    if (err) {
      res.render('response', { //render view named 'response.ejs'
        title: 'Login failed',
        content: err,
        redirectTo: '/',
        redirectToLinkText: 'Try again'
      });
      return;
    }

    res.render('home', { //login user and render 'home' view
      email: req.body.email,
      accessToken: token.id
    });
  });
});
//...
```

{% include important.html content="
[`User.login()`](http://apidocs.loopback.io/loopback/#user-login) has an optional second parameter that is a string or an array of strings.
Pass in \"user\" for this parameter to include the user information.
For REST apis, using _?include=user_.
" %}

For a complete example, see [routes.js](https://github.com/strongloop/loopback-example-user-management/blob/master/server/boot/routes.js)
in [loopback-example-user-management](https://github.com/strongloop/loopback-example-user-management).

You may also specify how long the access token is valid by providing a `ttl` (time to live) property with a value in **seconds**.

For example:

{% include code-caption.html content="Boot script" %}
```javascript
var TWO_WEEKS = 60 * 60 * 24 * 7 * 2;
User.login({
  email: 'me@domain.com',           // must provide email or "username"
  password: 'secret',               // required by default
  ttl: TWO_WEEKS                    // keep the AccessToken alive for at least two weeks
}, function (err, accessToken) {
  console.log(accessToken.id);      // => GOkZRwg... the access token
  console.log(accessToken.ttl);     // => 1209600 time to live
  console.log(accessToken.created); // => 2013-12-20T21:10:20.377Z
  console.log(accessToken.userId);  // => 1
});
```

If a login attempt is unsuccessful, an error will be returned in the following format.

```javascript
{
  "status": 401,             // or 400 if the credentails object is invalid
  "message": "login failed"  // could also be "realm is required" or "username or email is required"
}
```

Over REST, use the `POST /users/login` endpoint.

For example:

**Shell**

```
curl -X POST -H "Content-Type:application/json" \
-d '{"email": "me@domain.com", "password": "secret", "ttl": 1209600000}' \
http://localhost:3000/api/users/login
```

The return value is a JSON object with an `id` property that is the access token to be used in subsequent requests.

For example:

{% include code-caption.html content="Shell" %}
```javascript
{
  "id": "GOkZRwgZ61q0XXVxvxlB8TS1D6lrG7Vb9V8YwRDfy3YGAN7TM7EnxWHqdbIZfheZ",
  "ttl": 1209600,
  "created": "2013-12-20T21:10:20.377Z",
  "userId": 1
}
```

See [User REST API](User-REST-API.html#log-in-user) for more information.

### Logging out

Use the [`User.logout()`](http://apidocs.loopback.io/loopback/#user-logout) method to log out a user, providing the user's access token as the parameter.

In the example below, a route to handle logout request is created:

{% include code-caption.html content="/server/boot/routes.js" %}
```javascript
//...
//log a user out
app.get('/logout', function(req, res, next) {
  if (!req.accessToken) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
  User.logout(req.accessToken.id, function(err) {
    if (err) return next(err);
    res.redirect('/'); //on successful logout, redirect
  });
});
//...
```

Over REST, use the `POST /users/logout` endpoint, again providing the user's access token in the `sid` property of the POST payload.

To destroy access tokens over REST API, use the `POST /users/logout` endpoint.

```sh
ACCESS_TOKEN=6Nb2ti5QEXIoDBS5FQGWIz4poRFiBCMMYJbYXSGHWuulOuy0GTEuGx2VCEVvbpBK
VERB=POST # any verb is allowed

# Authorization Header
curl -X VERB -H "Authorization: $ACCESS_TOKEN" \
http://localhost:3000/api/users/logout

# Query Parameter
curl -X VERB http://localhost:3000/api/users/logout?access_token=$ACCESS_TOKEN
```

See [User REST API](User-REST-API.html#log-out-user) for more information.

## Resetting a user's password

Use the [`User.resetPassword()`](http://apidocs.loopback.io/loopback/#user-resetpassword) method to reset a user's password.
This method creates a short-lived access token for temporary login that allows users to change passwords if forgotten.

For example, in [routes.js](https://github.com/strongloop/loopback-example-user-management/blob/master/server/boot/routes.js)
(in [loopback-example-user-management](https://github.com/strongloop/loopback-example-user-management)) below,
a route: `/request-password-reset` is created to handle password reset request:

{% include code-caption.html content="/server/boot/routes.js" %}
```javascript
//send an email with instructions to reset an existing user's password
app.post('/request-password-reset', function(req, res, next) {
  User.resetPassword({
    email: req.body.email
  }, function(err) {
    if (err) return res.status(401).send(err);
    res.render('response', {
      title: 'Password reset requested',
      content: 'Check your email for further instructions',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });
});
//...
```

You must the handle the '`resetPasswordRequest'` event to send a reset email containing the short-lived access token,
generated by `resetPassword()` method, to the correct user (see example below):

{% include important.html content="

The example below assumes you have setup a `User` model and `Mail` datasource.

" %}

{% include code-caption.html content="/common/models/user.js" %}
```javascript
//...
//send password reset link when password reset requested
user.on('resetPasswordRequest', function(info) {
  var url = 'http://' + config.host + ':' + config.port + '/reset-password';
  var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';
  //'here' in above html is linked to : 'http://<host:port>/reset-password?access_token=<short-lived/temporary access token>'
  user.app.models.Email.send({
    to: info.email,
    from: info.email,
    subject: 'Password reset',
    html: html
  }, function(err) {
    if (err) return console.log('> error sending password reset email');
    console.log('> sending password reset email to:', info.email);
  });
});
//...
```

And when the user follows a link to reset password, temporary access token is used to find the user and update password using 
[`updateAttribute()`](https://apidocs.loopback.io/loopback/#persistedmodel-prototype-updateattribute) method as follows:

{% include code-caption.html content="/server/boot/routes.js" %}
```javascript
//...
User.findById(req.accessToken.userId, function(err, user) {
   if (err) return res.sendStatus(404);
   user.updateAttribute('password', req.body.password, function(err, user) {
   if (err) return res.sendStatus(404);
     console.log('> password reset processed successfully');
     res.render('response', {
       title: 'Password reset success',
       content: 'Your password has been reset successfully',
       redirectTo: '/',
       redirectToLinkText: 'Log in'
     });
   });
});
//...
```

For a complete example, see [routes.js](https://github.com/strongloop/loopback-example-user-management/blob/master/server/boot/routes.js)
in [loopback-example-user-management](https://github.com/strongloop/loopback-example-user-management).

Over REST, use the `POST /users/reset` endpoint. It returns `200 OK` for a successful request.
See [User REST API](User-REST-API.html#reset-password) for more information.

## Login using third-party systems

Instead of using LoopBack's user system, you can integrate with a third-party system that supports OAuth, such as Google, Facebook, or Twitter.

For more information, see [Third-party login using Passport](Third-party-login-using-Passport.html).
