---
title: Including READMEs from other repositories
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Including-READMEs.html
summary:
---
The LoopBack documentation includes a number of README files from  different
repositories, including repositories for examples and data source connectors
(NOTE: The connector READMEs are currently included manually).

Instead of manually copying the README files, we use a script, [get-readmes](https://github.com/strongloop/get-readmes), to automate the process.
This enables each repository to maintain its own README and yet also provide
the same information in the documentation, with a single source to avoid differences in the information or duplication of maintenance effort.

The intent is that the script be executed periodically to ensure that the READMEs stay up to date with the source repositories.  

The script reads `repos.json` (in the specified directory), which lists the repositories from which to fetch README files.  It then saves the README files to the specified output folder.

To update the README files:

1. clone the `get-readmes` repository into the root directory of this repository.
```git clone https://github.com/strongloop/get-readmes.git```
1. Install dependencies:
 ```
 npm install
cd get-readmes
 ```
1. Run the script as follows:
```
$ node get-readmes --out=../_includes/readmes --repos=../_data
```

{% include note.html content="There is currently no provision for localizing (translating) the README content.  Instead, you can replace the \"include\" with the translated README content.
" %}
