---
title: "Email REST API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Email-REST-API.html
summary:
---

**Quick reference**

<table>
  <tbody>
    <tr>
      <th>
        <p>URI Pattern</p>
        <p>&nbsp;</p>
      </th>
      <th>HTTP Verb</th>
      <th>Default Permission</th>
      <th>Action</th>
      <th>Arguments</th>
    </tr>
    <tr>
      <td>
        <p><code>/foo/bar/baz</code></p>
        <div style="width:120px;">
          <p>&nbsp;</p>
        </div>
      </td>
      <td>
        <p>One of: GET, POST, PUT, DELETE</p>
      </td>
      <td>Allow / Deny</td>
      <td>
        <p>Description plus link to section with full reference.</p>
        <p>NOTE: Rand will add links to sections.</p>
      </td>
      <td>List arguments in POST body, query params, or path.</td>
    </tr>
  </tbody>
</table>

## Operation name

Brief description goes here.

`POST /_modelName_`

### **Arguments**

*   List of all arguments in POST data or query string

### **Example**

Request: 

```
curl -X POST -H "Content-Type:application/json"
-d '{... JSON ... }'
http://localhost:3000/foo
```

Response:

`// Response JSON`

### **Errors**

List error codes and return JSON format if applicable.
