---
title: "OAuth 2.0"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/OAuth-2.0.html
summary:
---

## Overview

The [LoopBack oAuth 2.0 component](https://github.com/strongloop/loopback-component-oauth2) enables LoopBack applications to function as oAuth 2.0
providers to authenticate and authorize client applications and users to access protected API endpoints.

The oAuth 2.0 protocol implementation is based on [OAuth2orize](https://github.com/jaredhanson/oauth2orize) and [Passport](http://passportjs.org/).

For more information on oAuth 2.0, see:

* [An Introduction to OAuth 2 (Digital Ocean)](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
* [Understanding OAuth2 (BubbleCode blog)](http://www.bubblecode.net/en/2013/03/10/understanding-oauth2/)

Internet Engineering Taskforce (IETF) technical specifications (Request for Comments or RFC):

* [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749)
* [OAuth 2.0 bearer token](https://tools.ietf.org/html/rfc6750)
* [OAuth 2.0 JWT token](https://tools.ietf.org/html/draft-ietf-oauth-jwt-bearer-11)

### Key elements

The LoopBack OAuth 2.0 component has the following key elements:

* **Authorization server**: Issues access tokens to the client after successfully authenticating the resource owner and obtaining authorization.
  The component implements the OAuth 2.0 protocol endpoints, including [authorization endpoint](http://tools.ietf.org/html/rfc6749#section-3.1) 
  and [token endpoint](http://tools.ietf.org/html/rfc6749#section-3.2).

* **Resource server**: Hosts the protected resources, and is capable of accepting and responding to protected resource requests using access tokens.
  The component provides middleware to protect API endpoints so that only requests with valid OAuth 2.0 access tokens are accepted.
  It also establishes identities such as client application ID and user ID for further access control and personalization.

The authorization server may be the same server as the resource server or separate.
A single authorization server may issue access tokens accepted by multiple resource servers.

The component defines the following models to manage OAuth 2.0 metadata such as access tokens, authorization codes, clients (applications), and resource owners (users):

* OAuthAccessToken (persisting access tokens)
* OAuthAuthorizationCode (persisting authorization codes)

It also uses the user and application model from the loopback module:

* User (managing resource owners)
* Application (managing client applications)

{% include image.html file="9830543.png" alt="" %}

## Installation

Install the component as usual:

```shell
$ npm install loopback-component-oauth2
```

## Using the OAuth2 component

Use in an application as follows:

```javascript
var oauth2 = require('loopback-component-oauth2');

var options = {
  dataSource: app.dataSources.db, // Data source for oAuth2 metadata persistence
  loginPage: '/login', // The login page URL
  loginPath: '/login' // The login form processing URL
};

oauth2.oAuth2Provider(
  app, // The app instance
  options // The options
);
```

The app instance will be used to set up middleware and routes. The data source provides persistence for the OAuth 2.0 metadata models.

### Server types

Two option properties indicate if you want to set up the OAuth 2.0 provider as an authorization server, a resource server, or both.

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>authorizationServer</td>
      <td>Boolean</td>
      <td>If true, set up the authorization server.</td>
    </tr>
    <tr>
      <td>resourceServer</td>
      <td><span>Boolean</span></td>
      <td>If true, set up the resource server.</td>
    </tr>
  </tbody>
</table>

### Authorization server options

The following options are available for an authorization server:

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
    <tr>
      <td>authorizePath</td>
      <td>
        <p>String or<br>Boolean (only false)</p>
      </td>
      <td>
        <p>If String, specifies the path to mount the authorization endpoint.</p>
        <p>If false, do not set up the authorization endpoint.</p>
      </td>
      <td><code><span>/oauth/authorize</span></code></td>
    </tr>
    <tr>
      <td>&nbsp;tokenPath</td>
      <td><span>String or</span><br><span>Boolean (only false)</span></td>
      <td>
        <p><span>If String, specifies the p</span>ath to mount the token endpoint.</p>
        <p><span>If false, do not set up the token endpoint</span></p>
      </td>
      <td><span>POST <code>/oauth/token</code></span></td>
    </tr>
    <tr>
      <td>&nbsp;decisionPath</td>
      <td><span><br>String or</span><br><span>Boolean (only false)</span></td>
      <td>
        <p><span>If String, specifies the p</span>ath to mount the decision endpoint.</p>
        <p>If false, do not set up the decision endpoint</p>
      </td>
      <td><span>POST <code>/oauth/authorize/decision</code></span></td>
    </tr>
    <tr>
      <td>decisionView</td>
      <td><br>String</td>
      <td>
        <p>Server-side view name to render the decision dialog. The input for the view is:</p>
        <ul>
          <li>transactionId: An internal token to prevent forging</li>
          <li>user: user/resource owner object</li>
          <li>client: client application object</li>
          <li>scope: OAuth 2.0 scope(s)</li>
          <li>redirectURI: redirect URI after the decision is made</li>
        </ul>
      </td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>decisionPage</td>
      <td><br>String</td>
      <td>
        <p>URL to the decision dialog page. Overrides decisionView. The query parameters are:</p>
        <ul class="task-list">
          <li>transactionId: An internal token to prevent forging</li>
          <li>userId: user/resource owner ID</li>
          <li>clientId: client application ID</li>
          <li>scope: OAuth 2.0 scope(s)</li>
          <li>redirectURI: redirect uri after the decision is made</li>
        </ul>
      </td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>loginPath</td>
      <td><span>String or</span><br><span>Boolean (only false)</span></td>
      <td>
        <p>Path to mount the user login endpoint.</p>
      </td>
      <td><span>POST <code>/login</code></span></td>
    </tr>
    <tr>
      <td>loginPage</td>
      <td>String</td>
      <td>URL to the login dialog page.</td>
      <td><code><span>/login</span></code></td>
    </tr>
  </tbody>
</table>

### Supported grant types

The `supportedGrantTypes` option controls what grant types should be enabled:

* supportedGrantTypes (string[])
  * default to ['authorizationCode', 'implicit', 'clientCredentials', 'resourceOwnerPasswordCredentials', 'refreshToken', 'jwt'];

### Custom functions for token generation

* generateToken: function(options) returns a token string
* getTTL: function(grantType, clientId, resourceOwner, scopes) returns a ttl number in seconds

## Protect endpoints with OAuth 2.0

```javascript
oauth2.authenticate(['/protected', '/api', '/me'], {
  session: false,
  scope: 'email'
});
```

## Examples

See [strong-gateway](https://github.com/strongloop/strong-gateway) for an example of using OAuth2.0 with the StrongLoop API Gateway.
