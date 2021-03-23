---
title: "Использование API Explorer"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Use-API-Explorer.html
summary:
---

{% include important.html content="

**Необходимое условие**:Установите StrongLoop, как описано в [Установка StrongLoop](Installing-StrongLoop.html).

**Рекомендации**: Прочитайте [Основные понятия LoopBack](LoopBack-core-concepts.html).

" %}

LoopBack приложения поставляется с встроенным API Explorer, который вы можите использовать для тестирования REST API в процессе разработки.

Скорей всего вы не единственный кто будет использовать API, которое вы создали.  А это значит, что вам нужно документировать ваше API.  К счастью, LoopBack сам генерирует  портал разработчика / API Explorer для вас. 

{% include note.html content="

Если вы придерживались всех шагов в [Создание простого API](-API.html), убедитесь что приложение запущенно и потом переходите к выполнению [Запуск API Explorer](-API-Explorer.html).

Если вы пропустили предыдущие шаги. То вам нужно сначала выполнить следующие пункты...

" %}

Загрузить приложение ( в состоянии требующемся для выполнения данного руководства) с GitHub и проинсталлировать:

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout step1
$ npm install
```

## Запуск API Explorer

Запустите приложение:

`$ slc run`

Теперь перейдите оп адресу [http://localhost:3000/explorer](http://localhost:3000/explorer).  Вы увидите StrongLoop API Explorer покажет две модели вашего приложения: **Users** и **CoffeeShops:** 

{% include image.html file="5570901.png" alt="" %}

В дополнение к CoffeeShop модели которую вы определили, по умолчанию Loopback генерирует User модель и ее endpoints для всех приложений.  

## О встроенных моделях LoopBack

На самом деле, LoopBack создает несколько других [встроенных моделей](-.html) для распространенных случаев:

*   **[Application model](-.html)** - содержит метаданные для клиентского приложения, которое имеет свои характерные особенности и связанно конфигурацией с LoopBack сервером.
*   **[User model](-.html) **- регистрация и аутентификация пользователей вашего приложения локально или с помощью сторонних сервисов.
*   **[Access control models](-.html)** - ACL, AccessToken, Scope, Role и RoleMapping модели для контроля доступа к приложениям, ресурсам и методам.
*   **[Email model](-.html)** - отправка почты для пользователей вашего приложения с помощью SMTP или стороннего сервиса.

Встроенные модели (за исключением Email) относяться к [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel), поэтому они автоматически имеют полный комплект CRUD операций: создание, редактирование удаление.

{% include note.html content="

По умолчанию только User модель открывается через REST. Для открытия других моделей, внесите изменения в публичные свойства модели (model's `public` property) на true в файле `/server/model-config.json`. См. [Exposing models](https://docs.strongloop.com/pages/viewpage.action?pageId=5310515#id-ИспользованиемоделичерезREST-Exposingmodels) для получения более подробной информации. **Будьте осторожны**: открывая некоторые модели для общего пользования, вы можите рисковать безопасностью вашего приложения.

" %}

## Просмотр вашей модели CoffeeShop

Сейчас, перейдите к "детализации" модели CoffeeShop. Кликните на **CoffeeShops** чтоб увидеть все  API endpoints:

{% include image.html file="5570900.png" alt="" %}

Прокрутите вниз и просмотрите строчки  API endpoints: вы увидите, что они включают весь ряд CRUD операций: создание, чтение, редактирование и удаление, и еще некоторые другие.

Кликнете на первой строке, **POST  /CoffeeShops **   **Create a new instance of the model and persist it into the data source **чтобы развернуть эту операцию:

{% include image.html file="5570899.png" alt="" %}

Следуйте инструкциям в приведенной выше схеме.

Кликнете по Model Schema чтоб получить JSON "шаблон данных" который можно редактировать в поле **данных**.  

Добавьте любой текст в качестве имени свойства. Вам не нужно ничего вводить в `id` параметр, потому как LoopBack автоматически отредактирует его, что гарантирует всегда уникальный id параметр для операторов модели.

```js
{
  "name": "My Coffee Shop",
  "id": 0
}
```

Далее кликните по кнопке **Try it out!**

Вы увидите информацию по запросу REST представленному и ответу приложения (для примера):

{% include image.html file="5570898.png" alt="" %}

**Response Body** поле покажет данные, которые только что были введены, возвращенные как подтверждение того что они были добавлены в хранилище данных.

Теперь нажмите **GET  /CoffeeShops     Find all instances of the model matched by filter from the data source, **чтоб развернуть этот endpoint:

Нажмите **Try it out!,** чтоб получить данные введенные для моделиCoffeeShop.  Вы должны увидеть запись созданную с помощью POST API.

<div class="sl-hidden"><strong>Non-public Information</strong><br>
  <p><strong>Try out user login and authentication</strong></p>
  <p>Right now you're probably thinking about security. Don't worry, LoopBack provides a full-featured solution for authentication and authorization. &nbsp;Follow the steps here to get an overview of how it works.</p>
  <p>First, in API Explorer, close the&nbsp;<strong>CoffeeShop</strong>&nbsp;model and expand the&nbsp;<strong>Users</strong>&nbsp;model.</p>
  <p>The basic flow is:</p>
  <ol>
    <li>Create a new user record with an email, and password.</li>
    <li>Login with the email and password. &nbsp;The application response will include an id property that is the user's access token.</li>
    <li>Copy the access token from the response and copy it into the accessToken field.</li>
    <li>Click&nbsp;<strong>Set Access Token</strong>.</li>
  </ol>
  <p>What operations can you perform? &nbsp;Which do you need to be an admin user for?</p>
</div>

Next: В [Подключение вашего API к хранилищам данных](-API-.html), вы узнаете как подключить вашу модель к базе данных, такой как MongoDB.
