---
title: "Application REST API"
lang: ja
layout: page
keywords: LoopBack
tags: models
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Application-REST-API.html
summary:
---
{% include content/API-Explorer.md %}

All of the endpoints in the Application REST API are inherited from the [PersistedModel REST API](PersistedModel-REST-API.html).
The reference is provided here for convenience.

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
        <p><code>/applications</code></p>
        <div style="width:120px;">
          <p>&nbsp;</p>
        </div>
      </td>
      <td>POST</td>
      <td>Allow</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#create-model-instance">Add application instance</a> and persist to data source.</p>
      </td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/applications</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#find-matching-instances">Find instances</a> of applications that match specified filter.</td>
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
      <td><code>/applications</code></td>
      <td>PUT</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#update--insert-instance">Update / insert application instance</a> and persist to data source.</td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/applications/<em>id</em></code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#find-instance-by-id">Find application by ID</a>: Return data for the specified application instance ID.</td>
      <td><em>id</em>, the application instance ID (in URI path)</td>
    </tr>
    <tr>
      <td><code>/applications/<em>id</em></code></td>
      <td>PUT</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#update-model-instance-attributes">Update attributes</a> for specified application ID and persist.</td>
      <td>
        <p>Query parameters:</p>
        <ul>
          <li>data&nbsp;- An object containing property name/value pairs</li>
          <li><em>id</em>&nbsp;- The model id</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/applications/<em>id</em></code></td>
      <td>DELETE</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#delete-model-instance">Delete application</a> with specified instance ID.</td>
      <td><em>id</em>, application ID<em> </em>(in URI path)</td>
    </tr>
    <tr>
      <td><code>/applications/<em>id</em>/exists</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#check-instance-existence">Check instance existence</a>: Return true if specified application ID exists.</p>
      </td>
      <td>
        <p>URI path:</p>
        <ul>
          <li><em>id</em> - Model instance ID</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/applications/count</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#get-instance-count">Return the number of application instances</a>&nbsp;that matches specified where clause.</p>
      </td>
      <td>Where filter specified in query parameter</td>
    </tr>
    <tr>
      <td><code>/applications/findOne</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#find-first-instance">Find first application instance</a> that matches specified filter.</p>
      </td>
      <td>Same as&nbsp;<a href="PersistedModel-REST-API.html#find-matching-instances">Find matching instances</a>.</td>
    </tr>
  </tbody>
</table>
