---
title: "Push connector"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Push-connector.html
summary:
---

## Installation

If you haven't yet installed the Push component, in your application root directory, enter:

```shell
$ npm install loopback-component-push --save
```

This will install the module from npm and add it as a dependency to the application's 
[package.json](/doc/{{page.lang}}/lb2/package.json.html) file.

## Creating a push data source

Create a new push data source with the [data source generator](/doc/{{page.lang}}/lb2/Data-source-generator.html):

```shell
$ apic create --type datasource
```

```shell
$ slc loopback:datasource
```

When prompted, select **other** as the connector.  

At the prompt "**Enter the connector name without the loopback-connector- prefix,**" enter **push**.

This creates an entry in `datasources.json` like this (for example):

**/server/datasources.json**

```javascript
...
 "myPushDataSource": {
    "name": "myPushDataSource",
    "connector": "push"
  }
 ...
```

## Configuring a push data source

To configure a push data source, edit the `datasources.json` file.
For example as shown in the [push example](https:/github.com/strongloop/loopback-component-push/blob/master/example/server-2.0/):

**/server/datasources.json**

```javascript
"myPushDataSource": {
    "name": "myPushDataSource",
    "connector": "push",
    "installation": "installation",
    "notification": "notification",
    "application": "application"
  }
}
```

## Defining a push model

Then define a push model in the [Model definition JSON file](/doc/{{page.lang}}/lb2/Model-definition-JSON-file.html), for example:

**/server/models/push.json**

```javascript
{
  "name": "push",
  "base": "Model",
  "plural": "Push",
  "properties": {},
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": []
}
```

## Connect model to push data source

Connect the model to the data source:

**/server/model-config.json**

```javascript
"push": {
    "public": true,
    "dataSource": "myPushDataSource"
  }
```
