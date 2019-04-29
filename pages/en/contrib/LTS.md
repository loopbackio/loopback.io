---
title: Long-term support
lang: en
tags: [contributing, community]
keywords: LoopBack, versioning, long-term support
sidebar: home_sidebar
permalink: /doc/en/contrib/Long-term-support.html
summary: LoopBack maintains a Current version, an Active long-term support (LTS) version, and one or more Maintenance LTS versions.
---

## Overview

LoopBack adheres to [semantic versioning](http://semver.org/) conventions and
implements [Module LTS policy](https://github.com/CloudNativeJS/ModuleLTS).

The project maintains:

- A _Current_ version where most of the development occurs.
- An _Active LTS_ (Long-Term Support) version that does not add new features but gets bug fixes.
- One or more _Maintenance LTS_ versions that receive only critical bug fixes.

Below is the LTS schedule on the LoopBack versions:

Framework | Status | Published | Active LTS Start | Maintenance LTS Start | EOL | Runtime | GA | EOL
-- | -- | -- | -- | -- | -- | -- | -- | --
LoopBack 4 | Current | Oct 2018 | -- | -- | Apr 2021 _(minimum)_| Node 10 | Oct 2018 | Apr 2021
LoopBack 3 | Active LTS | Dec 2016 | Oct 2018 | Dec 2019 | Dec 2020 |  Node 8 | Oct 2017 | Dec 2020
LoopBack 2 | End-of-Life | Jul 2014 | Dec 2016 | Oct 2018 | Apr 2019 | Node 6 | Oct 2016 | Apr 2019



## Active LTS

A major LoopBack version (for example, 3.x) enters Active LTS when the next
major version is released (for example, 4.0) and stays in Active LTS mode for
at least six months.

Once a release enters LTS, no new features may be added to that release.
Changes are limited to:

1. Bug fixes;

2. Security updates;

3. Relevant documentation updates;

4. Certain performance improvements where the risk of breaking existing
 applications is minimal;

5. Changes that introduce large amount of code churn where the risk of breaking
 existing applications is low and where the change in question may significantly
 ease the ability to backport future changes due to the reduction in diff noise.
 Semver-minor changes are only permitted if required for bug fixes. Semver-major
 changes are only permitted if required for critical security and bug fixes.

Support for new major Node.js versions may be added if the required changes
have a low risk of breaking existing applications.

## Maintenance LTS

When a new major version (for example, 4.0) is released, the oldest Active LTS
version (for example, 2.x) enters Maintenance LTS mode, where it will stay for
as long as the Node.js LTS versions available at release time are maintained by
the Node.js project.

Once a release moves into Maintenance LTS mode, only critical bugs, critical
security fixes, and documentation updates will be permitted.

Specifically, adding support for new major Node.js versions is not permitted.
