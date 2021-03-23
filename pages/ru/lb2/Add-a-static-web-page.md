---
title: "Добавление статической веб-страницы"
lang: ru
layout: translation
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Add-a-static-web-page.html
summary: LoopBack leverages Express middleware to make it easy to serve up static content such as web pages.
---

Если вы придерживались всех предыдущих шагов в этом руководстве, перейдите к [Введение в связующее ПО](#Введение-в-связующее-ПО).

Если вы перешли к этому шагу без выполнения предыдущих, то вам следует выполнить следующие шаги...

Получите приложение (в состояни предшествуещем этому шагу) с GitHub и установите все связи:

```shell
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout step3
$ npm install
```

## Введение в связующее ПО

LoopBack построен на [Express](http://expressjs.com/), на одном из самых популярных Node фреймворков.  Объекты верхнего уровня LoopBack <span style="font-family: monospace;">приложения, наследует все методы и свойства Express объектов приложени. См [Работа с LoopBack объектами](Working-with-LoopBack-objects_5310637.html).

Перед тем как продолжить, вы должны понять основную концепцию наследованием LoopBack(ом) Express: связующее ПО (middleware).

Связующее ПО (_Middleware)_ это простая JavaScript функция с доступом к объекту запроса (req)  представляющий HTTP запрос, и объекту ответа  прдставляющий HTTP ответ, далее связующее ПО (middleware) - встраиваемый запрос-ответ цикл приложения Express , обычно обозначается перменной с далее идущим именем:

*   Выполнение кода
*   Внесение изминения в запрос и в объект ответа.
*   Завершение цикла запрос-ответ
*   Вызов следующего связующего ПО в стеке

LoopBack связующее ПО такое же как [Express связующее ПО](http://expressjs.com/guide/using-middleware.html), кроме того, что LoopBack добовляет понятие фаз, что позволяет настроить в каком порядке связующее ПО вызывается. Это позволяет избежать одного из сложных аспектов Express: убедится, что связующее ПО запускаеться, тогда, когда должно.

Когда вы создаете приложение с помощью slc loopback, создаеться `server/middleware.json`  файл, который определяет фазу выполненя связующего ПО. Регистрация нового связующего ПО так же проста, как редактирование этого JSON файла. Разверните этот код, чтоб увидеть как он выглядит.

**server/middleware.json**

```javascript
{
  "initial:before": {
    "loopback#favicon": {}
  },
  "initial": {
    "compression": {}
  },
  "session": {
  },
  "auth": {
  },
  "parse": {
  },
  "routes": {
    "loopback#status": {
      "paths": "/"
    }
  },
  "files": {
  },
  "final": {
    "loopback#urlNotFound": {}
  },
  "final:after": {
    "errorhandler": {}
  }
}
```

Каждый из ключей верхнего уровня middlewre.json определяет промежуточный этап: `initial`, `session`, `auth`, и так далее заканчивается final. Есть также модификаторы, чтоб зарегестрировтаь связующее ПО до и после данной фазы. Это нанмого больше этого, но это охватывает основы.  См [Определение связующего ПО](Defining-middleware.html) для получения более подробной информации.

## Изминени или модификация кореного маршрута заданногоп о умолчанию

Приложение как правило необхоимо  для обслуживания статического контента как HTML и CSS файлы, клиентские JavaScript файлы, изображения и другие. Это очень легко сделать  с помощью базового построения LoopBack  приложения. Вы собираетесь настроить приложение, чтобы обеспечить работу с файлами в `/client`  папке как статическими ресурсами.

Во-первых, вам придется отключить обработчик маршрута по умолчанию, для корневого URL. Вспомним [Создание простого API](5310599.html) (вы ведь выполняли все о порядку, не так ли?), когда вы загружали корень URL приложения [http://localhost:3000/](http://localhost:3000/), вы видели как приложение реагирует с простым статус сообщением, наподобии этого:

<pre>{"started":"2014-11-20T21:59:47.155Z","uptime":42.054}</pre>

Это происходит, потому как базавое приложение имеет  следующую запись  в `server/middleware.json`:

**/server/middleware.json**

```js
...
"routes": {
    "loopback#status": {
      "paths": "/"
    }
  },
...
```

Эта запись говорит, что для любого HTTP  запроса приложения будет возвращать результат `[oopback.status()](http://apidocs.strongloop.com/loopback/#loopbackstatus)`, одного из небольшого набора  встроеного [встроенного LoopBack связующего ПО](Defining-middleware_5310635.html#Definingmiddleware-Usingbuilt-inmiddleware).  Как с Express, кога вы указываете орневой URL, любой запрос, который  нчинается с  этого паттерна  будет вызывать связующее ПО,  тоесть любой  URL запрос будет вызывать его. 

Чтобы отключить это, просто удалите запись "loopback#status", или измините его на  чтоб статус связующего ПО вызывался только по пути /status (как это сделано в [loopback-getting-started](https://github.com/strongloop/loopback-getting-started)):

```shell
...
"routes": {
    "loopback#status": {
      "paths": "/status"
    }
  },
...<
```

## Определение статического связующего ПО

Дале вы должны определить статическое связующее ПО для обеспечения файлов в `/client` папке.   

Измените `server/middleware.json`.  Найдите запись "files":

**server/middleware.json**

```javascript
...
  "files": {
  },
...
```

Добавьте:

```javascript
...
  "files": {
    "loopback#static": {
      "params": "$!../client"
  },
...
```

Эти строки определяют _[статическое связующее ПО](Defining-middleware_5310635.html#Definingmiddleware-Staticmiddleware)_ которое позволяет приложению обеспечивтаь  работу с файлами в /client папке как статический контент. 

These lines define _[static middleware](Defining-middleware_5310635.html#Definingmiddleware-Staticmiddleware)_ that makes the application serve files in the `/client` directory as static content.   `$!` символы указывают, что путь относитеьно `middleware.json`.

## Добавление HTML файла

Теперь приложение будет использовать файлы, которые вы поместите в папку `/client` как статический контент. Тоеть, чтоб увидеть это в действии, добавьте HTML файл в `/client`. для примера, добавьте файл с именем index.html с данным контентом:

**/client/index.html**
```html
<head><title>LoopBack</title></head>
<body>
    <h1>LoopBack Rocks!</h1>
    <p>Hello World... </p>
</body>
```

Конечно вы можите добавить любой статический HTML  для примера.

## Запустите его....!

Теперь запустите приложение снова:

```shell
$ slc run
```

Когда вы загрузите [http://0.0.0.0:3000/](http://0.0.0.0:3000/) теперь вместо JSON состояния вы увидите вот это:

<div style="font-size: 11pt; border: 1px solid #cccccc; background-color: #EBF5EB; padding: 10px; border-radius: 3px; margin: 10px 50px 10px 50px;"><span style="font-weight: bold;">Next: В [Настройка маршрутизации Express](5310605.html), вы добавите простой обработчик маршрута также, как вы сделали бы это в Express приложении.</div>
