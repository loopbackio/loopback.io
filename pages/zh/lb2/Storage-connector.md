---
title: "Storage connector"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Storage-connector.html
summary:
---

## Installation

If you haven't yet installed the storage component, in your application root directory, enter:

`$ npm install loopback-component-storage --save`

This will install the module from npm and add it as a dependency to the application's [package.json](http://docs.strongloop.com/display/LB/package.json) file.

## Creating a storage data source

Create a new push data source with the [data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html):

`$ slc loopback:datasource`

When prompted, select **other** as the connector.   

At the prompt "**Enter the connector name without the loopback-connector- prefix,**" enter **storage**.

This creates an entry in `datasources.json` like this (for example):

**/server/datasources.json**

```js
...
 "myStorageDataSource": {
   "name": "myStorageDataSource",
   "connector": "storage"
 }
 ...
```

## Configuring a storage data source

Configure a storage data source by editing the [datasources.json](/doc/{{page.lang}}/lb2/datasources.json.html) file, for example as shown in the [storage service example](https://github.com/strongloop/loopback-component-storage/blob/master/example-2.0/):

**/server/datasources.json**

```js
...
"myStorageDataSource": {
  "name": "myStorageDataSource",
  "connector": "storage",
  "provider": "filesystem",
  "root": "./server/storage"
}
...
```

## Creating a storage model

Use the [model generator](/doc/{{page.lang}}/lb2/Model-generator.html) to create a new model, then edit the model.json file, as shown in the [storage service example](https://github.com/strongloop/loopback-component-storage/blob/master/example-2.0/):

**/server/models/container.json**

```js
{
  "name": "container",
  "base": "Model",
  "properties": {},
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": []
}
```

## Connect the model to the storage data source

**/server/model-config.json**

```js
...
"container": {
  "dataSource": "myStorageDataSource",
  "public": true
}
...
```
