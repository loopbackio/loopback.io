---
title: "API обнаружения базы данных"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Database-discovery-API.html
summary:
---

**See also**: Смотри также: [Справочная информация по APIr loopback-datasource-juggler](http://apidocs.strongloop.com/loopback-datasource-juggler/).

## Обзор

LoopBack обеспечивает единное API для обнаружения информации определенной модели из реляционных баз данных. То же самое обнаружение API доступно при использовании любого из этих соединителей:

*   **Oracle**: loopback-connector-oracle
*   **MySQL**: loopback-connector-mysql
*   **PostgreSQL**: loopback-connector-postgresql
*   **SQL Server**: loopback-connector-mssql

### Синхронные методы

Способы, описанные ниже, являются асинхронными. Для Oracle, есть также соответствующие синхронные методы, которые выполняют те же самые вещи и возвращают те же результаты:

*   `discoverModelDefinitionsSync(опции)`
*   `discoverModelPropertiesSync(таблица, опции)`
*   `discoverPrimaryKeysSync(таблица, опции)`
*   `discoverForeignKeysSync(таблица, опции)`
*   `discoverExportedForeignKeysSync(таблица, опции)`

Примечание синхронные методы влияют на производительность

## Методы

{% include important.html content="

В общем, _схема / владелец_ это имя схемы таблицы. Это пространство имен, которое содержит список таблиц. Каждая база данных использует несколько иную терминологию:

*   MySQL: базы данных и схемы идентичны
*   Oracle: схема user/owner.
*   PostgreSQL: база данных содержит одну или более именованных схем, которые, в свою очередь, содержат таблицы. Схема по умолчанию \"public\".
*   MS SQL Server: по умолчанию схема \"dbo\".

" %}

### discoverAndBuildModels

Обнаруживает и строит модель из спецификации Discover и строит модели для  указанной owner/modelName.

```
dataSource.discoverAndBuildModels(_modelName_ [, _options_] [, _cb_])
``` 

Аргументы

<table>
  <tbody>
    <tr>
      <th>Имя</th>
      <th>Тип</th>
      <th>Описание</th>
    </tr>
    <tr>
      <td>modelName</td>
      <td><code>Строка</code></td>
      <td>
        <p>Имя модели</p>
      </td>
    </tr>
    <tr>
      <td>[options]</td>
      <td><code>Объект</code></td>
      <td>
        <p>Опции; см. ниже.</p>
      </td>
    </tr>
    <tr>
      <td>[cb]</td>
      <td><code>Функция</code></td>
      <td>
        <p>Функция обратного вызова</p>
      </td>
    </tr>
  </tbody>
</table>

Опции

<table>
  <tbody>
    <tr>
      <th><span style="color: rgb(26,85,51);">Имя</span></th>
      <th><span style="color: rgb(26,85,51);">Тип</span></th>
      <th><span style="color: rgb(26,85,51);">Описание</span></th>
    </tr>
    <tr>
      <td>owner / schema</td>
      <td><span style="font-family: monospace;">Строка</span></td>
      <td>
        <p>Владелец базы данных или имя схемы.</p>
      </td>
    </tr>
    <tr>
      <td>relations</td>
      <td>Булевое значение</td>
      <td>
        <p>Правда если введутся отношения (первичный ключ/внешний ключ); <span>ложь в противном случае.</span></p>
      </td>
    </tr>
    <tr>
      <td>all</td>
      <td><span>Булевое</span><span> значение</span></td>
      <td>
        <p>Правда, если все владельцы включены; ложь в противном случае.</p>
      </td>
    </tr>
    <tr>
      <td>views</td>
      <td><span>Булевое</span><span> значение</span></td>
      <td>
        <p>Правда, если <span>представление</span> включено; ложь в противном случае.</p>
      </td>
    </tr>
  </tbody>
</table>

### discoverModelDefinitions

Вызов `discoverModelDefinitions()` чтобы обнаружить определения модели (имена таблиц или коллекции), на основе таблиц или коллекций в источнике данных. Этот метод возвращает список имен таблиц / представлений.

`discoverModelDefinitions(_options_, _cb_)`

#### Параметры

<table>
  <tbody>
    <tr>
      <td>options</td>
      <td>Объект со свойствами, описанными ниже.</td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Получить список имен таблица / <span>представление</span>; смотрите пример ниже.</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner">Параметр</div>
      </th>
      <th>
        <div class="tablesorter-header-inner"><span style="color: rgb(26,85,51);">Описание</span></div>
      </th>
    </tr>
  </thead>
</table>

#### Опции

<table>
  <tbody>
    <tr>
      <th><span style="color: rgb(26,85,51);">Свойство</span></th>
      <th><span style="color: rgb(26,85,51);">Тип</span></th>
      <th><span style="color: rgb(26,85,51);">Описание</span></th>
    </tr>
    <tr>
      <td>all</td>
      <td><span>Булевое значение</span></td>
      <td>Если это правда, включит таблицы / <span>представления</span> для всех схем / владельцев</td>
    </tr>
    <tr>
      <td>owner/schema</td>
      <td>Строка</td>
      <td>Имя схема/владелец</td>
    </tr>
    <tr>
      <td>views</td>
      <td><span>Булевое значение</span></td>
      <td>Если правда включит <span>представление</span></td>
    </tr>
  </tbody>
</table>

Пример обратного вызова возвращаемого значения функции:

```
{type: 'table', name: 'INVENTORY', owner: 'STRONGLOOP' }
{type: 'table', name: 'LOCATION', owner: 'STRONGLOOP' }
{type: 'view', name: 'INVENTORY_VIEW', owner: 'STRONGLOOP' }
```

**Пример**

Например:

```js
datasource.discoverModelDefinitions(function(err, models) {
  models.forEach(function(def) {
    // def.name ~ the model name
    datasource.discoverSchema(null, def.name, function(err, schema) {
      console.log(schema);
    });
  });
});
```

### discoverModelProperties

Вызовите discoverModelProperties (), чтобы открыть метаданные в столбцах (свойства) из таблицы базы данных. Этот метод возвращает информацию столбца для данной таблицы / представления.

`discoverModelProperties(_table_, _options_, _cb_)`

<table>
  <tbody>
    <tr>
      <td>table</td>
      <td>Имя таблицы или вида</td>
    </tr>
    <tr>
      <td>options</td>
      <td>Опциональный объект который может иметь только "владелец/схема" свойство для указания владельца или имени схемы</td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Обратный вызов функции возвращает список свойств модели; смотрите пример ниже.</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner"><span style="color: rgb(26,85,51);">Параметр</span></div>
      </th>
      <th>
        <div class="tablesorter-header-inner"><span style="color: rgb(26,85,51);">Описание</span></div>
      </th>
    </tr>
  </thead>
</table>

Пример возвращаемого значения функции обратного вызова:

```
{ owner: 'STRONGLOOP',
        tableName: 'PRODUCT',
        columnName: 'ID',
        dataType: 'VARCHAR2',
        dataLength: 20,
        nullable: 'N',
        type: 'String' }
      { owner: 'STRONGLOOP',
        tableName: 'PRODUCT',
        columnName: 'NAME',
        dataType: 'VARCHAR2',
        dataLength: 64,
        nullable: 'Y',
        type: 'String' }
```

### discoverPrimaryKeys

Вызовите `discoverPrimaryKeys() `чтобы обнаружить первичные ключевые определения в базе данных.

`discoverPrimaryKeys(_table_, _options_, _cb_)`

<table>
  <tbody>
    <tr>
      <td>table</td>
      <td>Имя таблицы или представления</td>
    </tr>
    <tr>
      <td>options</td>
      <td><span>Опциональный объект который может иметь только "владелец/схема" свойство для указания владельца или имени схемы</span></td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Возвратная функция, которая возвращает список свойств модели; смотри пример ниже.</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner"><span style="color: rgb(26,85,51);">Параметр</span></div>
      </th>
      <th>
        <div class="tablesorter-header-inner"><span style="color: rgb(26,85,51);">Описание</span></div>
      </th>
    </tr>
  </thead>
</table>

Пример возвращаемого значения функции обратного вызова:

```
{
  { owner: 'STRONGLOOP',
    tableName: 'INVENTORY',
    columnName: 'PRODUCT_ID',
    keySeq: 1,
    pkName: 'ID_PK' },
  { owner: 'STRONGLOOP',
    tableName: 'INVENTORY',
    columnName: 'LOCATION_ID',
    keySeq: 2,
    pkName: 'ID_PK' },
...
}
```

### discoverForeignKeys

Вызови `discoverForeignKeys() `чтобы обнаружить внешний определения ключей из базы данных.

`discoverForeignKeys(_table_, _options_, _cb_)`

<table>
  <tbody>
    <tr>
      <td>table</td>
      <td><span>Имя таблицы или представления</span></td>
    </tr>
    <tr>
      <td>options</td>
      <td><span>Опциональный объект который может иметь только "владелец/схема" свойство для указания владельца или имени схемы</span></td>
    </tr>
    <tr>
      <td>cb</td>
      <td><span>Возвратная функция, которая возвращает список свойств модели; смотри пример ниже.</span></td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner"><span style="color: rgb(26,85,51);">Параметр</span></div>
      </th>
      <th>
        <div class="tablesorter-header-inner"><span style="color: rgb(26,85,51);">Описание</span></div>
      </th>
    </tr>
  </thead>
</table>

Пример возвращаемого значения функции обратного вызова:

```
{ fkOwner: 'STRONGLOOP',
      fkName: 'PRODUCT_FK',
      fkTableName: 'INVENTORY',
      fkColumnName: 'PRODUCT_ID',
      keySeq: 1,
      pkOwner: 'STRONGLOOP',
      pkName: 'PRODUCT_PK',
      pkTableName: 'PRODUCT',
      pkColumnName: 'ID' }
```

### discoverExportedForeignKeys

Вызовите `discoverExportedForeignKeys()` чтобы обнаружить внешние ключи определений, которые экспортируются из базы данных.

`discoverExportedForeignKeys(_table_, _options_, _cb_)`

<table>
  <tbody>
    <tr>
      <td>table</td>
      <td><span>Имя таблицы или представления</span></td>
    </tr>
    <tr>
      <td>options</td>
      <td><span>Опциональный объект который может иметь только "владелец/схема" свойство для указания владельца или имени схемы</span></td>
    </tr>
    <tr>
      <td>cb</td>
      <td><span>Возвратная функция, которая возвращает список свойств модели; смотри пример ниже.</span></td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>
        <div class="tablesorter-header-inner"><span style="color: rgb(26,85,51);">Параметр</span></div>
      </th>
      <th>
        <div class="tablesorter-header-inner"><span style="color: rgb(26,85,51);">Описание</span></div>
      </th>
    </tr>
  </thead>
</table>

Пример возвращаемого значения функции обратного вызова:

```
{ fkName: 'PRODUCT_FK',
      fkOwner: 'STRONGLOOP',
      fkTableName: 'INVENTORY',
      fkColumnName: 'PRODUCT_ID',
      keySeq: 1,
      pkName: 'PRODUCT_PK',
      pkOwner: 'STRONGLOOP',
      pkTableName: 'PRODUCT',
      pkColumnName: 'ID' }
```

### discoverSchemas

Use `discoverSchema` чтобы обнаружить модели LDL из базы данных. Начинается с одной таблицы / представления, если  `relations опция установлена как` trueStarting with one table/view, if the `relations` option is set to true, она следует внешним ключам, чтоб обнаружить связанные моделиi.

`discoverSchema(_modelName_ [, _options_] [, _cb_])`Свойства параметра опции:

<table>
  <tbody>
    <tr>
      <th>Свойство</th>
      <th><span style="color: rgb(26,85,51);">Тип</span></th>
      <th><span style="color: rgb(26,85,51);">Описание</span></th>
    </tr>
    <tr>
      <td>modelName</td>
      <td><span>Строка</span></td>
      <td>Название определяемой модели</td>
    </tr>
    <tr>
      <td>options</td>
      <td>Объект</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>cb</td>
      <td>Функция</td>
      <td>Возвратная функция</td>
    </tr>
  </tbody>
</table>

#### Options

<table>
  <tbody>
    <tr>
      <th><span style="color: rgb(26,85,51);">Имя</span></th>
      <th>Тип</th>
      <th><span style="color: rgb(26,85,51);">Описание</span></th>
    </tr>
    <tr>
      <td>owner / schema</td>
      <td><code>Строка</code></td>
      <td>
        <p>Владелец базы данных или имя схемы.</p>
      </td>
    </tr>
    <tr>
      <td>relations</td>
      <td><code>Булевое значение</code></td>
      <td>
        <p>Если правда, функция будет следовать внешних ключевых отношений, чтобы обнаружить связанные таблицы.</p>
      </td>
    </tr>
    <tr>
      <td>all</td>
      <td><span>Булевое значение</span></td>
      <td>
        <p>Правда, чтобы включить всех владельцев; ложь в противном случае.</p>
      </td>
    </tr>
    <tr>
      <td>views</td>
      <td><span>Булевое значение</span></td>
      <td>
        <p>Правда, чтобы включить представление; ложь в противном случае.</p>
      </td>
    </tr>
  </tbody>
</table>

**Пример**

**/server/script.js**

```
dataSource.discoverSchema('INVENTORY', {owner: 'STRONGLOOP'}, function (err, schema) {
    ...
}
```

Результат показан ниже.

{% include important.html content="

**Результат ниже пример для MySQL,** который содержит MySQL-специфические свойства в дополнение к регулярным опциям и свойствам модели LDL. Объекты 'MySQL' содержат MySQL-специфические сопоставления. Для других баз данных, ключи 'mysql' будут заменены на тип базы данных, например, \"oracle\" и отображения типов данных будет отличаться.

" %}

**/common/models/model.json**

```js
{
  "name": "Inventory",
  "options": {
    "idInjection": false,
    "mysql": {
      "schema": "STRONGLOOP",
      "table": "INVENTORY"
    }
  },
  "properties": {
    "productId": {
      "type": "String",
      "required": false,
      "length": 60,
      "precision": null,
      "scale": null,
      "id": 1,
      "mysql": {
        "columnName": "PRODUCT_ID",
        "dataType": "varchar",
        "dataLength": 60,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "NO"
      }
    },
    "locationId": {
      "type": "String",
      "required": false,
      "length": 60,
      "precision": null,
      "scale": null,
      "id": 2,
      "mysql": {
        "columnName": "LOCATION_ID",
        "dataType": "varchar",
        "dataLength": 60,
        "dataPrecision": null,
        "dataScale": null,
        "nullable": "NO"
      }
    },
    "available": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 10,
      "scale": 0,
      "mysql": {
        "columnName": "AVAILABLE",
        "dataType": "int",
        "dataLength": null,
        "dataPrecision": 10,
        "dataScale": 0,
        "nullable": "YES"
      }
    },
    "total": {
      "type": "Number",
      "required": false,
      "length": null,
      "precision": 10,
      "scale": 0,
      "mysql": {
        "columnName": "TOTAL",
        "dataType": "int",
        "dataLength": null,
        "dataPrecision": 10,
        "dataScale": 0,
        "nullable": "YES"
      }
    }
  }
}
```

## Пример построения моделей через обнаружение

Следующий пример использует discoverAndBuildModels (), чтобы обнаружить, построить и проверить модели.

Обратите внимание, что строка arguments этой функции чувствительна к регистру; специально имя таблицы (в примере ниже, 'account') и имя владельца (схема)  (в примере ниже, 'demo').

**/server/script.js**

```js
dataSource.discoverAndBuildModels('account', {
  owner: 'demo'
}, function(err, models) {
  models.Account.find(function(err, act) {
    if (err) {
      console.error(err);
    } else {
      console.log(act);
    }
    dataSource.disconnect();
  });
});
```
