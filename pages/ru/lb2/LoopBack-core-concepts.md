---
title: "Основные понятия LoopBack"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/LoopBack-core-concepts.html
summary:
---
## Модели

Модели являются основой LoopBack, и представляют собой серверные источники данных, такие как базы данных или других back end сервисов (REST, SOAP, и так далее). Модели LoopBack являются JavaScript объектами, которые объединяют  Node и REST APIs.

****Ключевая  значительная** особенность LoopBack заключается в том, что когда вы определяете модель, она автоматически сопоставляется с предопределенным REST API с полным набором **CRUD операций:**  создание, чтение, обновление, и удаление.**

[Базовая модель объекта](https://docs.strongloop.com/display/RU/Basic+model+object) имеет методы для добавления [привязки](http://docs.strongloop.com/display/LB/Model+hooks) и для [валидации данных](https://docs.strongloop.com/display/RU/Validating+model+data). Другая модель объектов - все "наследовать от" него. Модели имеют иерархию наследования, как показано на рисунке справа: при подключении модели к постоянному источнику данных она становится [подключенной моделью](https://docs.strongloop.com/display/RU/Connected+model+class) с CRUD операциями; Встроенные модели наследуются от  базовых моделей LoopBack .

### <span style="line-height: 1.5;">Встроенные модели</span>

Каждый LoopBack приложение имеет набор предопределенных [встроенных моделей](http://docs.strongloop.com/display/LB/Using+built-in+models), таких как пользователь, роль и приложение, поэтому вам не придется создавать эти общие модели с нуля.

### Пользовательские  модели

Вы можете [определить свои собственные модели](http://docs.strongloop.com/display/LB/Creating+models) специфичные для вашего приложения. You can make your custom models [extend built-in models](http://docs.strongloop.com/display/LB/Extending+built-in+models) to build on the predefined functionality of [User](https://docs.strongloop.com/display/RU/User), [Application](https://docs.strongloop.com/display/RU/Application), and other built-in models.  

### Модель отношений

Вы можете выразить [отношения между моделями](https://docs.strongloop.com/display/RU/Creating+model+relations), такими как [BelongsTo](https://docs.strongloop.com/display/RU/BelongsTo+relations), [HasMany](https://docs.strongloop.com/display/RU/HasMany+relations) и [HasAndBelongsToMany](https://docs.strongloop.com/display/RU/HasAndBelongsToMany+relations).

### Модели CRUD операций

При подключении модели к постоянному источнику данных, например к базе данных, он становится [подключенной моделью](https://docs.strongloop.com/display/RU/Connected+model+class)  с полным набором CRUD операций - создание, чтение, обновление и удаление, из класса [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel):

<div class="table-wrap">

| Операция | REST | LoopBack метод модели
(Node API)* | <span>Соответствующая SQL
операция</span> |
| Создание |

[PUT /_modelName_](https://docs.strongloop.com/display/RU/PersistedModel+REST+API#PersistedModelRESTAPI-Createmodelinstance)

[POST /_modelName_](https://docs.strongloop.com/display/RU/PersistedModel+REST+API#PersistedModelRESTAPI-Update/insertinstance)

 | `[create()](http://apidocs.strongloop.com/loopback/#persistedmodel-create)<sup>*</sup>` | INSERT |
| Чтение (извлечение) | [GET /modelName?filter=...](https://docs.strongloop.com/display/RU/PersistedModel+REST+API#PersistedModelRESTAPI-Findmatchinginstances) | `[find()](http://apidocs.strongloop.com/loopback/#persistedmodel-find)<sup><span>*</span></sup>` | SELECT |
| Обновление (модификация) |

[POST /_modelName_](https://docs.strongloop.com/display/RU/PersistedModel+REST+API#PersistedModelRESTAPI-Update/insertinstance) 

[PUT /modelName](https://docs.strongloop.com/display/RU/PersistedModel+REST+API#PersistedModelRESTAPI-Updatemodelinstanceattributes)

 | `[updateAll()](http://apidocs.strongloop.com/loopback/#persistedmodel-updateall)<sup><span>*</span></sup>` | UPDATE |
| Удаление (разрушение) | [DELETE /_modelName_/_modelID_](https://docs.strongloop.com/display/RU/PersistedModel+REST+API#PersistedModelRESTAPI-Deletemodelinstance) | `[destroyAll()](http://apidocs.strongloop.com/loopback/#persistedmodel-destroyall)<sup><span>*</span></sup>` | DELETE |

</div>

* Перечисленные методы являются лишь наглядными примерами; другие методы могут предоставить аналогичную функциональность; Например, в дополнение к <span>find()</span>, есть также findById (), findOne (), и findOrCreate ()

## Логика приложения

Вы можете добавить пользовательскую логику приложения несколькими способами. Вы можете:

*   [Добавить логику приложения для моделей](https://docs.strongloop.com/display/RU/Adding+logic+to+models) с помощью [дистанционных методов](https://docs.strongloop.com/display/RU/Remote+methods) (пользовательские [REST endpoints),  ](https://www.google.com/search?es_sm=93&q=%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B5&spell=1&sa=X&ei=-IrKVI6DO4PXyQOjrIDQDg&ved=0CBoQvwUoAA)[дистанционных привязок](https://docs.strongloop.com/display/RU/Remote+hooks)[, которые срабатывают по remote методам, и ](https://www.google.com/search?es_sm=93&q=%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B5&spell=1&sa=X&ei=-IrKVI6DO4PXyQOjrIDQDg&ved=0CBoQvwUoAA)[model hooks](https://docs.strongloop.com/display/RU/Model+hooks)[ которая срабатывает по модели CRUD методов.](https://www.google.com/search?es_sm=93&q=%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B5&spell=1&sa=X&ei=-IrKVI6DO4PXyQOjrIDQDg&ved=0CBoQvwUoAA)
*   Добавить загрузочные скрипты, которые будут запускаться при запуске приложения.
*   Define custom [middleware](https://docs.strongloop.com/display/RU/Defining+middleware), similar to Express middleware.

You can add code to [Validate data](https://docs.strongloop.com/display/RU/Validating+model+data) before saving it to the model and back-end data store.

### Фаза промежуточных функций

_Промежуточные функции_ относится к функциям, которые выполняются, когда HTTP запрос делается на REST endpoints. Поскольку LoopBack основан на [Express](http://expressjs.com/), LoopBack промежуточные функции такие же как [Express промежуточные функции](http://expressjs.com/api.html#middleware).  Тем не менее, в LoopBack добавляется  понятие _фазы_, чтобы четко определить порядок в котором вызываться эти функции. Использование фаз, помогает избежать вопросов упорядочения, которые могут возникнуть со стандартными  Express промежуточными функциями.

См.  [Определение промежуточных функций](https://docs.strongloop.com/display/RU/Defining+middleware) для получение подробной информации.

## Источники данных и коннекторы

<div style="float: right; border: 1px solid #eee; padding: 5px; margin: 10px;">![](attachments/5310703/6258842.png)</div>

LoopBack обобщает backend сервисы такие как базы данных,  REST APIs, SOAP веб сервисы и сервисы хранения данных, как источники данных.

Источники данных обращаются к коннекторам, которые в свою очередь взаимодействуют с базами данных или другими back-end сервисами. Приложения не используют коннекторы напрямую, а взаимодействуют с источниками данных  используя  [DataSource](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-new-datasourcename-settings) и [PersistedModel](http://apidocs.strongloop.com/loopback/#persistedmodel) APIs.

## LoopBack компоненты

LoopBack компоненты обеспечивают  дополнительную "plug-in" функциональность:

*   [Push уведомления](http://docs.strongloop.com/display/LB/Push+notifications) -  обеспечивают передачу информации на мобильные приложения для мгновенного их отображения в виде <span style="color: rgb(17,17,17);"><span style="color: rgb(17,17,17);"> "значка," оповещения, или всплывающего сообщения на мобильном устройстве.</span></span>
*   [Сервис хранения](http://docs.strongloop.com/display/LB/Storage+service) - позволяет загружать и скачивать файлы с помощью облачных систем хранения данных (Amazon, Rackspace, OpenStack и Azure), а так же файловой системы сервера.
*   [Login от сторонних производителей](http://docs.strongloop.com/display/LB/Third-party+login) - интегрирует [Passport](http://passportjs.org/) и позволяет пользователям входить (и связывать аккаунты) используя учетные данные сторонних производителей: Facebook, Google, Twitter, Github, или любой системы которая поддерживает OAuth, OAuth 2, или OpenID.
*   [Синхронизация](http://docs.strongloop.com/display/LB/Synchronization)  - позволяет обильному приложению работать в автономном режиме и затем синхронизировать все данные с сервером, когда оно снова присоединится к сети.
*   [OAuth 2.0](http://docs.strongloop.com/display/LB/OAuth+2.0) - позволяет Loopback приложениям действовать как OAuth 2.0 провайдеры, для аутентификации и авторизации клиентских приложений и пользователей, через защищенные  API endpoints.

## Средства разработки

LoopBack предоставляет два основных инструмента разработки приложений:

*   `[slc loopback](https://docs.strongloop.com/pages/viewpage.action?pageId=5310655) -`инструмент командной строки для создания и изменения Loopback приложений.
*   [StrongLoop Arc](https://docs.strongloop.com/display/ARC/StrongLoop+Arc) - графический инструмент для разработки, развертывания и мониторинга Loopback приложений.

Инструмент командной строки `slc loopback`  проведет вас через весь процесс разработки приложений с помощью интерактивных подсказок:

1.  Начните с [генератора приложений](https://docs.strongloop.com/display/RU/Application+generator) для создания и генерации базовой структуры приложения: **`slc loopback`**.
2.  Добавьте модели (и свойства модели) используя [генератор моделей](https://docs.strongloop.com/display/RU/Model+generator): **`slc loopback:model`**.  
    Если вам нужно добавить свойства к существующим моделям, используйте  [генератор свойств](https://docs.strongloop.com/display/RU/Property+generator), **`slc loopback:property`**. 
3.  Добавьте источники данных используя [генератор источников данных](https://docs.strongloop.com/display/RU/Data+source+generator), **`slc loopback:datasource`**.
4.  Добавьте связи между моделями с помощью  [генератора связей](https://docs.strongloop.com/display/RU/Relation+generator), **`slc loopback:relation`**.
