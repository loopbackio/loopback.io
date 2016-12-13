---
title: "Authentication, authorization, and permissions"
lang: en
layout: navgroup
navgroup: user-mgmt
keywords: LoopBack
tags: authentication
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Authentication-authorization-and-permissions.html
summary: LoopBack includes built-in token-based authentication.
---

Most applications need to control who (or what) can access data or call services.
Typically, this involves requiring users to login to access protected data, or requiring authorization tokens for other applications to access protected data.

For a simple example of implementing LoopBack access control, see the GitHub 
[loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control) repository.

LoopBack apps access data through models (see [Defining models](Defining-models.html)),
so controlling access to data means putting restrictions on models; that is,
specifying who or what can read/write the data or execute methods on the models. 

When you create your app with the LoopBack [application generator](Application-generator.html), access control is automatically enabled, _except_ if you choose the "empty-server" application type.
To enable access control for an "empty-server" application, you must add a boot
script that calls `enableAuth()`. For example, in `server/boot/authentication.js`:

```javascript
module.exports = function enableAuthentication(server) {
  server.enableAuth();
};
```

## Access control concepts

LoopBack's access control system is built around a few core concepts. 

| Term | Description | Responsibility | Example |
|---|---|---|---|
| Principal | An entity that can be identified or authenticated. | Represents identities of a request to protected resources. | A user <br/> An application <br/> A role (please note a role is also a principal) |
| Role | A group of principals with the same permissions. | Organizes principals into groups so they can be used. | **Dynamic role**: <br/>`$everyone` (for all users) <br/>`$unauthenticated` (unauthenticated users) <br/> `$owner` (the principal is owner of the model instance), which can be:<br/>&nbsp;&nbsp;&#9702; A simple property called `userId`<br/>&nbsp;&nbsp;&#9702; A simple property called `owner`<br/>&nbsp;&nbsp;&#9702; A relation to a model that extends User.  <br/><br/> **Static role**: admin (a defined role for administrators) |
| RoleMapping | Assign principals to roles | Statically assigns principals to roles. | Assign user with id 1 to role 1 <br/> Assign role 'admin' to role 1 |
| ACL | Access control list | Controls if a principal can perform a certain operation against a model. | Deny everyone to access the project model.<br/> Allow 'admin' role to execute `find()` method on the project model. |

## General process

The general process to implement access control for an application is:

1.  **Specify user roles**.
    Define the user roles that your application requires.
    For example, you might create roles for anonymous users, authorized users, and administrators. 
2.  **Define access for each role and model method**.
    For example, you might enable anonymous users to read a list of banks, but not allow them to do anything else.
    LoopBack models have a set of built-in methods, and each method maps to either the READ or WRITE access type.
    In essence, this step amounts to specifying whether access is allowed for each role and each Model - access type, as illustrated in the example below.
3.  **Implement authentication**:
    in the application, add code to create (register) new users, login users (get and use authentication tokens), and logout users.

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
Product.disableRemoteMethod('create', true);				// Removes (POST) /products
Product.disableRemoteMethod('upsert', true);				// Removes (PUT) /products
Product.disableRemoteMethod('deleteById', true);			// Removes (DELETE) /products/:id
Product.disableRemoteMethod("updateAll", true);				// Removes (POST) /products/update
Product.disableRemoteMethod("updateAttributes", false);		// Removes (PUT) /products/:id
Product.disableRemoteMethod('createChangeStream', true);	// removes (GET|POST) /products/change-stream
```

### Hiding endpoints for related models

To disable REST endpoints for related model methods, use [disableRemoteMethod()](https://apidocs.strongloop.com/loopback/#model-disableremotemethod).

{% include note.html content="
For more information, see [Accessing related models](Accessing-related-models.html).
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
