---
title: Long-term support
lang: en
tags: [contributing, community]
keywords: LoopBack, versioning, long-term support
sidebar: home_sidebar
permalink: /doc/en/contrib/Long-term-support.html
summary: LoopBack maintains a current version, a long-term support (LTS) version, and a maintenance version.
---

## Overview

In general, LoopBack version numbers adhere to [semantic versioning](http://semver.org/) conventions.

The LoopBack project implements [Module LTS
policy](https://github.com/CloudNativeJS/ModuleLTS) and maintains:

- A _Current_ version where most of the development occurs.
- An _Active LTS_ (Long-Term Support) version that does not add new features but gets bug fixes.
- One or more _Maintenance LTS_ versions that receive only critical bug fixes.


## Active LTS

A major LoopBack version (for example, 3.x) enters Active LTS when the next
major version is released (for example, 4.0) and stays in Active LTS mode for
at least six months.

Once a release enters LTS, no new features may be added to that release.
Changes are limited to:

1. Bug fixes;

2. Security updates;

4. Relevant documentation updates;

5. Certain performance improvements where the risk of breaking existing
 applications is minimal;

6. Changes that introduce large amount of code churn where the risk of breaking
 existing applications is low and where the change in question may significantly
 ease the ability to backport future changes due to the reduction in diff noise.
 Semver-minor changes are only permitted if required for bug fixes. Semver-major
 changes are only permitted if required for critical security and bug fixes.

## Maintenance LTS

When a new major version (for example, 4.0) is released, the oldest Active LTS
version (for example, 2.x) enters Maintenance LTS mode, where it will stay for
so long as the Node.js LTS versions available at release time are maintained by
the Node.js project, but at least for six months.

Once a release moves into Maintenance LTS mode, only critical bugs, critical
security fixes, and documentation updates will be permitted.
