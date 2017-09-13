---
lang: en
title: 'Getting started'
keywords: LoopBack 4.0, LoopBack-Next
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Getting-started.html
summary:
---
## Prerequisites: JavaScript

Like other modern JavaScript frameworks (eg. [`Angular 2`](https://angular.io/) and [`React`](https://facebook.github.io/react/)) LoopBack.next has an opinion about what flavor of JavaScript you should be using in your application. Here is the basic recipe.

The starting point of this flavor of JavaScript is [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/). It includes some non-standard add-ons:

 - Decorators
 - `async` / `await`
 - ES2015-modules

**All examples and snippets in the documentation use this flavor of JavaScript.**

> the following items are not covered yet:
>  - How to install the command line utility
>  - Using the utility to scaffold the skeleton app
>  - Running the app (node ., npm start)

## A simple example

Here is the most basic LoopBack.next application:

```js
import {Application} from '@loopback/core';

const app = new Application();
app.handler((sequence, request, response) => {
  sequence.send(response, 'hello world');
});

(async function start() {
  await app.start();
  console.log(`The app is running on port ${app.getSync('http.port')}`);
})();
```

The example above creates an `Application` that responds to all HTTP requests with the text "Hello World".

To see what the complete application looks like, see [loopback-next-hello-world](https://github.com/strongloop/loopback-next-hello-world/).

The following guides introduce the fundamental concepts of LoopBack.next required to build scalable, maintainable, and consistent APIs.

If you want to try it out locally follow the instructions in [Installation](Installation.html).  Let's go!
