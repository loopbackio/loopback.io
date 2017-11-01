---
lang: en
title: 'Getting started'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Getting-started.html
summary: Write and run a LoopBack 4 "Hello World" project
---
## Prerequisites

Follow the instructions in [Installation](Installation.html) to install the prerequisites for a LoopBack 4 project.

With LoopBack 4 you can code in JavaScript or TypeScript.  In either case, do the following:

1. Create a new directory called `lb4-hello-world` and make that your current directory:
```
$ mkdir lb4-hello-world
$ cd lb4-hello-world
```
1. [Use npm to create a `package.json` file](#use-npm-to-create-packagejson), following the instructions below.
1. [Install project dependencies.](#install-project-dependencies).

### Use npm to create `package.json`

Regardless of whether you're going to code in JavaScript or TypeScript, you need to create  a `package.json` file.
The easiest way to create a new one is with the following command:

  ```
  $ npm init
  ```

The command will prompt you for values that it will use to fill out the `pacakge.json` properties.  Press ENTER to accept the default for all of them, except for `description` enter `Hello World for LoopBack 4`.
You can also enter values for entries like `git repository` and `keywords`,
but they are not required.

```
package name: (lb4-hello-world)
version: (1.0.0)
description: Hello World for LoopBack 4
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
```

The file will then contain the following:

```js
{
  "name": "lb4-hello-world",
  "version": "1.0.0",
  "description": "Hello World for LoopBack 4",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### Install project dependencies

Now you're going to use npm to add some project dependencies:

- [TypeScript](https://www.typescriptlang.org/index.html#download-links) version 2 or higher:

  ```
  $ npm i -s typescript
  ```
  
- [TypeScript Node](https://www.npmjs.com/package/ts-node) version 3 or higher:

  ```
  $ npm i -s ts-node
  ```

- [LoopBack 4 core](https://www.npmjs.com/package/@loopback/core):

  ```
  $ npm i -s @loopback/core
  ```

Now `package.json` should include these dependencies (you may see different version numbers):
```
...
"dependencies": {
  "@loopback/core": "^4.0.0-alpha.16",
  "ts-node": "^3.3.0"
}
...
```

### Next steps

**To continue, follow one of these procedures**:

- [JavaScript project](#try-a-javascript-project)
- [TypeScript project](#try-a-typescript-project)

## Try a JavaScript project

If you're coding in JavaScript, follow these steps:

1. Create `index.js` file.
1. Run the project.

### Create `index.js`

Create a file named `index.js`, and copy the following into it:

```js
const Application = require('@loopback/core').Application;

const app = new Application();
app.bind('message').to('Hello world!');
app.get('message').then(value => {
  console.log(value);
});
```

### Run the project

To run your project, enter this command:

```shell
node index.js
```

You should see "Hello world!" written to the console.

## Try a TypeScript project

If you're coding in TypeScript, follow these steps:

1. Create `tsconfig.json` file.
2. Create `index.ts` file.
1. Run the project.

### Create `tsconfig.json` file

A `tsconfig.json` file in a directory indicates that it contains a TypeScript project. The `tsconfig.json` file specifies the root files and the TypeScript compiler options. For more information on `tsconfig.json`, see [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

Create a new `tsconfig.json` file by entering the following command:

```
$ tsc --init
```

Now edit this file, because you need to change some of the default values.

{% include important.html content= "You must set the `'compilerOptions.target'` property in  your project's `tsconfig.json` file based on the version of Node you are using.
" %}

**With Node 8.x**:

```js
{
  "compilerOptions": {
    ...
    "target": "es2017",
    ...
  }
}
```

**With Node 6.x**:

```js
{
  "compilerOptions": {
   ...
    "target": "es6",
    ...
  }
}
```

### Create `index.ts`

Create a file named `index.ts` and copy the following code into it:

```ts
import {Application} from '@loopback/core';

const app = new Application();
app.bind('message').to('Hello world!');
app.get('message').then(value => {
  console.log(value);
});
```

### Run the project

Then run `index.ts` by entering this command:

```
ts-node index.ts
```

You should see "Hello world!" written to the console.

## Try a more complex TypeScript project

This example builds on the basic "Hello world" example with an `Application` and a `RestServer` that responds to all HTTP requests with the text "Hello World".

{% include note.html content= "This section assumes you've already created the
[basic TypeScript project](#try-a-typescript-project).
" %}

### Install LoopBack REST package

Install the LoopBack REST package with npm by entering this command:

```js
npm i -s @loopback/rest
```

This adds the `@types/rest` package to the `dependencies` property of `package.json`.


### Install Node type definitions package

Install the `@types/node` package as a dependency by entering this command:

```js
npm i -s @types/node
```

This adds the `@types/node` package to the `dependencies` property of `package.json`.

### Modify `index.ts`

Copy the following code into the `index.ts` file, replacing the entire
contents of the file:

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
    sequence.send(response, 'Hello world!');
  });
  await app.start();
  console.log(`REST server listening on port ${server.getSync('rest.port')}`);
})();
```
### Modify `tsconfig.json`

Edit `tsconfig.json` as follows:

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

{% include note.html content="You can use the `tsconfig.json` file generated by `tsc --init`, but you may need to edit it to ensure
that it is proper JSON. "%}

### Run the project

To install the required packages, enter:
```
$ npm install
```

To run the application, enter the command:
```
$ ts-node index.ts
```

In another console window, enter this command:

```
$ curl http://localhost:3000/helloworld
```
or load [http://localhost:3000/helloworld](http://localhost:3000/helloworld) in your web browser.

You should see the `Hello world!` message.

Press **Ctrl-C** to stop the application.
