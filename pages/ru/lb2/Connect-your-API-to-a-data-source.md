---
title: "Подключение вашего API к хранилищам данных"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Connect-your-API-to-a-data-source.html
summary:
---

{% include important.html content="

**Необходимое условие**:Установите StrongLoop, как описано в [Установка StrongLoop](Installing-StrongLoop.html).

**Рекомендации**: Прочитайте [Основные понятия LoopBack](LoopBack-core-concepts.html).

" %}

LoopBack позволяет вам легко подключать ваши модели к различным хранилищем данных, без необходимости писать код.

В данном разделе мы собираемся подключить приложение, которое мы сделали на предыдущем шаге к базе данных MySQL.   

{% include note.html content="

Если вы придерживались всех шагов в предыдущем разделе, то переходите к выполнению [Add a data source](-API-.html).

Если вы пропустили предыдущие шаги. То вам нужно сначала выполнить следующие пункты...

" %}

Загрузить приложение ( в состоянии требующемся для выполнения данного руководства) с GitHub и проинсталлировать:

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout step1
$ npm install
```

## Добавление хранилища данных

Вам нужно определить источник данных, используя [Генератор баз данных](Data-source-generator.html):

`$ slc loopback:datasource`

Генератор попросит ввести вас имя базы данных.

`[?] Enter the data-source name:`

Введите **mysqlDs** и нажмите **Enter**.

Далее генератор попросит выбрать вас тип базы данных:

```
[?] Select the connector for mysqlDS: (Use arrow keys)
  other
  In-memory db (supported by StrongLoop)
  MySQL (supported by StrongLoop)
  PostgreSQL (supported by StrongLoop)
  Oracle (supported by StrongLoop)
  Microsoft SQL (supported by StrongLoop)
  MongoDB (supported by StrongLoop)
(Move up and down to reveal more choices)
```

Стрелками на клавиатуре выберите **MySQL**, и нажмите **Enter**.  

Генератор добавит описание базы данных в  `server/datasources.json` файл, как показано ниже.  Обратите внимание на "mysqlDs" это хранилище данных, которое вы только что добавили, и хранилище данных  "db," которое используется по умолчанию..

**datasources.json**

```js
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mysqlDs": {
    "name": "mysqlDs",
    "connector": "mysql"
  }
}
```

## Установка MySQL соединения 

А  теперь добавьте loopback-connector-mysql модуль и установите зависимости:

`$ npm install loopback-connector-mysql --save`

## Настройка базы данных

{% include important.html content="

Если у вас есть сервер MySQL, то предпочтительно его использование. Создайте базу данных \"demo.\" При желании, вы можите использовать другое имя . Просто убедитесь, что `mysqlDs.database` свойство в `datasources.json `соответствует ему (см. ниже).

Если нет, вы можите использовать StrongLoop MySQL сервер запущенный по ссылке [demo.strongloop.com](http://demo.strongloop.com/). Однако следует помнить, что это общедоступный ресурс. Существует небольшая вероятность, что два пользователя запустят скрипт, который создаст тестовые данные (см. ниже [Добавление тестовых данных](-API-.html)) в одно и тоже время и сработате в условиях перехвата. Поэтому, мы рекомендуем вам использовать ваш личный MySQL сервер, если он у вас имеется.

" %}

Далее вам нужно настроить источник данных для использования MySQL  сервера.

Отредактируйте `/server/datasources.json` и после строки

`    "connector": "mysql"`

добавьте `host`, `port`, `database`, `username`, и `password` свойства.  

**Для использования StrongLoop MySQL сервера**: запущенный на [demo.strongloop.com](http://demo.strongloop.com/), введите значения указанные ниже.  

**Для использования собственого  MySQL сервера**: введите hostname, port number, и login и учетные данные для входа на ваш сервер. 

**/server/datasources.json**

```js
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mysqlDs": {
    "name": "mysqlDs",
    "connector": "mysql",
    "host": "demo.strongloop.com",
    "port": 3306,
    "database": "demo",
    "username": "demo",
    "password": "L00pBack"
  }
}
```

## Присоединение CoffeeShop модели к MySQL

Теперь вы создали источник данных MySQL и у вас есть CoffeeShop модель; вам осталось только соединить их.

Now you've created a MySQL data source and you have a CoffeeShop model; you just need to connect them.  LoopBack приложения используют  [model-config.json](model-config.json.html) файл для присоединения модели к источнику данных. Отредактируйте  в `/server/model-config.json`   CoffeeShop вход:

**/server/model-config.json**

```js
...
  "CoffeeShop": {
    "dataSource": "db",
    "public": true
  }
  ...
