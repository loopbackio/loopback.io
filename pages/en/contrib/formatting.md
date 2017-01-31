---
title: Formatting
keywords: LoopBack documentation
tags: [contributing_to_docs]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/formatting.html
summary: All content is formatted in markdown, with some additional Jekyll directives.
---

LoopBack documentation pages are formatted in [GitHub-flavored markdown](https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github/), with some additional features from Jekyll.

## Alerts

{% include note.html content="This is my note.
" %}

{% include tip.html content="This is a tip.
" %}

{% include warning.html content="This is a warning.
" %}

{% include important.html content="This is important.
" %}

For more information, see [Alerts](alerts.html).

## Styled Box

Puts the content in a highlight box, styled as below.  You can add/change style
with the `style` parameter.

{% include styled-box.html content="This is some content.  You can even have a bullet list:

- One
- Two
- Three
" %}

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

For more information, see [Code samples](code_samples.html).
