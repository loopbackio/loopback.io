---
title: "config.json"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/config.json.html
summary:
---

## Overview

Define application server-side settings in `/server/config.json`. For example here are the default settings:

{% include code-caption.html content="config.json" %}
```javascript
{
  "restApiRoot": "/api",
  "host": "0.0.0.0",
  "port": 3000,
  "remoting": {
    ... // See below
  },
  "legacyExplorer": false
}
```

### Top-level properties

The following table describes the properties you can configure.

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
    <tr>
      <td>
        aclErrorStatus
      </td>
      <td>
        When an authenticated user is denied access because of an ACL, by default the application returns HTTP error status code <strong>401 unauthorized</strong>. If you want instead to return <strong>403 (forbidden)</strong> set the value here. This may be required, for example, when using an AngularJS interceptor to differentiate between the need to show an access denied/request access page instead of a login dialog.
        Can also set this in the <a href="Model-definition-JSON-file.html">Model definition JSON file</a> to define per-model.
      </td>
      <td>401</td>
    </tr>
    <tr>
      <td>host</td>
      <td>
        Host or IP address used to create the Node HTTP server. If a request comes to a different host or IP address, then the application won't accept the connection. See <a href="http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback" class="external-link" rel="nofollow">server.listen()</a> for more information.
      </td>
      <td>0.0.0.0</td>
    </tr>
    <tr>
      <td>legacyExplorer</td>
      <td>
        Set to <code>false</code> to disable old routes <code>/models</code> and <code>/routes</code> that are exposed, but no longer used by API Explorer; use <code>true</code> or omit the option to keep them enabled.
        When upgrading to <code>v2.14.0</code>, set <code>"legacyExplorer": false</code>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>port</td>
      <td>TCP port to use.</td>
      <td>3000</td>
    </tr>
    <tr>
      <td>remoting</td>
      <td>See <a href="#remoting-properties">Remoting properties</a> below.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>restApiRoot</td>
      <td>Root URI of REST API</td>
      <td><code>/api</code></td>
    </tr>
  </tbody>
</table>

To access the settings in application code, use `app.get('property-name')`.

