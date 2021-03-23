---
title: "Расширьте свой API"
lang: ru
layout: translation
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Extend-your-API.html
summary:
---

В этом разделе вы добавите пользовательский  remote method в свое API.

Если вы придерживались всех шагов в этой документации то сразу переходите к [Добавление удаленного метода (#Добавление-удаленного-метода--remote-method-)

Если вы пропустили предыдущие шаги. То вам нужно сначала выполнить следующие пункты...

Загрузить приложение ( в состоянии требующемся для выполнения данного руководства) с GitHub и проинсталлировать:

```shell
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout step2
$ npm install
```

## Добавление удаленного метода (remote method)

Выполните следующие действия:

1.  Откройте каталог приложения `/common/models`.  Вы увидите что там лежит `coffee-shop.js` файл.  
    LoopBack [генератор модели](Model-generator_5310659.html) (`slc loopback:model`) всегда создает два файла в `/common/models` для каждой модели: JSON файл с именем вида `<_model-name_>.json` с описанием свойств модели и JavaScript файл вида `<_model-name_>.js` где вы можите расширить и переопределить поведение модели.

2.  Откройте `coffee-shop.js` в вашем любимом редакторе.  По умолчанию он содержит пустую функцию: 

    ```shell
    module.exports = function(CoffeeShop) {
    };
    ```

3.  Добавьте следующий код в эту функцию для расширения поведения модели  с удаленным методом (remote method), как в данном примере:

  ```shell
      module.exports = function(CoffeeShop) {
      CoffeeShop.status = function(cb) {
        var currentDate = new Date();
        var currentHour = currentDate.getHours();
        var OPEN_HOUR = 6;
        var CLOSE_HOUR = 20;
        console.log('Current hour is ' + currentHour);
        var response;
        if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
          response = 'We are open for business.';
        } else {
          response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
        }
        cb(null, response);
      };
      CoffeeShop.remoteMethod(
        'status',
        {
          http: {path: '/status', verb: 'get'},
          returns: {arg: 'status', type: 'string'}
        }
      );
    };
    ```

    Тут приведен просто удаленный метод "status" который не принимает никаких аргументов, и сверяет время и возвращает в JSON  сообщение, которое говорит "Open for business" или "Sorry we are closed" в зависимости от текущего времени.

    Конечно, на практике вы можете сделать гораздо более интересные и сложные вещи используя удаленные методы (remote method), таких как манипуляции  c введенными данными, перед сохранением их в базу данных. Вы можите изменить путь где вы вызываете удаленный метод (remote method), и определять сложные аргументы и возвращаемые значения.  См. [Удаленные методы (remote methods)](Remote-methods_5310632.html) для получения более подробной информации.

4.  Сохраните файл.

## Попробуйте удаленный метод (remote method)

1.  Вернитесь в корневой каталог приложения и запустить его:

```$ slc run```

2.  Перейдите по адресу [http://localhost:3000/explorer](http://localhost:3000/explorer) для просмотра API Explorer.  Затем кликнете на  CoffeeShops и вы увидите новый REST endpoint, `GET/CoffeeShop/status` который вызывает удаленный метод (remote method).  

3.  Кликните **Try it Out!**  
    Вы увидите результат вызова удаленного метода (remote method) :  
```
        {
          "status": "Open for business." }
```

Вот как легко обавлть удаленные методы с  LoopBack! 

Для получения более подробной информации, см.  [Удаленные методы](Remote-methods_5310632.html).

<div style="font-size: 11pt; border: 1px solid #cccccc; background-color: #EBF5EB; padding: 10px; border-radius: 3px; margin: 10px 50px 10px 50px;">Next: В [Добавление статической страницы](5310604.html), вы добавите Express промежуточное ПО для обслуживания статиеского контента такого, ак HTML/CSS, картинки, и JavaScript.</div>
