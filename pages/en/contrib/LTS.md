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
- An _Active LTS_ (Long-Term Support) version that does not add
  new features but gets bug fixes.
- One or more _Maintenance LTS_ versions that receive only critical bug fixes.

Below is the LTS schedule on the LoopBack versions:

Framework | Status | Published | Active LTS Start | Maintenance LTS Start | EOL
-- | -- | -- | -- | -- | --
LoopBack 4 | Current | Oct 2018 | -- | -- | Apr 2026 _(minimum)_
LoopBack 3 | End-of-Life | Dec 2016 | Oct 2018 | Dec 2019 | Dec 2020 [(\*)](#lb3)
LoopBack 2 | End-of-Life | Jul 2014 | Dec 2016 | Oct 2018 | Apr 2019

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

<!-- markdownlint-disable MD033 -->
<a id="lb3"></a>
<!-- markdownlint-enable MD033 -->

## Information for LoopBack 3 users

LoopBack version 3 reached end of life at the end of 2020. We understand some
users might still be using LoopBack 3 and have questions about the
implications of running LoopBack 3 in production.

- **Security vulnerabilities:** Critical security fixes will be applied as
  needed by [IBM API Connect](https://www.ibm.com/cloud/api-connect)

- **New features:** No features will be accepted.

- **Bugs:** We are not going to actively fix any bugs reported by the community
  users. For critical bugs, maintainers will review and assess the risks of
  community-submitted PRs. If you’re planning to submit a fix, it’s the best to
  open a GitHub issue to discuss with the maintainers before proceeding.

Please note that the December 2020 end-of-life date is applicable to community
support. If you are using LoopBack as part of the
[IBM API Connect](https://www.ibm.com/cloud/api-connect) v5 or v2018 product,
check with the product announcement for its end-of-support schedule.

**We strongly encourage all our users to stop using LB3 as soon as they can.**

### What should I do if I’m still using LoopBack 3?

If you already have LoopBack 3 applications running in production, it is highly
recommended for you to review the
[Understanding the differences between LoopBack 3 and LoopBack 4 page](https://loopback.io/doc/en/lb4/Understanding-the-differences.html)
as mentioned in
[one of our older blog posts](https://strongloop.com/strongblog/lb3-extended-lts/).
There is also the
[migration guide](https://loopback.io/doc/en/lb4/migration-overview.html)
helping you to migrate your LoopBack 3 applications incrementally.

## What if I cannot migrate to LoopBack 4 any time soon?

Your LoopBack 3 applications will continue to work even after LoopBack 3
reaches end of life. There will be _very_ minimal, if any, changes going into
the codebase. In the case of addressing security vulnerabilities, you might
need to fork the corresponding GitHub repos and apply security fixes. See
[this blog](https://strongloop.com/strongblog/lb3-entered-maintenance-mode/)
for the list of Node.js packages reaching end-of-life along with `loopback`
repo.

The biggest risk of running on LB3 lies in security vulnerabilities that may be
discovered in the future, as they are unlikely to be fixed. LB3 is also
depending on old versions of many packages, so even when a dependency fixes a
vulnerability in the latest version, it would require a lot of effort to
upgrade LB3 to that new version. Such upgrade is likely to introduce breaking
changes for LoopBack consumers, which makes it even more tricky.
