---
title: "Создание простого API"
lang: ru
layout: translation
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Create-a-simple-API.html
summary: Use the application generator tool to quickly create a LoopBack application, models, and data sources.
---

{% include content/gs-prereqs.html two="false" lang=page.lang %}

Используйте [LoopBack консоль](5310592.html), `slc loopback`, для создания и _скаффолдинга_ приложений.  Скаффолдинг попросту означает генерацию основного кода вашего приложения, что позволяет вам сохранить ваше время. Вы можите дополнить код и модифицировать его под вши нужды.

## Создание нового приложения 

Чтоб создать новое приложение, запустите LoopBack [генератор приложений](Application-generator_5310661.html):

LoopBack генератор поприветствует вас дружественным  ASCII артом, и  попросит ввести имя приложения.

Введите `loopback-getting-started`. На следующем шаге генератор попросит ввести имя каталога в котором будет хранится ваше приложение;  нажмите Enter чтоб принять значение по умолчанию (такое же, как имя вашего приложения):

```shell
     _-----_
    |       |    .--------------------------.
    |--(o)--|    |  Let's create a LoopBack |
   `---------´   |       application!       |
    ( _´U`_ )    '--------------------------'
    /___A___\
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
[?] What's the name of your application? loopback-getting-started
[?] Enter name of the directory to contain the project: loopback-getting-started</pre>
```

Вы можите использовать другое имя для вашего приложения, но если вы это сделаете, то убедитесь, что используете его везде, где в данном учебнике используется "loopback-getting-started".

Генератор создаст основу приложения, включая:

1.  Инициализация [каталоговой структуры проекта](Project-layout-reference.html).
2.  Создание стандартных JSON файлов.
3.  Создание стандартных JavaScript файлов.
4.  Загрузку и установку нужных Node модулей (как если бы вы сделали вручную их `установку в <span>npm`).

После окончания операции, генератор предложит вам следующие шаги:

```
Next steps:
  Change directory to your app
    $ cd loopback-getting-started
  Create a model in your app
    $ slc loopback:model
  Optional: Enable StrongOps monitoring
    $ slc strongops
  Run the app
    $ slc run .
```

## Создание моделей

Теперь, когда вы создали каркас проекта, создайте  _CoffeeShop_  модель, которая автоматически будет иметь REST API endpoints.

Зайдите в  новосозданный каталог приложения, затем запустите LoopBack [генератор модели](Model-generator.html):

```shell
$ cd loopback-getting-started
$ slc loopback:model
```

Генератор спросит у вас имя модели. Введите **CoffeeShop**:

```shell
[?] Enter the model name: CoffeeShop
```

Далее вас спросят, не  хотели бы вы прикрепить модель к хранилищам данных, которые уже определенны.

В этот момент у вас доступны только хранилища данных, используемые по умолчанию. Нажмите **Enter** для их выбора:

```shell
...
[?] Select the data-source to attach CoffeeShop to: (Use arrow keys)
❯ db (memory)</pre>
```

Генератор попросит вас ввести базовый класс для использования в модели. Так как, в конечном итоге вы подключите эту модель к постоянному хранилищу данных в базе данных, то нажмите стрелку вниз и выберите **PersistedModel**, затем нажмите** Enter**:

```shell
[?] Select model's base class: (Use arrow keys)
  Model
❯ PersistedModel
  ACL
  AccessToken
  Application
  Change
  Checkpoint </pre>
```

[PersistedModel ](http://apidocs.strongloop.com/loopback/#persistedmodel) является базовым объектом для всех моделей, подключенных к постоянным хранилищам данных, таким как базы данных. См. [Основные понятия LoopBack](5310703.html) для краткого обзора иерархии наследования модели.

Одним из сильнейших преимуществ  LoopBack являться то, что он автоматически генерирует  REST API для вашей модели.  Генератор спросит вас, стоит ли делать данный REST API открытым.

Нажмите **Enter** снова, для принятия значения по умолчанию, и открыть Person модель через REST:

```shell
[?] Expose CoffeeShop via the REST API? (Y/n) Y
```

LoopBack автоматически создаст REST путь связи с вашей моделью используя _множественное число_ имени модели. По умолчанию это _множественное число_ имени будет создано путем добавления окончания "s", но вы можите использовать другую форму множественного числа, если захотите. См [Использование модели через REST](5310515.html) для получения более подробной информации.  

Нажмите **Enter** для согласия с предложенным _множественным числом_ по умолчанию (CoffeeShops):

```shell
[?] Custom plural form (used to build REST URL): </pre>
```

Каждая модель имеит свойства. Прямо сейчас вы пытаетесь  одно из свойств - "name", для модели CoffeeShop.  

Выберите **`string`** в качестве типа свойства (нажмите **Enter**, так как **строка** это тип по умолчанию):

```shell
Let's add some CoffeeShop properties now.
Enter an empty property name when done.
[?] Property name: name
   invoke   loopback:property
[?] Property type: (Use arrow keys)
❯ string
  number
  boolean
  object
  array
  date
  buffer
  geopoint
  (other)
```

Каждое свойство может быть обязательным или не обязательным. Нажмите **`y`** чтоб сделать `name` обязательным свойством:

```shell[
?] Required? (y/N)
```

В конце процесса создания модели нажмите **Enter** когда появится вопрос о имени следующего свойства.

## Проверка структуры проекта

{% include warning.html content="
Ниже описана структура приложения, которая создается с помощью `[slc loopback](https://docs.strongloop.com/pages/viewpage.action?pageId=5310655) команд`. LoopBack не требует, чтоб вы следовали данной структуры, но если вы этого не сделаете, вы не сможете использовать `[slc loopback](https://docs.strongloop.com/pages/viewpage.action?pageId=5310655)` команды для изменения и расширения вашего приложения.
"
%}

Файлы и папки проекта LoopBack находятся в _корневой папке приложения_.  В этом каталоге стандартная структура LoopBack проекта состоит из трех подпапок:

*   `server` - Node приложение, скрипты и файлы конфигурации.
*   `client` - клиентские JavaScript, HTML, и CSS файлы.
*   `common` - Общие файлы для сервера и клиента. Подкаталог `/models` содержит все JSON и JavaScript файлы моделей.

Все ваши JSON и JavaScript файлы модели находятся в `/common/models` папке.

<table class="confluenceTable">

<tbody>

<tr>

<th class="confluenceTh">Файлы или папки</th>

<th class="confluenceTh">Описание</th>

<th class="confluenceTh">Как получить доступ в коде</th>

</tr>

<tr>

<th colspan="3" style="text-align: center;" class="confluenceTh">Каталог верхнего уровня</th>

</tr>

<tr>

<td class="confluenceTd">[package.json](package.json.html)</td>

<td class="confluenceTd">

Стандартные спецификации npm пакетов. См. [package.json](package.json.html)

</td>

<td class="confluenceTd">N/A</td>

</tr>

<tr>

<th colspan="3" style="text-align: center;" class="confluenceTh"><span>/server папка- файлы Node приложения</th>

</tr>

<tr>

<td class="confluenceTd">`[server.js](server.js.html)`</td>

<td class="confluenceTd">Основной файл приложения (сам сервер).</td>

<td class="confluenceTd"> N/A</td>

</tr>

<tr>

<td class="confluenceTd">`[config.json](config.json.html)`</td>

<td class="confluenceTd">Настройки приложения. См. [config.json](config.json.html).</td>

<td class="confluenceTd">`app.get('option-name')`</td>

</tr>

<tr>

<td class="confluenceTd">`[datasources.json](datasources.json.html)` </td>

<td class="confluenceTd">Файл конфигурации источников данных. См. [datasources.json](datasources.json.html).</td>

<td class="confluenceTd">`app.datasources['datasource-name']`</td>

</tr>

<tr>

<td class="confluenceTd">`[model-config.json](model-config.json.html)`</td>

<td class="confluenceTd">Файл конфигурации модели. См. [model-config.json](model-config.json.html).</td>

<td class="confluenceTd">N/A</td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">`[middleware.json](middleware.json.html)`</td>

<td colspan="1" class="confluenceTd">Middleware definition file.</td>

<td colspan="1" class="confluenceTd">N/A</td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">`/boot` папка</td>

<td colspan="1" class="confluenceTd">Дополнительные скрипты для выполнения инициализации и настройки. См. [boot scripts](Defining-boot-scripts.html).</td>

<td colspan="1" class="confluenceTd">Сценарии выполняются автоматически в алфавитном порядке.</td>

</tr>

<tr>

<th colspan="3" style="text-align: center;" class="confluenceTh">****/client папка-** клиентские файлы приложения**</th>

</tr>

<tr>

<td colspan="1" class="confluenceTd">README.md</td>

<td colspan="1" class="confluenceTd">LoopBack генераторы создают пустые README в markdown формате.</td>

<td colspan="1" class="confluenceTd">N/A</td>

</tr>

<tr>

<td colspan="1" class="confluenceTd">Другие</td>

<td colspan="1" class="confluenceTd">Ваши дополнительные HTML, CSS, клиентские JavaScript файлы.</td>

</tr>

<tr>

<th colspan="3" style="text-align: center;" class="confluenceTh"><span>/common папка - общие файлы приложения</th>

</tr>

<tr>

<td class="confluenceTd">`/models` папка</td>

<td class="confluenceTd">

Пользовательские файлы модели:

*   Определения модели по конвенции имени `_modelName_.json`; например `customer.json`.
*   Пользовательские скрипты одели по конвенции имени `_modelName_.js`; например `customer.js`.

См. [Model definition JSON file](Model-definition-JSON-file.html).

</td>

<td class="confluenceTd">

Node:  
`myModel = app.models.myModelName`
</td>
</tr>
</tbody>
</table>

Кроме того каталоги верхнего уровня содержат заглушку `README.md` файл, и `node_modules` папку (требующихся для Node модулей ).

Для более подробной информации о канонической структуре LoopBack приложения, см [Справка по проектированию проекта](Project-layout-reference.html).

Запуск приложения с помощью `slc` (StrongLoop Controller) происходит также как при использовании `node` команд, но `slc` предоставляет возможность кластеризации, логирования , мониторинга и других опций. См [Работа Node приложений](https://docs.strongloop.com/display/SLC/Operating+Node+applications) and [Начало работы](5310598.html) для получения более детальной информации о возможносятх `slc` консоли.

Если вы хотите запустить сервер в [многопроцессовом кластере](https://docs.strongloop.com/display/SLC/Scaling), используйте следующую команду: 

```shell$ slc run --cluster cpus
```

Откройте в браузере [http://0.0.0.0:3000/](http://0.0.0.0:3000/) (на некоторых системах возможно придется использовать такой адрес  [http://localhost:3000](http://localhost:3000/)).  Вы уведите  стандартную страницу ответа приложения, которая будет отображать JSON с информацией о состоянии приложения; для примера:

`{"started":"2014-11-20T21:59:47.155Z","uptime":42.054}`

А теперь откройте в вашем браузере [http://0.0.0.0:3000/explorer](http://0.0.0.0:3000/explorer) или [http://localhost:3000/explorer](http://localhost:3000/explorer).  Вы увидите StrongLoop API Explorer.

Путем простых шагов, используя  LoopBack, вы создали CoffeeShop модель, определили ее свойства а затем вывели ее через  REST. 

<div style="font-size: 11pt; border: 1px solid #cccccc; background-color: #EBF5EB; padding: 10px; border-radius: 3px; margin: 10px 50px 10px 50px;">Next: [Используя API Explorer](5310601.html), вы можете рассмотреть REST API модель, которую вы только что создали более подробно и осуществить другие операции.</div>
