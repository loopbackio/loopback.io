---
title: "PersistedModel class"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/PersistedModel-class.html
summary:
---

Module: loopback

*   [Class: PersistedModel](about:blank#persistedmodel)
*   [PersistedModel.create](about:blank#persistedmodel-create)
*   [PersistedModel.upsert](about:blank#persistedmodel-upsert)
*   [PersistedModel.replaceOrCreate](about:blank#persistedmodel-replaceorcreate)
*   [PersistedModel.findOrCreate](about:blank#persistedmodel-findorcreate)
*   [PersistedModel.exists](about:blank#persistedmodel-exists)
*   [PersistedModel.findById](about:blank#persistedmodel-findbyid)
*   [PersistedModel.find](about:blank#persistedmodel-find)
*   [PersistedModel.findOne](about:blank#persistedmodel-findone)
*   [PersistedModel.destroyAll](about:blank#persistedmodel-destroyall)
*   [PersistedModel.remove](about:blank#persistedmodel-remove)
*   [PersistedModel.deleteAll](about:blank#persistedmodel-deleteall)
*   [PersistedModel.updateAll](about:blank#persistedmodel-updateall)
*   [PersistedModel.update](about:blank#persistedmodel-update)
*   [PersistedModel.destroyById](about:blank#persistedmodel-destroybyid)
*   [PersistedModel.removeById](about:blank#persistedmodel-removebyid)
*   [PersistedModel.deleteById](about:blank#persistedmodel-deletebyid)
*   [PersistedModel.count](about:blank#persistedmodel-count)
*   [persistedModel.save](about:blank#persistedmodel-prototype-save)
*   [persistedModel.isNewRecord](about:blank#persistedmodel-prototype-isnewrecord)
*   [persistedModel.destroy](about:blank#persistedmodel-prototype-destroy)
*   [PersistedModel.remove](about:blank#persistedmodel-remove-1)
*   [PersistedModel.delete](about:blank#persistedmodel-delete)
*   [persistedModel.updateAttribute](about:blank#persistedmodel-prototype-updateattribute)
*   [persistedModel.updateAttributes](about:blank#persistedmodel-prototype-updateattributes)
*   [persistedModel.replaceAttributes](about:blank#persistedmodel-prototype-replaceattributes)
*   [PersistedModel.replaceById](about:blank#persistedmodel-replacebyid)
*   [persistedModel.reload](about:blank#persistedmodel-prototype-reload)
*   [persistedModel.setId](about:blank#persistedmodel-prototype-setid)
*   [persistedModel.getId](about:blank#persistedmodel-prototype-getid)
*   [persistedModel.getIdName](about:blank#persistedmodel-prototype-getidname)
*   [PersistedModel.getIdName](about:blank#persistedmodel-getidname)
*   [PersistedModel.diff](about:blank#persistedmodel-diff)
*   [PersistedModel.changes](about:blank#persistedmodel-changes)
*   [PersistedModel.checkpoint](about:blank#persistedmodel-checkpoint)
*   [PersistedModel.currentCheckpoint](about:blank#persistedmodel-currentcheckpoint)
*   [PersistedModel.replicate](about:blank#persistedmodel-replicate)
*   [PersistedModel.createUpdates](about:blank#persistedmodel-createupdates)
*   [PersistedModel.bulkUpdate](about:blank#persistedmodel-bulkupdate)
*   [PersistedModel.getChangeModel](about:blank#persistedmodel-getchangemodel)
*   [PersistedModel.getSourceId](about:blank#persistedmodel-getsourceid)
*   [PersistedModel.enableChangeTracking](about:blank#persistedmodel-enablechangetracking)
*   [PersistedModel.handleChangeError](about:blank#persistedmodel-handlechangeerror)
*   [PersistedModel.rectifyChange](about:blank#persistedmodel-rectifychange)
*   [PersistedModel.createChangeStream](about:blank#persistedmodel-createchangestream)

<section class="code-doc ">

### Class: PersistedModel

#### PersistedModel

Extends Model with basic query and CRUD support.

**Change Event**

Listen for model changes using the `change` event.

```js
MyPersistedModel.on('changed', function(obj) {
  console.log(obj) // => the changed model
});
```
</section>

<section class="code-doc ">

#### PersistedModel.bulkUpdate(updates, callback)

Apply an update list.

**Note: this is not atomic**

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">updates</strong></td>
      <td><code>Array</code></td>
      <td>
        <p>An updates list, usually from <a href="#persistedmodel-createupdates">createUpdates()</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.changes(since, filter, callback)

Get the changes to a model since the specified checkpoint. Provide a filter object to reduce the number of results returned.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">since</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Return only changes since this checkpoint.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">filter</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Include only changes that match this filter, the same as for <a href="find(">#persistedmodel-find</a>).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, changes)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">changes</strong></td>
      <td><code>Array</code></td>
      <td>
        <p>An array of <a href="#change">Change</a> objects.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.checkpoint(callback)

Create a checkpoint.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.count([where], callback)

Return the number of records that match the optional "where" filter.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[where]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Optional where filter, like <code>{ key: val, key2: {gt: 'val2'}, ...}</code><br>See <a href="https://docs.strongloop.com/display/LB/Where+filter#Wherefilter-Whereclauseforothermethods">Where filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, count)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">count</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Number of instances updated.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.create({Object}|[{Object}], callback)

Create new instance of Model, and save to database.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">{Object}|[{Object}]</strong></td>
      <td><code></code></td>
      <td>
        <p>data Optional data argument. Can be either a single model instance or an array of instances.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>cb(err, obj)</code> signature.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">models</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Model instances or null.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.createChangeStream(options, callback)

Create a change stream. [See here for more info](http://docs.strongloop.com/pages/viewpage.action?pageId=6721710)

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options.where</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Only changes to models matching this where filter will be included in the <code>ChangeStream</code>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">changes</strong></td>
      <td><code>ChangeStream</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.createUpdates(deltas, callback)

Create an update list (for `Model.bulkUpdate()`) from a delta list (result of `Change.diff()`).

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">deltas</strong></td>
      <td><code>Array</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.currentCheckpoint(callback)

Get the current checkpoint ID.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, currentCheckpointId)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">currentCheckpointId</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Current checkpoint ID.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### persistedModel.destroy(callback)

Deletes the model from persistence. Triggers `destroy` hook (async) before and after destroying object.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.destroyAll([where], callback)

Destroy all model instances that match the optional `where` specification.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[where]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Optional where filter, like: <code>{key: val, key2: {gt: 'val2'}, ...}</code><br>See <a href="https://docs.strongloop.com/display/LB/Where+filter#Wherefilter-Whereclauseforothermethods">Where filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Optional callback function called with <code>(err, info)</code> arguments.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">info</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Additional information about the command outcome.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">info.count</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Number of instances (rows, documents) destroyed.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.destroyById(id, callback)

Destroy model instance with the specified ID.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">id</strong></td>
      <td><code></code></td>
      <td>
        <p>The ID value of model instance to delete.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.diff(since, remoteChanges, callback)

Get a set of deltas and conflicts since the given checkpoint.

See [Change.diff()](about:blank#change-diff) for details.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">since</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Find deltas since this checkpoint.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">remoteChanges</strong></td>
      <td><code>Array</code></td>
      <td>
        <p>An array of change objects.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, result)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Object with <code>deltas</code> and <code>conflicts</code> properties; see <a href="#change-diff">Change.diff()</a> for details.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.enableChangeTracking()

Enable the tracking of changes made to the model. Usually for replication.

</section>

<section class="code-doc ">

#### PersistedModel.exists(id, callback)

Check whether a model instance exists in database.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">id</strong></td>
      <td><code>id</code></td>
      <td>
        <p>Identifier of object (primary key value).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, exists)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">exists</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>True if the instance with the specified ID exists; false otherwise.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.find([filter], callback)

Find all model instances that match `filter` specification. See [Querying models](http://docs.strongloop.com/display/LB/Querying+models).

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[filter]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Optional Filter JSON object; see below.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, returned-instances)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

[filter]

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">fields</strong></td>
      <td><code>String or Object or Array</code></td>
      <td>
        <p>Identify fields to include in return result.<br>See <a href="http://docs.strongloop.com/display/LB/Fields+filter">Fields filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">include</strong></td>
      <td><code>String or Object or Array</code></td>
      <td>
        <p>See PersistedModel.include documentation.<br>See <a href="http://docs.strongloop.com/display/LB/Include+filter">Include filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">limit</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Maximum number of instances to return.<br>See <a href="http://docs.strongloop.com/display/LB/Limit+filter">Limit filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">order</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Sort order: either "ASC" for ascending or "DESC" for descending.<br>See <a href="http://docs.strongloop.com/display/LB/Order+filter">Order filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">skip</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Number of results to skip.<br>See <a href="http://docs.strongloop.com/display/LB/Skip+filter">Skip filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">where</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Where clause, like <code>{ where: { key: val, key2: {gt: 'val2'}, ...} }</code><br>See <a href="https://docs.strongloop.com/display/LB/Where+filter#Wherefilter-Whereclauseforqueries">Where filter</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">models</strong></td>
      <td><code>Array</code></td>
      <td>
        <p>Model instances matching the filter, or null if none found.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.findById(id, [filter], callback)

Find object by ID with an optional filter for include/fields.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">id</strong></td>
      <td><code></code></td>
      <td>
        <p>Primary key value</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[filter]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Optional Filter JSON object; see below.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, instance)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

[filter]

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">fields</strong></td>
      <td><code>String or Object or Array</code></td>
      <td>
        <p>Identify fields to include in return result.<br>See <a href="http://docs.strongloop.com/display/LB/Fields+filter">Fields filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">include</strong></td>
      <td><code>String or Object or Array</code></td>
      <td>
        <p>See PersistedModel.include documentation.<br>See <a href="http://docs.strongloop.com/display/LB/Include+filter">Include filter</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">instance</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Model instance matching the specified ID or null if no instance matches.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.findOne([filter], callback)

Find one model instance that matches `filter` specification. Same as `find`, but limited to one result; Returns object, not collection.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[filter]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Optional Filter JSON object; see below.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, returned-instance)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

[filter]

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">fields</strong></td>
      <td><code>String or Object or Array</code></td>
      <td>
        <p>Identify fields to include in return result.<br>See <a href="http://docs.strongloop.com/display/LB/Fields+filter">Fields filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">include</strong></td>
      <td><code>String or Object or Array</code></td>
      <td>
        <p>See PersistedModel.include documentation.<br>See <a href="http://docs.strongloop.com/display/LB/Include+filter">Include filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">order</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Sort order: either "ASC" for ascending or "DESC" for descending.<br>See <a href="http://docs.strongloop.com/display/LB/Order+filter">Order filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">skip</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Number of results to skip.<br>See <a href="http://docs.strongloop.com/display/LB/Skip+filter">Skip filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">where</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Where clause, like <code>{where: { key: val, key2: {gt: 'val2'}, ...} }</code><br>See <a href="https://docs.strongloop.com/display/LB/Where+filter#Wherefilter-Whereclauseforqueries">Where filter</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">model</strong></td>
      <td><code>Array</code></td>
      <td>
        <p>First model instance that matches the filter or null if none found.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.findOrCreate([filter], data, callback)

Finds one record matching the optional filter object. If not found, creates the object using the data provided as second argument. In this sense it is the same as `find`, but limited to one object. Returns an object, not collection. If you don't provide the filter object argument, it tries to locate an existing object that matches the `data` argument.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[filter]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Optional Filter object; see below.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">data</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Data to insert if object matching the <code>where</code> filter is not found.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>cb(err, instance, created)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

[filter]

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">fields</strong></td>
      <td><code>String or Object or Array</code></td>
      <td>
        <p>Identify fields to include in return result.<br>See <a href="http://docs.strongloop.com/display/LB/Fields+filter">Fields filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">include</strong></td>
      <td><code>String or Object or Array</code></td>
      <td>
        <p>See PersistedModel.include documentation.<br>See <a href="http://docs.strongloop.com/display/LB/Include+filter">Include filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">limit</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Maximum number of instances to return.<br>See <a href="http://docs.strongloop.com/display/LB/Limit+filter">Limit filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">order</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Sort order: either "ASC" for ascending or "DESC" for descending.<br>See <a href="http://docs.strongloop.com/display/LB/Order+filter">Order filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">skip</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Number of results to skip.<br>See <a href="http://docs.strongloop.com/display/LB/Skip+filter">Skip filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">where</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Where clause, like <code>{where: {key: val, key2: {gt: val2}, ...}}</code><br>See <a href="https://docs.strongloop.com/display/LB/Where+filter#Wherefilter-Whereclauseforqueries">Where filter</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">instance</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Model instance matching the <code>where</code> filter, if found.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">created</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>True if the instance matching the <code>where</code> filter was created.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.getChangeModel()

Get the `Change` model. Throws an error if the change model is not correctly setup.

</section>

<section class="code-doc ">

#### persistedModel.getId()

Get the `id` value for the `PersistedModel`.

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code></code></td>
      <td>
        <p>The <code>id</code> value</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### persistedModel.getIdName()

Get the `id` property name of the constructor.

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The <code>id</code> property name</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.getIdName()

Get the `id` property name of the constructor.

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The <code>id</code> property name</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.getSourceId(callback)

Get the source identifier for this model or dataSource.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, id)</code> arguments.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">sourceId</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Source identifier for the model or dataSource.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.handleChangeError(err)

Handle a change error. Override this method in a subclassing model to customize change error handling.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### persistedModel.isNewRecord()

Determine if the data model is new.

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Returns true if the data model is new; false otherwise.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.rectifyChange(id, callback)

Specify that a change to the model with the given ID has occurred.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">id</strong></td>
      <td><code></code></td>
      <td>
        <p>The ID of the model that has changed.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### persistedModel.reload(callback)

Reload object from persistence. Requires `id` member of `object` to be able to call `find`.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, instance)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">instance</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Model instance.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### persistedModel.replaceAttributes(data, [options], callback)

Replace attributes for a model instance and persist it into the datasource. Performs validation before replacing.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">data</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Data to replace.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options for replace</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, instance)</code> arguments.</p>
      </td>
    </tr>
  </tbody>
</table>

[options]

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">validate</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Perform validation before saving. Default is true.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">instance</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Replaced instance.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.replaceById(id, data, [options], callback)

Replace attributes for a model instance whose id is the first input argument and persist it into the datasource. Performs validation before replacing.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">id</strong></td>
      <td><code></code></td>
      <td>
        <p>The ID value of model instance to replace.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">data</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Data to replace.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options for replace</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, instance)</code> arguments.</p>
      </td>
    </tr>
  </tbody>
</table>

[options]

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">validate</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Perform validation before saving. Default is true.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">instance</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Replaced instance.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.replaceOrCreate(data, [options], callback)

Replace or insert a model instance; replace existing record if one is found, such that parameter `data.id` matches `id` of model instance; otherwise, insert a new record.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">data</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>The model instance data.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options for replaceOrCreate</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>cb(err, obj)</code> signature.</p>
      </td>
    </tr>
  </tbody>
</table>

[options]

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">validate</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Perform validation before saving. Default is true.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">model</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Replaced model instance.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.replicate([since], targetModel, [options], [callback])

Replicate changes since the given checkpoint to the given target model.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[since]</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Since this checkpoint</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">targetModel</strong></td>
      <td><code>Model</code></td>
      <td>
        <p>Target this model class</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options.filter]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Replicate models that match this filter</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[callback]</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, conflicts)</code> arguments.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">conflicts</strong></td>
      <td><code>Array.&lt;Conflict&gt;</code></td>
      <td>
        <p>A list of changes that could not be replicated due to conflicts.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">{Object] checkpoints The new checkpoints to use as the "since"</strong></td>
      <td><code></code></td>
      <td>
        <p>argument for the next replication.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### persistedModel.save([options], callback)

Save model instance. If the instance doesn't have an ID, then calls [create](about:blank#persistedmodelcreatedata-cb) instead. Triggers: validate, save, update, or create.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>See below.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Optional callback function called with <code>(err, obj)</code> arguments.</p>
      </td>
    </tr>
  </tbody>
</table>

[options]

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">validate</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Perform validation before saving. Default is true.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">throws</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>If true, throw a validation error; WARNING: This can crash Node. If false, report the error via callback. Default is false.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">instance</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Model instance saved or created.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### persistedModel.setId(val)

Set the correct `id` property for the `PersistedModel`. Uses the `setId` method if the model is attached to connector that defines it. Otherwise, uses the default lookup. Override this method to handle complex IDs.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">val</strong></td>
      <td><code></code></td>
      <td>
        <p>The <code>id</code> value. Will be converted to the type that the <code>id</code> property specifies.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.updateAll([where], data, callback)

Update multiple instances that match the where clause.

Example:

```
Employee.updateAll({managerId: 'x001'}, {managerId: 'x002'}, function(err, info) {
    ...
});
```

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[where]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Optional <code>where</code> filter, like <code>{ key: val, key2: {gt: 'val2'}, ...}</code><br>see <a href="https://docs.strongloop.com/display/LB/Where+filter#Wherefilter-Whereclauseforothermethods">Where filter</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">data</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Object containing data to replace matching instances, if any.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, info)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">info</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Additional information about the command outcome.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">info.count</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Number of instances (rows, documents) updated.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### persistedModel.updateAttribute(name, value, callback)

Update a single attribute. Equivalent to `updateAttributes({name: 'value'}, cb)`

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">name</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Name of property.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">value</strong></td>
      <td><code>Mixed</code></td>
      <td>
        <p>Value of property.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, instance)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">instance</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Updated instance.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### persistedModel.updateAttributes(data, callback)

Update set of attributes. Performs validation before updating.

Triggers: `validation`, `save` and `update` hooks

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">data</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Data to update.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>(err, instance)</code> arguments. Required.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">instance</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Updated instance.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### PersistedModel.upsert(data, callback)

Update or insert a model instance

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">data</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>The model instance data to insert.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function called with <code>cb(err, obj)</code> signature.</p>
      </td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td>
        <p>Error object; see <a href="http://docs.strongloop.com/display/LB/Error+object">Error object</a>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">model</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Updated model instance.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>
