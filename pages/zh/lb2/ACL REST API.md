---
title: "ACL REST API"
lang: zh
layout: page
keywords: LoopBack
tags: [authentication, models]
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/ACL-REST-API.html
summary: ACL模型连接规则与受保护的资源. 系统将权限授予 principals (users 或者 applications, 都能被归属到 roles).
---

{% include content/API-Explorer.md %}

所有端点的ACL REST API都继承了PersistedModel REST API(PersistedModel-REST-API.html)。这里提供的引用是为了方便。

默认情况下,ACL REST API不暴露。models.json可以暴露出它,添加以下:

```javascript
"acl": {
  "public": true,
  "options": {
    "base": "ACL"
  },
  "dataSource": "db"
}
```

**快速指引**

<table>
  <tbody>
    <tr>
      <th>
        <p>URI Pattern</p>
      </th>
      <th>HTTP Verb</th>
      <th>默认</th>
      <th>Description</th>
      <th>Arguments</th>
    </tr>
    <tr>
      <td>
        <p><code>/acls</code></p>
        <div style="width:120px;">
          <p>&nbsp;</p>
        </div>
      </td>
      <td>POST</td>
      <td>允许</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#create-model-instance">Add ACL instance</a><span> and persist to data source.</span></p>
      </td>
      <td>JSON 对象 (in request body)</td>
    </tr>
    <tr>
      <td><code>/acls</code></td>
      <td>GET</td>
      <td>拒绝</td>
      <td><a href="PersistedModel-REST-API.html#find-matching-instances">Find instances</a><span> of ACLs that match specified filter.</span></td>
      <td>
        <p>查询参数中一个或多个筛选条件 :</p>
        <ul>
          <li>where</li>
          <li>include</li>
          <li>order</li>
          <li>limit</li>
          <li>skip / offset</li>
          <li>fields</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/acls</code></td>
      <td>PUT</td>
      <td>拒绝</td>
      <td><a href="PersistedModel-REST-API.html#update--insert-instance">Update / insert ACL instance</a><span> and persist to data source.</span></td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/acls/<em>id</em></code></td>
      <td>GET</td>
      <td>拒绝</td>
      <td><a href="PersistedModel-REST-API.html#find-instance-by-id">Find ACL by ID</a><span>: Return data for the specified ACL instance ID.</span></td>
      <td><em>id</em>,  ACL 实例ID  (in URI path)</td>
    </tr>
    <tr>
      <td><code>/acls/<em>id</em></code></td>
      <td>PUT</td>
      <td>拒绝</td>
      <td><a href="PersistedModel-REST-API.html#update-model-instance-attributes">Update attributes</a><span> for specified ACL ID and persist.</span></td>
      <td>
        <p>查询 参数:</p>
        <ul>
          <li>data&nbsp;- An object containing property name/value pairs</li>
          <li><em>id</em>&nbsp;- The model id</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/acls/<em>id</em></code></td>
      <td>DELETE</td>
      <td>拒绝</td>
      <td><a href="PersistedModel-REST-API.html#delete-model-instance">Delete ACL</a><span> with specified instance ID.</span></td>
      <td><em>id</em>, acls ID<em> </em>(in URI path)</td>
    </tr>
    <tr>
      <td><code>/acls/<em>id</em>/exists</code></td>
      <td>GET</td>
      <td>拒绝</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#check-instance-existence">检查实例是否存在</a><span>: 如果存在,返回 true .</span></p>
      </td>
      <td>
        <p>URI path:</p>
        <ul>
          <li><em>id</em> - Model 实例 ID</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/acls/count</code></td>
      <td>GET</td>
      <td>拒绝</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#get-instance-count">Return the number of ACL instances</a><span>&nbsp;that matches specified where clause.</span></p>
      </td>
      <td>Where  查询条件</td>
    </tr>
    <tr>
      <td><code>/acls/findOne</code></td>
      <td>GET</td>
      <td>拒绝</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#find-first-instance">Find first ACL instance</a><span> that matches specified filter.</span></p>
      </td>
      <td>Same as <a href="PersistedModel-REST-API.html#find-matching-instances">Find matching instances</a>.</td>
    </tr>
  </tbody>
</table>
