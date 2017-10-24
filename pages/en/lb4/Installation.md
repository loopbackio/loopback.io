---
lang: en
title: 'Installation'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Installation.html
summary:
---

To get started with LoopBack 4, install the following:

- Node.js, either:
  - **Recommended**: [Version 8.x](https://nodejs.org/en/download/current/): The latest/current version.
  - [Version 6.x](https://nodejs.org/en/download/): The long-term support (LTS) version.
- [TypeScript](https://www.typescriptlang.org/index.html#download-links) version 2 or higher:

  ```
  $ npm i -g typescript
  ```

   This installs the TypeScript compiler command, `tsc`.

{% include tip.html content="
You're installing `typescript` globally as a shortcut to get you started quickly,
but it's not considered a best practice with Node.js.

Instead, a project should list build tool dependencies in `package.json` and provide scripts like `npm run build` to invoke them. This is possible because when npm invokes a package script, it automatically adds development dependencies to the project.
" %}
