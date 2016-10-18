---
title: "Project layout reference"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Project-layout-reference.html
summary:
---

{% include important.html content="

Ниже описана структура приложения, которая создается с помощью [`slc loopback`](Command-line-reference-slc-loopback-.html) команд. LoopBack не требует, чтоб вы следовали данной структуры, но если вы этого не сделаете, вы не сможете использовать [`slc loopback`](Command-line-reference-slc-loopback-.html) команды для изменения и расширения вашего приложения.

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
      <td><a href="package.json.html">package.json</a></td>
      <td>
        <p>Стандартные спецификации npm пакетов. См. <a href="package.json.html">package.json</a></p>
      </td>
      <td>N/A</td>
    </tr>
    <tr>
      <th colspan="3"><span>/server папка- файлы </span>Node приложения<span>&nbsp;</span></th>
    </tr>
    <tr>
      <td><code><a href="server.js.html">server.js</a></code></td>
      <td>Основной файл приложения (сам сервер).</td>
      <td>&nbsp;N/A</td>
    </tr>
    <tr>
      <td><code><a href="config.json.html">config.json</a></code></td>
      <td>Настройки приложения. См. <a href="config.json.html">config.json</a>.</td>
      <td><code>app.get('option-name')</code></td>
    </tr>
    <tr>
      <td><code><a href="datasources.json.html">datasources.json</a></code>&nbsp;</td>
      <td>Файл конфигурации источников данных. См. <a href="datasources.json.html">datasources.json</a>.</td>
      <td><code>app.datasources['datasource-name']</code></td>
    </tr>
    <tr>
      <td><code><a href="model-config.json.html">model-config.json</a></code></td>
      <td>Файл конфигурации модели. См. <a href="model-config.json.html">model-config.json</a>.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code><a href="middleware.json.html">middleware.json</a></code></td>
      <td>Middleware definition file.</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><code>/boot</code> папка</td>
      <td>Дополнительные скрипты для выполнения инициализации и настройки. См. <a href="Defining-boot-scripts.html">boot scripts</a>.</td>
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
        <p>См. <a href="Model-definition-JSON-file.html">Model definition JSON file</a>.</p>
      </td>
      <td>
        <p>Node:<br><code>myModel = app.models.myModelName</code></p>
      </td>
    </tr>
  </tbody>
</table>

Кроме того каталоги верхнего уровня содержат заглушку `README.md` файл, и `node_modules` папку (требующихся для Node модулей ).