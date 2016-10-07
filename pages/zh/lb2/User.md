---
title: "User"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/User.html
summary:
---

Module: loopback

*   [Class: User](about:blank#user)
*   [user.createAccessToken](about:blank#user-prototype-createaccesstoken)
*   [User.normalizeCredentials](about:blank#user-normalizecredentials)
*   [User.login](about:blank#user-login)
*   [User.logout](about:blank#user-logout)
*   [user.hasPassword](about:blank#user-prototype-haspassword)
*   [user.verify](about:blank#user-prototype-verify)
*   [User.generateVerificationToken](about:blank#user-generateverificationtoken)
*   [User.confirm](about:blank#user-confirm)
*   [User.resetPassword](about:blank#user-resetpassword)

<section class="code-doc ">

### Class: User

#### User

Built-in User model. Extends LoopBack [PersistedModel](about:blank#persistedmodel-new-persistedmodel).

Default `User` ACLs.

*   DENY EVERYONE `*`
*   ALLOW EVERYONE `create`
*   ALLOW OWNER `deleteById`
*   ALLOW EVERYONE `login`
*   ALLOW EVERYONE `logout`
*   ALLOW OWNER `findById`
*   ALLOW OWNER `updateAttributes`

Class Properties

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">username</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Must be unique.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">password</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Hidden from remote clients.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">email</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Must be valid email.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">emailVerified</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Set when a user's email has been verified via <code>confirm()</code>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">verificationToken</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Set when <code>verify()</code> is called.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">realm</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The namespace the user belongs to. See <a href="https://docs.strongloop.com/display/public/LB/Partitioning+users+with+realms">Partitioning users with realms</a> for details.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">created</strong></td>
      <td><code>Date</code></td>
      <td>
        <p>The property is not used by LoopBack, you are free to use it for your own purposes.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">lastUpdated</strong></td>
      <td><code>Date</code></td>
      <td>
        <p>The property is not used by LoopBack, you are free to use it for your own purposes.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">status</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The property is not used by LoopBack, you are free to use it for your own purposes.</p>
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
      <td><strong class="code-arg-name">settings.emailVerificationRequired</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Require the email verification process before allowing a login.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings.ttl</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Default time to live (in seconds) for the <code>AccessToken</code> created by <code>User.login() / user.createAccessToken()</code>. Default is <code>1209600</code> (2 weeks)</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings.maxTTL</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>The max value a user can request a token to be alive / valid for. Default is <code>31556926</code> (1 year)</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings.realmRequired</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Require a realm when logging in a user.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings.realmDelimiter</strong></td>
      <td><code>String</code></td>
      <td>
        <p>When set a realm is required.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings.resetPasswordTokenTTL</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>Time to live for password reset <code>AccessToken</code>. Default is <code>900</code> (15 minutes).</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings.saltWorkFactor</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>The <code>bcrypt</code> salt work factor. Default is <code>10</code>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">settings.caseSensitiveEmail</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Enable case sensitive email.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### User.confirm(userId, token, redirect, callback)

Confirm the user's identity.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">userId</strong></td>
      <td><code>Any</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">token</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The validation token</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">redirect</strong></td>
      <td><code>String</code></td>
      <td>
        <p>URL to redirect the user to once confirmed</p>
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
  </tbody>
</table>

</section>

<section class="code-doc ">

#### user.createAccessToken(ttl, [options], cb)

Create access token for the logged in user. This method can be overridden to customize how access tokens are generated

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">ttl</strong></td>
      <td><code>Number</code></td>
      <td>
        <p>The requested ttl</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[options]</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>The options for access token, such as scope, appId</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>The callback function</p>
      </td>
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
      <td><code>String or Error</code></td>
      <td>
        <p>The error string or object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">token</strong></td>
      <td><code>AccessToken</code></td>
      <td>
        <p>The generated access token object</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### User.generateVerificationToken(user, cb)

A default verification token generator which accepts the user the token is being generated for and a callback function to indicate completion. This one uses the crypto library and 64 random bytes (converted to hex) for the token. When used in combination with the user.verify() method this function will be called with the `user` object as it's context (`this`).

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">user</strong></td>
      <td><code>object</code></td>
      <td>
        <p>The User this token is being generated for.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>The generator must pass back the new token with this function call</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### user.hasPassword(password, callback)

Compare the given `password` with the users hashed password.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">password</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The plain text password</p>
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
      <td>
        <p>Error object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">isMatch</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>Returns true if the given <code>password</code> matches record</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### User.login(credentials, [include], callback)

Login a user by with the given `credentials`.

 ```js
User.login({
  username: 'foo',
  password: 'bar'
}, function(err, token) {
  console.log(token.id);
});
```

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">credentials</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>username/password or email/password</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">[include]</strong></td>
      <td><code>Array.&lt;String&gt; or String</code></td>
      <td>
        <p>Optionally set it to "user" to include the user info</p>
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
      <td>
        <p>Error object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">token</strong></td>
      <td><code>AccessToken</code></td>
      <td>
        <p>Access token if login is successful</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### User.logout(accessTokenID, callback)

Logout a user with the given accessToken id.

 ```js
User.logout('asd0a9f8dsj9s0s3223mk', function(err) {
  console.log(err || 'Logged out');
});
```

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">accessTokenID</strong></td>
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
  </tbody>
</table>

</section>

<section class="code-doc ">

#### User.normalizeCredentials(credentials, realmRequired, realmDelimiter)

Normalize the credentials

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">credentials</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>The credential object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">realmRequired</strong></td>
      <td><code>Boolean</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">realmDelimiter</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The realm delimiter, if not set, no realm is needed</p>
      </td>
    </tr>
  </tbody>
</table>

Returns

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>The normalized credential object</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### User.resetPassword(options, callback)

Create a short lived acess token for temporary login. Allows users to change passwords if forgotten.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td></td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

options

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">email</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The user's email address</p>
      </td>
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

#### user.verify(options)

Verify a user's identity by sending them a confirmation email.

 ```js
var options = {
  type: 'email',
  to: user.email,
  template: 'verify.ejs',
  redirect: '/',
  tokenGenerator: function(user, cb) {
    cb("random-token");
  }
};

user.verify(options, next);
```

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

options

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">type</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Must be 'email'.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">to</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Email address to which verification email is sent.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">from</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Sender email addresss, for example <code>'noreply@myapp.com'</code>.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">subject</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Subject line text.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">text</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Text of email.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">template</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Name of template that displays verification page, for example, `'verify.ejs'.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">redirect</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Page to which user will be redirected after they verify their email, for example <code>'/'</code> for root URI.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">generateVerificationToken</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>A function to be used to generate the verification token. It must accept the user object and a callback function. This function should NOT add the token to the user object, instead simply execute the callback with the token! User saving and email
          sending will be handled in the <code>verify()</code> method.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>
