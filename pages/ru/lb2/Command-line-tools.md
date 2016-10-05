---
title: "Command-line reference (slc loopback)"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: Command-line-reference-slc-loopback-.html
summary:
---

{% include important.html content="

**Необходимые условия**: Установите StrongLoop, следуя инструкции [Начало работы с LoopBack](-LoopBack.html).

" %}

Используйте команду slc loopbac для создания шаблона приложения. Базовый шаблон генерирует лишь стандартный код для вашего приложения. В дальнейшем вы можите модифицировать и изменять его под свои нужды.

Команда slc loopback- представляет из себя [Генератор приложения](Application-generator.html) для создания нового LoopBack приложения и нескольких дополнительных генераторов для создания базового шаблона приложения.

*   [ACL generator](ACL-generator.html)
*   [Application generator](Application-generator.html)
*   [Data source generator](Data-source-generator.html)
*   [Example generator](Example-generator.html)
*   [Model generator](Model-generator.html)
*   [Property generator](Property-generator.html)
*   [Relation generator](Relation-generator.html)
*   [Swagger generator](Swagger-generator.html)

{% include note.html content="

slc команда имеет много дополнительных суб-команд не специфичных для LoopBack, для создания, развертывания и управления Node приложением. См. [Эксплуатация Node приложений](https://docs.strongloop.com/display/SLC/Operating+Node+applications)  для получения более подробной информации и [Справочник по командам командной строки](https://docs.strongloop.com/display/NODE/Command-line+reference) для получения справки о командах.

" %} slc loopback использует [Yeoman](http://yeoman.io/) "за кулисами". Если вы уже используете Yeoman и вам удобно его использовать, то вы можите установить LoopBack генератор используя команду`npm install -g generator-loopback.`

Тогда везде, где в документации говорится использовать slc loopback, просто используйте yo loopback. Например для создания новой модели используйте `yo loopback:model`.
