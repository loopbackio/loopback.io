---
title: "Boot script generator"
lang: ja
layout: page
keywords: LoopBack
tags: [tools]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Boot-script-generator.html
summary:
---

{% include content/ja/generator-create-app.html %}

### Synopsis

The LoopBack boot script generator adds a new [boot script](Defining-boot-scripts.html) to a LoopBack application.

```
lb boot-script [options] [<name>]
```

With IBM API Connect developer toolkit:

```
apic loopback:boot-script [options] [<name>]
```

With legacy StrongLoop tools:

```
slc loopback:boot-script [options] [<name>]
```

### Options

{% include_relative includes/CLI-std-options.md title='no' %}

### Arguments

You can optionally provide the name of the boot script as an argument.  If you do, then the tool won't prompt you for the name.

### Interactive Prompts

The tool will prompt you for:

* The name of the boot script, if you didn't provide it on the command-line.
* Whether you want to created an asynchronous or synchronous boot script.

### Output

The tool will create a JavaScript file with the specified name in the application's `server/boot` directory.
The code will look like this, depending on your response to the prompt:

Asynchronous script:

```javascript
module.exports = function(app, cb) {
  process.nextTick(cb);
};
```

Synchronous script:

```javascript
module.exports = function(app) {};
```
