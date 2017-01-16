# loopback-mixins-example

```
$ git clone https://github.com/strongloop/loopback-example-mixins
$ cd loopback-example-mixins
$ npm install
$ npm start
```

This example is a LoopBack project that uses the mixin functionality available in [loopback-boot](https://github.com/strongloop/loopback-boot/) as of [v2.8.0](https://github.com/strongloop/loopback-boot/tree/v2.8.0).

This example application shows mixins loading from several different locations like directories and modules as well as performing different actions like observing changes and adding model attributes.  This README covers the mixin changes in both the model config and model definition.

## Mixin Loading

Specify mixin locations relative to the `server/model-config.json` file.  Multiple mixins can exist in a single directory.  Once specified in the `model-config.json` file the mixin will be available in the LoopBack mixin registry but still needs to be configured for use in the model.

### npm module

This loads the [loopback-ds-timestamp-mixin](https://www.npmjs.com/package/loopback-ds-timestamp-mixin) module from the top level `node_modules` directory.  Note that this module provides a mixin file `time-stamp.js` which is registered as the camel case `TimeStamp` name.

```js
    {
      "_meta": {
        ...
        "mixins": [
          ...
          "../node_modules/loopback-ds-timestamp-mixin"
        ]
      }
    }
```

### The `common/mixins/` directory

```js
    {
      "_meta": {
        ...
        "mixins": [
          ...
          "../common/mixins"
        ]
      }
    }
```

### The local `server/mixins/` directory

Because the `model-config.json` is within the `server` directory this loads the mixins from current mixins directory.

```js
    {
      "_meta": {
        ...
        "mixins": [
          ...
          "./mixins"
        ]
      }
    }
```

## Model config

In the model description file you must activate the mixin from the group you have loaded. In this application the `common/models/dog.json` file activates several mixins by adding them to the mixin object definition.

```js
{
  "name": "Dog",
  "base": "PersistedModel",
  ...
  "mixins": {
    "TimeStamp": true,
    "Tag": true,
    "Squirrel": true
  }
}
```

Mixins also have the ability to pass in options through this activation by using an object instead of `true`.  These options are implemented by the mixin themselves, see the documentation provided by the mixin for more information on available options.

```js
{
  "name": "Dog",
  "base": "PersistedModel",
  ...
  "mixins": {
    "TimeStamp": {
      "required" : false
    },
    "Tag": true,
    "Squirrel": true
  }
}
```

---

[More LoopBack examples](https://github.com/strongloop/loopback-example)
