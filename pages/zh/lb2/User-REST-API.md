---
title: "User REST API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/User-REST-API.html
summary:
---

{% include note.html content="

You can use the **[StrongLoop API Explorer](https://docs.strongloop.com/pages/viewpage.action?pageId=6095009)** to quickly construct and make requests to a LoopBack app running on the server. If a LoopBack app is running on `localhost` at port `3000`, you can find the API Explorer at [http://localhost:3000/explorer/](http://localhost:3000/explorer/).

" %}

All of the endpoints in the table below are inherited from [PersistedModel REST API](/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html), except for the following:

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
        <p><code><span>/</span>users</code></p>
        <div style="width:120px;">
          <p>&nbsp;</p>
        </div>
      </td>
      <td>POST</td>
      <td>Allow</td>
      <td>
        <p><a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Addmodelinstance">Add user instance</a> and persist to data source. Inherited from <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">PersistedModel API</a>.</p>
      </td>
      <td>
        <p><span>JSON object (in request body) providing <a href="http://apidocs.strongloop.com/loopback/#user" class="external-link" rel="nofollow">User object properties</a>: <code>username</code>, <code>password</code>, <code>email</code>. LoopBack sets values for <code>emailVerified</code> and<span style="font-family: monospace;">&nbsp;</span><code>verificationToken</code>.</span>
        </p>
        <p><span>NOTE: A value for <code>username</code> is not required, but a value for <code>email</code> is. LoopBack validates a unique value for <code>password</code> is provided. LoopBack does not automatically maintain v<span>alues of the <code>created</code> and <code>lastUpdated</code> properties; you can set them manually if you wish.</span></span>
        </p>
      </td>
    </tr>
    <tr>
      <td><code>/users</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Findmatchinginstances">Find matching instances</a> of users that match specified filter. <span>Inherited from <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">PersistedModel API</a><span>.</span></span>
      </td>
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
      <td><code>/users</code></td>
      <td>PUT</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Update/insertinstance">Update / insert user instance</a> and persist to data source. <span>Inherited from <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">PersistedModel API</a><span>.</span></span>
      </td>
      <td>
        <p>JSON object (in request body)</p>
        <p>Same as for <code>POST /users</code></p>
      </td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em></code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-FindinstancebyID">Find user by ID</a>: Return data for the specified user ID. <span>Inherited from <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">PersistedModel API</a><span>.</span></span>
      </td>
      <td><span><em>id</em>, the user ID</span><span> (in URI path)</span></td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em></code></td>
      <td>PUT</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Updatemodelinstanceattributes">Update user attributes</a> for specified user ID and persist. <span>Inherited from <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">PersistedModel API</a><span>.</span></span>
      </td>
      <td>
        <p>Query parameters:</p>
        <ul>
          <li>data&nbsp;An object containing property name/value pairs</li>
          <li><em>id</em>&nbsp;The model id</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em></code></td>
      <td>DELETE</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html#PersistedModelRESTAPI-Deletemodelinstance">Delete user</a> with specified instance ID. <span>Inherited from <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">PersistedModel API</a><span>.</span></span>
      </td>
      <td><em>id</em>, user ID<em> </em><span>(in URI path)</span></td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em>/accessTokens</code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td>Returns access token for specified user ID.</td>
      <td>
        <ul>
          <li><em>id</em>, user ID, in URI path</li>
          <li>where in query parameters</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code><span>/users/<em>id</em>/accessTokens</span></code></td>
      <td>POST</td>
      <td><span>Deny</span></td>
      <td>Create access token for specified user ID.</td>
      <td>
        <p><em>id</em><span>, user ID, in URI path</span></p>
      </td>
    </tr>
    <tr>
      <td><code><span>/users/<em>id</em>/accessTokens</span></code></td>
      <td>DELETE</td>
      <td><span>Deny</span></td>
      <td>Delete access token for specified user ID.</td>
      <td>
        <p><em>id</em><span>, user ID, in URI path</span></p>
      </td>
    </tr>
    <tr>
      <td><code>/users/confirm</code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td><a href="/doc/{{page.lang}}/lb2/User-REST-API.html">Confirm email address</a> for specified user.</td>
      <td>
        <p>Query parameters:</p>
        <ul>
          <li>uid</li>
          <li>token</li>
          <li>redirect</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/users/count</code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Getinstancecount" class="external-link" rel="nofollow">Return number of user instances</a>&nbsp;that match specified where clause. <span>Inherited from <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">PersistedModel API</a><span>.</span></span>
        </p>
      </td>
      <td>"Where" filter specified in query parameter</td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em>/exists</code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Checkinstanceexistence" class="external-link" rel="nofollow">Check instance existence</a>: Return true if specified user ID exists. <span>Inherited from <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">PersistedModel API</a><span>.</span></span>
        </p>
      </td>
      <td>
        <p>URI path:</p>
        <ul>
          <li><em>users</em> - Model name</li>
          <li><em>id</em> - Model instance ID</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/users/findOne</code></td>
      <td>GET</td>
      <td><span>Deny</span></td>
      <td>
        <p><a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Findfirstinstance" class="external-link" rel="nofollow">Find first user instance</a> that matches specified filter. <span>Inherited from <a href="/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html">PersistedModel API</a><span>.</span></span>
        </p>
      </td>
      <td>Same as <a href="http://docs.strongloop.com/display/DOC/Model+REST+API#ModelRESTAPI-Findmatchinginstances" class="external-link" rel="nofollow">Find matching instances</a>.</td>
    </tr>
    <tr>
      <td>
        <p><code>/users/login?include=user</code></p>
        <p>&nbsp;</p>
      </td>
      <td>
        <p><span>POST</span></p>
      </td>
      <td><span>Allow</span></td>
      <td>
        <p><a href="/doc/{{page.lang}}/lb2/User-REST-API.html">Log in</a> the specified user.</p>
      </td>
      <td>
        <p>Username and password in POST body.</p>
        <p>If query parameter is <code>include=user</code>, then return the user object.</p>
      </td>
    </tr>
    <tr>
      <td><pre>/users/logout</pre></td>
      <td>POST</td>
      <td><span>Allow</span></td>
      <td><a href="/doc/{{page.lang}}/lb2/User-REST-API.html">Log out</a> the specified user.</td>
      <td>Access token in POST body.</td>
    </tr>
    <tr>
      <td><code>/users/reset</code></td>
      <td>POST</td>
      <td>&nbsp;</td>
      <td><a href="/doc/{{page.lang}}/lb2/User-REST-API.html">Reset password</a> for the specified user.</td>
      <td>In POST body</td>
    </tr>
  </tbody>
</table>

## Log in user

`POST `/users/login``

You must provide a username or an email, and the password in the request body. To ensure these values are encrypted, include these as part of the body and make sure you are serving your app over HTTPS (through a proxy or using the HTTPS node server).

You may also specify how long you would like the access token to be valid by providing a `ttl` (time to live) property with value in **milliseconds**. 

### Example

**Request URL**:   `POST  http://localhost:3000/users/login`

**Request body**:```js
{
    "email": "foo@bar.com",
    "password": "bar",
    "ttl": 1209600000
  }
```

**Response status code**: `200`

**Response body**:```js
{
  "id": "PqosmmPCdQgwerDYwQcVCxMakGQV0BSUwG4iGVLvD3XUYZRQky1cmG8ocmzsVpEE",
  "ttl": 1209600,
  "created": "2014-12-23T08:31:33.464Z",
  "userId": 1
}
```

The access token for the user's session is returned in the `id` key of the response. It must be specified in the query parameter `access_token` for all the APIs that requires the user to be logged in. For example:

`http://localhost:3000/api/Users/logout?access_token=PqosmmPCdQgwerDYwQcVCxMakGQV0BSUwG4iGVLvD3XUYZRQky1cmG8ocmzsVpEE`.

## Log out user

`POST  `/users/logout``

### **Example**

**Request URL**:   `POST  http://localhost:3000/api/Users/logout?access_token=PqosmmPCdQgwerDYwQcVCxMakGQV0BSUwG4iGVLvD3XUYZRQky1cmG8ocmzsVpEE.`

**Response status code**: `204`

## Confirm email address

Require a user to verify their email address before being able to login. This will send an email to the user containing a link to verify their address. Once the user follows the link they will be redirected to web root ("`/")` and will be able to login normally.

`GET /users/confirm`

### Parameters

Query parameters:

*   uid
*   token
*   redirect

### Return value

If token invalid: HTTP 400

If user not found: HTTP 404

If successful: HTTP 204

## Reset password

``POST  /users/reset``

**Parameters**

POST payload:

```js
{
    "email": "foo@bar.com"
  }
  ...
```

**Return value**

`200 OK`

You must the handle the '`resetPasswordRequest'` event to send a reset email containing an access token to the correct user.

The example below shows how to get an access token that a user can use to reset their password. 

**common/models/user.js**

```js
User.on('resetPasswordRequest', function(info) {
  console.log(info.email); // the email of the requested user
  console.log(info.accessToken.id); // the temp access token to allow password reset

  // requires AccessToken.belongsTo(User)
  info.accessToken.user(function(err, user) {
    console.log(user); // the actual user
  });
});
```

See also [Verifying email addresses](/doc/{{page.lang}}/lb2/Registering-users.html#Registeringusers-Verifyingemailaddresses) (Registering users).
