---
title: "Managing users"
lang: en
layout: navgroup
navgroup: user-mgmt
keywords: LoopBack
tags: authentication
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Managing-users.html
summary: LoopBack's built-in User model provides essential user management features.
---

## Overview

LoopBack's built-in [User](http://apidocs.strongloop.com/loopback/#user-new-user) model provides essential user management features such as:

* Registration and confirmation via email.
* Login and logout.
* Creating an access token.
* Password reset.

{% include important.html content="
You must create your own custom model (named something other than \"User,\" for example \"Customer\"
or \"Client\") that [extends the built-in User model](Extending-built-in-models.html) rather than use
the built-in User model directly. The built-in User model provides a great deal of commonly-used
functionality that you can use via your custom model.

In addition, LoopBack does not support multiple models based on the User model in a single application. That is, you cannot have more than one model derived from the built-in User model in a single app.
" %}

Watch this video for an introduction to user management in LoopBack:

<iframe class="youtube-player" type="text/html" style="width: 400px; height: 300px" src="//www.youtube.com/embed/UdsOcOVg_0M?wmode=opaque" frameborder="0"></iframe>

## Creating and authenticating users

The basic process to create and authenticate users is:

1.  Register a new user with the [`User.create()`](http://apidocs.strongloop.com/loopback/#persistedmodel-create) method, inherited from the generic `PersistedModel` object.
    See [Registering users](Registering-users.html) for more information.
2.  Log in a user by calling [`User.login()`](https://apidocs.strongloop.com/loopback/#user-login) to get an access token.
    See [Logging in users](Logging-in-users.html) for more information.
3.  Make subsequent API calls using the access token.
    Provide the access token in the HTTP header or as a query parameter to the REST API call, as shown in 
    [Making authenticated requests with access tokens](Making-authenticated-requests.html#making-authenticated-requests-with-access-tokens).

### Performance tip

To improve performance during login and user creation, try installing native [bcrypt](https://www.npmjs.com/package/bcrypt).

```shell
$ npm install --save bcrypt
```

{% include warning.html content="To run this package, you must [install compiler tools](Installing-compiler-tools.html) on your system, since it's a binary package.
" %}

## Understanding the built-in User model

By default, a LoopBack application has a [built-in User model](Using-built-in-models.html) 
defined by [user.json](https://github.com/strongloop/loopback/blob/master/common/models/user.json)
(this file is part of the LoopBack framework.
Don't modify it; rather, follow the procedure in [Extending built-in models](Extending-built-in-models.html)).

{% include tip.html content="
For a basic introduction to how the LoopBack user model performs authentication,
see [Introduction to User model authentication](Introduction-to-User-model-authentication.html).
" %}

### Default access controls

The built-in User model has the following ACL:

```javascript
{
  "name": "User",
  "properties": {
    ...
    "acls": [{
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "DENY"
    }, {
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW",
      "property": "create"
    }, {
      "principalType": "ROLE",
      "principalId": "$owner",
      "permission": "ALLOW",
      "property": "deleteById"
    }, {
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW",
      "property": "login"
    }, {
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW",
      "property": "logout"
    }, {
      "principalType": "ROLE",
      "principalId": "$owner",
      "permission": "ALLOW",
      "property": "findById"
    }, {
      "principalType": "ROLE",
      "principalId": "$owner",
      "permission": "ALLOW",
      "property": "updateAttributes"
    }, {
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW",
      "property": "confirm"
    }, {
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW",
      "property": "resetPassword",
      "accessType": "EXECUTE"
    }],
    //...
  }
}
```

The above ACL denies all operations to everyone, then selectively allows:

* Anyone to [create a new user](http://apidocs.strongloop.com/loopback/#persistedmodel-create) (User instance).
* Anyone to [log in](http://apidocs.strongloop.com/loopback/#user-login), [log out](http://apidocs.strongloop.com/loopback/#user-logout),
  [confirm their identity](http://apidocs.strongloop.com/loopback/#user-confirm), and
  [reset their own password](http://apidocs.strongloop.com/loopback/#user-resetpassword).
* A user to perform deleteById, findById, and updateAttributes on their own User record (instance).

{% include important.html content="
You cannot directly modify built-in models such as the User model with the [ACL generator](ACL-generator.html).

However, you can create a custom model that extends the built-in User model,
then use the ACL generator to define access controls that are added to those of the default User model.
For example, you could create a Customer or Client model that [extends the built-in User model](Extending-built-in-models.html), and then modify that model's ACL with the tool.
Since a model doesn't inherit ACLs from its base model, you must define ACLs for the new custom model.
" %}

### User realms

See [Partitioning users with realms](Partitioning-users-with-realms.html).
