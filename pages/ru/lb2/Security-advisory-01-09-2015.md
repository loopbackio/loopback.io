---
title: "Рекомендации по безопасноти 01-09-2015"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/-01-09-2015.html
summary:
---

## Уязвимость LoopBack коннектора SQL инъекции

{% include warning.html content="

Если вы устоновили LoopBack коннекторы для PostgreSQL, Microsoft SQL Server, Oracle, or MySQL ранее **9 января 2015** вам нужно обновить соответствующие пакеты.

" %}

*   **Дата**: <time datetime="2015-01-09" class="date-past">09 Jan 2015</time> 
*   **Риск безопасности**: Высокий, критический
*   **Уязвимости:** SQL иньекция

### Описнаие

LoopBack позволяет определить свойства модели ( в том числе ID) как числовой тип.Уязвимость в реализации реляционной базы данных коннекта позволяет злоумышленнику передать специально созданные запросы (SQL операторы в числовом формате) в результате чего выполняется произвольный SQL. Эта уязвимость может быть использована анонимным пользователем.

### Сообщил

David Kirchner

### Версии, которые эта уязвимость затрагивает

*   loopback-connector-postgresql prior to 1.3.0
*   loopback-connector-mssql prior to 1.3.0
*   loopback-connector-oracle prior to 1.5.0
*   loopback-connector-mysql prior to 1.5.0 (SQL инжекция не возможна но iнедопустимые цифры выполняются как NaN).

### Решение

Пожалуйста  обновите связи в вашем проекте, чтоб использовать последнии версии коннекторов и запустите **npm обновление**:

*   loopback-connector-postgresql@1.3.0
*   loopback-connector-mssql@1.3.0
*   loopback-connector-oracle@1.5.0
*   loopback-connector-mysql@1.5.0

{% include warning.html content="

Перед запуском `npm обновления`, проверьте ваш `package.json` чтоб удостовериться, что в нем указана правильная версия, для примера:

`\"loopback-connector-oracle\": \"^1.5.0\"`

" %}

### Как сообщить об уязвимости системы безопасности?

Вы можите сообщить нам о уязвимости отослав письмо на **[callback@strongloop.com](mailto:callback@strongloop.com)**.