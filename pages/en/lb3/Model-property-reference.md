---
title: "Model property reference"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Model-property-reference.html
summary:
---

{% include important.html content="This reference information is being moved to the API documentation. Until that is complete, it is provided here.
" %}

## Application properties

The application model represents the metadata for a client application that has its own identity and associated configuration with the LoopBack server.

See [http://apidocs.loopback.io/loopback/#application](http://apidocs.loopback.io/loopback/#application) for a list of the application model properties.

## ACL properties

See [http://apidocs.loopback.io/loopback/#acl](http://apidocs.loopback.io/loopback/#acl) for a list of ACL model properties.

## Role properties

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>Need to get these into the JSDocs.</div>

The following table describes the properties of the role model:

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>id</td>
      <td>String</td>
      <td>Role ID</td>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>Role name</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String</td>
      <td>Description of the role</td>
    </tr>
    <tr>
      <td>created</td>
      <td>Date</td>
      <td>Timestamp of creation date</td>
    </tr>
    <tr>
      <td>modified</td>
      <td>Date</td>
      <td>Timestamp of modification date</td>
    </tr>
  </tbody>
</table>

LoopBack defines some special roles:

<table>
  <tbody>
    <tr>
      <th>Identifier</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>Role.OWNER</td>
      <td>$owner</td>
      <td>Owner of the object</td>
    </tr>
    <tr>
      <td>Role.RELATED</td>
      <td>$related</td>
      <td>Any user with a relationship to the object</td>
    </tr>
    <tr>
      <td>Role.AUTHENTICATED</td>
      <td>$authenticated</td>
      <td>Authenticated user</td>
    </tr>
    <tr>
      <td>Role.UNAUTHENTICATED</td>
      <td>$unauthenticated</td>
      <td>Unauthenticated user</td>
    </tr>
    <tr>
      <td>Role.EVERYONE</td>
      <td>$everyone</td>
      <td>Everyone</td>
    </tr>
  </tbody>
</table>

## Scope properties

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>Need to get these into the JSDocs.</div>

The following table describes the properties of the Scope model:

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>name</td>
      <td>String</td>
      <td>Scope name; required</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String</td>
      <td>Description of the scope</td>
    </tr>
  </tbody>
</table>

## RoleMapping properties

<div class="sl-hidden"><strong>REVIEW COMMENT from $paramName</strong><br>Need to get these into the JSDocs.</div>

A RoleMapping entry maps one or more principals to one role. A RoleMapping entry belongs to one role, based on the roleId property.

The following table describes the properties of the roleMapping model:

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>id</td>
      <td>String</td>
      <td>ID</td>
    </tr>
    <tr>
      <td>roleId</td>
      <td>String</td>
      <td>Role ID</td>
    </tr>
    <tr>
      <td>principalType</td>
      <td>String</td>
      <td>Principal type, such as user, application, or role</td>
    </tr>
    <tr>
      <td>principalId</td>
      <td>String</td>
      <td>Principal ID</td>
    </tr>
  </tbody>
</table>
