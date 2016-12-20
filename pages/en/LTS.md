---
title: Long Term Support
toc: true
keywords:
tags: [support]
sidebar: home_sidebar
permalink: /doc/en/Long-Term-Support.html
---

Our current plan for long-term support is to always have one "Current" version
where most of the development happens, one "LTS" version that does not add new
features but keeps receiving bug fixes, and one (or more) "maintenance"
versions receiving only critical bug fixes.

## LTS versions

A major LoopBack version (e.g. 2.x) enters LTS when the next major version is
released (e.g. 3.x) and stays in LTS mode for at least six months.

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

When a new major version (e.g. 4.0) is released, the oldest LTS version (e.g.
2.x) enters maintenance mode, where it will stay for another six months at
minimum.

Once a release moves into Maintenance mode, only critical bugs, critical
security fixes, and documentation updates will be permitted.

