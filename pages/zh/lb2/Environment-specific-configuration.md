---
title: "Environment-specific configuration"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Environment-specific-configuration.html
summary:
---

## Overview

You can set up configurations for specific environments (for example, development, staging, and production) using [config.json](/doc/{{page.lang}}/lb2/config.json.html) and [datasources.json](/doc/{{page.lang}}/lb2/datasources.json.html) (and their corresponding JavaScript files).

### Example

For an example, see [https://github.com/strongloop/loopback-example-full-stack/tree/master/server](https://github.com/strongloop/loopback-example-full-stack/tree/master/server).

For application configuration:

*   [config.json](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/config.json)
*   [config.local.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/config.local.js)

For data source configuration:

*   [datasources.json](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.json)
*   [datasources.production.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.production.js)
*   [datasources.staging.js](https://github.com/strongloop/loopback-example-full-stack/blob/master/server/datasources.staging.js)

## Application-wide configuration

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

### Turning off stack traces

By default, stack traces are returned in JSON responses.  To turn this off, add this line to `server/config.json`:

**server/config.json**

`loopback.rest({disableStackTrace: true})`

{% include important.html content="

Setting the NODE_ENV environment variable to \"production\" also turns off stack traces in JSON responses.

" %}

### Disabling API Explorer

LoopBack [API Explorer](/doc/{{page.lang}}/lb2/6095009.html) is great when you're developing your application, but for security reasons you may not want to expose it in production.  To disable API Explorer entirely, if you created your application with the [Application generator](/doc/{{page.lang}}/lb2/Application-generator.html), simply delete or rename `server/boot/explorer.js`. 

### Customizing REST error handling

You can customize the REST error handler by adding the error handler callback function to `config.local.js` as follows:

**server/config.js**

```js
module.exports = {
  remoting: {
    errorHandler: {
      handler: function(err, req, res, next) {
        // custom error handling logic
        // call `next()` to fall back to the default error handler
      }
    }
  }
};
```

## Data source configuration

你可以在洗面的文件中覆盖datasource.json中设置的值：

*   `datasources.local.js` 或 `datasources.local.json`
*   `datasources._env_.js` 或 `datasources._env_.json`, 这里的_`env`_ 是`NODE_ENV`环境变量的值。 (一般是`development` 或 `production`)；例如，`datasources.production.json`.

{% include important.html content="

这些文件只能使用值类型（字符串，数字）来覆盖顶层的属性。目前还不支持聚合对象和数组。

" %}

Example data sources:

**datasources.json**

```js
{
  // 键是数据源的名字
  // 值是传给app.dataSource(name, config)的config对象
  db: {
    connector: 'memory'
  }
}
```

**datasources.production.json**

```
{
  db: {
    connector: 'mongodb',
    database: 'myapp',
    user: 'myapp',
    password: 'secret'
  }
}
```

## Getting values from environment variables

You can easily set an environment variable when you run an application like this:

`$ MY_CUSTOM_VAR="some value" slc run`

or

```
$ export MY_CUSTOM_VAR="some value"
$ slc run
```

Then this variable is available to your application as `process.env.MY_CUSTOM_VAR`.

<div class="sl-hidden"><strong>Non-public Information</strong><br>
  <ol>
    <li>overview
      <ol>
        <li>typically, for all apps, you need to set up configs for different environments
          <ol>
            <li>prod, dev, staging, etc</li>
            <li>we support two types of configs: app and datasource<br>
              <ol>
                <li>configure app settings via config.json LINK TO app init default files section config.json file</li>
                <li>configure datasource settings via datasource.json (and .js versions) LINK TO app init default files section datasources.json file</li>
              </ol>
            </li>
          </ol>
        </li>
        <li>turning off stack traces is a good idea LINK TO stack trace section</li>
        <li>disabling the API explorer is a good idea LINK TO disabling api explorer</li>
        <li>you can also retrieve values from ENV_VARS LINK TO env vars</li>
      </ol>
    </li>
    <li>app wide configs
      <ol>
        <li>talk about config + datasource.json (ie app configs are set in config, ds is used to set ds configs at application level)</li>
        <li>overriding values in config.json (to override blah, do this)</li>
        <li>overrding values in datasources.json (to override blah, do this)</li>
      </ol>
    </li>
    <li>turning off stack traces</li>
    <li>disabling the api explorer</li>
    <li>getting values from env vars</li>
  </ol>
</div>
