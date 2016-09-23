---
title: "Property generator"
lang: ru
layout: translation
keywords: LoopBack
tags:
sidebar: ru_lb2_sidebar
permalink: /doc/ru/lb2/Property-generator.html
summary:
---

The LoopBack property generator adds a property to an existing model in a LoopBack application.

```
$ cd <loopback-app-dir>
$ slc loopback:property
```

The tool will then prompt you to:

*   Select from the models in the application, to which it will add the new property.
*   Enter the name of the property to add.
*   Select the data type of the property.
*   Whether the property is required.

For example:

```
$ slc loopback:property
[?] Select the model: inventory
[?] Enter the property name: price
[?] Property type: (Use arrow keys)
  string 
❯ number 
  boolean 
  object 
  array 
  date 
  buffer 
  geopoint 
  (other)
```