---
title: Long-term support
lang: en
tags: [contributing, community]
keywords: LoopBack, versioning, long-term support
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Long-term-support.html
summary: LoopBack maintains a current version, a long-term support (LTS) version, and a maintenance version.
---
## Overview
In general, LoopBack version numbers adhere to [semantic versioning](http://semver.org/) conventions.

The LoopBack project maintains:

- A _Current_ version where most of the development occurs.
- A _Long-term support (LTS)_ version that does not add new features but gets bug fixes.
- One (or more) _maintenance_ versions that receive only critical bug fixes.

## LTS versions

A major LoopBack version (for example, 2.x) enters LTS when the next major version is
released (for example, 3.x) and stays in LTS mode for at least six months.

Once a release enters LTS, no new features may be added to that release.
Changes are limited to:

1. Bug fixes;

2. Security updates;

3. Non-semver-major npm updates;

4. Relevant documentation updates;

5. Certain performance improvements where the risk of breaking existing
 applications is minimal;

6. Changes that introduce large amount of code churn where the risk of breaking
 existing applications is low and where the change in question may significantly
 ease the ability to backport future changes due to the reduction in diff noise.
 Semver-minor changes are only permitted if required for bug fixes. Semver-major
 changes are only permitted if required for critical security and bug fixes.

## Maintenance versions

When a new major version (for example, 4.0) is released, the oldest LTS version (for example, 2.x) enters maintenance mode, where it will stay for another six months at
minimum.

Once a release moves into maintenance mode, only critical bugs, critical
security fixes, and documentation updates will be permitted.
