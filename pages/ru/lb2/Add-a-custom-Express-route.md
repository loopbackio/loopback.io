---
title: "Добавление пользовательского маршрута Express"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Add-a-custom-Express-route.html
summary:
---

{% include important.html content="

**Необходимое условие**:Установите StrongLoop, как описано в [Установка StrongLoop](Installing-StrongLoop.html).

**Рекомендации**: Прочитайте [Основные понятия LoopBack](LoopBack-core-concepts.html).

" %}

Потому как LoopBack построен на Express, вы можете добавить пользовательские маршруты, как вы делаете это в Express.

В этой части урока, вы собираетесь добавить новый пользовательский маршрут.

{% include note.html content="

Если вы выполняли предыдущие шаги, то перейдите к [Введение в загрузочные скрипты](-Express.html).

Если вы сразу перешли к этому шагу то выполните следующие действия, прежде чем идти дальше...

" %}

Получите приложение (в состоянии, требуемом для выполнения этого руководства) с GitHub и установите связи:

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout step4
$ npm install
```

## Введение в загрузочные скрипты

Когда LoopBack приложение запускается  (или "самозапускается"), оно запускает скрипты в  папке `/server/boot`, известные как  _boot скрипты_.  По умолчанию, LoopBack загружает загрузочные скрипты в алфавитном порядке.  

Стандартная базовая структура LoopBack приложения, созданная [генератором приложения](Application-generator.html), содержит стандартные загрузочные скрипты (в `/server/boot`) которые выполняют основную инициализацию:

*   `authentication.js` - Выполняет проверку подлиности для приложения, вызывая [`app.enableAuth()`](http://apidocs.strongloop.com/loopback/#app-enableauth).
*   `explorer.js` - Включает API Explorer. Удалите или измените этот файл, чтоб отключить API Explorer.
*   `rest-api.js` - Предоставляет модели через REST, используя  [`loopback.rest()`](http://apidocs.strongloop.com/loopback/#loopback-rest) связующее ПО.

Для получения более подробной информации по загрузочным скрипта, см. [Определение загрузочные скрипты](Defining-boot-scripts.html).

## Добавление нового загрузочного скрипта

Например, можно добавить новый загрузочный скрипт с названием routes.js в /server/boot папке, со следующим кодом:

**/server/boot/routes.js**

```js
module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });
}
```

Кстати, вы также легко могли воспользоваться [Express маршрутизация связующего ПО](http://expressjs.com/4x/api.html#router) вместо предыдущего кода, как этот:

**/server/boot/routes.js**

```js
module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/ping', function(req, res) {
    res.send('pongaroo');
  });
  app.use(router);
}
```

На самом деле вы можете добавить маршруты прямо в server.js с использованием API Express. Например, добавьте этот вызов для  [`app.use()`](http://expressjs.com/4x/api.html#app.use) как раз перед вызовом для app.start ():

**server/server.js**

```
...
app.use('/express-status', function(req, res, next) {
  res.json({ running: true });
});

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
```

Дело в том, что приложение LoopBack приложение может легко сделать все то, что может сделать приложение Express.

Если вы знакомы с Express, тоэто сделает для вас  LoopBack в совоении и использовании.

## Запустите загрузочный скрипт

Теперь запустите приложение снова:

`$ slc run`

Загрузите [http://0.0.0.0:3000/ping](http://0.0.0.0:3000/ping). Вы увидите "pong" в качестве ответа

Next: Прочитайте [Узнать больше](-.html) для того чтоб получить больше информации.
 </div>

[ ](https://github.com/strongloop/loopback-getting-started/wiki/_new?wiki%5Bname%5D=_Footer)
