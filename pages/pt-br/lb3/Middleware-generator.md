---
title: "Middleware generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Middleware-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

### Synopsis

Adds a new middleware configuration to an existing LoopBack application.

{% include note.html content="

If you're adding third-party middleware, you must install the middleware package for your application with `npm install -save <middleware-package>`.

" %}

```shell
$ slc loopback:middleware [options] [<name>]
```

### Options

`-h, --help`
Print the generator's options and usage.

`--skip-cache`
Do not remember prompt answers. Default is false.

`--skip-install`
Do not automatically install dependencies. Default is false.

### Arguments

You can optionally provide the name of the middleware function to create as an argument. 
If you do, the tool will use that as the default when it prompts for the name.

### Interactive Prompts

The tool will prompt you for:

* Name of the new middleware function.  If you supplied a name on the command-line, just hit Enter to use it.
* Phase when the middleware function will be invoked.  You can select any of the predefined phases or a custom phase.
  For more information about middleware phases, see [Defining middleware](Defining-middleware.html).
* Sub-phase when the middleware function will be invoked (before, regular, or after).
* Paths (routes) that will invoke the middleware function.
* Configuration parameters in JSON format.

### Output

The tools adds the specified middleware to the application's [`middleware.json`](middleware.json.html) file

### EXAMPLES

Here is an example to add a middleware to an existing phase.

```
$ slc loopback:middleware
? Enter the middleware name: m1
? Select the phase for m1: 5. routes
? Select the sub phase for m1: 1. before
Specify paths for m1:
Enter an empty path name when done.
? Path uri: /x
Let's add another path.
Enter an empty path name when done.
? Path uri:
? Configuration parameters in JSON format: {"a": 1}
Middleware m1 is added to phase routes.
```

The following is an example to add a middleware to a custom phase.

```
$ slc loopback:middleware
? Enter the middleware name: m2
? Select the phase for m2: (custom phase)
? Enter the phase name: p1
? Select the phase before which the new one will be inserted: 4. parse
? Select the sub phase for m2: 2. regular
Specify paths for m2:
Enter an empty path name when done.
? Path uri: /a
Let's add another path.
? Configuration parameters in JSON format: {"x": "2"}
Middleware m2 is added to phase p1.
```
