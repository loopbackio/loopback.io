---
title: "Registering users"
lang: en
layout: page
keywords: LoopBack
tags: authentication
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Registering-users.html
summary: The built-in User model provides methods to register new users and confirm their email addresses.
---

The LoopBack User model provides methods to register new users and confirm their email addresses.
You can also use the loopback-component-passport module to integrate login with Facebook, Google, and other third-party providers.

## Registering users with the LoopBack User model

### Creating a new user

Create a user (register a user) by adding a model instance, in the same way as for any other model; email and password are the only required properties.

{% include code-caption.html content="/boot/server/my-boot-script.js" %}
```javascript
module.exports = function(app) {
  var User = app.models.User;
  User.create({email: 'foo@bar.com', password: 'bar'}, function(err, userInstance) {
    console.log(userInstance);
  });
  //...
```

{% include note.html content="Passwords are automatically hashed when persisted to the data store..
You can do this in a [boot script](Defining-boot-scripts.html) as shown above.
" %}

Over REST, use the `POST /users` endpoint to create a new user instance, for example:

**REST**

```
curl -X POST -H "Content-Type:application/json"         \
-d '{"email": "me@domain.com", "password": "secret"}'   \
http://localhost:3000/api/users
```

For more information, see [User REST API](User-REST-API.html#log-in-user).

### Adding other registration constraints

Typically, you might want to add methods as part of the registration process,
for example to see if a given username is available or if an email address is already registered.
A good way to do this is to add methods as beforeRemote hooks on the User object. See [Remote hooks](Remote-hooks.html) for more information.

### Verifying email addresses

{% include see-also.html content="
* [Using the Email model](Using-built-in-models.html#Usingbuilt-inmodels-Emailmodel)
* [Email connector](Email-connector.html)
" %}

Typically, an application will require users to verify their email addresses before being able to login.
This will send an email to the user containing a link to verify their address.
Once the user follows the link they will be redirected to web root ("/") and will be able to login normally.

To enforce this constraint, set the `emailVerificationRequired` user model property to true; in `server/model-config.json`.

For example:

{% include code-caption.html content="server/model-config.json" %}
```javascript
...
"user": {
    "dataSource": "db",
    "public": true,
    "options": {
      "emailVerificationRequired": true
    }
...
```

Over REST, use the `GET /users/confirm` endpoint to verify a user's email address.
For details, see [User REST API](User-REST-API.html#confirm-email-address).

This example creates a[remote hook](Remote-hooks.html) on the User model executed after the `create()` method is called.

{% include important.html content="You must setup a `User` model as well as a `Mail` datasource before using the example below.
" %}

{% include code-caption.html content="/common/models/user.js" %}
```javascript
var config = require('../../server/config.json');
var path = require('path');

module.exports = function(user) {
  //send verification email after registration
  user.afterRemote('create', function(context, userInstance, next) {
    console.log('> user.afterRemote triggered');

    var options = {
      type: 'email',
      to: userInstance.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: user
    };

    userInstance.verify(options, function(err, response, next) {
      if (err) return next(err);

      console.log('> verification email sent:', response);

      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' -
            'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });
...
```

For a complete example, see [user.js](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js)
in [loopback-example-user-management](https://github.com/strongloop/loopback-example-user-management).

{% include note.html content="Naming your model with camel-case `MyUser` will create files in \"lisp case\" `/common/models/my-user.js` - `/common/models/my-user.json`
" %}

Then, in your view file (for example, an [EJS template](http://www.embeddedjs.com/)):

**verify.ejs**

```
This is the html version of your email.
<strong><%= text %></strong>
```

## Registering users through a third-party system

Use the LoopBack Passport component (loopback-component-passport) to enable users to register and log in to your application using existing credentials from:

* Facebook
* Google
* Twitter

For more information, see [Third-party login using Passport](Third-party-login-using-Passport.html).

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Ideally, we would explain basic tasks here. How do you set up 3d-party reg/login?</div>
