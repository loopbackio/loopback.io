---
title: "Valid names in LoopBack"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Valid-names-in-LoopBack.html
summary: This article explains the rules for naming LoopBack 3.x applications, models, data sources, and other project artifacts.
---
## General rules

In general, names of LoopBack applications, models, data sources, and so on must at a minimum be
[valid JavaScript identifiers](https://mathiasbynens.be/notes/javascript-identifiers),
with the additional restriction that the dollar sign ($) is not allowed.

The rules for JavaScript identifiers are fairly broad (for example, you can use Unicode characters).
However, as a best practice, follow these more restrictive guidelines:

* Begin names with a letter or underscore (_). Don't begin a name with a number.
* Other characters can be letters, numbers, or underscore (_).
* Application names can contain the dash, that is, the minus-sign character (-).

{% include tip.html content="
In general, LoopBack allows other characters in names, including other non-alphanumeric characters and Unicode characters,
but using them is not recommended as a best practice. If you have questions, inquire on the [LoopBack Google Group](https://groups.google.com/forum/#!forum/loopbackjs).

It is also a good idea to avoid names that are JavaScript [reserved words](https://mathiasbynens.be/notes/reserved-keywords) or [predefined property names](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) of a JavaScript Objects, such as `constructor`.
" %}

## Reserved model names

The following names cannot be used as a model name (case insensitively):

 - `Any`
 - `Array`
 - `Boolean`
 - `Date`
 - `File`
 - `Integer`
 - `Number`
 - `Object`
 - `String`
