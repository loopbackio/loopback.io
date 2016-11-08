---
title: "User REST API"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: models
sidebar: lb2_sidebar
permalink: /doc/en/lb2/User-REST-API.html
summary: The built-in User model represents an application end-user.
---

{% include content/API-Explorer.md %}

All of the endpoints in the table below are inherited from [PersistedModel REST API](PersistedModel-REST-API.html), except for the following:

- [Log in user](#log-in-user) - `POST /users/login`
- [Log out user](#log-out-user) - `POST /users/logout`
- [Confirm email address](#confirm-email-address) - `GET /users/confirm`
- [Reset password](#reset-password) - `POST /users/reset`

**Quick reference**

<table>
  <tbody>
    <tr>
      <th>URI Pattern</th>
      <th>HTTP Verb</th>
      <th>Default Permission</th>
      <th>Description</th>
      <th style="width:300px;">Arguments</th>
    </tr>
    <tr>
      <td><code>/users</code></td>
      <td>POST</td>
      <td>Allow</td>
      <td>
        <p><a href="PersistedModel-REST-API.html#create-model-instance">Add user instance</a> and persist to data source. Inherited from <a href="PersistedModel-REST-API.html">PersistedModel API</a>.</p>
      </td>
      <td>
        <p>JSON object (in request body) providing <a href="http://apidocs.strongloop.com/loopback/#user" class="external-link" rel="nofollow">User object properties</a>: <code>username</code>, <code>password</code>, <code>email</code>. LoopBack sets values for <code>emailVerified</code> and <code>verificationToken</code>.</p>
        <p>NOTE: A value for <code>username</code> is not required, but a value for <code>email</code> is. LoopBack validates a unique value for <code>password</code> is provided. LoopBack does not automatically maintain values of the <code>created</code> and <code>lastUpdated</code> properties; you can set them manually if you wish.</p>
      </td>
    </tr>
    <tr>
      <td><code>/users</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#find-matching-instances">Find matching instances</a> of users that match specified filter. Inherited from <a href="PersistedModel-REST-API.html">PersistedModel API</a>.
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
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#update--insert-instance">Update / insert user instance</a> and persist to data source. Inherited from <a href="PersistedModel-REST-API.html">PersistedModel API</a>.
      </td>
      <td>
        <p>JSON object (in request body)</p>
        <p>Same as for <code>POST /users</code></p>
      </td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em></code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#find-instance-by-id">Find user by ID</a>: Return data for the specified user ID. Inherited from <a href="PersistedModel-REST-API.html">PersistedModel API</a>.
      </td>
      <td><em>id</em>, the user ID (in URI path)</td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em></code></td>
      <td>PUT</td>
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#update-model-instance-attributes">Update user attributes</a> for specified user ID and persist. Inherited from <a href="PersistedModel-REST-API.html">PersistedModel API</a>.
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
      <td>Deny</td>
      <td><a href="PersistedModel-REST-API.html#delete-model-instance">Delete user</a> with specified instance ID. Inherited from <a href="PersistedModel-REST-API.html">PersistedModel API</a>.
      </td>
      <td><em>id</em>, user ID<em> </em>(in URI path)</td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em>/accessTokens</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>Returns access token for specified user ID.</td>
      <td>
        <ul>
          <li><em>id</em>, user ID, in URI path</li>
          <li>where in query parameters</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em>/accessTokens</code></td>
      <td>POST</td>
      <td>Deny</td>
      <td>Create access token for specified user ID.</td>
      <td>
        <p><em>id</em>, user ID, in URI path</p>
      </td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em>/accessTokens</code></td>
      <td>DELETE</td>
      <td>Deny</td>
      <td>Delete access token for specified user ID.</td>
      <td>
        <p><em>id</em>, user ID, in URI path</p>
      </td>
    </tr>
    <tr>
      <td><code>/users/confirm</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td><a href="#confirm-email-address">Confirm email address</a> for specified user.</td>
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
      <td>Deny</td>
      <td>
        <p><a href="http://apidocs.strongloop.com/loopback/#persistedmodel-count" class="external-link" rel="nofollow">Return number of user instances</a>&nbsp;that match specified where clause. Inherited from <a href="http://apidocs.strongloop.com/loopback/#persistedmodel">PersistedModel API</a>.
        </p>
      </td>
      <td>"Where" filter specified in query parameter</td>
    </tr>
    <tr>
      <td><code>/users/<em>id</em>/exists</code></td>
      <td>GET</td>
      <td>Deny</td>
      <td>
        <p>Check instance existence: Return true if specified user ID exists. Inherited from <a href="PersistedModel-REST-API.html">PersistedModel API</a>.
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
      <td>Deny</td>
      <td>
        <p>Find first user instance that matches specified filter. Inherited from <a href="PersistedModel-REST-API.html">PersistedModel API</a>.
        </p>
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
      <td><code>/users/login[?include=user]</code></td>
      <td>
        <p>POST</p>
      </td>
      <td>Allow</td>
      <td>
        <p><a href="#log-in-user">Log in</a> the specified user.</p>
      </td>
      <td>
        <p>Username and password in POST body.</p>
        <p>If query parameter is <code>include=user</code>, then returns the user object.</p>
      </td>
    </tr>
    <tr>
      <td>
        <code>/users/logout</code>
      </td>
      <td>POST</td>
      <td>Allow</td>
      <td><a href="#log-out-user">Log out</a> the specified user.</td>
      <td>Access token in POST body.</td>
    </tr>
    <tr>
      <td><code>/users/reset</code></td>
      <td>POST</td>
      <td>&nbsp;</td>
      <td><a href="#reset-password">Reset password</a> for the specified user.</td>
      <td>In POST body</td>
    </tr>
  </tbody>
</table>

## Log in user

`POST /users/login`

You must provide a username or an email, and the password in the request body.
To ensure these values are encrypted, include these as part of the body and make sure you are serving your app over HTTPS (through a proxy or using the HTTPS node server).

You may also specify how long you would like the access token to be valid by providing a `ttl` (time to live) property with value in seconds. 

### Example

**Request URL**: `POST  http://localhost:3000/users/login`

**Request body**:
```javascript
{
    "email": "foo@bar.com",
    "password": "bar",
    "ttl": 86400
  }
```

**Response status code**: `200`

**Response body**:
```javascript
{
  "id": "PqosmmPCdQgwerDYwQcVCxMakGQV0BSUwG4iGVLvD3XUYZRQky1cmG8ocmzsVpEE",
  "ttl": 86400,
  "created": "2014-12-23T08:31:33.464Z",
  "userId": 1
}
```

The access token for the user's session is returned in the `id` key of the response.
It must be specified in the query parameter `access_token` for all the APIs that requires the user to be logged in. For example:

`http://localhost:3000/api/Users/logout?access_token=PqosmmPCdQgwerDYwQcVCxMakGQV0BSUwG4iGVLvD3XUYZRQky1cmG8ocmzsVpEE`.

## Log out user

`POST  /users/logout`

### **Example**

**Request URL**: `POST  http://localhost:3000/api/Users/logout?access_token=PqosmmPCdQgwerDYwQcVCxMakGQV0BSUwG4iGVLvD3XUYZRQky1cmG8ocmzsVpEE.`

**Response status code**: `204`

## Confirm email address

Require a user to verify their email address before being able to login. This will send an email to the user containing a link to verify their address.
Once the user follows the link they will be redirected to web root ("/") and will be able to login normally.

`GET /users/confirm`

### Parameters

Query parameters:

* uid
* token
* redirect

### Return value

If token invalid: HTTP 400

If user not found: HTTP 404

If successful: HTTP 204

## Reset password

`POST  /users/reset`

**Parameters**

POST payload:

```javascript
{
  "email": "foo@bar.com"
  ...
}
```

**Return value**

`200 OK`

You must the handle the '`resetPasswordRequest'` event to send a reset email containing an access token to the correct user.

The example below shows how to get an access token that a user can use to reset their password. 

{% include code-caption.html content="common/models/user.js" %}
```javascript
User.on('resetPasswordRequest', function (info) {
  console.log(info.email); // the email of the requested user
  console.log(info.accessToken.id); // the temp access token to allow password reset

  // requires AccessToken.belongsTo(User)
  info.accessToken.user(function (err, user) {
    console.log(user); // the actual user
  });
});
```

See also [Verifying email addresses](Registering-users.html#verifying-email-addresses) (Registering users).
