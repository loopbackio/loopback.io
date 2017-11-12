---
title: "データの操作"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Working-with-data.html
summary:
---

モデルを定義したら、作成・読取・更新・削除（CRUD）操作を使用して、モデルにデータを追加し、データを操作し、クエリを実行できます。
永続データストア（データベースなど）に接続されているすべてのLoopBackモデルは、自動的に[PersistedModel](http://apidocs.loopback.io/loopback/#persistedmodel-new-persistedmodel)クラスの作成・取得・更新・削除操作を行えます。

<table>
  <thead>
    <tr>
      <th>操作</th>
      <th>REST</th>
      <th>LoopBack モデルメソッド<br>(Node API)&#42;</th>
      <th>対応するSQL<br>操作</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>作成</td>
      <td>
        <a href="PersistedModel-REST-API.html#create-model-instance">PUT /<em>modelName</em></a>
        <br/><a href="PersistedModel-REST-API.html#update--insert-instance">POST /<em>modelName</em></a>
      </td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-create" class="external-link" rel="nofollow">create()</a><sup>&#42;</sup></code></td>
      <td>INSERT</td>
    </tr>
    <tr>
      <td>読取 (取得)</td>
      <td><a href="PersistedModel-REST-API.html#find-matching-instances">GET /<em>modelName</em>?filter=...</a></td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-find" class="external-link" rel="nofollow">find()</a><sup>&#42;</sup></code></td>
      <td>SELECT</td>
    </tr>
    <tr>
      <td>更新 (修正)</td>
      <td>
        <a href="PersistedModel-REST-API.html#update--insert-instance">POST /<em>modelName</em></a>
        <br/><a href="PersistedModel-REST-API.html#update-model-instance-attributes">PUT /<em>modelName</em></a>
      </td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-updateall" class="external-link" rel="nofollow">updateAll()</a><sup>&#42;</sup></code></td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>削除 (破壊)</td>
      <td><a href="PersistedModel-REST-API.html#delete-model-instance">DELETE /<em>modelName</em>/<em>modelID</em></a></td>
      <td><code><a href="http://apidocs.loopback.io/loopback/#persistedmodel-destroybyid" class="external-link" rel="nofollow">destroyById()</a><sup>&#42;</sup></code></td>
      <td>DELETE</td>
    </tr>
  </tbody>
</table>

記載されているメソッドは、著名な例です。他のメソッドも同様の機能を提供する可能性があります。例えば：`findById()`・`findOne()`・`findOrCreate()`など。
詳細については、[PersistedModel API 文書](http://apidocs.loopback.io/loopback/#persistedmodel)を参照してください。

詳細については、以下の記事を参照してください。

* [データの作成・更新・削除](Creating-updating-and-deleting-data.html)
* [データの検索](Querying-data.html)
  * [Fields フィルタ](Fields-filter.html)
  * [Include フィルタ](Include-filter.html)
  * [Limit フィルタ](Limit-filter.html)
  * [Order フィルタ](Order-filter.html)
  * [Skip フィルタ](Skip-filter.html)
  * [Where フィルタ](Where-filter.html)
* [データベーストランザクションの使用](Using-database-transactions.html)
* [Realtime server-sent events](Realtime-server-sent-events.html)

{% include content/ja/angular-methods-caveat.html %}
