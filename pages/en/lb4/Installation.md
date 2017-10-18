---
lang: en
title: 'Installation'
keywords: LoopBack 4.0, LoopBack 4
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Installation.html
summary:
---

## Prerequisites

Install the following:

- [Node.js](https://nodejs.org/en/download/) version 7 or higher.
- [TypeScript](https://www.typescriptlang.org/index.html#download-links) version 2 or higher:

  ```
  $ npm i -g typescript
  ```

   This installs the TypeScript compiler command, `tsc`.
- [TypeScript Node](https://www.npmjs.com/package/ts-node) version 3 or higher:

  ```
  $ npm i -g ts-node
  ```

- If your app doesn't already have a `package.json`, create a new one by entering the following command:

  ```
  $ npm init
  ```

The command will ask you a number of questions that it will use to fill out the `pacakge.json` properties.


## Install LoopBack core

Then add LoopBack 4 as a dependency to your Node.js project by entering this command:

```
$ npm i -s @loopback/core
```

## Create a Hello World project

With LoopBack 4 you can code in JavaScript or TypeScript.

### JavaScript project

Create `index.js`:

```js
const Application = require('@loopback/core').Application;

const app = new Application();
app.bind('hello').to('world');
app.get('hello').then(value => {
  console.log(value);
});
```

Then run `index.js`:

```
$ node index.js
```

You should see "world" written to the console.

### TypeScript project

If your app doesn't already have a `tsconfig.json` file, create one by entering the following command:
```
$ tsc --init
```

{% include important.html content= "You must set `\"target\": \"ES2017\"` in your compiler options in your `tsconfig.json`.
" %}

```js
{
  "compilerOptions": {
    // ...
    "target": "ES2017" //<-- Add this
  }
}
```

Create `index.ts`:

```ts
import {Application} from '@loopback/core';

const app = new Application();
app.bind('hello').to('world');
app.get('hello').then(value => {
  console.log(value);
});
```

To run `index.ts`, do one of the following:

**OPTION ONE: Run directly with ts-node**
```
$ ts-node index.ts
```

You should see "world" written to the console.

**OPTION TWO: Compile to JavaScript and run with Node**

1. Compile `index.ts` to JavaScript by entering this command:

    ```
    $ tsc index.ts
    ```

1. Run the JavaScript output file by entering this command:

   ```
   node index.js
   ```

**Result**

Either way, you should see "world" written to the console.
