---
title: "Определение удаленных привязок (remote hook )"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Define-a-remote-hook.html
summary:
---

{% include important.html content="

**Требования для выполнения данного руководства**:

*   Установленный StrongLoop как описано в [Установка StrongLoop](Installing-StrongLoop.html)
*   Прохождение [Начало работы с LoopBack](https://docs.strongloop.com/pages/viewpage.action?pageId=5310598).

**Рекомендации**: Прочтите [Основные понятия LoopBack](LoopBack-core-concepts.html).

" %}

_Удаленная привязка (remote hook )_  функция, которая выполняется до и после удаленного метода

Напомним в  [Расширьте свой API](-API.html), вы создали удаленный метод—пользовательскую функцию которую вы вызываете  посредством REST endpoint. [удаленная привязка (remote hook)](Remote-hooks.html) простая функция, которая запускается на выполнение до и после удаленного метода.

Вы можите определить два вида удаленных привязок (remote hooks):

*   `beforeRemote()` запускается перед удаленным методом.
*   `afterRemote()` запускается после удаленного метода.

В обоих случаях вы предоставляете два аргумент строка которая соответствует удаленному методу который вы хотите привязать и функция вызова. Главное в удаленных привязках (remote hooks), является то, что строки могут содержать символы, поэтому это позволяет инициировать любые методы подбора.

{% include note.html content="

LoopBack также предостовляет [модели привязок](Model-hooks.html), функции, которые выполняются до или после определенных событий, таких, как создание, сохранение и обновление данных модели.

" %}

Здесь вы собираетесь определить удаленную привязку (remote hook) в review (отзыв) модели, в частности `Review.beforeRemote`.

Создайте новый файл, `common/models/review.js`, и добавьте следующий код:

**common/models/review.js**

```js
module.exports = function(Review) {
  Review.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    req.body.date = Date.now();
    req.body.publisherId = req.accessToken.userId;
    next();
  });
};
```

Эта функция вызывается перед созданием нового экземпляра модели Review (отзыв).  В коде:

*   Вставляет publisherId используя access token (маркер доступа), прикрепленный к запросу.
*   Устанавливает датой экземпляра обзора текущую дату.

<div class="sl-hidden"><strong>REVIEW COMMENT from Rand</strong><br>
  <p><span>I assume you could use a </span><a href="http://docs.strongloop.com/display/LB/Model+hooks#Modelhooks-beforeCreate" class="external-link" rel="nofollow">beforeCreate</a><span>&nbsp;</span><span>model hook to do the same thing?</span></p>
  <p>It might be instructive to show how this would be accomplished or at least mention it.</p>
</div>

Next: Далее выполните следующий раздел [Создание клиентского AngularJS](-AngularJS.html) .
