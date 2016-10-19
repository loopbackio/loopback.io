---
title: "Использование модели через REST"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Exposing-models-over-REST.html
summary:
---

## Обзор

LoopBack модели автоматически имеют [стандартный набор HTTP эндпоинтов](http://apidocs.strongloop.com/loopback/#persistedmodel), который обеспечивает REST APIs операциями CRUD для работы с данными: создание, чтение, обновление и удаление.  Публичные свойства  в [model-config.json](model-config.json.html) указывают следует ли использовать REST APIs  в модели, например:

**/server/model-config.json**

```js
...
"MyModel": {
  "public": true,
  "dataSource": "db"
},
...
```

Чтоб "скрыть"  REST API модели, просто смените свойство `public` на `false`.

### REST путь

По умолчанию REST APIs используют множественную форму имени модели; а именно:

*   `Model.settings.http.path`
*   `Model.settings.plural`, if defined in `models.json`; см [Справочник по компоновки проекта](Project-layout-reference.html) для получения более детальной информации.
*   Автоматически множественное имя модели (по умолчанию). например, если у вас есть модель - location, по умолчанию она монтируется на  `/locations`. 

### Использование маршрутизатора REST

По умолчанию, базовое приложение использует модель через REST используя `loopback.rest` маршрутизатор.

{% include important.html content="

Если ваше приложение создано с помощью `slc loopback`, LoopBack автоматически настроит REST middleware и зарегистрирует публичные модели. Вам не нужно ничего делать дополнительно.

" %}

Чтобы вручную подключить модель через REST с помощью  `loopback.rest` маршрутизатор, используйте следующий код, например:

**/server/server.js**

```js
var app = loopback();
app.use(loopback.rest()); 
// Expose the `Product` model
app.model(Product);
```

After this, the `Product` model will have create, read, update, and delete (CRUD) functions working remotely from mobile. At this point, the model is schema-less and the data are not checked.

You can then view generated REST documentation at [http://localhost:3000/explorer](http://localhost:3000/explorer)[.](http://localhost:3000/_docs)

LoopBack provides a number of [Built-in models](-.html) that have REST APIs.  See [Built-in models REST API](Built-in-models-REST-API.html) for more information.

### Формат запроса

For POST and PUT requests, the request body can be JSON, XML or urlencoded format, with the Content-Type header set to `application/json, application/xml, or application/x-www-form-urlencoded`. The Accept header indicates its preference for the response format.

The following is an example HTTP request to create a new note:

```js
POST / api / Notes HTTP / 1.1
Host: localhost: 3000
Connection: keep - alive
Content - Length: 61
Accept: application / json
Content - Type: application / json  {
  "title": "MyNote",
  "content": "This is my first note"
}
```

#### Passing JSON object or array using HTTP query string

Some REST APIs take a JSON object or array from the query string. LoopBack supports two styles to encode the object/array value as query parameters.

*   The syntax from node-querystring (qs)
*   Stringified JSON

For example,

```js
http: //localhost:3000/api/users?filter[where][username]=john&filter[where][email]=callback@strongloop.com
  http: //localhost:3000/api/users?filter={"where":{"username":"john","email":"callback@strongloop.com"}}
```

The table below illustrates how to encode the JSON object/array can be encoded in different styles:

<table>
  <tbody>
    <tr>
      <th>JSON object/array for the filter object</th>
      <th>qs style</th>
      <th>Stringified JSON</th>
    </tr>
    <tr>
      <td><pre><code>{ where:&nbsp;<br></code>  { username: 'john' },&nbsp;<br>    email: 'callback@strongloop.com' } }</pre></td>
      <td><pre><code>?filter[where][username]=john<br>&amp;</code>filter[where][email]=callback@strongloop.com</pre></td>
      <td><pre><code>?filter={"where":<br></code>  {"username":"john",<br>   "email":"callback@strongloop.com"}}</pre></td>
    </tr>
    <tr>
      <td><pre><code>{ where: <br>  { username: {inq: ['john', 'mary']} } }</code></pre></td>
      <td><pre>?filter[where][username][inq][0]=john<br>&amp;filter[where][username][inq][1]=mary</pre></td>
      <td><pre><code>?filter=</code>{"where":<br>  {"username":{"inq":["john","mary"]}}}</pre></td>
    </tr>
    <tr>
      <td><pre><code>{ include: ['a', 'b'] }</code></pre></td>
      <td><pre><code>?filter[include]=a&amp;filter[include]=b</code></pre></td>
      <td><pre><code>?filter={"include":["a","b"]}</code></pre></td>
    </tr>
  </tbody>
</table>

### Формат ответа

The response format for all requests is typically a JSON object/array or XML in the body and a set of headers. Some responses have an empty body. For example,

```js
HTTP / 1.1 200 OK
Access - Control - Allow - Origin: http: //localhost:3000
  Access - Control - Allow - Credentials: true
Content - Type: application / json;
charset = utf - 8
Content - Length: 59
Vary: Accept - Encoding
Date: Fri, 24 Oct 2014 18: 02: 34 GMT
Connection: keep - alive  {
  "title": "MyNote",
  "content": "This is my first note",
  "id": 1
}
```

The HTTP status code indicates whether a request succeeded:

*   Status code 2xx indicates success
*   Status code 4xx indicates request related issues.
*   Status code 5xx indicates server-side problems

The response for an error is in the following JSON format:

*   message: String error message.
*   stack: String stack trace.
*   statusCode: Integer [HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).

For example,

```js
{
  "error": {
    "message": "could not find a model with id 1",
    "stack": "Error: could not find a model with id 1\n ...",
    "statusCode": 404
  }
}
```

### Отключение API Explorer

LoopBack [API Explorer](https://docs.strongloop.com/pages/viewpage.action?pageId=5310601) полезен, когда вы разрабатываете свое приложение, но с точки зрения безопасности вы навряд ли заточите использовать его в продакшене.  Для отключения API Explorer полностью, если вы создовали ваше приложение с помощью [Генератора приложения](https://docs.strongloop.com/display/RU/Application+generator), просто удалите или переименуйте  `/server/boot/explorer.js`. 

## Предопределенные удаленные методы

By default, for a model backed by a data source that supports it, LoopBack exposes a REST API that provides all the standard create, read, update, and delete (CRUD) operations.

As an example, consider a simple model called `Location` (that provides business locations) to illustrate the REST API exposed by LoopBack.  LoopBack automatically creates the following endpoints:

<table>
  <tbody>
    <tr>
      <th>API модели</th>
      <th>HTTP Метод</th>
      <th>Пример пути</th>
    </tr>
    <tr>
      <td>create()</td>
      <td>POST</td>
      <td>/locations</td>
    </tr>
    <tr>
      <td>upsert()</td>
      <td>PUT</td>
      <td>/locations</td>
    </tr>
    <tr>
      <td>exists()</td>
      <td>GET</td>
      <td>/locations/<span>:id</span>/exists</td>
    </tr>
    <tr>
      <td>findById()</td>
      <td>GET</td>
      <td>/locations/<span>:id</span></td>
    </tr>
    <tr>
      <td>find()</td>
      <td>GET</td>
      <td>/locations</td>
    </tr>
    <tr>
      <td>findOne()</td>
      <td>GET</td>
      <td>/locations/findOne</td>
    </tr>
    <tr>
      <td>deleteById()</td>
      <td>DELETE</td>
      <td>/locations/<span>:id</span></td>
    </tr>
    <tr>
      <td>count()</td>
      <td>GET</td>
      <td>/locations/count</td>
    </tr>
    <tr>
      <td>prototype.updateAttributes()</td>
      <td>PUT</td>
      <td>/locations/<span>:id</span></td>
    </tr>
  </tbody>
</table>

The above API follows the standard LoopBack model REST API that most built-in models extend.  See [PersistedModel REST API](PersistedModel-REST-API.html) for more details.

## Обнаружение модели

To expose a model over REST, set the public property to true in `/server/model-config.json`:

```js
...
"Role": {
  "dataSource": "db",
  "public": false
},
...
```

### Hiding methods and REST endpoints

If you don't want to expose certain CRUD operations, you can easily hide them by calling [`disableRemoteMethod()`](http://apidocs.strongloop.com/loopback/#model-disableremotemethod) on the model. For example, following the previous example, by convention custom model code would go in the file `common/models/location.js`.  You would add the following lines to "hide" one of the predefined remote methods:

**common/models/location.js**

```js
var isStatic = true;
MyModel.disableRemoteMethod('deleteById', isStatic);
```

Now the `deleteById()` operation and the corresponding REST endpoint will not be publicly available.

For a method on the prototype object, such as `updateAttributes()`:

**common/models/location.js**

```js
var isStatic = false;
MyModel.disableRemoteMethod('updateAttributes', isStatic);
```

### Hiding endpoints for related models

To disable a REST endpoints for related model methods, use [disableRemoteMethod()](http://apidocs.strongloop.com/loopback/#modeldisableremotemethodname-isstatic).

For example, if there are post and tag models, where a post hasMany tags, add the following code to `/common/models/post.js` to disable the remote methods for the related model and the corresponding REST endpoints: 

**common/models/model.js**

```js
module.exports = function(Post) {
  Post.disableRemoteMethod('__get__tags', false);
  Post.disableRemoteMethod('__create__tags', false);
  Post.disableRemoteMethod('__delete__tags', false);
};
```

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <ul>
    <li>exposing model over rest
      <ul>
        <li>overview</li>
        <li>using the rest router
          <ul>
            <li>must be enabled (app.use(loopback.rest())</li>
            <li>loopback does this by default when you scaffold an app using slc loopback</li>
          </ul>
        </li>
        <li>how to expose models
          <ul>
            <li>via `server/model.json`</li>
          </ul>
        </li>
        <li>predefined routes that are exposed<br>
          <ul>
            <li>list of all routes created by loopback</li>
            <li>note some routes are disabled by default for built in models SEE built-in models unexposed models</li>
          </ul>
        </li>
        <li>exposing built-in models
          <ul>
            <li>overview</li>
            <li>unexposed models
              <ul>
                <li>some routes are not exposed in n models</li>
              </ul>
            </li>
            <li>app
              <ul>
                <li>exposed routes</li>
                <li>unexposed routes
                  <ul>
                    <li>why</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>user
              <ul>
                <li>exposed routes</li>
                <li>unexposed routes
                  <ul>
                    <li>why</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>role
              <ul>
                <li>exposed routes</li>
                <li>unexposed routes
                  <ul>
                    <li>why</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>rolemapping
              <ul>
                <li>exposed routes</li>
                <li>unexposed routes
                  <ul>
                    <li>why</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>add stuff from bottom built in models rest api section</li>
          </ul>
        </li>
        <li>exposing user-defined models<br>
          <ul>
            <li>all routes exposed by default</li>
            <li>if you created the model via slc loopback:model
              <ul>
                <li>you expose it over REST during the prompt</li>
              </ul>
            </li>
            <li>if you created it via discovery...</li>
            <li>if you created it via introspection...</li>
          </ul>
        </li>
        <li>remote methods
          <ul>
            <li>what are they and why do we use them</li>
            <li>talk about the function signature ALL provided args
              <ul>
                <li>what is context etc</li>
              </ul>
            </li>
            <li>example</li>
            <li>LINK to custom app logic section</li>
          </ul>
        </li>
        <li>remote hooks
          <ul>
            <li>what are they and why do we use them</li>
            <li>talk about the function signature ALL provided args<br>
              <ul>
                <li>what is the context object what properties are in it, why its there</li>
              </ul>
            </li>
            <li>example</li>
            <li>LINK to custom app logic section</li>
          </ul>
        </li>
        <li>model hooks<br>
          <ul>
            <li>what are they and why do we use them</li>
            <li>basic example</li>
            <li>LINK to custom app logic section</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
