---
lang: en
title: 'Getting started'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Getting-started.html
summary: Write and run a LoopBack 4 "Hello World" project in JavaScript and TypeScript.
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

The command will prompt you for values that it will use to fill out the `pacakge.json` properties.  Press ENTER to accept the default for all of them, except:
- For `entry point` enter `app.js`
- For `description` enter `Hello World for LoopBack 4`.

You can also enter values for entries like `git repository` and `keywords`,
but they are not required.

```
package name: (lb4-hello-world)
version: (1.0.0)
description: Hello World for LoopBack 4
entry point: app.js
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
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### Next steps

To continue, follow these procedures:

- [JavaScript project](#try-a-javascript-project)
- [TypeScript project](#try-a-typescript-project)

## Try a JavaScript project

If you're coding in JavaScript, follow these steps:

1. Create `app.js` file.
1. Run the project.

### Create `app.js`

Create a file named `app.js`, and copy the following into it:

```js
const Application = require('@loopback/core').Application;

const app = new Application();
app.bind('message').to('Hello world!');
app.get('message').then(value => {
  console.log(value);
});
```

{% include note.html content="It's common for the main JavaScript file to be called `index.js`,
but in the next section when you create a [TypeScript file](#try-a-typescript-project), named
`index.ts` that then gets compiled to `index.js`, which would overwrite the original file.
So for this step, you're going to use `app.js` instead.
" %}

### Run the project

To run your project, enter this command:

```shell
node app.js
```

You should see "Hello world!" written to the console.

## Try a TypeScript project

To try out a LoopBack 4 project in TypeScript, follow these steps:

1. Create `tsconfig.json` file.
1. Create `index.ts` file.
1. Build the project.
1. Run the project.

### Create `tsconfig.json` file

A `tsconfig.json` file in a directory indicates that it contains a TypeScript project, and specifies project files and  TypeScript compiler options. For more information, see the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

Create a new file called `tsconfig.json` in the project root directory.  
Edit this file and copy/paste the following JSON into it, depending on the version of Node.js you're using:

**With Node 8.x**:

```js
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "strict": true
  }
}
```

**With Node 6.x**:

```js
{                                                                                              
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true
  }
}
```

{% include note.html content="Be sure to set the `'compilerOptions.target'` property based on the version of Node you are using.
" %}

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

### Build the project

To compile the TypeScript file to JavaScript, enter this command:

```
./node_modules/typescript/bin/tsc
```

This command compiles `index.ts` to JavaScript, creating `index.js`.

### Run the project

Then run the generated `index.js` by entering this command:

```
node index.js
```

You should see "Hello world!" written to the console.

### Optional: edit package.json

{% include tip.html content= "It's a best practice to put define your build and run commands
in `package.json` to standardize the commands used.  For a simple project like this, though
it's optional.
" %}

Add the commands to build and run the project to `package.json`:

```js
...
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "./node_modules/typescript/bin/tsc",
  "start": "node index.js"
},
...
```

This enables you to:

- Build the project with `npm run-script build`.
- Run the project with `npm run-script start`.

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
    "target": "es2017", /* For Node.js v8, use "es2017"; for Node.js v6, use "es6" */
    "module": "commonjs",                     
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Build and run the project


Build the project by entering this command:

```
$ ./node_modules/typescript/bin/tsc
```

If you [added the build command to `package.json`](#optional-edit-packagejson), you can use the command `npm run-script build`.

Run the project by entering this command:

```
$ node index.js
```

If you [added the run command to `package.json`](#optional-edit-packagejson), you can use the command `npm run-script start`.

In another console window, enter this command:

```
$ curl http://localhost:3000/helloworld
```

Or, load [http://localhost:3000/helloworld](http://localhost:3000/helloworld) in your web browser.

You should see the `Hello world!` message.

Press **Ctrl-C** to stop the application.
