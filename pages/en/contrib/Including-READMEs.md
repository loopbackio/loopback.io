---
title: Including READMEs from other repositories
lang: en
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Including-READMEs.html
summary: The LoopBack documentation includes a number of README files from related repositories, including examples, data source connectors, and components.
---
LoopBack comprises dozens of GitHub repositories.  Beyond the core repositories such as `loopback`, `loopback-datasource-juggler`, and `loopback-boot`, there are dozens of ancillary modules, that fall into three main categories:

- **Connectors**: `loopback-connector-rest`, `loopback-connector-mongodb`, `loopback-connector-soap`, dozens of others; see [LoopBack data source connectors](/doc/en/lb3/Connectors-reference.html).
- **Examples**: `loopback-getting-started`, many others; see [Tutorials and examples](/doc/en/lb3/Tutorials-and-examples.html).
- **Components**: `loopback-component-oauth2`, `loopback-component-storage`, `loopback-component-passport`, and so on. <br/>
NOTE: These READMEs are currently not being reused; rather the content is largely duplicated in the doc pages.  Ultimately, though, these should be single-sourced, as priorities permit.

Each of these repositories has its own documentation in the repository README file.  It makes sense to maintain the documentation there, close to the code, where it can be updated as part of related pull requests to that module.  At the same time, it's useful to aggregate all the documentation on this site.  So, essentially we want to keep the module-specific documentation in the README as well as in this repo (loopback.io).

Instead of manually copying the README files from their "home" repositories, we use Bash scripts to automate the process.  This enables each repository to maintain its own README and yet also provide the same information in the documentation, with a _single source_ to avoid divergence or duplication of effort. 

{% include important.html content="Due to this system of single-sourcing READMEs, to update one of the files in the `readmes` directory, you **must** open a PR in the corresponding repository, not here in the loopback.io repo.  For example, to update the file `pages/lb3/readmes/loopback-connector-mongodb.md`, edit [`strongloop/loopback-connector-mongodb/README.md`](https://github.com/strongloop/loopback-connector-mongodb/blob/master/README.md) and open a PR in the `loopback-connector-mongodb` repository.
" %}

There are two Bash scripts:

- [`update-readmes.sh`](https://github.com/strongloop/loopback.io/blob/gh-pages/update-readmes.sh) - Gets example, connector, and component READMEs and puts them into `pages/en/lb3/readmes`.
- [`update-community-readmes.sh`](https://github.com/strongloop/loopback.io/blob/gh-pages/update-community-readmes.sh) - Gets community READMEs and puts them into `pages/en/community/readmes`.

We have a [Jenkins pipeline](https://github.com/strongloop/loopback.io/blob/gh-pages/Jenkinsfile) that runs the scripts whenever there is a commit to the loopback.io repository.  

As for READMEs from `loopback-next`, they are always fetched together with other doc files. To add a new README to the docs, just create a new page with [README layout](https://loopback.io/doc/en/contrib/readmes.html) in the `loopback-next` repository. For an example of the README layout, see [here](https://github.com/strongloop/loopback-next/blob/master/docs/site/Self-hosted-REST-API-Explorer.md).
