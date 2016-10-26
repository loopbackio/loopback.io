# strong-error-handler

Error handler for use in development (debug) and production environments.

## Production mode

- error responses are purposely left without detail in order to prevent leaking sensitive information.
- For 5xx errors, the output contains only the status code and the status name from the HTTP specification.
- For 4xx errors, the output contains the full error message (`error.message`) and the contents of the `details`
  property (`error.details`). The latter is typically used by `ValidationError` to provide machine-readable details
  about the validation problems.

## Debug Mode

- Full error stack traces and internal details of any object passed as the error will be sent back to the client
  in the HTTP responses when an error occurs.

## Response Format

- `strong-error-handler` currently supports HTML and JSON responses.
- When the object is a standard Error object, the string provided by the stack property will be returned in HTML/text
  responses.
- When the object is a non-Error object, the result of `util.inspect` will be returned in HTML/text responses.
- For JSON responses, the result will be an object with all enumerable properties from the object in the response.

## Install

```bash
$ npm install strong-error-handler
```

## Usage

In an express-based application:

```js
var express = require('express');
var errorHandler = require('strong-error-handler');

var app = express();
// setup your routes
// `options` are set to default values. For more info, see `options` below.
// app.use(errorHandler({ /* options, see below */ }));
app.use(errorHandler({
  debug: app.get('env') === 'development',
  log: true,
}));

app.listen(3000);
```

In LoopBack applications, add the following entry to your
`server/middleware.json` file.

```json
{
  "final:after": {
    "strong-error-handler": {
      "params": {
         "debug": false,
         "log": true,
       }
    }
  }
}
```

## Content Type

Depending on the request header's `Accepts`, response will be returned in
 the corresponding content-type, current supported types include:
- JSON (`json`/`application/json`)
- HTML (`html`/`text/html`)

*There are plans to support other formats such as Text and XML.*

## Options

#### debug

`boolean`, defaults to `false`.

If you need to set the environment to development mode, you will need to change the value to `true`.

When enabled, HTTP responses include all error properties, including
sensitive data such as file paths, URLs and stack traces. *See Examples below*

#### log

`boolean`, defaults to `true`.

When enabled, all errors are printed via `console.error`. That includes an array of fields (custom error properties)
 that are safe to include in response messages (both 4xx and 5xx).

When not enabled, it only sends the error back in the response.

Customization of the log format is intentionally not allowed. If you would like
to use a different format/logger, disable this option and add your own custom
error-handling middleware.

```js
app.use(myErrorLogger());
app.use(errorHandler({ log: false }));
```

## Migration to strong-error-handler for existing LoopBack applications

1. In package.json dependencies, remove ` "errorhandler": "^x.x.x”,`
1. Run `npm install --save strong-error-handler`
1. In `./server/config.json`, remove:

  ```
  "errorHandler": {
    "disableStackTrace": false
  }
  ```
  and replace it with `"handleErrors": false`.
1. In `server/middleware.json`, remove

  ```
    "final:after": {
    "loopback#errorHandler": {}
  }
  ```
  and replace it with:
  ```
  "final:after": {
    "strong-error-handler": {}
  }
  ```
1. In the `./server`, delete `middleware.production.json`.
1. In the `./server`, create `middleware.development.json` containing:

  ```
  {
  "final:after": {
    "strong-error-handler": {
      "params": {
        "debug": true,
        "log": true
      }
    }
  }
}
```

## Examples:

Error generated when `debug: false` :

```
{ error: { statusCode: 500, message: 'Internal Server Error' } }
```

Error generated when `debug: true` :

```
{ error:
  { statusCode: 500,
  name: 'Error',
  message: 'a test error message',
  stack: 'Error: a test error message\n    at Context.<anonymous> (User/strong-error-handler/test/handler.test.js:220:21)\n    at callFnAsync (User/strong-error-handler/node_modules/mocha/lib/runnable.js:349:8)\n    at Test.Runnable.run (User/strong-error-handler/node_modules/mocha/lib/runnable.js:301:7)\n    at Runner.runTest (User/strong-error-handler/node_modules/mocha/lib/runner.js:422:10)\n    at User/strong-error-handler/node_modules/mocha/lib/runner.js:528:12\n    at next (User/strong-error-handler/node_modules/mocha/lib/runner.js:342:14)\n    at User/strong-error-handler/node_modules/mocha/lib/runner.js:352:7\n    at next (User/strong-error-handler/node_modules/mocha/lib/runner.js:284:14)\n    at Immediate._onImmediate (User/strong-error-handler/node_modules/mocha/lib/runner.js:320:5)\n    at tryOnImmediate (timers.js:543:15)\n    at processImmediate [as _immediateCallback] (timers.js:523:5)' }}
```
