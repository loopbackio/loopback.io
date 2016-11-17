---
title: "Defining and using roles"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Defining-and-using-roles.html
summary:
---

LoopBack enables you to define both static and dynamic roles. Static roles are stored in a data source and are mapped to users.
In contrast, dynamic roles aren't assigned to users and are determined during access.

## Static roles

Here is an [example](https://github.com/strongloop/loopback-example-access-control/blob/master/server/boot/sample-models.js)
defining a new static role and assigning a user to that role.

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
User.create([
    {username: 'John', email: 'john@doe.com', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) return cb(err);

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);

      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        cb(err);
      });
    });
  });
```

Now you can use the role defined above in the access controls.
For example, add the following to common/models/project.json to enable users in the "admin" role to call all REST APIs.

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
  "accessType": "EXECUTE",
  "principalType": "ROLE",
  "principalId": "admin",
  "permission": "ALLOW",
  "property": "find"
}
```

## Dynamic roles

Sometimes static roles aren't flexible enough. LoopBack also enables you to define _dynamic roles_ that are defined at run-time.

LoopBack provides the following built-in dynamic roles.

<table>
  <tbody>
    <tr>
      <th>Role object property</th>
      <th>String value</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Role.OWNER</td>
      <td>$owner</td>
      <td>Owner of the object</td>
    </tr>
    <tr>
      <td>Role.AUTHENTICATED</td>
      <td>$authenticated</td>
      <td>authenticated user</td>
    </tr>
    <tr>
      <td>Role.UNAUTHENTICATED</td>
      <td>$unauthenticated</td>
      <td>Unauthenticated user</td>
    </tr>
    <tr>
      <td>Role.EVERYONE</td>
      <td>$everyone</td>
      <td>Everyone</td>
    </tr>
  </tbody>
</table>

The first example used the "$owner" dynamic role to allow access to the owner of the requested project model. 

{% include note.html content="

To qualify a $owner, the target model needs to have a belongsTo relation to the User model (or a model extends from User)
and property matching the foreign key of the target model instance. 
The check for $owner is only performed for a remote method that has ':id' on the path, for example, GET `/api/users/:id`.

" %}

Use [`Role.registerResolver()`](http://apidocs.strongloop.com/loopback/#role-registerresolver) 
to set up a custom role handler in a [boot script](Defining-boot-scripts.html).
This function takes two parameters: 

1.  String name of the role in question.
2.  Function that determines if a principal is in the specified role.
    The function signature must be `function(role, context, callback)`.

For example, here is the role resolver from [loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control/):

{% include code-caption.html content="/server/boot/script.js" %}
```javascript
module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('teamMember', function(role, context, cb) {
    // Q: Is the current request accessing a Project?
    if (context.modelName !== 'project') {
      // A: No. This role is only for projects: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    //Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var userId = context.accessToken.userId;
    if (!userId) {
      //A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the current logged-in user associated with this Project?
    // Step 1: lookup the requested project
    context.model.findById(context.modelId, function(err, project) {
      // A: The datastore produced an error! Pass error to callback
      if(err) return cb(err);
      // A: There's no project by this ID! Pass error to callback
      if(!project) return cb(new Error("Project not found"));

      // Step 2: check if User is part of the Team associated with this Project
      // (using count() because we only want to know if such a record exists)
      var Team = app.models.Team;
      Team.count({
        ownerId: project.ownerId,
        memberId: userId
      }, function(err, count) {
        // A: The datastore produced an error! Pass error to callback
        if (err) return cb(err);

        if(count > 0){
          // A: YES. At least one Team associated with this User AND Project
          // callback with TRUE, user is role:`teamMember`
          return cb(null, true);
        }

		else{
          // A: NO, User is not in this Project's Team
          // callback with FALSE, user is NOT role:`teamMember`
          return cb(null, false);
        }
      });
    });
  });
};
```

{% include note.html content="

A note about process.nextTick()

In the code above, we wrap some callback invocations in `process.nextTick(()=> cb(...))`, but not others. Why?

In asynchronous functions like this one that take a callback & pass results to it at a later time,
it's important to ensure we **always** call the callback \"at a later time\" and **never** call it right away (synchronously). 
We call the callback from a function passed to `process.nextTick` **in places where it would otherwise be called synchronously**.
Calls from the `findById` or `count` callbacks are already guaranteed to happen at a later time as they access the database, an asynchronous operation, so we don't need to wrap those calls in `process.nextTick`.
See [this blog post](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony) for more info.

" %}

Using the dynamic role defined above, we can restrict access of project information to users that are team members of the project.

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
  "accessType": "READ",
  "principalType": "ROLE",
  "principalId": "teamMember",
  "permission": "ALLOW",
  "property": "findById"
}
```

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p>I assume that you could define any number of role resolvers in a single boot script. Is that true?</p>
  <p>Need some more explanation:</p>
  <ul>
    <li>What is <code>context</code> and where does it come from?
      <ul>
        <li>is an object provided by loopback to give the user context into the request (ie. when the request comes in, they can access context.req or context.res, like you normally would with middleware)</li>
      </ul>
    </li>
    <li>What is purpose of process.nextTick() ?
      <ul>
        <li>this is part of node and requires a whole explanation into the heart of node, (ie the event loop). basically this delays the `cb` call until the next `tick` of the event loop, so the machinery can process all events currently in the queue before
          processing your callback.</li>
      </ul>
    </li>
    <li>what is return <code>reject()</code> and where does <code>reject()</code> come from?
      <ul>
        <li>reject is a function we define inline ie function reject() ...</li>
        <li>we basically say, if request is not a a request to api/projects (by checking the modelname), do not execute the rest of the script and reject the request (do nothing).</li>
        <li>do this by calling "reject", which will return false during the next cycle of the event loop (returning false in the second param means the person is NOT a team member, ie is not in that role)</li>
      </ul>
    </li>
    <li>The logic at the end that determines whether teamMember is in team based on Team.count() seems a bit convoluted. Explain, esp. how cb works in this specific case.
      <ul>
        <li>This example is provided verbatim by raymond</li>
        <li>but the idea is you have a team table and you do a query to count the "rows" because the requester can be on multiple teams, so any number you get greater than 0 is ok</li>
      </ul>
    </li>
  </ul>
</div>
