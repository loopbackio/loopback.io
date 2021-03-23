---
title: Formatting
lang: en
keywords: LoopBack documentation
tags: [contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/formatting.html
summary: All content is formatted in markdown, with some additional Jekyll directives.
---

LoopBack documentation pages are formatted in [GitHub-flavored markdown](https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github/), with some additional features from Jekyll.

## Additional include templates

For the LoopBack project, we've added several additional include templates:
- "See also"
- "Styled box"
- "Code caption" - see [Code samples](code_samples.html#code-caption)

### See also template

```
{%raw%}{% include see-also.html content="This is a right-aligned box where I can add relevant links and the like:
- [Contributing to LoopBack documentation](index.html)
- [Authoring pages](pages.html)
- [Code samples](code_samples.html)
" %}{% endraw%}
```

{% include see-also.html content="This is a right-aligned box where you can add relevant links and the like:

- [Contributing to LoopBack documentation](index.html)
- [Authoring pages](pages.html)
- [Code samples](code_samples.html)
" %}

Displays the box shown at right.  Note that sometimes you may need to add `<br clear="all"/>` somewhere in your page
to make it layout properly with the surrounding content.

If you don't want the "See also" title, then add `title=false` as a parameter.

<br clear="all"/>

### Styled box template

Puts the content in a highlight box, styled as below.  You can add/change style
with the `style` parameter.

{% include styled-box.html content="This is some content.  You can even have a bullet list:

- One
- Two
- Three
" %}
