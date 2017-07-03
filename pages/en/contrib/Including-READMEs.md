---
title: Including READMEs from other repositories
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Including-READMEs.html
summary: The LoopBack documentation includes a number of README files from related repositories, including examples, data source connectors, and components.
---
LoopBack comprises dozens of GitHub repositories.  Beyond the core repositories such as `loopback`, `loopback-datasource-juggler`, and `loopback-boot`, there are dozens of ancillary modules, that fall into three main categories:
- **Components**: `loopback-component-oauth2`, `loopback-component-storage`, `loopback-component-passport`, and so on.
- **Connectors**: `loopback-connector-rest`, `loopback-connector-mongodb`, `loopback-connector-soap`, dozens of others; see [LoopBack data source connectors](Connectors-reference.html).
- **Examples**: `loopback-getting-started`, many others; see [Tutorials and examples](Tutorials-and-examples.html).

Each of these repositories has its own documentation in the repository README file.  It makes sense to maintain the documentation there, close to the code, where it can be updated as part of related pull requests to that module.  At the same time, it's useful to aggregate all the documentation on this site.  So, essentially we want to keep the module-specific documentation in the README as well as in this repo (loopback.io).

Instead of manually copying the README files from their "home" repositories, we use Bash scripts to automate the process.  This enables each repository to maintain its own README and yet also provide
the same information in the documentation, with a _single source_ to avoid divergence or duplication of effort.

{% include important.html content="Due to this system of single-sourcing READMEs, to update one of the files in the `readmes` directory, you **must** open a PR in the corresponding repository, not here in the loopback.io repo.  For example, to update the file `pages/lb3/readmes/loopback-connector-mongodb.md`, edit [`strongloop/loopback-connector-mongodb/README.md`](https://github.com/strongloop/loopback-connector-mongodb/blob/master/README.md) and open a PR in the `loopback-connector-mongodb` repository.
" %}

There are two Bash scripts:

- [`update-readmes.sh`](https://github.com/strongloop/loopback.io/blob/gh-pages/update-readmes.sh) - Gets example, connector, and component READMEs and puts them into `pages/en/lb2/readmes`.
- [`update-community-readmes.sh`](https://github.com/strongloop/loopback.io/blob/gh-pages/update-community-readmes.sh) - Gets community READMEs and puts them into `pages/en/community/readmes`.

We have a [Jenkins pipeline](https://github.com/strongloop/loopback.io/blob/gh-pages/Jenkinsfile) that runs the scripts whenever there is a commit to the loopback.io repository.  
