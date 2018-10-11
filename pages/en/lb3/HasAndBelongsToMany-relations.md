---
title: "HasAndBelongsToMany relations"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/HasAndBelongsToMany-relations.html
summary:
---

## Overview

A hasAndBelongsToMany relation creates a direct many-to-many connection with another model, with no intervening model. 
For example, in an application with assemblies and parts, where each assembly has many parts and each part appears in many assemblies, you could declare the models this way:

## Defining a hasAndBelongsToMany relation

Use the [relation generator](Relation-generator.html) to create a relation between two models. The tool will prompt you to enter the name of the model, the name of related model, and other required information.
The tool will then modify the [model definition JSON file](Model-definition-JSON-file.html) (for example, `common/models/customer.json`) accordingly.

{% include image.html file="9830483.png" alt="" %}

For example, here is an excerpt from a model JSON file for a assembly model, expressing a hasAndBelongsToMany relation between assembly and part models:

{% include code-caption.html content="/common/models/assembly.json" %}
```javascript
{
  "name": "Assembly",
  "plural": "Assemblies",
  "relations": {
    "parts": {
      "type": "hasAndBelongsToMany",
      "model": "Part"
    },
...
```

You can also define a hasAndBelongsToMany relation in code, though this is not recommended in general. For example:

{% include code-caption.html content="/common/models/assembly.js" %}
```javascript
Part.hasAndBelongsToMany(Assembly);
Assembly.hasAndBelongsToMany(Part);
```

### Adding a relation via REST API

When adding relation through the REST API, a join model must exist before adding relations.
For Example in the above example with "Assembly" and "Part" models, to add an instance of "Part" to "Assembly" through the REST API
interface an "AssemblyPart" model must exist for it to work.

Most of the time you should add "hasAndBelongToMany" relations to models on server side using the method:

{% include code-caption.html content="Example method" %}
```javascript
assembly.parts.add(partId, function(err) {
  //...
});
```

Thus, if you need to add the relation using REST, first check if the "AssemblyPart" model exists first. Then add the relation using this code:

{% include code-caption.html content="REST example method" %}
```javascript
Assembly.Parts.link({id:assemblyId, fk: partId}, partInstance,  function(value, header) {
  //success
});
```

## Methods added to the model

Once you define a "hasAndBelongsToMany" relation, LoopBack adds methods with the relation name to the declaring model class's prototype automatically.
For example: `assembly.parts.create(...)`.

The relation can return a promise by calling the `find()` method on the relation property.

<table>
  <tbody>
    <tr>
      <th style="width: 400px;">Example method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>
        <pre>assembly.parts(filter,
  function(err, parts) {<br>  ...<br>});</pre>
      </td>
      <td>Find parts for the assembly.</td>
    </tr>
    <tr>
      <td>
        <pre>var part = assembly.parts.build(data);</pre>
      </td>
      <td>Build a new part.</td>
    </tr>
    <tr>
      <td>
        <pre>assembly.parts.create(data,
  function(err, part) {<br>  ...<br>});</pre>
      </td>
      <td>Create a new part for the assembly.</td>
    </tr>
    <tr>
      <td>
        <pre>assembly.parts.add(partId,
  function(err) {<br>  ...<br>});</pre>
      </td>
      <td>Add a part to the assembly.</td>
    </tr>
    <tr>
      <td>
        <pre>assembly.parts.remove(part,
  function(err) {<br>  ...<br>});</pre>
      </td>
      <td>Remove a part from the assembly.</td>
    </tr>
    <tr>
      <td>
        <pre>assembly.parts.findById(partId,
  function(err, part) {<br>  ...<br>});</pre>
      </td>
      <td>Find a part by ID.</td>
    </tr>
    <tr>
      <td>
        <pre>assembly.parts.destroy(partId,
function(err) {<br>  ...<br>});</pre>
      </td>
      <td>Delete a part by ID.</td>
    </tr>
    <tr>
      <td>
        <pre>assembly.parts.find().then(function(parts) { ... });</pre>
      </td>
      <td>Use the `find()` method on the relation name to return a promise.</td>
    </tr>
  </tbody>
</table>
