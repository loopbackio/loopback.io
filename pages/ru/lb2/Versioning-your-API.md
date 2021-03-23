---
title: "Версионность вашего API"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Versioning-your-API.html
summary:
---

Вы можете легко добавить версионность вашему REST API, используя главный package.json файл.

Добавьте файл с именем  config.local.js в каталоге приложения /server  с следующим кодом:

**/server/config.local.js**

```js
var p = require('../package.json');
var version = p.version.split('.').shift();
module.exports = {
  restApiRoot: '/api' + (version > 0 ? '/v' + version : ''),
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
};
```

Это позволяет взять номер версии с свойства version в package.json и встраивает его в корень REST API. Если версия вашего приложения 0, то корень api  будет стандартным /api.

Для пример если версия в package.json  2.0.1, то при построени

`GET http://localhost:3000/api/Users`

на:

`GET http://localhost:3000/api/v2/Users`

{% include important.html content="

Changing the API root in this way doesn't affect routes set in [request-handling middleware](Defining-middleware.html#Definingmiddleware-Dynamicrequest-handlingmiddleware) or the route to [API Explorer](-API-Explorer.html) itself, which remains `http://localhost:3000/explorer`.

" %}
```shell
ed.git
$ cd loopback-getting-started
$ git checkout step2
$ npm install
```

## Добавление удаленного метода (remote method)

Выполните следующие действия:

1.  Откройте каталог приложения `/common/models`.  Вы увидите что там лежит `coffee-shop.js` файл.  

    {% include note.html content="

    LoopBack [генератор модели](Model-generator.html) (`slc loopback:model`) всегда создает два файла в `/common/models` для каждой модели: JSON файл с именем вида `<_model-name_>.json` с описанием свойств модели и JavaScript файл вида `<_model-name_>.js` где вы можите расширить и переопределить поведение модели.

    " %}
2.  Откройте `coffee-shop.js` в вашем любимом редакторе.  По умолчанию он содержит пустую функцию: 

    ```js
    module.exports = function(CoffeeShop) {};
    ```

3.  Добавьте следующий код в эту функцию для расширения поведения модели  с удаленным методом (remote method), как в данном примере:

    ```js
    module.exports = function(CoffeeShop) {
      CoffeeShop.status = function(cb) {
        var currentDate = new Date();
        var currentHour = currentDate.getHours();
        var OPEN_HOUR = 6;
        var CLOSE_HOUR = 20;
        console.log('Current hour is ' + currentHour);
        var response;
        if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
          response = 'We are open for business.';
        } else {
          response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
        }
        cb(null, response);
      };
      CoffeeShop.remoteMethod(
        'status', {
          http: {
            path: '/status',
            verb: 'get'
          },
          returns: {
            arg: 'status',
            type: 'string'
          }
        }
      );
    };
    ```

    Тут приведен просто удаленный метод "status" который не принимает никаких аргументов, и сверяет время и возвращает в JSON  сообщение, которое говорит "Open for business" или "Sorry we are closed" в зависимости от текущего времени.

    Конечно, на практике вы можете сделать гораздо более интересные и сложные вещи используя удаленные методы (remote method), таких как манипуляции  c введенными данными, перед сохранением их в базу данных. Вы можите изменить путь где вы вызываете удаленный метод (remote method), и определять сложные аргументы и возвращаемые значения.  См. [Удаленные методы (remote methods)](Remote-methods.html) для получения более подробной информации.

4.  Сохраните файл.

## Попробуйте удаленный метод (remote method)

1.  Вернитесь в корневой каталог приложения и запустить его:

    `$ slc run`

2.  Перейдите по адресу [http://localhost:3000/explorer](http://localhost:3000/explorer) для просмотра API Explorer.  Затем кликнете на  CoffeeShops и вы увидите новый REST endpoint, `GET/CoffeeShop/status` который вызывает удаленный метод (remote method).
    {% include image.html file="5570910.png" alt="" %} 

3.  Кликните **Try it Out!**
    Вы увидите результат вызова удаленного метода (remote method) :
    ```js
    {
      "status": "Open for business."
    }
    ```

Вот как легко обавлть удаленные методы с  LoopBack! 

Для получения более подробной информации, см.  [Удаленные методы](Remote-methods.html).

Next: В [Добавление статической страницы](-.html), вы добавите Express промежуточное ПО для обслуживания статиеского контента такого, ак HTML/CSS, картинки, и JavaScript.ткрыть Person модель через REST:

`[?] Expose CoffeeShop via the REST API? (Y/n) Y`

LoopBack автоматически создаст REST путь связи с вашей моделью используя _множественное число_ имени модели. По умолчанию это _множественное число_ имени будет создано путем добавления окончания "s", но вы можите использовать другую форму множественного числа, если захотите. См [Использование модели через REST](-REST.html) для получения более подробной информации.  

Нажмите **Enter** для согласия с предложенным _множественным числом_ по умолчанию (CoffeeShops):

`[?] Custom plural form (used to build REST URL): `

Каждая модель имеит свойства. Прямо сейчас вы пытаетесь  одно из свойств - "name", для модели CoffeeShop.  

Выберите **`string`** в качестве типа свойства (нажмите **Enter**, так как **строка** это тип по умолчанию):

```
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

`[?] Required? (y/N)`

В конце процесса создания модели нажмите **Enter** когда появится вопрос о имени следующего свойства.

## Проверка структуры проекта

{% include important.html content="

Ниже описана структура приложения, которая создается с помощью [`slc loopback`](https://docs.strongloop.com/pages/viewpage.action?pageId=5310655) команд. LoopBack не требует, чтоб вы следовали данной структуры, но если вы этого не сделаете, вы не сможете использовать [`slc loopback`](https://docs.strongloop.com/pages/viewpage.action?pageId=5310655) команды для изменения и расширения вашего приложения.

" %}

Файлы и папки проекта LoopBack находятся в _корневой папке приложения_.  В этом каталоге стандартная структура LoopBack проекта состоит из трех подпапок:

*   `server` - Node приложение, скрипты и файлы конфигурации.
*   `client` - клиентские JavaScript, HTML, и CSS файлы.
*   `common` - Общие файлы для сервера и клиента. Подкаталог `/models` содержит все JSON и JavaScript файлы моделей.

{% include note.html content="

Все ваши JSON и JavaScript файлы модели находятся в `/common/models` папке.

" %}

<table>
  <tbody>
    <tr>
      <th>Файлы или папки</th>
      <th>Описание</th>
      <th>Как получить доступ в коде</th>
    </tr>
    <tr>
      <th colspan="3">Каталог верхнего уровня</th>
    </tr>
    <tr>
      <td><a href="https://docs.strongloop.com/display/RU/package.json">package.json</a></td>
      <td>
        <p>Стандартные спецификации npm пакетов. См. <a href="https://docs.strongloop.com/display/RU/package.json">package.json</a></p>
      </td>
      <td>N/A</td>
    </tr>
    <tr>
      <th colspan="3"><span>/server папка- файлы </span>Node приложения<span>&nbsp;</span></th>
    </tr>
    <tr>
      <td><code><a href="https://docs.strongloop.com/display/RU/server.js">server.js</a></code></td>
      <td>Основной файл приложения (сам сервер).</td>
      <td>&nbsp;N/A</td>
    </tr>
    <tr>
      <td><code><a href="https://docs.strongloop.com/display/RU/config.json">config.json</a></code></td>
      <td>Настройки приложения. См. <a href="https://docs.strongloop.com/display/RU/config.json">config.json</a>.</td>
      <td><code>app.get('option-name')</code></td>
    </tr>
    <tr>
      <td><code><a href="https://docs.strongloop.com/display/RU/datasources.json">datasources.json</a></code>&nbsp;</td>
      <td>Файл конфигурации источников данных. См. <a href="https://docs.strongloop.com/display/RU/datasources.json">datasources.json</a>.</td>
      <td><code>app.datasources['datasource-name']</code></td>
    </tr>
    <tr>
      <td><code><a href="https://docs.strongloop.com/display/RU/model-config.json">model-config.json</a></code></td>
      <td>Файл конфигурации модели. См. <a href="https://docs.strongloop.com/display/RU/model-config.json">model-config.json</a>.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code><a href="https://docs.strongloop.com/display/RU/middleware.json">middleware.json</a></code></td>
      <td>Middleware definition file.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code>/boot</code> папка</td>
      <td>Дополнительные скрипты для выполнения инициализации и настройки. См. <a href="https://docs.strongloop.com/display/RU/Defining+boot+scripts">boot scripts</a>.</td>
      <td>Сценарии выполняются автоматически в алфавитном порядке.</td>
    </tr>
    <tr>
      <th colspan="3"><strong><strong>/client папка- </strong>клиентские файлы приложения</strong>
      </th>
    </tr>
    <tr>
      <td>README.md</td>
      <td>LoopBack генераторы создают пустые README в markdown формате.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>Другие</td>
      <td>Ваши дополнительные HTML, CSS, клиентские JavaScript файлы.</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th colspan="3"><span>/common папка - общие файлы приложения</span></th>
    </tr>
    <tr>
      <td><code>/models</code> папка</td>
      <td>
        <p>Пользовательские файлы модели:</p>
        <ul>
          <li>Определения модели по конвенции имени <code><em>modelName</em>.json</code>; например <code>customer.json</code>.</li>
          <li>Пользовательские скрипты одели по конвенции имени <code><em>modelName</em>.js</code>; например <code>customer.js</code>.</li>
        </ul>
        <p>См. <a href="https://docs.strongloop.com/display/RU/Model+definition+JSON+file">Model definition JSON file</a>.</p>
      </td>
      <td>
        <p>Node:<br><code>myModel = app.models.myModelName</code></p>
      </td>
    </tr>
  </tbody>
</table>

Кроме того каталоги верхнего уровня содержат заглушку `README.md` файл, и `node_modules` папку (требующихся для Node модулей ).

Для более подробной информации о канонической структуре LoopBack приложения, см [Справка по проектированию проекта](Project-layout-reference.html).

## Запуск приложения

Запустите приложения с помощью команды `slc run`:

```
$ slc run
INFO strong-agent API key not found, StrongOps dashboard reporting disabled.
Generate configuration with:
    npm install -g strongloop
    slc strongops
See http://docs.strongloop.com/strong-agent for more information.
supervisor running without clustering (unsupervised)
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/
```

{% include note.html content="

Запуск приложения с помощью `slc` (StrongLoop Controller) происходит также как при использовании `node` команд, но `slc` предоставляет возможность кластеризации, логирования , мониторинга и других опций. См [Работа Node приложений](https://docs.strongloop.com/display/SLC/Operating+Node+applications) and [Начало работы](-LoopBack.html) для получения более детальной информации о возможносятх `slc` консоли.

" %}

Если вы хотите запустить сервер в [многопроцессовом кластере](https://docs.strongloop.com/display/SLC/Scaling), используйте следующую команду: 

`$ slc run --cluster cpus`

Откройте в браузере [http://0.0.0.0:3000/](http://0.0.0.0:3000/) (на некоторых системах возможно придется использовать такой адрес  [http://localhost:3000](http://localhost:3000/)).  Вы уведите  стандартную страницу ответа приложения, которая будет отображать JSON с информацией о состоянии приложения; для примера:

`{"started":"2014-11-20T21:59:47.155Z","uptime":42.054}`

А теперь откройте в вашем браузере [http://0.0.0.0:3000/explorer](http://0.0.0.0:3000/explorer) или [http://localhost:3000/explorer](http://localhost:3000/explorer).  Вы увидите StrongLoop API Explorer:

{% include image.html file="5570894.png" alt="" %}

Путем простых шагов, используя  LoopBack, вы создали CoffeeShop модель, определили ее свойства а затем вывели ее через  REST. 

Next: [Используя API Explorer](-API-Explorer.html), вы можете рассмотреть REST API модель, которую вы только что создали более подробно и осуществить другие операции.
