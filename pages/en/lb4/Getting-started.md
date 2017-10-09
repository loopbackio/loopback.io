---
lang: en
title: 'Getting started'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Getting-started.html
summary:
---
## Prerequisites: JavaScript

Like other modern JavaScript frameworks (for example, Angular 2 and React) LoopBack 4 has an opinion about what flavor of JavaScript to use in your application.
The starting point is [ECMAScript 6](http://www.ecma-international.org/ecma-262/6.0/), plus the following non-standard add-ons:

 - Decorators
 - `async` / `await`
 - ES2015-modules

**All examples and snippets in the documentation use this flavor of JavaScript.**

{% include note.html content="This article will eventually cover:
- How to install the command line utility
- Using the utility to scaffold the skeleton app
- Running the app (node ., npm start)
" %}

## Installation

Make sure you have Node.js 8.0.0 or higher installed.

## A simple example

This example creates an `Application` and a `RestServer` that responds to all HTTP requests with the text "Hello World".

### Building a LoopBack 4 application
First create a new folder.  Then, create three files within this folder: `index.ts`, `tsconfig.json` and `package.json`.  

{% include code-caption.html content="index.ts" %}
```ts
import {Application} from '@loopback/core';
import {RestComponent, RestServer} from '@loopback/rest';

const app = new Application({
  components: [RestComponent],
});

(async function start() {
  // Grab the REST server instance
  const server = await app.getServer(RestServer);
  // Setup our handler!
  server.handler((sequence, request, response) => {
    sequence.send(response, 'hello world');
  });
  await app.start();
  console.log(`REST server listening on port ${server.getSync('rest.port')}`);
})();

```

Next, create a file called tsconfig.json to indicate that this is a TypeScript project and specify the TypeScript compiler options required.  For more details, see [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

{% include code-caption.html content="tsconfig.json" %}
```
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es2017",                          
    "module": "commonjs",                     

    /* Experimental Options */
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Finally, create a file called package.json. 

{% include code-caption.html content="package.json" %}
```
{
  "name": "getting-started",
  "description": "Getting Started for LoopBack 4",
  "version": "1.0.0",
  "scripts": {
    "start": "tsc && node index.js"
  },
  "dependencies": {
    "@loopback/core": "^4.0.0-alpha.16",
    "@loopback/rest": "^4.0.0-alpha.3"
  },
  "devDependencies": {
    "@types/node": "^8.0.34",
    "typescript": "^2.5.3"
  }
}
```

### Running the application

To install the required packages, enter:
```
npm install
```

To run the application, enter:
```
npm start
```

On another terminal, enter:
```
curl http://localhost:3000/helloworld
```
or load http://localhost:3000/helloworld in your web browser.

You should see the `Hello World` message.


## References

For more examples and tutorials, see [Examples-and-tutorials.html](http://loopback.io/doc/en/lb4/Examples-and-tutorials.html).