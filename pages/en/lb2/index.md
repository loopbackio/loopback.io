---
lang: en
title: LoopBack 2.x
keywords: LoopBack 2.x
tags: [getting_started]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/index.html
summary: LoopBack 2.x
---

No title!

The general plan is to put existing 2.x LoopBack docs here, and "freeze" the content,
since LoopBack 2.x will be frozen, and ongoing development will occur in the 3.x
branches.

Link test:

- [Installation](/doc/{{page.lang}}/lb2/Installation.html)
- [LoopBack core concepts](/doc/{{page.lang}}/lb2/LoopBack-core-concepts.html)

## Alerts

{% include note.html content="This is my note. " %}

{% include tip.html content="This is a tip." %}

{% include warning.html content="This is a warning." %}

{% include important.html content="This is important." %}

## Code blocks

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
