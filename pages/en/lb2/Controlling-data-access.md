---
title: "Controlling data access"
lang: en
layout: navgroup
navgroup: access-control
keywords: LoopBack
tags: authentication
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Controlling-data-access.html
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

LoopBack provides a built-in [User](https://apidocs.strongloop.com/loopback/#user) model with a corresponding [REST API](User-REST-API.html) 
that inherits all the "CRUD" (create, read, update, and delete) methods of the [PersistedModel object](https://apidocs.strongloop.com/loopback/#persistedmodel).
Each CRUD method of the LoopBack User model maps to either the READ or WRITE access type, as follows:

READ:

* [exists](https://apidocs.strongloop.com/loopback/#persistedmodel-exists) - Boolean method that determines whether a user exists.
* [findById](https://apidocs.strongloop.com/loopback/#persistedmodel-findbyid) - Find a user by ID.
* [find](https://apidocs.strongloop.com/loopback/#persistedmodel-find) - Find all users that match specified conditions.
* [findOne](https://apidocs.strongloop.com/loopback/#persistedmodel-findone)  - Finds a single user instance that matches specified conditions.
* [count](https://apidocs.strongloop.com/loopback/#persistedmodel-count) - Returns the number of users that match the specified conditions.

WRITE:

* [create](http://apidocs.strongloop.com/loopback/#persistedmodel-create) - create a new user.
* [updateAttributes](http://apidocs.strongloop.com/loopback/#persistedmodel-updateattributes) (update) - update a user record.
* [upsert](http://apidocs.strongloop.com/loopback/#persistedmodel-upsert) (update or insert) - update or insert a new user record.
* [destroyById](https://apidocs.strongloop.com/loopback/#persistedmodel-destroybyid) (equivalent to removeById or deleteById) - delete the user with the specified ID.

For other methods, the default access type is EXECUTE; for example, a custom method maps to the EXECUTE access type.

## Defining access control

Use the ACL generator (`apic loopback:acl`) to set up access control for an application.
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

Once you've created this kind of specification, you can easily construct `apic loopback:acl` commands to set up access control, as illustrated below.

## Using the ACL generator to define access control

The easiest way to define access control for an app is with the [ACL generator](ACL-generator.html). 
This enables you to create a static definition before runtime. The generator prompts you for all the necessary information:

```shell
$ slc loopback:acl
```

```shell
$ apic loopback:acl
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

For more information, see the online help (`apic loopback:acl -h`) .

## Applying access control rules

Each incoming request is mapped to an object with three attributes:

* model - The target model name, for example '**order**'
* property - The target method name, for example, '**find'**.
  You can also specify an array of method names to apply the same constraint to all of them.
* accessType - The access type, '**EXECUTE'**, '**READ'**, and '**WRITE'**

ACL rules are described as an array of objects, each of which consists of attributes listed at 
[Model definition JSON file - ACLs](Model-definition-JSON-file.html#acls). 

1.  model
2.  property
3.  accessType
4.  principalType
    1.  USER
    2.  APP
    3.  ROLE
        1.  custom roles
        2.  $owner
        3.  $authenticated
        4.  $unauthenticated
        5.  $everyone
5.  permission
    1.  DENY
    2.  ALLOW

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
* 2: wildcard match ('*')
* -1: no match

Higher-level matches take precedence over lower-level matches. For example, the exact match at model level will overweight the wildcard match.

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

The order of ACL rules will be #3, #2, #1\. As a result, the request will be rejected as the permission set by rule #3 is 'DENY' .

## Debugging

Specify a `DEBUG` environment variable with value `loopback:security:*` for the console to log the lookups and checks the server
makes as requests come in, useful to understand things from its perspective.
Do this in your test environment as there may be quite a lot of output.

## Comprehensive AccessType, Property and End-point
<table>
  <tbody>
    <tr>
      <th>Access Type</th>
      <th>Property</th>
      <th>Verb</th>
      <th>End point</th>
    </tr>
    <tr>
      <td>READ</td>
      <td>find</td>
      <td>GET</td>
      <td>/model-name-plural</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>findById</td>
      <td>GET</td>
      <td>/model-name-plural/{id}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>exists</td>
      <td>HEAD</td>
      <td>/model-name-plural/{id}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>exists</td>
      <td>READ</td>
      <td>/model-name-plural/{id}/exists</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>__get__relationName</td>
      <td>GET</td>
      <td>/model-name-plural/{id}/relationName</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>__findById__relationName</td>
      <td>GET</td>
      <td>/model-name-plural/{id}/relationName/{fk}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>__count__relationName</td>
      <td>GET</td>
      <td>/model-name-plural/{id}/relationname</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>createChangeStream</td>
      <td>GET</td>
      <td>/model-name-plural/change-stream</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>createChangeStream</td>
      <td>POST</td>
      <td>/model-name-plural/change-stream</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>count</td>
      <td>GET</td>
      <td>/model-name-plural/count</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>findOne</td>
      <td>GET</td>
      <td>/model-name-plural/findOne</td>
    </tr>
    <tr>
      <td>WRITE</td>
      <td>upsert</td>
      <td>PATCH</td>
      <td>/model-name-plural</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>upsert</td>
      <td>PUT</td>
      <td>/model-name-plural</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>create</td>
      <td>POST</td>
      <td>/model-name-plural</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>updateAttributes</td>
      <td>PATCH</td>
      <td>/model-name-plural/{id}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>updateAttributes</td>
      <td>PUT</td>
      <td>/model-name-plural/{id}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>deleteById</td>
      <td>DELETE</td>
      <td>/model-name-plural/{id}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>replaceById</td>
      <td>POST</td>
      <td>/model-name-plural/{id}/replace</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>__create__relationName</td>
      <td>POST</td>
      <td>/model-name-plural/{id}/relationName</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>__delete__relationName</td>
      <td>DELETE</td>
      <td>/model-name-plural/{id}/relationName</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>__updateById__relationName</td>
      <td>PUT</td>
      <td>/model-name-plural/{id}/relationName/{fk}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>__destroyById__relationName</td>
      <td>DELETE</td>
      <td>/model-name-plural/{id}/relationName/{fk}</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>replaceOrCreate</td>
      <td>POST</td>
      <td>/model-name-plural/replaceOrCreate</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>updateAll</td>
      <td>POST</td>
      <td>/model-name-plural/update</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>upsertWithWhere</td>
      <td>POST</td>
      <td>/model-name-plural/upsertWithWhere</td>
    </tr>
  </tbody>
</table>