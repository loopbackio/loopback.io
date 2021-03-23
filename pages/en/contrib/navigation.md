---
title: Navigation
lang: en
tags: [getting_started, contributing]
keywords: sidebar, accordion, yaml, iteration, for loop, navigation, attributes, conditional filtering
summary: "The Jekyll theme provide several ways to provide navigation"
sidebar: contrib_sidebar
permalink: /doc/en/contrib/navigation.html
---

## Navigation elements

The navigation elements in this theme are
- [Sidebar navigation](sidebar_navigation.html) - The most important navigation tool.
- [Tags](tags.html), that are similar to labels or categories in other systems,
- Global "top navigation" bar, explained below.

## Configuring the top navigation

The `_data/topnav.yml` file defines the top navigation bar that includes these menus:

- **View**: Links to different LoopBack versions, the [Contributing](/contrib/) space, [Community Projects](/community/), and the Overview pages (e.g. home page and http://loopback.io/getting-started/)  
- **Resources**: External links, e.g. the [Google Group forum](https://groups.google.com/forum/#!forum/loopbackjs).
- **Translations**: Community translations.

For external URLs, use `external_url` in the item property, as shown in the example `topnav.yml` file. This will display the external link glyph and make the link open in a new browser tab.  For internal links, use `url` as in the sidebar data files.

The `topnav.yml` file has two sections: `topnav` and `topnav_dropdowns`. The `topnav` section contains single links, while the `topnav_dropdowns` section contains dropdown menus. The two sections are independent of each other.
