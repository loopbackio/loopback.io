---
title: "middleware.json"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/middleware.json.html
summary:
---

## Overview

Set up [middleware](Defining-middleware.html) in `middleware.json`.
Here is the default version created by the [Application generator](Application-generator.html): 

```javascript
{
  "initial:before": {
    "loopback#favicon": {}
  },
  "initial": {
    "compression": {},
    "cors": {
      "params": {
        "origin": "*",
        "credentials": true,
        "maxAge": 86400
      }
    },
    "helmet#xssFilter": {},
    "helmet#frameguard": {
      "params": [
        "deny"
      ]
    },
    "helmet#hsts": {
      "params": {
        "maxAge": 0,
        "includeSubDomains": true
      }
    },
    "helmet#hidePoweredBy": {},
    "helmet#ieNoOpen": {},
    "helmet#noSniff": {},
    "helmet#noCache": {
      "enabled": false
    }
  },
  "session": {},
  "auth": {},
  "parse": {},
  "routes": {
    "loopback#rest": {
      "paths": [
        "${restApiRoot}"
      ]
    }
  },
  "files": {},
  "final": {
    "loopback#urlNotFound": {}
  },
  "final:after": {
    "strong-error-handler": {}
  }
}
```

## Phases

Each top-level property in `middleware.json` corresponds to one of the following [middleware phases](Defining-middleware.html#middleware-phases):  

1.  **`initial`** - The first point at which middleware can run.
2.  **`session`** - Prepare the session object.
3.  **`auth`** - Handle authentication and authorization.
4.  **`parse`** - Parse the request body.
5.  **`routes`** - HTTP routes implementing your application logic.
    Middleware registered via the Express API `app.use`, `app.route`, `app.get` (and other HTTP verbs) runs at the beginning of this phase.
    Use this phase also for sub-apps like `loopback/server/middleware/rest` or `loopback-explorer`.

6.  **`files`** - Serve static assets (requests hit the file system here).

7.  **`final`** - Deal with errors and requests for unknown URLs.

Each phase has "before" and "after" subphases in addition to the main phase, encoded following the phase name, separated by a colon.
For example, for the "initial" phase, middleware executes in this order:

1.  `initial:before `
2.  `initial`
3.  `initial:after`

Middleware within a single subphase executes in the order in which it is registered. However, you should not rely on such order.
Always explicitly order the middleware using appropriate phases when order matters.

In general, each phase has the following syntax:

```
phase[:sub-phase] : {
  middlewarePath : {
    [ enabled: [true | false] ]
    [, name:    nameString ]
    [, params : paramSpec ]
    [, methods: methodSpec ]
    [, paths :   routeSpec ]
  }
}
```

Where:

* _phase_: is one of the predefined phases listed above (initial, session, auth, and so on) or a custom phase.
  See [Adding a custom phase](Defining-middleware.html#adding-a-custom-phase).
* _sub-phase_: (optional) can be `before` or `after`.
* _name_: optional middleware name.
* _middlewarePath_: path to the middleware function.
* _paramSpec_: value of the middleware parameters, typically a JSON object.
* _methodSpec_: An array containing HTTP methods for which the middleware is triggered; for example: `"methods" : ["GET", "POST"]`.
  If not present, applies to all methods.
* _routeSpec_: REST endpoint(s) that trigger the middleware.

For more information, see [Defining middleware](Defining-middleware.html).

## CORS settings

Set Cross-origin resource sharing (CORS) settings as `cors.params` properties in the initial phase.

You can set other CORS properties as well. For more information, see [cors](https://www.npmjs.com/package/cors).

<table>
  <thead>
    <tr>
      <th width="200">Property</th>
      <th width="100">Type</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>cors.params.origin</td>
      <td>String|Boolean</td>
      <td>Configures the <strong>Access-Control-Allow-Origin</strong> CORS header.
          Expects a string (for example: "http://example.com/" or "*").
          Set to <code>true</code> to reflect the <a href="http://tools.ietf.org/html/draft-abarth-origin-09" class="external-link">request origin</a>,
          as defined by <code>req.header('Origin')</code>. Set to <code>false</code> to disable CORS. Can also be set to a function,
          which takes the request origin as the first parameter and a callback (which expects the signature <code>err [object], allow [bool]</code>) as the second.</td>
      <td>true</td>
    </tr>
    <tr>
      <td>cors.params.credentials</td>
      <td>Boolean</td>
      <td>
        Configures the <strong>Access-Control-Allow-Credentials</strong> CORS header. Set to <code>true</code> to pass the header, otherwise it is omitted.
        You can set other cors properties as well. For more information, see <a href="https://www.npmjs.com/package/cors" class="external-link" >cors</a>.
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>cors.params.maxAge</td>
      <td>Number</td>
      <td><span>Configures the </span><strong>Access-Control-Allow-Max-Age</strong><span> CORS header. Set to an integer to pass the header,
        otherwise it is omitted.</span>
      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
