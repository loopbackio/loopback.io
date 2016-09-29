---
title: "Security advisory 01-09-2015"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Security-advisory-01-09-2015.html
summary:
---

## LoopBack connectors SQL injection vulnerability

{% include warning.html content="

**I**f you installed LoopBack connectors for PostgreSQL, Microsoft SQL Server, Oracle, or MySQL prior to **9 Jan 2015** you need update the affected packages.

" %}

*   **Date**: <time datetime="2015-01-09" class="date-past">09 Jan 2015</time> 
*   **Security risk**: Highly critical
*   **Vulnerability**: SQL Injection

### Description

LoopBack allows you to define model properties (including id) as number types. A vulnerability in the implementations of relational database connectors allows an attacker to send specially crafted requests (SQL statements as the value of numbers) resulting in arbitrary SQL execution. This vulnerability can be exploited by anonymous users.

### Reported by

David Kirchner

### Versions affected

*   loopback-connector-postgresql prior to 1.3.0
*   loopback-connector-mssql prior to 1.3.0
*   loopback-connector-oracle prior to 1.5.0
*   loopback-connector-mysql prior to 1.5.0 (The SQL injection is not possible but invalid numbers are treated as NaN).

### Solution

Please upgrade your project dependencies to use the latest versions of connectors and run **npm update**:

*   loopback-connector-postgresql@1.3.0
*   loopback-connector-mssql@1.3.0
*   loopback-connector-oracle@1.5.0
*   loopback-connector-mysql@1.5.0

{% include warning.html content="

Before running `npm update`, check your application's `package.json` to ensure that it specifies the correct version, for example:

`\"loopback-connector-oracle\": \"^1.5.0\"`

" %}

### How to report security vulnerabilities?

Please send us an e-mail at **[callback@strongloop.com](mailto:callback@strongloop.com)**.
