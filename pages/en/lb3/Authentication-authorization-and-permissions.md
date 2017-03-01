---
title: "Authentication, authorization, and permissions"
lang: en
layout: navgroup
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

| Term | Description | Responsibility | Example |
|---|---|---|---|
| Principal | An entity that can be identified or authenticated. | Represents identities of a request to protected resources. | A user <br/> An application <br/> A role (please note a role is also a principal) |
| Role | A group of principals with the same permissions. | Organizes principals into groups so they can be used. | **Dynamic role**: <br/>`$everyone` (for all users) <br/>`$unauthenticated` (unauthenticated users) <br/> `$owner` (the principal is owner of the model instance), which can be:<br/>&nbsp;&nbsp;&#9702; A simple property called `userId`<br/>&nbsp;&nbsp;&#9702; A simple property called `owner`<br/>&nbsp;&nbsp;&#9702; A relation to a model that extends User.  <br/><br/> **Static role**: admin (a defined role for administrators) |
| RoleMapping | Assign principals to roles | Statically assigns principals to roles. | Assign user with id 1 to role 1 <br/> Assign role 'admin' to role 1 |
| ACL | Access control list | Controls if a principal can perform a certain operation against a model. | Deny everyone to access the project model.<br/> Allow 'admin' role to execute `find()` method on the project model. |

## General process

The general process to implement access control for an application is:

1.  **Implement authentication**:
    In the application, add code to create (register) new users, login users (get and use authentication tokens), and logout users.
2.  **Specify user roles**.
    Define the user roles that your application requires.
    For example, you might create roles for anonymous users, authenticated users, group members, and administrators. 
3.  **Define access for each role and model method**.
    For example, you might enable anonymous users to read a list of banks, but not allow them to do anything else.
    LoopBack models have a set of built-in methods, and each method maps to either the READ or WRITE access type.
    In essence, this step amounts to specifying whether access is allowed for each role and each Model - access type, as illustrated in the example below.<br>
		_NOTE: you can also map directly access rights to specific users or applications._
4.  **Set-up access control for users**:
		This can be achieved either by statically mapping users with any role you may have earlier created using the Role model, **or** by adding code to register dynamic role resolvers that will at runtime resolve whether a user, given a preconfigured set of conditions, has a given role.

## Initial setup

### Enabling Access control

When you create your app with the LoopBack [application generator](Application-generator.html), access control is automatically enabled, _except_ if you choose the "empty-server" application type.
To enable access control for an "empty-server" application, you must add a boot
script that calls `enableAuth()`. For example, in `server/boot/authentication.js`:

```js
module.exports = function enableAuthentication(server) {
  server.enableAuth();
};
```

### Preparing Access control models

Then you need to make sure the `User`, and optionaly the `AccessToken` models are configured appropriately according to your set-up.

