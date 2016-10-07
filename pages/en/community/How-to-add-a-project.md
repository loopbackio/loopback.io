---
title: How to add a community project
toc: false
keywords:
tags: [community]
sidebar: community_sidebar
permalink: /doc/en/community/How-to-add-a-project.html
---

To add your community project here, follow these steps:

1. Fork the [strongloop/loopback.io repository](https://github.com/strongloop/loopback.io.git) (see [Fork a repo](https://help.github.com/articles/fork-a-repo/) for instructions).
1. Copy the `loopback.io/pages/en/community/Sample-project.md` file, save it into the same directory (`pages/en/community`), and name it based on your project name, for example `pages/en/community/My-awesome-project.md`.
1. Edit the front matter at the top of the file (see below):
  - Change the `title` property to be the name of your project.
  - Change the `permalink` property to match the name of the file, for example `/doc/en/community/My-awesome-project.html`.
  - Add any `keywords` you want for search-engine optimization (optional).
  - If you want an automatically-generated page TOC, delete `toc: false`.

1. Edit the rest of the page to fill in the information for your project, replacing the sample content and instructions.
1. Edit the community sidebar navigation file `_data/sidebars/community_sidebar.yml` and add an entry for your new file under the `Active projects` folder, for example:
<pre style="margin-left: 30px;">
- title: 'Active projects'
  output: 'web'
  children:

  - title: 'Sample project'
    url: /doc/en/community/Sample-project.html
    output: 'web'
</pre>

### Front matter

This is the template front matter in the [Sample project page](Sample-project):

```
---
title: Sample community project
toc: false
keywords:
tags: [community]
sidebar: community_sidebar
permalink: /doc/en/community/Sample-project.html
---
```

## Test your change

Follow the instructions in the [README](https://github.com/strongloop/loopback.io/blob/gh-pages/README.md) to run the site locally.  Make sure it runs without any errors and you page displays properly in the navigation sidebar.

## Create a pull request

[Create a pull request](https://help.github.com/articles/creating-a-pull-request/) for your changes.  Someone will review it and either merge it or comment as soon as possible.
