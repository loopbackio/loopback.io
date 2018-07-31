---
title: Adding a new language
lang: en
tags: [contributing, translation]
keywords: translation, localization
summary: "Translators can easily add a new language, where they can translate LoopBack docs."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Adding_a_new_language.html
---

## Overview

When you want to add a language that doesn't yet exist on the site, you have to follow a few
additional steps to set it up.

## Procedure

In this procedure, `xx` represents the ISO language code for the language (for example, `fr` for French, `de` for German, and so on).

- Create new directory for your translated pages: `/pages/xx/lb3`
- If you have any translated pages, copy them into that directory.
- Add the following disclaimer in English to the top of the index.html page: "This is a community translation into <language>. For the latest information, see the [English version](http://loopback.io/doc/en/lb3/index.html)." Note that you need to link to the website for the appropriate version (lb3 or lb4). For an example, see [LoopBack 3.x](https://loopback.io/doc/ja/lb3/index.html)
- Copy the English navigation sidebar `_data/sidebars/lb3_sidebar.yml` (assuming you want to start with LoopBack version 3.x).  Name it `_data/sidebars/xx_sidebar.yml`.
- Edit the sidebar as described below in [Configuring the localized sidebar](#configuring-the-localized-sidebar).
- Add sidebar to `_config.yml` to the list in the `sidebars` property.
- Add sidebar to `_includes/custom/sidebarconfigs.html` as follows:
<div style="margin-left:40px;">{% highlight liquid %}
...
{%raw%}{% elsif page.sidebar == "xx_lb3_sidebar" %}{% endraw%}
    {%raw%}{% assign sidebar = site.data.sidebars.xx_lb3_sidebar.entries %}{% endraw%}
...
{% endhighlight %}</div>
- Add to `_data/topnav.yml` (under the `title: Translations` list).
- Add a file named `Not-yet-translated.md` to `page/xx/lb3` with the following content:
This page is displayed when someone clicks on a sidebar link for page that hasn't yet been translated:
<div style="margin-left:40px;">{% highlight yaml %}
---
title: 'Not yet translated'
lang: xx
layout: stub
sidebar: xx_lb3_sidebar
permalink: /doc/xx/lb3/Not-yet-translated.html
summary:
---

For instructions on how to translate, see [Translating articles](Translating_articles.html).
{% endhighlight %}</div>
- Ensure all translated pages have the proper front matter; for example:
<div style="margin-left:40px;">{% highlight yaml %}
lang: xx
layout: translation
keywords: ...
tags:
sidebar: xx_lb3_sidebar
permalink: /doc/xx/lb3/Access-token-REST-API.html
{% endhighlight %}</div>
Note the `translation` layout.  This adds the translation disclaimer at the top of the page.

{% include note.html content="In any pages that are not fully translated, also add `trans_complete: false` in the front matter.  This displays a note stating that the page is not fully translated.
" %}

Best practices is _not_ to put untranslated English pages in the localized directory `pages/xx/lb3`, except for the `index.md` "front page"; even if you haven't translated this page, you can include some text in the target language stating that translation into the language is underway.

## Configuring the localized sidebar

The localized (translated) sidebar file, `_data/sidebars/xx_sidebar.yml`, has the same format as the
English sidebar YAML file, but with a few changes and additions.

Edit the English sidebar as follows:

- Change all occurrences in the `url` property of `/en/` to `/xx/`.  Leave the file names the same; only change the directory name.
- Change the top-level properties in the file as follows:

<div style="margin-left:40px;">{% highlight yaml %}
title: Loopback 2.0 - <Add language name here>
url: /doc/xx/lb3/index.html
translated: true
{% endhighlight %}</div>
- For each translated article, add the `translated: true` property for the article in the sidebar file.  For example, in the Japanese sidebar:
<div style="margin-left:40px;">{% highlight yaml %}
- title: 'LoopBack コアコンセプト'
  url: /doc/ja/lb3/LoopBack-core-concepts.html
  translated: true
{% endhighlight %}</div>

- Translate titles as desired.  Best practice is to translate the sidebar titles _only_ when you translate the article, since that provides readers a clue about what's been translated and what has not.

## Importing existing translations

As discussed in [loopback.io issue #37](https://github.com/strongloop/loopback.io/issues/37), there is some translated content on the old doc site.   When using the migration script to convert this content to HTML, you have to do a few extra things:

2. Fix all links; If "xx" is the ISO language code for the language, replace:
  - Links to `http://docs.strongloop.com/display/LB/...` with link to translated page on loopback.io.
  - Links to `https://docs.strongloop.com/display/XX/...` with link to translated page on loopback.io.
  - Links to `/doc/en/lb3/Foo.html` with `Foo.html`.
3. Change front matter as described above.

### File names

In general, translations _should_ use the same file name as the English content, but just kept in a different directory (e.g. `pages/fr/lb3` instead of `pages/en/lb3`).  It seems that conversion of some translated files does not convert the file names properly, so you may need to go through and manually rename some files and make corresponding changes in the sidebar nav `.yml` file and possibly also to links to such files.

### Images
Due to the way that translated content was stored in Confluence, the migration will unfortunately create an entirely separate set of image files (and markdown referring to the image files).  However, we don't want to have duplicates of every image file for each language, so we also need to replace the image references to use the existing image files.
