---
lang: en
title: 'Introduction to LoopBack 4 development'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Intro-to-LB4-development.html
summary:
---
## Introduction

This article is an introduction to LoopBack 4 for LoopBack 3.x developers, who have been using:

- Nodejs v4, v6, or v8.
- JavaScript, specifically [ECMAScript 5](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition),
  with no object-oriented features such as `class`, `implements` (abstract class), and `extends` (inheritance).  Instead, you use  [util.inherits](https://nodejs.org/docs/latest/api/util.html#util_util_inherits_constructor_superconstructor) everywhere.  For asynchronous programming, you've used the `async` package or Promises.

We assume you don't have experience with [TypeScript](https://www.typescriptlang.org/).

### We're not in Kansas any more

There are lot of fundamental differences between LoopBack 4 and LoopBack 3.x
The LoopBack 4 source code does not look like JavaScript, do if you're expecting standard JavaScript, you'll quickly be disoriented.  For example:

What are the [square brackets](http://es6-features.org/#ComputedPropertyNames) around object property name in this code sample?
```js
var obj = {
  [key]: 'Ted Johnson',
}
```

I see how [the class](http://es6-features.org/#ClassDefinition) is defined.  My source code editor such as [VS Code](https://code.visualstudio.com/) shows type definitions in mouse-over pop-ups, which is cool, but what's that [@inject](https://www.typescriptlang.org/docs/handbook/decorators.html)?

```js
export class MyProvider implements Provider<Strategy> {
  constructor(
    @inject(bindingKey)
    metadata: Metadata,
  ) {}

  value() : ValueOrPromise<Strategy> {}
}
```

I know `async`, but wait, what's `await`?

```js
describe('api spec', () => {
  let app = createApp();
  let apiSpec = app.getApiSpec();

  it('is valid', async () => {
    await validateApiSpec(apiSpec);
  });
});
```

Secondly, there are several new technologies we use in LoopBack 4 and each of them is significantly different from what we're used to.  I mentioned [ECMAScript 5](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition) and [TypeScript](https://www.typescriptlang.org/) earlier; and [OpenAPI](https://www.openapis.org/) is another.  They are cool new technologies that make LoopBack 4 shine, but they will require some getting used to.

This blog will cover these "conceptual roadblocks" in the following ("Foundation") section.  The remainder covers LoopBack 4 with focus on three core concepts: Controllers, Components, and Sequence.

## Foundation

I'm going to summarize a few key concepts and a list of tools I found useful.  That way, you can quickly understand the big picture without getting bogged down in details of each technology; and with the list of tools, you can go back to the details when needed.

LoopBack 4 is built on TypeScript and OpenAPI.  TypeScript is built on ECMAScript 8.  Quickly browsing those technologies will help you find your footing.

### ECMAScript

**[ECMAScript 5 vs. 6 — New Features: Overview and Comparison](http://es6-features.org/#Constants)**
The ES5 vs. ES6 overview and comparison site is helpful.  Reading through the short list of code comparison between ES5 and ES6 provides a good perspective.  

ECMAScript is the standard for JavaScript:
- [ECMAScript 8](https://en.wikipedia.org/wiki/ECMAScript#8th_Edition_-_ECMAScript_2017)
- [The ECMAScript 8 specification](https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf)

**[async/await, a.k.a "async functions"](https://tc39.github.io/ecmascript-asyncawait/)**
The ECMA TC39 committee is responsible for evolving the ECMAScript programming language and authoring the specification.
`Async Functions and Await` is the notation LoopBack 4 uses all over the place for asynchronous operations.  You can use the standard `try-catch` clause to catch errors.  That is the ultimate.  Here is my opinionated historical view of `asynchronous operations` in Nodejs.

Note that the TypeScript code piece in each pattern can be transpiled and run by: `tsc codepiece.ts; node codepiece.js`  Please note that the function `randomError` is shared by multiple functions.

### TypeScript

[TypeScript](https://www.typescriptlang.org/) provides a type system for ECMAScript 8.

Some good references:
- [Getting Started With TypeScript](https://basarat.gitbooks.io/typescript/docs/types/type-system.html): a good introduction.
- [Declaration Files](https://basarat.gitbooks.io/typescript/docs/types/ambient/d.ts.html)
- [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

{% include tip.html content="
When you install a module from npm, make sure you've got the accompanying type definition file as well.  For example when you install Passport with `npm install passport`, also install the type definition with: `npm install -S @types/passport`
" %}

### OpenAPI

[OpenAPI](https://www.openapis.org/) (previously know as Swagger), is a specification for machine-readable interface files for describing, producing, consuming, and visualizing REST web services.

LoopBack 4 defines all endpoints declaratively using the OpenAPI specification.  The [Swagger editor](https://editor.swagger.io) is useful to debug and build complex APIs.

In a LoopBack 4 app, typically you don't put the header portion of the API spec(see below) because LoopBack 4 adds it in @api decorator (we'll discuss "decorator" later in this blog).  [The swagger editor](https://editor.swagger.io), which is out side of LoopBack 4, will complain without the header portion.

```js
{
  "swagger": "2.0",
  "basePath": "/",
  "info": {
    "title": "LoopBack Application",
    "version": "1.0.0",
  },
  paths:{
      ...
  }
}
```

LoopBack 4 also provides `validateApiSpec` in the testlab so that you can validate it in `npm test` of your app.  

## Asynchronous patterns

### Asynchronous pattern 1 : plain JavaScript

Nothing fancy; just plain callback in plain JavaScript.  It's very difficult to visually understand runtime behavior of the code.

```js
function randomError() {
  if (Math.random() < 0.5) {
    throw new Error(); // '--- error occurred');
  } else {
    // console.log('--- error did not occur');
  }
}

function plainCallback() {
  try {
    randomError();
    console.log('From plainCallback: Success: In plainCallback');
    setTimeout(callback2, 500);
  } catch(err) {
    console.log('From plainCallback: Failure: In plainCallback');
  }
}

function callback2() {
  try {
    randomError();
    console.log('From plainCallback: Success: In callback2');
  } catch(err) {
    console.log('From plainCallback: Failure: In callback2');
  }
}

setInterval(plainCallback, 500);
```

### Asynchronous pattern 2 : async

The [`async`](https://caolan.github.io/async/) package counts two million daily downloads.  It provides a set of programming interfaces for various asynchronous runtime structure. It's easy to visually understand the dynamic behavior.  In this example, you can easily switch between sequential execution and parallel execution of the callback function.  I bet many of you are already using it.  `series` and `parallel` used below are just two of dozens of interfaces `async` package supports.

```js
declare function require(name:string): any;
var async = require('async'); // 2 million downloads/day

function cbSeries1(cb) {
  let error: string = null;
  try {
    randomError();
  } catch(err) {
    error = 'In Series 1';
  }
  cb(error, 'one');  
}

function cbSeries2(cb) {
  let error: string = null;
  try {
    randomError();
  } catch(err) {
    error = 'In Series 2';
  }
  cb(error, 'two');
}

function asyncSeries() {
  async.series( // Try to replace async.series call with async.parallel call.  It works.  
    [cbSeries1, cbSeries2],
    function(err, result) {
      if (err) console.log('From asyncSeries: Failure:', err);
      else console.log('From asyncSeries: Success:', result);
    });
}

setInterval(asyncSeries, 500);
```

### Asynchronous pattern 3 : Promises

With Promises, runtime behavior of asynchronous operations such as error case handling is visually easier to understand, i.e., error propagation in async calls.  But don't forget try-catch for synchronous error handling.  We need both.

***Note that Promise and Async/Await comparison below is clear in the examples below.  They are apples-to-apples comparison.  However, `async package` is a different breed.***

```js

// promise function is used in Pattern 3 and Pattern 4.
function promise() {
  return new Promise((resolve, reject) => {
    try {
      randomError();
      resolve('Success: In promise');
    } catch(err) {
      reject('Failure: In promise');
    }
  });
}


function promiseThenCatch() {
  promise()
    .then((msg) => {
      console.log('From promiseThenCatch:', msg);
    })
    .catch((err) => {
      console.log('From promiseThenCatch:', err);
    });
}

setInterval(promiseThenCatch, 500);
```

### Asynchronous pattern 4 : Async/Await

This is the ultimate.  It does not look like asynchronous anymore.  You can examine the transpiled JavaScript code to see how elegant the TS code is.

```js
async function asyncAwait() {
  try {
    let msg = await promise();
    console.log('From asyncAwait:', msg);
  } catch(err) {
    console.log('From asyncAwait:', err.message || err);
  }
};

setInterval(asyncAwait, 500);
```

One more async/await code piece I like: it's `pause for 1000 msec` to wait in your code.  Under the hood, it's asynchronous operation, but it looks like sequential call to delay function multiple times.  Sweet!

The following code piece is inspired by [Async Await Support in TypeScript](https://basarat.gitbooks.io/typescript/docs/async-await.html) section of [Getting Started With TypeScript](https://www.gitbook.com/book/basarat/typescript/details).  

```js
function delay(milliseconds: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

async function awaitDelay() {
  console.log(new Date());
  await delay(5000);
  console.log(new Date());
  await delay(3000);
  console.log(new Date());
  await delay(1000);
  console.log(new Date());
}

awaitDelay();
```


## LoopBack 4

We're going to study three key concepts: controller and API spec, components and providers, and custom sequence.  Working sample codes are available in several places, one of which is [Hello World](https://github.com/strongloop/loopback-next-hello-world).  I'm going to discuss specific conceptual roadblocks I stumbled upon.

Skeleton of the client code looks like this:
```js
  const app = new Application({
    components: [HisComponent],
   });
  app.controller(HelloWorldController);
  app.sequence(MySequence);
```

### Controllers and API spec

Let's take a look at HelloWorldController code and associated API spec first, then we examine what they do.

```js
import {api, inject} from '@loopback/core';
import {apiSpec} from './hello-world.api';

@api(apiSpec)
export class HelloWorldController {
  @inject('defaultName');
  private name: string;
  constructor() {}

  helloWorld(name?: string) {
      name = name || this.name;
      return `Hello world ${name}!`
  }
}
```

```js
// hello-world.api.ts
export const apiSpec =
{
  "paths": {
    "/helloworld": {
      "get": {
        "x-operation-name": "helloWorld",
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "description": "Your name.",
            "required": false,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Returns a hello world with your (optional) name."
          }
        }
      }
    }
  }
}
```

`@api` is a [class decorator](https://www.typescriptlang.org/docs/handbook/decorators.html).  The class decorator,
`api` is a function that is called when the class, HelloWorldController is defined (only once).  In this case, `api` function attaches the API specification to HelloWorldController class.  The decorator website describes some relatively complex concept, but we can just read the class decorator section to get a high-level understanding of decorator.  The concept is similar for other types of decorators.  That's enough for now.

In the above sample code, `@inject` is a `property decorator` defined by LoopBack 4.  It's a very important LoopBack 4 concept.  It works this way: `@inject` acquires the value bound to the key: `defaultName` in the application's context, then assigns the value to `name` property when the class `HelloWorldControlle` is instantiated.

Please note that we introduced another new term, `Context`.  Context is simply a memory space where LoopBack 4 maintains key-value pairs.  There are two types of context: application context and request context.  In this blog, we deal with only application context.

The LoopBack 4 specific decorator, `@inject` can also be used as a `parameter decorator` for constructor, e.g.:

```js
class MyClass {
  constructor(
    @inject('defaultName') name: string
  } {}
}
```

In this case, the argument `name` is replaced with the value bound to the key `defaultName`.  `@inject` acquires the value bound to the `defaultName` key in the application's context, then assigns the value to `name` argument when the MyClass is instantiated.

Who binds `defaultName` key to the value?  It depends.  You can do that by app.bind(`defaultName`).to('Ted Johnson').  You can `get` the value string by app.getSync('defaultName').  The main usage of `@inject` is discussed in `Components and Providers` section.

### Components and providers

Component defines a functionality.  LoopBack 4 application can be viewed as a collection of components.  In a component, one or more providers implement the functionality.  In the Logger provider example below, (a) 'logger' key is  bound to the provider instance when Application is instantiated, and (b) the client is acquiring the logger instance by `app.get('logger')` and using the logger to display the message, 'My application has started.'.  Please also note that another component, `AuthenticationComponent` is attached to the application.

Let's take a close look at `LoggerComponent` implementation.  Please note that the key `logger` is bound to the logger instance.  With the binding, the client can access the logger instance by `app.get('logger')`.

Client:

```js
const app = new Application({
  components: [AuthenticationComponent, LoggerComponent],
});

const logger = await app.get('logger');
logger.info('My application has started.');
```

Implementor:

```js
import {Component} from '@loopback/core';
const key = 'logger';

export class LoggerComponent implements Component {
  providers = {
    [key]: LoggerProvider,  // [key] is a computed property name
  }
}
```

Note: What's computed property name ?  See http://es6-features.org/#ComputedPropertyNames

```js
import {Provider} from '@loopback/context';

export class LoggerProvider implements Provider<Logger> {

  ... logger implementation comes here.

}
```

### Custom Sequence

Controllers implement end points and business logic for each end point of the application.   Sequence defines the functional structure of the application.  There can be many end points associated with the application.  There is only one sequence per application.

Usually, the default sequence implemented by LoopBack 4 core works for many applications.  In such a case, there is nothing the application needs to do.  However, to add a piece of new functional element to the application, you will implement the entire sequence in your application.  Here is how it works:

Client:
```js
const app = new Application();
app.sequence(MySequence);
```

Below is an example implementation of sequence.  We've studied `@inject` as a parameter decorator.  The four `sequence.actions` keys are bound to the corresponding essential sequence actions.  Since the essential sequence actions are implemented by LoopBack 4, you can simply inject them in your custom sequence as shown below.

The custom sequence below is defined to do something special with req and res objects.  That's the sole purpose of MySequence.

```js
import {DefaultSequence, FindRoute, InvokeMethod, Reject, Send, inject} from '@loopback/core';

class MySequence extends DefaultSequence {
  constructor(
    @inject('sequence.actions.findRoute') protected findRoute: FindRoute,
    @inject('sequence.actions.invokeMethod') protected invoke: InvokeMethod,
    @inject('sequence.actions.send') public send: Send,
    @inject('sequence.actions.reject') public reject: Reject,
  ) {
    super(findRoute, invoke, send, reject);
  }

  async handle(req: ParsedRequest, res: http.ServerResponse) {

    ... we can grab req and res and do something here.  This is the purpose
    ... of MySequence.

    await super.handle(req, res);
  }
}
```

## How to test and validate an API spec

As we saw in early part of this blog, the API spec is attached to the application controller.
Once attached, the loaded API spec can be accessed by `app.getApiSpec()`.

LoopBack 4 provides the OpewnAPI spec validator, `validateApiSpec` as part of LoopBack 4 lestlab.

```js
const validateApiSpec = require('@loopback/testlab').validateApiSpec;

describe('Application\'s Api Spec', () => {
  let app, apiSpec;
  before(() => { // executed once before any tests
    app = createApp();
    apiSpec = app.getApiSpec();
  });

  it('is valid', async () => {
    await validateApiSpec(apiSpec);
  });
});

```

## How to debug API spec

[The Swagger Editor](https://editor.swagger.io) is useful to interactively debug your OpenAPI specs.
You can start with JSON or YAML.  Just cut and paste the `helloworld` API spec (below) into the swagger editor window.  It will ask you to use JSON or covert it to YAML and build the API spec in YAML.

```js
{
  "swagger": "2.0",
  "basePath": "/",
  "info": {
    "title": "LoopBack Application",
    "version": "1.0.0",
  },
  "paths": {
    "/helloworld": {
      "get": {
        "x-operation-name": "helloWorld",
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "description": "Your name.",
            "required": false,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Returns a hello world with your (optional) name."
          }
        }
      }
    }
  }
}
```
