---
title: "Authentication, authorization, and permissions"
lang: en
layout: navgroup
toc_level: 2
navgroup: user-mgmt
keywords: LoopBack
tags: authentication
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Authentication-authorization-and-permissions.html
summary: LoopBack includes built-in token-based authentication.
---

Most applications need to control who (or what) can access data or call services.
Typically, this involves requiring users to login to access protected data, or requiring authorization tokens for other applications to access protected data.

For a simple example of implementing LoopBack access control, see the GitHub 
[loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control) repository.

LoopBack apps access data through models (see [Defining models](Defining-models.html)),
so controlling access to data means putting restrictions on models; that is,
specifying who or what can read/write the data or execute methods on the models. 

## Access control concepts

LoopBack's access control system is built around a few core concepts, as summarized in the following table. 

| Term&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description | Responsibility | Example |
|---|---|---|---|
| Principal | An entity that can be identified or authenticated. | Represents identities of a request to protected resources. | A user <br/> An application <br/> A role (please note a role is also a principal) |
| Role | A group of principals with the same permissions. | Organizes principals into groups so they can be used. | **Dynamic role**: <br/>`$everyone` (for all users) <br/>`$unauthenticated` (unauthenticated users) <br/> `$owner` (the principal is owner of the model instance), which can be:<br/>&nbsp;&nbsp;&#9702; A simple property called `userId`<br/>&nbsp;&nbsp;&#9702; A simple property called `owner`<br/>&nbsp;&nbsp;&#9702; A relation to a model that extends User.  <br/><br/> **Static role**: admin (a defined role for administrators) |
| RoleMapping | Assign principals to roles | Statically assigns principals to roles. | Assign user with id 1 to role 1 <br/> Assign role 'admin' to role 1 |
| ACL | Access control list | Controls if a principal can perform a certain operation against a model. | Deny everyone to access the project model.<br/> Allow 'admin' role to execute `find()` method on the project model. |

## General process

The general process to implement access control for an application is:

1.  **Implement authentication**:
    In the application, add code to create (register) new users, log in users (get and use authentication tokens), and log out users.
2.  **Specify user roles**.
    Define the user roles that your application requires.
    For example, you might create roles for anonymous users, authenticated users, group members, and administrators. 
3.  **Define access for each role and model method**.
    For example, you might enable anonymous users to read a list of banks, but not allow them to do anything else.
    LoopBack models have a set of built-in methods, and each method maps to either the READ or WRITE access type.
    In essence, this step amounts to specifying whether access is allowed for each role and each Model/access type, as illustrated in the example below.<br/><br/>
		NOTE: you can also map access rights directly to specific users or applications.
