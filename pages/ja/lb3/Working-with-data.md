---
title: "Working with data"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Working-with-data.html
summary:
---

Once you have defined a model, then you can use create, read, update, and delete (CRUD) operations to add data to the model, manipulate the data, and query it.
All LoopBack models that are connected to persistent data stores (such as a database) automatically have the create, retrieve, update, and delete operations of the
[PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel-new-persistedmodel) class.

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>REST</th>
      <th>LoopBack model method<br>(Node API)&#42;</th>
      <th>Corresponding SQL<br>Operation</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>Create</td>
      <td>
        <a href="PersistedModel-REST-API.html#create-model-instance">PUT /<em>modelName</em></a>
        <br/><a href="PersistedModel-REST-API.html#update--insert-instance">POST /<em>modelName</em></a>
      </td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-create" class="external-link" rel="nofollow">create()</a><sup>&#42;</sup></code></td>
      <td>INSERT</td>
    </tr>
    <tr>
      <td>Read (Retrieve)</td>
      <td><a href="PersistedModel-REST-API.html#find-matching-instances">GET /<em>modelName</em>?filter=...</a></td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-find" class="external-link" rel="nofollow">find()</a><sup>&#42;</sup></code></td>
      <td>SELECT</td>
    </tr>
    <tr>
      <td>Update (Modify)</td>
      <td>
        <a href="PersistedModel-REST-API.html#update--insert-instance">POST /<em>modelName</em></a>
        <br/><a href="PersistedModel-REST-API.html#update-model-instance-attributes">PUT /<em>modelName</em></a>
      </td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-updateall" class="external-link" rel="nofollow">updateAll()</a><sup>&#42;</sup></code></td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>Delete (Destroy)</td>
      <td><a href="PersistedModel-REST-API.html#delete-model-instance">DELETE /<em>modelName</em>/<em>modelID</em></a></td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-destroybyid" class="external-link" rel="nofollow">destroyById()</a><sup>&#42;</sup></code></td>
      <td>DELETE</td>
    </tr>
  </tbody>
</table>

(&#42;) Methods listed are just prominent examples; other methods may provide similar functionality; for example: `findById()`, `findOne()`, and `findOrCreate()`. 
See [PersistedModel API documentation](http://apidocs.loopback.io/loopback/#persistedmodel) for more information.

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
