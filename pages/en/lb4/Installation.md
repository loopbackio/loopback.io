---
lang: en
title: 'Installation'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Installation.html
summary:
---

## Prerequisite: Node.js

To get started with LoopBack 4, install Node.js:
  - **Recommended**: [Version 8.x](https://nodejs.org/en/download/current/): The latest/current version.
  - [Version 6.x](https://nodejs.org/en/download/): The long-term support (LTS) version.

## Install dependencies

{% include note.html content="If you're just learning LoopBack 4, **go straight to [Getting started](Getting-started.html)** to learn how to set up a LoopBack 4 project.
This section outlines the general requirements to use LoopBack 4 with a project.
" %}

To use LoopBack 4 in a project, make sure you're in your project root (use the command `$ cd <my-project-root>`), then install the following packages as dependencies:

- [TypeScript](https://www.typescriptlang.org/index.html#download-links) version 2 or higher:

  ```
  $ npm i -s typescript
  ```

- [TypeScript Node](https://www.npmjs.com/package/ts-node) version 3 or higher:

  ```
  $ npm i -s ts-node
  ```
