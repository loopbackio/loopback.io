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
*   [Biniam Admikew](http://github.com/b-admike)
*   [Diana Lau](http://github.com/dhmlau)
*   [Janny Hou](http://github.com/jannyHou)
*   [Yaapa Hage](https://github.com/hacksparrow)
*   [Nora Abdelgadir](https://github.com/nabdelgadir)

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
Needs&nbsp;triage | New issues are places into this column by default.
Triaging | The issue is triaged to ensure we have enough information to understand the problem and reproduce it on our machines.
Needs&nbsp;priority | The issue is accepted as a bug/feature and waiting to get prioritized.
Backlog | A curated list of items we want to work on in the near future.
Planning | A short list of the most important issue, we use this list to pick the stories for our Sprint backlog during our bi-weekly planning session.
Committed | Stories committed to the current sprint (Sprint Backlog)
In&nbsp;Progress | Issues that we are actively working on
Paused | Stories we put on hold.
Review | Items waiting for peer review. Pull requests typically go to this column.
Verify | Stories waiting for QA verification.
Closed | Finished stories end up in this column.
