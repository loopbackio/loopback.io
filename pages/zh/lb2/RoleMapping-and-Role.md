---
title: "RoleMapping and Role"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/RoleMapping-and-Role.html
summary:
---

Module: loopback

*   [Class: Role](about:blank#role-object)
*   [Role.registerResolver](about:blank#role-registerresolver)
*   [Role.isOwner](about:blank#role-isowner)
*   [Role.isAuthenticated](about:blank#role-isauthenticated)
*   [Role.isInRole](about:blank#role-isinrole)
*   [Role.getRoles](about:blank#role-getroles)

<section class="code-doc ">

### Class: Role object

#### Role

The Role model

</section>

<section class="code-doc ">

#### Role.getRoles(context, callback)

List roles for a given principal.

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
        <p>The security context.</p>
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
      <td><code>Error</code></td>
      <td>
        <p>Error object.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">roles</strong></td>
      <td><code>Array.&lt;String&gt;</code></td>
      <td>
        <p>An array of role IDs</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### Role.isAuthenticated(context, callback)

Check if the user ID is authenticated

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
        <p>The security context.</p>
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
      <td><code>Error</code></td>
      <td>
        <p>Error object.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">isAuthenticated</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>True if the user is authenticated.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### Role.isInRole(role, context, callback)

Check if a given principal is in the specified role.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">role</strong></td>
      <td><code>String</code></td>
      <td>
        <p>The role name.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">context</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>The context object.</p>
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
      <td><code>Error</code></td>
      <td>
        <p>Error object.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">isInRole</strong></td>
      <td><code>Boolean</code></td>
      <td>
        <p>True if the principal is in the specified role.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### Role.isOwner(modelClass, modelId, userId, callback)

Check if a given user ID is the owner the model instance.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">modelClass</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>The model class</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">modelId</strong></td>
      <td><code></code></td>
      <td>
        <p>The model ID</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">userId</strong></td>
      <td><code></code></td>
      <td>
        <p>The user ID</p>
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

#### Role.registerResolver(role, resolver)

Add custom handler for roles.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">role</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Name of role.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">resolver</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Function that determines if a principal is in the specified role. Should provide a callback or return a promise.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>
