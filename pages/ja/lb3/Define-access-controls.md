---
title: "Define access controls"
lang: ja
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Define-access-controls.html
summary: Access controls determine which users are allowed to read and write model data and execute methods on the models.
---

{% include content/ja/gs-prereqs.html two="true" %}

{% include note.html content="
If you followed the previous step in the tutorial, go to [Introducing access controls](#introducing-access-controls).

If you're just jumping in, follow the steps below to catch up...
" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cd loopback-getting-started-intermediate
$ git checkout step3
$ npm install
```

## Introducing access controls

LoopBack applications access data through models, so controlling access to data means putting restrictions on models; that is, specifying who or what can read and write the data or execute methods on the models.   LoopBack access controls are determined by _access control lists_ or ACLs. For more information, see [Controlling data access](Controlling-data-access).

You're going to set up access control for the Review model.  

The access controls should enforce the following rules:

*   Anyone can read reviews, but you must be logged in to create, edit, or delete them.
*   Anyone can register as a user; then log in and log out.
*   Logged-in users can create new reviews, and edit or delete their own reviews; however they cannot modify the coffee shop for a review.

## Define access controls

Once again, you'll use the `lb` tool, but this time you'll use the `acl` sub-command; for each ACL, enter:

```
$ lb acl
```

The tool will prompt you to provide the required information, as summarized below.

**Deny everyone all endpoints**.  This is often the starting point when defining ACLs, because then you can selectively allow access for specific actions.

```
? Select the model to apply the ACL entry to: (all existing models)
? Select the ACL scope: All methods and properties
? Select the access type: All (match all types)
? Select the role: All users
? Select the permission to apply: Explicitly deny access
```

**Now allow everyone to read reviews**.

```
? Select the model to apply the ACL entry to: Review
? Select the ACL scope: All methods and properties
? Select the access type: Read
? Select the role: All users
? Select the permission to apply: Explicitly grant access
```

**Allow authenticated users to read coffeeshops**; that is, if you're logged in, you can view all coffeeshops.

```
? Select the model to apply the ACL entry to: CoffeeShop
? Select the ACL scope: All methods and properties
? Select the access type: Read
? Select the role: Any authenticated user
? Select the permission to apply: Explicitly grant access
```

**Allow authenticated users to write a review**; that is, if you're logged in, you can add a review.

```
? Select the model to apply the ACL entry to: Review
? Select the ACL scope: A single method
? Enter the method name: create
? Select the role: Any authenticated user
? Select the permission to apply: Explicitly grant access
```

Now, **enable the author of a review (its "owner") to make any changes to it**.

```
$ lb acl
? Select the model to apply the ACL entry to: Review
? Select the ACL scope: All methods and properties
? Select the access type: Write
? Select the role: The user owning the object
? Select the permission to apply: Explicitly grant access
```

## Review the review.json file

When you're done, the ACL section in `common/models/review.json` should look like this:

```js
... 
"acls": [{
  "accessType": "*",
  "principalType": "ROLE",
  "principalId": "$everyone",
  "permission": "DENY"
}, {
  "accessType": "READ",
  "principalType": "ROLE",
  "principalId": "$everyone",
  "permission": "ALLOW"
}, {
  "accessType": "EXECUTE",
  "principalType": "ROLE",
  "principalId": "$authenticated",
  "permission": "ALLOW",
  "property": "create"
}, {
  "accessType": "WRITE",
  "principalType": "ROLE",
  "principalId": "$owner",
  "permission": "ALLOW"
}],
...
```

{% include next.html content="Continue to [Define a remote hook](Define-a-remote-hook.html)."
%}
