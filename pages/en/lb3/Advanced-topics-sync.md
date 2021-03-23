---
title: "Advanced topics - sync"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Advanced-topics-sync.html
summary:
---

<div class="sl-hidden"><strong>REVIEW COMMENT from Ritchie</strong><br>
  <p>It would be super helpful if this page included following information:</p>
  <ul>
    <li>Relationships between the terms, especially Model, Change, Checkpoint. Is it 1:1, 1:n, n:n?</li>
    <li>Some sort of diagram visualizing these relationships</li>
  </ul>
</div>

## Replication algorithm

1.  Assign an unique identifier to the source. Most of the time it will be a GUID.
2.  Save this identifier on the target. This will track a source's replication checkpoint.
3.  Get a subset of the source change list since the last known replication checkpoint.
4.  Send the subset change list, containing model ids, current revisions, and previous revisions to the target.
5.  The target will compare this change list with its own and send back a further subset change list containing revisions that differ and conflict.
6.  The source then sends a set of bulk updates based on the revisions that differ. Conflicting changes must be resolved by the user before being sent.
7.  Once the bulk update is complete, the source should save the new checkpoint, provided as the result of the bulk update.
8.  The target adds a new checkpoint for the source identifier from the first step.

## Conflict resolution

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Can we say when each of these approaches is used?</div>

To resolve a conflict, a model must be rebased on the target's current revision.
There are two basic rebase approaches that will resolve a conflict:

1.  Fetch the target model's revision
    1.  Merge the source and target models
    2.  Rectify the local change list, effectively rebasing the source model on the current revision of the target model
    3.  The source model may now be replicated
2.  Forcibly rebase the source model on the current target model's revision
    1.  Rectify the local change list by modifying the previous version for the source model's entry
    2.  The source model may now be replicated

## Change and revision semantics

Changes are determined using the following logic:

* **Created** - an entry in the change list without a previous revision
  * ...or if an entry does not exist and the given model **does exist**
* **Modified** - an entry with a current and previous revision
* **Deleted **- an entry with only a previous revision
  * ...or if an entry does not exist and the given model also **does not exist**

### Existing data

The change list and replication can be used against existing data sources with large sets of data.
This is possible using the revision semantics above.

**Note: changes made without the loopback API will be treated as "created" or "deleted" change list entries.**

### Revision tracking

Changes made to a data source that supports replication will be tracked as revisions in that data source's change list.

### Change list / change model

A data source's change list is stored like any other model data. Each Model has its own "Change" model.
The "Change" model may be attached to any data source. This allows you to store your change lists in any data source.

## Basic performance optimizations

**Filtering**

During replication you may supply a filter. The less data you are trying to replicate, the faster and more memory efficient the replication will be.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Move to main article once filtering is enhanced. Add example of use.</div>

**Parallel replication**

If you are manually implementing the replication algorithm, you should run as many steps in the replication process in parallel as possible.
This is usually the "bulk update" step(s).