# loopback-component-explorer

**This module is in Active LTS mode, new features are no longer accepted.**
<br/>(See [Module Long Term Support Policy](#module-long-term-support-policy)
below.)

LoopBack 3 users looking for new features are encouraged to upgrade
to LoopBack 4. Refer to
[loopback-next#1849](https://github.com/strongloop/loopback-next/issues/1849)
for more information on how to upgrade.

## Overview

Browse and test your LoopBack app's APIs.

## Basic Usage

Below is a simple LoopBack application. The explorer is mounted at `/explorer`.

```js
var loopback = require('loopback');
var app = loopback();
var explorer = require('../');
var port = 3000;

var Product = loopback.Model.extend('product');
Product.attachTo(loopback.memory());
app.model(Product);

app.use('/api', loopback.rest());

// Register explorer using component-centric API:
explorer(app, { basePath: '/api', mountPath: '/explorer' });
// Alternatively, register as a middleware:
app.use('/explorer', explorer.routes(app, { basePath: '/api' }));

console.log("Explorer mounted at localhost:" + port + "/explorer");

app.listen(port);
```

## Upgrading from v1.x

To upgrade your application using loopback-explorer version 1.x, just replace
`explorer()` with `explorer.routes()` in your server script:

```js
var explorer = require('loopback-component-explorer');  // Module was loopback-explorer in v. 2.0.1 and earlier

// v1.x - does not work anymore
app.use('/explorer', explorer(app, options));
// v2.x
app.use('/explorer', explorer.routes(app, options));
```

In applications scaffolded by `lb app`, the idiomatic way is to register
loopback-component-explorer in `server/component-config.json`:

```json
{
  "loopback-component-explorer": {
    "mountPath": "/explorer"
  }
}
```

## Advanced Usage

Many aspects of the explorer are configurable.

See [options](#options) for a description of these options:

```js
// Mount middleware before calling `explorer()` to add custom headers, auth, etc.
app.use('/explorer', loopback.basicAuth('user', 'password'));
explorer(app, {
  basePath: '/custom-api-root',
  uiDirs: [
    path.resolve(__dirname, 'public'),
    path.resolve(__dirname, 'node_modules', 'swagger-ui')
  ]
  apiInfo: {
    'title': 'My API',
    'description': 'Explorer example app.'
  },
  resourcePath: 'swagger.json',
  version: '0.1-unreleasable'
}));
app.use('/custom-api-root', loopback.rest());
```
In applications scaffolded by `lb app`, you can edit the `server/component-config.json`:

```json
{
  "loopback-component-explorer": {
    "mountPath": "/explorer",
    "apiInfo": {
      "title": "My App",
      "description": "Description of my app APIs.",
      "termsOfServiceUrl": "http://api.mycompany.io/terms/",
      "contact": "apiteam@mycompany.io",
      "license": "Apache 2.0",
      "licenseUrl": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  }
}
```

## Options

Options are passed to `explorer(app, options)`.

`basePath`: **String**

> Default: `app.get('restAPIRoot')` or  `'/api'`.

> Sets the API's base path. This must be set if you are mounting your api
> to a path different than '/api', e.g. with
> `loopback.use('/custom-api-root', loopback.rest());

`mountPath`: **String**

> Default: `/explorer`

> Set the path where to mount the explorer component.

`protocol`: **String**

> Default: `null`

> A hard override for the outgoing protocol (`http` or `https`) that is designated in Swagger
> resource documents. By default, `loopback-component-explorer` will write the protocol that was used to retrieve
> the doc. This option is useful if, for instance, your API sits behind an SSL terminator
> and thus needs to report its endpoints as `https`, even though incoming traffic is auto-detected
> as `http`.

`uiDirs`: **Array of Strings**

> Sets a list of paths within your application for overriding Swagger UI files.

> If present, will search `uiDirs` first when attempting to load Swagger UI,
> allowing you to pick and choose overrides to the interface. Use this to
> style your explorer or add additional functionality.

> See [index.html](public/index.html), where you may want to begin your overrides.
> The rest of the UI is provided by [Swagger UI](https://github.com/wordnik/swagger-ui).

`apiInfo`: **Object**

> Additional information about your API. See the
> [spec](https://github.com/wordnik/swagger-spec/blob/master/versions/1.2.md#513-info-object).

`resourcePath`: **String**

> Default: `'resources'`

> Sets a different path for the
> [resource listing](https://github.com/wordnik/swagger-spec/blob/master/versions/1.2.md#51-resource-listing).
> You generally shouldn't have to change this.

`version`: **String**

> Default: Read from package.json

> Sets your API version. If not present, will read from your app's package.json.

`auth`: **Object**

> Optional config for setting api access token, can be used to rename the query parameter or set an auth header.

> The object has 2 keys:
> - `in`: either `header` or `query`
> - `name`: the name of the query parameter or header
>
> The default sets the token as a query parameter with the name `access_token`

> Example for setting the api key in a header named `x-api-key`:
> ```
> {
>   "loopback-component-explorer": {
>     "mountPath": "/explorer",
>     "auth": {
>       "in": "header",
>       "name": "x-api-key"
>     }
>   }
> }
> ```

## Module Long Term Support Policy

This module adopts the [
Module Long Term Support (LTS)](http://github.com/CloudNativeJS/ModuleLTS) policy,
 with the following End Of Life (EOL) dates:

| Version | Status          | Published | EOL      |
| ------- | --------------- | --------- | -------- |
| 6.x     | Active LTS      | Apr 2018  | Dec 2019 |
| 5.x     | Maintenance LTS | Sep 2017  | Dec 2019 |
| 4.x     | End-of-Life     | Dec 2016  | Apr 2019 |

Learn more about our LTS plan in [docs](https://loopback.io/doc/en/contrib/Long-term-support.html).
