---
title: "Swagger generator"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Swagger-generator.html
summary:
---

<div class="aui-message hint shadowed information-macro has-no-icon">

This is a StrongLoop Labs project

{% include image.html file="6258830.png" alt="" %}

This project provides early access to advanced or experimental functionality. It may lack usability, completeness, documentation, and robustness, and may be outdated.

However, StrongLoop supports this project: Paying customers can open issues using the StrongLoop customer support system (Zendesk). Community users, please report bugs on GitHub. For more information, see [StrongLoop Labs](https://docs.strongloop.com/display/zh/StrongLoop+Labs).

</div>

Generates a fully-functional application that provides the APIs conforming to the [Swagger](http://swagger.io/) 2.0 specification.

```
$ cd <loopback-app-dir>
$ slc loopback:swagger
```

The tool will prompt you for the location of the Swagger spec file:

`[?] Enter the swagger spec url or file path:`

Enter a URL or a relative file path.  Based on the REST API defined in this file, the tool will then prompt you for the models to generate.  For example, if you enter the Swagger simple petstore example URL:

`https://raw.githubusercontent.com/wordnik/swagger-spec/master/examples/v2.0/json/petstore-simple.json`

The tool will display this (for example):

```
[?] Select models to be generated:
❯⬢ swagger_api
 ⬢ pet
 ⬢ petInput
 ⬢ errorModel
```

Move the cursor with the arrow keys, and press the space bar to de-select the model next to the cursor.  Then press Return to generate all the selected models.

The tool will prompt you for the data source to use then display information on what it's doing; for example:

```
[?] Select the data-source to attach models to: db (memory)
Creating model definition for swagger_api...
Creating model definition for pet...
Creating model definition for petInput...
Creating model definition for errorModel...
...
```
