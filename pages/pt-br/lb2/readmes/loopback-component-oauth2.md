# loopback-component-oauth2

The LoopBack oAuth 2.0 component provides full integration between [OAuth 2.0](http://tools.ietf.org/html/rfc6749)
and [LoopBack](http://loopback.io). It enables LoopBack applications to function
as an oAuth 2.0 provider to authenticate and authorize client applications and/or
resource owners (i.e. users) to access protected API endpoints.

The oAuth 2.0 protocol implementation is based on [oauth2orize](https://github.com/jaredhanson/oauth2orize)
and [passport](http://passportjs.org/). 

See [LoopBack Documentation - OAuth 2.0 Component](http://loopback.io/doc/en/lb2/OAuth-2.0.html) for more information.

## Install

Install the component as usual:

```
$ npm install loopback-component-oauth2
```

## Use

Use in an application as follows:

```js
var oauth2 = require('loopback-component-oauth2');

var options = { 
  dataSource: app.dataSources.db, // Data source for oAuth2 metadata persistence
  loginPage: '/login', // The login page url
  loginPath: '/login' // The login form processing url
};

oauth2.oAuth2Provider(
  app, // The app instance
  options // The options
);
```

The app instance will be used to set up middleware and routes. The data source
provides persistence for the oAuth 2.0 metadata models.

For more information, see [OAuth 2.0](http://loopback.io/doc/en/lb2/OAuth-2.0.html) LoopBack component official documentation.

## Example

This [example](https://github.com/strongloop/strong-gateway) demonstrates
how to implement an OAuth service provider, complete with protected API access.
