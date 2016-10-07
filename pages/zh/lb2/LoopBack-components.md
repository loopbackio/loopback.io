---
title: "LoopBack components"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/LoopBack-components.html
summary:
---

LoopBack _components_ are predefined packages that extend a basic LoopBack application.  Fundamentally, a component is related code bundled together as a unit to enable LoopBack applications to easily reuse it.  

A LoopBack application itself is nothing more than a grouping of components with a few added elements to tie them all together like a main `app.js`.

<table>
  <tbody>
    <tr>
      <th>
        <p>Component</p>
      </th>
      <th>Description</th>
      <th>
        <p>Module</p>
      </th>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/OAuth-2.0.html">OAuth 2.0</a></td>
      <td>Enables LoopBack applications to function as oAuth 2.0 providers to authenticate and authorize client applications and users to access protected API endpoints.</td>
      <td><a href="https://github.com/strongloop/loopback-component-oauth2" class="external-link" rel="nofollow">loopback-component-oauth2</a></td>
    </tr>
    <tr>
      <td>
        <div style="width: 150px;">
          <p><a href="/doc/{{page.lang}}/lb2/Push-notifications.html">Push Notifications</a>&nbsp;</p>
        </div>
      </td>
      <td>Adds push notification capabilities to your LoopBack application as a mobile back end service.</td>
      <td><a href="https://www.npmjs.org/package/loopback-component-push" class="external-link" rel="nofollow">loopback-component-push</a></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/Storage-service.html">Storage service</a></td>
      <td>Adds an interface to abstract storage providers like S3, filesystem into general containers and files.</td>
      <td><a href="https://www.npmjs.org/package/loopback-component-storage" class="external-link" rel="nofollow">loopback-component-storage</a></td>
    </tr>
    <tr>
      <td><a href="/doc/{{page.lang}}/lb2/Synchronization.html">Synchronization</a></td>
      <td>Adds replication capability between LoopBack running in a browser or between LoopBack back-end instances to enable offline synchronization and server-to-server data synchronization.</td>
      <td>
        <p>Built into LoopBack; will be refactored into loopback-component-sync</p>
      </td>
    </tr>
    <tr>
      <td><a href="http://docs.strongloop.com/display/LB/Third-party+login" class="external-link" rel="nofollow">Third-party login</a> (Passport)</td>
      <td>Adds third-party login capabilities to your LoopBack application like Facebook, GitHub etc.</td>
      <td><a href="https://www.npmjs.org/package/loopback-component-passport" class="external-link" rel="nofollow">loopback-component-passport</a></td>
    </tr>
  </tbody>
</table>
