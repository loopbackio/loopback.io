---
title: "LoopBack components"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/LoopBack-components.html
summary:
---

## Overview

LoopBack _components_ are predefined packages that extend a basic LoopBack application.
Fundamentally, a component is related code bundled together as a unit to enable LoopBack applications for easy reuse.  
You can configure components declaratively in [`component-config.json`](component-config.json).

The bare minimum to meet the LoopBack component "contract" is to export a `function(app, options)` as the main module export.

A LoopBack application itself is nothing more than a grouping of components with elements to tie them all together.

### Component contract

To be a LoopBack component, a module must export a function with the following signature as the main module export:

```
function(app, options)
```

Compare that with Express middleware, which exports `function(_options_)` 
that is supposed to return `function(req, res, next)` or `function(err, req, res, next)`.

## Pre-defined LoopBack components

LoopBack provides several pre-defined components, as described in the table below.

The sections below describe the configuration settings for each component in [`component-config.json`](component-config.json).

<table>
  <thead>
    <tr>
      <th>Component</th>
      <th>Description</th>
      <th>Module</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>API Explorer</td>
      <td>Enables the Swagger UI for the API. See <a href="Use-API-Explorer.html">Use API Explorer</a> for an example.</td>
      <td><a href="https://www.npmjs.org/package/loopback-component-explorer" class="external-link" rel="nofollow">loopback-component-explorer</a></td>
    </tr>
    <tr>
      <td><a href="OAuth-2.0.html">OAuth 2.0</a></td>
      <td>Enables LoopBack applications to function as oAuth 2.0 providers to authenticate and authorize client applications and users to access protected API endpoints.</td>
      <td><a href="https://www.npmjs.org/package/loopback-component-oauth2" class="external-link" rel="nofollow">loopback-component-oauth2</a></td>
    </tr>
    <tr>
      <td>
        <div style="width: 150px;">
          <p><a href="Push-notifications.html">Push Notifications</a>&nbsp;</p>
        </div>
      </td>
      <td>Adds push notification capabilities to your LoopBack application as a mobile back end service.</td>
      <td>
        <div style="width: 230px;">
          <p><a href="https://www.npmjs.org/package/loopback-component-push" class="external-link" rel="nofollow">loopback-component-push</a></p>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="Storage-component.html">Storage component</a></td>
      <td>Adds an interface to abstract storage providers like S3, filesystem into general containers and files.</td>
      <td><a href="https://www.npmjs.org/package/loopback-component-storage" class="external-link" rel="nofollow">loopback-component-storage</a></td>
    </tr>
    <tr>
      <td><a href="Synchronization.html">Synchronization</a></td>
      <td>Adds replication capability between LoopBack running in a browser or between LoopBack back-end instances to enable offline synchronization and server-to-server data synchronization.</td>
      <td>
        <p>Built into LoopBack; will be refactored into loopback-component-sync</p>
      </td>
    </tr>
    <tr>
      <td><a href="Third-party-login-using-Passport.html">Third-party login using Passport</a></td>
      <td>Adds third-party login capabilities to your LoopBack application like Facebook, GitHub etc.</td>
      <td><a href="https://www.npmjs.org/package/loopback-component-passport" class="external-link" rel="nofollow">loopback-component-passport</a></td>
    </tr>
  </tbody>
</table>

### API Explorer

The [application generator](Application-generator) will scaffold an app
with `component-config.json` containing the default entry for [LoopBack API Explorer](Use-API-Explorer): 

{% include code-caption.html content="server/component-config.json" %}
```javascript
{
  "loopback-explorer": {
    "mountPath": "/explorer"
  }
}
```

### OAuth2

Example:

{% include code-caption.html content="server/component-config.json" %}
```javascript
{
  "loopback-component-oauth2": {
    "dataSource": "db",
    "loginPage": "/login",
    "loginPath": "/login",
    "addHttpHeaders": "X-"
  }
}
```

### Push Notifications

