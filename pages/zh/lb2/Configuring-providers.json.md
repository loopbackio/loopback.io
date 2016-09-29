---
title: "Configuring providers.json"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Configuring-providers.json.html
summary:
---

## Overview

Use the `providers.json` file to configure third-party login using loopback-component-passport.  This file contains settings for each third-party authorization provider, in provider and provider-link objects (for example, google-login and google-link).

To load the configuration, add code such as the following to `server.js`:

**/server/server.js**

```js
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// Build the providers/passport config
var config = {};
try {
  config = require('../providers.json');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}
```

## Example providers.json

Below is the providers.template.json file provided with [loopback-example-passport](https://github.com/strongloop/loopback-example-passport/).

**providers.template.json**  Expand source

```js
{
  "local": {
    "provider": "local",
    "module": "passport-local",
    "usernameField": "username",
    "passwordField": "password",
    "authPath": "/auth/local",
    "successRedirect": "/auth/account"
  },
  "facebook-login": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": "{facebook-client-id-1}",
    "clientSecret": "{facebook-client-secret-1}",
    "callbackURL": "http://localhost:3000/auth/facebook/callback",
    "authPath": "/auth/facebook",
    "callbackPath": "/auth/facebook/callback",
    "successRedirect": "/auth/account",
    "scope": ["email"]
  },
  "google-login": {
    "provider": "google",
    "module": "passport-google-oauth",
    "strategy": "OAuth2Strategy",
    "clientID": "{google-client-id-1}",
    "clientSecret": "{google-client-secret-1}",
    "callbackURL": "http://localhost:3000/auth/google/callback",
    "authPath": "/auth/google",
    "callbackPath": "/auth/google/callback",
    "successRedirect": "/auth/account",
    "scope": ["email", "profile"]
  },
  "twitter-login": {
    "provider": "twitter",
    "authScheme": "oauth",
    "module": "passport-twitter",
    "callbackURL": "http://localhost:3000/auth/twitter/callback",
    "authPath": "/auth/twitter",
    "callbackPath": "/auth/twitter/callback",
    "successRedirect": "/auth/account",
    "consumerKey": "{twitter-consumer-key}",
    "consumerSecret": "{twitter-consumer-secret}"
  },
  "facebook-link": {
    "provider": "facebook",
    "module": "passport-facebook",
    "clientID": "{facebook-client-id-2}",
    "clientSecret": "{facebook-client-secret-2}",
    "callbackURL": "http://localhost:3000/link/facebook/callback",
    "authPath": "/link/facebook",
    "callbackPath": "/link/facebook/callback",
    "successRedirect": "/link/account",
    "scope": ["email", "user_likes"],
    "link": true
  },
  "google-link": {
    "provider": "google",
    "module": "passport-google-oauth",
    "strategy": "OAuth2Strategy",
    "clientID": "{google-client-id-2}",
    "clientSecret": "{google-client-secret-2}",
    "callbackURL": "http://localhost:3000/link/google/callback",
    "authPath": "/link/google",
    "callbackPath": "/link/google/callback",
    "successRedirect": "/link/account",
    "scope": ["email", "profile"],
    "link": true
  }
}
```

## Provider property reference

### Common properties

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
      <th>Default</th>
    </tr>
    <tr>
      <td>provider</td>
      <td><span>String</span></td>
      <td>
        <p>Identifies the provider; can be any identifier string.</p>
      </td>
      <td>"facebook"</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>module</td>
      <td><span>String</span></td>
      <td>Node module to use</td>
      <td><span>"passport-facebook"</span></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>authScheme</td>
      <td>String</td>
      <td>Default is OAuth 2.0</td>
      <td><span>"oauth"</span></td>
      <td>oAuth 2.0</td>
    </tr>
    <tr>
      <td>strategy</td>
      <td>String</td>
      <td>The name of passport strategy&nbsp;</td>
      <td>"OAuth2Strategy"</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>authPath</td>
      <td>String</td>
      <td>The local URL for authentication</td>
      <td>"/auth/facebook"</td>
      <td>/auth/&lt;provider&gt;</td>
    </tr>
    <tr>
      <td>link</td>
      <td>Boolean</td>
      <td>True if you want to link accounts.</td>
      <td>true</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

### OAuth 1.0

Twitter

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>consumerKey</td>
      <td><span>String</span></td>
      <td><span style="color: rgb(0,0,0);">A value used by the Consumer to identify itself to the Service Provider</span></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><span>consumerSecret</span></td>
      <td><span>String</span></td>
      <td><span style="color: rgb(0,0,0);">A secret used by the Consumer to establish ownership of the Consumer Key</span></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>callbackURL</td>
      <td><span>String</span></td>
      <td><span style="color: rgb(0,0,0);">A URL the Service Provider will use to redirect the User back to the Consumer when&nbsp;</span><a class="external-link" href="http://oauth.net/core/1.0/#auth_step2" rel="nofollow">Obtaining User Authorization</a>
        <span
          style="color: rgb(0,0,0);">&nbsp;is complete</span>
      </td>
      <td><span>"</span><span class="nolink">http://localhost:3000/auth/facebook/callback</span><span>"</span></td>
    </tr>
    <tr>
      <td>callbackPath</td>
      <td><span>String</span></td>
      <td>A local URL to mount the callback page</td>
      <td><span>"/auth/facebook/callback"</span></td>
    </tr>
    <tr>
      <td>successRedirect</td>
      <td><span>String</span></td>
      <td>A local URL for the success login</td>
      <td><span>"/auth/account"</span></td>
    </tr>
    <tr>
      <td>scope</td>
      <td>Array of String</td>
      <td>An array of oAuth 1.0 scopes</td>
      <td><span>["email"]</span></td>
    </tr>
  </tbody>
</table>

### OAuth 2

Google and Facebook

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>clientID</td>
      <td>String</td>
      <td><span style="font-size: 14.0px;line-height: 1.4285715;">The client identifier issued to the client during </span><span style="font-size: 14.0px;line-height: 1.4285715;">the registration process</span></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>clientSecret</td>
      <td>String</td>
      <td>The client secret</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>callbackURL</td>
      <td>String</td>
      <td>oAuth 2.0 callback URL</td>
      <td>"<span class="nolink"><a href="http://localhost:3000/auth/facebook/callback" class="external-link" rel="nofollow">http://localhost:3000/auth/facebook/callback</a></span>"</td>
    </tr>
    <tr>
      <td>callbackPath</td>
      <td>String</td>
      <td><span>A local URL to mount the callback page</span></td>
      <td>"/auth/facebook/callback"</td>
    </tr>
    <tr>
      <td>successRedirect</td>
      <td>String</td>
      <td><span>A local URL for the success login</span></td>
      <td>"/auth/account"</td>
    </tr>
    <tr>
      <td>scope</td>
      <td>Array of String</td>
      <td><span>An array of oAuth 2.0 scopes</span></td>
      <td>["email"]</td>
    </tr>
  </tbody>
</table>

### Local

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Example</th>
      <th>Default</th>
    </tr>
    <tr>
      <td>usernameField</td>
      <td>String</td>
      <td>The field name for username on the login form</td>
      <td>"user"</td>
      <td>username</td>
    </tr>
    <tr>
      <td>passwordField</td>
      <td>String</td>
      <td>The field name for password on the login form</td>
      <td>"pass"</td>
      <td>password</td>
    </tr>
    <tr>
      <td>successRedirect</td>
      <td>String</td>
      <td><span>A local URL for the success login</span></td>
      <td>"/auth/account"</td>
      <td>&nbsp;</td>
    </tr>
  </tbody>
</table>
