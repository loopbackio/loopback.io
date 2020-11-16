---
title: 'Security advisory 11-30-2020'
lang: en
layout: page
toc: false
keywords: LoopBack
tags: security
sidebar: security_sidebar
permalink: /doc/en/sec/Security-advisory-11-30-2020.html
---

- **Security risk**: High (CVSS: 7.3), [CVE link](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-4988)
- **Vulnerability**: `@loopback/rest` allows REST APIs to have `constructor` in the JSON payload, which is vulnerable to prototype pollution.

### Description

It's a similar issue as https://snyk.io/vuln/SNYK-JS-LODASH-73638, where the following description is quoted from.

> Prototype Pollution is a vulnerability affecting JavaScript. Prototype Pollution refers to the ability to inject properties into existing JavaScript language construct prototypes, such as objects. JavaScript allows all Object attributes to be altered, including their magical attributes such as `_proto_`, `constructor` and `prototype`. An attacker manipulates these attributes to overwrite, or pollute, a JavaScript application object prototype of the base object by injecting other values. Properties on the Object.prototype are then inherited by all the JavaScript objects through the prototype chain. When that happens, this leads to either denial of service by triggering JavaScript exceptions, or it tampers with the application source code to force the code path that the attacker injects, thereby leading to remote code execution.
>
> There are two main ways in which the pollution of prototypes occurs:
>
> - Unsafe Object recursive merge
> - Property definition by path

### The Fix

We improved JSON parsing to reject payload that contains `malicious` attributes.

- https://github.com/strongloop/loopback-next/pull/6676
- https://github.com/strongloop/loopback-datasource-juggler/pull/1874

### Reported by

Samuel Erb & Olivier Beg via email.

### Versions affected

`@loopback/rest` version 8.0.0 and below.

### Solution

Upgrade to `@loopback/rest` 9.0.0 or later.

Ensure that your application's `package.json` has the following line.

```json
"dependencies": {
   ...
   "@loopback/rest": "^9.0.0",
   ...
 },
```

Install latest version of `@loopback/cli` and run `lb4 update` command:

```sh
cd <app-project-root>
npm i -g @loopback/cli
lb4 update
```