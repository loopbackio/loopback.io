---
title: Layouts
lang: en
keywords: LoopBack documentation
tags: [contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/layouts.html
summary:
---

A page's layout determines how it looks.  

The default layout specified in `_config.yml` is the `page` layout.
To use a different layout,  specify it in the frontmatter like this:

```
---
title: Layouts
layout: foo
...
```

In addition to the layouts built into the Jekyll theme, we have added the following:

- `readme`: Layout for external README file.
- `translation`: Layout for a translated article, providing a disclaimer and link to the source English article.
- `stub`: Used for pages that have not yet been translated.
