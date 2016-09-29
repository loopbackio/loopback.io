---
title: "Basic model object"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Basic-model-object.html
summary:
---

## Overview

By default, a LoopBack model has properties and methods "mixed in" from:

*   [Model object](http://apidocs.strongloop.com/loopback/#model)
*   Hookable object - provides [模型钩子](/doc/{{page.lang}}/lb2/6095042.html).
*   [Inclusion object](http://apidocs.strongloop.com/loopback-datasource-juggler/#inclusion) (loopback-datasource-juggler) - Enables you to load relations of several objects and optimize numbers of requests.
*   [Validateable object](http://apidocs.strongloop.com/loopback-datasource-juggler/#validatable) (loopback-datasource-juggler) - provides validation methods; see [Validating model data](/doc/{{page.lang}}/lb2/Validating-model-data.html).

When you define relations between models, the [RelationMixin object](http://apidocs.strongloop.com/loopback-datasource-juggler/#relationmixin) object also gets mixed in to the model object.

## Events

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
