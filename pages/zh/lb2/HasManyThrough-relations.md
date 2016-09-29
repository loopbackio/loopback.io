---
title: "HasManyThrough relations"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/HasManyThrough-relations.html
summary:
---

## Overview

A `hasMany through` relation is often used to set up a many-to-many connection with another model. This relation indicates that the declaring model can be matched with zero or more instances of another model by proceeding through a third model. For example, in an application for a medical practice where patients make appointments to see physicians, the relevant relation declarations might be:

{% include image.html file="6258757.png" alt="" %}

The “through” model, **Appointment**, has two foreign key properties, **physicianId** and **patientId**, that reference the primary keys in the declaring model, **Physician**, and the target model, **Patient**.

## Defining a hasManyThrough relation

Use `slc loopback:relation` to create a relation between two models.  You'll be prommpted to enter the name of the model, the name of related model, and other required information.  The tool will then modify the [Model definition JSON file](https://docs.strongloop.com/display/zh/Model+definition+JSON+file) (for example, `/common/models/customer.json`) accordingly.

For more information, see [Relation generator](https://docs.strongloop.com/display/zh/Relation+generator).

To create a hasManyThrough relation, respond with **Yes** to the prompt for a "through" model, then specify the model:

```
[?] Require a through model? Yes
[?] Choose a through model: Customer
```

For example, here is the model JSON file for the order model in [loopback-example-relations-basic](https://github.com/strongloop/loopback-example-relations-basic):

**common/models/physician.json**

```js
{ 
  "name": "Physician",
  "base": "PersistedModel",
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "patients": {
      "type": "hasMany",
      "model": "Patient",
      "foreignKey": "patientId",
      "through": "Appointment"
    },
    ...
```

**common/models/patient.json**

```js
{ 
  "name": "Patient",
  "base": "PersistedModel",
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "physicans": {
      "type": "hasMany",
      "model": "Physician",
      "foreignKey": "physicianId",
      "through": "Appointment"
    },
    ...
```

**common/models/appointment.json**

```js
{ 
  "name": "Appointment",
  "base": "PersistedModel",
  "properties": {
    "appointmentDate": {
      "type": "date"
    }
  },
  "validations": [],
  "relations": {
    "physician": {
      "type": "belongsTo",
      "model": "Physician",
      "foreignKey": "physicianId"
    },
    "patient": {
      "type": "belongsTo",
      "model": "Patient",
      "foreignKey": "patientId"
    },
    ...
```

You can also define a hasManyThrough relation in code, though this is not generally recommended:

**Defining a hasManyThrough relation in code**

```js
var Physician = ds.createModel('Physician', {
  name: String
});
var Patient = ds.createModel('Patient', {
  name: String
});
var Appointment = ds.createModel('Appointment', {
  physicianId: Number,
  patientId: Number,
  appointmentDate: Date
});

Appointment.belongsTo(Patient);
Appointment.belongsTo(Physician);

Physician.hasMany(Patient, {
  through: Appointment
});
Patient.hasMany(Physician, {
  through: Appointment
});
// Now the Physician model has a virtual property called patients:
physician.patients(filter, callback); // Find patients for the physician
physician.patients.build(data); // Build a new patient
physician.patients.create(data, callback); // Create a new patient for the physician
physician.patients.destroyAll(callback); // Remove all patients for the physician
physician.patients.add(patient, callback); // Add an patient to the physician
physician.patients.remove(patient, callback); // Remove an patient from the physician
physician.patients.findById(patientId, callback); // Find an patient by id
```

## Methods added to the model

Once you define a "hasManyThrough" relation, LoopBack adds methods with the relation name to the declaring model class’s prototype automatically, for example: `physician.patients.create(...)`.

<table>
  <tbody>
    <tr>
      <th>Example method</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><pre>physician.patients(filter, function(err, patients) {<br>  ...<br>});</pre></td>
      <td>Find patients for the physician.</td>
    </tr>
    <tr>
      <td><pre>var patient = physician.patients.build(data);</pre></td>
      <td>Create a new patient.</td>
    </tr>
    <tr>
      <td><pre>physician.patients.create(data, function(err, patient) {<br>  ...<br>});</pre></td>
      <td>Create a new patient for the physician.</td>
    </tr>
    <tr>
      <td><pre>physician.patients.destroyAll(function(err) {<br>  ...<br>});</pre></td>
      <td>Remove all patients for the physician</td>
    </tr>
    <tr>
      <td><pre>physician.patients.add(patient, function(err, patient) {<br>  ...<br>});</pre></td>
      <td>Add a patient to the physician.</td>
    </tr>
    <tr>
      <td><pre>physician.patients.remove(patient, function(err) {<br>  ...<br>});</pre></td>
      <td>Remove a patient from the physician.</td>
    </tr>
    <tr>
      <td><pre>physician.patients.findById(patientId, function(err, patient) {<br>  ...<br>});</pre></td>
      <td>Find an patient by ID.</td>
    </tr>
  </tbody>
</table>

These relation methods provide an API for working with the related object (patient in the example above). However, they do not allow you to access both the related object (Patient) and the "through" record (Appointment) in a single call.

For example, if you want to add a new patient and create an appointment at a certain date, you have to make two calls (REST requests):

1.  Create the patient via ``Patient.create``

    ```js
    POST / patients {
      "name": "Jane Smith"
    }
    ```

2.  Create the appointment via `Appointment.create`, setting the `patientId` property to the `id` returned by `Patient.create`.

    ```js
    POST / appointments {
      "patientId": 1,
      "physicianId": 1,
      "appointmentDate": "2014-06-01"
    }
    ```

The following query can be used to list all patients of a given physician, including their appointment date:

`GET /appointments?filter={"include":["patient"],"where":{"physicianId":2}}`

Sample response:

```js
[{
  "appointmentDate": "2014-06-01",
  "id": 1,
  "patientId": 1,
  "physicianId": 1,
  "patient": {
    "name": "Jane Smith",
    "id": 1
  }
}]
```