4.  **Set-up access control for users**.  Do one of:
  - Statically map users with any role previously created using the Role model.  For more information, see [Static roles](Defining-and-using-roles.html#static-roles).
  - Add code to register dynamic role resolvers that at runtime resolve whether a user, given a preconfigured set of conditions, has a given role.  For more information, see [Dynamic roles](Defining-and-using-roles.html#dynamic-roles).

## Initial setup

### Enabling access control

Applications created with the LoopBack [application generator](Application-generator.html)
have access control enabled by default, _except_ for the "empty-server" application type.
To enable access control for an "empty-server" application, add a boot
script that calls [`enableAuth()`](https://apidocs.loopback.io/loopback/#app-enableauth); for example:

{% include code-caption.html content="server/boot/authentication.js" %}
```javascript
module.exports = function enableAuthentication(server) {
  server.enableAuth();
};
```

### Preparing access control models

You must configure the `User` model(s), (and possibly the `AccessToken` model) according to your set-up.

The best practice is to implement at least one custom user model extending the built-in `User` model instead of using the built-in `User` model as-is, as described in [Using built-in models](Using-built-in-models.html#user-model).

Usually you don't need to extend or customize the built-in models `Role`, `RoleMapping`, and `ACL`. Just make sure they are declared in the `model-config.json` configuration file, or if you don't need to customize the `AccessToken` model, pass a datasource to the `enableAuth()` method as follows:

```javascript
server.enableAuth({ datasource: 'db' });
```

{% include note.html content="Passing a `datasource` to the `enableAuth()` method as shown here will let LoopBack take care of attaching any built-in models required by the access control feature, which is suitable for most applications.
" %}

{% include tip.html content="Whether you can use the built-in `AccessToken` model or create a custom model that extends `AccessToken` depends on whether you plan to use one or several user models extending the built-in `User` model, as described in the following sections.
" %}

#### Access control with a single user model

In the most common scenario, an application uses only one model that extends the built-in `User` model
and uses the built-in `AccessToken` model.  In this case, you need to change the "belongsTo" relation of the built-in `AccessToken` model to refer to your custom User model.  To do this, edit `server/model-config.json` file as follows:

{% include code-caption.html content="server/model-config.json" %}
```json
{
  // ...
  "AccessToken": {
    "dataSource": "db",
    "public": false,
    "relations": {
      "user": {
        "type": "belongsTo",
        "model": "CustomUser",
        "foreignKey": "userId"
      }
    }
  }
  // ...
}
```

{% include tip.html content="Model relations are preserved when extending models, therefore your custom `User` model will automatically have a hasMany relation to the default `AccessToken` model.
" %}

##### Customizing the AccessToken model

If your application needs to customize the `AccessToken` model, for example
to add extra properties, then you need to modify the `User` model to use
the new `AccessToken` model for authentication.

In your custom `User` model definition file, make sure the `relations` section
configures the "accessTokens" relation to use your custom `AccessToken` model
as shown here:

{% include code-caption.html content="common/models/custom-user.json" %}
```json
{
  "name": "CustomUser",
  "base": "User",
  // ...
  "relations": {
    "accessTokens": {
      "type": "hasMany",
      "model": "AccessToken",
      "foreignKey": "userId",
      "options": {
        "disableInclude": true
      }
    }
  },
  // ...
}
```

#### Access control with multiple user models

An application with significantly different types of users may require multiple user models.

If the types of users differ by just a few properties, then it's easiest to overload a single custom user model with all properties required, and differentiate access control behavior with static roles mapped to the different user types.

If however the different types of users have different access rights and relations with other models
or if their properties differ too much from each other,
then you may need to use multiple distinct user models.  For example, applications where the concept of an _organization_ is involved, creating intertwined layers of relationships and thus of access control.

Consider the following example:  

- **Application** has `Users`: _app-admins, app-managers, app-auditors, etc._  
- **Application** has Organizations  
- **Organizations** have `Users`: _org-admins, org-managers, org-marketing, org-sales_  
- **Organizations** have Customers (which are also `Users`)

Such an application has three different types of users:

- `App-Managers`
- `Org-Managers`
- `Org-Customers`

Each type of user has different relations with and access rights to the models composing the application.  

##### Setup

{% include important.html content="When using multiple user models, you should not let LoopBack auto-attach built-in models required by the access control feature.  Instead, call the `enableAuth()` method with no argument and manually define all models required in the `server/model-config.json` configuration file.
" %}

To use several models extending the built-in `User` model, you must modify the relations between the `users` models and the `AccessToken` models to allow a single `AccessToken` model to host access tokens for multiple types of users while at the same time allowing each `user` model instance to be linked to unique related access tokens.  

This is achieved by changing the **hasMany** relation from `User` to `AccessToken` and the **belongsTo** relation from `AccessToken` to `User` by their [polymorphic](Polymorphic-relations.html) equivalents, in which the `principalType` property is used as a _discriminator_ to resolve which of the potential `user` model instance an 'accessToken' instance belongs to. In addition to having custom user models this requires you also define a **custom AccessToken** model extending the built-in `AccessToken` model.

{% include note.html content="Adapt the following configuration snippets in your custom `users` and `accessToken` model definitions.
"%}

{% include code-caption.html content="common/models/any-custom-user.json" %}
```json
{
  "name": "AnyCustomUser",
  "base": "User",
  // ..
  "relations": {
    "accessTokens": {
      "type": "hasMany",
      "model": "CustomAccessToken",
      "polymorphic": {
        "foreignKey": "userId",
        "discriminator": "principalType"
      },
      "options": {
        "disableInclude": true
      }
    }
  },
  // ..
}
...
```

{% include code-caption.html content="common/models/custom-access-token.json" %}
```json
{
  "name": "CustomAccessToken",
  "base": "AccessToken",
  // ..
  "relations": {
    "user": {
    "type": "belongsTo",
      "idName": "id",
      "polymorphic": {
        "idType": "string",
        "foreignKey": "userId",
        "discriminator": "principalType"
      }
    }
  },
  // ...
}
```

{% include important.html content="
In particular, pay attention to:  

*  The `model` name used to refer to the access token model in the different user models (here named \"CustomAccessToken\")
*  The `idName` used for the foreignKey in the access token model referring to the user instance (here named \"id\")
*  The `idType` used for this foreignKey, according to the type of connector used for the related user models (here using \"string\" for a MongoDB connector for example)
*  Use \"principalType\" for the `discriminator` name. This is mandatory and cannot be changed
" %}

Don't forget to specify the custom `accessToken` model as follows:

{% include code-caption.html content="server/middleware.json" %}
```json
{
  // ...
  "auth": {
    "loopback#token": {
      "params": {
        "model": "CustomAccessToken"
      }
    }
  }
  // ...
}
```

**Note**: Alternatively, you can put these lines in the `server.js` file or in a boot script, once again paying attention to the _name_ of the custom `accessToken` model.

{% include code-caption.html content="server/server.js" %}
```javascript
var loopback = require('loopback');
...
app.use(loopback.token({
  model: app.models.CustomAccessToken
}));
```

{% include tip.html content="From this point you should be able to use LoopBack access control over multiple user models extending the built-in `User` model, with barely no modification compared to the way you're used to handle it with a single user model.  
" %}

##### Methods and parameters impacted when using multiple user models

{% include important.html content="
Pay attention to the following methods and parameters impacted by the switch to multiple user models support.
" %}

Anytime a method is expecting the **principalType** for a principal of the `User` type (as-is or nested in an [AccessContext](https://apidocs.loopback.io/loopback/#accesscontext) object), provide the name of the targeted `user` model name (e.g. `'oneCustomUserModelName'`) instead of the usual `Principal.USER` (or `'USER'`).<br>
Such methods include: `Role.getRoles()` and `Role.isInRole()`. For example:

```javascript
Role.getRoles({
  principalType: 'oneCustomUserModelName',
  principalId: 123,
});
```

`Role` instance method `Role.prototype.users()`: the method which return all the users mapped with a given role instance should now be called with the following syntax:

```javascript
roleInstance.users({where: {
  principalType: 'oneCustomUserModelName'
});
```

`RoleMapping` static methods: these methods either accessed directly or through the relation `principals` of the `Role` model should also use the new `principalType` syntax, for example:

```javascript
roleInstance.principals.create({
  principalType: 'oneCustomUserModelName',
  principalId: 123
});
```

## Exposing and hiding models, methods, and endpoints

To expose a model over REST, set the `public` property to true in `/server/model-config.json`:

```javascript
...
  "Role": {
    "dataSource": "db",
    "public": false
  },
...
```

### Hiding methods and REST endpoints

If you don't want to expose certain create, retrieve, update, and delete operations, you can easily hide them by calling 
[`disableRemoteMethodByName()`](https://apidocs.loopback.io/loopback/#model-disableremotemethodbyname) on the model. 
For example, following the previous example, by convention custom model code would go in the file `common/models/location.js`.
You would add the following lines to "hide" one of the predefined remote methods:

{% include code-caption.html content="common/models/location.js" %}
```javascript
MyModel.disableRemoteMethodByName('deleteById');
```

Now the `deleteById()` operation and the corresponding REST endpoint will not be publicly available.

For a method on the prototype object, such as `updateAttributes()`:

{% include code-caption.html content="common/models/location.js" %}
```javascript
MyModel.disableRemoteMethod('prototype.updateAttributes');
```

{% include important.html content="
Be sure to call `disableRemoteMethodByName()` on your own custom model, not one of the built-in models;
in the example below, for instance, the calls are `MyUser.disableRemoteMethodByName()` _not_ `User.disableRemoteMethodByName()`.
" %}

Here's an example of hiding all methods of the `MyUser` model, except for `login` and `logout`. It assumes `MyUser` is an extended built-in User model:

```javascript
MyUser.disableRemoteMethodByName("upsert");                               // disables PATCH /MyUsers
MyUser.disableRemoteMethodByName("find");                                 // disables GET /MyUsers
MyUser.disableRemoteMethodByName("replaceOrCreate");                      // disables PUT /MyUsers
MyUser.disableRemoteMethodByName("create");                               // disables POST /MyUsers

MyUser.disableRemoteMethodByName("prototype.updateAttributes");           // disables PATCH /MyUsers/{id}
MyUser.disableRemoteMethodByName("findById");                             // disables GET /MyUsers/{id}
MyUser.disableRemoteMethodByName("exists");                               // disables HEAD /MyUsers/{id}
MyUser.disableRemoteMethodByName("replaceById");                          // disables PUT /MyUsers/{id}
MyUser.disableRemoteMethodByName("deleteById");                           // disables DELETE /MyUsers/{id}

MyUser.disableRemoteMethodByName('prototype.__get__accessTokens');        // disable GET /MyUsers/{id}/accessTokens
MyUser.disableRemoteMethodByName('prototype.__create__accessTokens');     // disable POST /MyUsers/{id}/accessTokens
MyUser.disableRemoteMethodByName('prototype.__delete__accessTokens');     // disable DELETE /MyUsers/{id}/accessTokens

MyUser.disableRemoteMethodByName('prototype.__findById__accessTokens');   // disable GET /MyUsers/{id}/accessTokens/{fk}
MyUser.disableRemoteMethodByName('prototype.__updateById__accessTokens'); // disable PUT /MyUsers/{id}/accessTokens/{fk}
MyUser.disableRemoteMethodByName('prototype.__destroyById__accessTokens');// disable DELETE /MyUsers/{id}/accessTokens/{fk}

MyUser.disableRemoteMethodByName('prototype.__count__accessTokens');      // disable  GET /MyUsers/{id}/accessTokens/count

MyUser.disableRemoteMethodByName("prototype.verify");                     // disable POST /MyUsers/{id}/verify
MyUser.disableRemoteMethodByName("changePassword");                       // disable POST /MyUsers/change-password
MyUser.disableRemoteMethodByName("createChangeStream");                   // disable GET and POST /MyUsers/change-stream

MyUser.disableRemoteMethodByName("confirm");                              // disables GET /MyUsers/confirm
MyUser.disableRemoteMethodByName("count");                                // disables GET /MyUsers/count
MyUser.disableRemoteMethodByName("findOne");                              // disables GET /MyUsers/findOne

//MyUser.disableRemoteMethodByName("login");                                // disables POST /MyUsers/login
//MyUser.disableRemoteMethodByName("logout");                               // disables POST /MyUsers/logout

MyUser.disableRemoteMethodByName("resetPassword");                        // disables POST /MyUsers/reset
MyUser.disableRemoteMethodByName("setPassword");                          // disables POST /MyUsers/reset-password
MyUser.disableRemoteMethodByName("update");                               // disables POST /MyUsers/update
MyUser.disableRemoteMethodByName("upsertWithWhere");                      // disables POST /MyUsers/upsertWithWhere
```

### Read-only endpoints example

You may want to only expose read-only operations on your model; in other words hiding all operations that use HTTP POST, PUT, DELETE method.

**common/models/model.js**

```js
Product.disableRemoteMethodByName('create');		// Removes (POST) /products
Product.disableRemoteMethodByName('upsert');		// Removes (PUT) /products
Product.disableRemoteMethodByName('deleteById');	// Removes (DELETE) /products/:id
Product.disableRemoteMethodByName("updateAll");		// Removes (POST) /products/update
Product.disableRemoteMethodByName("prototype.updateAttributes"); // Removes (PUT) /products/:id
Product.disableRemoteMethodByName("prototype.patchAttributes");  // Removes (PATCH) /products/:id
Product.disableRemoteMethodByName('createChangeStream'); // Removes (GET|POST) /products/change-stream
```

### Hiding endpoints for related models

To disable REST endpoints for related model methods, use [disableRemoteMethodByName()](https://apidocs.loopback.io/loopback/#model-disableremotemethodbyname).

{% include note.html content="For more information, see [Accessing related models](Accessing-related-models.html).
" %}

For example, if there are post and tag models, where a post hasMany tags, add the following code to `/common/models/post.js` 
to disable the remote methods for the related model and the corresponding REST endpoints: 

{% include code-caption.html content="common/models/model.js" %}
```javascript
module.exports = function(Post) {
  Post.disableRemoteMethodByName('prototype.__get__tags');
  Post.disableRemoteMethodByName('prototype.__create__tags');
  Post.disableRemoteMethodByName('prototype.__destroyById__accessTokens'); // DELETE
  Post.disableRemoteMethodByName('prototype.__updateById__accessTokens'); // PUT
};
```

### Hiding properties

To hide a property of a model exposed over REST, define a hidden property.
See [Model definition JSON file (Hidden properties)](Model-definition-JSON-file.html#hidden-properties).

{% include content/hidden-vs-protected.html xref='true' %}