{% include important.html content="

This component does not yet meet the \"contract\" to be a LoopBack component.

" %}

<div class="sl-hidden"><strong>Non-public Information</strong><br>
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;"><b>server/component-config.json</b></div>
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  "loopback-component-push": {
    "gcmServerApiKey" : "..",
    "apnsCertData" : "...",
    "apnsKeyData" : "..."
  }
}</pre></div>
  </div>
  <div class="table-wrap">
    <div class="table-wrap">
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>gcmServerApiKey</td>
            <td>For Android apps, <a href="https://developers.google.com/cloud-messaging/" class="external-link" rel="nofollow">Google Cloud Messaging (GCM)</a> API key.</td>
          </tr>
          <tr>
            <td>apnsCertData</td>
            <td>For iOS apps, <a href="https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html" class="external-link" rel="nofollow">Apple Push Notification Service (APNS)</a>              certificate name and location</td>
          </tr>
          <tr>
            <td>apnsKeyData</td>
            <td>For iOS apps, <a href="https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html" class="external-link" rel="nofollow">Apple Push Notification Service (APNS)</a>              key file name and location</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

### Storage

{% include important.html content="

This component does not yet meet the \"contract\" to be a LoopBack component.

" %}

<div class="sl-hidden"><strong>Non-public Information</strong><br>
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;"><b>server/component-config.json</b></div>
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  "loopback-component-storage": {
   provider: "",&nbsp;// One of "amazon", "rackspace", "azure", "openstack", "filesystem"
   ... // Other options depend on the provider being used; see below.
  }
}</pre></div>
  </div>
  <p></p>
  <div class="table-wrap">
    <div class="table-wrap">
      <table>
        <tbody>
          <tr>
            <th>Provider</th>
            <th>Property</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
          <tr>
            <td rowspan="3">
              <p><strong>Amazon</strong></p>
              <p>&nbsp;</p>
            </td>
            <td>provider: 'amazon'</td>
            <td>&nbsp;</td>
            <td rowspan="3">
              <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  provider: 'amazon',
  key: '...',
  keyId: '...'
}</pre></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>key<br><br></td>
            <td>Amazon key</td>
          </tr>
          <tr>
            <td>keyId</td>
            <td>Amazon key ID</td>
          </tr>
          <tr>
            <td rowspan="3">
              <p><strong>Rackspace</strong></p>
            </td>
            <td>
              <p>provider: 'rackspace'</p>
            </td>
            <td>&nbsp;</td>
            <td rowspan="3">
              <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  provider: 'rackspace',
  username: '...',
  apiKey: '...'
}</pre></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>username</td>
            <td>Your username</td>
          </tr>
          <tr>
            <td>apiKey</td>
            <td>Your API key</td>
          </tr>
          <tr>
            <td rowspan="3"><strong>Azure</strong></td>
            <td>
              <p>provider: 'azure'</p>
            </td>
            <td>&nbsp;</td>
            <td rowspan="3">
              <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
 provider: 'azure',
 storageAccount: '...',
 storageAccessKey: '...'
}</pre></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>storageAccount</td>
            <td>Name of your storage account</td>
          </tr>
          <tr>
            <td>storageAccessKey</td>
            <td>Access key for storage account</td>
          </tr>
          <tr>
            <td rowspan="4"><strong>OpenStack</strong></td>
            <td>provider: 'openstack'</td>
            <td>&nbsp;</td>
            <td rowspan="4">
              <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
 provider: 'openstack',
 username: '...',
 password: '...',
 authUrl: 'https://your-identity-service'
}</pre></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>username</td>
            <td>Your username</td>
          </tr>
          <tr>
            <td>password</td>
            <td>Your password</td>
          </tr>
          <tr>
            <td>authUrl</td>
            <td>Your identity service</td>
          </tr>
          <tr>
            <td rowspan="2"><strong>Local File System</strong></td>
            <td>provider: 'filesystem'</td>
            <td>&nbsp;</td>
            <td rowspan="2">
              <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  provider: 'filesystem',
  root: '/tmp/storage'
}</pre></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>root</td>
            <td>File path to storage root directory.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <p></p>
  <p></p>
</div>

### Third-party login (Passport)

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>Is this the same as the <a href="http://loopback.io/doc/en/lb2/Third-party-login-using-Passport.html#configuration-in-providersjson" rel="nofollow">configuration in providers.json</a>  and <a href="https://apidocs.loopback.io/loopback-component-passport/#passportconfigurator" class="external-link" rel="nofollow">https://apidocs.loopback.io/loopback-component-passport/#passportconfigurator</a></div>

<div class="sl-hidden"><strong>Non-public Information</strong><br>
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;"><b>server/component-config.json</b></div>
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">{
  "loopback-component-passport": {
    ...
  }
}</pre></div>
  </div>
</div>

{% include important.html content="

This component does not yet meet the \"contract\" to be a LoopBack component.

" %}
