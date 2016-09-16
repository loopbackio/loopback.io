---
title: "config.json"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/config.json.html
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
        <p>aclErrorStatus</p>
      </td>
      <td>
        <p><span>When an authenticated user is denied access because of an ACL, by default the application returns HTTP error status code&nbsp;</span><strong>401 unauthorized</strong><span>. If you want instead to return 403 (forbidden) set the value here. This may be required, for example, when using</span><span> an AngularJS interceptor to differentiate between the need to show an access denied/request access page instead of a login dialog.</span></p>
        <p><span>Can also set this in the <a href="/doc/en/lb2/Model-definition-JSON-file.html">Model definition JSON file</a> to define per-model.</span></p>
        <div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>What happened to this?</div><span><br></span>
        <p></p>
      </td>
      <td>401</td>
    </tr>
    <tr>
      <td>host</td>
      <td>
        <p>Host <span>or IP address </span>used to create the Node HTTP server. If a request comes to a different host or IP address, then the application won't accept the connection. See <a href="http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback" class="external-link" rel="nofollow">server.listen()</a> for more information.</p>
      </td>
      <td>0.0.0.0</td>
    </tr>
    <tr>
      <td>legacyExplorer</td>
      <td>
        <p><span>Set to&nbsp;<code>false</code>&nbsp;to disable old routes<span>&nbsp;</span><code>/models</code><span>&nbsp;and&nbsp;</span><code>/routes</code> </span>that are exposed, but <span>no longer used by API Explorer; use&nbsp;<code>true</code>&nbsp;or omit the option to keep them enabled.</span></p>
        <p><span>When upgrading to </span><code>v2.14.0</code><span>, set&nbsp;</span><code>"legacyExplorer": false</code></p>
      </td>
      <td><span>true</span></td>
    </tr>
    <tr>
      <td>port</td>
      <td>TCP port to use.</td>
      <td>3000</td>
    </tr>
    <tr>
      <td>remoting</td>
      <td>See <a href="/doc/en/lb2/config.json.html">Remoting properties</a> below.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>restApiRoot</td>
      <td>Root URI of REST API</td>
      <td><code>/api</code></td>
    </tr>
  </tbody>
</table>

To access the settings in application code, use `app.get('_property_')`.

