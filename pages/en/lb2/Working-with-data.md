---
title: "Working with data"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Working-with-data.html
summary:
---

Once you have defined a model, then you can use create, read, update, and delete (CRUD) operations to add data to the model, manipulate the data, and query it.
All LoopBack models that are connected to persistent data stores (such as a database) automatically have the create, retrieve, update, and delete operations of the
[PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel-new-persistedmodel) class.

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
        <p><a href="PersistedModel-REST-API.html#create-model-instance">PUT /<em>modelName</em></a></p>
        <p><a href="PersistedModel-REST-API.html#update--insert-instance">POST /<em>modelName</em></a></p>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-create" class="external-link" rel="nofollow">create()</a><sup>*</sup></code></td>
      <td>INSERT</td>
    </tr>
    <tr>
      <td>Read (Retrieve)</td>
      <td><a href="PersistedModel-REST-API.html#find-matching-instances">GET /modelName?filter=...</a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-find" class="external-link" rel="nofollow">find()</a><sup>*</sup></code></td>
      <td>SELECT</td>
    </tr>
    <tr>
      <td>Update (Modify)</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#update--insert-instance">POST /<em>modelName</em></a>&nbsp;</p>
        <p><a href="PersistedModel-REST-API.html#update-model-instance-attributes">PUT /modelName</a></p>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-updateall" class="external-link" rel="nofollow">updateAll()</a><sup>*</sup></code></td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>Delete (Destroy)</td>
      <td><a href="PersistedModel-REST-API.html#delete-model-instance">DELETE /<em>modelName</em>/<em>modelID</em></a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-destroybyid" class="external-link" rel="nofollow">destroyById()</a><sup>*</sup></code></td>
      <td>DELETE</td>
    </tr>
  </tbody>
</table>

(*) Methods listed are just prominent examples; other methods may provide similar functionality; for example: `findById()`, `findOne()`, and `findOrCreate()`. 
See [PersistedModel API documentation](http://apidocs.strongloop.com/loopback/#persistedmodel) for more information.

See the following articles for more information:

* [Creating, updating, and deleting data](Creating-updating-and-deleting-data.html)
* [Querying data](Querying-data.html)
  * [Fields filter](Fields-filter.html)
  * [Include filter](Include-filter.html)
  * [Limit filter](Limit-filter.html)
  * [Order filter](Order-filter.html)
  * [Skip filter](Skip-filter.html)
  * [Where filter](Where-filter.html)
* [Using database transactions](Using-database-transactions.html)
* [Realtime server-sent events](Realtime-server-sent-events.html)

{% include content/angular-methods-caveat.html lang=page.lang %}
