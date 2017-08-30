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
* **Email model (see [email connector](Email-connector.html))** - send emails to your app users using SMTP or third-party services.

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

{% include_relative includes/User-model-note.md %}

For more information, see [Managing users](Managing-users.html).

## Access control models

Use access control models to control access to applications, resources, and methods. These models include:

* [ACL](http://apidocs.strongloop.com/loopback/#acl)
* [AccessToken](http://apidocs.strongloop.com/loopback/#accesstoken)
* [Scope](http://apidocs.strongloop.com/loopback/#scope)
* [Role](http://apidocs.strongloop.com/loopback/#role-object)
* [RoleMapping](http://apidocs.strongloop.com/loopback/#rolemapping)

### ACL model

An ACL model connects principals to protected resources. The system grants permissions to principals (users or applications, that can be grouped into roles).

* Protected resources: the model data and operations (model/property/method/relation)
* Whether a given client application or user is allowed to access (read, write, or execute) the protected resource.

Creating a new ACL instance.

{% include code-caption.html content="server/boot/script.js" %}
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
