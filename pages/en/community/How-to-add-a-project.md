---
title: How to add a community project
toc: false
keywords:
tags: [community]
sidebar: community_sidebar
permalink: /doc/en/community/How-to-add-a-project.html
---

To add your community project here, follow these steps:

First, fork the [strongloop/loopback.io repository](https://github.com/strongloop/loopback.io.git) (see [Fork a repo](https://help.github.com/articles/fork-a-repo/) for instructions).

Now, you have two options:

- If your project repository has a good, detailed README, you can reuse it.  Follow the steps in [Reuse your README](#reuse-your-readme).
- If your project doesn't have a complete README, you can create a custom page.  Follow the steps in [Create a custom project page](#create-a-custom-page).

## Reuse your README

This site has tools and processes for incorporating README files from external repositories.
For a full description, see [Including READMEs from other repositories](/doc/en/contrib/Including-READMEs.html).  In brief, we use a script to pull down READMEs over the network, then incorporate them into the site.  Currently, to update the READMEs, we periodically run the script manually.

To reuse your project README, follow these steps:

1. Copy one of the existing project pages that uses a README, for example  `loopback.io/pages/en/community/IoT-demo.md`.
  - Save it into the same directory (`pages/en/community`), and name it based on your project name, for example `pages/en/community/My-awesome-project.md`.
1. Edit the front matter at the top of the file (see below):
  - Change the `title` property to be the name of your project.
  - Change the `source` property to the name of your repository; in the example below `source: StrongLoop-IoT-Demo`.
  - Change the `org` property to the name of the organization that contains the repository; for example `org: my-org`.
  - Change the `permalink` property to match the name of the file, for example `/doc/en/community/My-awesome-project.html`.
  - Add any `keywords` you want for search-engine optimization (optional).
  - If you don't want an automatically-generated page TOC, add `toc: false`.
  - Add a short summary of the project in the `summary` property (optional).
1. Edit the rest of the page to fill in the information for your project, replacing the sample content and instructions.

### Front matter for README page

```
---
title: "Internet of Things demo"
lang: en
layout: readme
source: StrongLoop-IoT-Demo
org: strongloop-community
keywords: LoopBack
tags: [community]
sidebar: community_sidebar
permalink: /doc/en/community/IoT-demo.html
summary: Example application that demonstrates using LoopBack for Internet of Things.
---
```

### Add your repo to the list of community READMEs

Of course, you could just copy/paste your README file into  `pages/en/community/readmes`, and name it `the-repo-name.md`.  But to ensure that the content stays up-to-date with
changes to the README file in your repo:

1. Add your project repo to `_data/repos-community.json`; for example:

```
  { "org": "strongloop-community", "repoName":  "loopback-connector-elastic-search"},
```

Replace the `org` property with your organization name and the `repoName` property with
your repository name.

The `get-readmes` script that updates the READMEs reads this JSON file.  

### Test the script

Now, follow these steps to run `get-readmes`:

```
git clone https://github.com/strongloop/get-readmes.git
cd get-readmes
npm install
cd ..
./update-community-readmes.sh
```

## Create a custom page

If you don't want to reuse your README for any reason, follow these steps:

1. Copy the `loopback.io/pages/en/community/Sample-project.md` file, save it into the same directory (`pages/en/community`), and name it based on your project name, for example `pages/en/community/My-awesome-project.md`.
1. Edit the front matter at the top of the file (see below):
  - Change the `title` property to be the name of your project.
  - Change the `permalink` property to match the name of the file, for example `/doc/en/community/My-awesome-project.html`.
  - Add any `keywords` you want for search-engine optimization (optional).
  - If you want an automatically-generated page TOC, delete `toc: false`.
1. Edit the rest of the page to fill in the information for your project, replacing the sample content and instructions.

### Front matter for custom page

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

## Add your page to the sidebar

Edit the community sidebar navigation file `_data/sidebars/community_sidebar.yml` and add an entry for your  file, for example:
<pre style="margin-left: 30px;">
- title: 'Sample project'
  url: /doc/en/community/Sample-project.html
  output: 'web'
</pre>

{% include note.html content="Make sure the `url` property in the sidebar matches the page's `permalink` property.
" %}

## Test your change

Follow the instructions in the [README](https://github.com/strongloop/loopback.io/blob/gh-pages/README.md) to run the site locally.  Make sure it runs without any errors and you page displays properly in the navigation sidebar.

## Create a pull request

[Create a pull request](https://help.github.com/articles/creating-a-pull-request/) for your changes.  Someone will review it and either merge it or comment as soon as possible.