```

Измините  `dataSource` свойство с `db` на `mysqlDs`.  Это присоединит CoffeeShop модель к MySQL источнику данных, который вы только что создал и сконфигурировали.

## Добавление некоторые тестовые данные и просомтр их

Теперь у вас есть CoffeeShop модель в LoopBack. Как вас создать корректную таблицу в MySQL базе данных?

Вы можите попробывать выполнить некоторые SQL выражения немедленно...но LoopBack используя Node API чтоб сделать это для вас автоматически вызывая процесс _auto-migration_.  Для получения более подробной информации, см. [Создание схемы базы данных из модели](Creating-a-database-schema-from-models.html).

`loopback-getting-started` модуль содержит `create-sample-models.js` скрипт для демонстрации auto-migration.  Если вы следуете этому руководству с самого начала (и не клонировали проект с репозитория, а соответсвенно и этот скрипт), то вам нужно создать его с приведеного ниже образца или взять  [с GitHub](https://github.com/strongloop/loopback-getting-started/blob/master/server/boot/create-sample-models.js) .  Поместите его в свое приложение  в следующую папку `/server/boot`. Он будет выполнен после запуска приложения.

{% include note.html content="

auto-migration script приведенный ниже является примером _boot script (_загрузачного скрипта) которые LoopBack выполняет, когда приложения запускается. Используйте загрузочные скрипты для инициалзации и выполнения любой другой логики, требуемой для вашего приложения, когда оно запускается. См. [Defining boot scripts](Defining-boot-scripts.html) для получения более подробной информации.

" %}

**/server/boot/create-sample-models.js**

```js
module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate('CoffeeShop', function(err) {
    if (err) throw err;

    app.models.CoffeeShop.create([{
      name: 'Bel Cafe',
      city: 'Vancouver'
    }, {
      name: 'Three Bees Coffee House',
      city: 'San Mateo'
    }, {
      name: 'Caffe Artigiano',
      city: 'Vancouver'
    }, ], function(err, coffeeShops) {
      if (err) throw err;

      console.log('Models created: \n', coffeeShops);
    });
  });
};
```

Это позволит вам сохранить некоторые тестовые данные  в источнике данных.

{% include note.html content="

Загрузочный скрипт содержащий automigration команды будет запускаться каждый раз как вы запусаете свое приложение. С запуском [automigrate()](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate) таблицы сначала удаляються перед попыткой их создания. Это исключает создание дубликатов таблиц.

" %}

Теперь запустите приложение:

`$ slc run`

В консоли вы должны увидеть это:

```
...
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/
Models created: [ { name: 'Bel Cafe',
    city: 'Vancouver',
    id: 1 },
  { name: 'Three Bees Coffee House',
    city: 'San Mateo',
    id: 3 },
  { name: 'Caffe Artigiano',
    city: 'Vancouver',
    id: 2 } ]
```

Вы можите всегда воспользоваться API Explorer:

1.  Откройте в браузере [http://0.0.0.0:3000/explorer/](http://0.0.0.0:3000/explorer/) (you may need to use [http://localhost:3000/explorer,](http://localhost:3000/explorer,) depending on your browser and OS).
2.  Кликните по **GET  /CoffeeShops  Find all instance of the model matched by filter...**
3.  Кликните по **Try it out!**
4.  Вы увидите данные о трех кафе созданных в предыдущем сценарии. 

Next: В главе [Расширьте свой API](-API.html), вы узнает как добавить свой, пользовательский метод в свою модель.
