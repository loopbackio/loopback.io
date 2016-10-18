---
title: Reporting issues
keywords: LoopBack community
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Reporting-issues.html
summary: Follow the procedure outlined here when reporting issues with the LoopBack project.
---

## Don't use an issue to ask a question

{% include warning.html content="
DO NOT post questions as GitHub issues, which are for feature requests and bug reports _only_.  Questions will be closed IMMEDIATELY.
" %}

If you have a question about how to do something in LoopBack, follow these steps:

1. [Consult the documentation](../../) and the [API documentation](http://apidocs.strongloop.com).  **NOTE**: The search box above searches _both_ of these sites.
1. If you don't find an answer to your question, then do one of the following:
  - Search and then ask on the [developer forum / Google group](https://groups.google.com/forum/#!forum/loopbackjs).
  - Search and then ask on  [StackOverflow](http://stackoverflow.com/questions/tagged/loopbackjs+or+strongloop?sort=newest&pageSize=50).
  - Ask on [Gitter](https://gitter.im/strongloop/loopback).

Posting to Google Group or StackOverflow is preferred so others may benefit from the answer.

## How to report an issue

To report an issue:

 1. Search [existing issues](https://github.com/strongloop/loopback/issues).  It's possible someone has already reported the same problem.
 1. Make sure you have a [GitHub account](https://github.com/signup/free).
 1. Create a [new issue](https://github.com/strongloop/loopback/issues) for the bug, following the steps outlined below

## 1. Determine the issue type

There are three types of issues:

- Questions - Please post to the [developer forum (Google Group)](https://groups.google.com/forum/#!forum/loopbackjs) instead.
- [Feature/enhancement request](#featureenhancement-request)
- [Bug report](#bug-report)

### Security issues

Do not report security vulnerabilities using GitHub issues. Please send an email to `callback@ibm.com` with:

- Description of the vulnerability.
- Steps to reproduce the issue.
- Possible solutions.

### Feature requests

Open a new GitHub issue at https://github.com/strongloop/loopback/issues.

For feature/enhancement requests related to specific LoopBack dependencies (for example, `loopback-connector-mysql`), please create an issue in the repository itself (for example,  https://github.com/strongloop/loopback-connector-mysql/issues).

### Bug report

To report a bug:

1. Fork [loopback-sandbox](https://github.com/strongloop/loopback-sandbox).
2. Add the code required to reproduce your issue in the forked repository.
3. Create an issue in the appropriate repository with steps to reproduce (STR) in the issue description **AND** a link to the forked repository.

From this point, we will clone the the forked repository and try to reproduce the issue. Once verified, we will respond to you and prioritize the fix accordingly.

We recommend forking with STR to leverage community support in reproducing issues. By doing this, we can focus on fixing and responding to the actual issues.

{% include tip.html content="We give priority to issues that follow the above process, that is, those with a forked repository for us to clone and clear STR.
" %}

For  bug reports related to specific LoopBack dependencies (for example, `loopback-connector-mysql`), please create an issue in the repository itself; for example,  [loopback-connector-mysql](https://github.com/strongloop/loopback-connector-mysql/issues).

#### Key information to include

When reporting bugs, please include at least all the following:

- Operating system version.
- Node.js version.
- Pertinent version of Node modules, for example LoopBack.
- Any stack trace, error message text, or other relevant information.

Consider using [NodeReport](https://developer.ibm.com/node/2016/08/18/nodereport-first-failure-data-capture-for-node-js/) to gather and report the relevant information.

## 2. Report in appropriate channel

We support multiple channels for specific purposes. Please choose the **SINGLE** most appropriate channel to report your issue to.

{% include note.html content="Post issues to the correct repository (for example, boot-related issues to `loopback-boot`, REST and remoting-related issues to `strong-remoting`, and so on). If you cannot determine which project to report the issue to, post the issue in the `loopback` repository itself.
" %}

## 3. Wait for response

We actively monitor the officially supported channels and generally respond as soon as possible. If you haven't received a response from us within two days, please remind us on [Google Groups](https://groups.google.com/forum/#!forum/loopbackjs) or ping us on [Gitter](https://gitter.im/strongloop/loopback).

{% include tip.html content=" If your issue turns out to be a question, you will be asked to post on the Google Group mailing list instead. We will then tag the issue with the `question` label and close it immediately.
" %}

We also encourage community participation with regards to resolving issues. If you know the answer to any issues you encounter, please chime in and help each other out. We will also try our best to help users who are actively helping other users.
