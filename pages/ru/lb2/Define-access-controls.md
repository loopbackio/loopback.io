---
title: "Определения прав доступа"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Define-access-controls.html
summary: Контроль доступа определяет какие пользователи, и что могут делать.
---

{% include important.html content="
**Необходимое условие**:Установите StrongLoop, как описано в [Установка StrongLoop](Installing-StrongLoop.html).

**Рекомендации**: Прочитайте [Основные понятия LoopBack](LoopBack-core-concepts.html).
" %}

LoopBack  приложение взаимодействует с данными посредством моделей, а это значит, что для контроля доступа к ним нужно поставить;  это и определит кто или что может читать и записывать данные или выполнять другие методы по модели.

{% include note.html content="
Контроль доступа в LoopBack определяется списком access control lists (лист контроля доступа) или ACLs. Для получения более подробной информации, см. Управление доступом к данным.
" %}

Вы собираетесь установить контроль доступа к модели Review (Отзыв).  Он должен осуществляться посредством следующих правил:

- Любой желающий может ознакомиться с отзывами, но вы должны быть авторизованы, чтобы создавать, редактировать, или удалить их.
- Любой желающий может зарегистрироваться в качестве пользователя; затем войти и выйти из системы.
- Авторизованые пользователи могут создовать новые отзовы и редактировтаь их или удалять; однако они не могут изменять или удалять саму кофейню.  

Снова вам нужно воспользоватся slc loopback, но в этот раз вы воспользуетесь подкомандой acl ;  для каждого ACL, введите:

```
$ slc loopback:acl
```

Инструмент предложит вам предоставить необходимую информацию, как показано ниже.
Запретить всем все endpoints.  Это часто является отправной точкой, при определении списков ACL, потому что тогда вы можете выборочно разрешить доступ к конкретным действиям.

```
? Select the model to apply the ACL entry to: Review
? Select the ACL scope: All methods and properties
? Select the access type: All (match all types)
? Select the role: All users
? Select the permission to apply: Explicitly deny access
```

Теперь позвольте всем читать отзывы.

```
? Select the model to apply the ACL entry to: Review
? Select the ACL scope: All methods and properties
? Select the access type: Read
? Select the role: All users
? Select the permission to apply: Explicitly grant access
```
Разрешение авторизованным пользователям писать и создавать отзіві; то есть если вы авторизованны вы можите создавать отзывы
```
? Select the model to apply the ACL entry to: Review
? Select the ACL scope: A single method
? Enter the method name: create
? Select the role: Any authenticated user
? Select the permission to apply: Explicitly grant access
```
Теперь, позволить автору отзыва (тоесть он его "владелец") tвносить любые изменения в него.
```
$ slc loopback:acl
? Select the model to apply the ACL entry to: Review
? Select the ACL scope: All methods and properties
? Select the access type: Write
? Select the role: The user owning the object
? Select the permission to apply: Explicitly grant access
```
Когда вы закончите,  ACL секция в common/models/review.json должна выглядеть так:

```js
...
 "acls": [
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "DENY"
    },
    {
      "accessType": "READ",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW"
    },
    {
      "accessType": "WRITE",
      "principalType": "ROLE",
      "principalId": "$authenticated",
      "permission": "ALLOW",
      "property": "create"
    },
    {
      "accessType": "WRITE",
      "principalType": "ROLE",
      "principalId": "$owner",
      "permission": "ALLOW"
    }
  ],
...
```

**Next**: Следующим шагом, выполните Определение удаленных привязок.
