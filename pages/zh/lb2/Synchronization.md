---
title: "Synchronization"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Synchronization.html
summary:
---

<div class="aui-message hint shadowed information-macro has-no-icon">

This is a StrongLoop Labs project

{% include image.html file="6258830.png" alt="" %}

This project provides early access to advanced or experimental functionality. It may lack usability, completeness, documentation, and robustness, and may be outdated.

However, StrongLoop supports this project: Paying customers can open issues using the StrongLoop customer support system (Zendesk). Community users, please report bugs on GitHub. For more information, see [StrongLoop Labs](https://docs.strongloop.com/display/zh/StrongLoop+Labs).

</div>

## Overview

In general, mobile applications need to be able to operate without constant network connectivity.  This means the client app must synchronize data with the server application after a disconnected period.  To do this:

*   The client (browser) app replicates changes made in the server application.
*   The server application replicates changes made in the client (browser) app.

This process is called _synchronization_ (abbreviated as _sync_).   Sync replicates data from the _source_ to the _target_, and the target calls the LoopBack replication API.  

{% include important.html content="

The LoopBack replication API is a JavaScript API, and thus (currently, at least) works only with a JavaScript client. 

" %}

_Replication_ means intelligently copying data from one location to another.  LoopBack copies data that has changed from source to target, but does not overwrite data that was modified on the target since the last replication.  So, sync is just bi-directional replication.

In general there may be conflicts when performing replication.   So, for example, while disconnected, a user may make changes on the client that conflict with changes made on the server; what happens when an object or field is modified both locally and remotely?  LoopBack handles conflict resolution for you, and enables you to easily present a user interface to allow the end user to make informed decisions to resolve conflicts when they occur.  See [Resolving conflicts](/doc/{{page.lang}}/lb2/Synchronization.html) below.

{% include important.html content="

Currently synchronization is built-in to LoopBack, but will be refactored into a component in the future.

" %}

### LoopBack in the browser

LoopBack implements synchronization using the LoopBack browser API, that provides the same client JavaScript API as for Node.  Thus, LoopBack in the browser is sometimes referred to as _isomorphic_, because you can call exactly the same APIs on client and server.

LoopBack in the browser uses [Browserify](http://browserify.org/) to handle dependencies and [gulp](http://gulpjs.com/) to generate the client API based on the back-end models and REST API. 

### Additional uses

In addition to basic client-server replication, LoopBack also supports replicating data: 

*   From a LoopBack server application to another LoopBack server application.
*   From one database to another database.

Synchronization as described above to handle offline operation is called _offline sync_ .  LoopBack also provides the ability to consolidate (or "batch") data changes the user makes on the device and send them to the server in a single HTTP request.  This is called _online sync_.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p>Can we get examples of the above use cases?</p>
  <p>Also--use cases from <a href="https://docs.google.com/a/strongloop.com/document/d/195yM6BXIxMUl9USUaGj0JXxASvRrqHkLu9eylbScNSc/edit" style="line-height: 1.4285715;" class="external-link" rel="nofollow">blog post</a>;</p>
  <ul>
    <li>
      <p>In the browser, developers can attach to a local storage database and then synchronize it with the server when it regains connectivity.</p>
    </li>
    <li>
      <p>In a “turn” based multiplayer game, the synchronization of game objects can be performed with an in-memory database on the server and client.</p>
    </li>
    <li>
      <p>In an enterprise application, you can synchronize an Oracle and MongoDB database, allowing you to leverage the performance characteristics of MongoDB, while defaulting to Oracle for persistence.</p>
    </li>
    <li>
      <p>Data can be replicated from a less performant database into a datastore with better read performance, like Redis.</p>
    </li>
  </ul>
</div>

## Resolving conflicts

Conflict resolution can be complex.  Fortunately, LoopBack handles the complexity for you, and provides an API to resolve conflicts intelligently. 

### Terminology

In addition to [standard terminology](https://docs.strongloop.com/display/NODE/Glossary), conflict resolution uses a number of specific terms.

**Change list**

A list of the current and previous revisions of all models. Each data source has a unique change list.

**Checkpoint **

An order-able identifier for tracking the last time a source completed replication. Used for filtering the change list during replication.

**Checkpoint list**

An ordered list of replication checkpoints used by clients to filter out old changes.

**Conflict**

When replicating a change made to a source model, a conflict occurs when the source's previous revision differs from the target's current revision.

**Rebasing**

Conflicts can only be resolved by changing the revision they are based on. Once a source model is "rebased" on the current target version of a model, it is no longer a conflict and can be replicated normally.

**Revision**

A string that uniquely identifies the state of a model.

### General process

A conflict occurs when a change to a model is not based on the previous revision of the model.

The callback of `Model.replicate()` takes `err` and `conflict[]`. Each `conflict` represents a change that was not replicated and must be manually resolved. You can fetch the current versions of the local and remote models by calling `conflict.models()`. You can manaully merge the conflict by modifying both models.

Calling `conflict.resolve()` will set the source change's previous revision to the current revision of the (conflicting) target change. Since the changes are no longer conflicting and appear as if the source change was based on the target, they will be replicated normally as part of the next `replicate()` call.

## Sync methods

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>Need to order or categorize the methods below.</div>

The LoopBack Model object provides a number of methods to support sync, mixed in via the DataModel object:

*   **bulkUpdate** - Apply an update list.
*   **changes** - Get the changes to a model since a given checkpoint. Provide a filter object to reduce the number of results returned.
*   **checkpoint** - Create a checkpoint.
*   **createUpdates** - Create an update list for `Model.bulkUpdate()` from a delta list from `Change.diff()`.

*   **currentCheckpoint** - Get the current checkpoint ID.
*   **diff** - Get a set of deltas and conflicts since the given checkpoint.

*   **enableChangeTracking** - Start tracking changes made to the model.

*   **getChangeModel** - Get the `Change` model.
*   **getSourceId** - Get the source identifier for this model / dataSource.
*   **handleChangeError** - Handle a change error. Override this method in a subclassing model to customize change error handling.
*   **rectifyChange** - Tell LoopBack that a change to the model with the given ID has occurred.
*   **replicate** - Replicate changes since the given checkpoint to the given target model.

## Frequently asked questions

### Does LoopBack support continuous replication?

Yes: with continuous replication, the client immediately triggers a replication when local data changes and the server pushes changes when then occur.

Here is a basic example that relies on a `socket.io` style `EventEmitter`.

```js
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

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>
  <p>TO DO:</p>
  <ul>
    <li>Sync Node.js apps</li>
    <li>Db to db sync</li>
  </ul>
  <p>Examples</p>
  <ul>
    <li>Need a simple 30 line example</li>
  </ul>
</div>