You can also retrieve [Express `app` object properties](http://expressjs.com/4x/api.html#app.settings.table) with this method.
See [`app.get()` in Express documentation](http://expressjs.com/4x/api.html#app.get) for more information.

### Remoting properties

Properties under the `remoting` top-level property determine how the application performs remote operations using [strong-remoting](Strong-remoting.html); for example:

```javascript
...
"remoting": {
  "context": false,
  "rest": {
    "normalizeHttpPath": false,
    "xml": false
  },
  "json": {
    "strict": false,
    "limit": "100kb"
  },
  "urlencoded": {
    "extended": true,
    "limit": "100kb"
  },
  "cors": false,
  "errorHandler": {
      "debug": true,
      "log": false
    }
}
...
```

The following table describes the remoting properties.  For more information on error-handler properties, see [Using strong-error-handler](Using-strong-error-handler.html).

{% include tip.html content="The full names of the properties below are prefixed by \"remoting,\" for example, `remoting.json.limit`.
" %}

<table style="width: 800px;">
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th >Default</th>
    </tr>
    <tr>
      <td>cors</td>
      <td>Boolean</td>
      <td>If false, use the CORS settings in <a href="middleware.json.html">middleware.json</a>.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>context</td>
      <td>Boolean</td>
      <td>Advanced feature. For more information, see <a href="Using-current-context.html">Using current context</a>.</td>
      <td>false</td>
    </tr>

    <tr>
      <td>errorHandler.debug</td>
      <td>Boolean</td>
      <td>When enabled, HTTP responses include all error properties, including sensitive data such as file paths, URLs and stack traces.  Set to <code>true</code> during development and debugging; <code>false</code> in production.<br/><br/>
      For more information, see <a href="Using-strong-error-handler.html">Using strong-error-handler</a>.</td>
      <td>false</td>
    </tr>

    <tr>
      <td>errorHandler.log</td>
      <td>Boolean</td>
      <td>When enabled, all errors are printed via <code>console.error</code>, including an array of fields (custom error properties) that are safe to include in response messages (both 4xx and 5xx). When not enabled, it only sends the error back in the response.<br/><br/>
      For more information, see <a href="Using-strong-error-handler.html">Using strong-error-handler</a>. </td>
      <td>true</td>
    </tr>

    <tr>
      <td>json.limit</td>
      <td>String</td>
      <td>
        Maximum request body size.
        You can set other JSON propertis as well; see <a href="https://www.npmjs.com/package/body-parser#bodyparser-json-options-" class="external-link" rel="nofollow">body-parser.json()</a>.
      </td>
      <td>100kb</td>
    </tr>
    <tr>
      <td>json.strict</td>
      <td>Boolean</td>
      <td>
        Parse only objects and arrays.
        You can set other JSON propertis as well; see <a href="https://www.npmjs.com/package/body-parser#bodyparser-json-options-" class="external-link" rel="nofollow">body-parser.json()</a>.
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>handleErrors</td>
      <td>Boolean</td>
      <td>If true, then the REST adapter handles all errors by sending back a JSON-formatted error response. If false, then errors are passed to the top-level application error-handler.</td>
      <td>true</td>
    </tr>
    <tr>
      <td>rest.handleUnknownPaths</td>
      <td>Boolean</td>
      <td>
        If true, then the REST adapter emits a 404 error for unknown paths. The REST error handler or the application error handler then handle this error; rest.handleErrors above.
        If false, then the REST adapter delegates handling unknown paths to the top-level application by calling <code>next()</code>.
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>rest.normalizeHttpPath</td>
      <td>Boolean</td>
      <td>
        If <code>true</code>, in HTTP paths, converts:
        <ul>
          <li>Uppercase letters to lowercase.</li>
          <li>Underscores (&#95;) to dashes (-).</li>
          <li>CamelCase to dash-delimited.</li>
        </ul>
        Does not affect placeholders (for example ":id").
        For example, "MyClass" or "My_class" becomes "my-class".
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>rest.supportedTypes</td>
      <td>Array</td>
      <td>
        List of content types that the API supports in HTTP responses.
        The response type will match that specfied in the HTTP request "accepts" header, if it is in this list of supported types.
        If this property is set, then <code>rest.xml</code> is ignored.<br/><br/>
        NOTE: 'application/vnd.api-json' is supported, but is not one of the default types.
      </td>
      <td>
        'application/json'<br>'application/javascript'<br>'application/xml'<br>'text/javascript'<br>'text/xml'<br>'json'<br>'xml'
      </td>
    </tr>
    <tr>
      <td>rest.xml</td>
      <td>Boolean</td>
      <td>
        If true, then 'xml' is added to the supported content types. Then, the API will then respond with XML when the HTTP request "accepts" type contains 'xml'.
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>urlencoded.extended</td>
      <td>Boolean</td>
      <td>
        Parse extended syntax with the <a href="https://www.npmjs.org/package/qs?__hstc=72727564.8bea7847eb7a72bf24c79993a9239205.1418422131685.1420668516065.1420670994111.11&amp;__hssc=72727564.1.1420670994111&amp;__hsfp=1793697232#readme" class="external-link" rel="nofollow">qs</a> module.
        For more information, see <a href="https://www.npmjs.com/package/body-parser#bodyparser-urlencoded-options-" style="line-height: 1.4285715;" class="external-link" rel="nofollow">bodyParser.urlencoded()</a>.
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>urlencoded.limit</td>
      <td>String</td>
      <td>
        Maximum request body size.
        For more information, see <a href="https://www.npmjs.com/package/body-parser#bodyparser-urlencoded-options-" class="external-link" rel="nofollow">bodyParser.urlencoded()</a>.
      </td>
      <td>100kb</td>
    </tr>
  </tbody>
</table>

## Environment-specific settings

You can override values that are set in `config.json` in:

* `config.local.js` or `config.local.json`
* `config._env_.js` or `config._env_.json`, where _`env`_ is the value of `NODE_ENV` (typically `development` or `production`); so, for example `config.production.json`.

{% include important.html content="The additional files can override the top-level keys with value-types (strings, numbers) only. Nested objects and arrays are not supported at the moment.
" %}

For example:

{% include code-caption.html content="config.production.js" %}
```javascript
module.exports = {
  host: process.env.CUSTOM_HOST,
  port: process.env.CUSTOM_PORT
};
```

For more information, see [Environment-specific configuration](Environment-specific-configuration.html).
