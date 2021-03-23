---
title: "HasOne relations"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/HasOne-relations.html
summary:
---

## Overview

A hasOne relation sets up a one-to-one connection with another model, such that each instance of the declaring model "has one" instance of the other model.
A hasOne relation is a degenerate case of a [hasMany relation](HasMany-relations.html).

## Defining a hasOne relation

Use the [relation generator](Relation-generator.html) to create a relation between two models.
The tool will prompt you to enter the name of the model, the name of related model, and other required information.
The tool will then modify the [model definition JSON file](Model-definition-JSON-file.html) (for example, `common/models/customer.json`) accordingly.


For example, consider two models: supplier and account.

{% include code-caption.html content="common/models/supplier.json" %}
```javascript
{
  "name": "supplier",
  "base": "PersistedModel",
  "idInjection": true,
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "supplier_acct": {
      "type": "hasOne",
      "model": "account",
      "foreignKey": "supplierId",
      "primaryKey": "id" // optional
    }
  },
  "acls": [],
  "methods": []
}
```

A supplier has one account, where the foreign  key is on the declaring model: account.supplierId -> supplier.id.

{% include code-caption.html content="common/models/account.json" %}
```javascript
{
  "name": "account",
  "base": "PersistedModel",
  "idInjection": true,
  "properties": {
    "id": {
      "type": "number",
      "required": true
    },
    "acctmgr": {
      "type": "string"
    },
    "supplierId": {
      "type": "number",
      "required": true
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": []
}
```

Alternatively, you can define a "hasOne" relation in code, though in general this is not recommended:

{% include code-caption.html content="common/models/supplier.js" %}
```javascript
Supplier.hasOne(Account, {foreignKey: 'supplierId', as: 'account'});
```

If the target model doesn't have a foreign key property, LoopBack will add a property with the same name.
The type of the property will be the same as the type of the target model's **id** property.
Please note the foreign key property is defined on the target model (for example, Account).

If you don't specify them, then LoopBack derives the relation name and foreign key as follows:

* Relation name: Camel case of the model name, for example, for the "supplier" model the relation is "supplier".
* Foreign key: The relation name appended with `Id`, for example, for relation name "supplier" the default foreign key is "supplierId".

## Methods added to the model

Once you define the hasOne relation, LoopBack automatically adds a method with the relation name to the declaring model class's prototype.
For example: `supplier.prototype.account(...)`.

<table>
  <tbody>
    <tr>
      <th style="width: 400px;">Example method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>
        <pre>supplier.account(function(err, account) {<br>  ...<br>});</pre>
      </td>
      <td>
        <p>Find the supplier's account model.</p>
        <div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>You cannot supply a filter, as you can for hasMany right?</div>
        <p></p>
      </td>
    </tr>
    <tr>
      <td>
        <pre>var supplier = supplier.account.build(data);</pre>
        <p>Or equivalently:</p>
        <pre>var account = new account({supplierId: supplier.id, ...});</pre>
      </td>
      <td>Build a new account for the supplier with the supplierId to be set to the id of the supplier. No persistence is involved.</td>
    </tr>
    <tr>
      <td>
        <pre>supplier.account.create(data, function(err, account) {<br>  ...<br>});</pre>
        <p>Or, equivalently:</p>
        <pre>account.create({supplierId: supplier.id, ...}, function(err, account) {<br>  ...<br>});</pre>
      </td>
      <td>Create a new account for the supplier. If there is already an account, an error will be reported.</td>
    </tr>
    <tr>
      <td>
        <pre>supplier.account.destroy(function(err) {<br>  ...<br>});</pre>
      </td>
      <td>Remove the account for the supplier.</td>
    </tr>
    <tr>
      <td>
        <pre>supplier.account.update({balance: 100}, function(err, account) {<br>  ...<br>});</pre>
      </td>
      <td>Update the associated account.</td>
    </tr>
  </tbody>
</table>
