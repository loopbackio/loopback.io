---
title: "Определение связей моделей"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Define-model-relations.html
summary: Определение связей позволяет запрашивать соответствующие модели и выполнять соответствующие проверки.
---

{% include important.html content="
**Необходимое условие**:Установите StrongLoop, как описано в [Установка StrongLoop](Installing-StrongLoop.html).

**Рекомендации**: Прочитайте [Основные понятия LoopBack](LoopBack-core-concepts.html).
" %}

Отдельные модели легко понимаются и работают. Но в реальном мире модели  часто взаимодействуют или связаны между собой. Для приложения  с несколькими моделями, как правило, требуется определить связи между ними.

{% include note.html content="
LoopBack поддерживает большое количество связей между моделями в том числе: BelongsTo, HasMany, HasManyThrough, и HasAndBelongsToMany, и др. Для получения более подробной информации см.  Создание связей между моделями.
" %}

В Coffee Shop Reviews приложении модели связаны следующим образом:

- Кофейня имеет много отзывов.
- Кофейня имеет много рецензентов.
- Отзыв относится к кофейне
- Отзыв относится к рецензенту
- Рецензент может иметь много отзывов.

Теперь вы собираетесь определить эти связи между моделями. Всего выходит пять связей. Снова вам нужно воспользоватся slc loopback, но в этот раз вы воспользуетесь подкомандой  связи (relation generator ).  Для каждой связи введите:

```sh
$ slc loopback:relation
```

Инструмент предложит вам предоставить информацию связей, как показано ниже.
Кофейня может иметь много отзывов; Модель "No" и внешний ключ "No" .

```sh
? Select the model to create the relationship from: CoffeeShop
? Relation type: has many
? Choose a model to create a relationship with: Review
? Enter the property name for the relation: reviews
? Optionally enter a custom foreign key:
? Require a through model? No
```

Кофейня может иметь много рецензентов; Модель "No" и внешний ключ "No" .

```sh
? Select the model to create the relationship from: CoffeeShop
? Relation type: has many
? Choose a model to create a relationship with: Reviewer
? Enter the property name for the relation: reviewers
? Optionally enter a custom foreign key:
? Require a through model? No
```

Отзывы относятся к кофейне; Внешний ключ "No" .

```sh
? Select the model to create the relationship from: Review
? Relation type: belongs to
? Choose a model to create a relationship with: CoffeeShop
? Enter the property name for the relation: coffeeShop
? Optionally enter a custom foreign key:
```

Отзывы относятся к рецензентам; Внешний ключ - publisherId.

```sh
? Select the model to create the relationship from: Review
? Relation type: belongs to
? Choose a model to create a relationship with: Reviewer
? Enter the property name for the relation: reviewer
? Optionally enter a custom foreign key: publisherId
```

Рецензенты имеют много отзывов; Внешний ключ - publisherId.

```sh
? Select the model to create the relationship from: Reviewer
? Relation type: has many
? Choose a model to create a relationship with: Review
? Enter the property name for the relation: reviews
? Optionally enter a custom foreign key: publisherId
? Require a through model? No
```

Теперь, посмотрите в  common/models/review.json.  Вы должны увидеть:

**common/models/review.json**
```js
...
"relations": {
    "coffeeShop": {
      "type": "belongsTo",
      "model": "CoffeeShop",
      "foreignKey": ""
    },
    "reviewer": {
      "type": "belongsTo",
      "model": "Reviewer",
      "foreignKey": "publisherId"
    }
  },
...
```

Также, в common/models/reviewers.json вы должны получить:

**common/models/reviewers.json**
```js
...
"relations": {
    "reviews": {
      "type": "hasMany",
      "model": "Review",
      "foreignKey": "publisherId"
    }
  },
...
```

И в common/models/coffee-shop.json должны получить следующее:

**common/models/coffee-shop.json**
```js
...
 "relations": {
    "reviews": {
      "type": "hasMany",
      "model": "Review",
      "foreignKey": ""
    },
    "reviewers": {
      "type": "hasMany",
      "model": "Reviewer",
      "foreignKey": ""
    }
  },
...
```
**Next**: Теперь переходите к Определения прав доступа.
