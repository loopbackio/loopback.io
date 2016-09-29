---
title: "Registering users"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Registering-users.html
summary:
---

The LoopBack User model provides methods to register new users and confirm their email addresses.  You can also use the loopback-component-passport module to integrate login with FaceBook, Google, and other third-party providers.

## Registering users with the LoopBack User model

### Creating a new user

Create a user (register a user) by adding a model instance, in the same way as for any other model; email and password are the only required properties.

**/common/model/user.js**

```
module.exports = function(app) {
  var User = app.models.User;
  User.create({email: 'foo@bar.com', password: 'bar'}, function(err, user) {
    console.log(user);
  });
  ...
```

{% include note.html content="

You can also do this in a [boot script](/doc/{{page.lang}}/lb2/6095038.html).

" %}

Over REST, use the `POST /users` endpoint to create a new user instance, for example:

**REST**

```js
curl - X POST - H "Content-Type:application/json"\ -
  d '{"email": "me@domain.com", "password": "secret"}'\
http: //localhost:3000/api/users
```

For more information, see [User REST API](/doc/{{page.lang}}/lb2/User-REST-API.html#UserRESTAPI-Loginuser).

### Adding other registration constraints

Typically, you might want to add methods as part of the registration process, for example to see if a given username is available or if an email address is already registered.  A good way to do this is to add methods as beforeRemote hooks on the User object.  See [远程钩子](/doc/{{page.lang}}/lb2/6095041.html) for more information.

### Verifying email addresses

Typically, an application will require users to verify their email addresses before being able to login. This will send an email to the user containing a link to verify their address. Once the user follows the link they will be redirected to web root ("`/")` and will be able to login normally.  

Over REST, use the `GET /users/confirm` endpoint to verify a user's email address.  For details, see [User REST API](/doc/{{page.lang}}/lb2/User-REST-API.html#UserRESTAPI-Confirmemailaddress).

This example creates a[ remote hook](/doc/{{page.lang}}/lb2/6095041.html) on the User model executed after the `create()` method is called.

{% include important.html content="

The example below assumes you have setup a `MyUser` model and `Mail` datasource.

" %}

**/common/models/user.js**

```
var config = require('../../server/config.json');
var path = require('path');
module.exports = function(user) {
  //send verification email after registration
  user.afterRemote('create', function(context, user) {
    console.log('> user.afterRemote triggered');
    var options = {
      type: 'email',
      to: user.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: user
    };
    user.verify(options, function(err, response) {
      if (err) {
        next(err);
        return;
      }
      console.log('> verification email sent:', response);
      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link '
          + 'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });
...
```

For a complete example, see [user.js](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js) in [loopback-faq-user-management](https://github.com/strongloop/loopback-faq-user-management).

{% include note.html content="

Naming your file with camel-case `MyUser` will create files in \"lisp case\" `/common/models/my-user.js` + `/common/models/my-user.json`

" %}

Then, in your view file (for example, an [EJS template](http://www.embeddedjs.com/)):

**verify.ejs**

```
This is the html version of your email.
<strong><%= text %></strong>
```

## Registering users through a third-party system

Use the LoopBack Passport component (loopback-component-passport) to enable users to register and log in to your application using existing credentials from:

*   FaceBook
*   Google
*   Twitter

For more information, see [Third-party login (Passport)](/doc/{{page.lang}}/lb2/6095015.html).

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Ideally, we would explain basic tasks here. How do you set up 3d-party reg/login?</div>
