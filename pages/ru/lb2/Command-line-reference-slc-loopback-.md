---
title: "Command-line reference (slc loopback)"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Command-line-reference-slc-loopback-.html
summary:
---

{% include important.html content="

**Необходимые условия**: Установите StrongLoop, следуя инструкции [Начало работы с LoopBack](/doc/ru/lb2/-LoopBack.html).

" %}

Используйте команду slc loopbac для создания шаблона приложения. Базовый шаблон генерирует лишь стандартный код для вашего приложения. В дальнейшем вы можите модифицировать и изменять его под свои нужды.

Команда slc loopback- представляет из себя [Генератор приложения](/doc/ru/lb2/Application-generator.html) для создания нового LoopBack приложения и нескольких дополнительных генераторов для создания базового шаблона приложения.

*   [ACL generator](/doc/ru/lb2/ACL-generator.html)
*   [Application generator](/doc/ru/lb2/Application-generator.html)
*   [Data source generator](/doc/ru/lb2/Data-source-generator.html)
*   [Example generator](/doc/ru/lb2/Example-generator.html)
*   [Model generator](/doc/ru/lb2/Model-generator.html)
*   [Property generator](/doc/ru/lb2/Property-generator.html)
*   [Relation generator](/doc/ru/lb2/Relation-generator.html)
*   [Swagger generator](/doc/ru/lb2/Swagger-generator.html)

{% include note.html content="

slc команда имеет много дополнительных суб-команд не специфичных для LoopBack, для создания, развертывания и управления Node приложением. См. [Эксплуатация Node приложений](https://docs.strongloop.com/display/SLC/Operating+Node+applications)  для получения более подробной информации и [Справочник по командам командной строки](https://docs.strongloop.com/display/NODE/Command-line+reference) для получения справки о командах.

" %} slc loopback использует [Yeoman](http://yeoman.io/) "за кулисами". Если вы уже используете Yeoman и вам удобно его использовать, то вы можите установить LoopBack генератор используя команду`npm install -g generator-loopback.`

Тогда везде, где в документации говорится использовать slc loopback, просто используйте yo loopback. Например для создания новой модели используйте `yo loopback:model`.