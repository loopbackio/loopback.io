---
title: "Model extension file"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Model-extension-file.html
summary: The model extension file is a JavaScript file where you can extend a model with JavaScript code.
---
The LoopBack [model generator](Model-generator.html) creates a model extension file for each model in the application.
The file will be either in the `server/models` or the `common/models` directory (depending on whether the model is server-only or
defined on both server and client).
The file is named <code><i>model-name</i>.js</code>, where _`model-name`_ is the model name; for example, `customer.json`.
The model JSON file defines models, relations between models, and access to models.

{% include note.html content="The LoopBack [model generator](Model-generator.html) automatically converts camel-case model names (for example MyModel)
to lowercase dashed names (my-model). For example, if you create a model named \"FooBar\" with the model generator, it creates files `foo-bar.json` and `foo-bar.js` in `common/models`.
However, the model name (\"FooBar\") will be preserved via the model's name property.
" %}

Use the model extension file to extend your model with custom code.
For example, you can [register a remote method](Remote-methods#registering-a-remote-method-in-code) here.


```javascript
'use strict';                                                                                            

module.exports = function(ModelName) {
  // Add extension code here
};
~    
```
