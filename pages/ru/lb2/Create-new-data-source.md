---
title: "Создание нового источника данных"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Create-new-data-source.html
summary: Вы можите легко присоединить LoopBack приложение к различным источникам данных.
---

{% include important.html content="
**Необходимое условие**:Установите StrongLoop, как описано в [Установка StrongLoop](Installing-StrongLoop.html).

**Рекомендации**: Прочитайте [Основные понятия LoopBack](LoopBack-core-concepts.html).
" %}

## Добавление источника данных

Вы собираетесь добавить MongoDB источник данных в дополнение к MySQL, созданному в Подключение вашего API к хранилищам данных.

```sh
$ slc loopback:datasource
```

На появившийся запрос вам нужно ответить следующим образом:

```sh
? Enter the data-source name: mongoDs
? Select the connector for mongoDs: MongoDB (supported by StrongLoop)
```

## Установка MongoDB коннектора

```sh
$ npm install --save loopback-connector-mongodb
```

## Настройка источника данных

Отредактируйте datasources.json для настройки источника данных, таким образом, чтоб он соединялся с StrongLoop демо MongoDB сервер.  Добавьте этот текст в JSON, после двух уже существующих определений источника данных (для "db" и "mysqlDs"):

**server/datasources.json**

```js
...
"mongoDs": {
    "name": "mongoDs",
    "connector": "mongodb",
    "host": "demo.strongloop.com",
    "port": 27017,
    "database": "getting_started_intermediate",
    "username": "demo",
    "password": "L00pBack"
  }
```

**Next**: Далее выполните Создание новой модели.
