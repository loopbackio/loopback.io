---
title: "Controlling data access"
lang: ja
layout: navgroup
navgroup: access-control
keywords: LoopBack
tags: authentication
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Controlling-data-access.html
summary: LoopBack uses access control lists (ACLs) to control who can access what data.
---

## Enabling authentication

When you create your app with the LoopBack [application generator](Application-generator.html), access control is automatically
enabled, _except_ if you choose the "empty-server" application type.
To enable access control for an "empty-server" application, you must add a boot
script that calls `enableAuth()`. For example, in `server/boot/authentication.js`:

```javascript
module.exports = function enableAuthentication(server) {
  server.enableAuth();
};
```

## Specifying user roles

The first step in specifying user roles is to determine what roles your application needs.
Most applications will have un-authenticated or anonymous users (those who have not logged in) and authenticated users (those who have logged in).
Additionally, many applications will have an administrative role that provides broad access rights.
And applications can have any number of additional user roles as appropriate.

For example, the
[startkicker](https://github.com/strongloop/loopback-example-access-control)
app consists of four types of users: `guest`, `owner`, `team member` and `administrator`.
Each user type has access to various parts of the app based on their role and the access control lists (ACLs) we define.

### User access types

LoopBack provides a built-in [User](https://apidocs.loopback.io/loopback/#user) model with a corresponding [REST API](User-REST-API.html) 
that inherits all the "CRUD" (create, read, update, and delete) methods of the [PersistedModel object](https://apidocs.loopback.io/loopback/#persistedmodel).
Each CRUD method of the LoopBack User model maps to either the READ or WRITE access type, as follows:

READ:

* [exists](https://apidocs.loopback.io/loopback/#persistedmodel-exists) - Boolean method that determines whether a user exists.
* [findById](https://apidocs.loopback.io/loopback/#persistedmodel-findbyid) - Find a user by ID.
* [find](https://apidocs.loopback.io/loopback/#persistedmodel-find) - Find all users that match specified conditions.
* [findOne](https://apidocs.loopback.io/loopback/#persistedmodel-findone)  - Finds a single user instance that matches specified conditions.
* [count](https://apidocs.loopback.io/loopback/#persistedmodel-count) - Returns the number of users that match the specified conditions.

WRITE:

* [create](http://apidocs.loopback.io/loopback/#persistedmodel-create) - create a new user.
* [updateAttributes](http://apidocs.loopback.io/loopback/#persistedmodel-updateattributes) (update) - update a user record.
* [upsert](http://apidocs.loopback.io/loopback/#persistedmodel-upsert) (update or insert) - update or insert a new user record.
* [destroyById](https://apidocs.loopback.io/loopback/#persistedmodel-destroybyid) (equivalent to removeById or deleteById) - delete the user with the specified ID.

For other methods, the default access type is EXECUTE; for example, a custom method maps to the EXECUTE access type.

## Defining access control

Use the [ACL generator](ACL-generator.html) to set up access control for an application.
Before you do that, though, you must have a clear idea of how you're going to configure access control for your application.

For example, here is how [loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control) sets up users and their rights:

* Guest - Guest
  * Role = $everyone, $unauthenticated
  * Has access to the "List projects" function, but none of the others
* John - Project owner
  * Role = $everyone, $authenticated, teamMember, $owner
  * Can access all functions except "View all projects"
* Jane - Project team member
  * Role = $everyone, $authenticated, teamMember
  * Can access all functions except "View all projects" and "Withdraw"
* Bob - Administator
  * Role = $everyone, $authenticated, admin
  * Can access all functions except "Withdraw"

Once you've created this kind of specification, you can easily construct commands to set up access control, as illustrated below.

## Using the ACL generator to define access control

The easiest way to define access control for an app is with the [ACL generator](ACL-generator.html). 
This enables you to create a static definition before runtime. The generator prompts you for all the necessary information:

```shell
$ lb acl
```

### Example

For example, here are the answers to prompts to define ACL entries for the 
[loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control) example.

Deny access to all project REST endpoints

* Select the model to apply the ACL entry to: All existing models
* Select the ACL scope: All methods and properties
* Select the access type: All (match all types)
* Select the role: All users
* Select the permission to apply: Explicitly deny access

Allow unrestricted access to GET `/api/projects/listProjects`

* Select the model to apply the ACL entry to: project
* Select the ACL scope: A single method
* Enter the method name: listProjects
* Select the access type: Execute
* Select the role: All users
* Select the permission to apply: Explicitly grant access

Only allow admin unrestricted access to GET `/api/projects`

* Select the model to apply the ACL entry to: project
* Select the ACL scope: A single method
* Enter the method name: find
* Select the access type: Read
* Select the role: other
* Enter the role name: admin
* Select the permission to apply: Explicitly grant access

Only allow team members access to GET `/api/projects/:id`

* Select the model to apply the ACL entry to: project
* Select the ACL scope: A single method
* Enter the method name: findById
* Select the access type: Read
* Select the role: other
* Enter the role name: teamMember
* Select the permission to apply: Explicitly grant access

Allow authenticated users to access POST `/api/projects/donate`

* Select the model to apply the ACL entry to: project
* Select the ACL scope: A single method
* Enter the method name: donate
* Select the access type: Execute
* Select the role: Any authenticated user
* Select the permission to apply: Explicitly grant access

Allow owners access to POST `/api/projects/withdraw`

* Select the model to apply the ACL entry to: project
* Select the ACL scope: A single method
* Enter the method name: withdraw
* Select the access type: Execute
* Select the role: The user owning the object
* Select the permission to apply: Explicitly grant access

## Applying access control rules

Each incoming request is mapped to an object with three attributes:

* model - The target model name, for example '**order**'
* property - The target method name, for example, '**find'**.
  You can also specify an array of method names to apply the same constraint to all of them.
* accessType - The access type, '**EXECUTE'**, '**READ'**, and '**WRITE'**

ACL rules are described as an array of objects, each of which consists of attributes listed at 
[Model definition JSON file - ACLs](Model-definition-JSON-file.html#acls). 

*  model
*  property
*  accessType
*  principalType
    *  USER: a user ID
    *  APP: an application ID
    *  ROLE: a role name
        *  _built-in dynamic roles_, one of [`$everyone`, `$unauthenticated`, `$authenticated`, `$owner`]
        *  [_custom static roles_](Defining-and-using-roles.html#static-roles), directly mapped to principals
        *  [_custom dynamic roles_](Defining-and-using-roles.html#dynamic-roles), registered with custom role resolvers
*  permission
    *  DENY
    *  ALLOW

### ACL rule precedence

A single model may have several ACLs applied to it: The ACL of the base model (or models) and that of the model itself, defined in the 
[model definition JSON file](Model-definition-JSON-file.html).
LoopBack determines the ultimate ACL by _adding_ all the applicable ACLs with precedence rules for permission and access type to resolve any conflicts.

Permission precedence is applied in this order:

1.  DENY
2.  ALLOW
3.  DEFAULT

So, for example, a DENY rule for a certain operation and user group will take precedence over an ALLOW rule for the same operation and group.

Access type precedence (in order of specificity) is applied in this order:

1.  Type (read, write, replicate, update)
2.  Method name
3.  Wildcard

In general, a more specific rule will take precedence over a more general rule.
For example, a rule that denies access to an operation to authenticated users will take precedence over a rule that denies access to all users.

LoopBack sorts multiple rules by the specifics of matching the request against each rule.
It calculates the specifics by checking the access request against each ACL rule by the hierarchical order of attributes.

At each level, the matching yields three points:

* 3: exact match
* 2: wildcard match (`'*'`)
* -1: no match

Higher-level matches take precedence over lower-level matches. For example, the exact match at model level will override the wildcard match.

For example, consider the following access request:

```javascript
{
  model: 'order',
  property: 'find',
  accessType: 'EXECUTE'
}
```

Assuming the following ACL rules are defined:

```javascript
[
  // Rule #1
  {
    model: '*',
    property: 'find',
    accessType: 'EXECUTE',
    principalType: 'ROLE',
    principalId: '$authenticated',
    permission: 'ALLOW'
  },
  // Rule #2
  {
    model: 'order',
    property: '*',
    accessType: '*',
    principalType: 'ROLE',
    principalId: '$authenticated',
    permission: 'ALLOW'
  },
  // Rule #3
  {
    model: 'order',
    property: 'find',
    accessType: '*',
    principalType: 'ROLE',
    principalId: '$authenticated',
    permission: 'DENY'
  }
]
```

The order of ACL rules will be #3, #2, #1. As a result, the request will be rejected since the permission set by rule #3 is 'DENY'.

## Authorization scopes

{% include warning.html content="
The current implementation of authorization scopes is very low-level and may not suit all users. Please join the discussion in [issue #3339](https://github.com/strongloop/loopback/issues/3339) to help us build the best high-level API for this feature.
" %}

LoopBack's built-in authorization algorithm allows application to limit
access to remote methods using the concept of _authorization scopes_. The implementation
is similar to [oAuth2 Access Token Scope](https://tools.ietf.org/html/rfc6749#section-3.3).

Authorization scopes work together with role/ACL-based authorization as follows:
 1. The authorization algorithm checks whether the access token
    was granted by at least one of the scopes required by the accessed resource.
    If this check fails, then the request is denied as not authorized.
 2. Next, the ACL rules are checked to make sure the established principal
    is allowed to access the protected resource. If this check fails, then the request is denied.
 3. If both scope and ACL checks passed, the request is authorized
    and the remote method is executed.

To use this feature, follow these steps:

 1. Define scopes required by remote methods
 2. Add API for creating scoped AccessTokens

{% include note.html content="
LoopBack provides the built-in scope `DEFAULT` that is used whenever a method does not define any scopes or an access token does not contain any allowed scopes. This preserves backwards compatibility for existing applications.
" %}

### Define scopes required by remote methods

The `methods.accessScopes` property in the model JSON file defines scopes as part of remoting metadata.
A user can invoke the remote method if their access token
is granted by at least one of the scopes listed in `accessScopes` array.

Example configuration:

{% include code-caption.html content="common/models/user.json" %}
```json
{
  // ...
  "methods": {
    "prototype.getProfile": {
      "accepts": [],
      "returns": { "arg": "data", "type": "User", "root": true},
      "http": {"verb": "get", "path": "/profile"},
      "accessScopes": ["read", "read:profile"]
    }
  }
}
```

All built-in methods (for example, `PersistedModel.create`) have the default
`DEFAULT` scope. There is no straightforward way to customize the scopes
of built-in remote methods; please join the discussion in
[issue #3339](https://github.com/strongloop/loopback/issues/3339)
to help us find the best solution.

### Create scoped access tokens

The built-in `User.login` method creates an access token with no scopes, that is,
with the built-in `DEFAULT` scope. This allows users to invoke all
built-in methods and any custom methods added before the scoping feature was
introduced.

It's up to the application developer to decide how to generate access tokens
limited to a different set of scopes.

The example below shows how to create a new remote method to issue tokens
for external applications that allow these apps to read only a user's profile
data.

{% include code-caption.html content="common/models/user.js" %}
```js
module.exports = function(User) {
  User.instance.createTokenForExternalApp = function(cb) {
    this.accessTokens.create({
      ttl: -1,
      scopes: ['read:profile'],
    }, cb);
  };
};
```

### Migration

To upgrade an application from an earlier version of LoopBack 3.x, follow these steps:

 - As common with semver-minor updates, update database schemas
   to accomodate any newly-added properties. For more information, see
   [Creating a database schema from models (Auto-update)](Creating-a-database-schema-from-models.html#auto-update).

 - If the application was already using a custom `AccessToken.scopes`
   property with a type different from an array, then update the relevant code
   to work with the type "array of strings".

## Debugging

Specify a `DEBUG` environment variable with value `loopback:security:*` for the console to log the lookups and checks the server
makes as requests come in, useful to understand things from its perspective.
Do this in your test environment as there may be quite a lot of output.
