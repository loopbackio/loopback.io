---
title: "HasAndBelongsToMany relations"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/HasAndBelongsToMany-relations.html
summary:
---

## Overview

A hasAndBelongsToMany relation creates a direct many-to-many connection with another model, with no intervening model. For example, in an application with assemblies and parts, where each assembly has many parts and each part appears in many assemblies, you could declare the models this way:

{% include image.html file="9830483.png" alt="" %}

## Defining a hasAndBelongsToMany relation

Use `slc loopback:relation` to create a relation between two models.  You'll be prommpted to enter the name of the model, the name of related model, and other required information.  The tool will then modify the [Model definition JSON file](https://docs.strongloop.com/display/zh/Model+definition+JSON+file) (for example, `/common/models/customer.json`) accordingly.

For more information, see [Relation generator](https://docs.strongloop.com/display/zh/Relation+generator).

For example, here is an excerpt from a model JSON file for a student model, expressing a hasAndBelongsToMany relation between student and class models:

**/common/models/student.json**

```js
{
  "name": "Student",
  "plural": "Students",
  "relations": {
    "classes": {
      "type": "hasAndBelongsToMany",
      "model": "Class"
    },
    ...
```

You can also define a hasAndBelongsToMany relation in code, though this is not recommended in general.  For example:

**/common/models/student.js**

```js
Class.hasAndBelongsToMany(Student);
Student.hasAndBelongsToMany(Class);
```

## **Methods added to the model**

Once you define a "hasAndBelongsToMany" relation, LoopBack adds methods with the relation name to the declaring model class’s prototype automatically, for example: `assembly.parts.create(...)`.

<table>
  <tbody>
    <tr>
      <th>Example method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><pre>assembly.parts(filter, function(err, parts) {<br>  ...<br>});</pre></td>
      <td>Find parts for the assembly.</td>
    </tr>
    <tr>
      <td><pre>var part = assembly.parts.build(data);</pre></td>
      <td>Build a new part.</td>
    </tr>
    <tr>
      <td><pre>assembly.parts.create(data, function(err, part) {<br>  ...<br>});</pre></td>
      <td>Create a new part for the assembly.</td>
    </tr>
    <tr>
      <td><pre>assembly.parts.add(part, function(err) {<br>  ...<br>});</pre></td>
      <td>Add a part to the assembly.</td>
    </tr>
    <tr>
      <td><pre>assembly.parts.remove(part, function(err) {<br>  ...<br>});</pre></td>
      <td>Remove a part from the assembly.</td>
    </tr>
    <tr>
      <td><pre>assembly.parts.findById(partId, function(err, part) {<br>  ...<br>});</pre></td>
      <td>Find a part by ID.</td>
    </tr>
    <tr>
      <td><pre>assembly.parts.destroy(partId, function(err) {<br>  ...<br>});</pre></td>
      <td>Delete a part by ID.</td>
    </tr>
  </tbody>
</table>
