---
title: "Controlling data access"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Controlling-data-access.html
summary:
---

## Specifying user roles

The first step in specifying user roles is to determine what roles your application needs.  Most applications will have un-authenticated or anonymous users (those who have not logged in) and authenticated users (those who have logged in).  Additionally, many applications will have an administrative role that provides broad access rights.  And applications can have any number of additional user roles as appropriate.

For example, the [startkicker](https://github.com/strongloop/loopback-example-access-control) app consists of four types of users: `guest`, `owner`, `team member` and `administrator`. Each user type has access to various parts of the app based on their role and the access control lists (ACLs) we define.

### User access types

LoopBack provides a built-in [User](/doc/{{page.lang}}/lb2/User.html) model with a corresponding [REST API](/doc/{{page.lang}}/lb2/User-REST-API.html) that inherits all the "CRUD" (create, read, update, and delete) methods of the [PersistedModel object](http://apidocs.strongloop.com/loopback/#persistedmodel-new-persistedmodel).  Each CRUD method of the LoopBack User model maps to either the READ or WRITE access type, as follows:

READ:

*   [exists](http://apidocs.strongloop.com/loopback/#persistedmodelexistsid-cb) - Boolean method that determines whether a user exists
*   [findById](http://apidocs.strongloop.com/loopback/#persistedmodelfindbyidid-cb) - Find a user by ID
*   [find](http://apidocs.strongloop.com/loopback/#persistedmodelfindfilter-callback) - Find all users that match specified conditions.
*   [findOne](http://apidocs.strongloop.com/loopback/#persistedmodelfindonefilter-callback)  - Finds a single user instance that matches specified conditions.
*   [count](http://apidocs.strongloop.com/loopback/#persistedmodelcountfilter-cb) - Returns the number of users that match the specified conditions.

WRITE:

*   [create](http://apidocs.strongloop.com/loopback/#persistedmodelcreatedata-cb) - create a new user
*   [upsert](http://apidocs.strongloop.com/loopback/#persistedmodelupsert) (update or insert) - update or insert a new user record.
*   [destroyById](http://apidocs.strongloop.com/loopback/#persistedmodeldestroybyidid-cb) (equivalent to removeById or deleteById) - delete the user with the specified ID.

For other methods, the default access type is EXECUTE; for example, a custom method maps to the EXECUTE access type.

## Defining access control

Use the [ACL generator](/doc/{{page.lang}}/lb2/ACL-generator.html) to set up access control for an application.  Before you do that, though, you must have a clear idea of how you're going to configure access control for your application.

For example, here is how [loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control) sets up users and their rights:

*   Guest - Guest
    *   Role = $everyone, $unauthenticated
    *   Has access to the "List projects" function, but none of the others
*   John - Project owner
    *   Role = $everyone, $authenticated, teamMember, $owner
    *   Can access all functions except "View all projects"
*   Jane - Project team member
    *   Role = $everyone, $authenticated, teamMember
    *   Can access all functions except "View all projects" and "Withdraw"
*   Bob - Administator
    *   Role = $everyone, $authenticated, admin
    *   Can access all functions except "Withdraw"

Once you've created this kind of specification, you can easily construct `slc loopback:acl` commands to set up access control, as illustrated below.

## Using the ACL generator to define access control

The easiest way to define access control for an app is with the [ACL generator](/doc/{{page.lang}}/lb2/ACL-generator.html). This enables you to create a static definition before runtime.  The generator prompts you for all the necessary information:

`$ slc loopback:acl`

### Example

For example, here are the answers to prompts to define ACL entries for the [loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control) example.

Deny access to all project REST endpoints

*   Select the model to apply the ACL entry to: All existing models
*   Select the ACL scope: All methods and properties
*   Select the access type: All (match all types)
*   Select the role: All users
*   Select the permission to apply: Explicitly deny access

Allow unrestricted access to GET /api/projects/listProjects

*   Select the model to apply the ACL entry to: project
*   Select the ACL scope: A single method
*   Enter the method name: listProjects
*   Select the access type: Execute
*   Select the role: All users
*   Select the permission to apply: Explicitly grant access

Only allow admin unrestricted access to GET /api/projects

*   Select the model to apply the ACL entry to: project
*   Select the ACL scope: A single method
*   Enter the method name: find
*   Select the access type: Read
*   Select the role: other
*   Enter the role name: admin
*   Select the permission to apply: Explicitly grant access

Only allow team members access to GET /api/projects/:id

*   Select the model to apply the ACL entry to: project
*   Select the ACL scope: A single method
*   Enter the method name: findById
*   Select the access type: Read
*   Select the role: other
*   Enter the role name: teamMember
*   Select the permission to apply: Explicitly grant access

Allow authenticated users to access POST /api/projects/donate

*   Select the model to apply the ACL entry to: project
*   Select the ACL scope: A single method
*   Enter the method name: donate
*   Select the access type: Execute
*   Select the role: Any authenticated user
*   Select the permission to apply: Explicitly grant access

Allow owners access to POST /api/projects/withdraw

*   Select the model to apply the ACL entry to: project
*   Select the ACL scope: A single method
*   Enter the method name: withdraw
*   Select the access type: Execute
*   Select the role: The user owning the object
*   Select the permission to apply: Explicitly grant access

For more information, see [ACL generator](/doc/{{page.lang}}/lb2/ACL-generator.html). 

## Applying access control rules

Each incoming request is mapped to an object with three attributes:

*   model - The target model name, for example '**order**'
*   property - The target method name, for example, '**find'**
*   accessType - The access type, '**EXECUTE'**, '**READ'**, and '**WRITE'**

ACL rules are described as an array of objects, each of which consists of attributes listed at [Model definition JSON file#ACLs](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html#ModeldefinitionJSONfile-ACLs). 

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

Multiple rules are sorted by the specifics of matching the request against each rule. The specifics are calculated by checking the access request against each ACL rule by the hierarchical order of attributes above.

At each level, the matching yields three points:

*   3: exact match
*   2: wildcard match ('*')
*   -1: no match

Higher-level matches take precedence over lower-level matches. For example, the exact match at model level will overweigh the wildcard match.

For example, consider the following access request:

```
{
  model: 'order',
  property: 'find',
  accessType: 'EXECUTE'
}
```

Assuming the following ACL rules are defined:

```js
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
