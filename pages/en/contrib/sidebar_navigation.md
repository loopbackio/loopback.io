---
title: Sidebar Navigation
lang: en
tags: [getting_started, contributing]
keywords: sidebar, accordion, yaml, navigation
summary: Sidebars are the primary navigation element in the docs.
sidebar: contrib_sidebar
permalink: /doc/en/contrib/sidebar_navigation.html
---

{% include important.html content="Jekyll loads the sidebar data when it starts.  When running Jekyll
locally if you make changes to the sidebars, you must completely stop and restart Jekyll to
pick up the changes (i.e. Jekyll won't pick up the changes incrementally if you use the `-i` flag).  In some cases, you may need to do `jekyll clean` before restarting Jekyll to ensure the site is fully rebuilt.
" %}

## Location

Sidebars are defined in YAML files in the `_data/sidebars` directory.  They are

|File name| Description|
|-------|---------|
| lb2_sidebar.yml | LoopBack 2.x |
| lb3_sidebar.yml | LoopBack 3.x |
| lb4_sidebar.yml | LoopBack 4 |
| home_sidebar.yml | Sidebar for [home page](http://loopback.io/doc/index.html) and 404 page. |
| contrib_sidebar.yml | For "Contributing to LoopBack" |
| community_sidebar.yml | For "Community projects" |
| xx_lb2_sidebar.yml | Localized sidebar for language "xx" (e.g. "es" for Spanish).

{% include note.html content="
[`lb4_sidebar.yml`](https://github.com/strongloop/loopback-next/blob/master/docs/site/sidebars/lb4_sidebar.yml) is sourced from [loopback-next](http://github.com/strongloop/loopback-next/)
" %}

### Adding to `config.yml`

To add a new sidebar, you must add the sidebar's base file name to the list in `_config.yml`:

```yaml
sidebars:
- lb2_sidebar
- lb3_sidebar
- lb4_sidebar
- contrib_sidebar
- community_sidebar
- es_lb2_sidebar
- fr_lb2_sidebar
- ja_lb2_sidebar
- ko_lb3_sidebar
- ko_lb2_sidebar
- ru_lb2_sidebar
- zh_lb2_sidebar
- pt-br_lb2_sidebar
```

## Configuring the sidebar

The docs for each version of LoopBack uses a different sidebar. Additionally, there are sidebars for the [Contributing](/doc/en/contrib/) and [Community](/doc/en/community/) docs.

The top navigation remains the same, because it allows users to navigate across products. But the sidebar navigation adapts to the product.

Because each product uses a different sidebar, you'll need to set up your sidebars. The  `_includes/custom/sidebarconfigs.html` file controls which sidebar gets associated with which product.

The `sidebarconfigs.html` file uses simple `if elsif` logic to set a variable that the `sidebar.html` file uses to read the sidebar data file. The code looks like this:

{% raw %}
```liquid
{% if page.sidebar == "home_sidebar" %}
  {% assign sidebar = site.data.sidebars.home_sidebar %}

{% elsif page.sidebar == "lb2_sidebar" %}
  {% assign sidebar = site.data.sidebars.lb2_sidebar %}

{% elsif page.sidebar == "lb3_sidebar" %}
  {% assign sidebar = site.data.sidebars.lb3_sidebar %}

  {% elsif page.sidebar == "lb4_sidebar" %}
    {% assign sidebar = site.data.sidebars.lb4_sidebar %}
    ...

  {% else %}
    {% assign sidebar = site.data.sidebars.home_sidebar %}
  {% endif %}    
```
{% endraw %}

In each page's frontmatter, you must specify the sidebar you want that page to use. Here's an example of the page frontmatter showing the sidebar property:

<pre>
---
title: Alerts
tags: [formatting]
keywords: notes, tips, cautions, warnings, admonitions

summary: "You can insert notes, tips, warnings, and important alerts in your content. These notes are stored as shortcodes made available through the linksrefs.hmtl include."
<span class="red">sidebar: contrib_sidebar</span>
permalink: /doc/en/contrib/alerts
---
</pre>

The `sidebar: contrib_sidebar` refers to the `_data/sidebars/contrib_sidebar.yml` file.

If no sidebar assignment is found in the page frontmatter, the default sidebar (specified by the `else` statement) will be shown: `site.data.sidebars.home_sidebar.entries`.

{% include note.html content="Note that each level must have at least one topic before the next level starts. You can't have a second level that contains multiple third levels without having at least one standalone topic in the second level.
" %}

For more detail on the sidebar, see [Sidebar navigation](sidebar_navigation.html).

### Sidebar syntax

The sidebar data file uses a specific YAML syntax that you must follow. Follow the sample pattern shown in the theme. For example:

```yaml
title: LoopBack 3.x
url: index.html
children:

- title: 'Installation'
  url: Installation.html
  output: 'web, pdf'
  children:

  - title: 'Installation troubleshooting'
    url: Installation-troubleshooting.html
    output: 'web, pdf'

- title: '3.0 Release Notes'
  url: 3.0-Release-Notes.html
  output: 'web, pdf'

- title: 'Migrating apps to v3'
  url: Migrating-to-3.0.html
  output: 'web, pdf'
...
```

Each item must contain a `title`, `url`, and `output` property. An item (article) with sub-items (children) must have `children:` and the sub-items must be indented two spaces under it.
The two outputs available are `web` and `pdf`. (Even if you aren't publishing PDF, you still need to specify `output: web`).

The YAML syntax depends on exact spacing, so make sure you follow the pattern shown in the sample sidebars.

For more detail on the sidebar, see [Sidebar navigation][sidebar_navigation].
