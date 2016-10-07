---
title: "Events"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Events.html
summary:
---

In addition to the [standard Node events](http://nodejs.org/api/events.html), LoopBack applications and models emit other events.

## Application events

By default, the scaffolded application emits a 'started' event when it starts up, after running [boot scripts](/doc/{{page.lang}}/lb2/6095038.html).

## Model events

The following table summarizes the events that LoopBack models can emit.

<table>
  <tbody>
    <tr>
      <th>Event</th>
      <th>Emitted when...</th>
      <th>Arguments</th>
      <th>Argument type</th>
      <th>Class methods that emit</th>
      <th>Instance methods that emit</th>
    </tr>
    <tr>
      <td>'attached'</td>
      <td>
        <p>Model&nbsp;is attached to an&nbsp;<span>app</span><span>.</span></p>
        <div style="width: 120px;">
          <p>&nbsp;</p>
        </div>
        <p><span><br></span></p>
      </td>
      <td>Model class</td>
      <td>Object</td>
      <td>app.model(<em>modelName</em>)</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>'changed'</td>
      <td><span style="color: rgb(0,0,0);">Model instance is created, saved, or updated.&nbsp;</span></td>
      <td>Model instance</td>
      <td>Object</td>
      <td>
        <ul class="task-list">
          <li>
            <p>Model.create()</p>
          </li>
          <li>
            <p>Model.updateOrCreate()&nbsp;</p>
          </li>
          <li>
            <p>Model.upsert()&nbsp;</p>
          </li>
        </ul>
      </td>
      <td>
        <ul class="task-list">
          <li>
            <p>Model.prototype.save()</p>
          </li>
          <li>
            <p>Model.prototype.updateAttributes()</p>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>'dataSourceAttached'</td>
      <td>Model is attached to a&nbsp;Data source.</td>
      <td>Model class</td>
      <td>Object</td>
      <td>&nbsp;</td>
      <td>
        <ul>
          <li><span class="nx">DataSource</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">createModel</span>&nbsp;<span class="o">&nbsp;</span></li>
          <li><span class="nx">DataSource</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">define</span></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>'deleted'</td>
      <td><span style="color: rgb(0,0,0);">Model instance is deleted.</span></td>
      <td>Model ID</td>
      <td>Number</td>
      <td>
        <ul class="task-list">
          <li>Model.removeById()</li>
          <li>Model.destroyById()</li>
          <li>Model.deleteById()</li>
        </ul>
      </td>
      <td>
        <ul class="task-list">
          <li>Model.prototype.remove()</li>
          <li>Model.prototype.delete()</li>
          <li>Model.prototype.destroy()</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>&nbsp;'deletedAll'</td>
      <td><span style="color: rgb(0,0,0);">Model instance is deleted.</span></td>
      <td>where (optional)</td>
      <td>JSON object</td>
      <td>
        <ul class="task-list">
          <li>
            <p>Model.remove()</p>
          </li>
          <li>
            <p>Model.deleteAll()</p>
          </li>
          <li>
            <p>Model.destroyAll()</p>
          </li>
        </ul>
      </td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>'set'</td>
      <td><span style="color: rgb(0,0,0);">Model property is set.</span></td>
      <td>Model instance</td>
      <td>Object</td>
      <td>&nbsp;</td>
      <td>
        <p>Model.prototype.setAttributes()</p>
      </td>
    </tr>
  </tbody>
</table>

Other events:

*   [`User.resetPassword()`](http://apidocs.strongloop.com/loopback/#user-resetpassword) emits the 'resetPasswordRequest' event.
