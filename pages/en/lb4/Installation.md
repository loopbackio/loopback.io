---
lang: en
title: 'Installation'
keywords: LoopBack 4.0, LoopBack-Next
tags:
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Installation.html
summary:
---

## Prerequisites

Make sure you have installed
[Node.js](https://nodejs.org/en/download/current/) version 8.0.0 or higher.

## Install LoopBack core

Then add LoopBack.next as a dependency to your Node.js project:

```shell
npm install --save @loopback/core
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

In your `tsconfig.json` `compilerOptions` configuration, add `"target": "es2017"`:

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
