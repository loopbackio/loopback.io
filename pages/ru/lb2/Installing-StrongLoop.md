---
title: "Установка StrongLoop"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Installing-StrongLoop.html
summary:
---

## С чего следует начать

Во-первых, если вы еще не сделали этого, то вам следует [установить Node.js](http://nodejs.org/download/), который включает `npm`, менеджер пакетов. 

С `npm` вы установите StrongLoop, который установит:

*   LoopBack фреймворк, который включает [loopback](https://github.com/strongloop/loopback), [loopback-datasource-juggler](https://github.com/strongloop/loopback-datasource-juggler) модули, а также многочисленные другие модули LoopBack фреймворка, наряду с модулями которые требуются для их работы.
*   [StrongLoop Controller](https://docs.strongloop.com/display/NODE/Command-line+reference) (`slc` консольная утилита) для создания LoopBack приложения, его запуска, и управления Node приложением.
*   [Yeoman](http://yeoman.io/) и LoopBack генераторы для автоматической генерации структуры LoopBack приложения.  
*   [Grunt](http://gruntjs.com/) - JavaScript планировщик задач.
*   [LoopBack Angular консольная утилита](https://github.com/strongloop/loopback-sdk-angular-cli) (`lb-ng` и `lb-ng-doc`). См. [AngularJS JavaScript SDK](AngularJS-JavaScript-SDK.html) для получения подробной информации.

## Установка для вашей операционной системы

Следуйте инструкции для вашей операционной системы:

### Windows

#### Установка Node.js

{% include note.html content="

Если вы нуждаетесь в поддержке такого функционала как [CPU профилирование](https://docs.strongloop.com/display/SLC/CPU+profiling), [профилирование динамической памяти](https://docs.strongloop.com/display/TRASH/Heap+memory+profiling), [показатели производительности](https://docs.strongloop.com/display/SLC/Available+metrics), [наблюдение за объектом](https://docs.strongloop.com/display/SLC/Object+tracking), [логирование событий в журнал](https://docs.strongloop.com/display/SLC/Logging#Logging-Loggingtosyslog) и др., то воспользуйтесь подробной инструкцией [Установка Node and StrongLoop на Windows](https://docs.strongloop.com/display/SL/Installing+on+Windows).

Если нет, то вы можите [скачать и установить базовый установщик с nodejs.org](http://nodejs.org/download). Обратите внимание, что вы можите увидеть сообщения о ошибках во время установки и при запуске приложений с `slc`.

" %}

#### Переустановка npm

Версия npm, которая устанавливается как часть пакета Node, как известно имеет проблемы на Windows. Чтобы избежать этих проблем переустановите npm, который в действительности установит актуальный менеджер пакетов [npm2](https://www.npmjs.com/package/npm2):

`$ npm install -g npm`

**Prerequisite for using StrongLoop Controller (slc)**

По умолчанию, Git на Windows  не поддерживает пути более 260 символов; Поэтому, чтобы избежать ошибок необходимо включить длинные пути с помощью следующей команды:

`C:\> git config --system core.longpaths true`

#### Установка StrongLoop

Следуйте следующих шагов:

1.  Откройте командную строку Windows. ПРИМЕЧАНИЕ: Node не поддерживает Cygwin. Вы должны использовать командную строку Windows (Shell).
2.  Установите StrongLoop:

    `C:\> npm install -g strongloop`

    {% include note.html content="

    Во время установки вы можите увидеть ряд ошибок от `node-gyp` и Python если у вас нет установленного [компилятора](https://docs.strongloop.com/display/SL/Installing+compiler+tools). Эти ошибки могут помешать вам только выполнению определенных функций мониторинга и управления; Если вам нужны данные функции, то [установите компилятор](https://docs.strongloop.com/display/SL/Installing+compiler+tools) перед продолжением. В противном случае в можите проигнорировать эти ошибки на данном этапе.

    " %}

Если вы столкнулись с проблемами, см.  [Устранение неполадок при установке](https://docs.strongloop.com/display/SL/Installation+troubleshooting).

### Mac OSX 

#### Назначение прав файлам и каталогам

Для установки Node and StrongLoop, вам нужно иметь права на запись в следующие каталоги:

*   `/usr/local/bin` 
*   `/usr/local/lib/node_modules` 

Вы можите обойти это, используя sudo, хотя это не очень хорошая идея. Более правильным решением является установка прав и привилегий следующим способом:

```
$ sudo chown -R $USER /usr/local/bin
$ sudo chown -R $USER /usr/local/lib/node_modules
```

Эта команда делает вашего пользователя владельцем `/usr/local/bin`  и `/usr/local/lib/node_modules` директорий. Тогда вам не придется использовать `sudo` для установки Node или установки пакетов на глобальном уровне используя `npm`.  Для получения дополнительной информации см. [How to Node](http://howtonode.org/introduction-to-npm).

#### Установка Node.js

{% include note.html content="

Если у вас уже установлен Node, пропустите этот шаг.

" %}

Установка Node.js: Скачайте [скачайте базовый инсталлятор с nodejs.org](http://nodejs.org/download).

#### Установка StrongLoop

Придерживайтесь следующих шагов:

1.  Откройте терминал.
2.  Введите следующую команду:

    `$ npm install -g strongloop`

    Если вы не установили права на файлы как указано выше тогда воспользуйтесь этой командой (не рекомендуется):

    `$ sudo npm install -g strongloop`

    {% include note.html content="

    Во время установки вы можите увидеть ряд ошибок от `node-gyp,`  если у вас нет установленного [компилятора](https://docs.strongloop.com/display/SL/Installing+compiler+tools). Эти ошибки могут помешать вам только выполнению определенных функций  типа [CPU профилирование](https://docs.strongloop.com/display/SLC/CPU+profiling) и [Профилирование динамической памяти](https://docs.strongloop.com/display/TRASH/Heap+memory+profiling) с `slc`; Если вам нужны данные функции, то [установите компилятор](https://docs.strongloop.com/display/SL/Installing+compiler+tools) перед продолжением. В противном случае в можите проигнорировать эти ошибки на данном этапе.

    " %}

Если вы столкнулись с проблемами, см.  [Устранение неполадок при установке](https://docs.strongloop.com/display/SL/Installation+troubleshooting).

### Linux

#### Назначение прав файлам и каталогам

Для установки Node and StrongLoop, вам нужно иметь права на запись в следующие каталоги:

*   `/usr/local/bin` 
*   `/usr/local/lib/node_modules` 

Вы можите обойти это, используя sudo, хотя это не очень хорошая идея. Более правильным решением является установка прав и привилегий следующим способом:

```
$ sudo chown -R $USER /usr/local/bin
$ sudo chown -R $USER /usr/local/lib/node_modules
```

Эта команда делает вашего пользователя владельцем `/usr/local/bin`  и `/usr/local/lib/node_modules` директорий. Тогда вам не придется использовать `sudo` для установки Node или установки пакетов на глобальном уровне используя `npm`.  Для получения дополнительной информации см. [How to Node](http://howtonode.org/introduction-to-npm).

#### Установка Node.js

{% include note.html content="

Если у вас уже установлен Node, пропустите этот шаг.

" %}

Установка Node.js: см. [Установка Node.js с помощью менеджера пакетов](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

#### Установка StrongLoop

Придерживайтесь следующих шагов:

1.  Откройте терминал.
2.  Введите следующую команду:

    `$ npm install -g strongloop`

    Если вы не установили права на файлы как указано выше тогда воспользуйтесь этой командой (не рекомендуется):

    `$ sudo npm install -g strongloop`

    {% include note.html content="

    Во время установки вы можите увидеть ряд ошибок от `node-gyp,`  если у вас нет установленного [компилятора](https://docs.strongloop.com/display/SL/Installing+compiler+tools). Эти ошибки могут помешать вам только выполнению определенных функций  типа [CPU профилирование](https://docs.strongloop.com/display/SLC/CPU+profiling) и [Профилирование динамической памяти](https://docs.strongloop.com/display/TRASH/Heap+memory+profiling) с `slc`; Если вам нужны данные функции, то [установите компилятор](https://docs.strongloop.com/display/SL/Installing+compiler+tools) перед продолжением. В противном случае в можите проигнорировать эти ошибки на данном этапе.

    " %}

Если вы столкнулись с проблемами, см. [Устранение неполадок при установке.](https://docs.strongloop.com/display/SL/Installation+troubleshooting).

## Подтверждение установки

Для подтверждения установки и вызова справки по slc, воспользуйтесь этой командой:

`$ slc --help`

Вы увидите стандартную "страницу справки":

```
SLC()                                                           SLC()

NAME
       slc - StrongLoop Controller
       Command-line tool for development and control of a Node application.
 ...
```
