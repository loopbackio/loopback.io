---
title: Translating articles
lang: en
tags: [translation, contributing]
keywords: translation, localization
toc: false
summary: "Translating an individual article from English is straightforward."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Translating_articles.html
---

When a language already exists on the site, it's very easy to contribute by
translating individual articles.  Just follow this procedure.

{%include note.html content="If you don't see the language in the \"Translations\" list at the top of the page,
then you need to add the language; see [Adding a new language](Adding_a_new_language.html) for instructions.
" %}

## Procedure

To create a new translated page from an existing English page:

1. Copy the file from `pages/en/lb2` (or `lb3` if it's for LoopBack version 3.0) to the directory for your language; for example if you were translating file `pages/en/lb2/Foo.html` to French, copy it to  `pages/fr/lb2/Foo.html`
1. Edit the front matter (see example below) and make the following changes:
 - Change `layout` from `page` to `translation`
 - Change `sidebar` from `lb2_sidebar` to `xx_lb2_sidebar` where `xx` is the ISO code for your language.
 - Change `permalink` from `/doc/en/lb2/Foo.html` to `/doc/xx/lb2/Foo.html`.
 - Add `lang` attribute with the appropriate value.  
1. Start translating the content!
1. Make sure your navigation sidebar `_data/sidebars/xx_lb_sidebar.yml` contains a link to your article somewhere (ideally in a logical location).
1. Add the `translated: true` property for the article in the sidebar file.

### Front matter example

When you're done, the page front matter should look like this:

```sh
---
title: "<<Translate the article's title from English>>"
layout: translation
trans_complete: false
sidebar: xx_lb2_sidebar
lang: ja
tags:
permalink: /doc/xx/lb2/Foo.html
summary: <<Translate or add a summary in the target language>>
---
```

In the example above, `xx` is the ISO language code for your language (for example `fr` for French, and so on).

The `trans_complete` property indicates whether the page has been fully translated.  If there is any untranslated (English) content remaining on the page, set this property to `false` to display a notification to that effect; otherwise, omit the property.
