# LoopBack **3** JSON Schemas
This repository contains [JSONSchemas](http://json-schema.org/) for the [LoopBack](http://loopback.io/) framework. Loopback uses lots of complex json files for configuration, by linking these files to a json schema you can get "intellisense" style type-ahead and some schema validation (detection of illegal properties or types).

:warning: **These schemas _do not_ capture every feature & setting.** They are for hints & discovery while coding. [Consult docs](http://loopback.io/) for best results :+1:.

:information_source: These schemas target loopback **version 3**.

# Using the schemas

## Method 1. Use the VS Code plugin :white_check_mark: *recommended*

:point_right: **The [VS Code Plugin](https://marketplace.visualstudio.com/items?itemName=sequoia.loopback-json-schemas) is the easiest way to use these schemas while writing LoopBack applications!** :point_left:

## Method 2. Point json files to schemas
Using an IDE that supports JSONSchemas (I recommend [VS Code](https://code.visualstudio.com/)), point to a schema thus:
`common/models/customer.json`
```
{
  "$schema" : "https://raw.githubusercontent.com/Sequoia/loopback-json-schemas/master/dist/loopback-model-definition.json"
}
```

:warning: **Your editor or IDE must support `$ref`s for JSONSchema!** [Not all do.](https://github.com/bali182/autocomplete-json/issues/64).

If you use a different tool than VSCode and it works with JSONSchema (and `$ref`s!), please send a PR so I can list it here. [These tools](http://json-schema.org/implementations.html#editors) are worth trying!

## Method 3. Map schemas to file by **file paths** (VS Code)
*:information_source: If you're using VSCode you may as well use method 1*

Edit your `jsconfig.json` in VS Code to [map schemas to file paths in your project](https://code.visualstudio.com/Docs/languages/json#_json-schemas-settings):
```

    {
      "fileMatch": "/common/models/*.json",
      "url": "https://raw.githubusercontent.com/Sequoia/loopback-json-schemas/master/dist/loopback-model-definition.json"
    },
    {
```

This will automatically link schemas to paths so you don't have to use **Method 2**. [Read more](https://code.visualstudio.com/Docs/languages/json#_json-schemas-settings).

# Currently Implemented Schemas

Schemas in this repository cover the following files:

1. `model-config.json`
1. `datasources.json`
1. `config.json`
1. `*/models/[Model].json`
1. `middleware.json`

# Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md)