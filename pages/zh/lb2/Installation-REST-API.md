---
title: "Installation REST API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Installation-REST-API.html
summary:
---

All of the endpoints in the table below are inherited from [PersistedModel REST API](/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html), except for the following:

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
      <th>Description</th>
      <th>Arguments</th>
    </tr>
    <tr>
      <td>
        <p><code>/Installations/byApp</code></p>
        <div style="width:120px;">
          <p>&nbsp;</p>
        </div>
      </td>
      <td>
        <p>GET</p>
      </td>
      <td>&nbsp;</td>
      <td>
        <p><a href="/doc/{{page.lang}}/lb2/Installation-REST-API.html">Find installations by app ID</a></p>
      </td>
      <td>
        <p>Query parameters:</p>
        <ul>
          <li>deviceType</li>
          <li>appID</li>
          <li>appVersion</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>/Installations/byUser</code></p>
        <p>&nbsp;</p>
      </td>
      <td>
        <p>GET</p>
      </td>
      <td>&nbsp;</td>
      <td>
        <p><a href="/doc/{{page.lang}}/lb2/Installation-REST-API.html">Find installations by user ID</a></p>
      </td>
      <td>
        <p>Query parameters:</p>
        <ul>
          <li>deviceType</li>
          <li>userId</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        <p><code>/Installations&nbsp;</code></p>
        <p>&nbsp;</p>
      </td>
      <td>POST</td>
      <td>&nbsp;</td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Addmodelinstance" class="external-link" rel="nofollow">Add installation instance</a> and persist to data source. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>.</p>
      </td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/Installations</code></td>
      <td>GET</td>
      <td>&nbsp;</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Findmatchinginstances" class="external-link" rel="nofollow">Find all instances</a> of installations that match specified filter. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
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
      <td><code>/Installations</code></td>
      <td>PUT</td>
      <td>&nbsp;</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Update/insertinstance" class="external-link" rel="nofollow">Update / insert <span>installation</span> instance</a> and persist to data source. Inherited from generic
        <a
          href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
      <td>JSON object (in request body)</td>
    </tr>
    <tr>
      <td><code>/Installations/<em>id</em></code></td>
      <td>GET</td>
      <td>&nbsp;</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-FindinstancebyID" class="external-link" rel="nofollow">Find <span>installation</span> by ID</a>: Return data for the specified instance ID. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
      <td><em>id</em>, the installation ID (in URI path)</td>
    </tr>
    <tr>
      <td><code>/Installations/<em>id</em></code></td>
      <td>PUT</td>
      <td>&nbsp;</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Updatemodelinstanceattributes" class="external-link" rel="nofollow">Update installation attributes</a> for specified <span>installation</span> ID and persist. Inherited
        from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
      <td>
        <p>Query parameters:</p>
        <ul>
          <li>data&nbsp;An object containing property name/value pairs</li>
          <li><em>id</em>&nbsp;- The installation ID</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/Installations/<em>id</em></code></td>
      <td>DELETE</td>
      <td>&nbsp;</td>
      <td><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Deletemodelinstance" class="external-link" rel="nofollow">Delete <span>installation</span></a> with specified instance ID. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</td>
      <td><em>id</em>, installation ID<em> </em>(in URI path)</td>
    </tr>
    <tr>
      <td><code>/Installations/count</code></td>
      <td>GET</td>
      <td>&nbsp;</td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Getinstancecount" class="external-link" rel="nofollow">Return number of <span>installation</span> instances</a>&nbsp;that match specified where clause. Inherited from
          generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>.</p>
      </td>
      <td>Query parameter: "where" filter.</td>
    </tr>
    <tr>
      <td><code>/Installations/<em>id</em>/exists</code></td>
      <td>GET</td>
      <td>&nbsp;</td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Checkinstanceexistence" class="external-link" rel="nofollow">Check instance existence</a>: Return true if specified user ID exists. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</p>
      </td>
      <td>
        <p>URI path: <em style="line-height: 1.4285715;">id</em> installation ID</p>
      </td>
    </tr>
    <tr>
      <td><code>/Installations/findOne</code></td>
      <td>GET</td>
      <td>&nbsp;</td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Findfirstinstance" class="external-link" rel="nofollow">Find first <span>installation</span> instance</a> that matches specified filter. Inherited from generic <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">model API</a>&nbsp;.</p>
      </td>
      <td>Same as <a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Findmatchinginstances" class="external-link" rel="nofollow">Find matching instances</a>.</td>
    </tr>
  </tbody>
</table>

## Find installations by app ID

Return JSON array of installations of specified app ID that also match the additional specified arguments (if any).

`GET /Installations/byApp`

### Arguments

All arguments are in query string:

*   deviceType
*   appId
*   appVersion

### **Example**

Request: 

```
curl -X GET
http://localhost:3000/Installation/byApp?appId=KrushedKandy&deviceType=ios
```

Response:

```js
[{
    "id": "1",
    "appId": "KrushedKandy",
    "userId": "raymond",
    "deviceType": "ios",
    "deviceToken": "756244503c9f95b49d7ff82120dc193ca1e3a7cb56f60c2ef2a19241e8f33305",
    "subscriptions": [],
    "created": "2014-01-09T23:18:57.194Z",
    "modified": "2014-01-09T23:18:57.194Z"
  },
  ...
]
```

### **Errors**

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>What are error codes?</div>

## Find installations by user ID

Return JSON array of installations by specified user ID that also match the additional specified argument (if provided).

`GET /Installations/byUser`

### Arguments

Argumens are in query string:

*   deviceType
*   userId

### **Example**

Request: 

```
curl -X GET
http://localhost:3000/Installations/byUser?userId=raymond
```

Response:

```js
[{
  "id": "1",
  "appId": "MyLoopBackApp",
  "userId": "raymond",
  "deviceType": "ios",
  "deviceToken": "756244503c9f95b49d7ff82120dc193ca1e3a7cb56f60c2ef2a19241e8f33305",
  "subscriptions": [],
  "created": "2014-01-09T23:18:57.194Z",
  "modified": "2014-01-09T23:18:57.194Z"
}]
```

### Errors

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>What are error codes?</div>