{% include note.html content="
Usually you don't need any extra configuration regarding built-in models `Role`, `RoleMapping`, and `ACL` which you can use without any customization. Just make sure they are declared in the `model-config.json` configuration file.
" %}

<br>
Normally you should have already implemented at least one custom user model, extending the built-in `User` model, as described in [this section](Using-built-in-models.html#user-model).

{% include tip.html content="
Whether you can use the built-in `AccessToken` model or **require** to create a custom accessToken model extending the built-in model depends on whether you plan to use a single or several user models extending the built-in `User` model. Both cases are covered in the next two sections.
" %}

#### Access Control with a single user model

In the case your application leverages only one type of user extending the built-in `User` model (which should the case in a majority of configurations), you barely have no further configuration to do.

1.  Rely on the built-in AccessToken model.  
2.  Make sure your custom user model implements a hasMany relation with the AccessToken model as follows:

{% include code-caption.html content="/common/models/custom-user.json" %}
```json
...
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
...
```

#### Access Control with multiple user models

##### Purpose

While this is not a day-to-day scenario, it may be required in more advanced situations to deal with significantly different types of users in a Loopback application.

In some of these situations where the different types of users mostly differ by a limited amount of properties a standard fallback consists in overloading a single custom user model with all properties required by all types of users and differentiate the access control behavior with static roles mapped to the different types of users.

On the other hand one could be facing situations where the types of users involved not only differ from one another by their properties, but also by their nature in the application and thus by their relations with other models. Examples of such applications include for example applications where the concept of Organization is involved, inducing intertwined layers of relationships and thus of access control.

<br>
Consider the following example:  
- **Application** has `Users`: _app-admins, app-managers, app-auditors, etc._  
- **Application** has Organizations  
- **Organizations** have `Users`: _org-admins, org-managers, org-marketing, org-sales_  
- **Organizations** have Customers (which are also `Users`)

Such an application sums up 3 different types of users in the application : `App-Managers`, `Org-Managers`, `Org-Customers`. Each of these 3 types of users have very different relations and rights with the models composing the application.  
Such circumstances require the application to actually manage these different types of users in separated models.

##### Setup

In order to allow the Loopback access control system to work with several models extending the built-in `User` model. The relations between the `users` models and the `AccessToken` should be modified to allow a single `AccessToken` model to host access tokens for multiple types of users while at the same time allowing each `user` models instances to be linked to their related access tokens in a non ambiguous way.  

This is achieved by changing the **hasMany** relation from `User` to `AccessToken` and the **belongsTo** relation from `AccessToken` to `User` by their [polymorphic](Polymorphic-relations) equivalents, in which the `principalType` property is used as a **_discriminator_** to resolve which of the potential `user` model instance an 'accessToken' instance belongs to.

<br>
{% include note.html content="
Adapt the following configuration snippets in your custom <code>users</code> and <code>accessToken</code> model definitions.
"%}

{% include code-caption.html content="/common/models/any-custom-user.json" %}
```json
...
"relations": {
  "accessTokens": {
    "type": "hasMany",
    "model": "customAccessToken",
    "polymorphic": {
      "foreignKey": "userId",
      "discriminator": "principalType"
    },
    "options": {
      "disableInclude": true
    }
  }
},
...
```

{% include code-caption.html content="/common/models/custom-access-token.json" %}
```json
...
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
...
```

{% include important.html content="
In particular, pay attention to:  
<ul>
  <li>the <code>model</code> name used to refer to the access token model in the different user models (here named \"customAccessToken\")</li>
  <li>the <code>idName</code> used for the foreignKey in the access token model referring to the user instance (here named \"id\")</li>
  <li>the <code>idType</code> used for this foreignKey, according to the type of connector used for the related user models (here using \"string\" for a MongoDB connector for example)</li>
  <li>use <b>\"principalType\"</b> for the <code>discriminator</code> name, this is mandatory and cannot be changed</li>
</ul>
" %}

<br>
**Last but not least**, do not forget to tell Loopback to use the newly defined custom `accessToken` model by including these lines in the `server.js` file or in a boot script, once again paying attention to the _name_ of the custom `accessToken` model.

```javascript
var loopback = require('loopback');
...
app.use(loopback.token({
  model: app.models.customAccessToken
}));
```
<br>
{% include tip.html content="
**Well done, you're all set!**  
From this point you should be able to use Loopback access control over multiple user models extending the built-in `User` model, with barely no modification compared to the way you're used to handle it with a single user model.  
" %}

##### Methods and parameters impacted when using multiple user models

{% include important.html content="
Pay attention to the following methods and parameters impacted by the switch to multiple user models support.
" %}

* Anytime a method is expecting the **principalType** for a principal of the `User` type (as-is or nested in an [AccessContext](https://apidocs.strongloop.com/loopback/#accesscontext) object), provide the name of the targeted `user` model name (e.g. `'oneCustomUserModelName'`) instead of the usual `Principal.USER` (or `'USER'`).<br>
Such methods include: `Role.getRoles()` and `Role.isInRole()`. For example:

```javascript
Role.getRoles({
  principalType: 'oneCustomUserModelName',
  principalId: 123,
});
```

* `Role` instance method `Role.prototype.users()`: the method which return all the users mapped with a given role instance should now be called with the following syntax:

```javascript
roleInstance.users({where: {
  principalType: 'oneCustomUserModelName'
});
```

* `RoleMapping` static methods: these methods either accessed directly or through the relation `principals` of the `Role` model should also use the new `principalType` syntax, for example:

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
[`disableRemoteMethod()`](https://apidocs.strongloop.com/loopback/#model-disableremotemethod) on the model. 
For example, following the previous example, by convention custom model code would go in the file `common/models/location.js`.
You would add the following lines to "hide" one of the predefined remote methods:

{% include code-caption.html content="common/models/location.js" %}
```javascript
var isStatic = true;
MyModel.disableRemoteMethod('deleteById', isStatic);
```

Now the `deleteById()` operation and the corresponding REST endpoint will not be publicly available.

For a method on the prototype object, such as `updateAttributes()`:

{% include code-caption.html content="common/models/location.js" %}
```javascript
var isStatic = false;
MyModel.disableRemoteMethod('updateAttributes', isStatic);
```

{% include important.html content="
Be sure to call `disableRemoteMethod()` on your own custom model, not one of the built-in models;
in the example below, for instance, the calls are `MyUser.disableRemoteMethod()` _not_ `User.disableRemoteMethod()`.
" %}

Here's an example of hiding all methods of the `MyUser` model, except for `login` and `logout`:

```javascript
MyUser.disableRemoteMethod("create", true);
MyUser.disableRemoteMethod("upsert", true);
MyUser.disableRemoteMethod("updateAll", true);
MyUser.disableRemoteMethod("updateAttributes", false);

MyUser.disableRemoteMethod("find", true);
MyUser.disableRemoteMethod("findById", true);
MyUser.disableRemoteMethod("findOne", true);

MyUser.disableRemoteMethod("deleteById", true);

MyUser.disableRemoteMethod("confirm", true);
MyUser.disableRemoteMethod("count", true);
MyUser.disableRemoteMethod("exists", true);
MyUser.disableRemoteMethod("resetPassword", true);

MyUser.disableRemoteMethod('__count__accessTokens', false);
MyUser.disableRemoteMethod('__create__accessTokens', false);
MyUser.disableRemoteMethod('__delete__accessTokens', false);
MyUser.disableRemoteMethod('__destroyById__accessTokens', false);
MyUser.disableRemoteMethod('__findById__accessTokens', false);
MyUser.disableRemoteMethod('__get__accessTokens', false);
MyUser.disableRemoteMethod('__updateById__accessTokens', false);
```

### Read-Only endpoints example

You may want to only expose read-only operations on your model hiding all POST, PUT, DELETE verbs

**common/models/model.js**

```js
Product.disableRemoteMethod('create', true);		// Removes (POST) /products
Product.disableRemoteMethod('upsert', true);		// Removes (PUT) /products
Product.disableRemoteMethod('deleteById', true);	// Removes (DELETE) /products/:id
Product.disableRemoteMethod("updateAll", true);		// Removes (POST) /products/update
Product.disableRemoteMethod("updateAttributes", false); // Removes (PUT) /products/:id
Product.disableRemoteMethod('createChangeStream', true); // removes (GET|POST) /products/change-stream
```

### Hiding endpoints for related models

To disable REST endpoints for related model methods, use [disableRemoteMethod()](https://apidocs.strongloop.com/loopback/#model-disableremotemethod).

{% include note.html content="For more information, see [Accessing related models](Accessing-related-models.html).
" %}

For example, if there are post and tag models, where a post hasMany tags, add the following code to `/common/models/post.js` 
to disable the remote methods for the related model and the corresponding REST endpoints: 

{% include code-caption.html content="common/models/model.js" %}
```javascript
module.exports = function(Post) {
  Post.disableRemoteMethod('__get__tags', false);
  Post.disableRemoteMethod('__create__tags', false);
  Post.disableRemoteMethod('__destroyById__accessTokens', false); // DELETE
  Post.disableRemoteMethod('__updateById__accessTokens', false); // PUT
};
```

### Hiding properties

To hide a property of a model exposed over REST, define a hidden property.
See [Model definition JSON file (Hidden properties)](Model-definition-JSON-file.html#hidden-properties).
