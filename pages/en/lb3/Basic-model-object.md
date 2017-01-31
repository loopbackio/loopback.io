---
title: "Basic model object"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Basic-model-object.html
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

The following table summarizes the events that LoopBack models can emit.

<table>
  <thead>
    <tr>
      <th width="200">Event</th>
      <th width="200">Emitted when...</th>
      <th>Arguments</th>
      <th>Argument type</th>
      <th width="180">Class methods that emit</th>
      <th width="180">Instance methods that emit</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>'attached'</td>
      <td>Model is attached to an app.</td>
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
      <td>DataSource.prototype.createModel
          <br/>DataSource.prototype.define
      </td>
    </tr>
    <tr>
      <td>'set'</td>
      <td>Model property is set.</td>
      <td>Model instance</td>
      <td>Object</td>
      <td>&nbsp;</td>
      <td>Model.prototype.setAttributes()</td>
    </tr>
  </tbody>
</table>
