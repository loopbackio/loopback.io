---
title: "Using built-in models"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Using-built-in-models.html
summary:
---

## Overview

Loopback provides useful built-in models for common use cases:

* **[Application model](#application-model)** - contains metadata for a client application that has its own identity and associated configuration with the LoopBack server.
* **[User model](#user-model)** - register and authenticate users of your app locally or against third-party services.
* **[Access control models](#access-control-models)** - ACL, AccessToken, Scope, Role, and RoleMapping models for controlling access to applications, resources, and methods.
* **[Email model](#email-model)** - send emails to your app users using SMTP or third-party services.

The built-in models (except for Email) extend [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel),
so they automatically have a full complement of create, update, and delete (CRUD) operations.

{% include note.html content="
By default, only the User model is exposed over REST. To expose the other models, change the model's `public` property to true in `server/model-config.json`.
See [Exposing models](Exposing-models-over-REST.html) for more information. **Use caution**: exposing some of these models over public API may be a security risk.
" %}

## Application model

Use the [Application model](http://apidocs.strongloop.com/loopback/#application-new-application) to manage client applications and organize their users.

The default model definition file is [common/models/application.json](https://github.com/strongloop/loopback/blob/master/common/models/application.json) in the LoopBack repository.

## User model

The User model represents users of the application or API.
The default model definition file is [common/models/user.json](https://github.com/strongloop/loopback/blob/master/common/models/user.json) in the LoopBack repository. 

{% include important.html content="
You must create your own custom model (named something other than \"User,\" for example \"Customer\" or \"Client\") that [extends the built-in User model](Extending-built-in-models.html) rather than use the built-in User model directly.  The built-in User model provides a great deal of commonly-used functionality that you can use via your custom model.
" %}

For more information, see [Managing users](/doc/{{page.lang}}/lb2/Managing-users.html).

## Access control models

Use access control models to control access to applications, resources, and methods. These models include:

* [ACL](http://apidocs.strongloop.com/loopback/#acl)
* [AccessToken](http://apidocs.strongloop.com/loopback/#accesstoken)
* [Scope](http://apidocs.strongloop.com/loopback/#scope)
* [Role](http://apidocs.strongloop.com/loopback/#role)
* [RoleMapping](http://apidocs.strongloop.com/loopback/#rolemapping)

### ACL model

An ACL model connects principals to protected resources. The system grants permissions to principals (users or applications, that can be grouped into roles) .

* Protected resources: the model data and operations (model/property/method/relation)
* Whether a given client application or user is allowed to access (read, write, or execute) the protected resource.

Creating a new ACL instance.

**server/boot/script.js**

```javascript
ACL.create({
    principalType: ACL.USER, 
    principalId: 'u001', 
    model: 'User', 
    property: ACL.ALL,
    accessType: ACL.ALL, 
    permission: ACL.ALLOW}, function (err, acl) {
        ACL.create({
            principalType: ACL.USER, 
            principalId: 'u001', 
            model: 'User', 
            property: ACL.ALL,
            accessType: ACL.READ, 
            permission: ACL.DENY}, function (err, acl) {
            }
        );
    }
);
```

## Email model

Set up an email data source by adding an entry to `/server/datasources.json`, such as the following (for example):

**server/datasources.json**

```javascript
{
  ...
  "myEmailDataSource": {
     "connector": "mail",
     "transports": [{
       "type": "smtp",
       "host": "smtp.private.com",
       "secure": false,
       "port": 587,
       "tls": {
         "rejectUnauthorized": false
       },
       "auth": {
         "user": "me@private.com",
         "pass": "password"
       }
     }]
  }
  ...
}
```

See [Email connector](/doc/{{page.lang}}/lb2/Email-connector.html) for more information on email data sources.

Then, reference the data source in `/server/model-config.json` as follows (for example):

**server/model-config.json**

```javascript
{
  ...
  "Email": {
    "dataSource": "myEmailDataSource",
  },
  ...
}
```

### Send email messages

The following example illustrates how to send emails from an app. Add the following code to a file in the `/models` directory:

**server/models/model.js**

```javascript
module.exports = function(MyModel) {
  // send an email
  MyModel.sendEmail = function(cb) {
    MyModel.app.models.Email.send({
      to: 'foo@bar.com',
      from: 'you@gmail.com',
      subject: 'my subject',
      text: 'my text',
      html: 'my <em>html</em>'
    }, function(err, mail) {
      console.log('email sent!');
      cb(err);
    });
  }
};
```

The default model definition file is [common/models/email.json](https://github.com/strongloop/loopback/blob/master/common/models/email.json) in the LoopBack repository. 

{% include important.html content="
The mail connector uses [nodemailer](http://www.nodemailer.com/). See the [nodemailer docs](http://www.nodemailer.com/) for more information.
" %}

### Confirming email address

See [Verifying email addresses](/doc/{{page.lang}}/lb2/Registering-users.html#Registeringusers-Verifyingemailaddresses).
