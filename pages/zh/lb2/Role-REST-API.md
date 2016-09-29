---
title: "Role REST API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Role-REST-API.html
summary:
---

All of the endpoints in the Role REST API are inherited from the generic [PersistedModel REST API](/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html).  The reference is provided here for convenience.

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
        <p><code>/roles</code></p>
        <div style="width:120px;">
          <p>&nbsp;</p>
        </div>
      </td>
      <td>POST</td>
      <td>Allow</td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Addmodelinstance" class="external-link" rel="nofollow">Add role instance</a> and persist to data source. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>.</p>
      </td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/roles</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Findmatchinginstances" class="external-link" rel="nofollow">Find all instances</a> of role that match specified filter. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
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
      <td><code>/roles</code></td>
      <td>PUT</td>
      <td>Deny</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Update/insertinstance" class="external-link" rel="nofollow">Update / insert role instance</a> and persist to data source. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/roles/<em>id</em></code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-FindinstancebyID" class="external-link" rel="nofollow">Find role by ID</a>: Return data for the specified role instance ID. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
      <td><em>id</em>, the role instance ID (in URI path)</td>
    </tr>
    <tr>
      <td><code>/roles/<em>id</em></code></td>
      <td>PUT</td>
      <td>Deny</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Updatemodelinstanceattributes" class="external-link" rel="nofollow">Update attributes</a> for specified role ID and persist. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
      <td>
        <p>Query parameters:</p>
        <ul>
          <li>data&nbsp;- An object containing property name/value pairs</li>
          <li><em>id</em>&nbsp;- The model id</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/roles/<em>id</em></code></td>
      <td>DELETE</td>
      <td>Deny</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Deletemodelinstance" class="external-link" rel="nofollow">Delete role</a> with specified instance ID. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
      <td><em>id</em>, role ID<em> </em>(in URI path)</td>
    </tr>
    <tr>
      <td><code>/roles/<em>id</em>/exists</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Checkinstanceexistence" class="external-link" rel="nofollow">Check instance existence</a>: Return true if specified role ID exists. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</p>
      </td>
      <td>
        <p>URI path:</p>
        <ul>
          <li><em>id</em> - Model instance ID</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/roles/count</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Getinstancecount" class="external-link" rel="nofollow">Return the number of role instances</a>&nbsp;that matches specified where clause. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>.</p>
      </td>
      <td>Where filter specified in query parameter</td>
    </tr>
    <tr>
      <td><code>/roles/findOne</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Findfirstinstance" class="external-link" rel="nofollow">Find first role instance</a> that matches specified filter. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</p>
      </td>
      <td>Same as <a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Findmatchinginstances" class="external-link" rel="nofollow">Find matching instances</a>.</td>
    </tr>
  </tbody>
</table>
