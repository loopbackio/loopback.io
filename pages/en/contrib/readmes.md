---
title: Readme layout
lang: en
tags: [contributing]
keywords:
summary: You can easily incorporate README files from other repositories into the documentation.
sidebar: contrib_sidebar
permalink: /doc/en/contrib/readmes.html
toc: false
---
As described in [Including READMEs](Including-READMEs.html), the LoopBack documentation
includes README markdown files from a number of repositories, including examples, connectors, and components.  This enables single-sourcing the information in the README so you'll see the same information in the documentation (this site), GitHub, and npm (for repositories published to npm).

Use the `readme` layout to incorporate the README file into the documentation;
for example:

```
---
title: "MongoDB Connector Tutorial"
lang: en
layout: readme
source: loopback-example-database
keywords: LoopBack
tags: example_app
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Connecting-to-MongoDB.html
summary: A brief tutorial on using the LoopBack MongoDB connector.
---
```

The `readme` layout automatically includes the markdown file specified
by the `source` property.  You _must_ specify the `source` property and a file with that name must exist in the `_includes/readme` directory.  
In the example above, there must be a
`_includes/readme/loopback-example-database` file.

The `layout` readme also links to the repository containing the original README file.
By default, it links to the master branch.  To link to a different branch,
specify the `page.branch` property; for example:

```
...
source: loopback-example-database
branch: mysql
...
```
The README files fetched from branches are named differently to distinguis them. Thus, the above example includes the readme file named `_includes/readmes/loopback-example-database-mysql` and links to the `mysql` branch in the `strongloop/loopback-example-database` GitHub repo.
