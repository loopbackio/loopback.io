---
title: "Basic model object"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Basic-model-object.html
summary:
---

## Overview

By default, the basic LoopBack [Model object](http://apidocs.strongloop.com/loopback/#model) has properties and methods "mixed in" from:

* [Inclusion object](http://apidocs.strongloop.com/loopback-datasource-juggler/#inclusion) - Enables you to load relations of several objects and optimize numbers of requests.
* [Validateable object](http://apidocs.strongloop.com/loopback-datasource-juggler/#validatable) - provides validation methods;
  see [Validating model data](Validating-model-data.html).

When you define relations between models,
the [RelationMixin object](http://apidocs.strongloop.com/loopback-datasource-juggler/#relationmixin) object also gets mixed in to the model object.

## Events

{% include important.html content="
The following events are deprecated in favor of [operation hooks](Operation-hooks.html):

* changed
* deleted
* deletedAll
" %}

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
        <p>Model is attached to an app.</p>
        <div style="width: 120px;">
          <p>&nbsp;</p>
        </div>
        <p><br></p>
      </td>
      <td>Model class</td>
      <td>Object</td>
      <td>app.model(<em>modelName</em>)</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>'dataSourceAttached'</td>
      <td>Model is attached to a Data source.</td>
      <td>Model class</td>
      <td>Object</td>
      <td>&nbsp;</td>
      <td>
        <ul>
          <li>DataSource.prototype.createModel </li>
          <li>DataSource.prototype.define</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>'set'</td>
      <td>Model property is set.</td>
      <td>Model instance</td>
      <td>Object</td>
      <td>&nbsp;</td>
      <td>
        <p>Model.prototype.setAttributes()</p>
      </td>
    </tr>
  </tbody>
</table>
