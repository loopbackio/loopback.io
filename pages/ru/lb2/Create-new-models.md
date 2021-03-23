---
title: "Создание новой модели"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Create-new-models.html
summary: Создание модели с slc очень легкий и быстрый процесс.
---

{% include important.html content="
**Необходимое условие**:Установите StrongLoop, как описано в [Установка StrongLoop](Installing-StrongLoop.html).

**Рекомендации**: Прочитайте [Основные понятия LoopBack](LoopBack-core-concepts.html).
" %}

Напомним в Создание простого API  из Начало работы с LoopBack вы создали CoffeeShop модель.
Далее вы будите создавать две новых модели: Review (отзыв) and Reviewer (рецензент), с помощью slc loopback генератора моделей.

## Определение Review (Отзыв) модели

Введите:

```sh
$ slc loopback:model
```

При появлении запроса введите или ответьте следующим образом:

- Model name: Review
- Data source: mongoDs
- Base class: Используйте клавиши со стрелкой, чтоб выбрать PersistedModel.
- Expose Reviewer via the REST API? Нажмите RETURN, чтобы принять значение по умолчанию "Yes".
- Custom plural form (used to build REST URL):  Нажмите RETURN, чтобы принять значение по умолчанию "Yes".

Затем следуйте инструкции, чтоб добавить следующие свойства:

<table><thead><tr><th>Property name</th><th>Property type</th><th>Required?</th></tr></thead>
<tbody>
<tr><td class="confluenceTd">date</td><td class="confluenceTd">date</td><td class="confluenceTd">y</td></tr>
<tr><td class="confluenceTd">rating</td><td class="confluenceTd">number</td><td class="confluenceTd">n</td></tr>
<tr><td class="confluenceTd">comments</td><td class="confluenceTd">string</td><td class="confluenceTd">y</td></tr>
</tbody>
</table>

Для выхода из генератора модели, нажмите RETURN, когда у вас попросят ввести имя для новой модели.

## Определение Reviewer (Рецензент) модели

Введите:
```js
$ slc loopback:model
```

При появлении запроса введите или ответьте следующим образом:

- Model name: Reviewer
- Data source: mongoDs
- Base class: Используйте клавиши со стрелкой, чтоб выбрать User.
- Expose Reviewer via the REST API? Нажмите RETURN, чтобы принять значение по умолчанию "Yes".
- Custom plural form (used to build REST URL):  Нажмите RETURN, чтобы принять значение по умолчанию "Yes".

Не добавляйте каких-либо свойств, так как они наследуются от базовой модели User .
Для выхода из генератора модели, нажмите RETURN, когда у вас попросят ввести имя для новой модели.

**Next**: Теперь вы можите перейти к следующему шагу Определение связей моделей
