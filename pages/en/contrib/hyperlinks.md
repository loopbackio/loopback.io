---
title: Links
lang: en
audience: writer, designer
tags: [contributing]
keywords: links, hyperlinks, cross references, related links, relationship tables
summary: "You can use standard HTML or Markdown formatting for links. "
sidebar: contrib_sidebar
permalink: /doc/en/contrib/hyperlinks.html

---

## Create an external link

When linking to an external site, use Markdown formatting:

```
[Google](http://google.com)
```

## Create an internal page

To link to another page, use the standard markdown formatting:

```
[Icons](icons.html)
```
Yields: [Icons](icons.html)

Because all files for a given version and language are in the same
directory, you don't need to specify language or version.  If you need to link
to documentation for another version, you have to include the full path, for example:
```
For LoopBack version 2 information, see
[Managing users](/doc/en/lb2/Managing-users.html)
```

Yields:

For LoopBack version 2 information, see [Managing users](/doc/en/lb2/Managing-users.html)
