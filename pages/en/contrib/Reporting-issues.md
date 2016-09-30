---
title: Reporting issues
keywords: LoopBack community
tags: [getting_started]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Reporting-issues.html
summary: This is a guide on what to do when you run into issues while using LoopBack.
---

Follow the procedure outlined here when reporting issues with the LoopBack project.

{% include important.html content="
DO NOT post questions using GitHub issues

Questions posted to GitHub issues will be closed IMMEDIATELY as we only accept feature requests and bug reports there.  Instead, ask your question on the [LoopBack Google Group](https://groups.google.com/forum/#!forum/loopbackjs),   [StackOverflow](http://stackoverflow.com/questions/tagged/loopbackjs+or+strongloop?sort=newest&pageSize=50), or [Gitter](https://gitter.im/strongloop/loopback)

Posting to Google Group is preferred so others may benefit.
" %}

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
3. Create an issue in the appropriate repository with STR (steps to reproduce) in the issue description **AND** a link to the forked repository.

> From this point, we will clone the the forked repository and try to reproduce the issue on our own machines. Once verified, we will respond to you and prioritize the fix accordingly.

We recommend forking with STR in order to leverage community support in reproducing issues. By doing this, we can focus on fixing and responding to the actual issues.

> We give priority to issues that follow the above process, that is, those with a forked repository for us to clone and clear STR.

For  bug reports related to specific LoopBack dependencies (for example, `loopback-connector-mysql`), please create an issue in the repository itself (for example,  https://github.com/strongloop/loopback-connector-mysql/issues).

## 2. Report the issue using an appropriate channel

We officially support multiple channels for specific purposes. Please choose the **SINGLE** most appropriate channel to report your issue to.

> Please try to post issues to the correct repository (for example, boot-related issues to `loopback-boot`, REST and remoting-related issues to `strong-remoting`, and so on). If you cannot determine which project to report the issue to, post the issue in the LoopBack repository itself.

## 3. Wait for a response

We actively monitor the officially supported channels and generally respond as soon as possible. If you haven't received a response from us within two days, please remind us on [Google Groups](https://groups.google.com/forum/#!forum/loopbackjs) or ping us on [Gitter](https://gitter.im/strongloop/loopback).

> If your issue turns out to be a question, you will be asked to post on the Google Group mailing list instead. We will then tag the issue with the `question` label and close it immediately.

We also encourage community participation with regards to resolving issues. If you know the answer to any issues you encounter, please chime in and help each other out. We will also try our best to help users who are actively helping other users.
