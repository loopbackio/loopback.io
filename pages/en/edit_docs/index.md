---
title: Contributing to LoopBack documentation
keywords: LoopBack documentation
tags: [getting_started]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/index.html
summary: You can contribute to LoopBack documentation
---

## Contributing to LoopBack documentation

We welcome contributions to LoopBack documentation.

## How LoopBack documentation works

LoopBack documentation is sourced in a GitHub repository, and this site is
generated using Jekyll and GitHub pages.  The site theme is derived from
Tom Johnson's Jekyll documentation theme; see [Documentation Theme for Jekyll](http://idratherbewriting.com/documentation-theme-jekyll/) for more information.

## References

- [Jekyll static site genertor](https://jekyllrb.com/)
- [Liquid Templates](https://shopify.github.io/liquid/)
- [GitHub repo for Jekyll Documentation Theme](https://github.com/tomjohnson1492/documentation-theme-jekyll)
- [Current LoopBack docs in Confluence](http://docs.strongloop.com)

## Formatting examples

Here are some simple examples of common formatting.

### Alerts

{% include note.html content="This is my note. " %}

{% include tip.html content="This is a tip." %}

{% include warning.html content="This is a warning." %}

{% include important.html content="This is important." %}

### Styled Box

{% include styled-box.html
  style="font-size: 11pt; border: 1px solid #cccccc; background-color: #EBF5EB; padding: 10px; border-radius: 3px; margin: 10px auto 20px auto; width: 680px; padding: 10px;"
  content="This is some content.  You can even have a bullet list:

- One
- Two
- Three

 <ul>
 <li>Foo</li>
 <li>Bar</li>
 <li>Baz</li>
 </ul>
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
