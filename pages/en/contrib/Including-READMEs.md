---
title: Including READMEs from other repositories
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Including-READMEs.html
summary: The LoopBack documentation includes a number of README files from related repositories, including examples, data source connectors, and components.
---
LoopBack comprises dozens of GitHub repositories, including:
- Core repos: `loopback`, `loopback-datasource-juggler`, `loopback-boot`, `loopback-phase`, and others.
- Tools: `generator-loopback`, `loopback-workspace`
- Components: `loopback-component-explorer`, `loopback-component-oauth2`, `loopback-component-push`, `loopback-component-storage`, `loopback-component-passport`.
- Connectors: `loopback-connector-rest`, `loopback-connector-mongodb`, `loopback-connector-soap`, dozens of others; see [LoopBack data source connectors](Connectors-reference.html).
- Examples: `loopback-getting-started`, many others; see [Tutorials and examples](Tutorials-and-examples.html).

Each of these repositories has its own documentation in the repository README file.  It makes sense to maintain the documentation there, close to the code, where it can be updated as part of related pull requests to that module.  At the same time, it's useful to aggregate all the documentation on this site.  So, essentially we want to keep the module-specific documentation in the README as well as in this repo (loopback.io).

Instead of manually copying the README files from their "home" repositories, we use Bash scripts to automate the process.  This enables each repository to maintain its own README and yet also provide
the same information in the documentation, with a _single source_ to avoid divergence or duplication of effort.

There are two Bash scripts:

- [`update-readmes.sh`](https://github.com/strongloop/loopback.io/blob/gh-pages/update-readmes.sh) - Gets example, connector, and component READMEs and puts them into `pages/en/lb2/readmes`.
- [`update-community-readmes.sh`](https://github.com/strongloop/loopback.io/blob/gh-pages/update-community-readmes.sh) - Gets community READMEs and puts them into `pages/en/community/readmes`.

We have a [Jenkins pipeline](https://github.com/strongloop/loopback.io/blob/gh-pages/Jenkinsfile) that runs the scripts whenever there is a commit to the loopback.io repository.  
