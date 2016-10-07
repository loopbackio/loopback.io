---
title: "ACL"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/ACL.html
summary:
---

Module: loopback

*   [Class: ACL](about:blank#acl)
*   [ACL.getMatchingScore](about:blank#acl-getmatchingscore)
*   [aCL.score](about:blank#acl-prototype-score)
*   [ACL.checkPermission](about:blank#acl-checkpermission)
*   [ACL.checkAccessForContext](about:blank#acl-checkaccessforcontext)
*   [ACL.checkAccessForToken](about:blank#acl-checkaccessfortoken)
*   [ACL.resolvePrincipal](about:blank#acl-resolveprincipal)
*   [ACL.isMappedToRole](about:blank#acl-ismappedtorole)

<section class="code-doc ">

### Class: ACL

#### ACL

A Model for access control meta data.

System grants permissions to principals (users/applications, can be grouped into roles).

Protected resource: the model data and operations (model/property/method/relation/…)

For a given principal, such as client application and/or user, is it allowed to access (read/write/execute) the protected resource?

Class Properties

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">model</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Name of the model.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">property</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Name of the property, method, scope, or relation.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">accessType</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Type of access being granted: one of READ, WRITE, or EXECUTE.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">permission</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Type of permission granted. One of:</p>
        <ul>
          <li>ALARM: Generate an alarm, in a system-dependent way, the access specified in the permissions component of the ACL entry.</li>
          <li>ALLOW: Explicitly grants access to the resource.</li>
          <li>AUDIT: Log, in a system-dependent way, the access specified in the permissions component of the ACL entry.</li>
          <li>DENY: Explicitly denies access to the resource.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">principalType</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Type of the principal; one of: Application, Use, Role.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">principalId</strong></td>
      <td><code>String</code></td>
      <td>
        <p>ID of the principal - such as appId, userId or roleId.</p>
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
      <td><strong class="code-arg-name">settings.defaultPermission</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Default permission setting: ALLOW, DENY, ALARM, or AUDIT. Default is ALLOW. Set to DENY to prohibit all API access by default.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### ACL.checkAccessForContext(context, callback)

Check if the request has the permission to access.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">context</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>See below.</p>
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

context

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">principals</strong></td>
      <td><code>Array.&lt;Object&gt;</code></td>
      <td>
        <p>An array of principals.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">model</strong></td>
      <td><code>String or Model</code></td>
      <td>
        <p>The model name or model class.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">id</strong></td>
      <td><code></code></td>
      <td>
        <p>The model instance ID.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">property</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The property/method/relation name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">accessType</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The access type: READ, REPLICATE, WRITE, or EXECUTE.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### ACL.checkAccessForToken(token, model, modelId, method, callback)

Check if the given access token can invoke the method

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">token</strong></td>
      <td><code>AccessToken</code></td>
      <td>
        <p>The access token</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">model</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The model name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">modelId</strong></td>
      <td><code></code></td>
      <td>
        <p>The model id</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">method</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The method name</p>
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
      <td><code>String or Error</code></td>
      <td>
        <p>The error object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">allowed</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>is the request allowed</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### ACL.checkPermission(principalType, principalId, model, property, accessType, callback)

Check if the given principal is allowed to access the model/property

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">principalType</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The principal type.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">principalId</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The principal ID.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">model</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The model name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">property</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The property/method/relation name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">accessType</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The access type.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function.</p>
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
        <p>The error object</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">result</strong></td>
      <td><code>AccessRequest</code></td>
      <td>
        <p>The access permission</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### ACL.getMatchingScore(rule, req)

Calculate the matching score for the given rule and request

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">rule</strong></td>
      <td><code>ACL</code></td>
      <td>
        <p>The ACL entry</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">req</strong></td>
      <td><code>AccessRequest</code></td>
      <td>
        <p>The request</p>
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
      <td><code>Number</code></td>
      <td></td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### ACL.isMappedToRole(principalType, principalId, role, cb)

Check if the given principal is mapped to the role

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">principalType</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Principal type</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">principalId</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Principal id/name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">role</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Role id/name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### ACL.resolvePrincipal(type, id, cb)

Resolve a principal by type/id

Arguments

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
        <p>Principal type - ROLE/APP/USER</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">id</strong></td>
      <td><code>String or Number</code></td>
      <td>
        <p>Principal id or name</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">cb</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Callback function</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### aCL.score(req)

Get matching score for the given `AccessRequest`.

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
      <td><code>AccessRequest</code></td>
      <td>
        <p>The request</p>
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
      <td><code>Number</code></td>
      <td>
        <p>score</p>
      </td>
    </tr>
  </tbody>
</table>

</section>
