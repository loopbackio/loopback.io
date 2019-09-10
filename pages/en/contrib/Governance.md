---
title: Governance
lang: en
keywords: LoopBack community
tags: [contributing, community]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Governance.html
summary: The LoopBack project governance model follows the spirit and tradition of open source by embracing consensus, forking, and individual ownership.
---

## Principles

LoopBack is an open, inclusive, and tolerant community of people working together to build a world-class Node framework and tools. We value diversity of individuals and opinions, and seek to operate on consensus whenever possible. We strive to maintain a welcoming, inclusive, and harassment-free environment, regardless of the form of communication. When consensus is not achievable, we defer to the owners of each individual module; the powers of the individual owner are kept in check by the ability of the community to fork and replace dependencies on the individual module and maintainer.

## Maintainers

Each repository has one or more core maintainers responsible for:

*   Daily operations: approving pull requests, responding to new issues, guiding discussions, and so on.
*   Seeking consensus on technical decisions.
*   Making the final decisions when consensus cannot be achieved.

Core maintainers have npm publishing rights for modules and the final say on releasing new versions.  

Besides core maintaners working on LoopBack full-time, there is also a growing group of voluntary maintainers from our community.

Refer to `CODEOWNERS` file in each repository for the list of all active maintainers. 

### Core maintainers

Project architects:
*   [Miroslav Bajtoš](https://github.com/bajtos)
*   [Raymond Feng](https://github.com/raymondfeng)

Other core maintainers include:
*   [Agnes Lin](https://github.com/agnes512)
*   [Deepak Rajamohan](https://github.com/deepakrkris)
*   [Diana Lau](http://github.com/dhmlau)
*   [Dominique Emond](https://github.com/emonddr)
*   [Janny Hou](http://github.com/jannyHou)
*   [Nora Abdelgadir](https://github.com/nabdelgadir)
*   [Yaapa Hage](https://github.com/hacksparrow)

Previous project architects:
*   [Ritchie Martori](https://github.com/ritch)
*   [Simon Ho](https://github.com/superkhau)

## Scrum board

The LoopBack project uses [ZenHub](https://www.zenhub.com/), an agile development tool built on the GitHub API. ZenHub provides an easy way to track work and provide project transparency in real time. We use it to groom and maintain our backlog and track what the team and community are working on in each sprint.

See the [LoopBack Board](https://github.com/strongloop/loopback#boards) for a realtime view of the project. You will need to install ZenHub extension to your browser first, please click on "Add ZenHub to GitHub" button at ZenHub's [homepage](https://www.zenhub.com/).

{% include tip.html content= "LoopBack switched from using Waffle to ZenHub for its scrum board in early 2017.
"%}

### Columns

ZenHub uses "Pipeline" to track the status of issues from "new" through "in
progress" to "done".

|Pipeline&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|Description|
|---|---|
Needs&nbsp;triage | New issues are placed into this column by default.
Triaging | The issue is being triaged to ensure we have enough information to understand the problem and reproduce it on our machines.
Needs&nbsp;Priority | The issue is accepted as a bug/feature and waiting to get prioritized.
Needs&nbsp;Discussion | The issue requires discussion to settle on the direction of the solution.
Needs&nbsp;Estimates | The issue has acceptance criteria and ready to be estimated.
Backlog | A curated list of items we want to work on in the near future.
Planning | A short list of issues that are either the stretch goal of the current sprint or what we are planning to work on in the coming sprint.
Committed | Stories committed to the current sprint.
In&nbsp;Progress | Issues that we are actively working on
Review | Items waiting for peer review. Pull requests are automatically being placed in this column.
Closed | Finished stories end up in this column.

## Deliverables

### Monthly milestones
Our sprint spans for a month. All the committed tasks and stretch goals of the milestone are being placed in the `Committed` and `Planning` in the Pipelines, with respectively. 

In order to allow users without ZenHub to know about our progress, a GitHub issue with `Monthly Milestone` label is being created for each month. See https://github.com/strongloop/loopback-next/labels/Monthly%20Milestone for examples. 

At the end of each milestone, we have a blog post in [StrongLoop web site](https://strongloop.com/strongblog) to summarize our accomplishment. See [blog posts with the `LoopBack` tag](https://strongloop.com/strongblog/tag_LoopBack.html).

### Quarterly Roadmap
Besides the monthly milestone, we also plan for a [quarterly roadmap](https://github.com/strongloop/loopback-next/blob/master/docs/ROADMAP.md). Before the quarterly roadmap is determined, a [pull request with `roadmap` label](https://github.com/strongloop/loopback-next/labels/roadmap) is created to get feedback from maintainers and our users.

