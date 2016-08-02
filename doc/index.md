---
title: LoopBack Documentation
keywords: sample homepage
tags: [getting_started]
sidebar: home_sidebar
permalink: /doc/index.html
summary: This is proof-of-concept site for LoopBack open source docs, where the source is hosted in GitHub and served via Jekyll and GitHub Pages.
---

## Background

LoopBack docs are currently hosted in Confluence, and this prevents the open-source community from editing the documentation directly.  Because LoopBack is an open-source project, the docs should also be open source.

This site is based on Tom Johnson's [Documentation Jekyll theme](https://github.com/tomjohnson1492/documentation-theme-jekyll).
It has three major divisions of content:

- [LoopBack 2.0](lb2) - Currently has a draft navigation sidebar, but no content.
- [LoopBack 3.0](lb3) - Currently has a draft navigation sidebar, but no content.
- [Contributing to LoopBack docs](contrib) - some information pulled from [http://idratherbewriting.com/documentation-theme-jekyll/](http://idratherbewriting.com/documentation-theme-jekyll/) specifically for doc. contributors.

{% include note.html content="Since this is just a proof-of-concept, there are lots of
known issues, glitches, and so on.  There is still a lot of work and refining to do, for example with the CSS styles." %}

## Proposed solution

Move doc content from Confluence into [this repository](https://github.com/strongloop/loopback.io), to enable public contributions/editing.
Publish the docs to [http://loopback.io/doc](http://loopback.io/doc).  Existing content on the would remain (essentially) unaffected.

{% include note.html content="That's why the current content on loopback.io still remains where it is and this site is just \"slipped in\" to the current URL scheme under `/doc`" %}

### High-level tasks

1. Create Jekyll framework for documentation.  I propose to leverage Tom Johnson's [Documentation Jekyll Theme](http://idratherbewriting.com/documentation-theme-jekyll/). This has almost everything we need and is MIT-licensed.  It is responsive (uses Bootstrap) and has many useful features for documentation, e.g. sidebar navigation, note and alert templates, category tags, facilities for reviews, and so on.
1. Migrate content from Confluence to markdown.  See [Migrating LoopBack Docs to Markdown for use with Jekyll](https://github.com/strongloop/loopback.io/wiki/Migrating-LoopBack-Docs-to-Markdown-for-use-with-Jekyll) for details. Task: [issue #29](https://github.com/strongloop/loopback.io/issues/29).
1. Figure out how to deal with content that we currently "transclude" (dynamically include) from other GitHub repos.  Typically, these are example repo README files.  We use a special Confluence macro to "single source" this content; I think we'll probably need to use a script to pull down the markdown, since we can't use Jekyll plug-ins with GitHub Pages. Task: [issue #30](https://github.com/strongloop/loopback.io/issues/30).
1. Use Google Custom Search to provide basic search functionality (see [implementation in current LoopBack doc site](https://docs.strongloop.com/display/APIC/Search+LoopBack+docs).  This is superior to the search functionality in [the Jekyll theme]( https://github.com/tomjohnson1492/documentation-theme-jekyll). Task: [issue #31](https://github.com/strongloop/loopback.io/issues/31).
1. Create Confluence macro to redirect/link from (old) Confluence pages to corresponding/new loopback.io pages.
1. Review branding of new site (StrongLoop vs. LoopBack, etc.).
1. Launch and publicize/socialize new site to encourage community participation.

### GitHub issues

See [https://github.com/strongloop/loopback.io/issues](https://github.com/strongloop/loopback.io/issues) for tracking issues.

## LooBack 2.x docs

I propose to also move the 2.x docs into this repo.
Once 3.0 is released, we generally wouldn't update or add to these docs, but the community could continue to fix mistakes and so on as desired.
