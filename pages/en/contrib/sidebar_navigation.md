---
title: Sidebar Navigation
tags: [getting_started]
last_updated: July 3, 2016
keywords: sidebar, accordion, yaml, iteration, for loop, navigation, attributes, conditional filtering
summary:
sidebar: contrib_sidebar
permalink: /doc/en/contrib/sidebar_navigation.html
folder: mydoc
---

## Location

Sidebars are defined in YAML files in the `_data/sidebars` directory.  They are

|File name| Description|
|-------|---------|
| lb2_sidebar.yml | LoopBack 2.x |
| lb3_sidebar.yml | LoopBack 3.x |
| home_sidebar.yml | Sidebar for [home page](http://loopback.io/doc/index.html) and 404 page. |
| contrib_sidebar.yml | For "Contributing to LoopBack" |
| community_sidebar.yml | For "Community projects" |
| xx_lb2_sidebar.yml | Localized sidebar for language "xx" (e.g. "es" for Spanish).

The format of the sidebar is straigthforward. Here's an example:

```yaml
title: Loopback 2.0
url: /doc/en/lb2/index.html
children:

- title: 'Installation'
  url: /doc/en/lb2/Installation.html
  output: 'web, pdf'
  children:

  - title: 'Installing IBM API Connect'
    url: /doc/en/lb2/Installing-IBM-API-Connect.html
    output: 'web, pdf'

  - title: 'Installing StrongLoop'
    url: /doc/en/lb2/Installing-StrongLoop.html
    output: 'web, pdf'
    children:

    - title: 'Installing compiler tools'
      url: /doc/en/lb2/Installing-compiler-tools.html
      output: 'web, pdf'
...
```
