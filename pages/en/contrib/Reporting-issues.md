---
title: Reporting issues
lang: en
keywords: LoopBack community
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Reporting-issues.html
summary: Follow the procedure outlined here when reporting issues with the LoopBack project.
---

## Before asking a question on GitHub

If you have a question about how to do something in LoopBack, follow these steps:

1. [Consult the documentation](../../) and the [API documentation](http://apidocs.strongloop.com).  **NOTE**: The search box above searches _both_ of these sites.
2. If you don't find an answer to your question, then do one of the following:

    - Search and then ask on the [developer forum / Google group](https://groups.google.com/forum/#!forum/loopbackjs).
    - Search and then ask on  [StackOverflow](http://stackoverflow.com/questions/tagged/loopbackjs+or+strongloop?sort=newest&pageSize=50).
    - Ask on [Gitter](https://gitter.im/strongloop/loopback).

    Posting to Google Group or StackOverflow is preferred so others may benefit from the answer.

3. If the above two ways do not work, open a GitHub issue on the corresponding LoopBack repo,
   providing as much information as possible, for example, versions and use case scenarios for features.

## How to report an issue

To report an issue:

 1. Search existing issues in [loopback](https://github.com/strongloop/loopback/issues) and [loopback-next](https://github.com/strongloop/loopback-next/issues).  It's possible someone has already reported the same problem.
 2. Make sure you have a [GitHub account](https://github.com/signup/free).
 3. Create a new issue, following the steps outlined below

### Determine the issue type

There are four types of issues:

- Questions. Please ask questions on [StackOverflow](http://stackoverflow.com/questions/tagged/loopbackjs+or+strongloop?sort=newest&pageSize=50),
  the [developer forum](https://groups.google.com/forum/#!forum/loopbackjs) or
  [Gitter](https://gitter.im/strongloop/loopback) chat.
- [Security issues](#security-issues)
- [Feature/enhancement requests](#feature-request)
- [Bug reports](#bug-report)

#### Report in appropriate channel

We support multiple channels for specific purposes. Please choose the **SINGLE** most appropriate channel to report your issue to.

{% include note.html content="
Post issues to the correct repository. For example, boot-related issues to
[loopback-boot](https://github.com/strongloop/loopback-boot/issues),
REST and remoting-related issues to
[strong-remoting](https://github.com/strongloop/strong-remoting/issues),
and so on. If you cannot determine which project to report the issue to,
post the issue in the [loopback](https://github.com/strongloop/loopback/issues)
repository itself for LoopBack 2.x/3.x and
[loopback-next](https://github.com/strongloop/loopback-next/issues) repository
for LoopBack 4.x and newer.
" %}

### Security issues

We take security vulnerabilities in LoopBack very seriously for our users.

In production, do not enable debug logs that may contain sensitive data; for example, the payload of `PersistedModel.create` should not be exposed in production. Logging this type of information is acceptable in development, but not in production.

Do not report security vulnerabilities using GitHub issues. Please send an email to [`reachsl@us.ibm.com`](mailto:reachsl@us.ibm.com) with:

- Description of the vulnerability.
- Steps to reproduce the issue.
- Possible solutions.

### Feature request

{% include note.html content="
LoopBack 2.x/3.x and related modules are in LTS mode. New features are no longer accepted.
" %}

To report a feature request for LoopBack 4.x (and newer), open a new GitHub issue at
[https://github.com/strongloop/loopback-next/issues](https://github.com/strongloop/loopback-next/issues).

For feature/enhancement requests related to specific LoopBack modules maintained
outside of loopback-next monorepo (e.g. `loopback-connector-mysql`),
please create an issue in the repository itself (e.g.
[https://github.com/strongloop/loopback-connector-mysql/issues](https://github.com/strongloop/loopback-connector-mysql/issues)).

### Bug report

#### Key information to include

When reporting bugs, please include at least all the following:

- Operating system version.
- Node.js version.
- Pertinent version of Node modules, for example LoopBack.
- Any stack trace, error message text, or other relevant information.

Consider using [NodeReport](https://developer.ibm.com/node/2016/08/18/nodereport-first-failure-data-capture-for-node-js/) to gather and report the relevant information.

#### LoopBack 4.x bugs

To report a bug in LoopBack version 4.x or newer:

1. Fork [loopback-next](https://github.com/strongloop/loopback-next) monorepo.

2. Create a new feature branch, e.g. `git checkout -b my-issue`

3. Pick one of the projects in
  [`examples`](https://github.com/strongloop/loopback-next/tree/master/examples)
  directory as a starting point for your application reproducing the problem. The
  [Todo](https://github.com/strongloop/loopback-next/tree/master/examples/todo)
  example should work well for most users.

4. Modify the selected example project to reproduce the issue you are
   experiencing. Add the required code and configuration. When adding new
   dependencies, don't forget to save them to `package.json` too.

5. If possible, encode steps to reproduce in an automated test we can run
   via `npm test`.

6. Commit the changes (`git commit`) and push the feature branch to GitHub
   (`git push -u origin my-branch-name`)

7. Create an issue in the appropriate GitHub repository (see
   [Report in appropriate channel](#report-in-appropriate-channel)).
   Provide clear steps to reproduce in the issue description **AND**
   a link to the forked repository. Please include the name of your feature
   branch in the link, e.g.
   `https://github.com/MYHANDLE/loopback-next/tree/MYBRANCH`.

#### LoopBack 3.x bugs

To report a bug in LoopBack version 2.x or 3.x:

1. Fork [loopback-sandbox](https://github.com/strongloop/loopback-sandbox).
2. Add the code required to reproduce your issue in the forked repository.
3. Create an issue in the appropriate repository with steps to reproduce in the issue description **AND** a link to the forked repository.

From this point, we will clone the the forked repository and try to reproduce the issue. Once verified, we will respond to you and prioritize the fix accordingly.

We recommend forking loopback-sandbox to leverage community support in reproducing issues. By doing this, we can focus on fixing and responding to the actual issues.

{% include tip.html content="We give priority to issues that follow the above process, that is, those with a forked repository for us to clone and clear steps to reproduce.
" %}

For  bug reports related to specific LoopBack dependencies (for example, `loopback-connector-mysql`), please create an issue in the repository itself; for example,  [loopback-connector-mysql](https://github.com/strongloop/loopback-connector-mysql/issues).

## Wait for response

We actively monitor the officially supported channels and generally respond as soon as possible. If you haven't received a response from us within two business days, please remind us on [Google Groups](https://groups.google.com/forum/#!forum/loopbackjs) or ping us on [Gitter](https://gitter.im/strongloop/loopback).

We also encourage community participation with regards to resolving issues. If you know the answer to any issues you encounter, please chime in and help each other out. We will also try our best to help users who are actively helping other users.
