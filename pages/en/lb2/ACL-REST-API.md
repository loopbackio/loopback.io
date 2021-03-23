---
title: "ACL REST API"
lang: en
layout: page
keywords: LoopBack
tags: [authentication, models]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/ACL-REST-API.html
summary: The ACL model connects principals to protected resources. The system grants permissions to principals (users or applications, that can be grouped into roles).
---

{% include content/API-Explorer.md %}

All of the endpoints in the ACL REST API are inherited from the [PersistedModel REST API](PersistedModel-REST-API.html).
The reference is provided here for convenience.

By default, the ACL REST API is not exposed. To expose it, add the following to models.json:

```javascript
"acl": {
  "public": true,
  "options": {
    "base": "ACL"
  },
  "dataSource": "db"
}
```

**Quick reference**

<table>
  <tbody>
    <tr>
      <th>
        <p>URI Pattern</p>
      </th>
      <th>HTTP Verb</th>
      <th>Default Permission</th>
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
      <td>Allow</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#create-model-instance">Add ACL instance</a><span> and persist to data source.</span></p>
      </td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/acls</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#find-matching-instances">Find instances</a><span> of ACLs that match specified filter.</span></td>
      <td>
        <p>One or more filters in query parameters:</p>
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
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#update--insert-instance">Update / insert ACL instance</a><span> and persist to data source.</span></td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/acls/<em>id</em></code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#find-instance-by-id">Find ACL by ID</a><span>: Return data for the specified ACL instance ID.</span></td>
      <td><em>id</em>, the ACL instance ID (in URI path)</td>
    </tr>
    <tr>
      <td><code>/acls/<em>id</em></code></td>
      <td>PUT</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#update-model-instance-attributes">Update attributes</a><span> for specified ACL ID and persist.</span></td>
      <td>
        <p>Query parameters:</p>
        <ul>
          <li>data&nbsp;- An object containing property name/value pairs</li>
          <li><em>id</em>&nbsp;- The model id</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/acls/<em>id</em></code></td>
      <td>DELETE</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#delete-model-instance">Delete ACL</a><span> with specified instance ID.</span></td>
      <td><em>id</em>, acls ID<em> </em>(in URI path)</td>
    </tr>
    <tr>
      <td><code>/acls/<em>id</em>/exists</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#check-instance-existence">Check instance existence</a><span>: Return true if specified ACL ID exists.</span></p>
      </td>
      <td>
        <p>URI path:</p>
        <ul>
          <li><em>id</em> - Model instance ID</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/acls/count</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#get-instance-count">Return the number of ACL instances</a><span>&nbsp;that matches specified where clause.</span></p>
      </td>
      <td>Where filter specified in query parameter</td>
    </tr>
    <tr>
      <td><code>/acls/findOne</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#find-first-instance">Find first ACL instance</a><span> that matches specified filter.</span></p>
      </td>
      <td>Same as <a href="PersistedModel-REST-API.html#find-matching-instances">Find matching instances</a>.</td>
    </tr>
  </tbody>
</table>
