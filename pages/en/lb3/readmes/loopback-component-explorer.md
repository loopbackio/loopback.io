# loopback-component-explorer

**⚠️ LoopBack 3 is in Maintenance LTS mode, only critical bugs and critical
security fixes will be provided. (See
[Module Long Term Support Policy](#module-long-term-support-policy) below.)**

We urge all LoopBack 3 users to migrate their applications to LoopBack 4 as
soon as possible. Refer to our
[Migration Guide](https://loopback.io/doc/en/lb4/migration-overview.html)
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

## A note on swagger-ui vulnerabilities

API Explorer for LoopBack 3 is built on top of `swagger-ui` version 2.x which
is no longer maintained. While there are known security vulnerabilities in
`swagger-ui`, we believe they don't affect LoopBack users.

We would love to upgrade our (LB3) API Explorer to v3 of swagger-ui, but
unfortunately such upgrade requires too much effort and more importantly
addition of new features to LB3 runtime, which would break our LTS guarantees.
For more details, see discussion in
[loopback-component-explorer#263](https://github.com/strongloop/loopback-component-explorer/issues/263).

### npm advisory 985

Link: https://www.npmjs.com/advisories/985

> Versions of swagger-ui prior to 3.0.13 are vulnerable to Cross-Site Scripting
> (XSS). The package fails to sanitize YAML files imported from URLs or
> copied-pasted. This may allow attackers to execute arbitrary JavaScript.

LoopBack's API Explorer does not allow clients to import swagger spec from YAML
URL/pasted-content. That means loopback-component-explorer **IS NOT AFFECTED**
by this vulnerability.

### npm advisory 975

Link: https://www.npmjs.com/advisories/975

> Versions of swagger-ui prior to 3.18.0 are vulnerable to Reverse Tabnapping.
> The package uses `target='_blank'` in anchor tags, allowing attackers to
> access `window.opener` for the original page. This is commonly used for
> phishing attacks.

This vulnerability affects anchor tags created from metadata provided by the
Swagger spec, for example `info.termsOfServiceUrl`. LoopBack's API Explorer
does not allow clients to provide custom swagger spec, URLs like
`info.termsOfServiceUrl` are fully in control of the LoopBack application
developer. That means loopback-component-explorer **IS NOT AFFECTED** by this
vulnerability.

### npm advisory 976

Link: https://www.npmjs.com/advisories/976

> Versions of swagger-ui prior to 3.20.9 are vulnerable to Cross-Site Scripting
> (XSS). The package fails to sanitize URLs used in the OAuth auth flow, which
> may allow attackers to execute arbitrary JavaScript.

LoopBack 3 API Explorer does not support OAuth auth flow, that means
loopback-component-explorer **IS NOT AFFECTED** by this vulnerability.

### GitHub advisory CVE-2019-17495

Link: https://github.com/advisories/GHSA-c427-hjc3-wrfw
> A Cascading Style Sheets (CSS) injection vulnerability in Swagger UI before
> 3.23.11 allows attackers to use the Relative Path Overwrite (RPO) technique
> to perform CSS-based input field value exfiltration, such as exfiltration of
> a CSRF token value.

Quoting from the
[disclosure](https://github.com/tarantula-team/CSS-injection-in-Swagger-UI/tree/15edeaaa5806aa8e83ee55d883f956a3c3573ac9):

> We’ve observed that the `?url=` parameter in SwaggerUI allows an attacker to
> override an otherwise hard-coded schema file.  We realize that Swagger UI
> allows users to embed untrusted Json format from remote servers This means we
> can inject json content via the GET parameter to victim Swagger UI.  etc.

LoopBack 3 API Explorer does not suport `?url=` parameter, it always loads the
Swagger spec file from the LoopBack server serving the Explorer UI. That means
loopback-component-explorer **IS NOT AFFECTED** by this vulnerability.

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
| 6.x     | Maintenance LTS | Apr 2018  | Dec 2020 |
| 5.x     | End-of-Life     | Sep 2017  | Dec 2019 |

Learn more about our LTS plan in [docs](https://loopback.io/doc/en/contrib/Long-term-support.html).
