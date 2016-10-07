---
title: "middleware.json"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/middleware.json.html
summary:
---

## 概要

在middleware.json中配置[middleware](/doc/{{page.lang}}/lb2/Defining-middleware.html)。下面是使用[Application generator](/doc/{{page.lang}}/lb2/Application-generator.html)创建的默认版本：

```js
{
  "initial:before": {
    "loopback#favicon": {}
  },
  "initial": {
    "compression": {}
    "cors": {
      "params": {
        "origin": true,
        "credentials": true,
        "maxAge": 86400
      }
    },
    "session": {},
    "auth": {},
    "parse": {},
    "routes": {},
    "files": {},
    "final": {
      "loopback#urlNotFound": {}
    },
    "final:after": {
      "loopback#errorhandler": {}
    }
  }
```

## Phases

middleware.json中的每个顶层属性都下面的一个[middleware phases](/doc/{{page.lang}}/lb2/Defining-middleware.html#Definingmiddleware-Middlewarephases):  

1.  **`initial`** - The first point at which middleware can run
2.  **`session`** - 准备session对象
3.  **`auth`** - 处理验证 权限
4.  **`parse`** - 解析请求主体
5.  **`routes`** - HTTP routes implementing your application logic.  Middleware registered via the Express API `app.use`, `app.route`, `app.get` (and other HTTP verbs) runs at the beginning of this phase.  Use this phase also for sub-apps like `loopback/server/middleware/rest` or `loopback-explorer`.

6.  **`files`** - 处理静态资源(请求是在这命中文件系统的)

7.  **`final`** - 处理错误和对非法URL的请求

每个phase都有"before"和"after"两个子phase。例子，对于"initial" phase， middleware按下面的顺序执行：

1.  `initial:before `
2.  `initial`
3.  `initial:after`

Middleware within a single subphase executes in the order in which it is registered. However, you should not rely on such order. Always explicitly order the middleware using appropriate phases when order matters.

通常，每个phase有下面的语法：

```
_phase_[:_sub-phase_] : {
_middlewarePath_ : {
[ enabled: [true | false] ]
[, name: _nameString_ ]
[, params : _paramSpec_ ]
[, methods: _methodSpec_ ]
[ paths : _routeSpec_ ]
}
}
```Where:

*   _phase_ 是上面列出的phase (如initial, session, auth, 等)或者是一个自定义的phase; 详见[Adding a custom phase](/doc/{{page.lang}}/lb2/Defining-middleware.html#Definingmiddleware-Addingacustomphase)
*   _sub-phase_ (可选) 可以是before或者after
*   name: （可选）middleware 名
*   _middlewarePath_: middleware函数的路径
*   _paramSpec_: middlewaer参数的值，通常是一个JSON对象
*   _methodSpec_: 一个数组，包含middleware可以被触发的HTTP方法；例如 `"methods" : ["GET", "POST"]。如果没有写，那么默认支持所有的HTTP方法`
*   _routeSpec_: 会触发middleware的REST endpoint(s)

更对信息，见[Defining middleware](/doc/{{page.lang}}/lb2/Defining-middleware.html).

## CORS设置

在initial phase中通过配置`cors.params` 属性来设置跨域资源共享 (CORS)。更多信息，见[cors](https://www.npmjs.com/package/cors)。

<table>
  <tbody>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>描述</th>
      <th>默认值</th>
    </tr>
    <tr>
      <td>cors.params.origin</td>
      <td>Boolean</td>
      <td>
        <p>Configures the&nbsp;<strong>Access-Control-Allow-Origin</strong>&nbsp;CORS header. Expects a string (ex: "<span class="nolink"><a href="http://example.com/" class="external-link" rel="nofollow">http://example.com/</a></span>"). Set to&nbsp;<code>true</code>&nbsp;to
          reflect the&nbsp;<a href="http://tools.ietf.org/html/draft-abarth-origin-09" class="external-link" rel="nofollow">request origin</a>, as defined by&nbsp;<code>req.header('Origin')</code>. Set to&nbsp;<code>false</code>&nbsp;to disable CORS.
          Can also be set to a function, which takes the request origin as the first parameter and a callback (which expects the signature&nbsp;<code>err [object], allow [bool]</code>) as the second.</p>
        <p>&nbsp;</p>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>cors.params.credentials</td>
      <td>Boolean</td>
      <td>
        <p>Configures the&nbsp;<strong>Access-Control-Allow-Credentials</strong>&nbsp;CORS header. Set to&nbsp;<code>true</code>&nbsp;to pass the header, otherwise it is omitted.</p>
        <p>You can set other cors properties as well. For more information, see <a href="https://www.npmjs.com/package/cors" class="external-link" rel="nofollow">cors</a>.</p>
      </td>
      <td>true</td>
    </tr>
    <tr>
      <td>cors.params.maxAge</td>
      <td>Number</td>
      <td>Configures the&nbsp;<strong>Access-Control-Allow-Max-Age</strong>&nbsp;CORS header. Set to an integer to pass the header, otherwise it is omitted.</td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
