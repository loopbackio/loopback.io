---
title: Adding a new language
tags: [translation]
keywords: translation, localization
toc: false
last_updated: Sept 22, 2016
summary: "Translators can easily add a new language, where they can translate LoopBack docs."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Adding_a_new_language.html
---

## Overview

When you want to add a language that doesn't yet exist on the site, you have to follow a few
additional steps to set it up.

## Procedure

In this procedure, `xx` represents the ISO language code for the language (for example, `fr` for French, `de` for German, and so on).

1. Create new dir: `/pages/xx/lb2`
2. Copy new pages there (if any).
3. Copy the English navigation sidebar `_data/sidebars/lb2_sidebar.yml` (assuming you want to start with LoopBack version 2.x).  Name it `_data/sidebars/xx_sidebar.yml`  
Edit it as follows:
   - Change all occurrences in the `url` property of `/en/` to `/xx/`.  Leave the file names the same; only change the directory name.
   - Change `home_url` to `/doc/xx/lb2/index.html`
   - Translate titles as desired.  Best practice is to translate the sidebar titles _only_ when you translate the article, since that provides readers a clue about what's been translated and what has not.
4. Add sidebar to `_config.yml` to the list in the `sidebars` property.
5. Add sidebar to `_includes/custom/sidebarconfigs.html` as follows:

```
...
{%raw%}{% elsif page.sidebar == "xx_lb2_sidebar" %}{% endraw%}
    {%raw%}{% assign sidebar = site.data.sidebars.xx_lb2_sidebar.entries %}{% endraw%}
...    
```
6. Add to `_data/topnav.yml` (under the `title: Translations` list)
7. Ensure all pages have the proper front matter; for example:

```
lang: xx
layout: translation
keywords: ...
tags:
sidebar: xx_lb2_sidebar
permalink: /doc/xx/lb2/Access-token-REST-API.html
```

Note the `translated` layout.  This adds the translation disclaimer at the top of the page.

{% include note.html content="If you add any new \"stub\" pages (pages that are not fully translated), also add `trans_complete: false` in the front matter.
" %}

## Importing existing translations

As discussed in [loopback.io issue #37](https://github.com/strongloop/loopback.io/issues/37), there is some translated content on the old doc site.   When using the migration script to convert this content to HTML, you have to do a few extra things:

2. Fix all links; If "xx" is the ISO language code for the language, replace:
  - Links to `http://docs.strongloop.com/display/LB/...` with link to translated page on loopback.io.
  - Links to `https://docs.strongloop.com/display/XX/...` with link to translated page on loopback.io.
  - Links to `/doc/en/lb2/Foo.html` with `Foo.html`.
3. Change front matter as described above.

### File names

In general, translations _should_ use the same file name as the English content, but just kept in a different directory (e.g. `pages/fr/lb2` instead of `pages/en/lb2`).  It seems that conversion of some translated files does not convert the file names properly, so you may need to go through and manually rename some files and make corresponding changes in the sidebar nav `.yml` file and possibly also to links to such files.

### Images
Due to the way that translated content was stored in Confluence, the migration will unfortunately create an entirely separate set of image files (and markdown referring to the image files).  However, we don't want to have duplicates of every image file for each language, so we also need to replace the image references to use the existing image files.
