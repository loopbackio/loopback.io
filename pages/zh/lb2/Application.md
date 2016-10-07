---
title: "Application"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Application.html
summary:
---

Module: loopback

*   [Class: Application](about:blank#application)
*   [Application.register](about:blank#application-register)
*   [application.resetKeys](about:blank#application-prototype-resetkeys)
*   [Application.resetKeys](about:blank#application-resetkeys)
*   [Application.authenticate](about:blank#application-authenticate)

<section class="code-doc ">

### Class: Application

#### Application

Manage client applications and organize their users.

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
        <p>Generated ID.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">name</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Name; required.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">description</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Text description</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">icon</strong></td>
      <td><code>String</code></td>
      <td>
        <p>String Icon image URL.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">owner</strong></td>
      <td><code>String</code></td>
      <td>
        <p>User ID of the developer who registers the application.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">email</strong></td>
      <td><code>String</code></td>
      <td>
        <p>E-mail address</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">emailVerified</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Whether the e-mail is verified.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">url</strong></td>
      <td><code>String</code></td>
      <td>
        <p>OAuth 2.0 application URL.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">{String}[]</strong></td>
      <td><code></code></td>
      <td>
        <p>callbackUrls The OAuth 2.0 code/token callback URL.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">status</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Status of the application; Either <code>production</code>, <code>sandbox</code> (default), or <code>disabled</code>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">created</strong></td>
      <td><code>Date</code></td>
      <td>
        <p>Date Application object was created. Default: current date.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">modified</strong></td>
      <td><code>Date</code></td>
      <td>
        <p>Date Application object was modified. Default: current date.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>APNS configuration, see the options below and also <a href="https://github.com/argon/node-apn/blob/master/doc/apn.markdown">https://github.com/argon/node-apn/blob/master/doc/apn.markdown</a></p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns.production</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Whether to use production Apple Push Notification Service (APNS) servers to send push notifications. If true, uses <code>gateway.push.apple.com:2195</code> and <code>feedback.push.apple.com:2196</code>. If false, uses <code>gateway.sandbox.push.apple.com:2195</code>          and <code>feedback.sandbox.push.apple.com:2196</code></p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns.certData</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The certificate data loaded from the cert.pem file (APNS).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns.keyData</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The key data loaded from the key.pem file (APNS).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns.pushOptions.gateway</strong></td>
      <td><code>String</code></td>
      <td>
        <p>(APNS).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns.pushOptions.port</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>(APNS).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns.feedbackOptions.gateway</strong></td>
      <td><code>String</code></td>
      <td>
        <p>(APNS).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns.feedbackOptions.port</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>(APNS).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns.feedbackOptions.batchFeedback</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>(APNS).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.apns.feedbackOptions.interval</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>(APNS).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">pushSettings.gcm.serverApiKey:</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Google Cloud Messaging API key.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">authenticationEnabled</strong></td>
      <td><code>Boolean</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">anonymousAllowed</strong></td>
      <td><code>Boolean</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">authenticationSchemes</strong></td>
      <td><code>Array</code></td>
      <td>
        <p>List of authentication schemes (see below).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">authenticationSchemes.scheme</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Scheme name. Supported values: <code>local</code>, <code>facebook</code>, <code>google</code>, <code>twitter</code>, <code>linkedin</code>, <code>github</code>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">authenticationSchemes.credential</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Scheme-specific credentials.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### Application.authenticate(appId, key, callback)

Authenticate the application id and key.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">appId</strong></td>
      <td><code>Any</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">key</strong></td>
      <td><code>String</code></td>
      <td></td>
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
      <td><strong class="code-arg-name">matched</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The matching key; one of: - clientKey</p>
        <ul>
          <li>javaScriptKey</li>
          <li>restApiKey</li>
          <li>windowsKey</li>
          <li>masterKey</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### Application.register(owner, name, options, callback)

Register a new application

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">owner</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Owner's user ID.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">name</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Name of the application</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>Other options</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### application.resetKeys(callback)

Reset keys for the application instance

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
  </tbody>
</table>

</section>

<section class="code-doc ">

#### Application.resetKeys(appId, callback)

Reset keys for a given application by the appId

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">appId</strong></td>
      <td><code>Any</code></td>
      <td></td>
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
  </tbody>
</table>

</section>
