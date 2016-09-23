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
