---
title: Triaging pull requests
lang: en
tags: [contributing]
toc: false
keywords:
summary: "This document describes the triage process for community pull requests."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/triaging-pull-requests.html
---

The triage process for reviewing pull requests has two steps:

1. Gather all information necessary to review the proposed changes and point out obvious issues
(CLA, unit tests, etc.).  Anyone can perform this step.
2. Then, once the obvious items are resolved, a senior developer reviews
the proposed changes in a broader context. Because trivial problems have been
already solved, this should take less time.

## The checklist

1. Check the pull request description. Is it clear what change is proposed
from the point of view of LoopBack users? What problem is being solved?
How to reproduce the use case affected by this change and how to verify
that the new version works as intended?
 - It is important to provide enough context right in the pull request description.
   That way anybody coming across a pull request can quickly learn what changes
   are being proposed and how are they affecting reader's application and don't have
   to dig through the code to build that understanding. Most PR descriptions are
   written once but read many times, therefore it's a good practice to optimize
   for readers.
1. Is this pull request fixing a bug or adding a new feature?
Add an appropriate GitHub label (`bug` or `feature`).
If it's a bug fix, how severe is the problem being fixed? Add an appropriate
GitHub label (`major` or `critical`, we don't add any label for minor issues).
  - These labels will help us to decide which pull requests should be reviewed first,
 to ensure that important bug fixes are landed quickly.
1. If the pull request is related to any GH issues and/or other pull requests,
all of these related items should be listed in the pull request description
in a way that allows GitHub to create clickable links.
  - This is similar to the first item. Make it easy for anybody to build the context
   and find related discussions. Don't ask readers to manually search for GH issues.
 1. The CLA must be signed by all contributors (commit authors).
 1. The pull request includes automated tests (unit test) covering all or at
 least most important code paths. This rule can be relaxed at the discretion
 of a senior developer, but we should make our best effort to have all changes
 covered by tests.
 1. All CI builds must pass, with the exception of deep downstream
 dependencies (e.g. strong-arc) that are know to be unstable.
 1. The coding style should follow the conventions used in the surrounding code.
 The code should be clean, clear and easy to understand. With complex logic
 people should be more diligent on commenting the code.
  - The first part should be automated by linters like jslint and jscs and caught
 as part of CI build, but we are not there yet.
 1. All commit messages should describe what changed and why; the messages
 should follow these guidelines:
    - The first line should be 50 characters or less and contain a short
     description of the change
    - Keep the second line blank.
    - Wrap all other lines at 72 columns.

 See also [Git commit message guidelines](git-commit-messages.html).
