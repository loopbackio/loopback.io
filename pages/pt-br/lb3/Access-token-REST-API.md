---
title: "Access token REST API"
lang: en
layout: navgroup
navgroup: access-control
keywords: LoopBack
tags: [authentication, models]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Access-token-REST-API.html
summary: The built-in access token model represents the access token that LoopBack creates for an authenticated user.
---
All of the endpoints in the access token REST API are inherited from the generic [PersistedModel REST API](PersistedModel-REST-API.html).
The reference is provided here for convenience.

<br clear="all"/>
**Quick reference**

<table>
  <tbody>
    <tr>
      <th>URI Pattern</th>
      <th>HTTP Verb</th>
      <th>Default Permission</th>
      <th width="200">Description</th>
      <th width="300">Arguments</th>
    </tr>
    <tr>
      <td><code>/accessTokens</code></td>
      <td>POST</td>
      <td>Allow</td>
      <td>
        <a href="PersistedModel-REST-API.html#create-model-instance">Add access token instance</a> and persist to data source.
      </td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/accessTokens</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#find-matching-instances">Find instances</a> of accessTokens that match specified filter.</td>
      <td>
        One or more filters in query parameters:
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
      <td><code>/accessTokens</code></td>
      <td>PUT</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#update--insert-instance">Update / insert access token instance</a> and persist to data source.</td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/accessTokens/<em>id</em></code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#find-instance-by-id">Find access token by ID</a>: Return data for the specified access token instance ID.</td>
      <td><em>id</em>, the access token instance ID (in URI path)</td>
    </tr>
    <tr>
      <td><code>/accessTokens/<em>id</em></code></td>
      <td>PUT</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#update-model-instance-attributes">Update attributes</a> for specified access token ID and persist.</td>
      <td>
        Query parameters:
        <ul>
          <li>data&nbsp;- An object containing property name/value pairs</li>
          <li><em>id</em>&nbsp;- The model id</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/accessTokens/<em>id</em></code></td>
      <td>DELETE</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#delete-model-instance">Delete access token</a> with specified instance ID.</td>
      <td><em>id</em>, access token ID<em> </em>(in URI path)</td>
    </tr>
    <tr>
      <td><code>/accessTokens/<em>id</em>/exists</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <a href="PersistedModel-REST-API.html#check-instance-existence">Check instance existence</a>: Return true if specified access token ID exists.
      </td>
      <td>
        URI path:
        <ul>
          <li><em>id</em> - Model instance ID</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/accessTokens/count</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <a href="PersistedModel-REST-API.html#get-instance-count">Return the number of access token instances</a>&nbsp;that matches specified where clause.
      </td>
      <td>Where filter specified in query parameter</td>
    </tr>
    <tr>
      <td><code>/accessTokens/findOne</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <a href="PersistedModel-REST-API.html#find-first-instance">Find first access token instance</a> that matches specified filter.
      </td>
      <td>Same as <a href="PersistedModel-REST-API.html#find-matching-instances">Find matching instances</a>.</td>
    </tr>
  </tbody>
</table>
