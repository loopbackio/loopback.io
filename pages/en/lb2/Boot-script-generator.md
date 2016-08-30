---
title: "Boot script generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Boot-script-generator.html
summary:
---

{% include important.html content="
Before running this generator, you must create an application using the [Application generator](/doc/en/lb2/Application-generator.html).

Then you must run the command from the root directory of the application."
%}

### Synopsis

The LoopBack boot script generator adds a new [boot script](/doc/en/lb2/Defining-boot-scripts.html) to a LoopBack application.

```shell
$ [slc | apic] loopback:boot-script [options] [<name>]
```

### Options

`-h, --help`
Print the generator's options and usage.

`--skip-cache`
Do not remember prompt answers. Default is false.

`--skip-install`
Do not automatically install dependencies. Default is false.

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
