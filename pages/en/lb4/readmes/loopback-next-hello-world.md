# loopback-next-hello-world

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/strongloop/loopback) [![Build Status](https://travis-ci.org/strongloop/loopback-next-quick-start.svg?branch=master)](https://travis-ci.org/strongloop/loopback-next-quick-start) [TODO Code coverage - coveralls]

## Table of Contents
* [Overview](#overview)
* [Background](#background)
* [Setup](#setup)
* [Try It Out!](#tryitout)
* [Testing](#testing)
* [Project Structure](#structure)
* [Writing Controllers](#controllers)
* [Using a Custom Sequence](#sequence)
* [TypeScript Configuration](#typescriptConfiguration)
* [Other Resources](#resources)
* [Contribute](#contribute)

## <a name="overview"></a>Overview

#### Welcome to the hello-world example for LoopBack.next!
LoopBack makes it easy to build modern applications that require complex integrations. 

LoopBack.next, the next version of LoopBack, is being designed to make it even easier to extend the framework for your own needs. Loopback.next will also include the latest JavaScript features.

The goal of this tutorial is to show you what a basic, 'hello-world' LoopBack.next app looks like and how it works.

This example will show you how to: 

* create a LoopBack.next server
* make a request to the server to fetch content

This example will explain:

* the structure of a LoopBack.next application
* how to add a custom component (TODO)
* how to add a custom sequence

When you have this example installed and running, you will be able to make a request to the server with a name and get back a HTTP 200 response.

## <a name="background"></a>Background

For in-depth information about the concepts underlying Loopback.next, check out:

* [Crafting LoopBack Next](http://loopback.io/doc/en/lb4/Crafting-LoopBack-Next.html)
* [Thinking in LoopBack](http://loopback.io/doc/en/lb4/Thinking-in-LoopBack.html)

## <a name="setup"></a>Setup 

1. Install `node`:

	You should have Node.js version 8.x or newer installed.
	
	> NOTE: Want to switch Node versions quickly and easily? Try [`nvm`](https://github.com/creationix/nvm/blob/master/README.md). 
		
	For the latest information on project dependencies for LoopBack, please check this link: 
[http://loopback.io/doc/en/lb4/Installation.html](http://loopback.io/doc/en/lb4/Installation.html).

2. Clone this repo: 
	
	`git clone https://github.com/strongloop/loopback-next-hello-world.git`

3. Switch to your new directory: 
	
	`cd loopback-next-hello-world`

4. Install your dependencies: 

	`npm install`

5. Start the application! 
	
	`npm start`

> Note: `npm start` automatically builds the project via the `prestart` npm script in `package.json`. If you would like to build this project separately, use `npm run build`.
 
## <a name="tryitout"></a>Try It Out!

Run `curl localhost:3000/helloworld?name=YOUR_NAME` to try out your new LoopBack server.

Example:
```
curl localhost:3000/helloworld?name=Anne
```
The output will be:
```
Hello world Anne {"username":"a","password":"a"}
```

## <a name="testing"></a>Testing

To test this application use `npm test`.

## <a name="structure"></a>Project structure

A TypeScript project will have separate `src` and `lib` directories, for source and distributable files. TypeScript (.ts) files from your `src` folder are compiled into JavaScript (.js) files and output in the `lib` folder.  

| Name | Description|
|------|------------|
|.github/ISSUE_TEMPLATE.md|use this template to report an issue |
|.github/PULL\_REQUEST\_TEMPLATE.MD|use this template to help you open a pull request |
|lib/|this directory is created when you build your project and contains the distributable code built by TypeScript. This is the code you deploy.|
|node_modules|this directory contains your npm modules|
|src/|this directory contains your source code. TypeScript compiles this code and outputs it to the `lib/` directory.|
|src/controllers|This folder contains controllers, which implement the operations defined in your OpenAPI spec file|
|src/controllers/hello-world.api.ts|the OpenAPI spec file|
|src/controllers/hello-world.ts|this controller implements the helloWorld operation|
|src/providers/|providers implement the functionalities defined by components|
|src/providers/auth-strategy.ts|this file contains the authentication strategy that is bound to the [Authentication component](https://github.com/strongloop/loopback-next/tree/master/packages/authentication)|
|src/application.ts|this file defines your application (components + sequence)|
|src/index.ts|this is the entry point of your application|
|src/sequence.ts|this file contains your custom sequence|
|test/|this directory contains your tests|
|package.json	|this documents this project's dependencies and their versions, and also includes important repository, author, and license information|
|README.md|this is the file you're reading right now!|
|tsconfig.json|the configuration settings for TypeScript compilation|

#### <a name="controllers"></a>Controllers

Controllers implement the operations defined in your OpenAPI spec file. Find a guide to writing and testing controllers in LoopBack.next [here](http://loopback.io/doc/en/lb4/Thinking-in-LoopBack.html#incrementally-implement-features).

#### <a name="sequence"></a>Adding a Custom Sequence

A [sequence](http://loopback.io/doc/en/lb4/Sequence.html) is a stateless grouping of actions that allow you to control how your application responds to requests. All LoopBack.next applications have a default sequence with actions that find the route, parse the parameters, invoke the route (that is, runs the associated controller), await the result of that route, send the response, and catch any errors.

You can create custom sequences that can inject new logic or behaviors at any point, accepting the output of any action and passing data on to the next action. Sequences must provide a response to a request, and they are registered when you define your application (in your `application.ts` file).

```ts
import {MySequence} from './sequence';
app.sequence(MySequence);
```


### <a name="typescriptConfiguration"></a>TypeScript Configuration

In your `tsconfig.json` file, you can specify options for TypeScript to use when compiling your project. 

Here is the `tsconfig.json` for this project: 

```json{
  "compilerOptions": {                     
    "module": "commonjs",
    "target": "es2017",
    "outDir": "./lib",
    "experimentalDecorators": true,
    "baseUrl": "./src"    
  },
  "exclude": [
    "node_modules/**"
  ]
}
```
| compilerOption | Description |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `"module": "commonjs"`             | The **output** module type (in your `.js` files). Node uses commonjs, so that is what we use          |
| `"target": "es2017"`                  | The output language level                               |
| `"outDir": "./lib"`                 | Location to output `.js` files                                                        |
| `"baseUrl": "./src"`                   |  |
| `experimentalDecorators`                     | enables support for decorators (more information: [https://www.typescriptlang.org/docs/handbook/decorators.html](https://www.typescriptlang.org/docs/handbook/decorators.html))|

> NOTE: We recommend you use [VSCode](https://code.visualstudio.com/) for this hello-world example because it has built-in TypeScript support, but you can use any editor. For more information about using TypeScript with your editor of choice, check out [TypeScript Editor Support](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

Find more information about TypeScript [here](https://www.typescriptlang.org/docs/).


## <a name="resources"></a>Other Resources
* Current [LoopBack documentation](http://loopback.io)
* [LoopBack.next repo](https://github.com/strongloop/loopback-next)
* Check out the [Strongloop blog](https://strongloop.com/strongblog/tag_LoopBack.html) for more posts about LoopBack
* To keep up-to-date with LoopBack announcements, sign up for the Strongloop newsletter [here](https://strongloop.com/newsletter/).

## <a name="contribute"></a>Contribute to LoopBack
* [Guidelines](http://loopback.io/doc/en/contrib/index.html)
* [Join the LoopBack.next contributors list](https://github.com/strongloop/loopback-next/issues/110)