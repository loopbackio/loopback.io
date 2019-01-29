---
title: Security advisories
lang: en
toc: false
keywords:
tags: [security]
sidebar: security_sidebar
permalink: /doc/en/sec/index.html
summary:
---

This section provides important advisories about known security issues.

{% include list-children.html in=site.data.sidebars.security_sidebar %}

- [Security advisory 08-15-2018](Security-advisory-08-15-2018.html)
- [Security advisory 08-08-2018](Security-advisory-08-08-2018.html)
- [Security advisory 01-31-2018](Security-advisory-01-31-2018.html)
- [Security advisory 10-24-2017](Security-advisory-10-24-2017.html)
- [Security advisory 09-21-2017](Security-advisory-09-21-2017.html)
- [Security advisory 03-10-2017](Security-advisory-03-10-2017.html)

{% include important.html content="
Some advisories may require action on your part, for example to upgrade certain packages.
" %}

## How to report a security issue

If you think you have discovered a new security issue with any StrongLoop package, please do not report it on GitHub.  Instead, send an email to [reachsl@us.ibm.com](mailto:reachsl@us.ibm.com) with a full description and steps to reproduce.
