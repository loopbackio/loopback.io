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
        <p><a href="https://docs.strongloop.com/display/APIC/PersistedModel+REST+API#PersistedModelRESTAPI-Createmodelinstance">PUT /<em>modelName</em></a></p>
        <p><a href="https://docs.strongloop.com/display/APIC/PersistedModel+REST+API#PersistedModelRESTAPI-Update/insertinstance">POST /<em>modelName</em></a></p>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-create" class="external-link" rel="nofollow">create()</a><sup>*</sup></code></td>
      <td>INSERT</td>
    </tr>
    <tr>
      <td>Read (Retrieve)</td>
      <td><a href="https://docs.strongloop.com/display/APIC/PersistedModel+REST+API#PersistedModelRESTAPI-Findmatchinginstances">GET /modelName?filter=...</a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-find" class="external-link" rel="nofollow">find()</a><sup>*</sup></code></td>
      <td>SELECT</td>
    </tr>
    <tr>
      <td>Update (Modify)</td>
      <td>
        <p><a href="https://docs.strongloop.com/display/APIC/PersistedModel+REST+API#PersistedModelRESTAPI-Update/insertinstance">POST /<em>modelName</em></a>&nbsp;</p>
        <p><a href="https://docs.strongloop.com/display/APIC/PersistedModel+REST+API#PersistedModelRESTAPI-Updatemodelinstanceattributes">PUT /modelName</a></p>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-updateall" class="external-link" rel="nofollow">updateAll()</a><sup>*</sup></code></td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>Delete (Destroy)</td>
      <td><a href="https://docs.strongloop.com/display/APIC/PersistedModel+REST+API#PersistedModelRESTAPI-Deletemodelinstance">DELETE /<em>modelName</em>/<em>modelID</em></a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-destroybyid" class="external-link" rel="nofollow">destroyById()</a><sup>*</sup></code></td>
      <td>DELETE</td>
    </tr>
  </tbody>
</table>

(*) Methods listed are just prominent examples; other methods may provide similar functionality; for example: `findById()`, `findOne()`, and `findOrCreate()`. 
See [PersistedModel API documentation](http://apidocs.strongloop.com/loopback/#persistedmodel) for more information.

See the following articles for more information:

* [Creating, updating, and deleting data](/doc/en/lb2/Creating-updating-and-deleting-data.html)
* [Querying data](/doc/en/lb2/Querying-data.html)
  * [Fields filter](/doc/en/lb2/Fields-filter.html)
  * [Include filter](/doc/en/lb2/Include-filter.html)
  * [Limit filter](/doc/en/lb2/Limit-filter.html)
  * [Order filter](/doc/en/lb2/Order-filter.html)
  * [Skip filter](/doc/en/lb2/Skip-filter.html)
  * [Where filter](/doc/en/lb2/Where-filter.html)
* [Using database transactions](/doc/en/lb2/Using-database-transactions.html)
* [Realtime server-sent events](/doc/en/lb2/Realtime-server-sent-events.html)

{% include warning.html content="

Methods of models in the [AngularJS client](https://docs.strongloop.com/display/APIC/AngularJS+JavaScript+SDK) have a different signature than those of the Node API.
For more information, see [AngularJS SDK API](http://apidocs.strongloop.com/loopback-sdk-angular/).

" %}