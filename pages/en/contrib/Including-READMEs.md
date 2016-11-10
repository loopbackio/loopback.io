---
title: Including READMEs from other repositories
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Including-READMEs.html
summary: The LoopBack documentation includes a number of README files from related repositories, including examples, data source connectors, and components.
---
Instead of manually copying the README files from their "home" repositories, we use bash scripts to automate the process.  This enables each repository to maintain its own README and yet also provide
the same information in the documentation, with a single source to avoid differences in the information or duplication of maintenance effort.

There are two bash scripts:

- `update-readmes.sh` - Gets example, connector, and component READMEs and puts them into `pages/en/lb2/readmes`
- `update-community-readmes.sh` - Gets community READMEs and puts them into `pages/en/community/readmes`

We have a [Jenkins pipeline](https://github.com/strongloop/loopback.io/blob/gh-pages/Jenkinsfile) that runs the scripts whenever there is a commit to the loopback.io repository.  
