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
   npm i -g typescript
   ```
- [TypeScript Node](https://github.com/TypeStrong/ts-node#installation) version 3 or higher:

   ```
   npm i -g ts-node
   ```

## Install LoopBack core

Then add LoopBack 4 as a dependency to your Node.js project:

```shell
npm install -s @loopback/core
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

```shell
node index.js
```

You should see "world" written to the console.

### TypeScript project

{% include important.html content= "You must set `'target': 'es2017'` in your compiler options in your `tsconfig.json`.
" %}

```js
{
  "compilerOptions": {
    // ...
    "target": "es2017" //<-- Add this
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

Then run `index.ts`.  Do one of the following:

1. Install ts-node:

    ```
    npm install -g ts-node
    ```
1. Run the app:

    ```
    ts-node index.ts
    ```

You should see "world" written to the console.

OR:

1. Install [TypeScript](https://www.typescriptlang.org/index.html#download-links) >= 2.0.0

    ```
    npm i -g typescript
    ```

1. Compile `index.ts` by entering this command:

    ```
    tsc index.ts
    ```

1. Run the compiled JavaScript output file by entering this command:

   ```
   node index.js
   ```

   You should see "world" written to the console.
