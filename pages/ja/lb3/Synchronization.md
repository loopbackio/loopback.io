---
title: "Synchronization"
lang: ja
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Synchronization.html
summary: Synchronization replicates data between client and server using the LoopBack replication API.
---
{% include content/ja/strongloop-labs.html %}

{% include see-also.html content="
- [LoopBack in the client](LoopBack-in-the-client.html)
- [Tutorial: Offline Synchronization](Tutorial-Offline-Synchronization.html)
" %}

{% include toc.html level=1 %}

## Overview

In general, mobile applications need to be able to operate without constant network connectivity.
This means the client app must synchronize data with the server application after a disconnected period. To do this:

* The client (browser) app replicates changes made in the server application.
* The server application replicates changes made in the client (browser) app.

This process is called _synchronization_ (abbreviated as _sync_).
Sync replicates data from the _source_ to the _target_, and the target calls the LoopBack replication API.

{% include note.html content="The LoopBack replication API is a JavaScript API, and thus (currently, at least) works only with a JavaScript client. 
" %}

_Replication_ means intelligently copying data from one location to another.
LoopBack copies data that has changed from source to target, but does not overwrite data that was modified on the target since the last replication.
So, sync is just bi-directional replication.

In general there may be conflicts when performing replication.
So, for example, while disconnected, a user may make changes on the client that conflict with changes made on the server.
What happens when an object or field is modified both locally and remotely?
LoopBack handles conflict resolution for you, and enables you to easily present a user interface to allow the end user to make informed decisions to resolve conflicts when they occur.
See [Resolving conflicts](#conflict-resolution) below.

{% include note.html content="
Currently synchronization is built-in to LoopBack, but will be refactored into a component in the future.
" %}

### LoopBack in the browser

LoopBack implements synchronization using the LoopBack browser API, that provides the same client JavaScript API as for Node.
Thus, LoopBack in the browser is sometimes referred to as _isomorphic_, because you can call exactly the same APIs on client and server.

LoopBack in the browser uses [Browserify](http://browserify.org/) to handle dependencies.
If you wish, you can use build tools such as [Gulp](http://gulpjs.com/) or Grunt to generate the client API based on the back-end models and REST API.
For example, [loopback-example-full-stack](https://github.com/strongloop/loopback-example-full-stack) uses Grunt.

Synchronization as described above to handle offline operation is called _offline sync_.
LoopBack also provides the ability to consolidate (or "batch") data changes the user makes on the device and send them to the server in a single HTTP request.
This is called _online sync_.

### Terminology 

In addition to [standard terminology](Glossary.html), conflict resolution uses a number of specific terms.

**Change list**

A list of the current and previous revisions of all models. Each data source has a unique change list.

**Checkpoint**

An order-able identifier for tracking the last time a source completed replication. Used for filtering the change list during replication.

**Checkpoint list**

An ordered list of replication checkpoints used by clients to filter out old changes. 

**Conflict**

When replicating a change made to a source model, a conflict occurs when the source's previous revision differs from the target's current revision. 

**Rebasing**

Conflicts can only be resolved by changing the revision they are based on.
Once a source model is "rebased" on the current target version of a model, it is no longer a conflict and can be replicated normally.

**Revision**

A string that uniquely identifies the state of a model.

## Setup

Setup involves three steps:

1.  Enable change tracking in the LoopBack app.
2.  Create a client app that uses the LoopBack API.
3.  Run the client app in the browser

### Enable change tracking

You must enable change tracking for each model that you want to be able to access offline.
Make the following change to the [Model definition JSON file](Model-definition-JSON-file.html):

* Set `trackChanges` to `true`.
* Change the `id` property to an auto-generated GUID; for information on GUIDs,
  see [Model definition JSON file reference](Model-definition-JSON-file.html#general-property-properties).
* Set `strict` property to `validate`.
* Set the `persistUndefinedAsNull` property to `true`.

For example:

{% include code-caption.html content="common/models/todo.json" %}
```javascript
{
  "name": "Todo",
  "base": "PersistedModel",
  "strict": "validate",
  "trackChanges": true,
  "persistUndefinedAsNull": true,
  "properties" : {
    "id": {
      "id": true,
      "type": "string",
      "defaultFn": "guid"
    },
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "string"
    }
  }
}
```

For each change-tracked model, a new model (database table) is created to contain change-tracking records.
In the example above, a `Todo-Change` model will be created. The change model is attached to the same data source as the model being tracked.
Therefore, you will need to migrate your database schema after you have enabled change tracking. 

The change-tracking records are updated in background. Any errors are reported via the static model method `handleChangeError`.
It is recommended to provide a custom error handler in your models, as the default behavior is to throw an error.

{% include code-caption.html content="common/models/todo.js" %}
```javascript
module.exports = function(Todo) {
  Todo.handleChangeError = function(err) {
    console.warn('Cannot update change records for Todo:', err);
  };
}
```

### Create a client app

The next step is to create client-side LoopBack app. For each replicated model, create two new client-only subclasses:

* A local model that will use local storage to persist the changes offline
* A remote model that will be connected to the server and used as a target for replication.
  This model will have change tracking disabled (because the server is already handling it) and enable only the replication REST API.

For example, for the To Do example, here is the JSON file that defines the client local model:

{% include code-caption.html content="client/models/local-todo.json" %}
```javascript
{
  "name": "LocalTodo",
  "base": "Todo"
}
```

Here is the JSON file that defines the client remote local model:

{% include code-caption.html content="client/models/remote-todo.json" %}
```javascript
{
  "name": "RemoteTodo",
  "base": "Todo",
  "plural": "Todos",
  "trackChanges": false,
  "enableRemoteReplication": true
}
```

And here is the client model configuration JSON file:

{% include code-caption.html content="client/model-config.json" %}
```javascript
{
  "_meta": {
    "sources": ["../../common/models", "./models"]
  },
  "RemoteTodo": {
    "dataSource": "remote"
  },
  "LocalTodo": {
    "dataSource": "local"
  }
}
```

Here is the JSON file that defines the client datasources:

{% include code-caption.html content="client/datasources.json" %}
```javascript
{
  "remote": {
    "connector": "remote",
    "url": "/api"
  },
  "local": {
    "connector": "memory",
    "localStorage": "todo-db"
  }
}
```

Now that you have all models in place, you can set up bi-directional replication between `LocalTodo `and `RemoteTodo`, for example in a client boot script:

{% include code-caption.html content="client/boot/replication.js" %}
```javascript
module.exports = function(client) {
  var LocalTodo = client.models.LocalTodo;
  var RemoteTodo = client.models.RemoteTodo;

  var since = { push: -1, pull: -1 };

  function sync() {
    // It is important to push local changes first,
    // that way any conflicts are resolved at the client
    LocalTodo.replicate(
      RemoteTodo,
      since.push,
      function pushed(err, conflicts, cps) {
        // TODO: handle err
        if (conflicts.length) 
          handleConflicts(conflicts);

        since.push = cps;

        RemoteTodo.replicate(
          LocalTodo,
          since.pull,
          function pulled(err, conflicts, cps) {
            // TODO: handle err
            if (conflicts)
              handleConflicts(conflicts.map(function(c) { return c.swapParties(); }));
            since.pull = cps;
          });
      });
  }

  LocalTodo.observe('after save', function(ctx, next) {
    next();
    sync(); // in background
  });

  LocalTodo.observe('after delete', function(ctx, next) {
    next();
    sync(); // in background
  });

  function handleConflicts(conflicts) {
    // TODO notify user about the conflicts
  }
};
```

### Run the client app in the browser

The loopback-boot module provides a build tool for adding all application metadata and model files to a Browserify bundle.
[Browserify](http://browserify.org/) is a tool that packages Node.js scripts into a single file that runs in a browser.

Below is a simplified example packaging the client application into a browser "module" that can be loaded via `require('lbclient')`.
Consult [build.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/client/lbclient/build.js) 
in loopback-example-full-stack for a full implementation that includes source-maps and error handling.

{% include code-caption.html content="client/build.js" %}
```javascript
var b = browserify({ basedir: __dirname });
b.require('./client.js', { expose: 'lbclient '});

boot.compileToBrowserify({ appRootDir: __dirname }, b);

var bundlePath = path.resolve(__dirname, 'browser.bundle.js');
b.pipe(fs.createWriteStream(bundlePath));
```

## Access control

Because the sync algorithm calls the REST API, it honors model access control settings.

However, when replicating changes only from the server (read-only replication), the client needs to create a new checkpoint value, which requires write permissions.
The "REPLICATE" permission type supports this use case: it grants limited write access to the checkpoint-related methods only.
For a certain user (a role, a group) to be able to pull changes from the server, they need both READ and REPLICATE permissions.
Users with WRITE permissions are automatically granted REPLICATE permission too.

Example ACL configuration:

{% include code-caption.html content="common/models/car.json" %}
```javascript
{
  "acls": [
    // disable anonymous access
    {
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "DENY"
    },
    // allow all authenticated users to read data
    {
      "principalType": "ROLE",
      "principalId": "$authenticated",
      "permission": "ALLOW",
      "accessType": "READ"
    },
    // allow all authenticated users to pull changes
    {
      "principalType": "ROLE",
      "principalId": "$authenticated",
      "permission": "ALLOW",
      "accessType": "REPLICATE"
    },
    // allow the user with id 0 to perform full sync
    {
      "principalType": "USER",
      "principalId": 0,
      "permission": "ALLOW",
      "accessType": "WRITE"
    }
  ]
}
```

## Understanding replication

Offline data access and synchronization has three components:

* Change tracking
* Replication of changes
* Browser version of LoopBack

### Change model

As explained above, a new change model is created for each change-tracked model, e.g. `Todo-Change`.
This model can be accessed using the method `getChangeModel`, for example, `Todo.getChangeModel()`.

The change model has several properties:

* `modelId` links a change instance (record) with a tracked model instance

* `prev` and `rev` are hash values generated from the model class the Change model is representing.
  The `rev` property stands for Revision, while `prev` is the hash of the previous revision.
  When a model instance is deleted, the value `null` is used instead of a hash.

* `checkpoint` associates a change record with a Checkpoint, more on this later.

Additionally, there is a method `type()` that can be used to determine the kind of change being made: `Change.CREATE`, `Change.UPDATE`, `Change.DELETE` or `Change.UNKNOWN`.

The current implementation of the change tracking algorithm keeps only one change record for each model instance - the last change made.

### Checkpoints

A checkpoint represents a point in time that you can use to filter the changes to only those made after the checkpoint was created.
A checkpoint is typically created whenever a replication is performed, this allows subsequent replication runs to ignore changes that were already replicated.

While in theory the replication algorithm should work without checkpoints, in practice it's important to use correct checkpoint values because the current implementation keeps the last change only.

If you don't pass correct values in the `since` argument of `replicate` method, then you may

* Get false conflicts if the "since" value is omitted or points to an older, already replicated checkpoint.

* Incorrectly override newer changes with old data if the "since" value points to a future checkpoint that was not replicated yet.

### Replication algorithm

A single iteration of the replication algorithm consists of the following steps:

1.  Create new checkpoints (both source and target)
2.  Get list of changes made at the source since the given source checkpoint
3.  Find out differences between source and target changes since the given target checkpoint, detect any conflicts.
4.  Create a set of instructions - what to change at target
5.  Perform a "bulk update" operation using these instructions
6.  Return the new checkpoints to the callback

It is important to create the new checkpoints as the first step of the replication algorithm.
Otherwise any changes made while the replication is in progress would be associated with the checkpoint being replicated,
and thus they would not be picked up by the next replication run.

The consequence is that the "bulk update" operation will associate replicated changes with the new checkpoint,
and thus these changes will be considered during the next replication run, which may cause false conflicts.

In order to prevent this problem, the method `replicate` runs several iterations of the replication algorithm,
until either there is nothing left to replicate, or a maximum number of iterations is reached.

#### Conflict detection

Conflicts are detected in the third step. The list of source changes are sent to the target model, which compares them to change made to target model instances.
Whenever both source and target modified the same model instance (the same model id),
the algorithm checks the current and previous revision of both source and target models to decide whether there is a conflict.

A conflict is reported when both of these conditions are met:

* The current revisions are different, i.e. the model instances have different property values.

* The _current_ target revision is different from the _previous_ source revision.
  In other words, if the source change is in sequence after the target change, then there is no conflict.

#### Conflict resolution

Conflict resolution can be complex. Fortunately, LoopBack handles the complexity for you, and provides an API to resolve conflicts intelligently. 

The callback of `Model.replicate()` takes `err` and `conflict[]`. Each `conflict` represents a change that was not replicated and must be manually resolved.
You can fetch the current versions of the local and remote models by calling `conflict.models()`.
You can manually merge the conflict by modifying both models.

Calling `conflict.resolve()` will set the source change's previous revision to the current revision of the (conflicting) target change.
Since the changes are no longer conflicting and appear as if the source change was based on the target, they will be replicated normally as part of the next `replicate()` call.

The conflict class provides methods implementing three most common resolution scenarios, consider using these methods instead of `conflict.resolve()`:

* `conflict.resolveUsingSource()`
* `conflict.resolveUsingTarget()`
* `conflict.resolveManually()`

#### Bulk update

The bulk update operation expects a list of instructions - changes to perform.
Each instructions contains a `Change` instance describing the change, a change type, and model `data` to use.

In order to prevent race conditions when third parties are modifying the replicated instances while the replication is in progress,
the `bulkUpdate` function is implementing a robust checks to ensure it modifies only those model instances that have their expected revision.

The "diff" step returns the current target revision of each model instances that needs an update, this revision is stored as the `change.rev` property.

The "bulkUpdate" method loads the model instance from the database, verifies that the current revision matched the expected revision in the instruction,
and then performs a conditional update/delete specifying all model properties as the condition.

```javascript
// Example: apply an update of an existing instance
var current = findById(data.id);
if (revisionOf(current) != expectedRev)
  return conflict();
var c = Model.updateAll(current, data);
if (c != 1) conflict();
```

## Sync methods

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>Need to order or categorize the methods below.</div>

The LoopBack Model object provides a number of methods to support sync, mixed in via the DataModel object:

* **bulkUpdate** - Apply an update list.
* **changes** - Get the changes to a model since a given checkpoint. Provide a filter object to reduce the number of results returned.
* **checkpoint** - Create a checkpoint.
* **createUpdates** - Create an update list for `Model.bulkUpdate()` from a delta list from `Change.diff()`.

* **currentCheckpoint** - Get the current checkpoint ID.
* **diff** - Get a set of deltas and conflicts since the given checkpoint.

* **enableChangeTracking** - Start tracking changes made to the model.

* **getChangeModel** - Get the `Change` model.
* **getSourceId** - Get the source identifier for this model / dataSource.
* **handleChangeError** - Handle a change error. Override this method in a subclassing model to customize change error handling.
* **rectifyChange** - Tell LoopBack that a change to the model with the given ID has occurred.
* **replicate** - Replicate changes since the given checkpoint to the given target model.

* **findLastChange** - Get the last (current) Change object for a given model instance.
* **updateLastChange** - Update the last (current) Change object associated with the given model instance.

## Frequently asked questions

### Does LoopBack support continuous replication?

Yes: with continuous replication, the client immediately triggers a replication when local data changes and the server pushes changes when then occur.

Here is a basic example that relies on a `socket.io` style `EventEmitter`.

```javascript
// psuedo-server.js
MyModel.on('changed', function(obj) {
  socket.emit('changed');
});

// psuedo-client.js
socket.on('changed', function(obj) {
  LocalModel.replicate(RemoteModel);
});
```

### How do you trigger immediate replication?

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>Can below be done on either client or server?</div>

Call `Model.replicate()` to trigger immediate replication.

## Known issues

* The size of the browser bundle is over 1.4MB, which is too large for mobile clients.
  See [https://github.com/strongloop/loopback/issues/989](https://github.com/strongloop/loopback/issues/989).

* It's not possible to set a model property to `undefined` via the replication.
  When a property is undefined at the source but defined at the target, "bulk update" will not set it to undefined it at the target.
  This can be mitigated by using `strict` model and enabling `persistUndefinedAsNull`.

* Browser's localStorage limits the size of stored data to about 5MB (depending on the browser).
  If your application needs to store more data in offline mode, then you need to use IndexedDB instead of localStorage.
  LoopBack does not provide a connector for IndexedDB yet.
  See [https://github.com/strongloop/loopback/issues/858](https://github.com/strongloop/loopback/issues/858).

* Not all connectors were updated to report the number of rows affected by `updateAll` and `deleteAll`, which is needed by "bulkUpdate".
  As a result, the replication fails when the target model is persisted using one of these unsupported connectors.

* LoopBack does not fully support fine-grained access control to a selected subset of model instances,
  therefore it is not possible to replicate models where the user can access only a subset of instances (for example only the instances the user has created).
