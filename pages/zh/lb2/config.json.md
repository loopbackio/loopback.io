---
title: "config.json"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/config.json.html
summary:
---

## 概要

在/server/config.json文件中定义应用服务端的配置。下面是默认的一些配置：

**config.json**

```js
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

### 顶级属性

下面的表列出了你可以对哪些属性觉醒配置。

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>描述</th>
      <th>默认值</th>
    </tr>
    <tr>
      <td>
        <p>aclErrorStatus</p>
      </td>
      <td>
        <p>当一个验证用户因为ACL被拒绝进入，默认会返回一个http <strong>401 unauthorized</strong> 的状态码。如果你想使用403，那么你可以通过配置这个属性来达到。这个值是必填的，例如，当使用AngularJS拦截器来区分是现实一个登陆页还是现实一个请求被拒绝。</p>
        <p>可以在<a href="/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html">Model definition JSON file</a> 中为没个模型定义不同的值。</p>
      </td>
      <td>401</td>
    </tr>
    <tr>
      <td>host</td>
      <td>
        <p>Node HTTP服务的主机或者IP地址。如果请求一个不同的主机或者IP地址，应用不会接受连接。详见<a href="http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback" class="external-link" rel="nofollow">server.listen()</a></p>
      </td>
      <td>localhost</td>
    </tr>
    <tr>
      <td>legacyExplorer</td>
      <td>
        <p>Set to&nbsp;<code>false</code>&nbsp;to disable old routes&nbsp;<code>/models</code>&nbsp;and&nbsp;<code>/routes</code> that are exposed, but no longer used by API Explorer; use&nbsp;<code>true</code>&nbsp;or omit the option to keep them enabled.</p>
        <p>When upgrading to <code>v2.14.0</code>, set&nbsp;<code>"legacyExplorer": false</code></p>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>port</td>
      <td>使用那个TCP端口</td>
      <td>3000</td>
    </tr>
    <tr>
      <td>remoting</td>
      <td>详见<a href="/doc/{{page.lang}}/lb2/config.json.html">Remoting properties</a></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>restApiRoot</td>
      <td>REST API的根URI</td>
      <td><code>/api</code></td>
    </tr>
  </tbody>
</table>

在应用代码里面使用`app.get('_property_')来获取配置值。`

同样你可以通过这种方式获取[Express `app对象的属性`](http://expressjs.com/4x/api.html#app.settings.table)。详见[Express documentation](http://expressjs.com/4x/api.html#app.get)的[`app.get()`](http://expressjs.com/4x/api.html#app.get)。

### Remoting属性

Properties under the `remoting` top-level property 这个属性决定了应用通过[strong-remoting](http://apidocs.strongloop.com/strong-remoting/)如果执行一个远程操作；例如：

```js
...
"remoting": {
  "context": {
    "enableHttpContext": false
  },
  "rest": {
    "normalizeHttpPath": false,
    "xml": false,

    "handleErrors": true,
    "handleUnknownPaths": true
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
}
```

下面的表描述了remoting的属性.

{% include tip.html content="

下面的属性前缀都是 \"remoting\"，例如：`remoting.json.limit。`

" %}

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>描述</th>
      <th>默认值</th>
    </tr>
    <tr>
      <td>cors</td>
      <td>Boolean</td>
      <td>If false, use the CORS settings in <a href="/doc/{{page.lang}}/lb2/middleware.json.html">middleware.json</a>.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>context.enableHttpContext</td>
      <td>Boolean</td>
      <td>详见 <a href="https://docs.strongloop.com/display/LB/Using+current+context">Using current context</a>.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>errorHandler.disableStackTrace</td>
      <td>Boolean</td>
      <td>
        <p>设为true禁用stack traces; 会从<a href="/doc/{{page.lang}}/lb2/Error-object.html">Error object</a> 中移除stack属性。</p>
        <p>如果NODE_ENV 是 "production", stack traces是永久被禁用的。</p>
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>json.limit</td>
      <td>String</td>
      <td>
        <p>最大请求主体(request body)的大小。</p>
        <p>You can set other JSON propertis as well; see <a href="https://www.npmjs.com/package/body-parser#bodyparser-json-options-" class="external-link" rel="nofollow">body-parser.json()</a>.</p>
      </td>
      <td>100kb</td>
    </tr>
    <tr>
      <td>json.strict</td>
      <td>Boolean</td>
      <td>
        <p>只解析对象和数组。</p>
        <p>You can set other JSON propertis as well; see <a href="https://www.npmjs.com/package/body-parser#bodyparser-json-options-" class="external-link" rel="nofollow">body-parser.json()</a>.</p>
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>rest.handleErrors</td>
      <td>Boolean</td>
      <td>如果为true (默认就是true)，REST适配器会通过发送一个JSON格式的错误响应处理错误。如果为false， then errors are passed to the top-level application error-handler.</td>
      <td>true</td>
    </tr>
    <tr>
      <td>rest.handleUnknownPaths</td>
      <td>Boolean</td>
      <td>
        <p>If true (the default), then the REST adapter emits a 404 error for unknown paths. The REST error handler or the application error handler then handle this error; <span>rest.handleErrors above.</span></p>
        <p>If false, then <span>the REST adapter delegates handling</span><span> unknown paths to the top-level application by calling <code>next()</code>.</span></p>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>rest.normalizeHttpPath</td>
      <td>Boolean</td>
      <td>
        <p>如果为true，HTTP路径，转换：</p>
        <ul>
          <li>大写转为小写</li>
          <li>下划线(_)转为中划线 (-)</li>
          <li>CamelCase转为用<span>中划线 (-)分开</span></li>
        </ul>
        <p>不会作用于placeholders (例如 ":id").</p>
        <p>例如，"MyClass" 或者 "My_class" 转为"my-class".</p>
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>rest.supportedTypes</td>
      <td>Array</td>
      <td>
        <p><span>列出HTTP响应支持的content type。</span></p>
        <p>The response type will match that specfied in the HTTP request "accepts" header, if it is in this list of supported types.</p>
        <p>如果设置了这个属性，rest.xml的设置会被忽略。</p>
        <p>注意: 'application/vnd.api+json' 是被支持的，但是它不是一个默认的type。</p>
      </td>
      <td>
        <p><span style="color: rgb(61,60,64);">'application/json'<br></span><span style="color: rgb(61,60,64);">'application/javascript'<br>'application/xml'<br></span><span style="color: rgb(61,60,64);">'text/javascript'<br>'text/xml'<br></span><span style="color: rgb(61,60,64);">'json'<br>'xml'</span></p>
      </td>
    </tr>
    <tr>
      <td>rest.xml</td>
      <td>Boolean</td>
      <td>
        <p>如果设置为true，'xm'被添加到被支持的content type中。这时如果HTTP请求头的accepts包含'xml'，API会使用XML来响应。</p>
      </td>
      <td>false</td>
    </tr>
    <tr>
      <td>urlencoded.extended</td>
      <td>Boolean</td>
      <td>
        <p>使用<a href="https://www.npmjs.org/package/qs?__hstc=72727564.8bea7847eb7a72bf24c79993a9239205.1418422131685.1420668516065.1420670994111.11&amp;__hssc=72727564.1.1420670994111&amp;__hsfp=1793697232#readme" class="external-link" rel="nofollow">qs</a><span>&nbsp;module解析</span>extended语法。</p>
        <p>详见 <a href="https://www.npmjs.com/package/body-parser#bodyparser-urlencoded-options-" class="external-link" rel="nofollow">bodyParser.urlencoded()</a>.</p>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>urlencoded.limit</td>
      <td>String</td>
      <td>
        <p>最大请求主体。</p>
        <p>详见 <a href="https://www.npmjs.com/package/body-parser#bodyparser-urlencoded-options-" class="external-link" rel="nofollow">bodyParser.urlencoded()</a>.</p>
      </td>
      <td>100kb</td>
    </tr>
  </tbody>
</table>

## 针对环境的配置

可以在下面的文件中覆盖`config.json中的配置`:

*   `config.local.js` 或 `config.local.json`
*   `config._env_.js` 或 `config._env_.json`, 这里的_`env`_ 是`NODE_ENV的值` (一般是`development或``production`); 例如：`config.production.json`.

{% include important.html content="

这些文件只能使用值类型（字符串，数字）来覆盖顶层的属性。目前还不支持聚合对象和数组。

" %}

例如：

**config.production.js**

```js
module.exports = {
  host: process.env.CUSTOM_HOST,
  port: process.env.CUSTOM_PORT
};
```

详见[Environment-specific configuration](/doc/{{page.lang}}/lb2/Environment-specific-configuration.html)。
