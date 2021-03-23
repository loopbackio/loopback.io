---
title: "Publish-subscribe messaging"
lang: en
layout: page
keywords: LoopBack
tags: [readme, messaging]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Publish-subscribe-messaging.html
summary: StrongLoop's publish-subscribe messaging system is called <i>strong-pubsub</i>.
---

{% include warning.html content="
The StrongLoop pub-sub modules are not yet at version 1.0. The API and behavior will most likely change before the 1.0 release.
" %}

Strong-pubsub is a library of modules that implement the basic [publish-subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) programming model without a strict dependency on any transport mechanism (websockets, HTTP, and so on) or protocol (MQTT, STOMP, AMQP, Redis, and so on).

Instead of implementing a specific transport, strong-pubsub enables you to swap out an underlying adapter that implements a pub-sub protocol (for example MQTT). It also enables you to swap out an underlying transport (TCP, TLS, WebSockets, or even [Primus](https://github.com/primus/primus)).

The following table summarizes all the pub-sub related modules.

{% include tip.html content="For more background and information, see the [StrongLoop blog post on pub-sub](https://strongloop.com/strongblog/introducing-strongloops-unopinionated-pubsub/).
" %}

<table>
  <thead>
    <tr>
      <th style="width: 210px;">Module</th>
      <th style="width: 200px;">Documentation</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/strongloop/strong-pubsub">strong-pubsub</a></td>
      <td>
      <a href="Strong-pub-sub.html">Strong Pub-sub</a>
      <br/><a href="http://apidocs.strongloop.com/strong-pubsub">API documentation</a>
      </td>
      <td>Main StrongLoop pub-sub module. It exports a <code class="highlighter-rouge">Client</code> class that provides a unified pubsub client in Node.js and browser (client JavaScript). It supports subscribing to topics. Clients can connect to brokers or proxies that support the client adapter’s protocol.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/strong-pubsub-bridge">strong-pubsub-bridge</a></td>
      <td><a href="Pub-sub-bridge.html">Pub-sub bridge</a>
      <br/><a href="http://apidocs.strongloop.com/strong-pubsub-bridge">API documentation</a></td>
      <td>Enables Clients to connect to a broker indirectly so a client using one protocol can connect to a broker that requires another andc reating hooks to inject logic between the client and the broker to implement authentication and authorization.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/strong-pubsub-connection-mqtt">strong-pubsub-connection-mqtt</a></td>
      <td><a href="http://apidocs.strongloop.com/strong-pubsub-connection-mqtt">API documentation</a></td>
      <td>Upgrade a Socket into a strong-pubsub MQTT Connection.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/strong-pubsub-connection-mqtt">strong-pubsub-mqtt</a></td>
      <td><a href="MQTT-adapter.html">MQTT adapter</a></td>
      <td>MQTT Adapter for strong-pubsub.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/strong-pubsub-redis">strong-pubsub-redis</a></td>
      <td><a href="Redis-pub-sub-adapter.html">Redis pub-sub adapter</a></td>
      <td>Redis backend.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/strong-pubsub-primus">strong-pubsub-primus</a></td>
      <td><a href="Primus-pub-sub-adapter.html">Primus pub-sub adapter</a></td>
      <td><a href="https://github.com/primus/primus">Primus</a> compatibility layer.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/strong-pubsub-example">strong-pubsub-example</a></td>
      <td><a href="Pub-sub-example.html">Node pub-sub example app</a></td>
      <td>Simple example Node application using pub-sub.</td>
    </tr>
    <tr>
      <td><a href="https://github.com/strongloop/loopback-example-pubsub">loopback-example-pubsub</a></td>
      <td><a href="Pub-sub-Loopback-example.html">LoopBack pub-sub example app</a></td>
      <td>Simple example LoopBack application using pub-sub.</td>
    </tr>
  </tbody>
</table>
