---
title: "AccessToken"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/AccessToken.html
summary:
---

Module: loopback

*   [Class: AccessToken](about:blank#accesstoken)
*   [AccessToken.ANONYMOUS](about:blank#accesstoken-anonymous)
*   [AccessToken.createAccessTokenId](about:blank#accesstoken-createaccesstokenid)
*   [AccessToken.findForRequest](about:blank#accesstoken-findforrequest)
*   [accessToken.validate](about:blank#accesstoken-prototype-validate)

<section class="code-doc ">

### Class: AccessToken

#### AccessToken

Token based authentication and access control.

**Default ACLs**

*   DENY EVERYONE `*`
*   ALLOW EVERYONE create

Class Properties

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">id</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Generated token ID.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">ttl</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Time to live in seconds, 2 weeks by default.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">created</strong></td>
      <td><code>Date</code></td>
      <td>
        <p>When the token was created.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Extends the <code>Model.settings</code> object.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings.accessTokenIdLength</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Length of the base64-encoded string access token. Default value is 64\. Increase the length for a more secure access token.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### AccessToken.createAccessTokenId(callback)

Create a cryptographically random access token id.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">token</strong></td>
      <td><code>String</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### AccessToken.findForRequest(req, [options], callback)

Find a token for the given `ServerRequest`.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">req</strong></td>
      <td><code>ServerRequest</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Options for finding the token</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">token</strong></td>
      <td><code>AccessToken</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### accessToken.validate(callback)

Validate the token.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

Callback

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">err</strong></td>
      <td><code>Error</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">isValid</strong></td>
      <td><code>Boolean</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>
