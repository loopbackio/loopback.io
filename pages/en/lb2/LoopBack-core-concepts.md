---
title: "LoopBack core concepts"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/LoopBack-core-concepts.html
summary:
---

{% include tip.html content="**Read this first** to understand how LoopBack works.
" %}

<div style="float: right;">
{% include image.html file="9830550.png" alt="Model inheritance diagram" caption="Model inheritance" max-width="400"%}
</div>

## Models

_Models_ are at the heart of LoopBack, and represent back-end data sources such as databases or other back end services (REST, SOAP, and so on).
LoopBack models are JavaScript objects with both Node and REST APIs.

**A key powerful feature of LoopBack is that when you define a model it automatically comes with a predefined REST API
with a full set of create, read, update, and delete operations.**  

The [Basic model object](/doc/{{page.lang}}/lb2/Basic-model-object.html) has methods for adding [hooks](/doc/{{page.lang}}/lb2/Model-hooks.html) and for [validating data](/doc/{{page.lang}}/lb2/Validating-model-data.html).
Other model objects all "inherit from" it. Models have an inheritance hierarchy, as shown at right:
When you attach a model to a persistent data source it becomes a [connected model](/doc/{{page.lang}}/lb2/Connected-model-object.html) with create, retrieve, update, and delete operations.
LoopBack's built-in models inherit from it.

### Built-in models

Every LoopBack application has a set of predefined 
[built-in models](/doc/{{page.lang}}/lb2/Using-built-in-models.html) such as User, Role, and Application, so you don't have to create these common models from scratch.

### Custom models

You can [define your own custom models](/doc/{{page.lang}}/lb2/Creating-models.html) specific to your application. 
You can make your custom models [extend built-in models](/doc/{{page.lang}}/lb2/Extending-built-in-models.html) to build on the predefined functionality of
[User](https://apidocs.strongloop.com/loopback/#user), 
[Application](https://apidocs.strongloop.com/loopback/#application),
and other built-in models.

You can create LoopBack models in various ways, depending on what kind of data source the model is based on. You can create models:

* [With the LoopBack model generator](/doc/{{page.lang}}/lb2/Using-the-model-generator.html).
* [From an existing relational database](/doc/{{page.lang}}/lb2/Discovering-models-from-relational-databases.html) using _model discovery_.
  Then you can keep your model synchronized with the database using
  LoopBack's [schema / model synchronization](/doc/{{page.lang}}/lb2/Creating-a-database-schema-from-models.html) API.
* [By instance introspection](/doc/{{page.lang}}/lb2/Creating-models-from-unstructured-data.html) for free-form data in NoSQL databases or REST APIs.

All three of these methods create a [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html) that defines your model in LoopBack,
by convention in a LoopBack project's `common/models` directory; for example, `common/models/account.json`.

You can also create and customize models programmatically using the [LoopBack API](http://apidocs.strongloop.com/loopback/#loopback-createmodel),
or by manually editing the [model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html).
In most cases, you shouldn't need to use those techniques to create models, but you generally will use them to modify and customize models.

{% include note.html content="
The [Model definition JSON file](Model-definition-JSON-file.html) includes an `idInjection` property that indicates
whether LoopBack automatically adds a unique `id` property to a model. For a model connected to a database, the id property corresponds to the primary key. 
See [ID properties](Model-definition-JSON-file.html#id-properties) for more information.
" %}

### Model relations

You can express [relationships between models](/doc/{{page.lang}}/lb2/Creating-model-relations.html), such as 
[BelongsTo](/doc/{{page.lang}}/lb2/BelongsTo-relations.html), 
[HasMany](/doc/{{page.lang}}/lb2/HasMany-relations.html), and 
[HasAndBelongsToMany](/doc/{{page.lang}}/lb2/HasAndBelongsToMany-relations.html). 

### Model create, retrieve, update, and delete operations

When you connect a model to a persistent data source such as a database, it becomes a _[connected model](/doc/{{page.lang}}/lb2/Connected-model-object.html)_ 
with a full set of create, read, update, and delete operations from the [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel) class:

<table>
  <tbody>
    <tr>
      <th>Operation</th>
      <th>REST</th>
      <th>LoopBack model method<br>(Node API)*</th>
      <th>Corresponding SQL<br>Operation</th>
    </tr>
    <tr>
      <td>Create</td>
      <td>
        <a href="/doc/en/lb2/PersistedModel-REST-API.html#create-model-instance">PUT /<em>modelName</em></a>
        <br/><a href="/doc/en/lb2/PersistedModel-REST-API.html#update--insert-instance">POST /<em>modelName</em></a>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-create" class="external-link" rel="nofollow">create()</a><sup>*</sup></code></td>
      <td>INSERT</td>
    </tr>
    <tr>
      <td>Read (Retrieve)</td>
      <td><a href="/doc/en/lb2/PersistedModel-REST-API.html#find-matching-instances">GET /modelName?filter=...</a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-find" class="external-link" rel="nofollow">find()</a><sup>*</sup></code></td>
      <td>SELECT</td>
    </tr>
    <tr>
      <td>Update (Modify)</td>
      <td>
      <a href="/doc/en/lb2/PersistedModel-REST-API.html#update--insert-instance">POST /<em>modelName</em></a> <br/>
        <a href="/doc/en/lb2/PersistedModel-REST-API.html#update-model-instance-attributes">PUT /modelName</a>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-updateall" class="external-link" rel="nofollow">updateAll()</a><sup>*</sup></code></td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>Delete (Destroy)</td>
      <td><a href="/doc/en/lb2/PersistedModel-REST-API.html#delete-model-instance">DELETE /<em>modelName</em>/<em>modelID</em></a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-destroybyid" class="external-link" rel="nofollow">destroyById()</a><sup>*</sup></code></td>
      <td>DELETE</td>
    </tr>
  </tbody>
</table>

(*) Methods listed are just prominent examples; other methods may provide similar functionality; for example: `findById()`, `findOne()`, and `findOrCreate()`. 

See [PersistedModel API documentation](http://apidocs.strongloop.com/loopback/#persistedmodel) for more information.

## Application logic

You can add custom application logic in several ways; you can:

* [Add application logic to models](/doc/{{page.lang}}/lb2/Adding-logic-to-models.html) through [remote methods](/doc/{{page.lang}}/lb2/Remote-methods.html) (custom REST endpoints),
  [remote hooks](/doc/{{page.lang}}/lb2/Remote-hooks.html) that are triggered by remote methods, and [operation hooks](/doc/{{page.lang}}/lb2/Operation-hooks.html) that are triggered by model create,
  retrieve, update, and delete methods.
* Add boot scripts that run when the application starts.
* Define custom [middleware](/doc/{{page.lang}}/lb2/Defining-middleware.html), similar to Express middleware.

You can add code to [validate data](/doc/{{page.lang}}/lb2/Validating-model-data.html) before saving it to the model and back-end data store.

### Middleware phases

_Middleware_ refers to functions executed when HTTP requests are made to REST endpoints. Since LoopBack is based on [Express](http://expressjs.com/),
LoopBack middleware is the same as [Express middleware](http://expressjs.com/en/guide/using-middleware.html).
However, LoopBack adds the concept of _phases_, to clearly define the order in which middleware is called.
Using phases helps to avoid ordering issues that can occur with standard Express middleware.

See [Defining middleware](/doc/{{page.lang}}/lb2/Defining-middleware.html) for more information.

## Data sources and connectors

{% include image.html file="9830484.png" alt="" %}

LoopBack generalizes backend services such as databases, REST APIs, SOAP web services, and storage services as _data sources_.

Data sources are backed by _connectors_ that then communicate directly with the database or other back-end service.
Applications don't use connectors directly, rather they go through data sources using the 
[DataSource](https://apidocs.strongloop.com/loopback-datasource-juggler/#datasource) and 
[PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel) APIs.

## LoopBack components

LoopBack components provide additional "plug-in" functionality:

* [Push notifications](/doc/{{page.lang}}/lb2/Push-notifications.html) -  enables sending information to mobile apps for immediate
  display in a "badge," alert, or pop-up message on the mobile device.
* [Storage component](/doc/{{page.lang}}/lb2/Storage-component.html) - enables uploading and downloading files to and from cloud storage providers
  (Amazon, Rackspace, Openstack, and Azure) as well as the server file system.
* [Third-party login](/doc/{{page.lang}}/lb2/Third-party-login-using-Passport.html) - integrates [Passport](http://passportjs.org/) and enables user login (and account linking)
  using third-party credentials from Facebook, Google, Twitter, Github, or any system that supports OAuth, OAuth 2, or OpenID.
* [Synchronization](/doc/{{page.lang}}/lb2/Synchronization.html) - enables mobile applications to operate offline and then synchronize
  data with the server application when reconnected.
* [OAuth 2.0](/doc/{{page.lang}}/lb2/OAuth-2.0.html) -  enables LoopBack applications to function as oAuth 2.0 providers to authenticate and
  authorize client applications and users to access protected API endpoints.