You can also retrieve [Express `app` object properties](http://expressjs.com/4x/api.html#app.settings.table) with this method.
See [`app.get()` in Express documentation](http://expressjs.com/4x/api.html#app.get) for more information.

### Remoting properties

Properties under the `remoting` top-level property determine how the application performs remote operations using
[strong-remoting](http://apidocs.strongloop.com/strong-remoting/); for example:

```javascript
...
  "remoting": {
    "context": {
      "enableHttpContext": false
    },
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
      "disableStackTrace": false
    }
  },
...
```

The following table describes the remoting properties.

{% include tip.html content="

The full names of the properties below are prefixed by \"remoting,\" for example, `remoting.json.limit`.

" %}

<table>
  <tbody>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
    <tr>
      <td>cors</td>
      <td>Boolean</td>
      <td>If false, use the CORS settings in <a href="/doc/en/lb2/middleware.json.html">middleware.json</a>.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>context.enableHttpContext</td>
      <td>Boolean</td>
      <td>Advanced feature. For more information, see <a href="/doc/en/lb2/Using-current-context.html">Using current context</a>.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>errorHandler.disableStackTrace</td>
      <td><span>Boolean</span></td>
      <td>
        <p>Set to true to disable stack traces; removes the <code>stack</code> property from the <a href="/doc/en/lb2/Error-object.html">Error object</a>.</p>
        <p>Ignored when NODE_ENV is "production", when stack traces are always disabled.</p>
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>json.limit</td>
      <td>String</td>
      <td>
        <p><span>Maximum request body size.</span></p>
        <p><span><span>You can set other JSON propertis as well; </span><span>see </span></span><a href="https://www.npmjs.com/package/body-parser#bodyparser-json-options-" class="external-link" rel="nofollow">body-parser.json()</a><span><span>.</span></span></p>
      </td>
      <td>100kb</td>
    </tr>
    <tr>
      <td>json.strict</td>
      <td><span>Boolean</span></td>
      <td>
        <p><span>Parse only objects and arrays.</span></p>
        <p><span>You can set other JSON propertis as well; <span>see </span></span><a href="https://www.npmjs.com/package/body-parser#bodyparser-json-options-" class="external-link" rel="nofollow">body-parser.json()</a><span><span>.</span></span></p>
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>rest.handleErrors</td>
      <td>Boolean</td>
      <td>If true (the default), then the REST adapter handles all errors by sending back a JSON-formatted error response. If false, then errors are passed to the top-level application error-handler.</td>
      <td>true</td>
    </tr>
    <tr>
      <td><span>rest.handleUnknownPaths</span></td>
      <td>Boolean</td>
      <td>
        <p>If true (<span>the</span> default), then the REST adapter emits a 404 error for unknown paths. The REST error handler or the application error handler then handle this error; <span style="line-height: 1.42857;">rest.handleErrors above.</span></p>
        <p>If false, then <span style="line-height: 1.42857;">the REST adapter delegates handling</span><span style="line-height: 1.42857;"> unknown paths to the top-level application by calling <code>next()</code>.</span></p>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>rest.normalizeHttpPath</td>
      <td><span>Boolean</span></td>
      <td>
        <p>If <code>true</code>, in HTTP paths, converts:</p>
        <ul>
          <li>Uppercase letters to lowercase.</li>
          <li>Underscores (_) to dashes (-).</li>
          <li>CamelCase to dash-delimited.</li>
        </ul>
        <p>Does not affect placeholders (for example ":id").</p>
        <p>For example, "MyClass" or "My_class" becomes "my-class".</p>
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>rest.supportedTypes</td>
      <td>Array</td>
      <td>
        <p><span style="font-size: 14.0px;line-height: 1.4285715;">List of content types that the API supports in HTTP responses.</span></p>
        <p>The response type will match that specfied <span>in the</span><span> HTTP request "accepts" header, if it is in this list of supported types.</span></p>
        <p><span><span>If this property is set, then </span><code>rest.xml</code><span> is ignored.</span></span></p>
        <p><span><span>NOTE: <span>'application/vnd.api-json' is supported, but is not one of the default types.</span></span></span></p>
      </td>
      <td>
        <p><span style="color: rgb(61,60,64);">'application/json'<br></span><span style="color: rgb(61,60,64);">'application/javascript'<br>'application/xml'<br></span><span style="color: rgb(61,60,64);">'text/javascript'<br>'text/xml'<br></span><span style="color: rgb(61,60,64);">'json'<br>'xml'</span></p>
      </td>
    </tr>
    <tr>
      <td>rest.xml</td>
      <td><span>Boolean</span></td>
      <td>
        <p>If true, then 'xml' is added to the supported content types. Then, the API will then respond with XML when the HTTP request "accepts" type contains 'xml'.</p>
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>urlencoded.extended</td>
      <td><span>Boolean</span></td>
      <td>
        <p>Parse extended syntax with the&nbsp;<a href="https://www.npmjs.org/package/qs?__hstc=72727564.8bea7847eb7a72bf24c79993a9239205.1418422131685.1420668516065.1420670994111.11&amp;__hssc=72727564.1.1420670994111&amp;__hsfp=1793697232#readme" class="external-link" rel="nofollow">qs</a>&nbsp;module.</p>
        <p>For more information, see <a href="https://www.npmjs.com/package/body-parser#bodyparser-urlencoded-options-" style="line-height: 1.4285715;" class="external-link" rel="nofollow">bodyParser.urlencoded()</a>.</p>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>urlencoded.limit</td>
      <td>String</td>
      <td>
        <p>Maximum request body size.</p>
        <p><span>For more information, see </span><a href="https://www.npmjs.com/package/body-parser#bodyparser-urlencoded-options-" class="external-link" rel="nofollow">bodyParser.urlencoded()</a><span>.</span></p>
      </td>
      <td>100kb</td>
    </tr>
  </tbody>
</table>

## Environment-specific settings

You can override values that are set in `config.json` in:

* `config.local.js` or `config.local.json`
* `config._env_.js` or `config._env_.json`, where _`env`_ is the value of `NODE_ENV` (typically `development` or `production`); so, for example `config.production.json`.

{% include important.html content="

The additional files can override the top-level keys with value-types (strings, numbers) only. Nested objects and arrays are not supported at the moment.

" %}

For example:

{% include code-caption.html content="config.production.js" %}
```javascript
module.exports = {
  host: process.env.CUSTOM_HOST,
  port: process.env.CUSTOM_PORT
};
```

For more information, see [Environment-specific configuration](/doc/{{page.lang}}/lb2/Environment-specific-configuration.html).