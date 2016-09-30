---
title: Contributing to LoopBack documentation
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/doc-contrib.html
summary: We welcome contributions to LoopBack documentation!
---

## How LoopBack documentation works

LoopBack documentation is sourced in a GitHub repository, and this site is
generated using Jekyll and GitHub pages.  The site theme is derived from
Tom Johnson's [Documentation Theme for Jekyll](http://idratherbewriting.com/documentation-theme-jekyll/).

All the pages are in the `pages` directory.  Every page also has an **Edit this page** button at the bottom
that links to the page in the GitHub repo.

## References

- [Jekyll static site genertor](https://jekyllrb.com/)
- [Liquid Templates](https://shopify.github.io/liquid/)
- [GitHub repo for Jekyll Documentation Theme](https://github.com/tomjohnson1492/documentation-theme-jekyll)
- [Current LoopBack docs in Confluence](http://docs.strongloop.com)

## What to work on

We use GitHub issues to track tasks and bugs.  In general:

- For issues around documentation _content_ (that is the actual information), open an issue in the relevant repository, such as `loopback`, `loopback-datasource-juggler`, `loopback-connector-xxx`, and so on.
- For issue around the documentation site, layout, or UX, [open an issue in the loopback.io repository](https://github.com/strongloop/loopback.io/issues/new).

It's best practice to search first to make sure someone else hasn't already logged your issue.
Run these helpful GitHub queries to see open documentation issues:

- [Open documentation issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Adoc+org%3Astrongloop+) in any strongloop repository.
- [Open issues labeled "needs doc"](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Aneeds-doc+org%3Astrongloop+) - these are typically code issues that need to be documented, as opposed to specific doc tasks/problems.

## Formatting examples

Here are some simple examples of common formatting.

### Alerts

{% include note.html content="This is my note.
" %}

{% include tip.html content="This is a tip.
" %}

{% include warning.html content="This is a warning.
" %}

{% include important.html content="This is important.
" %}

### Styled Box

Puts the content in a highlight box, styled as below.  You can add/change style
with the `style` parameter.

{% include styled-box.html content="This is some content.  You can even have a bullet list:

- One
- Two
- Three
" %}

### Code blocks

JavaScript:

```javascript
/* This is some random JS
*/
MyModel.observe('before save', function filterProperties(ctx, next) {
  if (ctx.options && ctx.options.skipPropertyFilter) return next();
  if (ctx.instance) {
    FILTERED_PROPERTIES.forEach(function(p) { ctx.instance.unsetAttribute(p); });
  } else {
    FILTERED_PROPERTIES.forEach(function(p) { delete ctx.data[p]; });
  }
  next();
});
```

Shell script:

```shell
# This is some random shell script
npm i -g strongloop
ls -al
mv README.md tmp.txt
```
