# LoopBack JSON Schemas
This repository contains [JSONSchemas](http://json-schema.org/) for the [LoopBack](http://loopback.io/) framework.

:warning: **These schemas are a work in progress & _do not_ capture every feature & setting.** [Consult docs](http://loopback.io/) for best results :+1:.

:information_source: These schemas target loopback **version 3** which is not 100% compatible with most loopback applications currently in production. I chose to target the next version in the interest of being forward looking & because time is limited.

# Contributing

[Roadmap in `TODO.md`](TODO.md). :point_left: This is where to contribute if you'd like to help!

## 1. Setup

1. Clone this repository
2. `npm install`

## 2. Working on schemas

1. Work on schemas in `src`. Use **localhost URLs for references** (these will be replaced before publish)
2. Serve them from localhost using `npm run serve`.
   * You can now point to the **local** versions of these schemas for testing from **a different VSCode window with a test project**. Example: <http://localhost:8090/loopback-datasources-config.json>
3. To try them out with a JSON document in vscode, create a document like this:
   ```
   {
     "$schema": "http://localhost:8090/loopback-datasources-config.json",
     "db": {
       "name": "db",
       "connector": "memory"
     },
     "mysql": {
       "host": "localhost",
       "url": "",
       "database": "boston",
       "name": "mysql",
       "connector": "mysql",
       "user": "root"
     }
   }
   ``` 
4. To get VSCode to reload your schema after changing it, add a query string to the end of the `$schema` URL:
  1. Edit schema in `src`
  2. in your test project window: `"$schema": "http://localhost:8090/loopback-datasources-config.json?x=1"`
  3. Edit schema in `src`
  4. in your test project window: `"$schema": "http://localhost:8090/loopback-datasources-config.json?x=2"`
  5. etc.

## 3. Publishing/Submitting PR

Production schemas are served from the `dist` directory. 

1. run `npm run build` in order to get your changes into the `dist` directory
2. commit, push, submit PR

PRs *must* have changes committed to both the `src` & `dist` directories. 

# Using the schemas

## Method 1. Point json files to schemas
Using an IDE that supports JSONSchemas (I recommend [VS Code](https://code.visualstudio.com/)), point to a schema thus:
`common/models/customer.json`
```
{
  "$schema" : "https://raw.githubusercontent.com/Sequoia/loopback-json-schemas/master/dist/loopback-model-definition.json"
}
```
## Method 2. Map schemas to file by file paths (VS Code)
Edit your `jsconfig.json` in VS Code to [map schemas to file paths in your project](https://code.visualstudio.com/Docs/languages/json#_json-schemas-settings):
```

    {
      "fileMatch": "/common/models/*.json",
      "url": "https://raw.githubusercontent.com/Sequoia/loopback-json-schemas/master/dist/loopback-model-definition.json"
    },
    {
```

This will automatically link schemas to paths so you don't have to use **Method 1**. [Read more](https://code.visualstudio.com/Docs/languages/json#_json-schemas-settings).

## Method 3. Use the VS Code plugin
:warning: WIP! [VS Code Plugin](https://marketplace.visualstudio.com/items?itemName=sequoia.loopback-json-schemas)

This will automatically link schemas to paths so you don't have to use **Method 2**.

# Developing
* Clone repository & run `npm install`
* Run `npm serve` to serve for local testing
  * You can create a separate project (e.g. in [VS Code](https://code.visualstudio.com/)) and point to your local definitions from a json file thus:
    ```
    {
      "$schema" : "http://localhost:8090/shared-refs.json"
    }
    ```
* When you're ready to push & submit a PR, run `npm run build` which
  1. copies files from `src` to `dist`
  2. replaces `http://localhost:8090` with the real base url for the schemas. This is currently github but will likely be schema store later.
