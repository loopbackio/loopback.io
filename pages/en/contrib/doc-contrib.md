---
title: Contributing to LoopBack documentation
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/doc-contrib.html
summary: We welcome contributions to LoopBack documentation!
---

## How LoopBack documentation works

LoopBack documentation is sourced in the [strongloop/loopback.io](https://github.com/strongloop/loopback.io/)
GitHub repository, and this site is generated using Jekyll and GitHub pages.  The site is published from the `gh-pages` branch.  Don't use the `master` branch.

All the pages are in the `pages` directory.  Every page also has an **Edit this page** button at the bottom
that links to the page in the GitHub repo.  

For information on contributing to translations in languages other than English, see [Translation](translation.html).

### To contribute a change

Follow these steps:

1. Click on **Edit this page** (top of page) to fork the repo.
1. Edit the page or pages as needed.
1. Commit to your fork/branch.
1. Open a PR for your changes.  If there is an associated issue, please reference it in your PR.

{% include important.html content="When you submit your PR, be sure to agree to the contributor license agreement; see below.
" %}

We attempt to review and merge PRs as soon as possible; in general, we'll try to do so within 24 hours during the business week.  Please allow longer over weekends or holidays.

{% include content/cla.md %}

## What to work on

We use GitHub issues to track tasks and bugs.  In general:

- For issues around documentation _content_ (that is the actual information), open an issue in the relevant repository, such as `loopback`, `loopback-datasource-juggler`, `loopback-connector-xxx`, and so on.
- For issue around the documentation site, layout, or UX, [open an issue in the loopback.io repository](https://github.com/strongloop/loopback.io/issues/new).

For general guidelines on creating issues, see [Reporting issues](Reporting-issues.html).

It is best practice to search first to make sure someone else hasn't already logged your issue.
Run these helpful GitHub queries to see open documentation issues:

- [Open documentation issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Adoc+org%3Astrongloop+) in any strongloop repository.
- [Open issues labeled "needs doc"](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Aneeds-doc+org%3Astrongloop+):  these are typically code issues that need to be documented, as opposed to specific doc tasks/problems.

## References

The site theme is derived from
Tom Johnson's [Documentation Theme for Jekyll](http://idratherbewriting.com/documentation-theme-jekyll/).
We've modified and extended it substantially to suit our needs.  For more information, see the
other pages in this section.

Other technical references:

- [Jekyll static site genertor](https://jekyllrb.com/)
- [Liquid Templates](https://shopify.github.io/liquid/)
