### Install TypeScript as development dependency

To use LoopBack 4 in a project, make sure you're in your project root (use the command `cd <my-project-root>`), then install [TypeScript](https://www.typescriptlang.org/index.html#download-links) (version 2 or higher) as a development dependency:

```
$ npm i --save-dev typescript
```

### Install LoopBack core package

All LoopBack 4 projects require at least [LoopBack 4 core](https://www.npmjs.com/package/@loopback/core).
Install it with the following command:

```
$ npm i --save @loopback/core
```

{% include tip.html content="The `@loopback/core` package is the bare minimum; depending on your project's requirements, you may need to install other LoopBack packages.  See the [Tutorial](Tutorial.html) for an example.
" %}

Now `package.json` should include these dependencies (you may see different version numbers):
```
...
"dependencies": {
  "@loopback/core": "^4.0.0-alpha.16"
},
"devDependencies": {
  "typescript": "^2.5.3"
}
...
```
