---
title: "Working with data"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Working-with-data.html
summary:
---

Once you have defined a model, then you can use create, read, update, and delete (CRUD) operations to add data to the model, manipulate the data, and query it.  All LoopBack models that are connected to persistent data stores (such as a database) automatically have the CRUD operations of the [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel-new-persistedmodel) class.

<table>
  <tbody>
    <tr>
      <th>操作</th>
      <th>REST</th>
      <th>LoopBack model method<br>(Node API)*</th>
      <th>对应的SQL操作</th>
    </tr>
    <tr>
      <td>Create</td>
      <td>
        <p><a href="https://docs.strongloop.com/display/zh/PersistedModel+REST+API#PersistedModelRESTAPI-Createmodelinstance">PUT /<em>modelName</em></a></p>
        <p><a href="https://docs.strongloop.com/display/zh/PersistedModel+REST+API#PersistedModelRESTAPI-Update/insertinstance">POST /<em>modelName</em></a></p>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-create" class="external-link" rel="nofollow">create()</a><sup>*</sup></code></td>
      <td>INSERT</td>
    </tr>
    <tr>
      <td>Read (Retrieve)</td>
      <td><a href="https://docs.strongloop.com/display/zh/PersistedModel+REST+API#PersistedModelRESTAPI-Findmatchinginstances">GET /modelName?filter=...</a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-find" class="external-link" rel="nofollow">find()</a><sup>*</sup></code></td>
      <td>SELECT</td>
    </tr>
    <tr>
      <td>Update (Modify)</td>
      <td>
        <p><a href="https://docs.strongloop.com/display/zh/PersistedModel+REST+API#PersistedModelRESTAPI-Update/insertinstance">POST /<em>modelName</em></a>&nbsp;</p>
        <p><a href="https://docs.strongloop.com/display/zh/PersistedModel+REST+API#PersistedModelRESTAPI-Updatemodelinstanceattributes">PUT /modelName</a></p>
      </td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-updateall" class="external-link" rel="nofollow">updateAll()</a><sup>*</sup></code></td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>Delete (Destroy)</td>
      <td><a href="https://docs.strongloop.com/display/zh/PersistedModel+REST+API#PersistedModelRESTAPI-Deletemodelinstance">DELETE /<em>modelName</em>/<em>modelID</em></a></td>
      <td><code><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-destroyall" class="external-link" rel="nofollow">destroyAll()</a><sup>*</sup></code></td>
      <td>DELETE</td>
    </tr>
  </tbody>
</table>

*Methods listed are just prominent examples; other methods may provide similar functionality; for example, in addition to `find()`, there are also `findById()`, `findOne()`, and `findOrCreate()`. 

See the following articles for more information:

*   [创建，更新，删除数据](/doc/{{page.lang}}/lb2/6095120.html)
*   [Querying data](/doc/{{page.lang}}/lb2/Querying-data.html)
    *   [fields（字段）过滤器](/doc/{{page.lang}}/lb2/6095114.html)
    *   [Include（加载导航属性）过滤器](/doc/{{page.lang}}/lb2/6095115.html)
    *   [Limit（返回结果数限制）过滤器](/doc/{{page.lang}}/lb2/6095117.html)
    *   [Order（排序）过滤器](/doc/{{page.lang}}/lb2/6095116.html)
    *   [Skip过滤器](/doc/{{page.lang}}/lb2/6095119.html)
    *   [Where过滤器](/doc/{{page.lang}}/lb2/6095118.html)
*   [使用数据库事务](/doc/{{page.lang}}/lb2/8880487.html)

{% include warning.html content="

Methods of models in the [AngularJS client](https://docs.strongloop.com/display/zh/AngularJS+JavaScript+SDK) have a different signature than those of the Node API. For more information, see [AngularJS SDK API](http://apidocs.strongloop.com/loopback-sdk-angular/).

" %}
