---
title: "server.js"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/server.js.html
summary:
---

Это главный  скрипт приложения в стандартном приложении, созданном с помощью `slc loopback`.

**
1 - 3**: Запрашивает LoopBack модули и настраивает стандартные объекты [`loopback`](http://apidocs.strongloop.com/loopback/#loopback), [`приложение`](http://apidocs.strongloop.com/loopback/#var-app-loopback), и [`запускает`](http://apidocs.strongloop.com/loopback-boot/#boot).

**6**: [Инициализация (запуск) приложения](Defining-boot-scripts.html).

**7+**: Старт приложения и web-сервера.

```js
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};
// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
```