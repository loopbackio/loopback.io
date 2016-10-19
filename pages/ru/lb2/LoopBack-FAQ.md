---
title: "Пример приложения LoopBack"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/LoopBack-FAQ.html
summary:
---

## Следующий шаг

Если вы не прошли [Начало работы с LoopBack](-LoopBack.html), то сейчас самое время это сделать.  

Для более глубокого понимания  LoopBack и того, как он работает, прочитайте [Определение модели](-.html) и [Соединение модели с базой данных](Connecting-models-to-data-sources.html). руководство пошаговый опишет создание простого LoopBack приложения. 

На GitHub  вы найдете репозиторий   [loopback-getting-started](https://github.com/strongloop/loopback-getting-started) с готовым приложением, создание которого будет описываться в данном руководстве. Вы можите скачать его себе и пройти шаг за шагом, которые мы для вас заблаговременно подготовили в виде тегов [tags](https://github.com/strongloop/loopback-getting-started/tags).

Вы можите выполнить все пошагово для того, чтоб создать приложение и понять смысл некоторых вещей в  LoopBack , или просто перейти к тому шагу, который вас интересует:

*   [Создание простого API](-API.html)
*   [Использование API Explorer](-API-Explorer.html)
*   [Подключение вашего API к хранилищам данных](-API-.html)
*   [Расширьте свой API](-API.html)
*   [Добавление статической веб-страницы](-.html)
*   [Добавить пользовательски маршрут Express](-Express.html)
*   [Узнать больше](-.html)�мках Loopback:

*   iOS SDK (Objective C) для iPhone и iPad приложений.  См. [iOS SDK](iOS-SDK.html) для получения более подробно информации.
*   Android SDK (Java) для Android приложений.  См. [Android SDK](Android-SDK.html) для получения более подробно информации.
*   AngularJS (JavaScript) для HTML5 front-ends. См. [AngularJS JavaScript SDK для получения более подробно информации](AngularJS-JavaScript-SDK.html).

### Какие коннекторы данных есть в LoopBack?

LoopBack provides numerous connectors to access enterprise and other backend data systems.

LoopBack предоставляет многочисленные коннекторы для доступа крупных проектов и других backend систем данных.

Коннекторы баз данных:

*   [Memory connector](Memory-connector.html)
*   [MongoDB connector](MongoDB-connector.html)
*   [MySQL connector](MySQL-connector.html)
*   [Oracle connector](Oracle-connector.html)
*   [PostgreSQL connector](PostgreSQL-connector.html)
*   [Redis connector](Redis-connector.html)
*   [SQL Server connector](SQL-Server-connector.html)

Другие коннекторы:

*   [ATG connector](ATG-connector.html)
*   [Email connector](Email-connector.html)
*   [Push connector](Push-connector.html)
*   [Remote connector](Remote-connector.html)
*   [REST connector](REST-connector.html)
*   [SOAP connector](SOAP-connector.html)
*   [Storage connector](Storage-connector.html)

Кроме того, есть [общественные соединители](Community-connectors.html), созданные разработчиками в LoopBack сообществе с открытым исходным кодом.

### Почему curl запрос к моему LoopBack приложению терпит неудачу?

If the URL loads fine in a browser, but when you make a `curl` request to your app you get the error:

Если URL загружается в браузере хорошо, но когда вы делаете curl запрос к вашему приложению вы получаете сообщение об ошибке:

`curl: (7) Failed to connect to localhost port 3000: Connection refused`

Причиной скорей всего будет несовместимость IP версии между вашим приложением и `curl`.

{% include note.html content="

На Mac OS 10.10 (Yosemite), `curl` использует IP v6 по умолчанию.

" %}

LoopBack, по умолчанию использует IP v4, а `curl` может использовать IP v6\. Если вы увидите IP v6 запись в вашем фале хоста (::1 localhost, fe80::1%lo0 localhost), вполне вероятно, что `curl` делает запрос используя IP v6\. Для того, чтоб сделать запрос используя IP v4, укажите свой `--ipv4` параметр в вашем curl запросе, как показано ниже.

`$ curl http://localhost:3000 --ipv4`

Вы можите сделать, чтоб ваше LoopBack приложение использовало IP v6, указав адрес IP v6, как показано ниже:

```js
app.start = function() {
  // start the web server
  return app.listen(3000, '::1', function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};
```

## Более конкретные вопросы

После того, как вы начнете работать с LoopBack, у вас могут появится более конкретные вопросы. Наиболее распространенные из них мы собрали тут с короткими вопросами и ссылками на документацию для получения полного ответа. 

### Как вы выполняете GET запрос на удаленный сервер?

Во-первых, вы должны настроить источник данных, используя  [REST коннектор](REST-connector.html). В [datasources.json](datasources.json.html)  файле, который конфигурирует источник данных, вы можите задать  операцию обратную REST API, используя свойства операций.

В качестве короткого примера см.  [loopback-faq-rest-connector](https://github.com/strongloop/loopback-faq-rest-connector).

### Может приложение возвращать XML вместо JSON?

Да: в `server/config.json` установить свойство `remoting.rest.xml` как `true`.  См. [config.json](config.json.html) для получения более детальной информации.

### Как послать email из приложения?

Вкратце:

1.  Настроить источник данных для использования  [email коннекта](Email-connector.html).
2.  Спроектируйте `Email` модель в  источник данных email.
3.  Отправить email используя модель настроенную с помощью  [`Email.send()`](http://apidocs.strongloop.com/loopback/#email-send).

См. [loopback-faq-email](https://github.com/strongloop/loopback-faq-email) для примера.

### How do you use static middleware?

Static middleware enables an application to serve static content such as HTML, CSS, images, and client JavaScript files.  To add it:

1.  Remove the contents of the default `"routes"` property in [`middleware.json`](middleware.json.html).
2.  Add the following to the `"files"` property in [`middleware.json`](middleware.json.html): to serve static content from the project's `/client` directory.

    ```js
    "loopback#static": { 
      "params": "$!../client"
    }
    ```

    Of course, change the value to use a different directory to contain static content.

See [Defining middleware](Defining-middleware.html) for more information, and [loopback-faq-middleware](https://github.com/strongloop/loopback-faq-middleware) for a short example.

### What kind of hooks do models support?

Model hooks are functions that are executed when certain events occur in a model's lifecycle.  LoopBack models many different hooks, for example: `afterInitialize` after a model is initialized, `beforeValidate` / `afterValidate` (before and after  model validation), `beforeSave` / `afterSave` (before and after a model is saved), and so on.

See [Model hooks](Model-hooks.html) for a complete list and more information.  See [loopback-faq-model-hooks](https://github.com/strongloop/loopback-faq-model-hooks) for a brief example.

### Вопросы управления пользователями

See [Управление пользователями](-.html) for more information and [loopback-faq-user-management](https://github.com/strongloop/loopback-faq-user-management) for relevant code examples.

См.  [Управление юзерами](-.html) для получения более подробной информации и примеры кода  [loopback-faq-user-management](https://github.com/strongloop/loopback-faq-user-management) 

Примечание:

*   Вы должны [натсроить LoopBack для отправки email](https://github.com/strongloop/loopback-faq-email) для email-связывания.
*   Если вы используете Gmail, просто [замените данные пользователя и пароль](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/datasources.json#L19-L20) на свои учетные данные.

#### Как зарегистрировать нового пользователя?

1.  Создайте форму регистрации.
2.  Создайте [remote hook](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L5-L35) для [отправки email с подтверждением](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L9-L34).

Примечание:

*   При выполнении, user.verify посылает электронную почту с помощью предложенных [опций](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L9-L17).
*   Верификация email настроена для [redirect the user to the `/verified` route](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L15) для общего случая. Для вашего приложения  вы должны настроить перенаправление  конкретно для своего случая.
*   [Опции](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L9-L17) self-explanitory не считая `type`, `template` and `user.`
    *   `type` - значением должен быть `email`.
    *   `template` -путь к шаблону для проверки email.
    *   `user` - когда это предусмотрено, информация в объекте будет использована в  проверочной ссылке email.

#### Как вы отсылаете проверочный email новому юзеру?

См. [шаг 2](https://github.com/strongloop/loopback-faq-user-management#how-do-you-register-a-new-user) в предыдущем вопросе.

#### Реализация возможности логина пользователя?

1.  Создайте [форму входа](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/login.ejs#L2-L17).
2.  Создайте [маршрута обработки запроса входа](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L20-L41).

#### Реализация возможности разлогировнаия пользователя?

1.  Создайте [ссылку разлогировнаия с access token внедренного в URL](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/home.ejs#L4).
2.  Вызовите [`User.logout`](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L45) с access token.

Примечание:

*   Мы используем loopback token middleware для обработки access tokens. До тех пор, пока вы не представите `access_token` в строке запроса URL,  access token объекта будет представлен в `req.accessToken` свойстве в вашем обработчике маршрута.

#### Как реализовать сброс пароля для зарегистрированного пользователя

1.  Создайте [форму сброса пароля](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/login.ejs#L40-L51).
2.  Создайте [endpoint для обработки информации сброса пароля](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L52-L66). Вызов `User.resetPassword выдает` `resetPasswordRequest` событие, и создает временный access token.
3.  Зарегистрируйте обработчик события `resetPasswordRequest` который отправит email зарегистрированному пользователю. В нашем примере, мы приводим [URL](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L40-L41), который перенаправляет пользователя на  [страницу сброса пароля с проверкой подлинности с временным access token](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L68-L74).
4.  Создайте [форму сброса пароля](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/password-reset.ejs#L2-L17), где пользователь введет и подтвердит новый пароль.
5.  Создайте [endpoint процесса сброса пароля](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L76-L99).

Примечание: Для обработчика обратного вызова resetPasswordRequest, вам предоставляется с объектом информация, которая содержит данные, относящиеся к пользователю, который запрашивает сброс пароля.
