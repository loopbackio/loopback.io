---
title: "Access token REST API"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Access-token-REST-API.html
summary:
---

{% include tip.html content="
For information on access control for related models, see [Accessing related models](/doc/en/lb2/Accessing-related-models.html)
" %}

All of the endpoints in the access token REST API are inherited from the generic [PersistedModel REST API](/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html).
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
        <p><code>/accessTokens</code></p>
        <div style="width:120px;">
          <p>&nbsp;</p>
        </div>
      </td>
      <td>POST</td>
      <td>Allow</td>
      <td>
        <p><a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Createmodelinstance">Add access token instance</a> and persist to data source.</p>
      </td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/accessTokens</code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Findmatchinginstances">Find instances</a> of accessTokens that match specified filter.</td>
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
      <td><code>/accessTokens</code></td>
      <td>PUT</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Update/insertinstance">Update / insert access token instance</a> and persist to data source.</td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/accessTokens/<em>id</em></code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-FindinstancebyID">Find access token by ID</a>: Return data for the specified access token instance ID.</td>
      <td><em>id</em>, the access token instance ID (in URI path)</td>
    </tr>
    <tr>
      <td><code>/accessTokens/<em>id</em></code></td>
      <td>PUT</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Updatemodelinstanceattributes">Update attributes</a> for specified access token ID and persist.</td>
      <td>
        <p>Query parameters:</p>
        <ul>
          <li>data&nbsp;- An object containing property name/value pairs</li>
          <li><em>id</em>&nbsp;- The model id</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/accessTokens/<em>id</em></code></td>
      <td>DELETE</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Deletemodelinstance">Delete access token</a> with specified instance ID.</td>
      <td><em>id</em>, access token ID<em> </em>(in URI path)</td>
    </tr>
    <tr>
      <td><code>/accessTokens/<em>id</em>/exists</code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td>
        <p><a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Checkinstanceexistence">Check instance existence</a>: Return true if specified access token ID exists.</p>
      </td>
      <td>
        <p>URI path:</p>
        <ul>
          <li><em>id</em> - Model instance ID</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/accessTokens/count</code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td>
        <p><a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Getinstancecount">Return the number of access token instances</a>&nbsp;that matches specified where clause.</p>
      </td>
      <td>Where filter specified in query parameter</td>
    </tr>
    <tr>
      <td><code>/accessTokens/findOne</code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td>
        <p><a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Findfirstinstance">Find first access token instance</a> that matches specified filter.</p>
      </td>
      <td>Same as<span>&nbsp;<a href="/doc/en/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Findmatchinginstances">Find matching instances</a>.</span></td>
    </tr>
  </tbody>
</table>
