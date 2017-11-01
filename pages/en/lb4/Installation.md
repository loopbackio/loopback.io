---
lang: en
title: 'Installation'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Installation.html
summary:
---

## Prerequisite: install Node.js

To get started with LoopBack 4, install Node.js:
  - **Recommended**: [Version 8.x](https://nodejs.org/en/download/current/): The latest/current version.
  - [Version 6.x](https://nodejs.org/en/download/): The long-term support (LTS) version.

## Install TypeScript

To use LoopBack 4 in a project, make sure you're in your project root (use the command `$ cd <my-project-root>`), then install [TypeScript](https://www.typescriptlang.org/index.html#download-links) (version 2 or higher) as a project dependency:

```
$ npm i -s typescript
```

## Install LoopBack core package

All LoopBack 4 projects require at least [LoopBack 4 core](https://www.npmjs.com/package/@loopback/core).
Install it with the following command:

```
$ npm i -s @loopback/core
```

{% include tip.html content="The `@loopback/core` package is the bare minimum; depending on your project's requirements, you may need to install other LoopBack packages.  See [Getting started](Getting-started.html) for an example.
" %}

Now `package.json` should include these dependencies (you may see different version numbers):
```
...
"dependencies": {
  "@loopback/core": "^4.0.0-alpha.16",
  "typescript": "^2.5.3"
}
...
```
