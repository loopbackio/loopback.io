---
title: "LoopBack Pусский"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/index.html
summary:
---

**LoopBack** -это высоко расширяемый  Node.js фреймворк с открытым исходным кодом, который позволяет:

*   Создавать динамическое end-to-end REST API с минимальным написанием кода или вовсе без программирования.
*   Получать доступ к данным крупных реляционных баз данных, MongoDB, SOAP и REST API.
*   Внедрять модели отношений и управление доступом для сложных API.
*   Использовать встроенные push, геолокационные и файловые сервисы для мобильных приложений.
*   Легко создавать клиентские приложения для платформ на  Android, iOS, и JavaScript SDKs.
*   Запустить ваше приложение локально или в облачном сервисе.      

{% include note.html content="
Прочитайте [Основные понятия LoopBack](-LoopBack.html),  чтоб узнать о ключевых понятиях, с которыми необходимо ознакомится, перед использованием LoopBack.

Выполните [Приступая к работе с LoopBack](-LoopBack.html) для знакомства  с ключевыми особенностями LoopBack's.
" %}

## LoopBack фреймворк

{% include see-also.html title=false content="
Новое в  Node.js? Как начать работать с Node.js:

*   [PHP разработчикам](http://strongloop.com/strongblog/node-js-php-get-started/)
*   [Rails разработчикам](http://strongloop.com/strongblog/node-js-ruby-on-rails-getting-started/)
*   [Java разработчикам](http://strongloop.com/strongblog/node-js-java-getting-started/)
" %}

LoopBack фреймворк  - это  набор модулей Node.js , которые можно использовать по отдельности или вместе.   

Приложение взаимодействует с источником посредством LoopBack модели  API,  доступных локально в  Node.js,  [удаленно через REST](Built-in-models-REST-API.html), а также через собственное клиентское  API для [iOS, Android, и HTML5](Client-SDKs.html). Используя данное API, приложения  могут запрашивать данные из баз данных, записывать данные, загружать файлы, отсылать email, создавать push оповещения , регистрировать пользователей, а также выполнять другие действия  предусмотренные хранилищем данных и сервисом.

Клиенты могут обратится к  LoopBack APIs, непосредственно через  [Strong Remoting](https://docs.strongloop.com/display/LB/Strong+Remoting), встроенные протоколы передачи данных, что позволит вам представлять API посредством REST, WebSockets и других протоколов.

Следующая диаграмма иллюстрирует основные  LoopBack модули, как они связаны между собой  и их зависимости. 

{% include image.html file="9830413.png" alt="LoopBack modules" %}

### LoopBack фреймворк модули

<table>
  <tbody>
    <tr>
      <th>
        <p>Категория</p>
      </th>
      <th>
        <p>Описание</p>
      </th>
      <th>
        <p><strong>Используется для...</strong></p>
      </th>
      <th>
        <p>Модули</p>
      </th>
    </tr>
    <tr>
      <td>
        <p>Модели</p>
      </td>
      <td>
        <p>Модель и API сервер</p>
      </td>
      <td>
        <p>Быстрого и динамического прототипирование модели и ее использование в API не заботясь о реализации.</p>
      </td>
      <td>loopback</td>
    </tr>
    <tr>
      <td>
        <p>Абстракция</p>
      </td>
      <td>
        <p>Модель абстракции данных физической реализации</p>
      </td>
      <td>
        <p>Подключения к нескольким источникам данных или сервисов и получения обратно абстрагируемой модели с возможностями CRUD независимо от того, как физически хранятся данные.</p>
      </td>
      <td>
        <div style="width: 200px;">
          <p><span>loopback-datasource-juggler</span></p>
        </div>
      </td>
    </tr>
    <tr>
      <td>Инициализация</td>
      <td>Инициализация приложения</td>
      <td>
        <p>Настройки источников данных, собственных моделей, настройка моделей и их назначение источникам данных; Настройки параметров приложения и запуска пользовательского сценария загрузки.</p>
        <p>&nbsp;</p>
      </td>
      <td>loopback-boot</td>
    </tr>
    <tr>
      <td>Последовательность</td>
      <td>Промежуточный продукт</td>
      <td>
        <p>Настройки промежуточного продукта, для его исполнения в различные этапы процесса создания приложения.</p>
      </td>
      <td>loopback-phase</td>
    </tr>
    <tr>
      <td>
        <p>Данные</p>
      </td>
      <td>
        <p>РСУБД и NoSQL физическая модель данных</p>
      </td>
      <td>
        <p>Подключения РСУБД и <span>noSQL источникам данных и возвращению абстрактной модели.</span></p>
      </td>
      <td>
        <p>loopback-connector-mongodb</p>
        <p><span>loopback-connector-mysql</span></p>
        <p><span><span>loopback-connector-postgresql</span></span>
        </p>
        <p><span><span><span>loopback-connector-msssql</span></span>
          </span>
        </p>
        <p><span><span><span><span>loopback-connector-oracle</span></span>
          </span>
          </span>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Интеграция</p>
      </td>
      <td>
        <p>Универсальная система интеграции</p>
      </td>
      <td>
        <p>В существующие системы, которые предоставляют API, посредством общего проекта и веб-интерфейсов</p>
      </td>
      <td>
        <p><span>loopback-connector-rest</span></p>
        <p><span><span>loopback-connector-soap</span></span>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Сервисы</p>
      </td>
      <td>
        <p>Предустановленные сервисы</p>
      </td>
      <td>
        <p>Интеграции с предустановленными сервисами для общего пользования, которые будут применяться с <span style="line-height: 1.4285715;">LoopBack приложением упакованные в компоненты.</span></p>
      </td>
      <td>
        <p>loopback-component-push</p>
        <p><span>loopback-component-storage</span></p>
        <p><span>loopback-component-passport</span></p>
        <p><span><span>loopback-component-sync<br>(в разработке)</span></span>
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Вход</p>
      </td>
      <td>
        <p>Вход API</p>
      </td>
      <td>
        <p>Обеспечения защиты вашего API и придание качества аспектам обслуживания с вызовом и откликом потока операций.</p>
      </td>
      <td>
        <p>loopback-gateway</p>
        <p>loopback-component-oauth2</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Клиенты</p>
      </td>
      <td>
        <p>Клиент SDKs</p>
      </td>
      <td>
        <p>Разработки клиентского приложения с использованием встроенных объектов платформы (IOS, Android, AngularJS), которые взаимодействуют с <span>LoopBack</span> API, с помощью REST.</p>
      </td>
      <td>
        <p>loopback-sdk-ios</p>
        <p>loopback-sdk-android</p>
        <p>loopback-sdk-angular</p>
      </td>
    </tr>
  </tbody>
</table>
